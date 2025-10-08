'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { Language } from '@/lib/translations';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

interface FacebookCardProps {
  language: Language;
  isRTL: boolean;
}

const FacebookCard = React.memo(({ language, isRTL }: FacebookCardProps) => {
  const [isBlocked, setIsBlocked] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsBlocked(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const getPostText = () => {
    const texts: Record<Language, string> = {
      English: 'Just shared my thoughts on freedom and democracy...',
      Farsi: 'نظراتم درباره آزادی و دموکراسی را به اشتراک گذاشتم...',
      Chinese: '刚刚分享了我对自由和民主的看法...',
      Russian: 'Поделился своими мыслями о свободе и демократии...',
      Ukrainian: 'Поділився своїми думками про свободу та демократію...',
      Hindi: 'स्वतंत्रता और लोकतंत्र पर अपने विचार साझा किए...',
    };
    return texts[language];
  };

  const getBlockedMessage = () => {
    const messages: Record<Language, string> = {
      English: 'POST BLOCKED',
      Farsi: 'پست مسدود شد',
      Chinese: '帖子被屏蔽',
      Russian: 'ПОСТ ЗАБЛОКИРОВАН',
      Ukrainian: 'ПОСТ ЗАБЛОКОВАНО',
      Hindi: 'पोस्ट ब्लॉक की गई',
    };
    return messages[language];
  };

  return (
    <div className="relative w-full h-full bg-[#18191A] rounded-lg overflow-hidden">
      {/* Facebook Header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-[#242526] border-b border-[#3E4042] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image 
            src="/icons/services/facebook.svg" 
            alt="Facebook" 
            width={28} 
            height={28}
            className="w-7 h-7"
          />
          <span className="text-white font-semibold text-base">facebook</span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-[#B0B3B8]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          <svg className="w-5 h-5 text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      {/* Post Content */}
      <div className="absolute top-14 left-0 right-0 bottom-0 p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
          <div>
            <div className="text-white font-semibold text-sm">User Name</div>
            <div className="text-[#B0B3B8] text-xs flex items-center gap-1">
              2h • 
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Post Text */}
        <motion.div
          className="text-[#E4E6EB] text-sm leading-relaxed mb-4"
          animate={isBlocked ? { filter: 'blur(8px)', opacity: 0.5 } : {}}
          transition={{ duration: 0.8 }}
        >
          {getPostText()}
        </motion.div>

        {/* Engagement Bar */}
        <div className="border-t border-b border-[#3E4042] py-2 mb-2">
          <div className="flex items-center justify-between text-[#B0B3B8] text-xs">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center">
                <ThumbsUp className="w-3 h-3 text-white" fill="white" />
              </div>
              <span>234</span>
            </div>
            <div className="flex items-center gap-3">
              <span>45 comments</span>
              <span>12 shares</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around">
          <button className="flex items-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C] px-4 py-2 rounded-md transition-colors">
            <ThumbsUp className="w-5 h-5" />
            <span className="text-sm font-medium">Like</span>
          </button>
          <button className="flex items-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C] px-4 py-2 rounded-md transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>
          <button className="flex items-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C] px-4 py-2 rounded-md transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* BLOCKED Overlay */}
      <AnimatePresence>
        {isBlocked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <motion.div
                className="text-5xl md:text-6xl font-black mb-4 text-[#1877F2]"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(24, 119, 242, 0.8)',
                    '2px 2px 30px rgba(24, 119, 242, 0.6)',
                    '-2px -2px 30px rgba(24, 119, 242, 0.8)',
                    '0 0 20px rgba(24, 119, 242, 0.8)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {getBlockedMessage()}
              </motion.div>
              
              <motion.div
                className="text-[#B0B3B8] text-xs uppercase tracking-wider"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {language === 'English' && 'Content Restricted'}
                {language === 'Farsi' && 'محتوا محدود شده'}
                {language === 'Chinese' && '内容受限'}
                {language === 'Russian' && 'Контент ограничен'}
                {language === 'Ukrainian' && 'Контент обмежено'}
                {language === 'Hindi' && 'सामग्री प्रतिबंधित'}
              </motion.div>
            </motion.div>

            {/* Facebook-style blocked icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <svg className="w-48 h-48 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 14.293a1 1 0 01-1.414 1.414L12 14.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 13 7.293 9.707a1 1 0 011.414-1.414L12 11.586l3.293-3.293a1 1 0 011.414 1.414L13.414 13l3.293 3.293z"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />
    </div>
  );
});

FacebookCard.displayName = 'FacebookCard';

export default FacebookCard;
