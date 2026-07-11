import { useId, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MeshGradient } from "@paper-design/shaders-react";

import { AnimatedNumber } from "@/exploration/shared/AnimatedNumber.jsx";
import {
  BILLING_PERIODS,
  BILLING_PLANS,
} from "@/exploration/billingTabs/billingTabsData.js";
import { burstShapes } from "@/exploration/billingTabs/shapeBurst.js";

const EASE = [0.22, 1, 0.36, 1];
const CLIP_MS = 260;
const CLIP_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

/* Soft emerald mesh for the featured plan's corner wash. */
const FEATURED_MESH = ["#ecfdf5", "#6ee7b7", "#10b981", "#059669"];

/* Curved top-right triangle mask: top-middle → rounded TR corner →
   ~34% down the right edge. Feathers to nothing on the inner edge.
   TR of the path is rounded (~card radius) so the wash doesn't square the corner. */
const TRI_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><defs><filter id="f" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="0.035"/></filter><linearGradient id="g" gradientUnits="objectBoundingBox" x1="0.42" y1="0.3" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.4" stop-color="#fff" stop-opacity="0.15"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient></defs><path d="M0.42 0H0.9Q1 0 1 0.08V0.34Q0.82 0.06 0.42 0Z" fill="url(#g)" filter="url(#f)"/></svg>`,
)}")`;

const SHADER_STYLE = { width: "100%", height: "100%" };
const MASK_STYLE = { WebkitMaskImage: TRI_MASK, maskImage: TRI_MASK };

