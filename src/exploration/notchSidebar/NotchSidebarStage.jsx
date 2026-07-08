import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { DockSideIcon, NotchSidebarIcon } from "./NotchSidebarIcons.jsx";
import {
  NOTCH_SIDEBAR_SECTIONS,
  NOTCH_SIDEBAR_SIDES,
} from "./notchSidebarContent.js";

/* Fallback when the panel body hasn't laid out yet — body pad 8 + label 24 +
   gap 2 + row pad 7 + half a row (~17). */
const PANEL_ALIGN_FALLBACK = 56;
/* Keeps the panel body past the rail's end fade (--nsb-fade, 24px) plus the
   concave joins, which reach one radius past the panel. */
const ANCHOR_PAD = 28;

/**
 * Notch sidebar — a dock rail whose panel pushes out through concave joins,
 * like the iPhone notch meeting its screen edge (Figma node 663:486).
 *
 * The rail, the panel, and both joins are one clip-path: shape() outline on
 * a single surface — see styles.css. This component only measures where the
 * panel should anchor and flips the open state; the shape does the rest.
 *
 * Self-contained: lift the folder into any JSX or TS project — only react
 * and central-icons imports, tokens fall back when the app's are absent.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {boolean} [props.defaultOpen] open the first section on mount
 * @param {"left"|"top"|"right"} [props.defaultSide] dock edge
 * @param {boolean} [props.inheritCanvas] skip the own canvas background
 */
