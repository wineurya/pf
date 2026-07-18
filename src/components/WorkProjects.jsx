import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { RevealItem, StaggerGroup } from "./Reveal.jsx";
import { ViewSwitcher, VIEW_TWO_DISABLED_MQ } from "./ViewSwitcher.jsx";
import { IconArrowElbowRightDown, IconArrowUpRight, IconLock } from "../lib/icons.jsx";
import { EASE_OUT, layoutMorph, revealItem } from "../lib/motion.js";
import { useMediaQuery, usePrefersReducedMotion } from "../lib/hooks.js";
import { playDungSfx } from "../lib/dungSfx.js";

/* A clicked project opens in-app at /work/<slug>; modified/middle clicks fall
   through to the browser so a project can still open in a new tab. WIP rows are
   locked: they swallow every click and never navigate. */
function openHandler(item, onOpen) {
  if (item.wip) return (e) => e.preventDefault();
  if (!(item.slug && onOpen)) return undefined;
  return (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onOpen(item.slug);
  };
}

/**
 * One project, rendered as either a list row or a gallery card depending on the
 * active view. The element itself never unmounts between views — `layout` FLIPs
 * it from its old box to its new one, so you watch each project travel and
 * reshape into the new layout. The media tile is the one piece that genuinely
 * appears/disappears, so it rides an AnimatePresence (popLayout: it leaves the
 * flow on exit, letting the row collapse up via layout). Title + meta keep their
 * layoutId so a clicked project still travels into the case-study header.
 */
function ProjectItem({ item, isCard, onOpen, reducedMotion, layoutTransition }) {
  return (
    <motion.a
      layout
      className={`pcard pcard--${isCard ? "card" : "list"}${item.wip ? " pcard--wip" : ""}`}
      href={item.wip ? undefined : item.href}
      data-slug={item.slug}
      data-cursor={item.wip ? undefined : "View case study"}
      data-cursor-icon={item.wip ? undefined : "arrow"}
      aria-disabled={item.wip || undefined}
      onClick={openHandler(item, onOpen)}
      onPointerEnter={item.wip ? undefined : playDungSfx}
      variants={revealItem(reducedMotion)}
      style={{
        transformOrigin: "center center",
        /* Pin the two-up card to the cover's true ratio up front (not onLoad), so
           the masonry tile reserves its height before the lazy cover loads — no
           reflow when the caption opens on hover, and no load-time size jump for
           Motion's layout to animate into a stretch. */
        ...(item.coverW && item.coverH
          ? { "--card-ar": `${item.coverW} / ${item.coverH}` }
          : null),
      }}
      transition={{ layout: layoutTransition }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {isCard ? (
          <motion.div
            key="media"
            layout
            className="pcard__media"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: reducedMotion ? 0 : 0.22, ease: EASE_OUT },
              layout: layoutTransition,
            }}
          >
            {item.cover ? (
              /* Theme-aware covers ship both variants; CSS picks one by
                 [data-theme] so a theme swap never waits on a fetch. */
              <>
                <img
                  className={
                    item.coverDark
                      ? "pcard__cover pcard__cover--light"
                      : "pcard__cover"
                  }
                  src={item.cover}
                  alt={`${item.label} project cover`}
                  width={item.coverW}
                  height={item.coverH}
                  loading="lazy"
                  decoding="async"
                />
                {item.coverDark ? (
                  <img
                    className="pcard__cover pcard__cover--dark"
                    src={item.coverDark}
                    alt={`${item.label} project cover`}
                    width={item.coverW}
                    height={item.coverH}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </>
            ) : (
              <motion.span layout className="pcard__media-label">
                {item.hero ?? "image"}
              </motion.span>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layout
        className="pcard__row"
        transition={{ layout: layoutTransition }}
      >
        {/* Plain wrapper (not the motion row) so the 2×2 hover slide can't
           collide with Framer Motion's layout transforms. */}
        <div className="pcard__caption">
          <span className="pcard__label">
            <motion.span
              layoutId={`cs-title-${item.slug}`}
              transition={{ layout: layoutTransition }}
            >
              {item.label}
            </motion.span>
            {item.wip ? (
              <span className="pcard__wip" aria-label="Coming soon">
                <IconLock className="pcard__wip-icon" size={12} ariaHidden />
                <span className="pcard__wip-label">Coming soon</span>
              </span>
            ) : null}
            {isCard && !item.wip ? (
              <IconArrowUpRight className="pcard__arrow" size={15} ariaHidden />
            ) : null}
          </span>
          <motion.span
            className="pcard__meta"
            layoutId={`cs-meta-${item.slug}`}
            transition={{ layout: layoutTransition }}
          >
            {item.meta}
          </motion.span>
        </div>
      </motion.div>
    </motion.a>
  );
}

/**
 * Work projects with a layout selector under the bio. The switcher swaps the
 * grid between a list, a single-column gallery, and a two-up gallery; because
 * every project node persists across those views, Motion's `layout` carries
 * each one from where it was to where it goes. The list view keeps its shared
 * sliding highlight, folded in here so it survives the unified structure.
 */
export function WorkProjects({ items, onOpen, view, onView }) {
  const reducedMotion = usePrefersReducedMotion();
  const twoUpDisabled = useMediaQuery(VIEW_TWO_DISABLED_MQ);
  const isCard = view !== "list";

  useEffect(() => {
    if (twoUpDisabled && view === "two") onView("single");
  }, [twoUpDisabled, view, onView]);

  const listRef = useRef(null);
  const lastRow = useRef(null);
  const [hl, setHl] = useState({ y: 0, h: 0, on: false });

  const layoutTransition = reducedMotion
    ? { duration: 0 }
    : layoutMorph(reducedMotion);

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
      if (isCard) return;
      const row = e.target.closest(".pcard");
      if (!row || !listRef.current?.contains(row)) return;
      /* Locked WIP rows don't take the highlight — keeps them feeling inert. */
      if (row.classList.contains("pcard--wip")) return hide();
      moveToRow(row);
      lastRow.current = row;
    },
    [isCard, moveToRow, hide],
  );

  const onFocus = useCallback(
    (e) => {
      if (isCard) return;
      const row = e.target.closest(".pcard");
      if (row) moveToRow(row);
    },
    [isCard, moveToRow],
  );

  const onBlur = useCallback(
    (e) => {
      if (!listRef.current?.contains(e.relatedTarget)) hide();
    },
    [hide],
  );

  return (
    <StaggerGroup className="work">
      <RevealItem className="work__bar">
        <span className="work__label">
          My work
          <IconArrowElbowRightDown className="work__label-caret" size={13} ariaHidden />
        </span>
        <ViewSwitcher value={view} onChange={onView} />
      </RevealItem>

      <StaggerGroup
        className={`pgrid pgrid--${view}`}
        ref={listRef}
        onMouseOver={onMouseOver}
        onMouseLeave={hide}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {!isCard ? (
          <div
            className="list__highlight"
            aria-hidden="true"
            style={{
              transform: `translateY(${hl.y}px)`,
              height: `${hl.h}px`,
              opacity: hl.on ? 1 : 0,
            }}
          />
        ) : null}
        {items.map((it) => (
          <ProjectItem
            key={it.slug ?? it.label}
            item={it}
            isCard={isCard}
            onOpen={onOpen}
            reducedMotion={reducedMotion}
            layoutTransition={layoutTransition}
          />
        ))}
      </StaggerGroup>
    </StaggerGroup>
  );
}
