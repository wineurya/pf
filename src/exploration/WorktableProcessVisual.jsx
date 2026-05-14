import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion as useReducedMotionMotion } from "motion/react";
import { clsx } from "clsx";

const WX_SPRINKLE_EASE = [0.22, 1, 0.36, 1];

/**
 * Stage geometry — designed at 560x640. Artifacts are positioned in this
 * coordinate space; the container scales to fit with `object-fit`-style logic
 * via CSS `aspect-ratio`. Coords roughly match a top-down flat-lay desk POV.
 */
const STAGE_W = 560;
const STAGE_H = 640;

/**
 * Artifact spec — each entry corresponds to one process step. `cx`/`cy` are
 * the artifact's center inside the stage. `enter` describes the off-canvas
 * starting offset (px in stage coords) so artifacts "land" on the desk from
 * a believable direction (sticky notes from off the top edge, laptop from
 * the bottom, etc.).
 */
const ARTIFACTS = [
  {
    id: "research",
    label: "Research",
    cx: 130,
    cy: 130,
    enter: { x: -40, y: -90, rotate: -12 },
    rotate: -7,
    render: ResearchStickies,
  },
  {
    id: "structure",
    label: "Structure",
    cx: 405,
    cy: 250,
    enter: { x: 80, y: -60, rotate: 10 },
    rotate: 4,
    render: StructureNotebook,
  },
  {
    id: "prototype",
    label: "Prototype",
    cx: 440,
    cy: 470,
    enter: { x: 90, y: 60, rotate: 14 },
    rotate: 6,
    render: PrototypePhone,
  },
  {
    id: "handoff",
    label: "Handoff",
    cx: 175,
    cy: 490,
    enter: { x: -60, y: 100, rotate: -10 },
    rotate: -4,
    render: HandoffLaptop,
  },
];

