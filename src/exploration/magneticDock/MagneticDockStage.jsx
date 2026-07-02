import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";

import {
  MAGNET_SPRING,
  MAGNETIC_DEFAULTS,
  magneticPull,
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

function DockIcon({ label, children }) {
  const ref = useRef(null);
  const { x, y, pull } = useMagnetic(ref, MAGNETIC_DEFAULTS);
  /* Smoothstep falloff means only the nearest icon sits high on the curve, so
     squaring it keeps the scale bump visually exclusive to that one. */
  const scale = useTransform(pull, (t) => 1 + t * t * 0.05);

  return (
    <motion.button
      ref={ref}
      type="button"
      className="mgd-icon"
      style={{ x, y, scale }}
      aria-label={label}
    >
      {children}
    </motion.button>
  );
}

/** Interactive magnetic-dock canvas — no demo frame or dock. */
export function MagneticDockStage({ className }) {
  return (
    <div className={className ? `mgd-root ${className}` : "mgd-root"}>
      <main className="mgd-stage" aria-label="Magnetic dock">
        <div className="mgd-dock">
          <DockIcon label="Work">
            <IconTabWork size={20} ariaHidden />
          </DockIcon>
          <DockIcon label="Exploration">
            <IconTabExploration size={20} ariaHidden />
          </DockIcon>
          <DockIcon label="About">
            <IconTabAbout size={20} ariaHidden />
          </DockIcon>
          <DockIcon label="Palette">
            <IconColorPalette size={20} ariaHidden />
          </DockIcon>
          <DockIcon label="Map">
            <IconMapPin size={20} ariaHidden />
          </DockIcon>
        </div>
      </main>
    </div>
  );
}
