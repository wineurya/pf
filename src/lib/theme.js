import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "wineury-theme";
const BG = { light: "#fafafa", dark: "#0a0a0a" };
/* Fallback fade length for browsers without the View Transitions API.
   Keep in sync with --dur-theme in tokens.css. */
const SWITCH_MS = 300;

/** Mutate the DOM synchronously — also runs pre-React via the index.html boot script. */
function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.style.backgroundColor = BG[theme];
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", BG[theme]);
}

/**
 * Light/dark theme state persisted to localStorage. The swap fades through a
 * View Transition crossfade where supported; browsers without the API fall
 * back to a scoped CSS color transition (the `theme-switching` class). Reduced
 * motion skips both and swaps instantly.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  });

  // Latest committed theme, read inside the click handler. Lets us start the
  // View Transition from the event (not from the setState updater, which must
  // stay pure — StrictMode invokes updaters twice and would double-fire it).
  const themeRef = useRef(theme);
  const fallbackTimer = useRef(0);

  useEffect(() => {
    themeRef.current = theme;
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    const next = themeRef.current === "dark" ? "light" : "dark";
    themeRef.current = next;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTheme(next); // the effect applies it; no fade under reduced motion
      return;
    }

    // Phones skip the View Transition even where supported: startViewTransition
    // rasterizes the whole page twice up front (masked backdrop photo, blurred
    // dock) and freezes input for the fade — on mobile GPUs that capture drops
    // frames and the swap reads as a stutter + lock-up. The scoped live color
    // transition below is per-property interpolation with no snapshot and no
    // freeze, so it stays smooth under a thumb. Desktop keeps the crossfade.
    const phone = window.matchMedia("(max-width: 1023px)").matches;

    if (document.startViewTransition && !phone) {
      // The whole page crossfades inside one transition. Mutate the DOM
      // synchronously in the callback so the new frame gets captured; React
      // state (icon morph) follows on its own clock.
      document.startViewTransition(() => applyTheme(next));
      setTheme(next);
      return;
    }

    // Phones + no View Transitions API (e.g. older Firefox): ease the swap with
    // a scoped CSS transition instead of letting the background snap.
    const root = document.documentElement;
    root.classList.add("theme-switching");
    applyTheme(next);
    setTheme(next);
    window.clearTimeout(fallbackTimer.current);
    fallbackTimer.current = window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, SWITCH_MS);
  }, []);

  return [theme, toggle];
}
