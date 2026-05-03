import { useMemo } from "react";
import styles from "./Concept.module.css";
import SankouSection from "../components/motion/SankouSection";

export default function Concept() {
  const sankouOptions = useMemo(
    () => ({
      idPrefix: "concept",
      flare: true,
      depth: true,

      // 霧っぽくなりやすいので、最終到達を少し抑えめに（安定）
      veilTo: 0.10,
      flarePeak: 0.26,
    }),
    []
  );

  return (
    <SankouSection
      id="concept"
      className={styles.concept}
      aria-label="HALO concept section"
      options={sankouOptions}
    >
      <div className={styles.bgWord} data-sankou="bg" aria-hidden="true">
        MOOD
      </div>

      <div className={styles.grid}>
        <div className={styles.contentArea}>
          <p className={styles.number} data-sankou="number">
            02
          </p>

          <div className={styles.kickerRow} data-sankou="kicker">
            <span className={styles.kicker}>CONCEPT</span>
            <span
              className={styles.kickerLine}
              data-sankou="kickerLine"
              aria-hidden="true"
            />
          </div>

          <h2 className={styles.title} data-sankou="title">
            <span className={styles.titleSub}>壁に、</span>
            <span className={styles.titleMainLine}>夜の奥行きを映す。</span>
          </h2>

          <p className={styles.lead} data-sankou="copy">
            HALOは、映像だけを大きくするための道具ではありません。
            <br />
            部屋の明るさ、壁の質感、時間の流れまで含めて、
            <br />
            いつもの夜を少しだけ特別なものへ変えていきます。
          </p>
        </div>

        <div className={styles.imageArea}>
          <img
            data-sankou="image"
            src="/images/halo-room.jpeg"
            alt="夜の部屋に置かれたHALOプロジェクター"
            className={styles.heroImage}
            decoding="async"
            loading="lazy"
            draggable="false"
          />

          <div className={styles.imageVeil} data-sankou="veil" aria-hidden="true" />
          <div className={styles.imageFlare} data-sankou="flare" aria-hidden="true" />
        </div>
      </div>

      <div className={styles.rail} data-sankou="rail" aria-hidden="true" />
    </SankouSection>
  );
}