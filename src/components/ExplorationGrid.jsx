import { useState } from "react";
import { BorderBeam } from "border-beam";

import { CrateQueueStage } from "@/exploration/crateQueue/CrateQueueStage.jsx";
import { DiffPulseStage } from "@/exploration/diffPulse/DiffPulseStage.jsx";
import { FlutedGlassStage } from "@/exploration/flutedGlass/FlutedGlassStage.jsx";
import { GrainGradientStage } from "@/exploration/grainGradient/GrainGradientStage.jsx";
import { HoldToSendStage } from "@/exploration/holdToSend/HoldToSendStage.jsx";
import { JellyScrubberStage } from "@/exploration/jellyScrubber/JellyScrubberStage.jsx";
import { MagneticDockStage } from "@/exploration/magneticDock/MagneticDockStage.jsx";
import { OdometerCounterStage } from "@/exploration/odometerCounter/OdometerCounterStage.jsx";
import { ThinkingBorderStage } from "@/exploration/thinkingBorder/ThinkingBorderStage.jsx";
import { VoronoiGridStage } from "@/exploration/voronoiGrid/VoronoiGridStage.jsx";
import { WalletMenuStage } from "@/exploration/walletMenu/WalletMenuStage.jsx";
import { RevealItem, StaggerGroup } from "./Reveal.jsx";
import { IconArrowUpRight } from "../lib/icons.jsx";

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

const PREVIEW_COMPONENTS = {
  jelly: JellyScrubberStage,
  wallet: WalletMenuStage,
  crate: CrateQueueStage,
  hold: HoldToSendStage,
  odometer: OdometerCounterStage,
  magnetic: MagneticDockStage,
  thinking: ThinkingBorderStage,
  grain: GrainGradientStage,
  diff: DiffPulseStage,
  glass: FlutedGlassStage,
  voronoi: VoronoiGridStage,
};

function ExplorationImage({ src, alt }) {
  return (
    <div className="exp-card__frame exp-card__frame--image">
      <img className="exp-card__image" src={src} alt={alt} decoding="async" />
    </div>
  );
}

function ExplorationPreview({ kind, previewProps }) {
  const Component = PREVIEW_COMPONENTS[kind];
  if (!Component) return null;

  return (
    <div className="exp-card__embed" onClick={(event) => event.stopPropagation()}>
      <div className="exp-card__embed-inner">
        <Component className="exp-card__demo" inheritCanvas {...previewProps} />
      </div>
    </div>
  );
}

/* Demo frame wrapped in a quiet monochrome border beam that only runs while
   the visitor is over the live demo — restraint first, then reward. */
function ExplorationFrame({ kind, previewProps, theme }) {
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
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={() => setEngaged(false)}
    >
      <div className="exp-card__frame">
        <ExplorationPreview kind={kind} previewProps={previewProps} />
      </div>
    </BorderBeam>
  );
}

/** Exploration tiles with live demo embeds from /exploration. */
export function ExplorationGrid({ items, theme = "light" }) {
  return (
    <StaggerGroup className="exp-grid">
      {items.map((it) => {
        const isDead = it.href === "#";
        const hasPreview = Boolean(PREVIEW_COMPONENTS[it.preview]);
        const hasImage = Boolean(it.image);

        return (
          <RevealItem key={it.label} as="article" className="exp-card">
            {hasPreview ? (
              <ExplorationFrame
                kind={it.preview}
                previewProps={it.previewProps}
                theme={theme}
              />
            ) : hasImage ? (
              <ExplorationImage src={it.image} alt={it.imageAlt ?? it.label} />
            ) : null}

            <a
              className="exp-card__meta"
              href={it.href}
              onClick={isDead ? (event) => event.preventDefault() : undefined}
            >
              <span className="exp-card__label">
                {it.label}
                <IconArrowUpRight className="exp-card__arrow" size={14} ariaHidden />
              </span>
              <span className="exp-card__sub">{it.meta}</span>
            </a>
          </RevealItem>
        );
      })}
    </StaggerGroup>
  );
}
