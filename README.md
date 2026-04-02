# pf

Vite + React + Tailwind v4 + Motion + GSAP + Lenis + React Router.

## Run

```bash
npm install && npm run dev
```

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

Nunito Variable ships via `@fontsource-variable/nunito` (OFL). SF Pro Rounded is system-only — do not commit proprietary font files.
