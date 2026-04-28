import { flushSync } from "react-dom";

/**
 * Pairs with CSS `::view-transition-old/new(root)` in `work-case.css`.
 * Falls back to immediate navigation when the API is missing.
 * `flushSync` ensures the router commits before the browser captures the "new" snapshot
 * (otherwise the view can appear blank or flash white during the transition).
 */
export function navigateWithViewTransition(navigate, to) {
  if (typeof document === "undefined") {
    navigate(to);
    return;
  }
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(to);
      });
    });
  } else {
    navigate(to);
  }
}
