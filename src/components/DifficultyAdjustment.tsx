
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DifficultyAdjustmentProps {
  skillLevel?: string;
}

const DifficultyAdjustment = ({ skillLevel }: DifficultyAdjustmentProps) => {
  const skillLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  return (
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
  );
};

export default DifficultyAdjustment;
