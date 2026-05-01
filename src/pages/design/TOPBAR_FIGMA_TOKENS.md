# Kinetix — Topbar Display Tokens (SF Pro)

> Figma source: [Testing → header.kx-topbar (218:184)](https://www.figma.com/design/ehQYOquLYoGBReIO32iya0/Testing?node-id=218-184&m=dev)
>
> This document is the contract for Cursor / Composer when applying display-font
> tokens introduced in **`src/pages/design/KinetixPage.css`**. It exists so the
> agent never silently re-introduces hard-coded font stacks, weights, or
> letter-spacing values when editing the Kinetix topbar. **Read this before
> touching `.kx-topbar` or any of its descendants.**

---

## TL;DR

```css
.kx-topbar {
  font-family: var(--kx-font-display);
  font-weight: var(--kx-weight-display);   /* SF Pro Semibold (590) */
}
```

The topbar is the **only** Kinetix surface that opts into SF Pro. Body content
keeps `--kx-font` (Geist Variable) with the existing two-weight system
(`--kx-weight-regular` 500, `--kx-weight-strong` 700).

---

## Tokens

All tokens live on `.kx-root` in `KinetixPage.css`. They are scoped to the
Kinetix design page — they do not leak into the rest of the portfolio.

### Display font stack

```css
--kx-font-display:
  -apple-system, BlinkMacSystemFont,
  'SF Pro Display', 'SF Pro Text', 'SF Pro',
  'Inter var', 'Inter', system-ui, sans-serif;
```

**Why this stack:** macOS / iOS users get the real SF Pro through `-apple-system`
and `BlinkMacSystemFont`. We don't ship SF Pro web fonts (Apple's license forbids
re-hosting), so the `'SF Pro …'` names cover sideloaded installs and the
`Inter` fallback covers everyone else with the closest matching metrics. No
network request is required — this is a system-font-first stack.

### Display weights

The Figma exports use SF Pro's variable-axis values (`font-[590]`,
`font-bold`). We expose those as tokens to keep the topbar pixel-faithful
without polluting the body's two-weight rule.

| Token                          | Value | Figma equivalent | Use for                                 |
| ------------------------------ | :---: | ---------------- | --------------------------------------- |
| `--kx-weight-display`          | `590` | `font-[590]`     | Topbar default — labels, links, status. |
| `--kx-weight-display-strong`   | `700` | `font-bold`      | Version tag, `+4` chip, run button.     |

**Rule:** these two weights are **only** valid inside `.kx-topbar` (or any
display-class surface that opts in via `font-family: var(--kx-font-display)`).
Outside of the topbar, keep using `--kx-weight-regular` / `--kx-weight-strong`.

### Display tracking

SF Pro renders best at small sizes when given a faint positive letter-spacing.
Figma's spec (`tracking-[0.1px]`, `tracking-[0.063px]`, etc.) maps to the
following em-relative tokens so they survive font-size changes:

| Token                            | Value     | Apply to                                     |
| -------------------------------- | --------- | -------------------------------------------- |
| `--kx-tracking-display`          | `0.008em` | Body display copy at 12.5px (e.g. labels).   |
| `--kx-tracking-display-tight`    | `0.005em` | Run button text (Bold 12.5px).               |
| `--kx-tracking-display-tag`      | `0.01em`  | Small chips: `v4.2.1`, `+4`, `2 min ago`.    |

### Line height

The topbar reuses the existing leading tokens introduced in the previous
refactor — **do not invent new px line-heights**:

| Figma leading       | Math (Figma)    | Token to use            |
| ------------------- | --------------- | ----------------------- |
| `leading-[18.75px]` | 18.75 / 12.5    | `--kx-leading-normal`   |
| `leading-[16.5px]`  | 16.5  / 11      | `--kx-leading-normal`   |
| `leading-[15px]`    | 15    / 10      | `--kx-leading-normal`   |
| `leading-[14.25px]` | 14.25 / 9.5     | `--kx-leading-normal`   |
| `leading-[11px]`    | 11    / 11      | `--kx-leading-none`     |

The only `leading-none` element is the success pill ("Complete") — it sits in
a fixed-height capsule and needs to flush to its dot.

---

## How to apply (Cursor / Composer rules)

When editing the Kinetix topbar, follow these rules in order. They are
deliberately strict — break them only with a comment justifying why.

### 1) Inherit, don't restate

`.kx-topbar` already sets the display font + weight. Children must inherit.

```css
/* ✅ Good */
.kx-project-selector {
  font-family: inherit;
  font-weight: var(--kx-weight-display);
}

/* ❌ Bad — duplicates the stack and locks future migrations */
.kx-project-selector {
  font-family: 'SF Pro', system-ui, sans-serif;
  font-weight: 590;
}
```

### 2) Always pair display weight with display family

Never use `--kx-weight-display` (590) on a Geist surface — Geist doesn't have
a 590 variable axis and the browser will round it to 600, losing the rhythm.
The pairing is binary:

