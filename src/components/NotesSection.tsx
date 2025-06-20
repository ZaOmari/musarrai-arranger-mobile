
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";

const NotesSection = () => {
  const [notes, setNotes] = useState('');

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 pb-4">
        <h3 className="text-xl font-bold text-gray-900">Notes & Comments</h3>
      </div>
      <div className="px-6 pb-6">
        <Textarea
          placeholder="Add notes for your teacher or personal reference..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[120px] resize-none rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
        />
      </div>
    </div>
  );
};

export default NotesSection;
