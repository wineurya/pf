/**
 * Case-study “Tools” row — raster/vector marks from UXWing (free commercial use).
 * @see https://uxwing.com/license/
 *
 * Bundle under `public/case-tool-icons/`. Download originals from UXWing (named on each file’s page).
 * FigJam → board icon; Lottie / motion → animation-motion icon (no official Lottie glyph on UXWing).
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

function resolveUxwingFile(label) {
  const t = normalizeToolLabel(label);
  if (t === "figma") return "figma.svg";
  if (t === "figjam") return "figjam-board.svg";
  if (t === "lottie") return "lottie-motion.svg";
  if (t === "after effects" || t === "adobe after effects") return "adobe-after-effects.svg";
  if (t === "illustrator" || t === "adobe illustrator") return "adobe-illustrator.svg";
  if (t === "motion design" || t === "premiere pro" || t === "adobe premiere pro") return "lottie-motion.svg";
  return null;
}

export function CaseStudyToolBrandIcon({ label, className }) {
  const file = resolveUxwingFile(label) ?? "fallback-wrench.svg";
  return (
    <img
      src={toolIconUrl(file)}
      width={24}
      height={24}
      alt=""
      className={className}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
