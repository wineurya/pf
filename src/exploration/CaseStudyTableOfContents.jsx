import { useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";
import { queueScrollTriggerRefresh } from "@/lib/gsap.js";
import { useLenis } from "@/providers/LenisProvider.jsx";

/** Matches home exploration Lenis easing (`WX_LENIS_EASE_IN_OUT`). */
const LENIS_EASE_IN_OUT = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
const EASE = [0.22, 1, 0.36, 1];

function ChapterRow({ chapter, index, active, onSelect, railMode }) {
  const idx = String(index + 1).padStart(2, "0");

  return (
    <li>
      <button
        type="button"
        className={clsx(
          "group relative w-full rounded-md text-left outline-none transition-colors duration-200",
          railMode ? "py-2 pl-2 pr-1" : "py-3 pl-4 pr-3",
          "focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]",
          active
            ? "border-l-2 border-[var(--wx-primary)] bg-[color-mix(in_srgb,var(--wx-primary)_6%,transparent)]"
            : "border-l-2 border-transparent hover:bg-[color-mix(in_srgb,var(--wx-surface)_45%,transparent)]",
        )}
        aria-current={active ? "location" : undefined}
        onClick={() => onSelect(chapter.id)}
      >
        <span className={clsx("flex items-baseline", railMode ? "gap-2" : "gap-3")}>
          <span
            className={clsx(
              "wx-text-meta shrink-0 tabular-nums",
              railMode && "text-[length:var(--wx-text-meta-size)]",
              active ? "text-[var(--wx-primary)]" : "text-[color-mix(in_srgb,var(--wx-muted)_85%,transparent)]",
            )}
          >
            {idx}
          </span>
          <span className="min-w-0 flex-1">
            {chapter.eyebrow && !railMode ? (
              <span
                className={clsx(
                  "block wx-text-meta wx-text-kicker",
                  active
                    ? "text-[var(--wx-muted)]"
                    : "text-[color-mix(in_srgb,var(--wx-muted)_70%,transparent)]",
                )}
              >
                {chapter.eyebrow}
              </span>
            ) : null}
            <span
              className={clsx(
                "mt-1 block",
                railMode
                  ? clsx(
                      "text-sm font-medium leading-snug tracking-tight",
                      active ? "text-[var(--wx-ink)]" : "text-[color-mix(in_srgb,var(--wx-ink)_82%,var(--wx-page-bg))]",
                    )
                  : clsx(
                      "wx-text-chapter-title",
                      active && "wx-text-chapter-title--active",
                      active
                        ? "text-[var(--wx-ink)]"
                        : "text-[color-mix(in_srgb,var(--wx-ink)_82%,var(--wx-page-bg))]",
                    ),
              )}
            >
              {chapter.title}
            </span>
            <AnimatePresence initial={false}>
              {active && chapter.lede && !railMode ? (
                <motion.span
                  key={`lede-${chapter.id}`}
                  className="block overflow-hidden"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.36, ease: EASE }}
                >
                  <span className="wx-text-body-secondary block text-[var(--wx-muted)]">
                    {chapter.lede}
                  </span>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </span>
        </span>
      </button>
    </li>
  );
}

/**
 * Single chapter system for the case study aside — list of chapters where the active one
 * expands to reveal its lede. Replaces the separate Contents list + ticker.
 *
 * @param {{ chapters: Array<{ id: string; eyebrow?: string; title: string; lede?: string }>, activeIndex: number, reduceMotion: boolean, railMode?: boolean }} props
 */
export function CaseStudyTableOfContents({ chapters, activeIndex, reduceMotion, railMode = false }) {
  const lenis = useLenis();
  const safeIndex = Math.min(Math.max(activeIndex, 0), Math.max(chapters.length - 1, 0));

  const scrollToChapter = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const duration = reduceMotion ? 0 : 1.15;
      if (lenis) {
        lenis.scrollTo(el, {
          offset: 0,
          duration,
          easing: reduceMotion ? undefined : LENIS_EASE_IN_OUT,
        });
      } else {
        el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
      requestAnimationFrame(() => queueScrollTriggerRefresh());
    },
    [lenis, reduceMotion],
  );

  if (chapters.length === 0) return null;

  return (
    <nav className="w-full min-w-0" aria-labelledby="case-study-toc-heading">
      <p
        id="case-study-toc-heading"
        className={clsx(
          "wx-text-meta wx-text-kicker text-left text-[var(--wx-muted)]",
          railMode ? "mb-2" : "mb-4",
        )}
      >
        Chapters
      </p>
      <ol className={clsx("m-0 flex list-none flex-col p-0", railMode ? "gap-0.5" : "gap-1")}>
        {chapters.map((ch, i) => (
          <ChapterRow
            key={ch.id}
            chapter={ch}
            index={i}
            active={i === safeIndex}
            onSelect={scrollToChapter}
            railMode={railMode}
          />
        ))}
      </ol>
    </nav>
  );
}
