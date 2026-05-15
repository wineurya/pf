/**
 * Rebuild · Design System
 *
 * Single-page reference for the Rebuild section's visual vocabulary.
 * The dark theme is the canonical display: the gray ramp is presented here
 * exactly as specified (hex values are literal), so any future reviewer can
 * trace from a value step back to its on-page role.
 *
 * Reads from `@/rebuild/data/designSystem.js` for data; renders sections in
 * the same rhythm as the rebuild homepage (kicker → heading → body → grid).
 */

import { useEffect } from "react";
import "@/rebuild/rebuild.css";
import "@/rebuild/pages/designSystem.css";
import {
  ACCENTS,
  GRAYS,
  PRINCIPLES,
  RADII,
  SPACING,
  TYPE_SCALE,
} from "@/rebuild/data/designSystem.js";

export default function DesignSystemPage() {
  // Force dark theme for the design system page; restore prior value on unmount
  // so navigating away doesn't side-effect the rest of the app.
  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    return () => {
      if (prev) document.documentElement.setAttribute("data-theme", prev);
      else document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  return (
    <div className="ds-page">
      <div className="ds-shell">
        <Hero />
        <ColorSection />
        <AccentSection />
        <TypographySection />
        <TokensSection />
        <ComponentsSection />
        <PrinciplesSection />
        <Footer />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="ds-hero">
      <span className="ds-hero__kicker">Rebuild · Design System</span>
      <h1 className="ds-hero__title">
        The vocabulary, <em>quietly</em> documented.
      </h1>
      <p className="ds-hero__body">
        Eight grays, four accents, one type voice. Hairlines are reserved for
        structure; value steps do the rest. Every component on the rebuild
        homepage traces back to a token on this page.
      </p>
    </header>
  );
}

function ColorSection() {
  return (
    <section className="ds-section">
      <div className="ds-section__head">
        <span className="ds-section__eyebrow">Color · Grays · Dark Theme</span>
        <h2 className="ds-section__title">The ramp that does the heavy lifting.</h2>
        <p className="ds-section__body">
          One white, seven darks. Stacking by value gives depth without lines —
          a 0.5px Gray Dark 6 hairline only appears where structure asks for it.
        </p>
      </div>

      <div className="ds-color-grid">
        {GRAYS.map((g) => (
          <article key={g.id} className="ds-swatch" data-flagged={g.hex === "#FFFFFF"}>
            <div className="ds-swatch__chip" style={{ "--swatch": g.hex }} />
            <div className="flex flex-col items-center gap-1.5">
              <span className="ds-swatch__name">{g.name}</span>
              <span className="ds-swatch__role">{g.role}</span>
            </div>
            <span className="ds-swatch__hex">{g.hex}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function AccentSection() {
  return (
    <section className="ds-section">
      <div className="ds-section__head">
        <span className="ds-section__eyebrow">Color · Accents</span>
        <h2 className="ds-section__title">Color as a wayfinder, not a decoration.</h2>
        <p className="ds-section__body">
          Section kicker pills are the only place an accent lands at full
          chroma. Inside a card, an accent peeks through one element — a CTA, a
          tag dot — and nothing else.
        </p>
      </div>

      <div className="ds-accents">
        {ACCENTS.map((a) => (
          <article key={a.id} className="ds-accent">
            <span className="ds-accent__pill" style={{ "--accent": a.hex }}>
              {a.name}
            </span>
            <p className="ds-accent__role">{a.role}</p>
            <p className="ds-accent__hex">{a.hex}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TypographySection() {
  return (
    <section className="ds-section">
      <div className="ds-section__head">
        <span className="ds-section__eyebrow">Typography</span>
        <h2 className="ds-section__title">One voice, three textures.</h2>
        <p className="ds-section__body">
          Display for moments, body for paragraphs, mono for kicker pills and
          timestamps. Letter-spacing stays at 0 or above — no optical
          over-tightening.
        </p>
      </div>

      <div className="ds-type-table">
        {TYPE_SCALE.map((t) => (
          <div key={t.id} className="ds-type-row">
            <span
              className="ds-type-row__sample"
              style={{ fontSize: sampleFontSize(t.id), lineHeight: 1.04 }}
            >
              {sampleText(t.id)}
            </span>
            <span className="ds-type-row__meta">
              <span>{t.label}</span>
              <span>{t.size} · {t.line} line</span>
              <span>{t.weight}</span>
            </span>
            <span className="ds-type-row__role">{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function sampleText(id) {
  if (id === "display-lg") return "Designs that feel clear.";
  if (id === "display-md") return "Selected work";
  if (id === "title") return "Coaching when you slow down.";
  if (id === "body-lg") return "Atlanta-based product designer shaping calm flows, prototypes, and motion-rich UI.";
  if (id === "body") return "Plan, deadline, real coach.";
  if (id === "meta") return "2025 · Fintech · iOS";
  if (id === "kicker") return "PROCESS";
  return "Sample";
}
function sampleFontSize(id) {
  switch (id) {
    case "display-lg": return "clamp(34px, 4.4vw, 52px)";
    case "display-md": return "clamp(26px, 3vw, 32px)";
    case "title":      return "22px";
    case "body-lg":    return "16px";
    case "body":       return "14px";
    case "meta":       return "12px";
    case "kicker":     return "14px";
    default:           return "14px";
  }
}

function TokensSection() {
  return (
    <section className="ds-section">
      <div className="ds-section__head">
        <span className="ds-section__eyebrow">Tokens · Spacing & Radii</span>
        <h2 className="ds-section__title">Tokens reused, not improvised.</h2>
        <p className="ds-section__body">
          Spacing and radius scales are short on purpose. If a value isn't in
          the table, it doesn't ship.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="ds-table">
          {SPACING.map((s) => (
            <div key={s.id} className="ds-table__row">
              <span className="ds-table__token">--{s.token}</span>
              <span className="ds-table__value">{s.px}</span>
              <span className="ds-table__role">{s.role}</span>
            </div>
          ))}
        </div>
        <div className="ds-table">
          {RADII.map((r) => (
            <div key={r.id} className="ds-table__row">
              <span className="ds-table__token">--{r.token}</span>
              <span className="ds-table__value">{r.px}</span>
              <span className="ds-table__role">{r.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComponentsSection() {
  return (
    <section className="ds-section">
      <div className="ds-section__head">
        <span className="ds-section__eyebrow">Components</span>
        <h2 className="ds-section__title">Built from the ramp.</h2>
        <p className="ds-section__body">
          A handful of pieces compose every screen — they all sit on the gray
          ramp and pick up one accent at most.
        </p>
      </div>

      <div className="ds-components">
        <div className="ds-component">
          <div className="ds-component__head">
            <span className="ds-component__label">Section kicker</span>
          </div>
          <div className="ds-component__stage">
            <span className="ds-kicker-demo" style={{ color: "#2DD4BF", background: "color-mix(in srgb, #2DD4BF 22%, var(--ds-gray-1))" }}>
              PROCESS
            </span>
            <span className="ds-kicker-demo" style={{ color: "#FB7185", background: "color-mix(in srgb, #FB7185 22%, var(--ds-gray-1))" }}>
              STUDIO
            </span>
          </div>
        </div>

        <div className="ds-component">
          <div className="ds-component__head">
            <span className="ds-component__label">Icon well · Process card</span>
          </div>
          <div className="ds-component__stage" style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <span className="ds-icon-well"><span /></span>
            <span style={{ color: "var(--ds-white)", fontWeight: 590 }}>Research before wireframes</span>
          </div>
        </div>

        <div className="ds-component">
          <div className="ds-component__head">
            <span className="ds-component__label">Pill buttons</span>
          </div>
          <div className="ds-component__stage" style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
            <span className="ds-pill">Get in touch</span>
            <span className="ds-pill ds-pill--ghost">View work</span>
          </div>
        </div>

        <div className="ds-component">
          <div className="ds-component__head">
            <span className="ds-component__label">Process card · top-rounded</span>
          </div>
          <div className="ds-component__stage" style={{ padding: 0, background: "transparent" }}>
            <div className="ds-card-preview">
              <div className="ds-card-preview__media" />
              <div className="flex items-center gap-2.5">
                <span className="ds-icon-well"><span /></span>
                <span className="ds-card-preview__title">Structure decisions</span>
              </div>
              <span className="ds-card-preview__body">
                Turn the messy middle into flows, states, and decisions the team can critique before visual polish.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="ds-section">
      <div className="ds-section__head">
        <span className="ds-section__eyebrow">Principles</span>
        <h2 className="ds-section__title">The four rules behind every choice.</h2>
      </div>

      <div className="ds-principles">
        {PRINCIPLES.map((p) => (
          <article key={p.id} className="ds-principle">
            <span className="ds-principle__title">{p.title}</span>
            <p className="ds-principle__body">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ds-footer">
      <span>Rebuild · Design System · 2026</span>
      <span>
        <a href="/">← Back to homepage</a>
      </span>
    </footer>
  );
}
