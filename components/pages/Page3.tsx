'use client';

/**
 * PAGE 3: BLOCKED - Internet Censorship Visualization
 * 
 * Emotion: CHAOS, FRUSTRATION, OPPRESSION (NOT hope)
 * - Individual random card rotation (each card has own timing 3-8 seconds)
 * - Morphing text animation (BLOCKED → CENSORED → RESTRICTED)
 * - Authentic app UI replicas
 * - Dynamic height calculations (NO overflow)
 * - Dark, oppressive styling
 * - CHAOTIC, UNPREDICTABLE animations
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { translations } from '@/lib/translations';
import { Video, Music, MessageSquare, Film, CreditCard, XCircle, Send, User } from 'lucide-react';
import InstagramCard from './Page3/cards/InstagramCard';
import YouTubeCard from './Page3/cards/YouTubeCard';
import NetflixCard from './Page3/cards/NetflixCard';
import SpotifyCard from './Page3/cards/SpotifyCard';
import TwitterCard from './Page3/cards/TwitterCard';
import SoundCloudCard from './Page3/cards/SoundCloudCard';
import MorphingText from './Page3/MorphingText';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Page3Props {
  isActive?: boolean;
}

type ServiceId = 'youtube' | 'spotify' | 'twitter' | 'netflix' | 'paypal' | 'instagram' | 'telegram' | 'facebook' | 'whatsapp' | 'soundcloud';

interface BlockedService {
  id: ServiceId;
  icon: React.ElementType;
  effectType: 'tvStatic' | 'equalizer' | 'redaction' | 'buffering' | 'declined' | 'chat' | 'social';
  primaryColor: string;
  brandColors?: {
    primary: string;
    secondary?: string;
    background?: string;
  };
}

interface CardSlot {
  id: string;
  service: BlockedService | null;
  nextChangeTime: number;
}

// ============================================================================
// SERVICE DATA
// ============================================================================

const BLOCKED_SERVICES: BlockedService[] = [
  {
    id: 'youtube',
    icon: Video,
    effectType: 'tvStatic',
    primaryColor: '#FF0000',
    brandColors: { primary: '#FF0000', background: '#0F0F0F' },
  },
  {
    id: 'spotify',
    icon: Music,
    effectType: 'equalizer',
    primaryColor: '#1DB954',
    brandColors: { primary: '#1DB954', background: '#121212' },
  },
  {
    id: 'telegram',
    icon: Send,
    effectType: 'chat',
    primaryColor: '#0088CC',
    brandColors: { primary: '#0088CC', secondary: '#0077B3', background: '#0f1419' },
  },
  {
    id: 'instagram',
    icon: User,
    effectType: 'social',
    primaryColor: '#E4405F',
    brandColors: { primary: '#E4405F', background: '#000000' },
  },
  {
    id: 'facebook',
    icon: MessageSquare,
    effectType: 'social',
    primaryColor: '#1877F2',
    brandColors: { primary: '#1877F2', background: '#18191A' },
  },
  {
    id: 'twitter',
    icon: MessageSquare,
    effectType: 'redaction',
    primaryColor: '#1DA1F2',
    brandColors: { primary: '#1DA1F2', background: '#000000' },
  },
  {
    id: 'netflix',
    icon: Film,
    effectType: 'buffering',
    primaryColor: '#E50914',
    brandColors: { primary: '#E50914', background: '#141414' },
  },
  {
    id: 'paypal',
    icon: CreditCard,
    effectType: 'declined',
    primaryColor: '#00457C',
    brandColors: { primary: '#00457C', background: '#003087' },
  },
  {
    id: 'soundcloud',
    icon: Music,
    effectType: 'equalizer',
    primaryColor: '#FF5500',
    brandColors: { primary: '#FF5500', background: '#000000' },
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Random delay between 3-8 seconds for chaotic feel
const getRandomDelay = () => Math.random() * 5000 + 3000; // 3000-8000ms

// Get random service excluding currently visible ones
const getRandomService = (excludeIds: ServiceId[]): BlockedService => {
  const available = BLOCKED_SERVICES.filter(s => !excludeIds.includes(s.id));
  return available[Math.floor(Math.random() * available.length)] || BLOCKED_SERVICES[0];
};

// Get initial random services
const getInitialServices = (count: number): BlockedService[] => {
  const shuffled = [...BLOCKED_SERVICES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// ============================================================================
// CARD GLITCH VARIANTS - More dramatic
// ============================================================================

const cardGlitchVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    rotateY: -90,
    filter: 'blur(20px) brightness(0.3)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px) brightness(1)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    rotateY: 90,
    filter: 'blur(20px) brightness(0.3)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ============================================================================
// TV STATIC EFFECT
// ============================================================================

const TVStaticEffect: React.FC<{ isBlocked: boolean }> = ({ isBlocked }) => {
  const [noise, setNoise] = useState('');

  useEffect(() => {
    const generateNoise = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const imageData = ctx.createImageData(200, 200);
        for (let i = 0; i < imageData.data.length; i += 4) {
          const value = Math.random() * 255;
          imageData.data[i] = value;
          imageData.data[i + 1] = value;
          imageData.data[i + 2] = value;
          imageData.data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
        setNoise(canvas.toDataURL());
      }
    };

    if (isBlocked) {
      const interval = setInterval(generateNoise, 50);
      return () => clearInterval(interval);
    }
  }, [isBlocked]);

  if (!isBlocked) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full opacity-80">
        <defs>
          <filter id="static-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                from="0.9"
                to="0.95"
                dur="0.1s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="200" height="200" filter="url(#static-filter)" />
        <g dangerouslySetInnerHTML={{ __html: noise }} />
      </svg>
    </div>
  );
};

// Telegram Chat UI
const TelegramChatUI: React.FC<{ language: any; isBlocked: boolean }> = ({ language, isBlocked }) => {
  const telegramData = (translations.page3 as any).telegram || {};
  const message = telegramData.message?.[language] || 'Hey! Check out this article...';
  const typing = telegramData.typing?.[language] || 'Type a message...';

  return (
    <div className="relative w-full h-full bg-[#0f1419] rounded-lg overflow-hidden">
      {/* Telegram header */}
      <div className="flex items-center gap-3 p-3 bg-[#0088cc]">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Send className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white text-sm">Telegram</div>
          <div className="text-xs text-white/70">online</div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="p-4 min-h-[150px] relative">
        <motion.div 
          className="bg-[#0088cc] rounded-2xl rounded-tl-none p-3 mb-2 max-w-[85%]"
          animate={isBlocked ? { filter: 'blur(8px)' } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm text-white">{message}</p>
          <span className="text-xs text-white/70">12:34</span>
        </motion.div>
      </div>

      {/* Input bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-2 bg-[#0088cc]">
        <div className="flex-1 bg-[#0077b3] rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder={typing}
            className="bg-transparent w-full outline-none text-sm text-white placeholder-white/50"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

// Facebook Post UI
const FacebookPostUI: React.FC<{ language: any; isBlocked: boolean }> = ({ language, isBlocked }) => {
  const facebookData = (translations.page3 as any).facebook || {};
  const post = facebookData.post?.[language] || 'Just shared my thoughts on freedom...';
  
  return (
    <div className="relative w-full h-full bg-[#18191A] rounded-lg overflow-hidden text-white">
      {/* Facebook header */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-800">
        <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center font-bold">
          f
        </div>
        <span className="font-semibold">Facebook</span>
      </div>

      {/* Post content */}
      <div className="p-4">
        <motion.p 
          className="text-sm"
          animate={isBlocked ? { filter: 'blur(5px)' } : {}}
        >
          {post}
        </motion.p>
      </div>
    </div>
  );
};

