import { motion } from "motion/react";
import { clsx } from "clsx";

function stackLogoUrl(tool) {
  if (tool.logoUrl) return tool.logoUrl;
  if (tool.brandSlug) return `https://cdn.simpleicons.org/${tool.brandSlug}`;
  return null;
}

/**
 * Compact stack preview for the Approach “Prototype” step — matches aside marquee tool shape
 * ({@link SITE_APPROACH_PROTOTYPE_STACK} from `siteContent.js`).
 */
export function ApproachStepTechStackVisual({ tools, reduceMotion = false, className }) {
  const motionChip = (index) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 6 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: {
      duration: reduceMotion ? 0 : 0.32,
      delay: reduceMotion ? 0 : 0.04 + index * 0.045,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <div className={clsx("wx-approach-tech-stack-visual", className)} aria-hidden>
      <div className="wx-approach-tech-stack-visual__chrome">
        <div className="wx-approach-tech-stack-visual__head">
          <span className="wx-text-meta wx-approach-tech-stack-visual__head-kicker">Stack</span>
          <span className="wx-text-meta text-[var(--wx-muted)]">Prototype lane</span>
        </div>
        <ul className="wx-approach-tech-stack-visual__list">
          {tools.map((tool, index) => {
            const src = stackLogoUrl(tool);
            return (
              <motion.li key={`${tool.label}-${index}`} className="wx-approach-tech-stack-visual__item" {...motionChip(index)}>
                <span className="wx-approach-tech-stack-visual__chip">
                  {src ? (
                    <img
                      src={src}
                      alt=""
                      className="wx-approach-tech-stack-visual__logo"
                      draggable={false}
                      width={18}
                      height={18}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <span className="wx-approach-tech-stack-visual__label">{tool.label}</span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
