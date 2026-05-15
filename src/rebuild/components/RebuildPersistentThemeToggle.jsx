import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

/** Mobile sticky-nav tab pill container — defined in `RebuildAside.jsx`. */
const NAV_TABS_SELECTOR = '[data-node-id="320:474"]';
/** Breathing room between toggle's right edge and the tab pill group's left edge. */
const TOGGLE_TO_TABS_GAP = 12;
/** Fallback used when no nav has rendered yet (SSR / first paint). Matches the
 *  CSS default in `rebuild.css` so there's no visible jump on mount. */
const FALLBACK_RIGHT_OFFSET = 268;

/**
 * Measures the currently visible mobile nav tab pill group and returns the
 * exact `right` offset (in px) needed to pin the toggle just to its LEFT,
 * including the configured gap. Re-fires on:
 *  - active tab change (pill widens/narrows to fit the label) → ResizeObserver
 *    on each candidate pill group.
 *  - viewport resize (mobile ↔ desktop swap, scrollbar appears/disappears) →
 *    `resize` listener.
 * Hidden instances (display:none from the responsive split-layout breakpoint)
 * report `offsetWidth === 0` and are skipped.
 *
 * The math measures the pill's LEFT edge directly via `getBoundingClientRect`
 * — so it's agnostic to whatever padding chain the nav lives inside.
 */
function useNavToggleRightOffset() {
  const [offset, setOffset] = useState(FALLBACK_RIGHT_OFFSET);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    const tabsEls = Array.from(document.querySelectorAll(NAV_TABS_SELECTOR));

    const compute = () => {
      // Layout viewport excludes a vertical scrollbar — fixed positioning
      // uses the same coordinate system, so this aligns the toggle exactly.
      const layoutVw = document.documentElement.clientWidth;
      let pillLeftInset = 0;
      for (const el of tabsEls) {
        if (el.offsetWidth === 0) continue; // skip display:none siblings
        const rect = el.getBoundingClientRect();
        const inset = layoutVw - rect.left;
        if (inset > pillLeftInset) pillLeftInset = inset;
      }
      if (pillLeftInset === 0) return;
      const next = pillLeftInset + TOGGLE_TO_TABS_GAP;
      setOffset((prev) => (Math.abs(prev - next) > 0.5 ? next : prev));
    };

    compute();

    const ro = new ResizeObserver(compute);
    tabsEls.forEach((el) => ro.observe(el));
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return offset;
}

/**
 * Persistent theme toggle. In 1-column layout it pins top-right just left of
 * the sticky mobile nav tabs; in the desktop split layout (≥1432px) it pins
 * bottom-left where the sticky aside owns the column.
 *
 * Pass `mode` ("light" | "dark") and `onToggle` from useRebuildTheme.
 */
export function RebuildPersistentThemeToggle({ mode, onToggle }) {
  const reduceMotion = useReducedMotion();
  const isDark = mode === "dark";
  const nextLabel = isDark ? "Switch to light theme" : "Switch to dark theme";
  const navToggleRight = useNavToggleRightOffset();

  return (
    <div
      className="rebuild-persistent-theme-toggle-anchor"
      style={{ "--rebuild-toggle-right": `${navToggleRight}px` }}
    >
      <div className="pointer-events-auto inline-flex rounded-[12px] border border-[var(--wx-border-soft)] bg-[color-mix(in_srgb,var(--wx-ink)_5.5%,var(--wx-white))] p-1 backdrop-blur-[2px]">
        <button
          type="button"
          onClick={onToggle}
          aria-label={nextLabel}
          title={nextLabel}
          className={clsx(
            "group relative inline-flex size-[38px] items-center justify-center overflow-hidden rounded-[8px]",
            "border border-[var(--wx-border-muted)] bg-[var(--wx-white)] text-[var(--wx-ink)]",
            "outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]",
            "transition-colors duration-200 ease-out",
            "motion-safe:hover:bg-[color-mix(in_srgb,var(--wx-ink)_4%,var(--wx-white))]",
          )}
        >
          <span className="relative inline-flex size-[17px] items-center justify-center" aria-hidden>
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: -50 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: 50 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="absolute inset-0 inline-flex items-center justify-center"
                >
                  <Sun size={17} weight="bold" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: 50 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -50 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="absolute inset-0 inline-flex items-center justify-center"
                >
                  <Moon size={17} weight="bold" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </button>
      </div>
    </div>
  );
}
