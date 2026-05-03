import { useMemo } from "react";
import styles from "./Setup.module.css";
import SankouSection from "../components/motion/SankouSection";

export default function Setup() {
  const sankouOptions = useMemo(
    () => ({
      idPrefix: "setup",
      flare: true,
      depth: true,

      // Conceptと湿度合わせ（霧り防止で少し抑えめ）
      veilTo: 0.10,
      flarePeak: 0.26,
    }),
    []
  );

  return (
    <SankouSection
      id="setup"
      className={styles.setup}
      aria-label="HALO setup section"
      options={sankouOptions}
    >
      <div className={styles.bgWord} data-sankou="bg" aria-hidden="true">
        EASY
      </div>

      <div className={styles.grid}>
        {/* 画像（左） */}
        <div className={styles.imageArea}>
          <img
            data-sankou="image"
            src="/images/halo-setup-human.jpeg"
            alt="HALOを設置している夜のリビングシーン"
            className={styles.heroImage}
            decoding="async"
            loading="lazy"
            draggable="false"
          />
          <div
            className={styles.imageVeil}
            data-sankou="veil"
            aria-hidden="true"
          />
          <div
            className={styles.imageFlare}
            data-sankou="flare"
            aria-hidden="true"
          />
        </div>

        {/* 文章（右） */}
        <div className={styles.contentArea}>
          <p className={styles.number} data-sankou="number">
            03
          </p>

          <div className={styles.kickerRow} data-sankou="kicker">
            <span className={styles.kicker}>SETUP</span>
            <span
              className={styles.kickerLine}
              data-sankou="kickerLine"
              aria-hidden="true"
            />
          </div>

          <h2 className={styles.title} data-sankou="title">
            <span className={styles.titleSub}>置いて、</span>
            <span className={styles.titleMainLine}>灯りを落とすだけ。</span>
          </h2>

          {/* ✅ コピー研磨（“整う/静か”封印。結果で言い切る） */}
          <p className={styles.lead} data-sankou="copy">
            準備は、迷わせません。
            <br />
            置いて、つなげば、すぐ映る。
          </p>

          {/* 3つだけ（入れまくり禁止） */}
          <div
            className={styles.steps}
            data-sankou="meta"
            aria-label="setup steps"
          >
            <div className={styles.step}>
              <span className={styles.stepNo}>01</span>
              <p className={styles.stepText}>置く。</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNo}>02</span>
              <p className={styles.stepText}>つなぐ。</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNo}>03</span>
              <p className={styles.stepText}>灯りを落とす。</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rail} data-sankou="rail" aria-hidden="true" />
    </SankouSection>
  );
}