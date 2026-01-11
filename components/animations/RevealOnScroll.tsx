'use client';

import { motion, useInView, type HTMLMotionProps } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface RevealOnScrollProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
  margin?: string;
}

export function RevealOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  once = true,
  margin = '-100px',
  ...props
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: margin as any });

  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // "The ROI Flow"
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
