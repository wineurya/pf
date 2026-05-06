import { motion } from "motion/react";
import { CaseStudyFillerRect } from "@/case-studies/CaseStudyFillerRect.jsx";

const SECTION_REVEAL_T = { duration: 0.55, ease: [0.19, 1, 0.22, 1] };

/**
 * Chapter stack — copy + 5:4 placeholder in the main column (navigation + overview live in
 * `CaseStudyAside` + `CaseStudyEditorialHeader`). Section ids power `useCaseStudyScrollSpy`.
 */
function CaseChapterSection({ chapter, index }) {
  const label = `${chapter.eyebrow}: ${chapter.title}`;
  const bodyParts = chapter.bodyParts ?? [];

  return (
    <motion.section
      id={chapter.id}
      data-case-chapter-index={index}
      aria-label={label}
      className="wx-case-section relative flex scroll-mt-24 flex-col gap-10 py-12 sm:gap-12 sm:py-16 lg:scroll-mt-28 lg:py-24"
      initial={{ opacity: 0.94 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -8% 0px" }}
      transition={SECTION_REVEAL_T}
    >
      <div className="w-full max-w-[min(52rem,100%)] space-y-5 px-5 sm:px-8 lg:px-10">
        {chapter.eyebrow ? (
          <p className="wx-text-meta wx-text-kicker text-[var(--wx-muted)]">{chapter.eyebrow}</p>
        ) : null}
        <h2 className="wx-text-subsection-title text-balance text-[var(--wx-ink)]">{chapter.title}</h2>
        {chapter.lede ? (
          <p className="wx-text-body-secondary max-w-2xl text-[var(--wx-muted)]">{chapter.lede}</p>
        ) : null}
        {bodyParts.map((para, pi) => (
          <p
            key={`${chapter.id}-p-${pi}`}
            className="wx-text-body-secondary max-w-2xl text-[color-mix(in_srgb,var(--wx-muted)_92%,var(--wx-page-bg))]"
          >
            {para}
          </p>
        ))}
      </div>
      <figure className="wx-case-section__figure relative w-full max-w-[min(52rem,94vw)] px-5 sm:px-8 lg:px-10">
        <div className="wx-transparent-art-well overflow-hidden rounded-[var(--wx-radius-card)] p-5 sm:p-8 lg:p-10">
          <CaseStudyFillerRect className="w-full" />
        </div>
      </figure>
    </motion.section>
  );
}

/**
 * Avance case study — long-form chapter stack. Pairs with `CaseStudyAside`
 * for the scroll-driven left rail.
 *
 * @param {{ def: { kicker: string; title: string; lede: string; heroImage?: string; chapters?: any[] } }} props
 */
export function AvanceCaseStudy({ def }) {
  const chapters = def.chapters ?? [];

  if (chapters.length === 0) {
    return (
      <article className="flex flex-col gap-10">
        {def.heroImage ? (
          <div className="wx-transparent-art-well overflow-hidden rounded-lg border border-[color:var(--wx-border-soft)] p-4 sm:p-6">
            <CaseStudyFillerRect className="w-full" />
          </div>
        ) : null}
      </article>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-16 sm:gap-20 lg:gap-28" data-case-stack="chapters">
      {chapters.map((chapter, i) => (
        <CaseChapterSection key={chapter.id} chapter={chapter} index={i} />
      ))}
    </div>
  );
}
