'use client';

import React from 'react';

type Language = 'English' | 'Farsi' | 'Chinese' | 'Russian' | 'Ukrainian' | 'Hindi';

const FLAGS: Record<Language, string> = {
  'English': 'us',
  'Farsi': 'ir',
  'Chinese': 'cn',
  'Russian': 'ru',
  'Ukrainian': 'ua',
  'Hindi': 'in',
};

interface FlagIconProps {
  language: Language;
  className?: string;
}

export default function FlagIcon({ language, className = '' }: FlagIconProps) {
  const countryCode = FLAGS[language];
  
  return (
    <img
      src={`https://flagcdn.com/${countryCode}.svg`}
      alt={`${language} flag`}
      className={`inline-block ${className}`}
      style={{ width: '1.5em', height: '1em', objectFit: 'cover' }}
    />
  );
}
