import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";

/** Figma 159:93 spirit — short headline, one lede, one dominant still. */
export function CaseHeroTemplate({ data }) {
  return (
    <article className="wc wc-hero mx-auto max-w-5xl px-[var(--wx-pad-x,1.25rem)] py-8 sm:py-10 lg:py-12">
      <ViewTransitionLink to="/" className="wc-back">
        ← {data.backLabel}
      </ViewTransitionLink>
      <p className="wc-kicker">{data.kicker}</p>
      <h1 className="wc-title">{data.title}</h1>
      <p className="wc-lede">{data.lede}</p>
      {data.heroImage ? (
        <figure className="wc-hero__figure">
          <img
            src={data.heroImage}
            alt=""
            className="wc-hero__visual"
            loading="eager"
            decoding="async"
          />
        </figure>
      ) : null}
    </article>
  );
}
