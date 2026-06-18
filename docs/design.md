# Design — Wineury Portfolio

Internal design reference for this site. Sanitized for the public repo: intent, tokens, layout, motion, and imagery briefs only — no private research dumps or raw prompts from other tools.

**Validation status:** Draft v0.1 — loop iterations will walk each surface and mark sections ✅ when they match production.


| Surface               | Last reviewed | Status  |
| --------------------- | ------------- | ------- |
| Home — Work           | 2026-06-18    | Partial |
| Home — Exploration    | 2026-06-18    | Partial |
| Home — About          | 2026-06-18    | Partial |
| Case study (template) | 2026-06-18    | Partial |
| Backdrop / atmosphere | 2026-06-18    | Partial |
| Mobile chrome (docks) | 2026-06-18    | Partial |


---

## 1. Design intent

A single-page portfolio for an independent product designer. The experience should feel **editorial and calm**: one primary column, generous vertical rhythm, soft atmospheric background, and motion that explains hierarchy (home → case study) without stealing attention from the work.

**Principles**

1. **One column owns the story** — navigation lives in the margin or dock, never competing with copy width.
2. **Type does the hierarchy** — size steps are restrained; weight and color carry emphasis.
3. **Atmosphere, not decoration** — the glow/backdrop supports legibility; it is not a hero asset.
4. **Motion = spatial continuity** — enter/exit animations communicate depth (forward into a case, back to the list).
5. **Mobile-first chrome** — bottom docks replace side rails when the column is too wide for a left margin.

**References (public)**

