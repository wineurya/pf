/**
 * App-wide skip link. Keep each route’s primary column behind `#main` for SR + keyboard users.
 */
export function SkipToContentLink() {
  return (
    <a
      href="#main"
      className="wx-text-sm sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-fg)] focus:px-3 focus:py-2 focus:text-[var(--color-bg)]"
    >
      Skip to content
    </a>
  );
}
