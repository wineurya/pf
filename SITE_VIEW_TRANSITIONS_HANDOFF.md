# View transitions — handoff (implementation notes)

This document explains **the goal**, **what was built**, and **current status: not working to spec** in Chrome. It is for continuing implementation (animation + layout) without re-deriving context.

---

## Product intent (what the user is trying to do)

When navigating between the **exploration home** (`/`) and a **work case** route (e.g. case study under `WorkCasePage`):

1. The **top nav** should feel like it **stays** on the page: **legible, stable in intent**, and only then **change width / geometry** in a second phase.
2. **Intended order (strictly staged, not a single blended cross-fade):**
   - **Phase A** — All **main** content (the primary column and the aside/intro) **fades out completely** while the nav remains visually primary (user described keeping **y** stable; the bar should not fight with a messy simultaneous fade).
   - **Phase B** — **After** the main content is gone, the **nav “widens”** (or more generally, **morphs** into the destination layout) while holding the same **vertical** feel on the page.
   - **Phase C** — **Only when** the nav has **finished** moving into the case page chrome, the **new page content** (case body) **fades in**.

The user is **testing in Chrome** and has repeatedly reported the result as **not clean** — muddy timing, or nav/content fighting each other — despite iterative CSS and removal of Framer Motion shared layout on the same chrome.

---

## Why this is hard in this app (structural, not just CSS tuning)

- **View Transitions API** (`document.startViewTransition` + `view-transition-name`) is used (see `src/lib/navigateViewTransition.js` with `flushSync` for React Router).
- The **home** and **case** pages **do not place the same DOM node in the same place**:
  - On **home** (large viewports), the nav lives in the **left column** (inside the aside + mobile sticky area) from `ExplorationHomePage.jsx`.
  - On **case** pages, the nav is in a **full-width top header** in `WorkCasePage.jsx` (`wx-explore-top-header`).
- The same **named** transition (`site-chrome` on the wrapper in `TopNav`) therefore captures **very different** bounding boxes between routes. The browser’s default behavior is a **morph** between snapshots; that is inherently a **big** move (not just “widen at same y”) unless the layout is refactored so the **shared** element’s box is closer on both sides.

**Implication for the next implementer:** If CSS-only **delay** and **group** rules still feel wrong, the next lever is **layout** (e.g. a **shared** header shell for both routes so `site-chrome` is geometrically similar), possibly **plus** a **custom** timeline (JS `ViewTransition` types / Web Animations on pseudo trees, or a controlled custom animation) — not more opacity tweaks alone.

---

## What has been implemented (files and behavior)

### Navigation trigger

- `src/lib/navigateViewTransition.js` — `navigateWithViewTransition(navigate, to)` calls `document.startViewTransition` and wraps `navigate` in `flushSync` so the “new” view is committed before the browser captures the new snapshot (avoids blank/flash issues).

### Route shell

- `src/components/AnimatedOutlet.jsx` — Intentionally **without** a competing Framer `AnimatePresence` cross-fade on the route shell (that clashed with view transitions).
- `src/providers/LenisProvider.jsx` — `pageshow` + `event.persisted` (bfcache) handling for Lenis/ScrollTrigger refresh (related to back/forward stability).

### Top nav

- `src/exploration/TopNav.jsx` — The tab row uses **Framer/Motion** for **micro** interactions (pills, labels); **`layoutId` was removed** from the tab rail to avoid **double** animation against View Transitions. The outer chrome carries `site-vt--nav` → `view-transition-name: site-chrome` (defined in CSS).

### Where names are applied

- **Nav:** `.site-vt--nav` on the flex wrapper in `TopNav`.
- **Main column:** `.site-vt--panels` on the primary content column in `ExplorationHomePage.jsx` and in `WorkCasePage.jsx` around the case template.
- **Aside copy:** `.site-vt--aside` on the intro copy column on the home page (case route has no aside; transitions can be one-sided for that name).

