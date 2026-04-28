import { SITE_FIGMA_ASSETS } from "@/exploration/siteContent.js";
import { MaskedFigmaIcon, WX_WORDMARK_MARK_GRADIENT } from "@/exploration/MaskedFigmaIcon.jsx";
import { navigateWithViewTransition } from "@/lib/navigateViewTransition.js";

/**
 * “wineury almonte” mark — its own node so view transitions or motion can target it
 * separately from the tab rail.
 */
export function WordmarkLink({ location, navigate, onSelectSection }) {
  return (
    <a
      href={location.pathname === "/" ? "#section-work" : "/"}
      className="group relative inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
      onClick={(e) => {
        if (location.pathname === "/") {
          e.preventDefault();
          onSelectSection("section-work", 0);
          return;
        }
        e.preventDefault();
        navigateWithViewTransition(navigate, "/");
      }}
    >
      <span className="wx-text-wordmark flex flex-col gap-0 text-[var(--wx-ink)]">
        <span className="tracking-tight">wineury</span>
        <span className="-mt-px flex items-center gap-1">
          <MaskedFigmaIcon
            src={SITE_FIGMA_ASSETS.logoMark}
            className="size-3 shrink-0 translate-y-px select-none"
            background={WX_WORDMARK_MARK_GRADIENT}
          />
          <span className="tracking-tight">almonte</span>
        </span>
      </span>
    </a>
  );
}
