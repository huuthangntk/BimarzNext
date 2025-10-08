'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Page4Props {
  isActive?: boolean;
}

export default function Page4({ isActive = true }: Page4Props) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-orange-900">
      {/* Receding Oppressive Elements */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%)',
            'radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.4) 100%)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Emerging Warm Light Source */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-64 lg:h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, rgba(251, 191, 36, 0.3) 50%, transparent 100%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Light Path Extending */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] lg:h-1 w-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.5), transparent)',
        }}
        animate={{
          width: ['0%', '80%'],
          opacity: [0, 1],
        }}
        transition={{
          duration: 2,
          delay: 1,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />

      {/* Vertical Light Path */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] lg:w-1 h-0"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(245, 158, 11, 0.5), transparent)',
        }}
        animate={{
          height: ['0%', '80%'],
          opacity: [0, 1],
        }}
        transition={{
          duration: 2,
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 lg:px-20">
        {/* Question Mark */}
        <motion.div
          className="text-7xl md:text-9xl lg:text-[96px] font-bold mb-8 lg:mb-16"
          style={{
            background: 'linear-gradient(135deg, #9CA3AF 0%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            scale: [0.95, 1.05, 0.95],
            filter: [
              'drop-shadow(0 0 20px rgba(245, 158, 11, 0.3))',
              'drop-shadow(0 0 40px rgba(245, 158, 11, 0.6))',
              'drop-shadow(0 0 20px rgba(245, 158, 11, 0.3))',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ?
        </motion.div>

        {/* "What If..." Text */}
        <motion.div
          className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {['W', 'H', 'A', 'T', ' ', 'I', 'F', '.', '.', '.'].map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              style={{
                background: letter !== ' ' ? 'linear-gradient(135deg, #D1D5DB 0%, #FBBF24 100%)' : 'none',
                WebkitBackgroundClip: letter !== ' ' ? 'text' : 'none',
                WebkitTextFillColor: letter !== ' ' ? 'transparent' : 'inherit',
                backgroundClip: letter !== ' ' ? 'text' : 'none',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtle particles of hope */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 lg:w-2 lg:h-2 rounded-full bg-yellow-400"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
}

