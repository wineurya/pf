import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { RevealEyebrow, RevealItem, StaggerGroup } from "../Reveal.jsx";
import { DESKTOP_MQ, useMediaQuery, usePrefersReducedMotion } from "../../lib/hooks.js";
import { fillMorph, layoutMorph } from "../../lib/motion.js";
import { IconArrowLeft } from "../../lib/icons.jsx";
import { caseStudies } from "../../content.js";
import {
  SECTION_ACCENT,
  bodyStagger,
  groupSections,
} from "./shared.jsx";
import { Block, CaseStudyFacts, CaseStudyOutro, FeaturesSection } from "./blocks.jsx";

export function CaseStudy({
  slug,
  onBack,
  instant = false,
  theme,
  onToggleTheme,
  onDockState,
}) {
  const study = caseStudies[slug];
  const sections = groupSections(study.blocks);
  const named = sections.filter((s) => s.id);
  const sectionIds = named.map((s) => s.id).join(",");
  const ref = useRef(null);
  const scrollLockRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeSection, setActiveSection] = useState(() => named[0]?.id ?? null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    const previousTitle = document.title;
    document.title = `${study.title} | Wineury Almonte`;
    return () => {
      document.title = previousTitle;
    };
  }, [study.title]);

  useEffect(() => {
    scrollLockRef.current = null;
    setActiveSection(sectionIds.split(",")[0] || null);
  }, [slug, sectionIds]);

  /* Release scroll lock after programmatic smooth scroll — scrollend where
     supported, otherwise a short scroll-idle fallback so the IO spy cannot
     re-target every section the page passes on the way down. */
  useEffect(() => {
    function releaseScrollLock() {
      scrollLockRef.current = null;
    }

    function onScrollEnd() {
      if (scrollLockRef.current) releaseScrollLock();
    }

    let idleId = 0;
    function onScrollWhileLocked() {
      if (!scrollLockRef.current) return;
      window.clearTimeout(idleId);
      idleId = window.setTimeout(() => {
        if (scrollLockRef.current) releaseScrollLock();
      }, 150);
    }

    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("scroll", onScrollWhileLocked, { passive: true });
    return () => {
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("scroll", onScrollWhileLocked);
      window.clearTimeout(idleId);
      scrollLockRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!sectionIds) return;

    const elements = sectionIds
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug, sectionIds]);

  /* Measure how far the active section has been read (its top travelling up past
     a fixed reading line) → 0 when it just arrives, 1 once fully passed. Written
     to a CSS var so only the dock's progress ring repaints — no React re-render per scroll
     frame (the whole case study would otherwise re-render). rAF throttled.
     Scoped to the dock element, not <html>: a root-level custom-property write
     every scrolled frame invalidates inherited style document-wide. */
  useEffect(() => {
    if (!activeSection) return;
    const el = document.getElementById(activeSection);
    if (!el) return;
    let dock = null;
    let raf = 0;
    const measure = () => {
      raf = 0;
      if (!dock || !dock.isConnected) dock = document.querySelector(".cs-dock");
      if (!dock) return;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * 0.42;
      const p = (line - rect.top) / (rect.height || 1);
      dock.style.setProperty("--cs-section-progress", Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [activeSection, slug]);

  /* Clear the progress var when the study closes — the dock persists across
     study→study jumps, so a stale ring must never leak into the next study
     before its first measure. */
  useEffect(
    () => () =>
      document
        .querySelector(".cs-dock")
        ?.style.removeProperty("--cs-section-progress"),
    [],
  );

  const activeTitle = named.find((s) => s.id === activeSection)?.title;
  const activeAccent =
    (activeTitle && SECTION_ACCENT[activeTitle]) || "overview";

  function jumpToSection(id) {
    scrollLockRef.current = id;
    setActiveSection(id);
    const target = document.getElementById(id);
    if (!target) {
      scrollLockRef.current = null;
      return;
    }
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    if (reducedMotion) scrollLockRef.current = null;
  }

  /* The floating dock is rendered ONE level up (App), so it can persist and morph
     between the home section-nav and this case dock. We only publish the live
     bits (active section + its accent + the jump handler); App already knows the
     static section list from the slug, so the dock renders on the same commit the
     home dock unmounts — no missing-frame, clean shared-element handoff. */
  const jumpRef = useRef(jumpToSection);
  jumpRef.current = jumpToSection;
  const onSelectRef = useRef((id) => jumpRef.current(id));
  const onDockStateRef = useRef(onDockState);
  onDockStateRef.current = onDockState;

  useLayoutEffect(() => {
    onDockStateRef.current?.(
      named.length >= 2
        ? { activeId: activeSection, accent: activeAccent, onSelect: onSelectRef.current }
        : null,
    );
  }, [activeSection, activeAccent, sectionIds, named.length]);

  useEffect(() => () => onDockStateRef.current?.(null), []);

  return (
    <>
    <StaggerGroup
      as="article"
      className="cs"
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`cs-title-${slug}`}
      variants={bodyStagger(reducedMotion)}
    >
      <div className="cs-layout">
        <aside className="cs-rail" aria-label="Case study navigation">
          <RevealItem>
            <button type="button" className="cs__back" onClick={onBack}>
              <IconArrowLeft size={15} ariaHidden />
              Back
            </button>
          </RevealItem>
          {named.length >= 2 ? (
            <ContentsNav
              sections={named}
              activeId={activeSection}
              onSelect={jumpToSection}
            />
          ) : null}
        </aside>

        {/* The width morph is owned solely by the `.stage` max-width transition
           (the cell this column fills), so a single eased layout animation
           drives the expand/contract instead of two competing ones. */}
        <div className="cs-main">
          {/* Chrome — cover first under the header band. A real cover image
             sizes the figure to its own aspect ratio; otherwise a labeled
             placeholder tile holds the slot. */}
          <div className="cs-band cs-band--chrome">
            <RevealItem as="figure" className="cs__hero">
              {study.cover ? (
                <img
                  className="cs__cover"
                  src={study.cover}
                  alt={study.coverAlt ?? `${study.title} project cover`}
                  decoding="async"
                  fetchPriority="high"
                />
              ) : (
                <div className="cs__tile cs__tile--hero">
                  <span className="cs__tile-label">{study.hero ?? "image"}</span>
                </div>
              )}
            </RevealItem>
          </div>

          {/* Identity: project, category, and one supporting summary. */}
          <div className="cs-band cs-band--title">
            {instant ? (
              <RevealItem as="header" className="cs__head">
                <h1 id={`cs-title-${slug}`} className="cs__title">
                  {study.title}
                </h1>
                <p className="cs__meta">{study.meta}</p>
              </RevealItem>
            ) : (
              <header className="cs__head">
                <motion.h1
                  layoutId={`cs-title-${slug}`}
                  id={`cs-title-${slug}`}
                  className="cs__title"
                  transition={{ layout: layoutMorph(reducedMotion) }}
                >
                  {study.title}
                </motion.h1>
                <motion.p
                  layoutId={`cs-meta-${slug}`}
                  className="cs__meta"
                  transition={{ layout: layoutMorph(reducedMotion) }}
                >
                  {study.meta}
                </motion.p>
              </header>
            )}
            <RevealItem as="p" className="panel__lead cs__summary">
              {study.intro}
            </RevealItem>
          </div>

          {/* Context — project facts sit below the identity band. */}
          <div className="cs-band cs-band--context">
            <RevealItem>
              <CaseStudyFacts facts={study.facts} />
            </RevealItem>
          </div>

          <div className="cs-band cs-band--body">
            <div className="cs__body">
              {sections.map((section, i) => {
                if (section.blocks.some((b) => b.feat)) {
                  return <FeaturesSection key={section.id ?? i} section={section} />;
                }
                return (
                  <section
                    key={section.id ?? i}
                    id={section.id ?? undefined}
                    className="cs__section"
                    data-accent={
                      section.title ? SECTION_ACCENT[section.title] : undefined
                    }
                    aria-label={section.title ?? undefined}
                  >
                    {section.title ? (
                      <RevealEyebrow className="cs__section-eyebrow" aria-hidden="true">
                        {section.title}
                      </RevealEyebrow>
                    ) : null}
                    {section.blocks.map((block, j) => (
                      <Block key={j} block={block} />
                    ))}
                  </section>
                );
              })}
            </div>
          </div>

          <div className="cs-band cs-band--more">
            <CaseStudyOutro />
          </div>
        </div>
      </div>
    </StaggerGroup>
    {/* The floating dock lives in App now (see the onDockState publish above) so
        it can morph between the home nav and this case dock. */}
    </>
  );
}

function ContentsNav({ sections, activeId, onSelect }) {
  const refs = useRef({});
  const navRef = useRef(null);
  const ids = sections.map((s) => s.id);
  const reducedMotion = usePrefersReducedMotion();
  const verticalRail = useMediaQuery(DESKTOP_MQ);

  useEffect(() => {
    const btn = refs.current[activeId];
    if (!btn || verticalRail) return;
    btn.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId, verticalRail, reducedMotion]);

  function onKeyDown(e) {
    const i = ids.indexOf(activeId);
    let next;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = ids[(i + 1) % ids.length];
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = ids[(i - 1 + ids.length) % ids.length];
    else if (e.key === "Home") next = ids[0];
    else if (e.key === "End") next = ids[ids.length - 1];
    else return;
    e.preventDefault();
    onSelect(next);
    refs.current[next]?.focus();
  }

  return (
    <RevealItem
      as="nav"
      ref={navRef}
      className="cs-rail__nav"
      aria-label="On this page"
      role="tablist"
      aria-orientation={verticalRail ? "vertical" : "horizontal"}
      onKeyDown={onKeyDown}
    >
      {sections.map((section) => {
        const selected = section.id === activeId;
        return (
          <button
            key={section.id}
            ref={(el) => {
              refs.current[section.id] = el;
            }}
            type="button"
            className="tab"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(section.id)}
          >
            {selected && verticalRail ? (
              <motion.span
                className="tab__fill"
                layoutId="cs-tab-fill"
                aria-hidden="true"
                transition={fillMorph(reducedMotion)}
              />
            ) : null}
            <span className="tab__label">{section.title}</span>
          </button>
        );
      })}
    </RevealItem>
  );
}

