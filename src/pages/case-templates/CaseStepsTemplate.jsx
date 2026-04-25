import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";

/** Figma 159:849 spirit — hairline steps, more image than copy per band. */
export function CaseStepsTemplate({ data }) {
  return (
    <article className="wc mx-auto max-w-3xl px-[var(--wx-pad-x,1.25rem)] py-8 sm:py-10 lg:py-12">
      <ViewTransitionLink to="/" className="wc-back">
        ← {data.backLabel}
      </ViewTransitionLink>
      <p className="wc-kicker">{data.kicker}</p>
      <h1 className="wc-title">{data.title}</h1>
      <p className="wc-lede">{data.lede}</p>

      <div className="mt-2">
        {(data.steps ?? []).map((step) => (
          <section key={step.title} className="wc-step">
            <h3>{step.title}</h3>
            <p>{step.blurb}</p>
            <figure className="wc-step-figure">
              <img src={step.image} alt="" loading="lazy" decoding="async" />
            </figure>
          </section>
        ))}
      </div>
    </article>
  );
}
