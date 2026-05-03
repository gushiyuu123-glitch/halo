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

      // 右画像は“静かな証拠”。動かしすぎず、出方だけ整える
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
                精度と静けさ。
              </span>
              <span className={styles.titleMainLine} data-sankou="titleLine">
                夜に馴染む設計。
              </span>
            </h2>

            <div className={styles.copy} data-sankou="copy">
              <p>
                HALOが目指したのは、性能を誇ることではなく、
                <br />
                夜の空気を壊さないこと。
                <br />
                映像が点いた瞬間だけでなく、その前後の時間まで含めて、
                <br />
                部屋が整っていくように設計しています。
              </p>

              <p>
                明るさは、眩しさで支配しない。
                <br />
                音は、存在感で押し出さない。
                <br />
                そして操作は、考えさせない。
                <br />
                集中や会話、沈黙のテンポに割り込まず、
                <br />
                スクリーンだけが自然に立ち上がる感覚を優先しました。
              </p>

              <p>
                使わない時間も、部屋の景色を崩さない。
                <br />
                置きっぱなしで成立する佇まいと、
                <br />
                夜に馴染む光の扱いまで含めて、
                <br />
                HALOは“道具”としての品を残します。
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