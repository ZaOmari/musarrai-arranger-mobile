
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";

const AudioControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState("0:00");
  const [totalTime] = useState("3:24");

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

  return (
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
  );
};

export default AudioControls;
