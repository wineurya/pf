import { motion, useReducedMotion } from "motion/react";
import { JOURNAL } from "@/exploration/quietStudio/content.js";

/**
 * Journal — 3 short essay entries with date/read-time meta, title, excerpt.
 * Same hairline-divider rhythm as the Work list.
 */
export function Journal() {
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
    <section id="journal" className="qs-section">
      <motion.div {...fade()} className="flex flex-col gap-4 mb-12 sm:mb-16 max-w-2xl">
        <div className="qs-section-kicker">{JOURNAL.eyebrow}</div>
        <h2 className="qs-section-heading">
          {JOURNAL.heading.lead}
          {JOURNAL.heading.accent ? (
            <>
              {" "}
              <span className="qs-italic-accent">{JOURNAL.heading.accent}</span>
            </>
          ) : null}
        </h2>
        <p className="qs-section-body">{JOURNAL.body}</p>
      </motion.div>

      <div className="flex flex-col">
        {JOURNAL.entries.map((entry, i) => (
          <motion.a
            key={entry.title}
            href="#"
            {...fade(0.06 * i)}
            className="qs-entry group"
            style={{ textDecoration: "none" }}
          >
            <div className="qs-entry__meta">
              <span>{entry.date}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>{entry.readTime}</span>
            </div>
            <h3 className="qs-entry__title m-0">{entry.title}</h3>
            <p className="qs-entry__excerpt m-0">{entry.excerpt}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