```
font-family: var(--kx-font-display)  →  --kx-weight-display(*)
font-family: var(--kx-font)          →  --kx-weight-regular | --kx-weight-strong
```

### 3) Use the leading tokens

Convert any Figma `leading-[XYZ.Zpx]` to the matching `--kx-leading-*` token.
The page is already 100% on leading tokens (see the previous refactor). Keep
it that way.

### 4) Use the tracking tokens

Convert Figma `tracking-[0.NNpx]` to the matching `--kx-tracking-display*`
token. Don't introduce raw `letter-spacing: 0.1px;` — it breaks at any
non-default font size.

### 5) Never apply SF Pro outside the topbar

The whole point of these tokens is that they're isolated. If a different
surface needs a "native app chrome" feel, refactor it into a *display surface*
class (e.g. `.kx-statusbar`) and have it set `font-family: var(--kx-font-display);`
once, the same way `.kx-topbar` does. Do not sprinkle the stack inline.

### 6) Two-weight rule still holds elsewhere

Outside the topbar, the page still obeys "no more than two weights":
`--kx-weight-regular` (500) and `--kx-weight-strong` (700). Do not import
`--kx-weight-display` into a body card just because it looks heavier — pick
between regular and strong.

---

## Element-by-element mapping (Figma → CSS class)

| Figma node                | Class                    | Weight token                  | Size  | Tracking token                    |
| ------------------------- | ------------------------ | ----------------------------- | ----- | --------------------------------- |
| `Kinetix` text            | `.kx-breadcrumb`         | `--kx-weight-display`         | 12.5  | —                                 |
| `Checkout Redesign` label | `.kx-project-selector`   | `--kx-weight-display`         | 12.5  | —                                 |
| `v4.2.1`                  | `.kx-version-tag`        | `--kx-weight-display-strong`  | 10    | `--kx-tracking-display-tag`       |
| `Complete` pill           | `.kx-pill-success`*      | (inherited from `.kx-pill`)   | 11    | (existing `0.015em`)              |
| `2 min ago`               | `.kx-topbar-status-time` | `--kx-weight-display`         | 11    | `--kx-tracking-display-tag`       |
| `+4` overflow chip        | `.kx-avatar-extra`       | `--kx-weight-display-strong`  | 9.5   | `--kx-tracking-display-tag`       |
| `View Report`             | `.kx-view-report-btn`    | `--kx-weight-display`         | 12.5  | —                                 |
| `Simulation Complete`     | `.kx-run-btn-complete`   | `--kx-weight-display-strong`† | 12.5  | `--kx-tracking-display-tight`†    |

\*Pill base typography is shared — leave the pill base alone, only the
container's font-family cascades into it via SF Pro.

†Set on `.kx-run-btn` (parent), inherited by all three states.

---

## Visual specs preserved verbatim from Figma

These are the values that already match Figma after this pass. If you change
the topbar, do not regress them:

```text
Topbar              height 56px, padding 0 18px, border-bottom 1px #E6E8EC
Project selector    padding 6px 10px 6px 11px, gap 7px, radius 6px
Version tag         padding 1px 5px, radius 4px, shadow 0 0 6px rgba(71,85,105,0.18)
Complete pill       bg #15803D, padding 4px 9px, gap 8px, glow 0 0 16px rgba(21,128,61,0.26)
Pill dot            5×5, ring 0 0 0 3px rgba(255,255,255,0.16)
Avatar              22×22, border 2px var(--kx-surface), overlap -6px
+4 chip             bg #475569, glow 0 0 7px rgba(71,85,105,0.18)
Divider-v           1×22, #E6E8EC, margin 0 2px
View Report         padding 7px 12px, border 1px #E6E8EC, radius 6px
Notif icon-btn      32×32, border 1px #E6E8EC, radius 6px
Notif badge         6×6, radius 3px (square), top 6 right 6
                    shadow 0 0 0 2px var(--kx-surface), 0 0 14px rgba(220,38,38,0.44)
Simulation Complete bg #16A34A, border 1px rgba(255,255,255,0.26)
                    shadow 0 0 0 1px #17A34B,
                           0 1px 2px rgba(9,9,11,0.08),
                           0 2px 4px rgba(9,9,11,0.16),
                           inset 0 1px 20px rgba(255,255,255,0.16)
```

---

## When you should re-fetch from Figma

Re-fetch via the Figma MCP (`get_design_context` with `nodeId: 218:184`,
`fileKey: ehQYOquLYoGBReIO32iya0`) before editing whenever:

1. The Figma file has been touched (commit message references `Testing`).
2. You're adding a new element to the topbar that doesn't appear in the table
   above.
3. A spec in this document feels stale or contradicts the live design.

Treat the MCP output as the source of truth and update both this document
**and** the CSS in the same commit. Do not let the doc drift.
