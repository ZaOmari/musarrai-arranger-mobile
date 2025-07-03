import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Music, Piano, Guitar, User, Sparkles, ChevronDown, Plus, X, Settings } from "lucide-react";
import BottomNavigation from '@/components/BottomNavigation';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [arrangementType, setArrangementType] = useState('');
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [globalSkillLevel, setGlobalSkillLevel] = useState('');
  const [useGlobalSkill, setUseGlobalSkill] = useState(true);
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

  const availableInstruments = [
    { value: "piano", label: "Piano", icon: Piano },
    { value: "violin", label: "Violin", icon: Music },
    { value: "guitar", label: "Guitar", icon: Guitar },
    { value: "trumpet", label: "Trumpet", icon: Music },
    { value: "drums", label: "Drums", icon: Music },
    { value: "cello", label: "Cello", icon: Music },
    { value: "flute", label: "Flute", icon: Music },
  ];

  const arrangementTypes = [
    { value: "solo", label: "Solo", description: "Single instrument" },
    { value: "solo_accompaniment", label: "Solo + Accompaniment", description: "Lead with support" },
    { value: "solo_ensemble", label: "Solo + Ensemble", description: "Featured with group" },
    { value: "ensemble", label: "Ensemble", description: "Multiple instruments" },
    { value: "chamber_orchestra", label: "Chamber Orchestra", description: "Coming Soon", disabled: true },
  ];

  const instrumentRoles = [
    { value: "solo", label: "Solo" },
    { value: "accompaniment", label: "Accompaniment" },
    { value: "ensemble", label: "Ensemble" },
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

  // Reset instruments when arrangement type changes
  useEffect(() => {
    setSelectedInstruments([]);
  }, [arrangementType]);

  const handleSearchFocus = () => {
    setShowDropdown(true);
  };

  const handlePieceSelect = (piece) => {
    setSelectedPiece(piece);
    setSearchQuery(piece.title);
    setShowDropdown(false);
  };

  const getMaxInstruments = () => {
    switch (arrangementType) {
      case 'solo': return 1;
      case 'solo_accompaniment': return 2;
      case 'solo_ensemble': return 4;
      case 'ensemble': return 4;
      default: return 0;
    }
  };

  const getAvailableRoles = () => {
    switch (arrangementType) {
      case 'solo': return [{ value: "solo", label: "Solo" }];
      case 'solo_accompaniment': return [
        { value: "solo", label: "Solo" },
        { value: "accompaniment", label: "Accompaniment" }
      ];
      case 'solo_ensemble': return instrumentRoles;
      case 'ensemble': return [{ value: "ensemble", label: "Ensemble" }];
      default: return [];
    }
  };

  const addInstrument = () => {
    if (selectedInstruments.length < getMaxInstruments()) {
      const newInstrument = {
        id: Date.now(),
        instrument: '',
        role: getAvailableRoles()[0]?.value || 'solo',
        skillLevel: useGlobalSkill ? globalSkillLevel : ''
      };
      setSelectedInstruments([...selectedInstruments, newInstrument]);
    }
  };

  const removeInstrument = (id) => {
    setSelectedInstruments(selectedInstruments.filter(inst => inst.id !== id));
  };

  const updateInstrument = (id, field, value) => {
    setSelectedInstruments(selectedInstruments.map(inst => 
      inst.id === id ? { ...inst, [field]: value } : inst
    ));
  };

  const handleGenerate = () => {
    if (arrangementType && selectedInstruments.length > 0 && 
        (useGlobalSkill ? globalSkillLevel : selectedInstruments.every(inst => inst.skillLevel))) {
      navigate('/result', { 
        state: { 
          arrangementType,
          instruments: selectedInstruments,
          globalSkillLevel: useGlobalSkill ? globalSkillLevel : null,
          selectedPiece: selectedPiece || filteredLibrary[0] || musicLibrary[0]
        } 
      });
    }
  };

  const canGenerate = arrangementType && selectedInstruments.length > 0 && 
    (useGlobalSkill ? globalSkillLevel : selectedInstruments.every(inst => inst.skillLevel));

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

          {/* Arrangement Type Block */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">⚙️ Arrangement Type</h2>
            <div className="space-y-3">
              {arrangementTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => !type.disabled && setArrangementType(type.value)}
                  disabled={type.disabled}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    arrangementType === type.value
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : type.disabled
                      ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {type.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {type.description}
                      </div>
                    </div>
                    {type.disabled && (
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Instruments Block */}
          {arrangementType && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">🎻 Add Instruments</h2>
                {selectedInstruments.length < getMaxInstruments() && (
                  <Button
                    onClick={addInstrument}
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                )}
              </div>

              {selectedInstruments.map((instrument, index) => (
                <div key={instrument.id} className="p-4 border border-gray-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      Instrument {index + 1}
                    </span>
                    {selectedInstruments.length > 1 && (
                      <Button
                        onClick={() => removeInstrument(instrument.id)}
                        variant="ghost"
                        size="sm"
                        className="p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        Instrument
                      </label>
                      <Select 
                        value={instrument.instrument} 
                        onValueChange={(value) => updateInstrument(instrument.id, 'instrument', value)}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-gray-200 text-sm">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                          {availableInstruments.map((inst) => (
                            <SelectItem key={inst.value} value={inst.value} className="h-8">
                              <div className="flex items-center gap-2">
                                <inst.icon className="w-3 h-3" />
                                <span className="text-sm">{inst.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        Role
                      </label>
                      <Select 
                        value={instrument.role} 
                        onValueChange={(value) => updateInstrument(instrument.id, 'role', value)}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-gray-200 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                          {getAvailableRoles().map((role) => (
                            <SelectItem key={role.value} value={role.value} className="h-8">
                              <span className="text-sm">{role.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {!useGlobalSkill && (
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        Skill Level
                      </label>
                      <Select 
                        value={instrument.skillLevel} 
                        onValueChange={(value) => updateInstrument(instrument.id, 'skillLevel', value)}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-gray-200 text-sm">
                          <SelectValue placeholder="Select level..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                          {skillLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value} className="h-8">
                              <span className="text-sm">{level.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              ))}

              {selectedInstruments.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-8">
                  <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  Click "Add" to start adding instruments
                </div>
              )}
            </div>
          )}

          {/* Skill Level Block */}
          {arrangementType && selectedInstruments.length > 0 && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">📉 Skill Level</h2>
                <Button
                  onClick={() => setUseGlobalSkill(!useGlobalSkill)}
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {useGlobalSkill ? 'Individual' : 'Global'}
                </Button>
              </div>

              {useGlobalSkill ? (
                <div className="grid grid-cols-3 gap-3">
                  {skillLevels.map((level) => (
                    <Tooltip key={level.value}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setGlobalSkillLevel(level.value)}
                          className={`p-4 rounded-2xl border-2 transition-all text-center ${
                            globalSkillLevel === level.value
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
              ) : (
                <div className="text-sm text-gray-600 text-center py-4">
                  Set individual skill levels for each instrument above
                </div>
              )}
            </div>
          )}

          {/* Summary Section */}
          {arrangementType && selectedInstruments.length > 0 && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Type:</span>
                  <span className="text-sm text-gray-900">
                    {arrangementTypes.find(t => t.value === arrangementType)?.label}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-700">Instruments:</span>
                  {selectedInstruments.map((inst, index) => {
                    const instrumentInfo = availableInstruments.find(i => i.value === inst.instrument);
                    return (
                      <div key={inst.id} className="flex justify-between items-center text-sm pl-4">
                        <span className="text-gray-600">
                          {index + 1}. {instrumentInfo?.label || 'Not selected'}
                        </span>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {inst.role}
                          </Badge>
                          {!useGlobalSkill && inst.skillLevel && (
                            <Badge variant="secondary" className="text-xs">
                              {skillLevels.find(s => s.value === inst.skillLevel)?.label}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {useGlobalSkill && globalSkillLevel && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Global Skill:</span>
                    <Badge variant="secondary" className="text-sm">
                      {skillLevels.find(s => s.value === globalSkillLevel)?.label}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

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
                Please complete all sections to generate your arrangement
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