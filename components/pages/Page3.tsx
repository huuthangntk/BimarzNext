'use client';

/**
 * PAGE 3: BLOCKED - Internet Censorship Visualization
 * 
 * COMPLETELY REDESIGNED FROM SCRATCH
 * 
 * Animation Timeline (LOOPING):
 * - Stage 1 (0-2s): Card enters, shows authentic mock app UI
 * - Stage 2 (2-4s): App interaction simulation (scrolling, playing, content loading)
 * - Stage 3 (4-5s): Restriction warning begins (loading spinner, warning signs)
 * - Stage 4 (5-8s): Full restriction overlay (BLOCKED/RESTRICTED/CENSORED/UNAVAILABLE)
 * - Loop back to Stage 1
 * 
 * Restriction Types:
 * - BLOCKED: Hard block with red overlay and X icon (YouTube, Spotify, Telegram)
 * - RESTRICTED: Blur effect with yellow warning (Instagram, Facebook)
 * - CENSORED: Black bars with shield icon (Twitter)
 * - UNAVAILABLE: Gray overlay with ban icon (Netflix, SoundCloud)
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { translations } from '@/lib/translations';
import { XCircle, AlertTriangle, Shield, Ban, Play, Heart, MessageCircle, Send, Music } from 'lucide-react';
import Image from 'next/image';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Page3Props {
  isActive?: boolean;
}

type RestrictionType = 'blocked' | 'restricted' | 'censored' | 'unavailable';
type AnimationStage = 'app' | 'interactive' | 'warning' | 'restricted';

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
// SERVICE DATA
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
// SERVICE CARD COMPONENT - Handles animation timeline
// ============================================================================

interface ServiceCardProps {
  service: ServiceApp;
  language: string;
  theme: 'light' | 'dark';
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, language, theme, delay }) => {
  const [stage, setStage] = useState<AnimationStage>('app');

  // Animation timeline - loops continuously
  useEffect(() => {
    const timeline = [
      { stage: 'app', duration: 2000 },
      { stage: 'interactive', duration: 2000 },
      { stage: 'warning', duration: 1000 },
      { stage: 'restricted', duration: 3000 },
    ];

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const runTimeline = () => {
      const current = timeline[currentIndex];
      setStage(current.stage as AnimationStage);

      timeoutId = setTimeout(() => {
        currentIndex = (currentIndex + 1) % timeline.length;
        runTimeline();
      }, current.duration);
    };

    // Start after initial delay
    const initialTimeout = setTimeout(runTimeline, delay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
      style={{
        backgroundColor: theme === 'dark' ? service.backgroundDark : service.backgroundLight,
        border: `2px solid ${service.primaryColor}30`,
      }}
    >
      {/* Mock App UI */}
      <MockAppUI service={service} stage={stage} theme={theme} />
      
      {/* Restriction Overlays */}
      <AnimatePresence>
        {stage === 'warning' && <WarningOverlay service={service} theme={theme} />}
        {stage === 'restricted' && <RestrictionOverlay service={service} language={language} theme={theme} />}
      </AnimatePresence>
    </motion.div>
  );
};

// ============================================================================
// MOCK APP UI COMPONENT
// ============================================================================

interface MockAppUIProps {
  service: ServiceApp;
  stage: AnimationStage;
  theme: 'light' | 'dark';
}

