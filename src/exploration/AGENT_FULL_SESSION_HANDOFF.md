# Full session handoff — Winnie exploration & portfolio UI

This document captures **user requests, decisions, and implementation state** across the Cursor sessions that built out the Winnie marketing page, tokens, motion, stack, contact row, and related fixes. It is meant for the **next agent** so nothing material is lost.

**Shorter maintenance doc:** `AGENT_HANDOFF.md` (some bullets there may lag this file; prefer this doc for nuance).

---

## 1. Product / UX intent

- **Winnie exploration** is a one-page marketing layout: **sticky left aside** (intro, hero, tabs, stack marquee, contact) + **right column** (work gallery and downstream sections). Tab selection syncs to scroll position via **`useWinnieSectionScroll`** + **ScrollTrigger**; smooth scroll via **Lenis** (`LenisProvider`).
- **Motion:** `motion/react` (Framer Motion successor). Respect **`useReducedMotion()`** for cursor, hero word rotation interval, sparkle run class, tab motion, work nuggets, etc.
- **A11y:** Skip link in `App.jsx`, `aria-live` on rotating headline, tablist semantics, decorative sparkles `aria-hidden`, contact `aria-label` on links.
- **Brand:** Cyan primary **`#00aaff`** (Figma exploration); tokens as **`--wx-*`** on `:root` in `src/styles/tokens.css`.

---

## 2. Chronological themes from user messages (what was asked → what shipped)

### 2.1 Stack marquee — official colored logos

- **Ask:** Each tool in the stack row should use **official logos with brand color**, not generic icons.
- **Ship:**
  - `stackToolLogoUrl(tool)` in `WinnieExplorationPage.jsx`: `logoUrl` if set, else `https://cdn.simpleicons.org/${brandSlug}` (SVG includes `fill`).
  - **`StackToolIcon`:** `<img>` with `referrerPolicy="no-referrer"`, fallback to Hugeicons only if no URL/slug.
  - **Adobe:** `cdn.simpleicons.org/adobe` **404** → local **`public/stack-logos/adobe.svg`** with `#ED2224`.
  - **VS Code:** Wikimedia SVG URL in content (full-color style).
  - Others: **Figma, Framer, Rive, Blender, GitHub** via **`brandSlug`**.

### 2.2 Hero headline — alignment, sparkles, frame size, motion polish

- **Ask (multiple turns):** Baseline alignment with “Designs that feel”; sparkles **not staggered** (same time, mirrored paths); remove gap under rotating word; text **bottom-aligned** in clip frame; frame **matches word width** for animation; **no stretch** during transitions; sparkles **only after** word finishes sliding in.
- **Ship (evolution):**
  - **Inline flow** (`wx-headline-line` / `wx-headline-static` + `wx-alive`) instead of flex row for baseline.
  - **`leading-none`**, **`line-height: 1`**, mask **`inline-flex` + `justify-content: flex-end`**, **`height: 1em`**, **`width: max-content`** on mask and word so clip matches glyphs.
  - **Removed** fixed **`min-width: 11ch`** so slot width follows each word (sparkle anchors stay correct).
  - **Removed** stagger: single `animation-delay` rule for both sparkles (then **removed delay stagger** between L/R — same keyframes).
  - **Latest (this session):**
    - **Removed `layout` from `motion.span` wrapper** around `wx-headline-word-wrap` (reverted to plain **`span`**) to stop **width/layout animation stretching** the text.
    - **Sparkle CSS:** `animation-delay: var(--wx-headline-word-enter-duration)` where **`--wx-headline-word-enter-duration: 0.26s`** is set on `.winnie-exploration` and **`HEADLINE_WORD_ENTER_DURATION = 0.26`** in JS — **must stay in sync**.
    - Sparkle wrappers changed from **`motion.span`** to **`span`** (no layout side effects); still **`key`** includes `activeWord` to remount per word.
  - **Framer:** `AnimatePresence mode="popLayout"` on the word; enter/exit **y + opacity**; interval **3.5s** (`useEffect`).

