import { Fragment, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";

/** Mirrors `AsideHeroHeadline` cadence: snappy out, expressive ease (matches `--ease-ui-strong-out`). */
const HEADLINE_EASE = [0.22, 1, 0.36, 1];
const HEADLINE_TRANSITION = { duration: 0.42, ease: HEADLINE_EASE };
const HEADLINE_STAGGER = 0.045;
const SOFT_T = { duration: 0.36, ease: HEADLINE_EASE };
const META_T = { duration: 0.24, ease: HEADLINE_EASE };

function splitWords(text) {
  return text ? text.split(/\s+/).filter(Boolean) : [];
}

function ChapterHeadline({ headline, reduceMotion }) {
  const words = useMemo(() => splitWords(headline), [headline]);

  if (reduceMotion) {
    return (
      <h1 className="wx-case-aside__title text-3xl font-medium leading-[1.05] tracking-tight text-[var(--wx-ink)] sm:text-4xl lg:text-[2.75rem]">
        {headline}
      </h1>
    );
  }

  return (
    <h1
      className="wx-case-aside__title relative text-3xl font-medium leading-[1.05] tracking-tight text-[var(--wx-ink)] sm:text-4xl lg:text-[2.75rem]"
      aria-label={headline}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={headline}
          className="block"
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-hidden
        >
          {words.map((word, i) => (
            <Fragment key={`${i}-${word}`}>
              <span className="inline-block overflow-hidden align-baseline">
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { y: "0.85em", opacity: 0 },
                    visible: { y: "0em", opacity: 1 },
                    exit: { y: "-0.85em", opacity: 0 },
                  }}
                  transition={{
                    ...HEADLINE_TRANSITION,
                    delay: i * HEADLINE_STAGGER,
                  }}
                >
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}

/**
 * Sticky case-study aside — same chrome as the home aside (token surface, border, padding scale)
 * but the eyebrow / title / lede are scroll-driven by the active chapter.
 *
 * @param {{ def: { title: string; kicker: string; backLabel?: string }, chapters: Array<{eyebrow:string;title:string;lede:string}>, activeIndex: number, reduceMotion: boolean }} props
 */
export function CaseStudyAside({ def, chapters, activeIndex, reduceMotion }) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), chapters.length - 1);
  const active = chapters[safeIndex];
  const indexLabel = String(safeIndex + 1).padStart(2, "0");
  const totalLabel = String(chapters.length).padStart(2, "0");

  return (
    <aside
      className={clsx(
        "site-vt--aside relative z-20 flex w-full min-w-0 shrink-0 flex-col border-b border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)]",
        "lg:sticky lg:top-[var(--wx-explore-top-nav-h)] lg:flex-none lg:w-[min(42%,36rem)] lg:h-[calc(100svh-var(--wx-explore-top-nav-h))] lg:max-h-[calc(100svh-var(--wx-explore-top-nav-h))] lg:overflow-y-auto lg:overscroll-contain lg:border-b-0",
      )}
      aria-label={`${def.title} — chapter overview`}
      data-site-region="case-aside"
    >
      <div className="flex min-h-0 w-full flex-1 flex-col gap-7 px-[var(--wx-pad-x)] pb-12 pt-10 lg:gap-8 lg:pb-16 lg:pt-14">
        <p className="wx-text-meta uppercase tracking-[0.18em] text-[var(--wx-muted)]">
          <span>{def.kicker}</span>
          <span className="mx-2 text-[color-mix(in_srgb,var(--wx-muted)_60%,transparent)]">/</span>
          <span className="text-[var(--wx-ink)]">{def.title}</span>
        </p>

        <div className="space-y-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`eyebrow-${active.eyebrow}`}
              className="wx-text-eyebrow uppercase tracking-[0.18em] text-[var(--wx-muted)]"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={SOFT_T}
            >
              {active.eyebrow}
            </motion.p>
          </AnimatePresence>

          <div className="min-h-[5em] sm:min-h-[5.5em] lg:min-h-[6em]">
            <ChapterHeadline headline={active.title} reduceMotion={reduceMotion} />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`lede-${active.lede}`}
              className="max-w-md wx-text-body-secondary text-[var(--wx-muted)]"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={SOFT_T}
            >
              {active.lede}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-[color:var(--wx-border-soft)] pt-6">
          <p className="wx-text-meta tabular-nums text-[var(--wx-muted)]" aria-live="polite">
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
      </div>
    </aside>
  );
}
