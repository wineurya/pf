import { clsx } from "clsx";
import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";
import { WordmarkLink } from "@/exploration/WordmarkLink.jsx";

function MetaBlock({ label, value }) {
  if (!value) return null;
  return (
    <div className="min-w-0 space-y-1">
      <p className="wx-aside-footer__label">{label}</p>
      <p className="wx-text-sm font-medium tracking-tight text-[var(--wx-ink)]">{value}</p>
    </div>
  );
}

/**
 * Apple Settings-style row separator.
 * Container has no `gap`; padding+border on each section creates the rhythm so first
 * + last sections sit flush with the column.
 */
function AsideSection({ children, className }) {
  return (
    <section
      className={clsx(
        "border-t border-[color:var(--wx-border-soft)] pt-6 first:border-t-0 first:pt-0 lg:pt-7",
        className,
      )}
    >
      {children}
    </section>
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
        <p className="wx-text-body-secondary text-[var(--wx-muted)]">{lede}</p>
      ) : null}
    </div>
  );
}

function CaseStudyAboutBlock({ about }) {
  if (!about) return null;
  return (
    <div className="space-y-2">
      <p className="wx-aside-footer__label">About</p>
      <p className="wx-text-body-secondary text-[var(--wx-muted)]">{about}</p>
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
        <ViewTransitionLink
          to={{ pathname: "/", hash: "section-work" }}
          className={clsx(
            "wx-text-meta shrink-0 font-medium text-[var(--wx-muted)] outline-none transition-colors",
            "hover:text-[var(--wx-primary)]",
            "focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]",
          )}
        >
          Back
        </ViewTransitionLink>
      </div>
    </div>
  );
}

function CaseStudyAsideMeta({ industry, role, team, duration, kind }) {
  const items = [
    { label: "Role", value: role },
    { label: "Team", value: team },
    { label: "Industry", value: industry },
    { label: "Project type", value: kind },
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
  const kind = gridEntry?.kind?.trim();
  const industry = editorialMeta?.industry?.trim();
  const about = editorialMeta?.about?.trim() || gridEntry?.summary?.trim();
  const team = editorialMeta?.team?.trim();
  const duration = editorialMeta?.duration?.trim();

  const showAboutSection = Boolean(about) && !asideAboutRepeatsLede(def.lede, about);

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

        <div className="site-vt--aside mt-9 flex min-h-0 w-full min-w-0 flex-1 flex-col lg:mt-12 lg:py-2">
          <AsideSection>
            <CaseStudyTitleBlock year={year} title={def.title} lede={def.lede} />
          </AsideSection>

          {showAboutSection ? (
            <AsideSection>
              <CaseStudyAboutBlock about={about} />
            </AsideSection>
          ) : null}

          <AsideSection>
            <CaseStudyAsideMeta
              industry={industry}
              role={role}
              team={team}
              duration={duration}
              kind={kind}
            />
          </AsideSection>

          {toolLabels.length || highlightLabels.length ? (
            <AsideSection>
              <CaseStudyTagPills toolLabels={toolLabels} highlightLabels={highlightLabels} />
            </AsideSection>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
