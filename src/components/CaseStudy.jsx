import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { RevealEyebrow, RevealItem, StaggerGroup } from "./Reveal.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";
import { usePrefersReducedMotion } from "../lib/hooks.js";
import { EASE_OUT, fillMorph, layoutMorph } from "../lib/motion.js";
import {
  IconArrowLeft,
  IconChevronRight,
  IconClipboard,
  IconColorPalette,
  IconGuideAccess,
  IconGuideInteraction,
  IconGuideVisual,
  IconLayersThree,
  IconLayoutGrid2,
  IconMapPin,
  IconUser,
} from "../lib/icons.jsx";
import { caseStudies } from "../content.js";
import { ToolBrandIcon } from "./ToolBrandIcon.jsx";
/* Real iPhone 17 Pro Max device frame + iOS status bar from the iOS 26 Figma
   community kit. The frame PNG (Silver, transparent screen + baked-in Dynamic
   Island) overlays the recording; the status bar PNG lays into the cropped top
   band. See PhoneVideo for the measured screen geometry. */
import iphoneFrame from "../assets/case/iphone-frame-silver.png";
import iphoneStatusBar from "../assets/case/iphone-statusbar.png";

/* Each named section carries an accent that colors load-bearing underlines — a
   color identifier per section. Keyed by section title; the accent slug resolves
   to a `--mark-color` in CSS.
   Sections that sit adjacent within a study always land on distinct hues; an
   unmapped title falls back to the default gold. */
const SECTION_ACCENT = {
  Overview: "overview",
  "The idea": "ideation",
  "The concept": "ideation",
  "The brief": "ideation",
  "The experiment": "ideation",
  "The problem": "problem",
  Research: "research",
  Personas: "personas",
  Wireframes: "wireframes",
  Design: "design",
  Features: "features",
  "The site": "features",
  Outcomes: "results",
  "The laws": "results",
  "Sprint 2": "results",
  "Sprint 1": "sprint",
  Retrospective: "retro",
};

/* Optional per-cell glyphs (Central icons) — feature cells can name one to
   anchor the title. Content stays plain data via these slugs; missing/unknown
   names render no icon. */
const CELL_ICONS = {
  palette: IconColorPalette,
  layers: IconLayersThree,
  grid: IconLayoutGrid2,
  user: IconUser,
  map: IconMapPin,
  clipboard: IconClipboard,
};

/* Central-icon glyphs anchored to the feature-guide trigger words in the
   sticky left column. Slugs come from each guide entry in content. */
const GUIDE_ICONS = {
  visual: IconGuideVisual,
  access: IconGuideAccess,
  interaction: IconGuideInteraction,
};

/* Labeled meta fields, in render order. */
const FACT_FIELDS = [
  { key: "role", label: "Role" },
  { key: "team", label: "Team" },
  { key: "duration", label: "Duration" },
  { key: "tools", label: "Tools" },
];

/* The header travels (layoutId), so the body holds back a beat and then
   follows in the app's usual reveal language. */
const bodyStagger = (reducedMotion) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reducedMotion ? 0.03 : 0.045,
      delayChildren: reducedMotion ? 0 : 0.1,
    },
  },
  /* Exit TOP-DOWN, not reversed. Motion flattens every RevealItem in the page
     into one stagger pool, so a reverse cascade starts at the off-screen bottom
     and the visible top leaves last — on long studies that reads as a ~0.5s
     pause after Back before anything reacts. Top-down with a tiny step makes the
     visible cluster fall away immediately; off-screen blocks trail harmlessly. */
  exit: {
    transition: {
      staggerChildren: reducedMotion ? 0 : 0.008,
      staggerDirection: 1,
    },
  },
});

/* Inline emphasis for body prose: `==phrase==` renders as a section-accent
   highlight (12% fill, 100% ink). One
   load-bearing phrase per paragraph carries the eye through the section. */
