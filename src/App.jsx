import {
  Fragment,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  animate,
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";

import { Backdrop } from "./components/Backdrop.jsx";
import { CaseStudy, CaseDock, sectionsForStudy } from "./components/CaseStudy.jsx";
import { Cursor } from "./components/Cursor.jsx";
import { ExplorationGrid } from "./components/ExplorationGrid.jsx";
import { HoverWord } from "./components/HoverWord.jsx";
import { Portrait } from "./components/Portrait.jsx";
import { RevealItem, StaggerGroup } from "./components/Reveal.jsx";
import { Tabs } from "./components/Tabs.jsx";
import { ThemeToggle } from "./components/ThemeToggle.jsx";
import { AboutFilmstrip } from "./components/AboutFilmstrip.jsx";
import { WorkProjects } from "./components/WorkProjects.jsx";
import { useReady, usePrefersReducedMotion, useMediaQuery } from "./lib/hooks.js";
import {
  EASE_IN_OUT,
  EASE_OUT,
  DUR_LAYOUT,
  DUR_UI,
  DUR_UI_EXIT,
  dockMorph,
} from "./lib/motion.js";
import { useTheme } from "./lib/theme.js";
import { usePageEnter } from "./lib/usePageEnter.js";
import { useRailDodge } from "./lib/useRailDodge.js";
import { useVisualViewportPin } from "./lib/useVisualViewportPin.js";
import { playDungSfx } from "./lib/dungSfx.js";
import { renderRich } from "./lib/richText.jsx";
import {
  BRAND_ICONS,
  IconCheckmark1Small,
  IconEnvelope,
  IconLinkedIn,
  IconXLogo,
} from "./lib/icons.jsx";
import { caseStudies, site, tabs } from "./content.js";

function studyFromPath(pathname) {
  const match = /^\/work\/([\w-]+)\/?$/.exec(pathname);
  const slug = match?.[1];
  /* WIP studies are locked: a deep-link to one falls back to home, never opens. */
  return slug && caseStudies[slug] && !caseStudies[slug].wip ? slug : null;
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

/* Contact cursor tags — pipe-separated; Cursor picks a fresh one each enter. */
const CONTACT_CURSOR_EMAIL =
  "Say hello|Let's talk|Drop a line|I'm around|Ping me";
const CONTACT_CURSOR_SOCIAL =
  "Let's chat|Say hi|Come say hello|Happy to connect|Find me here";

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
      <button
        type="button"
        className="copy__btn"
        onClick={copy}
        onPointerEnter={playDungSfx}
        data-cursor={copied ? "Copied" : undefined}
        data-cursor-rotate={copied ? undefined : CONTACT_CURSOR_EMAIL}
        data-cursor-icon={copied ? "copy" : "wave"}
      >
        {copied ? (
          <IconCheckmark1Small className="copy__icon" size={14} ariaHidden />
        ) : (
          <IconEnvelope className="copy__icon" size={14} ariaHidden />
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

/* Channel glyphs for the contact row — same 14px inline treatment as the
   ToolWord brand marks, so every channel gets an identity, not just Email. */
const CONTACT_ICONS = {
  LinkedIn: IconLinkedIn,
  "X/Twitter": IconXLogo,
};

/** Shared contact — About (inline lead) + Work intro (quiet note + links). */
export function ContactLinks({
  lead = "You can reach me at ",
  note = null,
}) {
  const links = site.contact.map((item, i) => {
    const Icon = CONTACT_ICONS[item.label];
    return (
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
            onPointerEnter={playDungSfx}
            data-cursor-rotate={CONTACT_CURSOR_SOCIAL}
            data-cursor-icon="wave"
          >
            {Icon ? (
              <Icon className="contact-links__icon" size={14} ariaHidden />
            ) : null}
            {item.label}
          </a>
        )}
      </Fragment>
    );
  });

  if (note) {
    return (
      <RevealItem className="contact-block">
        <p className="contact-block__note">{note}</p>
        <p className="panel__lead contact-links">{links}</p>
      </RevealItem>
    );
  }

  return (
    <RevealItem as="p" className="panel__lead contact-links">
      {lead ? <span className="contact-links__lead">{lead}</span> : null}
      {links}
    </RevealItem>
  );
}

function ToolWord({ tool, icon }) {
  const Icon = BRAND_ICONS[icon];
  return (
    <span className={`tool tool--${icon}`}>
      {Icon ? <Icon className="tool__icon" size={14} ariaHidden /> : null}
      {tool}
    </span>
  );
}

/* Every hover-word segment across the About paragraphs, in prose order —
   the filmstrip's photo source. */
const aboutWordGroups = site.about
  .filter(Array.isArray)
  .flatMap((p) => p.filter((seg) => typeof seg === "object" && seg.word));

const hoverWordPunctuation = /^[,.;:!?]+/;

function leadingHoverPunctuation(value) {
  return value.match(hoverWordPunctuation)?.[0] ?? "";
}

function stripLeadingHoverPunctuation(value) {
  const punctuation = leadingHoverPunctuation(value);
  return punctuation ? value.slice(punctuation.length) : value;
}

function AboutPanel() {
  /* A hover-word can be *held* (transient — set on hover, dropped on leave) or
     *locked* (deliberate — set on click / tap / a filmstrip photo). Only a
     locked selection auto-returns to the drift; a held one is owned by the
     pointer, so the 6s timer must never yank the strip out from under a hover. */
  const [selection, setSelection] = useState({ word: null, locked: false });
  const { word: selectedWord, locked } = selection;
  const clear = useCallback(() => setSelection({ word: null, locked: false }), []);

  useEffect(() => {
    if (!selectedWord) return;
    const timer = locked ? setTimeout(clear, 6000) : null;
    function onKeyDown(e) {
      if (e.key === "Escape") clear();
    }
    function onPointerDown(e) {
      if (!e.target.closest(".hw, .afilm")) clear();
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [selectedWord, locked, clear]);

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

        return (
          <RevealItem key={i} as="p" className="panel__lead">
            {p.map((seg, j) => {
              if (typeof seg === "string") {
                const prev = p[j - 1];
                return prev && typeof prev === "object" && prev.word
                  ? stripLeadingHoverPunctuation(seg)
                  : seg;
              }
              if (seg.tool) return <ToolWord key={j} {...seg} />;
              if (seg.text) {
                return (
                  <span
                    key={j}
                    className={seg.tone === "muted" ? "about-muted" : undefined}
                  >
                    {seg.text}
                  </span>
                );
              }
              return (
                <HoverWord
                  key={j}
                  word={seg.word}
                  suffix={
                    typeof p[j + 1] === "string"
                      ? leadingHoverPunctuation(p[j + 1])
                      : ""
                  }
                  expanded={selectedWord === seg.word}
                  onToggle={() =>
                    setSelection((s) =>
                      s.locked && s.word === seg.word
                        ? { word: null, locked: false }
                        : { word: seg.word, locked: true },
                    )
                  }
                  onHoverChange={(on) =>
                    setSelection((s) => {
                      if (on) return s.locked ? s : { word: seg.word, locked: false };
                      return !s.locked && s.word === seg.word
                        ? { word: null, locked: false }
                        : s;
                    })
                  }
                />
              );
            })}
          </RevealItem>
        );
      })}
      <ContactLinks />
      <RevealItem>
        <AboutFilmstrip
          groups={aboutWordGroups}
          selectedWord={selectedWord}
          onSelect={(word) =>
            setSelection(
              word ? { word, locked: true } : { word: null, locked: false },
            )
          }
        />
      </RevealItem>
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
      <ExplorationGrid items={site.explorationPreviews} theme={theme} />
    );
  }

  return <AboutPanel />;
}

