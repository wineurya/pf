import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTime,
  useTransform,
} from "motion/react";
import { clsx } from "clsx";

/** One full loop (ms). All logos drift at constant arclength rate. */
const PERIOD_MS = 32000;

/**
 * Track length in u-units. Each logo cycles through u ∈ [0, TRACK_LENGTH).
 * Only u ∈ [0, 1] is visible (top arc); the rest is the hidden bottom of the wheel.
 * With 18 logos and TRACK_LENGTH = 3, ~5–6 are visible at any given moment.
 */
const TRACK_LENGTH = 3;

// Ellipse geometry in stage coords (Figma Testing 309:51 spirit — extends past the card edges).
// cy is pushed below the stage so the visible portion of the arc sits in the upper-middle of the card,
// minimizing the empty space above the peak logo.
const STAGE_W = 422;
const STAGE_H = 120;
const ELLIPSE = { cx: 211, cy: 172, rx: 268, ry: 112 };

function stackLogoUrl(tool) {
  if (tool.logoUrl) return tool.logoUrl;
  if (tool.brandSlug) return `https://cdn.simpleicons.org/${tool.brandSlug}`;
  return null;
}

/** Position on the top half of the ellipse for u ∈ [0, 1]. */
function arcPoint(u) {
  const θ = Math.PI * u;
  return {
    x: ELLIPSE.cx + ELLIPSE.rx * Math.cos(Math.PI - θ),
    y: ELLIPSE.cy - ELLIPSE.ry * Math.sin(Math.PI - θ),
  };
}

/** Cosine ease-in-out — softer than linear fades at the edges. */
function easeInOut(t) {
  return 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, t)));
}

/**
 * One floating logo. All four animated properties (x, y, scale, opacity) come from
 * `useTransform` chains so motion writes them straight to the GPU each frame without
 * touching React's reconciler. No spring, no state — purely derived from `phase`.
 */
function FloatingLogo({ tool, slot, total, phase, stageSizeRef }) {
  const x = useTransform(phase, (p) => {
    const u = TRACK_LENGTH * ((p + slot / total) % 1);
    if (u > 1) return -9999;
    const pt = arcPoint(u);
    const w = stageSizeRef.current.w || STAGE_W;
    return (pt.x / STAGE_W) * w;
  });
  const y = useTransform(phase, (p) => {
    const u = TRACK_LENGTH * ((p + slot / total) % 1);
    if (u > 1) return -9999;
    const pt = arcPoint(u);
    const h = stageSizeRef.current.h || STAGE_H;
    return (pt.y / STAGE_H) * h;
  });
  const opacity = useTransform(phase, (p) => {
    const u = TRACK_LENGTH * ((p + slot / total) % 1);
    if (u > 1) return 0;
    const edge = Math.min(u, 1 - u); // 0 at entry/exit, 0.5 at peak
    return easeInOut(edge / 0.18);
  });
  const scale = useTransform(phase, (p) => {
    const u = TRACK_LENGTH * ((p + slot / total) % 1);
    if (u > 1) return 0.9;
    // Continuous peak emphasis — no spring, no state hop.
    const fromPeak = Math.abs(u - 0.5);
    return 0.9 + 0.5 * Math.max(0, 1 - fromPeak / 0.42);
  });

  const src = stackLogoUrl(tool);

  return (
    <motion.li
      className="wx-approach-tech-stack-visual__slot"
      style={{ x, y, scale, opacity }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          className="wx-approach-tech-stack-visual__logo"
          draggable={false}
          width={32}
          height={32}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="wx-approach-tech-stack-visual__logo-fallback">
          {tool.label?.[0] ?? "?"}
        </span>
      )}
    </motion.li>
  );
}

/**
 * Approach “Prototype” tech stack — full-card layout from Figma Testing `309:51`.
 * Naked logos drift along an invisible arc that fills the bottom of the card; the
 * logo nearest the peak is labeled by a Focus-style pill.
 */
