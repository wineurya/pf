import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
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
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { FilePdf } from "@phosphor-icons/react/dist/csr/FilePdf";
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
import { WX_SKIP_HOME_PANELS_ENTER_KEY } from "@/lib/navigateViewTransition.js";
import { queueScrollTriggerRefresh } from "@/lib/gsap.js";
import { useLenis } from "@/providers/LenisProvider.jsx";
import {
  SITE_AVAILABILITY,
  SITE_CONTACT_SOCIALS,
  SITE_EXTRA_IMAGES,
  SITE_FAQ,
  SITE_FIGMA_ASSETS,
  SITE_HERO,
  SITE_IMAGE_FALLBACKS,
  SITE_QUALIFICATION_FIELDS,
  SECTION_IDS,
  SITE_SERVICES,
  SITE_STATS,
  SECTION_TABS,
  SITE_STACK_MARQUEE_LAYERS,
  SITE_TESTIMONIALS,
  SITE_WORK,
} from "@/exploration/siteContent.js";
import { useSectionScroll } from "@/exploration/useSectionScroll.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import {
  ExplorationBody,
  ExplorationMainPanels,
  ExplorationRoot,
} from "@/exploration/layout/ExplorationLayout.jsx";
import { ExplorationNavRow } from "@/exploration/ExplorationNavRow.jsx";
import { wxNavRailFadeTransition, wxNavTabTransition } from "@/exploration/navMotion.js";
import { MaskedFigmaIcon } from "@/exploration/MaskedFigmaIcon.jsx";
import { ApproachStepFolderHoverVisual } from "@/exploration/ApproachStepFolderVisual.jsx";
import { LinkedInBrandIcon } from "@/exploration/LinkedInBrandIcon.jsx";
import { runWorkCardStutterSequence } from "@/exploration/workCardStutterTypewriter.js";

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
 * Keys match `nuggets[].icon` in `siteContent.js`; unmapped keys fall back to `NUGGET_ICON_MAP` + Hugeicons.
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

/** Stack marquee logos: Simple Icons CDN embeds brand fill on `<svg>`. */
function stackToolLogoUrl(tool) {
  if (tool.logoUrl) return tool.logoUrl;
  if (tool.brandSlug) return `https://cdn.simpleicons.org/${tool.brandSlug}`;
  return null;
}

/** Aside contact row — `linkedin` uses official mark geometry via {@link LinkedInBrandIcon}. */
const CONTACT_ROW_ICONS = {
  linkedin: LinkedInBrandIcon,
  resume: FilePdf,
  email: EnvelopeSimple,
};

/** Contact-row pills (aside footer) — gentle in/out tween. */
const WX_TAB_EASE_IN_OUT = [0.4, 0, 0.2, 1];
/** Lenis scroll-to-section — smoother than linear. */
const WX_LENIS_EASE_IN_OUT = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

/** Empty-canvas: crossfade duration (ms) for main + aside copy + section tabs. */
const EMPTY_CANVAS_ENTER_MS = 1100;
const EMPTY_CANVAS_EXIT_MS = 1100;
/**
 * `#site-panels` off-screen rest pose: `translateY` only (no scale). Used for nav-only + **route remount**
 * (e.g. `/work/…` → `/`) so the main column eases in the same way as leaving empty-canvas.
 */
const EMPTY_CANVAS_PANELS_DY = 20;
const EMPTY_CANVAS_ENTER_S = EMPTY_CANVAS_ENTER_MS / 1000;
const EMPTY_CANVAS_EXIT_S = EMPTY_CANVAS_EXIT_MS / 1000;
/** Symmetric soft S for empty-canvas opacity. */
const EASE_EMPTY_CANVAS_FADE = [0.4, 0.02, 0.2, 0.99];
/** prefers-reduced-motion: opacity only, readable duration. */
const EMPTY_CANVAS_REDUCE_MOTION_OPACITY_S = 0.5;
/** After fade: collapse main height/padding; aside steps to full width (no width tween). */
const EMPTY_CANVAS_MAIN_GEOM_LG = [
  "lg:h-0! lg:min-h-0 lg:max-h-0",
  "lg:self-start lg:overflow-x-hidden lg:overflow-y-clip",
  "lg:p-0! lg:gap-0!",
].join(" ");

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
 * `workCardNuggetsAriaLabel` optional in `siteContent.js` per entry. Default: “{title} — role-relevant highlights”.
 */
function getWorkCardNuggetsListAriaLabel(entry) {
  const custom = entry.workCardNuggetsAriaLabel?.trim();
  if (custom) return custom;
  return `${entry.title} — role-relevant highlights`;
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
  const { line1, line2 } = useMemo(() => splitWorkCardLeadLines(teaser), [teaser]);
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
        line2 && "wx-work-card-v2__summary--lead-two-lines",
        useWarmImageFooter && "wx-work-card-v2__summary--warm-image",
        useLightOnImage && !useWarmImageFooter && "wx-work-card-v2__summary--on-image",
        rest && "wx-work-card-v2__summary--has-extend",
      )}
      aria-label={full}
    >
      <span className="wx-work-card-v2__summary-lead">
        {line1}
        {line2 ? (
          <>
            <br />
            {line2}
          </>
        ) : null}
      </span>
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

/**
 * `workCardTeaserLead` stands alone. On hover: optional 0–2 stutter lines (e.g. “Try:” nudges), then `finale`.
 * With no stutters, only the finale (e.g. a one-line quip) is typed in.
 */
function formatStutterSegment(s) {
  const t = (s ?? "").trim();
  if (!t) return "";
  return t.startsWith(" ") ? t : ` ${t}`;
}

/** First sentence + rest after `". "` for a two-line lead (e.g. Avance card). */
function splitWorkCardLeadLines(lead) {
  const t = (lead ?? "").trim();
  if (!t) return { line1: "", line2: "" };
  const idx = t.indexOf(". ");
  if (idx === -1) return { line1: t, line2: "" };
  return { line1: t.slice(0, idx + 1).trim(), line2: t.slice(idx + 2).trim() };
}

function WorkCardStutterTeaserBody({
  line1,
  line2,
  ext,
  tone,
  isActive,
  useLightOnImage,
  useWarmImageFooter,
}) {
  return (
    <p
      className={clsx(
        "wx-work-card-v2__summary wx-work-card-v2__summary--stutter m-0 text-left",
        line2 && "wx-work-card-v2__summary--lead-two-lines",
        useWarmImageFooter && "wx-work-card-v2__summary--warm-image",
        useLightOnImage && !useWarmImageFooter && "wx-work-card-v2__summary--on-image",
      )}
    >
      <span className="wx-work-card-v2__summary-lead">
        {line1}
        {line2 ? (
          <>
            <br />
            {line2}
          </>
        ) : null}
      </span>
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

function WorkCardStutterTeaser({ lead, s0, s1, finale, isActive, reduceMotion, useLightOnImage, useWarmImageFooter }) {
  const { line1, line2 } = useMemo(() => splitWorkCardLeadLines(lead), [lead]);
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
    let gone = false;
    void runWorkCardStutterSequence({
      stutterParts,
      finSpaced,
      setExt,
      setTone,
      getGone: () => gone,
    });
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
    <WorkCardStutterTeaserBody
      line1={line1}
      line2={line2}
      ext={ext}
      tone={tone}
      isActive={isActive}
      useLightOnImage={useLightOnImage}
      useWarmImageFooter={useWarmImageFooter}
    />
  );
}

function workCardHasStutterTeaser(entry) {
  return Boolean(entry.workCardTeaserLead && entry.workCardFinale);
}

function workCardUsesFooterOneLiner(entry) {
  const lines = entry.workCardFooterRotatingLines;
  return Array.isArray(lines) && lines.some((s) => String(s ?? "").trim().length > 0);
}

const WORK_CARD_AVANCE_FOOTER_MARK_PATH = "/work/avance-footer-mark.svg";

/** Figma Testing 77:486 / 77:487 — inline SVG so the mark always paints (no broken external SVG / CSP). */
function AvanceWarmFooterMarkSvg({ className }) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9_-]/g, "") || "m";
  const frameGradId = `avance-foot-frame-${uid}`;
  const orbGradId = `avance-foot-orb-${uid}`;
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={frameGradId} x1={9} y1={0} x2={9} y2={18} gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0e4d0" />
          <stop offset={1} stopColor="#d4a574" />
        </linearGradient>
        <linearGradient id={orbGradId} x1={9} y1={3} x2={9} y2={15} gradientUnits="userSpaceOnUse">
          <stop stopColor="#d4a574" />
          <stop offset={1} stopColor="#eedfc9" />
        </linearGradient>
      </defs>
      <rect width={18} height={18} rx={4} fill={`url(#${frameGradId})`} />
      <circle cx={9} cy={9} r={6} fill={`url(#${orbGradId})`} />
    </svg>
  );
}

