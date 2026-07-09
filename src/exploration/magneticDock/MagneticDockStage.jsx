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

/** One window pointermove for the whole dock — batches layout reads, then
    writes springs. Fine pointer only; touch belongs to useDockScrub. */
function useDockMagnet(dockRef, registry) {
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const dock = dockRef.current;
    /* ponytail: pointer capability checked once at mount — devices that swap
       pointers mid-session re-evaluate on next mount, which is fine here. */
    if (
      !dock ||
      reduceMotion ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return undefined;
    }

    const { radius, strength, innerRadius, innerDamp } = MAGNETIC_DEFAULTS;

    const rest = () => {
      for (const entry of registry.current) {
        entry.magnetX.set(0);
        entry.magnetY.set(0);
        entry.magnetPull.set(0);
      }
    };

    const onMove = (event) => {
      if (event.pointerType === "touch") return;

      const dockRect = dock.getBoundingClientRect();
      const { clientX, clientY } = event;
      const entries = registry.current;

      /* Reads first (offset* ignores transform — no magnet feedback loop). */
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const el = entry.el.current;
        if (!el) {
          entry._dx = 0;
          entry._dy = radius;
          continue;
        }
        entry._dx = clientX - (dockRect.left + el.offsetLeft + el.offsetWidth / 2);
        entry._dy = clientY - (dockRect.top + el.offsetTop + el.offsetHeight / 2);
      }

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const next = magneticPull(
          entry._dx,
          entry._dy,
          radius,
          strength,
          innerRadius,
          innerDamp,
        );
        entry.magnetX.set(next.x);
        entry.magnetY.set(next.y);
        entry.magnetPull.set(next.t);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", rest);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", rest);
      rest();
    };
  }, [dockRef, reduceMotion, registry]);
}

/** Touch companion: press-and-drag along the dock lifts the icon nearest the
    finger. No-op unless a coarse pointer exists; ignores mouse so hybrids keep
    the fine-pointer magnet. */
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
        entry.scrubY.set(0);
        entry.scrubPull.set(0);
      }
    };

    const update = (clientX) => {
      const dockRect = dock.getBoundingClientRect();
      const entries = registry.current;

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const el = entry.el.current;
        if (!el) {
          entry._dx = SCRUB_DEFAULTS.radius;
          continue;
        }
        entry._dx = clientX - (dockRect.left + el.offsetLeft + el.offsetWidth / 2);
      }

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const next = scrubLift(entry._dx, SCRUB_DEFAULTS.radius, SCRUB_DEFAULTS.lift);
        entry.scrubY.set(next.y);
        entry.scrubPull.set(next.t);
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
  const magnetX = useSpring(0, MAGNET_SPRING);
  const magnetY = useSpring(0, MAGNET_SPRING);
  const magnetPull = useSpring(0, MAGNET_SPRING);
  const scrubY = useSpring(0, MAGNET_SPRING);
  const scrubPull = useSpring(0, MAGNET_SPRING);

  useEffect(() => {
    const entry = {
      el: ref,
      magnetX,
      magnetY,
      magnetPull,
      scrubY,
      scrubPull,
    };
    const list = registry.current;
    list.push(entry);
    return () => {
      const index = list.indexOf(entry);
      if (index !== -1) list.splice(index, 1);
    };
  }, [registry, magnetX, magnetY, magnetPull, scrubY, scrubPull]);

  /* Only one path moves per pointer type, so summing is safe on hybrids. */
  const y = useTransform([magnetY, scrubY], ([m, s]) => m + s);
  /* Smoothstep falloff means only the nearest icon sits high on the curve, so
     squaring it keeps the scale bump visually exclusive to that one. The
     scrub term is stronger — on touch, lift + scale carry the whole effect. */
  const scale = useTransform(
    [magnetPull, scrubPull],
    ([m, s]) => 1 + m * m * 0.05 + s * SCRUB_DEFAULTS.scale,
  );
  /* Strongest proximity wins — drives fill opacity in styles.css.
     Square the magnet term so only the nearest icon lights up. */
  const pull = useTransform(
    [magnetPull, scrubPull],
    ([m, s]) => Math.max(m * m, s),
  );

  return (
    <motion.button
      ref={ref}
      type="button"
      className="mgd-icon"
      style={{ x: magnetX, y, scale, "--mgd-pull": pull }}
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
  useDockMagnet(dockRef, registry);
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