### 2.3 Stack section copy

- **Ask:** Remove subtitle under “Stack” (“Design, motion, 3D…”).
- **Ship:** Paragraph removed from `WinnieExplorationPage.jsx`; label + marquee only.

### 2.4 Site-wide tokenization

- **Ask:** Entire site should be **tokenized**.
- **Ship:**
  - **`src/styles/tokens.css`:** `:root` gains **`--wx-*`** (Winnie), **`--nt-*`** (nugget lab chrome), **`--chip-lab-*`** (demo chips), derived shadows/scrim/tab shadows, etc.
  - **`winnie-exploration.css`:** No local `--wx-*` block; uses tokens + semantic **`var(--wx-*)`**; literals replaced where possible.
  - **`nugget-test.css`:** Uses **`var(--nt-*)`** and **`var(--color-*)`**.
  - **`WinnieExplorationPage.jsx`:** Borders/rings use **`var(--wx-border-soft)`**, **`var(--wx-ring-subtle)`**, tab shadows **`var(--wx-tab-shadow-active|idle)`**, motion colors **`var(--wx-primary)`** / **`var(--wx-tab-idle)`**; **`labelOnChipFill`** returns **`var(--color-neutral-1000|0)`**.
  - **`NuggetTestPage.jsx`:** Chips use **`var(--chip-lab-*)`**; **`CHIP_LAB_LUMA`** map for luminance (must match hex in tokens).
  - **Note:** **`winnie-content.js`** work-card **nugget `color` hex** remain content data (not all lifted to tokens).

### 2.5 Aside header row — center vs space-between

- **Ask:** First “center” was misread; user wanted **vertical center** of logo + tabs but **horizontal space-between** (not centered as a group).
- **Ship:** `sm:items-center sm:justify-between`; tab track **`flex-1 justify-end`**; wordmark left-aligned again (removed centered text on mark).

### 2.6 Stack row — engineering tools

- **Ask:** Add what strong UI engineers should know (DB, full stack, etc.).
- **Ship:** **`WINNIE_STACK_TOOLS`** extended with **React, TypeScript, Next.js, Tailwind CSS, Storybook, Vite, PostgreSQL, Supabase** (`brandSlug` + `brandHex`).

### 2.7 Stack marquee speed

- **Ask:** Marquee too fast.
- **Ship:** **`wx-stack-marquee__inner`** animation **22s → 50s** (`winnie-exploration.css`).

### 2.8 Studio capabilities — per-item color

- **Ask:** Each capability its own color.
- **Ship:** **`accent`** hex on each **`WINNIE_CAPABILITIES`** entry; **`style={{ "--wx-cap-accent": cap.accent }}`** on `<li>`; **`.wx-capability-icon`** / **`.wx-capability-title`** use `color-mix` + accent in CSS.

### 2.9 Contact row — logos then monochrome Phosphor

- **Ask:** Official logos for LinkedIn, X, Instagram, Email → then **black and white**, use Phosphor if needed.
- **Ship:**
  - Added **`@phosphor-icons/react`**.
  - **Deep imports** (tree-shake):  
    `@phosphor-icons/react/dist/csr/LinkedinLogo` (and **InstagramLogo**, **XLogo**, **Envelope**).
  - **`WINNIE_CONTACT_SOCIALS`** uses **`icon: "linkedin" | "x" | "instagram" | "email"`** → **`CONTACT_PHOSPHOR_ICONS`** map.
  - **`weight="regular"`**, **`size={18}`**, **`currentColor`** via **`.wx-contact-pill__phosphor`** (inherits **`--wx-ink`**, hover **`--wx-primary`**).
  - Removed Simple Icons `<img>` path for contact.

---

## 3. Key source files (quick map)

