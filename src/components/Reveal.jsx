import { motion } from "motion/react";
import { revealEyebrow, revealItem, revealStagger } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../lib/hooks.js";

export function StaggerGroup({
  children,
  className,
  as = "div",
  ready = true,
  animate = true,
  ref,
  ...rest
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      variants={revealStagger(reducedMotion)}
      initial="hidden"
      animate={ready && animate ? "visible" : "hidden"}
      exit="exit"
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealEyebrow({
  children,
  className,
  as = "p",
  ref,
  ...rest
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as] ?? motion.p;

  return (
    <Component
      ref={ref}
      className={className}
      variants={revealEyebrow(reducedMotion)}
      style={{ transformOrigin: "center center" }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  ref,
  ...rest
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      variants={revealItem(reducedMotion)}
      style={{ transformOrigin: "center center" }}
      {...rest}
    >
      {children}
    </Component>
  );
}
