/**
 * Resolutions — editorial vertical strips (habit / rhythm narrative).
 * @param {{ kicker: string; title: string; lede: string; strips?: { caption: string; image: string }[] }} props.def
 */
export function ResolutionsCaseStudy({ def }) {
  const strips = def.strips ?? [];
  return (
    <article className="flex flex-col gap-10">
      <header className="max-w-2xl">
        <p className="wx-text-meta wx-text-kicker text-[var(--wx-muted)]">
          {def.kicker}
        </p>
        <h1 className="wx-text-page-title mt-2 text-[var(--wx-ink)]">{def.title}</h1>
        <p className="wx-text-body-secondary mt-4 text-[var(--wx-muted)]">
          {def.lede}
        </p>
      </header>
      <div className="flex flex-col gap-8">
        {strips.map((strip) => (
          <figure
            key={strip.caption}
            className="wx-transparent-art-well group relative m-0 overflow-hidden rounded-lg border border-[color:var(--wx-border-soft)]"
          >
            <img
              src={strip.image}
              alt=""
              className="aspect-[21/9] w-full object-cover"
              width={2000}
              height={860}
              sizes="(min-width: 1200px) 1152px, 100vw"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="wx-text-sm absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--wx-ink)_70%,transparent)] to-transparent px-4 py-3 font-medium text-white">
              {strip.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}
