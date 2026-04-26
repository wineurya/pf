import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap.js";

function makeSectionScrollTrigger({ el, index, isLast, setActiveIndex }) {
  return ScrollTrigger.create({
    trigger: el,
    start: isLast ? "top 75%" : "top 55%",
    end: isLast ? "max" : "bottom 45%",
    onToggle(self) {
      if (self.isActive) setActiveIndex(index);
    },
  });
}

/**
 * Syncs active index with scroll position (center-band triggers).
 * The final section uses a looser range so short terminal sections still
 * register when the page reaches its scroll end.
 * @param {string[]} sectionIds DOM ids without #
 */
export function useSectionScroll(sectionIds) {
  const [activeIndex, setActiveIndex] = useState(0);
  const key = sectionIds.join("|");

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const lastIndex = elements.length - 1;

    const triggers = elements.map((el, index) => {
      const isLast = index === lastIndex;
      return makeSectionScrollTrigger({ el, index, isLast, setActiveIndex });
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [key, sectionIds]);

  return activeIndex;
}
