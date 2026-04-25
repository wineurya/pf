# Wineury.design Claude Master File
_Last updated: 2026-04-24_

## How to use this file with Claude on a low-cost/token-salvage plan

This is the master source-of-truth file for improving `wineury.design`.

Use it like this:

1. Do **not** paste the full file every time.
2. Paste only the section Claude needs:
   - For homepage copy: paste `<identity>`, `<homepage>`, `<positioning>`, and `<voice_rules>`.
   - For a project rewrite: paste that one `<project>` block plus `<case_study_template>`.
   - For SEO metadata: paste `<route_inventory>` and `<metadata_targets>`.
   - For accessibility/UX cleanup: paste `<ux_audit>`, `<accessibility_rules>`, and the relevant page/project block.
3. Ask Claude to quote or list evidence first before rewriting.
4. Tell Claude not to invent metrics, team sizes, dates, screenshots, or tools.
5. Save only approved rewrites back into this file.

### Best cheap Claude workflow

```text
Paste one section → ask for an audit → approve fixes → ask for rewrite → paste into site → repeat.
```

### Main instruction to Claude

```text
You are helping improve Wineury Almonte's UX/Product Design portfolio at wineury.design.

Use only the facts in the provided section. Do not invent metrics, dates, companies, tools, roles, images, or outcomes.

Improve clarity, recruiter scanability, product design credibility, UX writing, accessibility, SEO, and modern portfolio polish.

Keep the tone human, sharp, confident, and not overly corporate. Avoid em dashes. Use plain language. Prioritize evidence, process, decisions, and outcomes.
```

---

<identity>

## Identity / About Wineury

### Canonical profile

**Name:** Wineury Almonte  
**Preferred name:** Wineury  
**Nickname options:** Winnie, Ex  
**Public role:** UX/Product Designer  
**Secondary role phrasing:** UX/UI Designer, Product Designer, Interaction Designer  
**Location:** Atlanta metro area / Georgia  
**Portfolio:** `https://wineury.design`  
**LinkedIn:** `linkedin.com/in/wineury`  
**Email:** `wineurya30@gmail.com`  
**Phone:** 404-512-3326  
**Use phone publicly:** Optional. Better for resume PDF only, not homepage.

### Education

**Kennesaw State University**  
Bachelor of Science in Interactive Design  
Minor in Computer Science  
Graduated May 2025

Relevant strengths from education:
- Interaction design
- UI design
- UX research
- Ethnography for designers
- Usability testing
- Visual design
- Motion design
- Front-end development
- Human-computer interaction
- Accessibility

### Certifications

- Google UX Design Certificate
- CITI Human Subjects Research

### Current professional positioning

Wineury is a UX/Product Designer focused on creating clear, accessible, and useful digital experiences. His strongest portfolio angle is translating confusing systems into better flows, especially civic services, safety-focused products, habit tracking, and service-heavy interfaces.

### Best short positioning options

Use one of these depending on the site direction:

**Option A, recruiter-friendly:**
> UX/Product Designer creating clear, accessible digital experiences through research, prototyping, and thoughtful interaction design.

**Option B, more personal:**
> I design digital experiences that make complex systems feel easier, clearer, and more human.

**Option C, portfolio hero:**
> Designing with clarity, purpose, and a strong eye for the people behind every interaction.

**Option D, product-focused:**
> Product designer focused on simplifying complex flows, improving trust, and turning research into usable interface decisions.

**Option E, civic/service design angle:**
> UX/Product Designer helping service-heavy systems become easier to understand, use, and trust.

### Personal design motivation

Wineury’s design motivation is rooted in helping people navigate complex systems. A strong personal theme is being the person who interprets confusing platforms, forms, and service systems for others, then turning that frustration into better UX decisions.

Use this theme carefully. It can support an About page, but it should not become too long on the homepage.

### Skills

#### Product / UX
- UX research
- Product design
- User interviews
- Usability testing
- Journey mapping
- Heuristic evaluation
- Competitive audits
- Affinity mapping
- Personas
- User flows
- Wireframing
- Prototyping
- Interaction design
- Design systems
- Accessibility
- WCAG best practices
- Design QA
- Handoff documentation

#### UI / Visual
- Interface design
- Visual hierarchy
- Typography
- Layout systems
- Responsive design
- Mobile-first design
- Motion design
- Microinteractions
- Branding
- Editorial-style layouts

#### Tools
- Figma
- Framer
- Rive
- Adobe Photoshop
- Adobe Illustrator
- Adobe After Effects
- Miro
- Notion
- Blender
- VS Code
- Cursor

#### Front-end / Technical
- HTML
- CSS
- JavaScript
- React
- Tailwind CSS
- jQuery
- GSAP
- Python
- Java
- C++
- Three.js
- Node.js

### Resume-friendly experience

#### Stratix, Service Technician
Potential framing:
- Diagnose, repair, and document hardware/software issues across deployed devices.
- Support device workflows involving warranty, troubleshooting, and repeatable technical processes.
- Translate technical issues into clear documentation and actionable next steps.

#### Metro by T-Mobile, Sales Associate
Potential framing:
- Helped 20+ customers per day understand devices, plans, onboarding, and troubleshooting.
- Used customer-facing problem solving to reduce confusion and repeat visits.
- Gathered informal usability feedback from real customers dealing with technical services.

### Do not overemphasize

- Age.
- “Student project” language.
- “Aspiring” language.
- Generic passion statements.
- Too many tools at once.
- Playlist or personality cards before work proof.
- Grand agency/freelance claims unless the site is intentionally selling services.

</identity>

---

<voice_rules>

## Voice and writing rules

### Wineury's preferred tone

- Human
- Confident
- Simple
- Slightly personal
- Clean and recruiter-friendly
- Not robotic
- Not overly academic
- Not stuffed with buzzwords
- Strong but not exaggerated

### Avoid

- Long dashes / em dashes.
- Overexplaining.
- Empty phrases like “I am passionate about creating innovative solutions.”
- “Aspiring designer.”
- “Student project” unless context requires it.
- Inflated claims that cannot be defended.
- Too many adjectives in a row.
- Corporate-sounding filler.

### Use

- Short direct sentences.
- Strong verbs.
- Clear outcomes.
- Evidence-first claims.
- Concrete design decisions.
- “I” when writing personal/about copy.
- “We” only when describing team project work.
- First person for freelance identity, not “Winnie Studio helps...”

### Preferred phrasing style

Instead of:
> I am passionate about leveraging user-centered design methodologies to create impactful solutions.

Use:
> I design clearer digital experiences by turning research, messy flows, and real user feedback into interfaces people can actually use.

Instead of:
> A mobile app designed to enhance the user experience of civic reporting.

Use:
> A mobile-first redesign of ATL311 that helps residents report issues faster, track case progress, and understand what happens next.

</voice_rules>

---

<route_inventory>

## Current wineury.design route inventory

Based on the research crawl, these are the main observed routes.

