import { useEffect } from "react";

/**
 * Mobile Safari (especially iOS 26/27 betas) pins position:fixed to the layout
 * viewport while the visual viewport shifts as chrome or the keyboard changes.
 * Keep the dock CSS-native at bottom: 0, then apply only a local compositor
 * offset to the dock controls when the visual viewport bottom is higher.
 */
export function useVisualViewportPin() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const root = document.documentElement;
    const selector = ".home-bottom-bar, .cs-dock";
    let raf = 0;
    let forceNext = false;
    let lastOffset = -1;

    function writeOffset(offset) {
      document.querySelectorAll(selector).forEach((el) => {
        if (offset > 0) {
          el.style.setProperty("--vv-bottom-offset", `${offset}px`);
        } else {
          el.style.removeProperty("--vv-bottom-offset");
        }
      });
    }

    function apply() {
      const force = forceNext;
      forceNext = false;
      raf = 0;
      const layoutHeight = Math.round(
        root.clientHeight || window.innerHeight || vv.height,
      );
      const viewportBottom = Math.round(vv.offsetTop + vv.height);
      const offset = Math.max(0, layoutHeight - viewportBottom);

      if (!force && offset === lastOffset) return;
      lastOffset = offset;
      writeOffset(offset);
    }

    function schedule(force = false) {
      forceNext = forceNext || force === true;
      if (!raf) raf = requestAnimationFrame(apply);
    }

    apply();
    vv.addEventListener("resize", schedule);
    vv.addEventListener("scroll", schedule);
    window.addEventListener("orientationchange", schedule);
    const observer = new MutationObserver(() => schedule(true));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener("resize", schedule);
      vv.removeEventListener("scroll", schedule);
      window.removeEventListener("orientationchange", schedule);
      observer.disconnect();
      writeOffset(0);
    };
  }, []);
}
