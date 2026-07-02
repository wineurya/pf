import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";

import {
  MAGNET_SPRING,
  MAGNETIC_DEFAULTS,
  SCRUB_DEFAULTS,
  magneticPull,
  scrubLift,
} from "@/exploration/magneticDock/magneticDockPhysics.js";
import {
  IconColorPalette,
  IconMapPin,
  IconTabAbout,
  IconTabExploration,
  IconTabWork,
} from "@/lib/icons.jsx";

/** Magnetic pull toward the cursor for the element behind `ref`. Meant for
    reuse on real buttons/nav links, not just this card. Returns motion values:
    x/y displacement plus `pull`, the eased 0–1 proximity (drive a scale bump
    from it). Complete no-op on coarse pointers and under reduced motion. */
export function useMagnetic(
  ref,
  { radius, strength, innerRadius, innerDamp } = MAGNETIC_DEFAULTS,
) {
  const reduceMotion = useReducedMotion() ?? false;
  const x = useSpring(0, MAGNET_SPRING);
  const y = useSpring(0, MAGNET_SPRING);
  const pull = useSpring(0, MAGNET_SPRING);

  useEffect(() => {
    /* ponytail: pointer capability checked once at mount — devices that swap
       pointers mid-session re-evaluate on next mount, which is fine here. */
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    const rest = () => {
      x.set(0);
      y.set(0);
      pull.set(0);
    };

    const onMove = (event) => {
      /* Touch moves belong to the dock scrub — on hybrid devices both paths
         are live, and the magnet must not also chase a scrubbing finger. */
      if (event.pointerType === "touch") return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = magneticPull(
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2),
        radius,
        strength,
        innerRadius,
        innerDamp,
      );
      x.set(next.x);
      y.set(next.y);
      pull.set(next.t);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", rest);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", rest);
      rest();
    };
  }, [innerDamp, innerRadius, pull, radius, reduceMotion, ref, strength, x, y]);

  return { x, y, pull };
}

/** Touch companion to `useMagnetic`: press-and-drag along the dock lifts the
    icon nearest the finger (macOS-dock scrub, keyboard-key-preview style).
    Icons registered by DockIcon expose their own springs; this hook only
    drives them. No-op unless a coarse pointer exists; ignores mouse input so
    hybrid devices keep the fine-pointer magnet. */
function useDockScrub(dockRef, registry) {
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const dock = dockRef.current;
    if (
      !dock ||
      reduceMotion ||
      !window.matchMedia("(any-pointer: coarse)").matches
    ) {
      return undefined;
    }

    let activePointer = null;

    const rest = () => {
      activePointer = null;
      for (const entry of registry.current) {
        entry.y.set(0);
        entry.pull.set(0);
      }
    };

    /* Horizontal-only distance: translateY and scale (origin center) leave
       each rect's center x stable, so reading rects mid-scrub can't feed back
       into the falloff the way the 2D cursor magnet would. */
    const update = (clientX) => {
      for (const entry of registry.current) {
        const el = entry.el.current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const next = scrubLift(
          clientX - (rect.left + rect.width / 2),
          SCRUB_DEFAULTS.radius,
          SCRUB_DEFAULTS.lift,
        );
        entry.y.set(next.y);
        entry.pull.set(next.t);
      }
    };

    const onMove = (event) => {
      if (event.pointerId === activePointer) update(event.clientX);
    };
    const onEnd = (event) => {
      if (event.pointerId === activePointer) rest();
    };
    /* No pointer capture — it would retarget the tap's click away from the
       buttons. Window listeners cover fingers that wander off the dock. */
    const onDown = (event) => {
      if (event.pointerType === "mouse") return;
      activePointer = event.pointerId;
      update(event.clientX);
    };

    dock.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);

    return () => {
      dock.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
      rest();
    };
  }, [dockRef, reduceMotion, registry]);
}

function DockIcon({ label, registry, children }) {
  const ref = useRef(null);
  const magnet = useMagnetic(ref, MAGNETIC_DEFAULTS);
  const scrubY = useSpring(0, MAGNET_SPRING);
  const scrubPull = useSpring(0, MAGNET_SPRING);

  useEffect(() => {
    const entry = { el: ref, y: scrubY, pull: scrubPull };
    const list = registry.current;
    list.push(entry);
    return () => {
      const index = list.indexOf(entry);
      if (index !== -1) list.splice(index, 1);
    };
  }, [registry, scrubY, scrubPull]);

  /* Only one path moves per pointer type, so summing is safe on hybrids. */
  const y = useTransform([magnet.y, scrubY], ([m, s]) => m + s);
  /* Smoothstep falloff means only the nearest icon sits high on the curve, so
     squaring it keeps the scale bump visually exclusive to that one. The
     scrub term is stronger — on touch, lift + scale carry the whole effect. */
  const scale = useTransform(
    [magnet.pull, scrubPull],
    ([m, s]) => 1 + m * m * 0.05 + s * SCRUB_DEFAULTS.scale,
  );

  return (
    <motion.button
      ref={ref}
      type="button"
      className="mgd-icon"
      style={{ x: magnet.x, y, scale }}
      aria-label={label}
    >
      {children}
    </motion.button>
  );
}

/** Interactive magnetic-dock canvas — no demo frame or dock. */
export function MagneticDockStage({ className }) {
  const dockRef = useRef(null);
  const registry = useRef([]);
  useDockScrub(dockRef, registry);

  return (
    <div className={className ? `mgd-root ${className}` : "mgd-root"}>
      <main className="mgd-stage" aria-label="Magnetic dock">
        <div className="mgd-dock" ref={dockRef}>
          <DockIcon label="Work" registry={registry}>
            <IconTabWork size={20} ariaHidden />
          </DockIcon>
          <DockIcon label="Exploration" registry={registry}>
            <IconTabExploration size={20} ariaHidden />
          </DockIcon>
          <DockIcon label="About" registry={registry}>
            <IconTabAbout size={20} ariaHidden />
          </DockIcon>
          <DockIcon label="Palette" registry={registry}>
            <IconColorPalette size={20} ariaHidden />
          </DockIcon>
          <DockIcon label="Map" registry={registry}>
            <IconMapPin size={20} ariaHidden />
          </DockIcon>
        </div>
      </main>
    </div>
  );
}
