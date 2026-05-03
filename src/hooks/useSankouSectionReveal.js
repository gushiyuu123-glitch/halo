import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * data-sankou を付けるだけで使える “像が整う” SANKOU登場セット
 * - 入口：once（scrub禁止）
 * - 奥行き：薄scrub（酔わない）
 * - HMR/StrictModeでも二重化しないように trigger を id で kill
 *
 * ✅ 対応キー（新旧両方）
 * - kickerRow / kicker
 * - titleSub + titleLine（複数） / title（h2全体）
 * - copy / meta / label など
 */
export function useSankouSectionReveal(rootRef, opts = {}) {
  useLayoutEffect(() => {
    const root = rootRef?.current;
    if (!root) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const options = {
      idPrefix: root.id || "sankou",

      start: "top 78%",
      once: true,
      fastScrollEnd: true,

      imgY: 78,
      imgScale: 1.065,
      imgDur: 1.22,
      imgEase: "power3.out",
      imgFromFilter: "brightness(0.50) contrast(1.10) saturate(0.78)",
      imgToFilter: "brightness(0.86) contrast(1.06) saturate(0.92)",

      veilFrom: 0.72,
      veilTo: 0.10,
      veilDur: 1.25,

      flare: true,
      flarePeak: 0.35,
      flareIn: 0.18,
      flareOut: 0.62,

      titleDur: 1.05,

      depth: true,
      depthImageYPercent: -4,
      depthBgYPercent: -10,
      depthScrub: 1.25,

      tKicker: 0.16,
      tLine: 0.22,
      tRail: 0.26,
      tTitle: 0.36,
      tCopy: 0.62,

      ...opts,
    };

    const baseId = options.idPrefix || root.id || "sankou";

    const killById = () => {
      ScrollTrigger.getById(`${baseId}-enter`)?.kill(true);
      ScrollTrigger.getById(`${baseId}-depth-image`)?.kill(true);
      ScrollTrigger.getById(`${baseId}-depth-bg`)?.kill(true);
    };

    // ✅ HMR/再レンダで増殖するトリガーを先に殺す
    killById();

    const q = gsap.utils.selector(root);

    // selector util（新旧キー両対応のため）
    const pick1 = (...sels) => {
      for (const sel of sels) {
        const v = q(sel)?.[0];
        if (v) return v;
      }
      return null;
    };

    const pickAll = (...sels) => {
      for (const sel of sels) {
        const arr = q(sel);
        if (arr?.length) return arr;
      }
      return [];
    };

    const el = {
      bg: pick1('[data-sankou="bg"]'),
      image: pick1('[data-sankou="image"]'),
      veil: pick1('[data-sankou="veil"]'),
      flare: pick1('[data-sankou="flare"]'),

      number: pick1('[data-sankou="number"]'),

      // ✅ kickerRow / kicker 両対応
      kickerRow: pick1('[data-sankou="kickerRow"]', '[data-sankou="kicker"]'),
      kickerLine: pick1('[data-sankou="kickerLine"]'),
      rail: pick1('[data-sankou="rail"]'),

      // ✅ 新：title（h2全体）
      title: pick1('[data-sankou="title"]'),

      // 旧：titleSub / titleLine（複数行）
      titleSub: pick1('[data-sankou="titleSub"]'),
      titleLines: pickAll('[data-sankou="titleLine"]'),

      copy: pick1('[data-sankou="copy"]'),
      label: pick1('[data-sankou="label"]'),
      meta: pick1('[data-sankou="meta"]'),
    };

    const ctx = gsap.context(() => {
      // =========================
      // Reduced motion
      // =========================
      if (prefersReduced) {
        const show = [
          el.bg,
          el.image,
          el.number,
          el.kickerRow,
          el.kickerLine,
          el.rail,

          // ✅ title（全体）も即表示
          el.title,
          el.titleSub,
          ...(el.titleLines || []),

          el.copy,
          el.label,
          el.meta,
        ].filter(Boolean);

        gsap.set(show, { autoAlpha: 1, y: 0, scale: 1, clearProps: "filter" });
        if (el.veil) gsap.set(el.veil, { autoAlpha: options.veilTo });
        if (el.flare) gsap.set(el.flare, { autoAlpha: 0 });
        return;
      }

      // =========================
      // initial
      // =========================
      if (el.bg) gsap.set(el.bg, { autoAlpha: 0, y: 16 });

      if (el.image) {
        gsap.set(el.image, {
          force3D: true,
          autoAlpha: 0,
          y: options.imgY,
          scale: options.imgScale,
          filter: options.imgFromFilter,
          willChange: "transform,opacity,filter",
        });
      }

      if (el.veil) gsap.set(el.veil, { autoAlpha: options.veilFrom, willChange: "opacity" });
      if (el.flare) gsap.set(el.flare, { autoAlpha: 0, willChange: "opacity" });

      gsap.set([el.number, el.kickerRow, el.meta].filter(Boolean), {
        autoAlpha: 0,
        y: 14,
        willChange: "transform,opacity",
      });

      if (el.kickerLine) {
        gsap.set(el.kickerLine, {
          scaleX: 0,
          transformOrigin: "left center",
          autoAlpha: 0.7,
          willChange: "transform,opacity",
        });
      }

      if (el.rail) {
        gsap.set(el.rail, {
          autoAlpha: 0,
          scaleY: 0,
          transformOrigin: "top",
          willChange: "transform,opacity",
        });
      }

      // ✅ 旧（titleSub/titleLine）
      if (el.titleSub) gsap.set(el.titleSub, { autoAlpha: 0, y: 18 });

      if (el.titleLines?.length) {
        gsap.set(el.titleLines, { autoAlpha: 0, y: 18, scale: 0.995 });
      }

      // ✅ 新：title（h2全体）…旧が無いときだけ扱う
      if (el.title && !el.titleSub && !(el.titleLines?.length)) {
        gsap.set(el.title, { autoAlpha: 0, y: 18, scale: 0.995 });
      }

      if (el.copy) gsap.set(el.copy, { autoAlpha: 0, y: 16 });
      if (el.label) gsap.set(el.label, { autoAlpha: 0, y: 10 });

      // =========================
      // enter (once)
      // =========================
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          id: `${baseId}-enter`,
          trigger: root,
          start: options.start,
          once: options.once,
          fastScrollEnd: options.fastScrollEnd,
        },
      });

      if (el.bg) {
        tl.to(el.bg, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" }, 0);
      }

      if (el.image) {
        tl.to(
          el.image,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: options.imgToFilter,
            duration: options.imgDur,
            ease: options.imgEase,
          },
          0
        );
      }

      if (el.veil) {
        tl.to(
          el.veil,
          { autoAlpha: options.veilTo, duration: options.veilDur, ease: "power2.out" },
          0.06
        );
      }

      if (options.flare && el.flare) {
        tl.to(
          el.flare,
          { autoAlpha: options.flarePeak, duration: options.flareIn, ease: "power2.out" },
          0.20
        ).to(
          el.flare,
          { autoAlpha: 0, duration: options.flareOut, ease: "power2.out" },
          0.38
        );
      }

      tl.to(
        [el.number, el.kickerRow].filter(Boolean),
        { autoAlpha: 1, y: 0, duration: 0.78, ease: "power2.out" },
        options.tKicker
      );

      if (el.kickerLine) {
        tl.to(
          el.kickerLine,
          { scaleX: 1, autoAlpha: 1, duration: 0.95, ease: "power2.out" },
          options.tLine
        );
      }

      if (el.rail) {
        tl.to(el.rail, { autoAlpha: 1, scaleY: 1, duration: 1.05 }, options.tRail);
      }

      // ✅ title（旧優先）
      if (el.titleSub) {
        tl.to(
          el.titleSub,
          { autoAlpha: 1, y: 0, duration: 0.78, ease: "power2.out" },
          options.tTitle - 0.06
        );
      }

      if (el.titleLines?.length) {
        tl.to(
          el.titleLines,
          { autoAlpha: 1, y: 0, scale: 1, duration: options.titleDur, stagger: 0.08 },
          options.tTitle
        );
      }

      // ✅ title（新）：旧が無いときだけ
      if (el.title && !el.titleSub && !(el.titleLines?.length)) {
        tl.to(
          el.title,
          { autoAlpha: 1, y: 0, scale: 1, duration: options.titleDur, ease: "power2.out" },
          options.tTitle
        );
      }

      if (el.label) {
        tl.to(
          el.label,
          { autoAlpha: 1, y: 0, duration: 0.82, ease: "power2.out" },
          options.tTitle + 0.08
        );
      }

      if (el.copy) tl.to(el.copy, { autoAlpha: 1, y: 0, duration: 0.92 }, options.tCopy);

      if (el.meta) {
        tl.to(
          el.meta,
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" },
          options.tCopy + 0.10
        );
      }

      // =========================
      // depth (subtle scrub only)
      // =========================
      if (options.depth) {
        if (el.image) {
          gsap.to(el.image, {
            yPercent: options.depthImageYPercent,
            ease: "none",
            scrollTrigger: {
              id: `${baseId}-depth-image`,
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: options.depthScrub,
            },
          });
        }

        if (el.bg) {
          gsap.to(el.bg, {
            yPercent: options.depthBgYPercent,
            ease: "none",
            scrollTrigger: {
              id: `${baseId}-depth-bg`,
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: options.depthScrub + 0.15,
            },
          });
        }
      }

      return () => {
        tl.kill();
      };
    }, root);

    return () => {
      // 念のためcleanupでもID kill
      killById();
      ctx.revert();
    };
  }, [rootRef, opts]);
}