| File | Role |
|------|------|
| `src/exploration/WinnieExplorationPage.jsx` | Page shell, `AsideHeroHeadline`, tabs, work grid, stack, contact, dot cursor, GSAP/Lenis hooks |
| `src/exploration/winnie-content.js` | All copy: sections, work, stack, contact, capabilities, FAQ, stats, clients |
| `src/exploration/styles/winnie-exploration.css` | Winnie-specific layout + hero + stack marquee + tabs + CTAs + capabilities + sparkles |
| `src/exploration/styles/nugget-test.css` | `/nugget_test` lab page chrome |
| `src/exploration/useWinnieSectionScroll.js` | Scroll ↔ selected tab index |
| `src/styles/tokens.css` | Global + `--wx-*` + `--nt-*` + `--chip-lab-*` |
| `src/App.jsx` | Renders `WinnieExplorationPage`, skip link |
| `public/stack-logos/adobe.svg` | Adobe mark (Simple Icons CDN 404 for `adobe`) |

---

## 4. Headline + sparkles — implementation checklist (current)

- **Constants:** `HEADLINE_ROTATE_WORDS`, `HEADLINE_WORD_ENTER_DURATION = 0.26` (sync with CSS `--wx-headline-word-enter-duration`).
- **No `layout` animation** on the word-wrap (avoids stretched text during width changes).
- **Sparkles:** class **`wx-sparkle--run`** only when `!reduceMotion`; CSS **`animation-delay`** equals word enter duration.
- **Sparkle keyframes:** `wx-sparkle-arch` **0.72s**; L/R paths mirrored; **no** opposing `animation-delay` between sides.
- **Figma asset:** `WINNIE_FIGMA_ASSETS.headlineSparkle` for sparkle image.

---

## 5. Stack marquee (technical)

- **Duplicated** tool list in DOM for seamless loop; second set **`aria-hidden`**.
- **CSS:** `wx-marquee-x` translate **-50%**; **50s** linear infinite; pause on hover/focus-within.
- **Mask:** gradient fade on edges using **`var(--wx-mask-solid)`** (neutral-1000).

---

## 6. Work cards & nuggets

- **Pattern:** Nugget lab–style: scrim, center copy, chips anchored bottom-center; **`labelOnChipFill`** for #000/#fff on chip fills (via CSS vars).
- **Motion constants:** `WX_NUGGET_*` in `WinnieExplorationPage.jsx` — intentionally aligned with `NuggetTestPage.jsx` patterns (see `AGENT_HANDOFF.md`).

---

## 7. Dependencies (notable)

- `motion`, `lenis`, `gsap` (+ ScrollTrigger registration in `@/lib/gsap.js`)
- `@hugeicons/react` + `@hugeicons/core-free-icons`
- `@phosphor-icons/react` (**per-icon** `dist/csr/*` imports in `WinnieExplorationPage.jsx` for contact row only)
- `tailwindcss` v4, `@tailwindcss/vite`
- `react-router-dom` (Nugget test route if wired in router)

---

## 8. Build / verify

```bash
npm run build
```

Watch for: chunk size warning on main bundle; Phosphor **must** stay on deep imports (~474 modules) vs barrel import (~5000+).

---

## 9. Known caveats / follow-ups

- **Simple Icons CDN:** occasional **404** or hotlink quirks → mirror under `public/` + **`logoUrl`** (Adobe pattern).
- **Wikimedia** VS Code URL: may **429** automated probes; browsers usually OK.
- **`HEADLINE_WORD_ENTER_DURATION`** and **`--wx-headline-word-enter-duration`** must stay equal if either changes.
- **`AGENT_HANDOFF.md`** may still mention old stack CDN pin / marquee absence — **this file** is the fuller truth.
- **Work nugget hex** in `winnie-content.js` could be migrated to tokens if you want 100% CSS-var-driven content colors.

---

## 10. User rules / repo rules (reminders)

- **`CLAUDE.md`:** tokens, merge order of skills, design stack notes.
- Prefer **minimal diffs**, **no drive-by refactors**, match existing style.
- **Accessibility + motion:** reduced motion paths for headline, marquees, transitions where implemented.

---

*Generated as a consolidated handoff for continuity; amend as the product evolves.*
