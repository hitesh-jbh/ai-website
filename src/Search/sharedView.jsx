import { useState } from 'react';

export const SharedView = () => {
  // Read and decode the URL immediately during the initial state setup
  const [content] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');
    
    if (!dataParam) return null;
    
    try {
      const decodedData = decodeURIComponent(atob(dataParam));
      return JSON.parse(decodedData);
    } catch (err) {
      console.error("Failed to parse shared content", err);
      return "ERROR"; // Marker for invalid link string
    }
  });

  // Check state markers directly 
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400">
        <p className="text-lg font-medium">⚠️ No shared data provided in the link.</p>
      </div>
    );
  }

  if (content === "ERROR") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400">
        <p className="text-lg font-medium">⚠️ Invalid or broken shared link.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 my-8 space-y-4 border border-gray-800 bg-black/40 backdrop-blur-md rounded-2xl">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Shared Query</span>
        <h1 className="text-xl font-bold text-gray-200">"{content.q}"</h1>
      </div>
      
      <div className="h-[1px] bg-gray-800 w-full" />

      <div className="space-y-2">
        <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">AI Answer</span>
        <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-800">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{content.a}</p>
        </div>
      </div>
    </div>
  );
};
