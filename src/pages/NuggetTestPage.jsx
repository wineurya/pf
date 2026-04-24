import { useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CodeCircleIcon,
  FigmaIcon,
  FramerIcon,
  GridTableIcon,
  Layers01Icon,
  Layout01Icon,
} from "@hugeicons/core-free-icons";
import "@/exploration/styles/nugget-test.css";

const LAB_IMAGE =
  "https://images.unsplash.com/photo-1612293025896-7200cc87e540?auto=format&fit=crop&w=2000&q=85";

/** CSS vars in tokens.css; hex values for WCAG luminance only (keep in sync). */
const CHIP_LAB_LUMA = {
  "var(--chip-lab-react)": "#0284c7",
  "var(--chip-lab-figma)": "#7c3aed",
  "var(--chip-lab-motion)": "#e11d48",
  "var(--chip-lab-a11y)": "#059669",
  "var(--chip-lab-cms)": "#2563eb",
  "var(--chip-lab-layout)": "#d97706",
};

const LAB_NUGGETS = [
  { label: "React", icon: CodeCircleIcon, fill: "var(--chip-lab-react)" },
  { label: "Figma", icon: FigmaIcon, fill: "var(--chip-lab-figma)" },
  { label: "Motion", icon: FramerIcon, fill: "var(--chip-lab-motion)" },
  { label: "A11y", icon: Layers01Icon, fill: "var(--chip-lab-a11y)" },
  { label: "CMS", icon: GridTableIcon, fill: "var(--chip-lab-cms)" },
  { label: "Layout", icon: Layout01Icon, fill: "var(--chip-lab-layout)" },
];

/** Bottom-center row: +y = down from anchor at card bottom center. */
const NUGGET_GAP = 76;
const NUGGET_ROW_Y = -34;
/** Start offset (+y): lower on screen, then animate y up into `NUGGET_ROW_Y`. */
const NUGGET_ENTER_LIFT = 48;
const NUGGET_ENTER_DURATION = 0.38;
const NUGGET_ENTER_STAGGER = 0.058;
const NUGGET_ENTER_EASE = [0.22, 1, 0.36, 1];
const NUGGET_EXIT_DURATION = 0.3;
const NUGGET_EXIT_STAGGER = 0.048;
const NUGGET_EXIT_EASE = [0.48, 0, 0.82, 1];
const NUGGET_EXIT_DROP = 52;

function hexToSrgb(hex) {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return {
    r: parseInt(v.slice(0, 2), 16) / 255,
    g: parseInt(v.slice(2, 4), 16) / 255,
    b: parseInt(v.slice(4, 6), 16) / 255,
  };
}

