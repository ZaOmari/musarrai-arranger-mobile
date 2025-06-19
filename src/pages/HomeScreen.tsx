
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Music, Piano, Violin, Guitar, Drums, Trumpet, User, Sparkles } from "lucide-react";

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
    { value: "violin", label: "Violin", icon: Violin },
    { value: "guitar", label: "Guitar", icon: Guitar },
    { value: "trumpet", label: "Trumpet", icon: Trumpet },
    { value: "drums", label: "Drums", icon: Drums },
  ];

  const skillLevels = [
    { value: "beginner", label: "Beginner", color: "bg-green-100 text-green-800" },
    { value: "intermediate", label: "Intermediate", color: "bg-yellow-100 text-yellow-800" },
    { value: "advanced", label: "Advanced", color: "bg-red-100 text-red-800" },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">MusArrAI</h1>
              <p className="text-xs text-slate-500">Arrange Your Music</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 p-0 rounded-full"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Search Library */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Music Library
            </CardTitle>
            <CardDescription>
              Browse and select from our classical collection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search pieces or composers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredLibrary.map((piece) => (
                <div key={piece.id} className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-slate-800">{piece.title}</h4>
                      <p className="text-sm text-slate-600">{piece.composer}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {piece.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instrument Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Arrangement Settings</CardTitle>
            <CardDescription>
              Configure your musical arrangement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Original Instrument
              </label>
              <Select value={originalInstrument} onValueChange={setOriginalInstrument}>
                <SelectTrigger>
                  <SelectValue placeholder="Select original instrument" />
                </SelectTrigger>
                <SelectContent>
                  {instruments.map((instrument) => (
                    <SelectItem key={instrument.value} value={instrument.value}>
                      <div className="flex items-center gap-2">
                        <instrument.icon className="w-4 h-4" />
                        {instrument.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Target Instrument
              </label>
              <Select value={targetInstrument} onValueChange={setTargetInstrument}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target instrument" />
                </SelectTrigger>
                <SelectContent>
                  {instruments.map((instrument) => (
                    <SelectItem key={instrument.value} value={instrument.value}>
                      <div className="flex items-center gap-2">
                        <instrument.icon className="w-4 h-4" />
                        {instrument.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Skill Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {skillLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSkillLevel(level.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      skillLevel === level.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-slate-800">
                      {level.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button 
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Arrangement
        </Button>

        {!canGenerate && (
          <p className="text-center text-sm text-slate-500">
            Please select all options to generate your arrangement
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
