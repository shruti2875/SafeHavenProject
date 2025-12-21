
import React from 'react';

const QuickExitButton: React.FC = () => {
  const handleExit = () => {
    // Redirects to a neutral site. In a real scenario, you might also want to clear session history.
    window.location.replace('https://www.google.com/search?q=weather');
  };

  return (
    <button
      onClick={handleExit}
      className="fixed bottom-4 right-4 z-50 bg-red-600 text-white font-bold py-3 px-5 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      aria-label="Quick Exit"
    >
      <div className="flex items-center space-x-2">
        <span>Quick Exit</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
    </button>
  );
};

export default QuickExitButton;
