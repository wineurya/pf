import { AnimatePresence, motion } from "motion/react";
import { WalletMenuTriggerIcon } from "@/exploration/walletMenu/WalletMenuIcons.jsx";
import { ICON_BLUR, iconMorphTransition } from "@/exploration/walletMenu/walletMenuMotion.js";

function TriggerIcon({ open, reduceMotion }) {
  if (reduceMotion) {
    return <WalletMenuTriggerIcon open={open} />;
  }

  return (
    <span className="wm-trigger-icon" aria-hidden>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={open ? "close" : "menu"}
          className="wm-trigger-icon-layer"
          initial={{ scale: 0.92, opacity: 0, filter: ICON_BLUR }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0.92, opacity: 0, filter: ICON_BLUR }}
          transition={iconMorphTransition}
        >
          <WalletMenuTriggerIcon open={open} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function WalletMenuTrigger({ open, reduceMotion, onToggle }) {
  return (
    <button
      type="button"
      className="wm-trigger"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-haspopup="menu"
      aria-controls="wm-panel"
      onClick={onToggle}
    >
      <TriggerIcon open={open} reduceMotion={reduceMotion} />
    </button>
  );
}
