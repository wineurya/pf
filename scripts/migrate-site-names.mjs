/**
 * One-time repo cleanup: remove "winnie" naming, normalize section ids, view-transition + VT class names.
 * Run: node scripts/migrate-site-names.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TEXT_REPLACEMENTS = [
  ["@/exploration/winnie-content.js", "@/exploration/siteContent.js"],
  ["@/exploration/WinnieTopNav.jsx", "@/exploration/TopNav.jsx"],
  ["@/exploration/WinnieWordmarkLink.jsx", "@/exploration/WordmarkLink.jsx"],
  ["@/exploration/WinnieSectionTabRail.jsx", "@/exploration/SectionTabRail.jsx"],
  ["@/exploration/WinnieExplorationNavRow.jsx", "@/exploration/ExplorationNavRow.jsx"],
  ["@/exploration/WinnieExplorationPage.jsx", "@/exploration/ExplorationHomePage.jsx"],
  ["@/exploration/WinnieDotCursor.jsx", "@/exploration/DotCursor.jsx"],
  ["@/exploration/layout/WinnieExplorationLayout.jsx", "@/exploration/layout/ExplorationLayout.jsx"],
  ["@/exploration/layout/WinnieWorkCaseLayout.jsx", "@/exploration/layout/WorkCaseLayout.jsx"],
  ["@/exploration/WinnieWorkCasePageHeader.jsx", "@/exploration/WorkCasePageHeader.jsx"],
  ["@/exploration/styles/winnie-exploration.css", "@/exploration/styles/site-canvas.css"],
  ["@/exploration/useWinnieSectionScroll.js", "@/exploration/useSectionScroll.js"],
  ["WinnieExplorationMainPanels", "ExplorationMainPanels"],
  ["WinnieExplorationBody", "ExplorationBody"],
  ["WinnieExplorationRoot", "ExplorationRoot"],
  ["WinnieWorkCasePageHeader", "WorkCasePageHeader"],
  ["WinnieWorkCaseLayout", "WorkCaseLayout"],
  ["WinnieExplorationNavRow", "ExplorationNavRow"],
  ["WinnieSectionTabRail", "SectionTabRail"],
  ["WinnieWordmarkLink", "WordmarkLink"],
  ["WinnieTopNav", "TopNav"],
  ["WinnieDotCursor", "DotCursor"],
  ["WinnieExplorationPage", "ExplorationHomePage"],
  ["WinnieFaqAccordion", "FaqAccordion"],
  ["useWinnieSectionScroll", "useSectionScroll"],
  ["WINNIE_SECTION_IDS", "SECTION_IDS"],
  ["WINNIE_TABS", "SECTION_TABS"],
  ["WINNIE_ACCENT_HEX", "SITE_ACCENT_HEX"],
  ["WINNIE_FIGMA_ASSETS", "SITE_FIGMA_ASSETS"],
  ["WINNIE_IMAGE_FALLBACKS", "SITE_IMAGE_FALLBACKS"],
  ["WINNIE_EXTRA_IMAGES", "SITE_EXTRA_IMAGES"],
  ["WINNIE_HERO", "SITE_HERO"],
  ["WINNIE_WORK", "SITE_WORK"],
  ["WINNIE_STACK_MARQUEE_LAYERS", "SITE_STACK_MARQUEE_LAYERS"],
  ["WINNIE_STACK_TOOLS", "SITE_STACK_TOOLS"],
  ["WINNIE_CONTACT_SOCIALS", "SITE_CONTACT_SOCIALS"],
  ["WINNIE_SERVICES", "SITE_SERVICES"],
  ["WINNIE_TESTIMONIALS", "SITE_TESTIMONIALS"],
  ["WINNIE_STATS", "SITE_STATS"],
  ["WINNIE_FAQ", "SITE_FAQ"],
  ["WINNIE_AVAILABILITY", "SITE_AVAILABILITY"],
  ["WINNIE_QUALIFICATION_FIELDS", "SITE_QUALIFICATION_FIELDS"],
  ["winnie-section-", "section-"],
  /** Tab ids + listbox controls (separate from main section elements). */
  ["winnie-tab-", "site-tab-"],
  ["winnie-faq-", "site-faq-"],
  ["winnie-services-heading", "site-services-heading"],
  /** Class + CSS: `.winnie-exploration` and `winnie-exploration` in `className` */
  ["winnie-exploration", "site-canvas"],
  ['[id^="winnie-section"]', '[id^="section-"]'],
  [".querySelectorAll(\".winnie-exploration img\")", ".querySelectorAll(\".site-canvas img\")"],
  ["data-winnie-surface", "data-site-surface"],
  ["data-winnie-body", "data-site-body"],
  ["data-winnie-region", "data-site-region"],
  ["data-winnie-vt", "data-site-vt"],
  /** JSX `className` (no leading dot in source). */
  ["wx-vt--", "site-vt--"],
  [".wx-vt--nav", ".site-vt--nav"],
  [".wx-vt--aside", ".site-vt--aside"],
  [".wx-vt--panels", ".site-vt--panels"],
  ["winnie-fade-panels", "site-fade-panels"],
  ["winnie-fade-aside", "site-fade-aside"],
  ["winnie-chrome", "site-chrome"],
  ["wx-vt-canvas-fade", "site-vt-canvas-fade"],
  ["view-transition-old(winnie-", "view-transition-old(site-"],
  ["view-transition-new(winnie-", "view-transition-new(site-"],
  ["view-transition-group(winnie-", "view-transition-group(site-"],
  ["view-transition-image-pair(winnie-", "view-transition-image-pair(site-"],
  ["#winnie-panels", "#site-panels"],
  ['id="winnie-panels"', 'id="site-panels"'],
];