/* Avatar reveal, expressed as one 0→1 progress so the two halves stay locked:
   at progress p the name/role block is pushed x = p·shift (a transform, was the
   old animated width + marginRight) and the avatar is wiped in left-to-right via
   clip-path right-inset = (1−p)·100% (a paint, was the slot's overflow-clipped
   width). Because both read the SAME p, the revealed edge (52·p) always trails
   the name's left edge (64·p) by the 12·p gap — no overlap at any frame. Driving
   them as two independent tweens on the same curve did not stay in step. */
const portraitClipFor = (p) => `inset(0px ${((1 - p) * 100).toFixed(3)}% 0px 0px)`;

/* How far the name/role block slides to open room for the avatar: the portrait
   box (display + gap + body leading) plus its gap. Read off the type/space
   tokens — all viewport-invariant, so a one-time read tracks the CSS without a
   resize listener — with the composed 52 + 12 as a fallback. */
function measurePortraitShift() {
  const fallback = 64;
  if (typeof document === "undefined") return fallback;
  const cs = getComputedStyle(document.documentElement);
  const px = (name) => parseFloat(cs.getPropertyValue(name));
  const shift =
    px("--text-display-leading") +
    px("--space-1") +
    px("--text-leading") +
    px("--space-3");
  return Number.isFinite(shift) && shift > 0 ? shift : fallback;
}

