import { useMemo } from "react";
import styles from "./Product.module.css";
import SankouSection from "../components/motion/SankouSection";

export default function Product() {
  const sankouOptions = useMemo(
    () => ({
      flare: true,
      depth: true,

      start: "top 80%",
      imgY: 70,
      imgScale: 1.055,

      veilFrom: 0.62,
      veilTo: 0.10,
      flarePeak: 0.30,

      depthImageYPercent: -2.8,
      depthBgYPercent: -9,

      tTitle: 0.32,
      tCopy: 0.58,
    }),
    []
  );

  const productImage = "/images/halo-product-hand.jpeg";

  return (
    <SankouSection
      id="product"
      className={styles.product}
      aria-label="HALO product section"
      options={sankouOptions}
    >
      <div className={styles.bgWord} data-sankou="bg" aria-hidden="true">
        OBJECT
      </div>

      <div className={styles.grid}>
        <div className={styles.contentArea}>
          <p className={styles.number} data-sankou="number">
            04
          </p>

          <div className={styles.kickerRow} data-sankou="kicker">
            <span className={styles.kicker}>PRODUCT</span>
            <span
              className={styles.kickerLine}
              data-sankou="kickerLine"
              aria-hidden="true"
            />
          </div>

          <h2 className={styles.title} data-sankou="title">
            <span className={styles.titleSub}>置きっぱなしで、</span>
            <span className={styles.titleMainLine}>美しい。</span>
          </h2>

          <p className={styles.lead} data-sankou="copy">
            使わない時間も、部屋の空気を壊さない。
            <br />
            光も音も、静かに整えていくための道具。
          </p>

          {/* “項目入れまくる”禁止：3つだけ */}
          <div
            className={styles.facts}
            data-sankou="meta"
            aria-label="product highlights"
          >
            <div className={styles.fact}>
              <span className={styles.factNo}>01</span>
              <span className={styles.factText}>静かな動作音</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factNo}>02</span>
              <span className={styles.factText}>小さく、置きやすい</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factNo}>03</span>
              <span className={styles.factText}>夜に馴染む光</span>
            </div>
          </div>
        </div>

        <div className={styles.imageArea}>
          <img
            data-sankou="image"
            src={productImage}
            alt="手元で操作できるコンパクトなHALOプロジェクター"
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
          <p className={styles.imageLabel} data-sankou="label">
            HAND / MATERIAL / NIGHT
          </p>
        </div>
      </div>

      <div className={styles.rail} data-sankou="rail" aria-hidden="true" />
    </SankouSection>
  );
}