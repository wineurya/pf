import { NAV_LINKS } from "@/exploration/quietStudio/content.js";

/**
 * Top nav — centered link group, Start a Project pill far-right.
 * Anchors to fixed top, blends into hero gradient.
 */
export function Nav() {
  return (
    <nav
      className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-[clamp(24px,4vw,64px)] pt-[40px]"
      aria-label="Primary"
    >
      {/* Wordmark — left */}
      <a href="#top" className="qs-nav-link text-white" style={{ paddingInline: 0, fontWeight: 500 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span className="qs-eyebrow-dot" aria-hidden />
          <span>Quiet Form</span>
        </span>
      </a>

      {/* Center links */}
      <ul className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="qs-nav-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right CTA */}
      <a href="#contact" className="qs-pill qs-pill--filled" style={{ fontSize: 14 }}>
        Start a Project
      </a>
    </nav>
  );
}
