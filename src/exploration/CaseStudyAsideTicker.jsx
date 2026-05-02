import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";

const EASE = [0.22, 1, 0.36, 1];
const DURATION = 0.52;

function restingMotion(phase, isActive, reduceMotion) {
  if (reduceMotion) {
    return { opacity: isActive ? 1 : 0.45, scale: isActive ? 1 : 0.94, y: 0 };
  }
  if (isActive) {
    return { scale: 1, opacity: 1, y: 0 };
  }
  const dir = phase === "prev" ? -1 : 1;
  /** Adjacent rows stay legible; motion reads mostly as slide + scale, not a wipe fade. */
  return { scale: 0.88, opacity: 0.62, y: dir * 10 };
}

function enterInitial(phase, reduceMotion) {
  if (reduceMotion) return false;
  /** Enter fully opaque — slot clips overflow so slide carries the transition. */
  if (phase === "prev") return { y: -92, opacity: 1, scale: 0.9 };
  if (phase === "next") return { y: 92, opacity: 1, scale: 0.9 };
  return { y: 104, opacity: 1, scale: 0.96 };
}

function exitTarget(phase, reduceMotion) {
  if (reduceMotion) return { opacity: 0 };
  if (phase === "prev") return { y: -104, opacity: 1, scale: 0.86 };
  if (phase === "next") return { y: 104, opacity: 1, scale: 0.86 };
  /** Former active chapter exits upward (reads as ticker advancing). */
  return { y: -112, opacity: 1, scale: 0.9 };
}

function TickerSlot({ phase, chapter, reduceMotion, minHeightClass }) {
  const isActive = phase === "active";

  return (
    <div className={clsx("flex w-full max-w-md flex-col justify-center overflow-hidden", minHeightClass)}>
      <AnimatePresence initial={false}>
        {chapter ? (
          <motion.div
            key={chapter.id}
            role={isActive ? undefined : "presentation"}
            aria-hidden={!isActive || undefined}
            initial={enterInitial(phase, reduceMotion)}
            animate={restingMotion(phase, isActive, reduceMotion)}
            exit={exitTarget(phase, reduceMotion)}
            transition={reduceMotion ? { duration: 0.01 } : { duration: DURATION, ease: EASE }}
            className="mx-auto w-full space-y-2 px-1 text-center will-change-transform"
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
 * Active row is full size; adjacent rows are scaled down until promoted.
 * Chapter changes animate as vertical slides (clipped per slot), not opacity wipes.
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
        className="wx-case-aside-ticker flex min-h-[min(52vh,26rem)] w-full max-w-md flex-col items-center justify-center gap-2 overflow-hidden py-1 sm:gap-3 sm:py-2"
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