export function App() {
  const ready = useReady();
  const reducedMotion = usePrefersReducedMotion();
  /* The floating dock only reshapes into the case-study controls (and shares its
     shell via layoutId) on true phones — the ≥860px home page has a left rail, so
     there is no home pill to morph from. */
  const isMobileDock = useMediaQuery("(max-width: 859px)");
  /* Live case-dock bits published by the open CaseStudy (active section + accent +
     jump handler); the static section list comes straight from the slug. */
  const [dockState, setDockState] = useState(null);
  const [tab, setTab] = useState("work");
  /* Work-tab layout: list (default — the page's first impression is unchanged),
     single-column cards, or a two-up gallery. Kept here so it persists across
     tab switches. */
  const [view, setView] = useState("list");
  const [theme, toggleTheme] = useTheme();
  const [study, openStudy, closeStudy] = useStudyRoute();
  /* Static section list for the open study (id + title), known synchronously from
     the slug so the hoisted dock renders on the same commit the home dock leaves. */
  const caseSections = study ? sectionsForStudy(study) : null;
  const lastStudy = useRef(null);
  /* True only while the boot-time deep link is still open — that first case
     page enters settled instead of morphing from the (invisible) list. */
  const deepLoaded = useRef(Boolean(study));
  usePageEnter(ready);

  useVisualViewportPin();

  /* The widened work grid can scroll through the sticky tab rail's band and
     over the fixed theme toggle — this slides both (one shared shift, so
     their common left edge holds) toward the page edge during the pass. */
  useRailDodge(!study && tab === "work" && view !== "list", view);

  const aboutPortrait = tab === "about";
  /* Enter mirrors the exit's two-phase staging: the slot opens first (clip+push
     on portraitProgress, DUR_LAYOUT), THEN the photo fades/scales in — so the
     delay = the slot-open duration. Exit runs it in reverse (photo fades, then
     slot collapses), which is the read we're matching. */
  const portraitEnter = reducedMotion
    ? { duration: 0.1 }
    : { duration: DUR_UI, ease: EASE_OUT, delay: DUR_LAYOUT };
  const portraitExit = reducedMotion
    ? { duration: 0.1 }
    : { duration: DUR_UI_EXIT, ease: EASE_OUT };

  /* One driver for the reveal: `portraitProgress` (0→1) feeds both the name/role
     push and the avatar's clip-wipe, so they stay locked (two same-curve tweens
     drifted apart in testing). Push distance = the avatar box + its gap, read
     once from the viewport-invariant tokens. */
  const [portraitShift] = useState(measurePortraitShift);
  const portraitProgress = useMotionValue(aboutPortrait ? 1 : 0);
  const nameShift = useTransform(portraitProgress, (p) => p * portraitShift);
  const portraitClip = useTransform(portraitProgress, portraitClipFor);
  useEffect(() => {
    /* Open immediately on enter; on exit hold open until the avatar has faded
       (delay = the fade), then close — the old two-phase choreography. */
    const controls = animate(
      portraitProgress,
      aboutPortrait ? 1 : 0,
      reducedMotion
        ? { duration: 0.1 }
        : aboutPortrait
          ? { duration: DUR_LAYOUT, ease: EASE_IN_OUT }
          : { duration: DUR_LAYOUT, ease: EASE_IN_OUT, delay: DUR_UI_EXIT },
    );
    return () => controls.stop();
  }, [aboutPortrait, reducedMotion, portraitProgress]);
  const headerLayout = reducedMotion
    ? { duration: 0.1 }
    : { duration: DUR_LAYOUT, ease: EASE_IN_OUT };

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
    <LayoutGroup>
      {/* Legibility mask inside re-measures whenever the active surface swaps.
          `view` is part of the key: gallery views break out wider than the
          column, so the blob must re-cover the new extent. */}
      <Backdrop surfaceKey={`${tab}:${view}:${study ?? ""}`} caseOpen={Boolean(study)} />
      <Cursor />

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
                ? { duration: reducedMotion ? 0.1 : 0.2, ease: EASE_OUT }
                : {
                    duration: reducedMotion ? 0.1 : 0.28,
                    ease: EASE_OUT,
                    delay: reducedMotion ? 0 : 0.06,
                  }
            }
            inert={Boolean(study)}
          >
            <StaggerGroup className="content-wrapper" ready={ready}>
              <div className="home-bottom-bar">
                {study ? null : (
                  <motion.div
                    className="home-bottom-bar__dock"
                    layoutId={isMobileDock ? "m-dock-shell" : undefined}
                    transition={{ layout: dockMorph(reducedMotion) }}
                  >
                    {/* On phones the toggle rides in the header (top-right, inline
                        with name/role); the dock keeps it on the ≥860px rail. */}
                    {isMobileDock ? null : (
                      <ThemeToggle theme={theme} onToggle={toggleTheme} />
                    )}
                    <Tabs
                      items={tabs}
                      value={tab}
                      onChange={(id) => startTransition(() => setTab(id))}
                    />
                  </motion.div>
                )}
              </div>
              {/* layout="position" (not full layout): the header/column reshapes
                  when the About portrait reveals or the excerpt appears, but only
                  its POSITION is ever translated — never its size via scale. A full
                  `layout` animates height with scaleY, which squished the non-layout
                  panel/identity descendants for a few frames on every tab swap. */}
              <StaggerGroup
                className="content-main"
                layout="position"
                transition={{ layout: headerLayout }}
              >
                <StaggerGroup
                  as="header"
                  className="head"
                  layout="position"
                  transition={{ layout: headerLayout }}
                >
                  <RevealItem>
                    <div className="head__identity">
                      {/* About reveal, off one progress value (portraitProgress):
                          the avatar is lifted out of flow (absolute) and wiped in
                          left-to-right via clip-path — a paint, not a reflow —
                          while the name/role block translates right to open its
                          gap. Same motion the old animated width/marginRight gave,
                          off the layout path. The fade/scale ride AnimatePresence;
                          the clip + push ride the shared motion values. */}
                      <AnimatePresence initial={false}>
                        {aboutPortrait ? (
                          <motion.div
                            key="pfp"
                            className="head__identity-portrait"
                            initial={
                              reducedMotion
                                ? { opacity: 0 }
                                : { opacity: 0, scale: 0.88 }
                            }
                            animate={{ opacity: 1, scale: 1 }}
                            exit={
                              reducedMotion
                                ? { opacity: 0, transition: portraitExit }
                                : {
                                    opacity: 0,
                                    scale: 0.92,
                                    transition: {
                                      opacity: portraitExit,
                                      scale: portraitExit,
                                    },
                                  }
                            }
                            transition={{
                              opacity: portraitEnter,
                              scale: portraitEnter,
                            }}
                            style={{
                              clipPath: portraitClip,
                              transformOrigin: "center center",
                            }}
                          >
                            <Portrait />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                      <motion.div
                        className="head__name-role"
                        style={{ x: nameShift }}
                      >
                        <span className="head__name">{site.name}</span>
                        <span className="head__role">{site.role}</span>
                      </motion.div>
                      {isMobileDock ? (
                        <ThemeToggle theme={theme} onToggle={toggleTheme} />
                      ) : null}
                    </div>
                  </RevealItem>
                  {/* The excerpt's SPACE is animated (height), not just its
                      opacity: when it toggles for About the header would otherwise
                      snap 44↔165px in one frame and teleport the panel below by
                      ~120px. Animating height over the same beat as the reshape
                      glides the panel instead. initial={false} keeps first paint
                      static so the page-entrance reveal (inner StaggerGroup) owns
                      the load. overflow clips the text as the box collapses. */}
                  <AnimatePresence initial={false}>
                    {tab === "about" ? null : (
                      <motion.div
                        key="head-excerpt"
                        style={{ overflow: "hidden" }}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ height: headerLayout }}
                      >
                        <StaggerGroup className="head__excerpt-group">
                          {site.excerpt.map((paragraph, index) => (
                            <RevealItem key={index} as="p" className="head__excerpt">
                              {renderRich(paragraph)}
                            </RevealItem>
                          ))}
                          <ContactLinks note="Open to product design work." />
                        </StaggerGroup>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StaggerGroup>

                <main id="main">
                  {/* popLayout (not "wait"): the incoming panel enters while the
                      old one fades out on top — no exit-then-enter dead time —
                      and the exiting panel is popped from flow so its height
                      never collapses the column mid-swap. */}
                  <AnimatePresence mode="popLayout">
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
                onDockState={setDockState}
              />
            ) : null}
          </AnimatePresence>

          {/* One floating dock, hoisted out of CaseStudy so it persists across the
              home ↔ case boundary and morphs (shares `m-dock-shell` with the home
              dock). Driven by `study` directly — it swaps in the same commit the
              home dock unmounts, so the shared-element handoff is clean both ways.
              Static section list comes from the slug; the live active section /
              accent / jump handler arrive via `dockState`. */}
          {study && caseSections && caseSections.length >= 2 ? (
            <CaseDock
              sections={caseSections}
              activeId={dockState?.activeId ?? caseSections[0]?.id}
              accent={dockState?.accent ?? "overview"}
              onSelect={dockState?.onSelect ?? (() => {})}
              onBack={closeStudy}
              theme={theme}
              onToggleTheme={toggleTheme}
              morph={isMobileDock}
            />
          ) : null}
        </div>
      </div>
    </LayoutGroup>
  );
}
