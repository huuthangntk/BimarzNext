'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Loading stages with contextual VPN messages
const loadingStages = [
  { progress: 0, message: 'Initializing secure connection...' },
  { progress: 20, message: 'Verifying encryption protocols...' },
  { progress: 40, message: 'Establishing encrypted tunnel...' },
  { progress: 60, message: 'Securing your data stream...' },
  { progress: 80, message: 'Finalizing connection...' },
  { progress: 100, message: 'Connection secured!' },
];

// Memoized particle component for performance
const Particle = React.memo(({ index }: { index: number }) => {
  const angle = (index / 12) * Math.PI * 2;
  const radius = 100;
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-red-400 rounded-full"
      style={{
        left: '50%',
        top: '50%',
        willChange: 'transform, opacity',
      }}
      animate={{
        x: [
          0,
          Math.cos(angle) * radius,
          Math.cos(angle + Math.PI) * radius,
          0,
        ],
        y: [
          0,
          Math.sin(angle) * radius,
          Math.sin(angle + Math.PI) * radius,
          0,
        ],
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1.5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: index * 0.15,
        ease: 'easeInOut',
      }}
    />
  );
});

Particle.displayName = 'Particle';

// Memoized floating icon component
const FloatingIcon = React.memo(
  ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.1, 1],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
);

FloatingIcon.displayName = 'FloatingIcon';

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Particle positions (memoized for performance)
  const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  // Liquid blob animation paths (memoized)
  const blobPaths = useMemo(
    () => [
      'M 400,200 C 600,100 800,100 1000,200 S 1200,400 1000,500 S 400,400 400,200 Z',
      'M 400,200 C 500,50 900,50 1000,200 S 1100,450 1000,500 S 350,450 400,200 Z',
      'M 400,200 C 650,150 750,150 1000,200 S 1150,350 1000,500 S 450,350 400,200 Z',
    ],
    []
  );

  // Initialize and show content after brief delay
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate realistic loading with stages
  useEffect(() => {
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      // Variable speed for more realistic loading
      const increment = Math.random() * 8 + 5;
      currentProgress = Math.min(currentProgress + increment, 100);
      
      setProgress(currentProgress);

      // Update current stage
      const stage = loadingStages.findIndex(
        (s) => currentProgress <= s.progress
      );
      setCurrentStage(Math.max(0, stage));

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          onLoadingComplete();
        }, 800);
      }
    }, 180);

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-red-950 via-gray-900 to-black flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Bimarz VPN"
    >
      {/* Animated liquid morphing blobs background */}
      {!prefersReducedMotion && (
        <>
          <motion.svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 1400 700"
            preserveAspectRatio="xMidYMid slice"
          >
            <motion.path
              d={blobPaths[0]}
              fill="url(#liquidGradient)"
              animate={{
                d: blobPaths,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              style={{ willChange: 'auto' }}
            />
            <defs>
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#dc2626" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Particle system around logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particles.map((i) => (
              <Particle key={i} index={i} />
            ))}
          </div>
        </>
      )}

      {/* Main content container with glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={showContent ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="relative z-10 flex flex-col items-center px-4 sm:px-6"
      >
        {/* Logo with advanced effects */}
        <motion.div
          className="relative mb-6 sm:mb-8 md:mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            type: 'spring',
            stiffness: 80,
            damping: 15,
          }}
        >
          {/* Glowing ring behind logo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 30px 10px rgba(239, 68, 68, 0.4)',
                '0 0 60px 20px rgba(239, 68, 68, 0.6)',
                '0 0 30px 10px rgba(239, 68, 68, 0.4)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ willChange: 'box-shadow' }}
          />

          {/* Logo */}
          <motion.div
            animate={
              !prefersReducedMotion
                ? {
                    filter: [
                      'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
                      'drop-shadow(0 0 40px rgba(239, 68, 68, 1))',
                      'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
                    ],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ willChange: 'filter' }}
          >
            <Image
              src="/logo.png"
              alt="Bimarz VPN"
              width={256}
              height={256}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 relative z-10"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Floating VPN security icons */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <FloatingIcon delay={0}>
              <div className="absolute left-1/4 top-1/3 text-red-400 text-4xl opacity-40">
                🛡️
              </div>
            </FloatingIcon>
            <FloatingIcon delay={1}>
              <div className="absolute right-1/4 top-1/4 text-red-400 text-4xl opacity-40">
                🔒
              </div>
            </FloatingIcon>
            <FloatingIcon delay={2}>
              <div className="absolute left-1/3 bottom-1/3 text-red-400 text-4xl opacity-40">
                🌐
              </div>
            </FloatingIcon>
          </div>
        )}

        {/* Loading stage message */}
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-wide">
            {loadingStages[currentStage]?.message || 'Loading...'}
          </h2>
        </motion.div>

        {/* Glassmorphic progress bar */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-4">
          <div className="relative h-3 sm:h-4 bg-gray-900/50 backdrop-blur-sm rounded-full overflow-hidden border border-gray-700/50">
            {/* Progress fill with gradient */}
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full relative"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ willChange: 'width' }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ willChange: 'transform' }}
              />
            </motion.div>

            {/* Progress glow */}
            <motion.div
              className="absolute inset-0 bg-red-500/20 blur-md"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Progress percentage with glassmorphism */}
          <motion.div
            className="mt-3 sm:mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-400 tabular-nums">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </div>

        {/* Subtle tip text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
          className="text-gray-400 text-xs sm:text-sm md:text-base text-center max-w-xs sm:max-w-sm md:max-w-md px-4"
        >
          Your connection will be encrypted end-to-end
        </motion.p>
      </motion.div>

      {/* Ambient scanning line (reduced motion friendly) */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"
        animate={{
          top: prefersReducedMotion ? '50%' : ['0%', '100%'],
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 4,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: 'linear',
        }}
        style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
      />

      {/* Corner accent elements (fully responsive) */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 border-l-2 border-t-2 border-red-500/50"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 border-r-2 border-b-2 border-red-500/50"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          />
        </>
      )}
    </motion.div>
  );
}
