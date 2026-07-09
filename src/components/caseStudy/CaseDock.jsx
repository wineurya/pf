import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "../ThemeToggle.jsx";
import { usePrefersReducedMotion } from "../../lib/hooks.js";
import { playDungSfx } from "../../lib/dungSfx.js";
import { dockMorph, EASE_OUT, fillMorph } from "../../lib/motion.js";
import { IconArrowLeft, IconChevronRight } from "../../lib/icons.jsx";
import { SECTION_ACCENT, SectionGlyph } from "./shared.jsx";

/* Mobile-only floating dock (bottom-right). Reuses the home dock's pill shell:
   Back · the section currently in view · theme toggle. The middle button rolls a
   new section label in (and the old one out) as you scroll, carries a small
   progress ring in that section's accent tracking read-through, and
   on tap opens a sheet of every section. Portaled to <body> so `position:fixed`
   is unaffected by the case article's reveal transform. */
export function CaseDock({
  sections,
  activeId,
  accent,
  onSelect,
  onBack,
  theme,
  onToggleTheme,
  morph = false,
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];
  /* Size the rolling label field to the study's longest section title so it
     stays put as the label swaps (no per-section width jitter). */
  const maxLen = sections.reduce((n, s) => Math.max(n, s.title.length), 0);
  /* progress is fed in via the --cs-section-progress CSS var on .cs-dock (set by
     the scroll measure above) so the ring repaints without re-rendering here. */

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    }
    function onScroll() {
      setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  function pick(id) {
    onSelect(id);
    setOpen(false);
  }

  /* Wallet-menu pattern: opacity + short y — no 3D flip (stable during scroll). */
  const roll = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.12 },
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.22, ease: EASE_OUT },
      };

  const sheetMotion = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.12 },
      }
    : {
        initial: { clipPath: "inset(0% 0% 100% 0% round 12px)", opacity: 0 },
        animate: { clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 },
        exit: { clipPath: "inset(0% 0% 100% 0% round 12px)", opacity: 0 },
        transition: { duration: 0.32, ease: EASE_OUT },
      };

  const dockReveal = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.14 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.28, ease: EASE_OUT } };

  return createPortal(
    <div
      className="cs-dock"
      data-accent={accent}
      style={{ "--cs-dock-roll-ch": maxLen }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            key="scrim"
            className="cs-dock__scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.22, ease: EASE_OUT }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="sheet"
            className="cs-dock__sheet"
            role="menu"
            aria-label="On this page"
            initial={sheetMotion.initial}
            animate={sheetMotion.animate}
            exit={sheetMotion.exit}
            transition={sheetMotion.transition}
          >
            <p className="cs-dock__sheet-label">On this page</p>
            <ul className="cs-dock__sheet-list">
              {sections.map((s, rowIndex) => {
                const isActive = s.id === activeId;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      className={`cs-dock__sheet-row${isActive ? " is-active" : ""}`}
                      data-accent={SECTION_ACCENT[s.title] || "overview"}
                      onClick={() => pick(s.id)}
                      onPointerEnter={playDungSfx}
                    >
                      <SectionGlyph
                        className="cs-dock__sheet-glyph"
                        index={rowIndex}
                      />
                      <span className="cs-dock__sheet-title">{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* When `morph`, this bar shares `m-dock-shell` with the home dock: the pill
          reshapes and Framer cross-dissolves the two states' contents as one shared
          element — a morph, not a hard swap. Off the morph breakpoint (tablet / no
          home pill to hand off from) it keeps the plain reveal. */}
      <motion.div
        className="cs-dock__bar"
        layoutId={morph ? "m-dock-shell" : undefined}
        initial={morph ? false : dockReveal.initial}
        animate={morph ? { opacity: 1 } : dockReveal.animate}
        transition={morph ? { layout: dockMorph(reducedMotion) } : dockReveal.transition}
      >
        <button
          type="button"
          className="cs-dock__btn cs-dock__back"
          onClick={onBack}
          onPointerEnter={playDungSfx}
          aria-label="Back to work"
        >
          <IconArrowLeft size={17} ariaHidden />
        </button>

        <button
          type="button"
          className="cs-dock__section"
          onClick={() => setOpen((o) => !o)}
          onPointerEnter={playDungSfx}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={`Section: ${active?.title ?? ""}. Show all sections`}
        >
          <svg className="cs-dock__ring" viewBox="0 0 16 16" aria-hidden="true">
            <circle className="cs-dock__ring-track" cx="8" cy="8" r="6.25" pathLength="100" />
            <circle className="cs-dock__ring-arc" cx="8" cy="8" r="6.25" pathLength="100" />
          </svg>
          <span className="cs-dock__roll">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={active?.id}
                className="cs-dock__roll-title"
                initial={roll.initial}
                animate={roll.animate}
                exit={roll.exit}
                transition={roll.transition}
              >
                {active?.title}
              </motion.span>
            </AnimatePresence>
          </span>
          <IconChevronRight className="cs-dock__caret" size={13} ariaHidden />
        </button>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </motion.div>
    </div>,
    document.body,
  );
}

