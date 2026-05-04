/**
 * Figma SVG as mask + `background` so fill tracks tokens (Figma files often ship fixed raster colors).
 */
/** Clean 3-stop gradient. */
export const WX_WORDMARK_MARK_GRADIENT = `linear-gradient(135deg, var(--wx-primary) 0%, var(--wx-accent-violet) 50%, var(--wx-accent-amber) 100%)`;

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
