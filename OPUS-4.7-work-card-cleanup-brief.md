# Handoff: Figma work cards (one-page home) — cleanup for Opus 4.7

Use this to align refactors, dedupe, and polish without re‑discovering intent. `npm run build` was last verified passing on this work.

## Design source (Figma, Dev Mode)

- Showcase / tags layout: [node 162-395](https://www.figma.com/design/Qr0YJLIekI7fli6N6nKgzB/Design-Exploration?node-id=162-395&m=dev)
- Case study + “View more” pill: [node 162-414](https://www.figma.com/design/Qr0YJLIekI7fli6N6nKgzB/Design-Exploration?node-id=162-414&m=dev)

## What shipped (behavior)

| Area | Intent |
|------|--------|
| **Aspect** | Work cards are **2:1** (`aspect-[2/1]` on the outer `wx-work-card` wrapper). |
| **Background** | Optional full-bleed image inside the card. If unset, use a **neutral “empty”** slot (no project image) — *not* the old automatic hero asset unless `workCardBackgroundUrl` resolves. Resolve order: `workCardBackgroundImage` → legacy `image.primary` / Figma+Unsplash fallbacks → `null`. |
| **Nuggets** | Each chip has **own hex `color`** + **icon key** via `NUGGET_ICON_MAP` and `HugeiconsIcon`. `labelOnChipFill()` picks light/dark label stroke from luminance. |
| **Top chrome** | Nuggets + optional “View more” (case-study only). On **hover-capable + fine pointer** media, this row **slides in** and fades (title/subtitle are **not** part of that motion — they stay in the footer block). |
| **Bottom sweep** | Decorative line that scales on card hover (same `hover` + `pointer: fine` rules as top chrome in practice). |
| **Subtitle / summary** | **~8 words** shown at rest (`WORK_CARD_TEASER_WORDS` + `splitWorkTeaserWords`). On **card hover**, the remainder **types in**; on **mouse leave**, it **un-types**. `reduceMotion` from context → instant show/hide, no interval. **Full** copy remains in `aria-label` on the paragraph. |
| **Variants** | `getWorkCardVariant`: explicit `workCardVariant` or infer `case-study` if `caseStudyPath` exists else `showcase`. Case-study cards get a full-card `ViewTransitionLink` over the image area. |
| **Reduced motion** | Global `prefers-reduced-motion` block: transitions stripped on work cards; **chrome-top** forced visible; **sweep** collapsed so no slide/sweep animation. |

## Files added or materially touched

| File | Role |
|------|------|
| `public/work/avance-hero.png` | Hero mock for Avance work card. |
| `src/exploration/avance.md` | Short project blurb (copy / context for Avance). |
| `src/exploration/siteContent.js` | **`SITE_WORK`**: new **`avance`** item first; fields `workCardVariant`, `workCardBackgroundImage`, `workCardFooterOnDark`, `nuggets[]` with `{ label, color, icon }`, etc. Other entries gained explicit `workCardVariant` where needed. |
| `src/exploration/ExplorationHomePage.jsx` | `NUGGET_ICON_MAP`, `hexToSrgb` / luma helpers, `WorkNuggetPill`, `WorkCardTeaserText`, `workCardBackgroundUrl`, **`WorkCard`** restructure (shell, bg, scrim, sweep, v2 chrome + footer, link overlay for case study). |
| `src/exploration/styles/site-canvas.css` | New **BEM-ish** `wx-work-card*` / `wx-work-card-v2*` rules for 2:1 layout, empty bg, scrim, sweep, nugget chips, view pill, summary typography, hover/fine-pointer gates, and reduced-motion overrides at end of file. |

## Data contract (`SITE_WORK` entries)

Relevant optional fields:

- `workCardVariant`: `"showcase" | "case-study"`
- `workCardBackgroundImage`: string URL (e.g. `"/work/avance-hero.png"`) or omit / leave unset for “empty” default path (no explicit `null` required unless you want documentation clarity)
- `workCardFooterOnDark`: light text on image footer
- `caseStudyPath`: enables case-study link layer when variant resolves to case-study
- `nuggets`: `{ label, color: "#rrggbb", icon: "IconName" }` — **`icon` must exist in `NUGGET_ICON_MAP`**
- `summary`: full string; first ~8 words = teaser, rest = typewriter tail

## Known cleanup opportunities (intentional hooks for you)

1. **Typewriter interval** — `setInterval` runs continuously while `rest` exists; could pause when `restLen` is 0 and `!isActive` and `!reduceMotion` to save work, or use `requestAnimationFrame` for smoother timing.
2. **Rapid hover** — no debounce; edge-case flicker is possible; consider cleanup or `useLayoutEffect` if issues appear.
3. **Hugeicons `color`** — passed as CSS `var(...)` string from `labelOnChipFill`; if any icon mis-renders, try `currentColor` + wrapper `color` only.
4. **Touch** — slide chrome is gated to `@media (hover: hover) and (pointer: fine)`; on coarse pointers, nuggets should stay visible (verify one mobile device).
5. **Focus** — case-study card uses `ViewTransitionLink` + `:focus-within` for some styles; keyboard-only: confirm “View more” affordance and ring contrast on both image and non-image footers.
6. **Duplication** — luma / chip math might belong in a small `workCardUtils` module if the page file grows.
7. **Explicit empties** — optional `workCardBackgroundImage: null` on entries to document “intentionally no image” vs forgotten field.

## Build

```bash
npm run build
```

Expected: Vite production build completes with no errors.

## Non-goals (do not “fix” without product ask)

- Do not reintroduce automatic full-bleed from `image` for every card unless product wants that; empty slot was requested “across the board” except where set (e.g. Avance).
- Do not remove per-nugget colors/icons in favor of a single white chip style.

---

*Generated for downstream cleanup in Opus 4.7 or any editor — adjust tone and file paths if the repo layout changes.*
