import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

import { useMediaQuery, usePrefersReducedMotion } from "../lib/hooks.js";
import { EASE_OUT } from "../lib/motion.js";
import {
  IconClipboard,
  IconCursorArrow,
  IconGuideAccess,
  IconLock,
  IconWave,
} from "../lib/icons.jsx";

/* Tag glyphs by name — a target picks one via data-cursor-icon. Central icons
   where the family has the glyph (eye); Phosphor covers the rest. Wave is
   always fill so it reads on the dark pill. */
const TAG_ICONS = {
  eye: IconGuideAccess,
  arrow: IconCursorArrow,
  lock: IconLock,
  copy: IconClipboard,
  wave: (props) => <IconWave {...props} weight="fill" />,
};

/* Module-level so consecutive hovers (even across links) never repeat. */
let lastRotatePhrase = null;
let rotateTarget = null;
const rotatePhraseByEl = new WeakMap();

function pickRotatePhrase(raw) {
  const options = raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  if (options.length === 0) return null;
  if (options.length === 1) {
    lastRotatePhrase = options[0];
    return options[0];
  }
  let next = options[Math.floor(Math.random() * options.length)];
  let guard = 0;
  while (next === lastRotatePhrase && guard++ < 12) {
    next = options[Math.floor(Math.random() * options.length)];
  }
  lastRotatePhrase = next;
  return next;
}

function resolveCursorTag(el) {
  if (!el) {
    rotateTarget = null;
    return null;
  }
  const rotate = el.dataset.cursorRotate;
  if (rotate) {
    /* Pick once per enter — pointerover fires on every child move. */
    if (el !== rotateTarget) {
      rotateTarget = el;
      const text = pickRotatePhrase(rotate);
      if (text) rotatePhraseByEl.set(el, text);
      else rotatePhraseByEl.delete(el);
    }
    const text = rotatePhraseByEl.get(el);
    return text ? { text, icon: el.dataset.cursorIcon } : null;
  }
  rotateTarget = null;
  if (!el.dataset.cursor) return null;
  return { text: el.dataset.cursor, icon: el.dataset.cursorIcon };
}

/* Only replace the pointer where one exists — never on touch devices. */
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/* The dot tracks the pointer 1:1; the tag rides this spring so it drags a
   beat behind — that trailing gap is what reads as "following the cursor". */
const TAG_FOLLOW = { stiffness: 720, damping: 46, mass: 0.7 };
const TAG_POP = { type: "spring", stiffness: 520, damping: 32, mass: 0.7 };
const DOT_SCALE = { type: "spring", stiffness: 500, damping: 30 };

/**
 * Custom ink-dot cursor. Mounts once at the app root; on fine-pointer devices
 * it hides the native cursor (html.has-custom-cursor) and follows the pointer
 * with a small dot in the page's ink color. Any element carrying a
 * `data-cursor="Label"` attribute (plus optional `data-cursor-icon`) pops a
 * toast-style tag off the dot's top right while hovered; `data-cursor-rotate`
 * takes a pipe-separated list and picks a fresh phrase each enter (no
 * back-to-back repeats). `data-cursor=""` on a descendant clears the tag
 * again (escape hatch for interactive regions inside an annotated card).
 */
export function Cursor() {
  const enabled = useMediaQuery(FINE_POINTER);
  const reducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const tagX = useSpring(x, TAG_FOLLOW);
  const tagY = useSpring(y, TAG_FOLLOW);

  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [tag, setTag] = useState(null); // { text, icon } | null

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    return () => root.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;

    function showCursor() {
      if (visibleRef.current) return;
      visibleRef.current = true;
      setVisible(true);
    }

    function hideCursor() {
      if (visibleRef.current) {
        visibleRef.current = false;
        setVisible(false);
      }
      setTag(null);
      setPressed(false);
    }

    function onMove(e) {
      if (e.pointerType === "touch") return;
      x.set(e.clientX);
      y.set(e.clientY);
      showCursor();
    }

    function onOver(e) {
      const el = e.target.closest?.("[data-cursor], [data-cursor-rotate]");
      const next = resolveCursorTag(el);
      setTag((prev) =>
        prev?.text === next?.text && prev?.icon === next?.icon ? prev : next,
      );
    }

    /* relatedTarget is null only when the pointer leaves the document. */
    function onOut(e) {
      if (e.relatedTarget) return;
      hideCursor();
    }

    function onDown(e) {
      if (e.pointerType !== "touch") setPressed(true);
    }
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("pointerup", onUp, true);
    window.addEventListener("pointercancel", onUp, true);
    window.addEventListener("blur", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("pointerup", onUp, true);
      window.removeEventListener("pointercancel", onUp, true);
      window.removeEventListener("blur", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const TagIcon = tag?.icon ? TAG_ICONS[tag.icon] : null;

  return (
    <div className="cursor" aria-hidden="true">
      <motion.div
        className="cursor__dot"
        style={{ x, y }}
        animate={{
          /* Press squishes; an active tag swells the dot so the pair reads
             as one connected object. */
          scale: pressed ? 0.7 : tag ? 1.5 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          scale: reducedMotion ? { duration: 0 } : DOT_SCALE,
          opacity: { duration: 0.15 },
        }}
      />
      <motion.div
        className="cursor__tag-anchor"
        style={reducedMotion ? { x, y } : { x: tagX, y: tagY }}
      >
        <AnimatePresence>
          {visible && tag ? (
            <motion.div
              key={`${tag.icon ?? ""}:${tag.text}`}
              className="cursor__tag"
              initial={
                reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 6 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                reducedMotion
                  ? { opacity: 0, transition: { duration: 0.1 } }
                  : {
                      opacity: 0,
                      scale: 0.6,
                      y: 4,
                      transition: { duration: 0.14, ease: EASE_OUT },
                    }
              }
              transition={reducedMotion ? { duration: 0.1 } : TAG_POP}
            >
              {TagIcon ? (
                <TagIcon className="cursor__tag-icon" size={13} ariaHidden />
              ) : null}
              <span className="cursor__tag-text">{tag.text}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
