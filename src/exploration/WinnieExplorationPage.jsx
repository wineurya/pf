import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookUserIcon,
  Briefcase01Icon,
  Calendar01Icon,
  CodeCircleIcon,
  ComputerDesk01Icon,
  FallingStarIcon,
  FigmaIcon,
  FramerIcon,
  GridTableIcon,
  GridViewIcon,
  Layers01Icon,
  Layout01Icon,
  LayoutThreeColumnIcon,
  LayoutTwoColumnIcon,
  MagicWand01Icon,
  Mail01Icon,
  PenTool01Icon,
  QuoteUpIcon,
} from "@hugeicons/core-free-icons";
import { Envelope } from "@phosphor-icons/react/dist/csr/Envelope";
import { InstagramLogo } from "@phosphor-icons/react/dist/csr/InstagramLogo";
import { LinkedinLogo } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import { XLogo } from "@phosphor-icons/react/dist/csr/XLogo";
import { clsx } from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";
import { ScrollTrigger } from "@/lib/gsap.js";
import { navigateWithViewTransition } from "@/lib/navigateViewTransition.js";
import { useLenis } from "@/providers/LenisProvider.jsx";
import {
  WINNIE_AVAILABILITY,
  WINNIE_CONTACT_SOCIALS,
  WINNIE_EXTRA_IMAGES,
  WINNIE_FAQ,
  WINNIE_FIGMA_ASSETS,
  WINNIE_HERO,
  WINNIE_IMAGE_FALLBACKS,
  WINNIE_QUALIFICATION_FIELDS,
  WINNIE_SECTION_IDS,
  WINNIE_SERVICES,
  WINNIE_STATS,
  WINNIE_TABS,
  WINNIE_STACK_MARQUEE_LAYERS,
  WINNIE_TESTIMONIALS,
  WINNIE_WORK,
} from "@/exploration/winnie-content.js";
import { useWinnieSectionScroll } from "@/exploration/useWinnieSectionScroll.js";
import "@/exploration/styles/winnie-exploration.css";

const TAB_ICONS = [Briefcase01Icon, BookUserIcon, Layers01Icon, Mail01Icon];

const NUGGET_ICON_MAP = {
  CodeCircleIcon,
  FramerIcon,
  FigmaIcon,
  Layout01Icon,
  Layers01Icon,
  PenTool01Icon,
  MagicWand01Icon,
  FallingStarIcon,
  GridViewIcon,
  ComputerDesk01Icon,
  GridTableIcon,
  LayoutThreeColumnIcon,
  LayoutTwoColumnIcon,
};

/** Stack marquee logos: Simple Icons CDN embeds brand fill on `<svg>`. */
function stackToolLogoUrl(tool) {
  if (tool.logoUrl) return tool.logoUrl;
  if (tool.brandSlug) return `https://cdn.simpleicons.org/${tool.brandSlug}`;
  return null;
}

const CONTACT_PHOSPHOR_ICONS = {
  linkedin: LinkedinLogo,
  x: XLogo,
  instagram: InstagramLogo,
  email: Envelope,
};

function hexToSrgb(hex) {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return {
    r: parseInt(v.slice(0, 2), 16) / 255,
    g: parseInt(v.slice(2, 4), 16) / 255,
    b: parseInt(v.slice(4, 6), 16) / 255,
  };
}

function linearizeChannel(u) {
  return u <= 0.03928 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4;
}

function relativeLuminanceHex(hex) {
  const { r, g, b } = hexToSrgb(hex);
  return (
    0.2126 * linearizeChannel(r) + 0.7152 * linearizeChannel(g) + 0.0722 * linearizeChannel(b)
  );
}

/** High-contrast label on chip fills from hex luminance. */
function labelOnChipFill(fillHex) {
  return relativeLuminanceHex(fillHex) > 0.5
    ? "var(--color-neutral-1000)"
    : "var(--color-neutral-0)";
}

/** Work-card chips: bottom row, y up / stagger down on engage; reverse on exit. */
const WX_NUGGET_GAP_PREFERRED = 90;
/** Floor for empty px between neighbouring chip edges once gap collapses on narrow cards. */
const WX_NUGGET_GAP_EDGE_BUFFER = 8;
/** Horizontal breathing room from card sides when fitting the row. */
const WX_NUGGET_SIDE_PAD = 14;
const WX_NUGGET_ROW_Y = -38;
const WX_NUGGET_ENTER_LIFT = 48;
const WX_NUGGET_ENTER_DURATION = 0.38;
const WX_NUGGET_ENTER_STAGGER = 0.058;
const WX_NUGGET_ENTER_EASE = [0.22, 1, 0.36, 1];
const WX_NUGGET_EXIT_DURATION = 0.3;
const WX_NUGGET_EXIT_STAGGER = 0.048;
const WX_NUGGET_EXIT_EASE = [0.48, 0, 0.82, 1];
const WX_NUGGET_EXIT_DROP = 52;

/** On-screen UI easing — Emil Kowalski flowchart (not entering viewport). */
const WX_TAB_EASE_IN_OUT = [0.4, 0, 0.2, 1];
/** Sliding tab pill — out-expo so it glides without overshoot. */
const WX_TAB_PILL_EASE = [0.22, 1, 0.36, 1];
const WX_TAB_PILL_DURATION = 0.36;
const WX_TAB_MICRO_DURATION = 0.28;
/** Resting blur on inactive labels — they crossfade through this on (de)select. */
const WX_TAB_LABEL_BLUR = 4;
/** Lenis scroll-to-section — smoother than linear. */
const WX_LENIS_EASE_IN_OUT = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

function FigmaImage({ primary, fallback, alt, className, loading = "lazy" }) {
  const [src, setSrc] = useState(primary);

  useEffect(() => {
    setSrc(primary);
  }, [primary]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      draggable={false}
      onError={() => {
        if (fallback && src !== fallback) setSrc(fallback);
      }}
    />
  );
}

