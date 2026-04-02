# Tokens

- `@theme` → Tailwind utilities + vars. `:root` → semantic / fluid only (no extra utilities from these blocks).
- No `px` inside `@theme` (use `rem`; durations use `ms`).
- In `@media`, use literal `rem` widths — not `var(--breakpoint-*)`.

Layers: breakpoints, type, spacing, color primitives, radii, shadows, motion → then `:root` semantic, fluid type/spacing, dark + `prefers-reduced-motion`.

JIT: a utility appears in CSS when you use it in source (e.g. `text-5xl`).

**Semantic** (examples): `var(--color-fg)`, `var(--color-bg-raised)`, `var(--space-fluid-md)`, `var(--text-fluid-4xl)`.

**Primitives** (examples): `font-display`, `bg-accent-500`, `rounded-pill`, `shadow-glow-sm`, `ease-spring`.

Dark: `prefers-color-scheme: dark` or `document.documentElement.dataset.theme = 'dark'` (selector is `:root[data-theme="dark"]` in `tokens.css`).
