/**
 * Quiet Studio — exploration landing page.
 *
 * Implements the Figma "Design-Exploration" hero (node 12:96) and extends it
 * into a full landing with Work, Approach, Journal, and Contact sections.
 *
 * Composition cues taken from Mobbin references (dark hero with photo
 * backdrop, italic serif accent word, generous spacing) — applied to the
 * source design's own voice and palette.
 */

import "@/exploration/quietStudio/styles.css";
import { Nav } from "@/exploration/quietStudio/sections/Nav.jsx";
import { Hero } from "@/exploration/quietStudio/sections/Hero.jsx";
import { Work } from "@/exploration/quietStudio/sections/Work.jsx";
import { Approach } from "@/exploration/quietStudio/sections/Approach.jsx";
import { Journal } from "@/exploration/quietStudio/sections/Journal.jsx";
import { Contact } from "@/exploration/quietStudio/sections/Contact.jsx";

export default function QuietStudioPage() {
  return (
    <div className="qs-root">
      <Nav />
      <main>
        <Hero />
        <div className="qs-divider" aria-hidden />
        <Work />
        <div className="qs-divider" aria-hidden />
        <Approach />
        <div className="qs-divider" aria-hidden />
        <Journal />
        <div className="qs-divider" aria-hidden />
        <Contact />
      </main>
    </div>
  );
}
