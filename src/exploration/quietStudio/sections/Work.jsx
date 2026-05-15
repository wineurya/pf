import { motion, useReducedMotion } from "motion/react";
import { WORK } from "@/exploration/quietStudio/content.js";

/**
 * Work — selected pieces as a text-first list. Year · sector · title · summary
 * across a 3-column grid. Hover nudges the title right, arrow follows.
 */
export function Work() {
  const reduced = useReducedMotion();
  const fade = (delay = 0) =>
    reduced
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="work" className="qs-section">
      <motion.div {...fade()} className="flex flex-col gap-4 mb-12 sm:mb-20">
        <div className="qs-section-kicker">{WORK.eyebrow}</div>
        <h2 className="qs-section-heading">
          {WORK.heading.lead}{" "}
          <span className="qs-italic-accent">{WORK.heading.accent}</span>
        </h2>
      </motion.div>

      <div className="flex flex-col">
        {WORK.pieces.map((piece, i) => (
          <motion.a
            key={piece.title}
            href={piece.link}
            {...fade(0.05 * i)}
            className="qs-work-row group"
          >
            <span className="qs-work-row__year">{piece.year}</span>
            <span className="qs-work-row__sector">{piece.sector}</span>
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="qs-work-row__title m-0">{piece.title}</h3>
                <p className="qs-work-row__summary m-0">{piece.summary}</p>
              </div>
              <span aria-hidden className="qs-work-row__arrow shrink-0">→</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
