'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation } from '@/lib/translations';

interface ScrollIndicatorProps {
  currentPage: number;
}

export default function ScrollIndicator({ currentPage }: ScrollIndicatorProps) {
  const { language } = useTheme();
  
  // Hide on page 7 (last page)
  if (currentPage === 7) return null;

  const scrollText = getTranslation('scroll.scroll', language);
  const swipeText = getTranslation('scroll.swipe', language);

  return (
    <AnimatePresence>
      {/* Desktop - Mouse Icon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="hidden md:block fixed bottom-24 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center gap-2"
        >
          {/* Mouse Icon */}
          <div className="relative w-7 h-11 rounded-full border-2 border-[var(--text-tertiary)] flex items-start justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)]"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <span className="text-xs text-[var(--text-tertiary)]">{scrollText}</span>
        </motion.div>
      </motion.div>

      {/* Mobile - Hand Swipe Icon (Better Tabler Icon) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="md:hidden fixed bottom-20 left-1/2 z-40"
        style={{ transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center gap-2"
        >
          {/* Hand Move Icon with Swipe Arrow (Tabler Icons) */}
          <div className="relative">
            <svg
              className="w-10 h-10 text-[var(--text-tertiary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Hand shape */}
              <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
              <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
              <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
              <path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
            </svg>
            {/* Animated upward arrow */}
            <motion.svg
              className="w-6 h-6 text-[var(--text-tertiary)] absolute -top-2 left-1/2"
              style={{ transform: 'translateX(-50%)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                y: [-8, -4, -8],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </motion.svg>
          </div>
          <span className="text-xs text-[var(--text-tertiary)] text-center">{swipeText}</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

