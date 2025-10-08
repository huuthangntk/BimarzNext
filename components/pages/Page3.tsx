'use client';

/**
 * PAGE 3: BLOCKED - Internet Censorship Visualization
 * 
 * COMPLETELY REDESIGNED FROM SCRATCH
 * 
 * Animation Timeline:
 * - Stage 1 (0-2s): Card enters, shows authentic mock app UI
 * - Stage 2 (2-3.5s): App interaction simulation (scrolling, playing, etc)
 * - Stage 3 (3.5-4.5s): Restriction begins (loading, buffering, or warning)
 * - Stage 4 (4.5s+): Full restriction overlay (BLOCKED/RESTRICTED/CENSORED/UNAVAILABLE)
 * 
 * Restriction Types:
 * - BLOCKED: Hard block with red overlay and X icon
 * - RESTRICTED: Blur effect with partial access message
 * - CENSORED: Black bars/pixelation with warning
 * - UNAVAILABLE: Gray overlay with service unavailable message
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { translations } from '@/lib/translations';
import { XCircle, AlertTriangle, Shield, Ban } from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Page3Props {
  isActive?: boolean;
}

type RestrictionType = 'blocked' | 'restricted' | 'censored' | 'unavailable';

interface ServiceApp {
  id: string;
  name: string;
  iconPath: string;
  primaryColor: string;
  backgroundColor: string;
  restrictionType: RestrictionType;
  // Mock UI elements
  showLogo: boolean;
  showInteraction: boolean; // e.g., scrolling, playing
}

// ============================================================================
// SERVICE DATA
// ============================================================================

const SERVICES: ServiceApp[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    iconPath: '/icons/services/youtube.svg',
    primaryColor: '#FF0000',
    backgroundColor: '#0F0F0F',
    restrictionType: 'blocked',
    showLogo: true,
    showInteraction: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    iconPath: '/icons/services/instagram.svg',
    primaryColor: '#E4405F',
    backgroundColor: '#000000',
    restrictionType: 'restricted',
    showLogo: true,
    showInteraction: true,
  },
  {
    id: 'spotify',
    name: 'Spotify',
    iconPath: '/icons/services/spotify.svg',
    primaryColor: '#1DB954',
    backgroundColor: '#121212',
    restrictionType: 'blocked',
    showLogo: true,
    showInteraction: true,
  },
  {
    id: 'netflix',
    name: 'Netflix',
    iconPath: '/icons/services/netflix.svg',
    primaryColor: '#E50914',
    backgroundColor: '#141414',
    restrictionType: 'unavailable',
    showLogo: true,
    showInteraction: true,
  },
  {
    id: 'twitter',
    name: 'X',
    iconPath: '/icons/services/twitter.svg',
    primaryColor: '#FFFFFF',
    backgroundColor: '#000000',
    restrictionType: 'censored',
    showLogo: true,
    showInteraction: true,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    iconPath: '/icons/services/facebook.svg',
    primaryColor: '#1877F2',
    backgroundColor: '#18191A',
    restrictionType: 'restricted',
    showLogo: true,
    showInteraction: true,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    iconPath: '/icons/services/telegram.svg',
    primaryColor: '#0088CC',
    backgroundColor: '#0f1419',
    restrictionType: 'blocked',
    showLogo: true,
    showInteraction: true,
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    iconPath: '/icons/services/soundcloud.svg',
    primaryColor: '#FF5500',
    backgroundColor: '#000000',
    restrictionType: 'unavailable',
    showLogo: true,
    showInteraction: true,
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

// Card container animation
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: 0.4,
    },
  },
};

// Mock app content animation
const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Restriction overlay animation
const restrictionOverlayVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 4.5, // Show after 4.5 seconds
    },
  },
};

// ============================================================================
// MOCK APP UI COMPONENTS
// ============================================================================

// Generic mock app with logo and interaction
const MockAppUI: React.FC<{ 
  service: ServiceApp; 
  theme: 'light' | 'dark';
}> = ({ service, theme }) => {
  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-lg"
      style={{ backgroundColor: service.backgroundColor }}
    >
      {/* App Header */}
      <motion.div
        variants={contentVariants}
        className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center gap-3"
        style={{
          background: `linear-gradient(to bottom, ${service.backgroundColor}, transparent)`,
        }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${service.primaryColor}20` }}
        >
          <img 
            src={service.iconPath} 
            alt={service.name}
            className="w-5 h-5 object-contain"
          />
        </div>
        <span className="text-white font-semibold text-sm">{service.name}</span>
      </motion.div>

      {/* Mock Content - Animated bars representing content */}
      <motion.div
        variants={contentVariants}
        className="absolute top-16 left-0 right-0 bottom-0 px-4 space-y-3"
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: [0, 1, 1],
              x: [-20, 0, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 1 + i * 0.2, // Stagger appearance
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="rounded"
            style={{
              height: `${Math.random() * 40 + 30}px`,
              backgroundColor: `${service.primaryColor}30`,
              backdropFilter: 'blur(10px)',
            }}
          />
        ))}
      </motion.div>

      {/* Interaction indicator (e.g., scrolling) */}
      {service.showInteraction && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -80, 0] }}
          transition={{
            duration: 3,
            delay: 2,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 pointer-events-none"
        />
      )}

      {/* Loading indicator that appears before restriction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1,
          delay: 3.5, // Show at 3.5s before restriction
        }}
        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-10 h-10 border-4 border-t-transparent rounded-full"
          style={{ borderColor: `${service.primaryColor} transparent transparent transparent` }}
        />
      </motion.div>
    </div>
  );
};

// ============================================================================
// RESTRICTION OVERLAY COMPONENTS
// ============================================================================

// BLOCKED overlay (hard block with red X)
const BlockedOverlay: React.FC<{ service: ServiceApp; language: string }> = ({ service, language }) => {
  const text = translations.page3.services[service.id as keyof typeof translations.page3.services]?.blocked?.[language as keyof typeof translations.page3.services.youtube.blocked] || 'BLOCKED';
  
  return (
    <motion.div
      variants={restrictionOverlayVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <XCircle className="w-20 h-20 text-red-500" strokeWidth={2} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-red-500 text-2xl font-bold tracking-wider"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

// RESTRICTED overlay (blur with partial access)
const RestrictedOverlay: React.FC<{ service: ServiceApp; language: string }> = ({ service, language }) => {
  const text = translations.page3.services[service.id as keyof typeof translations.page3.services]?.restricted?.[language as keyof typeof translations.page3.services.youtube.blocked] || 'RESTRICTED';
  
  return (
    <motion.div
      variants={restrictionOverlayVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <AlertTriangle className="w-16 h-16 text-yellow-500" strokeWidth={2} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-yellow-500 text-xl font-bold tracking-wider"
      >
        {text}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-300 text-sm"
      >
        Limited Access
      </motion.p>
    </motion.div>
  );
};

// CENSORED overlay (black bars/pixelation)
const CensoredOverlay: React.FC<{ service: ServiceApp; language: string }> = ({ service, language }) => {
  const text = translations.page3.services[service.id as keyof typeof translations.page3.services]?.censored?.[language as keyof typeof translations.page3.services.youtube.blocked] || 'CENSORED';
  
  return (
    <motion.div
      variants={restrictionOverlayVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      }}
    >
      {/* Censor bars */}
      <div className="absolute inset-0 flex flex-col justify-around py-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-full bg-black"
            style={{ height: '12%' }}
          />
        ))}
      </div>
      
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="relative z-10"
      >
        <Shield className="w-16 h-16 text-gray-400" strokeWidth={2} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-xl font-bold tracking-wider relative z-10"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

// UNAVAILABLE overlay (gray with service unavailable)
const UnavailableOverlay: React.FC<{ service: ServiceApp; language: string }> = ({ service, language }) => {
  const text = translations.page3.services[service.id as keyof typeof translations.page3.services]?.unavailable?.[language as keyof typeof translations.page3.services.youtube.blocked] || 'UNAVAILABLE';
  
  return (
    <motion.div
      variants={restrictionOverlayVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg"
      style={{
        backgroundColor: 'rgba(60, 60, 60, 0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Ban className="w-16 h-16 text-gray-400" strokeWidth={2} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-300 text-xl font-bold tracking-wider"
      >
        {text}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-sm"
      >
        Service Not Available
      </motion.p>
    </motion.div>
  );
};

// ============================================================================
// SERVICE CARD COMPONENT
// ============================================================================

interface ServiceCardProps {
  service: ServiceApp;
  language: string;
  theme: 'light' | 'dark';
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, language, theme, delay }) => {
  const prefersReducedMotion = useReducedMotion();

  const renderRestrictionOverlay = () => {
    switch (service.restrictionType) {
      case 'blocked':
        return <BlockedOverlay service={service} language={language} />;
      case 'restricted':
        return <RestrictedOverlay service={service} language={language} />;
      case 'censored':
        return <CensoredOverlay service={service} language={language} />;
      case 'unavailable':
        return <UnavailableOverlay service={service} language={language} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay }}
      className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl"
      style={{
        border: `1px solid ${service.primaryColor}40`,
      }}
    >
      {/* Mock App UI */}
      <MockAppUI service={service} theme={theme} />

      {/* Restriction Overlay */}
      {!prefersReducedMotion && renderRestrictionOverlay()}

      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          boxShadow: `inset 0 0 40px ${service.primaryColor}30`,
        }}
      />
    </motion.div>
  );
};

// ============================================================================
// MAIN PAGE 3 COMPONENT
// ============================================================================

export default function Page3({ isActive = true }: Page3Props) {
  const { language, theme } = useTheme();
  const isRTL = language === 'Farsi';
  
  // Determine number of cards based on screen size
  const [displayCount, setDisplayCount] = useState(4);
  
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      // Mobile: 4 cards (2x2), Tablet: 6 cards (2x3), Desktop: 8 cards (2x4)
      if (width < 768) setDisplayCount(4);
      else if (width < 1024) setDisplayCount(6);
      else setDisplayCount(8);
    };
    
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  // Get random services to display
  const [displayedServices, setDisplayedServices] = useState<ServiceApp[]>([]);
  
  useEffect(() => {
    const shuffled = [...SERVICES].sort(() => Math.random() - 0.5);
    setDisplayedServices(shuffled.slice(0, displayCount));
  }, [displayCount]);

  const heroText = translations.page3.hero[language as keyof typeof translations.page3.hero] || 'BLOCKED';

  return (
    <motion.div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Theme-aware background */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-500"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 25%, #0a0a1a 50%, #0a1a0a 75%, #0a0a0a 100%)'
            : 'linear-gradient(135deg, #2a2a2a 0%, #3a2a2a 25%, #2a2a3a 50%, #2a3a2a 75%, #2a2a2a 100%)',
        }}
      />

      {/* Animated grain texture */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content - Moved higher on large screens */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Adjusted padding - higher on large screens to prevent footer overlap */}
        <div className="w-full h-full flex flex-col items-center justify-center pt-24 pb-20 md:pt-20 md:pb-20 lg:pt-16 lg:pb-16">
          
          {/* Hero Text */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 md:mb-12 lg:mb-16 tracking-wider"
            style={{
              color: theme === 'dark' ? '#ff4444' : '#cc0000',
              textShadow: theme === 'dark' 
                ? '0 0 20px rgba(255, 68, 68, 0.5), 0 0 40px rgba(255, 68, 68, 0.3)'
                : '0 0 20px rgba(204, 0, 0, 0.4), 0 0 40px rgba(204, 0, 0, 0.2)',
            }}
          >
            {heroText}
          </motion.h1>

          {/* Cards Grid - Responsive */}
          <div className="w-full max-w-7xl mx-auto">
            <div className={`
              grid gap-4 sm:gap-5 md:gap-6 lg:gap-8
              grid-cols-2
              ${displayCount > 4 ? 'md:grid-cols-3' : 'md:grid-cols-2'}
              ${displayCount > 6 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}
            `}>
              {displayedServices.map((service, index) => (
                <div
                  key={service.id}
                  className="aspect-[4/3] w-full"
                >
                  <ServiceCard
                    service={service}
                    language={language}
                    theme={theme}
                    delay={index * 0.1}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Theme-aware vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-all duration-500"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.8) 100%)'
            : 'radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />
    </motion.div>
  );
}
