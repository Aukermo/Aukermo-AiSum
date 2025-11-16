
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <textarea
      {...props}
      className="w-full flex-grow bg-gray-800/80 border-2 border-gray-700 rounded-lg p-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
      rows={10}
    />
  );
};

export default TextArea;
