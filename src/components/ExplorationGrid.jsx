import { useState } from "react";
import { BorderBeam } from "border-beam";

import { JellyScrubberStage } from "@/exploration/jellyScrubber/JellyScrubberStage.jsx";
import { WalletMenuStage } from "@/exploration/walletMenu/WalletMenuStage.jsx";
import { RevealItem, StaggerGroup } from "./Reveal.jsx";
import { IconArrowUpRight } from "../lib/icons.jsx";

import "@/exploration/jellyScrubber/styles.css";
import "@/exploration/walletMenu/styles.css";
import "../styles/exploration-preview.css";

const PREVIEW_COMPONENTS = {
  jelly: JellyScrubberStage,
  wallet: WalletMenuStage,
};

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

        return (
          <RevealItem key={it.label} as="article" className="exp-card">
            {hasPreview ? (
              <ExplorationFrame
                kind={it.preview}
                previewProps={it.previewProps}
                theme={theme}
              />
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
