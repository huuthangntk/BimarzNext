'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';

const ORBITAL_WORDS = ['TRANSPARENT', 'COMMUNITY', 'VERIFIED', 'TRUSTWORTHY'];

const ICONS = [
  { file: '/v2rayV.png', label: 'V2Ray V', isPng: true },
  { file: '/v2rayng.svg', label: 'V2RayNG', isPng: false },
  { file: '/v2rayN.svg', label: 'V2RayN', isPng: false },
  { file: '/v2rayA.png', label: 'V2RayA', isPng: true },
  { file: '/Sing-box.svg', label: 'Sing-box', isPng: false },
  { file: '/qv2ray.svg', label: 'Qv2ray', isPng: false },
  { file: '/hiddify.svg', label: 'Hiddify', isPng: false },
];

interface Page6Props {
  isActive?: boolean;
}

export default function Page6({ isActive = true }: Page6Props) {
  return (
    <motion.div 
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-teal-950 via-emerald-900 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glass Cathedral with Refractions */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full opacity-20"
          style={{
            background: `linear-gradient(${45 + i * 36}deg, 
              transparent 0%, 
              rgba(16, 185, 129, 0.2) 40%, 
              rgba(6, 182, 212, 0.2) 50%, 
              rgba(139, 92, 246, 0.2) 60%, 
              transparent 100%)`,
            transform: `rotate(${i * 15}deg)`,
          }}
          animate={{
            rotate: [i * 15, i * 15 + 360],
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Light Beam Intersections */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute w-1 h-full"
          style={{
            left: `${30 + i * 20}%`,
            background: 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.3) 50%, transparent 100%)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Prism Effects */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-lg hidden lg:block"
        style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))',
          backdropFilter: 'blur(10px)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 lg:px-20 py-24 lg:py-32">
        {/* Typography Section */}
        <div className="text-center mb-12 lg:mb-16 relative">
          {/* Hero Text */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {['OPEN', ' ', 'SOURCE'].map((word, wordIndex) => (
              <span key={wordIndex}>
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (wordIndex * 4 + letterIndex) * 0.1 }}
                    style={{
                      background: `linear-gradient(135deg, 
                        hsl(${(wordIndex * 60 + letterIndex * 30) % 360}, 70%, 60%), 
                        hsl(${((wordIndex * 60 + letterIndex * 30) + 60) % 360}, 70%, 60%))`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Orbital Words - Desktop */}
          <div className="hidden lg:block">
            {ORBITAL_WORDS.map((word, index) => {
              const angle = (index / ORBITAL_WORDS.length) * 360;
              const radius = 180;

              return (
                <motion.div
                  key={word}
                  className="absolute text-lg font-semibold text-emerald-300"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * radius,
                    y: Math.sin((angle * Math.PI) / 180) * radius,
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {word}
                </motion.div>
              );
            })}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ left: 0, top: 0 }}>
              {ORBITAL_WORDS.map((_, index) => {
                const angle = (index / ORBITAL_WORDS.length) * 360;
                const nextAngle = ((index + 1) / ORBITAL_WORDS.length) * 360;
                const radius = 180;
                
                const x1 = Math.cos((angle * Math.PI) / 180) * radius;
                const y1 = Math.sin((angle * Math.PI) / 180) * radius;
                const x2 = Math.cos((nextAngle * Math.PI) / 180) * radius;
                const y2 = Math.sin((nextAngle * Math.PI) / 180) * radius;

                return (
                  <motion.line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x1}px)`}
                    y2={`calc(50% + ${y1}px)`}
                    stroke="rgba(16, 185, 129, 0.2)"
                    strokeWidth="1"
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.2,
                      repeat: Infinity,
                    }}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Icon Cloud */}
        <div className="w-full max-w-5xl">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-8">
            {ICONS.map((icon, index) => (
              <motion.div
                key={icon.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <GlassCard className="p-6 lg:p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      delay: index * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Image
                      src={icon.file}
                      alt={icon.label}
                      width={64}
                      height={64}
                      className="mb-3"
                    />
                  </motion.div>
                  <p className="text-xs lg:text-sm text-center text-[var(--text-secondary)]">
                    {icon.label}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {ICONS.slice(0, 6).map((icon, index) => (
              <motion.div
                key={icon.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-4 flex flex-col items-center justify-center">
                  <Image
                    src={icon.file}
                    alt={icon.label}
                    width={48}
                    height={48}
                    className="mb-2"
                  />
                  <p className="text-xs text-center text-[var(--text-secondary)]">
                    {icon.label}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

