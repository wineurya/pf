import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  'a[href]:not([aria-disabled="true"])',
  "button:not(:disabled)",
  '[role="button"]:not([aria-disabled="true"])',
  "summary",
  "label[for]",
  "select:not(:disabled)",
  'input[type="button"]:not(:disabled)',
  'input[type="submit"]:not(:disabled)',
  'input[type="reset"]:not(:disabled)',
  'input[type="checkbox"]:not(:disabled)',
  'input[type="radio"]:not(:disabled)',
  'input[type="file"]:not(:disabled)',
  'input[type="range"]:not(:disabled)',
  ".cursor-pointer",
  ".wx-stack-nugget",
  ".wx-btn-primary",
  ".wx-btn-secondary",
  ".wx-faq-summary",
].join(", ");

const TEXT_FIELD_SELECTOR = [
  "textarea",
  '[contenteditable="true"]',
  "input:not([type])",
  'input[type="text"]',
  'input[type="search"]',
  'input[type="email"]',
  'input[type="url"]',
  'input[type="tel"]',
  'input[type="password"]',
  'input[type="number"]',
  'input[type="date"]',
  'input[type="time"]',
  'input[type="datetime-local"]',
].join(", ");

/** Dot follower — morphs to a tiny + over clickable targets; skipped when reduced motion. */
export function DotCursor({ reduceMotion }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    let rafId = 0;

    const syncInteractive = (clientX, clientY) => {
      const under = document.elementFromPoint(clientX, clientY);
      let interactive = false;
      if (under instanceof Element && !under.closest(TEXT_FIELD_SELECTOR)) {
        interactive = Boolean(under.closest(INTERACTIVE_SELECTOR));
      }
      el.classList.toggle("wx-dot-cursor--interactive", interactive);
    };

    const onMove = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        syncInteractive(e.clientX, e.clientY);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;
  return (
    <div ref={ref} className="wx-dot-cursor" aria-hidden>
      <span className="wx-dot-cursor__dot" />
      <span className="wx-dot-cursor__plus" aria-hidden>
        <span className="wx-dot-cursor__plus-bar wx-dot-cursor__plus-bar--h" />
        <span className="wx-dot-cursor__plus-bar wx-dot-cursor__plus-bar--v" />
      </span>
    </div>
  );
}
