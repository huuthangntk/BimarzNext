'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation, getTranslationArray } from '@/lib/translations';

interface Page2Props {
  isActive?: boolean;
  onScrollToPage7?: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface Entity {
  id: string;
  color: string;
  targetIndex: number;
}

export default function Page2({ isActive = true, onScrollToPage7 }: Page2Props) {
  const { theme, language } = useTheme();
  const [mainTextPosition, setMainTextPosition] = useState<Position>({ x: 50, y: 45 });
  const [followPosition, setFollowPosition] = useState<Position>({ x: 50, y: 45 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const [staticRotation, setStaticRotation] = useState(0);
  const [wiggleOffset, setWiggleOffset] = useState({ x: 0, y: 0 });
  const [entityTargets, setEntityTargets] = useState<number[]>([0, 2, 4]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCenterRef = useRef(true); // Track if next position should be center
  const isFirstRunRef = useRef(true); // Track if this is the first animation cycle

  const heroText = getTranslation('page2.hero', language);
  const orbitalWords = getTranslationArray('page2.surveillance', language);
  const ctaButtonText = getTranslation('page2.ctaButton', language);
  
  // Get entity translations
  const policeText = getTranslation('page2.entities.police', language);
  const hackerText = getTranslation('page2.entities.hacker', language);
  const ispText = getTranslation('page2.entities.isp', language);

  // Theme-aware colors
  const isDark = theme === 'dark';
  const bgGradient = isDark
    ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-gray-900'
    : 'bg-gradient-to-br from-indigo-100 via-slate-200 to-gray-100';

  const heroTextColor = isDark ? '#F1F5F9' : '#1E293B';
  const heroGlitchColor = isDark ? '#6366F1' : '#4F46E5';
  const gridColor = isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(79, 70, 229, 0.2)';
  const wordColor = isDark ? 'text-indigo-300' : 'text-indigo-700';
  
  // Check if we're at center position
  const isAtCenter = mainTextPosition.x === 50 && mainTextPosition.y === 45;

  // Entity colors - unique for each
  const entities: Entity[] = [
    { id: 'police', color: isDark ? '#EF4444' : '#DC2626', targetIndex: 0 }, // Red
    { id: 'hacker', color: isDark ? '#10B981' : '#059669', targetIndex: 1 }, // Green
    { id: 'isp', color: isDark ? '#F59E0B' : '#D97706', targetIndex: 2 }, // Amber/Orange
  ];

  const entityTexts = [policeText, hackerText, ispText];

  // Generate next position - alternates between center and random
  const generateNextPosition = (): Position => {
    isCenterRef.current = !isCenterRef.current;
    
    if (isCenterRef.current) {
      // Return to center
      return { x: 50, y: 45 };
    } else {
      // Generate random position avoiding CTA button
      const attempts = 50;
      for (let i = 0; i < attempts; i++) {
        const x = Math.random() * 60 + 20; // 20-80%
        const y = Math.random() * 50 + 20; // 20-70%
        
        // Avoid CTA button area (center-bottom)
        const distanceFromCTA = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 75, 2));
        if (distanceFromCTA > 20) {
          return { x, y };
        }
      }
      return { x: 50, y: 35 };
    }
  };

  // Optimized glitch effect - only runs when page is active
  useEffect(() => {
    if (!isActive) return;

    const glitchInterval = setInterval(() => {
      if (isGlitching) {
        // Heavy glitch during transition
        setGlitchOffset({
          x: (Math.random() - 0.5) * 30,
          y: (Math.random() - 0.5) * 30,
        });
      } else {
        // Continuous subtle glitch at all positions
        setGlitchOffset({
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 4,
        });
      }
    }, 100); // Slightly reduced frequency

    return () => clearInterval(glitchInterval);
  }, [isGlitching, isActive]);

  // Main animation cycle: hold -> glitch -> jump -> follow (only when active)
  useEffect(() => {
    if (!isActive) return;

    const runCycle = () => {
      // Determine hold duration based on current position
      let holdDuration;
      if (isFirstRunRef.current) {
        holdDuration = 2000; // First run: 2 seconds
        isFirstRunRef.current = false;
      } else {
        // Check current position to determine duration
        const currentIsCenter = mainTextPosition.x === 50 && mainTextPosition.y === 45;
        holdDuration = currentIsCenter ? 3500 : 2500; // Center: 3.5s, Random: 2.5s
      }
      
      // Hold phase
      setTimeout(() => {
        setIsGlitching(true);
        
        // Glitch phase (0.5 seconds)
        setTimeout(() => {
          const newPosition = generateNextPosition();
          // Main text jumps instantly
          setMainTextPosition(newPosition);
          
          // Names follow after very short delay (ultra fast)
          setTimeout(() => {
            setFollowPosition(newPosition);
            setIsGlitching(false);
            
            // Schedule next cycle recursively
            runCycle();
          }, 50);
        }, 500);
      }, holdDuration);
    };

    // Start first cycle after 2 seconds
    const firstTimeout = setTimeout(runCycle, 2000);

    return () => {
      clearTimeout(firstTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  // Optimized rotation and wiggle using requestAnimationFrame (only when active)
  useEffect(() => {
    if (!isActive) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30; // Reduced from ~60fps to 30fps for better mobile performance
    const fpsInterval = 1000 / fps;

    const animate = (time: number) => {
      if (time - lastTime < fpsInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      lastTime = time;

      // Update rotation and wiggle in single rAF
      setStaticRotation((prev) => (prev + 0.5) % 360);
      setWiggleOffset({
        x: Math.sin(Date.now() / 500) * 3,
        y: Math.cos(Date.now() / 700) * 3,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  // Calculate orbital positions around follow position (for smooth following)
  const calculateOrbitPosition = (angle: number, radius: number, center: Position): Position => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: center.x + Math.cos(radians) * radius,
      y: center.y + Math.sin(radians) * radius,
    };
  };

  // Get static name positions (they rotate continuously)
  const getStaticNamePosition = (index: number, totalNames: number): Position => {
    const angle = ((index / totalNames) * 360 + staticRotation) % 360;
    const radius = 18; // Percentage-based
    return calculateOrbitPosition(angle, radius, followPosition);
  };

  // Entity movement - they move between static name positions (only when active)
  useEffect(() => {
    if (!isActive) return;

    const entityInterval = setInterval(() => {
      setEntityTargets((prev) => {
        const totalNames = orbitalWords.length;
        return prev.map((target) => (target + 1) % totalNames);
      });
    }, 1500); // Move to next position every 1.5 seconds

    return () => clearInterval(entityInterval);
  }, [orbitalWords.length, isActive]);

  return (
    <motion.div 
      className={`relative w-full h-full overflow-hidden ${bgGradient}`}
      style={{
        background: isDark
          ? `radial-gradient(circle at ${followPosition.x}% ${followPosition.y}%, 
              rgba(255, 255, 255, 0.15) 0%, 
              rgba(99, 102, 241, 0.8) 5%,
              rgba(99, 102, 241, 0.6) 10%,
              rgba(30, 27, 75, 0.85) 25%,
              rgba(15, 23, 42, 0.95) 45%,
              #0f172a 70%)`
          : `radial-gradient(circle at ${followPosition.x}% ${followPosition.y}%, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(165, 180, 252, 0.9) 5%,
              rgba(165, 180, 252, 0.7) 10%,
              rgba(226, 232, 240, 0.8) 25%,
              rgba(203, 213, 225, 0.9) 45%,
              #cbd5e1 70%)`,
        transition: 'background 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full px-5 lg:px-20">
        {/* Main Hero Text "YOUR DATA" with Chaotic Glitch - INSTANT JUMP */}
        <div
          className="absolute"
        style={{
            left: `${mainTextPosition.x}%`,
            top: `${mainTextPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'none', // No transition - instant jump
          }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold whitespace-nowrap"
            style={{
              color: heroTextColor,
              textShadow: isDark
                ? `
                  ${glitchOffset.x}px ${glitchOffset.y}px 0 rgba(239, 68, 68, 0.8),
                  ${-glitchOffset.x}px ${-glitchOffset.y}px 0 rgba(16, 185, 129, 0.8),
                  0 0 15px rgba(255, 255, 255, 0.7),
                  0 0 30px rgba(99, 102, 241, 0.8),
                  0 0 50px rgba(99, 102, 241, 0.6),
                  0 0 70px rgba(99, 102, 241, 0.4)
                `
                : `
                  ${glitchOffset.x}px ${glitchOffset.y}px 0 rgba(220, 38, 38, 0.7),
                  ${-glitchOffset.x}px ${-glitchOffset.y}px 0 rgba(5, 150, 105, 0.7),
                  0 0 12px rgba(255, 255, 255, 0.8),
                  0 0 25px rgba(79, 70, 229, 0.7),
                  0 0 45px rgba(79, 70, 229, 0.5),
                  0 0 65px rgba(79, 70, 229, 0.3)
                `,
              transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px) skew(${glitchOffset.x * 0.5}deg, ${glitchOffset.y * 0.3}deg)`,
              filter: `blur(${isGlitching ? '8px' : '0px'}) brightness(${isGlitching ? '1.3' : '1.2'})`,
              transition: isGlitching ? 'none' : 'filter 0.3s ease-out',
            }}
            animate={{
              opacity: isGlitching ? [1, 0.3, 1, 0.5, 1] : [1, 0.96, 1],
            }}
            transition={{
              duration: isGlitching ? 0.15 : 0.4,
              repeat: Infinity,
            }}
          >
            {heroText}
          </motion.h1>
        </div>

        {/* Orbital Words - Static surveillance terms with ROTATION and WIGGLE */}
        <div className="hidden md:block">
          {orbitalWords.map((word, index) => {
            const position = getStaticNamePosition(index, orbitalWords.length);

            return (
              <motion.div
                key={word}
                className="absolute"
                style={{
                  left: `${position.x + wiggleOffset.x}%`,
                  top: `${position.y + wiggleOffset.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  left: `${position.x + wiggleOffset.x}%`,
                  top: `${position.y + wiggleOffset.y}%`,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className={`text-lg lg:text-xl font-semibold ${wordColor} whitespace-nowrap text-center flex flex-col items-center gap-2`}>
                  <span>{word}</span>
                  {/* Blinking dot */}
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isDark ? '#6366F1' : '#4F46E5' }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.3, 0.8],
                      boxShadow: [
                        `0 0 5px ${isDark ? '#6366F1' : '#4F46E5'}`,
                        `0 0 15px ${isDark ? '#6366F1' : '#4F46E5'}`,
                        `0 0 5px ${isDark ? '#6366F1' : '#4F46E5'}`,
                      ],
                    }}
                    transition={{
                      duration: 1.5 + index * 0.3,
                      delay: index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Orbital Words with ROTATION and WIGGLE */}
        <div className="md:hidden">
          {orbitalWords.map((word, index) => {
            const angle = ((index / orbitalWords.length) * 360 + staticRotation) % 360;
            const radius = 25; // Larger radius for mobile
            const position = calculateOrbitPosition(angle, radius, followPosition);

            return (
              <motion.div
                key={word}
                className="absolute"
                style={{
                  left: `${position.x + wiggleOffset.x * 0.3}%`,
                  top: `${position.y + wiggleOffset.y * 0.3}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  left: `${position.x + wiggleOffset.x * 0.3}%`,
                  top: `${position.y + wiggleOffset.y * 0.3}%`,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className={`text-sm font-semibold ${wordColor} whitespace-nowrap text-center flex flex-col items-center gap-1.5`}>
                  <span>{word}</span>
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: isDark ? '#6366F1' : '#4F46E5' }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: 1.5 + index * 0.3,
                      delay: index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Moving Entities - Police, Hacker, ISP - Move between static name positions */}
        <div className="hidden md:block">
          {entities.map((entity, index) => {
            const targetIndex = entityTargets[index];
            const position = getStaticNamePosition(targetIndex, orbitalWords.length);

            return (
              <motion.div
                key={entity.id}
                className="absolute"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <motion.span
                    className="text-2xl lg:text-3xl font-bold whitespace-nowrap"
                    style={{
                      color: entity.color,
                      textShadow: `0 0 20px ${entity.color}, 0 0 40px ${entity.color}`,
                      filter: 'brightness(1.2)',
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      filter: ['brightness(1.2)', 'brightness(1.5)', 'brightness(1.2)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {entityTexts[index]}
                  </motion.span>
                  {/* Blinking dot with entity color */}
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entity.color }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.5, 0.8],
                      boxShadow: [
                        `0 0 8px ${entity.color}`,
                        `0 0 20px ${entity.color}`,
                        `0 0 8px ${entity.color}`,
                      ],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Outer ring pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${entity.color}` }}
                      animate={{
                        scale: [1, 3],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Moving Entities - Move between static name positions */}
        <div className="md:hidden">
          {entities.map((entity, index) => {
            const targetIndex = entityTargets[index];
            const angle = ((targetIndex / orbitalWords.length) * 360 + staticRotation) % 360;
            const radius = 25;
            const position = calculateOrbitPosition(angle, radius, followPosition);

            return (
              <motion.div
                key={entity.id}
                className="absolute"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <motion.span
                    className="text-base font-bold whitespace-nowrap"
                    style={{
                      color: entity.color,
                      textShadow: `0 0 15px ${entity.color}`,
                      filter: 'brightness(1.2)',
                    }}
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {entityTexts[index]}
                  </motion.span>
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entity.color }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.4, 0.8],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button - Fixed at bottom center */}
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20">
          <motion.button
            onClick={onScrollToPage7}
            className={`
              relative z-20 px-8 py-4 md:px-10 md:py-5 
              text-xl md:text-2xl lg:text-3xl font-bold 
              text-white rounded-full 
              transition-all duration-300
              ${isDark 
                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 cta-glow-indigo-dark' 
                : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 cta-glow-indigo-light'
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
            {/* Shield Icon */}
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
            <span>{ctaButtonText}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}