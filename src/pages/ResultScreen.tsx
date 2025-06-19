
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, Pause, Download, RefreshCw, FileText, Music, Volume2, Share } from "lucide-react";
import BottomNavigation from '@/components/BottomNavigation';

const ResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { originalInstrument, targetInstrument, skillLevel, selectedPiece } = location.state || {};
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState("0:00");
  const [totalTime] = useState("3:24");
  const [notes, setNotes] = useState('');

  const skillLevels = [
    { value: "beginner", label: "Beginner", color: "bg-green-50 text-green-600 border-green-200" },
    { value: "intermediate", label: "Intermediate", color: "bg-orange-50 text-orange-600 border-orange-200" },
    { value: "advanced", label: "Advanced", color: "bg-red-50 text-red-600 border-red-200" },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Simulate playback time update
    if (!isPlaying) {
      const interval = setInterval(() => {
        setPlaybackTime(prev => {
          const [min, sec] = prev.split(':').map(Number);
          const totalSec = min * 60 + sec + 1;
          if (totalSec >= 204) { // 3:24 in seconds
            setIsPlaying(false);
            clearInterval(interval);
            return "0:00";
          }
          return `${Math.floor(totalSec / 60)}:${(totalSec % 60).toString().padStart(2, '0')}`;
        });
      }, 1000);
    }
  };

  const exportOptions = [
    { type: 'PDF', icon: FileText, description: 'Print-ready sheet music' },
    { type: 'MIDI', icon: Music, description: 'Digital audio file' },
    { type: 'Audio', icon: Volume2, description: 'MP3 recording' },
  ];

  const currentSkillLevel = skillLevels.find(level => level.value === skillLevel);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-6 py-4">
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
              <h1 className="text-lg font-bold text-gray-900">Your Arrangement</h1>
              <p className="text-sm text-gray-500 font-medium capitalize">
                {originalInstrument} → {targetInstrument}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-10 h-10 p-0 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Piece Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedPiece?.title || "Für Elise"}</h2>
              <p className="text-gray-500 font-medium">{selectedPiece?.composer || "Ludwig van Beethoven"}</p>
            </div>
            {currentSkillLevel && (
              <Badge className={`${currentSkillLevel.color} font-medium border`}>
                {currentSkillLevel.label}
              </Badge>
            )}
          </div>
        </div>

        {/* Sheet Music Preview */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sheet Music</h3>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Music className="w-10 h-10 text-gray-400" />
              </div>
              <h4 className="text-gray-900 font-bold text-lg mb-2">Interactive Sheet Music</h4>
              <p className="text-gray-500 font-medium mb-6">
                Scroll, zoom, and interact with your arrangement
              </p>
              <div className="space-y-3">
                <div className="h-2 bg-gray-300 rounded-full"></div>
                <div className="h-2 bg-gray-300 rounded-full w-3/4 mx-auto"></div>
                <div className="h-2 bg-gray-300 rounded-full w-5/6 mx-auto"></div>
                <div className="h-2 bg-gray-300 rounded-full w-2/3 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Volume2 className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">MIDI Playback</h3>
            </div>
          </div>
          
          <div className="px-6 pb-6 space-y-6">
            <div className="flex items-center justify-center">
              <Button
                onClick={handlePlayPause}
                size="lg"
                className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full w-1/4"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>{playbackTime}</span>
                <span>{totalTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Adjustment */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Adjust Difficulty</h3>
            </div>
          </div>
          
          <div className="px-6 pb-6 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {skillLevels.map((level) => (
                <button
                  key={level.value}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    skillLevel === level.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  <div className="font-semibold text-gray-900">
                    {level.label}
                  </div>
                </button>
              ))}
            </div>
            <Button className="w-full h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold" variant="outline">
              <RefreshCw className="w-5 h-5 mr-2" />
              Regenerate Arrangement
            </Button>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <Download className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Export Options</h3>
            </div>
          </div>
          
          <div className="px-6 pb-6 space-y-3">
            {exportOptions.map((option) => (
              <Button
                key={option.type}
                variant="outline"
                className="w-full justify-start h-16 p-4 rounded-2xl border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300 transition-all"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm">
                  <option.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{option.type}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 pb-4">
            <h3 className="text-xl font-bold text-gray-900">Notes & Comments</h3>
          </div>
          <div className="px-6 pb-6">
            <Textarea
              placeholder="Add notes for your teacher or personal reference..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[120px] resize-none rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ResultScreen;
