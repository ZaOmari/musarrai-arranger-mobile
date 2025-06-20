
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Music, Piano, Guitar, User, Sparkles, ChevronDown } from "lucide-react";
import BottomNavigation from '@/components/BottomNavigation';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [originalInstrument, setOriginalInstrument] = useState('');
  const [targetInstrument, setTargetInstrument] = useState('violin'); // Default to violin
  const [skillLevel, setSkillLevel] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const musicLibrary = [
    { id: 1, title: "Für Elise", composer: "Ludwig van Beethoven", genre: "Classical", difficulty: "Intermediate" },
    { id: 2, title: "Canon in D", composer: "Johann Pachelbel", genre: "Baroque", difficulty: "Beginner" },
    { id: 3, title: "Moonlight Sonata", composer: "Ludwig van Beethoven", genre: "Classical", difficulty: "Advanced" },
    { id: 4, title: "Ave Maria", composer: "Franz Schubert", genre: "Romantic", difficulty: "Intermediate" },
    { id: 5, title: "The Four Seasons", composer: "Antonio Vivaldi", genre: "Baroque", difficulty: "Advanced" },
  ];

  const popularPieces = [
    { id: 1, title: "Für Elise", composer: "Ludwig van Beethoven", genre: "Classical", difficulty: "Intermediate" },
    { id: 2, title: "Canon in D", composer: "Johann Pachelbel", genre: "Baroque", difficulty: "Beginner" },
    { id: 3, title: "Moonlight Sonata", composer: "Ludwig van Beethoven", genre: "Classical", difficulty: "Advanced" },
  ];

  const instruments = [
    { value: "piano", label: "Piano", icon: Piano },
    { value: "violin", label: "Violin", icon: Music },
    { value: "guitar", label: "Guitar", icon: Guitar },
    { value: "trumpet", label: "Trumpet", icon: Music },
    { value: "drums", label: "Drums", icon: Music },
  ];

  const skillLevels = [
    { value: "beginner", label: "Beginner", tooltip: "Perfect for starting out" },
    { value: "intermediate", label: "Intermediate", tooltip: "Some experience required" },
    { value: "advanced", label: "Advanced", tooltip: "For skilled musicians" },
  ];

  const filteredLibrary = musicLibrary.filter(piece =>
    piece.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    piece.composer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setShowDropdown(true);
  };

  const handlePieceSelect = (piece) => {
    setSelectedPiece(piece);
    setSearchQuery(piece.title);
    setShowDropdown(false);
  };

  const handleGenerate = () => {
    if (originalInstrument && targetInstrument && skillLevel) {
      navigate('/result', { 
        state: { 
          originalInstrument, 
          targetInstrument, 
          skillLevel,
          selectedPiece: selectedPiece || filteredLibrary[0] || musicLibrary[0]
        } 
      });
    }
  };

  const canGenerate = originalInstrument && targetInstrument && skillLevel;

  const getSelectedInstrument = () => {
    return instruments.find(inst => inst.value === targetInstrument);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
          <div className="mx-auto px-3 py-6 max-w-lg">
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

        <div className="mx-auto px-3 py-8 max-w-lg space-y-6">
          {/* Music Search Block */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Find Your Music</h2>
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <Input
                placeholder="Search pieces or composers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="pl-12 pr-10 h-12 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
              />
              <ChevronDown 
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
              />
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div 
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-64 overflow-y-auto"
                >
                  {!searchQuery && (
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Popular Pieces</h3>
                      {popularPieces.map((piece) => (
                        <div 
                          key={piece.id} 
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                          onClick={() => handlePieceSelect(piece)}
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{piece.title}</h4>
                            <p className="text-xs text-gray-500">{piece.composer}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {piece.difficulty}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {searchQuery && filteredLibrary.length > 0 && (
                    <div className="p-2">
                      {filteredLibrary.map((piece) => (
                        <div 
                          key={piece.id} 
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                          onClick={() => handlePieceSelect(piece)}
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{piece.title}</h4>
                            <p className="text-xs text-gray-500">{piece.composer}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {piece.difficulty}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {searchQuery && filteredLibrary.length === 0 && (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No pieces found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Instruments Block */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">
            <h2 className="text-xl font-bold text-gray-900">Select Instruments</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-base font-semibold text-gray-900 mb-3 block">
                  Original Instrument
                </label>
                <Select value={originalInstrument} onValueChange={setOriginalInstrument}>
                  <SelectTrigger className="h-12 rounded-2xl border-gray-200 bg-gray-50 text-base">
                    <SelectValue placeholder="Select original instrument" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-white border border-gray-200 shadow-lg z-50">
                    {instruments.map((instrument) => (
                      <SelectItem key={instrument.value} value={instrument.value} className="h-10">
                        <div className="flex items-center gap-3">
                          <instrument.icon className="w-4 h-4" />
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
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 flex-1 p-4 rounded-2xl border-2 border-blue-500 bg-blue-50">
                    <Music className="w-6 h-6 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Violin</div>
                      <div className="text-sm text-gray-500">Your main instrument</div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-12 px-4 rounded-2xl border-gray-200 bg-gray-50 hover:bg-white"
                      >
                        <span className="text-sm font-medium">or choose other</span>
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                      {instruments.filter(inst => inst.value !== 'violin').map((instrument) => (
                        <DropdownMenuItem 
                          key={instrument.value}
                          onClick={() => setTargetInstrument(instrument.value)}
                          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg"
                        >
                          <instrument.icon className="w-4 h-4" />
                          <span className="font-medium">{instrument.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {targetInstrument !== 'violin' && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Selected: {getSelectedInstrument()?.label}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTargetInstrument('violin')}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Reset to Violin
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skill Level Block */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skill Level</h2>
            <div className="grid grid-cols-3 gap-3">
              {skillLevels.map((level) => (
                <Tooltip key={level.value}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setSkillLevel(level.value)}
                      className={`p-4 rounded-2xl border-2 transition-all text-center ${
                        skillLevel === level.value
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
                      }`}
                    >
                      <div className="font-semibold text-gray-900 text-sm">
                        {level.label}
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{level.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Generate Button Block */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <Button 
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full h-16 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Generate Arrangement
            </Button>

            {!canGenerate && (
              <p className="text-center text-sm text-gray-500 font-medium mt-4">
                Please select all options to generate your arrangement
              </p>
            )}
          </div>
        </div>

        <BottomNavigation />
      </div>
    </TooltipProvider>
  );
};

export default HomeScreen;
