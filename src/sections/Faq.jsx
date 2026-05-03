import { useMemo, useState, useCallback } from "react";
import styles from "./Faq.module.css";
import SankouSection from "../components/motion/SankouSection";

const FAQS = [
  {
    q: "壁が白くなくても大丈夫？",
    a: (
      <>
        大丈夫です。白壁が必須ではありません。
        <br />
        まずは「明るすぎない面」に合わせるのがおすすめです。
        <br />
        夜は照明を少し落とすだけで、コントラストが出ます。
      </>
    ),
  },
  {
    q: "距離が取れない部屋でも映る？",
    a: (
      <>
        映せます。無理に大画面を狙わず、距離に合うサイズにするのがコツ。
        <br />
        小さめでも、輪郭が出るほうが“映画っぽく”感じます。
      </>
    ),
  },
  {
    q: "昼間でも使える？（夜向け？）",
    a: (
      <>
        使えます。ただ、見え方が出やすいのは夜です。
        <br />
        昼は遮光カーテンや照明を弱めるだけで、かなり近づきます。
      </>
    ),
  },
  {
    q: "動作音は気になる？",
    a: (
      <>
        鑑賞の邪魔になりにくいよう配慮しています。
        <br />
        気になる場合は、本体を少し離す／背面に置くと体感が変わります。
      </>
    ),
  },
  {
    q: "音は外に漏れない？",
    a: (
      <>
        音量次第です。夜は「大音量」より「低めで輪郭が出る設定」が向きます。
        <br />
        心配なときは、外部スピーカーやイヤホン側で調整するのが確実です。
      </>
    ),
  },
  {
    q: "準備は本当に簡単？",
    a: (
      <>
        置く、つなぐ、灯りを落とす。
        <br />
        基本はその手順だけです。余計な手間を増やさない前提で作っています。
      </>
    ),
  },
  {
    q: "映画以外にも使える？",
    a: (
      <>
        使えます。音楽、環境映像、旅動画、写真、アート。
        <br />
        “何かを流しておくだけ”でも、部屋の印象が変わります。
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

      // 文章章：膜は薄く（強すぎ禁止）
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

  // ✅ 初期は全部閉じ
  const [openIndex, setOpenIndex] = useState(-1);

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
            <span className={styles.titleMainLine}>買う前に引っかかる点。</span>
          </h2>

          <p className={styles.lead} data-sankou="copy">
            迷いやすいところだけ、短くまとめました。
            <br />
            判断に必要な情報だけ置いています。
          </p>

          <div className={styles.list} data-sankou="meta" aria-label="FAQ list">
            {FAQS.map((item, i) => {
              const open = i === openIndex;
              const panelId = `faq-panel-${i}`;
              const qId = `faq-q-${i}`;

              return (
                <div
                  key={item.q}
                  className={`${styles.item} ${open ? styles.itemOpen : ""}`}
                >
                  <button
                    id={qId}
                    type="button"
                    className={styles.qBtn}
                    onClick={() => toggle(i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span className={styles.qNo}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.qText}>{item.q}</span>
                    <span className={styles.glyph} aria-hidden="true" />
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={qId}
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
            ここで迷いが消えたら、あとは選ぶだけです。
          </p>
        </div>
      </div>

      <div className={styles.rail} data-sankou="rail" aria-hidden="true" />
    </SankouSection>
  );
}