const MockAppUI: React.FC<MockAppUIProps> = ({ service, stage, theme }) => {
  const bgColor = theme === 'dark' ? service.backgroundDark : service.backgroundLight;
  
  return (
    <div className="w-full h-full relative">
      {/* App Header */}
      <div 
        className="absolute top-0 left-0 right-0 h-14 px-4 flex items-center justify-between z-10"
        style={{
          backgroundColor: theme === 'dark' ? `${bgColor}ee` : `${bgColor}cc`,
          borderBottom: `1px solid ${service.primaryColor}20`,
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center p-1"
            style={{ backgroundColor: `${service.primaryColor}20` }}
          >
            <Image src={service.iconPath} alt={service.name} width={24} height={24} className="w-full h-full object-contain" />
          </div>
          <span 
            className="font-bold text-sm"
            style={{ color: theme === 'dark' ? '#ffffff' : '#f0f0f0' }}
          >
            {service.name}
          </span>
        </div>
      </div>

      {/* Content Area - Service-specific mock content */}
      <div className="absolute top-14 left-0 right-0 bottom-0 p-4">
        {service.id === 'youtube' && <YouTubeMockContent service={service} stage={stage} theme={theme} />}
        {service.id === 'instagram' && <InstagramMockContent service={service} stage={stage} theme={theme} />}
        {service.id === 'spotify' && <SpotifyMockContent service={service} stage={stage} theme={theme} />}
        {service.id === 'netflix' && <NetflixMockContent service={service} stage={stage} theme={theme} />}
        {service.id === 'twitter' && <TwitterMockContent service={service} stage={stage} theme={theme} />}
        {service.id === 'facebook' && <FacebookMockContent service={service} stage={stage} theme={theme} />}
        {service.id === 'telegram' && <TelegramMockContent service={service} stage={stage} theme={theme} />}
        {service.id === 'soundcloud' && <SoundCloudMockContent service={service} stage={stage} theme={theme} />}
      </div>
    </div>
  );
};

// ============================================================================
// MOCK CONTENT COMPONENTS FOR EACH SERVICE
// ============================================================================

const YouTubeMockContent: React.FC<{ service: ServiceApp; stage: AnimationStage; theme: string }> = ({ service, stage }) => (
  <div className="space-y-3">
    {/* Video thumbnail */}
    <motion.div
      animate={{ opacity: stage === 'interactive' ? [1, 0.8, 1] : 1 }}
      transition={{ duration: 2, repeat: stage === 'interactive' ? Infinity : 0 }}
      className="w-full h-24 rounded-lg relative"
      style={{ backgroundColor: `${service.primaryColor}20` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Play className="w-12 h-12 text-white fill-white opacity-80" />
      </div>
    </motion.div>
    {/* Video info bars */}
    {[60, 40, 80].map((width, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.2 }}
        className="h-2 rounded"
        style={{ width: `${width}%`, backgroundColor: `${service.primaryColor}30` }}
      />
    ))}
  </div>
);

const InstagramMockContent: React.FC<{ service: ServiceApp; stage: AnimationStage; theme: string }> = ({ service, stage }) => (
  <div className="grid grid-cols-3 gap-1">
    {[...Array(9)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: stage === 'interactive' ? [1, 1.05, 1] : 1,
        }}
        transition={{ delay: i * 0.1, repeat: stage === 'interactive' ? Infinity : 0, duration: 2 }}
        className="aspect-square rounded"
        style={{
          background: `linear-gradient(135deg, ${service.primaryColor}40, ${service.primaryColor}20)`,
        }}
      />
    ))}
  </div>
);

const SpotifyMockContent: React.FC<{ service: ServiceApp; stage: AnimationStage; theme: string }> = ({ service, stage }) => (
  <div className="space-y-4">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          backgroundColor: stage === 'interactive' && i === 1 ? [`${service.primaryColor}20`, `${service.primaryColor}40`, `${service.primaryColor}20`] : `${service.primaryColor}20`,
        }}
        transition={{ delay: i * 0.15, repeat: stage === 'interactive' && i === 1 ? Infinity : 0, duration: 2 }}
        className="flex items-center gap-3 p-2 rounded-lg"
      >
        <div className="w-10 h-10 rounded" style={{ backgroundColor: `${service.primaryColor}40` }} />
        <div className="flex-1 space-y-1">
          <div className="h-2 rounded" style={{ width: '70%', backgroundColor: `${service.primaryColor}50` }} />
          <div className="h-2 rounded" style={{ width: '40%', backgroundColor: `${service.primaryColor}30` }} />
        </div>
        {i === 1 && stage === 'interactive' && (
          <Music className="w-4 h-4" style={{ color: service.primaryColor }} />
        )}
      </motion.div>
    ))}
  </div>
);

