/**
 * Pairs with CSS `::view-transition-old/new(root)` in `work-case.css`.
 * Falls back to immediate navigation when the API is missing.
 */
export function navigateWithViewTransition(navigate, to) {
  if (typeof document === "undefined") {
    navigate(to);
    return;
  }
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      navigate(to);
    });
  } else {
    navigate(to);
  }
}
