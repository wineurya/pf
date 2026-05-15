import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HERO } from "@/exploration/quietStudio/content.js";

const GRASS_SRC = `${import.meta.env.BASE_URL}exploration/quiet-studio/grass-hero.png`;

/**
 * Hero — faithful to Figma node 12:96.
 * Adds subtle parallax on scroll (bg moves slower than foreground) and a
 * staggered fade-in for the headline block. Reduced-motion users get static.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const bgRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    const el = bgRef.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 600);
        el.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + y * 0.00018})`;
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const enter = (delay) =>
    reduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "min(100dvh, 893px)" }}
    >
      {/* Photo backdrop */}
      <div className="qs-hero-bg">
        <img ref={bgRef} src={GRASS_SRC} alt="" draggable={false} />
      </div>
      <div className="qs-grain" aria-hidden />

      {/* Foreground content */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{
          paddingInline: "clamp(24px, 6vw, 152px)",
          paddingTop: "clamp(140px, 18vw, 220px)",
          paddingBottom: "clamp(80px, 10vw, 120px)",
          minHeight: "min(100dvh, 893px)",
        }}
      >
        <div className="flex max-w-[640px] flex-col gap-6">
          <motion.div {...enter(0.04)} className="inline-flex items-center gap-2.5 pr-4">
            <span className="qs-eyebrow-dot" aria-hidden />
            <span style={{ fontSize: 14, color: "var(--qs-ink)" }}>{HERO.eyebrow}</span>
          </motion.div>

          <motion.h1
            {...enter(0.14)}
            className="m-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6.4vw, 76px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--qs-ink)",
            }}
          >
            {HERO.headlineLead}{" "}
            <span className="qs-italic-accent">{HERO.headlineAccent}</span>
          </motion.h1>

          <motion.p
            {...enter(0.22)}
            className="m-0"
            style={{
              color: "var(--qs-ink)",
              fontSize: "clamp(15px, 1.2vw, 17px)",
              lineHeight: 1.55,
              maxWidth: 500,
            }}
          >
            {HERO.body}
          </motion.p>

          <motion.div {...enter(0.32)} className="mt-2 flex flex-wrap gap-3">
            <a href={HERO.ctaPrimary.href} className="qs-pill qs-pill--filled">
              {HERO.ctaPrimary.label}
            </a>
            <a href={HERO.ctaSecondary.href} className="qs-pill qs-pill--ghost">
              {HERO.ctaSecondary.label}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>scroll</span>
        <span style={{ width: 1, height: 22, background: "currentColor", opacity: 0.6 }} />
      </div>
    </section>
  );
}
