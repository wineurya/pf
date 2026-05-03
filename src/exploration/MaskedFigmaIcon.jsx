/**
 * Figma SVG as mask + `background` so fill tracks tokens (Figma files often ship fixed raster colors).
 */
/** Wordmark loader mask — extra stops read a bit more “prismatic” at small sizes (still token hues). */
export const WX_WORDMARK_MARK_GRADIENT = `linear-gradient(125deg, var(--wx-accent-violet) 0%, var(--wx-primary) 22%, var(--wx-accent-teal) 44%, var(--wx-accent-violet) 58%, var(--wx-accent-amber) 78%, var(--wx-primary) 92%, var(--wx-accent-violet) 100%)`;

export function MaskedFigmaIcon({ src, className, background = "var(--wx-primary)", style, ...rest }) {
  return (
    <div
      className={className}
      style={{
        background,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        ...style,
      }}
      aria-hidden
      {...rest}
    />
  );
}
