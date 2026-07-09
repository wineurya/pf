/* Browser-safe icon wrapper. The central-icons package advertises ESM files that
   are missing from this install, so dev mode must not import it directly — except
   where deep CJS entry points resolve under Vite (tab marks, case glyphs). */

import { IconColorPalette as CentralColorPalette } from "central-icons/IconColorPalette";
import { IconArrowUpRight as CentralArrowUpRight } from "central-icons/IconArrowUpRight";
import { IconCheckmark1Small as CentralCheckmark1Small } from "central-icons/IconCheckmark1Small";
import { IconCirclePlaceholderOn } from "central-icons/IconCirclePlaceholderOn";
import { IconCircleX } from "central-icons/IconCircleX";
import { IconCompassRound } from "central-icons/IconCompassRound";
import { IconCrossSmall } from "central-icons/IconCrossSmall";
import { IconEyeOpen } from "central-icons/IconEyeOpen";
import { IconFolder1 } from "central-icons/IconFolder1";
import { IconRaisingHand5Finger } from "central-icons/IconRaisingHand5Finger";
import { IconTouch } from "central-icons/IconTouch";
import { IconUser as CentralIconUser } from "central-icons/IconUser";
import { IconWarningSign } from "central-icons/IconWarningSign";
import { ArrowElbowRightDown } from "@phosphor-icons/react/dist/csr/ArrowElbowRightDown";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { Asterisk } from "@phosphor-icons/react/dist/csr/Asterisk";
import { Bookmarks } from "@phosphor-icons/react/dist/csr/Bookmarks";
import { CalendarBlank } from "@phosphor-icons/react/dist/csr/CalendarBlank";
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown";
import { CaretLeft } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/csr/CaretRight";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { CircleDashed } from "@phosphor-icons/react/dist/csr/CircleDashed";
import { Clipboard } from "@phosphor-icons/react/dist/csr/Clipboard";
import { Crosshair } from "@phosphor-icons/react/dist/csr/Crosshair";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { GridFour } from "@phosphor-icons/react/dist/csr/GridFour";
import { LinkedinLogo } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import { XLogo } from "@phosphor-icons/react/dist/csr/XLogo";
import { TrafficCone } from "@phosphor-icons/react/dist/csr/TrafficCone";
import { List } from "@phosphor-icons/react/dist/csr/List";
import { ListBullets } from "@phosphor-icons/react/dist/csr/ListBullets";
import { Lock } from "@phosphor-icons/react/dist/csr/Lock";
import { MagnetStraight } from "@phosphor-icons/react/dist/csr/MagnetStraight";
import { NumberSeven } from "@phosphor-icons/react/dist/csr/NumberSeven";
import { Palette } from "@phosphor-icons/react/dist/csr/Palette";
import { Square } from "@phosphor-icons/react/dist/csr/Square";
import { Stack } from "@phosphor-icons/react/dist/csr/Stack";
import { User } from "@phosphor-icons/react/dist/csr/User";
import { MapPin } from "@phosphor-icons/react/dist/csr/MapPin";
import { Users } from "@phosphor-icons/react/dist/csr/Users";
/* InCity persona quirks — one glyph per pain point (Alex + Blake). */
import { Signpost } from "@phosphor-icons/react/dist/csr/Signpost";
import { Warning } from "@phosphor-icons/react/dist/csr/Warning";
import { HandTap } from "@phosphor-icons/react/dist/csr/HandTap";
import { PersonSimpleWalk } from "@phosphor-icons/react/dist/csr/PersonSimpleWalk";
import { Question } from "@phosphor-icons/react/dist/csr/Question";
/* InCity outcome stats — one premium glyph per result metric. */
import { Gauge } from "@phosphor-icons/react/dist/csr/Gauge";
import { TrendDown } from "@phosphor-icons/react/dist/csr/TrendDown";
import { SealCheck } from "@phosphor-icons/react/dist/csr/SealCheck";
/* InCity research cols — alerts, payments, privacy. */
import { Bell } from "@phosphor-icons/react/dist/csr/Bell";
import { CreditCard } from "@phosphor-icons/react/dist/csr/CreditCard";
import { Shield } from "@phosphor-icons/react/dist/csr/Shield";

/** Phosphor weights for segmented nav — outline when idle, fill when selected. */
export const ICON_WEIGHT_IDLE = "regular";
export const ICON_WEIGHT_SELECTED = "fill";

