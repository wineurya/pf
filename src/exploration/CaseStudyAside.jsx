import { clsx } from "clsx";
import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";
import { WordmarkLink } from "@/exploration/WordmarkLink.jsx";
import { CaseStudyTableOfContents } from "@/exploration/CaseStudyTableOfContents.jsx";

function MetaBlock({ label, value }) {
  if (!value) return null;
  return (
    <div className="space-y-1.5">
      <p className="wx-text-sm font-semibold tracking-tight text-[var(--wx-ink)]">{label}</p>
      <p className="wx-text-meta text-[var(--wx-muted)]">{value}</p>
    </div>
  );
}

function CaseStudyTagPills({ tags }) {
  if (!tags?.length) return null;
  return (
    <ul className="m-0 flex flex-wrap gap-x-2 gap-y-2 p-0 list-none">
      {tags.map((tag) => (
        <li key={tag}>
          <span
            className={clsx(
              "wx-text-meta inline-flex items-center justify-center rounded-full",
              "border border-[color:var(--wx-border-soft)]",
              "bg-[color-mix(in_srgb,var(--wx-surface)_88%,var(--wx-page-bg))]",
              "px-3 py-1 text-[var(--wx-ink)]",
            )}
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CaseStudyTitleBlock({ year, title, lede }) {
  return (
    <div className="space-y-3">
      <div className="leading-none">
        {year ? (
          <p className="wx-text-section-title font-semibold leading-none tracking-tight text-[color-mix(in_srgb,var(--wx-muted)_38%,var(--wx-page-bg))]">
            {year}
          </p>
        ) : null}
        <h1 className="wx-text-section-title mt-1 font-semibold leading-tight tracking-tight text-[var(--wx-ink)]">
          {title}
        </h1>
      </div>
      {lede ? (
        <p className="wx-text-body-secondary text-[var(--wx-muted)]">{lede}</p>
      ) : null}
    </div>
  );
}

function CaseStudyAsideTopRow({ location, navigate }) {
  return (
    <div className="site-vt--nav flex w-full items-center justify-between gap-3">
      <WordmarkLink location={location} navigate={navigate} />
      <ViewTransitionLink
        to="/#section-work"
        className={clsx(
          "wx-text-meta font-medium text-[var(--wx-muted)] outline-none transition-colors",
          "hover:text-[var(--wx-primary)]",
          "focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]",
        )}
      >
        Back
      </ViewTransitionLink>
    </div>
  );
}

function CaseStudyAsideMeta({ industry, about, role, team, duration, kind }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-1">
      <MetaBlock label="Industry" value={industry} />
      <MetaBlock label="About" value={about} />
      <MetaBlock label="Role" value={role} />
      <MetaBlock label="Team" value={team} />
      <MetaBlock label="Project type" value={kind} />
      <MetaBlock label="Duration" value={duration} />
    </div>
  );
}

function asideTags(editorialMeta, gridEntry) {
  const toolLabels = editorialMeta?.toolLabels?.filter(Boolean) ?? [];
  const nuggetLabels = gridEntry?.nuggets?.map((n) => n.label).filter(Boolean) ?? [];
  return [...new Set([...toolLabels, ...nuggetLabels])];
}

/**
 * Editorial source-of-truth for a case study route — title, year, lede, meta,
 * tags, plus an optional Chapters rail driven by `useCaseStudyScrollSpy`.
 *
 * Layout follows Figma `Testing/10:5` left frame: top nav row, a year-over-title
 * block with lede, stacked meta blocks, tag pills, and finally chapter nav.
 */
export function CaseStudyAside({
  def,
  gridEntry,
  chapters = [],
  activeIndex = 0,
  reduceMotion,
  location,
  navigate,
}) {
  const editorialMeta = def.editorialMeta ?? null;
  const tags = asideTags(editorialMeta, gridEntry);
  const year = gridEntry?.year?.trim();
  const role = gridEntry?.role?.trim();
  const kind = gridEntry?.kind?.trim();
  const industry = editorialMeta?.industry?.trim();
  const about = editorialMeta?.about?.trim() || gridEntry?.summary?.trim();
  const team = editorialMeta?.team?.trim();
  const duration = editorialMeta?.duration?.trim();
  const hasChapters = chapters.length > 0;

  return (
    <aside
      className={clsx(
        "relative z-20 flex w-full min-w-0 shrink-0 flex-col",
        "border-b border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)]",
        "lg:grow-0 lg:shrink-0 lg:sticky lg:top-0",
        "lg:max-h-svh lg:min-h-svh lg:overflow-y-auto lg:overscroll-contain",
        "lg:border-b-0 lg:border-r",
        "lg:w-[min(31rem,38vw)] lg:max-w-[31rem]",
      )}
      aria-label={`${def.title} — case study overview`}
      data-site-region="case-aside"
    >
      <div className="flex min-h-0 w-full flex-1 flex-col gap-10 px-[var(--wx-pad-x)] py-8 sm:gap-12 sm:py-10 lg:gap-0 lg:justify-between lg:px-6 lg:py-12">
        <div className="wx-mobile-nav-spacer max-sm:block sm:hidden" aria-hidden />
        <CaseStudyAsideTopRow location={location} navigate={navigate} />

        <div className="site-vt--aside flex flex-col gap-10 sm:gap-12 lg:gap-10">
          <CaseStudyTitleBlock year={year} title={def.title} lede={def.lede} />

          <CaseStudyAsideMeta
            industry={industry}
            about={about}
            role={role}
            team={team}
            duration={duration}
            kind={kind}
          />

          <CaseStudyTagPills tags={tags} />
        </div>

        {hasChapters ? (
          <div className="border-t border-[color:var(--wx-border-soft)] pt-6 sm:pt-7 lg:pt-8">
            <CaseStudyTableOfContents
              chapters={chapters}
              activeIndex={activeIndex}
              reduceMotion={reduceMotion}
              railMode
            />
          </div>
        ) : null}
      </div>
    </aside>
  );
}
