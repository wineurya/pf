import { clsx } from "clsx";

function MetaBlock({ label, value }) {
  if (!value) return null;
  return (
    <div className="min-w-0 space-y-2">
      <p className="wx-text-sm font-semibold tracking-tight text-[var(--wx-ink)]">{label}</p>
      <p className="wx-text-sm leading-relaxed text-[var(--wx-muted)]">{value}</p>
    </div>
  );
}

/**
 * Case study hero + metadata on the main column (editorial / Figma right column pattern).
 *
 * @param {{ def: { kicker?: string; title: string; lede?: string }, gridEntry?: object | null, editorialMeta?: { industry?: string; about?: string; team?: string; duration?: string; toolLabels?: string[] } | null }} props
 */
export function CaseStudyEditorialHeader({ def, gridEntry, editorialMeta }) {
  const year = gridEntry?.year?.trim();
  const role = gridEntry?.role?.trim();
  const kind = gridEntry?.kind?.trim();
  const about = editorialMeta?.about?.trim() || gridEntry?.summary?.trim();
  const industry = editorialMeta?.industry?.trim();
  const team = editorialMeta?.team?.trim();
  const duration = editorialMeta?.duration?.trim();
  const toolLabels = editorialMeta?.toolLabels?.filter(Boolean) ?? [];
  const nuggetLabels = gridEntry?.nuggets?.map((n) => n.label).filter(Boolean) ?? [];
  const tags = [...new Set([...toolLabels, ...nuggetLabels])];

  return (
    <header
      className="w-full max-w-[min(52rem,100%)] space-y-8 border-b border-[color:var(--wx-border-soft)] pb-12 sm:space-y-10 sm:pb-14"
      data-site-region="case-editorial-intro"
    >
      <div className="space-y-3">
        {def.kicker ? (
          <p className="wx-text-meta wx-text-kicker text-[var(--wx-muted)]">{def.kicker}</p>
        ) : null}
        {year ? (
          <p className="wx-text-section-title font-medium leading-none tracking-tight text-[color-mix(in_srgb,var(--wx-muted)_52%,var(--wx-page-bg))]">
            {year}
          </p>
        ) : null}
        <h1 className={clsx("wx-text-page-title text-[var(--wx-ink)]", (year || def.kicker) && "mt-1")}>{def.title}</h1>
        {def.lede ? <p className="wx-text-body-secondary max-w-2xl text-[var(--wx-muted)]">{def.lede}</p> : null}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-9">
        <MetaBlock label="Industry" value={industry} />
        <MetaBlock label="About" value={about} />
        <MetaBlock label="Role" value={role} />
        <MetaBlock label="Team" value={team} />
        <MetaBlock label="Project type" value={kind} />
        <MetaBlock label="Duration" value={duration} />
      </div>

      {tags.length > 0 ? (
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {tags.map((tag) => (
            <li key={tag}>
              <span className="wx-text-meta inline-flex rounded-full border border-[color:var(--wx-border-soft)] bg-[color-mix(in_srgb,var(--wx-surface)_88%,var(--wx-page-bg))] px-3 py-1 text-[var(--wx-ink)]">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
