import { useCallback, useLayoutEffect, useState } from "react";

const STORAGE_KEY = "wx-theme";

function readStoredTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* ignore */
  }
  return "light";
}

/**
 * Persists marketing theme on `document.documentElement.dataset.theme` (`light` | `dark`).
 * paired with `:root[data-theme="dark"]` in `tokens.css`.
 */
export function useRebuildTheme() {
  const [mode, setMode] = useState(readStoredTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  const setLight = useCallback(() => setMode("light"), []);
  const setDark = useCallback(() => setMode("dark"), []);
  const toggle = useCallback(() => setMode((m) => (m === "dark" ? "light" : "dark")), []);

  return {
    mode,
    isDark: mode === "dark",
    setLight,
    setDark,
    toggle,
  };
}
