# Agent Handoff

Use this file for sanitized handoff notes between coding agents.

Do not include private notes, research, inspiration, raw prompts, secrets, personal documents, internal creative references, or anything that should not appear in a public GitHub repository.

## Current State

- Public portfolio app built with React and Vite. Branch **`main`** tracks `origin/main`.
- Shared agent instructions: **`AGENTS.md`** (source of truth for all agents — Claude, Codex, Cursor, Copilot, Windsurf, Cline, Gemini CLI). Adapters: `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/project.mdc`, `.windsurf/rules/project.md`, `.clinerules/project.md`.
- Ponytail installed: `.cursor/rules/ponytail.mdc`, `.agents/skills/ponytail*`.
- Sibling project **Avance** (`wineurya/avance-coach`): `C:\Users\xezrh\Documents\Avance` — see `../Avance/AGENTS.md`. Local dual-run: pf **3000**, Avance **3001**.
- **InCity cover:** `src/assets/case/incity-cover.webp` (intrinsic aspect ratio; do not force 16:9).
- Private local context should remain ignored.

## Loop cadence

- **Stopped** — no automatic wakes. Re-enable only on user request.
- Last state: idle at device gate (`06780a0`); 20 min cadence was armed before stop.

## Loop — iteration priorities

1. **Mobile fixed chrome (iOS 26 / 27 dev beta)** — WebKit **297779** / Apple Forums **800125**. Docks now use vv frame (`--vv-top`, `--vv-height`); backdrop stays layout-bottom. Verify on 26.0, 26.1+, 27 beta. See `docs/research/bibliography.md` + `.agents/private/research/mobile-fixed-chrome/2026-06-18-ios-26-27-beta-focus.md`.
2. **Motion perf** — enter/exit pairs; transform/opacity only on hot paths.
3. **Tiny perf passes** — one change per tick.
4. **Comment cleanup** — remove stale section banners / redundant comments in `src/`.
5. **`docs/design.md`** — validate per surface; **Midjourney 8.1 prompts for background/atmosphere only** (not mockups).

## Substantial updates (user notification)

- **2026-06-18:** iOS 26/27 focus doc + vv-frame dock implementation (CSS + hook). Test on physical betas before PR.
- **2026-06-18 (tick 11):** Motion perf — WordBento drops layout `height` animation; App home dim respects reduced motion.
- **2026-06-18 (tick 13):** Research thread largely closed — Safari 26.1 gap fix + 27 beta notes documented. **Next gate: physical device test** before PR.
- **2026-06-18 (tick 14–15):** Device checklist in `docs/design.md` §10. Loop slowed at gate (20 min) until device results or user approval.
- **2026-06-18 (tick 16–18):** TOC dock scroll stability + backdrop bottom anchor; preview email workflow; Playwright mobile smoke (localhost 8/8). Preview URL requires Vercel auth for headless; authenticated browser confirms scroll-spy + backdrop. **Gate: physical iPhone §10.**

## PR-ready summary (`improvement` → `main`, PR #2)

| Area | Files |
| ---- | ----- |
| iOS dock fix | `useVisualViewportPin.js`, `app.css`, `App.jsx` |
| TOC dock | `CaseStudy.jsx` — scrim/sheet/scroll-close, roll `mode="wait"` |
| Layout | Rail alignment, `.cs__cols--2` stack ≤560px |
| Motion | `WordBento.jsx`, `App.jsx` reduced-motion dim |
| CI notify | `preview-notify.yml`, `deploy-notify-email.mjs` |
| Meta | `index.html` viewport + `interactive-widget` |
| Docs | `design.md`, `bibliography.md`, `agent-handoff.md` |

## Latest Cleanup

Summary:
- Cleaned public README.
- Updated package metadata.
- Strengthened privacy ignore rules.
- Added shared agent protocol.
- Added safe handoff file.
- Removed internal draft notes that rendered in case study placeholders.

Open review items:
- Confirm whether old/archive folders should be removed or migrated.
- Confirm whether personal asset filenames should be sanitized.
- Confirm whether draft case study placeholders should be removed or hidden from production.

## Legacy portfolio assets (for agents)

Reference media from the old Framer site (`wineury.design`) is **not in git**. Regenerate locally when wiring case-study placeholders.

| What | Path | Notes |
| ---- | ---- | ----- |
| **Live-site scraper** | `scripts/scrape-wineury-design.mjs` | Run: `npm run scrape:wineury-design` or `node scripts/scrape-wineury-design.mjs` |
| **Scrape output** | `exports/wineury-design/` | Gitignored. After run, see `manifest.json` and `cases/{slug}/mockups|videos|…` |
| **Wired case assets** | `src/assets/case/` | Only assets imported in `src/content.js` ship in the build |
| **Figma archive script** | `.agents/private/scripts/archive-portfolio-assets.mjs` | Gitignored; outputs to `public/portfolio/` (older rebuild shell, not current case study) |
| **Work list order** | `CASE_STUDY_ORDER` in `src/content.js` | Newest project window first; do not rely on object key order |

Do not commit `exports/` or scrape downloads. Convert picks to WebP (or keep video) under `src/assets/` and reference from `content.js`.
