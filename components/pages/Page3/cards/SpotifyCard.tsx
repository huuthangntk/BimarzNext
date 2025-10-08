'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Language } from '@/lib/translations';

interface SpotifyCardProps {
  language: Language;
  isRTL: boolean;
}

const SpotifyCard = React.memo(({ language, isRTL }: SpotifyCardProps) => {
  const getBlockedMessage = () => {
    const messages: Record<Language, string> = {
      en: 'MUTED',
      fa: 'بی‌صدا شده',
      zh: '静音',
      ru: 'ЗАГЛУШЕНО',
      uk: 'ПРИГЛУШЕНО',
      hi: 'म्यूट',
    };
    return messages[language];
  };

  return (
    <div className="relative w-full h-full bg-[#121212] rounded-lg overflow-hidden">
      {/* Spotify header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-black flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-3">
          <Image 
            src="/icons/services/spotify.svg" 
            alt="Spotify" 
            width={24} 
            height={24}
            className="w-6 h-6"
          />
          <span className="text-[#1DB954] font-bold text-lg">Spotify</span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
          </svg>
        </div>
      </div>

      {/* Album art (grayscale when blocked) */}
      <div className="absolute top-16 left-0 right-0 px-6 pt-4">
        <motion.div 
          className="w-full aspect-square bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-2xl"
          initial={{ filter: 'grayscale(0) blur(0px)' }}
          animate={{ filter: 'grayscale(1) blur(3px)' }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </div>

      {/* Song info (blurred) */}
      <div className="absolute bottom-32 left-6 right-6">
        <motion.div
          initial={{ filter: 'blur(0px)' }}
          animate={{ filter: 'blur(5px)' }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="h-6 bg-white rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2"></div>
        </motion.div>
      </div>

      {/* Equalizer visualization (dead) */}
      <div className="absolute bottom-12 left-0 right-0 px-6">
        <div className="flex items-end justify-center gap-1 h-16">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-t"
              style={{ backgroundColor: '#1DB954' }}
              initial={{ height: `${Math.random() * 60 + 20}%` }}
              animate={{ 
                height: '8px',
                backgroundColor: '#333',
              }}
              transition={{
                delay: 1 + i * 0.02,
                duration: 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Player controls (disabled) */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent flex items-center justify-center gap-6 px-6">
        <button className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center opacity-30">
          <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>
        
        <button className="w-14 h-14 rounded-full border-3 border-gray-700 flex items-center justify-center opacity-30">
          <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
        
        <button className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center opacity-30">
          <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>

      {/* MUTED overlay */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          animate={{
            textShadow: [
              '0 0 20px rgba(29, 185, 84, 0.6)',
              '0 0 30px rgba(29, 185, 84, 0.4)',
              '0 0 20px rgba(29, 185, 84, 0.6)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="text-7xl md:text-8xl font-black mb-6 text-[#1DB954]"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getBlockedMessage()}
          </motion.div>
          
          <motion.div
            className="text-gray-500 text-sm uppercase tracking-widest"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {language === 'en' && 'Music Streaming Blocked'}
            {language === 'fa' && 'پخش موسیقی مسدود شد'}
            {language === 'zh' && '音乐流被屏蔽'}
            {language === 'ru' && 'Музыкальная трансляция заблокирована'}
            {language === 'uk' && 'Музичне мовлення заблоковано'}
            {language === 'hi' && 'संगीत स्ट्रीमिंग अवरुद्ध'}
          </motion.div>
        </motion.div>

        {/* Mute icon */}
        <motion.div
          className="absolute"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-32 h-32 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
});

SpotifyCard.displayName = 'SpotifyCard';

export default SpotifyCard;



