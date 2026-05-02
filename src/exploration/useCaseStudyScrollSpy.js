import { useEffect, useState } from "react";
import { ScrollTrigger, queueScrollTriggerRefresh } from "@/lib/gsap.js";

/**
 * Active-section spy for a stack of long-form case-study chapters.
 *
 * Each section's mid-band ("top center" → "bottom center") becomes the active range.
 * Pairs with `CaseStudyAside` (Framer Motion text reveal) — naturalised scroll, no snap.
 *
 * @param {string[]} sectionIds — DOM ids of `<section>` chapter wrappers, in order.
 * @returns {number} active chapter index (clamped 0..n-1).
 */
export function useCaseStudyScrollSpy(sectionIds) {
  const [activeIndex, setActiveIndex] = useState(0);
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    const ids = idsKey.split("|").filter(Boolean);
    if (ids.length === 0) return undefined;

    const triggers = [];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
        }),
      );
    });

    queueScrollTriggerRefresh();

    /** Read live state immediately so SSR / refresh / deep-link mid-page doesn't show wrong chapter. */
    const initiallyActive = triggers.findIndex((t) => t.isActive);
    if (initiallyActive >= 0) setActiveIndex(initiallyActive);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [idsKey]);

  return activeIndex;
}
