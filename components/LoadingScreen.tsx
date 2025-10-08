'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  // Glitch effect for logo
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Simulate loading progress and reveal logo
  useEffect(() => {
    // Show logo after brief delay
    const logoTimer = setTimeout(() => setShowLogo(true), 300);

    // Simulate loading
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15 + 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(progressInterval);
        
        // Complete loading after progress reaches 100%
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      } else {
        setProgress(currentProgress);
      }
    }, 150);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-red-950 via-gray-900 to-black flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background streaks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] w-full bg-red-500 opacity-20"
          style={{
            top: `${i * 16.66}%`,
            transform: `rotate(-45deg)`,
          }}
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}

      {/* Logo with glitch effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={showLogo ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, type: 'spring', stiffness: 150 }}
        className="relative mb-12"
      >
        <motion.div
          className="relative"
          style={{
            transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
          }}
          animate={{
            filter: [
              'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
              'drop-shadow(0 0 40px rgba(239, 68, 68, 1))',
              'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/logo.png"
            alt="Bimarz VPN"
            width={256}
            height={256}
            className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
            priority
          />
          
          {/* Glitch overlay layers */}
          <motion.div
            className="absolute inset-0"
            style={{
              mixBlendMode: 'screen',
              opacity: 0.3,
            }}
            animate={{
              x: [0, -4, 4, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <Image
              src="/logo.png"
              alt=""
              width={256}
              height={256}
              className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
              style={{ filter: 'hue-rotate(180deg)' }}
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Loading text with glitch */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative"
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
          style={{
            textShadow: `
              ${glitchOffset.x}px ${glitchOffset.y}px 0 rgba(239, 68, 68, 0.8),
              ${-glitchOffset.x}px ${-glitchOffset.y}px 0 rgba(59, 130, 246, 0.8)
            `,
          }}
          animate={{
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Loading...
        </motion.h2>
      </motion.div>

      {/* Progress bar */}
      <div className="w-64 md:w-80 lg:w-96 h-2 bg-gray-800 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        
        {/* Glowing effect on progress bar */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Progress percentage */}
      <motion.p
        className="text-red-400 text-xl md:text-2xl font-bold mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {Math.round(progress)}%
      </motion.p>

      {/* Pulsing red vignette */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}
