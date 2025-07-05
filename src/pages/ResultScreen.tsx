import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import BottomNavigation from '@/components/BottomNavigation';
import ResultHeader from '@/components/ResultHeader';
import PieceInfo from '@/components/PieceInfo';
import SheetMusicPreview from '@/components/SheetMusicPreview';
import AudioControls from '@/components/AudioControls';
import DifficultyAdjustment from '@/components/DifficultyAdjustment';
import ExportOptions from '@/components/ExportOptions';
import NotesSection from '@/components/NotesSection';
import { useSettings } from '@/contexts/SettingsContext';

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [notes, setNotes] = useState('');
  const { originalInstrument, targetInstrument, skillLevel, selectedPiece } = location.state || {};

  const handleSaveArrangement = async () => {
    setIsSaving(true);
    
    // Simulate saving process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage for now (in real app this would be saved to backend)
    const savedArrangements = JSON.parse(localStorage.getItem('savedArrangements') || '[]');
    console.log('Current saved arrangements:', savedArrangements);
    
    const newArrangement = {
      id: Date.now(),
      title: selectedPiece?.title || 'Untitled Piece',
      composer: selectedPiece?.composer || 'Unknown',
      originalInstrument: typeof originalInstrument === 'string' ? originalInstrument : (originalInstrument?.value || 'Unknown'),
      targetInstrument: typeof targetInstrument === 'string' ? targetInstrument : (targetInstrument?.value || 'Unknown'), 
      skillLevel: typeof skillLevel === 'string' ? skillLevel : (skillLevel?.value || 'Beginner'),
      dateCreated: new Date().toISOString().split('T')[0],
      thumbnail: "🎼",
      notes: notes
    };
    
    console.log('New arrangement:', newArrangement);
    savedArrangements.unshift(newArrangement); // Add to beginning of array
    localStorage.setItem('savedArrangements', JSON.stringify(savedArrangements));
    console.log('Arrangements after save:', savedArrangements);
    
    setIsSaving(false);
    
    toast({
      title: t('arrangementSaved'),
      description: t('redirectingToScore'),
    });
    
    // Navigate to Score View after a short delay
    setTimeout(() => {
      navigate('/score', {
        state: {
          arrangement: newArrangement,
          fromSave: true
        }
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
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
        <NotesSection notes={notes} setNotes={setNotes} />
        
        {/* Save Arrangement Button */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <Button 
            onClick={handleSaveArrangement}
            disabled={isSaving}
            className="w-full h-16 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all rounded-2xl shadow-lg disabled:opacity-50"
          >
            <Save className="w-6 h-6 mr-3" />
            {isSaving ? t('saving') : t('saveArrangement')}
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ResultScreen;
