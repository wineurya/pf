import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { clsx } from "clsx";
import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";
import { WordmarkLink } from "@/exploration/WordmarkLink.jsx";

function MetaBlock({ label, value }) {
  if (!value) return null;
  return (
    <div className="min-w-0 space-y-1.5">
      <p className="wx-aside-footer__label">{label}</p>
      <p className="wx-text-sm font-medium tracking-tight text-[var(--wx-ink)]">{value}</p>
    </div>
  );
}

function CaseStudyTagPills({ toolLabels, highlightLabels }) {
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
          <ul className="wx-case-tags__group" aria-labelledby="case-tags-tools">
            {tools.map((tag) => (
              <li key={`tool-${tag}`}>
                <span className="wx-case-tags__pill wx-case-tags__pill--tool">{tag}</span>
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
          <ul className="wx-case-tags__group" aria-labelledby="case-tags-focus">
            {highlights.map((tag) => (
              <li key={`hi-${tag}`}>
                <span className="wx-case-tags__pill wx-case-tags__pill--highlight">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function CaseStudyTitleBlock({ year, title, lede }) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        {year ? <p className="wx-aside-footer__label">{year}</p> : null}
        <h1 className="wx-text-section-title font-semibold leading-tight tracking-tight text-[var(--wx-ink)]">
          {title}
        </h1>
      </div>
      {lede ? (
        <p className="wx-text-body-secondary w-full text-[var(--wx-muted)]">{lede}</p>
      ) : null}
    </div>
  );
}

function CaseStudyAboutBlock({ about }) {
  if (!about) return null;
  return (
    <div className="space-y-2">
      <p className="wx-aside-footer__label">About</p>
      <p className="wx-text-body-secondary w-full text-[var(--wx-muted)]">{about}</p>
    </div>
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
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
      {items.map((item) => (
        <MetaBlock key={item.label} label={item.label} value={item.value} />
      ))}
    </dl>
  );
}

/** Dedupe preserves first-seen order within each rail */
function asideTagRails(editorialMeta, gridEntry) {
  const toolLabels = editorialMeta?.toolLabels?.filter(Boolean) ?? [];
  const highlightLabels = gridEntry?.nuggets?.map((n) => n.label).filter(Boolean) ?? [];
  const uniq = (labels) => [...new Set(labels)];
  return { toolLabels: uniq(toolLabels), highlightLabels: uniq(highlightLabels) };
}

/**
 * Editorial source-of-truth for a case study route — title, year, lede, meta, tags.
 * Column shell matches `ExplorationPageAside` (same lg aside basis, padding, sticky height, header wrapper).
 */
export function CaseStudyAside({ def, gridEntry, location, navigate }) {
  const editorialMeta = def.editorialMeta ?? null;
  const { toolLabels, highlightLabels } = asideTagRails(editorialMeta, gridEntry);
  const year = gridEntry?.year?.trim();
  const role = gridEntry?.role?.trim();
  const industry = editorialMeta?.industry?.trim();
  const about = editorialMeta?.about?.trim() || gridEntry?.summary?.trim();
  const team = editorialMeta?.team?.trim();
  const duration = editorialMeta?.duration?.trim();

  const showAboutSection = Boolean(about) && !asideAboutRepeatsLede(def.lede, about);
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
        /* Same width token as home exploration — keeps wordmark / chrome aligned across routes */
        "lg:w-[var(--wx-explore-aside-basis)]",
      )}
      aria-label={`${def.title} — case study overview`}
      data-site-region="case-aside"
    >
      <div className="flex min-h-0 w-full flex-1 flex-col px-[var(--wx-pad-x)] pb-10 pt-0 sm:pt-10 lg:min-h-0 lg:pb-12 lg:pt-12">
        <div className="wx-mobile-nav-spacer max-sm:block sm:hidden" aria-hidden />
        <CaseStudyAsideTopRow location={location} navigate={navigate} />

        {/*
         * Fills the padded column (`flex-1 min-h-0`) so `justify-between` opens space between
         * the editorial stack and the meta/tag footer; copy stays start-aligned via `items-start`.
         */}
        <div className="site-vt--aside flex min-h-0 w-full min-w-0 flex-1 flex-col items-start justify-between">
          <div className="mt-9 flex w-full min-w-0 shrink-0 flex-col items-start justify-start lg:mt-12 lg:min-h-0 lg:py-2">
            <div className="space-y-5">
              <CaseStudyTitleBlock year={year} title={def.title} lede={def.lede} />
              {showAboutSection ? <CaseStudyAboutBlock about={about} /> : null}
            </div>
          </div>

          {hasFooterCluster ? (
            <div
              className="w-full min-w-0 shrink-0 space-y-6 pt-8 lg:space-y-7 lg:pt-10"
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
                <CaseStudyTagPills toolLabels={toolLabels} highlightLabels={highlightLabels} />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