| Route | Status | Purpose | Recommendation |
|---|---|---|---|
| `/` | live current | Current homepage with hero, selected projects, process, about, skills/goals, playlist, resume/contact CTAs | Keep and improve |
| `/cases` | live current | Case-study index listing Siren, Resolutions, Logitech, and InCity | Keep, possibly rename nav label to Work |
| `/incity` | live current | Standalone InCity case study | Keep as flagship |
| `/cases/siren` | live current | Siren case study | Keep and strengthen outcomes |
| `/cases/resolutions` | live current | Resolutions case study | Keep, but improve proof and story |
| `/cases/logitech` | linked but unretrieved | Logitech promotional website case | Fix route or remove from main grid until complete |
| `/old-home` | legacy live | Older homepage/resume/project content | Redirect, noindex, or migrate useful content then retire |
| `/about` | placeholder or legacy | Generic template-like About page with placeholder language | Delete, redirect, or fully rebuild |
| `/projects` | nav referenced, unverified | Possible older projects route | Verify and redirect if unused |
| `/resume` | nav referenced, unverified | Possible resume route | Create proper internal resume page or redirect to resume PDF |

### IA diagnosis

The site has strong work, but the route structure creates confusion. Current home, old home, placeholder About, and separate case routes feel like different versions of the portfolio.

### Recommended canonical IA

```text
/
  Home

/work or /cases
  Project index

/work/incity or /incity
  InCity flagship case study

/work/siren or /cases/siren
  Siren case study

/work/resolutions or /cases/resolutions
  Resolutions case study

/about
  Real About page, not placeholder

/resume
  Internal HTML resume page + PDF download

/contact
  Optional, or contact section on homepage only
```

### Strong recommendation

Use either `/work` or `/cases`, not both publicly.

Best option:
- Nav label: **Work**
- Route: `/cases` can stay if already indexed
- Page H1: **Selected Work**
- Redirect `/projects` to `/cases`
- Redirect `/old-home` to `/`
- Rebuild or redirect `/about`
- Fix or remove `/cases/logitech`

</route_inventory>

---

<homepage>

## Homepage current content and improvement direction

### Observed homepage themes

The current homepage includes:
- Hero message around “Designing with clarity and purpose.”
- UX/Product Designer positioning.
- Selected projects.
- Process section.
- About section.
- Skills/tools.
- Goals or directional chips.
- Playlist card.
- Resume teaser.
- Contact CTAs.
- External links such as LinkedIn, X, Email, Spotify.

### Homepage strengths

- Has personality.
- Clear visual taste.
- Good direction around clarity and purpose.
- Shows selected projects.
- Includes process, not just visuals.
- Gives a sense of the person behind the work.
- Good potential for a modern, lively portfolio.

### Homepage problems

- Too many competing signals.
- Personal/playlist/goal content may appear before proof.
- Role labels may be inconsistent.
- Some content appears repeated in crawl.
- Generic page title reduces search clarity.
- Work proof should be easier to scan.
- Project outcomes should appear earlier.
- Mobile recruiter experience should be prioritized.

### Homepage priority

The homepage should answer these in the first 10 seconds:

1. Who are you?
2. What kind of designer are you?
3. What proof do you have?
4. What should I click first?
5. How can I contact you?

### Recommended homepage structure

```text
1. Hero
   - Name
   - Role
   - One sharp sentence
   - Primary CTA: View Work
   - Secondary CTA: Resume or Contact

2. Featured proof strip
   - InCity: 6 to 3 steps / 50% faster / accessibility
   - Siren: safety-first dating app / usability testing / reduced onboarding drop-off if verified
   - Resolutions: habit tracking / simplified goal flow / completion improvement if verified

3. Selected Work
   - InCity as flagship
   - Siren
   - Resolutions
   - Logitech only if complete

4. How I Work
   - Research
   - Structure
   - Prototype
   - Test
   - Refine / Handoff

5. About
   - Short personal paragraph
   - Design motivation
   - Tools/skills in small groups

6. Resume / Contact
   - Resume download
   - Email
   - LinkedIn

7. Optional personality
   - Playlist, photography, creative coding
   - Keep lower on page
```

### Homepage hero rewrite options

#### Option 1, clean and direct
```text
Wineury Almonte is a UX/Product Designer designing clearer, more accessible digital experiences for complex service flows.
```

#### Option 2, more human
```text
I design digital experiences that make messy systems feel clear, usable, and human.
```

#### Option 3, product-design focused
```text
UX/Product Designer focused on research-backed flows, accessible interfaces, and interaction details that help people move with confidence.
```

#### Option 4, portfolio polish
```text
Designing with clarity and purpose across civic tools, safety-first products, and everyday systems people rely on.
```

#### Option 5, strongest homepage direction
```text
I’m Wineury, a UX/Product Designer turning confusing service flows into clearer, faster, and more accessible digital experiences.
```

### Homepage CTA recommendations

Primary:
- View My Work

Secondary:
- Download Resume
- Contact Me
- Connect on LinkedIn

Avoid:
- Too many social links in hero
- “Learn More” as the primary CTA
- Resume only in external Drive link without an internal page

### Homepage design coaching

Keep the liveliness, but make it controlled. The portfolio can have dynamic cards, motion, hover states, playlist energy, or condition-based details, but recruiters should never have to fight the site to understand the work.

Good lively ideas:
- Small “today’s design note” card.
- Dynamic mood/weather/process note.
- Currently exploring section.
- Small microinteraction on project cards.
- Subtle ambient gradient.
- Scroll-highlighted case study proof.
- “Design principle of the day.”
- “What I’m currently improving.”
- “Current focus: accessibility, motion, civic tech.”

Do not let dynamic content outrank:
- Project proof.
- Resume.
- Contact.
- Case studies.

</homepage>

---

<project_index>

## Project index / cases page

### Observed projects

The `/cases` page lists:

1. Siren: Safety Oriented Dating App
2. Resolutions: Habit Tracker App / Website
3. Logitech: Superlight Promotional Website
4. InCity: Community Based Compliance App / ATL311 redesign

### Project index strengths

- Clean enough to understand the portfolio project set.
- Shows more than one type of design problem.
- Has a mix of civic tech, safety/social, productivity, and promotional/web design.
- Can act as the canonical Work page.

### Project index issues

- It should not include Logitech if the linked route is broken/incomplete.
- InCity should likely be first because it is the strongest and most professional.
- Cards should show role, problem, and measurable outcome.
- Project order should match hiring strategy.

### Recommended project order

1. **InCity**
   - Strongest flagship
   - Civic tech, accessibility, mobile flow, product thinking
   - Best research proof

2. **Siren**
   - Strong safety/trust angle
   - Good Lean UX/sprint/process story
   - Strong usability testing narrative

3. **Resolutions**
   - Good app/product flow
   - Needs stronger metrics but still useful

4. **Logitech**
   - Only keep if rebuilt or clearly shown as a visual/web design case

### Suggested project card format

```text
Project name
One-line product context

Role: Lead Product Designer / UX/UI Designer
Focus: Research, flow redesign, prototyping, accessibility
Impact: Verified metric or qualitative outcome

CTA: View Case Study
```

### Strong card copy

#### InCity
```text
A mobile-first redesign of ATL311 that helps residents report non-emergency issues faster, track progress, and understand city updates.
```

#### Siren
```text
A safety-first dating app concept exploring trust signals, behavior reporting, and video verification through iterative usability testing.
```

#### Resolutions
```text
A habit-tracking experience designed to help users organize goals, routines, and progress without bouncing between multiple apps.
```

#### Logitech
```text
An interactive promotional website concept for the Logitech G PRO mouse, focused on specs, motion, and product storytelling.
```

</project_index>

---

<project id="incity">

# Project: InCity

## Canonical summary

