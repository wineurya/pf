import { MotionConfig } from "motion/react";

const easing = [0.3, 0, 0, 1];

export function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.4, ease: easing }}>
      {children}
    </MotionConfig>
  );
}
