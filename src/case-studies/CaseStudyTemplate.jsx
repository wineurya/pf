import { motion } from "motion/react";
import { useMemo } from "react";

/**
 * Two-column case study body — left scrolling prose, right scrolling image stack.
 * Page surface is `--wx-case-bg` (#f7f7f7). No outlines on the page.
 *
 * Sections render only if their field is present on `def`. Resolutions case is
 * image-only (no problem/approach/outcome) and degrades gracefully.
 */

const SECTION_T = { duration: 0.42, ease: [0.23, 1, 0.32, 1] };

function asArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function Reveal({ children, delay = 0, reduceMotion }) {
  if (reduceMotion) return children;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ ...SECTION_T, delay }}
    >
      {children}
    </motion.div>
  );
}

function MetaLine({ meta }) {
  if (!meta) return null;
  const items = [meta.role, meta.team, meta.year, meta.focus, meta.timeline, meta.tools].filter(Boolean);
  if (!items.length) return null;
  return (
    <ul className="wcase-meta">
      {items.map((s, i) => (
        <li key={s + i} className="wcase-meta__item">
          {s}
        </li>
      ))}
    </ul>
  );
}

function CtaPill({ cta }) {
  if (!cta) return null;
  const isExternal = cta.external || /^https?:/.test(cta.href);
  const linkProps = isExternal
    ? { href: cta.href, target: "_blank", rel: "noreferrer" }
    : { href: cta.href };
  return (
    <a className="wcase-cta" {...linkProps}>
      <span>{cta.label}</span>
      <svg className="wcase-cta__arrow" viewBox="0 0 24 24" width="14" height="14" aria-hidden>
        <path
          d="M5 12h14M13 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function ProseBlock({ label, paragraphs, reduceMotion }) {
  if (!paragraphs.length) return null;
  return (
    <section className="wcase-block">
      <Reveal reduceMotion={reduceMotion}>
        <p className="wcase-block__label">{label}</p>
        <div className="wcase-block__prose">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ApproachBlock({ approach, reduceMotion }) {
  if (!approach || approach.length === 0) return null;
  return (
    <section className="wcase-block">
      <Reveal reduceMotion={reduceMotion}>
        <p className="wcase-block__label">Approach</p>
      </Reveal>
      <ol className="wcase-beats">
        {approach.map((beat, i) => (
          <li key={beat.label + i}>
            <Reveal reduceMotion={reduceMotion} delay={i * 0.04}>
              <article className="wcase-beat">
                <header className="wcase-beat__head">
                  <span className="wcase-beat__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="wcase-beat__label">{beat.label}</h3>
                </header>
                <p className="wcase-beat__body">{beat.body}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function HeroFigure({ def, reduceMotion }) {
  if (!def.heroImage) return null;
  return (
    <Reveal reduceMotion={reduceMotion}>
      <figure
        className="wcase-hero"
        style={def.heroBg ? { backgroundColor: def.heroBg } : undefined}
      >
        <img
          src={def.heroImage}
          alt={def.heroAlt ?? def.title}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </figure>
    </Reveal>
  );
}

function GalleryStack({ items, reduceMotion }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="wcase-gallery">
      {items.map((item, i) => (
        <Reveal key={(item.src ?? i) + i} reduceMotion={reduceMotion} delay={i * 0.03}>
          <figure className="wcase-figure">
            <div className="wcase-figure__media">
              <img
                src={item.src}
                alt={item.alt ?? item.caption ?? ""}
                loading="lazy"
                decoding="async"
              />
            </div>
            {item.caption ? (
              <figcaption className="wcase-figure__caption">{item.caption}</figcaption>
            ) : null}
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

function NextProject({ next, navigate, reduceMotion }) {
  if (!next) return null;
  const onClick = (e) => {
    e.preventDefault();
    if (navigate) navigate(`/work/${next.slug}`);
    else window.location.href = `/work/${next.slug}`;
  };
  return (
    <Reveal reduceMotion={reduceMotion}>
      <a
        className="wcase-next"
        href={`/work/${next.slug}`}
        onClick={onClick}
        aria-label={`Next project: ${next.title}`}
      >
        <span className="wcase-next__label">Next project</span>
        <span className="wcase-next__title">{next.title}</span>
        {next.kicker ? <span className="wcase-next__kicker">{next.kicker}</span> : null}
        <svg className="wcase-next__arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <path
            d="M5 12h14M13 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </Reveal>
  );
}

function BackLink({ label, onBack }) {
  return (
    <a
      className="wcase-back"
      href="/"
      onClick={(e) => {
        e.preventDefault();
        onBack();
      }}
    >
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
        <path
          d="M19 12H5M11 6l-6 6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{label ?? "Back to work"}</span>
    </a>
  );
}

export function CaseStudyTemplate({ def, nextDef, navigate, onBack, reduceMotion }) {
  const problemParas = useMemo(() => asArray(def.problem), [def.problem]);
  const outcomeParas = useMemo(() => asArray(def.outcome), [def.outcome]);

  return (
    <div className="wcase">
      <div className="wcase-shell">
        {/* LEFT — prose column */}
        <div className="wcase-left">
          <BackLink label={def.backLabel} onBack={onBack} />

          <header className="wcase-head">
            <Reveal reduceMotion={reduceMotion}>
              <p className="wcase-kicker">{def.kicker}</p>
              <h1 className="wcase-title">{def.title}</h1>
              <MetaLine meta={def.meta} />
              {def.summary ? <p className="wcase-summary">{def.summary}</p> : null}
            </Reveal>
          </header>

          <ProseBlock label="The problem" paragraphs={problemParas} reduceMotion={reduceMotion} />

          <ApproachBlock approach={def.approach} reduceMotion={reduceMotion} />

          <ProseBlock label="The outcome" paragraphs={outcomeParas} reduceMotion={reduceMotion} />

          {def.cta ? (
            <Reveal reduceMotion={reduceMotion}>
              <CtaPill cta={def.cta} />
            </Reveal>
          ) : null}

          {def.reflection ? (
            <section className="wcase-block wcase-block--reflection">
              <Reveal reduceMotion={reduceMotion}>
                <p className="wcase-block__label">Reflection</p>
                <p className="wcase-reflection">{def.reflection}</p>
              </Reveal>
            </section>
          ) : null}

          <NextProject next={nextDef} navigate={navigate} reduceMotion={reduceMotion} />
        </div>

        {/* RIGHT — image stack */}
        <div className="wcase-right">
          <HeroFigure def={def} reduceMotion={reduceMotion} />
          <GalleryStack items={def.gallery} reduceMotion={reduceMotion} />
        </div>
      </div>
    </div>
  );
}