InCity is a mobile-first civic reporting and compliance app concept that reimagines ATL311. It helps Atlanta residents report non-emergency issues faster, track case status, use location-based reporting, and stay informed about city updates.

## Strongest positioning

This should be the flagship portfolio case study.

Why:
- It has the clearest real-world problem.
- It connects to civic tech and public service.
- It has research, stakeholder input, audits, personas, wireframes, final designs, and measurable claims.
- It shows UX/Product Design maturity beyond visual polish.

## Observed project details

### Project name variations

Observed:
- InCity
- InCity UX Case Study
- InCity Community Based Compliance App
- ATL311 redesign

Recommended public name:
```text
InCity: Redesigning ATL311 for Faster Civic Reporting
```

Alternative:
```text
InCity: A Clearer Mobile Flow for Civic Reporting
```

### Role

Observed:
- Lead UX Designer
- Researcher
- Team project with six members

Recommended role line:
```text
Role: Lead UX Designer / Researcher
Team: 6 designers
Focus: Civic reporting, mobile UX, accessibility, research synthesis, prototyping
```

### Problem

The existing ATL311 experience was framed as:
- Desktop-centric.
- Hard to navigate on mobile.
- Too many steps.
- Unclear confirmation.
- Weak case tracking.
- Residents may abandon reports due to friction.
- Users need clearer status updates and service feedback.

### Solution

InCity proposes:
- A mobile-first reporting flow.
- Fewer steps.
- Geotagged reporting.
- Standardized checklists.
- Live status tracking.
- Confirmation and proof of submission.
- City updates and possibly transit-related information.
- Accessibility improvements such as variable text sizing and light/dark mode.

### Process

Observed process includes:
- Interviews with Atlanta residents.
- Interviews or consultation with city officials.
- Mention of Marty Hughes, Assistant City Manager of Kennesaw.
- Competitive audit of NYC311, Austin311, and CHI311.
- Literature review around accessibility and smart city products.
- Affinity mapping / FigJam synthesis.
- Personas.
- Wireframes.
- Prototype.
- Final UI.

### Metrics and claims

Important: metrics conflict across pages. Keep a metric registry.

Observed / known claims:
- Reduced report flow from 6 steps to 3 steps.
- Task completion roughly 50% faster.
- WCAG accessibility improvements.
- Live status tracking added.
- Confirmation for cases/payments.
- Variable text sizing.
- Light/dark mode.
- No abandoned submissions in testing, according to observed crawl.
- Error rate dropped from 30% to around 5%, according to observed crawl.
- 75% faster task completion, according to observed crawl.
- Legacy page mentions 28% engagement increase.
- Legacy page mentions 40% faster issue resolution.

Recommended public metric set, safest:
```text
Reduced the core reporting flow from 6 steps to 3, making issue submission faster and easier to understand during prototype testing.
```

Use only if verified:
```text
Testing showed about 50% faster task completion and fewer submission errors after simplifying the report flow.
```

Avoid unless proof exists:
```text
75% faster task completion.
28% engagement increase.
40% faster issue resolution.
```

These can be used if backed by notes, testing logs, or professor/project data.

## Suggested case study structure

### 1. Hero

```text
InCity
Redesigning ATL311 into a clearer mobile-first reporting experience.

A civic UX case study focused on reducing friction in non-emergency issue reporting, improving status visibility, and making city services easier to use on mobile.
```

### 2. Project snapshot

```text
Role: Lead UX Designer / Researcher
Team: 6 designers
Timeline: [confirm]
Tools: Figma, FigJam, research synthesis, prototyping
Focus: Mobile UX, civic reporting, accessibility, status tracking
```

### 3. Problem

```text
Residents rely on ATL311 to report non-emergency issues, but the existing experience can feel desktop-first, cluttered, and unclear on mobile. Reporting an issue takes too many steps, and users may not feel confident that their submission was received or being handled.
```

### 4. Research

Include:
- Resident interviews.
- City official insight.
- Competitive audit.
- Literature review.
- Synthesis board.
- Key pain points.

### 5. Key insights

Potential rewrite:
```text
The biggest issue was not just reporting. It was confidence. Users needed to know what to submit, where their report went, and what would happen after tapping send.
```

### 6. Design decisions

Strong decision categories:
- Reduced steps.
- Clearer category selection.
- Location-first reporting.
- Confirmation after submission.
- Status tracking.
- Accessibility settings.
- Lighter information architecture.
- Cleaner navigation.

### 7. Outcome

Safest outcome copy:
```text
The redesign reduced the core reporting flow from 6 steps to 3 and gave users clearer confirmation, status visibility, and mobile-friendly controls.
```

If verified:
```text
In testing, the simplified flow helped users complete reports faster, reduced errors, and prevented abandoned submissions.
```

### 8. Reflection

```text
This project taught me that civic UX is less about adding features and more about reducing uncertainty. A better report flow needs to help residents feel oriented before, during, and after submission.
```

## Visual asset inventory

Observed asset references:
- Teams meeting with Assistant City Manager of Kennesaw: Marty Hughes.
- Competitive audit showcase with NYC311, Austin311, CHI311.
- Product domain literature review.
- FigJam board with sticky notes of collected insights.
- Persona image described as man standing in front of window.
- Figma prototype.

Missing:
- Exact filenames.
- Final screenshot list.
- Alt text for every visual.
- Captions for every figure.
- Ownership/source notes.

## Figure recommendations

Use figures in this order:
1. Existing ATL311 pain point / audit screenshot.
2. Research synthesis / affinity map.
3. Persona or user scenario.
4. Original flow vs redesigned flow.
5. Low-fidelity wireframes.
6. Final mobile screens.
7. Status tracking / confirmation flow.
8. Accessibility settings.
9. Prototype link.

## Coach notes

InCity should carry the portfolio. Make it sharper, not longer.

Best improvement:
- Put problem, role, and impact above the fold.
- Make the metric story consistent.
- Show before/after flow visually.
- Add one clear “what I personally owned” section.
- Reduce generic civic-tech wording and show more product decisions.

## Claude prompt for InCity

```text
Using only this InCity project block, rewrite the case study intro and problem section for a modern UX/Product Design portfolio. Keep it concise, evidence-based, and recruiter-friendly. Do not invent new metrics. Avoid em dashes. Preserve the civic reporting focus.
```

</project>

---

<project id="siren">

# Project: Siren

## Canonical summary

Siren is a safety-first dating app concept focused on trust, safer onboarding, behavior reporting, and required video verification. The project used iterative UX methods across low-, medium-, and high-fidelity prototypes.

## Strongest positioning

Siren is a strong second case study because it shows:
- Safety and trust as product problems.
- UX testing across iterations.
- Real design tradeoffs.
- Ethical/social UX considerations.
- Good interaction design potential.

## Observed project details

### Project name

Observed:
- Siren: Safety Oriented Dating App
- Siren Safety-First Dating App

Recommended public title:
```text
Siren: Designing Trust into a Safety-First Dating App
```

Alternative:
```text
Siren: Safer Dating Through Trust Signals and Video Verification
```

### Role

Observed:
- UX/UI Designer
- Team of five
- Prototyping
- Wireframing
- Personas
- Testing

Recommended role line:
```text
Role: UX/UI Designer
Team: 5 designers
Focus: Safety UX, onboarding, trust signals, usability testing, prototyping
```

### Problem

