
import React from 'react';

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  if (!summary) {
    return (
      <div className="w-full h-full min-h-[200px] bg-gray-800/80 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center p-4">
        <p className="text-gray-500">Output will appear here...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[200px] bg-gray-800/80 border-2 border-gray-700 rounded-lg p-4 overflow-y-auto">
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 whitespace-pre-wrap">
        {summary}
      </div>
    </div>
  );
};

export default SummaryDisplay;
