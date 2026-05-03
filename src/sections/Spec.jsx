import { useMemo } from "react";
import styles from "./Spec.module.css";
import SankouSection from "../components/motion/SankouSection";

export default function Spec() {
  const sankouOptions = useMemo(
    () => ({
      idPrefix: "spec",

      flare: false,
      depth: true,

      start: "top 80%",

      // 右画像は“証拠”。動かしすぎず、出方だけ整える
      imgY: 38,
      imgScale: 1.03,
      imgFromFilter: "brightness(0.52) contrast(1.10) saturate(0.82)",
      imgToFilter: "brightness(0.68) contrast(1.12) saturate(0.88)",

      // セクション全体の膜（映写室の黒）
      veilFrom: 0.26,
      veilTo: 0.10,
      veilDur: 1.15,

      depthBgYPercent: -8,
      depthImageYPercent: -1.0,
      depthScrub: 1.15,

      tTitle: 0.18,
      tCopy: 0.34,
    }),
    []
  );

  const detailImage = "/images/halo-spec-detail.jpeg";

  return (
    <SankouSection
      id="spec"
      className={styles.spec}
      aria-label="HALO spec section"
      options={sankouOptions}
    >
      <div className={styles.bgWord} data-sankou="bg" aria-hidden="true">
        DETAIL
      </div>

      <div className={styles.veil} data-sankou="veil" aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.number} data-sankou="number">
            06
          </p>

          <div className={styles.kickerRow} data-sankou="kickerRow">
            <span className={styles.kicker}>DETAIL</span>
            <span
              className={styles.kickerLine}
              data-sankou="kickerLine"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.body}>
            <h2 className={styles.title} data-sankou="title">
              <span className={styles.titleSub} data-sankou="titleSub">
                精度と品。
              </span>
              <span className={styles.titleMainLine} data-sankou="titleLine">
                夜に寄り添う設計。
              </span>
            </h2>

            {/* ✅ 文章：短く、結果で言い切る（静か/整う なし） */}
            <div className={styles.copy} data-sankou="copy">
              <p>
                HALOが優先したのは、数値のアピールではありません。
                <br />
                眩しさを抑えて、輪郭を出す。暗さの中で映像を締める。
              </p>

              <p>
                音は主張しない。操作は迷わせない。
                <br />
                触れば分かる動線で、画面に集中できる状態をつくります。
              </p>

              <p>
                使わない時間も、置いたまま成立する。
                <br />
                素材と形まで含めて、部屋の印象を邪魔しません。
              </p>
            </div>

            <p className={styles.note} data-sankou="meta">
              迷いやすい点は、このあと「よくあること」にまとめました。
            </p>
          </div>

          <div className={styles.imageCol}>
            <figure className={styles.imageFrame}>
              <img
                src={detailImage}
                alt="HALOの素材感と佇まいが伝わるディテール写真"
                className={styles.detailImage}
                data-sankou="image"
                decoding="async"
                loading="lazy"
                draggable="false"
              />
              <div className={styles.imageShade} aria-hidden="true" />
              <div className={styles.imageEdgeGlow} aria-hidden="true" />
            </figure>
          </div>
        </div>
      </div>

      <div className={styles.rail} data-sankou="rail" aria-hidden="true" />
    </SankouSection>
  );
}