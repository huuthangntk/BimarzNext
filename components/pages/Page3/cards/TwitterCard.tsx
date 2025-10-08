'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Language } from '@/lib/translations';

interface TwitterCardProps {
  language: Language;
  isRTL: boolean;
}

const TwitterCard = React.memo(({ language, isRTL }: TwitterCardProps) => {
  // Translation keys - using generic blocked messages
  const getBlockedMessage = () => {
    const messages: Record<Language, string> = {
      English: 'CENSORED',
      Farsi: 'سانسور شده',
      Chinese: '已审查',
      Russian: 'ЦЕНЗУРА',
      Ukrainian: 'ЦЕНЗУРА',
      Hindi: 'सेंसर किया गया',
    };
    return messages[language];
  };

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Twitter/X header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-black border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Image 
            src="/icons/services/twitter.svg" 
            alt="X" 
            width={24} 
            height={24}
            className="w-6 h-6"
          />
          <span className="text-white font-bold text-lg">𝕏</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full hover:bg-gray-900 flex items-center justify-center opacity-50">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.5 12c0-.414-.336-.75-.75-.75h-13.5c-.414 0-.75.336-.75.75s.336.75.75.75h13.5c.414 0 .75-.336.75-.75z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Tweet feed (blocked state) */}
      <div className="absolute top-16 left-0 right-0 bottom-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="border-b border-gray-800 px-4 py-4"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            {/* Tweet header */}
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-800"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-800 rounded w-32 mb-2"></div>
                <div className="h-2 bg-gray-800 rounded w-20"></div>
              </div>
            </div>
            
            {/* Tweet content (blurred) */}
            <div className="ml-13 space-y-2">
              <div className="h-3 bg-gray-800 rounded w-full blur-sm"></div>
              <div className="h-3 bg-gray-800 rounded w-4/5 blur-sm"></div>
              <div className="h-3 bg-gray-800 rounded w-3/4 blur-sm"></div>
            </div>
            
            {/* Tweet actions */}
            <div className="ml-13 mt-3 flex items-center gap-6 opacity-30">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs text-gray-700">0</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-xs text-gray-700">0</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs text-gray-700">0</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CENSORED overlay with dramatic effect */}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-center relative z-10"
          animate={{
            textShadow: [
              '0 0 20px rgba(255, 0, 0, 0.5)',
              '3px 3px 20px rgba(0, 255, 255, 0.5)',
              '-3px -3px 20px rgba(255, 0, 255, 0.5)',
              '0 0 20px rgba(255, 0, 0, 0.5)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="text-6xl md:text-7xl font-black mb-4 text-white"
            animate={{
              scale: [1, 1.03, 1],
              filter: [
                'drop-shadow(0 0 10px rgba(255,0,0,0.5))',
                'drop-shadow(3px 3px 10px rgba(0,255,255,0.5))',
                'drop-shadow(-3px -3px 10px rgba(255,0,255,0.5))',
                'drop-shadow(0 0 10px rgba(255,0,0,0.5))',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getBlockedMessage()}
          </motion.div>
          
          <motion.div
            className="text-gray-500 text-sm uppercase tracking-widest"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {language === 'English' && 'Content Not Available'}
            {language === 'Farsi' && 'محتوا در دسترس نیست'}
            {language === 'Chinese' && '内容不可用'}
            {language === 'Russian' && 'Контент недоступен'}
            {language === 'Ukrainian' && 'Контент недоступний'}
            {language === 'Hindi' && 'सामग्री उपलब्ध नहीं'}
          </motion.div>
        </motion.div>

        {/* Censorship bars with glitch effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-1 bg-white"
              style={{
                top: `${i * 8.33}%`,
              }}
              animate={{
                opacity: [0.05, 0.2, 0.05],
                scaleX: [1, 0.95, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* RGB split glitch effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <div className="absolute inset-0" style={{ 
            background: 'linear-gradient(90deg, rgba(255,0,0,0.2) 0%, transparent 50%, rgba(0,255,255,0.2) 100%)',
            mixBlendMode: 'screen',
          }}></div>
        </motion.div>

        {/* Static noise overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
});

TwitterCard.displayName = 'TwitterCard';

export default TwitterCard;



