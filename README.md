# pf

Vite + React + Tailwind v4 + Motion + GSAP + Lenis + React Router.

## Run

```bash
npm install && npm run dev
```

## Multiple machines (laptop + desktop)

The repo includes **agent skills** and a lockfile so Cursor and the `skills` CLI stay aligned after `git pull`:

- `.agents/skills/` — installed skills (same on every clone)
- `skills-lock.json` — pinned versions; refresh from registries with `npx skills experimental_install` when you intentionally upgrade
- `CLAUDE.md` — merge order and project notes for AI assistants

Use **Node 20+** (see `package.json` `engines`). After cloning on a new machine: `npm install`, then open the project as usual.

## Tokens

Design tokens: `src/styles/tokens.css` (`@theme` + `:root`). Details: `src/styles/tokens.readme.md`.

## Motion

GSAP entry: `src/lib/gsap.js`. Lenis + ScrollTrigger: `src/lib/lenis.js`.

## Roadmap

- [ ] Badge / pill entrance (Motion stagger + spring)
- [ ] SplitText-style title reveals (GSAP)
- [ ] Scroll sequences (ScrollTrigger + Lenis)
- [ ] Shared layout transitions (`layoutId`)
- [ ] Optional R3F layer

## Reference libraries

- [ui.aceternity.com](https://ui.aceternity.com), [magicui.design](https://magicui.design), [animata.design](https://animata.design), [hover.dev](https://hover.dev), [motion-primitives.com](https://motion-primitives.com)
- [github.com/itsjwill/nextjs-animated-components](https://github.com/itsjwill/nextjs-animated-components) (150+ MIT components)
- [awwwards.com](https://awwwards.com), [gsap.com/showcase](https://gsap.com/showcase)

## Fonts

**SF Pro / SF Pro Rounded (San Francisco)** use a **system font stack** in `src/styles/tokens.css` (`--font-body`, `--font-display`): `ui-rounded`, `-apple-system`, `"SF Pro Rounded"`, then `"SF Pro Text"` / `"SF Pro Display"`, `BlinkMacSystemFont`, and `Segoe UI` / `Roboto` / `system-ui` fallbacks. Base body weight is **400 (Regular)** in `index.css`. **Do not commit** Apple font files; the stack uses installed OS fonts only.
