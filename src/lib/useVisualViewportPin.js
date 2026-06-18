import { useEffect } from "react";

/**
 * Mobile Safari (especially iOS 26/27 betas) pins position:fixed to the layout
 * viewport while the visual viewport shrinks when chrome hides or the keyboard
 * opens (WebKit 297779). Bottom docks use a vv-sized frame: --vv-top +
 * --vv-height on the fixed shell, pill anchored inside via flex-end — no
 * transform on the fixed node. Backdrop deliberately does not use these vars.
 */
export function useVisualViewportPin() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const root = document.documentElement;
    let raf = 0;

    function apply() {
      raf = 0;
      const top = Math.max(0, Math.round(vv.offsetTop));
      const height = Math.max(0, Math.round(vv.height));
      const inset = Math.max(0, Math.round(root.clientHeight - height - top));

      root.style.setProperty("--vv-top", `${top}px`);
      root.style.setProperty("--vv-height", `${height}px`);
      root.style.setProperty("--vvb", `${inset}px`);
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(apply);
    }

    apply();
    vv.addEventListener("resize", schedule);
    vv.addEventListener("scroll", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("orientationchange", schedule);

    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener("resize", schedule);
      vv.removeEventListener("scroll", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("orientationchange", schedule);
      root.style.removeProperty("--vv-top");
      root.style.removeProperty("--vv-height");
      root.style.removeProperty("--vvb");
    };
  }, []);
}
