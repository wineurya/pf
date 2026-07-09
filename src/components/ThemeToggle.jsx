import { playDungSfx } from "../lib/dungSfx.js";

/**
 * Sun ⟷ moon morph toggle, fixed to the bottom-left and x-aligned with the
 * rail tabs. The core circle grows into a disc while a mask circle slides in
 * to carve the crescent; rays rotate and shrink away. All motion is CSS
 * (cx/cy/r are transitionable presentation properties).
 */
export function ThemeToggle({ theme, onToggle, caseOpen = false }) {
  const dark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle${caseOpen ? " theme-toggle--case" : ""}`}
      data-mode={theme}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      onClick={onToggle}
      onPointerEnter={playDungSfx}
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
    </button>
  );
}
