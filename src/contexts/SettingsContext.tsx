
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';

interface SettingsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const translations = {
  en: {
    // Profile screen
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
    drums: 'Drums',
    
    // Home screen
    home: 'Home',
    library: 'Library',
    
    // Result screen
    yourArrangement: 'Your Arrangement',
    arrangementSaved: 'Arrangement Saved!',
    redirectingToScore: 'Redirecting to Score View...',
    saveArrangement: 'Save Arrangement',
    saving: 'Saving...',
    
    // Score View screen
    scoreView: 'Score View',
    adaptedFor: 'Adapted for',
    playPause: 'Play/Pause',
    exportOptions: 'Export Options',
    backToLibrary: 'Back to Library',
    notes: 'Notes',
    addNotes: 'Add your notes here...',
    
    // Library screen
    myLibrary: 'My Library',
    recentArrangements: 'Recent Arrangements',
    noArrangements: 'No arrangements yet',
    createFirst: 'Create your first arrangement!',
    readapt: 'Re-adapt',
    
    // Common
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    share: 'Share',
    export: 'Export',
    pdf: 'PDF',
    midi: 'MIDI',
    musicxml: 'MusicXML'
  },
  ru: {
    // Profile screen
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
    drums: 'Барабаны',
    
    // Home screen
    home: 'Главная',
    library: 'Библиотека',
    
    // Result screen
    yourArrangement: 'Ваша аранжировка',
    arrangementSaved: 'Аранжировка сохранена!',
    redirectingToScore: 'Переход к просмотру партитуры...',
    saveArrangement: 'Сохранить аранжировку',
    saving: 'Сохранение...',
    
    // Score View screen
    scoreView: 'Просмотр партитуры',
    adaptedFor: 'Адаптировано для',
    playPause: 'Воспроизвести/Пауза',
    exportOptions: 'Параметры экспорта',
    backToLibrary: 'Вернуться в библиотеку',
    notes: 'Заметки',
    addNotes: 'Добавьте свои заметки здесь...',
    
    // Library screen
    myLibrary: 'Моя библиотека',
    recentArrangements: 'Недавние аранжировки',
    noArrangements: 'Пока нет аранжировок',
    createFirst: 'Создайте свою первую аранжировку!',
    readapt: 'Переадаптировать',
    
    // Common
    back: 'Назад',
    save: 'Сохранить',
    cancel: 'Отмена',
    edit: 'Редактировать',
    delete: 'Удалить',
    share: 'Поделиться',
    export: 'Экспорт',
    pdf: 'PDF',
    midi: 'MIDI',
    musicxml: 'MusicXML'
  }
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <SettingsContext.Provider value={{ language, setLanguage, t }}>
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
