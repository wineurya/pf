import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section
      className="site-canvas flex min-h-dvh items-center justify-center bg-[var(--wx-page-bg)] px-[var(--wx-pad-x)] py-20 text-[var(--wx-ink)]"
      aria-labelledby="not-found-title"
    >
      <div className="max-w-sm space-y-4 text-center">
        <p className="wx-text-section-kicker text-[var(--wx-muted)]">404</p>
        <h1 id="not-found-title" className="wx-text-page-title font-semibold">
          Page not found.
        </h1>
        <p className="wx-text-body-secondary text-[var(--wx-muted)]">
          This page is not in the portfolio yet.
        </p>
        <Link
          to="/"
          className="wx-text-sm inline-flex rounded-md bg-[var(--wx-primary)] px-4 py-2 font-medium text-[var(--wx-white)] transition-colors hover:bg-[var(--wx-primary-hover-mix)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
