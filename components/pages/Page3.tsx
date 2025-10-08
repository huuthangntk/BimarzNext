'use client';

/**
 * PAGE 3: BLOCKED - Internet Censorship Visualization
 * 
 * COMPLETE REDESIGN V2
 * 
 * Features:
 * - 6 cards on mobile (3x2 grid)
 * - Infinite cycling animations
 * - Animated BLOCKED text with glitch/glow/morph effects
 * - Responsive text positioning (moves down on medium screens)
 * - Theme-aware backgrounds and cards
 * - Smaller cards on medium screens
 */

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  backgroundDark: string;
  backgroundLight: string;
  restrictionType: RestrictionType;
}

// ============================================================================
// SERVICE DATA - Theme-aware backgrounds
// ============================================================================

const SERVICES: ServiceApp[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    iconPath: '/icons/services/youtube.svg',
    primaryColor: '#FF0000',
    backgroundDark: '#0F0F0F',
    backgroundLight: '#2a2a2a',
    restrictionType: 'blocked',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    iconPath: '/icons/services/instagram.svg',
    primaryColor: '#E4405F',
    backgroundDark: '#000000',
    backgroundLight: '#1a1a1a',
    restrictionType: 'restricted',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    iconPath: '/icons/services/spotify.svg',
    primaryColor: '#1DB954',
    backgroundDark: '#121212',
    backgroundLight: '#242424',
    restrictionType: 'blocked',
  },
  {
    id: 'netflix',
    name: 'Netflix',
    iconPath: '/icons/services/netflix.svg',
    primaryColor: '#E50914',
    backgroundDark: '#141414',
    backgroundLight: '#282828',
    restrictionType: 'unavailable',
  },
  {
    id: 'twitter',
    name: 'X',
    iconPath: '/icons/services/twitter.svg',
    primaryColor: '#FFFFFF',
    backgroundDark: '#000000',
    backgroundLight: '#1a1a1a',
    restrictionType: 'censored',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    iconPath: '/icons/services/facebook.svg',
    primaryColor: '#1877F2',
    backgroundDark: '#18191A',
    backgroundLight: '#2a2b2c',
    restrictionType: 'restricted',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    iconPath: '/icons/services/telegram.svg',
    primaryColor: '#0088CC',
    backgroundDark: '#0f1419',
    backgroundLight: '#1f2429',
    restrictionType: 'blocked',
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    iconPath: '/icons/services/soundcloud.svg',
    primaryColor: '#FF5500',
    backgroundDark: '#000000',
    backgroundLight: '#1a1a1a',
    restrictionType: 'unavailable',
  },
];

// ============================================================================
// ANIMATED GLITCH TEXT COMPONENT
// ============================================================================

