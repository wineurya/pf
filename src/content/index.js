/* Portfolio content: work = case studies; exploration = /exploration demos.
   About paragraphs may be arrays of segments: strings render as text, and
   { word, photos } objects render as interactive hover words (see HoverWord). */

import childhoodQueens from "../assets/about/about-childhood-01.jpg";
import dogPoodle from "../assets/about/about-dog-02.jpg";
import dogSpaniel from "../assets/about/about-dog-01.jpg";
import foodBirria from "../assets/about/about-food-03.jpg";
import foodFriedChicken from "../assets/about/about-food-01.jpg";
import foodGrillWings from "../assets/about/about-food-04.jpg";
import foodIzakaya from "../assets/about/about-food-02.jpg";
import gradKennesaw from "../assets/about/about-grad-01.jpg";
import gymMirror from "../assets/about/about-gym-02.jpg";
import gymSelfie from "../assets/about/about-gym-01.jpg";
import lightsCouple from "../assets/about/about-lights-01.jpg";
import lightsRabbit from "../assets/about/about-lights-02.jpg";
import milesPlush from "../assets/about/about-collectible-01.jpg";
import travelBallpark from "../assets/about/about-travel-03.jpg";
import travelBeach from "../assets/about/about-travel-01.jpg";
import travelDrStreet from "../assets/about/about-travel-02.jpg";
import travelFigmaBackseat from "../assets/about/about-travel-05.jpg";
import travelHeladosBon from "../assets/about/about-travel-04.jpg";
import vinylOxymoron from "../assets/about/about-vinyl-01.jpg";

/* Die-cut stickers (from the Figma sticker sheet) that sit on the edges of
   filmstrip photos — see the `sticker` field on photo objects below. */
import stickerCompass from "../assets/about/stickers/compass.png";
import stickerDove from "../assets/about/stickers/dove.png";
import stickerFacetime from "../assets/about/stickers/facetime.png";
import stickerFolder from "../assets/about/stickers/folder.png";
import stickerKeys from "../assets/about/stickers/keys.png";
import stickerMango from "../assets/about/stickers/mango.png";
import stickerNoPhotos from "../assets/about/stickers/no-photos.png";
import stickerPill from "../assets/about/stickers/pill.png";
import stickerShark from "../assets/about/stickers/shark.png";
import stickerSmile from "../assets/about/stickers/smile.png";

import avanceCover from "../assets/case/avance-cover.webp";
import kinetixCover from "../assets/case/kinetix-cover.webp";
import logitechCover from "../assets/case/logitech-cover.webp";
import resolutionsCover from "../assets/case/resolutions-cover.webp";
import sirenCover from "../assets/case/siren-cover.webp";
import incityCover from "../assets/case/incity-cover.webp";

import { avance } from "./cases/avance.js";
import { incity } from "./cases/incity.js";
import { kinetix } from "./cases/kinetix.js";
import { logitech } from "./cases/logitech.js";
import { resolutions } from "./cases/resolutions.js";
import { siren } from "./cases/siren.js";

/* Intrinsic pixel size of each cover, keyed by its imported URL. The gallery card
   stamps these as the <img> width/height so the media tile reserves the cover's
   true aspect ratio *before* the lazy image loads — no layout shift on load. */
const COVER_DIMS = new Map([
  [avanceCover, { w: 1600, h: 1600 }],
  [incityCover, { w: 3290, h: 980 }],
  [kinetixCover, { w: 1600, h: 1067 }],
  [logitechCover, { w: 1024, h: 476 }],
  [resolutionsCover, { w: 2048, h: 1148 }],
  [sirenCover, { w: 2048, h: 1152 }],
]);

/* Case studies, keyed by slug. WIP studies stay in the map and list (locked). */
export const caseStudies = {
  avance,
  kinetix,
  incity,
  logitech,
  siren,
  resolutions,
};

/* Work list — shipped first, WIP last. Order is the public Work order. */
const CASE_STUDY_ORDER = [
  "incity",
  "logitech",
  "siren",
  "resolutions",
  "avance",
  "kinetix",
];

