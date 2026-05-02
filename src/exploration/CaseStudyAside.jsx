import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ExplorationNavRow } from "@/exploration/ExplorationNavRow.jsx";
import { CaseStudyAsideTicker } from "@/exploration/CaseStudyAsideTicker.jsx";

const META_T = { duration: 0.24, ease: [0.22, 1, 0.36, 1] };

function CaseStudyKicker({ def }) {
  return (
    <p className="wx-text-meta text-center uppercase tracking-[0.18em] text-[var(--wx-muted)]">
      <span>{def.kicker}</span>
      <span className="mx-2 text-[color-mix(in_srgb,var(--wx-muted)_60%,transparent)]">/</span>
      <span className="text-[var(--wx-ink)]">{def.title}</span>
    </p>
  );
}

function CaseStudyProgress({ indexLabel, totalLabel, reduceMotion }) {
  return (
    <div className="mt-auto flex flex-col items-center gap-3 border-t border-[color:var(--wx-border-soft)] pt-6 text-center">
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
      </p>
      <p className="wx-text-meta uppercase tracking-[0.18em] text-[var(--wx-muted)]">Case study</p>
    </div>
  );
}

/**
 * Sticky case-study aside — nav matches home; chapter copy is a 3-row scroll ticker.
 *
 * @param {{ def: { title: string; kicker: string }, chapters: Array<{ id: string; eyebrow: string; title: string; lede: string }>, activeIndex: number, reduceMotion: boolean, location: object, navigate: function, onSelectSection: function, selectedIndex: number }} props
 */
export function CaseStudyAside({
  def,
  chapters,
  activeIndex,
  reduceMotion,
  location,
  navigate,
  onSelectSection,
  selectedIndex,
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
        <ExplorationNavRow
          location={location}
          navigate={navigate}
          onSelectSection={onSelectSection}
          selectedIndex={selectedIndex}
          reduceMotion={reduceMotion}
        />

        <div className="site-vt--aside flex min-h-0 w-full min-w-0 flex-1 flex-col items-center gap-7 pt-9 text-center lg:gap-8 lg:pt-12">
          <CaseStudyKicker def={def} />
          <CaseStudyAsideTicker chapters={chapters} activeIndex={activeIndex} reduceMotion={reduceMotion} />
          <CaseStudyProgress indexLabel={indexLabel} totalLabel={totalLabel} reduceMotion={reduceMotion} />
        </div>
      </div>
    </aside>
  );
}
