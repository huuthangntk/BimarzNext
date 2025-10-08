'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ATTEMPTED_WORDS = ['FREEDOM', 'ACCESS', 'CONNECT', 'EXPLORE'];
const STAMPS = ['BLOCKED', 'DENIED', 'RESTRICTED', 'FORBIDDEN'];

interface Page3Props {
  isActive?: boolean;
}

export default function Page3({ isActive = true }: Page3Props) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-purple-950 via-gray-900 to-slate-900">
      {/* Foggy Overlapping Rectangles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gray-800/20"
          style={{
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 400 + 300}px`,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
            filter: 'blur(2px)',
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Distant Freedom (Out of Reach) */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* Heavy Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-5 lg:px-20">
        <div className="w-full max-w-4xl">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side: Attempted Words */}
            <div className="space-y-8">
              {ATTEMPTED_WORDS.map((word, index) => (
                <div key={word} className="relative">
                  <motion.h2
                    className="text-3xl lg:text-5xl font-bold text-white/60"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    {word}
                  </motion.h2>
                  
                  {/* Black Censor Bar */}
                  <motion.div
                    className="absolute inset-0 bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: index * 0.3 + 0.5, duration: 0.3 }}
                  />

                  {/* Pixelation Effect */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: index * 0.3 + 0.2, duration: 0.5 }}
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px),
                        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)
                      `,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Right Side: Stamps */}
            <div className="space-y-8">
              {STAMPS.map((stamp, index) => (
                <motion.div
                  key={stamp}
                  className="relative"
                  initial={{ opacity: 0, scale: 0, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 5 }}
                  transition={{ delay: index * 0.3 + 1, duration: 0.3, type: 'spring' }}
                >
                  <div className="text-4xl lg:text-5xl font-bold text-red-600 border-4 border-red-600 px-6 py-3 inline-block transform -rotate-3">
                    {stamp}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-12">
            {ATTEMPTED_WORDS.slice(0, 2).map((word, index) => (
              <div key={word} className="relative">
                <motion.h2
                  className="text-2xl font-bold text-white/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: index * 0.5 }}
                >
                  {word}
                </motion.h2>
                
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.5 + 0.3, duration: 0.3 }}
                />

                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.5 + 0.8, type: 'spring' }}
                >
                  <div className="text-2xl font-bold text-red-600 border-4 border-red-600 px-4 py-2 inline-block">
                    {STAMPS[index]}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