function RevealCard({ children, className, reduceMotion, as = "article", ...rest }) {
  const Tag = motion[as] ?? motion.article;
  return (
    <Tag
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0.94 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.28, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.55,
        ease: [0.19, 1, 0.22, 1],
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function WorkNuggetChip({ label, fill, iconKey, engaged, index, reduceMotion, pos, chipRef }) {
  const Icon = NUGGET_ICON_MAP[iconKey];
  const ink = labelOnChipFill(fill);
  const yHidden = pos.y + WX_NUGGET_ENTER_LIFT;
  const yExit = pos.y + WX_NUGGET_EXIT_DROP;

  return (
    <div className="wx-work-nugget-center">
      <motion.div
        ref={chipRef}
        className="wx-work-nugget wx-work-nugget--chip"
        style={{
          color: ink,
          backgroundColor: fill,
          zIndex: engaged ? pos.z : index,
        }}
        initial={false}
        animate={
          engaged
            ? reduceMotion
              ? { x: pos.x, y: pos.y, scale: 1, opacity: 1, rotate: 0 }
              : {
                  x: pos.x,
                  y: [yHidden, pos.y],
                  scale: [0.96, 1],
                  opacity: [0, 1],
                  rotate: 0,
                }
            : reduceMotion
              ? { x: pos.x, y: yExit, opacity: 0, rotate: 0, scale: 0.88 }
              : { x: pos.x, y: yExit, opacity: 0, rotate: 0, scale: 0.88 }
        }
        transition={
          reduceMotion
            ? { duration: 0.12, ease: "easeOut" }
            : engaged
              ? {
                  delay: index * WX_NUGGET_ENTER_STAGGER,
                  duration: WX_NUGGET_ENTER_DURATION,
                  ease: WX_NUGGET_ENTER_EASE,
                }
              : {
                  type: "tween",
                  duration: WX_NUGGET_EXIT_DURATION,
                  ease: WX_NUGGET_EXIT_EASE,
                  delay: index * WX_NUGGET_EXIT_STAGGER,
                }
        }
      >
        {Icon ? (
          <HugeiconsIcon icon={Icon} size={14} color={ink} strokeWidth={2.1} aria-hidden />
        ) : null}
        {label}
      </motion.div>
    </div>
  );
}

function WorkCard({ entry, reduceMotion }) {
  const [active, setActive] = useState(false);

  const img = entry.image
    ? {
        primary: WINNIE_FIGMA_ASSETS[entry.image.primary],
        fallback: WINNIE_IMAGE_FALLBACKS[entry.image.fallback],
      }
    : null;

  const nuggets = entry.nuggets ?? [];
  const n = nuggets.length;

  /**
   * Dynamic chip gap — measure frame width + widest chip, then clamp so:
   *   - gap never undercuts a no-overlap floor (`chipWidth + EDGE_BUFFER`)
   *   - row always fits inside `(frameWidth - 2 * SIDE_PAD)`
   * Removes the old `matchMedia` breakpoint guess; the row now self-fits at any width.
   */
  const frameRef = useRef(null);
  const chipRefs = useRef([]);
  const [frameWidth, setFrameWidth] = useState(0);
  const [widestChip, setWidestChip] = useState(0);

  const setChipRef = useCallback(
    (i) => (node) => {
      chipRefs.current[i] = node;
    },
    [],
  );

  useEffect(() => {
    const el = frameRef.current;
    if (!el || typeof ResizeObserver === "undefined") {
      if (el) setFrameWidth(el.getBoundingClientRect().width);
      return undefined;
    }
    const ro = new ResizeObserver((entries) => {
      for (const entryItem of entries) {
        const w = entryItem.contentRect?.width ?? 0;
        setFrameWidth((prev) => (Math.abs(prev - w) > 0.5 ? w : prev));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!n) return;
    let max = 0;
    for (const node of chipRefs.current) {
      if (!node) continue;
      const w = node.getBoundingClientRect().width;
      if (w > max) max = w;
    }
    if (max > 0) {
      setWidestChip((prev) => (Math.abs(prev - max) > 0.5 ? max : prev));
    }
  }, [n, frameWidth]);

  const nuggetGap = useMemo(() => {
    if (n <= 1) return WX_NUGGET_GAP_PREFERRED;
    const chipW = widestChip || 72;
    const floor = chipW + WX_NUGGET_GAP_EDGE_BUFFER;
    if (!frameWidth) return Math.max(floor, WX_NUGGET_GAP_PREFERRED);
    const fit = (frameWidth - 2 * WX_NUGGET_SIDE_PAD - chipW) / (n - 1);
    const clamped = Math.min(WX_NUGGET_GAP_PREFERRED, fit);
    return Math.round(Math.max(floor, clamped));
  }, [frameWidth, widestChip, n]);

  const nuggetLayout = useMemo(() => {
    if (n <= 0) return [];
    if (n <= 1) return [{ x: 0, y: WX_NUGGET_ROW_Y, z: 20 }];
    const mid = (n - 1) / 2;
    return nuggets.map((_, i) => ({
      x: (i - mid) * nuggetGap,
      y: WX_NUGGET_ROW_Y,
      z: 20 + i,
    }));
  }, [n, nuggetGap, nuggets]);

  const copyEase = [0.22, 1, 0.36, 1];
  const copyTrans = (delay) =>
    reduceMotion
      ? { duration: 0.12, ease: "easeOut" }
      : { duration: 0.4, ease: copyEase, delay };

  return (
    <RevealCard
      reduceMotion={reduceMotion}
      className={clsx("wx-work-card group", active && "wx-work-card--active")}
      tabIndex={0}
      role="group"
      aria-label={`${entry.overlayTitle}. ${entry.overlaySubtitle}. Hover or focus to see project details.`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setActive(false);
      }}
    >
      <div className="wx-gallery-frame" ref={frameRef}>
        <div className="wx-work-card-surface">
          <div className="wx-work-card-media" aria-hidden>
            {img ? (
              <FigmaImage
                primary={img.primary}
                fallback={img.fallback}
                alt={entry.alt}
                className="wx-work-card-media-img"
              />
            ) : (
              <div className="wx-work-card-media-fallback" />
            )}
          </div>
          <div className="wx-work-card-scrim" aria-hidden />

          <div className="wx-work-center-copy">
            <div className="wx-work-center-copy-inner">
              <motion.p
                className="w-full text-center text-lg font-medium tracking-tight text-[var(--wx-on-scrim)] sm:text-xl"
                initial={false}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0.12, ease: "easeOut" }
                    : active
                      ? copyTrans(0)
                      : { duration: 0.3, ease: [0.5, 0, 0.88, 1], delay: 0.06 }
                }
              >
                {entry.overlayTitle}
              </motion.p>
              <motion.p
                className="w-full text-center text-sm leading-relaxed text-[var(--wx-on-scrim-muted)] sm:text-[0.9375rem]"
                initial={false}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0.12, ease: "easeOut" }
                    : active
                      ? copyTrans(0.14)
                      : { duration: 0.3, ease: [0.5, 0, 0.88, 1], delay: 0 }
                }
              >
                {entry.overlaySubtitle}
              </motion.p>
            </div>
          </div>
        </div>

        {nuggets.length ? (
          <div className="wx-work-nuggets-anchor" aria-hidden>
            {nuggets.map((item, i) => (
              <WorkNuggetChip
                key={`${entry.slug}-${item.label}`}
                label={item.label}
                fill={item.color}
                iconKey={item.icon}
                engaged={active}
                index={i}
                reduceMotion={reduceMotion}
                pos={nuggetLayout[i]}
                chipRef={setChipRef(i)}
              />
            ))}
          </div>
        ) : null}
        <WorkCardCaption entry={entry} />
      </div>
    </RevealCard>
  );
}

