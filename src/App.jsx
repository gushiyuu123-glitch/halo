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

export default function App() {
  const reduced = useReducedMotion();
  const [navReady, setNavReady] = useState(false);
  const navTimerRef = useRef(0);

  useEffect(() => {
    if (reduced) {
      setNavReady(true);
      return;
    }

    const NAV_DELAY_MS = 3400;

    const raf = requestAnimationFrame(() => {
      navTimerRef.current = window.setTimeout(() => setNavReady(true), NAV_DELAY_MS);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
      navTimerRef.current = 0;
    };
  }, [reduced]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) refresh();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
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

      {/* ✅ openのときだけ描画される */}
      <CartModal />
    </CartProvider>
  );
}