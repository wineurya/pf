import { useRef } from "react";
import { motion } from "motion/react";
import { fillMorph } from "../lib/motion.js";
import { useMediaQuery, usePrefersReducedMotion } from "../lib/hooks.js";
import { playDungSfx } from "../lib/dungSfx.js";
import {
  IconLayoutGrid2,
  IconList,
  IconSquarePlaceholder,
} from "../lib/icons.jsx";

/**
 * Icon segmented control that picks how the work projects lay out. Mirrors the
 * Tabs rail: a radiogroup with roving tabindex + arrow keys, and one shared gray
 * fill (layoutId) that glides + reshapes between the selected options — the same
 * motion language as the section tabs, kept deliberately quiet (icons only).
 */
export const WORK_VIEWS = [
  { id: "single", label: "Single column", Icon: IconSquarePlaceholder },
  { id: "two", label: "Two at a time", Icon: IconLayoutGrid2 },
  { id: "list", label: "List", Icon: IconList },
];

/** Matches .pgrid--two single-column fallback in app.css. */
export const VIEW_TWO_DISABLED_MQ = "(max-width: 520px)";

export function ViewSwitcher({ value, onChange }) {
  const refs = useRef({});
  const ids = WORK_VIEWS.map((v) => v.id);
  const reducedMotion = usePrefersReducedMotion();
  const twoUpDisabled = useMediaQuery(VIEW_TWO_DISABLED_MQ);
  const enabledIds = twoUpDisabled ? ids.filter((id) => id !== "two") : ids;

  function onKeyDown(e) {
    const i = enabledIds.indexOf(value);
    const base = i === -1 ? 0 : i;
    let next;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      next = enabledIds[(base + 1) % enabledIds.length];
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      next = enabledIds[(base - 1 + enabledIds.length) % enabledIds.length];
    } else if (e.key === "Home") next = enabledIds[0];
    else if (e.key === "End") next = enabledIds[enabledIds.length - 1];
    else return;
    e.preventDefault();
    onChange(next);
    refs.current[next]?.focus();
  }

  return (
    <div
      className="viewsel"
      role="radiogroup"
      aria-label="Project layout"
      onKeyDown={onKeyDown}
    >
      {WORK_VIEWS.map(({ id, label, Icon }) => {
        const selected = id === value;
        const disabled = id === "two" && twoUpDisabled;
        return (
          <button
            key={id}
            ref={(el) => {
              refs.current[id] = el;
            }}
            type="button"
            className="viewsel__btn"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={label}
            tabIndex={selected && !disabled ? 0 : -1}
            disabled={disabled}
            onClick={() => onChange(id)}
            onPointerEnter={disabled ? undefined : playDungSfx}
          >
            {selected && (
              <motion.span
                className="viewsel__fill"
                layoutId="view-fill"
                aria-hidden="true"
                transition={fillMorph(reducedMotion)}
              />
            )}
            <Icon className="viewsel__icon" size={17} ariaHidden />
          </button>
        );
      })}
    </div>
  );
}
