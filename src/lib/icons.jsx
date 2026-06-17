/* Browser-safe icon wrapper. The central-icons package advertises ESM files that
   are missing from this install, so dev mode must not import it directly — except
   where deep CJS entry points resolve under Vite (tab marks, case glyphs). */

import { IconCompassRound } from "central-icons/IconCompassRound";
import { IconSuitcaseWork } from "central-icons/IconSuitcaseWork";
import { IconUser as CentralIconUser } from "central-icons/IconUser";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { CalendarBlank } from "@phosphor-icons/react/dist/csr/CalendarBlank";
import { CaretRight } from "@phosphor-icons/react/dist/csr/CaretRight";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { Clipboard } from "@phosphor-icons/react/dist/csr/Clipboard";
import { FigmaLogo } from "@phosphor-icons/react/dist/csr/FigmaLogo";
import { FireSimple } from "@phosphor-icons/react/dist/csr/FireSimple";
import { FramerLogo } from "@phosphor-icons/react/dist/csr/FramerLogo";
import { GridFour } from "@phosphor-icons/react/dist/csr/GridFour";
import { ListBullets } from "@phosphor-icons/react/dist/csr/ListBullets";
import { Palette } from "@phosphor-icons/react/dist/csr/Palette";
import { Sparkle } from "@phosphor-icons/react/dist/csr/Sparkle";
import { Square } from "@phosphor-icons/react/dist/csr/Square";
import { Stack } from "@phosphor-icons/react/dist/csr/Stack";
import { User } from "@phosphor-icons/react/dist/csr/User";
import { MapPin } from "@phosphor-icons/react/dist/csr/MapPin";
import { Users } from "@phosphor-icons/react/dist/csr/Users";

function makeIcon(BaseIcon) {
  return function Icon({ ariaHidden, ariaLabel, weight = "regular", ...props }) {
    return (
      <BaseIcon
        {...props}
        aria-hidden={ariaHidden || undefined}
        alt={ariaHidden ? undefined : ariaLabel}
        weight={weight}
      />
    );
  };
}

function makeCentralIcon(CentralIcon) {
  return function Icon({ ariaHidden = true, ariaLabel, size = 24, className, ...props }) {
    return (
      <CentralIcon
        {...props}
        className={className}
        size={size}
        ariaHidden={ariaHidden}
        ariaLabel={ariaHidden ? undefined : ariaLabel}
      />
    );
  };
}

const IconArrowLeft = makeIcon(ArrowLeft);
const IconArrowUpRight = makeIcon(ArrowUpRight);
const IconBulletList = makeIcon(ListBullets);
const IconCalendar1 = makeIcon(CalendarBlank);
const IconChevronRight = makeIcon(CaretRight);
const IconCheckmark1Small = makeIcon(Check);
const IconClipboard = makeIcon(Clipboard);
const IconColorPalette = makeIcon(Palette);
const IconLayersThree = makeIcon(Stack);
const IconLayoutGrid2 = makeIcon(GridFour);
const IconPeople = makeIcon(Users);
const IconSquarePlaceholder = makeIcon(Square);
const IconUser = makeIcon(User);
const IconMapPin = makeIcon(MapPin);
const IconTabWork = makeCentralIcon(IconSuitcaseWork);
const IconTabExploration = makeCentralIcon(IconCompassRound);
const IconTabAbout = makeCentralIcon(CentralIconUser);
const IconClaudeai = makeIcon(Sparkle);
const IconFigma = makeIcon(FigmaLogo);
const IconFire1 = makeIcon(FireSimple);
const IconFramer = makeIcon(FramerLogo);
function IconRive({ className, size = 14, ariaHidden }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 3h8c3.314 0 6 2.686 6 6 0 2.416-1.43 4.507-3.504 5.484L19 21h-3.5l-3.19-6H8.5v6H5V3zm3.5 3v5.5H13a2.75 2.75 0 0 0 0-5.5H8.5z" />
    </svg>
  );
}

export {
  IconArrowLeft,
  IconArrowUpRight,
  IconBulletList,
  IconCalendar1,
  IconChevronRight,
  IconCheckmark1Small,
  IconClipboard,
  IconColorPalette,
  IconLayersThree,
  IconLayoutGrid2,
  IconMapPin,
  IconPeople,
  IconSquarePlaceholder,
  IconTabAbout,
  IconTabExploration,
  IconTabWork,
  IconUser,
};

/** Cursor app mark — Simple Icons path; not the generic pointer glyph. */
function IconCursorApp({ className, size = 14, ariaHidden }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}

/* Inline brand marks for tool mentions in running text (see ToolWord). */
export const BRAND_ICONS = {
  claude: IconClaudeai,
  cursor: IconCursorApp,
  figma: IconFigma,
  firebase: IconFire1, /* no Firebase mark in the set — the flame reads right */
  framer: IconFramer,
  rive: IconRive,
};