Dating apps often require users to trust strangers with limited context. Siren explored how a dating app could surface safety cues, encourage accountability, and reduce uncertainty without making the experience feel hostile or overly restrictive.

### Solution

Siren introduced:
- Safety-focused onboarding.
- Report callouts / warning indicators.
- Trust and behavior flags.
- Required video call after a set amount of chatting.
- Usability-tested flows across multiple prototype stages.

### Process

Observed:
- Lean UX-style method.
- Proto-persona.
- Prioritization canvas.
- Two focused sprints.
- User testing of warning callouts.
- User testing of required video calls.
- Iteration based on feedback.

### Research/testing notes

Observed:
- Users felt safer with flags.
- Users preferred discretion in how report visibility is handled.
- Video calls helped users detect catfishing behavior.
- Some users found required video intrusive, but still understood the safety value.
- The design had to balance trust, control, and user comfort.

### Metrics and claims

Known from memory / previous portfolio framing:
- 12 participants across usability testing.
- Reduced onboarding drop-off around 25%.
- Improved trust through video verification and safety callouts.

Observed legacy content also referenced:
- Five usability sessions.
- 30% improvement in task clarity.
- 20% reduction in first-use drop-off.

Important:
These metrics need reconciliation before being published together.

Safest public metric copy:
```text
Usability testing showed that users understood the safety value of behavior callouts and video verification, but also wanted discretion and control over how safety signals appeared.
```

Use only if verified:
```text
Across usability testing, video verification and safety callouts helped reduce onboarding drop-off and improved user trust in the flow.
```

## Suggested case study structure

### 1. Hero

```text
Siren
Designing trust and safety into a dating app experience.

A UX/UI case study exploring how report callouts, trust signals, and video verification can help people feel safer while meeting new matches.
```

### 2. Project snapshot

```text
Role: UX/UI Designer
Team: 5 designers
Timeline: 4 weeks
Tools: Figma, Miro, usability testing, prototyping
Focus: Safety UX, onboarding, trust signals, dating app flows
```

### 3. Problem

```text
Dating apps often ask users to make trust decisions with limited information. Our challenge was to design safety features that gave users more confidence without making the experience feel intimidating or overly controlled.
```

### 4. Sprint structure

```text
Sprint 1: Report callouts and behavior warnings.
Sprint 2: Required video calls and verification.
```

### 5. Testing insights

Best insight framing:
```text
Users wanted safety signals, but they also wanted control. The design needed to protect people without making them feel watched, exposed, or punished for normal dating behavior.
```

### 6. Design decisions

Include:
- Safety callouts.
- Trust indicators.
- Report flow.
- Video call threshold.
- Onboarding explanation.
- Tone of safety copy.
- Privacy/discretion tradeoff.

### 7. Outcome

Safest:
```text
Testing helped us refine Siren from a feature-heavy safety concept into a more careful trust experience, where safety cues were visible enough to help but restrained enough to feel respectful.
```

If verified:
```text
Testing with 12 participants helped reduce onboarding drop-off and improved trust in the safety flow.
```

### 8. Reflection

```text
Siren taught me that safety features are not just interface components. They are emotional signals. The wording, timing, and visibility of each feature can change whether users feel protected or pressured.
```

## Visual asset inventory

Missing from crawl:
- Exact image filenames.
- Alt text.
- Screen captions.
- Prototype screenshots.

Recommended assets to identify:
- Proto-persona.
- Prioritization canvas.
- Sprint board.
- Low-fidelity onboarding screens.
- Report callout screens.
- Video call requirement flow.
- High-fidelity prototype screens.
- Usability testing findings.
- Before/after iteration examples.

## Coach notes

Siren should feel less like “we made a dating app” and more like “we designed trust in a risky social environment.”

Improve by:
- Naming the safety tension early.
- Showing what changed between Sprint 1 and Sprint 2.
- Making the testing insights more visual.
- Avoiding generic app screenshots without explaining the decision behind them.
- Clarifying your personal role.

## Claude prompt for Siren

```text
Using only this Siren block, rewrite the project summary and case study structure. Make it sound like a UX/Product Design case about trust, safety, tradeoffs, and testing. Do not invent new metrics. Avoid em dashes.
```

</project>

---

<project id="resolutions">

# Project: Resolutions

## Canonical summary

Resolutions is a habit-tracking app/website concept designed to help users manage goals, routines, templates, and progress in one place instead of spreading habits across multiple apps or notes.

## Strongest positioning

Resolutions is useful as a third project. It shows:
- Consumer/product UX.
- Goal-setting flows.
- Habit formation interface design.
- Clean UI work.
- Team collaboration.
- Research-to-prototype process.

It needs stronger proof to compete with InCity and Siren.

## Observed project details

### Project name

Observed:
- Resolutions
- Resolutions: Habit Tracker App / Website

Recommended public title:
```text
Resolutions: Simplifying Goal Tracking and Daily Routines
```

Alternative:
```text
Resolutions: A Cleaner Habit Tracker for Goals, Routines, and Progress
```

### Role

Observed:
- UI Design
- UX Design
- Interviews
- Prototyping
- Research
- Team of five

Recommended role line:
```text
Role: UX/UI Designer
Team: 5 designers
Focus: Habit tracking, goal flows, research, wireframes, visual design
```

### Problem

Users often manage habits across scattered tools: notes, calendars, apps, reminders, and mental checklists. This makes it harder to stay consistent, see progress, and understand what to do next.

### Solution

Resolutions proposed:
- Centralized habit and goal tracking.
- Templates.
- Routines.
- Progress views.
- Social accountability or shared motivation.
- A clean app/website experience.

### Process

Observed:
- Overview.
- Struggle/problem section.
- Brainstorming.
- Research.
- Modeling/personas.
- Framework.
- Wireframes.
- Prototypes.
- Usability testing.
- Polishing/iteration.

### Metrics and outcomes

Published/observed outcomes are mostly qualitative:
- Users liked how simple and clean the interface was.
- Project aimed to organize goals, routines, templates, and social accountability.

Known from broader portfolio framing:
- Reduced onboarding friction around 45%.
- Increased daily habit completion around 22%.

Important:
Use those metrics only if verified with project notes.

Safest public outcome:
```text
The final concept simplified the goal setup experience and gave users a clearer way to view routines, progress, and next actions in one place.
```

If verified:
```text
Prototype testing helped reduce onboarding friction and increased daily habit completion intent.
```

## Suggested case study structure

### 1. Hero

```text
Resolutions
A cleaner habit-tracking experience for goals, routines, and progress.

A UX/UI case study focused on helping users organize daily habits without feeling buried in scattered tools or complicated setup steps.
```

### 2. Project snapshot

```text
Role: UX/UI Designer
Team: 5 designers
Timeline: [confirm]
Tools: Figma, research, wireframing, prototyping
Focus: Habit tracking, onboarding, progress visibility, routine building
```

### 3. Problem

```text
Habit tracking often breaks down before the habit even starts. Users may have goals, reminders, and progress notes spread across multiple places, making the experience feel more like management than motivation.
```

### 4. Research

Needs more detail:
- Who was interviewed?
- How many users?
- What were the strongest pain points?
- What apps did users compare it to?
- What habits were most common?
- What caused drop-off?

### 5. Design decisions

Potential categories:
- Simplified goal creation.
- Templates for faster setup.
- Daily routine dashboard.
- Progress visualization.
- Gentle accountability.
- Less clutter in the main flow.

