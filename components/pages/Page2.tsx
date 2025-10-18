/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useEffect, useRef, useCallback, memo, useState, useMemo } from 'react';
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
  trackingSpeed: number; // How fast it tracks (higher = more aggressive)
  offsetRadius: number; // How close it follows (pixels)
  glitchIntensity: number; // Animation intensity
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

// Matrix-style Binary Rain Component with RANDOM positioning
const MatrixRain = memo(({ isDark }: { isDark: boolean }) => {
  const columns = 15; // Number of falling columns
  
  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {Array.from({ length: columns }).map((_, colIndex) => (
        <MatrixColumn key={colIndex} isDark={isDark} />
      ))}
    </div>
  );
});

MatrixRain.displayName = 'MatrixRain';

// Single Matrix column component with TRULY RANDOM positioning for chaos
const MatrixColumn = memo(({ isDark }: { isDark: boolean }) => {
  const [chars, setChars] = useState(() => 
    Array.from({ length: 8 }, () => getRandomChar())
  );
  
  // RANDOM X position - memoized to prevent recalculation but different per instance
  const columnX = useMemo(() => Math.random() * 100, []); // Random 0-100%
  const duration = useMemo(() => 3 + Math.random() * 2, []); // Random fall speed
  const delay = useMemo(() => Math.random() * 2, []); // Random start delay

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
  const rotation = useMotionValue(0); // For standard dots orbital rotation
  const wiggleX = useMotionValue(0);
  const wiggleY = useMotionValue(0);

  // Motion values for TRACKING entities - they follow standard dots
  const entity0TargetX = useMotionValue(50);
  const entity0TargetY = useMotionValue(45);
  const entity1TargetX = useMotionValue(50);
  const entity1TargetY = useMotionValue(45);
  const entity2TargetX = useMotionValue(50);
  const entity2TargetY = useMotionValue(45);

  // Spring-based smooth tracking for each entity (FAST tracking speeds)
  const entity0X = useSpring(entity0TargetX, { stiffness: 150, damping: 15 }); // Police - aggressive
  const entity0Y = useSpring(entity0TargetY, { stiffness: 150, damping: 15 });
  const entity1X = useSpring(entity1TargetX, { stiffness: 120, damping: 18 }); // ISP - steady
  const entity1Y = useSpring(entity1TargetY, { stiffness: 120, damping: 18 });
  const entity2X = useSpring(entity2TargetX, { stiffness: 180, damping: 12 }); // Hacker - chaotic fast
  const entity2Y = useSpring(entity2TargetY, { stiffness: 180, damping: 12 });

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

  // Calculate orbital position for standard dots
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
    (textX: number, textY: number) => {
      const entityPositions = [
        { x: entity0X.get(), y: entity0Y.get() },
        { x: entity1X.get(), y: entity1Y.get() },
        { x: entity2X.get(), y: entity2Y.get() },
      ];
      let minDist = 100;

      entityPositions.forEach((pos) => {
        const dist = Math.sqrt(Math.pow(pos.x - textX, 2) + Math.pow(pos.y - textY, 2));
        minDist = Math.min(minDist, dist);
      });

      return minDist;
    },
    [entity0X, entity0Y, entity1X, entity1Y, entity2X, entity2Y]
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

    // Continuous rotation, wiggle, and entity tracking
    const animate = (time: number) => {
      if (time - lastTime < fpsInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      lastTime = time;

      // Update rotation for standard orbital dots
      const currentRotation = (rotation.get() + 1) % 360; // Smooth rotation speed
      rotation.set(currentRotation);

      // Update wiggle
      wiggleX.set(Math.sin(Date.now() / 500) * 3);
      wiggleY.set(Math.cos(Date.now() / 700) * 3);

      // Get current center position
      const centerX = followX.get();
      const centerY = followY.get();

      // Calculate target positions for tracking entities
      // Each entity follows a different standard dot position with unique offset
      const radius = 18; // Same radius as standard dots orbit

      // Police tracks position at angle 0° + rotation (follows first third of orbit)
      const policeAngle = (currentRotation + 30) % 360;
      const policeBasePos = calculateOrbitPosition(policeAngle, radius, centerX, centerY);
      const policeOffset = 2.5; // Close aggressive tracking
      const policeOffsetAngle = (policeAngle + 180) % 360; // Offset outward
      const policeOffsetRadians = (policeOffsetAngle * Math.PI) / 180;
      entity0TargetX.set(policeBasePos.x + Math.cos(policeOffsetRadians) * policeOffset);
      entity0TargetY.set(policeBasePos.y + Math.sin(policeOffsetRadians) * policeOffset);

      // ISP tracks position at angle 120° + rotation (follows second third)
      const ispAngle = (currentRotation + 150) % 360;
      const ispBasePos = calculateOrbitPosition(ispAngle, radius, centerX, centerY);
      const ispOffset = 4.5; // Medium steady distance
      const ispOffsetAngle = (ispAngle + 180) % 360;
      const ispOffsetRadians = (ispOffsetAngle * Math.PI) / 180;
      entity1TargetX.set(ispBasePos.x + Math.cos(ispOffsetRadians) * ispOffset);
      entity1TargetY.set(ispBasePos.y + Math.sin(ispOffsetRadians) * ispOffset);

      // Hacker tracks position at angle 240° + rotation (follows third third)
      const hackerAngle = (currentRotation + 270) % 360;
      const hackerBasePos = calculateOrbitPosition(hackerAngle, radius, centerX, centerY);
      // Chaotic varying offset for hacker
      const hackerOffset = 3 + Math.sin(Date.now() / 300) * 2; // 3-5% oscillating
      const hackerOffsetAngle = (hackerAngle + 180 + Math.sin(Date.now() / 200) * 30) % 360; // Chaotic angle
      const hackerOffsetRadians = (hackerOffsetAngle * Math.PI) / 180;
      entity2TargetX.set(hackerBasePos.x + Math.cos(hackerOffsetRadians) * hackerOffset);
      entity2TargetY.set(hackerBasePos.y + Math.sin(hackerOffsetRadians) * hackerOffset);

      // Calculate and update minimum distance
      const dist = calculateMinDistance(mainTextX.get(), mainTextY.get());
      minDistanceRef.current = dist;

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animations
    runCycle();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      clearInterval(glitchInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    isActive,
    shouldReduceMotion,
    mainTextX,
    mainTextY,
    followX,
    followY,
    glitchX,
    glitchY,
    rotation,
    wiggleX,
    wiggleY,
    entity0TargetX,
    entity0TargetY,
    entity1TargetX,
    entity1TargetY,
    entity2TargetX,
    entity2TargetY,
    entity0X,
    entity0Y,
    entity1X,
    entity1Y,
    entity2X,
    entity2Y,
    orbitalWords.length,
    generateNextPosition,
    calculateMinDistance,
    calculateOrbitPosition,
  ]);

  // Entities data with unique characteristics
  const entities: Entity[] = [
    { 
      id: 'police', 
      color: isDark ? '#EF4444' : '#DC2626', 
      label: policeText,
      trackingSpeed: 1.5, // Fast aggressive
      offsetRadius: 2.5,
      glitchIntensity: 1.3,
    },
    { 
      id: 'isp', 
      color: isDark ? '#F59E0B' : '#D97706', 
      label: ispText,
      trackingSpeed: 1.0, // Steady
      offsetRadius: 4.5,
      glitchIntensity: 1.0,
    },
    { 
      id: 'hacker', 
      color: isDark ? '#10B981' : '#059669', 
      label: hackerText,
      trackingSpeed: 2.0, // Chaotic fast
      offsetRadius: 4.0,
      glitchIntensity: 1.5,
    },
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

      {/* Matrix Binary Rain - NOW WITH RANDOM POSITIONS */}
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

        {/* STANDARD ORBITAL DOTS - Desktop (All same color, smooth orbit) */}
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
                  {/* Blinking dot - standard color */}
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

        {/* STANDARD ORBITAL DOTS - Mobile (OPTIMIZED - same as desktop) */}
        <div className="md:hidden">
          {orbitalWords.map((word, index) => {
            const angle = useTransform(rotation, (r) => ((index / orbitalWords.length) * 360 + r) % 360);
            const radius = 25; // Larger radius for mobile to use vertical space
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
                  // CRITICAL: GPU acceleration for mobile
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  perspective: 1000,
                  WebkitPerspective: 1000,
                }}
              >
                <div
                  className={`text-sm font-semibold ${wordColor} whitespace-nowrap text-center flex flex-col items-center gap-1.5`}
                >
                  <span>{word}</span>
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ 
                      backgroundColor: isDark ? '#6366F1' : '#4F46E5',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.3, 0.8],
                      boxShadow: [
                        `0 0 4px ${isDark ? '#6366F1' : '#4F46E5'}`,
                        `0 0 12px ${isDark ? '#6366F1' : '#4F46E5'}`,
                        `0 0 4px ${isDark ? '#6366F1' : '#4F46E5'}`,
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

        {/* TRACKING ENTITIES - Desktop (Unique colors, follow standard dots) */}
        <div className="hidden md:block">
          {entities.map((entity, entityIndex) => {
            // Get position motion values for this entity
            const posX = entityIndex === 0 ? entity0X : entityIndex === 1 ? entity1X : entity2X;
            const posY = entityIndex === 0 ? entity0Y : entityIndex === 1 ? entity1Y : entity2Y;

            // Unique glitch effects for each entity
            const getEntityGlitchEffect = () => {
              switch (entityIndex) {
                case 0: // Police - aggressive red glitch
                  return {
                    filter: 'brightness(1.3) contrast(1.2)',
                    textShadow: `0 0 25px ${entity.color}, 0 0 50px ${entity.color}, 0 0 75px ${entity.color}`,
                    animation: {
                      scale: [1, 1.15, 1],
                      filter: ['brightness(1.3)', 'brightness(1.6)', 'brightness(1.3)'],
                    }
                  };
                case 1: // ISP - steady orange pulse
                  return {
                    filter: 'brightness(1.2)',
                    textShadow: `0 0 20px ${entity.color}, 0 0 40px ${entity.color}`,
                    animation: {
                      scale: [1, 1.08, 1],
                      filter: ['brightness(1.2)', 'brightness(1.4)', 'brightness(1.2)'],
                    }
                  };
                case 2: // Hacker - chaotic green interference
                  return {
                    filter: 'brightness(1.4) contrast(1.1)',
                    textShadow: `0 0 30px ${entity.color}, 0 0 60px ${entity.color}, 0 0 90px ${entity.color}`,
                    animation: {
                      scale: [1, 1.2, 1],
                      filter: ['brightness(1.4)', 'brightness(1.7)', 'brightness(1.4)'],
                    }
                  };
                default:
                  return {
                    filter: 'brightness(1.2)',
                    textShadow: `0 0 20px ${entity.color}`,
                    animation: { scale: [1, 1.1, 1] }
                  };
              }
            };

            const glitchEffect = getEntityGlitchEffect();

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
                      textShadow: glitchEffect.textShadow,
                      filter: glitchEffect.filter,
                    }}
                    animate={glitchEffect.animation}
                    transition={{
                      duration: entityIndex === 2 ? 1.0 : entityIndex === 0 ? 1.3 : 1.8, // Hacker fastest, Police fast, ISP steady
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {entity.label}
                  </motion.span>
                  {/* Unique dot effects for each entity */}
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
                      duration: entityIndex === 2 ? 0.6 : entityIndex === 0 ? 0.9 : 1.2, // Hacker fastest pulse
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Outer ring pulse with entity-specific timing */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${entity.color}` }}
                      animate={{
                        scale: [1, 3],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: entityIndex === 0 ? 1.0 : entityIndex === 1 ? 1.5 : 0.8, // Different speeds
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

        {/* TRACKING ENTITIES - Mobile (OPTIMIZED with pre-calculated keyframes) */}
        <div className="md:hidden">
          {entities.map((entity, entityIndex) => {
            // Use SAME desktop logic for mobile - pre-calculated keyframe approach
            const posX = entityIndex === 0 ? entity0X : entityIndex === 1 ? entity1X : entity2X;
            const posY = entityIndex === 0 ? entity0Y : entityIndex === 1 ? entity1Y : entity2Y;

            // Unique glitch effects for mobile (SAME as desktop but optimized)
            const getEntityGlitchEffect = () => {
              switch (entityIndex) {
                case 0: // Police - aggressive red glitch
                  return {
                    filter: 'brightness(1.3) contrast(1.2)',
                    textShadow: `0 0 20px ${entity.color}, 0 0 40px ${entity.color}, 0 0 60px ${entity.color}`,
                    animation: {
                      scale: [1, 1.15, 1],
                      filter: ['brightness(1.3)', 'brightness(1.6)', 'brightness(1.3)'],
                    }
                  };
                case 1: // ISP - steady orange pulse
                  return {
                    filter: 'brightness(1.2)',
                    textShadow: `0 0 15px ${entity.color}, 0 0 30px ${entity.color}`,
                    animation: {
                      scale: [1, 1.08, 1],
                      filter: ['brightness(1.2)', 'brightness(1.4)', 'brightness(1.2)'],
                    }
                  };
                case 2: // Hacker - chaotic green interference
                  return {
                    filter: 'brightness(1.4) contrast(1.1)',
                    textShadow: `0 0 25px ${entity.color}, 0 0 50px ${entity.color}, 0 0 75px ${entity.color}`,
                    animation: {
                      scale: [1, 1.2, 1],
                      filter: ['brightness(1.4)', 'brightness(1.7)', 'brightness(1.4)'],
                    }
                  };
                default:
                  return {
                    filter: 'brightness(1.2)',
                    textShadow: `0 0 15px ${entity.color}`,
                    animation: { scale: [1, 1.1, 1] }
                  };
              }
            };

            const glitchEffect = getEntityGlitchEffect();

            return (
              <motion.div
                key={entity.id}
                className="absolute"
                style={{
                  left: useTransform(posX, (v) => `${v}%`),
                  top: useTransform(posY, (v) => `${v}%`),
                  transform: 'translate(-50%, -50%)',
                  // CRITICAL: GPU acceleration for mobile
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  perspective: 1000,
                  WebkitPerspective: 1000,
                }}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <motion.span
                    className="text-base font-bold whitespace-nowrap"
                    style={{
                      color: entity.color,
                      textShadow: glitchEffect.textShadow,
                      filter: glitchEffect.filter,
                      // GPU acceleration
                      willChange: 'transform, filter',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    animate={glitchEffect.animation}
                    transition={{
                      duration: entityIndex === 2 ? 1.0 : entityIndex === 0 ? 1.3 : 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {entity.label}
                  </motion.span>
                  {/* Unique dot effects for each entity */}
                  <motion.div
                    className="w-2 h-2 rounded-full relative"
                    style={{ 
                      backgroundColor: entity.color,
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.5, 0.8],
                      boxShadow: [
                        `0 0 6px ${entity.color}`,
                        `0 0 15px ${entity.color}`,
                        `0 0 6px ${entity.color}`,
                      ],
                    }}
                    transition={{
                      duration: entityIndex === 2 ? 0.6 : entityIndex === 0 ? 0.9 : 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Outer ring pulse with entity-specific timing */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ 
                        border: `2px solid ${entity.color}`,
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      animate={{
                        scale: [1, 3],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: entityIndex === 0 ? 1.0 : entityIndex === 1 ? 1.5 : 0.8,
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

        {/* CTA Button - Fixed at bottom center with SINGLE LINE text on all screens */}
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20">
          <motion.button
            onClick={onScrollToPage7}
            className={`
              relative z-20 px-6 py-3 md:px-10 md:py-5 
              text-base sm:text-lg md:text-2xl lg:text-3xl font-bold 
              text-white rounded-full 
              transition-all duration-300
              whitespace-nowrap
              ${
                isDark
                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 cta-glow-indigo-dark' 
                : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 cta-glow-indigo-light'
              }
              hover:scale-105 active:scale-95
              cursor-pointer select-none
              flex items-center justify-center gap-2 md:gap-3
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shield Icon */}
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" 
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
            {/* Single line text - use mobile text for small screens */}
            <span className="block sm:hidden">{ctaButtonMobileText}</span>
            <span className="hidden sm:block">{ctaButtonText}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
