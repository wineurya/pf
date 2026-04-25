import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";

/** Figma 159:1099 spirit — mobile-narrow column, long image rhythm, micro captions. */
export function CaseEditorialTemplate({ data }) {
  return (
    <article className="wc mx-auto max-w-sm px-5 py-8 sm:max-w-md sm:px-6 sm:py-10 md:px-8 lg:py-12">
      <ViewTransitionLink to="/" className="wc-back">
        ← {data.backLabel}
      </ViewTransitionLink>
      <p className="wc-kicker">{data.kicker}</p>
      <h1 className="wc-title">{data.title}</h1>
      <p className="wc-lede">{data.lede}</p>

      <div className="mt-4">
        {(data.strips ?? []).map((row) => (
          <figure key={row.caption} className="wc-strip">
            <figcaption>{row.caption}</figcaption>
            <div className="wc-strip-figure">
              <img src={row.image} alt="" loading="lazy" decoding="async" />
            </div>
          </figure>
        ))}
      </div>
    </article>
  );
}
