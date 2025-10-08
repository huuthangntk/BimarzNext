'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';

const BUILDING_WORDS = ['ENCRYPT', 'TUNNEL', 'PROTECT', 'PRIVATE'];

interface Page5Props {
  isActive?: boolean;
}

export default function Page5({ isActive = true }: Page5Props) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce particles on mobile for better performance
  const PARTICLE_COUNT = isMobile ? 8 : 20;
  const ANIMATION_DURATION = isMobile ? 3 : 2;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950 to-teal-900">
      {/* Flowing Aurora Waves */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
            'linear-gradient(225deg, rgba(16, 185, 129, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
            'linear-gradient(315deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
            'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Multiple Aurora Layers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 opacity-40"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: `linear-gradient(${90 + i * 45}deg, 
              transparent 0%, 
              rgba(6, 182, 212, 0.3) 25%, 
              rgba(139, 92, 246, 0.3) 50%, 
              rgba(16, 185, 129, 0.3) 75%, 
              transparent 100%)`,
            backgroundSize: '200% 200%',
          }}
        />
      ))}

      {/* Protective Dome Effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-5 lg:px-20">
        <div className="w-full max-w-4xl">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12">
            {BUILDING_WORDS.map((word, index) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.5,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                <GlassCard className="p-8">
                  <h2
                    className="text-3xl lg:text-5xl font-bold tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, #F1F5F9 0%, #22D3EE 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {word}
                  </h2>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col gap-6">
            {BUILDING_WORDS.map((word, index) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.3,
                  duration: 0.5,
                }}
              >
                <GlassCard className="p-6">
                  <h2
                    className="text-2xl font-bold tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, #F1F5F9 0%, #22D3EE 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {word}
                  </h2>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Optimized shimmer particles - reduced count on mobile */}
          {isActive && [...Array(PARTICLE_COUNT)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400 will-change-transform"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: ANIMATION_DURATION,
                delay: Math.random() * 3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