// PayPal Declined
const PayPalDeclined: React.FC<{ isBlocked: boolean }> = ({ isBlocked }) => {
  return (
    <div className="relative w-full h-full p-6 bg-[#003087]">
      <div className="text-white">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-6 h-6" />
          <span className="font-semibold">PayPal</span>
        </div>
        
        <div className="bg-white/10 rounded p-4 mb-4">
          <div className="text-2xl tracking-widest mb-2">•••• •••• •••• 1234</div>
          <div className="flex justify-between text-sm">
            <span>VISA</span>
            <span>12/25</span>
          </div>
        </div>

        {!isBlocked && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5 }}
            className="h-2 bg-blue-500 rounded-full"
          />
        )}
      </div>

      <AnimatePresence>
        {isBlocked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: [-10, 10, -10, 10, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/90"
          >
            <XCircle className="w-24 h-24 text-red-500 mb-4" />
            <p className="text-white text-sm mt-2">Payment blocked</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// SERVICE CARD COMPONENT
// ============================================================================

interface ServiceCardProps {
  service: BlockedService;
  language: any;
  isRTL: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = React.memo(({ service, language, isRTL }) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const serviceData = translations.page3.services[service.id as keyof typeof translations.page3.services];
  const blockedMessage = (serviceData?.blocked as any)?.[language] || 'BLOCKED';

  useEffect(() => {
    const timer = setTimeout(() => setIsBlocked(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    // Use enhanced card components for specific services
    switch (service.id) {
      case 'youtube':
        return <YouTubeCard language={language} isRTL={isRTL} />;
      case 'instagram':
        return <InstagramCard language={language} isRTL={isRTL} />;
      case 'netflix':
        return <NetflixCard language={language} isRTL={isRTL} />;
      case 'spotify':
        return <SpotifyCard language={language} isRTL={isRTL} />;
      case 'twitter':
        return <TwitterCard language={language} isRTL={isRTL} />;
      case 'soundcloud':
        return <SoundCloudCard language={language} isRTL={isRTL} />;
      default:
        // Fallback to legacy effect types for other services
        switch (service.effectType) {
          case 'chat':
            if (service.id === 'telegram') {
              return <TelegramChatUI language={language} isBlocked={isBlocked} />;
            }
            return <TelegramChatUI language={language} isBlocked={isBlocked} />;
          case 'social':
            return <FacebookPostUI language={language} isBlocked={isBlocked} />;
          case 'declined':
            return <PayPalDeclined isBlocked={isBlocked} />;
          default:
            return (
              <div className="flex items-center justify-center h-full">
                <service.icon className="w-16 h-16" style={{ color: service.primaryColor }} />
              </div>
            );
        }
    }
  };

  return (
    <motion.div 
      variants={cardGlitchVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative w-full h-full rounded-lg overflow-hidden"
      style={{
        backgroundColor: service.brandColors?.background || '#000',
        boxShadow: isBlocked ? `0 0 30px ${service.primaryColor}40` : '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {renderContent()}

      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// ============================================================================
// MAIN PAGE 3 COMPONENT
// ============================================================================

export default function Page3({ isActive = true }: Page3Props) {
  const { language, theme } = useTheme();
  const isRTL = language === 'Farsi';
  
  // Determine card count based on screen size
  const [cardCount, setCardCount] = useState(3);
  
  useEffect(() => {
    const updateCardCount = () => {
      const width = window.innerWidth;
      // Mobile: 3 cards, Desktop: 4 cards (2x2 grid)
      setCardCount(width < 768 ? 3 : 4);
    };
    
    updateCardCount();
    window.addEventListener('resize', updateCardCount);
    return () => window.removeEventListener('resize', updateCardCount);
  }, []);

  // Individual card slots with independent timing
  const [cardSlots, setCardSlots] = useState<CardSlot[]>([]);
  const slotTimersRef = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({});
  const isMountedRef = useRef(true);

  // Initialize card slots
  useEffect(() => {
    const initialServices = getInitialServices(cardCount);
    const slots: CardSlot[] = initialServices.map((service, index) => ({
      id: `slot-${index}`,
      service,
      nextChangeTime: Date.now() + getRandomDelay(),
    }));
    setCardSlots(slots);
  }, [cardCount]);

  // Individual timer for each card slot
  const scheduleSlotChange = useCallback((slotId: string) => {
    // Clear existing timer for this slot
    if (slotTimersRef.current[slotId]) {
      clearTimeout(slotTimersRef.current[slotId]);
    }
    
    const delay = getRandomDelay();
    
    slotTimersRef.current[slotId] = setTimeout(() => {
      // Don't update if component is unmounted
      if (!isMountedRef.current || !isActive) return;
      
      setCardSlots(prev => {
        const currentSlot = prev.find(s => s.id === slotId);
        if (!currentSlot) return prev;

        // Get currently visible service IDs
        const visibleIds = prev.map(s => s.service?.id).filter(Boolean) as ServiceId[];
        
        // Get new random service (excluding current ones)
        const newService = getRandomService(visibleIds);
        
        // Update this specific slot
        return prev.map(slot => 
          slot.id === slotId
            ? { ...slot, service: newService, nextChangeTime: Date.now() + getRandomDelay() }
            : slot
        );
      });
      
      // Schedule next change for this slot only if still active and mounted
      if (isActive && isMountedRef.current) {
        scheduleSlotChange(slotId);
      }
    }, delay);
  }, [isActive]);

  // Start individual timers for each slot
  useEffect(() => {
    isMountedRef.current = true;
    
    if (!isActive || cardSlots.length === 0) return;

    // Start timer for each slot
    cardSlots.forEach(slot => {
      scheduleSlotChange(slot.id);
    });

    // Cleanup all timers
    return () => {
      isMountedRef.current = false;
      Object.values(slotTimersRef.current).forEach(timer => clearTimeout(timer));
      slotTimersRef.current = {};
    };
  }, [isActive, cardSlots.length, scheduleSlotChange]);

  return (
    <motion.div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0a0a0a, #000000)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background - MUST fill entire container */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
        }}
      />

      {/* Static noise overlay for chaos */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 0.2, repeat: Infinity }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }}
      />

      {/* Scanlines */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content - centered layout for large screens */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-20 md:py-24">
        {/* Morphing text - bigger and more dramatic */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 w-full">
          <MorphingText language={language} isRTL={isRTL} />
        </div>

        {/* Service cards grid - centered and bigger on large screens */}
        <div className={`
          w-full max-w-7xl mx-auto
          grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16
          ${cardCount === 3 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}
          auto-rows-fr
        `}>
          {cardSlots.map((slot) => (
            <div
              key={slot.id}
              className="w-full"
              style={{
                minHeight: cardCount === 3 ? '200px' : '250px',
                maxHeight: cardCount === 3 ? '280px' : '350px',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {slot.service && (
                  <motion.div
                    key={`service-${slot.service.id}`}
                    className="w-full h-full"
                  >
                    <ServiceCard
                      service={slot.service}
                      language={language}
                      isRTL={isRTL}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Dark vignette for oppression */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />
    </motion.div>
  );
}
