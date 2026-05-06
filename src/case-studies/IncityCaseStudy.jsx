import { CaseStudyFillerRect } from "@/case-studies/CaseStudyFillerRect.jsx";

/**
 * InCity — full-width hero + narrative block (kept out of the public work grid; route only).
 * @param {{ kicker: string; title: string; lede: string; heroImage?: string }} props.def
 */
export function IncityCaseStudy({ def }) {
  return (
    <article className="flex flex-col gap-10">
      <header className="max-w-2xl">
        <p className="wx-text-meta wx-text-kicker text-[var(--wx-muted)]">{def.kicker}</p>
        <h1 className="wx-text-page-title mt-2 text-[var(--wx-ink)]">{def.title}</h1>
        <p className="wx-text-body-secondary mt-4 text-[var(--wx-muted)]">{def.lede}</p>
      </header>
      {def.heroImage ? (
        <div className="wx-transparent-art-well overflow-hidden rounded-lg border border-[color:var(--wx-border-soft)] p-4 sm:p-6">
          <CaseStudyFillerRect className="w-full" />
        </div>
      ) : null}
    </article>
  );
}
