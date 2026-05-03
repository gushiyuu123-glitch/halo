import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./CartModal.module.css";
import { useCart } from "./useCart";

function formatJPY(n) {
  try {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `¥${Math.round(n).toLocaleString("ja-JP")}`;
  }
}

function getFocusable(root) {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  );
}

export default function CartModal() {
  const { open, closeCart, items, subtotal, inc, dec, removeItem, clear } = useCart();
  const [mounted, setMounted] = useState(false);

  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // scroll lock + focus trap
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus?.();
    }, 0);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeCart();
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = getFocusable(panelRef.current);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || active === panelRef.current) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeCart]);

  if (!mounted || !open) return null;

  const empty = items.length === 0;
  const shippingNote = "送料・到着目安は購入ページで確認できます。";

  const ui = (
    <>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close cart"
        onClick={closeCart}
      />

      <section
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        ref={panelRef}
      >
        <div className={styles.panelVeil} aria-hidden="true" />

        <header className={styles.head}>
          <div className={styles.headLeft}>
            <p className={styles.kicker}>CART</p>
            <p className={styles.title}>迎える準備</p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.close}
            onClick={closeCart}
            aria-label="Close"
          >
            <span />
            <span />
          </button>
        </header>

        <div className={styles.body}>
          {empty ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>まだ何も入っていません。</p>
              <p className={styles.emptyText}>
                「迎える」から始めると、このままスムーズです。
              </p>

              <button type="button" className={styles.ghostBtn} onClick={closeCart}>
                画面に戻る
              </button>
            </div>
          ) : (
            <>
              <ul className={styles.list} aria-label="Cart items">
                {items.map((x) => (
                  <li key={x.id} className={styles.item}>
                    <div className={styles.itemLeft}>
                      {x.image ? (
                        <img className={styles.thumb} src={x.image} alt="" />
                      ) : (
                        <div className={styles.thumbPh} aria-hidden="true" />
                      )}

                      <div className={styles.itemInfo}>
                        <p className={styles.itemName}>{x.name}</p>
                        {x.meta ? <p className={styles.itemMeta}>{x.meta}</p> : null}
                        <p className={styles.itemPrice}>{formatJPY(x.price)}</p>
                      </div>
                    </div>

                    <div className={styles.itemRight}>
                      <div className={styles.qty}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => dec(x.id)}
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span className={styles.qtyNum} aria-label="Quantity">
                          {x.qty}
                        </span>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => inc(x.id)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => removeItem(x.id)}
                      >
                        外す
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.summary}>
                <div className={styles.row}>
                  <span className={styles.label}>小計</span>
                  <span className={styles.value}>{formatJPY(subtotal)}</span>
                </div>

                <p className={styles.note}>{shippingNote}</p>

                <div className={styles.actions}>
                  <a className={styles.primary} href="#" aria-label="Proceed to checkout (stub)">
                    <span className={styles.primaryText}>購入へ進む</span>
                    <span className={styles.primaryHint} aria-hidden="true">
                      → checkout
                    </span>
                  </a>

                  <button type="button" className={styles.secondary} onClick={clear}>
                    いったん空にする
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <footer className={styles.foot}>
          <p className={styles.footText}>
            灯りを落とせば、始まる。無理に大きくしなくていい。
          </p>
        </footer>
      </section>
    </>
  );

  return createPortal(ui, document.body);
}