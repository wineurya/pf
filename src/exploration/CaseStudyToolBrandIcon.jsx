/**
 * Case-study “Tools” row — product logomarks in `public/case-tool-icons/`.
 * Figma / Adobe / LottieFiles marks from vendor artwork; FigJam tile uses Figma-ecosystem styling.
 */
function toolIconUrl(file) {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith("/") ? base : `${base}/`;
  return `${root}case-tool-icons/${file}`;
}

function normalizeToolLabel(label) {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function resolveToolIconFile(label) {
  const t = normalizeToolLabel(label);
  if (t === "figma") return "figma.svg";
  if (t === "figjam") return "figjam.svg";
  if (t === "lottie" || t === "lottiefiles") return "lottiefiles-mark.svg";
  if (t === "lottie motion" || t === "lottie + motion") return "lottie-motion.svg";
  if (t === "after effects" || t === "adobe after effects") return "adobe-after-effects.svg";
  if (t === "illustrator" || t === "adobe illustrator") return "adobe-illustrator.svg";
  if (t === "motion design" || t === "premiere pro" || t === "adobe premiere pro") {
    return "adobe-premiere-pro.svg";
  }
  return null;
}

export function CaseStudyToolBrandIcon({ label, className }) {
  const file = resolveToolIconFile(label) ?? "fallback-wrench.svg";
  return (
    <img
      src={toolIconUrl(file)}
      alt=""
      className={className}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
