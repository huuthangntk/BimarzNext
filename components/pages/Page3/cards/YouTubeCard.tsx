'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Language } from '@/lib/translations';

interface YouTubeCardProps {
  language: Language;
  isRTL: boolean;
}

const YouTubeCard = React.memo(({ language, isRTL }: YouTubeCardProps) => {
  const getBlockedMessage = () => {
    const messages: Record<Language, string> = {
      en: 'NO SIGNAL',
      fa: 'بدون سیگنال',
      zh: '无信号',
      ru: 'НЕТ СИГНАЛА',
      uk: 'НЕМАЄ СИГНАЛУ',
      hi: 'कोई सिग्नल नहीं',
    };
    return messages[language];
  };

  return (
    <div className="relative w-full h-full bg-[#0F0F0F] rounded-lg overflow-hidden">
      {/* YouTube header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-black flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-3">
          <Image 
            src="/icons/services/youtube.svg" 
            alt="YouTube" 
            width={28} 
            height={20}
            className="h-5 w-auto"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* TV Static Effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: '#000',
        }}
      >
        {/* Animated static noise */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 0.1, repeat: Infinity }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            mixBlendMode: 'screen',
          }}
        />

        {/* Horizontal scan lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 6px)',
          }}
          animate={{
            y: ['0%', '100%'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* NO SIGNAL message */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="text-center"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="text-6xl md:text-7xl font-black mb-6 text-white"
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 0, 0, 0.8)',
                '0 0 40px rgba(255, 0, 0, 0.6)',
                '0 0 20px rgba(255, 0, 0, 0.8)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getBlockedMessage()}
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center gap-2"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-red-600 text-sm uppercase tracking-widest font-bold">
              {language === 'en' && 'Connection Lost'}
              {language === 'fa' && 'اتصال قطع شد'}
              {language === 'zh' && '连接丢失'}
              {language === 'ru' && 'Соединение потеряно'}
              {language === 'uk' && 'З\'єднання втрачено'}
              {language === 'hi' && 'कनेक्शन खो गया'}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RGB Distortion */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen z-10"
        animate={{
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(90deg, rgba(255,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,255,255,0.3) 100%)',
        }}></div>
      </motion.div>
    </div>
  );
});

YouTubeCard.displayName = 'YouTubeCard';

export default YouTubeCard;



