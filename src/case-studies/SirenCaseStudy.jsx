import { CaseStudyFillerRect } from "@/case-studies/CaseStudyFillerRect.jsx";

/**
 * Siren — stepped case layout (safety / trust narrative).
 * @param {{ kicker: string; title: string; lede: string; steps?: { title: string; blurb: string; image: string }[] }} props.def
 */
export function SirenCaseStudy({ def }) {
  const steps = def.steps ?? [];
  return (
    <article className="flex flex-col gap-12">
      <header className="max-w-2xl">
        <p className="wx-text-meta wx-text-kicker text-[var(--wx-muted)]">
          {def.kicker}
        </p>
        <h1 className="wx-text-page-title mt-2 text-[var(--wx-ink)]">{def.title}</h1>
        <p className="wx-text-body-secondary mt-4 text-[var(--wx-muted)]">
          {def.lede}
        </p>
      </header>
      <ol className="flex list-none flex-col gap-12 p-0">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="grid gap-6 border-t border-[color:var(--wx-border-soft)] pt-10 sm:grid-cols-2 sm:items-start sm:gap-10"
          >
            <div className="sm:pt-1">
              <p className="wx-text-overline font-mono text-[color-mix(in_srgb,var(--wx-ink)_45%,var(--wx-page-bg))]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="wx-text-subsection-title mt-1 text-[var(--wx-ink)]">{step.title}</h2>
              <p className="mt-2 wx-text-sm text-[color-mix(in_srgb,var(--wx-ink)_80%,var(--wx-page-bg))]">
                {step.blurb}
              </p>
            </div>
            <div className="wx-transparent-art-well overflow-hidden rounded-lg border border-[color:var(--wx-border-soft)] p-3 sm:p-4">
              <CaseStudyFillerRect className="w-full" />
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
