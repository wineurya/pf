import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";
import { WordmarkLink } from "@/exploration/WordmarkLink.jsx";
import { CaseStudyTableOfContents } from "@/exploration/CaseStudyTableOfContents.jsx";

const META_T = { duration: 0.24, ease: [0.22, 1, 0.36, 1] };

function CaseStudyProgress({ indexLabel, totalLabel, reduceMotion }) {
  return (
    <div className="mt-6 flex shrink-0 flex-col items-start gap-2 border-t border-[color:var(--wx-border-soft)] pt-6 text-left lg:mt-8 lg:pt-8">
      <p className="wx-text-meta tabular-nums text-[var(--wx-muted)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={indexLabel}
            className="inline-block text-[var(--wx-ink)]"
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={META_T}
          >
            {indexLabel}
          </motion.span>
        </AnimatePresence>
        <span className="text-[color-mix(in_srgb,var(--wx-muted)_60%,transparent)]">
          {" / "}
          {totalLabel}
        </span>
        <span className="wx-text-kicker ml-2">Chapters</span>
      </p>
    </div>
  );
}

/**
 * Minimal sticky rail — back, wordmark, compact chapter list, progress (Figma 10:5 left frame,
 * reduced to navigation only; body copy and meta live in the main column).
 *
 * @param {{ def: { title: string }, chapters: Array, activeIndex: number, reduceMotion: boolean, location: object, navigate: function }} props
 */
export function CaseStudyAside({
  def,
  chapters,
  activeIndex,
  reduceMotion,
  location,
  navigate,
}) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), chapters.length - 1);
  const indexLabel = String(safeIndex + 1).padStart(2, "0");
  const totalLabel = String(chapters.length).padStart(2, "0");

  return (
    <aside
      className={clsx(
        "relative z-20 flex w-full min-w-0 shrink-0 flex-col border-b border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)]",
        "lg:grow-0 lg:shrink-0 lg:sticky lg:top-0 lg:max-h-svh lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:border-b-0 lg:border-r",
        "lg:w-[min(17.5rem,26vw)] lg:max-w-[20rem]",
      )}
      aria-label={`${def.title} — chapter navigation`}
      data-site-region="case-aside"
    >
      <div className="flex min-h-0 w-full max-w-full flex-1 flex-col px-[var(--wx-pad-x)] py-8 sm:px-5 sm:py-10 lg:px-4 lg:py-12">
        <div className="wx-mobile-nav-spacer max-sm:block sm:hidden" aria-hidden />
        <div className="site-vt--nav flex min-h-0 w-full flex-col gap-5">
          <ViewTransitionLink
            to="/#section-work"
            className="wx-text-meta font-medium text-[var(--wx-muted)] outline-none transition-colors hover:text-[var(--wx-primary)] focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
          >
            Back to work
          </ViewTransitionLink>
          <WordmarkLink location={location} navigate={navigate} />
        </div>

        <div className="site-vt--aside mt-8 flex min-h-0 w-full flex-1 flex-col lg:mt-10">
          <CaseStudyTableOfContents
            chapters={chapters}
            activeIndex={activeIndex}
            reduceMotion={reduceMotion}
            railMode
          />
          <CaseStudyProgress indexLabel={indexLabel} totalLabel={totalLabel} reduceMotion={reduceMotion} />
        </div>
      </div>
    </aside>
  );
}
