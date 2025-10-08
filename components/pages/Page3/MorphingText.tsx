'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '@/lib/translations';

interface MorphingTextProps {
  language: Language;
  isRTL: boolean;
}

const MorphingText: React.FC<MorphingTextProps> = ({ language, isRTL }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Words cycle in all languages
  const words: Record<Language, string[]> = {
    en: ['BLOCKED', 'CENSORED', 'RESTRICTED'],
    fa: ['مسدود شده', 'سانسور شده', 'محدود شده'],
    zh: ['已屏蔽', '已审查', '受限'],
    ru: ['ЗАБЛОКИРОВАНО', 'ЦЕНЗУРА', 'ОГРАНИЧЕНО'],
    uk: ['ЗАБЛОКОВАНО', 'ЦЕНЗУРА', 'ОБМЕЖЕНО'],
    hi: ['अवरुद्ध', 'सेंसर किया गया', 'प्रतिबंधित'],
  };

  const currentWords = words[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentWords.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [currentWords.length]);

  return (
    <div 
      className="relative flex items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px]"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ 
            opacity: 0,
            filter: 'blur(20px)',
            scale: 0.8,
            rotateX: -90,
          }}
          animate={{ 
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            rotateX: 0,
          }}
          exit={{ 
            opacity: 0,
            filter: 'blur(20px)',
            scale: 1.2,
            rotateX: 90,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // Custom easing for smooth morph
          }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-center leading-none"
            style={{
              background: 'linear-gradient(135deg, #ff0000 0%, #ff4444 25%, #ff0000 50%, #cc0000 75%, #ff0000 100%)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(255, 0, 0, 0.5)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {currentWords[currentIndex]}
          </motion.h1>

          {/* Glitch overlay effects */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(255,0,0,0.3) 0%, transparent 50%, rgba(0,255,255,0.3) 100%)',
                mixBlendMode: 'screen',
              }}
            />
          </motion.div>

          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            style={{
              filter: 'blur(30px)',
              background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.3) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,0,0,0.1) 4px, rgba(255,0,0,0.1) 8px)',
        }}
        animate={{
          y: ['0%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default MorphingText;



