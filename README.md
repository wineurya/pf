# pf — personal portfolio

> **Status: work in progress.** Active rewrite; APIs, routes, and styles are still moving.

My personal portfolio site. Built with Vite, React, and Tailwind v4. Motion uses Framer Motion, GSAP, and Lenis for the scroll layer; routing is handled by React Router. The production build is deployed on Vercel.

## Run it

You'll need Node 20 or newer (see `package.json` → `engines`).

```bash
npm install
npm run dev
```

## Where things live

| Area                                   | Path                          |
| -------------------------------------- | ----------------------------- |
| App and routes                         | `src/`                        |
| Design tokens (`@theme`, CSS vars)     | `src/styles/tokens.css`       |
| Token notes                            | `src/styles/tokens.readme.md` |
| GSAP setup                             | `src/lib/gsap.js`             |
| Lenis + ScrollTrigger                  | `src/lib/lenis.js`            |
| Static assets                          | `public/`                     |

## Tooling

The repo ships some Cursor-related metadata (`.agents/`, `skills-lock.json`, `CLAUDE.md`) so my tooling stays in sync across machines. None of it is required to run the site—just `npm install` and you're good.

## Roadmap

- Pill / badge entrance animations
- SplitText-style title reveals
- Scroll-driven sequences with ScrollTrigger + Lenis
- Shared layout transitions via `layoutId`
- An optional React Three Fiber layer for one section

## Fonts

Body and display use a system stack defined in `src/styles/tokens.css`: SF Pro / system UI on Apple, Segoe UI / Roboto elsewhere. No font binaries are committed.
