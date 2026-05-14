import { useEffect, useState } from "react";

const SCROLL_SPY_IDS = ["rebuild-work", "rebuild-studio", "rebuild-process", "rebuild-faq", "rebuild-contact"];

function tabIdForScrollSection(sectionId) {
  if (sectionId === "rebuild-faq") return "rebuild-process";
  return sectionId;
}

/** Scroll-spy tab id for rebuild page (Work / Studio / Process / Contact); FAQ maps to Process. */
export function useRebuildSectionActive() {
  const [active, setActive] = useState("rebuild-work");

  useEffect(() => {
    let rafId = 0;

    const readActiveSection = () => {
      const nodes = SCROLL_SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean);
      if (!nodes.length) return;

      const doc = document.documentElement;
      const atPageEnd = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      if (atPageEnd) {
        setActive("rebuild-contact");
        return;
      }

      const markerY = window.innerHeight * 0.42;
      let best = nodes[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        const containsMarker = rect.top <= markerY && rect.bottom >= markerY;
        const distance = containsMarker ? 0 : Math.min(Math.abs(rect.top - markerY), Math.abs(rect.bottom - markerY));

        if (distance < bestDistance) {
          best = node;
          bestDistance = distance;
        }
      }

      setActive(tabIdForScrollSection(best.id));
    };

    const scheduleRead = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(readActiveSection);
    };

    scheduleRead();
    window.addEventListener("scroll", scheduleRead, { passive: true });
    window.addEventListener("resize", scheduleRead);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleRead);
      window.removeEventListener("resize", scheduleRead);
    };
  }, []);

  return active;
}
