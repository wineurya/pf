import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { usePrefersReducedMotion } from "../lib/hooks.js";
import bgBand from "../assets/backdrop/bg-6-11.png";

/* Mask SVG geometry — mirrors scrim-blob.svg (Figma node 557:168): the blob
   path's bbox is 1732×669, blurred σ 170 horizontal / 80 vertical, with 2.5σ
   margins baked into the 2582×1069 viewBox. All fractions of the rendered box
   derive from those numbers, so the sizing math below speaks in real visual
   terms: solid core, and a ~4σ fade from kill to full glow. */
const VIEW_W = 2582;
const VIEW_H = 1069;
const SIGMA_X = 170 / VIEW_W;
const SIGMA_Y = 80 / VIEW_H;
const CORE_W = 1732 / VIEW_W;
const CORE_H = 669 / VIEW_H;
const CORE_TOP = 200 / VIEW_H;
const BLOB_RATIO = VIEW_H / VIEW_W;
/* Fraction of the band the content must intrude past for full stretch — kept
   small so links/copy that reach the glow get the full wall, and partial
   stretch only shows while content barely grazes the band. */
const STRETCH_SPAN = 0.3;

/* Height of the fixed glow band (mirrors .backdrop in app.css: 25vw, max 480). */
const bandHeight = () => Math.min(window.innerWidth * 0.25, 480);

/**
 * Fixed ambient glow — Figma node 558:173 (bg 6-11 1, 1920×480) — with a
 * stretch-to-cover legibility mask. The blurred blob (Figma 557:168) sits big
 * and centered over the content column and is composited *out* of the image
 * (mask-composite: exclude), erasing the glow behind copy while it survives
 * at the page edges.
 *
 * The blob's vertical stretch follows how far the active content column
 * intrudes into the band: case studies (text flows past the screen) hold it
 * fully stretched from first paint; short surfaces relax it back toward the
 * natural centered blob. Targets are re-measured on scroll/resize/layout and
 * eased with a GSAP tween, so tab swaps and case-study transitions scale and
 * stretch smoothly instead of jumping. Everything is written as --blob-* CSS
 * vars on the root — no React re-renders. `surfaceKey` re-measures when the
 * active surface (tab / case study) swaps.
 */
export function Backdrop({ surfaceKey }) {
  const rootRef = useRef(null);
  /* Shared between the two effects below. */
  const driverRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const state = { stretch: 0 };
    const column = { left: 0, width: 0 };
    let target = -1;
    /* First measure lands settled — a deep-loaded case study must be born
       fully stretched, not animate into place. */
    let first = true;
    const vars = new Map();

    function setVar(name, v) {
      const next = Math.round(v * 100) / 100;
      const prev = vars.get(name);
      if (prev !== undefined && Math.abs(next - prev) < 0.25) return;
      vars.set(name, next);
      root.style.setProperty(name, `${next}px`);
    }

    function apply() {
      const bandH = bandHeight();
      const colW = Math.max(column.width, 320);
      /* Wide enough that the fully-killed zone (core inset 2σ each side)
         covers the column plus breathing room — the whole 4σ fade from kill
         to full glow lives outside the copy, in the page's corner lobes. */
      const blobW = (colW / (CORE_W - 4 * SIGMA_X)) * 1.15;
      const naturalH = blobW * BLOB_RATIO;
      /* Stretched: tall enough that both blurred ends clear the band — full
         kill from the glow's top line down past the viewport bottom. */
      const stretchedH = Math.max((bandH / (CORE_H - 4 * SIGMA_Y)) * 1.1, naturalH);
      const h = naturalH + (stretchedH - naturalH) * state.stretch;
      /* Retracted: centered on the band. Stretched: the silhouette's top is
         pinned 2σ above the band's first row, growth pushes downward. */
      const topCentered = (bandH - naturalH) / 2;
      const topStretched = -(CORE_TOP + 2 * SIGMA_Y) * h;
      setVar("--blob-x", column.left + column.width / 2 - blobW / 2);
      setVar("--blob-y", topCentered + (topStretched - topCentered) * state.stretch);
      setVar("--blob-w", blobW);
      setVar("--blob-h", h);
    }

    function setStretch(next) {
      if (first) {
        first = false;
        target = next;
        state.stretch = next;
        apply();
        return;
      }
      if (Math.abs(next - target) < 0.01) return;
      target = next;
      gsap.to(state, {
        stretch: next,
        duration: reducedMotion ? 0 : 0.55,
        ease: "power3.inOut",
        overwrite: "auto",
        onUpdate: apply,
      });
    }

    let raf = 0;
    let observed = null;
    const ro = new ResizeObserver(() => schedule());

    function measure() {
      raf = 0;
      const content =
        document.querySelector(".cs") || document.querySelector(".stage__home");
      if (content !== observed) {
        if (observed) ro.unobserve(observed);
        if (content) ro.observe(content);
        observed = content;
      }
      if (!content) {
        setStretch(0);
        return;
      }

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const bandH = bandHeight();
      const r = content.getBoundingClientRect();
      column.left = r.left;
      column.width = r.width;

      /* How deep the copy reaches into the band → how far the blob stretches. */
      const overlap = Math.min(vh, r.bottom) - (vh - bandH);
      const offscreen = r.right <= 0 || r.left >= vw;
      const intrusion =
        offscreen || r.width <= 0
          ? 0
          : Math.min(Math.max(overlap / (bandH * STRETCH_SPAN), 0), 1);
      setStretch(intrusion);
      apply();
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    driverRef.current = { measure };

    return () => {
      driverRef.current = null;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      cancelAnimationFrame(raf);
      gsap.killTweensOf(state);
    };
  }, [reducedMotion]);

  /* Surface swap (tab / case study) — re-measure once the new column has
     revealed in so the stretch glides to the new surface's state. */
  useEffect(() => {
    const driver = driverRef.current;
    if (!driver) return;
    driver.measure();
    const settle = [140, 520].map((ms) => setTimeout(driver.measure, ms));
    return () => settle.forEach(clearTimeout);
  }, [surfaceKey]);

  return (
    <div
      className="backdrop"
      ref={rootRef}
      aria-hidden="true"
    >
      <img className="backdrop__img" src={bgBand} alt="" decoding="async" />
    </div>
  );
}
