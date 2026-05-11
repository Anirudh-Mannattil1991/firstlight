import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, useTranslation } from '@/lib/translations';
import { LocalStorage } from '@/lib/db';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = LocalStorage.getLanguage();
    return (saved as Language) || 'en';
  });

  const t = useTranslation(language);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    LocalStorage.setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
