import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { WordmarkLink } from "@/exploration/WordmarkLink.jsx";
import { CaseStudyTableOfContents } from "@/exploration/CaseStudyTableOfContents.jsx";

const META_T = { duration: 0.24, ease: [0.22, 1, 0.36, 1] };

function CaseStudyHeading({ def }) {
  return (
    <div className="flex flex-col items-start gap-2 text-left">
      <p className="wx-text-meta wx-text-kicker text-[var(--wx-muted)]">{def.kicker}</p>
      <h1 className="wx-text-page-title text-[var(--wx-ink)]">{def.title}</h1>
      {def.lede ? (
        <p className="mt-1 max-w-md wx-text-body-secondary text-[var(--wx-muted)]">{def.lede}</p>
      ) : null}
    </div>
  );
}

function CaseStudyProgress({ indexLabel, totalLabel, reduceMotion }) {
  return (
    <div className="mt-auto flex flex-col items-start gap-2 border-t border-[color:var(--wx-border-soft)] pt-6 text-left">
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
        <span className="wx-text-kicker ml-3">Case study</span>
      </p>
    </div>
  );
}

/**
 * Sticky case-study aside — wordmark + heading + chapter list (active row expands with lede).
 * One chapter system replaces the prior TOC + ticker stack.
 *
 * @param {{ def: { title: string; kicker: string; lede?: string }, chapters: Array<{ id: string; eyebrow?: string; title: string; lede?: string }>, activeIndex: number, reduceMotion: boolean, location: object, navigate: function }} props
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
        "lg:grow-0 lg:shrink-0 lg:sticky lg:top-0 lg:overflow-y-auto lg:overscroll-contain lg:border-b-0",
        "lg:flex-none lg:w-[min(42%,36rem)] lg:h-svh lg:max-h-svh",
      )}
      aria-label={`${def.title} — chapter overview`}
      data-site-region="case-aside"
    >
      <div className="flex min-h-0 w-full flex-1 flex-col px-[var(--wx-pad-x)] pb-10 pt-0 sm:pt-10 lg:min-h-0 lg:pb-12 lg:pt-12">
        <div className="wx-mobile-nav-spacer max-sm:block sm:hidden" aria-hidden />
        <div className="wx-mobile-sticky-nav flex w-full min-w-0 shrink-0 flex-row flex-nowrap items-center justify-between gap-3 min-h-14 sm:gap-4">
          <div className="site-vt--nav flex w-full min-w-0 flex-nowrap items-center justify-start gap-3 min-h-14 sm:gap-4">
            <WordmarkLink location={location} navigate={navigate} />
          </div>
        </div>

        <div className="site-vt--aside flex min-h-0 w-full min-w-0 flex-1 flex-col gap-10 pt-10 text-left lg:gap-12 lg:pt-12">
          <CaseStudyHeading def={def} />
          <CaseStudyTableOfContents chapters={chapters} activeIndex={activeIndex} reduceMotion={reduceMotion} />
          <CaseStudyProgress indexLabel={indexLabel} totalLabel={totalLabel} reduceMotion={reduceMotion} />
        </div>
      </div>
    </aside>
  );
}
