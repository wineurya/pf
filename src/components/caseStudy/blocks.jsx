import { useEffect, useRef, useState } from "react";

import { RevealEyebrow, RevealItem } from "../Reveal.jsx";
import { ToolBrandIcon } from "../ToolBrandIcon.jsx";
import { PersonaSwitch } from "../PersonaSwitch.jsx";
import { CaseSlider } from "../CaseSlider.jsx";
import { renderRich } from "../../lib/richText.jsx";
import {
  CELL_ICONS,
  FACT_FIELDS,
  SECTION_ACCENT,
  renderWithGuide,
} from "./shared.jsx";
import { InViewVideo, MediaTile, PhoneVideo } from "./media.jsx";

export function CaseStudyFacts({ facts }) {
  return (
    <dl className="cs__facts">
      {FACT_FIELDS.filter(({ key }) => facts[key]).map(({ key, label }) => (
        <div key={key} className="cs__fact">
          <dt className="cs__fact-label">{label}</dt>
          {key === "tools" ? (
            <dd className="cs__fact-value cs__fact-value--tools">
              <span className="cs__tool-list">
                {facts.tools.map((tool) => (
                  <ToolBrandIcon key={tool} label={tool} />
                ))}
              </span>
            </dd>
          ) : (
            <dd className="cs__fact-value">{facts[key]}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}


export function CaseStudyOutro() {
  return (
    <RevealItem as="footer" className="cs__outro">
      <p className="cs__outro-greeting">Thanks for stopping by!</p>
      <p className="cs__outro-by">
        Crafted by{" "}
        <a
          className="cs__outro-name"
          href="https://www.linkedin.com/in/wineury"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wineury A.
        </a>
      </p>
      <p className="cs__outro-quip">
        <span className="cs__outro-quip-lead">Care for a</span>{" "}
        <span className="cs__outro-grad">quick chat</span>?
      </p>
      <a className="cs__outro-cta" href="mailto:contact@wineury.design">
        Let&rsquo;s talk
      </a>
    </RevealItem>
  );
}

export function featureCardClass(block) {
  const hasMedia = Boolean(block.src || block.video);
  return [
    "cs__feature",
    block.media === "prototype" && "cs__feature--prototype",
    hasMedia && "cs__feature--media",
    block.frameBg && "cs__feature--framed",
    block.portrait && "cs__feature--portrait",
    block.fullBleed && "cs__feature--fullbleed",
    hasMedia && !block.fullBleed && "cs__feature--padded",
  ]
    .filter(Boolean)
    .join(" ");
}

export function FeaturesSection({ section }) {
  const introBlock = section.blocks.find((b) => b.p);
  const featBlocks = section.blocks.filter((b) => b.feat);
  const guide = introBlock?.guide ?? [];
  const [activeGuide, setActiveGuide] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !guide.length) return;
    const els = Array.from(sectionRef.current.querySelectorAll(".cs__feature"));
    if (!els.length) return;

    const groups = [];
    let fi = 0;
    guide.forEach((g, gi) => {
      const count = g.count ?? 1;
      for (let i = 0; i < count; i++) groups[fi++] = gi;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const idx = els.indexOf(visible[0].target);
          if (idx >= 0 && groups[idx] !== undefined) setActiveGuide(groups[idx]);
        }
      },
      { rootMargin: "-15% 0px -50% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [section.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={sectionRef}
      id={section.id ?? undefined}
      className="cs__section cs__section--features"
      data-accent={section.title ? SECTION_ACCENT[section.title] : undefined}
      aria-label={section.title ?? undefined}
    >
      <div className="cs__features-layout">
        <div className="cs__features-sticky">
          {section.title ? (
            <RevealEyebrow className="cs__section-eyebrow" aria-hidden="true">
              {section.title}
            </RevealEyebrow>
          ) : null}
          {introBlock ? (
            <RevealItem className="cs__features-intro">
              <h2 className="cs__block-title">{introBlock.title}</h2>
              <p className="cs__features-summary">
                {renderWithGuide(introBlock.p, guide, activeGuide)}
              </p>
            </RevealItem>
          ) : null}
        </div>
        <div className="cs__features-scroll">
          {featBlocks.map((block, j) => (
            <RevealItem
              key={j}
              as="figure"
              className={featureCardClass(block)}
            >
              <div
                className="cs__feature-frame"
                style={
                  block.frameBg
                    ? { "--feature-frame-bg": block.frameBg }
                    : undefined
                }
              >
                {block.video ? (
                  <InViewVideo
                    video={block.video}
                    title={block.title}
                    className="cs__feature-video"
                  />
                ) : block.src ? (
                  block.portrait ? (
                    <div className="cs__feature-img-wrap">
                      <img
                        className="cs__feature-img"
                        src={block.src}
                        alt={block.alt ?? block.title ?? ""}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <img
                      className="cs__feature-img"
                      src={block.src}
                      alt={block.alt ?? block.title ?? ""}
                      loading="lazy"
                      decoding="async"
                    />
                  )
                ) : (
                  <span className="cs__tile-label">{block.media ?? "image"}</span>
                )}
                {block.title ? (
                  <figcaption className="cs__feature-caption">{block.title}</figcaption>
                ) : null}
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Block({ block }) {
  if (block.personas) {
    /* No RevealItem — transform/opacity enter on iOS Safari can prevent the
       persona photo from painting (especially below the fold on mobile). */
    return <PersonaSwitch personas={block.personas} />;
  }

  if (block.p) {
    return (
      <RevealItem className="cs__story-block">
        {block.title ? <h2 className="cs__block-title">{block.title}</h2> : null}
        <p className="panel__lead cs__block-summary">{renderRich(block.p)}</p>
      </RevealItem>
    );
  }

  if (block.stats) {
    return (
      <RevealItem className="cs__story-block cs__story-block--stats">
        {block.title ? <h2 className="cs__block-title">{block.title}</h2> : null}
        <div className="cs__cols cs__cols--3 cs__stats-cols">
          {block.stats.map((stat, i) => (
            <div key={i} className="cs__stat">
              <span className="cs__stat-value">{stat.value}</span>
              <span className="cs__stat-text">{renderRich(stat.text)}</span>
            </div>
          ))}
        </div>
      </RevealItem>
    );
  }

  if (block.cols) {
    return (
      <RevealItem>
        <div className={`cs__cols cs__cols--${block.cols.length}`}>
          {block.cols.map((cell, i) => {
            const Icon = cell.icon ? CELL_ICONS[cell.icon] : null;
            return (
              <div key={i} className="cs__cell">
                {Icon ? <Icon className="cs__cell-icon" size={20} ariaHidden /> : null}
                <span className="cs__cell-title">{cell.title}</span>
                <span className="cs__cell-sub">{renderRich(cell.sub)}</span>
                {cell.src ? (
                  <img
                    className="cs__shot cs__cell-shot"
                    src={cell.src}
                    alt={cell.alt ?? cell.title ?? ""}
                    loading="lazy"
                    decoding="async"
                  />
                ) : cell.media ? (
                  <MediaTile kind={cell.media} cell />
                ) : null}
              </div>
            );
          })}
        </div>
      </RevealItem>
    );
  }

  if (block.feat) {
    return (
      <RevealItem
        as="figure"
        className={`cs__feature${block.media === "prototype" ? " cs__feature--prototype" : ""}`}
      >
        <div className="cs__feature-frame">
          <span className="cs__tile-label">{block.media ?? "image"}</span>
          {block.title ? (
            <figcaption className="cs__feature-caption">{block.title}</figcaption>
          ) : null}
        </div>
      </RevealItem>
    );
  }

  if (block.slider) {
    return (
      <RevealItem as="figure" className="cs__figure">
        {block.title || block.sub ? (
          <figcaption className="cs__figcap">
            {block.title ? <h2 className="cs__block-title">{block.title}</h2> : null}
            {block.sub ? (
              <p className="cs__block-summary">{renderRich(block.sub)}</p>
            ) : null}
          </figcaption>
        ) : null}
        <CaseSlider slides={block.slider} label={block.title ?? "Slides"} />
      </RevealItem>
    );
  }

  if (block.mosaic) {
    return (
      <RevealItem as="figure" className="cs__figure">
        {block.title || block.sub ? (
          <figcaption className="cs__figcap">
            {block.title ? <h2 className="cs__block-title">{block.title}</h2> : null}
            {block.sub ? (
              <p className="cs__block-summary">{renderRich(block.sub)}</p>
            ) : null}
          </figcaption>
        ) : null}
        <div className="cs__mosaic">
          {block.mosaic.map((m, i) => (
            <div key={i} className="cs__mosaic-item">
              <img src={m.src} alt={m.alt ?? ""} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </RevealItem>
    );
  }

  if (block.media) {
    return (
      <RevealItem as="figure" className="cs__figure">
        <figcaption className="cs__figcap">
          <h2 className="cs__block-title">{block.title}</h2>
          <p className="cs__block-summary">{renderRich(block.sub)}</p>
        </figcaption>
        {block.media === "phone-video" && block.video ? (
          <PhoneVideo video={block.video} title={block.title} />
        ) : block.video ? (
          <InViewVideo
            video={block.video}
            title={block.title}
            className="cs__shot"
          />
        ) : block.src ? (
          <img
            className={`cs__shot${block.portrait ? " cs__shot--portrait" : ""}${block.compact ? " cs__shot--compact" : ""}${block.bare ? " cs__shot--bare" : ""}`}
            src={block.src}
            alt={block.alt ?? block.title ?? ""}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <MediaTile kind={block.media} />
        )}
      </RevealItem>
    );
  }

  return null;
}

