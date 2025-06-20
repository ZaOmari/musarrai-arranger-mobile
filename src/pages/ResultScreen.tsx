
import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import ResultHeader from '@/components/ResultHeader';
import PieceInfo from '@/components/PieceInfo';
import SheetMusicPreview from '@/components/SheetMusicPreview';
import AudioControls from '@/components/AudioControls';
import DifficultyAdjustment from '@/components/DifficultyAdjustment';
import ExportOptions from '@/components/ExportOptions';
import NotesSection from '@/components/NotesSection';

const ResultScreen = () => {
  const location = useLocation();
  const { originalInstrument, targetInstrument, skillLevel, selectedPiece } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ResultHeader 
        originalInstrument={originalInstrument} 
        targetInstrument={targetInstrument} 
      />

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <PieceInfo selectedPiece={selectedPiece} skillLevel={skillLevel} />
        <SheetMusicPreview />
        <AudioControls />
        <DifficultyAdjustment skillLevel={skillLevel} />
        <ExportOptions />
        <NotesSection />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ResultScreen;
