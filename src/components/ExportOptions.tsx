
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText, Music, Volume2 } from "lucide-react";

const ExportOptions = () => {
  const exportOptions = [
    { type: 'PDF', icon: FileText, description: 'Print-ready sheet music' },
    { type: 'MIDI', icon: Music, description: 'Digital audio file' },
    { type: 'Audio', icon: Volume2, description: 'MP3 recording' },
  ];

  return (
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
  );
};

export default ExportOptions;
