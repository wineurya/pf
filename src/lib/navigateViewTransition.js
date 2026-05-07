import { flushSync } from "react-dom";

/** React Router expects `hash` without `#`; strings like `/#section-work` must be split. */
function normalizeNavigateTo(to) {
  if (typeof to !== "string") return to;
  const hashIdx = to.indexOf("#");
  if (hashIdx === -1) return to;
  const pathPart = to.slice(0, hashIdx);
  const pathname = pathPart === "" ? "/" : pathPart;
  const hash = to.slice(hashIdx + 1);
  return { pathname, hash };
}

/** Stable `href` for `<a>` when `to` is a location object. */
export function viewTransitionToHref(to) {
  if (typeof to === "string") return to;
  const pathname = to.pathname && to.pathname !== "" ? to.pathname : "/";
  const search = to.search ?? "";
  const rawHash = to.hash ?? "";
  const hash =
    rawHash === ""
      ? ""
      : rawHash.startsWith("#")
        ? rawHash
        : `#${rawHash}`;
  return `${pathname}${search}${hash}`;
}

/**
 * Pairs with CSS `::view-transition-old/new(root)` in `work-case.css`.
 * Falls back to immediate navigation when the API is missing.
 * `flushSync` ensures the router commits before the browser captures the "new" snapshot
 * (otherwise the view can appear blank or flash white during the transition).
 */
export function navigateWithViewTransition(navigate, to) {
  const target = normalizeNavigateTo(to);
  if (typeof document === "undefined") {
    navigate(target);
    return;
  }
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(target);
      });
    });
  } else {
    navigate(target);
  }
}
