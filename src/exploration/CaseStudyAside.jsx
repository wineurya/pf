import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { clsx } from "clsx";
import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";
import { CaseStudyToolBrandIcon } from "@/exploration/CaseStudyToolBrandIcon.jsx";
import { WordmarkLink } from "@/exploration/WordmarkLink.jsx";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

function MetaBlock({ label, value }) {
  if (!value) return null;
  return (
    <div className="wx-case-aside-meta__item">
      <p className="wx-aside-footer__label">{label}</p>
      <p className="wx-text-sm font-medium tracking-normal text-[var(--wx-ink)]">{value}</p>
    </div>
  );
}

function CaseStudyFocusHighlightRail({ highlights, reduceMotion }) {
  const durationSec = Math.min(56, Math.max(26, highlights.length * 11));

  if (reduceMotion) {
    return (
      <ul className="wx-case-tags__group wx-case-tags__group--focus" aria-labelledby="case-tags-focus">
        {highlights.map((tag) => (
          <li key={`hi-${tag}`}>
            <span className="wx-case-tags__pill wx-case-tags__pill--highlight">{tag}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="wx-case-tags__focus-sr-list sr-only" aria-labelledby="case-tags-focus">
        {highlights.map((tag) => (
          <li key={`focus-sr-${tag}`}>{tag}</li>
        ))}
      </ul>
      <div className="wx-case-tags__focus-marquee" aria-hidden>
        <ul
          className="wx-case-tags__focus-marquee-strip"
          style={{ "--wx-case-focus-marquee-s": `${durationSec}s` }}
        >
          {highlights.map((tag, i) => (
            <li key={`marq-a-${i}-${tag}`}>
              <span className="wx-case-tags__pill wx-case-tags__pill--highlight">{tag}</span>
            </li>
          ))}
          {highlights.map((tag, i) => (
            <li key={`marq-b-${i}-${tag}`} aria-hidden>
              <span className="wx-case-tags__pill wx-case-tags__pill--highlight">{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function CaseStudyTagPills({ toolLabels, highlightLabels, reduceMotion }) {
  const tools = toolLabels ?? [];
  const highlights = highlightLabels ?? [];
  if (!tools.length && !highlights.length) return null;

  return (
    <div className="wx-case-tags">
      {tools.length > 0 ? (
        <div className="wx-case-tags__block">
          <p id="case-tags-tools" className="wx-case-tags__label">
            Tools
          </p>
          <ul className="wx-case-tags__group wx-case-tags__group--tools" aria-labelledby="case-tags-tools">
            {tools.map((tag) => (
              <li key={`tool-${tag}`}>
                <span className="wx-case-tags__tool-mark" title={tag} aria-label={tag}>
                  <CaseStudyToolBrandIcon label={tag} className="wx-case-tags__tool-mark__icon" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {highlights.length > 0 ? (
        <div className="wx-case-tags__block">
          <p id="case-tags-focus" className="wx-case-tags__label">
            Focus
          </p>
          <CaseStudyFocusHighlightRail highlights={highlights} reduceMotion={reduceMotion} />
        </div>
      ) : null}
    </div>
  );
}

function CaseStudyTitleBlock({ title, lede }) {
  return (
    <div className="wx-case-aside-title">
      <div className="wx-case-aside-title__stack">
        <h1 className="wx-case-aside-title__heading">{title}</h1>
      </div>
      {lede ? <p className="wx-case-aside-title__lede">{lede}</p> : null}
    </div>
  );
}

function CaseStudyGistBlock({ title, paragraphs }) {
  if (!paragraphs?.length) return null;
  return (
    <section className="wx-case-aside-block wx-case-aside-block--gist">
      <h2 className="wx-case-aside-block__heading">What&rsquo;s the gist of {title}?</h2>
      <div className="wx-case-aside-block__body">
        {paragraphs.map((p, i) => (
          <p key={i} className="wx-case-aside-block__para">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function CaseStudyOutcomeBlock({ paragraphs }) {
  if (!paragraphs?.length) return null;
  return (
    <section className="wx-case-aside-block wx-case-aside-block--outcome">
      <h2 className="wx-case-aside-block__heading">What was the outcome?</h2>
      <div className="wx-case-aside-block__body">
        {paragraphs.map((p, i) => (
          <p key={i} className="wx-case-aside-block__para">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

/** If most significant words from the lede appear in `about`, the second paragraph reads as a repeat. */
function asideAboutRepeatsLede(lede, about) {
  if (!about?.trim() || !lede?.trim()) return false;
  const hay = about.toLowerCase();
  const tokens = lede.toLowerCase().match(/[a-z]{4,}/g) ?? [];
  if (tokens.length < 6) return false;
  let hit = 0;
  for (const t of tokens) {
    if (hay.includes(t)) hit++;
  }
  return hit / tokens.length >= 0.52;
}

function CaseStudyAsideTopRow({ location, navigate }) {
  return (
    <div
      className="wx-mobile-sticky-nav flex w-full min-w-0 shrink-0 flex-row flex-nowrap items-center justify-between gap-3 min-h-14 sm:gap-4"
      data-site-region="case-header-nav"
    >
      <div className="site-vt--nav flex w-full min-w-0 flex-nowrap items-center justify-between gap-3 min-h-14 sm:gap-4">
        <WordmarkLink location={location} navigate={navigate} />
        <div className="wx-tab-track wx-tab-track--single min-w-0 shrink-0">
          <div className="wx-tab-track__scroll relative min-w-0">
            <ViewTransitionLink
              to={{ pathname: "/", hash: "section-work" }}
              className="wx-tab wx-tab--back"
              style={{ "--wx-tab-accent": "var(--wx-primary)" }}
              aria-label="Back to Work section"
            >
              <span
                aria-hidden
                className="wx-tab__fill pointer-events-none absolute inset-0 -z-20"
                style={{
                  backgroundColor: "var(--wx-tab-idle)",
                  boxShadow: "var(--wx-tab-shadow-idle)",
                }}
              />
              <span
                aria-hidden
                className="wx-tab__fill pointer-events-none absolute inset-0 -z-10 opacity-100"
                style={{
                  backgroundColor: "var(--wx-primary)",
                  boxShadow: "var(--wx-tab-shadow-active)",
                }}
              />
              <span className="relative z-10 flex min-w-0 items-center justify-center gap-1">
                <HugeiconsIcon
                  icon={ArrowLeft02Icon}
                  size={17}
                  color="currentColor"
                  strokeWidth={1.6}
                  className="shrink-0"
                  aria-hidden
                />
                <span className="wx-tab-label-text overflow-visible whitespace-nowrap pr-px tracking-tight">Back</span>
              </span>
            </ViewTransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Editorial meta is intentionally capped at 4 (Role / Team / Industry / Duration).
 * "Project type" was dropped — it duplicates Industry in practice and bloats the column.
 */
function CaseStudyAsideMeta({ industry, role, team, duration }) {
  const items = [
    { label: "Role", value: role },
    { label: "Team", value: team },
    { label: "Industry", value: industry },
    { label: "Duration", value: duration },
  ].filter((item) => item.value);
  if (!items.length) return null;
  return (
    <dl className="wx-case-aside-meta grid grid-cols-2">
      {items.map((item) => (
        <MetaBlock key={item.label} label={item.label} value={item.value} />
      ))}
    </dl>
  );
}

/** Dedupe preserves first-seen order within each rail */
export function getCaseStudyTagRails(editorialMeta, gridEntry) {
  const toolLabels = editorialMeta?.toolLabels?.filter(Boolean) ?? [];
  const fromMeta = editorialMeta?.highlightLabels?.filter(Boolean) ?? [];
  const fromGrid = gridEntry?.nuggets?.map((n) => n.label).filter(Boolean) ?? [];
  const highlightLabels = fromMeta.length ? fromMeta : fromGrid;
  const uniq = (labels) => [...new Set(labels)];
  return { toolLabels: uniq(toolLabels), highlightLabels: uniq(highlightLabels) };
}

function asideAboutParagraphs(editorialMeta, gridEntry) {
  const fromMeta = editorialMeta?.aboutParagraphs?.filter(Boolean) ?? [];
  if (fromMeta.length) return fromMeta;
  const single = editorialMeta?.about?.trim() || gridEntry?.summary?.trim();
  return single ? [single] : [];
}

function asideOutcomeParagraphs(editorialMeta) {
  const fromMeta = editorialMeta?.outcomeParagraphs?.filter(Boolean) ?? [];
  if (fromMeta.length) return fromMeta;
  const single = editorialMeta?.outcome?.trim();
  return single ? [single] : [];
}

/**
 * Editorial source-of-truth for a case study route — title, lede, meta, tags.
 * Column shell matches `ExplorationPageAside` (same lg aside basis, padding, sticky height, header wrapper).
 */
export function CaseStudyAside({ def, gridEntry, location, navigate, tagRails }) {
  const reduceMotion = useReducedMotion();
  const editorialMeta = def.editorialMeta ?? null;
  const { toolLabels, highlightLabels } = tagRails ?? getCaseStudyTagRails(editorialMeta, gridEntry);
  const role = gridEntry?.role?.trim();
  const industry = editorialMeta?.industry?.trim();
  const aboutParagraphs = asideAboutParagraphs(editorialMeta, gridEntry);
  const team = editorialMeta?.team?.trim();
  const duration = editorialMeta?.duration?.trim();
  const outcomeParagraphs = asideOutcomeParagraphs(editorialMeta);

  const showAboutSection =
    aboutParagraphs.length > 0 &&
    !asideAboutRepeatsLede(def.lede, aboutParagraphs.length === 1 ? aboutParagraphs[0] : aboutParagraphs.join(" "));
  const showOutcomeSection = outcomeParagraphs.length > 0;
  const hasMeta = Boolean(role || industry || team || duration);
  const hasTagRails = toolLabels.length > 0 || highlightLabels.length > 0;
  const hasFooterCluster = hasMeta || hasTagRails;

  return (
    <aside
      className={clsx(
        "relative z-20 flex w-full min-w-0 shrink-0 flex-col [scrollbar-gutter:stable]",
        "border-b border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)]",
        "lg:grow-0 lg:shrink-0 lg:flex-none lg:sticky lg:top-0",
        "lg:h-svh lg:max-h-svh lg:overflow-y-auto lg:overscroll-contain",
        "lg:border-b-0",
        /* Match home aside width + scrollbar gutter — keeps the cross-fade on
           route change pixel-aligned instead of shifting by the gutter width. */
        "lg:w-[var(--wx-explore-aside-basis)]",
      )}
      aria-label={`${def.title} — case study overview`}
      data-site-region="case-aside"
    >
      <div className="wx-aside-shell flex min-h-0 w-full flex-1 flex-col px-[var(--wx-pad-x)] lg:min-h-0">
        <div className="wx-mobile-nav-spacer max-sm:block sm:hidden" aria-hidden />
        <CaseStudyAsideTopRow location={location} navigate={navigate} />

        {/*
         * Fills the padded column (`flex-1 min-h-0 h-full`) so `justify-between` opens space between
         * the editorial stack and the meta/tag footer; copy stays start-aligned via `items-start`.
         */}
        <div className="site-vt--aside flex h-full min-h-0 w-full min-w-0 flex-1 flex-col items-start justify-between">
          <div className="wx-case-aside-stack flex w-full min-w-0 shrink-0 flex-col items-start justify-start lg:min-h-0">
            <div className="wx-case-aside-stack__inner w-full">
              <CaseStudyTitleBlock title={def.title} lede={def.lede} />
              {showAboutSection ? (
                <CaseStudyGistBlock title={def.title} paragraphs={aboutParagraphs} />
              ) : null}
              {showOutcomeSection ? (
                <CaseStudyOutcomeBlock paragraphs={outcomeParagraphs} />
              ) : null}
            </div>
          </div>

          {hasFooterCluster ? (
            <div
              className="wx-case-aside-footer w-full min-w-0 shrink-0"
              data-site-region="case-aside-footer"
            >
              {hasMeta ? (
                <CaseStudyAsideMeta
                  industry={industry}
                  role={role}
                  team={team}
                  duration={duration}
                />
              ) : null}

              {hasTagRails ? (
                <CaseStudyTagPills
                  toolLabels={toolLabels}
                  highlightLabels={highlightLabels}
                  reduceMotion={reduceMotion}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