function makeIcon(BaseIcon) {
  return function Icon({ ariaHidden, ariaLabel, weight = ICON_WEIGHT_IDLE, ...props }) {
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

const IconArrowElbowRightDown = makeIcon(ArrowElbowRightDown);
const IconArrowLeft = makeIcon(ArrowLeft);
const IconArrowUpRight = makeIcon(ArrowUpRight);
const IconBulletList = makeIcon(ListBullets);
const IconList = makeIcon(List);
const IconCalendar1 = makeIcon(CalendarBlank);
const IconChevronDown = makeIcon(CaretDown);
const IconChevronLeft = makeIcon(CaretLeft);
const IconChevronRight = makeIcon(CaretRight);
const IconCheckmark1Small = makeIcon(Check);
const IconClipboard = makeIcon(Clipboard);
const IconEnvelope = makeIcon(EnvelopeSimple);
const IconLinkedIn = makeIcon(LinkedinLogo);
const IconXLogo = makeIcon(XLogo);
const IconColorPalette = makeIcon(Palette);
const IconLayersThree = makeIcon(Stack);
const IconLock = makeIcon(Lock);
const IconLayoutGrid2 = makeIcon(GridFour);
const IconPeople = makeIcon(Users);
const IconSquarePlaceholder = makeIcon(Square);
const IconUser = makeIcon(User);
const IconMapPin = makeIcon(MapPin);
const IconSignpost = makeIcon(Signpost);
const IconWarning = makeIcon(Warning);
const IconHandTap = makeIcon(HandTap);
const IconWalk = makeIcon(PersonSimpleWalk);
const IconQuestion = makeIcon(Question);
const IconGauge = makeIcon(Gauge);
const IconTrendDown = makeIcon(TrendDown);
const IconSealCheck = makeIcon(SealCheck);
const IconBell = makeIcon(Bell);
const IconCreditCard = makeIcon(CreditCard);
const IconShield = makeIcon(Shield);
const IconLawAsterisk = makeIcon(Asterisk);
const IconLawBookmarks = makeIcon(Bookmarks);
const IconLawCrosshair = makeIcon(Crosshair);
const IconLawDashed = makeIcon(CircleDashed);
const IconLawMagnet = makeIcon(MagnetStraight);
const IconLawSeven = makeIcon(NumberSeven);
/* Mobile dock tabs — Central Icons (round-outlined, r3, stroke-2): same family
   as the feature-guide glyphs. Selected state is the widened pill + label. */
const IconTabWork = makeCentralIcon(IconFolder1);
const IconTabExploration = makeCentralIcon(IconCompassRound);
const IconTabAbout = makeCentralIcon(CentralIconUser);
/* Inline glyphs for the feature-guide trigger words (Central icons). */
const IconGuideVisual = makeCentralIcon(CentralColorPalette);
const IconGuideAccess = makeCentralIcon(IconEyeOpen);
const IconGuideInteraction = makeCentralIcon(IconTouch);
const IconCursorArrow = makeCentralIcon(CentralArrowUpRight);
const IconTrafficCone = makeIcon(TrafficCone);
/* Toast stack marks + dismiss — Central Icons. */
const IconToastCheck = makeCentralIcon(CentralCheckmark1Small);
const IconToastWarn = makeCentralIcon(IconWarningSign);
const IconToastError = makeCentralIcon(IconCircleX);
const IconToastDot = makeCentralIcon(IconCirclePlaceholderOn);
const IconToastClose = makeCentralIcon(IconCrossSmall);
/* Waving hand for the case-study sign-off. */
const IconWave = makeCentralIcon(IconRaisingHand5Finger);
function IconFigmaMark({ className, size = 14, ariaHidden }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden || undefined} xmlns="http://www.w3.org/2000/svg">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
    </svg>
  );
}

function IconFramerMark({ className, size = 14, ariaHidden }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden || undefined} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  );
}

function IconRive({ className, size = 14, ariaHidden }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden || undefined} xmlns="http://www.w3.org/2000/svg">
      <path d="M.643 1.475c0 .814.668 1.475 1.49 1.475H14.49c1.408 0 2.568.43 3.48 1.29.91.861 1.366 1.967 1.366 3.32 0 1.25-.456 2.274-1.367 3.072-.911.78-2.07 1.168-3.479 1.168H9.12c-.824 0-1.491.66-1.491 1.475 0 .815.667 1.475 1.491 1.475h5.93l5.342 8.482c.332.512.797.768 1.398.768.663 0 1.129-.256 1.398-.768.269-.533.217-1.096-.155-1.69l-4.753-7.56c1.284-.574 2.299-1.414 3.044-2.52.746-1.127 1.119-2.427 1.119-3.902 0-1.496-.342-2.807-1.026-3.934-.662-1.127-1.594-2.008-2.795-2.643C17.42.327 16.044 0 14.49 0H2.134C1.311 0 .643.66.643 1.475Z" />
    </svg>
  );
}

function IconClaudeMark({ className, size = 14, ariaHidden }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden || undefined} xmlns="http://www.w3.org/2000/svg">
      <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
    </svg>
  );
}

function IconFirebaseMark({ className, size = 14, ariaHidden }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden || undefined} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z" />
    </svg>
  );
}

export {
  IconArrowElbowRightDown,
  IconArrowLeft,
  IconArrowUpRight,
  IconBell,
  IconBulletList,
  IconCalendar1,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconCheckmark1Small,
  IconClipboard,
  IconColorPalette,
  IconCursorArrow,
  IconCreditCard,
  IconEnvelope,
  IconLinkedIn,
  IconXLogo,
  IconGuideAccess,
  IconGuideInteraction,
  IconGuideVisual,
  IconTrafficCone,
  IconLawAsterisk,
  IconLawBookmarks,
  IconLawCrosshair,
  IconLawDashed,
  IconLawMagnet,
  IconLawSeven,
  IconLayersThree,
  IconList,
  IconLock,
  IconLayoutGrid2,
  IconMapPin,
  IconPeople,
  IconSignpost,
  IconWarning,
  IconHandTap,
  IconWalk,
  IconQuestion,
  IconGauge,
  IconTrendDown,
  IconSealCheck,
  IconShield,
  IconSquarePlaceholder,
  IconTabAbout,
  IconTabExploration,
  IconTabWork,
  IconToastCheck,
  IconToastClose,
  IconToastDot,
  IconToastError,
  IconToastWarn,
  IconUser,
  IconWave,
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
  claude: IconClaudeMark,
  cursor: IconCursorApp,
  figma: IconFigmaMark,
  firebase: IconFirebaseMark,
  framer: IconFramerMark,
  rive: IconRive,
};
