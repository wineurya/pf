import { useCallback } from "react";
import { clsx } from "clsx";
import { queueScrollTriggerRefresh } from "@/lib/gsap.js";
import { useLenis } from "@/providers/LenisProvider.jsx";

/** Matches home exploration Lenis easing (`WX_LENIS_EASE_IN_OUT`). */
const LENIS_EASE_IN_OUT = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

/**
 * Chapter-jump rail for case study aside — replaces section tabs (`SectionTabRail`).
 *
 * @param {{ chapters: Array<{ id: string; eyebrow?: string; title: string }>, activeIndex: number, reduceMotion: boolean }} props
 */
export function CaseStudyTableOfContents({ chapters, activeIndex, reduceMotion }) {
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
      <p id="case-study-toc-heading" className="wx-text-meta mb-3 text-left uppercase tracking-[0.18em] text-[var(--wx-muted)]">
        Contents
      </p>
      <ol className="m-0 flex list-none flex-col gap-0.5 p-0">
        {chapters.map((ch, i) => {
          const active = i === safeIndex;
          const idx = String(i + 1).padStart(2, "0");
          return (
            <li key={ch.id}>
              <button
                type="button"
                className={clsx(
                  "w-full rounded-r-md py-2.5 pl-3 pr-2 text-left outline-none transition-colors duration-200",
                  "focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]",
                  active
                    ? "border-l-2 border-[var(--wx-primary)] bg-[color-mix(in_srgb,var(--wx-primary)_7%,transparent)]"
                    : "border-l-2 border-transparent hover:bg-[color-mix(in_srgb,var(--wx-surface)_50%,transparent)]",
                )}
                aria-current={active ? "location" : undefined}
                onClick={() => scrollToChapter(ch.id)}
              >
                <span className="flex gap-3">
                  <span className="wx-text-meta shrink-0 tabular-nums text-[var(--wx-muted)]">{idx}</span>
                  <span className="min-w-0 flex-1">
                    {ch.eyebrow ? (
                      <span className="block wx-text-meta uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--wx-muted)_88%,transparent)] line-clamp-1">
                        {ch.eyebrow}
                      </span>
                    ) : null}
                    <span
                      className={clsx(
                        "mt-0.5 block text-[15px] font-medium leading-snug tracking-tight sm:text-base",
                        active ? "text-[var(--wx-ink)]" : "text-[color-mix(in_srgb,var(--wx-ink)_88%,var(--wx-page-bg))]",
                      )}
                    >
                      {ch.title}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
