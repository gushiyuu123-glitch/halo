import { useMemo } from "react";
import styles from "./Scenes.module.css";
import SankouSection from "../components/motion/SankouSection";

export default function Scenes() {
  const sankouOptions = useMemo(
    () => ({
      idPrefix: "scenes",
      flare: true,
      depth: true,

      start: "top 88%",
      imgY: 96,
      imgScale: 1.09,

      /* 映画っぽい暗さと締まり */
      imgFromFilter: "brightness(0.40) contrast(1.18) saturate(0.72)",
      imgToFilter: "brightness(0.68) contrast(1.12) saturate(0.84)",

      /* 膜を少し残して深さを出す */
      veilFrom: 0.82,
      veilTo: 0.12,

      /* フレアは上品に抑える */
      flarePeak: 0.28,

      depthImageYPercent: -2.2,
      depthBgYPercent: -10,

      tTitle: 0.16,
      tCopy: 0.34,
    }),
    []
  );

  const sceneImage = "/images/halo-scene-main1.jpeg";

  return (
    <SankouSection
      id="scenes"
      className={styles.scenes}
      aria-label="HALO scenes section"
      options={sankouOptions}
    >
      <div className={styles.stage}>
        <div className={styles.bgWord} data-sankou="bg" aria-hidden="true">
          SCENE
        </div>



<picture>
  <source
    media="(max-width: 640px)"
    srcSet="/images/halo-scene-main1-portrait.jpeg"
  />
  <img
    data-sankou="image"
    src={sceneImage}
    alt="HALOが夜の部屋に映像を映し出し、人物がくつろいでいるシーン"
    className={styles.heroImage}
    decoding="async"
    loading="lazy"
    draggable="false"
  />
</picture>

        <div className={styles.imageVeil} data-sankou="veil" aria-hidden="true" />
        <div className={styles.imageFlare} data-sankou="flare" aria-hidden="true" />
        <div className={styles.atmosphere} aria-hidden="true" />

        <div className={styles.topBar}>
          <p className={styles.number} data-sankou="number">
            05
          </p>

          <div className={styles.kickerRow} data-sankou="kicker">
            <span className={styles.kicker}>SCENE</span>
            <span
              className={styles.kickerLine}
              data-sankou="kickerLine"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={styles.copyBlock}>
          <h2 className={styles.title} data-sankou="title">
            <span className={styles.titleSub}>夜の過ごし方が、</span>
            <span className={styles.titleMainLine}>変わる。</span>
          </h2>

          {/* ✅ コピー改善：「静か」「整う」禁止。結果とシーンで言い切る */}
          <p className={styles.lead} data-sankou="copy">
            映画を見る夜も、音楽を流す時間も。
            <br />
            何もしない時間さえ、スクリーンがあると景色が変わる。
            <br />
            HALOは、部屋を“過ごしたくなる場所”へ連れていきます。
          </p>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.meta} data-sankou="meta" aria-label="scene highlights">
            <span className={styles.metaItem}>
              <span className={styles.metaNo}>01</span>
              <span className={styles.metaText}>Movie</span>
            </span>
            <span className={styles.metaItem}>
              <span className={styles.metaNo}>02</span>
              <span className={styles.metaText}>Music</span>
            </span>
            <span className={styles.metaItem}>
              <span className={styles.metaNo}>03</span>
              <span className={styles.metaText}>Off Time</span>
            </span>
          </div>

          <p className={styles.imageLabel} data-sankou="label">
            MOVIE / MUSIC / OFF TIME
          </p>
        </div>
      </div>
    </SankouSection>
  );
}