function renderRich(text) {
  if (typeof text !== "string" || !text.includes("==")) return text;
  return text.split(/==([^=]+)==/g).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="cs__mark">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/* Splits paragraph text by guide term names and wraps each occurrence in an
   animated span that highlights as the matching features scroll into view. */
function renderWithGuide(text, guide, activeGuide) {
  if (!guide || !guide.length || typeof text !== "string") return text;
  const terms = guide.map((g) => g.term);
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) => {
    const idx = terms.indexOf(part);
    if (idx >= 0) {
      const GuideIcon = guide[idx].icon ? GUIDE_ICONS[guide[idx].icon] : null;
      return (
        <span key={i} className={`cs__guide-term${idx === activeGuide ? " is-active" : ""}`}>
          {GuideIcon ? <GuideIcon className="cs__guide-icon" size={15} ariaHidden /> : null}
          {part}
        </span>
      );
    }
    return part;
  });
}

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function groupSections(blocks) {
  const sections = [];
  let current = { title: null, id: null, blocks: [] };
  for (const block of blocks) {
    if (block.section) {
      if (current.blocks.length) sections.push(current);
      current = { title: block.section, id: slugifyTitle(block.section), blocks: [] };
    } else {
      current.blocks.push(block);
    }
  }
  if (current.blocks.length) sections.push(current);
  return sections;
}

