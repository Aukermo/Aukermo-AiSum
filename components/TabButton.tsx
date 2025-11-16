
import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  const baseClasses = "w-full px-4 py-2 text-sm font-semibold rounded-md focus:outline-none transition-all duration-300 transform";
  const activeClasses = "bg-blue-600 text-white shadow-lg scale-105";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700/50 scale-100";

  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {label}
    </button>
  );
};

export default TabButton;
