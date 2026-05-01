import { createContext, useContext, useEffect, useState } from "react";
import { initLenis } from "@/lib/lenis.js";
import { queueScrollTriggerRefresh } from "@/lib/gsap.js";

const LenisContext = createContext(null);

function tryLenisResize(instance) {
  if (!instance) return;
  try {
    instance.resize();
  } catch {
    /* ignore */
  }
}

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const { lenis: instance, destroy } = initLenis();
    setLenis(instance);
    return () => {
      destroy();
      setLenis(null);
    };
  }, []);

  /** bfcache restore (browser back/forward) — Lenis + ScrollTrigger can be stale. */
  useEffect(() => {
    const onPageShow = (e) => {
      if (!e.persisted) return;
      tryLenisResize(lenis);
      requestAnimationFrame(() => queueScrollTriggerRefresh());
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