### 6. Outcome

Safest:
```text
The final prototype focused on reducing setup friction and making progress easier to understand at a glance.
```

### 7. Reflection

```text
Resolutions taught me that habit apps do not need more pressure. They need less friction. The strongest design decisions were the ones that helped users start quickly and return without feeling behind.
```

## Visual asset inventory

Missing from crawl:
- Exact filenames.
- Alt text.
- Captions.
- User testing notes.
- Final prototype link if available.

Recommended assets to identify:
- Brainstorming board.
- Research findings.
- Personas.
- User flow.
- Wireframes.
- Template setup.
- Habit dashboard.
- Progress screen.
- High-fidelity app/website screens.

## Coach notes

Resolutions needs a stronger “why this matters” angle. Right now it can read like a standard habit tracker. Position it around reducing cognitive load and setup friction.

Improve by:
- Showing the before/after onboarding flow.
- Adding one strong user quote or insight.
- Clarifying how templates reduce friction.
- Showing progress screen logic.
- Explaining how users know what to do next.

## Claude prompt for Resolutions

```text
Using only this Resolutions block, rewrite the case study overview so it sounds like a modern product design case. Emphasize onboarding friction, goal setup, progress visibility, and cognitive load. Do not invent metrics. Avoid em dashes.
```

</project>

---

<project id="logitech">

# Project: Logitech G PRO / Superlight Promotional Website

## Current source status

The project is listed on the `/cases` page, but the full case study route was not retrievable during the crawl.

Observed card-level summary:
- Logitech: Superlight Promotional Website.
- Interactive promotional website for Logitech G PRO mouse.
- Used UX principles to highlight product specs.

## Recommended status

```text
project_status: incomplete_source_capture
```

Do not treat this as a full project until content is recovered or rebuilt.

## Known project context from prior work

Wineury worked on a desktop website promoting the Logitech G PRO mouse. The website included:
- Product images.
- Videos.
- Definition/description page.
- Capabilities such as hertz and battery life.
- Step-by-step guide for the mouse and software.
- Psychological/UX principles:
  - Von Restorff Effect.
  - Zeigarnik Effect.
  - Serial Position Effect.
  - Hick’s Law.
  - Jakob’s Law.
  - Multimedia Principle.
  - Coherence Principle.
  - Signaling Principle.
  - Spatial Contiguity Principle.
  - Law of Proximity.
  - Fitts’s Law.

## Recommended project framing

This should be positioned as:
- A visual/product storytelling case.
- A promotional microsite.
- An interaction design project.
- A UX principles application case.

Do not position it as stronger than InCity or Siren unless rebuilt with strong screenshots and a clear story.

## Suggested title

```text
Logitech G PRO: Product Storytelling Through an Interactive Microsite
```

Alternative:
```text
Logitech G PRO: A Promotional Website Built Around Interaction and Product Clarity
```

## Suggested summary

```text
An interactive promotional website concept for the Logitech G PRO mouse, designed to make specs like response rate, battery life, and software setup easier to understand through visual storytelling, motion, and guided content.
```

## Suggested structure if rebuilt

1. Hero
2. Product context
3. Design goal
4. UX principles used
5. Page structure
6. Interaction/motion decisions
7. Tutorial flow
8. Final screens
9. Reflection

## Coach notes

This can be a nice supporting visual case, but only if:
- The page route works.
- Screenshots are polished.
- The design principles are explained simply.
- It does not feel like a class report pasted onto a portfolio.
- It shows strong visual craft.

If the current page is incomplete, remove it from the main Work grid for now and keep it in an archive or “selected experiments” area.

</project>

---

<metric_registry>

# Metric Registry

Use this section to avoid inflated or conflicting claims.

## Rule

Every metric must have a status:

```text
verified
estimated
observed_in_testing
legacy_claim
needs_proof
do_not_use_yet
```

## InCity metrics

| Claim | Status | Use publicly? | Notes |
|---|---|---|---|
| Report flow reduced from 6 steps to 3 | verified_if_flow_artifacts_exist | Yes, if before/after flow exists | Strong, easy to defend with screenshots |
| 50% faster task completion | needs_proof | Maybe | Use if test notes/timing exists |
| 75% faster task completion | needs_proof | Not yet | Conflicts with 50% claim |
| Error rate dropped from 30% to around 5% | needs_proof | Not yet | Needs test data |
| No abandoned submissions | needs_proof | Maybe | Needs testing detail |
| 28% engagement increase | legacy_claim | Not yet | Needs source |
| 40% faster issue resolution | legacy_claim | Not yet | Careful, issue resolution may imply city operations, not prototype UX |

## Siren metrics

| Claim | Status | Use publicly? | Notes |
|---|---|---|---|
| Tested with 12 participants | verified_if_research_notes_exist | Yes if notes exist | Strong |
| Reduced onboarding drop-off 25% | needs_proof | Maybe | Good if backed by test comparison |
| Five usability sessions | legacy_claim | Maybe | Reconcile with 12 participants |
| 30% improvement in task clarity | legacy_claim | Maybe | Needs source |
| 20% reduction in first-use drop-off | legacy_claim | Maybe | Conflicts with 25% claim |

## Resolutions metrics

| Claim | Status | Use publicly? | Notes |
|---|---|---|---|
| Reduced onboarding friction 45% | needs_proof | Maybe | Strong if verified |
| Increased daily habit completion 22% | needs_proof | Maybe | Need to clarify whether this was actual usage or test intent |
| Users liked simple and clean interface | qualitative_observed | Yes | Good, but needs more specificity |

## Logitech metrics

No verified metrics.

## Safest metric language

Use:
```text
Reduced the reporting flow from 6 steps to 3.
```

Use:
```text
Testing helped identify where users felt safer, confused, or interrupted by the flow.
```

Use:
```text
The prototype focused on reducing setup friction and making progress easier to understand.
```

Avoid:
```text
Increased engagement by 40%.
```

Avoid:
```text
Transformed the experience.
```

Avoid:
```text
Guaranteed faster resolution.
```

</metric_registry>

---

<case_study_template>

# Canonical Case Study Template

Use this structure for all projects.

## 1. Case hero

```text
Project name
One clear sentence about what it is.

Short paragraph:
What was the product, who was it for, and what problem did it solve?
```

## 2. Snapshot

```text
Role:
Team:
Timeline:
Tools:
Focus:
Output:
```

## 3. Problem

Should explain:
- What was broken?
- Who was affected?
- Why did it matter?
- What made the problem difficult?

## 4. Goal

Should explain:
- What the team wanted to improve.
- What success would look like.
- What constraints existed.

## 5. Research and discovery

Should include:
- Method.
- Participants or sources.
- Questions asked.
- Patterns found.
- What changed because of research.

## 6. Key insights

Use 3 to 5 strong insights.

Format:
```text
Insight 1: Users needed confidence after submission.
Why it mattered: Without clear confirmation, they were not sure if the city received the report.
Design response: Add confirmation, case ID, and status tracking.
```

## 7. Design decisions

This is the most important section.

Each decision should connect:
```text
Problem → Decision → Why it helped
```

Example:
```text
Problem: Users were unsure what happened after submitting a report.
Decision: Add a confirmation screen with case ID and next steps.
Why it helped: It gave users proof that the report was received and reduced uncertainty.
```

## 8. Iteration

