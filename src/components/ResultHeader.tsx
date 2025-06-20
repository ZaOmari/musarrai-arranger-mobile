
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share } from "lucide-react";

interface ResultHeaderProps {
  originalInstrument?: string;
  targetInstrument?: string;
}

const ResultHeader = ({ originalInstrument, targetInstrument }: ResultHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-lg mx-auto px-4 py-4">
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
  );
};

export default ResultHeader;
