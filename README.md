# pf — personal portfolio

> **Status: work in progress.** Active rewrite; APIs, routes, and styles are still moving.

My personal portfolio, but also a sketchbook. I use it to poke at typography, spacing, and motion—trying ideas from references I like, seeing what sticks, and letting half of it stay rough on purpose. Stack is Vite, React, and Tailwind v4; motion is Framer Motion, GSAP, and Lenis with React Router tying sections together. It ships to Vercel when something feels ready enough to show.

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

The repo ships some Cursor-related metadata (`.agents/`, `skills-lock.json`) so my tooling stays in sync across machines. None of it is required to run the site—just `npm install` and you're good.

## Roadmap

- Pill / badge entrance animations
- SplitText-style title reveals
- Scroll-driven sequences with ScrollTrigger + Lenis
- Shared layout transitions via `layoutId`
- An optional React Three Fiber layer for one section

## Fonts

Body and display use a system stack defined in `src/styles/tokens.css`: SF Pro / system UI on Apple, Segoe UI / Roboto elsewhere. No font binaries are committed.