- [Refero](https://refero.design) — design documentation tone: systematic, example-led, token-aware.
- [GoodTurn — visual viewport wrapper](https://goodturn.ai/p/gtp_01kt51vft4f1qt1gx08y3vn6h6) — mobile fixed UI anchoring (see `docs/agent-handoff.md` for implementation notes).
- [use-dynamic-viewport](https://github.com/rl0425/use-dynamic-viewport) — `--dvh` / keyboard-height patterns for mobile browsers.

---

## 2. Layout & grid

**Shell**

- Centered stage: `max-width: --content-max` (home) morphs to `--content-max-cs` (case study).
- Horizontal padding: `--page-pad`.
- Top padding: 100px desktop; mobile uses safe-area-aware shell padding.

**Rails & alignment**

- Desktop home (≥860px): sticky left rail; theme toggle fixed at the **same left anchor** as the rail.
- Desktop case (≥1024px): sticky `cs-rail` (Back + on-this-page); theme toggle uses case column math.
- Below those breakpoints: floating bottom docks (home bar, case dock) — compact pills, not full-bleed bars.

**Content column**

- Home copy column: 576px (`--content-max`).
- Case study column: `clamp(680px, 64vw, 880px)` (`--content-max-cs`).
- Main content is **mathematically viewport-centered**; no optical nudge on case study.

**Responsive grids inside case studies**

- `cs__cols--2` / `cs__cols--3`: multi-column on desktop; **single column at ≤560px** so personas and stats do not crush on phones.

---

## 3. Typography


| Role                  | Family | Size / leading   | Weight              |
| --------------------- | ------ | ---------------- | ------------------- |
| Display name          | Geist  | display scale    | 500                 |
| Section / case titles | Geist  | heading scale    | 500                 |
| Body                  | Inter  | 14px / 20px      | 400                 |
| Muted / meta          | Inter  | 14px / 20px      | 400, `--text-muted` |
| Labels / tabs         | Inter  | `--text-sm-size` | 400                 |


**Rules**

- Prefer **one body size**; differentiate with weight and `--text-muted` / `--text-strong`.
- Rich text highlights use `==double equals==` in content — rendered as accent emphasis, not a second font size.
- Line length: stay inside the content column; no full-bleed body copy on desktop.

---

## 4. Color & surfaces

Tokens live in `src/styles/tokens.css`. Do not hardcode hex in components.


| Token                                               | Role                                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `--bg`                                              | Page background                                              |
| `--text-default` / `--text-muted` / `--text-strong` | Copy hierarchy                                               |
| `--hover-lift`                                      | Interactive hover fills (tabs, dock, buttons)                |
| `--accent-`*                                        | Case study section accents (overview, research, personas, …) |
| `--focus-ring`                                      | Keyboard focus                                               |


**Surfaces**

- Docks and pills: `color-mix` on `--bg` + blur + `--surface-fill-shadow`.
- Media placeholders: dark tiles with corner radius; hero cover uses intrinsic aspect ratio.
- Backdrop: fixed bottom band + SVG legibility mask (not shifted with `--vvb`).

---

## 5. Motion

**Libraries:** Motion (React) for UI transitions; GSAP + ScrollTrigger for backdrop blob stretch.

**Hierarchy**


| Transition           | Pattern                                      | Duration feel                         |
| -------------------- | -------------------------------------------- | ------------------------------------- |
| Home → case          | Layout morph + opacity on home dim           | ~200–280ms                            |
| Case enter/exit      | `AnimatePresence` + shared layout where safe | ease-out                              |
| Tab / dock selection | `fillMorph` pill                             | fast                                  |
| Scroll reveals       | Stagger groups                               | respect reduced motion                |
| Backdrop blob        | GSAP height                                  | frozen under `prefers-reduced-motion` |


**Performance rules**

- Animate `transform` and `opacity` only on hot paths; avoid layout-affecting properties during enter/exit.
- Pair every enter with an exit; use `default="none"` if view transitions are added later.
- Honor `prefers-reduced-motion`: zero-duration view transitions, frozen grain, no stagger.

**Loop checklist (per animation pass)**

- Case study open/close: no layout thrash, no double-fade
- Dock sheet open/close: GPU-friendly transforms
- Tab pill morph: no repaints on unrelated tabs
- Backdrop: no jank when section changes

---

## 6. Imagery

Imagery is grouped by **role on the site**. **Midjourney 8.1 prompts apply only to atmospheric background plates** — not UI mockups, case covers, about photos, or exploration thumbnails (those stay real assets or placeholders).

### 6.1 Case study covers & hero media

**Existing:** `src/assets/case/` — e.g. `incity-cover.png`, flow recordings, posters.

**Treatment:** Cover keeps intrinsic aspect ratio; video in phone frame with synthetic status bar; captions follow `cs__figure` (title → summary → media). No generative prompts — ship real screenshots and recordings.

### 6.2 Backdrop & atmosphere (Midjourney 8.1)

**Existing:** `bg-6-11.png` (bottom glow band), SVG legibility mask `scrim-blob.svg`.

**Treatment:** Fixed to layout bottom; mask tracks content column X; blob height GSAP-stretched — must not use visual-viewport frame (regression: glow rides too high).

**Midjourney 8.1 — page background glow (dark mode)**

```
Abstract atmospheric light leak for dark UI, warm amber and cool blue gradients bleeding from bottom edge, heavy gaussian blur, no shapes, no text, no UI, seamless wide plate, extremely low contrast against #0a0a0a, editorial portfolio backdrop --ar 21:9 --style raw --v 8.1
```

**Midjourney 8.1 — soft scrim blob (mask reference plate)**

```
Single soft elliptical glow, feathered edges, monochrome warm gray on black, centered lower-third, extreme blur, for SVG mask reference only, no detail, no text --ar 1:1 --style raw --v 8.1
```

**Midjourney 8.1 — light mode variant (if needed)**

```
Same as dark glow plate but lifted luminance, pale cream and sky blue wash, still bottom-weighted, blur-heavy, no readable detail --ar 21:9 --style raw --v 8.1
```

### 6.3 About — personal photos

**Existing:** `src/assets/about/` — dogs, food, gym, travel, vinyl, collectibles.

**Treatment:** Hover-word reveals in About copy; photos are candid, not stock; consistent natural color. Real photography only.

### 6.4 Exploration embeds

**Existing:** `src/exploration/` — self-contained demos (e.g. wallet menu).

**Treatment:** Embedded as panels; exploration tab uses same home column; demos bring their own scoped CSS. No generative thumbnails.

### 6.5 Icons & tools

**Existing:** Phosphor + Central Icons; tool icons inline in case facts.

**Treatment:** 14–20px optical alignment with body line; no new icon families without reason.

---

## 7. Components (quick catalog)


| Component                     | Role                         |
| ----------------------------- | ---------------------------- |
| `Tabs` / `.rail`              | Home section nav             |
| `ThemeToggle`                 | Fixed anchor; dock on mobile |
| `CaseStudy` / `cs-rail`       | Case layout + TOC            |
| `cs-dock`                     | Mobile/tablet case chrome    |
| `Backdrop`                    | Glow + legibility mask       |
| `StaggerGroup` / `RevealItem` | Scroll reveal                |
| `HoverWord`                   | About photo reveals          |


---

## 8. Accessibility

- Skip link + landmarks preserved.
- Focus rings on all interactive chrome.
- `prefers-reduced-motion` disables non-essential animation.
- Touch targets: docks ≥44px; theme toggle matches dock height on mobile.
- Contrast: body text AA on `--bg`; muted text still readable.

---

## 9. Loop validation log

*Each iteration adds a row after reviewing a surface in dev/preview.*


| Date       | Iteration | Surface                         | Pass?   | Notes                                                                                                                                               |
| ---------- | --------- | ------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-06-18 | 18        | Preview + automated mobile      | Partial | Vercel preview loads after auth; scroll-spy + backdrop bottom OK on wide panel. Playwright iPhone 13 on localhost: 8/8 dock checks. Headless preview still SSO-blocked. |
| 2026-06-18 | 17        | CI — preview email              | Pass    | `preview-notify.yml` on `improvement` push; SMTP sent on df8116d.                                                                                    |
| 2026-06-18 | 16        | Case study TOC dock             | Partial | Scrim absolute in vv-frame; clip-path sheet; scroll closes sheet; backdrop `bottom: 0`. Device matrix §10 still pending.                           |
| 2026-06-18 | 15        | Loop idle @ device gate         | —       | Cadence → 20 min; awaiting iPhone test per §10. No further code changes until pass/fail.                                                            |
| 2026-06-18 | 14        | Device gate prep                | N/A     | Checklist in §10; `interactive-widget=resizes-content` on viewport (Android/Chromium; Safari ignores). App.jsx section banners trimmed.             |
| 2026-06-18 | 13        | Research — Safari 26.1 / 27     | N/A     | 26.1 fixes bottom gap on viewport-sized fixed containers (158055568); 27 beta adds scroll anchoring. vv-frame stays until device matrix confirms.   |
| 2026-06-18 | 12        | Research — Apple 800798         | N/A     | Fixed/sticky clipped below Liquid Glass chrome; validates vv-frame docks + safe-area; backdrop must stay layout-bottom.                             |
| 2026-06-18 | 11        | Motion perf (cross-surface)     | Partial | WordBento: `height` → `scaleY`+opacity (GPU); reduced-motion paths on bento + home dim. Case-study dock `y` on inner bar only (not fixed shell).    |
| 2026-06-18 | 10        | Research — `interactive-widget` | N/A     | WebKit 259770 still NEW; Safari ignores `resizes-content`. Portfolio vv-frame + hook remain correct iOS mitigation; meta optional for Android only. |
| 2026-06-18 | 9         | Home — About                    | Partial | Hover words + inline WordBento; Escape dismisses; copy-email + external links; RevealItem stagger. Portrait in header unchanged.                    |
| 2026-06-18 | 8         | Home — Exploration              | Partial | Stagger grid + live embeds; BorderBeam on hover/focus only; reduced-motion respected in dock path. Mobile dock vv-frame unchanged.                  |
| 2026-06-18 | 7         | Case study (template)           | Partial | Rail left-edge aligns with theme toggle ≥1024px; `.cs__cols--2` stacks ≤560px. Dock vv-frame matches home bar. Device test pending.                 |
| 2026-06-18 | 6         | Home — Work                     | Partial | List layout + mobile dock vv-frame; device scroll test pending.                                                                                     |
| 2026-06-18 | 4         | Backdrop / mobile chrome        | Partial | vv-frame on docks; backdrop layout-bottom. iOS 26/27 beta device test pending.                                                                      |


---

## 10. Device verification checklist (iOS 26 / 27 Safari)

Run on a **physical iPhone** with Safari developer beta. Record pass/fail per OS build in the validation log.


| #   | Scenario                                | Surfaces                   | Pass criteria                                   |
| --- | --------------------------------------- | -------------------------- | ----------------------------------------------- |
| 1   | Scroll down to hide address bar         | Home dock, case-study dock | Pill flush to visible bottom; no gap under dock |
| 2   | Scroll up to show address bar           | Docks                      | Dock tracks chrome; no jump or float            |
| 3   | Open case study → Back                  | Home + case study          | Motion clean; dock returns correctly            |
| 4   | Case study TOC dock (mobile)            | `cs-dock` sheet + pill     | Sheet and pill align; scrim covers content      |
| 5   | Keyboard open (email copy field if any) | About                      | No persistent gap after dismiss                 |
| 6   | Backdrop glow                           | Home, case study           | Glow does **not** lift into content on scroll   |
| 7   | Reduce Motion + Prefer Cross-Fade       | Docks                      | Still usable; no stuck float (Apple 800125)     |
| 8   | Safari tab modes                        | Bottom / Compact / Top     | Dock visible in each mode                       |


**Build matrix:** iOS 26.0 · 26.1+ (158055568) · iOS 27 dev beta.

---

## 11. Open design questions

1. Should case placeholders (`image` tiles) stay visible in production or hide until assets ship?
2. Should exploration thumbnails get unique art per demo or stay code-only?
3. Any brand photography direction beyond candid About photos?

