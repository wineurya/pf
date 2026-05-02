import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";

const EASE = [0.22, 1, 0.36, 1];
const DURATION = 0.52;

function CarouselSlide({ chapter, isActive, slideHeightPx, reduceMotion }) {
  const hStyle = slideHeightPx > 0 ? { height: slideHeightPx } : { minHeight: "11rem" };

  return (
    <motion.div
      className="flex w-full shrink-0 flex-col justify-start gap-3 overflow-hidden px-0 py-3 text-left sm:gap-4 sm:py-4"
      style={hStyle}
      animate={
        reduceMotion
          ? { scale: 1, opacity: isActive ? 1 : 0.5 }
          : { scale: isActive ? 1 : 0.94, opacity: isActive ? 1 : 0.4 }
      }
      transition={reduceMotion ? { duration: 0.01 } : { duration: DURATION, ease: EASE }}
      aria-hidden={!isActive || undefined}
      role={isActive ? undefined : "presentation"}
    >
      <p
        className={clsx(
          "wx-text-eyebrow uppercase tracking-[0.18em]",
          isActive ? "text-[var(--wx-muted)]" : "text-[color-mix(in_srgb,var(--wx-muted)_58%,transparent)]",
        )}
      >
        {chapter.eyebrow}
      </p>
      <p
        className={clsx(
          "font-medium tracking-tight text-[var(--wx-ink)]",
          isActive ? "text-2xl leading-snug sm:text-3xl lg:text-[2.05rem]" : "line-clamp-2 text-base leading-snug sm:text-lg",
        )}
      >
        {chapter.title}
      </p>
      <p
        className={clsx(
          "wx-text-body-secondary leading-relaxed",
          isActive
            ? "text-[var(--wx-muted)]"
            : "line-clamp-2 text-sm text-[color-mix(in_srgb,var(--wx-muted)_72%,transparent)] sm:text-[0.9375rem]",
        )}
      >
        {chapter.lede}
      </p>
    </motion.div>
  );
}

/**
 * Vertical carousel: clipped viewport (three slide-heights tall). Track translates so the
 * scroll-synced chapter is vertically centered; neighbors peek above/below.
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

  const trackY = vh > 0 && sh > 0 ? vh / 2 - (safe + 0.5) * sh : 0;

  return (
    <div className="flex w-full flex-col items-stretch">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {active ? `${active.eyebrow}. ${active.title}. ${active.lede}` : ""}
      </p>

      <div
        ref={viewportRef}
        className={clsx(
          "wx-case-aside-carousel relative w-full overflow-hidden",
          "h-[min(64vh,42rem)] sm:h-[min(60vh,44rem)]",
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
