
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Settings, LogOut, Music, Shield, Mail } from "lucide-react";
import BottomNavigation from '@/components/BottomNavigation';
import { useSettings } from '@/contexts/SettingsContext';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { language, theme, setLanguage, setTheme, t } = useSettings();
  const [defaultInstrument, setDefaultInstrument] = useState(() => {
    return localStorage.getItem('defaultInstrument') || 'violin';
  });

  const userProfile = {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    subscription: "Premium",
    joinDate: "March 2024"
  };

  const instruments = [
    { value: "piano", label: t('piano') },
    { value: "violin", label: t('violin') },
    { value: "guitar", label: t('guitar') },
    { value: "trumpet", label: t('trumpet') },
    { value: "drums", label: t('drums') },
  ];

  const handleInstrumentChange = (value: string) => {
    setDefaultInstrument(value);
    localStorage.setItem('defaultInstrument', value);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700 sticky top-0 z-40">
        <div className="mx-auto px-4 py-6 max-w-lg">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="w-10 h-10 p-0 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{t('profile')}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('settingsPreferences')}</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-8 space-y-6 max-w-lg">
        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{userProfile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-gradient-to-r from-gold-100 to-yellow-100 text-gold-800 text-xs font-medium">
                  {userProfile.subscription}
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Since {userProfile.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-600 font-semibold text-gray-900 dark:text-white">
              <Mail className="w-5 h-5 mr-3" />
              {t('changeEmail')}
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-600 font-semibold text-gray-900 dark:text-white">
              <Shield className="w-5 h-5 mr-3" />
              {t('changePassword')}
            </Button>
          </div>
        </div>

        {/* Music Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Music className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('musicPreferences')}</h3>
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
              {t('defaultInstrument')}
            </label>
            <Select value={defaultInstrument} onValueChange={handleInstrumentChange}>
              <SelectTrigger className="h-12 rounded-2xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {instruments.map((instrument) => (
                  <SelectItem key={instrument.value} value={instrument.value}>
                    {instrument.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {t('defaultInstrumentDesc')}
            </p>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('appSettings')}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                {t('language')}
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-12 rounded-2xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="ru">{t('russian')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                {t('theme')}
              </label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="h-12 rounded-2xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="light">{t('light')}</SelectItem>
                  <SelectItem value="dark">{t('dark')}</SelectItem>
                  <SelectItem value="system">{t('system')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Account Management */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('account')}</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-600 font-semibold text-gray-900 dark:text-white">
              <Settings className="w-5 h-5 mr-3" />
              {t('subscriptionManagement')}
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-600 font-semibold text-gray-900 dark:text-white">
              {t('exportAllData')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 font-semibold text-red-700 dark:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProfileScreen;