Show:
- Before/after.
- What changed.
- Why it changed.
- What feedback caused it.

## 9. Final solution

Show:
- Main screens.
- Key flows.
- Accessibility considerations.
- Interaction details.

## 10. Outcomes

Use verified metrics first. If no metrics, use qualitative outcomes and learning.

Good:
```text
Reduced report flow from 6 steps to 3.
```

Good:
```text
Testing showed users understood the status flow more clearly after confirmation was added.
```

Bad:
```text
The app revolutionized civic reporting.
```

## 11. Reflection

Answer:
- What did I learn?
- What would I improve?
- What tradeoff mattered most?
- What does this show about my design process?

</case_study_template>

---

<ux_audit>

# UX/UI/Product Design Audit

## Highest-priority issues

### 1. Fragmented site truth

Problem:
- Current home, old home, placeholder About, and case pages carry overlapping but inconsistent information.

Impact:
- Recruiters may see old or placeholder content.
- Search engines get mixed signals.
- Claude may generate inconsistent rewrites.
- Metrics become harder to trust.

Fix:
- Create one canonical route set.
- Redirect `/old-home`.
- Rebuild or redirect `/about`.
- Fix `/cases/logitech`.
- Use this Markdown file as the source of truth.

### 2. Project metrics are inconsistent

Problem:
- InCity has multiple speed/engagement/error claims.
- Siren has multiple participant/drop-off/task clarity claims.
- Resolutions has strong numbers in memory but weak proof on page.

Impact:
- Inconsistent metrics can damage credibility.

Fix:
- Use the metric registry.
- Publish only verified metrics.
- Convert unverified metrics into softer qualitative statements.

### 3. Homepage needs stronger hierarchy

Problem:
- The homepage has personality, but proof should be more immediate.

Fix:
- Lead with role, value, and project proof.
- Put InCity first.
- Move playlist/personal extras lower.
- Add a proof strip near the hero.

### 4. Case studies need one repeatable structure

Problem:
- Projects do not all have the same level of clarity or proof.

Fix:
- Use the canonical case study template.
- Make each project show problem, role, process, decisions, final solution, outcomes, reflection.

### 5. Accessibility and SEO need cleanup

Problem:
- Generic image placeholders were observed.
- Generic titles were observed.
- Placeholder page exists.
- Focus order, contrast, and link purpose should be checked.

Fix:
- Unique title and meta description per page.
- Meaningful alt text.
- Clear link labels.
- Visible focus states.
- Proper heading hierarchy.
- Reduced motion option if using heavy animation.

## Modern portfolio standard checklist

A 2026 UX/Product Design portfolio should show:

- Clear role/title within 5 seconds.
- 2 to 3 strong case studies, not too many.
- Mobile-friendly case study reading.
- Recruiter-friendly project cards.
- Evidence-based impact.
- Strong design decision explanations.
- Before/after flows.
- User insights, not just final screens.
- Accessibility considerations.
- Clear ownership.
- Resume/contact easy to find.
- Fast loading.
- No broken routes.
- No placeholder pages.
- No outdated age-based copy.
- No generic “passion” filler.

## Visual design direction

Keep:
- Editorial typography.
- Soft glow.
- Utilitarian minimalism.
- Micro graphics.
- Dither/texture if subtle.
- Bento-like sections if they organize content.
- Motion, but only if helpful.
- Dark mode if contrast is strong.

Improve:
- More consistent card system.
- Stronger project hierarchy.
- Better above-the-fold proof.
- Less repeated content.
- Better mobile project reading.
- Stronger figure captions.
- Better spacing consistency.

</ux_audit>

---

<accessibility_rules>

# Accessibility Rules for the Portfolio

## Core rules

1. Every page needs one clear H1.
2. Headings should follow logical order.
3. Links should make sense out of context.
4. Buttons and links need visible focus states.
5. Text contrast should pass WCAG minimums.
6. Important images need alt text.
7. Decorative images should have empty alt.
8. Motion should be subtle or respect reduced motion.
9. Project pages should be keyboard navigable.
10. Mobile layout should not hide core content.

## Alt text rules

Do not write:
```text
Image
Screenshot
App screen
```

Write:
```text
Mobile report form showing category selection and location confirmation.
```

For process images:
```text
FigJam affinity map grouping resident pain points around reporting, tracking, and confirmation.
```

For decorative images:
```html
alt=""
```

## Focus state recommendation

Use visible focus styles that are stronger than hover states:
```css
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}
```

## Reduced motion note

If the site uses scroll effects, animated text, glow, or parallax, add a reduced motion fallback.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

</accessibility_rules>

---

<seo_metadata>

# SEO / Metadata Targets

## Global SEO direction

Each page should have:
- Unique title.
- Specific meta description.
- Clean canonical URL.
- Open Graph title.
- Open Graph description.
- OG image.
- Proper H1.
- Breadcrumbs for case studies if possible.

## Suggested page titles

| Route | Suggested title |
|---|---|
| `/` | `Wineury Almonte — UX/Product Designer` |
| `/cases` | `Selected Work — Wineury Almonte` |
| `/incity` | `InCity Case Study — ATL311 Civic Reporting Redesign` |
| `/cases/siren` | `Siren Case Study — Safety-First Dating App UX` |
| `/cases/resolutions` | `Resolutions Case Study — Habit Tracker UX/UI` |
| `/cases/logitech` | `Logitech G PRO Case Study — Interactive Product Microsite` |
| `/about` | `About — Wineury Almonte` |
| `/resume` | `Resume — Wineury Almonte` |

## Suggested meta descriptions

### Home
```text
Wineury Almonte is a UX/Product Designer designing clear, accessible digital experiences through research, prototyping, and interaction design.
```

### Work
```text
Selected UX/Product Design case studies by Wineury Almonte, including civic reporting, safety-first dating, habit tracking, and product storytelling.
```

### InCity
```text
A UX case study redesigning ATL311 into a clearer mobile-first civic reporting flow with improved issue submission, tracking, and accessibility.
```

### Siren
```text
A UX/UI case study exploring safety, trust signals, report callouts, and video verification in a safety-first dating app concept.
```

### Resolutions
```text
A UX/UI case study for a habit-tracking experience focused on clearer goal setup, routines, templates, and progress visibility.
```

### Logitech
```text
An interactive product website concept for the Logitech G PRO mouse, focused on specs, guided setup, visual storytelling, and motion.
```

### About
```text
Learn more about Wineury Almonte, a UX/Product Designer focused on research-backed flows, accessible interfaces, and clear product experiences.
```

### Resume
```text
View Wineury Almonte’s UX/Product Design resume, including product design projects, research, prototyping, accessibility, and front-end skills.
```

## Structured data ideas

Use only if implementation is worth it:
- Person schema for Wineury.
- BreadcrumbList schema for Work > Case Study.
- WebSite schema.
- CreativeWork schema for case studies.

</seo_metadata>

---

<asset_manifest>

# Asset Manifest

The crawl mostly exposed generic image placeholders, so this section is a placeholder system. Fill it from the actual site files or Figma exports.

## Asset rules

For every meaningful visual, capture:

```text
Project:
Page:
Filename:
Alt text:
Caption:
Purpose:
Status:
```

Purpose options:
- process_proof
- final_ui
- before_after
- research_artifact
- prototype
- decorative
- brand_mood

Status options:
- found
- filename_needed
- alt_needed
- caption_needed
- replace
- remove