/**
 * Museum-plaque caption — single line under each work image. Replaces the
 * persistent badges that used to sit on the image. Title left, metadata right
 * (Concept · Kind · Year). Whole row is a link if `caseStudyPath` exists.
 */
function WorkCardCaption({ entry }) {
  const meta = [
    entry.concept ? "Concept" : null,
    entry.kind,
    entry.year,
  ]
    .filter(Boolean)
    .join(" · ");

  const inner = (
    <div className="wx-work-caption">
      <span className="wx-work-caption__title">{entry.title}</span>
      <span className="wx-work-caption__meta">
        {meta}
        {entry.caseStudyPath ? (
          <span aria-hidden className="wx-work-caption__arrow">↗</span>
        ) : null}
      </span>
    </div>
  );

  if (entry.caseStudyPath) {
    return (
      <ViewTransitionLink to={entry.caseStudyPath} className="wx-work-caption-link">
        {inner}
      </ViewTransitionLink>
    );
  }
  return inner;
}

const HEADLINE_ROTATE_WORDS = ["clear", "human", "accessible", "intentional"];
/** Keep in sync with `--wx-headline-word-enter-duration` in winnie-exploration.css */
const HEADLINE_WORD_ENTER_DURATION = 0.26;

/** Same order as `WINNIE_ACCENT_HEX` / capability cards — tints the wordmark via mask */
const WX_WORDMARK_MARK_GRADIENT = `linear-gradient(135deg, var(--wx-primary) 0%, var(--wx-accent-teal) 32%, var(--wx-accent-violet) 64%, var(--wx-accent-amber) 100%)`;

/**
 * Figma SVG as mask + `background` so fill tracks tokens (Figma files often ship fixed raster colors).
 */
function MaskedFigmaIcon({ src, className, background = "var(--wx-primary)", style, ...rest }) {
  return (
    <div
      className={className}
      style={{
        background,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        ...style,
      }}
      aria-hidden
      {...rest}
    />
  );
}

function AsideHeroHeadline({ reduceMotion }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % HEADLINE_ROTATE_WORDS.length);
    }, 3500);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const idx = reduceMotion ? 0 : wordIndex;
  const activeWord = HEADLINE_ROTATE_WORDS[idx];

  return (
    <h1 className="wx-headline relative block w-full max-w-full text-[1.625rem] font-medium leading-none tracking-tight text-[var(--wx-ink)] sm:text-[1.75rem]">
      <span className="wx-headline-line">
        <span className="wx-headline-static">Designs that feel</span>
        <span className="wx-headline-gap"> </span>
        <span className="wx-alive">
          <span className="wx-headline-word-wrap">
            <span className="wx-headline-rotate" aria-live="polite">
              <span className="wx-headline-rotate__mask">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={activeWord}
                    className="wx-headline-rotate__word"
                    initial={
                      reduceMotion
                        ? false
                        : { y: "110%", opacity: 0.12, filter: "blur(10px)", scale: 0.8 }
                    }
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={
                      reduceMotion
                        ? undefined
                        : { y: "-120%", opacity: 0, filter: "blur(12px)", scale: 0.8 }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: HEADLINE_WORD_ENTER_DURATION, ease: [0.45, 0.02, 0.2, 1] }
                    }
                  >
                    {activeWord}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
            <span
              key={`spark-${activeWord}`}
              className={clsx("wx-sparkle", !reduceMotion && "wx-sparkle--run")}
              aria-hidden
            >
              <MaskedFigmaIcon
                className="wx-sparkle__img"
                src={WINNIE_FIGMA_ASSETS.headlineSparkle}
                background="var(--wx-primary)"
              />
            </span>
          </span>
        </span>
      </span>
    </h1>
  );
}

/**
 * Fallback icon set for stack entries without a Simple Icons slug
 * (e.g. brands removed from the Simple Icons registry by trademark request).
 */
const STACK_FALLBACK_ICON_MAP = {
  CodeCircleIcon,
  ComputerDesk01Icon,
  Layout01Icon,
  PenTool01Icon,
};

