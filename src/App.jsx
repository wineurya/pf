import { Fragment, startTransition, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Backdrop } from "./components/Backdrop.jsx";
import { CaseStudy } from "./components/CaseStudy.jsx";
import { ExplorationGrid } from "./components/ExplorationGrid.jsx";
import { HoverWord } from "./components/HoverWord.jsx";
import { RevealItem, StaggerGroup } from "./components/Reveal.jsx";
import { Tabs } from "./components/Tabs.jsx";
import { ThemeToggle } from "./components/ThemeToggle.jsx";
import { WordBento } from "./components/WordBento.jsx";
import { WorkProjects } from "./components/WorkProjects.jsx";
import { useReady } from "./lib/hooks.js";
import { EASE_OUT } from "./lib/motion.js";
import { useTheme } from "./lib/theme.js";
import { usePageEnter } from "./lib/usePageEnter.js";
import { BRAND_ICONS, IconCheckmark1Small, IconClipboard } from "./lib/icons.jsx";
import { caseStudies, site, tabs } from "./content.js";

/* -- Case-study micro-route: /work/<slug> ----------------------------------- */
function studyFromPath(pathname) {
  const match = /^\/work\/([\w-]+)\/?$/.exec(pathname);
  return match && caseStudies[match[1]] ? match[1] : null;
}

/** Study slug state kept in sync with the URL (push on open, back on close). */
function useStudyRoute() {
  const [study, setStudy] = useState(() => studyFromPath(window.location.pathname));
  const pushed = useRef(false);

  useEffect(() => {
    function onPopState() {
      setStudy(studyFromPath(window.location.pathname));
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function open(slug) {
    if (study) {
      /* Jumping case → case (the in-study list): REPLACE rather than push so the
         history stays one entry deep from home — Back (and the browser back
         button) then always returns to the work list, never the prior study. */
      window.history.replaceState({ study: slug }, "", `/work/${slug}`);
    } else {
      pushed.current = true;
      window.history.pushState({ study: slug }, "", `/work/${slug}`);
    }
    window.scrollTo(0, 0);
    setStudy(slug);
  }

  function close() {
    if (pushed.current) {
      window.history.back(); // popstate clears the state
    } else {
      /* Deep-loaded /work/<slug> — there is no entry behind us to pop. */
      window.history.pushState({}, "", "/");
      setStudy(null);
    }
  }

  return [study, open, close];
}

/* -- Copy-to-clipboard email with a small toast ----------------------------- */
function CopyEmail({ email, label }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const text = label ?? email;

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      /* clipboard blocked — the address is still visible to read/select */
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <span className={`copy${copied ? " is-copied" : ""}`}>
      <button type="button" className="copy__btn" onClick={copy}>
        {copied ? (
          <IconCheckmark1Small className="copy__icon" size={14} ariaHidden />
        ) : (
          <IconClipboard className="copy__icon" size={14} ariaHidden />
        )}
        <span>{text}</span>
      </button>
      <span className="copy__toast" aria-hidden="true">
        Copied
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </span>
  );
}

/* -- About contact row — email copy + external social links ------------------- */
function AboutContact() {
  return (
    <RevealItem as="p" className="panel__lead contact-links">
      <span className="contact-links__lead">You can reach me at </span>
      {site.contact.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 ? (
            <span className="contact-links__sep" aria-hidden="true">
              {" · "}
            </span>
          ) : null}
          {item.type === "email" ? (
            <CopyEmail email={item.value} label={item.label} />
          ) : (
            <a
              className="contact-links__link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
            </a>
          )}
        </Fragment>
      ))}
    </RevealItem>
  );
}

/* -- Inline tool mention with its Central brand mark ------------------------- */
function ToolWord({ tool, icon }) {
  const Icon = BRAND_ICONS[icon];
  return (
    <span className={`tool tool--${icon}`}>
      {Icon ? <Icon className="tool__icon" size={14} ariaHidden /> : null}
      {tool}
    </span>
  );
}

/* -- About — paragraphs with hover words; a clicked word expands its full
      photo set as a bento right under the paragraph it lives in. ------------- */
