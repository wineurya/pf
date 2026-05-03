import { useCallback } from "react";
import { SITE_FIGMA_ASSETS } from "@/exploration/siteContent.js";
import { MaskedFigmaIcon, WX_WORDMARK_MARK_GRADIENT } from "@/exploration/MaskedFigmaIcon.jsx";
import { navigateWithViewTransition } from "@/lib/navigateViewTransition.js";
import { useLenis } from "@/providers/LenisProvider.jsx";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

const WORDMARK_LENIS_EASE_IN_OUT = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

/**
 * “wineury almonte” mark — its own node so view transitions or motion can target it
 * separately from the tab rail.
 *
 * @param {() => void} [onHomeWordmarkClick] — on `/`, scroll to document top and sync chrome (exploration layout).
 */
export function WordmarkLink({ location, navigate, onHomeWordmarkClick }) {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  const scrollDocumentTop = useCallback(() => {
    const duration = reduceMotion ? 0 : 1.35;
    if (lenis) {
      lenis.scrollTo(0, { duration, easing: reduceMotion ? undefined : WORDMARK_LENIS_EASE_IN_OUT });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [lenis, reduceMotion]);

  return (
    <a
      href="/"
      className="group relative inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
      onClick={(e) => {
        e.preventDefault();
        if (location.pathname !== "/") {
          navigateWithViewTransition(navigate, "/");
          window.setTimeout(() => scrollDocumentTop(), 120);
          return;
        }
        if (onHomeWordmarkClick) {
          onHomeWordmarkClick();
          return;
        }
        scrollDocumentTop();
        if (location.hash) {
          navigate({ pathname: "/", hash: "" }, { replace: true });
        }
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
