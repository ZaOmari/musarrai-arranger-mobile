
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, Download, FileText, Music, Volume2 } from "lucide-react";
import BottomNavigation from '@/components/BottomNavigation';
import NotesSection from '@/components/NotesSection';

const ScoreViewScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState("0:00");
  const [totalTime] = useState("3:24");
  const [notes, setNotes] = useState('');

  const { arrangement, fromSave } = location.state || {};

  const skillLevelColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800"
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setPlaybackTime(prev => {
          const [min, sec] = prev.split(':').map(Number);
          const totalSec = min * 60 + sec + 1;
          if (totalSec >= 204) {
            setIsPlaying(false);
            clearInterval(interval);
            return "0:00";
          }
          return `${Math.floor(totalSec / 60)}:${(totalSec % 60).toString().padStart(2, '0')}`;
        });
      }, 1000);
    }
  };

  const handleBackToLibrary = () => {
    navigate('/library');
  };

  const exportOptions = [
    { type: 'PDF', icon: FileText, description: 'Print-ready sheet music' },
    { type: 'MIDI', icon: Music, description: 'Digital audio file' },
    { type: 'MusicXML', icon: Volume2, description: 'Structured music data' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
        <div className="mx-auto px-4 py-6 max-w-lg">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="w-10 h-10 p-0 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">Score View</h1>
              <p className="text-sm text-gray-500 font-medium">Interactive Sheet Music</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-8 space-y-6 max-w-lg">
        {/* Piece Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{arrangement?.title || "Für Elise"}</h2>
              <p className="text-gray-500 font-medium">{arrangement?.composer || "Ludwig van Beethoven"}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-gray-500 font-medium">Adapted for:</span>
            <Badge className="font-medium bg-blue-50 text-blue-600 border-blue-200">
              {arrangement?.targetInstrument || "Piano"}
            </Badge>
            <Badge className={`font-medium border ${skillLevelColors[arrangement?.skillLevel] || skillLevelColors.Beginner}`}>
              {arrangement?.skillLevel || "Beginner"}
            </Badge>
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
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <img 
                  src="/lovable-uploads/ce7752b7-9bee-430c-86af-e98c4c1b494b.png" 
                  alt="Sheet Music Preview"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-gray-500 font-medium mt-4">
                Scroll, zoom, and interact with your arrangement
              </p>
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

        {/* Notes Section */}
        <NotesSection notes={notes} setNotes={setNotes} />

        {/* Back to Library Button */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <Button 
            onClick={handleBackToLibrary}
            className="w-full h-16 text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all rounded-2xl shadow-lg"
          >
            Back to Library
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ScoreViewScreen;
