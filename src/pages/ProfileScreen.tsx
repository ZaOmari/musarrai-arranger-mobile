
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Settings, LogOut, Globe, Palette, Music, Shield, Mail } from "lucide-react";
import BottomNavigation from '@/components/BottomNavigation';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [defaultInstrument, setDefaultInstrument] = useState('violin');
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  const userProfile = {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    subscription: "Premium",
    joinDate: "March 2024"
  };

  const instruments = [
    { value: "piano", label: "Piano" },
    { value: "violin", label: "Violin" },
    { value: "guitar", label: "Guitar" },
    { value: "trumpet", label: "Trumpet" },
    { value: "drums", label: "Drums" },
  ];

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
        <div className="mx-auto px-4 py-6 max-w-lg">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="w-10 h-10 p-0 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">Profile</h1>
              <p className="text-sm text-gray-500 font-medium">Settings & Preferences</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-8 space-y-6 max-w-lg">
        {/* User Info Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
              <p className="text-sm text-gray-500 font-medium">{userProfile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-gradient-to-r from-gold-100 to-yellow-100 text-gold-800 text-xs font-medium">
                  {userProfile.subscription}
                </Badge>
                <span className="text-xs text-gray-500 font-medium">Since {userProfile.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white font-semibold text-gray-900">
              <Mail className="w-5 h-5 mr-3" />
              Change Email
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white font-semibold text-gray-900">
              <Shield className="w-5 h-5 mr-3" />
              Change Password
            </Button>
          </div>
        </div>

        {/* Music Preferences */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Music className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Music Preferences</h3>
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-900 mb-2 block">
              Default Instrument
            </label>
            <Select value={defaultInstrument} onValueChange={setDefaultInstrument}>
              <SelectTrigger className="h-12 rounded-2xl border-gray-200 bg-gray-50">
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
            <p className="text-xs text-gray-500 mt-2 font-medium">
              This will be pre-selected when creating new arrangements
            </p>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">App Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">
                Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-12 rounded-2xl border-gray-200 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">
                Theme
              </label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="h-12 rounded-2xl border-gray-200 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Account Management */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Account</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white font-semibold text-gray-900">
              <Settings className="w-5 h-5 mr-3" />
              Subscription Management
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white font-semibold text-gray-900">
              Export All Data
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 rounded-2xl bg-red-50 border-red-200 hover:bg-red-100 font-semibold text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProfileScreen;