export const site = {
  name: "Wineury Almonte",
  role: "Independent Product Designer",
  /* Header bio — single ~2-line block at 576px (Figma excerpt rhythm). */
  excerpt: [
    "I'm an independent product designer, exploring passion projects, sharpening my eye for interfaces, and experimenting with new design tools.",
  ],
  email: "contact@wineury.design",
  contact: [
    {
      type: "email",
      label: "contact@wineury.design",
      value: "contact@wineury.design",
    },
    {
      type: "link",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/wineury",
    },
    { type: "link", label: "X/Twitter", href: "https://x.com/wineurya" },
  ],

  /* Right-side metas: 2–3 word Title Case noun phrase for what the project
     is (Emil/Paco pattern: "toast component", not a tagline or "X App"). */
  work: CASE_STUDY_ORDER.map((slug) => {
    const study = caseStudies[slug];
    const coverDims = COVER_DIMS.get(study.cover);
    return {
      label: study.title,
      meta: study.meta,
      href: `/work/${slug}`,
      slug,
      wip: Boolean(study.wip),
      hero: study.hero,
      cover: study.cover,
      coverDark: study.coverDark,
      coverW: coverDims?.w,
      coverH: coverDims?.h,
    };
  }),

  /* Live embeds — curated to the strongest demos. preview key maps to
     ExplorationGrid components. Caption: label/subtitle top-left, optional
     note top-right. */
  explorationPreviews: [
    {
      label: "Assistant status orb",
      subtitle: "State indicator component",
      preview: "thinking",
    },
    {
      label: "Wallet action menu",
      subtitle: "Menu component",
      preview: "wallet",
    },
    {
      label: "Crate reorder queue",
      subtitle: "Draggable list component",
      note: "Inspired by @alyx_so",
      noteHref: "https://twitter.com/alyx_so",
      preview: "crate",
    },
    {
      label: "Hold-to-send button",
      subtitle: "Confirmation button component",
      preview: "hold",
    },
    {
      label: "Toast stack",
      subtitle: "Notification component",
      preview: "toast",
    },
    {
      label: "Billing period tabs",
      subtitle: "Pricing component",
      note: "Inspired by @pacocoursey",
      noteHref: "https://paco.me/craft/tabs",
      preview: "billing",
    },
    {
      label: "Dither metric graph",
      subtitle: "Chart component",
      preview: "dither",
    },
    {
      label: "Jelly volume slider",
      subtitle: "Input slider component",
      preview: "jelly",
    },
    {
      label: "Magnetic app dock",
      subtitle: "Navigation dock component",
      preview: "magnetic",
    },
    {
      label: "Lines-changed pulse",
      subtitle: "Version feedback component",
      preview: "diff",
    },
  ],

  /* Tool mentions ({ tool, icon }) render with an inline Central brand mark.
     Hover-word photos carry a short `cap` shown centered on hover in the
     expanded bento (alt stays the long, descriptive text). An optional
     `sticker` ({ src, edge, at, tilt }) pins a die-cut sticker to the photo's
     frame in the filmstrip: `edge` names the side, `at` is % along that edge
     (kept off the corners), `tilt` is degrees. */
  about: [
    "I'm a product designer and researcher based in Atlanta. I started in mobile UX and behavioral tracking, and I care about making interfaces feel clear, useful, and easy to stay with.",
    [
      "I was ",
      {
        word: "born in Queens",
        photos: [
          {
            src: childhoodQueens,
            alt: "A scanned film photo of me as a toddler in an Everlast tank top",
            cap: "queens, everlast era",
            sticker: { src: stickerDove, edge: "top", at: 32, tilt: -8 },
          },
        ],
      },
      " and ",
      {
        word: "raised in Atlanta",
        photos: [
          {
            src: gradKennesaw,
            alt: "Graduation selfie in cap and gown at Kennesaw State",
            cap: "kennesaw state, cap and gown",
            sticker: { src: stickerCompass, edge: "right", at: 34, tilt: 10 },
          },
        ],
      },
      ", so a lot of how I think about design comes from watching how people move through real places.",
    ],
    [
      { text: "I'm drawn to tools that change what's possible, whether that's ", tone: "muted" },
      { tool: "Figma", icon: "figma" },
      { text: ", ", tone: "muted" },
      { tool: "Framer", icon: "framer" },
      { text: ", ", tone: "muted" },
      { tool: "Rive", icon: "rive" },
      { text: ", or whatever I haven't tried yet. The current stack is ", tone: "muted" },
      { tool: "Claude", icon: "claude" },
      { text: ", ", tone: "muted" },
      { tool: "Cursor", icon: "cursor" },
      { text: " & ", tone: "muted" },
      { tool: "Firebase", icon: "firebase" },
      { text: ".", tone: "muted" },
    ],
    [
      {
        text: "I'm open to founding or early product design roles. Work that's still close to the core decisions and has room to shape what the product becomes.",
        tone: "muted",
      },
    ],
    [
      "When I'm not working, I'm usually thinking about ",
      {
        word: "food",
        photos: [
          { src: foodFriedChicken, alt: "A tray of Korean fried chicken", cap: "korean fried chicken run" },
          { src: foodIzakaya, alt: "An izakaya spread of small plates", cap: "izakaya, little plates" },
          { src: foodBirria, alt: "Birria tacos with a cup of consommé", cap: "birria, extra consommé" },
          { src: foodGrillWings, alt: "Chicken wings lined up with rosemary sprigs on my backyard grill", cap: "rosemary on everything" },
        ],
      },
      ", wishing I could get back to ",
      {
        word: "my country",
        photos: [
          {
            src: travelBeach,
            alt: "Palm trees over a Caribbean beach",
            cap: "home beach, no filter",
            sticker: { src: stickerShark, edge: "bottom", at: 62, tilt: 7 },
          },
          {
            src: travelDrStreet,
            alt: "A sunny street in the Dominican Republic",
            cap: "DR streets, golden hour",
            sticker: { src: stickerKeys, edge: "bottom", at: 30, tilt: -9 },
          },
          { src: travelBallpark, alt: "A winter-league baseball game at night", cap: "winter league nights" },
          {
            src: travelHeladosBon,
            alt: "A cup of Helados BON ice cream in a Dominican supermarket",
            cap: "helados bon, mandatory stop",
            sticker: { src: stickerMango, edge: "right", at: 58, tilt: 12 },
          },
          {
            src: travelFigmaBackseat,
            alt: "Laptop open to Figma in the back seat, Dominican countryside out the window",
            cap: "figma in the back seat",
            sticker: { src: stickerFolder, edge: "top", at: 68, tilt: 6 },
          },
        ],
      },
      " more often, dragging myself to ",
      {
        word: "the gym",
        photos: [
          { src: gymSelfie, alt: "Post-workout selfie outdoors", cap: "post-pump glow" },
          {
            src: gymMirror,
            alt: "Gym mirror selfie in the locker room",
            cap: "locker room check-in",
            sticker: { src: stickerSmile, edge: "top", at: 34, tilt: -6 },
          },
        ],
      },
      ", or ending up at ",
      {
        word: "the garden lights",
        photos: [
          {
            src: lightsCouple,
            alt: "Two of us bundled up under the lit-up trees at the botanical garden",
            cap: "garden lights, annual tradition",
            sticker: { src: stickerFacetime, edge: "bottom", at: 28, tilt: -8 },
          },
          {
            src: lightsRabbit,
            alt: "A glowing rabbit sculpture tipping a top hat at the garden lights",
            cap: "the rabbit gets it",
          },
        ],
      },
      ". I dig through ",
      {
        word: "vinyl",
        photos: [
          {
            src: vinylOxymoron,
            alt: "ScHoolboy Q's Oxymoron on vinyl, found in the wild",
            cap: "oxymoron, found in the wild",
            sticker: { src: stickerNoPhotos, edge: "right", at: 28, tilt: 9 },
          },
        ],
      },
      " when I find a good bin, hang out with ",
      {
        word: "my family's dogs",
        photos: [
          { src: dogSpaniel, alt: "A Cavalier King Charles spaniel looking up", cap: "the gentleman" },
          { src: dogPoodle, alt: "A curly toy poodle standing on a wood floor", cap: "the menace" },
        ],
      },
      ", and yeah, I'm pretty into ",
      {
        word: "Spider-Man",
        photos: [
          {
            src: milesPlush,
            alt: "A Spider-Man plush on a shelf",
            cap: "Spider-Man stays",
            sticker: { src: stickerPill, edge: "left", at: 38, tilt: -10 },
          },
        ],
      },
      ".",
    ],
  ],
};

export const tabs = [
  { id: "work", label: "Work", icon: "work" },
  { id: "exploration", label: "Exploration", icon: "exploration" },
  { id: "about", label: "About", icon: "about" },
];
