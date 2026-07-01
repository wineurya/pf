import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { EASE_OUT, fillMorph } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../lib/hooks.js";
import { renderRich } from "../lib/richText.jsx";
/* Quirk glyphs pulled straight from Phosphor and kept local to this component. */
import { HandTap } from "@phosphor-icons/react/dist/csr/HandTap";
import { PersonSimpleWalk } from "@phosphor-icons/react/dist/csr/PersonSimpleWalk";
import { Question } from "@phosphor-icons/react/dist/csr/Question";
import { Signpost } from "@phosphor-icons/react/dist/csr/Signpost";
import { Tray } from "@phosphor-icons/react/dist/csr/Tray";
import { Warning } from "@phosphor-icons/react/dist/csr/Warning";

import { Flag } from "@phosphor-icons/react/dist/csr/Flag";
import { VideoCamera } from "@phosphor-icons/react/dist/csr/VideoCamera";

/* One glyph per persona pain point. Slugs come from each quirk in content. */
const QUIRK_ICONS = {
  misrouted: Signpost,
  noPriority: Warning,
  inboxJam: Tray,
  tinyControls: HandTap,
  onTheGo: PersonSimpleWalk,
  noFeedback: Question,
  reportCallouts: Flag,
  videoCall: VideoCamera,
};

/** Vite asset imports resolve to a URL string; guard odd module shapes anyway. */
function assetUrl(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value?.default === "string") return value.default;
  if (typeof value?.src === "string") return value.src;
  return "";
}

/* InCity Personas — a two-tab toggle (Alex ⟷ Blake) over a photo, bio, and the
   three pain points that shaped each persona. The toggle reuses the app's shared
   fill-morph language (one layoutId pill glides between tabs); the panel
   cross-fades on swap. Accent follows the active persona (Alex = primary blue). */
export function PersonaSwitch({ personas }) {
  const [index, setIndex] = useState(0);
  /* Tab/panel accent tracks the visible panel; updates on exit complete so colors
     swap at the midpoint (panel hidden) instead of bleeding onto outgoing content. */
  const [accentIndex, setAccentIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const refs = useRef({});
  const persona = personas[index];

  function select(next) {
    if (next === index) return;
    setIndex(next);
    if (reducedMotion) setAccentIndex(next);
    refs.current[personas[next].id]?.focus();
  }

  function onKeyDown(e) {
    let next;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % personas.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + personas.length) % personas.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = personas.length - 1;
    else return;
    e.preventDefault();
    select(next);
  }

  const swap = reducedMotion
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
        transition: { duration: 0.28, ease: EASE_OUT },
      };

  const solo = personas.length === 1;

  function PersonaPhoto({ persona: p }) {
    const webp = assetUrl(p.image);
    const fallback = assetUrl(p.imageFallback) || webp;
    if (!fallback) {
      return (
        <div className="persona__photo persona__photo--empty" aria-hidden="true">
          <span>{p.name[0]}</span>
        </div>
      );
    }
    return (
      <picture className="persona__picture">
        {webp && webp !== fallback ? (
          <source srcSet={webp} type="image/webp" />
        ) : null}
        <img
          className="persona__photo"
          src={fallback}
          alt={p.alt ?? p.name}
          width={800}
          height={800}
          loading="eager"
          decoding="async"
        />
      </picture>
    );
  }

  function PersonaPanel({ persona: p }) {
    return (
      <>
        <figure className="persona__media">
          <PersonaPhoto persona={p} />
        </figure>

        <div className="persona__body">
          <header className="persona__head">
            <h3 className="persona__name">{p.name}</h3>
            <p className="persona__tagline">{p.tagline}</p>
          </header>
          <p className="persona__bio">{renderRich(p.bio)}</p>
          <ul className="persona__quirks">
            {p.quirks.map((q, i) => {
              const Icon = QUIRK_ICONS[q.icon];
              return (
                <li key={i} className="persona__quirk">
                  <span className="persona__quirk-icon" aria-hidden="true">
                    {Icon ? <Icon size={20} /> : null}
                  </span>
                  <span className="persona__quirk-text">
                    <span className="persona__quirk-title">{q.title}</span>
                    <span className="persona__quirk-sub">{renderRich(q.text)}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }

  return (
    <div className={`persona${solo ? " persona--solo" : ""}`}>
      {!solo ? (
        <LayoutGroup id="persona-toggle">
          <div
            className="persona__toggle"
            role="tablist"
            aria-label="Personas"
            onKeyDown={onKeyDown}
          >
            {personas.map((p, i) => {
              const selected = i === index;
              const accented = i === accentIndex;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    refs.current[p.id] = el;
                  }}
                  type="button"
                  className="persona__tab"
                  role="tab"
                  id={`persona-tab-${p.id}`}
                  data-persona={p.id}
                  data-accent={accented || undefined}
                  aria-selected={selected}
                  aria-controls="persona-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                >
                  {accented ? (
                    <motion.span
                      className="persona__tab-fill"
                      layoutId="persona-tab-fill"
                      aria-hidden="true"
                      transition={fillMorph(reducedMotion)}
                    />
                  ) : null}
                  <span className="persona__tab-label">{p.name}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      ) : null}

      {solo ? (
        <div className="persona__panel" data-persona={persona.id}>
          <PersonaPanel persona={persona} />
        </div>
      ) : (
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => setAccentIndex(index)}
        >
          <motion.div
            key={persona.id}
            className="persona__panel"
            data-persona={persona.id}
            role="tabpanel"
            id="persona-panel"
            aria-labelledby={`persona-tab-${persona.id}`}
            initial={swap.initial}
            animate={swap.animate}
            exit={swap.exit}
            transition={swap.transition}
          >
            <PersonaPanel persona={persona} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
