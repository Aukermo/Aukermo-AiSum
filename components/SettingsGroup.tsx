
import React from 'react';

interface SettingsGroupProps {
  label: string;
  options: readonly string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const SettingsGroup: React.FC<SettingsGroupProps> = ({ label, options, selectedValue, onSelect }) => {
  return (
    <div className="flex-1">
      <h3 className="text-sm font-semibold text-gray-400 mb-2">{label}</h3>
      <div className="flex items-center gap-2 flex-wrap p-2 bg-gray-800/80 rounded-lg border border-gray-700/50">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md capitalize transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 ${
              selectedValue === option
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsGroup;
