import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
import { ArrowUpRight } from "@phosphor-icons/react";
import { Envelope } from "@phosphor-icons/react/dist/csr/Envelope";
import { InstagramLogo } from "@phosphor-icons/react/dist/csr/InstagramLogo";
import { LinkedinLogo } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import { XLogo } from "@phosphor-icons/react/dist/csr/XLogo";
import { clsx } from "clsx";
import {
  BookTextIcon,
  CalendarDaysIcon,
  FigmaIcon as LucideFigmaIcon,
  GalleryThumbnailsIcon,
  LaptopMinimalCheckIcon,
  LayoutPanelTopIcon,
  LayersIcon,
  ListIcon,
  LoaderPinwheelIcon,
  MailCheckIcon,
  MessageCircleIcon,
  PenToolIcon,
  SparklesIcon,
  SquareStackIcon,
  TerminalIcon,
} from "lucide-animated";
import { useLocation, useNavigate } from "react-router-dom";
import { ViewTransitionLink } from "@/components/ViewTransitionLink.jsx";
import { ScrollTrigger } from "@/lib/gsap.js";
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
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import { WinnieTopNav } from "@/exploration/WinnieTopNav.jsx";
import { MaskedFigmaIcon, WX_WORDMARK_MARK_GRADIENT } from "@/exploration/MaskedFigmaIcon.jsx";
import "@/exploration/styles/winnie-exploration.css";

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
  Calendar01Icon,
  QuoteUpIcon,
  Mail01Icon,
  BookUserIcon,
};

/**
 * Lucide Animated — https://lucide-animated.com (npm: `lucide-animated`). Icons animate on hover.
 * Keys match `nuggets[].icon` in `winnie-content.js`; unmapped keys fall back to `NUGGET_ICON_MAP` + Hugeicons.
 */
const LUCIDE_NUGGET_MAP = {
  BookUserIcon: BookTextIcon,
  Calendar01Icon: CalendarDaysIcon,
  CodeCircleIcon: TerminalIcon,
  ComputerDesk01Icon: LaptopMinimalCheckIcon,
  FallingStarIcon: SparklesIcon,
  FigmaIcon: LucideFigmaIcon,
  FramerIcon: LoaderPinwheelIcon,
  GridTableIcon: GalleryThumbnailsIcon,
  GridViewIcon: ListIcon,
  Layout01Icon: LayoutPanelTopIcon,
  LayoutThreeColumnIcon: GalleryThumbnailsIcon,
  LayoutTwoColumnIcon: SquareStackIcon,
  Layers01Icon: LayersIcon,
  MagicWand01Icon: SparklesIcon,
  Mail01Icon: MailCheckIcon,
  PenTool01Icon: PenToolIcon,
  QuoteUpIcon: MessageCircleIcon,
};

/**
 * Work card nugget list: one timing model for show + hide (forward stagger in, reverse out).
 * Easing: Emil Kowalski — strong ease-out cubic-bezier(0.23, 1, 0.32, 1) for transform + opacity; ~240ms
 * for small UI; stagger 0.05s fits his 30–80ms list spacing. See emilkowal.ski, Motion easing docs.
 */
const NUGGET_ROW_MOTION = {
  stagger: 0.05,
  duration: 0.24,
  ease: [0.23, 1, 0.32, 1],
  /** Slide in from the top of the card / chrome row (px; negative = above final position) */
  yFrom: -14,
};

/**
 * `lucide-animated` icons: replay built-in path motion on an interval (ref disables their hover; see package).
 * Stagger first tick per chip; tune if animations overlap.
 */
const NUGGET_LUCIDE_LOOP_MS = 3000;
const NUGGET_LUCIDE_STAGGER_MS = 360;

