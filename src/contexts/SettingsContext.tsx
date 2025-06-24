
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';
type Theme = 'light' | 'dark' | 'system';

interface SettingsContextType {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const translations = {
  en: {
    profile: 'Profile',
    settingsPreferences: 'Settings & Preferences',
    changeEmail: 'Change Email',
    changePassword: 'Change Password',
    musicPreferences: 'Music Preferences',
    defaultInstrument: 'Default Instrument',
    defaultInstrumentDesc: 'This will be pre-selected when creating new arrangements',
    appSettings: 'App Settings',
    language: 'Language',
    theme: 'Theme',
    account: 'Account',
    subscriptionManagement: 'Subscription Management',
    exportAllData: 'Export All Data',
    logout: 'Logout',
    english: 'English',
    russian: 'Русский',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    piano: 'Piano',
    violin: 'Violin',
    guitar: 'Guitar',
    trumpet: 'Trumpet',
    drums: 'Drums'
  },
  ru: {
    profile: 'Профиль',
    settingsPreferences: 'Настройки и предпочтения',
    changeEmail: 'Изменить Email',
    changePassword: 'Изменить пароль',
    musicPreferences: 'Музыкальные предпочтения',
    defaultInstrument: 'Инструмент по умолчанию',
    defaultInstrumentDesc: 'Будет предварительно выбран при создании новых аранжировок',
    appSettings: 'Настройки приложения',
    language: 'Язык',
    theme: 'Тема',
    account: 'Аккаунт',
    subscriptionManagement: 'Управление подпиской',
    exportAllData: 'Экспорт всех данных',
    logout: 'Выйти',
    english: 'English',
    russian: 'Русский',
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
    piano: 'Фортепиано',
    violin: 'Скрипка',
    guitar: 'Гитара',
    trumpet: 'Труба',
    drums: 'Барабаны'
  }
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // system theme
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  return (
    <SettingsContext.Provider value={{ language, theme, setLanguage, setTheme, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