function linearize(u) {
  return u <= 0.03928 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance */
function relativeLuminance(hex) {
  const { r, g, b } = hexToSrgb(hex);
  const R = linearize(r);
  const G = linearize(g);
  const B = linearize(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/** High-contrast label on chip fills (matches Winnie work chips). */
function labelOnFill(fillCss) {
  const hex = CHIP_LAB_LUMA[fillCss];
  if (!hex) return "var(--color-neutral-0)";
  return relativeLuminance(hex) > 0.5
    ? "var(--color-neutral-1000)"
    : "var(--color-neutral-0)";
}

function themeRevealRadius(cx, cy) {
  return Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)) + 2;
}

function ThemeIconSun() {
  return (
    <svg className="nugget-test__theme-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.3 11.3 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.3-11.3 1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ThemeIconMoon() {
  return (
    <svg className="nugget-test__theme-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NuggetTestPage() {
  const reduceMotion = useReducedMotion();
  const [engaged, setEngaged] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [vtBusy, setVtBusy] = useState(false);
  const themeBtnRef = useRef(null);
  const vtLock = useRef(false);

  const n = LAB_NUGGETS.length;

  const nuggetLayout = useMemo(() => {
    if (n <= 1) return [{ x: 0, y: NUGGET_ROW_Y, z: 20 }];
    const mid = (n - 1) / 2;
    return LAB_NUGGETS.map((_, i) => ({
      x: (i - mid) * NUGGET_GAP,
      y: NUGGET_ROW_Y,
      z: 20 + i,
    }));
  }, [n]);

  const toggleTheme = () => {
    void (async () => {
      if (vtLock.current) return;
      const next = theme === "dark" ? "light" : "dark";

      if (reduceMotion) {
        setTheme(next);
        return;
      }

      const btn = themeBtnRef.current;
      if (!btn || typeof document.startViewTransition !== "function") {
        setTheme(next);
        return;
      }

      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const r = themeRevealRadius(x, y);

      vtLock.current = true;
      setVtBusy(true);
      try {
        const transition = document.startViewTransition(() => {
          flushSync(() => setTheme(next));
        });
        await transition.ready;
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`],
          },
          {
            duration: 620,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(nt-page)",
          },
        );
        await transition.finished;
      } catch {
        flushSync(() => setTheme(next));
      } finally {
        vtLock.current = false;
        setVtBusy(false);
      }
    })();
  };

  const rootClass = `nugget-test${theme === "light" ? " nugget-test--light" : ""}`;

  return (
    <div className={rootClass} data-theme={theme}>
      <header className="nugget-test__top">
        <Link className="nugget-test__back" to="/">
          ← Back to exploration
        </Link>
        <span className="nugget-test__badge">Motion lab</span>
      </header>

      <main className="nugget-test__main">
        <div
          className={`nugget-test__card${engaged ? " nugget-test__card--engaged" : ""}`}
          role="group"
          aria-label="Hover or focus the card to show the summary and tool tags at the bottom center"
          tabIndex={0}
          onMouseEnter={() => setEngaged(true)}
          onMouseLeave={() => setEngaged(false)}
          onFocus={() => setEngaged(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false);
          }}
        >
          <div className="nugget-test__card-surface">
            <div className="nugget-test__card-media" aria-hidden>
              <img src={LAB_IMAGE} alt="" loading="eager" decoding="async" draggable={false} />
            </div>
            <div className="nugget-test__card-scrim" aria-hidden />

            <div className="nugget-test__center-copy">
              <motion.h1
                className="nugget-test__title"
                initial={false}
                animate={engaged ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0.12, ease: "easeOut" }
                    : engaged
                      ? { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0 }
                      : { duration: 0.3, ease: [0.5, 0, 0.88, 1], delay: 0.06 }
                }
              >
                Marketing site refresh
              </motion.h1>
              <motion.p
                className="nugget-test__sub"
                initial={false}
                animate={engaged ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0.12, ease: "easeOut" }
                    : engaged
                      ? { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.14 }
                      : { duration: 0.3, ease: [0.5, 0, 0.88, 1], delay: 0 }
                }
              >
                Rebuilt the public pages on React, kept design in Figma, and wired content through the CMS the
                team already used. Hover to read the one-line brief — tags stay in the lower third so the cover
                stays uncluttered.
              </motion.p>
            </div>
          </div>

          <div className="nugget-test__nuggets-anchor" aria-hidden>
            {LAB_NUGGETS.map((item, i) => {
              const pos = nuggetLayout[i];
              const fill = item.fill;
              const label = labelOnFill(fill);
              const yHidden = pos.y + NUGGET_ENTER_LIFT;
              const yExit = pos.y + NUGGET_EXIT_DROP;
              return (
                <div key={item.label} className="nugget-test__nugget-center">
                  <motion.div
                    className="nugget-test__nugget"
                    style={{
                      color: label,
                      backgroundColor: fill,
                      zIndex: engaged ? pos.z : i,
                    }}
                    initial={false}
                    animate={
                      engaged
                        ? reduceMotion
                          ? {
                              x: pos.x,
                              y: pos.y,
                              scale: 1,
                              opacity: 1,
                              rotate: 0,
                            }
                          : {
                              x: pos.x,
                              y: [yHidden, pos.y],
                              scale: [0.96, 1],
                              opacity: [0, 1],
                              rotate: 0,
                            }
                        : reduceMotion
                          ? {
                              x: pos.x,
                              y: yExit,
                              opacity: 0,
                              rotate: 0,
                              scale: 0.88,
                            }
                          : {
                              x: pos.x,
                              y: yExit,
                              opacity: 0,
                              rotate: 0,
                              scale: 0.88,
                            }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0.12, ease: "easeOut" }
                        : engaged
                          ? {
                              delay: i * NUGGET_ENTER_STAGGER,
                              duration: NUGGET_ENTER_DURATION,
                              ease: NUGGET_ENTER_EASE,
                            }
                          : {
                              type: "tween",
                              duration: NUGGET_EXIT_DURATION,
                              ease: NUGGET_EXIT_EASE,
                              delay: i * NUGGET_EXIT_STAGGER,
                            }
                    }
                  >
                    <HugeiconsIcon icon={item.icon} size={14} color={label} strokeWidth={2.1} />
                    {item.label}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <button
        ref={themeBtnRef}
        type="button"
        className="nugget-test__theme-toggle"
        onClick={toggleTheme}
        disabled={vtBusy}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <ThemeIconSun /> : <ThemeIconMoon />}
      </button>
    </div>
  );
}
