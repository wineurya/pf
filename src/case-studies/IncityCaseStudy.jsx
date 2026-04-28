/**
 * InCity — full-width hero + narrative block (kept out of the public work grid; route only).
 * @param {{ kicker: string; title: string; lede: string; heroImage?: string }} props.def
 */
export function IncityCaseStudy({ def }) {
  return (
    <article className="flex flex-col gap-10">
      <header className="max-w-2xl">
        <p className="wx-text-sm font-medium tracking-wide text-[color-mix(in_srgb,var(--wx-ink)_55%,var(--wx-page-bg))] uppercase">
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
            width={2000}
            height={1200}
            sizes="(min-width: 1200px) 1152px, 100vw"
            decoding="async"
          />
        </div>
      ) : null}
    </article>
  );
}
