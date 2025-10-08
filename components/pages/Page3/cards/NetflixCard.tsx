'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Language } from '@/lib/translations';

interface NetflixCardProps {
  language: Language;
  isRTL: boolean;
}

const NetflixCard = React.memo(({ language, isRTL }: NetflixCardProps) => {
  const getBlockedMessage = () => {
    const messages: Record<Language, string> = {
      English: 'REGION BLOCKED',
      Farsi: 'منطقه مسدود شده',
      Chinese: '地区被封锁',
      Russian: 'РЕГИОН ЗАБЛОКИРОВАН',
      Ukrainian: 'РЕГІОН ЗАБЛОКОВАНО',
      Hindi: 'क्षेत्र अवरुद्ध',
    };
    return messages[language];
  };

  return (
    <div className="relative w-full h-full bg-[#141414] rounded-lg overflow-hidden">
      {/* Netflix header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-black flex items-center justify-between px-6 z-10">
        <Image 
          src="/icons/services/netflix.svg" 
          alt="Netflix" 
          width={90} 
          height={24}
          className="h-6 w-auto"
        />
        <div className="flex items-center gap-4">
          <svg className="w-6 h-6 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"/>
          </svg>
        </div>
      </div>

      {/* Fake video player with error */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#141414]">
        {/* Initial loading spinner (brief) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
          />
        </motion.div>

        {/* Error screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col items-center justify-center p-8 text-center"
        >
          {/* Error icon */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-24 h-24 text-red-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>

          {/* Error message */}
          <motion.div
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            animate={{
              textShadow: [
                '0 0 20px rgba(229, 9, 20, 0.8)',
                '0 0 30px rgba(229, 9, 20, 0.6)',
                '0 0 20px rgba(229, 9, 20, 0.8)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getBlockedMessage()}
          </motion.div>

          <p className="text-gray-400 text-base mb-6 max-w-md">
            {language === 'English' && 'This content is not available in your region'}
            {language === 'Farsi' && 'این محتوا در منطقه شما در دسترس نیست'}
            {language === 'Chinese' && '此内容在您所在地区不可用'}
            {language === 'Russian' && 'Этот контент недоступен в вашем регионе'}
            {language === 'Ukrainian' && 'Цей контент недоступний у вашому регіоні'}
            {language === 'Hindi' && 'यह सामग्री आपके क्षेत्र में उपलब्ध नहीं है'}
          </p>

          {/* Error code */}
          <motion.div
            className="mt-4 px-6 py-2 bg-red-600/20 border border-red-600 rounded text-red-500 text-sm font-mono"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ERROR CODE: NW-4-7
          </motion.div>
        </motion.div>
      </div>

      {/* Dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
        animate={{
          y: ['0%', '100%'],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
});

NetflixCard.displayName = 'NetflixCard';

export default NetflixCard;



