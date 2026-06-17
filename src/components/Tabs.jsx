import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import {
  IconTabAbout,
  IconTabExploration,
  IconTabWork,
} from "../lib/icons.jsx";
import { fillMorph } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../lib/hooks.js";
import { RevealItem, StaggerGroup } from "./Reveal.jsx";

const TAB_ICONS = {
  work: IconTabWork,
  exploration: IconTabExploration,
  about: IconTabAbout,
};

const DESKTOP_RAIL_MQ = "(min-width: 860px)";

/**
 * Accessible tablist for the left rail. Roving tabindex + arrow/Home/End keys.
 *
 * Both layouts share ONE fill (layoutId "tab-fill") that glides + reshapes
 * between tabs. The fill carries a finite, half-height stadium radius (see CSS),
 * so it reads fully rounded yet never oval-stretches under the layout-projection
 * scale — the tab boxes resize instantly underneath so only the fill animates.
 */
export function Tabs({ items, value, onChange }) {
  const refs = useRef({});
  const ids = items.map((t) => t.id);
  const reducedMotion = usePrefersReducedMotion();
  const [verticalRail, setVerticalRail] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(DESKTOP_RAIL_MQ).matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_RAIL_MQ);
    const sync = () => setVerticalRail(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function pick(id) {
    onChange(id);
  }

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

  const tabList = (
    <StaggerGroup
      className="rail"
      role="tablist"
      aria-label="Sections"
      aria-orientation={verticalRail ? "vertical" : "horizontal"}
      onKeyDown={onKeyDown}
    >
      {items.map((t) => {
        const selected = t.id === value;
        const Icon = TAB_ICONS[t.icon];
        const tabProps = {
          id: `tab-${t.id}`,
          className: "tab",
          type: "button",
          role: "tab",
          "aria-selected": selected,
          "aria-controls": `panel-${t.id}`,
          "aria-label": t.label,
          tabIndex: selected ? 0 : -1,
          onClick: () => pick(t.id),
        };

        if (!verticalRail) {
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[t.id] = el;
              }}
              {...tabProps}
            >
              {selected ? (
                <motion.span
                  className="tab__fill"
                  layoutId="tab-fill"
                  aria-hidden="true"
                  transition={fillMorph(reducedMotion)}
                />
              ) : null}
              {Icon ? (
                <Icon className="tab__icon" size={18} ariaHidden />
              ) : null}
              {selected ? (
                <span className="tab__label">{t.label}</span>
              ) : null}
            </button>
          );
        }

        return (
          <RevealItem
            key={t.id}
            as="button"
            ref={(el) => {
              refs.current[t.id] = el;
            }}
            {...tabProps}
          >
            {selected ? (
              <motion.span
                className="tab__fill"
                layoutId="tab-fill"
                aria-hidden="true"
                transition={fillMorph(reducedMotion)}
              />
            ) : null}
            {Icon ? (
              <Icon className="tab__icon" size={18} ariaHidden />
            ) : null}
            <span className="tab__label">{t.label}</span>
          </RevealItem>
        );
      })}
    </StaggerGroup>
  );

  /* One LayoutGroup for both layouts — only ever one rail is mounted at a time,
     so the single "tab-fill" layoutId is unambiguous. */
  return <LayoutGroup id="tabs">{tabList}</LayoutGroup>;
}
