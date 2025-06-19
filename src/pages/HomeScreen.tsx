
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Music, Piano, Guitar, User, Sparkles } from "lucide-react";
import BottomNavigation from '@/components/BottomNavigation';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [originalInstrument, setOriginalInstrument] = useState('');
  const [targetInstrument, setTargetInstrument] = useState('');
  const [skillLevel, setSkillLevel] = useState('');

  const musicLibrary = [
    { id: 1, title: "Für Elise", composer: "Ludwig van Beethoven", genre: "Classical", difficulty: "Intermediate" },
    { id: 2, title: "Canon in D", composer: "Johann Pachelbel", genre: "Baroque", difficulty: "Beginner" },
    { id: 3, title: "Moonlight Sonata", composer: "Ludwig van Beethoven", genre: "Classical", difficulty: "Advanced" },
    { id: 4, title: "Ave Maria", composer: "Franz Schubert", genre: "Romantic", difficulty: "Intermediate" },
    { id: 5, title: "The Four Seasons", composer: "Antonio Vivaldi", genre: "Baroque", difficulty: "Advanced" },
  ];

  const instruments = [
    { value: "piano", label: "Piano", icon: Piano },
    { value: "violin", label: "Violin", icon: Music },
    { value: "guitar", label: "Guitar", icon: Guitar },
    { value: "trumpet", label: "Trumpet", icon: Music },
    { value: "drums", label: "Drums", icon: Music },
  ];

  const skillLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const filteredLibrary = musicLibrary.filter(piece =>
    piece.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    piece.composer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerate = () => {
    if (originalInstrument && targetInstrument && skillLevel) {
      navigate('/result', { 
        state: { 
          originalInstrument, 
          targetInstrument, 
          skillLevel,
          selectedPiece: filteredLibrary[0] || musicLibrary[0]
        } 
      });
    }
  };

  const canGenerate = originalInstrument && targetInstrument && skillLevel;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
        <div className="mx-auto px-4 py-6 max-w-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Music className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">MusArrAI</h1>
                <p className="text-sm text-gray-500 font-medium">Arrange Your Music</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/profile')}
              className="w-12 h-12 p-0 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <User className="w-6 h-6 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Single unified form */}
      <div className="mx-auto px-4 py-8 max-w-lg">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 space-y-8">
          {/* Search */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Find Your Music</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search pieces or composers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            
            {/* Music library results */}
            {searchQuery && (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {filteredLibrary.map((piece) => (
                  <div key={piece.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-base">{piece.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{piece.composer}</p>
                    </div>
                    <Badge variant="outline" className="text-xs font-medium bg-white">
                      {piece.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instruments */}
          <div className="space-y-4">
            <div>
              <label className="text-base font-semibold text-gray-900 mb-3 block">
                Original Instrument
              </label>
              <Select value={originalInstrument} onValueChange={setOriginalInstrument}>
                <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-gray-50 text-base">
                  <SelectValue placeholder="Select original instrument" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {instruments.map((instrument) => (
                    <SelectItem key={instrument.value} value={instrument.value} className="h-12">
                      <div className="flex items-center gap-3">
                        <instrument.icon className="w-5 h-5" />
                        <span className="font-medium">{instrument.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-base font-semibold text-gray-900 mb-3 block">
                Target Instrument
              </label>
              <Select value={targetInstrument} onValueChange={setTargetInstrument}>
                <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-gray-50 text-base">
                  <SelectValue placeholder="Select target instrument" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {instruments.map((instrument) => (
                    <SelectItem key={instrument.value} value={instrument.value} className="h-12">
                      <div className="flex items-center gap-3">
                        <instrument.icon className="w-5 h-5" />
                        <span className="font-medium">{instrument.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Skill Level */}
          <div className="space-y-4">
            <label className="text-base font-semibold text-gray-900 block">
              Skill Level
            </label>
            <div className="grid grid-cols-1 gap-3">
              {skillLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSkillLevel(level.value)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    skillLevel === level.value
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  <div className="font-semibold text-gray-900 text-base">
                    {level.label}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {level.value === 'beginner' && 'Perfect for starting out'}
                    {level.value === 'intermediate' && 'Some experience required'}
                    {level.value === 'advanced' && 'For skilled musicians'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="w-full h-16 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Generate Arrangement
          </Button>

          {!canGenerate && (
            <p className="text-center text-sm text-gray-500 font-medium">
              Please select all options to generate your arrangement
            </p>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HomeScreen;
