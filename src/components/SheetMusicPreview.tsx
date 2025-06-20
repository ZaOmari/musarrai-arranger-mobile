
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
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Music className="w-10 h-10 text-gray-400" />
          </div>
          <h4 className="text-gray-900 font-bold text-lg mb-2">Interactive Sheet Music</h4>
          <p className="text-gray-500 font-medium mb-6">
            Scroll, zoom, and interact with your arrangement
          </p>
          <div className="space-y-3">
            <div className="h-2 bg-gray-300 rounded-full"></div>
            <div className="h-2 bg-gray-300 rounded-full w-3/4 mx-auto"></div>
            <div className="h-2 bg-gray-300 rounded-full w-5/6 mx-auto"></div>
            <div className="h-2 bg-gray-300 rounded-full w-2/3 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetMusicPreview;
