import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "./gsap.js";

export function initLenis() {
  const lenis = new Lenis();

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.documentElement.style.transform ? "transform" : "fixed",
  });

  const unsubscribeLenisScroll = lenis.on("scroll", ScrollTrigger.update);

  const onRefresh = () => {
    lenis.resize();
  };
  ScrollTrigger.addEventListener("refresh", onRefresh);

  const tickerFn = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  function destroy() {
    gsap.ticker.remove(tickerFn);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    unsubscribeLenisScroll();
    // Drop the viewport proxy before destroying Lenis, otherwise ScrollTrigger can
    // still call the proxy’s scrollTop and touch a dead instance (notably under
    // React StrictMode’s double mount in dev).
    ScrollTrigger.scrollerProxy(document.documentElement);
    lenis.destroy();
    ScrollTrigger.refresh();
  }

  return { lenis, destroy };
}
