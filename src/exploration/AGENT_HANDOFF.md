# Exploration UI — handoff for next agent

**Full session archive (user requests + current behavior):** [`AGENT_FULL_SESSION_HANDOFF.md`](./AGENT_FULL_SESSION_HANDOFF.md)

## Scope

Winnie marketing/exploration experience: **left aside** (hero, tabs, stack nuggets, contact) and **right column** (work gallery with nugget-lab-style cards). Motion uses **`motion/react`**; smooth scroll uses **Lenis** + **ScrollTrigger** (`useWinnieSectionScroll`).

## Key files

| Area | Path |
|------|------|
| Page shell + hero, work grid, tabs | `WinnieExplorationPage.jsx` |
| Copy, work entries, stack tools, contact | `winnie-content.js` |
| Styles | `styles/winnie-exploration.css` |
| Section scroll sync | `useWinnieSectionScroll.js` |
| Reference motion lab (tags, scrim, theme) | `pages/NuggetTestPage.jsx`, `styles/nugget-test.css` |

## Patterns to preserve

1. **Work cards** — Surface clips media + scrim + center copy; **chips** sit in **`wx-work-nuggets-anchor`** at bottom center (same idea as `nugget-test__nuggets-anchor`). **`overflow: hidden`** on **`wx-work-card`**. Chip motion: staggered **y up** on engage, **y down** + stagger on exit. Gap is now **dynamic**: a `ResizeObserver` on `.wx-gallery-frame` plus chip width measurement feeds `WX_NUGGET_GAP_PREFERRED`, `WX_NUGGET_GAP_EDGE_BUFFER`, `WX_NUGGET_SIDE_PAD` in `WorkCard`. The row self-fits at any width and never overlaps unless the card physically can't hold the floor. Layout: `WorkNuggetChip` + `labelOnChipFill` (#000/#fff on fills).

2. **Aside hero** — **`AsideHeroHeadline`**: rotating words `alive → clear → human → intentional`; interval **3.5s**. Word enter **~0.26s** (see **`HEADLINE_WORD_ENTER_DURATION`** + **`--wx-headline-word-enter-duration`** — must match). Sparkles: **CSS** `wx-sparkle-arch` **0.72s**, **`animation-delay`** = word enter duration so arcs start **after** the word lands; **L/R same timing**, mirrored **`offset-path`**; keyed per word; **no `layout`** on the word-wrap (avoids stretch). **`AnimatePresence mode="popLayout"`**. Respect **`useReducedMotion()`** (no **`wx-sparkle--run`** when reduced).

3. **Stack row** — **`WINNIE_STACK_TOOLS`**: **`brandHex`** + **`brandSlug`** → **`https://cdn.simpleicons.org/${slug}`** (or **`logoUrl`** e.g. Adobe local SVG, VS Code Wikimedia). **`StackToolkitNuggets`**: **marquee** ~**50s** loop, duplicate set for seamless scroll. Contact row uses **Phosphor** icons (deep `dist/csr/*` imports), not Simple Icons.

4. **Reveal** — **`RevealCard`**: scroll-in **opacity only** (no `y`).

## Repo conventions

- Design tokens / stack: see root **`CLAUDE.md`**.
- Prefer **minimal, focused diffs**; match existing import and component style.

## Likely follow-ups (not done here)

- Watch Simple Icons for any further slug removals on the remaining brands (figma / adobe / framer / rive / blender / github). When bumping past `13.21.0`, re-HEAD-check each slug — `14.x`+ already dropped `adobe`.
- If more brands fall out of the registry, extend `STACK_FALLBACK_ICON_MAP` / add a `hugeIcon` key in `WINNIE_STACK_TOOLS` rather than inlining vendor SVGs.
- If work cards start showing really short labels (1–2 chars) the measured gap may feel too airy; consider a soft max based on media width instead of a hard `WX_NUGGET_GAP_PREFERRED`.
- Optional: extract the shared motion constants (`NUGGET_ENTER_*` / `NUGGET_EXIT_*` / `NUGGET_ENTER_LIFT` / `NUGGET_EXIT_DROP`) to a tiny `nugget-motion.js` so `/nugget_test` and `wx-work-*` can't drift.
