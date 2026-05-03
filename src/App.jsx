import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HaloNav from "./components/HaloNav";
import Hero from "./sections/Hero";
import Concept from "./sections/Concept";
import Setup from "./sections/Setup";
import Product from "./sections/Product";

import Scenes from "./sections/Scenes";
import Spec from "./sections/Spec";
import Faq from "./sections/Faq";
import Lineup from "./sections/Lineup";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

/* ✅ Cart */
import { CartProvider } from "./components/cart/CartProvider";
import CartModal from "./components/cart/CartModal";

gsap.registerPlugin(ScrollTrigger);

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(mq.matches);
    update();

    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(max-width: 820px), (pointer: coarse)");
    if (!mq) return;

    const update = () => setIsMobile(mq.matches);
    update();

    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return isMobile;
}

export default function App() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  // ✅ effectを再実行しないため ref 化
  const isMobileRef = useRef(false);
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  const [navReady, setNavReady] = useState(false);
  const navTimerRef = useRef(0);

  /* =========================
     Nav show timing
     ========================= */
  useEffect(() => {
    if (reduced) {
      setNavReady(true);
      return;
    }

    const NAV_DELAY_MS = isMobile ? 2200 : 3400;

    const raf = requestAnimationFrame(() => {
      navTimerRef.current = window.setTimeout(
        () => setNavReady(true),
        NAV_DELAY_MS
      );
    });

    return () => {
      cancelAnimationFrame(raf);
      if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
      navTimerRef.current = 0;
    };
  }, [reduced, isMobile]);

  /* =========================
     ScrollTrigger stabilize (mobile-safe)
     ========================= */
  useEffect(() => {
    // ✅ SPの “resize由来refresh” を切って安定化
    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    let cancelled = false;
    let rafId = 0;

    const requestRefresh = () => {
      if (cancelled) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (cancelled) return;
        ScrollTrigger.refresh();
      });
    };

    // 初回
    requestRefresh();

    // load（画像など）
    window.addEventListener("load", requestRefresh);

    // ✅ Safari/iOSのBFCache対策（戻るでズレるやつ）
    const onPageShow = () => requestRefresh();
    window.addEventListener("pageshow", onPageShow);

    // fonts（フォントでレイアウトが変わる場合）
    // ✅ SPではやらない（パッパッの原因になりやすい）
    const fontReady = document.fonts?.ready;
    if (fontReady?.then) {
      fontReady.then(() => {
        if (cancelled) return;
        if (isMobileRef.current) return; // ← SPはスキップ
        requestRefresh();
      });
    }

    // ✅ SPは回転だけ refresh（必要最低限）
    const onOrientation = () => {
      if (!isMobileRef.current) return;
      window.setTimeout(() => {
        if (!cancelled) requestRefresh();
      }, 240);
    };
    window.addEventListener("orientationchange", onOrientation);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);

      window.removeEventListener("load", requestRefresh);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("orientationchange", onOrientation);

      // ✅ unmount時だけ全 kill
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <CartProvider>
      <main>
        <HaloNav ready={navReady} />

        <Hero />
        <Concept />
        <Setup />
        <Product />

        {/* ✅ ここから “山” */}
        <Scenes />
        <Spec />
        <Faq />
        <Lineup />
        <Contact />
        <Footer />
      </main>

      {/* ✅ openのときだけ描画 */}
      <CartModal />
    </CartProvider>
  );
}