function AboutPanel() {
  const [expandedWord, setExpandedWord] = useState(null);

  useEffect(() => {
    if (!expandedWord) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setExpandedWord(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedWord]);

  return (
    <>
      {site.about.map((p, i) => {
        if (!Array.isArray(p)) {
          return (
            <RevealItem key={i} as="p" className="panel__lead">
              {p}
            </RevealItem>
          );
        }

        const expandedSeg = p.find(
          (seg) => typeof seg === "object" && seg.word === expandedWord,
        );

        return (
          <Fragment key={i}>
            <RevealItem as="p" className="panel__lead">
              {p.map((seg, j) => {
                if (typeof seg === "string") return seg;
                if (seg.tool) return <ToolWord key={j} {...seg} />;
                return (
                  <HoverWord
                    key={j}
                    word={seg.word}
                    photos={seg.photos}
                    expanded={expandedWord === seg.word}
                    onToggle={() =>
                      setExpandedWord((w) => (w === seg.word ? null : seg.word))
                    }
                  />
                );
              })}
            </RevealItem>
            <AnimatePresence initial={false} mode="wait">
              {expandedSeg ? (
                <WordBento
                  key={expandedSeg.word}
                  word={expandedSeg.word}
                  photos={expandedSeg.photos}
                />
              ) : null}
            </AnimatePresence>
          </Fragment>
        );
      })}
      <AboutContact />
    </>
  );
}

function PanelContent({ tab, theme, onOpenStudy, view, onView }) {
  if (tab === "work") {
    return (
      <WorkProjects
        items={site.work}
        onOpen={onOpenStudy}
        view={view}
        onView={onView}
      />
    );
  }

  if (tab === "exploration") {
    return (
      <>
        <ExplorationGrid items={site.explorationPreviews} theme={theme} />
        {site.explorationMore?.length > 0 ? (
          <RevealItem>
            <a href="/exploration" className="btn-minimal">
              More explorations →
            </a>
          </RevealItem>
        ) : null}
      </>
    );
  }

  return <AboutPanel />;
}

/* -- Page ------------------------------------------------------------------- */
export function App() {
  const ready = useReady();
  const [tab, setTab] = useState("work");
  /* Work-tab layout: list (default — the page's first impression is unchanged),
     single-column cards, or a two-up gallery. Kept here so it persists across
     tab switches. */
  const [view, setView] = useState("list");
  const [theme, toggleTheme] = useTheme();
  const [study, openStudy, closeStudy] = useStudyRoute();
  const lastStudy = useRef(null);
  /* True only while the boot-time deep link is still open — that first case
     page enters settled instead of morphing from the (invisible) list. */
  const deepLoaded = useRef(Boolean(study));
  usePageEnter(ready);

  useEffect(() => {
    if (!study) deepLoaded.current = false;
  }, [study]);

  useEffect(() => {
    if (!study) return;
    lastStudy.current = study;
    function onKeyDown(e) {
      if (e.key === "Escape") closeStudy();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [study]);

  /* Coming back: hand focus to the row the reader left from. */
  useEffect(() => {
    if (study || !lastStudy.current) return;
    document
      .querySelector(`a[data-slug="${lastStudy.current}"]`)
      ?.focus({ preventScroll: true });
  }, [study]);

  return (
    <>
      {/* Legibility mask inside re-measures whenever the active surface swaps. */}
      <Backdrop surfaceKey={`${tab}:${study ?? ""}`} />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {study ? (
        <ThemeToggle theme={theme} onToggle={toggleTheme} caseOpen />
      ) : null}

      <div className="shell">
        <div className={`stage${study ? " stage--case" : ""}`}>
          {/* Home never unmounts — it dims while a case study sits on top,
              so the return trip lands on an unchanged page. */}
          <motion.div
            className="stage__home"
            initial={false}
            animate={{ opacity: study ? 0 : 1 }}
            transition={
              study
                ? { duration: 0.2, ease: EASE_OUT }
                : { duration: 0.28, ease: EASE_OUT, delay: 0.06 }
            }
            inert={Boolean(study)}
          >
            <StaggerGroup className="content-wrapper" ready={ready}>
              <div className="home-bottom-bar">
                {study ? null : (
                  <div className="home-bottom-bar__dock">
                    <ThemeToggle theme={theme} onToggle={toggleTheme} />
                    <Tabs
                      items={tabs}
                      value={tab}
                      onChange={(id) => startTransition(() => setTab(id))}
                    />
                  </div>
                )}
              </div>
              <StaggerGroup className="content-main">
                <StaggerGroup as="header" className="head">
                  <RevealItem>
                    <div className="head__name-role">
                      <span className="head__name">{site.name}</span>
                      <span className="head__role">{site.role}</span>
                    </div>
                  </RevealItem>
                  <StaggerGroup className="head__excerpt-group">
                    {site.excerpt.map((paragraph, index) => (
                      <RevealItem key={index} as="p" className="head__excerpt">
                        {paragraph}
                      </RevealItem>
                    ))}
                  </StaggerGroup>
                </StaggerGroup>

                <main id="main">
                  <AnimatePresence mode="wait">
                    <StaggerGroup key={tab} className="panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0}>
                      <PanelContent
                        tab={tab}
                        theme={theme}
                        onOpenStudy={openStudy}
                        view={view}
                        onView={setView}
                      />
                    </StaggerGroup>
                  </AnimatePresence>
                </main>
              </StaggerGroup>
            </StaggerGroup>
          </motion.div>

          <AnimatePresence>
            {study ? (
              <CaseStudy
                key={study}
                slug={study}
                onBack={closeStudy}
                onOpen={openStudy}
                instant={deepLoaded.current}
                theme={theme}
                onToggleTheme={toggleTheme}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
