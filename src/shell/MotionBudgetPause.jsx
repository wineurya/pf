import { useEffect } from "react";

/**
 * When the tab is backgrounded, pause infinite CSS animations inside `.site-canvas`
 * (stack marquees, headline drift, availability pulse, case study Focus rail) to avoid
 * sustained CPU/GPU work while the document is not visible.
 */
export function MotionBudgetPause() {
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      if (document.visibilityState !== "visible") root.setAttribute("data-motion-paused", "");
      else root.removeAttribute("data-motion-paused");
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      root.removeAttribute("data-motion-paused");
    };
  }, []);
  return null;
}