const NetflixMockContent: React.FC<{ service: ServiceApp; stage: AnimationStage; theme: string }> = ({ service, stage }) => (
  <div className="space-y-3">
    {[...Array(2)].map((_, rowIndex) => (
      <div key={rowIndex} className="space-y-2">
        <div className="h-2 w-24 rounded" style={{ backgroundColor: `${service.primaryColor}60` }} />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: stage === 'interactive' && i === 1 && rowIndex === 0 ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 2, repeat: stage === 'interactive' ? Infinity : 0 }}
              className="flex-1 h-16 rounded"
              style={{ backgroundColor: `${service.primaryColor}${30 + i * 10}` }}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const TwitterMockContent: React.FC<{ service: ServiceApp; stage: AnimationStage; theme: string }> = ({ service, stage }) => (
  <div className="space-y-3">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2 }}
        className="p-3 rounded-lg border"
        style={{ 
          backgroundColor: `${service.primaryColor}08`,
          borderColor: `${service.primaryColor}20`,
        }}
      >
        <div className="flex gap-2 mb-2">
          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: `${service.primaryColor}30` }} />
          <div className="flex-1 space-y-1">
            <div className="h-2 w-20 rounded" style={{ backgroundColor: `${service.primaryColor}40` }} />
            <div className="h-2 w-16 rounded" style={{ backgroundColor: `${service.primaryColor}20` }} />
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-2 w-full rounded" style={{ backgroundColor: `${service.primaryColor}30` }} />
          <div className="h-2 w-3/4 rounded" style={{ backgroundColor: `${service.primaryColor}20` }} />
        </div>
      </motion.div>
    ))}
  </div>
);

const FacebookMockContent: React.FC<{ service: ServiceApp; stage: AnimationStage; theme: string }> = ({ service, stage }) => (
  <div className="space-y-4">
    {[...Array(2)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.3 }}
        className="p-3 rounded-lg"
        style={{ backgroundColor: `${service.primaryColor}10` }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: service.primaryColor }} />
          <div className="space-y-1">
            <div className="h-2 w-20 rounded" style={{ backgroundColor: `${service.primaryColor}60` }} />
            <div className="h-1 w-12 rounded" style={{ backgroundColor: `${service.primaryColor}30` }} />
          </div>
        </div>
        <div className="space-y-1 mb-2">
          <div className="h-2 w-full rounded" style={{ backgroundColor: `${service.primaryColor}40` }} />
          <div className="h-2 w-2/3 rounded" style={{ backgroundColor: `${service.primaryColor}30` }} />
        </div>
        <div className="flex gap-4 pt-2 border-t" style={{ borderColor: `${service.primaryColor}20` }}>
          <Heart className="w-4 h-4" style={{ color: `${service.primaryColor}80` }} />
          <MessageCircle className="w-4 h-4" style={{ color: `${service.primaryColor}80` }} />
        </div>
      </motion.div>
    ))}
  </div>
);

const TelegramMockContent: React.FC<{ service: ServiceApp; stage: AnimationStage; theme: string }> = ({ service, stage }) => (
  <div className="space-y-2">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.15 }}
        className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
      >
        <div
          className="max-w-[70%] p-2 rounded-2xl"
          style={{ 
            backgroundColor: i % 2 === 0 ? `${service.primaryColor}30` : service.primaryColor,
          }}
        >
          <div className="h-2 rounded" style={{ 
            width: `${60 + Math.random() * 40}px`,
            backgroundColor: i % 2 === 0 ? `${service.primaryColor}60` : '#ffffff80',
          }} />
        </div>
      </motion.div>
    ))}
  </div>
);

const SoundCloudMockContent: React.FC<{ service: ServiceApp; stage: AnimationStage; theme: string }> = ({ service, stage }) => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.2 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded" style={{ backgroundColor: `${service.primaryColor}40` }} />
          <div className="flex-1 space-y-1">
            <div className="h-2 w-3/4 rounded" style={{ backgroundColor: `${service.primaryColor}50` }} />
            <div className="h-2 w-1/2 rounded" style={{ backgroundColor: `${service.primaryColor}30` }} />
          </div>
        </div>
        {/* Waveform */}
        <div className="flex items-center gap-1 h-8">
          {[...Array(30)].map((_, j) => (
            <motion.div
              key={j}
              animate={{ 
                height: stage === 'interactive' && i === 0 ? ['20%', '80%', '20%'] : '40%',
              }}
              transition={{ duration: 0.5, delay: j * 0.05, repeat: stage === 'interactive' && i === 0 ? Infinity : 0 }}
              className="flex-1 rounded-full"
              style={{ backgroundColor: service.primaryColor }}
            />
          ))}
        </div>
      </motion.div>
    ))}
  </div>
);

// ============================================================================
// WARNING OVERLAY - Shows loading/warning before restriction
// ============================================================================

