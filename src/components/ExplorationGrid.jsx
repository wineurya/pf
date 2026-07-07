import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BorderBeam } from "border-beam";

import { RevealItem, StaggerGroup } from "./Reveal.jsx";

import "@/exploration/crateQueue/styles.css";
import "@/exploration/diffPulse/styles.css";
import "@/exploration/flutedGlass/styles.css";
import "@/exploration/grainGradient/styles.css";
import "@/exploration/holdToSend/styles.css";
import "@/exploration/jellyScrubber/styles.css";
import "@/exploration/magneticDock/styles.css";
import "@/exploration/odometerCounter/styles.css";
import "@/exploration/thinkingBorder/styles.css";
import "@/exploration/voronoiGrid/styles.css";
import "@/exploration/walletMenu/styles.css";
import "../styles/exploration-preview.css";

function lazyPreview(loader, exportName) {
  return lazy(() =>
    loader().then((module) => ({ default: module[exportName] })),
  );
}

const PREVIEW_COMPONENTS = {
  thinking: lazyPreview(
    () => import("@/exploration/thinkingBorder/ThinkingBorderStage.jsx"),
    "ThinkingBorderStage",
  ),
  wallet: lazyPreview(
    () => import("@/exploration/walletMenu/WalletMenuStage.jsx"),
    "WalletMenuStage",
  ),
  crate: lazyPreview(
    () => import("@/exploration/crateQueue/CrateQueueStage.jsx"),
    "CrateQueueStage",
  ),
  hold: lazyPreview(
    () => import("@/exploration/holdToSend/HoldToSendStage.jsx"),
    "HoldToSendStage",
  ),
  jelly: lazyPreview(
    () => import("@/exploration/jellyScrubber/JellyScrubberStage.jsx"),
    "JellyScrubberStage",
  ),
  magnetic: lazyPreview(
    () => import("@/exploration/magneticDock/MagneticDockStage.jsx"),
    "MagneticDockStage",
  ),
  odometer: lazyPreview(
    () => import("@/exploration/odometerCounter/OdometerCounterStage.jsx"),
    "OdometerCounterStage",
  ),
  diff: lazyPreview(
    () => import("@/exploration/diffPulse/DiffPulseStage.jsx"),
    "DiffPulseStage",
  ),
  grain: lazyPreview(
    () => import("@/exploration/grainGradient/GrainGradientStage.jsx"),
    "GrainGradientStage",
  ),
  glass: lazyPreview(
    () => import("@/exploration/flutedGlass/FlutedGlassStage.jsx"),
    "FlutedGlassStage",
  ),
  voronoi: lazyPreview(
    () => import("@/exploration/voronoiGrid/VoronoiGridStage.jsx"),
    "VoronoiGridStage",
  ),
};

const EXPLORATION_FRAME_RADIUS = 24;

/* Caption lives inside the frame: title top-left, optional note top-right.
   Pointer events pass through so the demo keeps its full hit area; a linked
   note (credits) re-enables them on itself only. */
function ExplorationCaption({ label, subtitle, note, noteHref }) {
  return (
    <div className="exp-card__caption">
      <span className="exp-card__title">
        <span className="exp-card__label">{label}</span>
        {subtitle ? (
          <span className="exp-card__subtitle">{subtitle}</span>
        ) : null}
      </span>
      {note ? (
        noteHref ? (
          <a
            className="exp-card__note exp-card__note--link"
            href={noteHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {note}
          </a>
        ) : (
          <span className="exp-card__note">{note}</span>
        )
      ) : null}
    </div>
  );
}

function ExplorationImage({ src, alt, label, subtitle, note, noteHref }) {
  return (
    <div className="exp-card__frame exp-card__frame--image">
      <img
        className="exp-card__image"
        src={src}
        alt={alt}
        decoding="async"
        loading="lazy"
      />
      <ExplorationCaption
        label={label}
        subtitle={subtitle}
        note={note}
        noteHref={noteHref}
      />
    </div>
  );
}

/* The demos are ambient loops — infinite CSS animations, intervals, one WebGL
   shader — and running all eleven for the whole tab is what makes the page
   heavy. Each embed mounts only once its card drifts within MOUNT_MARGIN of
   the viewport, and unmounts again past UNMOUNT_MARGIN. The wide hysteresis
   band means a demo never resets anywhere near the visitor's eye, and the
   two thresholds can't chatter against each other at a boundary. */
const MOUNT_MARGIN = "40% 0px";
const UNMOUNT_MARGIN = "180% 0px";

function useNearViewport(ref) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const enter = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: MOUNT_MARGIN },
    );
    const exit = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setNear(false);
      },
      { rootMargin: UNMOUNT_MARGIN },
    );
    enter.observe(el);
    exit.observe(el);
    return () => {
      enter.disconnect();
      exit.disconnect();
    };
  }, [ref]);

  return near;
}

function ExplorationPreview({ kind, previewProps }) {
  const Component = PREVIEW_COMPONENTS[kind];
  const embedRef = useRef(null);
  const near = useNearViewport(embedRef);
  if (!Component) return null;

  return (
    <div
      ref={embedRef}
      className="exp-card__embed"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="exp-card__embed-inner">
        {near ? (
          <Suspense
            fallback={<div className="exp-card__fallback" aria-hidden="true" />}
          >
            <Component className="exp-card__demo" inheritCanvas {...previewProps} />
          </Suspense>
        ) : (
          <div className="exp-card__fallback" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

/* Demo frame wrapped in a quiet monochrome border beam that only runs while
   the visitor is over the live demo — restraint first, then reward. */
function ExplorationFrame({
  kind,
  previewProps,
  theme,
  label,
  subtitle,
  note,
  noteHref,
}) {
  const [engaged, setEngaged] = useState(false);

  return (
    <BorderBeam
      className="exp-card__beam"
      size="md"
      colorVariant="mono"
      staticColors
      theme={theme}
      active={engaged}
      strength={0.6}
      borderRadius={EXPLORATION_FRAME_RADIUS}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={() => setEngaged(false)}
    >
      <div className="exp-card__frame" data-kind={kind}>
        <ExplorationPreview kind={kind} previewProps={previewProps} />
        <ExplorationCaption
          label={label}
          subtitle={subtitle}
          note={note}
          noteHref={noteHref}
        />
      </div>
    </BorderBeam>
  );
}

/** Exploration tiles with live demo embeds from /exploration. */
export function ExplorationGrid({ items, theme = "light" }) {
  return (
    <StaggerGroup className="exp-grid">
      {items.map((it) => {
        const hasPreview = Boolean(PREVIEW_COMPONENTS[it.preview]);
        const hasImage = Boolean(it.image);

        return (
          <RevealItem key={it.label} as="article" className="exp-card">
            {hasPreview ? (
              <ExplorationFrame
                kind={it.preview}
                previewProps={it.previewProps}
                theme={theme}
                label={it.label}
                subtitle={it.subtitle}
                note={it.note}
                noteHref={it.noteHref}
              />
            ) : hasImage ? (
              <ExplorationImage
                src={it.image}
                alt={it.imageAlt ?? it.label}
                label={it.label}
                subtitle={it.subtitle}
                note={it.note}
                noteHref={it.noteHref}
              />
            ) : null}
          </RevealItem>
        );
      })}
    </StaggerGroup>
  );
}
