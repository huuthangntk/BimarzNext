'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Language } from '@/lib/translations';

interface SoundCloudCardProps {
  language: Language;
  isRTL: boolean;
}

const SoundCloudCard = React.memo(({ language, isRTL }: SoundCloudCardProps) => {
  // Translation keys - SoundCloud uses generic service.blocked messages
  const getBlockedMessage = () => {
    const messages: Record<Language, string> = {
      English: 'ACCESS DENIED',
      Farsi: 'دسترسی مسدود شده',
      Chinese: '访问被拒绝',
      Russian: 'ДОСТУП ЗАПРЕЩЕН',
      Ukrainian: 'ДОСТУП ЗАБОРОНЕНО',
      Hindi: 'पहुँच अस्वीकृत',
    };
    return messages[language];
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden">
      {/* SoundCloud branded header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#FF5500] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image 
            src="/icons/services/soundcloud.svg" 
            alt="SoundCloud" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          <span className="text-white font-bold text-lg">SoundCloud</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Menu dots */}
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Waveform visualization (blocked state) */}
      <div className="absolute top-20 left-0 right-0 flex items-center justify-center gap-1 px-6 py-8">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-gray-700 rounded-full"
            style={{ height: `${Math.random() * 60 + 20}px` }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Player controls (disabled state) */}
      <div className="absolute bottom-20 left-0 right-0 px-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 text-sm">0:00</span>
          <div className="flex-1 mx-4 h-1 bg-gray-800 rounded-full">
            <div className="w-0 h-full bg-gray-700 rounded-full"></div>
          </div>
          <span className="text-gray-600 text-sm">0:00</span>
        </div>
        
        {/* Control buttons (all disabled) */}
        <div className="flex items-center justify-center gap-6">
          <button className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center opacity-30">
            <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm10 0l-6 6 6 6z"/>
            </svg>
          </button>
          
          <button className="w-14 h-14 rounded-full border-3 border-gray-700 flex items-center justify-center opacity-30">
            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          
          <button className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center opacity-30">
            <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 18h2V6h-2zm-10 0l6-6-6-6z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Track info (blocked) */}
      <div className="absolute bottom-36 left-6 right-6">
        <div className="h-4 bg-gray-800 rounded mb-2 w-3/4"></div>
        <div className="h-3 bg-gray-800 rounded w-1/2"></div>
      </div>

      {/* BLOCKED overlay with glitch effect */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-center"
          animate={{
            textShadow: [
              '0 0 10px rgba(255, 85, 0, 0.5)',
              '2px 2px 10px rgba(255, 0, 0, 0.5)',
              '-2px -2px 10px rgba(255, 85, 0, 0.5)',
              '0 0 10px rgba(255, 85, 0, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="text-5xl md:text-6xl font-black mb-4"
            style={{
              background: 'linear-gradient(45deg, #FF5500, #FF0000, #FF5500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {getBlockedMessage()}
          </motion.div>
          
          <motion.div
            className="text-gray-400 text-sm uppercase tracking-wider"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {language === 'English' && 'Music Streaming Blocked'}
            {language === 'Farsi' && 'پخش موسیقی مسدود شد'}
            {language === 'Chinese' && '音乐流被屏蔽'}
            {language === 'Russian' && 'Музыкальная трансляция заблокирована'}
            {language === 'Ukrainian' && 'Музичне мовлення заблоковано'}
            {language === 'Hindi' && 'संगीत स्ट्रीमिंग अवरुद्ध'}
          </motion.div>
        </motion.div>

        {/* Diagonal censorship bars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full w-2 bg-[#FF5500]"
              style={{
                left: `${i * 15}%`,
                transform: 'rotate(45deg)',
                transformOrigin: 'center',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleY: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Glitch scanlines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 85, 0, 0.03) 2px, rgba(255, 85, 0, 0.03) 4px)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
});

SoundCloudCard.displayName = 'SoundCloudCard';

export default SoundCloudCard;



