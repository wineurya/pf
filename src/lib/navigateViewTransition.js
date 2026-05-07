import { flushSync } from "react-dom";

/**
 * Router `location.state` key — when set by {@link navigateWithViewTransition} for `/`,
 * the exploration home skips the Framer mount fade/slide on `#site-panels` so the View
 * Transitions cross-fade matches case → home (same visual path as home → case).
 */
export const WX_SKIP_HOME_PANELS_ENTER_KEY = "wxSkipHomePanelsEnter";

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
 *
 * If the destination has a hash, we instantly land the document at that target
 * inside the same synchronous frame — that way the new snapshot is captured at
 * the resting scroll position instead of scroll-top, so case study → home reads
 * as one continuous fade instead of a fade-then-scroll-jerk.
 */
function instantlyJumpToHash(hash) {
  if (!hash) return;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ block: "start", inline: "nearest", behavior: "instant" });
}

function isNavigationHome(target) {
  if (typeof target === "string") {
    const pathPart = target.trim().split("#")[0].split("?")[0];
    return pathPart === "" || pathPart === "/";
  }
  const p = target.pathname;
  return p === "/" || p === "";
}

function navigateWithHomeVtRevealMerge(navigate, target, navOpts) {
  const { state: navState, ...restNavOpts } = navOpts ?? {};
  const homeVtRevealState = isNavigationHome(target)
    ? { [WX_SKIP_HOME_PANELS_ENTER_KEY]: true }
    : {};

  if (typeof target === "string") {
    navigate(target, {
      ...restNavOpts,
      state: { ...navState, ...homeVtRevealState },
    });
    return;
  }

  navigate(
    {
      ...target,
      state: { ...target.state, ...navState, ...homeVtRevealState },
    },
    restNavOpts,
  );
}

/**
 * @param {import('react-router-dom').NavigateFunction} navigate
 * @param {import('react-router-dom').To} to
 * @param {import('react-router-dom').NavigateOptions} [navOpts]
 */
export function navigateWithViewTransition(navigate, to, navOpts) {
  const target = normalizeNavigateTo(to);
  const runNavigation = () => {
    flushSync(() => {
      navigateWithHomeVtRevealMerge(navigate, target, navOpts);
    });
    const hash = typeof target === "object" ? target.hash : null;
    if (hash) instantlyJumpToHash(hash);
  };

  if (typeof document === "undefined") {
    navigateWithHomeVtRevealMerge(navigate, target, navOpts);
    return;
  }
  if (document.startViewTransition) {
    document.startViewTransition(runNavigation);
  } else {
    runNavigation();
  }
}
