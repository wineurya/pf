import { useEffect, useState } from "react";

/** True once mounted and webfonts are in — gates the staggered entrance so type
    is prerendered and never reflows mid-animation. A safety cap reveals anyway
    if a font is slow, so the page is never blocked on the network. */
export function useReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;

    const reveal = () => {
      if (cancelled) return;
      raf = requestAnimationFrame(() => {
        if (!cancelled) setReady(true);
      });
    };

    const fonts = typeof document !== "undefined" ? document.fonts : null;
    if (fonts && fonts.status !== "loaded" && typeof fonts.ready?.then === "function") {
      const cap = window.setTimeout(reveal, 1200);
      fonts.ready.then(() => {
        window.clearTimeout(cap);
        reveal();
      });
      return () => {
        cancelled = true;
        window.clearTimeout(cap);
        cancelAnimationFrame(raf);
      };
    }

    reveal();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return ready;
}

/** Reactive `prefers-reduced-motion` flag. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
