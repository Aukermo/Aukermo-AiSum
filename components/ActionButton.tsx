
import React from 'react';
import Loader from './Loader';

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, disabled, isLoading, label }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative flex items-center justify-center w-full max-w-xs px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800/50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
    >
      {isLoading ? (
        <>
          <span className="opacity-0">{label}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};

export default ActionButton;
