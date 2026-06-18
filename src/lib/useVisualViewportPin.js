import { useEffect } from "react";

/**
 * iOS Safari pins position:fixed to the layout viewport. When browser chrome
 * shows/hides on scroll, bottom docks need a small bottom offset (--vvb) so
 * they stay on the visible screen. The backdrop deliberately does not use this.
 */
export function useVisualViewportPin() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const root = document.documentElement;
    let raf = 0;

    function apply() {
      raf = 0;
      const inset = root.clientHeight - vv.height - vv.offsetTop;
      root.style.setProperty("--vvb", `${Math.max(0, Math.round(inset))}px`);
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(apply);
    }

    apply();
    vv.addEventListener("resize", schedule);
    vv.addEventListener("scroll", schedule);
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener("resize", schedule);
      vv.removeEventListener("scroll", schedule);
      window.removeEventListener("scroll", schedule);
      root.style.removeProperty("--vvb");
    };
  }, []);
}
