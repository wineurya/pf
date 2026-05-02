import { motion } from "motion/react";

const SECTION_REVEAL_T = { duration: 0.55, ease: [0.19, 1, 0.22, 1] };

/**
 * Chapter section block — keyed by `chapter.id` so `useCaseStudyScrollSpy` can
 * read the active range via `getElementById`. Body copy intentionally minimal
 * (lorem) per repo policy; designs that feel come from the rhythm, not the wall.
 */
function CaseChapterSection({ chapter, index }) {
  return (
    <motion.section
      id={chapter.id}
      data-case-chapter-index={index}
      className="wx-case-section relative flex min-h-[80svh] flex-col gap-6 rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] p-6 ring-1 ring-[color:var(--wx-ring-subtle)] sm:gap-7 sm:p-8 lg:gap-8 lg:p-10"
      aria-labelledby={`${chapter.id}-heading`}
      initial={{ opacity: 0.94 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.28, margin: "0px 0px -8% 0px" }}
      transition={SECTION_REVEAL_T}
    >
      {chapter.image ? (
        <figure className="wx-case-section__figure relative overflow-hidden rounded-[calc(var(--wx-radius-card)-2px)] bg-[var(--wx-surface-soft)] ring-1 ring-[color:var(--wx-border-soft)]">
          <img
            src={chapter.image}
            alt={chapter.imageAlt || ""}
            className="block h-auto w-full select-none object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            sizes="(min-width: 1024px) 56vw, 100vw"
          />
        </figure>
      ) : null}

      <div className="space-y-3 lg:space-y-4">
        <p className="wx-text-meta uppercase tracking-[0.18em] text-[var(--wx-muted)]">{chapter.eyebrow}</p>
        <h2
          id={`${chapter.id}-heading`}
          className="text-balance text-xl font-medium tracking-tight text-[var(--wx-ink)] sm:text-2xl"
        >
          {chapter.title}
        </h2>
        {chapter.bodyParts?.map((p, i) => (
          <p key={i} className="wx-text-body-secondary text-[var(--wx-muted)]">
            {p}
          </p>
        ))}
      </div>
    </motion.section>
  );
}

/**
 * Avance case study — long-form chapter stack. Pairs with `CaseStudyAside`
 * for the scroll-driven left rail. Falls back to a single hero block when
 * `def.chapters` is absent (legacy callers).
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
    <div className="flex w-full min-w-0 flex-col gap-[var(--wx-gallery-gap)]" data-case-stack="chapters">
      {chapters.map((chapter, i) => (
        <CaseChapterSection key={chapter.id} chapter={chapter} index={i} />
      ))}
    </div>
  );
}
