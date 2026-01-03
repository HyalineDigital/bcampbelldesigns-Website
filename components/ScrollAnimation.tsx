"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  amount?: number;
  duration?: number;
  once?: boolean;
}

const directionVariants = {
  up: { y: 50, opacity: 0 },
  down: { y: -50, opacity: 0 },
  left: { x: 50, opacity: 0 },
  right: { x: -50, opacity: 0 },
  fade: { opacity: 0 },
};

const directionAnimate = {
  up: { y: 0, opacity: 1 },
  down: { y: 0, opacity: 1 },
  left: { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
  fade: { opacity: 1 },
};

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
  amount = 0.2,
  duration = 0.6,
  once = true,
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={directionAnimate[direction]}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

