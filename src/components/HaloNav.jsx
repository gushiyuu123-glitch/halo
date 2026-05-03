import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import styles from "./HaloNav.module.css";
import { useCart } from "./cart/useCart";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(mq.matches);
    update();

    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export default function HaloNav({ ready = false }) {
  const reduced = useReducedMotion();

  // ✅ cart
  const { itemCount, openCart } = useCart();

  // Hero sentinel が見えなくなったら docked=true
  const [docked, setDocked] = useState(false);

  // 現在地（active）
  const [active, setActive] = useState("top");

  // ---- Focus mode (idle dim) ----
  const [idle, setIdle] = useState(false);
  const idleTimerRef = useRef(null);

  // ---- Hamburger ----
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  const wake = useCallback(() => {
    setIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => setIdle(true), 2400);
  }, []);

  // readyになってからだけ“上映中モード”監視
  useEffect(() => {
    if (!ready) return;

    wake();

    const onActivity = () => wake();
    window.addEventListener("pointermove", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("wheel", onActivity, { passive: true });
    window.addEventListener("touchstart", onActivity, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("wheel", onActivity);
      window.removeEventListener("touchstart", onActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [ready, wake]);

  const dim = ready && idle;

  const NAV = useMemo(
    () => [
      { no: "01", en: "Tonight", jp: "はじまり", target: "top" },
      { no: "02", en: "Mood", jp: "世界観", target: "concept" },
      { no: "03", en: "Easy", jp: "すぐ始まる", target: "setup" },
      { no: "04", en: "Product", jp: "製品", target: "product" },
      { no: "05", en: "Scene", jp: "夜の過ごし方", target: "scenes" },
      { no: "06", en: "Detail", jp: "精度と静けさ", target: "spec" },
      { no: "07", en: "FAQ", jp: "よくあること", target: "faq" },
{ no: "08", en: "Lineup", jp: "選ぶ", target: "lineup" },
{ no: "09", en: "Contact", jp: "相談", target: "contact" },
    ],
    []
  );

  // dock 判定：Hero末尾 sentinel
  useEffect(() => {
    let io;
    let raf = 0;
    let tries = 0;

    const tryAttach = () => {
      const el = document.getElementById("halo-hero-sentinel");
      if (el) {
        io = new IntersectionObserver(
          ([entry]) => setDocked(!entry.isIntersecting),
          { threshold: 0, rootMargin: "0px" }
        );
        io.observe(el);
        return;
      }

      tries += 1;
      if (tries < 12) raf = requestAnimationFrame(tryAttach);
      else setDocked(true);
    };

    raf = requestAnimationFrame(tryAttach);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (io) io.disconnect();
    };
  }, []);

  // active
  useEffect(() => {
    const targets = NAV.filter((n) => n.target !== "top")
      .map((n) => document.getElementById(n.target))
      .filter(Boolean);

    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible.length) setActive(visible[0].target.id);
      },
      {
        threshold: [0, 0.12, 0.24, 0.36, 0.48, 0.6],
        rootMargin: "-38% 0px -56% 0px",
      }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [NAV]);

  // 先頭付近 top
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.35) setActive("top");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // メニュー開いてる間 lock + Esc
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  const go = (target) => {
    wake();
    closeMenu();

    const smooth = reduced ? "auto" : "smooth";

    if (target === "top") {
      window.scrollTo({ top: 0, behavior: smooth });
      return;
    }

    const el = document.getElementById(target);
    if (!el) return;

    const TOP_OFFSET = 92;
    const y = el.getBoundingClientRect().top + window.scrollY - TOP_OFFSET;

    window.scrollTo({ top: Math.max(0, y), behavior: smooth });
  };

  const renderHeroItems = () => (
    <div className={styles.items}>
      {NAV.map((item) => {
        const isActive = active === item.target;
        return (
          <button
            key={item.no}
            type="button"
            className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
            onClick={() => go(item.target)}
            aria-current={isActive ? "page" : undefined}
          >
            <span className={styles.scan} aria-hidden="true" />
            <span className={styles.no}>{item.no}</span>

            <span className={styles.texts}>
              <span className={styles.en}>{item.en}</span>
              <span className={styles.jp}>{item.jp}</span>
            </span>
          </button>
        );
      })}
    </div>
  );

  // ready=false は完全に消す
  const barClass = (base) => {
    if (!ready) return [base, styles.hide].join(" ");

    const isHero = base === styles.heroBar;
    const isDock = base === styles.dockMini;
    const shouldShow = (isHero && !docked) || (isDock && docked);

    return [
      base,
      styles.ready,
      dim ? styles.dim : "",
      shouldShow ? styles.show : styles.hide,
    ].join(" ");
  };

  const activeLabel = NAV.find((n) => n.target === active)?.en ?? "Menu";

  return (
    <>
      {/* Hero中：下ナビ */}
      <nav
        className={barClass(styles.heroBar)}
        aria-label="HALO hero navigation"
        onPointerEnter={wake}
        onFocus={wake}
      >
        <div className={styles.inner}>
          <div className={styles.metaLeft}>
            <span className={styles.metaEyebrow}>HALO</span>
            <span className={styles.metaText}>for quiet nights</span>
          </div>

          {renderHeroItems()}

          <div className={styles.metaRight}>
            <span className={styles.metaEyebrow}>MENU</span>
            <span className={styles.metaText}>night selection</span>
          </div>
        </div>
      </nav>

      {/* Hero外：右上ドック（CART + MENU） */}
      <nav
        className={barClass(styles.dockMini)}
        aria-label="HALO navigation"
        onPointerEnter={wake}
        onFocus={wake}
      >
        <div className={styles.miniInner}>
          <div className={styles.miniBrand}>
            <span className={styles.miniHalo}>HALO</span>
            <span className={styles.miniNow}>{activeLabel}</span>
          </div>

          {/* ✅ CART（ここに寄せて距離問題を消す） */}
          <button
            type="button"
            className={styles.cartBtn}
            onClick={() => {
              wake();
              openCart();
            }}
            aria-label={`Open cart (${itemCount})`}
          >
            <span className={styles.cartLabel}>CART</span>
            {itemCount > 0 ? <span className={styles.cartBadge}>{itemCount}</span> : null}
          </button>

          <button
            type="button"
            className={`${styles.menuBtn} ${open ? styles.menuBtnOpen : ""}`}
            onClick={() => {
              wake();
              toggleMenu();
            }}
            aria-expanded={open}
            aria-controls="halo-menu-panel"
            aria-label="Open menu"
          >
            <span className={styles.menuBtnLabel}>{open ? "CLOSE" : "MENU"}</span>

            <span className={styles.menuGlyph} aria-hidden="true">
              <span className={styles.menuStroke} />
              <span className={styles.menuStroke} />
            </span>
          </button>
        </div>
      </nav>

      {/* overlay */}
      <button
        type="button"
        className={`${styles.backdrop} ${open ? styles.open : ""}`}
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
      />

      <div
        id="halo-menu-panel"
        className={`${styles.panel} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="HALO menu"
      >
        <div className={styles.panelHeader}>
          <div className={styles.panelBrand}>
            <span className={styles.panelEyebrow}>MENU</span>
            <span className={styles.panelTitle}>night selection</span>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span />
            <span />
          </button>
        </div>

        <div className={styles.panelItems}>
          {NAV.map((item) => {
            const isActive = active === item.target;
            return (
              <button
                key={item.no}
                type="button"
                className={`${styles.panelItem} ${isActive ? styles.panelItemActive : ""}`}
                onClick={() => go(item.target)}
              >
                <span className={styles.panelNo}>{item.no}</span>
                <span className={styles.panelTexts}>
                  <span className={styles.panelEn}>{item.en}</span>
                  <span className={styles.panelJp}>{item.jp}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ✅ panelBuyは削除（BUY二重問題の根） */}
      </div>
    </>
  );
}