function StackToolIcon({ tool }) {
  const src = stackToolLogoUrl(tool);
  if (src) {
    return (
      <img
        className="wx-stack-nugget__logo"
        src={src}
        alt=""
        width={18}
        height={18}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    );
  }
  const FallbackIcon = tool.hugeIcon ? STACK_FALLBACK_ICON_MAP[tool.hugeIcon] : null;
  if (FallbackIcon) {
    return (
      <HugeiconsIcon
        icon={FallbackIcon}
        size={18}
        color={tool.brandHex}
        strokeWidth={2}
        aria-hidden
      />
    );
  }
  return null;
}

function StackNuggetItem({ t }) {
  return (
    <a
      href={t.href}
      target="_blank"
      rel="noreferrer"
      className="wx-stack-nugget"
      style={{ "--wx-stack-accent": t.brandHex }}
    >
      {/* Logo well: always page-bg so monochrome SVG reads regardless of chip colour */}
      <span className="wx-stack-nugget__logo-wrap">
        <StackToolIcon tool={t} />
      </span>
      <span className="wx-stack-nugget__meta">
        <span className="wx-stack-nugget__label">{t.label}</span>
      </span>
    </a>
  );
}

function StackMarqueeLane({ laneIndex, tools }) {
  const reverse = laneIndex % 2 === 1;
  return (
    <div className="wx-stack-marquee">
      <div
        className={clsx(
          "wx-stack-marquee__inner",
          reverse && "wx-stack-marquee__inner--reverse",
        )}
      >
        {tools.map((t) => (
          <div key={`${laneIndex}-${t.label}`} className="wx-stack-marquee__item">
            <StackNuggetItem t={t} />
          </div>
        ))}
        {tools.map((t) => (
          <div
            key={`${laneIndex}-${t.label}-dup`}
            className="wx-stack-marquee__item"
            aria-hidden
          >
            <StackNuggetItem t={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StackToolkitNuggets() {
  return (
    <div className="wx-stack-marquee-stack" role="region" aria-label="Tools and stack">
      {WINNIE_STACK_MARQUEE_LAYERS.map((tools, i) => (
        <StackMarqueeLane key={i} laneIndex={i} tools={tools} />
      ))}
    </div>
  );
}

function ContactPill({ c, reduceMotion, labelEase }) {
  const PhosphorIcon = CONTACT_PHOSPHOR_ICONS[c.icon];
  const external = c.href.startsWith("http");
  const [open, setOpen] = useState(false);

  return (
    <motion.a
      href={c.href}
      className="wx-contact-pill"
      aria-label={c.label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      layout={!reduceMotion}
      transition={reduceMotion ? { duration: 0 } : { layout: { duration: 0.22, ease: labelEase } }}
    >
      <span className="wx-contact-pill__icon" aria-hidden>
        {PhosphorIcon ? (
          <PhosphorIcon className="wx-contact-pill__phosphor" size={18} weight="regular" />
        ) : null}
      </span>
      <motion.span
        className="wx-contact-pill__label"
        aria-hidden
        initial={false}
        animate={
          reduceMotion
            ? { width: "auto", opacity: 1 }
            : { width: open ? "auto" : 0, opacity: open ? 1 : 0 }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.2, ease: labelEase }
        }
        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      >
        {c.label}
      </motion.span>
    </motion.a>
  );
}

function AsideContactRow({ reduceMotion }) {
  const labelEase = WX_TAB_EASE_IN_OUT;
  return (
    <nav className="wx-contact-row" aria-label="Contact and social links">
      {WINNIE_CONTACT_SOCIALS.map((c) => (
        <ContactPill key={c.label} c={c} reduceMotion={reduceMotion} labelEase={labelEase} />
      ))}
    </nav>
  );
}

const FAQ_PANEL_EASE = [0.33, 1, 0.68, 1];

function WinnieFaqAccordion({ reduceMotion }) {
  const [openSet, setOpenSet] = useState(() => new Set());

  const toggle = useCallback((idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : {
        height: { type: "tween", duration: 0.42, ease: FAQ_PANEL_EASE },
        opacity: { type: "tween", duration: 0.26, ease: FAQ_PANEL_EASE },
      };

  return (
    <div>
      {WINNIE_FAQ.map((item, idx) => {
        const isOpen = openSet.has(idx);
        return (
          <div key={item.q} className="wx-faq-item">
            <button
              type="button"
              id={`winnie-faq-trigger-${idx}`}
              className="wx-faq-summary"
              aria-expanded={isOpen}
              aria-controls={`winnie-faq-panel-${idx}`}
              onClick={() => toggle(idx)}
            >
              <span>{item.q}</span>
              <motion.span
                className="wx-faq-chevron text-[var(--wx-muted)]"
                aria-hidden
                initial={false}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "tween", duration: 0.34, ease: FAQ_PANEL_EASE }
                }
              />
            </button>
            <motion.div
              id={`winnie-faq-panel-${idx}`}
              role="region"
              aria-labelledby={`winnie-faq-trigger-${idx}`}
              aria-hidden={!isOpen}
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={panelTransition}
              style={{ overflow: "hidden" }}
            >
              <div className="wx-faq-panel-inner">
                <div className="wx-faq-answer-row">
                  <div className="wx-faq-avatar-placeholder" aria-hidden />
                  <motion.div
                    className="wx-faq-bubble"
                    initial={false}
                    animate={
                      isOpen
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 10, scale: 0.97 }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 32, mass: 0.85 }
                    }
                  >
                    <p className="wx-faq-bubble__text wx-faq-bubble__answer">{item.a}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/** Small dot following the pointer — exploration page only; skipped when reduced motion. */
function WinnieDotCursor({ reduceMotion }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const onMove = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  if (reduceMotion) return null;
  return <div ref={ref} className="wx-dot-cursor" aria-hidden />;
}

/* =====================================================================
   Commercial-clarity components
   - Trust strip, productized service cards, P→D→O case story, How-I-work
     fallback, and qualified-contact form. All accents driven by the four
     wx-accent tokens (primary, teal, violet, amber) so the palette stays
     coherent across nuggets, icons, and hovers.
   ===================================================================== */

/**
 * ServicesList — calm typographic list. Title + a single sentence.
 * No prices, no codes, no icons, no cards. Pricing lives in the FAQ.
 * Pattern follows Reynolds / Rusli / Carignan.
 */
function ServicesList({ reduceMotion }) {
  return (
    <RevealCard
      reduceMotion={reduceMotion}
      as="section"
      aria-labelledby="winnie-services-heading"
      className="overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-page-bg)] p-6 ring-1 ring-[color:var(--wx-border-soft)] sm:p-8 lg:p-10"
    >
      <p
        id="winnie-services-heading"
        className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--wx-muted)]"
      >
        Services
      </p>
      <ul className="mt-6 divide-y divide-[color:var(--wx-border-soft)]">
        {WINNIE_SERVICES.map((svc) => (
          <li key={svc.slug} className="wx-service-row py-4 first:pt-2 last:pb-2 sm:py-5">
            <p className="text-[1rem] font-medium leading-snug text-[var(--wx-ink)] sm:text-[1.0625rem]">
              {svc.title}
            </p>
            <p className="mt-1 text-[0.875rem] leading-relaxed text-[var(--wx-muted)]">
              {svc.body}
            </p>
          </li>
        ))}
      </ul>
    </RevealCard>
  );
}

function QualificationForm({ reduceMotion }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [];
    for (const field of WINNIE_QUALIFICATION_FIELDS) {
      const value = (data.get(field.id) ?? "").toString().trim();
      if (!value) continue;
      lines.push(`${field.label}: ${value}`);
    }
    const body = encodeURIComponent(lines.join("\n\n"));
    const subject = encodeURIComponent("Project brief — wineury.design");
    setSubmitted(true);
    window.location.href = `mailto:wineurya30@gmail.com?subject=${subject}&body=${body}`;
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[calc(var(--wx-radius-card)-2px)] border border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)] p-5 text-sm leading-relaxed text-[var(--wx-ink)]"
      >
        Your brief is on its way. If your email client didn&apos;t open, send the same
        details to{" "}
        <a className="text-[var(--wx-primary)] underline-offset-4 hover:underline" href="mailto:wineurya30@gmail.com">
          wineurya30@gmail.com
        </a>
        . I&apos;ll reply within two business days.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 sm:grid-cols-2 sm:gap-5"
      aria-label="Project qualification form"
    >
      {WINNIE_QUALIFICATION_FIELDS.map((field) => {
        const isFullWidth =
          field.type === "textarea" || field.id === "name" || field.id === "links";
        return (
          <label
            key={field.id}
            htmlFor={`wx-qf-${field.id}`}
            className={clsx("flex flex-col gap-1.5", isFullWidth && "sm:col-span-2")}
          >
            <span className="text-[0.75rem] font-medium tracking-wide text-[var(--wx-ink)]">
              {field.label}
              {field.required ? (
                <span aria-hidden className="ml-1 text-[var(--wx-primary)]">
                  *
                </span>
              ) : null}
            </span>
            {field.type === "textarea" ? (
              <textarea
                id={`wx-qf-${field.id}`}
                name={field.id}
                required={field.required}
                placeholder={field.placeholder}
                rows={3}
                className="wx-form-input wx-form-input--textarea"
              />
            ) : field.type === "select" ? (
              <select
                id={`wx-qf-${field.id}`}
                name={field.id}
                required={field.required}
                defaultValue=""
                className="wx-form-input"
              >
                <option value="" disabled>
                  Select one
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`wx-qf-${field.id}`}
                type="text"
                name={field.id}
                required={field.required}
                placeholder={field.placeholder}
                className="wx-form-input"
              />
            )}
          </label>
        );
      })}
      <div className="sm:col-span-2 flex flex-wrap items-center gap-3 sm:gap-4">
        <motion.button
          type="submit"
          className="wx-btn-primary"
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          transition={{ type: "tween", duration: 0.15, ease: [0.3, 0, 0, 1] }}
        >
          <HugeiconsIcon icon={Mail01Icon} size={15} strokeWidth={1.6} />
          Send brief
        </motion.button>
        <p className="text-[0.75rem] leading-relaxed text-[var(--wx-muted)]">
          Opens your mail client with the brief preformatted. No data leaves your device.
        </p>
      </div>
    </form>
  );
}

export function WinnieExplorationPage() {
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const activeIndex = useWinnieSectionScroll(WINNIE_SECTION_IDS);
  /** ScrollTrigger lags Lenis during smooth scroll — keep tab UI in sync with user intent. */
  const [scrollIntentIndex, setScrollIntentIndex] = useState(null);
  const selectedIndex = scrollIntentIndex ?? activeIndex;

  useEffect(() => {
    if (scrollIntentIndex === null) return;
    if (activeIndex === scrollIntentIndex) setScrollIntentIndex(null);
  }, [activeIndex, scrollIntentIndex]);

  const tabRowRef = useRef(null);

  const tabPillTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: WX_TAB_PILL_DURATION, ease: WX_TAB_PILL_EASE },
    [reduceMotion],
  );

  const tabMicroTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.01 }
        : { duration: WX_TAB_MICRO_DURATION, ease: WX_TAB_EASE_IN_OUT },
    [reduceMotion],
  );

  useEffect(() => {
    const onRefresh = () => ScrollTrigger.refresh();
    const imgs = document.querySelectorAll(".winnie-exploration img");
    let remaining = imgs.length;
    const done = () => {
      remaining -= 1;
      if (remaining <= 0) onRefresh();
    };
    imgs.forEach((img) => {
      if (img.complete) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });
    if (remaining <= 0) onRefresh();
    const t = window.setTimeout(onRefresh, 450);
    return () => window.clearTimeout(t);
  }, []);

  const scrollToSection = (sectionId, tabIndexOverride) => {
    const tabIndex =
      typeof tabIndexOverride === "number"
        ? tabIndexOverride
        : WINNIE_TABS.findIndex((t) => t.sectionId === sectionId);
    if (tabIndex >= 0) setScrollIntentIndex(tabIndex);

    const el = document.getElementById(sectionId);
    if (!el) return;
    const offset = 0;
    const duration = reduceMotion ? 0 : 1.35;
    if (lenis) {
      lenis.scrollTo(el, {
        offset,
        duration,
        easing: reduceMotion ? undefined : WX_LENIS_EASE_IN_OUT,
      });
      return;
    }
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div
      className={clsx(
        "winnie-exploration wx-exploration-root relative z-0 min-h-dvh",
        !reduceMotion && "wx-exploration-root--custom-cursor",
      )}
    >
      <WinnieDotCursor reduceMotion={reduceMotion} />
      <div className="wx-grain" aria-hidden />

      <div className="relative z-[2] flex w-full min-h-dvh flex-col lg:min-h-0 lg:flex-row">
        <aside
          className={clsx(
            "relative z-20 flex w-full shrink-0 flex-col border-b border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)]",
            "lg:h-svh lg:max-h-svh lg:grow-0 lg:shrink-0 lg:basis-[var(--wx-explore-aside-basis)] lg:min-w-0 lg:sticky lg:top-0 lg:overflow-y-auto lg:overscroll-contain lg:border-b-0",
          )}
          aria-label="Introduction"
        >
          <div className="flex min-h-0 w-full flex-1 flex-col px-[var(--wx-pad-x)] pb-10 pt-0 sm:pt-10 lg:min-h-0 lg:pb-12 lg:pt-12">
            <div className="wx-mobile-nav-spacer max-sm:block sm:hidden" aria-hidden />
            <div className="wx-mobile-sticky-nav flex w-full min-w-0 shrink-0 flex-row flex-nowrap items-center justify-between gap-3 min-h-14 sm:gap-4">
              <a
                href={location.pathname === "/" ? "#winnie-section-work" : "/"}
                className="group relative inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    scrollToSection("winnie-section-work", 0);
                    return;
                  }
                  e.preventDefault();
                  navigateWithViewTransition(navigate, "/");
                }}
              >
                <span className="flex flex-col gap-0 text-[1rem] font-medium leading-[1.12] text-[var(--wx-ink)]">
                  <span className="tracking-tight">wineury</span>
                  <span className="-mt-px flex items-center gap-1">
                    <MaskedFigmaIcon
                      src={WINNIE_FIGMA_ASSETS.logoMark}
                      className="size-3 shrink-0 translate-y-px select-none"
                      background={WX_WORDMARK_MARK_GRADIENT}
                    />
                    <span className="tracking-tight">almonte</span>
                  </span>
                </span>
              </a>

              <div
                className="wx-tab-track min-w-0 max-w-full shrink overflow-x-auto overflow-y-visible overscroll-x-contain [-webkit-overflow-scrolling:touch]"
                role="tablist"
                aria-label="Sections"
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  e.preventDefault();
                  const dir = e.key === "ArrowRight" ? 1 : -1;
                  const next = (selectedIndex + dir + WINNIE_TABS.length) % WINNIE_TABS.length;
                  scrollToSection(WINNIE_TABS[next].sectionId, next);
                  document.getElementById(`winnie-tab-${WINNIE_TABS[next].id}`)?.focus();
                }}
              >
                <div
                  ref={tabRowRef}
                  className="relative inline-flex w-max min-w-0 flex-nowrap items-center gap-1 p-1.5"
                >
                  {WINNIE_TABS.map((tab, i) => {
                    const selected = selectedIndex === i;
                    return (
                      <motion.button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={`winnie-tab-${tab.id}`}
                        aria-selected={selected}
                        aria-controls={tab.sectionId}
                        aria-label={tab.label}
                        tabIndex={selected ? 0 : -1}
                        layout
                        transition={tabPillTransition}
                        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                        className={clsx(
                          "wx-tab relative flex min-h-10 items-center justify-center rounded-[var(--wx-radius-segment)] text-sm outline-none",
                          "text-[var(--wx-tab-idle-fg)] px-3 py-2",
                          selected ? "font-semibold" : "min-w-10 font-medium",
                        )}
                        onClick={() => scrollToSection(tab.sectionId, i)}
                      >
                        {/* Idle background — static per-button. Hidden under the layoutId pill when selected. */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 -z-20 rounded-[var(--wx-radius-segment)]"
                          style={{
                            backgroundColor: "var(--wx-tab-idle)",
                            boxShadow: "var(--wx-tab-shadow-idle)",
                          }}
                        />
                        {/* Active pill — single instance, FLIPs between buttons via shared layoutId. */}
                        {selected ? (
                          <motion.span
                            layoutId="wx-tab-pill"
                            aria-hidden
                            className="pointer-events-none absolute inset-0 -z-10 rounded-[var(--wx-radius-segment)]"
                            style={{
                              backgroundColor: "var(--wx-primary)",
                              boxShadow: "var(--wx-tab-shadow-active)",
                            }}
                            transition={tabPillTransition}
                          />
                        ) : null}
                        <motion.span
                          layout="position"
                          className="relative z-10 flex min-w-0 items-center justify-center"
                          transition={tabPillTransition}
                        >
                          <motion.span
                            className="flex shrink-0 items-center justify-center"
                            initial={false}
                            animate={
                              reduceMotion
                                ? { opacity: 1 }
                                : { opacity: selected ? 1 : 0.82 }
                            }
                            transition={tabMicroTransition}
                          >
                            <HugeiconsIcon
                              icon={TAB_ICONS[i]}
                              size={17}
                              color="currentColor"
                              strokeWidth={1.6}
                            />
                          </motion.span>
                          <AnimatePresence initial={false}>
                            {selected ? (
                              <motion.span
                                key="label"
                                layout
                                className="wx-tab-label-text overflow-hidden whitespace-nowrap tracking-tight"
                                style={{ display: "inline-block" }}
                                initial={
                                  reduceMotion
                                    ? { opacity: 1, width: "auto", marginLeft: 8 }
                                    : { opacity: 0, width: 0, marginLeft: 0, filter: `blur(${WX_TAB_LABEL_BLUR}px)` }
                                }
                                animate={{
                                  opacity: 1,
                                  width: "auto",
                                  marginLeft: 8,
                                  filter: "blur(0px)",
                                }}
                                exit={
                                  reduceMotion
                                    ? { opacity: 0, width: 0, marginLeft: 0 }
                                    : { opacity: 0, width: 0, marginLeft: 0, filter: `blur(${WX_TAB_LABEL_BLUR}px)` }
                                }
                                transition={tabPillTransition}
                              >
                                {tab.label}
                              </motion.span>
                            ) : null}
                          </AnimatePresence>
                        </motion.span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-9 flex w-full flex-1 flex-col items-start justify-center lg:mt-12 lg:min-h-0 lg:py-2">
              <div className="relative w-full max-w-[var(--wx-max-copy)] space-y-5 text-left">
                <div className="flex items-center gap-2 text-[0.9375rem] leading-6 text-[var(--wx-muted)] sm:text-[1rem] sm:leading-7">
                  <MaskedFigmaIcon
                    src={WINNIE_FIGMA_ASSETS.statusDot}
                    className="size-2 shrink-0 select-none"
                    background="var(--wx-accent-teal)"
                  />
                  <p>{WINNIE_HERO.eyebrow}</p>
                </div>

                <div className="space-y-5">
                  <div className="relative">
                    <AsideHeroHeadline reduceMotion={reduceMotion} />
                    <p className="mt-2 max-w-[var(--wx-max-copy)] text-[0.9375rem] leading-relaxed text-[var(--wx-muted)] sm:text-[1rem] sm:leading-6">
                      {WINNIE_HERO.subhead}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <motion.button
                      type="button"
                      className="wx-btn-primary"
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      transition={{ type: "tween", duration: 0.15, ease: [0.3, 0, 0, 1] }}
                      onClick={() => scrollToSection("winnie-section-contact", 3)}
                    >
                      {WINNIE_HERO.primaryCta.label}
                    </motion.button>
                    <motion.button
                      type="button"
                      className="wx-btn-secondary"
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      transition={{ type: "tween", duration: 0.15, ease: [0.3, 0, 0, 1] }}
                      onClick={() => scrollToSection("winnie-section-work", 0)}
                    >
                      {WINNIE_HERO.secondaryCta.label}
                    </motion.button>
                  </div>

                  <dl className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-[var(--wx-muted)]">
                    <div className="flex items-center gap-1.5">
                      <HugeiconsIcon icon={Calendar01Icon} size={14} strokeWidth={1.6} />
                      <dt className="sr-only">Availability</dt>
                      <dd>{WINNIE_AVAILABILITY.opening}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-[var(--wx-primary)]" aria-hidden />
                      <dt className="sr-only">Engagements</dt>
                      <dd>{WINNIE_AVAILABILITY.note}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-auto w-full space-y-6 pt-8 lg:space-y-7 lg:pt-10">
              <div>
                <p className="wx-aside-footer__label">Stack</p>
                <div className="mt-2">
                  <StackToolkitNuggets />
                </div>
              </div>
              <div>
                <div className="mt-1">
                  <AsideContactRow reduceMotion={reduceMotion} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div
          className="relative z-10 flex w-full min-w-0 shrink-0 flex-col gap-[var(--wx-gallery-gap)] px-[var(--wx-pad-x)] pb-20 pt-10 lg:min-w-0 lg:flex-1 lg:basis-0 lg:px-3 lg:pl-3 lg:pr-[var(--wx-pad-x)] lg:pb-24 lg:pt-12"
          id="winnie-panels"
        >
          {/* ============================== WORK ============================== */}
          <section
            id="winnie-section-work"
            role="tabpanel"
            aria-labelledby="winnie-tab-work"
            className="wx-work-section min-h-0 space-y-[var(--wx-gallery-gap)] pb-[var(--wx-space-section)]"
          >
            {WINNIE_WORK.filter((entry) => entry.status !== "incomplete").map((entry) => (
              <WorkCard key={entry.slug} entry={entry} reduceMotion={reduceMotion} />
            ))}
          </section>

          {/* ============================== STUDIO ============================== */}
          <section
            id="winnie-section-studio"
            role="tabpanel"
            aria-labelledby="winnie-tab-studio"
            className="space-y-[var(--wx-gallery-gap)]"
          >
            <RevealCard
              reduceMotion={reduceMotion}
              className="grid gap-6 overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] p-6 ring-1 ring-[color:var(--wx-ring-subtle)] sm:gap-7 lg:grid-cols-5 lg:items-center lg:gap-10 lg:p-8"
            >
              <div className="space-y-3 lg:col-span-3 lg:space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--wx-muted)]">
                  Studio
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-[var(--wx-ink)] sm:text-3xl">
                  Research-led design, built end to end.
                </h2>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--wx-muted)] sm:text-[1rem]">
                  Product designer focused on research, interaction design, and accessible interfaces. I design and build in the same conversation — no handoff gap between what I sketch and what ships.
                </p>
              </div>
              <div className="wx-gallery-frame overflow-hidden rounded-[calc(var(--wx-radius-card)-2px)] lg:col-span-2">
                <img
                  src={WINNIE_EXTRA_IMAGES.marble}
                  alt="Abstract marble light forms"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </RevealCard>

            <ServicesList reduceMotion={reduceMotion} />

            {WINNIE_TESTIMONIALS.length > 0 ? (
              <RevealCard
                reduceMotion={reduceMotion}
                className="overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] p-6 ring-1 ring-[color:var(--wx-ring-subtle)] sm:p-8 lg:p-10"
              >
                <figure className="space-y-5">
                  <HugeiconsIcon
                    icon={QuoteUpIcon}
                    size={26}
                    strokeWidth={1.4}
                    color="currentColor"
                    className="text-[var(--wx-primary)]"
                  />
                  <blockquote className="text-[1.0625rem] font-medium leading-relaxed tracking-tight text-[var(--wx-ink)] sm:text-[1.25rem] sm:leading-[1.5]">
                    &ldquo;{WINNIE_TESTIMONIALS[0].quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-[var(--wx-muted)]">
                    <span className="font-medium text-[var(--wx-ink)]">
                      {WINNIE_TESTIMONIALS[0].attribution}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{WINNIE_TESTIMONIALS[0].role}</span>
                  </figcaption>
                </figure>
              </RevealCard>
            ) : null}
          </section>

          {/* ============================== APPROACH ============================== */}
          <section
            id="winnie-section-approach"
            role="tabpanel"
            aria-labelledby="winnie-tab-approach"
            className="space-y-[var(--wx-gallery-gap)]"
          >
            <RevealCard
              reduceMotion={reduceMotion}
              className="space-y-6 overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] p-6 ring-1 ring-[color:var(--wx-ring-subtle)] sm:space-y-7 lg:space-y-8 lg:p-10"
            >
              <div className="max-w-2xl space-y-2 lg:space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--wx-muted)]">
                  Approach
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-[var(--wx-ink)] sm:text-3xl">
                  Research first, every time.
                </h2>
              </div>
              <ol className="grid gap-5 sm:grid-cols-3 sm:gap-6">
                {[
                  {
                    title: "Research",
                    body: "User interviews, usability testing, affinity mapping, and competitive audits before touching a wireframe.",
                  },
                  {
                    title: "Structure and prototype",
                    body: "Flows, wireframes, and high-fidelity prototypes that trace decisions back to research findings.",
                  },
                  {
                    title: "Test and refine",
                    body: "Usability testing, iteration, and accessibility validation through to handoff or build.",
                  },
                ].map((step, idx) => (
                  <li
                    key={step.title}
                    className="rounded-[calc(var(--wx-radius-card)-2px)] border border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)] p-5"
                  >
                    <p className="text-xs font-medium text-[var(--wx-primary)]">0{idx + 1}</p>
                    <p className="mt-2 font-medium text-[var(--wx-ink)]">{step.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--wx-muted)]">{step.body}</p>
                  </li>
                ))}
              </ol>
            </RevealCard>

            <RevealCard
              reduceMotion={reduceMotion}
              className="overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-page-bg)] p-6 ring-1 ring-[color:var(--wx-border-soft)] sm:p-8 lg:p-10"
            >
              <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
                {WINNIE_STATS.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <p className="wx-stat-value">{stat.value}</p>
                    <p className="text-sm font-medium text-[var(--wx-ink)]">{stat.label}</p>
                    <p className="text-[0.8125rem] leading-relaxed text-[var(--wx-muted)]">
                      {stat.hint}
                    </p>
                  </div>
                ))}
              </div>
            </RevealCard>

            <RevealCard
              reduceMotion={reduceMotion}
              className="overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-page-bg)] p-6 ring-1 ring-[color:var(--wx-border-soft)] sm:p-8 lg:p-10"
            >
              <div className="mb-6 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--wx-muted)]">
                  FAQ
                </p>
                <h3 className="text-xl font-medium tracking-tight text-[var(--wx-ink)] sm:text-2xl">
                  Questions, answered.
                </h3>
              </div>
              <WinnieFaqAccordion reduceMotion={reduceMotion} />
            </RevealCard>
          </section>

          {/* ============================== CONTACT ============================== */}
          <section
            id="winnie-section-contact"
            role="tabpanel"
            aria-labelledby="winnie-tab-contact"
            className="space-y-[var(--wx-gallery-gap)]"
          >
            <RevealCard
              reduceMotion={reduceMotion}
              className="overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] ring-1 ring-[color:var(--wx-ring-subtle)]"
            >
              <div className="grid gap-6 p-6 sm:gap-8 sm:p-8 lg:gap-10 lg:p-10">
                <div className="space-y-4 lg:space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--wx-muted)]">
                    Contact
                  </p>
                  <h2 className="text-2xl font-medium tracking-tight text-[var(--wx-ink)] sm:text-3xl">
                    Tell me what you&apos;re building.
                  </h2>
                  <p className="max-w-xl text-[1rem] leading-relaxed text-[var(--wx-muted)]">
                    A short brief gets you a faster, more useful reply — two business days, every time.
                    If we&apos;re not the right fit, I&apos;ll say so quickly and point you somewhere better.
                  </p>
                </div>
                <QualificationForm reduceMotion={reduceMotion} />
                <div className="flex flex-wrap items-center gap-3 border-t border-[color:var(--wx-border-soft)] pt-5 text-[0.8125rem] text-[var(--wx-muted)]">
                  <span>Prefer email?</span>
                  <a
                    href="mailto:wineurya30@gmail.com"
                    className="inline-flex items-center gap-1.5 text-[var(--wx-ink)] underline-offset-4 hover:underline"
                  >
                    <HugeiconsIcon icon={Mail01Icon} size={14} strokeWidth={1.6} />
                    wineurya30@gmail.com
                  </a>
                  <span aria-hidden>·</span>
                  <span>Same questions, same two-day reply.</span>
                </div>
              </div>
            </RevealCard>

            <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-2 text-[0.8125rem] text-[var(--wx-muted)]">
              <p>© {new Date().getFullYear()} Wineury Almonte</p>
              <p className="flex items-center gap-3">
                <a
                  className="hover:text-[var(--wx-ink)]"
                  href="https://www.linkedin.com/in/wineury"
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <span aria-hidden>·</span>
                <a className="hover:text-[var(--wx-ink)]" href="mailto:wineurya30@gmail.com">
                  Email
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
