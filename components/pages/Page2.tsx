'use client';

import React, { useEffect, useRef, useCallback, memo, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  useWillChange,
  useReducedMotion,
} from 'framer-motion';
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
  label: string;
}

// Character pools for Matrix rain
const MATRIX_CHARS = {
  chinese: '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙布青半江石油思想式刻列季挥际质阶导空况市运集百银根买节朗网角查曾置酸铁愿改造奋清',
  english: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  symbols: '@#$%&*+=<>[]{}|\\/',
};

// Generate random character from pool
const getRandomChar = () => {
  const pools = [MATRIX_CHARS.chinese, MATRIX_CHARS.english, MATRIX_CHARS.symbols];
  const pool = pools[Math.floor(Math.random() * pools.length)];
  return pool[Math.floor(Math.random() * pool.length)];
};

// Memoized Scanlines Overlay Component
const Scanlines = memo(({ isDark }: { isDark: boolean }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-10"
    style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        ${isDark ? 'rgba(99, 102, 241, 0.03)' : 'rgba(79, 70, 229, 0.03)'} 0px,
        transparent 1px,
        transparent 2px,
        ${isDark ? 'rgba(99, 102, 241, 0.03)' : 'rgba(79, 70, 229, 0.03)'} 3px
      )`,
    }}
    animate={{
      backgroundPosition: ['0px 0px', '0px 4px'],
    }}
    transition={{
      duration: 0.15,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
));

Scanlines.displayName = 'Scanlines';

// Memoized Tracking Reticle Component - Follows the text in real-time
const TrackingReticle = memo(({ x, y, isDark }: { x: any; y: any; isDark: boolean }) => {
  const reticleColor = isDark ? '#EF4444' : '#DC2626';

  // Convert motion values to percentage strings for CSS
  const leftPos = useTransform(x, (v) => `${v}%`);
  const topPos = useTransform(y, (v) => `${v}%`);

  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{
        left: leftPos,
        top: topPos,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Square brackets with pulsing center dot */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        {/* Center pulsing dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
          style={{
            backgroundColor: reticleColor,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Corner brackets (square edges only) */}
        {[
          { rotation: 0, x: 0, y: 0 },
          { rotation: 90, x: 100, y: 0 },
          { rotation: 180, x: 100, y: 100 },
          { rotation: 270, x: 0, y: 100 },
        ].map((corner, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 md:w-8 md:h-8"
            style={{
              left: `${corner.x}%`,
              top: `${corner.y}%`,
              transform: `translate(-50%, -50%) rotate(${corner.rotation}deg)`,
              borderTop: `2px solid ${reticleColor}`,
              borderLeft: `2px solid ${reticleColor}`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
});

TrackingReticle.displayName = 'TrackingReticle';

// Matrix-style Binary Rain Component
const MatrixRain = memo(({ isDark }: { isDark: boolean }) => {
  const columns = 15; // Number of falling columns
  
  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {Array.from({ length: columns }).map((_, colIndex) => (
        <MatrixColumn key={colIndex} index={colIndex} isDark={isDark} />
      ))}
    </div>
  );
});

MatrixRain.displayName = 'MatrixRain';

// Single Matrix column component
const MatrixColumn = memo(({ index, isDark }: { index: number; isDark: boolean }) => {
  const [chars, setChars] = useState(() => 
    Array.from({ length: 8 }, () => getRandomChar())
  );
  
  const columnX = (index / 15) * 100; // Distribute across width
  const duration = 3 + Math.random() * 2; // Random fall speed
  const delay = index * 0.3; // Stagger start

  // Rapidly change characters
  useEffect(() => {
    const interval = setInterval(() => {
      setChars(Array.from({ length: 8 }, () => getRandomChar()));
    }, 80); // Change every 80ms for rapid effect

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1"
      style={{
        left: `${columnX}%`,
        color: isDark ? 'rgba(16, 185, 129, 0.6)' : 'rgba(5, 150, 105, 0.5)',
        textShadow: isDark 
          ? '0 0 8px rgba(16, 185, 129, 0.8)' 
          : '0 0 6px rgba(5, 150, 105, 0.6)',
        fontSize: 'clamp(10px, 1.5vw, 14px)',
        fontFamily: 'monospace',
        fontWeight: 'bold',
      }}
      animate={{
        top: ['-20%', '120%'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 0.3,
            delay: i * 0.05,
            repeat: Infinity,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
});

MatrixColumn.displayName = 'MatrixColumn';

// Memoized Warning Pulse Component
const WarningPulse = memo(({ distance, isDark }: { distance: number; isDark: boolean }) => {
  const dangerThreshold = 30; // Distance below which warning activates
  const isDangerous = distance < dangerThreshold;
  const intensity = isDangerous ? 1 - distance / dangerThreshold : 0;

  if (!isDangerous) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-15"
      style={{
        background: isDark
          ? `radial-gradient(circle at 50% 50%, rgba(239, 68, 68, ${intensity * 0.2}), transparent 60%)`
          : `radial-gradient(circle at 50% 50%, rgba(220, 38, 38, ${intensity * 0.15}), transparent 60%)`,
      }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
});

WarningPulse.displayName = 'WarningPulse';

export default function Page2({ isActive = true, onScrollToPage7 }: Page2Props) {
  const { theme, language } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const willChange = useWillChange();

  // Translations
  const heroText = getTranslation('page2.hero', language);
  const orbitalWords = getTranslationArray('page2.surveillance', language);
  const ctaButtonText = getTranslation('page2.ctaButton', language);
  const ctaButtonMobileText = getTranslation('page2.ctaButtonMobile', language);
  const policeText = getTranslation('page2.entities.police', language);
  const hackerText = getTranslation('page2.entities.hacker', language);
  const ispText = getTranslation('page2.entities.isp', language);

  // Theme colors
  const isDark = theme === 'dark';
  const bgGradient = isDark
    ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-gray-900'
    : 'bg-gradient-to-br from-indigo-100 via-slate-200 to-gray-100';
  const heroTextColor = isDark ? '#F1F5F9' : '#1E293B';
  const gridColor = isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(79, 70, 229, 0.2)';
  const wordColor = isDark ? 'text-indigo-300' : 'text-indigo-700';
  
  // Performance: Use MotionValues instead of useState
  const mainTextX = useMotionValue(50);
  const mainTextY = useMotionValue(45);
  const followX = useSpring(mainTextX, { stiffness: 100, damping: 20 });
  const followY = useSpring(mainTextY, { stiffness: 100, damping: 20 });
  const glitchX = useMotionValue(0);
  const glitchY = useMotionValue(0);
  const rotation = useMotionValue(0);
  const wiggleX = useMotionValue(0);
  const wiggleY = useMotionValue(0);

  // Motion values for entity target indices (for smooth cycling through purple dots)
  const entity0Target = useMotionValue(0);
  const entity1Target = useMotionValue(2);
  const entity2Target = useMotionValue(4);
  // Lower stiffness and higher damping for gradual, smooth movement
  const entity0TargetSpring = useSpring(entity0Target, { stiffness: 30, damping: 25 });
  const entity1TargetSpring = useSpring(entity1Target, { stiffness: 30, damping: 25 });
  const entity2TargetSpring = useSpring(entity2Target, { stiffness: 30, damping: 25 });

  // Refs for animation control
  const isCenterRef = useRef(true);
  const isFirstRunRef = useRef(true);
  const isGlitchingRef = useRef(false);
  const minDistanceRef = useRef<number>(100);

  // Performance: useMotionTemplate for dynamic gradient
  const backgroundGradient = useMotionTemplate`radial-gradient(circle at ${followX}% ${followY}%, 
    ${
      isDark
        ? 'rgba(255, 255, 255, 0.15) 0%, rgba(99, 102, 241, 0.8) 5%, rgba(99, 102, 241, 0.6) 10%, rgba(30, 27, 75, 0.85) 25%, rgba(15, 23, 42, 0.95) 45%, #0f172a 70%'
        : 'rgba(255, 255, 255, 0.95) 0%, rgba(165, 180, 252, 0.9) 5%, rgba(165, 180, 252, 0.7) 10%, rgba(226, 232, 240, 0.8) 25%, rgba(203, 213, 225, 0.9) 45%, #cbd5e1 70%'
    })`;

  // Generate next position - alternates between center and random
  const generateNextPosition = useCallback((): Position => {
    isCenterRef.current = !isCenterRef.current;
    
    if (isCenterRef.current) {
      return { x: 50, y: 45 };
    } else {
      // Generate random position avoiding CTA button
      for (let i = 0; i < 50; i++) {
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
  }, []);

  // Calculate orbital position
  const calculateOrbitPosition = useCallback(
    (angle: number, radius: number, centerX: number, centerY: number): Position => {
      const radians = (angle * Math.PI) / 180;
      return {
        x: centerX + Math.cos(radians) * radius,
        y: centerY + Math.sin(radians) * radius,
      };
    },
    []
  );

  // Calculate minimum distance from entities to main text
  const calculateMinDistance = useCallback(
    (textX: number, textY: number, rot: number) => {
      const entityIndices = [
        entity0TargetSpring.get(),
        entity1TargetSpring.get(),
        entity2TargetSpring.get(),
      ];
      let minDist = 100;

      entityIndices.forEach((targetIndex) => {
        const angle = ((targetIndex / orbitalWords.length) * 360 + rot) % 360;
        const radius = 18;
        const entityPos = calculateOrbitPosition(angle, radius, followX.get(), followY.get());
        const dist = Math.sqrt(Math.pow(entityPos.x - textX, 2) + Math.pow(entityPos.y - textY, 2));
        minDist = Math.min(minDist, dist);
      });

      return minDist;
    },
    [orbitalWords.length, followX, followY, calculateOrbitPosition, entity0TargetSpring, entity1TargetSpring, entity2TargetSpring]
  );

  // Consolidated animation loop using single rAF
  useEffect(() => {
    if (!isActive || shouldReduceMotion) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30; // Optimized for mobile
    const fpsInterval = 1000 / fps;

    // Glitch interval
    const glitchInterval = setInterval(() => {
      if (isGlitchingRef.current) {
        glitchX.set((Math.random() - 0.5) * 30);
        glitchY.set((Math.random() - 0.5) * 30);
      } else {
        glitchX.set((Math.random() - 0.5) * 4);
        glitchY.set((Math.random() - 0.5) * 4);
      }
    }, 100);

    // Main animation cycle
    const runCycle = () => {
      const holdDuration = isFirstRunRef.current
        ? 2000
        : isCenterRef.current
        ? 3500
        : 2500;

        isFirstRunRef.current = false;
      
      setTimeout(() => {
        isGlitchingRef.current = true;
        
        setTimeout(() => {
          const newPosition = generateNextPosition();
          mainTextX.set(newPosition.x);
          mainTextY.set(newPosition.y);
          
          setTimeout(() => {
            isGlitchingRef.current = false;
            runCycle();
          }, 50);
        }, 500);
      }, holdDuration);
    };

    // Continuous rotation and wiggle
    const animate = (time: number) => {
      if (time - lastTime < fpsInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      lastTime = time;

      // Update rotation
      rotation.set((rotation.get() + 0.5) % 360);

      // Update wiggle
      wiggleX.set(Math.sin(Date.now() / 500) * 3);
      wiggleY.set(Math.cos(Date.now() / 700) * 3);

      // Calculate and update minimum distance
      const dist = calculateMinDistance(mainTextX.get(), mainTextY.get(), rotation.get());
      minDistanceRef.current = dist;

      animationFrameId = requestAnimationFrame(animate);
    };

    // Entity movement interval - cycle through all purple dots
    const entityInterval = setInterval(() => {
      // Move each entity to the next purple dot position
      entity0Target.set((entity0Target.get() + 1) % orbitalWords.length);
      entity1Target.set((entity1Target.get() + 1) % orbitalWords.length);
      entity2Target.set((entity2Target.get() + 1) % orbitalWords.length);
    }, 3500); // Move every 3.5 seconds - gives time for gradual smooth movement

    // Start animations
    runCycle();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(entityInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    isActive,
    shouldReduceMotion,
    mainTextX,
    mainTextY,
    glitchX,
    glitchY,
    rotation,
    wiggleX,
    wiggleY,
    orbitalWords.length,
    generateNextPosition,
    calculateMinDistance,
    entity0Target,
    entity1Target,
    entity2Target,
  ]);

  // Entities data
  const entities: Entity[] = [
    { id: 'police', color: isDark ? '#EF4444' : '#DC2626', label: policeText },
    { id: 'hacker', color: isDark ? '#10B981' : '#059669', label: hackerText },
    { id: 'isp', color: isDark ? '#F59E0B' : '#D97706', label: ispText },
  ];

  return (
    <motion.div 
      className={`relative w-full h-full overflow-hidden ${bgGradient}`}
      style={{
        background: backgroundGradient,
        willChange,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hexagonal Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
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

      {/* Matrix Binary Rain */}
      {!shouldReduceMotion && <MatrixRain isDark={isDark} />}

      {/* Scanlines Overlay */}
      {!shouldReduceMotion && <Scanlines isDark={isDark} />}

      {/* Warning Pulse (distance-based) */}
      {!shouldReduceMotion && (
        <WarningPulse distance={minDistanceRef.current} isDark={isDark} />
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full h-full px-5 lg:px-20">
        {/* Tracking Reticle - Follows YOUR DATA text in real-time */}
        {!shouldReduceMotion && (
          <TrackingReticle x={mainTextX} y={mainTextY} isDark={isDark} />
        )}

        {/* Main Hero Text with Glitch */}
        <motion.div
          className="absolute"
        style={{
            left: useTransform(mainTextX, (v) => `${v}%`),
            top: useTransform(mainTextY, (v) => `${v}%`),
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold whitespace-nowrap select-none"
            style={{
              color: heroTextColor,
              textShadow: useMotionTemplate`
                ${glitchX}px ${glitchY}px 0 ${isDark ? 'rgba(239, 68, 68, 0.8)' : 'rgba(220, 38, 38, 0.7)'},
                ${useTransform(glitchX, (v) => -v)}px ${useTransform(
                glitchY,
                (v) => -v
              )}px 0 ${isDark ? 'rgba(16, 185, 129, 0.8)' : 'rgba(5, 150, 105, 0.7)'},
                0 0 15px ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)'},
                0 0 30px ${isDark ? 'rgba(99, 102, 241, 0.8)' : 'rgba(79, 70, 229, 0.7)'}
              `,
              transform: useMotionTemplate`translate(${glitchX}px, ${glitchY}px) skew(${useTransform(
                glitchX,
                (v) => v * 0.5
              )}deg, ${useTransform(glitchY, (v) => v * 0.3)}deg)`,
              filter: useMotionTemplate`blur(${useTransform(
                glitchX,
                (v) => (Math.abs(v) > 10 ? '8px' : '0px')
              )}) brightness(1.2)`,
              willChange,
            }}
            animate={{
              opacity: [1, 0.96, 1],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
            }}
          >
            {heroText}
          </motion.h1>
        </motion.div>

        {/* Orbital Words - Desktop */}
        <div className="hidden md:block">
          {orbitalWords.map((word, index) => {
            const angle = useTransform(rotation, (r) => ((index / orbitalWords.length) * 360 + r) % 360);
            const radius = 18;
            const posX = useTransform([angle, followX, wiggleX], ([a, fx, wx]) => {
              const radians = ((a as number) * Math.PI) / 180;
              return (fx as number) + Math.cos(radians) * radius + (wx as number);
            });
            const posY = useTransform([angle, followY, wiggleY], ([a, fy, wy]) => {
              const radians = ((a as number) * Math.PI) / 180;
              return (fy as number) + Math.sin(radians) * radius + (wy as number);
            });

            return (
              <motion.div
                key={word}
                className="absolute"
                style={{
                  left: useTransform(posX, (v) => `${v}%`),
                  top: useTransform(posY, (v) => `${v}%`),
                  transform: 'translate(-50%, -50%)',
                  willChange,
                }}
              >
                <div
                  className={`text-lg lg:text-xl font-semibold ${wordColor} whitespace-nowrap text-center flex flex-col items-center gap-2`}
                >
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

        {/* Orbital Words - Mobile */}
        <div className="md:hidden">
          {orbitalWords.map((word, index) => {
            const angle = useTransform(rotation, (r) => ((index / orbitalWords.length) * 360 + r) % 360);
            const radius = 25;
            const posX = useTransform([angle, followX, wiggleX], ([a, fx, wx]) => {
              const radians = ((a as number) * Math.PI) / 180;
              return (fx as number) + Math.cos(radians) * radius + (wx as number) * 0.3;
            });
            const posY = useTransform([angle, followY, wiggleY], ([a, fy, wy]) => {
              const radians = ((a as number) * Math.PI) / 180;
              return (fy as number) + Math.sin(radians) * radius + (wy as number) * 0.3;
            });

            return (
              <motion.div
                key={word}
                className="absolute"
                style={{
                  left: useTransform(posX, (v) => `${v}%`),
                  top: useTransform(posY, (v) => `${v}%`),
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className={`text-sm font-semibold ${wordColor} whitespace-nowrap text-center flex flex-col items-center gap-1.5`}
                >
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

        {/* Moving Entities - Desktop */}
        <div className="hidden md:block">
          {entities.map((entity, entityIndex) => {
            // Get the appropriate spring value for this entity
            const targetSpring = entityIndex === 0 ? entity0TargetSpring : entityIndex === 1 ? entity1TargetSpring : entity2TargetSpring;
            const angle = useTransform(
              [rotation, targetSpring],
              ([r, target]) => ((target / orbitalWords.length) * 360 + r) % 360
            );
            const radius = 18;
            const posX = useTransform([angle, followX], ([a, fx]) => {
              const radians = ((a as number) * Math.PI) / 180;
              return (fx as number) + Math.cos(radians) * radius;
            });
            const posY = useTransform([angle, followY], ([a, fy]) => {
              const radians = ((a as number) * Math.PI) / 180;
              return (fy as number) + Math.sin(radians) * radius;
            });

            return (
              <motion.div
                key={entity.id}
                className="absolute"
                style={{
                  left: useTransform(posX, (v) => `${v}%`),
                  top: useTransform(posY, (v) => `${v}%`),
                  transform: 'translate(-50%, -50%)',
                  willChange,
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
                    {entity.label}
                  </motion.span>
                  {/* Blinking dot with entity color */}
                  <motion.div
                    className="w-3 h-3 rounded-full relative"
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

        {/* Moving Entities - Mobile */}
        <div className="md:hidden">
          {entities.map((entity, entityIndex) => {
            // Get the appropriate spring value for this entity
            const targetSpring = entityIndex === 0 ? entity0TargetSpring : entityIndex === 1 ? entity1TargetSpring : entity2TargetSpring;
            const angle = useTransform(
              [rotation, targetSpring],
              ([r, target]) => ((target / orbitalWords.length) * 360 + r) % 360
            );
            const radius = 25;
            const posX = useTransform([angle, followX], ([a, fx]) => {
              const radians = ((a as number) * Math.PI) / 180;
              return (fx as number) + Math.cos(radians) * radius;
            });
            const posY = useTransform([angle, followY], ([a, fy]) => {
              const radians = ((a as number) * Math.PI) / 180;
              return (fy as number) + Math.sin(radians) * radius;
            });

            return (
              <motion.div
                key={entity.id}
                className="absolute"
                style={{
                  left: useTransform(posX, (v) => `${v}%`),
                  top: useTransform(posY, (v) => `${v}%`),
                  transform: 'translate(-50%, -50%)',
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
                    {entity.label}
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

        {/* CTA Button - Fixed at bottom center with responsive text */}
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20">
          <motion.button
            onClick={onScrollToPage7}
            className={`
              relative z-20 px-8 py-4 md:px-10 md:py-5 
              text-xl md:text-2xl lg:text-3xl font-bold 
              text-white rounded-full 
              transition-all duration-300
              ${
                isDark
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
            {/* Responsive text - "Secure Now!" on small screens, full text on larger */}
            <span className="hidden md:inline">{ctaButtonText}</span>
            <span className="md:hidden">{ctaButtonMobileText}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
