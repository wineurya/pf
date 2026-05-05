# Portfolio (pf)

> Personal portfolio: Vite, React, Tailwind v4, Motion, GSAP, Lenis, React Router—design tokens and scroll-driven motion; ships to Vercel.

This repo is the source for my public portfolio: component-driven UI, a typed token layer, and motion primitives for scroll and entrance animations.

## Quick start

- **Node.js 20+** (see `package.json` → `engines`)

```bash
npm install
npm run dev
```

## Features

- Vite-powered dev and production builds
- Tailwind v4 with shared tokens (`src/styles/tokens.css`)
- Motion + GSAP + Lenis for interaction and scroll
- React Router for client-side navigation
- `vercel.json` for deployment defaults

## Project map

| Area | Location |
|------|----------|
| App and routes | `src/` |
| Design tokens (`@theme`, CSS variables) | `src/styles/tokens.css` |
| Token documentation | `src/styles/tokens.readme.md` |
| GSAP setup | `src/lib/gsap.js` |
| Lenis + ScrollTrigger | `src/lib/lenis.js` |
| Static assets | `public/` |

## Tooling notes

The repo may ship **Cursor** / agent metadata (`.agents/`, `skills-lock.json`, `CLAUDE.md`) so environments stay aligned after `git pull`. That is optional—you only need Node and `npm install` to run the site.

## Roadmap

- Badge / pill entrances (Motion stagger + spring)
- SplitText-style title reveals (GSAP)
- Scroll sequences (ScrollTrigger + Lenis)
- Shared layout transitions (`layoutId`)
- Optional React Three Fiber layer

## Inspiration

[Aceternity UI](https://ui.aceternity.com), [Magic UI](https://magicui.design), [Animata](https://animata.design), [Hover.dev](https://hover.dev), [Motion Primitives](https://motion-primitives.com), [nextjs-animated-components](https://github.com/itsjwill/nextjs-animated-components).

## Fonts

Body and display use a **system stack** in `src/styles/tokens.css` (SF Pro / system UI on Apple, Segoe UI / Roboto elsewhere). Do not commit proprietary font files.
