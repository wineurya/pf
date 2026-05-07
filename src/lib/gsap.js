import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Trailing debounce — ScrollTrigger.refresh() is layout-heavy; image loads + layout bursts fire many callers. */
let scrollTriggerRefreshTimer = 0;
export function queueScrollTriggerRefresh() {
  if (scrollTriggerRefreshTimer) window.clearTimeout(scrollTriggerRefreshTimer);
  scrollTriggerRefreshTimer = window.setTimeout(() => {
    scrollTriggerRefreshTimer = 0;
    ScrollTrigger.refresh();
  }, 72);
}

export { gsap, ScrollTrigger };
