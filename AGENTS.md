# Agent Guide

Shared instructions for Claude, Codex, Cursor, and any future coding agent working in this repository. This file is the source of truth. Other agent files (`CLAUDE.md`, `.cursor/rules/project.mdc`) point here.

## Project overview

Personal portfolio for Wineury Almonte, an independent product designer. It is a single-page React app built with Vite. It presents case studies, embedded interaction explorations, and an about section. The production site is [https://wineury.vercel.app](https://wineury.vercel.app).

Stack: React 19, Vite 6, plain CSS with design tokens, Motion and GSAP for animation, Geist and Inter fonts via Fontsource, Phosphor and Central Icons.

## Files to read first

- `README.md` for the public summary, stack, and structure
- `src/content.js` for case studies and site content (the Work list derives from here)
- `src/App.jsx` for the app shell and view switching
- `src/main.jsx` for fonts and global config
- `src/styles/tokens.css` for design tokens, then `src/styles/app.css` and `base.css`
- `vite.config.js` for aliases and the dev server port

## Run and build

```bash
npm install
npm run dev      # http://localhost:5180
npm run build
npm run preview
```

There are no lint or test scripts. Verify changes by running the dev server and the build.

## Public and private boundaries

This repository is the polished, public artifact. It should only explain what the project is, how it runs, how it is structured, what stack it uses, what accessibility and implementation choices exist, and how agents should safely work here.

Research and inspiration are private by default. Private local files may exist on a contributor's machine, but they must never be committed. Keep them in ignored locations such as `.agents/private/`, `docs/private/`, `private/`, `scratch/`, or `research/`. See `.agents/private.example.md` for the convention.

## Never commit

- Research notes, inspiration sources, design references, and moodboards
- Competitive audits and scraped site observations
- Raw prompts, prompt history, and unfinished creative direction
- Private screenshots and personal strategy notes
- Secrets, tokens, API keys, and environment files (`.env`, `.env.local`)
- Raw design or source exports (`.fig`, `.psd`, `.aep`, `.prproj`, archives)

If you discover any of the above already tracked, stop and flag it rather than committing more on top of it.

## Editing rules

- Do not redesign the app. Keep changes focused and scoped to the task.
- Do not break the Vite or React build. Run `npm run build` before considering work done.
- Match the existing code style, naming, and the design token system. No new hardcoded colors where a token exists.
- Do not add dependencies without reason. Do not remove dependencies unless verified unused.
- Keep content in `src/content.js`. Do not leave internal or draft notes that render publicly.
- No secrets in source. Client config goes through `VITE_` environment variables.

## Design and UI workflow

- Lock the reference before writing code. State back the exact reference (Figma frame, annotated screenshot, or site), the target file under `src/`, and the precise dimensions or aspect ratio. When any of these is ambiguous, confirm before implementing — a wrong aspect ratio or wrong folder means a full rebuild.
- The main app is the repo root and `src/`. Embedded interaction demos live in `src/exploration/`. `old/` is the archived previous app — do not edit it.
- Respect true aspect ratios. Do not use `object-fit: contain` (letterboxing) unless explicitly asked; favor `cover`/crop matching the reference.
- Convert new hero or large images to WebP and update their references. It is a meaningful, recurring performance win.

## Verifying visual changes

- Measure, do not eyeball. Read computed values (bounding box, transform, opacity, `object-fit`, font size, spacing) and compare against the reference. A screenshot alone is not proof.
- Do not declare an issue "fixed" until a measurement matches or the user confirms it on a real device.
- The headless preview cannot faithfully play scroll- or rAF-driven animation (frozen frames, throttled scroll, ScrollTrigger artifacts). When motion can't be verified, confirm the logic deterministically, then flag the sandbox limitation and say what to test on device — do not keep rewriting working code to chase a fake bug.
- Run `npm run build` before considering visual or animation work done. There is a `/verify-ui` skill that walks this loop.

## Accessibility expectations

- Honor `prefers-reduced-motion`. Animations and the animated grain freeze under reduced motion.
- Maintain AA contrast and visible focus states. Keep the skip link and semantic landmarks intact.
- Keep lists and controls keyboard operable.

## Commit conventions

- Write clear, complete-sentence messages that say what changed and why. Conventional prefixes are fine (`feat:`, `fix:`, `chore:`, `docs:`).
- Do not add AI or agent co-authorship to commits. No `Co-authored-by:` trailer for Claude, Codex, Cursor, Copilot, or any other coding agent, and no "Generated with" agent attribution. Commits should read as the author's own work.
- A `commit-msg` hook in `.githooks/` strips agent attribution as a safeguard. After cloning, run this once so the hook is active:

  ```bash
  git config core.hooksPath .githooks
  ```

- Keep secrets and private context out of every commit (see "Never commit").

## Sanitized handoff protocol

Use `docs/agent-handoff.md` for handoff notes between agents. Keep those notes sanitized: state, decisions, and open items only. Never include private reasoning, research, inspiration, raw prompts, secrets, or personal notes in a committed file. If a note would expose any of that, keep it in ignored local context instead.
