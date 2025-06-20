
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface PieceInfoProps {
  selectedPiece?: {
    title: string;
    composer: string;
  };
  skillLevel?: string;
}

const PieceInfo = ({ selectedPiece, skillLevel }: PieceInfoProps) => {
  const skillLevels = [
    { value: "beginner", label: "Beginner", color: "bg-green-50 text-green-600 border-green-200" },
    { value: "intermediate", label: "Intermediate", color: "bg-orange-50 text-orange-600 border-orange-200" },
    { value: "advanced", label: "Advanced", color: "bg-red-50 text-red-600 border-red-200" },
  ];

  const currentSkillLevel = skillLevels.find(level => level.value === skillLevel);

  return (
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
  );
};

export default PieceInfo;
