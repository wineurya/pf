# Work card imprint — Avance (template for future cards)

Use **`SITE_WORK[0]` — Avance** in `siteContent.js` as the reference implementation. This document summarizes behavior, data shape, DOM hooks, and assets so new projects stay consistent.

## What this card is

- **Figma 200:88** artboard: square gallery card (`workCardAspect: "1/1"`), mock centered, full-bleed raster optional WebP + PNG.
- **Warm footer** (`workCardFooterWarm: true`): no dark scrim; chips + footer sit on a tinted field (`--wx-warm-figma-canvas` on `.site-canvas`).
- **Footer one-liner**: `[mark] Title [gap] rotating microcopy` — no slash; see `WorkCardFooterOneLiner` + `workCardFooterRotatingLines` (3–4 short lines; motion cycles when `prefers-reduced-motion` is off and tab is visible).
- **Nav-only view**: `workCardOpenNavOnlyView: true` — card click focuses the project; case study is a separate control.
- **Case Study** control: `workCardCaseStudyConnector: true` + `caseStudyPath` — bottom-right link; does not replace card click.

## `siteContent.js` checklist (copy from Avance)

| Field | Avance | Notes |
|--------|--------|--------|
| `slug`, `title`, `kind`, `year`, `role` | required | Metadata / consistency |
| `workCardVariant` | `"showcase"` | With `caseStudyPath` drives chips + “View more” affordances |
| `workCardOpenNavOnlyView` | `true` | Optional; nav-only gallery behavior |
| `workCardCaseStudyConnector` | `true` | Show “Case Study” pill |
| `caseStudyPath` | `/work/…` | Route to case page |
| `workCardAspect` | `"1/1"` | or `"4/5"` / default 16:9 |
| `workCardBackgroundImage` | PNG path | Fallback raster |
| `workCardBackgroundWebp` | WebP path | Prefer `<picture>` |
| `workCardImageHighPriority` | `true` for LCP hero | `fetchPriority` / `loading` |
| `workCardFigmaFrame` | `"200-88"` | Enables `wx-work-card--figma-20088` layout |
| `workCardFooterWarm` | `true` | Shell padding, grain, warm chrome/footer tokens |
| `workCardFooterMark` | `/work/...svg` or site logo | Avance uses `/work/avance-footer-mark.svg`; inline orb SVG in code when path matches |
| `workCardFooterRotatingLines` | `string[]` | Enables one-liner; omit for classic title + teaser |
| `workCardTeaserLead` / `workCardFinale` / `workCardStutters` | legacy path | Used when **no** `workCardFooterRotatingLines` |
| `summary` | string | `aria-label`, SEO, teasers |
| `workCardNuggetsMonochrome` | `true` | Pill style on warm cards |
| `workCardNuggetsAriaLabel` | string | Optional list label |
| `nuggets` | `{ label, color?, icon }[]` | Icons: `NUGGET_ICON_MAP` / `LUCIDE_NUGGET_MAP` in `ExplorationHomePage.jsx` |

## DOM / classes (for design QA)

Outer card:

- `wx-work-card wx-work-card--figma wx-work-card--figma-20088 wx-work-card--footer-warm wx-work-card--nuggets-mono` (and `group`, `cursor-pointer` as wired in JSX).

Footer row:

- `wx-work-card-v2__footer-line wx-work-card-v2__footer-line--warm`
- Mark: `wx-work-card-v2__footer-mark`
- Title: `wx-work-card-v2__title wx-work-card-v2__footer-line-title`
- Rotating line: `wx-work-card-v2__footer-line-cycle-clip` → `wx-work-card-v2__footer-line-cycle`

Styles live in `src/exploration/styles/site-canvas.css` (search `wx-work-card`).

## Assets per project

Place under `public/work/`:

- `{slug}-hero.png`, `{slug}-hero.webp` (or your naming) — referenced by `workCardBackgroundImage` / `workCardBackgroundWebp`.
- Optional `{slug}-footer-mark.svg` — set `workCardFooterMark`; for the Avance orb you can mirror `public/work/avance-footer-mark.svg` or add a new SVG and path.

Figma reference for the current mark: Testing file, nodes `77:486` / `77:487` (see comment on Avance entry).

## Code touchpoints

- **Grid / card assembly**: `ExplorationHomePage.jsx` (`WorkCardModel`, `WorkCardChromeAndFooterBlock`, `WorkCardFooterOneLiner`, `WorkNuggetPill`, `WorkCardFigma20088Artboard`).
- **Typing / stutter** (non–one-liner cards): `workCardStutterTypewriter.js`.
- **Tokens**: `src/styles/tokens.css` (`--wx-*`); exploration canvas field: `--wx-warm-figma-canvas` in `site-canvas.css` (subject to design tuning).

## Variants to know

- **Minimal / hero-only** (e.g. InCity): `workCardOmitFooter`, `workCardOmitTopChrome`, `workCardFigmaNoImage`, custom `workCardFigmaCanvas` — do **not** copy Avance wholesale for that pattern.
- **Classic footer**: omit `workCardFooterRotatingLines` → `h3` + `WorkCardTeaserText` (stutter or simple teaser).

Keep Avance as the **default flagship** template when you want: 200:88 + warm shell + monochrome nuggets + footer one-liner + case study connector + nav-only view.
