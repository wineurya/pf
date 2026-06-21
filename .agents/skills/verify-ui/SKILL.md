---
name: verify-ui
description: Verify a portfolio UI or animation change against its reference using measured proof, not eyeballing. Use after editing CSS/JSX/animation in this repo, before declaring anything "fixed". Locks the reference first, measures with preview tools, and distinguishes real bugs from headless-sandbox artifacts.
---

# verify-ui

A disciplined verification loop for this portfolio. It exists to kill two recurring failures: (1) building the wrong thing because the reference was never locked, and (2) declaring a visual issue "fixed" from a screenshot when the defect is still there or the sandbox faked it.

The app runs at `http://localhost:5180` (`npm run dev`). The main app is the repo root + `src/`; `old/` is the archived previous app — never edit it; embedded demos live in `src/exploration/`.

## how to use

- `/verify-ui`
  Apply this loop to the UI/animation change in this conversation.

- `/verify-ui <view or component>`
  Verify a specific view (e.g. a case study, the TOC dock, a hero crop).

## Step 0 — Lock the reference BEFORE touching code

This is the single biggest time-saver. Do not start editing until you can state, and the user confirms:

1. **The exact reference** — which Figma frame, annotated screenshot, or reference site. Use the inner image, not the 1440×900 wrapper frame.
2. **The target file(s)** — the real path under `src/`, not a guess. Don't wander into `src/exploration/` for main-app work, or into `old/`.
3. **The precise dimensions / aspect ratio** — e.g. 2:1 vs 1:2. Get this wrong and the whole build is wrong.

Restate these back in one short block and wait for confirmation when anything is ambiguous. A 20-second restate beats a full rebuild.

## Step 1 — Implement

Make the focused change. Match the existing token system and code style (see AGENTS.md). No hardcoded colors where a token exists.

## Step 2 — Measure, don't eyeball

A screenshot alone is not proof. Pull numbers:

- `preview_console_logs` / `preview_logs` / `preview_network` — check for errors first (a crashed import or 0px grid cell will silently wreck layout).
- `preview_snapshot` — confirm structure and content are present.
- `preview_inspect` / `preview_eval` — read computed values for the elements you changed: `getBoundingClientRect()`, computed `transform`, `opacity`, `object-fit`, `aspect-ratio`, font-size, spacing.
- Compare the measured values against the locked reference. If they don't match, you are not done — list the deltas and fix.

### Aspect-ratio rule
Respect true aspect ratios. Never use `object-fit: contain` (letterboxing) unless explicitly asked — favor `cover`/crop matching the reference. Aspect-ratio mistakes are a known recurring defect here.

## Step 3 — Know the sandbox's limits (don't fight fake bugs)

The headless preview cannot faithfully play scroll- or rAF-driven animation. Known artifacts:

- Frozen Motion/rAF frames in a hidden document
- Throttled / non-advancing scroll
- "ScrollTrigger bugs" that are throttling artifacts, not real code

If you cannot visually verify an animation, **do not keep rewriting working code.** Instead:

1. Verify the *logic* deterministically — seek the GSAP/Motion timeline to 0/25/50/75/100% via `preview_eval`, log computed transform/opacity at each step, and assert they progress and land correctly.
2. If even that is blocked, state the specific sandbox limitation and tell the user exactly what to test on a real device. Treat it as a tooling limit, not a code bug.

## Step 4 — Build check before "done"

There are no lint or test scripts. Run `npm run build` and confirm it passes (catches unclosed JSX fragments, bad imports, broken edits) before reporting done.

## Step 5 — Report honestly

Only say "fixed" when a measurement matches the reference or the user confirms on a real device. Otherwise report what's still off, with the deltas. Never declare victory from a screenshot alone — the black-line saga is why this rule exists.

## Step 6 — Commit (only if asked)

If the user asks to commit: clear message, conventional prefix fine, **no agent co-authorship and no "Generated with" attribution** (enforced by the `.githooks/` commit-msg hook). Keep private context out of the commit.
