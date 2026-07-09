import { playDungSfx } from "../lib/dungSfx.js";

const canHover =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover)").matches;

/**
 * An inline pen-underlined word in the About copy. Hover / focus steers the
 * About filmstrip below: the strip glides to this word's photos and holds
 * while the rest dim; on leave it un-dims and resumes drifting. Click / tap
 * locks the selection (for touch and keyboard). Selection state is owned by
 * the About panel via `expanded` / `onToggle` / `onHoverChange`.
 */
export function HoverWord({
  word,
  suffix = "",
  expanded = false,
  onToggle,
  onHoverChange,
}) {
  return (
    <span
      className={`hw${expanded ? " is-expanded" : ""}`}
      onMouseEnter={
        canHover
          ? () => {
              playDungSfx();
              onHoverChange?.(true);
            }
          : undefined
      }
      onMouseLeave={canHover ? () => onHoverChange?.(false) : undefined}
    >
      <button
        type="button"
        className="hw__word"
        aria-pressed={expanded}
        onClick={onToggle}
        onFocus={() => onHoverChange?.(true)}
        onBlur={() => onHoverChange?.(false)}
      >
        {word}
      </button>
      {suffix ? <span className="hw__punct">{suffix}</span> : null}
    </span>
  );
}
