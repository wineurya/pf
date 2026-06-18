# Agent Handoff

Use this file for sanitized handoff notes between coding agents.

Do not include private notes, research, inspiration, raw prompts, secrets, personal documents, internal creative references, or anything that should not appear in a public GitHub repository.

## Current State

- Public portfolio app built with React and Vite.
- Shared agent instructions live in `AGENTS.md`.
- Private local context should remain ignored.
- **Loop active (dynamic)** on branch `improvement`. Commits/PR only with user approval.
- Research: `docs/research/bibliography.md` (public citations); full notes in `.agents/private/research/mobile-fixed-chrome/` (local only).

## Loop cadence

- **5 minutes** — light iteration (research note, doc tweak, tiny perf, validation row).
- **20 minutes** — heavy iteration planned (scroll wrapper prototype, motion pass, multi-file cleanup).
- Agent picks `nextSleepSeconds` at end of each tick; state in `.agent-scratch/loop-state.json`.
- Open browser + fetch articles each research tick; save locally + cite in bibliography.

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

## PR-ready summary (uncommitted on `improvement`)

| Area | Files |
| ---- | ----- |
| iOS dock fix | `useVisualViewportPin.js`, `app.css`, `App.jsx` |
| Layout | Rail alignment, `.cs__cols--2` stack ≤560px |
| Motion | `WordBento.jsx`, `App.jsx` reduced-motion dim |
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
