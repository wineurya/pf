/* Central icons via deep entry points — the package's top-level ESM exports
   are broken in this install (see src/lib/icons.jsx), but per-icon CJS paths
   resolve under Vite. Kept local to the folder so the component lifts into
   another project with only react + central-icons. */
import { IconHome } from "central-icons/IconHome";
import { IconFolder1 } from "central-icons/IconFolder1";
import { IconBell } from "central-icons/IconBell";
import { IconEyeOpen } from "central-icons/IconEyeOpen";
import { IconLiveActivity } from "central-icons/IconLiveActivity";
import { IconTrending1 } from "central-icons/IconTrending1";
import { IconClock } from "central-icons/IconClock";
import { IconFolderShared } from "central-icons/IconFolderShared";
import { IconArchive } from "central-icons/IconArchive";
import { IconAt } from "central-icons/IconAt";
import { IconCheckmark2 } from "central-icons/IconCheckmark2";
import { IconSparkle2 } from "central-icons/IconSparkle2";

const ICON_MAP = {
  home: IconHome,
  files: IconFolder1,
  alerts: IconBell,
  overview: IconEyeOpen,
  activity: IconLiveActivity,
  trends: IconTrending1,
  recents: IconClock,
  shared: IconFolderShared,
  archive: IconArchive,
  mentions: IconAt,
  approvals: IconCheckmark2,
  digest: IconSparkle2,
};

export function NotchSidebarIcon({ name, size = 20 }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} ariaHidden />;
}

/* Dock-side glyphs for the side switcher — a rounded frame with the docked
   edge filled. Hand-drawn so the switcher adds no icon-package coupling. */
const SIDE_BARS = {
  left: { x: 3.5, y: 4.5, width: 3, height: 7 },
  top: { x: 4.5, y: 3.5, width: 7, height: 3 },
  right: { x: 9.5, y: 4.5, width: 3, height: 7 },
};

export function DockSideIcon({ side, size = 16 }) {
  const bar = SIDE_BARS[side];
  if (!bar) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.75"
        y="1.75"
        width="12.5"
        height="12.5"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect {...bar} rx="1" fill="currentColor" />
    </svg>
  );
}
