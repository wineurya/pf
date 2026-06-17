function publicAssetUrl(path) {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith("/") ? base : `${base}/`;
  return `${root}${path.replace(/^\//, "")}`;
}

const TOOL_ICONS = {
  figma: {
    src: publicAssetUrl("case-tool-icons/figma.svg"),
    fit: "tall",
  },
  "figma-and-figjam": {
    src: publicAssetUrl("case-tool-icons/figma.svg"),
    fit: "tall",
  },
  lottie: {
    src: publicAssetUrl("case-tool-icons/lottiefiles-mark.svg"),
    fit: "square",
  },
  "after-effects": {
    src: publicAssetUrl("case-tool-icons/adobe-after-effects.svg"),
    fit: "square",
  },
  illustrator: {
    src: publicAssetUrl("case-tool-icons/adobe-illustrator.svg"),
    fit: "square",
  },
  photoshop: {
    src: publicAssetUrl("case-tool-icons/adobe-photoshop.svg"),
    fit: "square",
  },
  claude: {
    src: publicAssetUrl("case-tool-icons/claude.svg"),
    fit: "square",
  },
  cursor: {
    src: publicAssetUrl("case-tool-icons/cursor.svg"),
    fit: "square",
  },
  composer: {
    src: publicAssetUrl("case-tool-icons/cursor.svg"),
    fit: "square",
  },
  miro: {
    src: "https://cdn.simpleicons.org/miro",
    fit: "square",
  },
  "google-slides": {
    src: "https://cdn.simpleicons.org/googleslides",
    fit: "square",
  },
  indesign: {
    src: "https://www.adobe.com/cc-shared/assets/img/product-icons/svg/indesign-64.svg",
    fit: "square",
  },
  mobbin: {
    src: "https://framerusercontent.com/images/oPS7zaP2iinQmw4du221pyfo.svg",
    fit: "square",
  },
  react: {
    src: "https://cdn.simpleicons.org/react",
    fit: "wide",
  },
  motion: {
    src: "https://motion.dev/favicon.svg",
    fit: "square",
  },
  vite: {
    src: "https://cdn.simpleicons.org/vite",
    fit: "square",
  },
};

function toolSlug(label) {
  return label
    .trim()
    .toLowerCase()
    .replace(/adobe\s+/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ToolBrandIcon({ label }) {
  const slug = toolSlug(label);
  const icon = TOOL_ICONS[slug];

  if (!icon) return null;

  return (
    <span
      className={`cs__tool-icon cs__tool-icon--${icon.fit} cs__tool-icon--${slug}`}
      role="img"
      aria-label={label}
      title={label}
    >
      <img src={icon.src} alt="" decoding="async" draggable={false} />
    </span>
  );
}
