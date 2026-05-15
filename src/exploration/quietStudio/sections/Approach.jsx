import { motion, useReducedMotion } from "motion/react";
import { APPROACH } from "@/exploration/quietStudio/content.js";

/**
 * Approach — kicker + heading on the left, 2x2 pillar grid on the right.
 * Each pillar is a bordered card with step number + title + body.
 */
export function Approach() {
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
    <section id="approach" className="qs-section" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.015) 60%, transparent 100%)" }}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <motion.div {...fade()} className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="qs-section-kicker">{APPROACH.eyebrow}</div>
          <h2 className="qs-section-heading">
            {APPROACH.heading.lead}{" "}
            <span className="qs-italic-accent">{APPROACH.heading.accent}</span>
          </h2>
          <p className="qs-section-body">{APPROACH.body}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {APPROACH.pillars.map((pillar, i) => (
            <motion.div key={pillar.step} {...fade(0.06 * i)} className="qs-pillar">
              <span className="qs-pillar__step">{pillar.step}</span>
              <h3 className="qs-pillar__title m-0">{pillar.title}</h3>
              <p className="qs-pillar__body m-0">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
