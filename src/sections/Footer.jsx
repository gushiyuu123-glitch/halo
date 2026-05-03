import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Footer.module.css";
import SankouSection from "../components/motion/SankouSection";

const CREDITS = [
  { role: "A NIGHT", name: "HALO" },
  { role: "CONCEPT", name: "Home Projector Experience" },
  { role: "DESIGN", name: "Dark Luxury / Film-like Veil" },
  { role: "RHYTHM", name: "Fade / Pause / Resolve" },
  { role: "TYPE", name: "Noto Serif JP / Inter" },
  { role: "SCENE", name: "Movie / Music / Off Time" },
  { role: "DETAIL", name: "Precision & Restraint" },
  { role: "END", name: "The room returns to night." },
];

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

export default function Footer() {
  const reduced = useReducedMotion();

  const sankouOptions = useMemo(
    () => ({
      idPrefix: "footer",
      flare: false,
      depth: true,

      start: "top 86%",

      veilFrom: 0.14,
      veilTo: 0.06,
      veilDur: 1.0,

      depthBgYPercent: -4,
      depthScrub: 1.08,

      tTitle: 0.18,
      tCopy: 0.34,
    }),
    []
  );

  // ✅ Footerに入ったらエンドロール再生
  const stageRef = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduced) {
      setPlay(false);
      return;
    }

    const el = stageRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setPlay(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.28,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <SankouSection
      as="footer"
      id="footer"
      className={`${styles.footer} ${play ? styles.isPlay : ""}`}
      aria-label="HALO end credits"
      options={sankouOptions}
    >
      {/* 背景ワード（完全に背景） */}
      <div className={styles.bgWord} data-sankou="bg" aria-hidden="true">
        CREDITS
      </div>

      {/* セクション全体の膜（Sankou用） */}
      <div className={styles.veil} data-sankou="veil" aria-hidden="true" />

      {/* 上の小ヘッダだけは枠内でOK */}
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.number} data-sankou="number">
            10
          </p>

          <div className={styles.kickerRow} data-sankou="kickerRow">
            <span className={styles.kicker}>END ROLL</span>
            <span
              className={styles.kickerLine}
              data-sankou="kickerLine"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* ✅ 迫力の本体：横幅制限なし（100vw） */}
      <div
        ref={stageRef}
        className={styles.creditsStage}
        aria-label="End credits stage"
      >
        <div className={styles.creditsRoll} data-sankou="copy">
          <div className={styles.rollBlock}>
            <p className={styles.statement}>いつもの夜が、スクリーンになる。</p>
            <p className={styles.sub}>HALO / Home Projector Experience</p>

            <div className={styles.creditsList} aria-label="Credits list">
              {CREDITS.map((item, i) => (
                <div className={styles.creditRow} key={`${item.role}-${i}`}>
                  <span className={styles.role}>{item.role}</span>
                  <span className={styles.name}>{item.name}</span>
                </div>
              ))}
            </div>

            <p className={styles.endMark}>— END —</p>
          </div>

          {/* duplicate（ループ用） */}
          <div className={styles.rollBlock} aria-hidden="true">
            <p className={styles.statement}>いつもの夜が、スクリーンになる。</p>
            <p className={styles.sub}>HALO / Home Projector Experience</p>

            <div className={styles.creditsList}>
              {CREDITS.map((item, i) => (
                <div className={styles.creditRow} key={`dup-${item.role}-${i}`}>
                  <span className={styles.role}>{item.role}</span>
                  <span className={styles.name}>{item.name}</span>
                </div>
              ))}
            </div>

            <p className={styles.endMark}>— END —</p>
          </div>
        </div>
      </div>

      {/* 下部UIは枠内 */}
      <div className={styles.inner}>
        <a className={styles.toTop} href="#" data-sankou="meta">
          TOPへ戻る
        </a>

        <div className={styles.creditBar}>
          <nav className={styles.miniLinks} aria-label="Footer links">
            <a className={styles.miniLink} href="#" aria-label="利用規約（準備中）">
              Terms
            </a>
            <span className={styles.sep} aria-hidden="true" />
            <a
              className={styles.miniLink}
              href="#"
              aria-label="プライバシーポリシー（準備中）"
            >
              Privacy
            </a>
          </nav>

          <p className={styles.copyRight}>© HALO</p>
        </div>
      </div>

      {/* ✅ Creator links（最下部固定） */}
      <div className={styles.creatorFixed} aria-label="Creator links">
        <a
          className={styles.creatorLink}
          href="https://gushikendesign.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="沖縄のWeb制作・Webデザイン｜GUSHIKEN DESIGN（本拠地）"
        >
          GUSHIKEN DESIGN（本拠地）
        </a>

        <a
          className={styles.creatorLink}
          href="https://note.com/noahgushi123"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="制作記録・ポートフォリオ｜note"
        >
          制作記録｜note
        </a>
      </div>
    </SankouSection>
  );
}