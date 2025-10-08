'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeRippleProps {
  isActive: boolean;
  position: { x: number; y: number };
}

export default function ThemeRipple({ isActive, position }: ThemeRippleProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed pointer-events-none z-[100]"
          style={{
            left: position.x,
            top: position.y,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          <div
            className="w-screen h-screen rounded-full"
            style={{
              background: 'radial-gradient(circle, var(--bg-main) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

