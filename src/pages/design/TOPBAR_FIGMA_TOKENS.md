# Kinetix — Figma display tokens (SF Pro)

> Figma source (topbar reference): [Testing → header.kx-topbar (218:184)](https://www.figma.com/design/ehQYOquLYoGBReIO32iya0/Testing?node-id=218-184&m=dev)
>
> This document is the contract for Cursor / Composer when applying display-font
> tokens in **`src/pages/design/KinetixPage.css`**. **Read this before adding
> typography to anything under `.kx-root` (the entire Kinetix page).**

---

## TL;DR

```css
.kx-root {
  font-family: var(--kx-font-display);
  font-weight: var(--kx-weight-regular); /* Medium (500) */
  font-feature-settings: 'ss01', 'cv11';
}
```

The **whole** Kinetix surface (`.kx-root`) uses the SF Pro display stack. The
semantic two-weight system is **`--kx-weight-regular`** and **`--kx-weight-strong`**,
which alias to **Medium (500)** and **Semibold (600)** only — no Bold (700).
This matches the topbar rule: two weights, no heavier step. **`--kx-font`** is
an alias of `--kx-font-display` for token compatibility only.

*(Figma node 218:184 may export `590` / Bold; the implemented product rule
supersedes that for weights only.)*

`--kx-weight-display` / `--kx-weight-display-strong` remain available for
rules that want to mirror Figma naming explicitly (e.g. topbar controls); they
match `--kx-weight-regular` / `--kx-weight-strong`.

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
--kx-font: var(--kx-font-display);
--kx-weight-display: 500;
--kx-weight-display-strong: 600;
--kx-weight-regular: var(--kx-weight-display);
--kx-weight-strong: var(--kx-weight-display-strong);
```

**Why this stack:** macOS / iOS users get the real SF Pro through `-apple-system`
and `BlinkMacSystemFont`. We don't ship SF Pro web fonts (Apple's license forbids
re-hosting), so the `'SF Pro …'` names cover sideloaded installs and the
`Inter` fallback covers everyone else with the closest matching metrics. No
network request is required — this is a system-font-first stack.

### Display weights

Exactly **two** CSS weights across the Kinetix page (aligned with the topbar):

| Token                          | Value | Name       | Use for                                        |
| ------------------------------ | :---: | ---------- | ---------------------------------------------- |
| `--kx-weight-display`          | `500` | Medium     | Default UI copy (also `--kx-weight-regular`).  |
| `--kx-weight-display-strong`   | `600` | Semibold   | Emphasis, chips, titles (`--kx-weight-strong`). |

**Rule:** Use only `--kx-weight-regular` / `--kx-weight-strong` or the equivalent
`--kx-weight-display*`. Do not use **`700`** (Bold) or ad-hoc **`590`** on this page.

### Display tracking

SF Pro renders best at small sizes when given a faint positive letter-spacing.
Figma's spec (`tracking-[0.1px]`, `tracking-[0.063px]`, etc.) maps to the
following em-relative tokens so they survive font-size changes:

| Token                            | Value     | Apply to                                     |
| -------------------------------- | --------- | -------------------------------------------- |
| `--kx-tracking-display`          | `0.008em` | Labels ~12.5px where Figma used +0.1px.      |
| `--kx-tracking-display-tight`    | `0.005em` | Semibold 12.5px actions (e.g. run / impact).|
| `--kx-tracking-display-tag`      | `0.01em`  | Small chips: `v4.2.1`, `+4`, `2 min ago`.    |

Prefer these over raw `letter-spacing: 0.00Npx` when the intent matches Figma
display chrome. Uppercase section titles may keep explicit `em` tracking
(e.g. `0.09em`) where they are not yet tokenized.

### Line height

The page reuses the existing leading tokens — **do not invent new px line-heights**:

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

When editing Kinetix (`KinetixPage.css` / `KinetixPage.jsx`), follow these rules.

### 1) Inherit, don't restate

`.kx-root` sets the display font stack. Prefer **`font-family: inherit`** on
buttons, inputs, and tabs instead of duplicating stacks or reintroducing Geist.

```css
/* ✅ Good */
.kx-tab {
  font-family: inherit;
  font-weight: var(--kx-weight-regular);
}

/* ❌ Bad */
.kx-tab {
  font-family: 'Geist Variable', sans-serif;
}
```

### 2) Two weights only — they are 590 and 700 here

Use **`--kx-weight-regular`** (590) and **`--kx-weight-strong`** (700). Do not
use `500` on this page for “regular” — it was removed in favor of the Figma /
SF Pro semibold axis.

### 3) Optional explicit Figma names

Use **`--kx-weight-display`** / **`--kx-weight-display-strong`** when mirroring
Figma layer names in new topbar-adjacent rules; they must stay equal to
regular / strong.

### 4) Pair these weights with the display stack only on Kinetix

Medium/Semibold (**500** / **600**) are defined for **`var(--kx-font-display)`**
on `.kx-root`. Do not assume the same numeric weights on other routes that use
Geist without checking `tokens.css`.

### 5) Leading tokens

Use **`--kx-leading-*`** for line-height; do not add raw `line-height: 15px`
for new rules.

### 6) Tracking tokens

Prefer **`--kx-tracking-display*`** over ad-hoc px letter-spacing when matching
Figma display chrome.

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
