'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Language } from '@/lib/translations';

interface InstagramCardProps {
  language: Language;
  isRTL: boolean;
}

const InstagramCard = React.memo(({ language, isRTL }: InstagramCardProps) => {
  const getBlockedMessage = () => {
    const messages: Record<Language, string> = {
      en: 'RESTRICTED',
      fa: 'محدود شده',
      zh: '受限',
      ru: 'ОГРАНИЧЕНО',
      uk: 'ОБМЕЖЕНО',
      hi: 'प्रतिबंधित',
    };
    return messages[language];
  };

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Instagram header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-black border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image 
            src="/icons/services/instagram.svg" 
            alt="Instagram" 
            width={24} 
            height={24}
            className="w-6 h-6"
          />
          <span className="text-white font-semibold text-lg">Instagram</span>
        </div>
        <div className="flex items-center gap-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>

      {/* 3-column grid of photos with human SVGs */}
      <div className="absolute top-16 left-0 right-0 bottom-0 p-1">
        <div className="grid grid-cols-3 gap-1 h-full">
          {[1, 2, 3, 1, 2, 3, 1, 2, 3].map((poseNum, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center"
              initial={{ filter: 'blur(0px)' }}
              animate={{
                filter: ['blur(0px)', 'blur(0px)', 'blur(20px)'],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                times: [0, 0.6, 1],
              }}
            >
              <Image 
                src={`/icons/humans/pose-${poseNum}.svg`}
                alt={`Person ${poseNum}`}
                width={80}
                height={80}
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* RESTRICTED overlay appears gradually */}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="text-center relative z-10"
          animate={{
            textShadow: [
              '0 0 20px rgba(228, 64, 95, 0.8)',
              '2px 2px 20px rgba(228, 64, 95, 0.6)',
              '-2px -2px 20px rgba(228, 64, 95, 0.8)',
              '0 0 20px rgba(228, 64, 95, 0.8)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="text-6xl md:text-7xl font-black mb-4"
            style={{
              background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #F58529)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
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
            {language === 'en' && 'Content Not Available'}
            {language === 'fa' && 'محتوا در دسترس نیست'}
            {language === 'zh' && '内容不可用'}
            {language === 'ru' && 'Контент недоступен'}
            {language === 'uk' && 'Контент недоступний'}
            {language === 'hi' && 'सामग्री उपलब्ध नहीं'}
          </motion.div>
        </motion.div>

        {/* Instagram-style gradient bars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-1"
              style={{
                top: `${(i + 1) * 16.67}%`,
                background: 'linear-gradient(90deg, #F58529, #DD2A7B, #8134AF)',
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scaleX: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
});

InstagramCard.displayName = 'InstagramCard';

export default InstagramCard;



