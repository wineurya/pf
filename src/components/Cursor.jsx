import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

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

const TAG_SELECTOR = "[data-cursor], [data-cursor-rotate]";

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

/* Label trails a beat behind the 1:1 dot and rocks with velocity. */
const LABEL_SPRING = { stiffness: 220, damping: 26, mass: 0.7 };
const TILT_SPRING = { stiffness: 200, damping: 24, mass: 0.6 };
const LABEL_POP = { type: "spring", stiffness: 520, damping: 32, mass: 0.7 };
const PRESS_SPRING = { type: "spring", stiffness: 500, damping: 28, mass: 0.5 };
const FADE = { duration: 0.14, ease: EASE_OUT };

const PRESS_SCALE = 0.92;
const LABEL_TILT_STRENGTH = 18;
const TILT_SPEED_REF = 1500;

const TAG_ENTER = { opacity: 0, scale: 0.4, y: 6 };
const TAG_ENTER_REDUCED = { opacity: 0 };
const TAG_SHOW = { opacity: 1, scale: 1, y: 0 };
const TAG_EXIT = {
  opacity: 0,
  scale: 0.6,
  y: 4,
  transition: { duration: 0.14, ease: EASE_OUT },
};
const TAG_EXIT_REDUCED = { opacity: 0, transition: { duration: 0.1 } };
const TAG_FADE = { duration: 0.1 };

/**
 * Custom ink-dot cursor. Mounts once at the app root; on fine-pointer devices
 * it hides the native cursor (html.has-custom-cursor) and follows the pointer
 * with an ink dot. A label pill trails behind on a spring — rocking with
 * motion — for any element carrying `data-cursor` / `data-cursor-rotate`
 * (plus optional `data-cursor-icon`).
 *
 * Hot path stays off React: pointer position, opacity, and press scale are
 * motion values; only tag text changes trigger a re-render.
 */
export function Cursor() {
  const enabled = useMediaQuery(FINE_POINTER);
  const reducedMotion = usePrefersReducedMotion();

  /* Dot tracks 1:1 — no spring. Label springs only matter while a tag shows. */
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const opacity = useMotionValue(0);
  const scale = useMotionValue(1);

  const labelX = useSpring(x, LABEL_SPRING);
  const labelY = useSpring(y, LABEL_SPRING);
  const tiltTarget = useMotionValue(0);
  const labelRotation = useSpring(tiltTarget, TILT_SPRING);

  const visibleRef = useRef(false);
  const tagActiveRef = useRef(false);
  const pressedRef = useRef(false);
  const sampleRef = useRef({ x: 0, y: 0, t: 0, primed: false });
  const reducedRef = useRef(reducedMotion);
  reducedRef.current = reducedMotion;

  const [tag, setTag] = useState(null); // { text, icon } | null

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    return () => root.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;

    let fadeControls = null;
    let pressControls = null;

    function showCursor() {
      if (visibleRef.current) return;
      visibleRef.current = true;
      fadeControls?.stop();
      opacity.set(1);
    }

    function hideCursor() {
      if (visibleRef.current) {
        visibleRef.current = false;
        fadeControls?.stop();
        fadeControls = animate(opacity, 0, FADE);
      }
      tagActiveRef.current = false;
      setTag(null);
      if (pressedRef.current) {
        pressedRef.current = false;
        pressControls?.stop();
        scale.set(1);
      }
      sampleRef.current.primed = false;
      tiltTarget.set(0);
    }

    function onMove(e) {
      if (e.pointerType === "touch") return;

      const mx = e.clientX;
      const my = e.clientY;
      const sample = sampleRef.current;

      /* Skip duplicate coalesced positions. */
      if (sample.primed && sample.x === mx && sample.y === my) return;

      const now = performance.now();

      /* Velocity / tilt only while a tag is up — idle moves stay cheap. */
      if (tagActiveRef.current && !reducedRef.current && sample.primed) {
        const dt = Math.max(1, now - sample.t);
        const vx = ((mx - sample.x) / dt) * 1000;
        const vy = ((my - sample.y) / dt) * 1000;
        const speed = Math.hypot(vx, vy);
        const norm = Math.min(1, speed / TILT_SPEED_REF);
        const sign = vx === 0 ? 0 : vx > 0 ? 1 : -1;
        tiltTarget.set(sign * norm * LABEL_TILT_STRENGTH);
      }

      sample.x = mx;
      sample.y = my;
      sample.t = now;
      sample.primed = true;

      x.set(mx);
      y.set(my);
      showCursor();
    }

    function onOver(e) {
      const el = e.target.closest?.(TAG_SELECTOR);
      const next = resolveCursorTag(el);
      const wasActive = tagActiveRef.current;
      const nextActive = !!next;
      tagActiveRef.current = nextActive;

      /* Snap trailing springs to the pointer when a tag appears so the pill
         doesn't fly in from a stale spring position. */
      if (nextActive && !wasActive && !reducedRef.current) {
        labelX.jump(x.get());
        labelY.jump(y.get());
        tiltTarget.set(0);
      }
      if (!nextActive) tiltTarget.set(0);

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
      if (e.pointerType === "touch" || pressedRef.current) return;
      pressedRef.current = true;
      pressControls?.stop();
      if (reducedRef.current) scale.set(PRESS_SCALE);
      else pressControls = animate(scale, PRESS_SCALE, PRESS_SPRING);
    }

    function onUp() {
      if (!pressedRef.current) return;
      pressedRef.current = false;
      pressControls?.stop();
      if (reducedRef.current) scale.set(1);
      else pressControls = animate(scale, 1, PRESS_SPRING);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, {
      capture: true,
      passive: true,
    });
    document.addEventListener("pointerout", onOut, {
      capture: true,
      passive: true,
    });
    window.addEventListener("pointerdown", onDown, {
      capture: true,
      passive: true,
    });
    window.addEventListener("pointerup", onUp, {
      capture: true,
      passive: true,
    });
    window.addEventListener("pointercancel", onUp, {
      capture: true,
      passive: true,
    });
    window.addEventListener("blur", onUp);
    return () => {
      fadeControls?.stop();
      pressControls?.stop();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("pointerup", onUp, true);
      window.removeEventListener("pointercancel", onUp, true);
      window.removeEventListener("blur", onUp);
    };
  }, [enabled, x, y, opacity, scale, labelX, labelY, tiltTarget]);

  if (!enabled) return null;

  const TagIcon = tag?.icon ? TAG_ICONS[tag.icon] : null;
  const labelPos = reducedMotion
    ? { x, y }
    : { x: labelX, y: labelY, rotate: labelRotation };

  return (
    <div className="cursor" aria-hidden="true">
      <motion.div
        className="cursor__tag-anchor"
        style={{ ...labelPos, scale }}
      >
        <AnimatePresence>
          {tag ? (
            <motion.div
              key={`${tag.icon ?? ""}:${tag.text}`}
              className="cursor__tag"
              initial={reducedMotion ? TAG_ENTER_REDUCED : TAG_ENTER}
              animate={TAG_SHOW}
              exit={reducedMotion ? TAG_EXIT_REDUCED : TAG_EXIT}
              transition={reducedMotion ? TAG_FADE : LABEL_POP}
            >
              {TagIcon ? (
                <TagIcon className="cursor__tag-icon" size={13} ariaHidden />
              ) : null}
              <span className="cursor__tag-text">{tag.text}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="cursor__dot"
        style={{ x, y, scale, opacity }}
      />
    </div>
  );
}
