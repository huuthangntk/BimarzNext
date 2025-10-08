'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation } from '@/lib/translations';

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

export default function PageIndicator({ currentPage, totalPages, onPageClick }: PageIndicatorProps) {
  const { language } = useTheme();

  const getPageName = (page: number): string => {
    return getTranslation(`pageNames.page${page}`, language);
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const pageName = getPageName(page);
        return (
          <button
            key={page}
            onClick={() => onPageClick(page)}
            className="relative group"
            aria-label={`Go to ${pageName}`}
          >
            <motion.div
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                currentPage === page
                  ? 'bg-[var(--color-primary)]'
                  : 'bg-[var(--text-tertiary)] opacity-50 hover:opacity-100'
              }`}
              animate={{
                height: currentPage === page ? 32 : 20,
              }}
            />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {pageName}
            </span>
          </button>
        );
      })}
    </div>
  );
}

