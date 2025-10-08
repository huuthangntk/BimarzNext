'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation, getTranslationArray } from '@/lib/translations';

// Helper function to check if two rectangles overlap
function doRectsOverlap(
  x1: number, y1: number, width1: number, height1: number,
  x2: number, y2: number, width2: number, height2: number,
  padding: number = 8
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
  resetTrigger?: number;
}

export default function Page1({ isActive = true, onScrollToPage7, resetTrigger = 0 }: Page1Props) {
  const [animateReset, setAnimateReset] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, language } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const heroText = getTranslation('page1.hero', language);
  const supportingWords = getTranslationArray('page1.threats', language);
  const ctaButtonText = getTranslation('page1.ctaButton', language);

  // Mount detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle reset animation trigger
  useEffect(() => {
    if (resetTrigger > 0) {
      setAnimateReset(true);
      const timer = setTimeout(() => {
        setAnimateReset(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [resetTrigger]);

  // Generate stable random positions with better collision detection
  const wordPositions = useMemo(() => {
    const positions: Array<{ x: number; y: number; rotation: number; width: number; height: number }> = [];
    
    const estimateWordDimensions = (word: string, isMobile: boolean) => {
      const charWidth = isMobile ? 2 : 3;
      const height = isMobile ? 10 : 12;
      return { width: word.length * charWidth, height: height };
    };

    supportingWords.forEach((word) => {
      const dims = estimateWordDimensions(word, false);
      
      // Exclusion zone around center (for hero text and CTA button)
      const isInExclusionZone = (x: number, y: number) => {
        const centerX = 50;
        const centerY = 50;
        const exclusionRadius = 38; // Increased for better spacing
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        return distance < exclusionRadius;
      };

      const hasCollision = (x: number, y: number) => {
        for (const pos of positions) {
          if (doRectsOverlap(
            x - dims.width / 2, y - dims.height / 2, dims.width, dims.height,
            pos.x - pos.width / 2, pos.y - pos.height / 2, pos.width, pos.height,
            8 // Increased padding
          )) {
            return true;
          }
        }
        return false;
      };

      let randomX, randomY;
      let attempts = 0;
      const maxAttempts = 150;
      
      do {
        randomX = Math.random() * 60 + 20;
        randomY = Math.random() * 60 + 20;
        attempts++;
        
        if (attempts > 70) {
          // Expand search area
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

  // Floating danger particles (symbols)
  const dangerParticles = useMemo(() => {
    const symbols = ['⚠', '⚡', '⚠', '⚡', '⚠', '⚡', '👁', '🔒', '⚠', '⚡'];
    return symbols.map((symbol, i) => ({
      symbol,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.8,
      duration: 8 + Math.random() * 4,
    }));
  }, []);

  // Theme-aware colors
  const isDark = theme === 'dark';
  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-red-950 via-gray-900 to-black'
    : 'bg-gradient-to-br from-red-100 via-gray-200 to-red-50';
  
  const heroTextColor = isDark ? '#FFFFFF' : '#1F2937';
  const heroGlitchColor1 = isDark ? '#FF0055' : '#DC2626'; // Red channel
  const heroGlitchColor2 = isDark ? '#00FFFF' : '#0EA5E9'; // Cyan channel
  const supportingWordColor = isDark ? 'text-red-500' : 'text-red-700';
  const vignetteColor = isDark 
    ? 'rgba(239, 68, 68, 0.3)' 
    : 'rgba(220, 38, 38, 0.2)';
  const streakColor = isDark ? 'bg-red-500' : 'bg-red-600';
  const scanlineColor = isDark ? 'rgba(0, 255, 255, 0.03)' : 'rgba(220, 38, 38, 0.03)';

  return (
    <motion.div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${bgGradient}`}
      style={{
        willChange: 'transform, opacity',
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        scale: animateReset ? 0.98 : 1,
        y: animateReset ? -10 : 0,
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        opacity: { duration: 0.3 },
        scale: { duration: 0.15, ease: 'easeOut' },
        y: { duration: 0.15, ease: 'easeOut' },
      }}
    >
      {/* =========================== */}
      {/* BACKGROUND EFFECTS LAYER */}
      {/* =========================== */}
      <div className="absolute inset-0">
        {/* Pulsing red vignettes */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ willChange: 'transform' }}
          animate={{
            background: [
              `radial-gradient(circle at 20% 30%, ${vignetteColor} 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 70%, ${vignetteColor} 0%, transparent 50%)`,
              `radial-gradient(circle at 50% 50%, ${vignetteColor} 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Diagonal danger streaks */}
        {!shouldReduceMotion && [...Array(5)].map((_, i) => (
          <motion.div
            key={`streak-${i}`}
            className={`absolute h-[2px] w-full ${streakColor} opacity-30 pointer-events-none`}
            style={{
              top: `${i * 20}%`,
              transform: `rotate(-45deg)`,
              willChange: 'transform, opacity',
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

        {/* CRT Scanlines Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              ${scanlineColor} 0px,
              transparent 1px,
              transparent 2px,
              ${scanlineColor} 3px
            )`,
            animation: shouldReduceMotion ? 'none' : 'scanlines 8s linear infinite',
          }}
        />

        {/* Digital Noise Texture */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: isDark
                ? 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.3\'/%3E%3C/svg%3E")'
                : 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.2\'/%3E%3C/svg%3E")',
              backgroundSize: '256px 256px',
              willChange: 'transform',
            }}
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Floating Danger Particles */}
        {!shouldReduceMotion && mounted && dangerParticles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute text-2xl md:text-3xl pointer-events-none select-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0.6, 0.3, 0],
              scale: [0.5, 1, 1.2, 1, 0.5],
              y: [0, -30, -60, -90, -120],
              x: [0, Math.sin(i) * 20, Math.sin(i + 1) * 20, Math.sin(i + 2) * 20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className={isDark ? 'text-red-500/40' : 'text-red-600/30'}>
              {particle.symbol}
            </span>
          </motion.div>
        ))}
      </div>

      {/* =========================== */}
      {/* CONTENT LAYER */}
      {/* =========================== */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 sm:px-8 md:px-12 lg:px-20">
        <div className="text-center flex flex-col items-center w-full max-w-7xl">
          {/* Hero Text with Advanced RGB Split Glitch */}
          <div className="relative mb-10 md:mb-16">
            <motion.h1
              data-text={heroText}
              className="hero-glitch-text relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-bold select-none"
              style={{
                color: heroTextColor,
                willChange: 'transform, filter',
              }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {heroText}
              
              {/* RGB Split Layers using pseudo-element technique */}
              {!shouldReduceMotion && (
                <>
                  {/* Red Channel */}
                  <motion.span
                    className="absolute inset-0 pointer-events-none select-none"
                    style={{
                      color: heroGlitchColor1,
                      mixBlendMode: isDark ? 'screen' : 'multiply',
                      willChange: 'transform',
                    }}
                    animate={{
                      x: [-2, 2, -1, 3, -2, 1, -2],
                      y: [1, -1, 2, -2, 1, -1, 1],
                      opacity: [0.7, 0.9, 0.6, 0.8, 0.7, 0.85, 0.7],
                    }}
                    transition={{
                      duration: 0.15,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: 'easeInOut',
                    }}
                  >
                    {heroText}
                  </motion.span>

                  {/* Cyan Channel */}
                  <motion.span
                    className="absolute inset-0 pointer-events-none select-none"
                    style={{
                      color: heroGlitchColor2,
                      mixBlendMode: isDark ? 'screen' : 'multiply',
                      willChange: 'transform',
                    }}
                    animate={{
                      x: [2, -2, 1, -3, 2, -1, 2],
                      y: [-1, 1, -2, 2, -1, 1, -1],
                      opacity: [0.7, 0.85, 0.6, 0.8, 0.7, 0.9, 0.7],
                    }}
                    transition={{
                      duration: 0.15,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: 'easeInOut',
                      delay: 0.05,
                    }}
                  >
                    {heroText}
                  </motion.span>
                </>
              )}
            </motion.h1>
          </div>

          {/* CTA Button with Enhanced Glow */}
          <motion.button
            onClick={onScrollToPage7}
            className={`
              relative z-30 px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6
              text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold 
              text-white rounded-full 
              transition-all duration-300
              ${isDark 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 shadow-[0_0_30px_rgba(16,185,129,0.5),0_0_60px_rgba(16,185,129,0.3),0_0_90px_rgba(16,185,129,0.1)]' 
                : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-[0_0_25px_rgba(5,150,105,0.4),0_0_50px_rgba(5,150,105,0.2)]'
              }
              hover:shadow-[0_0_40px_rgba(16,185,129,0.7),0_0_80px_rgba(16,185,129,0.4)]
              hover:scale-105 active:scale-95
              cursor-pointer select-none
              flex items-center justify-center gap-3
            `}
            style={{
              willChange: 'transform',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Gift Box Icon */}
            <svg 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" 
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

          {/* Desktop Supporting Words - Enhanced with Clip-path Tearing */}
          <div className="hidden md:block">
            {supportingWords.map((word, index) => {
              const pos = wordPositions[index];
              
              return (
                <motion.div
                  key={`desktop-${word}-${index}`}
                  className={`absolute text-3xl lg:text-4xl xl:text-5xl font-bold ${supportingWordColor} pointer-events-none select-none`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                    willChange: 'transform, opacity, filter',
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    rotate: pos.rotation - 50,
                    x: -40,
                    y: -40,
                  }}
                  animate={shouldReduceMotion ? {
                    opacity: 0.6,
                    scale: 1,
                    rotate: pos.rotation,
                    x: 0,
                    y: 0,
                  } : {
                    opacity: [0, 0.15, 0, 0.3, 0.8, 1, 1, 0.7, 0.3, 0],
                    scale: [0.3, 0.5, 0.7, 0.9, 1.15, 1, 1, 0.85, 0.5, 0.3],
                    rotate: [
                      pos.rotation - 50,
                      pos.rotation + 25,
                      pos.rotation - 20,
                      pos.rotation + 10,
                      pos.rotation - 5,
                      pos.rotation,
                      pos.rotation,
                      pos.rotation + 12,
                      pos.rotation - 28,
                      pos.rotation - 55,
                    ],
                    x: [-40, 25, -20, 12, -6, 0, 0, 10, 20, 40],
                    y: [-40, -25, 18, -12, 6, 0, 0, -7, 15, 40],
                    filter: isDark
                      ? [
                          'blur(18px) brightness(0.2) contrast(1.6)',
                          'blur(12px) brightness(0.5) contrast(1.9)',
                          'blur(14px) brightness(0.3) contrast(1.7)',
                          'blur(7px) brightness(0.9) contrast(1.5)',
                          'blur(2px) brightness(1.3) drop-shadow(0 0 30px rgba(239, 68, 68, 1)) contrast(1.2)',
                          'blur(0px) brightness(1.5) drop-shadow(0 0 40px rgba(239, 68, 68, 1)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.9))',
                          'blur(0px) brightness(1.5) drop-shadow(0 0 40px rgba(239, 68, 68, 1)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.9))',
                          'blur(5px) brightness(1.1) drop-shadow(0 0 25px rgba(239, 68, 68, 0.8)) contrast(1.3)',
                          'blur(12px) brightness(0.6) contrast(1.6)',
                          'blur(18px) brightness(0.2) contrast(1.7)',
                        ]
                      : [
                          'blur(18px) brightness(0.3) contrast(1.6)',
                          'blur(12px) brightness(0.6) contrast(1.8)',
                          'blur(14px) brightness(0.4) contrast(1.7)',
                          'blur(7px) brightness(1.0) contrast(1.4)',
                          'blur(2px) brightness(1.3) drop-shadow(0 0 26px rgba(220, 38, 38, 1)) contrast(1.2)',
                          'blur(0px) brightness(1.5) drop-shadow(0 0 35px rgba(220, 38, 38, 1)) drop-shadow(0 0 55px rgba(220, 38, 38, 0.9))',
                          'blur(0px) brightness(1.5) drop-shadow(0 0 35px rgba(220, 38, 38, 1)) drop-shadow(0 0 55px rgba(220, 38, 38, 0.9))',
                          'blur(5px) brightness(1.1) drop-shadow(0 0 22px rgba(220, 38, 38, 0.8)) contrast(1.3)',
                          'blur(12px) brightness(0.7) contrast(1.6)',
                          'blur(18px) brightness(0.3) contrast(1.7)',
                        ],
                  }}
                  transition={{
                    duration: 2.8,
                    delay: index * 0.5,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: [0.45, 0.05, 0.55, 0.95],
                    times: [0, 0.1, 0.15, 0.25, 0.35, 0.5, 0.65, 0.8, 0.9, 1],
                  }}
                >
                  {word}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Supporting Words - Optimized */}
          <div className="md:hidden">
            {supportingWords.map((word, index) => {
              const pos = wordPositions[index];
              
              return (
                <motion.div
                  key={`mobile-${word}-${index}`}
                  className={`absolute text-xl sm:text-2xl font-bold ${supportingWordColor} pointer-events-none select-none`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                    zIndex: 5,
                    willChange: 'transform, opacity, filter',
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    rotate: pos.rotation - 50,
                    x: -30,
                    y: -30,
                  }}
                  animate={shouldReduceMotion ? {
                    opacity: 0.6,
                    scale: 1,
                    rotate: pos.rotation,
                    x: 0,
                    y: 0,
                  } : {
                    opacity: [0, 0.2, 0, 0.4, 0.15, 0.9, 1, 1, 0.8, 0.4, 0.1, 0],
                    scale: [0.3, 0.6, 0.4, 0.8, 0.9, 1.1, 1, 1, 0.9, 0.6, 0.4, 0.3],
                    rotate: [
                      pos.rotation - 50,
                      pos.rotation + 28,
                      pos.rotation - 22,
                      pos.rotation + 14,
                      pos.rotation - 9,
                      pos.rotation + 4,
                      pos.rotation,
                      pos.rotation,
                      pos.rotation + 10,
                      pos.rotation - 20,
                      pos.rotation - 32,
                      pos.rotation - 55,
                    ],
                    x: [-30, 22, -15, 18, -10, 6, 0, 0, -8, 12, 22, 30],
                    y: [-30, -18, 15, -10, 12, -5, 0, 0, 8, -12, 18, 30],
                    filter: isDark
                      ? [
                          'blur(20px) brightness(0.2) contrast(1.7)',
                          'blur(14px) brightness(0.5) contrast(2.0)',
                          'blur(17px) brightness(0.3) contrast(1.8)',
                          'blur(9px) brightness(0.8) contrast(1.6)',
                          'blur(5px) brightness(1.1) drop-shadow(0 0 18px rgba(239, 68, 68, 0.9)) contrast(1.3)',
                          'blur(1px) brightness(1.35) drop-shadow(0 0 28px rgba(239, 68, 68, 1)) contrast(1.2)',
                          'blur(0px) brightness(1.5) drop-shadow(0 0 35px rgba(239, 68, 68, 1)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 80px rgba(239, 68, 68, 0.7))',
                          'blur(0px) brightness(1.5) drop-shadow(0 0 35px rgba(239, 68, 68, 1)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 80px rgba(239, 68, 68, 0.7))',
                          'blur(4px) brightness(1.25) drop-shadow(0 0 24px rgba(239, 68, 68, 0.9)) contrast(1.3)',
                          'blur(10px) brightness(0.7) contrast(1.6)',
                          'blur(14px) brightness(0.4) contrast(1.8)',
                          'blur(20px) brightness(0.2) contrast(1.9)',
                        ]
                      : [
                          'blur(20px) brightness(0.3) contrast(1.7)',
                          'blur(14px) brightness(0.6) contrast(1.9)',
                          'blur(17px) brightness(0.4) contrast(1.8)',
                          'blur(9px) brightness(0.9) contrast(1.5)',
                          'blur(5px) brightness(1.1) drop-shadow(0 0 15px rgba(220, 38, 38, 0.9)) contrast(1.3)',
                          'blur(1px) brightness(1.35) drop-shadow(0 0 25px rgba(220, 38, 38, 1)) contrast(1.2)',
                          'blur(0px) brightness(1.5) drop-shadow(0 0 32px rgba(220, 38, 38, 1)) drop-shadow(0 0 55px rgba(220, 38, 38, 0.9)) drop-shadow(0 0 75px rgba(220, 38, 38, 0.7))',
                          'blur(0px) brightness(1.5) drop-shadow(0 0 32px rgba(220, 38, 38, 1)) drop-shadow(0 0 55px rgba(220, 38, 38, 0.9)) drop-shadow(0 0 75px rgba(220, 38, 38, 0.7))',
                          'blur(4px) brightness(1.25) drop-shadow(0 0 22px rgba(220, 38, 38, 0.9)) contrast(1.3)',
                          'blur(10px) brightness(0.7) contrast(1.6)',
                          'blur(14px) brightness(0.4) contrast(1.8)',
                          'blur(20px) brightness(0.3) contrast(1.9)',
                        ],
                  }}
                  transition={{
                    duration: 3.2,
                    delay: index * 0.45,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: [0.45, 0.05, 0.55, 0.95],
                    times: [0, 0.08, 0.12, 0.2, 0.28, 0.36, 0.5, 0.64, 0.75, 0.85, 0.93, 1],
                  }}
                >
                  {word}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Animations defined inline for scanlines */}
      <style jsx>{`
        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(3px);
          }
        }

        .hero-glitch-text {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </motion.div>
  );
}