const GlitchText: React.FC<{ text: string; theme: 'light' | 'dark' }> = ({ text, theme }) => {
  const morphWords = ['BLOCKED', 'CENSORED', 'RESTRICTED', 'FORBIDDEN'];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % morphWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const glowColor = theme === 'dark' ? '#ff4444' : '#cc0000';
  
  return (
    <div className="relative">
      {/* Main text with glow */}
      <motion.h1
        key={currentIndex}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider z-10"
        style={{
          color: glowColor,
          textShadow: `
            0 0 10px ${glowColor}80,
            0 0 20px ${glowColor}60,
            0 0 30px ${glowColor}40,
            0 0 40px ${glowColor}20
          `,
        }}
      >
        {morphWords[currentIndex]}
      </motion.h1>
      
      {/* Glitch layers */}
      <motion.h1
        animate={{
          x: [0, -2, 2, 0],
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute top-0 left-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider pointer-events-none"
        style={{
          color: '#ff0000',
          mixBlendMode: 'screen',
          clipPath: 'inset(20% 0 30% 0)',
        }}
      >
        {morphWords[currentIndex]}
      </motion.h1>
      
      <motion.h1
        animate={{
          x: [0, 2, -2, 0],
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
          delay: 0.15,
        }}
        className="absolute top-0 left-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider pointer-events-none"
        style={{
          color: '#00ffff',
          mixBlendMode: 'screen',
          clipPath: 'inset(40% 0 20% 0)',
        }}
      >
        {morphWords[currentIndex]}
      </motion.h1>
      
      {/* Scan line */}
      <motion.div
        animate={{
          y: ['0%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${glowColor}20 50%, transparent 100%)`,
          height: '20%',
        }}
      />
    </div>
  );
};

// ============================================================================
// MOCK APP UI COMPONENT - Theme-aware
// ============================================================================

const MockAppUI: React.FC<{ 
  service: ServiceApp; 
  theme: 'light' | 'dark';
}> = ({ service, theme }) => {
  const backgroundColor = theme === 'dark' ? service.backgroundDark : service.backgroundLight;
  
  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-lg transition-colors duration-500"
      style={{ backgroundColor }}
    >
      {/* App Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: 0.3,
          repeat: Infinity,
          repeatDelay: 4,
        }}
        className="absolute top-0 left-0 right-0 px-3 py-2 flex items-center gap-2"
        style={{
          background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
        }}
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${service.primaryColor}20` }}
        >
          <img 
            src={service.iconPath} 
            alt={service.name}
            className="w-4 h-4 object-contain"
          />
        </div>
        <span className="text-white font-semibold text-xs">{service.name}</span>
      </motion.div>

      {/* Mock Content Bars */}
      <div className="absolute top-12 left-0 right-0 bottom-0 px-3 space-y-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-20, 0, 0, 20],
            }}
            transition={{
              duration: 2,
              delay: 1 + i * 0.15,
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
            className="rounded"
            style={{
              height: `${Math.random() * 20 + 15}px`,
              backgroundColor: `${service.primaryColor}30`,
              backdropFilter: 'blur(10px)',
            }}
          />
        ))}
      </div>

      {/* Loading indicator before restriction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 1, 0] }}
        transition={{
          duration: 5,
          times: [0, 0.6, 0.7, 0.8, 0.85],
          repeat: Infinity,
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
          className="w-8 h-8 border-3 border-t-transparent rounded-full"
          style={{ borderColor: `${service.primaryColor} transparent transparent transparent` }}
        />
      </motion.div>
    </div>
  );
};

// ============================================================================
// RESTRICTION OVERLAY COMPONENTS - Cycling
// ============================================================================

const BlockedOverlay: React.FC<{ service: ServiceApp; language: string }> = ({ service, language }) => {
  const text = translations.page3.services[service.id as keyof typeof translations.page3.services]?.blocked?.[language as keyof typeof translations.page3.services.youtube.blocked] || 'BLOCKED';
 
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8,
        delay: 4.2,
        repeat: Infinity,
        repeatDelay: 0,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg"
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
        <XCircle className="w-16 h-16 md:w-12 md:h-12 text-red-500" strokeWidth={2} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-red-500 text-xl md:text-lg font-bold tracking-wider"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

const RestrictedOverlay: React.FC<{ service: ServiceApp; language: string }> = ({ service, language }) => {
  const text = translations.page3.services[service.id as keyof typeof translations.page3.services]?.restricted?.[language as keyof typeof translations.page3.services.youtube.blocked] || 'RESTRICTED';
 
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8,
        delay: 4.2,
        repeat: Infinity,
        repeatDelay: 0,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg"
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
        <AlertTriangle className="w-14 h-14 md:w-10 md:h-10 text-yellow-500" strokeWidth={2} />
      </motion.div>
      <p className="text-yellow-500 text-lg md:text-base font-bold tracking-wider">{text}</p>
      <p className="text-gray-300 text-xs">Limited Access</p>
    </motion.div>
  );
};

const CensoredOverlay: React.FC<{ service: ServiceApp; language: string }> = ({ service, language }) => {
  const text = translations.page3.services[service.id as keyof typeof translations.page3.services]?.censored?.[language as keyof typeof translations.page3.services.youtube.blocked] || 'CENSORED';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.8,
        delay: 4.2,
        repeat: Infinity,
        repeatDelay: 0,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
    >
      {/* Censor bars */}
      <div className="absolute inset-0 flex flex-col justify-around py-3">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 4.2 + i * 0.1, repeat: Infinity, repeatDelay: 0 }}
            className="w-full bg-black"
            style={{ height: '12%' }}
          />
        ))}
      </div>
 
      <Shield className="w-14 h-14 md:w-10 md:h-10 text-gray-400 relative z-10" strokeWidth={2} />
      <p className="text-gray-400 text-lg md:text-base font-bold tracking-wider relative z-10">{text}</p>
    </motion.div>
  );
};

const UnavailableOverlay: React.FC<{ service: ServiceApp; language: string }> = ({ service, language }) => {
  const text = translations.page3.services[service.id as keyof typeof translations.page3.services]?.unavailable?.[language as keyof typeof translations.page3.services.youtube.blocked] || 'UNAVAILABLE';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.8,
        delay: 4.2,
        repeat: Infinity,
        repeatDelay: 0,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg"
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
        <Ban className="w-14 h-14 md:w-10 md:h-10 text-gray-400" strokeWidth={2} />
      </motion.div>
      <p className="text-gray-300 text-lg md:text-base font-bold tracking-wider">{text}</p>
      <p className="text-gray-400 text-xs">Service Not Available</p>
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
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
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
  
  // Get random 6 or 8 services
  const [displayedServices, setDisplayedServices] = useState<ServiceApp[]>([]);
  
  useEffect(() => {
    const shuffled = [...SERVICES].sort(() => Math.random() - 0.5);
    // Mobile: 6 cards, Desktop: 8 cards
    const count = window.innerWidth < 768 ? 6 : 8;
    setDisplayedServices(shuffled.slice(0, count));
  }, []);

  return (
    <motion.div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Theme-aware background - DARKER for light theme */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-500"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 25%, #0a0a1a 50%, #0a1a0a 75%, #0a0a0a 100%)'
            : 'linear-gradient(135deg, #1a1a1a 0%, #2a1a1a 25%, #1a1a2a 50%, #1a2a1a 75%, #1a1a1a 100%)',
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

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Responsive padding - text moves down on medium screens */}
        <div className="w-full h-full flex flex-col items-center justify-center pt-20 pb-16 md:pt-32 md:pb-20 lg:pt-20 lg:pb-16">
          
          {/* Animated Glitch Hero Text */}
          <div className="mb-8 md:mb-12 lg:mb-16 w-full text-center">
            <GlitchText text="BLOCKED" theme={theme} />
          </div>

          {/* Cards Grid - 3x2 on mobile, 2x4 on desktop */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid gap-3 sm:gap-4 md:gap-4 lg:gap-6 grid-cols-3 md:grid-cols-2 lg:grid-cols-4">
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
            : 'radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />
    </motion.div>
  );
}
