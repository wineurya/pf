/**
 * Case-study "Tools" row — vendor logomarks. Local SVGs in
 * `public/case-tool-icons/` and `public/stack-logos/` first; otherwise the
 * Simple Icons CDN fills in (matches the home stack marquee resolver).
 */
function localToolIconUrl(file) {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith("/") ? base : `${base}/`;
  return `${root}case-tool-icons/${file}`;
}

function rootStaticUrl(file) {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith("/") ? base : `${base}/`;
  return `${root}${file.replace(/^\//, "")}`;
}

function simpleIconUrl(slug, color) {
  const c = color ? `/${color.replace(/^#/, "")}` : "";
  return `https://cdn.simpleicons.org/${slug}${c}`;
}

function normalizeToolLabel(label) {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/**
 * Local-first map. `file` keys point at `case-tool-icons/<file>`; `path` keys
 * point at any other static path under `public/`.
 */
const LOCAL_TOOL_ICONS = {
  figma: { file: "figma.svg" },
  figjam: { file: "figjam.svg" },
  lottie: { file: "lottiefiles-mark.svg" },
  lottiefiles: { file: "lottiefiles-mark.svg" },
  "lottie motion": { file: "lottiefiles-mark.svg" },
  "lottie + motion": { file: "lottiefiles-mark.svg" },
  "after effects": { file: "adobe-after-effects.svg" },
  "adobe after effects": { file: "adobe-after-effects.svg" },
  illustrator: { file: "adobe-illustrator.svg" },
  "adobe illustrator": { file: "adobe-illustrator.svg" },
  "motion design": { file: "adobe-premiere-pro.svg" },
  "premiere pro": { file: "adobe-premiere-pro.svg" },
  "adobe premiere pro": { file: "adobe-premiere-pro.svg" },
  claude: { path: "/stack-logos/claude.svg" },
};

/**
 * Falls through to Simple Icons CDN for tools without a local mark — matches
 * `SITE_STACK_MARQUEE_LAYERS` so the visual language stays consistent.
 */
const CDN_TOOL_ICONS = {
  firebase: { slug: "firebase", color: "ffca28" },
  cursor: { slug: "cursor", color: "000000" },
  react: { slug: "react", color: "61dafb" },
  "next.js": { slug: "nextdotjs", color: "000000" },
  tailwind: { slug: "tailwindcss", color: "06b6d4" },
  "tailwind css": { slug: "tailwindcss", color: "06b6d4" },
  typescript: { slug: "typescript", color: "3178c6" },
  vite: { slug: "vite", color: "646cff" },
  supabase: { slug: "supabase", color: "3ecf8e" },
  framer: { slug: "framer", color: "0055ff" },
  github: { slug: "github", color: "181717" },
  "vs code": { slug: "visualstudiocode", color: "007acc" },
  blender: { slug: "blender", color: "e87d0d" },
  rive: { slug: "rive", color: "ff4d4d" },
  storybook: { slug: "storybook", color: "ff4785" },
  postgresql: { slug: "postgresql", color: "4169e1" },
};

function resolveToolIconSrc(label) {
  const t = normalizeToolLabel(label);
  const local = LOCAL_TOOL_ICONS[t];
  if (local) {
    if (local.file) return localToolIconUrl(local.file);
    if (local.path) return rootStaticUrl(local.path);
  }
  const cdn = CDN_TOOL_ICONS[t];
  if (cdn) return simpleIconUrl(cdn.slug, cdn.color);
  return localToolIconUrl("fallback-wrench.svg");
}

export function CaseStudyToolBrandIcon({ label, className }) {
  return (
    <img
      src={resolveToolIconSrc(label)}
      alt=""
      className={className}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
