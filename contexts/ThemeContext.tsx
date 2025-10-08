'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Language = 'English' | 'Farsi' | 'Chinese' | 'Russian' | 'Ukrainian' | 'Hindi';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (position?: { x: number; y: number }) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  ripplePosition: { x: number; y: number } | null;
  isRippling: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('English');
  const [mounted, setMounted] = useState(false);
  const [ripplePosition, setRipplePosition] = useState<{ x: number; y: number } | null>(null);
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted && language) {
      localStorage.setItem('language', language);
      
      // Apply language class to body for font switching
      const body = document.body;
      body.classList.remove('lang-english', 'lang-farsi', 'lang-chinese', 'lang-russian', 'lang-ukrainian', 'lang-hindi');
      body.classList.add(`lang-${language.toLowerCase()}`);
    }
  }, [language, mounted]);

  const toggleTheme = (position?: { x: number; y: number }) => {
    if (!mounted) return; // Don't toggle before mounted
    
    // Set ripple position and trigger animation
    if (position) {
      setRipplePosition(position);
      setIsRippling(true);
    }

    // Delay theme change to sync with ripple animation
    setTimeout(() => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }, 150);

    // Reset ripple after animation
    setTimeout(() => {
      setIsRippling(false);
    }, 500);
  };

  // Always provide context, even before mounted (SSR compatibility)
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, setLanguage, ripplePosition, isRippling }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