const WORK_CARD_FOOTER_ROTATE_MS = 4200;

function WorkCardFooterOneLiner({ entry, reduceMotion, useLightText, useWarmFooter, footerMinimal }) {
  const safeLines = useMemo(
    () => (entry.workCardFooterRotatingLines ?? []).map((s) => String(s ?? "").trim()).filter(Boolean),
    [entry.workCardFooterRotatingLines],
  );
  const [idx, setIdx] = useState(0);
  const markSrc = (entry.workCardFooterMark ?? "").trim() || SITE_FIGMA_ASSETS.logoMark;
  const count = safeLines.length;
  const displayIdx = count ? idx % count : 0;
  const currentLine = safeLines[displayIdx] ?? "";

  useEffect(() => {
    if (reduceMotion || count <= 1) return undefined;
    const id = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      setIdx((i) => (i + 1) % count);
    }, WORK_CARD_FOOTER_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, count]);

  return (
    <p
      className={clsx(
        "wx-work-card-v2__footer-line",
        footerMinimal && "wx-work-card-v2__footer-line--minimal",
        useWarmFooter && "wx-work-card-v2__footer-line--warm",
        useLightText && !useWarmFooter && "wx-work-card-v2__footer-line--on-image",
      )}
    >
      {markSrc === WORK_CARD_AVANCE_FOOTER_MARK_PATH || markSrc.endsWith("avance-footer-mark.svg") ? (
        <AvanceWarmFooterMarkSvg className="wx-work-card-v2__footer-mark select-none" />
      ) : (
        <img
          className="wx-work-card-v2__footer-mark select-none"
          src={markSrc}
          alt=""
          decoding="async"
        />
      )}
      <span
        className={clsx(
          "wx-work-card-v2__title wx-work-card-v2__footer-line-title m-0 shrink-0 tracking-tight",
          !footerMinimal && !useWarmFooter && "max-w-[min(100%,20rem)]",
          footerMinimal && "max-w-[min(100%,26rem)]",
          useLightText && !useWarmFooter && "wx-work-card-v2__title--on-image",
          useWarmFooter && "wx-work-card-v2__title--warm",
        )}
      >
        {entry.title}
      </span>
      <span className="wx-work-card-v2__footer-line-cycle-clip">
        {reduceMotion || count <= 1 ? (
          <span className="wx-work-card-v2__footer-line-cycle block">{currentLine}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={displayIdx}
              className="wx-work-card-v2__footer-line-cycle block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentLine}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </p>
  );
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
    return SITE_FIGMA_ASSETS[entry.image.primary] ?? SITE_IMAGE_FALLBACKS[entry.image.fallback];
  }
  return null;
}

/** Default 16:9; optional `workCardAspect` (`"1/1"`, `"4/5"`, …) on a work entry. */
function workCardAspectClassName(entry) {
  if (entry.workCardAspect === "1/1") return "aspect-square";
  if (entry.workCardAspect === "4/5") return "aspect-[4/5]";
  return "aspect-video";
}