export function WorktableProcessVisual({ activeStep = 0, reduceMotion = false }) {
  const motionPrefersReduced = useReducedMotionMotion();
  const isReduced = reduceMotion || motionPrefersReduced;
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) el.style.setProperty("--wx-stage-scale", String(w / STAGE_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="wx-worktable"
      data-active-step={activeStep}
      role="img"
      aria-label="Process worktable — artifacts appear on the desk as each step activates."
    >
      <div className="wx-worktable__surface" aria-hidden>
        <div className="wx-worktable__grain" />
        <div className="wx-worktable__vignette" />
      </div>

      <svg
        className="wx-worktable__thread"
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <ThreadPath activeStep={activeStep} reduced={isReduced} />
      </svg>

      <div className="wx-worktable__stage" aria-hidden>
        {ARTIFACTS.map((art, i) => {
          const revealed = i <= activeStep;
          const Body = art.render;
          return (
            <div
              key={art.id}
              className={clsx("wx-worktable__artifact", `wx-worktable__artifact--${art.id}`)}
              style={{
                left: `${(art.cx / STAGE_W) * 100}%`,
                top: `${(art.cy / STAGE_H) * 100}%`,
              }}
            >
              <motion.div
                className="wx-worktable__artifact-inner"
                initial={
                  isReduced
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: art.enter.x,
                        y: art.enter.y,
                        rotate: art.enter.rotate,
                        scale: 0.92,
                      }
                }
                animate={
                  revealed
                    ? isReduced
                      ? { opacity: 1 }
                      : { opacity: 1, x: 0, y: 0, rotate: art.rotate, scale: 1 }
                    : isReduced
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: art.enter.x,
                        y: art.enter.y,
                        rotate: art.enter.rotate,
                        scale: 0.92,
                      }
                }
                transition={{
                  duration: isReduced ? 0 : 0.62,
                  ease: WX_SPRINKLE_EASE,
                  delay: isReduced ? 0 : revealed ? 0.05 : 0,
                }}
              >
                <Body tag={String(i + 1).padStart(2, "0")} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ThreadPath({ activeStep, reduced }) {
  // Smooth bezier through artifact centers.
  const d = useMemo(() => {
    const [a, b, c, d2] = ARTIFACTS;
    return [
      `M ${a.cx} ${a.cy}`,
      `C ${a.cx + 100} ${a.cy + 30}, ${b.cx - 90} ${b.cy - 40}, ${b.cx} ${b.cy}`,
      `S ${c.cx - 40} ${c.cy - 120}, ${c.cx} ${c.cy}`,
      `S ${d2.cx + 80} ${d2.cy - 20}, ${d2.cx} ${d2.cy}`,
    ].join(" ");
  }, []);

  // Each segment corresponds to artifact[i] -> artifact[i+1]. Reveal up through activeStep.
  const segments = ARTIFACTS.length - 1;
  const progress = Math.min(Math.max(activeStep, 0), segments) / segments;

  return (
    <>
      <path
        d={d}
        className="wx-worktable__thread-track"
        fill="none"
        pathLength="1"
        strokeDasharray="0.005 0.014"
      />
      <motion.path
        d={d}
        className="wx-worktable__thread-active"
        fill="none"
        pathLength={1}
        strokeDasharray="0.005 0.014"
        initial={{ strokeDashoffset: 1 }}
        animate={{ strokeDashoffset: 1 - progress }}
        transition={{ duration: reduced ? 0 : 0.7, ease: WX_SPRINKLE_EASE }}
      />
    </>
  );
}

/* ---------- artifact renders ---------- */

function ResearchStickies({ tag }) {
  return (
    <div className="wx-art wx-art--stickies">
      {tag ? <span className="wx-worktable__step-tag">{tag}</span> : null}
      <div className="wx-sticky wx-sticky--a" style={{ "--r": "-6deg" }}>
        <span className="wx-sticky__line wx-sticky__line--head">user goals</span>
        <span className="wx-sticky__line" />
        <span className="wx-sticky__line" />
      </div>
      <div className="wx-sticky wx-sticky--b" style={{ "--r": "5deg" }}>
        <span className="wx-sticky__line wx-sticky__line--head">edge cases</span>
        <span className="wx-sticky__line" />
      </div>
      <div className="wx-sticky wx-sticky--c" style={{ "--r": "12deg" }}>
        <span className="wx-sticky__line wx-sticky__line--head">decisions</span>
        <span className="wx-sticky__line" />
        <span className="wx-sticky__line" />
      </div>
    </div>
  );
}

function StructureNotebook({ tag }) {
  return (
    <div className="wx-art wx-art--notebook">
      {tag ? <span className="wx-worktable__step-tag">{tag}</span> : null}
      <div className="wx-notebook">
        <div className="wx-notebook__binding" aria-hidden />
        <div className="wx-notebook__page wx-notebook__page--left">
          <svg viewBox="0 0 180 140" className="wx-notebook__flow">
            <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <rect x="14" y="16" width="44" height="22" rx="4" />
              <rect x="76" y="16" width="44" height="22" rx="4" />
              <rect x="138" y="16" width="32" height="22" rx="4" />
              <rect x="48" y="76" width="44" height="22" rx="4" />
              <rect x="110" y="76" width="44" height="22" rx="4" />
              <path d="M58 27 H76" markerEnd="url(#wx-arrow)" />
              <path d="M120 27 H138" markerEnd="url(#wx-arrow)" />
              <path d="M36 38 Q36 60 70 76" markerEnd="url(#wx-arrow)" />
              <path d="M92 87 H110" markerEnd="url(#wx-arrow)" />
            </g>
            <defs>
              <marker
                id="wx-arrow"
                viewBox="0 0 8 8"
                refX="6"
                refY="4"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0 0 L8 4 L0 8 z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="wx-notebook__page wx-notebook__page--right">
          <span className="wx-notebook__rule" />
          <span className="wx-notebook__rule" />
          <span className="wx-notebook__rule wx-notebook__rule--short" />
          <span className="wx-notebook__rule" />
          <span className="wx-notebook__rule wx-notebook__rule--shorter" />
        </div>
      </div>
    </div>
  );
}

function PrototypePhone({ tag }) {
  return (
    <div className="wx-art wx-art--phone">
      {tag ? <span className="wx-worktable__step-tag">{tag}</span> : null}
      <div className="wx-phone">
        <span className="wx-phone__notch" aria-hidden />
        <div className="wx-phone__screen">
          <div className="wx-phone__bar" />
          <div className="wx-phone__card">
            <span className="wx-phone__title" />
            <span className="wx-phone__sub" />
            <span className="wx-phone__sub wx-phone__sub--short" />
          </div>
          <div className="wx-phone__cta">
            <span className="wx-phone__cta-label">Continue</span>
            <span className="wx-phone__cursor" aria-hidden />
            <span className="wx-phone__ripple" aria-hidden />
          </div>
          <svg
            className="wx-phone__motion"
            viewBox="0 0 60 30"
            aria-hidden
            preserveAspectRatio="none"
          >
            <path
              d="M2 24 C 14 24, 22 8, 56 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HandoffLaptop({ tag }) {
  return (
    <div className="wx-art wx-art--laptop">
      {tag ? <span className="wx-worktable__step-tag">{tag}</span> : null}
      <div className="wx-spec" aria-hidden>
        <span className="wx-spec__row" />
        <span className="wx-spec__row" />
        <span className="wx-spec__row wx-spec__row--short" />
        <span className="wx-spec__row" />
        <span className="wx-spec__check" />
      </div>
      <div className="wx-laptop">
        <div className="wx-laptop__screen">
          <div className="wx-laptop__chrome">
            <span /> <span /> <span />
          </div>
          <div className="wx-laptop__canvas">
            <div className="wx-laptop__frame">
              <span className="wx-laptop__redline wx-laptop__redline--top" />
              <span className="wx-laptop__redline wx-laptop__redline--side" />
              <span className="wx-laptop__callout">A11y</span>
            </div>
            <div className="wx-laptop__panel">
              <span className="wx-laptop__panel-row" />
              <span className="wx-laptop__panel-row wx-laptop__panel-row--short" />
              <span className="wx-laptop__panel-row" />
            </div>
          </div>
        </div>
        <div className="wx-laptop__base" aria-hidden />
      </div>
    </div>
  );
}

/**
 * Returns the currently active step index (0..n-1) derived from where the
 * step elements sit relative to a "trigger line" at `triggerRatio` of the
 * viewport height. Active step = highest-index step whose top has crossed
 * above the trigger line. Monotonic by construction — only counts steps
 * the user has scrolled past, so the desk builds up as you read down.
 */
export function useActiveStepFromRefs(refs, { triggerRatio = 0.22 } = {}) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const compute = () => {
      const triggerY = window.innerHeight * triggerRatio;
      let max = 0;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= triggerY && i > max) max = i;
      });
      setActiveStep((prev) => (max === prev ? prev : max));
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [refs, triggerRatio]);

  return activeStep;
}
