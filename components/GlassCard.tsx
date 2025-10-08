'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function GlassCard({ children, className = '', animate = true }: GlassCardProps) {
  const Component = animate ? motion.div : 'div';
  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <Component
      className={`glass rounded-2xl ${className}`}
      {...animationProps}
    >
      {children}
    </Component>
  );
}

