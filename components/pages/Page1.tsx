'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation, getTranslationArray } from '@/lib/translations';

// Helper function to check if two rectangles overlap
function doRectsOverlap(
  x1: number, y1: number, width1: number, height1: number,
  x2: number, y2: number, width2: number, height2: number,
  padding: number = 5
): boolean {
  return !(
    x1 + width1 + padding < x2 ||
    x2 + width2 + padding < x1 ||
    y1 + height1 + padding < y2 ||
    y2 + height2 + padding < y1
  );
}

interface Page1Props {
  isActive?: boolean;
  onScrollToPage7?: () => void;
}

export default function Page1({ isActive = true, onScrollToPage7 }: Page1Props) {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const { theme, language } = useTheme();
  
  const heroText = getTranslation('page1.hero', language);
  const supportingWords = getTranslationArray('page1.threats', language);
  const ctaButtonText = getTranslation('page1.ctaButton', language);

  // Optimized glitch effect - only runs when page is active, reduced frequency
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
      });
    }, 200); // Reduced from 100ms to 200ms for better performance

    return () => clearInterval(interval);
  }, [isActive]);

  // Generate stable random positions with collision detection
  const wordPositions = useMemo(() => {
    const positions: Array<{ x: number; y: number; rotation: number; width: number; height: number }> = [];
    
    const estimateWordDimensions = (word: string, isMobile: boolean) => {
      const charWidth = isMobile ? 1.5 : 2.5;
      const height = isMobile ? 8 : 10;
      return { width: word.length * charWidth, height: height };
    };

    supportingWords.forEach((word) => {
      const dims = estimateWordDimensions(word, false);
      
      const isInExclusionZone = (x: number, y: number) => {
        const centerX = 50;
        const centerY = 50;
        const exclusionRadius = 35;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        return distance < exclusionRadius;
      };

      const hasCollision = (x: number, y: number) => {
        for (const pos of positions) {
          if (doRectsOverlap(
            x - dims.width / 2, y - dims.height / 2, dims.width, dims.height,
            pos.x - pos.width / 2, pos.y - pos.height / 2, pos.width, pos.height,
            3
          )) {
            return true;
          }
        }
        return false;
      };

      let randomX, randomY;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        randomX = Math.random() * 60 + 20;
        randomY = Math.random() * 60 + 20;
        attempts++;
        
        if (attempts > 50) {
          randomX = Math.random() * 80 + 10;
          randomY = Math.random() * 80 + 10;
        }
      } while (
        (isInExclusionZone(randomX, randomY) || hasCollision(randomX, randomY)) 
        && attempts < maxAttempts
      );

      positions.push({
        x: randomX,
        y: randomY,
        rotation: Math.random() * 20 - 10,
        width: dims.width,
        height: dims.height,
      });
    });
    
    return positions;
  }, [supportingWords.length]);

  // Theme-aware colors
  const isDark = theme === 'dark';
  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-red-950 via-gray-900 to-black'
    : 'bg-gradient-to-br from-red-100 via-gray-200 to-red-50';
  
  const heroTextColor = isDark ? '#FFFFFF' : '#1F2937';
  const heroFlashColor = isDark ? '#EF4444' : '#DC2626';
  const supportingWordColor = isDark ? 'text-red-500' : 'text-red-700';
  const vignetteColor = isDark 
    ? 'rgba(239, 68, 68, 0.3)' 
    : 'rgba(220, 38, 38, 0.2)';
  const streakColor = isDark ? 'bg-red-500' : 'bg-red-600';

  return (
    <div className={`relative w-full h-full overflow-hidden ${bgGradient}`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Pulsing red vignettes */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 20% 30%, ${vignetteColor} 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 70%, ${vignetteColor} 0%, transparent 50%)`,
              `radial-gradient(circle at 50% 50%, ${vignetteColor} 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Diagonal streaks */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-[2px] w-full ${streakColor} opacity-30`}
            style={{
              top: `${i * 20}%`,
              transform: `rotate(-45deg)`,
            }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Viewport shake effect */}
        <motion.div
          className={isDark ? 'absolute inset-0 bg-black/10' : 'absolute inset-0 bg-gray-900/5'}
          animate={{
            x: [0, -2, 2, -2, 0],
            y: [0, 2, -2, 2, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-5 lg:px-20">
        <div className="text-center flex flex-col items-center">
          {/* Hero Text with Glitch */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-[96px] font-bold mb-8 md:mb-12"
            style={{
              color: heroTextColor,
              textShadow: isDark
                ? `
                  ${glitchOffset.x}px ${glitchOffset.y}px 0 rgba(239, 68, 68, 0.8),
                  ${-glitchOffset.x}px ${-glitchOffset.y}px 0 rgba(59, 130, 246, 0.8)
                `
                : `
                  ${glitchOffset.x}px ${glitchOffset.y}px 0 rgba(220, 38, 38, 0.6),
                  ${-glitchOffset.x}px ${-glitchOffset.y}px 0 rgba(37, 99, 235, 0.6)
                `,
              transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
            }}
            animate={{
              color: [heroTextColor, heroFlashColor, heroTextColor],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {heroText}
          </motion.h1>

          {/* CTA Button with Powerful Glow */}
          <motion.button
            onClick={onScrollToPage7}
            className={`
              relative z-20 px-8 py-4 md:px-10 md:py-5 
              text-xl md:text-2xl lg:text-3xl font-bold 
              text-white rounded-full 
              transition-all duration-300
              ${isDark 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 cta-glow-dark' 
                : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 cta-glow-light'
              }
              hover:scale-105 active:scale-95
              cursor-pointer select-none
              flex items-center justify-center gap-3
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Gift Box Icon */}
            <svg 
              className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" 
              />
            </svg>
            <span>{ctaButtonText}</span>
          </motion.button>

          {/* Desktop Supporting Words - MORE FREQUENT + STRONGER GLITCH */}
          <div className="hidden md:block">
            {supportingWords.map((word, index) => {
              const pos = wordPositions[index];
              
              return (
                <motion.div
                  key={`desktop-${word}-${index}`}
                  className={`absolute text-4xl font-bold ${supportingWordColor} pointer-events-none`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    rotate: pos.rotation - 45,
                    x: -30,
                    y: -30,
                  }}
                  animate={{
                    // STRONGER GLITCH ANIMATIONS with more keyframes
                    opacity: [0, 0.2, 0, 0.4, 1, 1, 1, 0.6, 0.2, 0],
                    scale: [0.3, 0.5, 0.7, 0.9, 1.15, 1, 1, 0.85, 0.5, 0.3],
                    rotate: [
                      pos.rotation - 45,
                      pos.rotation + 20,
                      pos.rotation - 15,
                      pos.rotation + 8,
                      pos.rotation - 5,
                      pos.rotation,
                      pos.rotation,
                      pos.rotation + 10,
                      pos.rotation - 25,
                      pos.rotation - 50,
                    ],
                    x: [-30, 20, -15, 10, -5, 0, 0, 8, 15, 30],
                    y: [-30, -20, 15, -10, 5, 0, 0, -5, 12, 30],
                    filter: isDark
                      ? [
                          'blur(15px) brightness(0.2) contrast(1.5)',
                          'blur(10px) brightness(0.5) contrast(1.8)',
                          'blur(12px) brightness(0.3) contrast(1.6)',
                          'blur(6px) brightness(0.9) contrast(1.4)',
                          'blur(2px) brightness(1.3) drop-shadow(0 0 25px rgba(239, 68, 68, 1)) contrast(1.2)',
                          'blur(0px) brightness(1.4) drop-shadow(0 0 35px rgba(239, 68, 68, 1)) drop-shadow(0 0 50px rgba(239, 68, 68, 0.9))',
                          'blur(0px) brightness(1.4) drop-shadow(0 0 35px rgba(239, 68, 68, 1)) drop-shadow(0 0 50px rgba(239, 68, 68, 0.9))',
                          'blur(4px) brightness(1.1) drop-shadow(0 0 20px rgba(239, 68, 68, 0.8)) contrast(1.3)',
                          'blur(10px) brightness(0.6) contrast(1.5)',
                          'blur(15px) brightness(0.2) contrast(1.6)',
                        ]
                      : [
                          'blur(15px) brightness(0.3) contrast(1.5)',
                          'blur(10px) brightness(0.6) contrast(1.7)',
                          'blur(12px) brightness(0.4) contrast(1.6)',
                          'blur(6px) brightness(1.0) contrast(1.3)',
                          'blur(2px) brightness(1.3) drop-shadow(0 0 22px rgba(220, 38, 38, 1)) contrast(1.2)',
                          'blur(0px) brightness(1.4) drop-shadow(0 0 30px rgba(220, 38, 38, 1)) drop-shadow(0 0 45px rgba(220, 38, 38, 0.9))',
                          'blur(0px) brightness(1.4) drop-shadow(0 0 30px rgba(220, 38, 38, 1)) drop-shadow(0 0 45px rgba(220, 38, 38, 0.9))',
                          'blur(4px) brightness(1.1) drop-shadow(0 0 18px rgba(220, 38, 38, 0.8)) contrast(1.3)',
                          'blur(10px) brightness(0.7) contrast(1.5)',
                          'blur(15px) brightness(0.3) contrast(1.6)',
                        ],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: index * 0.6, // REDUCED from 1s - MORE FREQUENT!
                    repeat: Infinity,
                    repeatDelay: 1.5, // REDUCED from 3s - MUCH MORE FREQUENT!
                    ease: [0.45, 0.05, 0.55, 0.95], // Aggressive glitch easing
                    times: [0, 0.1, 0.15, 0.25, 0.35, 0.5, 0.65, 0.8, 0.9, 1],
                  }}
                >
                  {word}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Supporting Words - MORE FREQUENT + STRONGER GLITCH */}
          <div className="md:hidden">
            {supportingWords.map((word, index) => {
              const pos = wordPositions[index];
              
              return (
                <motion.div
                  key={`mobile-${word}-${index}`}
                  className={`absolute text-2xl font-bold ${supportingWordColor} pointer-events-none`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                    zIndex: 5,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    rotate: pos.rotation - 45,
                    x: -25,
                    y: -25,
                  }}
                  animate={{
                    // EXTREME GLITCH with flickering and displacement
                    opacity: [
                      0, 0.3, 0, 0.5, 0.2, 1, 1, 1, 0.7, 0.3, 0.1, 0
                    ],
                    scale: [
                      0.3, 0.6, 0.4, 0.8, 0.9, 1.12, 1, 1, 0.9, 0.6, 0.4, 0.3
                    ],
                    rotate: [
                      pos.rotation - 45,
                      pos.rotation + 25,
                      pos.rotation - 20,
                      pos.rotation + 12,
                      pos.rotation - 8,
                      pos.rotation + 3,
                      pos.rotation,
                      pos.rotation,
                      pos.rotation + 8,
                      pos.rotation - 18,
                      pos.rotation - 30,
                      pos.rotation - 50,
                    ],
                    x: [-25, 18, -12, 15, -8, 5, 0, 0, -6, 10, 18, 25],
                    y: [-25, -15, 12, -8, 10, -4, 0, 0, 6, -10, 15, 25],
                    filter: isDark
                      ? [
                          'blur(18px) brightness(0.2) contrast(1.6)',
                          'blur(12px) brightness(0.5) contrast(1.9)',
                          'blur(15px) brightness(0.3) contrast(1.7)',
                          'blur(8px) brightness(0.8) contrast(1.5)',
                          'blur(4px) brightness(1.1) drop-shadow(0 0 15px rgba(239, 68, 68, 0.8)) contrast(1.3)',
                          'blur(1px) brightness(1.3) drop-shadow(0 0 25px rgba(239, 68, 68, 1)) contrast(1.2)',
                          'blur(0px) brightness(1.45) drop-shadow(0 0 30px rgba(239, 68, 68, 1)) drop-shadow(0 0 50px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 70px rgba(239, 68, 68, 0.7))',
                          'blur(0px) brightness(1.45) drop-shadow(0 0 30px rgba(239, 68, 68, 1)) drop-shadow(0 0 50px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 70px rgba(239, 68, 68, 0.7))',
                          'blur(3px) brightness(1.2) drop-shadow(0 0 20px rgba(239, 68, 68, 0.9)) contrast(1.3)',
                          'blur(8px) brightness(0.7) contrast(1.5)',
                          'blur(12px) brightness(0.4) contrast(1.7)',
                          'blur(18px) brightness(0.2) contrast(1.8)',
                        ]
                      : [
                          'blur(18px) brightness(0.3) contrast(1.6)',
                          'blur(12px) brightness(0.6) contrast(1.8)',
                          'blur(15px) brightness(0.4) contrast(1.7)',
                          'blur(8px) brightness(0.9) contrast(1.4)',
                          'blur(4px) brightness(1.1) drop-shadow(0 0 12px rgba(220, 38, 38, 0.8)) contrast(1.3)',
                          'blur(1px) brightness(1.3) drop-shadow(0 0 22px rgba(220, 38, 38, 1)) contrast(1.2)',
                          'blur(0px) brightness(1.45) drop-shadow(0 0 28px rgba(220, 38, 38, 1)) drop-shadow(0 0 45px rgba(220, 38, 38, 0.9)) drop-shadow(0 0 65px rgba(220, 38, 38, 0.7))',
                          'blur(0px) brightness(1.45) drop-shadow(0 0 28px rgba(220, 38, 38, 1)) drop-shadow(0 0 45px rgba(220, 38, 38, 0.9)) drop-shadow(0 0 65px rgba(220, 38, 38, 0.7))',
                          'blur(3px) brightness(1.2) drop-shadow(0 0 18px rgba(220, 38, 38, 0.9)) contrast(1.3)',
                          'blur(8px) brightness(0.7) contrast(1.5)',
                          'blur(12px) brightness(0.4) contrast(1.7)',
                          'blur(18px) brightness(0.3) contrast(1.8)',
                        ],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5, // REDUCED from 1.2s - MORE FREQUENT!
                    repeat: Infinity,
                    repeatDelay: 1, // REDUCED from 4s - MUCH MORE FREQUENT!
                    ease: [0.45, 0.05, 0.55, 0.95], // Aggressive glitch easing
                    times: [
                      0, 0.08, 0.12, 0.2, 0.28, 0.36, 0.5, 0.64, 0.75, 0.85, 0.93, 1
                    ],
                  }}
                >
                  {word}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}