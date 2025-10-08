'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation } from '@/lib/translations';
import FlagIcon from '@/components/FlagIcon';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = ['English', 'Farsi', 'Chinese', 'Russian', 'Ukrainian', 'Hindi'] as const;

const LANGUAGE_NAMES: Record<typeof LANGUAGES[number], string> = {
  'English': 'English',
  'Farsi': 'فارسی',
  'Chinese': '中文',
  'Russian': 'Русский',
  'Ukrainian': 'Українська',
  'Hindi': 'हिन्दी',
};

interface HeaderProps {
  currentPage?: number;
  onLogoClick?: () => void;
}

export default function Header({ currentPage = 1, onLogoClick }: HeaderProps) {
  const { theme, toggleTheme, language, setLanguage } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Close language dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLangDropdownOpen && !target.closest('.language-dropdown')) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangDropdownOpen]);

  const navLinks = [
    { label: getTranslation('header.blog', language), href: '#blog' },
    { label: getTranslation('header.faq', language), href: '#faq' },
    { label: getTranslation('header.privacy', language), href: '#privacy' },
    { label: getTranslation('header.about', language), href: '#about' },
  ];
  
  const loginText = getTranslation('header.login', language);

  return (
    <header className="relative w-full z-50 glass flex-shrink-0">
      <div className="h-20 px-5 md:px-[60px] flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Image
              src="/logo-64.png"
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
              onClick={onLogoClick}
            />
          </motion.div>
        </div>

        {/* Center: Navigation (Medium+ screens only) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Dropdown - ALL SCREENS */}
          <div className="relative language-dropdown">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="p-2 md:px-4 md:py-2 rounded-lg border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-colors flex items-center gap-2"
              aria-label="Select language"
            >
              <FlagIcon language={language} className="w-5 h-4" />
              <span className="hidden md:inline">{LANGUAGE_NAMES[language]}</span>
            </button>
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className={`absolute top-full mt-2 glass rounded-lg overflow-hidden shadow-lg min-w-[180px] md:min-w-[200px] ${
                    language === 'Farsi' ? 'left-0' : 'right-0'
                  }`}
                  style={{
                    direction: language === 'Farsi' ? 'rtl' : 'ltr',
                  }}
                >
                  {/* Vertical list of languages */}
                  <div className="flex flex-col">
                    {LANGUAGES.map((lang, index) => (
                      <motion.button
                        key={lang}
                        initial={{ opacity: 0, x: language === 'Farsi' ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-[var(--bg-surface)] transition-colors flex items-center gap-3 ${
                          language === lang ? 'bg-[var(--bg-surface)] text-[var(--color-primary)]' : ''
                        }`}
                        style={{
                          direction: lang === 'Farsi' ? 'rtl' : 'ltr',
                        }}
                      >
                        <FlagIcon language={lang} className="w-6 h-4" />
                        <span>{LANGUAGE_NAMES[lang]}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle - ALL SCREENS */}
          <button
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              toggleTheme({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
            }}
            className="p-2 rounded-lg border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-all duration-300"
            aria-label="Toggle theme"
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.div>
          </button>

          {/* Login Button - Medium+ screens only */}
          <button className="hidden md:block px-6 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition-colors">
            {loginText}
          </button>

          {/* Hamburger Menu - Small screens only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Small screens only */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 md:hidden z-[100]"
            />
            
            {/* Menu Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-5 right-5 bg-[var(--bg-overlay)] backdrop-blur-xl md:hidden z-[101] rounded-2xl shadow-2xl overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-overlay)',
                border: '1px solid var(--border-default)',
                top: '88px', // Header height (80px) + 8px spacing
              }}
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-3 mb-6 mt-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2 px-3 rounded-lg hover:bg-[var(--bg-surface)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Divider */}
                <div className="h-px bg-[var(--border-default)] my-4" />

                {/* Login Button */}
                <button className="w-full px-4 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition-colors text-sm font-medium">
                  {loginText}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}