function useCoarsePointerOrNoHover() {
  const [coarse, setCoarse] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const h = () => setCoarse(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return coarse;
}

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

/** sRGB 0–1 → WCAG 2.1 relative luminance. */
function relativeLuminanceFromHex(hex) {
  const { r, g, b } = hexToSrgb(hex);
  return (
    0.2126 * linearizeChannel(r) + 0.7152 * linearizeChannel(g) + 0.0722 * linearizeChannel(b)
  );
}

/** L1, L2 in [0,1]. Returns contrast ratio (≥1). */
function contrastRatio(L1, L2) {
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Work card nugget: pick UI near-black vs near-white for **maximum** contrast against fill.
 * (Luminance-threshold only fails in the “muddy mid” where both sides are weak; WCAG is target ≥4.5:1 for small type.)
 * Returns CSS color tokens; Hugeicons can consume `currentColor` via the span.
 */
function nuggetTextColor(fillHex) {
  const L = relativeLuminanceFromHex(fillHex);
  const Lblack = relativeLuminanceFromHex("#000000");
  const Lwhite = relativeLuminanceFromHex("#ffffff");
  const cBlack = contrastRatio(L, Lblack);
  const cWhite = contrastRatio(L, Lwhite);
  return cWhite > cBlack ? "var(--color-neutral-0)" : "var(--color-neutral-1000)";
}

/** `true` when the fill is dark enough to use light ink (styling for ink chips in warm Figma). */
function nuggetFillIsDeep(fillHex) {
  const L = relativeLuminanceFromHex(fillHex);
  const Lblack = relativeLuminanceFromHex("#000000");
  const Lwhite = relativeLuminanceFromHex("#ffffff");
  return contrastRatio(L, Lwhite) > contrastRatio(L, Lblack);
}

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

/** On-screen UI easing — Emil Kowalski flowchart (not entering viewport). */
const WX_TAB_EASE_IN_OUT = [0.4, 0, 0.2, 1];
/** Tab label expand/collapse when a segment is selected. */
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

/**
 * Figma 162-395 (showcase) / 162-414 (case study + View more). Defaults from `workCardVariant` + `caseStudyPath`.
 */
function getWorkCardVariant(entry) {
  if (entry.workCardVariant) return entry.workCardVariant;
  return entry.caseStudyPath ? "case-study" : "showcase";
}

/**
 * `workCardNuggetsAriaLabel` optional in `winnie-content.js` per entry. Default names the list for SR without repeating every chip.
 */
function getWorkCardNuggetsListAriaLabel(entry) {
  const custom = entry.workCardNuggetsAriaLabel?.trim();
  if (custom) return custom;
  return `${entry.title} at a glance`;
}

const WORK_CARD_TEASER_WORDS = 8;
/** Mouse-leave: delete finale/stutter one char at a time (stutter teaser). */
const WORK_CARD_STUTTER_UNTYPE_MS = 12;

function splitWorkTeaserWords(summary) {
  const t = summary.trim();
  if (!t) return { teaser: "", rest: "" };
  const words = t.split(/\s+/);
  if (words.length <= WORK_CARD_TEASER_WORDS) return { teaser: t, rest: "" };
  return {
    teaser: words.slice(0, WORK_CARD_TEASER_WORDS).join(" "),
    rest: " " + words.slice(WORK_CARD_TEASER_WORDS).join(" "),
  };
}

function WorkCardTeaserSimple({ full, isActive, reduceMotion, useLightOnImage, useWarmImageFooter }) {
  const { teaser, rest } = useMemo(() => splitWorkTeaserWords(full), [full]);
  const [restLen, setRestLen] = useState(0);

  useEffect(() => {
    if (!rest) {
      setRestLen(0);
      return;
    }
    if (reduceMotion) {
      setRestLen(isActive ? rest.length : 0);
      return;
    }
    const target = isActive ? rest.length : 0;
    if (restLen === target) return;
    const id = window.setTimeout(
      () => setRestLen((prev) => prev + (isActive ? 1 : -1)),
      isActive ? 19 : 12,
    );
    return () => window.clearTimeout(id);
  }, [isActive, rest, reduceMotion, restLen]);

  return (
    <p
      className={clsx(
        "wx-work-card-v2__summary m-0 text-left",
        useWarmImageFooter && "wx-work-card-v2__summary--warm-image",
        useLightOnImage && !useWarmImageFooter && "wx-work-card-v2__summary--on-image",
        rest && "wx-work-card-v2__summary--has-extend",
      )}
      aria-label={full}
    >
      <span className="wx-work-card-v2__summary-lead">{teaser}</span>
      {rest ? (
        <span
          className="wx-work-card-v2__summary-extend wx-work-card-v2__summary-extend--slot"
          aria-hidden={restLen === 0 && !isActive}
        >
          {rest.slice(0, restLen)}
        </span>
      ) : null}
    </p>
  );
}

/** Slight ragged typing: longer pauses on “phrase” boundaries (deterministic). */
function typeCharDelay(i) {
  return 16 + (i > 0 && i % 5 === 0 ? 28 : 0) + (i % 9 === 4 ? 16 : 0);
}

/**
 * `workCardTeaserLead` stands alone. On hover: optional 0–2 stutter lines (e.g. “Try:” nudges), then `finale`.
 * With no stutters, only the finale (e.g. a one-line quip) is typed in.
 */
function formatStutterSegment(s) {
  const t = (s ?? "").trim();
  if (!t) return "";
  return t.startsWith(" ") ? t : ` ${t}`;
}
function WorkCardStutterTeaser({ lead, s0, s1, finale, isActive, reduceMotion, useLightOnImage, useWarmImageFooter }) {
  const stutterParts = useMemo(() => {
    return [formatStutterSegment(s0), formatStutterSegment(s1)].filter((p) => p.length > 0);
  }, [s0, s1]);
  const finSpaced = useMemo(() => {
    const t = (finale.startsWith(" ") ? finale : ` ${finale}`).trimEnd();
    return t.startsWith(" ") ? t : ` ${t}`;
  }, [finale]);

  const [ext, setExt] = useState("");
  const [tone, setTone] = useState("finale");

  useEffect(() => {
    if (!isActive) {
      return;
    }
    if (reduceMotion) {
      setExt(finSpaced);
      setTone("finale");
      return;
    }
    const sleep = (ms) => new Promise((resolve) => { window.setTimeout(resolve, ms); });
    let gone = false;
    const partDelMs = 11;

    (async () => {
      setExt("");
      for (const [idx, part] of stutterParts.entries()) {
        if (gone) return;
        setTone(idx === 0 ? "s0" : "s1");
        for (let i = 0; i <= part.length; i += 1) {
          if (gone) return;
          setExt(part.slice(0, i));
          if (i < part.length) await sleep(typeCharDelay(i));
        }
        await sleep(400);
        for (let i = part.length; i >= 0; i -= 1) {
          if (gone) return;
          setExt(part.slice(0, i));
          if (i > 0) await sleep(partDelMs);
        }
        await sleep(120);
      }
      if (gone) return;
      setTone("finale");
      for (let i = 0; i <= finSpaced.length; i += 1) {
        if (gone) return;
        setExt(finSpaced.slice(0, i));
        if (i < finSpaced.length) await sleep(typeCharDelay(i));
      }
    })();

    return () => {
      gone = true;
    };
  }, [isActive, reduceMotion, stutterParts, finSpaced]);

  useEffect(() => {
    if (isActive) {
      return;
    }
    if (reduceMotion) {
      setExt("");
      setTone("finale");
      return;
    }
    if (ext.length === 0) {
      setTone("finale");
      return;
    }
    const id = window.setTimeout(() => {
      setExt((prev) => prev.slice(0, -1));
    }, WORK_CARD_STUTTER_UNTYPE_MS);
    return () => window.clearTimeout(id);
  }, [isActive, reduceMotion, ext]);

  return (
    <p
      className={clsx(
        "wx-work-card-v2__summary wx-work-card-v2__summary--stutter m-0 text-left",
        useWarmImageFooter && "wx-work-card-v2__summary--warm-image",
        useLightOnImage && !useWarmImageFooter && "wx-work-card-v2__summary--on-image",
      )}
    >
      <span className="wx-work-card-v2__summary-lead">{lead}</span>
      <span
        className={clsx(
          "wx-work-card-v2__summary-extend wx-work-card-v2__summary-extend--slot",
          ext.length > 0 && tone !== "finale" && "wx-work-card-v2__summary-extend--stutter",
          ext.length > 0 && tone === "finale" && "wx-work-card-v2__summary-extend--finale",
        )}
        aria-hidden={!isActive}
      >
        {ext}
      </span>
    </p>
  );
}

function workCardHasStutterTeaser(entry) {
  return Boolean(entry.workCardTeaserLead && entry.workCardFinale);
}

function WorkCardTeaserText({ entry, isActive, reduceMotion, useLightOnImage, useWarmImageFooter }) {
  if (workCardHasStutterTeaser(entry)) {
    return (
      <WorkCardStutterTeaser
        lead={entry.workCardTeaserLead}
        s0={entry.workCardStutters?.[0] ?? ""}
        s1={entry.workCardStutters?.[1] ?? ""}
        finale={entry.workCardFinale}
        isActive={isActive}
        reduceMotion={reduceMotion}
        useLightOnImage={useLightOnImage}
        useWarmImageFooter={useWarmImageFooter}
      />
    );
  }
  return (
    <WorkCardTeaserSimple
      full={entry.summary}
      isActive={isActive}
      reduceMotion={reduceMotion}
      useLightOnImage={useLightOnImage}
      useWarmImageFooter={useWarmImageFooter}
    />
  );
}

function workCardBackgroundUrl(entry) {
  if (entry.workCardBackgroundImage) return entry.workCardBackgroundImage;
  if (entry.image?.primary) {
    return WINNIE_FIGMA_ASSETS[entry.image.primary] ?? WINNIE_IMAGE_FALLBACKS[entry.image.fallback];
  }
  return null;
}

/** Default 16:9; optional `workCardAspect` (`"1/1"`, `"4/5"`, …) on a work entry. */
function workCardAspectClassName(entry) {
  if (entry.workCardAspect === "1/1") return "aspect-square";
  if (entry.workCardAspect === "4/5") return "aspect-[4/5]";
  return "aspect-video";
}

function WorkNuggetPill({ label, color, iconKey, reduceMotion, nuggetsRevealed, nuggetIndex }) {
  const LucideCmp = LUCIDE_NUGGET_MAP[iconKey];
  const HugeIcon = NUGGET_ICON_MAP[iconKey];
  const ink = nuggetTextColor(color);
  const lucideRef = useRef(null);

  useEffect(() => {
    if (reduceMotion || !nuggetsRevealed || !LucideCmp) {
      return;
    }
    const h = lucideRef.current;
    if (!h?.startAnimation) {
      return;
    }
    const stagger = (nuggetIndex ?? 0) * NUGGET_LUCIDE_STAGGER_MS;
    let intervalId;
    const startTimeout = window.setTimeout(() => {
      h.startAnimation();
      intervalId = window.setInterval(() => h.startAnimation(), NUGGET_LUCIDE_LOOP_MS);
    }, stagger);
    return () => {
      window.clearTimeout(startTimeout);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
      h?.stopAnimation?.();
    };
  }, [reduceMotion, nuggetsRevealed, LucideCmp, nuggetIndex]);

  return (
    <span
      className={clsx("wx-work-card-v2__nugget", nuggetFillIsDeep(color) && "wx-work-card-v2__nugget--on-dark")}
      style={{ color: ink, backgroundColor: color }}
    >
      {LucideCmp ? (
        <span
          className="wx-work-card-v2__nugget-ic inline-flex size-3 shrink-0 items-center justify-center [&>div]:!size-3"
          aria-hidden
        >
          <LucideCmp ref={lucideRef} size={12} className="text-current" />
        </span>
      ) : HugeIcon ? (
        <span className="wx-work-card-v2__nugget-icon-fallback inline-flex shrink-0" aria-hidden>
          <HugeiconsIcon icon={HugeIcon} size={12} color={ink} strokeWidth={2} aria-hidden />
        </span>
      ) : null}
      <span className="wx-work-card-v2__nugget-label">{label}</span>
    </span>
  );
}

/** `sizes` for 200:88 artboard: mock ≈0.6 card width, high-DPR — pair with 2560w/2000w `srcset` */
const FIGMA_200_88_SIZES = "(min-width: 64rem) min(40vw, 32rem), min(100vw, 100vw)";

/**
 * Figma `Testing/200:88` (Frame 4): 2400×2400, canvas rgb(227,219,209); child `200:109` 1410.14×1490.18px, centered, img cover + warm shadow.
 */
function WorkCardFigma20088Artboard({ entry, bgUrl }) {
  if (!bgUrl) {
    return <div className="wx-work-card__bg wx-work-card__bg--empty" aria-hidden />;
  }
  const media = entry.workCardBackgroundWebp ? (
    <picture>
      <source
        type="image/webp"
        srcSet={`${entry.workCardBackgroundWebp} 2560w`}
        sizes={FIGMA_200_88_SIZES}
      />
      <img
        src={bgUrl}
        srcSet={`${bgUrl} 2000w`}
        sizes={FIGMA_200_88_SIZES}
        alt=""
        decoding="async"
        fetchPriority={entry.workCardImageHighPriority ? "high" : "auto"}
        loading={entry.workCardImageHighPriority ? "eager" : "lazy"}
      />
    </picture>
  ) : (
    <img
      src={bgUrl}
      srcSet={`${bgUrl} 2000w`}
      sizes={FIGMA_200_88_SIZES}
      alt=""
      decoding="async"
      fetchPriority={entry.workCardImageHighPriority ? "high" : "auto"}
      loading={entry.workCardImageHighPriority ? "eager" : "lazy"}
    />
  );
  return (
    <div
      className="wx-work-card__figma-frame"
      data-figma-node="200-88"
      data-figma-name="Frame 4"
      aria-hidden
    >
      <div
        className="wx-work-card__figma-mock"
        data-figma-node="200-109"
        data-figma-name="Frame 6 1"
      >
        <div className="wx-work-card__figma-mock-media">{media}</div>
      </div>
    </div>
  );
}

function WorkCard({ entry, reduceMotion }) {
  const variant = getWorkCardVariant(entry);
  const isCaseStudy = variant === "case-study" && Boolean(entry.caseStudyPath);
  const [hovered, setHovered] = useState(false);
  const bgUrl = workCardBackgroundUrl(entry);
  const useWarmFooter = Boolean(entry.workCardFooterWarm);
  const useLightText = Boolean(entry.workCardFooterOnDark) && !useWarmFooter;
  const nuggets = (entry.nuggets ?? []).slice(0, 8);
  const coarsePointer = useCoarsePointerOrNoHover();
  /**
   * Warm 200:88 nuggets get the same pill styling in CSS, but **motion** follows hover like other
   * cards (always show on coarse / no-hover devices). Including `useWarmFooter` here used to
   * pin opacity to 1 and removed stagger in/out.
   */
  const nuggetsRevealed = coarsePointer || hovered;
  /**
   * Start above the final row (reduced motion: no travel).
   */
  const nuggetMotionInitial = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: NUGGET_ROW_MOTION.yFrom };
  const useFigma20088 = entry.workCardFigmaFrame === "200-88" && Boolean(bgUrl);
  const workCardChromeTopInnards = (
    <>
      {nuggets.length > 0 ? (
        <ul className="wx-work-card-v2__nuggets" aria-label={getWorkCardNuggetsListAriaLabel(entry)}>
          {nuggets.map((n, i) => (
            <motion.li
              key={`${entry.slug}-nug-${n.label}`}
              className="m-0 p-0"
              initial={nuggetMotionInitial}
              animate={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: nuggetsRevealed ? 1 : 0,
                      y: nuggetsRevealed ? 0 : NUGGET_ROW_MOTION.yFrom,
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      delay: nuggetsRevealed
                        ? i * NUGGET_ROW_MOTION.stagger
                        : (nuggets.length - 1 - i) * NUGGET_ROW_MOTION.stagger,
                      duration: NUGGET_ROW_MOTION.duration,
                      ease: NUGGET_ROW_MOTION.ease,
                    }
              }
            >
              <WorkNuggetPill
                label={n.label}
                color={n.color}
                iconKey={n.icon}
                reduceMotion={reduceMotion}
                nuggetsRevealed={nuggetsRevealed}
                nuggetIndex={i}
              />
            </motion.li>
          ))}
        </ul>
      ) : (
        <span className="min-w-0 flex-1" />
      )}
      {isCaseStudy ? (
        <span className="wx-work-card-v2__view-pill inline-flex shrink-0 items-center gap-2" aria-hidden>
          View more
          <ArrowUpRight className="size-5 shrink-0" weight="bold" aria-hidden />
        </span>
      ) : null}
    </>
  );
  const shell = (
    <div
      className={clsx(
        "wx-work-card__shell flex h-full min-h-0 flex-col justify-between",
        !useWarmFooter && "gap-3 p-4 sm:p-5",
        useWarmFooter && "wx-work-card__shell--footer-warm",
        useLightText && "wx-work-card__shell--image-footer",
      )}
    >
      {useFigma20088 ? (
        <WorkCardFigma20088Artboard entry={entry} bgUrl={bgUrl} />
      ) : bgUrl && entry.workCardBackgroundWebp ? (
        <picture className="wx-work-card__bg" aria-hidden>
          <source type="image/webp" srcSet={entry.workCardBackgroundWebp} />
          <img
            src={bgUrl}
            alt=""
            decoding="async"
            fetchPriority={entry.workCardImageHighPriority ? "high" : "auto"}
            loading={entry.workCardImageHighPriority ? "eager" : "lazy"}
            sizes="(min-width: 64rem) min(50vw, 40rem), 100vw"
          />
        </picture>
      ) : bgUrl ? (
        <img
          className="wx-work-card__bg"
          src={bgUrl}
          alt=""
          decoding="async"
          fetchPriority={entry.workCardImageHighPriority ? "high" : "auto"}
          loading={entry.workCardImageHighPriority ? "eager" : "lazy"}
          sizes="(min-width: 64rem) min(50vw, 40rem), 100vw"
          aria-hidden
        />
      ) : (
        <div className="wx-work-card__bg wx-work-card__bg--empty" aria-hidden />
      )}
      {!useWarmFooter ? <div className="wx-work-card__scrim" aria-hidden /> : null}
      <div className="wx-work-card__sweep" aria-hidden />
        <div
          className={clsx(
            "wx-work-card-v2 pointer-events-auto",
            useWarmFooter && "wx-work-card-v2--footer-warm-pin",
          )}
        >
        {useWarmFooter ? (
          <motion.div
            className="wx-work-card-v2__chrome-top"
            initial={reduceMotion ? { y: 0, opacity: 1 } : { y: -18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.32, margin: "0px 0px -8% 0px" }}
            transition={{
              duration: reduceMotion ? 0.01 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {workCardChromeTopInnards}
          </motion.div>
        ) : (
          <div className="wx-work-card-v2__chrome-top">{workCardChromeTopInnards}</div>
        )}
        <div
          className={clsx("wx-work-card-v2__footer", useWarmFooter && "wx-work-card-v2__footer--warm-pin")}
        >
          <h3
            className={clsx(
              "wx-work-card-v2__title m-0 max-w-[min(100%,20rem)] text-balance text-left font-medium tracking-tight",
              useLightText && "wx-work-card-v2__title--on-image",
              useWarmFooter && "wx-work-card-v2__title--warm",
            )}
          >
            {entry.title}
          </h3>
          <WorkCardTeaserText
            entry={entry}
            isActive={hovered}
            reduceMotion={reduceMotion}
            useLightOnImage={useLightText}
            useWarmImageFooter={useWarmFooter}
          />
        </div>
      </div>
    </div>
  );

  return (
    <RevealCard reduceMotion={reduceMotion} as="div" className="w-full">
      <div
        className={clsx(
          "wx-work-card wx-work-card--figma group relative w-full max-w-full rounded-[var(--wx-radius-card)]",
          useFigma20088 ? "wx-work-card--figma-20088 overflow-visible" : "overflow-hidden",
          useWarmFooter && "wx-work-card--footer-warm",
          workCardAspectClassName(entry),
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="group"
        aria-label={`${entry.title}. ${entry.summary}`}
      >
        {isCaseStudy ? (
          <ViewTransitionLink
            to={entry.caseStudyPath}
            className="wx-work-card-v2__link absolute inset-0 z-20 rounded-[var(--wx-radius-card)] text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
            aria-label={`${entry.title} — view case study`}
          />
        ) : null}
        <div className="pointer-events-none relative z-10 h-full min-h-0">{shell}</div>
      </div>
    </RevealCard>
  );
}

const HEADLINE_ROTATE_WORDS = ["clear", "human", "accessible", "intentional"];
/** Keep in sync with `--wx-headline-word-enter-duration` in winnie-exploration.css */
const HEADLINE_WORD_ENTER_DURATION = 0.26;

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
        <span className="wx-headline-static">Designs that feel </span><span className="wx-alive">
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

  const scrollToSection = useCallback(
    (sectionId, tabIndexOverride) => {
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
    },
    [lenis, reduceMotion],
  );

  useEffect(() => {
    if (location.pathname !== "/") return;
    const id = (location.hash || "").replace("#", "");
    if (!id.startsWith("winnie-section-")) return;
    const t = window.setTimeout(() => scrollToSection(id), 80);
    return () => window.clearTimeout(t);
  }, [location.hash, location.pathname, scrollToSection]);

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
              <WinnieTopNav
                location={location}
                navigate={navigate}
                onSelectSection={scrollToSection}
                selectedIndex={selectedIndex}
                reduceMotion={reduceMotion}
                tabPillTransition={tabPillTransition}
                tabMicroTransition={tabMicroTransition}
                tabRowRef={tabRowRef}
              />
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
            className="wx-work-section min-h-0 pb-[var(--wx-space-section)]"
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
