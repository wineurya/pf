import { motion } from "motion/react";
import { DUR_UI, DUR_UI_EXIT, EASE_OUT } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../lib/hooks.js";

/**
 * Expanding bento that appears under the paragraph whose hover-word was
 * clicked. One wide tile on top when there are three photos (mirrors the
 * decorative About bento). Hovering a tile blurs the photo slightly and
 * centers its short caption.
 */
export function WordBento({ word, photos }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="wbento"
      style={reducedMotion ? undefined : { transformOrigin: "top" }}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scaleY: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0 }}
      transition={{
        duration: reducedMotion ? 0.12 : DUR_UI + 0.06,
        ease: EASE_OUT,
      }}
    >
      <div
        className={`wbento__grid wbento__grid--${Math.min(photos.length, 3)}`}
        role="group"
        aria-label={`Photos — ${word}`}
      >
        {photos.map((p, i) => (
          <motion.figure
            key={p.src}
            className="wbento__tile"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: reducedMotion ? 0.12 : DUR_UI,
                ease: EASE_OUT,
                delay: reducedMotion ? 0 : 0.06 + i * 0.05,
              },
            }}
            exit={{
              opacity: 0,
              transition: { duration: reducedMotion ? 0.1 : DUR_UI_EXIT },
            }}
          >
            <img
              className="wbento__img"
              src={p.src}
              alt={p.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="wbento__cap">{p.cap ?? p.alt}</figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.div>
  );
}
