import { useEffect } from "react";

const VV_VARS = ["--vv-top", "--vv-left", "--vv-height", "--vv-width", "--vvb"];

/**
 * Mirror the visual viewport into CSS custom properties so bottom-fixed chrome
 * can pin to the *visible* screen on mobile Safari / Chrome Android. Layout-
 * viewport `position: fixed; bottom: 0` lags behind when browser toolbars
 * retract on scroll — the dock and glow band appear to lift off the bottom.
 *
 * Consumers size a `.vv-frame` to these vars and absolutely position bottom UI
 * inside it (top + height, no transform), which tracks toolbar show/hide without
 * pushing a tall backdrop band upward. ~0/no-op on desktop.
 */
export function useVisualViewportPin() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const root = document.documentElement;
    let raf = 0;

    function apply() {
      raf = 0;
      const top = vv.offsetTop;
      const left = vv.offsetLeft;
      const height = vv.height;
      const width = vv.width;
      const layoutH = root.clientHeight;
      const inset = layoutH - height - top;

      root.style.setProperty("--vv-top", `${top}px`);
      root.style.setProperty("--vv-left", `${left}px`);
      root.style.setProperty("--vv-height", `${height}px`);
      root.style.setProperty("--vv-width", `${width}px`);
      root.style.setProperty("--vvb", `${Math.max(0, Math.round(inset))}px`);
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
      for (const name of VV_VARS) root.style.removeProperty(name);
    };
  }, []);
}