export function CaseStudy({
  slug,
  onBack,
  instant = false,
  theme,
  onToggleTheme,
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
     to a CSS var so only the dock's fill repaints — no React re-render per scroll
     frame (the whole case study would otherwise re-render). rAF throttled. */
  useEffect(() => {
    if (!activeSection) return;
    const el = document.getElementById(activeSection);
    if (!el) return;
    const root = document.documentElement;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * 0.42;
      const p = (line - rect.top) / (rect.height || 1);
      root.style.setProperty("--cs-section-progress", Math.max(0, Math.min(1, p)));
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

  /* Clear the shared progress var when the study closes so a stale fill never
     leaks into the next-opened study before its first measure. */
  useEffect(
    () => () =>
      document.documentElement.style.removeProperty("--cs-section-progress"),
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

    {named.length >= 2 ? (
      <CaseDock
        sections={named}
        activeId={activeSection}
        accent={activeAccent}
        onSelect={jumpToSection}
        onBack={onBack}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
    ) : null}
    </>
  );
}

function CaseStudyFacts({ facts }) {
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

function ContentsNav({ sections, activeId, onSelect }) {
  const refs = useRef({});
  const navRef = useRef(null);
  const ids = sections.map((s) => s.id);
  const reducedMotion = usePrefersReducedMotion();
  const [verticalRail, setVerticalRail] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setVerticalRail(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

/* Mobile-only floating dock (bottom-right). Reuses the home dock's pill shell:
   Back · the section currently in view · theme toggle. The middle button rolls a
   new section label in (and the old one out) as you scroll, carries a light
   left→right "volume" fill in that section's accent tracking read-through, and
   on tap opens a sheet of every section. Portaled to <body> so `position:fixed`
   is unaffected by the case article's reveal transform. */
function CaseDock({
  sections,
  activeId,
  accent,
  onSelect,
  onBack,
  theme,
  onToggleTheme,
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];
  /* Size the rolling label field to the study's longest section title so it
     stays put as the label swaps (no per-section width jitter). */
  const maxLen = sections.reduce((n, s) => Math.max(n, s.title.length), 0);
  /* progress is fed in via the --cs-section-progress CSS var on <html> (set by
     the scroll measure above) so the fill repaints without re-rendering here. */

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    }
    function onScroll() {
      setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  function pick(id) {
    onSelect(id);
    setOpen(false);
  }

  /* Wallet-menu pattern: opacity + short y — no 3D flip (stable during scroll). */
  const roll = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.12 },
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.22, ease: EASE_OUT },
      };

  const sheetMotion = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.12 },
      }
    : {
        initial: { clipPath: "inset(0% 0% 100% 0% round 12px)", opacity: 0 },
        animate: { clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 },
        exit: { clipPath: "inset(0% 0% 100% 0% round 12px)", opacity: 0 },
        transition: { duration: 0.32, ease: EASE_OUT },
      };

  const dockReveal = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.14 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.28, ease: EASE_OUT } };

  return createPortal(
    <div
      className="cs-dock"
      data-accent={accent}
      style={{ "--cs-dock-roll-ch": maxLen }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            key="scrim"
            className="cs-dock__scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.22, ease: EASE_OUT }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="sheet"
            className="cs-dock__sheet"
            role="menu"
            aria-label="On this page"
            initial={sheetMotion.initial}
            animate={sheetMotion.animate}
            exit={sheetMotion.exit}
            transition={sheetMotion.transition}
          >
            <p className="cs-dock__sheet-label">On this page</p>
            <ul className="cs-dock__sheet-list">
              {sections.map((s) => {
                const isActive = s.id === activeId;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      className={`cs-dock__sheet-row${isActive ? " is-active" : ""}`}
                      data-accent={SECTION_ACCENT[s.title] || "overview"}
                      onClick={() => pick(s.id)}
                    >
                      <span className="cs-dock__sheet-dot" aria-hidden="true" />
                      <span className="cs-dock__sheet-title">{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="cs-dock__bar"
        initial={dockReveal.initial}
        animate={dockReveal.animate}
        transition={dockReveal.transition}
      >
        <button
          type="button"
          className="cs-dock__btn cs-dock__back"
          onClick={onBack}
          aria-label="Back to work"
        >
          <IconArrowLeft size={17} ariaHidden />
        </button>

        <button
          type="button"
          className="cs-dock__section"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={`Section: ${active?.title ?? ""}. Show all sections`}
        >
          <span className="cs-dock__fill" aria-hidden="true" />
          <span className="cs-dock__roll">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={active?.id}
                className="cs-dock__roll-title"
                initial={roll.initial}
                animate={roll.animate}
                exit={roll.exit}
                transition={roll.transition}
              >
                {active?.title}
              </motion.span>
            </AnimatePresence>
          </span>
          <IconChevronRight className="cs-dock__caret" size={13} ariaHidden />
        </button>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </motion.div>
    </div>,
    document.body,
  );
}

function CaseStudyOutro() {
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
        Care for a <span className="cs__outro-grad">quick chat</span>?
      </p>
      <a className="cs__outro-cta" href="mailto:contact@wineury.design">
        Let&rsquo;s talk
      </a>
    </RevealItem>
  );
}

function FeaturesSection({ section }) {
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
              className={`cs__feature${block.media === "prototype" ? " cs__feature--prototype" : ""}`}
            >
              <div className="cs__feature-frame">
                <span className="cs__tile-label">{block.media ?? "image"}</span>
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

function MediaTile({ kind, cell = false }) {
  return (
    <div className={`cs__tile${cell ? " cs__tile--cell" : ""}`}>
      <span className="cs__tile-label">{kind}</span>
    </div>
  );
}

function Block({ block }) {
  if (block.p) {
    return (
      <RevealItem className="cs__story-block">
        <h2 className="cs__block-title">{block.title}</h2>
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
                {cell.media ? <MediaTile kind={cell.media} cell /> : null}
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

  if (block.media) {
    return (
      <RevealItem as="figure" className="cs__figure">
        <figcaption className="cs__figcap">
          <h2 className="cs__block-title">{block.title}</h2>
          <p className="cs__block-summary">{renderRich(block.sub)}</p>
        </figcaption>
        {block.media === "phone-video" && block.video ? (
          <PhoneVideo video={block.video} title={block.title} />
        ) : (
          <MediaTile kind={block.media} />
        )}
      </RevealItem>
    );
  }

  return null;
}

/* An iPhone 17 Pro Max mock holding a screen recording. The bezel and Dynamic
   Island are a real device frame PNG from the iOS 26 Figma kit, overlaid on top;
   the recording sits behind it, cropped to the screen rect. The recording carries
   its own (unpolished) iOS status bar in its top 62/960 band — the viewport pins
   the video to its BOTTOM edge and clips that band off, and the kit's status bar
   (9:41 + battery) is laid in over the freed top strip. Screen geometry (left
   5.102% / top 2.2% / width 89.796% / height 95.6%) is measured from the frame
   PNG's transparent screen hole. Video plays only while on screen; reduced motion
   falls back to poster + controls. */
function PhoneVideo({ video, title }) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play?.().catch(() => {});
        else el.pause?.();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  return (
    <div className="cs__phone-stage">
      <div className="cs__phone">
        <div className="cs__phone-screen">
          <div className="cs__phone-statusbar">
            <img
              className="cs__phone-statusbar-img"
              src={iphoneStatusBar}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="cs__phone-viewport">
            <video
              ref={ref}
              className="cs__phone-video"
              poster={video.poster}
              muted
              loop
              playsInline
              preload="metadata"
              autoPlay={!reducedMotion}
              controls={reducedMotion}
              aria-label={`Screen recording: ${title}`}
            >
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
            </video>
          </div>
        </div>
        <img
          className="cs__phone-frame"
          src={iphoneFrame}
          alt=""
          aria-hidden="true"
          draggable="false"
        />
      </div>
    </div>
  );
}
