import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../lib/hooks.js";
import { renderRich } from "../lib/richText.jsx";
import { IconChevronLeft, IconChevronRight } from "../lib/icons.jsx";

/* Logitech principle slider — one annotated slide per UX law, stepped with
   arrows, dots, or arrow keys. Slides travel in the step direction (the same
   pattern the Logitech carousel it documents uses); reduced motion swaps the
   shift for a plain cross-fade. The dots double as the Zeigarnik progress cue. */
export function CaseSlider({ slides, label }) {
  const [[index, dir], setState] = useState([0, 0]);
  const reducedMotion = usePrefersReducedMotion();
  const slide = slides[index];

  function go(next, d) {
    setState([(next + slides.length) % slides.length, d]);
  }

  function onKeyDown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1, 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1, -1);
    }
  }

  const variants = {
    enter: (d) =>
      reducedMotion ? { opacity: 0 } : { opacity: 0, x: d >= 0 ? 32 : -32 },
    center: { opacity: 1, x: 0 },
    exit: (d) =>
      reducedMotion ? { opacity: 0 } : { opacity: 0, x: d >= 0 ? -24 : 24 },
  };
  const swapTransition = reducedMotion
    ? { duration: 0.12 }
    : { duration: 0.3, ease: EASE_OUT };

  return (
    <div
      className="cs__slider"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      <div className="cs__slider-frame">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={index}
            className="cs__slider-slide"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={swapTransition}
          >
            <img
              className="cs__slider-img"
              src={slide.src}
              alt={slide.alt ?? slide.law}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="cs__slider-caption" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className="cs__slider-caption-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.2, ease: EASE_OUT }}
          >
            <strong className="cs__slider-law">{slide.law}</strong>
            {" — "}
            {renderRich(slide.text)}
          </motion.span>
        </AnimatePresence>
      </p>

      <div className="cs__slider-nav">
        <button
          type="button"
          className="cs__slider-btn"
          aria-label="Previous principle"
          onClick={() => go(index - 1, -1)}
        >
          <IconChevronLeft size={15} ariaHidden />
        </button>
        <div className="cs__slider-dots">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              className="cs__slider-dot"
              aria-label={`${s.law} (${i + 1} of ${slides.length})`}
              aria-current={i === index || undefined}
              onClick={() => go(i, i > index ? 1 : -1)}
            />
          ))}
        </div>
        <button
          type="button"
          className="cs__slider-btn"
          aria-label="Next principle"
          onClick={() => go(index + 1, 1)}
        >
          <IconChevronRight size={15} ariaHidden />
        </button>
      </div>
    </div>
  );
}