## InCity asset placeholders

| Asset ID | Purpose | Needed |
|---|---|---|
| `incity_stakeholder_meeting_marty_hughes` | process_proof | filename, alt, caption |
| `incity_competitive_audit_311_apps` | research_artifact | filename, alt, caption |
| `incity_literature_review` | research_artifact | filename, alt, caption |
| `incity_affinity_map_figjam` | process_proof | filename, alt, caption |
| `incity_persona` | research_artifact | filename, alt, caption |
| `incity_original_flow` | before_after | filename, alt, caption |
| `incity_redesigned_flow` | before_after | filename, alt, caption |
| `incity_report_form_final` | final_ui | filename, alt, caption |
| `incity_status_tracking` | final_ui | filename, alt, caption |
| `incity_accessibility_settings` | final_ui | filename, alt, caption |

## Siren asset placeholders

| Asset ID | Purpose | Needed |
|---|---|---|
| `siren_proto_persona` | research_artifact | filename, alt, caption |
| `siren_prioritization_canvas` | process_proof | filename, alt, caption |
| `siren_sprint_board` | process_proof | filename, alt, caption |
| `siren_lowfi_onboarding` | process_proof | filename, alt, caption |
| `siren_report_callouts` | final_ui | filename, alt, caption |
| `siren_video_call_threshold` | final_ui | filename, alt, caption |
| `siren_usability_findings` | process_proof | filename, alt, caption |
| `siren_hifi_screens` | final_ui | filename, alt, caption |

## Resolutions asset placeholders

| Asset ID | Purpose | Needed |
|---|---|---|
| `resolutions_brainstorming` | process_proof | filename, alt, caption |
| `resolutions_research_findings` | research_artifact | filename, alt, caption |
| `resolutions_personas` | research_artifact | filename, alt, caption |
| `resolutions_user_flow` | process_proof | filename, alt, caption |
| `resolutions_wireframes` | process_proof | filename, alt, caption |
| `resolutions_template_setup` | final_ui | filename, alt, caption |
| `resolutions_dashboard` | final_ui | filename, alt, caption |
| `resolutions_progress_view` | final_ui | filename, alt, caption |

## Logitech asset placeholders

| Asset ID | Purpose | Needed |
|---|---|---|
| `logitech_homepage_hero` | final_ui | filename, alt, caption |
| `logitech_specs_section` | final_ui | filename, alt, caption |
| `logitech_mouse_detail` | final_ui | filename, alt, caption |
| `logitech_software_tutorial` | final_ui | filename, alt, caption |
| `logitech_interaction_motion` | prototype | filename, alt, caption |

</asset_manifest>

---

<coaching_plan>

# Coach Notes and Improvement Strategy

## The real diagnosis

Your portfolio does not suffer from a lack of work. It suffers from:
- Inconsistent public truth.
- Too much good content living in the wrong places.
- Some old/placeholder routes still being public.
- Strong metrics that need proof and cleanup.
- Case studies that need sharper decision-making language.

You already have enough for a strong UX/Product Design portfolio. The next move is not adding 10 new features. It is making the existing work easier to trust.

## What to do first

### Week 1: Truth cleanup
- Decide final title: UX/Product Designer.
- Remove age from public copy.
- Confirm contact info.
- Choose `/cases` or `/work`.
- Redirect `/old-home`.
- Fix `/about`.
- Fix or remove Logitech.
- Make InCity the flagship.

### Week 2: Project cleanup
- Reconcile InCity metrics.
- Reconcile Siren metrics.
- Decide if Resolutions metrics are real enough to publish.
- Add clear role and ownership to each project.
- Add one strong “what changed because of research” section per project.

### Week 3: Visual/UX cleanup
- Improve homepage hierarchy.
- Put work proof earlier.
- Add consistent project cards.
- Make mobile case-study reading smooth.
- Add figure captions.
- Add alt text.
- Add clear focus states.

### Week 4: SEO/contact polish
- Add unique titles and descriptions.
- Add internal resume page.
- Check all links.
- Check mobile.
- Check keyboard navigation.
- Final recruiter pass.

## Highest ROI edits

1. Make InCity the first project everywhere.
2. Replace age-based bio with value-based bio.
3. Retire `/old-home`.
4. Rebuild `/about`.
5. Add verified metric registry.
6. Make case study cards show impact.
7. Add internal HTML resume page.
8. Clean up metadata.
9. Add alt/captions.
10. Fix Logitech route.

## What to ditch

- Placeholder About page.
- Public old-home route.
- Any unverified metric that sounds too good.
- Generic “passion for design” copy.
- Project cards with no role or impact.
- Too much personality before proof.
- Any broken project route.
- Age in bio.
- External-only resume flow.

## What to add

- A proof strip near the homepage hero.
- Project cards with role/focus/outcome.
- Before/after flow visuals.
- “My role” sections.
- “Design decisions” sections.
- A short About page with a real story.
- Internal resume page.
- Accessibility checklist.
- Unique SEO metadata.
- Asset manifest.

## Recruiter-first homepage rule

The homepage should make a recruiter think:

```text
He knows what kind of designer he is.
He has real process.
He can explain decisions.
He cares about accessibility.
He has enough technical understanding to work with builders.
I know which project to open first.
I know how to contact him.
```

## Strong overall portfolio story

```text
Wineury designs clear digital experiences for messy, service-heavy problems. His work combines research, prototyping, visual systems, and accessibility to make civic tools, safety products, and habit flows easier to understand and use.
```

</coaching_plan>

---

<claude_prompt_library>

# Claude Prompt Library

## 1. Full homepage rewrite prompt

```text
You are improving my UX/Product Design portfolio homepage.

Use only the provided identity, homepage, route inventory, and project summary sections. Do not invent facts or metrics.

Goal:
Rewrite the homepage structure and copy so it is clearer, more recruiter-friendly, and more modern for a 2026 UX/Product Design portfolio.

Requirements:
- Make InCity the flagship project.
- Keep the tone human and confident.
- Avoid em dashes.
- Do not mention age.
- Keep personality, but make work proof first.
- Include hero copy, project card copy, process section copy, about preview, and CTA labels.
- Flag any missing info instead of inventing it.
```

## 2. Case study rewrite prompt

```text
You are rewriting one UX/Product Design case study.

Use only the provided project block and metric registry. First list the verified facts, uncertain facts, and metrics that need proof. Then rewrite the case study using this structure:

1. Hero summary
2. Project snapshot
3. Problem
4. Goal
5. Research
6. Key insights
7. Design decisions
8. Final solution
9. Outcomes
10. Reflection

Rules:
- Do not invent metrics.
- Keep the tone clear and professional.
- Avoid em dashes.
- Emphasize product decisions, research, and outcomes.
- Make the case study easy to scan.
```

## 3. Metric cleanup prompt

```text
Audit the metric registry and identify every conflicting or risky metric.

For each metric, return:
- Claim
- Project
- Risk level
- Evidence needed
- Safer public wording
- Whether to use, soften, or remove

Do not rewrite the whole case study. Only return the metric cleanup table.
```

## 4. SEO metadata prompt

```text
Using only the route inventory and project summaries, create unique SEO titles, meta descriptions, OG titles, and OG descriptions for each live route.

Rules:
- Do not invent project details.
- Keep titles under 60 characters where possible.
- Keep descriptions concise.
- Make each route distinct.
- Flag routes that should be redirected or removed.
```

