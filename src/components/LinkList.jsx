import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { RevealItem, StaggerGroup } from "./Reveal.jsx";
import { IconArrowUpRight } from "../lib/icons.jsx";

/**
 * A list of rows sharing one highlight pill that slides to the hovered/focused
 * row. Pointer/focus are handled by delegation on the container so both mouse
 * and keyboard move the pill.
 *
 * Rows with a `slug` open in-app via `onOpen`; their label/meta carry a
 * layoutId so they travel into the case-study header (see CaseStudy).
 */
export function LinkList({ items, withDot = false, withArrow = false, onOpen }) {
  const listRef = useRef(null);
  const lastRow = useRef(null);
  const [hl, setHl] = useState({ y: 0, h: 0, on: false });

  const moveToRow = useCallback((row) => {
    const list = listRef.current;
    if (!row || !list) return;

    const listRect = list.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    setHl({
      y: rowRect.top - listRect.top + list.scrollTop,
      h: rowRect.height,
      on: true,
    });
  }, []);

  const hide = useCallback(() => {
    lastRow.current = null;
    setHl((s) => ({ ...s, on: false }));
  }, []);

  const onMouseOver = useCallback(
    (e) => {
      const row = e.target.closest(".row");
      if (!row || !listRef.current?.contains(row)) return;
      moveToRow(row);
      if (lastRow.current !== row) {
        lastRow.current = row;
      }
    },
    [moveToRow],
  );

  const onFocus = useCallback(
    (e) => {
      const row = e.target.closest(".row");
      if (row) moveToRow(row);
    },
    [moveToRow],
  );

  const onBlur = useCallback(
    (e) => {
      if (!listRef.current?.contains(e.relatedTarget)) hide();
    },
    [hide],
  );

  return (
    <StaggerGroup
      className="list"
      ref={listRef}
      onMouseOver={onMouseOver}
      onMouseLeave={hide}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div
        className="list__highlight"
        aria-hidden="true"
        style={{
          transform: `translateY(${hl.y}px)`,
          height: `${hl.h}px`,
          opacity: hl.on ? 1 : 0,
        }}
      />
      {items.map((it) => {
        const isDead = it.href === "#";
        const opensExternally = it.external && !isDead;
        const opensInApp = Boolean(it.slug && onOpen);
        return (
          <RevealItem
            key={it.label}
            as="a"
            className="row"
            href={it.href}
            data-slug={it.slug}
            onClick={
              opensInApp
                ? (e) => {
                    /* Leave modified/middle clicks to the browser (new tab). */
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                    e.preventDefault();
                    onOpen(it.slug);
                  }
                : isDead
                  ? (e) => e.preventDefault()
                  : undefined
            }
            target={opensExternally ? "_blank" : undefined}
            rel={opensExternally ? "noopener noreferrer" : undefined}
          >
            <span className="row__label">
              {withDot && <span className="dot" aria-hidden="true" />}
              {opensInApp ? (
                <motion.span layoutId={`cs-title-${it.slug}`}>
                  {it.label}
                </motion.span>
              ) : (
                <span>{it.label}</span>
              )}
              {(withArrow || it.external) && (
                <IconArrowUpRight className="row__arrow" size={15} ariaHidden />
              )}
            </span>
            {opensInApp ? (
              <motion.span className="row__meta" layoutId={`cs-meta-${it.slug}`}>
                {it.meta}
              </motion.span>
            ) : (
              <span className="row__meta">{it.meta}</span>
            )}
          </RevealItem>
        );
      })}
    </StaggerGroup>
  );
}