const WarningOverlay: React.FC<{ service: ServiceApp; theme: string }> = ({ service, theme }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 flex items-center justify-center"
    style={{
      backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(20, 20, 20, 0.6)',
      backdropFilter: 'blur(4px)',
    }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-12 h-12 border-4 border-t-transparent rounded-full"
      style={{ borderColor: `${service.primaryColor} transparent transparent transparent` }}
    />
  </motion.div>
);

// ============================================================================
// RESTRICTION OVERLAY - Shows final restriction message
// ============================================================================

interface RestrictionOverlayProps {
  service: ServiceApp;
  language: string;
  theme: string;
}

const RestrictionOverlay: React.FC<RestrictionOverlayProps> = ({ service, language, theme }) => {
  const serviceData = translations.page3.services[service.id as keyof typeof translations.page3.services];
  
  const getMessage = () => {
    const messages = serviceData?.[service.restrictionType as keyof typeof serviceData] as any;
    return messages?.[language] || service.restrictionType.toUpperCase();
  };

  const message = getMessage();

  // BLOCKED overlay
  if (service.restrictionType === 'blocked') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <XCircle className="w-16 h-16 text-red-500" strokeWidth={2.5} />
        </motion.div>
        <motion.p
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-red-500 text-xl font-bold tracking-wider text-center px-4"
        >
          {message}
        </motion.p>
      </motion.div>
    );
  }

  // RESTRICTED overlay
  if (service.restrictionType === 'restricted') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(30, 30, 30, 0.8)',
          backdropFilter: 'blur(15px)',
        }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <AlertTriangle className="w-14 h-14 text-yellow-500" strokeWidth={2.5} />
        </motion.div>
        <motion.p
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-yellow-500 text-lg font-bold tracking-wider text-center px-4"
        >
          {message}
        </motion.p>
        <p className="text-gray-400 text-xs">Limited Access</p>
      </motion.div>
    );
  }

  // CENSORED overlay
  if (service.restrictionType === 'censored') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(20, 20, 20, 0.95)',
        }}
      >
        {/* Censor bars */}
        <div className="absolute inset-0 flex flex-col justify-around py-2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="w-full bg-black"
              style={{ height: '10%' }}
            />
          ))}
        </div>
        
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10"
        >
          <Shield className="w-14 h-14 text-gray-400" strokeWidth={2.5} />
        </motion.div>
        <motion.p
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-300 text-lg font-bold tracking-wider relative z-10 text-center px-4"
        >
          {message}
        </motion.p>
      </motion.div>
    );
  }

  // UNAVAILABLE overlay
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(50, 50, 50, 0.95)' : 'rgba(70, 70, 70, 0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Ban className="w-14 h-14 text-gray-400" strokeWidth={2.5} />
      </motion.div>
      <motion.p
        animate={{ opacity: [1, 0.8, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-gray-300 text-lg font-bold tracking-wider text-center px-4"
      >
        {message}
      </motion.p>
      <p className="text-gray-500 text-xs">Service Not Available</p>
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

  // Get shuffled services to display
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
      {/* Theme-aware animated background */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 20%, #050a1a 40%, #0a1a05 60%, #1a050a 80%, #0a0a0a 100%)'
            : 'linear-gradient(135deg, #2a2a2a 0%, #3a2525 20%, #252a3a 40%, #2a3a25 60%, #3a252a 80%, #2a2a2a 100%)',
        }}
      />

      {/* Animated grain texture */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        animate={{ opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content - Adjusted positioning to prevent footer overlap */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Reduced top padding on large screens, ensure content fits above footer */}
        <div className="w-full h-full flex flex-col items-center justify-start pt-24 pb-20 md:pt-20 md:pb-24 lg:pt-16 lg:pb-28">
          
          {/* Hero Text */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 lg:mb-10 tracking-wider"
            style={{
              color: theme === 'dark' ? '#ff4444' : '#cc0000',
              textShadow: theme === 'dark' 
                ? '0 0 20px rgba(255, 68, 68, 0.6), 0 0 40px rgba(255, 68, 68, 0.4), 0 4px 8px rgba(0, 0, 0, 0.8)'
                : '0 0 20px rgba(204, 0, 0, 0.5), 0 0 40px rgba(204, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.6)',
            }}
          >
            {heroText}
          </motion.h1>

          {/* Cards Grid - More compact on large screens */}
          <div className="w-full max-w-7xl mx-auto">
            <div className={`
              grid gap-3 sm:gap-4 md:gap-5 lg:gap-6
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
                    delay={index * 150}
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
            ? 'radial-gradient(circle at center, transparent 25%, rgba(0, 0, 0, 0.8) 100%)'
            : 'radial-gradient(circle at center, transparent 25%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />
    </motion.div>
  );
}
