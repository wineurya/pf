# Wineury Almonte Portfolio

The personal portfolio of Wineury Almonte, an independent product designer based in Atlanta. It is a single-page React application that presents selected case studies, a set of interaction explorations, and a short about section.

Live site: [https://wineury.vercel.app](https://wineury.vercel.app)

## Overview

The portfolio is built as one fast, accessible single-page app. Case studies are content-driven, so the work list and each study page derive from a single source of truth. Interaction explorations are embedded live rather than shown as static images, and the whole experience is tuned for reduced-motion and keyboard use.

## Tech stack

- **Framework:** React 19 and Vite 6, single page with client-side view switching
- **Styling:** Plain CSS with design tokens (CSS custom properties). No Tailwind
- **Motion:** Motion and GSAP for transitions and scroll-linked animation
- **Type:** Geist and Inter, self-hosted through Fontsource
- **Icons:** Phosphor and Central Icons
- **Hosting:** Vercel

## Features

- Case studies for Kinetix, Avance, InCity, Logitech, Siren, and Resolutions (newest first), served at `/work/<slug>` and derived from `src/content.js`
- Embedded interaction explorations (jelly volume slider, wallet menu) with a full `/exploration` view
- About section with an interactive hover-word photo bento
- Light and dark theme, persisted to `localStorage` and applied before first paint to avoid a flash
- Atmospheric backdrop and animated film grain that freeze under reduced motion

## Accessibility

- Respects `prefers-reduced-motion`: animation and grain freeze, and entrance transitions collapse to instant
- AA-contrast text, visible focus rings, a skip link, and semantic landmarks
- Keyboard-operable lists and controls

## Project structure

```
src/
  components/    UI components (case study, tabs, lists, theme toggle)
  exploration/   embedded interaction demos
  lib/           hooks, icons, motion, and theme helpers
  styles/        design tokens and CSS
  assets/        local images imported by the app
  content.js     case studies and site content
  App.jsx        app shell and view switching
  main.jsx       entry, fonts, and global config
public/          static assets, favicons, and case study icons
index.html       HTML entry
vite.config.js   build and dev server config
```

## Setup

```bash
npm install
npm run dev      # http://localhost:5180
npm run build
npm run preview
```

## Contributing and agents

This repository is the polished, public artifact. Research, inspiration sources, design references, raw prompts, private notes, and local working context are intentionally kept out of version control.

Coding agents (Claude, Codex, Cursor, and others) and human contributors should read [AGENTS.md](AGENTS.md) first. It defines the public and private boundaries, editing rules, accessibility expectations, and commit conventions for this project.

## Contact

- Email: contact@wineury.design
- LinkedIn: [linkedin.com/in/wineury](https://www.linkedin.com/in/wineury)
- X: [x.com/wineurya](https://x.com/wineurya)
