import { useMemo, useState, useCallback } from "react";
import styles from "./Faq.module.css";
import SankouSection from "../components/motion/SankouSection";

const FAQS = [
  {
    q: "壁が白くなくても大丈夫？",
    a: (
      <>
        大丈夫です。HALOは「完璧な白壁」を前提にしません。
        <br />
        まずは明るすぎない壁やカーテンなど、落ち着いた面に合わせるのがおすすめです。
        <br />
        夜は灯りを少し落とすだけで、見え方が一段整います。
      </>
    ),
  },
  {
    q: "距離が取れない部屋でも映る？",
    a: (
      <>
        映せます。無理に大画面を狙わず、部屋のサイズに合う“ちょうどいい大きさ”にするのがコツ。
        <br />
        小さめでも、像が整っている方が映画っぽく感じます。
      </>
    ),
  },
  {
    q: "昼間でも使える？（夜向け？）",
    a: (
      <>
        使えます。ただ、HALOがいちばん綺麗に見えるのは夜です。
        <br />
        昼は遮光カーテンや照明を抑えるだけで、体験がぐっと近づきます。
      </>
    ),
  },
  {
    q: "動作音は気になる？",
    a: (
      <>
        静かな夜でも“邪魔になりにくい”設計を想定しています。
        <br />
        音が主張しないように、使い方そのものもシンプルに整えています。
      </>
    ),
  },
  {
    q: "音は外に漏れない？",
    a: (
      <>
        音量次第です。夜は「大きくする」より「整える」方向が相性いい。
        <br />
        低めの音量でも、雰囲気は十分に作れます。
      </>
    ),
  },
  {
    q: "準備は本当に簡単？",
    a: (
      <>
        置く、つなぐ、灯りを落とす。
        <br />
        その手順だけで“上映に入れる”ように、余計な手間を増やさない前提で作っています。
      </>
    ),
  },
  {
    q: "映画以外にも使える？",
    a: (
      <>
        使えます。音楽を流す時間、静かな映像を置く時間、何もしない夜にも。
        <br />
        「部屋が過ごしたくなる場所になる」ことが、HALOの主役です。
      </>
    ),
  },
];

export default function Faq() {
  const sankouOptions = useMemo(
    () => ({
      idPrefix: "faq",
      flare: false,
      depth: true,

      start: "top 82%",

      // 文章章：膜で少しだけ整える（強すぎ禁止）
      veilFrom: 0.22,
      veilTo: 0.10,
      veilDur: 1.05,

      depthBgYPercent: -7,
      depthScrub: 1.05,

      tTitle: 0.18,
      tCopy: 0.32,
    }),
    []
  );
// 変更前：useState(0)
const [openIndex, setOpenIndex] = useState(-1); // ✅ 初期は全部閉じ

  const toggle = useCallback((i) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  }, []);

  return (
    <SankouSection
      id="faq"
      className={styles.faq}
      aria-label="HALO FAQ section"
      options={sankouOptions}
    >
      <div className={styles.bgWord} data-sankou="bg" aria-hidden="true">
        NOTES
      </div>

      <div className={styles.veil} data-sankou="veil" aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.number} data-sankou="number">
            07
          </p>

          <div className={styles.kickerRow} data-sankou="kicker">
            <span className={styles.kicker}>FAQ</span>
            <span
              className={styles.kickerLine}
              data-sankou="kickerLine"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title} data-sankou="title">
            <span className={styles.titleSub}>よくあること。</span>
            <span className={styles.titleMainLine}>迷いを残さないために。</span>
          </h2>

          <p className={styles.lead} data-sankou="copy">
            買う直前に浮かびやすい不安だけを、短くまとめました。
            <br />
            “整う夜”が崩れないように、答えも静かに置いています。
          </p>

          <div className={styles.list} data-sankou="meta" aria-label="FAQ list">
            {FAQS.map((item, i) => {
              const open = i === openIndex;
              const panelId = `faq-panel-${i}`;
              return (
                <div
                  key={item.q}
                  className={`${styles.item} ${open ? styles.itemOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.qBtn}
                    onClick={() => toggle(i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span className={styles.qNo}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.qText}>{item.q}</span>
                    <span className={styles.glyph} aria-hidden="true" />
                  </button>

                  <div
                    id={panelId}
                    className={styles.answerWrap}
                    aria-hidden={!open}
                  >
                    <div className={styles.answerInner}>
                      <p className={styles.answer}>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className={styles.note} data-sankou="meta">
            ここで迷いが消えたら、次は「迎える」だけです。
          </p>
        </div>
      </div>

      <div className={styles.rail} data-sankou="rail" aria-hidden="true" />
    </SankouSection>
  );
}