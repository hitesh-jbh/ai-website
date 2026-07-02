import { useState } from 'react';

export const ShareAnswer = ({ query, answer }) => {
  const [copied, setCopied] = useState(false);

  const generateShareLink = () => {
    // Pack the query and answer tightly into a safe string
    const payload = JSON.stringify({ q: query, a: answer });
    const encodedData = btoa(encodeURIComponent(payload));
    
    // Generates a link like: http://localhost:5173/shared?data=...
    const shareUrl = `${window.location.origin}/shared?data=${encodedData}`;
    
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={generateShareLink}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center gap-2"
    >
      {copied ? "Link Copied! 📋" : "Share Answer 🔗"}
    </button>
  );
};