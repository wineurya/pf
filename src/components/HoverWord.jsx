import { useState } from "react";

const canHover =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover)").matches;

/**
 * An inline pen-underlined word. Hover/focus teases a fan of at most TWO
 * photos — the catch: clicking the word expands the full set as a bento
 * grid under its paragraph (state owned by the About panel via
 * `expanded` / `onToggle`). While the bento is open the fan stays away.
 */
export function HoverWord({ word, photos, expanded = false, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const fan = photos.slice(0, 2);
  const showFan = hovered && !expanded;

  return (
    <span
      className={`hw${showFan ? " is-open" : ""}${expanded ? " is-expanded" : ""}`}
      onMouseEnter={canHover ? () => setHovered(true) : undefined}
      onMouseLeave={canHover ? () => setHovered(false) : undefined}
    >
      <button
        type="button"
        className="hw__word"
        aria-expanded={expanded}
        onClick={onToggle}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {word}
      </button>
      <span className="hw__stack">
        {fan.map((p) => (
          <img
            key={p.src}
            className="hw__photo"
            src={p.src}
            alt={p.alt}
            loading="lazy"
            decoding="async"
          />
        ))}
      </span>
    </span>
  );
}
