import { useEffect } from "react";
import { DESKTOP_MIN_VW } from "./hooks.js";

/* Breathing room kept between the dodged cluster's right edge and the grid. */
const GAP = 24;
/* Vertical hysteresis — engage just before the grid touches the cluster band,
   release only once it has clearly left, so the boundary never chatters. */
const ENTER = 16;
const RELEASE = 56;
/* The dodge never pushes the cluster closer than this to the viewport's left edge. */
const EDGE_MIN = 12;

/**
 * Slides the sticky rail-lane cluster (the tablist with the theme toggle under
 * it — one grid child, .home-bottom-bar__dock) out of the way while the widened
 * work grid (single / two-up breakout) scrolls through its band.
 *
 * The trigger is purely vertical (grid box vs. the cluster band) and the
 * response purely horizontal (a --rail-dodge translate), so there is no
 * feedback loop. NATURAL x never comes from getBoundingClientRect, which would
 * read mid-flight positions while the dodge transition runs and corrupt the
 * next measurement: the cluster uses offsetLeft against the positioned
 * .content-wrapper. --work-avail (tokens.css) guarantees the escape lane
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
    let engaged = false;
    let shift = 0;
    let cluster = null;
    let observed = null;
    const ro = new ResizeObserver(() => schedule());

    function reset() {
      engaged = false;
      if (shift !== 0) {
        shift = 0;
        cluster?.style.removeProperty("--rail-dodge");
      }
    }

    function apply(target) {
      if (Math.abs(target - shift) < 0.5) return;
      shift = target;
      if (!cluster) return;
      if (target === 0) cluster.style.removeProperty("--rail-dodge");
      else cluster.style.setProperty("--rail-dodge", `${target}px`);
    }

    function measure() {
      raf = 0;
      /* Cheapest gate first — this runs on every scrolled frame, and below
         the breakout there is nothing to dodge, so skip the DOM queries. */
      if (window.innerWidth < DESKTOP_MIN_VW) return reset();
      const next = document.querySelector(
        ".stage__home .home-bottom-bar__dock",
      );
      /* The dock remounts across the case boundary — a fresh node carries no
         inline var, so the applied-shift bookkeeping restarts from zero. */
      if (next !== cluster) {
        cluster = next;
        shift = 0;
        engaged = false;
      }
      const grid = document.querySelector(
        ".stage__home .pgrid--single, .stage__home .pgrid--two",
      );
      if (!cluster || !grid || !cluster.offsetParent) {
        return reset();
      }

      if (grid !== observed) {
        if (observed) ro.unobserve(observed);
        ro.observe(grid);
        observed = grid;
      }

      const rect = cluster.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      /* Transform-independent natural x: offsetLeft against the positioned
         .content-wrapper, whose own rect is never transformed. */
      const naturalLeft =
        cluster.offsetParent.getBoundingClientRect().left + cluster.offsetLeft;

      const m = engaged ? RELEASE : ENTER;
      engaged =
        gridRect.top < rect.bottom + m && gridRect.bottom > rect.top - m;
      const need = engaged
        ? naturalLeft + cluster.offsetWidth + GAP - gridRect.left
        : 0;

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
