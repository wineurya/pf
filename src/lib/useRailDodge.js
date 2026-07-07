import { useEffect } from "react";
import { DESKTOP_MIN_VW } from "./hooks.js";

/* Breathing room kept between dodged chrome's right edge and the grid. */
const GAP = 24;
/* Vertical hysteresis — engage just before the grid touches a chrome band,
   release only once it has clearly left, so the boundary never chatters. */
const ENTER = 16;
const RELEASE = 56;
/* The dodge never pushes chrome closer than this to the viewport's left edge. */
const EDGE_MIN = 12;

/**
 * Slides the home chrome — the sticky tab rail (top) and the fixed theme
 * toggle (bottom, same left edge by design) — out of the way while the
 * widened work grid (single / two-up breakout) scrolls through their bands.
 *
 * The triggers are purely vertical (grid box vs. each chrome band) and the
 * response purely horizontal (a shared --rail-dodge translate), so there is
 * no feedback loop. Both elements ride ONE shift — the max of the engaged
 * needs — so their shared left edge holds through the pass. NATURAL x never
 * comes from getBoundingClientRect, which would read mid-flight positions
 * while the dodge transition runs and corrupt the next measurement: the rail
 * uses offsetLeft against the positioned .content-wrapper, the fixed toggle
 * its used `left`. --work-avail (tokens.css) guarantees the escape lane
 * exists at every viewport this runs on, so the shift is never pushed past
 * the page pad.
 *
 * `active` gates the whole behavior (work tab, gallery view, no case study);
 * `reflowKey` just re-measures when the view flips single ↔ two.
 */
export function useRailDodge(active, reflowKey) {
  useEffect(() => {
    if (!active) return;

    let raf = 0;
    let railEngaged = false;
    let toggleEngaged = false;
    let shift = 0;
    let rail = null;
    let toggle = null;
    let observed = null;
    const ro = new ResizeObserver(() => schedule());

    function reset() {
      railEngaged = false;
      toggleEngaged = false;
      if (shift !== 0) {
        shift = 0;
        rail?.style.removeProperty("--rail-dodge");
        toggle?.style.removeProperty("--rail-dodge");
      }
    }

    function apply(target) {
      if (Math.abs(target - shift) < 0.5) return;
      shift = target;
      for (const el of [rail, toggle]) {
        if (!el) continue;
        if (target === 0) el.style.removeProperty("--rail-dodge");
        else el.style.setProperty("--rail-dodge", `${target}px`);
      }
    }

    function measure() {
      raf = 0;
      /* Cheapest gate first — this runs on every scrolled frame, and below
         the breakout there is nothing to dodge, so skip the DOM queries. */
      if (window.innerWidth < DESKTOP_MIN_VW) return reset();
      const nextRail = document.querySelector(".stage__home .rail");
      /* The home toggle lives inside the unified dock shell at every width;
         at ≥860px the base .theme-toggle rule lifts it out as position:fixed.
         Stage-scoped so the case study's --case variant never matches. */
      const nextToggle = document.querySelector(".stage__home .theme-toggle");
      /* The dock remounts across the case boundary — a fresh node carries no
         inline var, so the applied-shift bookkeeping restarts from zero. */
      if (nextRail !== rail || nextToggle !== toggle) {
        rail = nextRail;
        toggle = nextToggle;
        shift = 0;
        railEngaged = false;
        toggleEngaged = false;
      }
      const grid = document.querySelector(
        ".stage__home .pgrid--single, .stage__home .pgrid--two",
      );
      if (!rail || !grid || !rail.offsetParent) {
        return reset();
      }

      if (grid !== observed) {
        if (observed) ro.unobserve(observed);
        ro.observe(grid);
        observed = grid;
      }

      const railRect = rail.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      /* Transform-independent natural x: offsetLeft against the positioned
         .content-wrapper, whose own rect is never transformed. */
      const naturalLeft =
        rail.offsetParent.getBoundingClientRect().left + rail.offsetLeft;

      const mRail = railEngaged ? RELEASE : ENTER;
      railEngaged =
        gridRect.top < railRect.bottom + mRail &&
        gridRect.bottom > railRect.top - mRail;
      let need = railEngaged
        ? naturalLeft + rail.offsetWidth + GAP - gridRect.left
        : 0;

      if (toggle) {
        const tRect = toggle.getBoundingClientRect();
        /* Fixed elements have no offsetParent — the used `left` is the
           transform-independent natural x (the dodge rides `translate`). */
        const tLeft = parseFloat(getComputedStyle(toggle).left) || 0;
        const mT = toggleEngaged ? RELEASE : ENTER;
        toggleEngaged =
          gridRect.top < tRect.bottom + mT && gridRect.bottom > tRect.top - mT;
        if (toggleEngaged) {
          need = Math.max(need, tLeft + toggle.offsetWidth + GAP - gridRect.left);
        }
      }

      const target =
        need > 0 ? -Math.min(need, Math.max(naturalLeft - EDGE_MIN, 0)) : 0;
      apply(target);
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      cancelAnimationFrame(raf);
      reset();
    };
  }, [active, reflowKey]);
}
