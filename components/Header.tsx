
import React from 'react';

const SparklesIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3z" />
    <path d="M5 21L6 17" />
    <path d="M19 21L18 17" />
    <path d="M12 3V1" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="text-center border-b border-gray-700/50 pb-6">
      <div className="flex items-center justify-center gap-4 mb-2">
        <SparklesIcon />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Gemini Text Toolkit
        </h1>
      </div>
      <p className="text-md md:text-lg text-gray-400">
        Summarize, humanize, and transform your text with AI.
      </p>
    </header>
  );
};

export default Header;
