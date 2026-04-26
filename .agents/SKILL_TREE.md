# Skill tree — `pf` portfolio (agent community)

How this works: before non-trivial UI, animation, a11y, or ship work, **pick skills marked Yes**; **No** skills are out of scope unless the product changes (e.g. a native app). This is a **routing map**, not a rating of quality.

**Spacing source of truth (Figma + web):** card insets and type stacks use the repo’s **8px grid** via `var(--spacing-*)` in `src/styles/tokens.css` (e.g. `spacing-4` = 16px, `spacing-5` = 20px, `spacing-2` = 8px). Warm work-card copy uses **16px** insets on small screens and **20px** on `sm+`, equal on left and bottom so text sits in the corner like a frame, not “floating” with uneven gaps.

---

## Layer 0 — Always in play

| Skill | Verdict | Reason |
| --- |:---:| --- |
| [emil-design-eng](skills/emil-design-eng/SKILL.md) | **Yes** | Default bar for motion (curves, duration, when *not* to animate); portfolio is occasional-use UI, not a 100×/day tool. |
| [design-taste-frontend](skills/design-taste-frontend/SKILL.md) | **Yes** | Ties type, rhythm, and component polish to a coherent “designed” feel. |
| [web-design-guidelines](skills/web-design-guidelines/SKILL.md) | **Yes** | Baseline heuristics (contrast, hit targets, forms) for shipped pages. |

---

## Layer 1 — This codebase (React + Vite + Motion)

| Skill | Verdict | Reason |
| --- |:---:| --- |
| [vercel-react-best-practices](skills/vercel-react-best-practices/SKILL.md) | **Yes** | Matches React 19 + Vite patterns; use for list perf, re-renders, bundling. |
| [vercel-react-view-transitions](skills/vercel-react-view-transitions/SKILL.md) | **Yes** | Case-study `ViewTransitionLink` and page continuity are in use. |
| [vercel-composition-patterns](skills/vercel-composition-patterns/SKILL.md) | **Yes** | When splitting compound UI (cards, stack sections); optional but aligned. |
| [framer-motion](skills/framer-motion/SKILL.md) | **Yes** | Motion library here is `motion` (Framer family); nuggets, cards. |

---

## Layer 2 — Motion, access, content

| Skill | Verdict | Reason |
| --- |:---:| --- |
| [accessible-motion](skills/accessible-motion/SKILL.md) | **Yes** | `prefers-reduced-motion` and hover affordances are required for the work grid. |
| [fixing-accessibility](skills/fixing-accessibility/SKILL.md) | **Yes** | Focus order, labels, and contrast on exploration + case templates. |
| [fixing-motion-performance](skills/fixing-motion-performance/SKILL.md) | **Yes** | Long scroll (Lenis) + hover chrome; use when jank appears. |
| [micro-interactions](skills/micro-interactions/SKILL.md) | **Yes** | Nugget stagger, work-card sweeps, small UI feedback. |

---

## Layer 3 — Optional / context-specific

| Skill | Verdict | Reason |
| --- |:---:| --- |
| [web-motion-design](skills/web-motion-design/SKILL.md) | **Yes** | Higher-level motion narrative when adding new sections or hero work. |
| [interaction-design](skills/interaction-design/SKILL.md) | **Yes** | When designing new flows (forms, tabs, not just animation curves). |
| [page-transitions](skills/page-transitions/SKILL.md) | **Yes** | Complements view transitions for route-level feel. |
| [deploy-to-vercel](skills/deploy-to-vercel/SKILL.md) | **Yes** | Production deploy; env and preview flows. |
| [gsap-greensock](skills/gsap-greensock/SKILL.md) / [gsap-scrolltrigger](skills/gsap-scrolltrigger/SKILL.md) | **Yes** | Repo uses GSAP/ScrollTrigger for section glue; use when changing scroll behavior. |
| [high-end-visual-design](skills/high-end-visual-design/SKILL.md) | **Yes*** | *Use sparingly* — for hero/flagship moments; can overlap design-taste; avoid compounding two “taste” skills on one pass without a reason. |
| [minimalist-ui](skills/minimalist-ui/SKILL.md) | **Yes*** | *Aligns* with current exploration minimal chrome; not mandatory if a section needs density. |
| [redesign-existing-projects](skills/redesign-existing-projects/SKILL.md) | **Yes** | When refactoring whole sections, not 5-line fixes. |
| [full-output-enforcement](skills/full-output-enforcement/SKILL.md) | **No** (default) | **No** for routine tasks — it’s a meta constraint skill; use only when a task explicitly requires complete output validation. |
| [vercel-react-native-skills](skills/vercel-react-native-skills/SKILL.md) | **No** | Web-only portfolio; no RN surfaces. |
| [industrial-brutalist-ui](skills/industrial-brutalist-ui/SKILL.md) | **No** | Visual brand is warm/minimal Figma exploration, not brutalist. |
| [lottie](skills/lottie/SKILL.md) / [lottie-bodymovin](skills/lottie-bodymovin/SKILL.md) | **No** (until) | **No** until we ship Lottie assets; then flip to **Yes** for that feature only. |
| [lazyweb-design-brainstorm](skills/lazyweb-design-brainstorm/SKILL.md) (and other `lazyweb-*`) | **No** (default) | **No** for implementation PRs; **Yes** for dedicated inspiration/research blocks when the user opts in. |

---

## How agents “vote”

- A task should **name 1–2 primary skills** (e.g. *emil-design-eng + framer-motion* for a new hover).
- If two skills **conflict** (e.g. “more motion” vs emil’s “don’t over-animate”): **emil-design-eng + accessible-motion** win on motion frequency and reduced motion.
- **12+ skills** with firm yes/no are listed above; **No** means *deferred or wrong medium*, not “bad skill.”

---

*Last updated: work-card warm footer spacing + skill tree intro.*
