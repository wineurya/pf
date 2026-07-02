import { useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { WalletMenuPanel } from "@/exploration/walletMenu/WalletMenuPanel.jsx";
import { WalletMenuTrigger } from "@/exploration/walletMenu/WalletMenuTrigger.jsx";
import { useWalletMenuDismiss } from "@/exploration/walletMenu/useWalletMenuDismiss.js";
import { buildMenuRows } from "@/exploration/walletMenu/walletMenuRows.js";
import { WALLET_MENU_BG_OPTIONS } from "@/exploration/walletMenu/walletMenuTheme.js";

/** Interactive wallet menu canvas — no demo frame or dock. */
export function WalletMenuStage({
  className,
  defaultOpen = false,
  backgroundId = WALLET_MENU_BG_OPTIONS[0].id,
  inheritCanvas = false,
  open: controlledOpen,
  onOpenChange,
  reduceMotion: controlledReduceMotion,
  rows: controlledRows,
  wrapRef: controlledWrapRef,
}) {
  const internalReduceMotion = useReducedMotion() ?? false;
  const reduceMotion = controlledReduceMotion ?? internalReduceMotion;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const internalWrapRef = useRef(null);
  const wrapRef = controlledWrapRef ?? internalWrapRef;
  const internalRows = useMemo(() => buildMenuRows(), []);
  const rows = controlledRows ?? internalRows;

  const canvasBg = useMemo(() => {
    if (inheritCanvas) return null;
    const match = WALLET_MENU_BG_OPTIONS.find((option) => option.id === backgroundId);
    return match?.color ?? "#ffffff";
  }, [backgroundId, inheritCanvas]);

  useWalletMenuDismiss(open, setOpen, wrapRef);

  return (
    <div
      className={className ? `wm-root ${className}` : "wm-root"}
      style={canvasBg ? { background: canvasBg } : undefined}
    >
      <div className="wm-stage">
        <div className="wm-scene" data-open={open} ref={wrapRef}>
          <div className="wm-locus">
            <WalletMenuPanel
              open={open}
              reduceMotion={reduceMotion}
              rows={rows}
              onSelect={() => setOpen(false)}
            />
          </div>
          <WalletMenuTrigger
            open={open}
            reduceMotion={reduceMotion}
            onToggle={() => setOpen((value) => !value)}
          />
        </div>
      </div>
    </div>
  );
}
