import { motion, useReducedMotion } from "motion/react";
import { CONTACT, FOOTER } from "@/exploration/quietStudio/content.js";

/**
 * Contact — large bordered card with kicker, heading, body, CTA, fineprint.
 * Followed by a thin footer with studio name, year, and link cluster.
 */
export function Contact() {
  const reduced = useReducedMotion();
  const fade = (delay = 0) =>
    reduced
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="contact" className="qs-section" style={{ paddingBottom: "clamp(48px, 6vw, 80px)" }}>
      <motion.div {...fade()} className="qs-contact-card">
        <div className="flex flex-col gap-6 max-w-[60ch]">
          <div className="qs-section-kicker">{CONTACT.eyebrow}</div>
          <h2 className="qs-section-heading">
            {CONTACT.heading.lead}{" "}
            <span className="qs-italic-accent">{CONTACT.heading.accent}</span>
          </h2>
          <p className="qs-section-body">{CONTACT.body}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <a href={CONTACT.cta.href} className="qs-pill qs-pill--filled">
              {CONTACT.cta.label}
            </a>
            <span style={{ color: "var(--qs-ink-mute)", fontSize: 13, letterSpacing: "0.02em" }}>
              {CONTACT.fineprint}
            </span>
          </div>
        </div>
      </motion.div>

      <footer
        className="mt-16 flex flex-wrap items-center justify-between gap-6 pt-8"
        style={{ borderTop: "1px solid var(--qs-line)" }}
      >
        <div className="flex items-center gap-3">
          <span className="qs-eyebrow-dot" aria-hidden />
          <span style={{ color: "var(--qs-ink)" }}>{FOOTER.studioName}</span>
          <span style={{ color: "var(--qs-ink-mute)" }}>© {FOOTER.year}</span>
        </div>
        <ul className="flex items-center gap-2">
          {FOOTER.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="qs-nav-link">{link.label}</a>
            </li>
          ))}
        </ul>
      </footer>
    </section>
  );
}
