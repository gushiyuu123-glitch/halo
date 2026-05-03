import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(mq.matches);
    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }

    mq.addListener?.(update);
    return () => mq.removeListener?.(update);
  }, []);

  return reduced;
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }

    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  const heroImage = "/images/halo-hero-full6.jpeg";
  const on = reduced || ready;

  return (
    <section
      className={`relative overflow-hidden bg-night ${styles.hero} ${
        on ? styles.isOn : ""
      }`}
      aria-label="HALO hero"
    >
      {/* image stage */}
      <div className={styles.stage} aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          draggable="false"
          className={styles.image}
        />

        <div className={styles.baseTone} />
        <div className={styles.projectorWash} />
        <div className={styles.projectorCore} />
        <div className={styles.screenVeil} />
        <div className={styles.leftVeil} />
        <div className={styles.bottomShade} />
        <div className={styles.vignette} />
        <div className={styles.filmSoftness} />
        <div className={styles.grain} />
      </div>

      {/* cinematic shutter */}
      <div className={styles.shutterTop} aria-hidden="true" />
      <div className={styles.shutterBot} aria-hidden="true" />

      {/* wordmark */}
      <div className={styles.wordmarkWrap}>
        <div className={styles.wordmarkRow} role="img" aria-label="HALO">
          {["H", "A", "L", "O"].map((ch, i) => (
            <span
              key={ch}
              className={styles.wordmarkChar}
              style={{ "--i": i }}
            >
              <img
                className={styles.wordmarkSvg}
                src={`/images/${ch}.svg`}
                alt=""
                aria-hidden="true"
                decoding="async"
                draggable="false"
              />
            </span>
          ))}
        </div>

        <p className={styles.copy}>いつもの夜が、スクリーンになる。</p>
        <p className={styles.subCopy}>灯りを落とすだけで、始まる。</p>

        {/* ✅ 追加：何を売ってるか（でも世界観は壊さない） */}
<p className={styles.microCopy}>
  HALO は、部屋の空気ごと映す{" "}
  <br className={styles.spBreak} />
  “ホームプロジェクター”。
</p>
      </div>

      {/* Hero終端検知用 sentinel */}
      <div
        id="halo-hero-sentinel"
        aria-hidden="true"
        className={styles.sentinel}
      />
    </section>
  );
}