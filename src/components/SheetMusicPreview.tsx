
import React from 'react';
import { FileText, Music } from "lucide-react";

const SheetMusicPreview = () => {
  return (
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
          <h4 className="text-gray-900 font-bold text-lg mb-4">Interactive Sheet Music</h4>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <img 
              src="/lovable-uploads/ce7752b7-9bee-430c-86af-e98c4c1b494b.png" 
              alt="Pirates of the Caribbean Sheet Music"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Scroll, zoom, and interact with your arrangement
          </p>
        </div>
      </div>
    </div>
  );
};

export default SheetMusicPreview;