### Global styles (core of the staging attempt)

- `src/styles/work-case.css` (imported from `src/index.css`) — Documents a **3-phase** model and implements something close to a **“nav-forward”**-style **delay** pattern (inspired by internal notes parallel to `vercel-react-view-transitions` / `AGENTS.md` — stagger exit, then move, then enter):
  - CSS variables: `--wx-vt-staged-out`, `--wx-vt-staged-nav`, `--wx-vt-staged-in`, `--wx-vt-staged-total`.
  - `::view-transition-old(site-fade-*)` — fade out over **staged-out**.
  - `::view-transition-new(site-fade-*)` — **delayed** by `staged-out + staged-nav` before **staged-in** fade.
  - `::view-transition-group(site-chrome)` — **animation-delay** = **staged-out**, **animation-duration** = **staged-nav**, higher **z-index** so nav group stacks above panels during the fade.
  - Matching **delay/duration** on `::view-transition-old/new(site-chrome)` and `::view-transition-image-pair(site-chrome)`.
  - `::view-transition-old/new(root)` — duration set to **staged-total** so the root layer does not end before named groups.
- `prefers-reduced-motion: reduce` — Strips `view-transition-name` on the named `site-vt--*` classes and collapses transition vars / pseudo animations (per accessibility patterns in the same file).

### Other (from earlier in the same effort, may still be in tree)

- Work card sizing / `min(80dvb, 720px)` and related tokens in `src/exploration/styles/site-canvas.css` — not central to the nav transition problem but part of the same portfolio page.

---

## Status: **failing** relative to the goal

- **In Chrome, the result still does not match the specified staging** (content fully out → nav geometry → content in) in a way the user finds **clean** or **intentional**.
- **Likely reasons** (for investigation, not all confirmed in one place):
  1. **Layout mismatch** between routes makes the `site-chrome` **morph** a **large** combined translate/scale, not a simple “widen at same y.”
  2. **UA default animations** on `::view-transition-old/new` and **image-pair** may not **honor** partial overrides (delay/duration only) the same way across Chromium versions, or may still **blend** with the content phase in ways that look muddy.
  3. **One-sided groups** (e.g. `site-fade-aside` only on home) can produce **asymmetric** transition trees.
  4. **Root** and **unassigned** paint may still **flash** or **finish** on a different clock than the mental model, despite `staged-total`.

---

## Suggested next steps (for the implementer who picks this up)

1. **Reproduce in Chrome** — Home ↔ a work case, large and small breakpoints, with and without `prefers-reduced-motion`.
2. **In DevTools**, inspect the **view transition pseudo** tree (old/new/group/image-pair) during navigation and check **actual** computed **animation** names, **delays**, and **end** times.
3. **Decide** between:
   - **A.** **Layout refactor** so the nav’s **captured** rect is more consistent between routes (strongest for “bar stays, then widens”).
   - **B.** **Imperative** or **type-based** (where supported) control of the transition, or a **non–View-Transition** path for this specific route pair if the MPA API cannot express the timeline reliably.
4. Re-read: `.agents/skills/vercel-react-view-transitions/` (especially `AGENTS.md` and `references/css-recipes.md`) and **MDN** / **Chrome** docs for `::view-transition-group` and `::view-transition-image-pair` when doing the next pass.

---

## Quick file index

| Area | File |
|------|------|
| Start VT + `flushSync` | `src/lib/navigateViewTransition.js` |
| Link wrapper | `src/components/ViewTransitionLink.jsx` |
| Top nav | `src/exploration/TopNav.jsx` |
| Home layout + class hooks | `src/exploration/ExplorationHomePage.jsx` |
| Case layout + class hooks | `src/pages/WorkCasePage.jsx` |
| View transition CSS | `src/styles/work-case.css` (staging block + reduced motion) |

---

*Last updated: handoff for continuation; user-facing outcome: transition still not acceptable.*
