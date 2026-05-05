# Portfolio (pf)

Personal portfolio site built with **Vite**, **React**, **Tailwind CSS v4**, **Motion**, **GSAP**, **Lenis**, and **React Router**. The live build targets **Vercel** (`vercel.json` in repo).

## Quick start

Requires **Node 20+** (see `package.json` `engines`).

```bash
npm install
npm run dev
```

## Project map

| Area | Location |
|------|-----------|
| App entry & routes | `src/` |
| Design tokens (`@theme`, CSS variables) | `src/styles/tokens.css` |
| Token notes | `src/styles/tokens.readme.md` |
| GSAP bootstrap | `src/lib/gsap.js` |
| Lenis + ScrollTrigger | `src/lib/lenis.js` |
| Static assets | `public/` |

## Working on multiple machines

The repo may include Cursor agent metadata (`.agents/`, `skills-lock.json`, `CLAUDE.md`) so tooling stays aligned after `git pull`. That is optional for running the site; you only need `npm install` and `npm run dev`.

## Roadmap (high level)

- Badge / pill entrance animations (Motion stagger + spring)
- SplitText-style title reveals (GSAP)
- Scroll sequences (ScrollTrigger + Lenis)
- Shared layout transitions (`layoutId`)
- Optional React Three Fiber layer

## References

UI and motion inspiration: [Aceternity UI](https://ui.aceternity.com), [Magic UI](https://magicui.design), [Animata](https://animata.design), [Hover.dev](https://hover.dev), [Motion Primitives](https://motion-primitives.com), [nextjs-animated-components](https://github.com/itsjwill/nextjs-animated-components).

## Fonts

Body and display type use a **system stack** in `src/styles/tokens.css` (SF Pro / system UI on Apple, Segoe UI / Roboto elsewhere). Do not commit proprietary font binaries.
