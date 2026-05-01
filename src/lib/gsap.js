import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Coalesce rapid refresh calls into one rAF — ScrollTrigger.refresh() is layout-heavy. */
let scrollTriggerRefreshRaf = 0;
export function queueScrollTriggerRefresh() {
  if (scrollTriggerRefreshRaf) return;
  scrollTriggerRefreshRaf = requestAnimationFrame(() => {
    scrollTriggerRefreshRaf = 0;
    ScrollTrigger.refresh();
  });
}

export { gsap, ScrollTrigger };
