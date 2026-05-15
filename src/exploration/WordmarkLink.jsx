import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { SITE_FIGMA_ASSETS } from "@/exploration/siteContent.js";
import { MaskedFigmaIcon, WX_WORDMARK_MARK_GRADIENT } from "@/exploration/MaskedFigmaIcon.jsx";
import { navigateWithViewTransition } from "@/lib/navigateViewTransition.js";
import { useLenis } from "@/providers/LenisProvider.jsx";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

const WORDMARK_LENIS_EASE_IN_OUT = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

const WORDMARK_HOVER_EASE = [0.22, 1, 0.36, 1];

/**
 * “wineury almonte” mark — its own node so view transitions or motion can target it
 * separately from the tab rail.
 *
 * @param {() => void} [onHomeWordmarkClick] — on `/`, scroll to document top and sync chrome (exploration layout).
 */
export function WordmarkLink({ location, navigate, onHomeWordmarkClick }) {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const markActive = hovered || focused;

  const scrollDocumentTop = useCallback(() => {
    const duration = reduceMotion ? 0 : 1.35;
    if (lenis) {
      lenis.scrollTo(0, { duration, easing: reduceMotion ? undefined : WORDMARK_LENIS_EASE_IN_OUT });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [lenis, reduceMotion]);

  const tapScale = reduceMotion ? undefined : { scale: 0.98 };
  const hoverOpacity = reduceMotion ? undefined : { opacity: 0.82 };
  const linkTransition = { duration: 0.2, ease: [0.3, 0, 0, 1] };
  const markSpin = reduceMotion || !markActive ? 0 : 12;

  return (
    <motion.a
      href="/old"
      className="group relative inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
      whileHover={hoverOpacity}
      whileFocus={reduceMotion ? undefined : { opacity: 0.82 }}
      whileTap={tapScale}
      transition={linkTransition}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
          return;
        }
        e.preventDefault();
        if (location.pathname !== "/old") {
          navigateWithViewTransition(navigate, "/old");
          window.setTimeout(() => scrollDocumentTop(), 120);
          return;
        }
        if (onHomeWordmarkClick) {
          onHomeWordmarkClick();
          return;
        }
        scrollDocumentTop();
        if (location.hash) {
          navigate({ pathname: "/old", hash: "" }, { replace: true });
        }
      }}
    >
      <span className="wx-text-wordmark flex flex-col gap-0 text-[var(--wx-ink)]">
        <span className="tracking-tight">wineury</span>
        <span className="-mt-px flex items-center gap-1">
          <motion.span
            className="inline-flex shrink-0 origin-center will-change-transform"
            aria-hidden
            animate={{ rotate: markSpin }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: WORDMARK_HOVER_EASE }}
          >
            <MaskedFigmaIcon
              src={SITE_FIGMA_ASSETS.logoMark}
              className="size-3 shrink-0 translate-y-px select-none"
              background={WX_WORDMARK_MARK_GRADIENT}
            />
          </motion.span>
          <span className="tracking-tight">almonte</span>
        </span>
      </span>
    </motion.a>
  );
}