function WorkNuggetPill({ label, iconKey, reduceMotion, nuggetsRevealed, nuggetIndex }) {
  const LucideCmp = LUCIDE_NUGGET_MAP[iconKey];
  const HugeIcon = NUGGET_ICON_MAP[iconKey];
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
      intervalId = window.setInterval(() => {
        if (document.visibilityState === "hidden") return;
        h.startAnimation();
      }, NUGGET_LUCIDE_LOOP_MS);
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
    <span className="wx-work-card-v2__nugget">
      {LucideCmp ? (
        <span
          className="wx-work-card-v2__nugget-ic inline-flex size-3 shrink-0 items-center justify-center [&>div]:!size-3"
          aria-hidden
        >
          <LucideCmp ref={lucideRef} size={12} className="text-current" />
        </span>
      ) : HugeIcon ? (
        <span className="wx-work-card-v2__nugget-icon-fallback inline-flex shrink-0" aria-hidden>
          <HugeiconsIcon icon={HugeIcon} size={12} color="currentColor" strokeWidth={2} aria-hidden />
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
 * With `workCardFigmaNoImage` and no `workCardBackgroundImage`, render the same frame with a solid slot (no raster).
 */
function WorkCardFigma20088Artboard({ entry, bgUrl }) {
  if (!bgUrl) {
    if (entry.workCardFigmaNoImage) {
      return (
        <div className="wx-work-card__figma-frame" data-figma-node="200-88" data-figma-name="Frame 4" aria-hidden>
          <div
            className="wx-work-card__figma-mock"
            data-figma-node="200-109"
            data-figma-name="Frame 6 1"
          >
            <div className="wx-work-card__figma-mock-media wx-work-card__figma-mock-media--no-image" aria-hidden />
          </div>
        </div>
      );
    }
    return <div className="wx-work-card__bg wx-work-card__bg--empty" aria-hidden />;
  }
  const objectPos = entry.workCardFigmaObjectPosition?.trim();
  const mockImgStyle = objectPos ? { objectPosition: objectPos } : undefined;
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
        style={mockImgStyle}
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
      style={mockImgStyle}
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

function WorkNuggetMotionLi({ n, i, entry, nuggets, nuggetMotionInitial, reduceMotion, nuggetsRevealed }) {
  const liStagger = nuggetsRevealed
    ? i * NUGGET_ROW_MOTION.stagger
    : (nuggets.length - 1 - i) * NUGGET_ROW_MOTION.stagger;
  const liTransition = reduceMotion
    ? { duration: 0 }
    : { delay: liStagger, duration: NUGGET_ROW_MOTION.duration, ease: NUGGET_ROW_MOTION.ease };
  const liAnimate = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: nuggetsRevealed ? 1 : 0, y: nuggetsRevealed ? 0 : NUGGET_ROW_MOTION.yFrom };
  return (
    <motion.li
      className="m-0 p-0"
      initial={nuggetMotionInitial}
      animate={liAnimate}
      transition={liTransition}
    >
      <WorkNuggetPill
        label={n.label}
        iconKey={n.icon}
        reduceMotion={reduceMotion}
        nuggetsRevealed={nuggetsRevealed}
        nuggetIndex={i}
      />
    </motion.li>
  );
}

function WorkCardNuggetsChromeRow({ entry, nuggets, reduceMotion, nuggetsRevealed, isCaseStudy }) {
  const nuggetMotionInitial = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: NUGGET_ROW_MOTION.yFrom };
  return (
    <>
      {nuggets.length > 0 ? (
        <ul className="wx-work-card-v2__nuggets" aria-label={getWorkCardNuggetsListAriaLabel(entry)}>
          {nuggets.map((n, i) => (
            <WorkNuggetMotionLi
              key={`${entry.slug}-nug-${n.label}`}
              n={n}
              i={i}
              entry={entry}
              nuggets={nuggets}
              nuggetMotionInitial={nuggetMotionInitial}
              reduceMotion={reduceMotion}
              nuggetsRevealed={nuggetsRevealed}
            />
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
}

function WorkCardMediaBackground({ entry, bgUrl, useFigma20088, useWarmFooter }) {
  if (useFigma20088) {
    return <WorkCardFigma20088Artboard entry={entry} bgUrl={bgUrl} />;
  }
  if (bgUrl && entry.workCardBackgroundWebp) {
    return (
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
    );
  }
  if (bgUrl) {
    return (
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
    );
  }
  return <div className="wx-work-card__bg wx-work-card__bg--empty" aria-hidden />;
}

function WorkCardChromeAndFooterBlock({
  entry,
  workCardChromeTopInnards,
  useWarmFooter,
  useLightText,
  hovered,
  reduceMotion,
  omitTopChrome,
  omitFooter,
  footerMinimal,
}) {
  const showChrome = !omitTopChrome;
  const showFooter = !omitFooter;
  if (!showChrome && !showFooter) {
    return null;
  }
  return (
    <>
      {showChrome &&
        (useWarmFooter ? (
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
        ))}
      {showFooter ? (
        <div
          className={clsx(
            "wx-work-card-v2__footer",
            useWarmFooter && "wx-work-card-v2__footer--warm-pin",
            footerMinimal && "wx-work-card-v2__footer--minimal",
          )}
        >
          {workCardUsesFooterOneLiner(entry) ? (
            <WorkCardFooterOneLiner
              entry={entry}
              reduceMotion={reduceMotion}
              useLightText={useLightText}
              useWarmFooter={useWarmFooter}
              footerMinimal={footerMinimal}
            />
          ) : (
            <>
              <h3
                className={clsx(
                  "wx-work-card-v2__title m-0 text-balance text-left font-medium tracking-tight",
                  useWarmFooter ? "max-w-[min(100%,40rem)]" : !footerMinimal && "max-w-[min(100%,20rem)]",
                  footerMinimal && "max-w-[min(100%,26rem)]",
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
            </>
          )}
        </div>
      ) : null}
    </>
  );
}

function WorkCardShellBlock({
  entry,
  bgUrl,
  useFigma20088,
  useWarmFooter,
  useLightText,
  hovered,
  reduceMotion,
  workCardChromeTopInnards,
  omitTopChrome,
  omitFooter,
  omitScrim,
  footerMinimal,
}) {
  const hasChromeOrFooter = !omitTopChrome || !omitFooter;
  return (
    <div
      className={clsx(
        "wx-work-card__shell flex h-full min-h-0 flex-col justify-between",
        !useWarmFooter && hasChromeOrFooter && "gap-3 p-4 sm:p-5",
        !useWarmFooter && !hasChromeOrFooter && "wx-work-card__shell--image-only",
        useWarmFooter && "wx-work-card__shell--footer-warm",
        useLightText && "wx-work-card__shell--image-footer",
        footerMinimal && "wx-work-card__shell--footer-minimal",
      )}
    >
      <WorkCardMediaBackground
        entry={entry}
        bgUrl={bgUrl}
        useFigma20088={useFigma20088}
        useWarmFooter={useWarmFooter}
      />
      {!useWarmFooter && !omitScrim ? <div className="wx-work-card__scrim" aria-hidden /> : null}
      {hasChromeOrFooter || useWarmFooter ? <div className="wx-work-card__sweep" aria-hidden /> : null}
      {hasChromeOrFooter ? (
        <div
          className={clsx(
            "wx-work-card-v2 pointer-events-auto",
            useWarmFooter && "wx-work-card-v2--footer-warm-pin",
            omitTopChrome && "wx-work-card-v2--no-chrome",
          )}
        >
          <WorkCardChromeAndFooterBlock
            entry={entry}
            workCardChromeTopInnards={workCardChromeTopInnards}
            useWarmFooter={useWarmFooter}
            useLightText={useLightText}
            hovered={hovered}
            reduceMotion={reduceMotion}
            omitTopChrome={omitTopChrome}
            omitFooter={omitFooter}
            footerMinimal={footerMinimal}
          />
        </div>
      ) : null}
    </div>
  );
}

function workCardAriaLabel(entry, { isEmptyProjectSlot, isNavOnlyViewCard }) {
  const custom = entry.workCardAccessibleLabel?.trim();
  if (custom) {
    if (isEmptyProjectSlot) {
      return `${custom} — opens empty project canvas.`;
    }
    return custom;
  }
  if (isEmptyProjectSlot) {
    return `${entry.title}. ${entry.summary} — opens empty project canvas.`;
  }
  if (isNavOnlyViewCard) {
    return `${entry.title}. ${entry.summary} — click for focused view; Case Study link opens the write-up.`;
  }
  return `${entry.title}. ${entry.summary}`;
}

function workCardOnClickForSlot({ isEmptyProjectSlot, isNavOnlyViewCard, onEmptyProjectClick, onOpenNavOnlyView }) {
  if (isEmptyProjectSlot) {
    return () => onEmptyProjectClick();
  }
  if (isNavOnlyViewCard) {
    return (e) => {
      if (e.target instanceof Element && e.target.closest("a[href]")) return;
      onOpenNavOnlyView();
    };
  }
  return undefined;
}

function workCardKeyDownForEmptySlot(isEmptyProjectSlot, onEmptyProjectClick) {
  if (!isEmptyProjectSlot) return undefined;
  return (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onEmptyProjectClick();
    }
  };
}

function caseStudyConnectorTargetMotion({ reduceMotion, coarsePointer, caseStudyRevealed }) {
  if (reduceMotion || coarsePointer) {
    return { opacity: 1, y: 0 };
  }
  return caseStudyRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 };
}

function WorkCardLinkOverlays({
  showCaseStudyCardOverlay,
  showCaseStudyConnector,
  entry,
  isCaseStudy,
  caseStudyRevealed,
  reduceMotion,
  coarsePointer,
  caseStudyLabelTransition,
}) {
  return (
    <>
      {showCaseStudyCardOverlay ? (
        <ViewTransitionLink
          to={entry.caseStudyPath}
          className="wx-work-card-v2__link absolute inset-0 z-20 rounded-[var(--wx-radius-card)] text-inherit no-underline focus:outline-none focus-visible:outline-none"
          aria-label={isCaseStudy ? `${entry.title} — view case study` : `${entry.title} — case study`}
        />
      ) : null}
      {showCaseStudyConnector ? (
        <motion.div
          className="absolute bottom-[var(--spacing-5)] right-[var(--spacing-5)] z-30 sm:bottom-[var(--spacing-6)] sm:right-[var(--spacing-6)]"
          initial={reduceMotion || coarsePointer ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={caseStudyConnectorTargetMotion({ reduceMotion, coarsePointer, caseStudyRevealed })}
          transition={caseStudyLabelTransition}
        >
          <ViewTransitionLink
            to={entry.caseStudyPath}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 wx-text-meta text-[color-mix(in_srgb,var(--wx-ink)_88%,var(--wx-page-bg))] no-underline transition-colors hover:text-[var(--wx-ink)] hover:underline hover:decoration-[color-mix(in_srgb,var(--wx-ink)_35%,transparent)] hover:underline-offset-4 focus:outline-none focus-visible:outline-none"
            aria-label={`${entry.title} — case study page`}
          >
            Case Study
            <ArrowUpRight className="size-3.5 shrink-0 opacity-90" weight="regular" aria-hidden />
          </ViewTransitionLink>
        </motion.div>
      ) : null}
    </>
  );
}

function useWorkCardModel({ entry, reduceMotion, onEmptyProjectClick, onOpenNavOnlyView }) {
  const isEmptyProjectSlot = typeof onEmptyProjectClick === "function";
  const isNavOnlyViewCard = Boolean(entry.workCardOpenNavOnlyView) && typeof onOpenNavOnlyView === "function";
  const variant = getWorkCardVariant(entry);
  const isCaseStudy = variant === "case-study" && Boolean(entry.caseStudyPath);
  const showCaseStudyConnector = Boolean(entry.caseStudyPath) && Boolean(entry.workCardCaseStudyConnector);
  const showCaseStudyCardOverlay =
    Boolean(entry.caseStudyPath) && (isCaseStudy || (showCaseStudyConnector && !entry.workCardOpenNavOnlyView));
  const [hovered, setHovered] = useState(false);
  const bgUrl = workCardBackgroundUrl(entry);
  const useWarmFooter = Boolean(entry.workCardFooterWarm);
  const useLightText = Boolean(entry.workCardFooterOnDark) && !useWarmFooter;
  const nuggets = (entry.nuggets ?? []).slice(0, 8);
  const coarsePointer = useCoarsePointerOrNoHover();
  const nuggetsRevealed = coarsePointer || hovered;
  const caseStudyRevealed = reduceMotion || coarsePointer || hovered;
  const caseStudyLabelTransition = {
    type: "tween",
    duration: reduceMotion ? 0.01 : 0.3,
    ease: [0.22, 1, 0.36, 1],
  };
  const useFigma20088 = entry.workCardFigmaFrame === "200-88" && (Boolean(bgUrl) || Boolean(entry.workCardFigmaNoImage));
  const figmaCanvasHex = entry.workCardFigmaCanvas?.trim() || null;
  const figmaLightCanvas = Boolean(entry.workCardFigmaLightCanvas);
  const workCardChromeTopInnards = (
    <WorkCardNuggetsChromeRow
      entry={entry}
      nuggets={nuggets}
      reduceMotion={reduceMotion}
      nuggetsRevealed={nuggetsRevealed}
      isCaseStudy={isCaseStudy}
    />
  );
  const onClickHandler = workCardOnClickForSlot({
    isEmptyProjectSlot,
    isNavOnlyViewCard,
    onEmptyProjectClick,
    onOpenNavOnlyView,
  });
  const keyDownHandler = workCardKeyDownForEmptySlot(isEmptyProjectSlot, onEmptyProjectClick);
  const shell = (
    <WorkCardShellBlock
      entry={entry}
      bgUrl={bgUrl}
      useFigma20088={useFigma20088}
      useWarmFooter={useWarmFooter}
      useLightText={useLightText}
      hovered={hovered}
      reduceMotion={reduceMotion}
      workCardChromeTopInnards={workCardChromeTopInnards}
      omitTopChrome={Boolean(entry.workCardOmitTopChrome)}
      omitFooter={Boolean(entry.workCardOmitFooter)}
      omitScrim={Boolean(entry.workCardOmitScrim)}
      footerMinimal={Boolean(entry.workCardFooterMinimal)}
    />
  );
  return {
    isEmptyProjectSlot,
    isNavOnlyViewCard,
    isCaseStudy,
    showCaseStudyCardOverlay,
    showCaseStudyConnector,
    setHovered,
    bgUrl,
    useWarmFooter,
    useLightText,
    coarsePointer,
    caseStudyRevealed,
    caseStudyLabelTransition,
    useFigma20088,
    figmaCanvasHex,
    figmaLightCanvas,
    onClickHandler,
    keyDownHandler,
    shell,
    omitScrim: Boolean(entry.workCardOmitScrim),
    footerMinimal: Boolean(entry.workCardFooterMinimal),
    workCardImageOnly: Boolean(entry.workCardOmitTopChrome && entry.workCardOmitFooter),
  };
}

export function WorkCard({ entry, reduceMotion, onEmptyProjectClick, onOpenNavOnlyView }) {
  const m = useWorkCardModel({ entry, reduceMotion, onEmptyProjectClick, onOpenNavOnlyView });
  return (
    <RevealCard reduceMotion={reduceMotion} as="div" className="w-full">
      <div
        className={clsx(
          "wx-work-card wx-work-card--figma group relative w-full max-w-full rounded-[var(--wx-radius-card)]",
          m.useFigma20088 ? "wx-work-card--figma-20088 overflow-visible" : "overflow-hidden",
          m.useWarmFooter && "wx-work-card--footer-warm",
          m.useWarmFooter && entry.workCardNuggetsMonochrome && "wx-work-card--nuggets-mono",
          m.figmaLightCanvas && m.useFigma20088 && "wx-work-card--figma-canvas-light",
          m.useFigma20088 && entry.workCardFigmaMockAspect && "wx-work-card--figma-mock-aspect",
          m.useFigma20088 && m.workCardImageOnly && "wx-work-card--image-only",
          m.omitScrim && "wx-work-card--omit-scrim",
          m.footerMinimal && "wx-work-card--footer-minimal",
          !m.useFigma20088 && workCardAspectClassName(entry),
          (m.isEmptyProjectSlot || m.isNavOnlyViewCard) && "cursor-pointer",
        )}
        {...(m.figmaCanvasHex || entry.workCardFigmaMockAspect
          ? {
              ...(m.figmaCanvasHex ? { "data-figma-canvas": "" } : {}),
              style: {
                ...(m.figmaCanvasHex ? { "--wx-figma-200-canvas": m.figmaCanvasHex } : {}),
                ...(entry.workCardFigmaMockAspect ? { "--wx-figma-mock-aspect": entry.workCardFigmaMockAspect } : {}),
              },
            }
          : {})}
        onMouseEnter={() => m.setHovered(true)}
        onMouseLeave={() => m.setHovered(false)}
        role={m.isEmptyProjectSlot ? "button" : "group"}
        tabIndex={m.isEmptyProjectSlot ? 0 : undefined}
        onClick={m.onClickHandler}
        onKeyDown={m.keyDownHandler}
        aria-label={workCardAriaLabel(entry, { isEmptyProjectSlot: m.isEmptyProjectSlot, isNavOnlyViewCard: m.isNavOnlyViewCard })}
      >
        <WorkCardLinkOverlays
          showCaseStudyCardOverlay={m.showCaseStudyCardOverlay}
          showCaseStudyConnector={m.showCaseStudyConnector}
          entry={entry}
          isCaseStudy={m.isCaseStudy}
          caseStudyRevealed={m.caseStudyRevealed}
          reduceMotion={reduceMotion}
          coarsePointer={m.coarsePointer}
          caseStudyLabelTransition={m.caseStudyLabelTransition}
        />
        <div className="pointer-events-none relative z-10 h-full min-h-0">{m.shell}</div>
      </div>
    </RevealCard>
  );
}

const HEADLINE_ROTATE_WORDS = ["clear", "human", "accessible", "intentional"];
/** Keep in sync with `--wx-headline-word-enter-duration` in site-canvas.css */
const HEADLINE_WORD_ENTER_DURATION = 0.42;

function useHeadlineRotateSlotWidth(reduceMotion) {
  const maskSlotMeasureRef = useRef(null);
  const [wordWidthsPx, setWordWidthsPx] = useState(null);

  useLayoutEffect(() => {
    if (reduceMotion) {
      setWordWidthsPx(null);
      return undefined;
    }
    const measurePerWord = () => {
      const el = maskSlotMeasureRef.current;
      if (!el) return;
      const widths = {};
      for (const word of HEADLINE_ROTATE_WORDS) {
        el.textContent = word;
        const w = el.getBoundingClientRect().width;
        if (Number.isFinite(w) && w > 0) widths[word] = w;
      }
      setWordWidthsPx(widths);
    };
    measurePerWord();
    const fonts = document.fonts;
    if (fonts?.ready) {
      void fonts.ready.then(measurePerWord).catch(() => {});
    }
    const onResize = () => measurePerWord();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [reduceMotion]);

  return { maskSlotMeasureRef, wordWidthsPx };
}

function AsideHeroHeadlineAliveRow({ reduceMotion, activeWord, rotateSlotWidthPx }) {
  /** Slot width is driven by Framer Motion so it stays in lockstep with the word entry.
   *  Words are pinned to the slot's start edge (justify-self: start in CSS) — eliminates the
   *  horizontal drift the centered layout caused while the slot width was tweening.
   *  Sparkle's left anchor is set to half the active word's natural width (in px), which does
   *  NOT tween with the slot — so the sparkle pops to the new word's center without sliding. */
  const wordTransition = reduceMotion
    ? { duration: 0 }
    : { duration: HEADLINE_WORD_ENTER_DURATION, ease: [0.22, 0.61, 0.24, 1] };
  const slotTransition = reduceMotion
    ? { duration: 0 }
    : { duration: HEADLINE_WORD_ENTER_DURATION, ease: [0.22, 0.61, 0.24, 1] };
  const sparkleSpinMotion = reduceMotion
    ? { duration: 0 }
    : { duration: 0.88, ease: [0.11, 0.92, 0.18, 1] };
  const sparkleStyle =
    rotateSlotWidthPx != null ? { left: `${rotateSlotWidthPx / 2}px` } : undefined;

  return (
    <span className="wx-alive">
      <span className="wx-headline-word-wrap">
        <span className="wx-headline-rotate" aria-live="polite">
          <motion.span
            className="wx-headline-rotate__mask"
            animate={rotateSlotWidthPx != null ? { width: rotateSlotWidthPx } : undefined}
            transition={slotTransition}
          >
            <AnimatePresence mode="sync" initial={false}>
              <motion.span
                key={activeWord}
                className="wx-headline-rotate__word"
                initial={reduceMotion ? false : { y: "60%", opacity: 0, filter: "blur(5px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={reduceMotion ? undefined : { y: "-60%", opacity: 0, filter: "blur(5px)" }}
                transition={wordTransition}
              >
                {activeWord}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </span>
        <span
          key={activeWord}
          className={clsx("wx-sparkle", !reduceMotion && "wx-sparkle--run")}
          style={sparkleStyle}
          aria-hidden
        >
          <motion.span
            className="wx-sparkle__spin"
            initial={reduceMotion ? false : { rotate: -320, scale: 0.88 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={sparkleSpinMotion}
          >
            <MaskedFigmaIcon
              className="wx-sparkle__img shrink-0 translate-y-px select-none"
              src={SITE_FIGMA_ASSETS.logoMark}
              background="var(--wx-gradient-accent)"
            />
          </motion.span>
        </span>
      </span>
    </span>
  );
}

function AsideHeroHeadline({ reduceMotion }) {
  const [wordIndex, setWordIndex] = useState(0);
  const { maskSlotMeasureRef, wordWidthsPx } = useHeadlineRotateSlotWidth(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % HEADLINE_ROTATE_WORDS.length);
    }, 3500);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const idx = reduceMotion ? 0 : wordIndex;
  const activeWord = HEADLINE_ROTATE_WORDS[idx];
  const rotateSlotWidthPx = wordWidthsPx?.[activeWord] ?? null;

  return (
    <h1 className="wx-headline relative block w-full max-w-full font-medium leading-none tracking-tight text-[var(--wx-ink)]">
      <span
        ref={maskSlotMeasureRef}
        className="wx-headline-rotate__word wx-headline-rotate__measure"
        aria-hidden
      />
      <span className="wx-headline-line">
        <span className="wx-headline-static">Designs that feel </span>
        <AsideHeroHeadlineAliveRow
          reduceMotion={reduceMotion}
          activeWord={activeWord}
          rotateSlotWidthPx={rotateSlotWidthPx}
        />
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
      {SITE_STACK_MARQUEE_LAYERS.map((tools, i) => (
        <StackMarqueeLane key={i} laneIndex={i} tools={tools} />
      ))}
    </div>
  );
}

function ContactPill({ c, reduceMotion, labelEase }) {
  const Icon = CONTACT_ROW_ICONS[c.icon];
  const external = c.href.startsWith("http");
  const [open, setOpen] = useState(false);
  const isBrandSvg = c.icon === "linkedin";

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
        {Icon && isBrandSvg ? (
          <Icon className="wx-contact-pill__brand-svg" />
        ) : Icon ? (
          <Icon className="wx-contact-pill__phosphor" size={18} weight="regular" />
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
    <nav className="wx-contact-row" aria-label="Profile, résumé, and email">
      {SITE_CONTACT_SOCIALS.map((c) => (
        <ContactPill key={c.href} c={c} reduceMotion={reduceMotion} labelEase={labelEase} />
      ))}
    </nav>
  );
}

const FAQ_PANEL_EASE = [0.33, 1, 0.68, 1];

function faqPanelTransition(reduceMotion) {
  if (reduceMotion) return { duration: 0 };
  return {
    height: { type: "tween", duration: 0.42, ease: FAQ_PANEL_EASE },
    opacity: { type: "tween", duration: 0.26, ease: FAQ_PANEL_EASE },
  };
}

function faqChevronT(reduceMotion) {
  if (reduceMotion) return { duration: 0 };
  return { type: "tween", duration: 0.34, ease: FAQ_PANEL_EASE };
}

function faqBubbleT(reduceMotion) {
  if (reduceMotion) return { duration: 0 };
  return { type: "spring", stiffness: 420, damping: 32, mass: 0.85 };
}

function FaqAccordionRow({ item, idx, isOpen, onToggle, reduceMotion, panelTransition }) {
  const openAnim = { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 };
  const bubbleAnim = isOpen
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 0, y: 10, scale: 0.97 };
  return (
    <div className="wx-faq-item">
      <button
        type="button"
        id={`site-faq-trigger-${idx}`}
        className="wx-faq-summary"
        aria-expanded={isOpen}
        aria-controls={`site-faq-panel-${idx}`}
        onClick={() => onToggle(idx)}
      >
        <span>{item.q}</span>
        <motion.span
          className="wx-faq-chevron text-[var(--wx-muted)]"
          aria-hidden
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={faqChevronT(reduceMotion)}
        />
      </button>
      <motion.div
        id={`site-faq-panel-${idx}`}
        role="region"
        aria-labelledby={`site-faq-trigger-${idx}`}
        aria-hidden={!isOpen}
        initial={false}
        animate={openAnim}
        transition={panelTransition}
        style={{ overflow: "hidden" }}
      >
        <div className="wx-faq-panel-inner">
          <div className="wx-faq-answer-row">
            <div className="wx-faq-avatar-placeholder" aria-hidden />
            <motion.div
              className="wx-faq-bubble"
              initial={false}
              animate={bubbleAnim}
              transition={faqBubbleT(reduceMotion)}
            >
              <p className="wx-faq-bubble__text wx-faq-bubble__answer">{item.a}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FaqAccordion({ reduceMotion }) {
  const [openSet, setOpenSet] = useState(() => new Set());
  const toggle = useCallback((idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);
  const panelT = faqPanelTransition(reduceMotion);
  return (
    <div>
      {SITE_FAQ.map((item, idx) => (
        <FaqAccordionRow
          key={item.q}
          item={item}
          idx={idx}
          isOpen={openSet.has(idx)}
          onToggle={toggle}
          reduceMotion={reduceMotion}
          panelTransition={panelT}
        />
      ))}
    </div>
  );
}

/* =====================================================================
   Commercial-clarity components
   - Studio bento (intro + services), trust strip, qualified-contact form.
     All accents driven by the four wx-accent tokens (primary, teal, violet,
     amber) so the palette stays coherent across nuggets, icons, and hovers.
   ===================================================================== */

function QualificationFormFieldInput({ field }) {
  if (field.type === "textarea") {
    return (
      <textarea
        id={`wx-qf-${field.id}`}
        name={field.id}
        required={field.required}
        placeholder={field.placeholder}
        rows={3}
        className="wx-form-input wx-form-input--textarea"
      />
    );
  }
  if (field.type === "select") {
    return (
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
    );
  }
  return (
    <input
      id={`wx-qf-${field.id}`}
      type="text"
      name={field.id}
      required={field.required}
      placeholder={field.placeholder}
      className="wx-form-input"
    />
  );
}

function QualificationFormField({ field, isFullWidth }) {
  return (
    <label
      htmlFor={`wx-qf-${field.id}`}
      className={clsx("flex flex-col gap-1.5", isFullWidth && "sm:col-span-2")}
    >
      <span className="wx-text-form-label text-[var(--wx-ink)]">
        {field.label}
        {field.required ? (
          <span aria-hidden className="ml-1 wx-gradient-text">
            *
          </span>
        ) : null}
      </span>
      <QualificationFormFieldInput field={field} />
    </label>
  );
}

function QualificationForm({ reduceMotion }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [];
    for (const field of SITE_QUALIFICATION_FIELDS) {
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
        className="rounded-[calc(var(--wx-radius-card)-2px)] border border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)] p-5 wx-text-sm text-[var(--wx-ink)]"
      >
        Your brief is on its way. If your email client didn&apos;t open, send the same
        details to{" "}
        <a className="wx-gradient-text underline-offset-4 hover:underline" href="mailto:wineurya30@gmail.com">
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
      {SITE_QUALIFICATION_FIELDS.map((field) => {
        const isFullWidth = field.type === "textarea" || field.id === "name" || field.id === "links";
        return <QualificationFormField key={field.id} field={field} isFullWidth={isFullWidth} />;
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
        <p className="wx-text-overline wx-text-overline--relaxed text-[var(--wx-muted)]">
          Opens your mail client with the brief preformatted. No data leaves your device.
        </p>
      </div>
    </form>
  );
}

function useScrollIntentIndex(activeIndex, scrollIntentIndex, setScrollIntentIndex) {
  useEffect(() => {
    if (scrollIntentIndex === null) return;
    if (activeIndex === scrollIntentIndex) setScrollIntentIndex(null);
  }, [activeIndex, scrollIntentIndex, setScrollIntentIndex]);
}

function useImageLoadScrollTriggerRefresh() {
  useEffect(() => {
    const onRefresh = () => queueScrollTriggerRefresh();
    const imgs = document.querySelectorAll(".site-canvas img");
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
}

function useHashScrollToSection(location, scrollToSection) {
  useEffect(() => {
    if (location.pathname !== "/") return;
    const id = (location.hash || "").replace(/^#/, "");
    if (!id.startsWith("section-")) return;

    let cancelled = false;
    let rafId = 0;
    let attempts = 0;
    const maxAttempts = 180;

    const tryScroll = () => {
      if (cancelled) return;
      attempts += 1;
      if (document.getElementById(id)) {
        scrollToSection(id);
        return;
      }
      if (attempts >= maxAttempts) return;
      rafId = window.requestAnimationFrame(tryScroll);
    };

    rafId = window.requestAnimationFrame(tryScroll);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
    };
  }, [location.hash, location.pathname, scrollToSection]);
}

function useEmptyCanvasResetSettled({ emptyProjectFocus, reduceMotion, setEmptyCanvasSettled }) {
  useEffect(() => {
    if (!emptyProjectFocus) {
      setEmptyCanvasSettled(false);
      return;
    }
    if (reduceMotion) {
      setEmptyCanvasSettled(false);
      return;
    }
    setEmptyCanvasSettled(false);
  }, [emptyProjectFocus, reduceMotion, setEmptyCanvasSettled]);
}

function useEmptyCanvasSettledTimeout({
  emptyProjectFocus,
  emptyCanvasSettled,
  reduceMotion,
  setEmptyCanvasSettled,
}) {
  useEffect(() => {
    if (!emptyProjectFocus) return;
    if (emptyCanvasSettled) return;
    if (reduceMotion) {
      const t = window.setTimeout(
        () => setEmptyCanvasSettled(true),
        Math.round(EMPTY_CANVAS_REDUCE_MOTION_OPACITY_S * 1000) + 120,
      );
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => setEmptyCanvasSettled(true), EMPTY_CANVAS_ENTER_MS + 150);
    return () => clearTimeout(t);
  }, [emptyProjectFocus, reduceMotion, emptyCanvasSettled, setEmptyCanvasSettled]);
}

function useEscapeClosesEmptyCanvas(emptyProjectFocus, setEmptyProjectFocus) {
  useEffect(() => {
    if (!emptyProjectFocus) return;
    const onKey = (e) => {
      if (e.key === "Escape") setEmptyProjectFocus(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emptyProjectFocus, setEmptyProjectFocus]);
}

function useStRefreshOnEmptyCanvasTransition(emptyProjectFocus, emptyCanvasSettled) {
  useEffect(() => {
    const id = requestAnimationFrame(() => queueScrollTriggerRefresh());
    const span = !emptyProjectFocus
      ? EMPTY_CANVAS_EXIT_MS
      : !emptyCanvasSettled
        ? EMPTY_CANVAS_ENTER_MS
        : 50;
    const mid = Math.round(span / 2);
    const t1 = window.setTimeout(() => queueScrollTriggerRefresh(), mid);
    const t2 = window.setTimeout(() => queueScrollTriggerRefresh(), span + 100);
    const t3 = window.setTimeout(() => queueScrollTriggerRefresh(), span + 300);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [emptyProjectFocus, emptyCanvasSettled]);
}

function useExplorationNavMotion(reduceMotion, emptyProjectFocus) {
  const tabPillTransition = useMemo(() => wxNavTabTransition(reduceMotion), [reduceMotion]);
  const tabRailFadeTransition = useMemo(() => wxNavRailFadeTransition(reduceMotion), [reduceMotion]);
  const emptyCanvasOpacityTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: EMPTY_CANVAS_REDUCE_MOTION_OPACITY_S, ease: EASE_EMPTY_CANVAS_FADE }
        : { duration: emptyProjectFocus ? EMPTY_CANVAS_ENTER_S : EMPTY_CANVAS_EXIT_S, ease: EASE_EMPTY_CANVAS_FADE },
    [reduceMotion, emptyProjectFocus],
  );
  return { tabPillTransition, tabRailFadeTransition, emptyCanvasOpacityTransition };
}

function useScrollToSectionForExploration(lenis, reduceMotion, setEmptyProjectFocus, setScrollIntentIndex) {
  return useCallback(
    (sectionId, tabIndexOverride) => {
      flushSync(() => {
        setEmptyProjectFocus(false);
      });
      const tabIndex =
        typeof tabIndexOverride === "number"
          ? tabIndexOverride
          : SECTION_TABS.findIndex((t) => t.sectionId === sectionId);
      if (tabIndex >= 0) setScrollIntentIndex(tabIndex);
      const el = document.getElementById(sectionId);
      if (!el) return;
      const duration = reduceMotion ? 0 : 1.35;
      if (lenis) {
        lenis.scrollTo(el, { offset: 0, duration, easing: reduceMotion ? undefined : WX_LENIS_EASE_IN_OUT });
        return;
      }
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    },
    [lenis, reduceMotion, setEmptyProjectFocus, setScrollIntentIndex],
  );
}

function useExplorationLayoutModel() {
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const activeIndex = useSectionScroll(SECTION_IDS);
  const [scrollIntentIndex, setScrollIntentIndex] = useState(null);
  const [emptyProjectFocus, setEmptyProjectFocus] = useState(false);
  const [emptyCanvasSettled, setEmptyCanvasSettled] = useState(false);
  const emptyProjectFocusRef = useRef(false);
  emptyProjectFocusRef.current = emptyProjectFocus;
  const selectedIndex = scrollIntentIndex ?? activeIndex;
  /** VT navigations merge this flag so `#site-panels` doesn't fight the cross-fade on mount. */
  const skipHomePanelsVtReveal = Boolean(location.state?.[WX_SKIP_HOME_PANELS_ENTER_KEY]);
  const tabRowRef = useRef(null);
  const { tabPillTransition, tabRailFadeTransition, emptyCanvasOpacityTransition } = useExplorationNavMotion(
    reduceMotion,
    emptyProjectFocus,
  );
  useScrollIntentIndex(activeIndex, scrollIntentIndex, setScrollIntentIndex);
  useImageLoadScrollTriggerRefresh();
  const scrollToSection = useScrollToSectionForExploration(
    lenis,
    reduceMotion,
    setEmptyProjectFocus,
    setScrollIntentIndex,
  );
  const scrollToExplorationTop = useCallback(() => {
    flushSync(() => {
      setEmptyProjectFocus(false);
    });
    setScrollIntentIndex(0);
    if (location.pathname === "/" && location.hash) {
      navigate({ pathname: "/", hash: "" }, { replace: true });
    }
    const duration = reduceMotion ? 0 : 1.35;
    if (lenis) {
      lenis.scrollTo(0, { duration, easing: reduceMotion ? undefined : WX_LENIS_EASE_IN_OUT });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [
    lenis,
    reduceMotion,
    setEmptyProjectFocus,
    setScrollIntentIndex,
    navigate,
    location.pathname,
    location.hash,
  ]);
  useHashScrollToSection(location, scrollToSection);
  useEmptyCanvasResetSettled({ emptyProjectFocus, reduceMotion, setEmptyCanvasSettled });
  useEmptyCanvasSettledTimeout({
    emptyProjectFocus,
    emptyCanvasSettled,
    reduceMotion,
    setEmptyCanvasSettled,
  });
  const onMainPanelsOpacityComplete = useCallback(() => {
    if (emptyProjectFocusRef.current) setEmptyCanvasSettled(true);
  }, []);
  useEscapeClosesEmptyCanvas(emptyProjectFocus, setEmptyProjectFocus);
  useStRefreshOnEmptyCanvasTransition(emptyProjectFocus, emptyCanvasSettled);
  return {
    lenis,
    navigate,
    location,
    reduceMotion,
    activeIndex,
    scrollIntentIndex,
    setScrollIntentIndex,
    emptyProjectFocus,
    setEmptyProjectFocus,
    emptyCanvasSettled,
    setEmptyCanvasSettled,
    emptyProjectFocusRef,
    selectedIndex,
    tabRowRef,
    tabPillTransition,
    tabRailFadeTransition,
    emptyCanvasOpacityTransition,
    scrollToSection,
    scrollToExplorationTop,
    onMainPanelsOpacityComplete,
    skipHomePanelsVtReveal,
  };
}

function AsideAvailabilityDot({ reduceMotion }) {
  return (
    <span
      className={clsx(
        "wx-aside-availability-dot inline-flex size-2 shrink-0 select-none",
        !reduceMotion && "wx-aside-availability-dot--pulse",
      )}
      aria-hidden
    >
      <span className="wx-aside-availability-dot__fill" />
    </span>
  );
}

function ExplorationPageAsideCopy({ reduceMotion, scrollToSection }) {
  return (
    <div className="mt-9 flex w-full min-w-0 flex-1 flex-col justify-center lg:mt-12 lg:min-h-0 lg:py-2">
      <div className="relative flex w-full flex-col gap-5 text-left">
        <div className="wx-text-eyebrow flex items-center gap-2 text-[var(--wx-muted)]">
          <AsideAvailabilityDot reduceMotion={reduceMotion} />
          <p>{SITE_HERO.eyebrow}</p>
        </div>
        <div className="flex flex-col gap-3">
          <AsideHeroHeadline reduceMotion={reduceMotion} />
          <p className="wx-text-body-secondary text-[var(--wx-muted)]">{SITE_HERO.subhead}</p>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <motion.button
            type="button"
            className="wx-btn-primary"
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "tween", duration: 0.15, ease: [0.3, 0, 0, 1] }}
            onClick={() => scrollToSection("section-contact", 3)}
          >
            {SITE_HERO.primaryCta.label}
          </motion.button>
          <motion.button
            type="button"
            className="wx-btn-secondary"
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "tween", duration: 0.15, ease: [0.3, 0, 0, 1] }}
            onClick={() => scrollToSection("section-work", 0)}
          >
            {SITE_HERO.secondaryCta.label}
          </motion.button>
        </div>
        <dl className="flex flex-col gap-3 wx-text-meta text-[var(--wx-muted)] [&_dd]:m-0">
          <div className="flex items-start gap-2.5">
            <HugeiconsIcon
              icon={Calendar01Icon}
              size={14}
              strokeWidth={1.6}
              className="mt-0.5 shrink-0 text-[color-mix(in_srgb,var(--wx-muted)_72%,transparent)]"
              aria-hidden
            />
            <div className="min-w-0">
              <dt className="sr-only">Availability</dt>
              <dd className="wx-text-meta--relaxed text-pretty">{SITE_AVAILABILITY.opening}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-[var(--wx-gradient-accent)]" aria-hidden />
            <div className="min-w-0">
              <dt className="sr-only">Engagements</dt>
              <dd className="wx-text-meta--relaxed text-pretty">{SITE_AVAILABILITY.note}</dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}

function ExplorationPageAsideFooter({ reduceMotion }) {
  return (
    <div className="mt-auto w-full min-w-0 space-y-6 pt-8 lg:space-y-7 lg:pt-10">
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
  );
}

function ExplorationPageAside(p) {
  const {
    emptyProjectFocus,
    emptyCanvasSettled,
    location,
    navigate,
    scrollToSection,
    scrollToExplorationTop,
    selectedIndex,
    reduceMotion,
    tabPillTransition,
    tabRailFadeTransition,
    tabRowRef,
    emptyCanvasOpacityTransition,
  } = p;
  return (
    <aside
      className={clsx(
        "relative z-20 flex w-full min-w-0 shrink-0 flex-col border-b border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)] [scrollbar-gutter:stable]",
        "lg:grow-0 lg:shrink-0 lg:sticky lg:top-0 lg:overflow-y-auto lg:overscroll-contain lg:border-b-0",
        "lg:flex-none",
        (!emptyProjectFocus || !emptyCanvasSettled) &&
          "lg:w-[var(--wx-explore-aside-basis)] lg:h-svh lg:max-h-svh",
        emptyProjectFocus && emptyCanvasSettled && "lg:w-full lg:max-w-none lg:self-start",
        emptyProjectFocus && emptyCanvasSettled && "lg:h-auto lg:max-h-none lg:min-h-0",
      )}
      aria-label="Introduction"
      data-site-region="aside"
    >
      <div
        className={clsx(
          "wx-aside-shell flex min-h-0 w-full flex-1 flex-col px-[var(--wx-pad-x)] lg:min-h-0",
          emptyProjectFocus && emptyCanvasSettled && "lg:flex-none",
        )}
      >
        <div className="wx-mobile-nav-spacer max-sm:block sm:hidden" aria-hidden />
        <ExplorationNavRow
          location={location}
          navigate={navigate}
          onSelectSection={scrollToSection}
          onHomeWordmarkClick={scrollToExplorationTop}
          selectedIndex={selectedIndex}
          reduceMotion={reduceMotion}
          tabPillTransition={tabPillTransition}
          tabRowRef={tabRowRef}
          tabRailHidden={emptyProjectFocus}
          tabRailFadeTransition={tabRailFadeTransition}
        />
        <motion.div
          className={clsx(
            "site-vt--aside flex min-h-0 w-full min-w-0 flex-1 flex-col",
            emptyProjectFocus && emptyCanvasSettled && "h-0 min-h-0 overflow-hidden",
          )}
          initial={false}
          animate={{ opacity: emptyProjectFocus ? 0 : 1 }}
          transition={emptyCanvasOpacityTransition}
          inert={emptyProjectFocus ? true : undefined}
          aria-hidden={emptyProjectFocus ? true : undefined}
        >
          <ExplorationPageAsideCopy reduceMotion={reduceMotion} scrollToSection={scrollToSection} />
          <ExplorationPageAsideFooter reduceMotion={reduceMotion} />
        </motion.div>
      </div>
    </aside>
  );
}

function ExplorationMainWorkSection({ reduceMotion, setEmptyProjectFocus }) {
  const [lead, ...rest] = SITE_WORK;
  return (
    <section
      id="section-work"
      role="tabpanel"
      aria-labelledby="site-tab-work"
      className="wx-work-section min-h-0"
    >
      {lead ? (
        <WorkCard
          key={lead.slug}
          entry={lead}
          reduceMotion={reduceMotion}
          onEmptyProjectClick={lead.status === "incomplete" ? () => setEmptyProjectFocus(true) : undefined}
          onOpenNavOnlyView={lead.workCardOpenNavOnlyView ? () => setEmptyProjectFocus(true) : undefined}
        />
      ) : null}
      {rest.length > 0 ? (
        <div className="wx-work-stack flex w-full flex-col gap-6 sm:gap-7">
          {rest.map((entry) => (
            <WorkCard
              key={entry.slug}
              entry={entry}
              reduceMotion={reduceMotion}
              onEmptyProjectClick={entry.status === "incomplete" ? () => setEmptyProjectFocus(true) : undefined}
              onOpenNavOnlyView={entry.workCardOpenNavOnlyView ? () => setEmptyProjectFocus(true) : undefined}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ExplorationMainStudioSection({ reduceMotion }) {
  return (
    <section
      id="section-studio"
      role="tabpanel"
      aria-labelledby="site-tab-studio"
      className="space-y-[var(--wx-gallery-gap)]"
    >
      <RevealCard
        reduceMotion={reduceMotion}
        aria-labelledby="studio-bento-intro-heading site-services-heading"
        className="flex flex-col gap-[var(--wx-gallery-gap)] overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] p-6 ring-1 ring-[color:var(--wx-ring-subtle)] sm:p-8 lg:p-8"
      >
        {/* Bento tier 1: two tiles (intro · visual) */}
        <div className="grid gap-[var(--wx-gallery-gap)] lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center space-y-3 lg:space-y-4 lg:py-0.5">
            <p className="wx-text-section-kicker text-[var(--wx-muted)]">Studio</p>
            <h2 id="studio-bento-intro-heading" className="wx-text-section-title text-[var(--wx-ink)]">
              Research-led design, built end to end.
            </h2>
            <p className="wx-text-body-secondary text-[var(--wx-muted)]">
              Product designer working across research, interaction, and shipping UI. I design in Figma and build in
              React, so detail doesn&rsquo;t get lost between the sketch and the code.
            </p>
          </div>
          <div className="wx-gallery-frame min-h-[12rem] overflow-hidden rounded-[calc(var(--wx-radius-card)-2px)] lg:min-h-[14rem]">
            <img
              className="h-full min-h-[12rem] w-full object-cover lg:min-h-[14rem]"
              src={SITE_EXTRA_IMAGES.marble}
              alt="Abstract marble light forms"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Bento tier 2: three-up; additional services span full width below */}
        <div className="space-y-4 border-t border-[color:var(--wx-border-soft)] pt-[var(--wx-gallery-gap)]">
          <p id="site-services-heading" className="wx-text-section-kicker text-[var(--wx-muted)]">
            Services
          </p>
          <ul className="grid gap-[var(--wx-gallery-gap)] sm:grid-cols-3" aria-labelledby="site-services-heading">
            {SITE_SERVICES.map((svc, idx) => (
              <li
                key={svc.slug}
                className={clsx(
                  "flex flex-col justify-between rounded-[var(--wx-radius-card)] bg-[var(--wx-page-bg)] p-5 ring-1 ring-[color:var(--wx-border-soft)] sm:p-6",
                  idx >= 3 && "sm:col-span-3",
                )}
              >
                <p className="wx-text-service-title text-[var(--wx-ink)]">{svc.title}</p>
                <p className="mt-3 wx-text-sm-tight text-[var(--wx-muted)] sm:mt-4">{svc.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </RevealCard>
      {SITE_TESTIMONIALS.length > 0 ? (
        <RevealCard
          reduceMotion={reduceMotion}
          className="overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] p-6 ring-1 ring-[color:var(--wx-ring-subtle)] sm:p-8 lg:p-10"
        >
          <figure className="space-y-5">
            <HugeiconsIcon
              icon={QuoteUpIcon}
              size={26}
              strokeWidth={1.4}
              className="[&_path]:!stroke-[url(#wx-grad)]"
            />
            <svg width="0" height="0" className="absolute">
              <linearGradient id="wx-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--wx-primary)" />
                <stop offset="50%" stopColor="var(--wx-accent-violet)" />
                <stop offset="100%" stopColor="var(--wx-accent-amber)" />
              </linearGradient>
            </svg>
            <blockquote className="wx-text-pullquote tracking-tight text-[var(--wx-ink)]">
              &ldquo;{SITE_TESTIMONIALS[0].quote}&rdquo;
            </blockquote>
            <figcaption className="wx-text-meta flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--wx-muted)]">
              <span className="font-medium text-[var(--wx-ink)]">{SITE_TESTIMONIALS[0].attribution}</span>
              <span aria-hidden>·</span>
              <span>{SITE_TESTIMONIALS[0].role}</span>
            </figcaption>
          </figure>
        </RevealCard>
      ) : null}
    </section>
  );
}

const APPROACH_STEPS = [
  {
    title: "Listen for the real problem",
    body: "Before touching the interface, I look for the friction underneath it through conversations, patterns, audits, and the small details people usually work around.",
    accent: "#ea580c",
    showFolderVisual: true,
  },
  {
    title: "Turn insight into direction",
    body: "I translate messy findings into flows, wireframes, and prototypes that make the next step easier to see, test, and build toward.",
    accent: "var(--wx-primary)",
  },
  {
    title: "Refine until it feels right",
    body: "I test what is working, fix what still feels unclear, and keep tightening the experience until it feels usable, accessible, and ready to hand off.",
    accent: "var(--wx-accent-teal)",
  },
];

function ApproachStepListItem({ step, className, reduceMotion, showFolderVisual }) {
  const [folderMotionActive, setFolderMotionActive] = useState(false);

  const textBlock = (
    <>
      <div className="wx-approach-step-card__title-row">
        <span className="wx-approach-step-card__accent" aria-hidden />
        <h3 className="wx-approach-step-card__title">{step.title}</h3>
      </div>
      <p className="wx-approach-step-card__lede">{step.body}</p>
    </>
  );

  if (showFolderVisual) {
    return (
      <li
        className={clsx("wx-approach-step-card", "wx-approach-step-card--with-folder-visual", className)}
        style={{ "--wx-approach-accent": step.accent }}
        data-approach-folder-card
        onPointerEnter={() => {
          if (!reduceMotion) setFolderMotionActive(true);
        }}
        onPointerLeave={() => setFolderMotionActive(false)}
      >
        <div className="wx-approach-step-card__text-clip">{textBlock}</div>
        <div className="wx-approach-step-card__folder-slot w-full" aria-hidden>
          <div className="wx-approach-step-card__folder-visual-inner">
            <ApproachStepFolderHoverVisual reduceMotion={reduceMotion} active={folderMotionActive} />
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={clsx("wx-approach-step-card", className)} style={{ "--wx-approach-accent": step.accent }}>
      {textBlock}
    </li>
  );
}

function ExplorationMainApproachSection({ reduceMotion }) {
  return (
    <section
      id="section-approach"
      role="tabpanel"
      aria-labelledby="site-tab-approach"
      className="space-y-[var(--wx-gallery-gap)]"
    >
      <RevealCard
        reduceMotion={reduceMotion}
        className="space-y-8 overflow-visible sm:space-y-10 lg:space-y-12"
      >
        <div
          className="wx-approach-3up-with-visual space-y-6 sm:space-y-8"
          data-approach="research-bento"
        >
          <div className="max-w-2xl space-y-2 lg:space-y-3">
            <p className="wx-text-section-kicker text-[var(--wx-muted)]">Approach</p>
            <h2 className="wx-text-section-title text-[var(--wx-ink)]">Research first, every time.</h2>
          </div>
          <ol className="wx-approach-steps-bento">
            {APPROACH_STEPS.map((step, index) => (
              <ApproachStepListItem
                key={step.title}
                step={step}
                reduceMotion={reduceMotion}
                showFolderVisual={Boolean(step.showFolderVisual)}
                className={index === APPROACH_STEPS.length - 1 ? "wx-approach-step-card--bento-wide" : undefined}
              />
            ))}
          </ol>
        </div>
      </RevealCard>
      <RevealCard
        reduceMotion={reduceMotion}
        className="overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-page-bg)] p-6 ring-1 ring-[color:var(--wx-border-soft)] sm:p-8 lg:p-10"
      >
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {SITE_STATS.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="wx-stat-value">{stat.value}</p>
              <p className="wx-text-sm font-medium text-[var(--wx-ink)]">{stat.label}</p>
              <p className="wx-text-meta wx-text-meta--relaxed text-[var(--wx-muted)]">{stat.hint}</p>
            </div>
          ))}
        </div>
      </RevealCard>
      <RevealCard
        reduceMotion={reduceMotion}
        className="overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-page-bg)] p-6 ring-1 ring-[color:var(--wx-border-soft)] sm:p-8 lg:p-10"
      >
        <div className="mb-6 space-y-2">
          <p className="wx-text-section-kicker text-[var(--wx-muted)]">FAQ</p>
          <h3 className="wx-text-subsection-title text-[var(--wx-ink)]">Questions, answered.</h3>
        </div>
        <FaqAccordion reduceMotion={reduceMotion} />
      </RevealCard>
    </section>
  );
}

function ExplorationMainContactSection({ reduceMotion }) {
  return (
    <section
      id="section-contact"
      role="tabpanel"
      aria-labelledby="site-tab-contact"
      className="space-y-[var(--wx-gallery-gap)]"
    >
      <RevealCard
        reduceMotion={reduceMotion}
        className="overflow-hidden rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] ring-1 ring-[color:var(--wx-ring-subtle)]"
      >
        <div className="grid gap-6 p-6 sm:gap-8 sm:p-8 lg:gap-10 lg:p-10">
          <div className="space-y-4 lg:space-y-5">
            <p className="wx-text-section-kicker text-[var(--wx-muted)]">Contact</p>
            <h2 className="wx-text-section-title text-[var(--wx-ink)]">
              Tell me what you&apos;re building.
            </h2>
            <p className="max-w-xl wx-text-body-secondary text-[var(--wx-muted)]">
              A short brief gets you a faster, more useful reply — two business days, every time. If we&apos;re not the
              right fit, I&apos;ll say so quickly and point you somewhere better.
            </p>
          </div>
          <QualificationForm reduceMotion={reduceMotion} />
          <div className="wx-text-meta flex flex-wrap items-center gap-3 border-t border-[color:var(--wx-border-soft)] pt-5 text-[var(--wx-muted)]">
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
      <div className="wx-text-meta flex flex-wrap items-center justify-between gap-3 px-1 pt-2 text-[var(--wx-muted)]">
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
  );
}

function ExplorationPageMainColumn(p) {
  const {
    emptyProjectFocus,
    emptyCanvasSettled,
    reduceMotion,
    skipHomePanelsVtReveal,
    emptyCanvasOpacityTransition,
    onMainPanelsOpacityComplete,
    setEmptyProjectFocus,
  } = p;
  const panelsInitialMount =
    reduceMotion || skipHomePanelsVtReveal
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: EMPTY_CANVAS_PANELS_DY };
  return (
    <ExplorationMainPanels
      as={motion.div}
      initial={panelsInitialMount}
      animate={
        reduceMotion
          ? { opacity: emptyProjectFocus ? 0 : 1, y: 0 }
          : { opacity: emptyProjectFocus ? 0 : 1, y: emptyProjectFocus ? EMPTY_CANVAS_PANELS_DY : 0 }
      }
      transition={emptyCanvasOpacityTransition}
      onAnimationComplete={onMainPanelsOpacityComplete}
      inert={emptyProjectFocus ? true : undefined}
      aria-hidden={emptyProjectFocus ? true : undefined}
      data-panels-mode={emptyCanvasSettled ? "empty" : emptyProjectFocus ? "fading" : "default"}
      className={clsx("isolate", emptyProjectFocus && emptyCanvasSettled && EMPTY_CANVAS_MAIN_GEOM_LG)}
    >
      <ExplorationMainWorkSection reduceMotion={reduceMotion} setEmptyProjectFocus={setEmptyProjectFocus} />
      <ExplorationMainStudioSection reduceMotion={reduceMotion} />
      <ExplorationMainApproachSection reduceMotion={reduceMotion} />
      <ExplorationMainContactSection reduceMotion={reduceMotion} />
    </ExplorationMainPanels>
  );
}

export function ExplorationHomePage() {
  const m = useExplorationLayoutModel();
  return (
    <ExplorationRoot
      reduceMotion={m.reduceMotion}
      data-empty-canvas={m.emptyProjectFocus ? "true" : undefined}
    >
      <ExplorationBody
        className={clsx(
          m.emptyProjectFocus && "lg:min-h-0 lg:items-start lg:overflow-x-clip",
        )}
      >
        <ExplorationPageAside
          emptyProjectFocus={m.emptyProjectFocus}
          emptyCanvasSettled={m.emptyCanvasSettled}
          location={m.location}
          navigate={m.navigate}
          scrollToSection={m.scrollToSection}
          scrollToExplorationTop={m.scrollToExplorationTop}
          selectedIndex={m.selectedIndex}
          reduceMotion={m.reduceMotion}
          tabPillTransition={m.tabPillTransition}
          tabRailFadeTransition={m.tabRailFadeTransition}
          tabRowRef={m.tabRowRef}
          emptyCanvasOpacityTransition={m.emptyCanvasOpacityTransition}
        />
        <ExplorationPageMainColumn
          emptyProjectFocus={m.emptyProjectFocus}
          emptyCanvasSettled={m.emptyCanvasSettled}
          reduceMotion={m.reduceMotion}
          skipHomePanelsVtReveal={m.skipHomePanelsVtReveal}
          emptyCanvasOpacityTransition={m.emptyCanvasOpacityTransition}
          onMainPanelsOpacityComplete={m.onMainPanelsOpacityComplete}
          setEmptyProjectFocus={m.setEmptyProjectFocus}
        />
      </ExplorationBody>
    </ExplorationRoot>
  );
}