const FILE_RENAMES = [
  ["src/exploration/winnie-content.js", "src/exploration/siteContent.js"],
  ["src/exploration/useWinnieSectionScroll.js", "src/exploration/useSectionScroll.js"],
  ["src/exploration/styles/winnie-exploration.css", "src/exploration/styles/site-canvas.css"],
  ["src/exploration/WinnieTopNav.jsx", "src/exploration/TopNav.jsx"],
  ["src/exploration/WinnieWordmarkLink.jsx", "src/exploration/WordmarkLink.jsx"],
  ["src/exploration/WinnieSectionTabRail.jsx", "src/exploration/SectionTabRail.jsx"],
  ["src/exploration/WinnieExplorationNavRow.jsx", "src/exploration/ExplorationNavRow.jsx"],
  ["src/exploration/WinnieExplorationPage.jsx", "src/exploration/ExplorationHomePage.jsx"],
  ["src/exploration/WinnieDotCursor.jsx", "src/exploration/DotCursor.jsx"],
  ["src/exploration/WinnieWorkCasePageHeader.jsx", "src/exploration/WorkCasePageHeader.jsx"],
  ["src/exploration/layout/WinnieExplorationLayout.jsx", "src/exploration/layout/ExplorationLayout.jsx"],
  ["src/exploration/layout/WinnieWorkCaseLayout.jsx", "src/exploration/layout/WorkCaseLayout.jsx"],
];

function walkDir(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "dist") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkDir(p, acc);
    else if (/\.(js|jsx|mjs|css|html|ts|tsx|md)$/.test(name)) acc.push(p);
  }
  return acc;
}

function apply() {
  const files = walkDir(path.join(root, "src"));
  files.push(path.join(root, "index.html"));
  for (const name of fs.readdirSync(root)) {
    if (name.endsWith(".md") && !name.startsWith(".")) {
      files.push(path.join(root, name));
    }
  }
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let s = fs.readFileSync(file, "utf8");
    for (const [a, b] of TEXT_REPLACEMENTS) {
      if (s.includes(a)) s = s.split(a).join(b);
    }
    fs.writeFileSync(file, s, "utf8");
  }
  for (const [from, to] of FILE_RENAMES) {
    const absFrom = path.join(root, from);
    const absTo = path.join(root, to);
    if (fs.existsSync(absFrom)) {
      fs.renameSync(absFrom, absTo);
      console.log("renamed", from, "->", to);
    }
  }
  console.log("done");
}

apply();
