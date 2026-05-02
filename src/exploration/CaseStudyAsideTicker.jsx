import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";

const EASE = [0.22, 1, 0.36, 1];
const DURATION = 0.44;

function restingMotion(phase, isActive, reduceMotion) {
  if (reduceMotion) {
    return { opacity: isActive ? 1 : 0.42, scale: isActive ? 1 : 0.94, y: 0 };
  }
  if (isActive) {
    return { scale: 1, opacity: 1, y: 0 };
  }
  const dir = phase === "prev" ? -1 : 1;
  return { scale: 0.88, opacity: 0.34, y: dir * 12 };
}

function enterInitial(phase, reduceMotion) {
  if (reduceMotion) return false;
  if (phase === "prev") return { opacity: 0.55, y: -18, scale: 0.86 };
  if (phase === "next") return { opacity: 0.55, y: 18, scale: 0.86 };
  return { opacity: 0.85, y: 22, scale: 0.94 };
}

function exitTarget(phase, reduceMotion) {
  if (reduceMotion) return { opacity: 0 };
  if (phase === "prev") return { y: -36, scale: 0.82, opacity: 0 };
  if (phase === "next") return { y: 36, scale: 0.82, opacity: 0 };
  return { y: -28, scale: 0.88, opacity: 0 };
}

function TickerSlot({ phase, chapter, reduceMotion, minHeightClass }) {
  const isActive = phase === "active";

  return (
    <div className={clsx("flex w-full max-w-md flex-col justify-center", minHeightClass)}>
      <AnimatePresence mode="wait" initial={false}>
        {chapter ? (
          <motion.div
            key={chapter.id}
            role={isActive ? undefined : "presentation"}
            aria-hidden={!isActive || undefined}
            initial={enterInitial(phase, reduceMotion)}
            animate={restingMotion(phase, isActive, reduceMotion)}
            exit={exitTarget(phase, reduceMotion)}
            transition={
              reduceMotion ? { duration: 0.01 } : { duration: DURATION, ease: EASE }
            }
            className="mx-auto w-full space-y-2 px-1 text-center"
          >
            <p
              className={clsx(
                "wx-text-eyebrow uppercase tracking-[0.18em]",
                isActive ? "text-[var(--wx-muted)]" : "text-[color-mix(in_srgb,var(--wx-muted)_62%,transparent)]",
              )}
            >
              {chapter.eyebrow}
            </p>
            <p
              className={clsx(
                "text-balance font-medium tracking-tight text-[var(--wx-ink)]",
                isActive ? "text-2xl sm:text-3xl lg:text-[2.05rem]" : "text-base sm:text-lg leading-snug",
              )}
            >
              {chapter.title}
            </p>
            <p
              className={clsx(
                "text-pretty wx-text-body-secondary",
                isActive
                  ? "text-[var(--wx-muted)]"
                  : "text-sm text-[color-mix(in_srgb,var(--wx-muted)_72%,transparent)] sm:text-[0.9375rem]",
              )}
            >
              {chapter.lede}
            </p>
          </motion.div>
        ) : (
          <div key={`empty-${phase}`} className="mx-auto w-full min-h-[2.75rem] sm:min-h-[3.25rem]" aria-hidden />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Scroll-synced rail: up to three chapter summaries (previous / active / next).
 * Active row is full size and opaque; adjacent rows are scaled down and dim until promoted.
 *
 * @param {{ chapters: Array<{ id: string; eyebrow: string; title: string; lede: string }>, activeIndex: number, reduceMotion: boolean }} props
 */
export function CaseStudyAsideTicker({ chapters, activeIndex, reduceMotion }) {
  const safe = Math.min(Math.max(activeIndex, 0), Math.max(chapters.length - 1, 0));
  const prev = chapters[safe - 1] ?? null;
  const active = chapters[safe] ?? null;
  const next = chapters[safe + 1] ?? null;

  return (
    <div className="flex w-full flex-col items-center">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {active ? `${active.eyebrow}. ${active.title}. ${active.lede}` : ""}
      </p>
      <div
        className="wx-case-aside-ticker flex min-h-[min(52vh,26rem)] w-full max-w-md flex-col items-center justify-center gap-2 py-1 sm:gap-3 sm:py-2"
        aria-hidden
      >
        <TickerSlot
          phase="prev"
          chapter={prev}
          reduceMotion={reduceMotion}
          minHeightClass="min-h-[3.25rem] sm:min-h-[3.75rem]"
        />
        <TickerSlot
          phase="active"
          chapter={active}
          reduceMotion={reduceMotion}
          minHeightClass="min-h-[9.5rem] sm:min-h-[10.5rem]"
        />
        <TickerSlot
          phase="next"
          chapter={next}
          reduceMotion={reduceMotion}
          minHeightClass="min-h-[3.25rem] sm:min-h-[3.75rem]"
        />
      </div>
    </div>
  );
}
