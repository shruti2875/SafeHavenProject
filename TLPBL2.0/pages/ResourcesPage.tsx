
import React, { useState } from 'react';
import { generateResources } from '../services/geminiService';
import { SparklesIcon } from '../components/Icons';

const ResourcesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse('');
    const result = await generateResources(query);
    setResponse(result);
    setIsLoading(false);
  };
  
  const quickSearches = [
    "Find shelters near me",
    "How to create a safety plan",
    "Legal aid for domestic violence",
    "Support groups for survivors"
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="text-center">
        <SparklesIcon className="mx-auto h-12 w-12 text-sky-500" />
        <h1 className="mt-4 text-3xl font-bold text-slate-800">Resource Finder</h1>
        <p className="mt-2 text-slate-600">
          Ask for help finding information, support services, or guidance. Your conversations are private.
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question, for example: 'What are the signs of an abusive relationship?'"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            rows={4}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding Resources...
              </>
            ) : 'Get Help'}
          </button>
        </form>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">Or try a quick search:</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
            {quickSearches.map(search => (
                <button 
                    key={search} 
                    onClick={() => setQuery(search)} 
                    className="text-sm bg-sky-100 text-sky-800 py-1 px-3 rounded-full hover:bg-sky-200"
                    disabled={isLoading}
                >
                    {search}
                </button>
            ))}
        </div>
      </div>

      {response && (
        <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Here's what I found:</h2>
          <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