## 5. Accessibility pass prompt

```text
Using the provided page/project block and accessibility rules, audit this page for likely accessibility issues.

Return:
1. Heading issues
2. Link/CTA issues
3. Image/alt text issues
4. Motion issues
5. Keyboard/focus issues
6. Contrast risks
7. Exact fixes

Do not claim WCAG compliance unless tested.
```

## 6. Project card prompt

```text
Using the project summaries, write project cards for a UX/Product Design portfolio.

Each card must include:
- Project title
- One-line context
- Role/focus line
- Outcome line using only verified metrics
- CTA label

Do not invent outcomes. If no metric is verified, use a qualitative outcome.
```

## 7. About page prompt

```text
Using only the identity and coaching sections, write an About page for Wineury.

Tone:
- Human
- Simple
- Confident
- Personal but not too long
- UX/Product Design focused

Include:
- Short intro
- Design motivation
- How I work
- Tools/skills grouped cleanly
- Current focus
- Contact CTA

Avoid:
- Age
- Overly emotional language
- Generic passion statements
- Em dashes
```

## 8. Token compression prompt

```text
Compress the provided section into a 1,500-token working brief for Claude.

Keep:
- Canonical facts
- Verified metrics
- Route decisions
- Project summaries
- Open questions
- Immediate action items

Remove:
- Repetition
- Long explanation
- Unverified details unless needed as warnings
```

## 9. Final QA prompt

```text
Audit this portfolio master file for contradictions, stale copy, unsupported metrics, weak role clarity, broken IA, and recruiter confusion.

Return:
- Critical issues
- Quick wins
- Content needing owner confirmation
- Pages to redirect/remove
- Metrics to verify
- Final launch checklist

Do not rewrite everything unless asked.
```

</claude_prompt_library>

---

<open_questions>

# Open Questions / Data Needed

## Identity

- Confirm exact public name:
  - Wineury?
  - Wineury Almonte?
  - Wineury “Winnie” Almonte?

- Confirm public title:
  - UX/Product Designer?
  - Product Designer?
  - UX/UI Designer?
  - Interaction Designer?

- Confirm whether to publish:
  - Email.
  - Phone.
  - Atlanta metro location.
  - X/Twitter.
  - Spotify playlist.

## Route decisions

- Should `/cases` become `/work`, or should `/cases` stay?
- Should `/incity` stay standalone or move under `/cases/incity`?
- Should `/old-home` redirect to `/`?
- Should `/about` be rebuilt or redirected?
- Should Logitech be fixed or removed?

## InCity

- What was the actual timeline?
- What exact team members/roles should be listed?
- Which metrics are verified?
- Where are the test notes?
- Is 50%, 75%, 28%, or 40% the correct public metric?
- Are city official quotes approved for public use?
- What are the final screen filenames?

## Siren

- How many participants were tested?
- Was it 5 sessions or 12 participants?
- Is the 25% onboarding drop-off metric verified?
- Is the 20% drop-off metric old or replaced?
- Is the 30% task clarity metric verified?
- Which prototype screens should be featured?

## Resolutions

- How many users were researched/tested?
- Are the 45% onboarding friction and 22% habit completion metrics verified?
- What was your exact role?
- What were the strongest user insights?
- Which final screens best show the product value?

## Logitech

- Does the route still exist?
- Are there screenshots?
- Is it worth keeping as a main project?
- Should it be reframed as a visual/interaction experiment?
- Are product specs accurate and current?

## Assets

- Need exact filenames.
- Need final captions.
- Need alt text.
- Need project ownership/source notes.
- Need Figma/prototype links.
- Need OG images for each route.

</open_questions>

---

<launch_checklist>

# Final Launch Checklist

## Content

- [ ] Homepage has one clear role/title.
- [ ] InCity is first.
- [ ] All project cards show role/focus/outcome.
- [ ] No age-based bio.
- [ ] No placeholder copy.
- [ ] No “Your Name” content.
- [ ] No broken project links.
- [ ] No unsupported metrics.
- [ ] Each case study has the same structure.
- [ ] Resume/contact are easy to find.

## IA

- [ ] Decide `/cases` vs `/work`.
- [ ] Redirect `/old-home`.
- [ ] Rebuild or redirect `/about`.
- [ ] Fix/remove `/cases/logitech`.
- [ ] Verify `/projects`.
- [ ] Verify `/resume`.

## SEO

- [ ] Unique title per route.
- [ ] Unique meta description per route.
- [ ] OG title/description/image per route.
- [ ] Canonical URLs set.
- [ ] Sitemap updated.
- [ ] Robots/noindex set for retired pages.
- [ ] Breadcrumbs added if useful.

## Accessibility

- [ ] One H1 per page.
- [ ] Heading order makes sense.
- [ ] Alt text added.
- [ ] Decorative images ignored correctly.
- [ ] Focus states visible.
- [ ] Keyboard navigation works.
- [ ] Text contrast passes.
- [ ] Reduced motion support exists.
- [ ] Links have clear purpose.

## Performance / polish

- [ ] Images compressed.
- [ ] Lazy loading added where appropriate.
- [ ] Animations do not hurt readability.
- [ ] Mobile case studies are readable.
- [ ] CTAs are visible.
- [ ] Resume download works.
- [ ] Contact link works.
- [ ] No console errors.
- [ ] No route 404s.

</launch_checklist>

---

# Final compressed Claude handoff brief

Use this when you need a shorter prompt.

```text
You are helping improve Wineury Almonte’s UX/Product Design portfolio at wineury.design.

Wineury is a UX/Product Designer based in the Atlanta metro area with a BS in Interactive Design from Kennesaw State University and a minor in Computer Science. His strongest portfolio angle is designing clearer, more accessible digital experiences for confusing service-heavy systems.

Main projects:
1. InCity: Mobile-first ATL311/civic reporting redesign. Strongest flagship. Focus: civic reporting, fewer steps, geotagged reports, case tracking, accessibility, stakeholder/research input. Known strong claim: reduced flow from 6 steps to 3. Other metrics need verification.
2. Siren: Safety-first dating app. Focus: trust signals, report callouts, required video verification, usability testing, safety tradeoffs. Metrics need reconciliation.
3. Resolutions: Habit tracker app/website. Focus: goal setup, routines, templates, progress visibility, reducing setup friction. Needs stronger evidence.
4. Logitech: Interactive promotional website for Logitech G PRO mouse. Route/content incomplete. Keep only if rebuilt.

Current site issues:
- Fragmented routes: /, /cases, /incity, /cases/siren, /cases/resolutions, /old-home, /about, /cases/logitech.
- /old-home should be redirected or retired.
- /about appears placeholder and should be rebuilt or removed.
- Logitech route needs fixing or removal.
- Project metrics conflict and need a metric registry.
- Homepage should put work proof before personality extras.
- Case studies need consistent structure.
- SEO metadata should be unique per route.
- Accessibility needs alt text, focus states, heading cleanup, contrast checks, and reduced motion support.

Tone:
Human, concise, confident, modern, recruiter-friendly. Avoid em dashes. Do not invent metrics or facts. Ask for missing info or mark it as unconfirmed.

Goal:
Make the portfolio clearer, more credible, more mobile-friendly, and stronger for UX/Product Design roles while preserving Wineury’s personality and visual taste.
```