export function NotchSidebarStage({
  className,
  defaultOpen = false,
  defaultSide = "right",
  inheritCanvas = false,
}) {
  const [side, setSide] = useState(defaultSide);
  const [active, setActive] = useState(NOTCH_SIDEBAR_SECTIONS[0].id);
  const [open, setOpen] = useState(defaultOpen);
  /* Frozen copy of the outgoing edge during a side switch — geometry pinned
     inline so the stage re-measuring for the new side can't warp it. */
  const [ghost, setGhost] = useState(null);
  const stageRef = useRef(null);
  const bodyRef = useRef(null);
  const cellRefs = useRef({});
  const wasOpen = useRef(false);
  const prevSide = useRef(defaultSide);
  const prevActive = useRef(active);
  /* Pinned panel height during a side swap — stops grow/ph from animating on
     the remounted notch before the first paint. */
  const [swapHold, setSwapHold] = useState(null);
  const swapHoldRef = useRef(null);
  const panelId = useId();

  const section =
    NOTCH_SIDEBAR_SECTIONS.find((entry) => entry.id === active) ??
    NOTCH_SIDEBAR_SECTIONS[0];

  /* The panel anchors to the active icon: side docks line the clicked cell up
     with the first menu row (icon + label), the top dock centers under it.
     Written straight onto the stage as custom properties — the clip outline
     and the panel body both read them, so they can never disagree. */
  const measure = useCallback(() => {
    const stage = stageRef.current;
    const cell = cellRefs.current[active];
    const body = bodyRef.current;
    if (!stage || !cell || !body) return;
    const stageRect = stage.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();
    let anchor;
    if (side === "top") {
      const x =
        cellRect.left - stageRect.left + cellRect.width / 2 - body.offsetWidth / 2;
      const max = stageRect.width - body.offsetWidth - ANCHOR_PAD;
      anchor = Math.min(Math.max(x, ANCHOR_PAD), max);
    } else {
      const iconCenter =
        cellRect.top - stageRect.top + cellRect.height / 2;
      const row = body.querySelector(".nsb-row");
      const alignOffset = row
        ? row.offsetTop + row.offsetHeight / 2
        : PANEL_ALIGN_FALLBACK;
      const max = stageRect.height - body.offsetHeight - ANCHOR_PAD;
      anchor = Math.min(
        Math.max(iconCenter - alignOffset, ANCHOR_PAD),
        max,
      );
    }
    stage.style.setProperty("--nsb-anchor", `${Math.round(anchor)}px`);
    const height = body.offsetHeight;
    if (height > 0) {
      stage.style.setProperty("--nsb-ph", `${height}px`);
    } else if (swapHoldRef.current?.ph) {
      stage.style.setProperty("--nsb-ph", swapHoldRef.current.ph);
    }
  }, [active, side]);

  /* Fresh opens snap the anchor; closes sink with grow. Section changes while
     open snap ph so the panel doesn't morph height between menus. */
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const sideChanged = prevSide.current !== side;
    prevSide.current = side;
    const activeChanged = prevActive.current !== active;
    prevActive.current = active;
    const opening = open && !wasOpen.current;
    const snap = opening || sideChanged || (activeChanged && open);
    if (snap && stage) {
      stage.style.transition = "none";
      measure();
      if (swapHoldRef.current?.ph) {
        stage.style.setProperty("--nsb-ph", swapHoldRef.current.ph);
      }
      void stage.offsetWidth;
      stage.style.transition = "";
    } else {
      measure();
    }
    wasOpen.current = open;
  }, [measure, open, side, active]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => measure());
    observer.observe(stage);
    return () => observer.disconnect();
  }, [measure]);

  const closePanel = useCallback(
    (restoreFocus = false) => {
      setOpen(false);
      if (restoreFocus) {
        requestAnimationFrame(() => {
          cellRefs.current[active]?.focus({ preventScroll: true });
        });
      }
    },
    [active],
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") closePanel(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closePanel, open]);

  function toggleSection(id) {
    if (open && active === id) {
      setOpen(false);
    } else {
      setActive(id);
      setOpen(true);
    }
  }

  function switchSide(nextSide) {
    if (nextSide === side) return;
    const stage = stageRef.current;
    const ph =
      stage?.style.getPropertyValue("--nsb-ph") ||
      (bodyRef.current?.offsetHeight
        ? `${bodyRef.current.offsetHeight}px`
        : null);
    if (open && ph) {
      const hold = { ph };
      swapHoldRef.current = hold;
      setSwapHold(hold);
    }
    setGhost({
      side,
      open,
      anchor: stage?.style.getPropertyValue("--nsb-anchor") || null,
      ph,
    });
    setSide(nextSide);
  }

  /* The ghost outlives its 220ms fade-out slightly, then unmounts. */
  useEffect(() => {
    if (!ghost) return undefined;
    const timer = setTimeout(() => setGhost(null), 260);
    return () => clearTimeout(timer);
  }, [ghost]);

  /* Release pinned geometry after the cross-fade so grow/ph can animate again. */
  useEffect(() => {
    if (!swapHold) return undefined;
    const timer = setTimeout(() => {
      swapHoldRef.current = null;
      setSwapHold(null);
      measure();
    }, 260);
    return () => clearTimeout(timer);
  }, [swapHold, measure]);

  function onStagePointerDown(event) {
    if (!open) return;
    if (event.target.closest(".nsb-cells, .nsb-body")) return;
    closePanel();
  }

  return (
    <div
      className={className ? `nsb-root ${className}` : "nsb-root"}
      data-canvas={inheritCanvas ? "inherit" : undefined}
    >
      <div className="nsb-sides" role="group" aria-label="Dock side">
        {NOTCH_SIDEBAR_SIDES.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={side === entry.id}
            aria-label={`Dock ${entry.label.toLowerCase()}`}
            title={entry.label}
            onClick={() => switchSide(entry.id)}
          >
            <DockSideIcon side={entry.id} />
          </button>
        ))}
      </div>
      <div
        className="nsb-stage"
        ref={stageRef}
        data-swap-in={swapHold ? "" : undefined}
        onPointerDown={onStagePointerDown}
      >
        {ghost && (
          <div
            className="nsb-notch nsb-notch--ghost"
            data-side={ghost.side}
            data-open={ghost.open}
            aria-hidden="true"
            style={{
              "--nsb-grow": ghost.open ? "1" : "0",
              "--nsb-anchor": ghost.anchor || undefined,
              "--nsb-ph": ghost.ph || undefined,
            }}
          >
            <div className="nsb-cells">
              {NOTCH_SIDEBAR_SECTIONS.map((entry) => (
                <span
                  key={entry.id}
                  className="nsb-cell"
                  data-active={(ghost.open && active === entry.id) || undefined}
                >
                  <NotchSidebarIcon name={entry.icon} />
                </span>
              ))}
            </div>
            {ghost.open && (
              <div className="nsb-body">
                <p className="nsb-label">{section.label}</p>
                {section.rows.map((row) => (
                  <span key={row.id} className="nsb-row">
                    <NotchSidebarIcon name={row.icon} size={16} />
                    {row.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        {/* key={side} — switching edges rebuilds the outline at the new edge
            instead of animating the panel across the stage. */}
        <div
          className="nsb-notch"
          data-side={side}
          data-open={open}
          data-swap-in={swapHold ? "" : undefined}
          style={
            swapHold
              ? { "--nsb-ph": swapHold.ph, "--nsb-grow": "1" }
              : undefined
          }
          key={side}
        >
          <nav className="nsb-cells" aria-label="Sidebar sections">
            {NOTCH_SIDEBAR_SECTIONS.map((entry) => {
              const expanded = open && active === entry.id;
              return (
                <button
                  key={entry.id}
                  ref={(el) => {
                    cellRefs.current[entry.id] = el;
                  }}
                  type="button"
                  className="nsb-cell"
                  data-active={expanded || undefined}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  aria-label={entry.label}
                  title={entry.label}
                  onClick={() => toggleSection(entry.id)}
                >
                  <NotchSidebarIcon name={entry.icon} />
                </button>
              );
            })}
          </nav>
          <div
            className="nsb-body"
            key={section.id}
            id={panelId}
            ref={bodyRef}
            role="group"
            aria-label={`${section.label} menu`}
          >
            <p className="nsb-label">{section.label}</p>
            {section.rows.map((row) => (
              <button
                key={row.id}
                type="button"
                className="nsb-row"
                onClick={() => closePanel(true)}
              >
                <NotchSidebarIcon name={row.icon} size={16} />
                {row.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
