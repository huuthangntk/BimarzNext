'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';

const SCATTERED_WORDS = ['SAFE', 'PRIVATE', 'UNLIMITED', 'GLOBAL', 'ANONYMOUS'];

const PRICING_CARDS = [
  {
    name: 'Starter',
    price: '$2.50',
    bandwidth: '50 GB',
    features: ['Unlimited connections', 'Multi-user support', 'Germany & Netherlands', 'No logs saved'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$5.99',
    bandwidth: '100 GB',
    features: ['Unlimited connections', 'Multi-user support', 'Germany & Netherlands', 'No logs saved'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '$7.99',
    bandwidth: '150 GB',
    features: ['Unlimited connections', 'Multi-user support', 'Germany & Netherlands', 'No logs saved'],
    popular: false,
  },
  {
    name: 'Ultimate',
    price: '$9.99',
    bandwidth: '200 GB',
    features: ['Unlimited connections', 'Multi-user support', 'Germany & Netherlands', 'No logs saved', 'Priority support'],
    popular: false,
  },
];

interface Page7Props {
  isActive?: boolean;
}

export default function Page7({ isActive = true }: Page7Props) {
  return (
    <div id="page-7-content" className="relative w-full h-full overflow-y-auto custom-scrollbar bg-gradient-to-br from-yellow-950 via-orange-900 to-pink-900">
      {/* Vibrant Flowing Gradients */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
            'linear-gradient(225deg, rgba(236, 72, 153, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)',
            'linear-gradient(315deg, rgba(139, 92, 246, 0.3) 0%, rgba(251, 191, 36, 0.3) 100%)',
            'linear-gradient(45deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.3) 100%)',
            'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Light Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(${Math.random() * 60 + 30}, 80%, 60%)`,
            boxShadow: `0 0 10px 2px hsl(${Math.random() * 60 + 30}, 80%, 60%)`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            delay: Math.random() * 5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Subtle Firework Bursts */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`burst-${i}`}
          className="absolute w-32 h-32 rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 3,
            repeat: Infinity,
            repeatDelay: 6,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 px-5 lg:px-20 py-24 lg:py-32 min-h-full">
        {/* Typography Section */}
        <div className="text-center mb-12 lg:mb-16">
          {/* "FREE!" Hero Text with Burst Effect */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-[96px] font-bold mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            style={{
              background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.5))',
            }}
          >
            FREE!
          </motion.h1>

          {/* Scattered Joyful Words - Desktop */}
          <div className="hidden lg:block relative h-32 mb-8">
            {SCATTERED_WORDS.map((word, index) => {
              const positions = [
                { left: '10%', top: '20%', rotate: -15 },
                { right: '15%', top: '10%', rotate: 10 },
                { left: '20%', bottom: '10%', rotate: 5 },
                { right: '20%', bottom: '20%', rotate: -10 },
                { left: '50%', top: '0%', rotate: 0 },
              ];

              return (
                <motion.div
                  key={word}
                  className="absolute text-2xl lg:text-3xl font-bold text-yellow-300"
                  style={positions[index]}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [positions[index].rotate, positions[index].rotate + 5, positions[index].rotate],
                  }}
                  transition={{
                    duration: 2 + index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {word}
                </motion.div>
              );
            })}
          </div>

          {/* Scattered Words - Mobile (Fewer) */}
          <div className="lg:hidden flex flex-wrap justify-center gap-4 mb-8">
            {SCATTERED_WORDS.slice(0, 3).map((word, index) => (
              <motion.span
                key={word}
                className="text-lg font-bold text-yellow-300"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.2,
                  repeat: Infinity,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Free Trial Offer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mb-12 lg:mb-16"
        >
          <GlassCard className="p-6 lg:p-8 border-2 border-yellow-400">
            <div className="text-center">
              <motion.div
                className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-sm font-bold text-black mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                🎁 SPECIAL OFFER
              </motion.div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Start Your Free Trial Today!
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 mb-2">
                Get <span className="font-bold text-yellow-400">1 GB</span> for{' '}
                <span className="font-bold text-yellow-400">1 Day</span> - Absolutely FREE!
              </p>
              <p className="text-base lg:text-lg text-gray-400 mb-4">
                Only registration required • <span className="font-bold">NO Credit Card</span> • No Strings Attached
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg text-lg hover:scale-105 transition-transform duration-200">
                Try Free - No Credit Card Required
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PRICING_CARDS.map((card, index) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="relative"
              >
                {card.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white z-10">
                    MOST POPULAR
                  </div>
                )}
                <GlassCard
                  className={`p-6 lg:p-8 h-full flex flex-col ${
                    card.popular ? 'border-2 border-purple-400' : ''
                  }`}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{card.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-yellow-400">{card.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <div className="mb-6">
                    <p className="text-xl font-semibold text-white">{card.bandwidth}</p>
                    <p className="text-sm text-gray-400">Monthly bandwidth</p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-start text-gray-300">
                        <svg
                          className="w-5 h-5 text-green-400 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-bold transition-all duration-200 ${
                      card.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                        : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Mobile Stack/Scroll */}
          <div className="md:hidden space-y-6">
            {PRICING_CARDS.map((card, index) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative"
              >
                {card.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white z-10">
                    POPULAR
                  </div>
                )}
                <GlassCard
                  className={`p-6 ${card.popular ? 'border-2 border-purple-400' : ''}`}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-yellow-400">{card.price}</span>
                    <span className="text-gray-400 text-sm">/month</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-white">{card.bandwidth}</p>
                    <p className="text-xs text-gray-400">Monthly bandwidth</p>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-start text-gray-300">
                        <svg
                          className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2.5 rounded-lg font-bold text-sm ${
                      card.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-[var(--color-primary)] text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Content Space */}
        <div className="h-20" />
      </div>
    </div>
  );
}

