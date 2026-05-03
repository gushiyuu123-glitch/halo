import { useMemo } from "react";
import styles from "./Contact.module.css";
import SankouSection from "../components/motion/SankouSection";

export default function Contact() {
  const sankouOptions = useMemo(
    () => ({
      idPrefix: "contact",
      flare: false,
      depth: true,

      start: "top 82%",

      // 主役はフォーム（光膜は薄く）
      veilFrom: 0.20,
      veilTo: 0.08,
      veilDur: 1.1,

      depthBgYPercent: -6,
      depthScrub: 1.05,

      tTitle: 0.16,
      tCopy: 0.32,
    }),
    []
  );

  return (
    <SankouSection
      id="contact"
      className={styles.contact}
      aria-label="HALO contact section"
      options={sankouOptions}
    >
      <div className={styles.bgWord} data-sankou="bg" aria-hidden="true">
        CONTACT
      </div>

      <div className={styles.veil} data-sankou="veil" aria-hidden="true" />
      <div className={styles.ghost} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.number} data-sankou="number">
            09
          </p>

          <div className={styles.kickerRow} data-sankou="kicker">
            <span className={styles.kicker}>CONTACT</span>
            <span
              className={styles.kickerLine}
              data-sankou="kickerLine"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={styles.center}>
          <h2 className={styles.title} data-sankou="title">
            <span className={styles.titleSub} data-sankou="titleSub">
              相談する。
            </span>
            <span className={styles.titleMainLine} data-sankou="titleLine">
              迷いを、ここで消す。
            </span>
          </h2>

          <p className={styles.lead} data-sankou="copy">
            在庫・配送・設置・距離感。
            <br />
            気になる点だけ、短くて大丈夫です。
          </p>

          <form
            className={styles.form}
            data-sankou="meta"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Contact form"
          >
            <div className={styles.row2}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-name">
                  お名前
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={styles.input}
                  placeholder="例）Yuto"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-email">
                  メール
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={styles.input}
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-message">
                相談内容
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={styles.textarea}
                rows={5}
                placeholder="例）白壁じゃないけど大丈夫？／距離が短い部屋でも映る？／どれを選べばいい？ など"
              />
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.primary} disabled>
                <span className={styles.primaryText}>送信する</span>
                <span className={styles.primaryHint} aria-hidden="true">
                  （準備中）
                </span>
              </button>

              <a className={styles.secondary} href="#faq">
                FAQを見る
              </a>
            </div>

            <p className={styles.note}>
              ※ デモのため送信は無効化しています。実装時はフォーム送信 / 外部決済に合わせて接続してください。
            </p>
          </form>
        </div>
      </div>

      <div className={styles.rail} data-sankou="rail" aria-hidden="true" />
    </SankouSection>
  );
}