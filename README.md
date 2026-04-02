## Stack

Vite, React, Tailwind v4, Motion, GSAP, Lenis, React Router.

## Run

```bash
npm install && npm run dev
```

## Tokens

`src/styles/tokens.css` — `@theme` utilities + `:root` semantics. Notes: `src/styles/tokens.readme.md`.

Semantics: `var(--color-bg)`, `var(--color-fg)`, … Primitives: e.g. `bg-accent-500`.

## Motion

Single GSAP registration: `src/lib/gsap.js`. Lenis: `src/lib/lenis.js` (ScrollTrigger proxy + ticker).

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

SF Pro Rounded: system only. Nunito Variable: `@fontsource-variable/nunito` (OFL). Do not commit proprietary font files.

## Skills

`.agents/skills/` — see `CLAUDE.md`. Restore: `npx skills experimental_install`
