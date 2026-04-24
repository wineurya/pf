# Winnie exploration — FAQ & session notes

This file records the **on-page FAQ** copy (source of truth: `src/exploration/winnie-content.js`) and summarizes **design and implementation work** on the Winnie exploration page.

---

## FAQ (live copy)

These questions and answers power the **FAQ** block in the Approach panel. The UI uses a **Motion**-driven accordion (`WinnieFaqAccordion` in `WinnieExplorationPage.jsx`): smooth height/opacity open and close, chevron rotation, `aria-expanded` / `aria-controls` / `role="region"`, and instant transitions when `prefers-reduced-motion` is on.

### How do you scope a project?

A short paid discovery to define the promise, audience, and success metric. Then a fixed-fee build with clear milestones and a single point of contact.

### Do you work with in-house teams?

Often. I partner with founders, creative directors, and engineering leads — and hand off a system your team can own without me.

### What's the typical timeline?

Four to eight weeks for a focused marketing site. Product and brand systems usually run eight to sixteen weeks depending on scope.

### Can you code the design yourself?

Yes. Design and engineering are the same conversation here — no throw-over-the-wall handoffs.

---

## What we built or refined (reference)

| Area | Notes |
|------|--------|
| **Layout** | Aside vs panels: aside uses `lg:basis-[var(--wx-explore-aside-basis)]` with `--wx-explore-aside-basis: min(42%, 36rem)` in `src/styles/tokens.css` so the right column (`#winnie-panels`) reads wider than a strict 50/50 split. |
| **Stack marquee** | Two lanes (design vs build/AI); neutral pill styling aligned with primary/secondary CTA language; padding + negative margin on `.wx-stack-marquee` to reduce shadow clipping. Subtitles under tool names were removed. Tools include Firebase, Claude, ChatGPT, and the rest of the stack from `WINNIE_STACK_MARQUEE_LAYERS`. |
| **Stack logos** | `logoUrl` overrides Simple Icons CDN when needed. **Claude** uses the local vector mark `public/stack-logos/claude.svg` (product-style spark, not the corporate wordmark). **Adobe** uses `public/stack-logos/adobe.svg`. **ChatGPT** may use an external SVG URL in content; VS Code uses Wikimedia. |
| **Headline** | Sparkle / hero headline motion: brief blur at intro, then opacity/transform; lighter treatment on exit; rhythm and spacing tuned in CSS. |
| **Tokens** | Neutrals and scrim text tokenized (`--wx-white`, `--wx-black`, `--wx-on-scrim`, etc.) in `tokens.css` for consistent light/dark and overlay copy. |
| **Motion safety** | Marquee animation pauses under `prefers-reduced-motion`; FAQ and other transitions respect the same flag via the page’s `reduceMotion` path. |
| **Scroll** | Lenis integration remains the scroll foundation for the exploration page (see `LenisProvider` / page wiring). |

---

## Source map

| Concern | Location |
|---------|----------|
| FAQ copy | `src/exploration/winnie-content.js` → `WINNIE_FAQ` |
| FAQ UI | `src/exploration/WinnieExplorationPage.jsx` → `WinnieFaqAccordion` |
| FAQ styles | `src/exploration/styles/winnie-exploration.css` → `.wx-faq-*` |
| Stack data | `winnie-content.js` → `WINNIE_STACK_MARQUEE_LAYERS` |
| Stack logo URL helper | `WinnieExplorationPage.jsx` → `stackToolLogoUrl` |
| Design tokens | `src/styles/tokens.css` |

---

## Follow-ups (optional)

- Mirror **ChatGPT** to a local `public/stack-logos/chatgpt.svg` for parity with Claude/Adobe.
- **Route-level** or **View Transition API** polish for the aside header if navigation moves beyond in-page sections.
