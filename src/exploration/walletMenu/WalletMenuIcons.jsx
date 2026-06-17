import {
  ArrowUpRight,
  GearSix,
  List,
  PaperPlaneTilt,
  PlusCircle,
  PuzzlePiece,
  Receipt,
  X,
} from "@phosphor-icons/react";
import { WALLET_MENU_PROFILE } from "@/exploration/walletMenu/walletMenuContent.js";

const ITEM_ICON_SIZE = 18;
const TRIGGER_ICON_SIZE = 18;
const ICON_WEIGHT = "regular";

const ICON_MAP = {
  send: PaperPlaneTilt,
  add: PlusCircle,
  cashOut: ArrowUpRight,
  transactions: Receipt,
  settings: GearSix,
  integrations: PuzzlePiece,
};

function MenuIcon({ icon: Icon, size }) {
  return (
    <Icon
      size={size}
      weight={ICON_WEIGHT}
      aria-hidden
      className="wm-phosphor-icon"
    />
  );
}

export function WalletMenuPhosphorIcon({ name, size = ITEM_ICON_SIZE }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <MenuIcon icon={Icon} size={size} />;
}

export function WalletMenuTriggerIcon({ open, size = TRIGGER_ICON_SIZE }) {
  const Icon = open ? X : List;
  return <MenuIcon icon={Icon} size={size} />;
}

export function ProfileAvatar() {
  return (
    <span className="wm-avatar" aria-hidden>
      <img src={WALLET_MENU_PROFILE.src} alt="" width={20} height={20} decoding="async" />
      <span className="wm-avatar-dot" />
    </span>
  );
}
