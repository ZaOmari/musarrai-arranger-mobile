import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, Pause, Download, RefreshCw, FileText, Music, Volume2 } from "lucide-react";
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
    { value: "beginner", label: "Beginner", color: "bg-green-100 text-green-800" },
    { value: "intermediate", label: "Intermediate", color: "bg-yellow-100 text-yellow-800" },
    { value: "advanced", label: "Advanced", color: "bg-red-100 text-red-800" },
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
    { type: 'MusicXML', icon: Download, description: 'Universal music format' },
  ];

  const currentSkillLevel = skillLevels.find(level => level.value === skillLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-800">Your Arrangement</h1>
            <p className="text-xs text-slate-500 capitalize">
              {originalInstrument} → {targetInstrument}
            </p>
          </div>
          <div className="w-9" /> {/* Spacer for center alignment */}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Piece Info */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{selectedPiece?.title || "Für Elise"}</CardTitle>
                <p className="text-sm text-slate-600">{selectedPiece?.composer || "Ludwig van Beethoven"}</p>
              </div>
              {currentSkillLevel && (
                <Badge className={currentSkillLevel.color}>
                  {currentSkillLevel.label}
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Sheet Music Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Sheet Music Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">Interactive Sheet Music</p>
              <p className="text-sm text-slate-500">
                Scroll and zoom to view your arrangement
              </p>
              <div className="mt-4 space-y-2">
                <div className="h-1 bg-slate-200 rounded"></div>
                <div className="h-1 bg-slate-200 rounded w-3/4"></div>
                <div className="h-1 bg-slate-200 rounded w-5/6"></div>
                <div className="h-1 bg-slate-200 rounded w-2/3"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audio Controls */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-blue-600" />
              MIDI Playback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={handlePlayPause}
                size="lg"
                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-2 rounded-full w-1/4"></div>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>{playbackTime}</span>
                <span>{totalTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Adjustment */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              Adjust Difficulty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {skillLevels.map((level) => (
                <button
                  key={level.value}
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
            <Button className="w-full mt-3" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate Arrangement
            </Button>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              Export Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {exportOptions.map((option) => (
              <Button
                key={option.type}
                variant="outline"
                className="w-full justify-start h-auto p-4"
              >
                <option.icon className="w-5 h-5 mr-3 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">{option.type}</div>
                  <div className="text-sm text-slate-500">{option.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Notes & Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add notes for your teacher or personal reference..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ResultScreen;