export function ApproachStepTechStackVisual({
  tools,
  reduceMotion = false,
  className,
  fullCard = false,
  title,
  body,
}) {
  const total = tools.length;
  const stageRef = useRef(null);
  const stageSizeRef = useRef({ w: STAGE_W, h: STAGE_H });
  const [, forcePxResolve] = useState(0);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    // Seed with the rendered size before the first paint so logos land on the curve.
    const r = el.getBoundingClientRect();
    stageSizeRef.current = { w: r.width, h: r.height };
    forcePxResolve((n) => n + 1);
    const ro = new ResizeObserver(([entry]) => {
      stageSizeRef.current = {
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      };
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const time = useTime();
  const phase = useTransform(time, (t) => {
    if (reduceMotion) return 0.5;
    return (t / PERIOD_MS) % 1;
  });

  // Peak = tool whose u-position is currently closest to 0.5 (the apex of the visible arc).
  const activeIndex = useTransform(phase, (p) => {
    if (total === 0) return 0;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < total; i++) {
      const u = TRACK_LENGTH * ((p + i / total) % 1);
      if (u > 1) continue;
      const d = Math.abs(u - 0.5);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  });

  const [peakIdx, setPeakIdx] = useState(0);
  useMotionValueEvent(activeIndex, "change", (latest) => {
    if (typeof latest === "number" && latest !== peakIdx) setPeakIdx(latest);
  });

  const peakLabel = tools[peakIdx]?.label ?? "";

  /**
   * Reduced-motion stage: a flat chip row instead of the orbital. The arc relies
   * on continuous animation to read as a "stack drifting past" — frozen at one
   * frame, most logos sit off-stage and the chip shows whichever tool was at
   * the peak. The flat row keeps every tool visible and named, which is also
   * what html.to.design captures for the static Figma export.
   */
  const stage = reduceMotion ? (
    <div
      ref={stageRef}
      className="wx-approach-tech-stack-visual__stage wx-approach-tech-stack-visual__stage--static"
      aria-hidden
    >
      <ul className="wx-approach-tech-stack-visual__static-grid">
        {tools.map((tool) => {
          const src = stackLogoUrl(tool);
          return (
            <li key={tool.label} className="wx-approach-tech-stack-visual__static-chip">
              {src ? (
                <img
                  src={src}
                  alt=""
                  className="wx-approach-tech-stack-visual__static-logo"
                  draggable={false}
                  width={20}
                  height={20}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="wx-approach-tech-stack-visual__logo-fallback">
                  {tool.label?.[0] ?? "?"}
                </span>
              )}
              <span className="wx-approach-tech-stack-visual__static-label">{tool.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div
      ref={stageRef}
      className="wx-approach-tech-stack-visual__stage"
      style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
      aria-hidden
    >
      <div className="wx-approach-tech-stack-visual__chip">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={peakLabel}
            className="wx-approach-tech-stack-visual__chip-text"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {peakLabel}
          </motion.span>
        </AnimatePresence>
      </div>

      <ul className="wx-approach-tech-stack-visual__bubbles">
        {tools.map((tool, i) => (
          <FloatingLogo
            key={tool.label}
            tool={tool}
            slot={i}
            total={total}
            phase={phase}
            stageSizeRef={stageSizeRef}
          />
        ))}
      </ul>
    </div>
  );

  if (fullCard) {
    return (
      <div
        className={clsx(
          "wx-approach-tech-stack-visual",
          "wx-approach-tech-stack-visual--full-card",
          className,
        )}
      >
        {stage}
        <div className="wx-approach-tech-stack-visual__card-head">
          <div className="wx-approach-tech-stack-visual__card-title-row">
            <span className="wx-approach-tech-stack-visual__card-accent" aria-hidden />
            <div className="wx-approach-tech-stack-visual__card-text">
              {title ? <h3 className="wx-approach-tech-stack-visual__card-title">{title}</h3> : null}
              {body ? <p className="wx-approach-tech-stack-visual__card-lede">{body}</p> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("wx-approach-tech-stack-visual", className)} aria-hidden>
      {stage}
    </div>
  );
}