function CheckMark() {
  return (
    <svg
      className="bt-check"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 6.5L5 9L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TabContent({ period }) {
  return (
    <>
      <span className="bt-tab-label">{period.label}</span>
      {period.chip ? <span className="bt-tab-chip">{period.chip}</span> : null}
    </>
  );
}

function PriceNote({ text, reduceMotion }) {
  const hidden = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 };
  const shown = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
  const gone = reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 };

  return (
    <p className="bt-price-note">
      <AnimatePresence initial={false}>
        <motion.span
          key={text}
          initial={hidden}
          animate={shown}
          exit={gone}
          transition={{ duration: reduceMotion ? 0.1 : 0.22, ease: EASE }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}

function FeaturedCornerWash({ reduceMotion }) {
  return (
    <div
      className={reduceMotion ? "bt-plan-wash" : "bt-plan-wash is-alive"}
      aria-hidden="true"
    >
      <div className="bt-plan-wash-shader" style={MASK_STYLE}>
        <MeshGradient
          colors={FEATURED_MESH}
          distortion={0.55}
          swirl={0.2}
          grainMixer={0.12}
          grainOverlay={0.08}
          speed={reduceMotion ? 0 : 0.45}
          scale={1}
          fit="cover"
          style={SHADER_STYLE}
        />
      </div>
    </div>
  );
}

function PlanColumn({ plan, period, reduceMotion, onCta }) {
  return (
    <section
      className="bt-plan"
      data-featured={plan.featured || undefined}
      aria-label={`${plan.name} plan`}
    >
      {plan.featured ? <FeaturedCornerWash reduceMotion={reduceMotion} /> : null}
      <header className="bt-plan-head">
        <p className="bt-plan-name">{plan.name}</p>
        {plan.featured ? <span className="bt-plan-tag">Popular</span> : null}
      </header>
      <div className="bt-price-block">
        <p className="bt-price">
          <span className="bt-price-currency" aria-hidden="true">
            $
          </span>
          <AnimatedNumber
            value={plan.price[period]}
            className="bt-price-figure"
          />
          <span className="bt-price-unit">/mo</span>
        </p>
        <PriceNote text={plan.note[period]} reduceMotion={reduceMotion} />
      </div>
      <div className="bt-features-block">
        <p className="bt-features-label">Included:</p>
        <ul className="bt-features">
          {plan.features.map((feature) => (
            <li key={feature}>
              <CheckMark />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="bt-cta"
        onClick={(event) => onCta(event, plan)}
      >
        {plan.cta}
      </button>
    </section>
  );
}

/** Billing period tabs — exclusion tabs over two plan cards; the featured
    plan's corner uses a masked MeshGradient; shared cursor outline on both
    cards; prices morph; CTA fires a shape burst. */
export function BillingTabsStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [period, setPeriod] = useState("monthly");
  const baseId = useId();

  const trackRef = useRef(null);
  const overlayRef = useRef(null);
  const tabRefs = useRef(new Map());
  const mountedRef = useRef(false);
  const burstRef = useRef(null);
  const panelRef = useRef(null);

  const panelId = `${baseId}-panel`;
  const tabId = (id) => `${baseId}-tab-${id}`;

  /* Cursor outline: one panel listener writes --mx/--my on every card so the
     neighbor rim reacts too. The card under the pointer gets data-hot (+12%).
     Moves coalesce to one rAF frame — pointermove can outpace the display
     (high-poll mice), and each frame reads rects and writes styles; the card
     list is static, so it's queried once. */
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || reduceMotion) return undefined;

    const cards = panel.querySelectorAll(".bt-plan");
    let raf = 0;
    let pointer = null;

    const frame = () => {
      raf = 0;
      const { clientX, clientY } = pointer;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${clientX - rect.left}px`);
        card.style.setProperty("--my", `${clientY - rect.top}px`);
        const hot =
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;
        card.toggleAttribute("data-hot", hot);
        card.style.setProperty("--bt-glow", "1");
      }
    };

    const onMove = (event) => {
      pointer = event;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onLeave = () => {
      /* Drop any queued frame — it would re-light the glow after the leave. */
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      for (const card of cards) {
        card.style.setProperty("--bt-glow", "0");
        card.removeAttribute("data-hot");
      }
    };

    panel.addEventListener("pointermove", onMove, { passive: true });
    panel.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const overlay = overlayRef.current;
    const tab = tabRefs.current.get(period);
    if (!track || !overlay || !tab) return undefined;

    const apply = (animate) => {
      const right = overlay.offsetWidth - tab.offsetLeft - tab.offsetWidth;
      const bottom = overlay.offsetHeight - tab.offsetTop - tab.offsetHeight;
      const target = `inset(${tab.offsetTop}px ${right}px ${bottom}px ${tab.offsetLeft}px round 999px)`;
      const current = getComputedStyle(overlay).clipPath;
      overlay.style.clipPath = target;
      if (animate && current !== "none") {
        overlay.animate(
          { clipPath: [current, target] },
          { duration: CLIP_MS, easing: CLIP_EASING },
        );
      }
    };

    apply(mountedRef.current && !reduceMotion);
    mountedRef.current = true;

    const ro = new ResizeObserver(() => apply(false));
    ro.observe(track);
    return () => ro.disconnect();
  }, [period, reduceMotion]);

  const onCta = (event, plan) => {
    if (reduceMotion) return;
    const layer = burstRef.current;
    if (!layer) return;
    const box = layer.getBoundingClientRect();
    if (!box.width) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const scale = box.width / layer.offsetWidth || 1;
    burstShapes(layer, {
      x: (rect.left + rect.width / 2 - box.left) / scale,
      y: (rect.top + rect.height / 2 - box.top) / scale,
      power: plan.featured ? 1 : 0.55,
    });
  };

  const onTablistKeyDown = (event) => {
    const ids = BILLING_PERIODS.map((p) => p.id);
    const index = ids.indexOf(period);
    let next = null;
    if (event.key === "ArrowRight") next = ids[(index + 1) % ids.length];
    else if (event.key === "ArrowLeft")
      next = ids[(index - 1 + ids.length) % ids.length];
    else if (event.key === "Home") next = ids[0];
    else if (event.key === "End") next = ids[ids.length - 1];
    if (!next || next === period) return;
    event.preventDefault();
    setPeriod(next);
    tabRefs.current.get(next)?.focus();
  };

  return (
    <div className={className ? `bt-root ${className}` : "bt-root"}>
      <section className="bt-stage" aria-label="Pricing plans">
        <div className="bt-burst" ref={burstRef} aria-hidden="true" />
        <div className="bt-tabs" ref={trackRef}>
          <div
            className="bt-tabs-row"
            role="tablist"
            aria-label="Billing period"
            onKeyDown={onTablistKeyDown}
          >
            {BILLING_PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={tabId(p.id)}
                className="bt-tab"
                aria-selected={period === p.id}
                aria-controls={panelId}
                tabIndex={period === p.id ? 0 : -1}
                onClick={() => setPeriod(p.id)}
                ref={(node) => {
                  if (node) tabRefs.current.set(p.id, node);
                  else tabRefs.current.delete(p.id);
                }}
              >
                <TabContent period={p} />
              </button>
            ))}
          </div>
          <div className="bt-tabs-overlay" ref={overlayRef} aria-hidden="true">
            <div className="bt-tabs-row">
              {BILLING_PERIODS.map((p) => (
                <span key={p.id} className="bt-tab">
                  <TabContent period={p} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="bt-panel"
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(period)}
          ref={panelRef}
        >
          {BILLING_PLANS.map((plan) => (
            <PlanColumn
              key={plan.id}
              plan={plan}
              period={period}
              reduceMotion={reduceMotion}
              onCta={onCta}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
