import { useRef } from "react";
import { motion } from "motion/react";
import { fillMorph } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../lib/hooks.js";
import {
  IconBulletList,
  IconLayoutGrid2,
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
  { id: "list", label: "List", Icon: IconBulletList },
];

export function ViewSwitcher({ value, onChange }) {
  const refs = useRef({});
  const ids = WORK_VIEWS.map((v) => v.id);
  const reducedMotion = usePrefersReducedMotion();

  function onKeyDown(e) {
    const i = ids.indexOf(value);
    let next;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = ids[(i + 1) % ids.length];
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = ids[(i - 1 + ids.length) % ids.length];
    else if (e.key === "Home") next = ids[0];
    else if (e.key === "End") next = ids[ids.length - 1];
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
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
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
