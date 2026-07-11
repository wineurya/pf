import { motion } from "motion/react";
import { playDungSfx } from "../lib/dungSfx.js";
import { usePrefersReducedMotion } from "../lib/hooks.js";
import { EASE_OUT, dockMorph, uiExit } from "../lib/motion.js";

/**
 * Sun ⟷ moon morph toggle. An in-flow button — each surface slots it into its
 * own control cluster (desktop rail, mobile header, floating case dock).
 *
 * `layoutId` (desktop rail instances only) makes the toggle a shared element:
 * opening/closing a case study glides ONE toggle between the home cluster and
 * the case rail instead of popping two. Standalone mounts (initial load,
 * mobile header, case dock) play the radial wipe instead — Motion skips
 * `initial` automatically when a layoutId counterpart exists. The mobile
 * header/dock instances must NOT get a layoutId: the case dock lives inside
 * the morphing `m-dock-shell` and nested shared elements fight its FLIP.
 * `layoutDependency` is pinned so re-renders (theme flips) while the sticky
 * cluster is scrolled never re-measure and fake a layout delta.
 *
 * The icon morph stays CSS: core radius grows into a disc, a mask circle
 * slides in to carve the crescent, rays rotate out (cx/cy/r transition as
 * presentation properties).
 */
export function ThemeToggle({ theme, onToggle, layoutId }) {
  const dark = theme === "dark";
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.button
      type="button"
      className="theme-toggle"
      data-mode={theme}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      onClick={onToggle}
      onPointerEnter={playDungSfx}
      layoutId={layoutId}
      layoutDependency={layoutId ? true : undefined}
      initial={
        reducedMotion ? false : { clipPath: "circle(0% at 50% 50%)" }
      }
      animate={{ clipPath: "circle(80% at 50% 50%)" }}
      /* Exit phase (leaving a case study): without this, the demoted case-rail
         instance lingers at full opacity — riding the lead's x-shift as a
         second sun — until the exiting article unmounts. A fast fade hands the
         moment to the one toggle gliding back to the home cluster. */
      exit={{ opacity: 0, transition: uiExit(reducedMotion) }}
      whileTap={{ scale: 0.97 }}
      transition={{
        clipPath: { duration: 0.52, ease: EASE_OUT, delay: 0.09 },
        layout: dockMorph(reducedMotion),
      }}
    >
      <svg
        className="tt"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        aria-hidden="true"
      >
        <mask id="tt-moon-mask">
          <rect width="24" height="24" fill="#fff" />
          <circle className="tt__mask" cx="29" cy="-5" r="7.6" fill="#000" />
        </mask>
        <circle
          className="tt__core"
          cx="12"
          cy="12"
          r="4.4"
          fill="currentColor"
          mask="url(#tt-moon-mask)"
        />
        <g
          className="tt__rays"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <line x1="12" y1="2.6" x2="12" y2="4.8" />
          <line x1="12" y1="19.2" x2="12" y2="21.4" />
          <line x1="2.6" y1="12" x2="4.8" y2="12" />
          <line x1="19.2" y1="12" x2="21.4" y2="12" />
          <line x1="5.36" y1="5.36" x2="6.9" y2="6.9" />
          <line x1="17.1" y1="17.1" x2="18.64" y2="18.64" />
          <line x1="5.36" y1="18.64" x2="6.9" y2="17.1" />
          <line x1="17.1" y1="6.9" x2="18.64" y2="5.36" />
        </g>
      </svg>
    </motion.button>
  );
}
