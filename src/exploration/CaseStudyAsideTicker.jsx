import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";

const EASE = [0.22, 1, 0.36, 1];
const DURATION = 0.52;

function CarouselSlide({ chapter, isActive, slideHeightPx, reduceMotion }) {
  const hStyle = slideHeightPx > 0 ? { height: slideHeightPx } : { minHeight: "8.75rem" };

  return (
    <motion.div
      className="flex w-full shrink-0 flex-col justify-center gap-2 px-2 text-center sm:px-3"
      style={hStyle}
      animate={
        reduceMotion
          ? { scale: 1, opacity: isActive ? 1 : 0.52 }
          : { scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.36 }
      }
      transition={reduceMotion ? { duration: 0.01 } : { duration: DURATION, ease: EASE }}
      aria-hidden={!isActive || undefined}
      role={isActive ? undefined : "presentation"}
    >
      <p
        className={clsx(
          "wx-text-eyebrow uppercase tracking-[0.18em]",
          isActive ? "text-[var(--wx-muted)]" : "text-[color-mix(in_srgb,var(--wx-muted)_55%,transparent)]",
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
            ? "line-clamp-4 text-[var(--wx-muted)] sm:line-clamp-5"
            : "line-clamp-2 text-sm text-[color-mix(in_srgb,var(--wx-muted)_68%,transparent)] sm:line-clamp-3 sm:text-[0.9375rem]",
        )}
      >
        {chapter.lede}
      </p>
    </motion.div>
  );
}

/**
 * Vertical carousel: one clipped viewport (three slide-heights tall). The track translates so the
 * scroll-synced `activeIndex` chapter stays vertically centered — prev/next peek above/below.
 *
 * @param {{ chapters: Array<{ id: string; eyebrow: string; title: string; lede: string }>, activeIndex: number, reduceMotion: boolean }} props
 */
export function CaseStudyAsideTicker({ chapters, activeIndex, reduceMotion }) {
  const viewportRef = useRef(null);
  const [metrics, setMetrics] = useState({ vh: 0, sh: 0 });

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;

    const sync = () => {
      const vh = el.clientHeight;
      if (vh <= 0) return;
      setMetrics({ vh, sh: vh / 3 });
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const safe = Math.min(Math.max(activeIndex, 0), Math.max(chapters.length - 1, 0));
  const active = chapters[safe];
  const { vh, sh } = metrics;

  /** Align slide `safe` to viewport vertical center (classic carousel translate). */
  const trackY = vh > 0 && sh > 0 ? vh / 2 - (safe + 0.5) * sh : 0;

  return (
    <div className="flex w-full flex-col items-center">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {active ? `${active.eyebrow}. ${active.title}. ${active.lede}` : ""}
      </p>

      <div
        ref={viewportRef}
        className={clsx(
          "wx-case-aside-carousel relative w-full max-w-md overflow-hidden rounded-[var(--wx-radius-card)]",
          "bg-[color-mix(in_srgb,var(--wx-surface)_55%,var(--wx-page-bg))] ring-1 ring-[color:var(--wx-border-soft)]",
          "h-[min(42vh,24rem)] sm:h-[min(40vh,26rem)]",
          vh === 0 && "opacity-0",
          vh > 0 && "opacity-100 transition-opacity duration-200",
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
        aria-hidden
      >
        <motion.div
          className="absolute left-0 right-0 top-0 flex flex-col will-change-transform"
          initial={false}
          animate={{ y: trackY }}
          transition={
            reduceMotion ? { duration: 0.06, ease: EASE } : { duration: DURATION, ease: EASE }
          }
        >
          {chapters.map((ch, i) => (
            <CarouselSlide
              key={ch.id}
              chapter={ch}
              isActive={i === safe}
              slideHeightPx={sh}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
