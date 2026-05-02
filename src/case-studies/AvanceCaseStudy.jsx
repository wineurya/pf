import { motion } from "motion/react";

const SECTION_REVEAL_T = { duration: 0.55, ease: [0.19, 1, 0.22, 1] };

/**
 * Image-only chapter frame — copy lives in `CaseStudyAside` / scroll ticker.
 * Section id must match `work-cases` chapter ids for `useCaseStudyScrollSpy`.
 */
function CaseChapterSection({ chapter, index }) {
  const label = `${chapter.eyebrow}: ${chapter.title}`;

  return (
    <motion.section
      id={chapter.id}
      data-case-chapter-index={index}
      aria-label={label}
      className="wx-case-section relative flex min-h-[min(72svh,46rem)] flex-col items-center justify-center py-12 sm:py-16 lg:py-24"
      initial={{ opacity: 0.94 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.28, margin: "0px 0px -8% 0px" }}
      transition={SECTION_REVEAL_T}
    >
      {chapter.image ? (
        <figure className="wx-case-section__figure relative w-full max-w-[min(52rem,94vw)] px-5 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-[var(--wx-radius-card)] p-5 sm:p-8 lg:p-10">
            <img
              src={chapter.image}
              alt={chapter.imageAlt || ""}
              className="block h-auto w-full max-h-[min(78svh,52rem)] select-none object-contain"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              sizes="(min-width: 1024px) 52rem, 94vw"
            />
          </div>
        </figure>
      ) : null}
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
        <header className="max-w-2xl">
          <p className="wx-text-sm font-medium uppercase tracking-wide text-[color-mix(in_srgb,var(--wx-ink)_55%,var(--wx-page-bg))]">
            {def.kicker}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{def.title}</h1>
          <p className="mt-4 wx-text-body-secondary text-[color-mix(in_srgb,var(--wx-ink)_78%,var(--wx-page-bg))]">
            {def.lede}
          </p>
        </header>
        {def.heroImage ? (
          <div className="overflow-hidden rounded-lg border border-[color:var(--wx-border-soft)]">
            <img
              src={def.heroImage}
              alt=""
              className="h-auto w-full object-cover"
              width={2400}
              height={2400}
              sizes="(min-width: 1200px) 1152px, 100vw"
              decoding="async"
            />
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
