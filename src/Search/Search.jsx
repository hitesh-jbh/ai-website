import React, { useState, useRef, useEffect } from 'react';

const mockRecentSearches = [
  { id: 1, query: 'Hello', date: '2/6/2026' },
  { id: 2, query: 'Best AI tools for developers', date: '28/5/2026' }
];

export default function SearchPage({ onChangePlan }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [answerDepth, setAnswerDepth] = useState('Balanced');
  const [viewMode, setViewMode] = useState('landing');
  const [activeTab, setActiveTab] = useState('Home');
  
  const [bottomSheet, setBottomSheet] = useState({ visible: false, type: null, contextQuestion: '' });
  const [showDepthDropdown, setShowDepthDropdown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnswerMarkdown, setAiAnswerMarkdown] = useState('');

  const [contribText, setContribText] = useState('');
  const [contribType, setContribType] = useState('LINK');
  const [contribLink, setContribLink] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (viewMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, viewMode]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setViewMode('results');
    setIsLoading(true);
    setAiAnswerMarkdown('');

    setTimeout(() => {
      setAiAnswerMarkdown(
        `of these differences when interacting across cultures.\n* **Appropriateness of Tone:**\n    * **Enthusiastic Hello:** For friends or exciting situations.\n    * **Calm Hello:** For professional or formal encounters.\n    * **Questioning Hello:** "Hello?" when answering the phone or checking if someone is present.\n\nIn essence, "hello" is more than just a word; it's a social key that unlocks connection and communication in its many forms.`
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    setViewMode('results');
    setIsLoading(true);
    setTimeout(() => {
      setAiAnswerMarkdown(`Custom parsed dynamic response for query: ${query}`);
      setIsLoading(false);
    }, 800);
  };

  const handleStartChatIntent = () => {
    setViewMode('chat');
    if (messages.length === 0 && searchQuery) {
      executeChatMsg(searchQuery);
    }
  };

  const executeChatMsg = (text) => {
    if (!text.trim()) return;
    
    const userMsg = { 
      id: Date.now(), 
      sender: 'user', 
      text, 
      depth: answerDepth 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `This is an ongoing conversational response item inside the standard execution layout framework parsed for: "${text}".`,
        depth: answerDepth,
        associatedQuestion: text
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleContributionSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Contribution:', { text: contribText, type: contribType, link: contribLink, file: selectedFileName });
    setBottomSheet({ visible: false, type: null, contextQuestion: '' });
    setContribText('');
    setContribLink('');
    setSelectedFileName('');
    alert('Answer contribution successfully saved!');
  };

  const openContributionSheet = (questionContext) => {
    setBottomSheet({
      visible: true,
      type: 'contribute',
      contextQuestion: questionContext || searchQuery || 'General Query'
    });
  };

  const clearChat = () => {
    setMessages([]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between pb-24 md:pb-6 relative">
      
      <header className="w-full max-w-3xl mx-auto px-4 pt-6 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-40 pb-3 border-b border-slate-50 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (viewMode === 'results' || viewMode === 'chat') setViewMode('landing');
              else window.history.back();
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 transition-colors shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {viewMode === 'chat' ? 'Chat' : 'Search'}
          </h1>
        </div>

        <div className="flex items-center gap-5 text-blue-500 relative">
          <button onClick={onChangePlan} className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-colors text-slate-700 flex items-center gap-1">
            <span>Plans</span> 👑
          </button>

          <button onClick={handleStartChatIntent} className={`transition-colors ${viewMode === 'chat' ? 'text-blue-700 scale-105 font-black' : 'hover:text-blue-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785 4.5 4.5 0 003.181-1.395c.294-.294.74-.417 1.144-.318a9.458 9.458 0 002.739.418z" />
            </svg>
          </button>
          
          <button onClick={() => setBottomSheet({ visible: true, type: 'history', contextQuestion: '' })} className="hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button onClick={() => setShowDepthDropdown(!showDepthDropdown)} className="hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.023c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </button>

          {showDepthDropdown && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl p-1 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
              {[
                { name: 'Quick', desc: 'Short (Quick)' },
                { name: 'Balanced', desc: 'Medium (Balanced)' },
                { name: 'Deep', desc: 'Deep (Detailed)' }
              ].map(opt => (
                <button
                  key={opt.name}
                  onClick={() => { setAnswerDepth(opt.name); setShowDepthDropdown(false); }}
                  className={`w-full text-left font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors ${answerDepth === opt.name ? 'bg-slate-100 text-blue-600' : 'hover:bg-slate-50'}`}
                >
                  {opt.desc}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="w-full max-w-3xl mx-auto px-4 flex-1 mt-4 overflow-y-auto">
        
        {viewMode === 'landing' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <form onSubmit={handleSearchSubmit} className="space-y-5">
              <div className="relative flex items-center bg-[#F1F5F9] rounded-2xl px-4 py-4 border border-transparent focus-within:bg-white focus-within:border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-slate-400 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
                </svg>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-transparent border-0 pl-3 pr-12 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
                />
                <button type="submit" className="absolute right-3 p-2 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" /></svg>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 tracking-wide block">Answer depth</label>
                <div className="grid grid-cols-3 p-1.5 bg-[#F1F5F9] rounded-2xl border border-slate-100">
                  {['Quick', 'Balanced', 'Deep'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setAnswerDepth(mode)}
                      className={`py-2.5 text-sm font-bold rounded-xl transition-all ${answerDepth === mode ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                      {mode === 'Quick' ? 'Quick ⚡' : mode === 'Balanced' ? 'Balanced ⚖️' : 'Deep 🔍'}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex items-center justify-between text-slate-900">
                <h2 className="text-lg font-bold tracking-tight">Recent Searches</h2>
                <button onClick={() => setBottomSheet({ visible: true, type: 'history', contextQuestion: '' })} className="p-1 text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
              </div>
              <div className="space-y-3">
                {mockRecentSearches.map((search) => (
                  <button
                    key={search.id}
                    onClick={() => handleRecentSearchClick(search.query)}
                    className="w-full flex items-center justify-between text-left p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:bg-slate-50 hover:border-slate-200 group transition-all"
                  >
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-slate-800 group-hover:text-slate-900">{search.query}</h3>
                      <p className="text-xs font-medium text-slate-400">{search.date}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'results' && (
          <div className="space-y-6 animate-in fade-in duration-200 pb-12">
            <div className="relative flex items-center bg-[#F1F5F9] rounded-2xl px-4 py-4 border border-slate-200 shadow-xs">
              <input 
                type="text"
                readOnly
                onClick={() => setViewMode('landing')}
                value={searchQuery || "Hello"}
                className="w-full bg-transparent border-0 text-base text-slate-800 font-medium focus:outline-none focus:ring-0 cursor-pointer"
              />
              <div className="flex items-center gap-2 absolute right-3">
                <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" /></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-2xl text-center">
              {['Quick', 'Balanced', 'Deep'].map(mode => (
                <span key={mode} className={`py-2 text-xs font-bold rounded-xl ${answerDepth === mode ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400'}`}>
                  {mode}
                </span>
              ))}
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 min-h-[150px] flex flex-col justify-between">
              {isLoading ? (
                <div className="flex items-center gap-1.5 animate-pulse py-4">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <div className="prose prose-slate text-base leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                  {aiAnswerMarkdown}
                </div>
              )}
            </div>

            <button 
              onClick={() => openContributionSheet(searchQuery)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Contribute Answer
            </button>
          </div>
        )}

        {viewMode === 'chat' && (
          <div className="space-y-6 pb-36 animate-in fade-in duration-200">
            {messages.length === 0 && (
              <div className="text-center py-20 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 flex items-center justify-center rounded-full mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785 4.5 4.5 0 003.181-1.395c.294-.294.74-.417 1.144-.318a9.458 9.458 0 002.739.418z" /></svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Start a conversation</h3>
                  <p className="text-sm text-slate-400 font-medium">Ask a question to get an AI-powered answer</p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-base shadow-xs font-medium ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
                
                {/* DYNAMICALLY RENDER THE CONTRIBUTE BUTTON UNDER EVERY AI CHAT CHUNK RESPONSE */}
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => openContributionSheet(msg.associatedQuestion)}
                    className="mt-1 flex items-center gap-1.5 text-xs font-bold text-blue-500 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-3 py-1.5 rounded-xl transition-all shadow-xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Contribute Answer
                  </button>
                )}

                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 px-1 block pt-0.5">
                  {msg.sender === 'user' ? `You • ${msg.depth}` : 'Vault AI'}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="bg-slate-100 rounded-2xl rounded-bl-none px-5 py-4 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {viewMode === 'chat' && (
        <div className="fixed bottom-16 inset-x-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-4 z-40">
          <div className="max-w-3xl mx-auto px-4 space-y-3">
            <div className="flex justify-center">
              <div className="inline-flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/40">
                {['Quick', 'Balanced', 'Deep'].map(m => (
                  <button 
                    key={m} 
                    onClick={() => setAnswerDepth(m)}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${answerDepth === m ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <form 
              onSubmit={(e) => { e.preventDefault(); const t = e.target.chatInput.value; if(t.trim()){ executeChatMsg(t); e.target.reset(); } }}
              className="relative flex items-center bg-[#F1F5F9] rounded-2xl px-4 py-3.5 shadow-md border border-slate-200/40"
            >
              <input 
                name="chatInput"
                type="text"
                placeholder="Ask a question..."
                className="w-full bg-transparent border-0 pl-1 pr-12 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
              />
              <button type="submit" className="absolute right-3 p-2 rounded-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white px-4 py-2 shadow-xl md:hidden">
        <div className="flex items-center justify-around">
          {['Home', 'Leaderboard', 'Vaults', 'Options'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 p-2 ${activeTab === tab ? 'text-blue-500' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12" />
              </svg>
              <span className="text-xs font-semibold">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {bottomSheet.visible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setBottomSheet({ visible: false, type: null, contextQuestion: '' })} />
          
          {bottomSheet.type === 'contribute' && (
            <div className="relative w-full max-w-xl bg-white border border-slate-100 rounded-t-3xl p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200 z-50">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Contribute Answer</h3>
                <button onClick={() => setBottomSheet({ visible: false, type: null, contextQuestion: '' })} className="text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question: {bottomSheet.contextQuestion}</p>
              
              <form onSubmit={handleContributionSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">Your Answer</label>
                  <textarea 
                    value={contribText}
                    onChange={(e) => setContribText(e.target.value)}
                    required
                    placeholder="Enter your answer here..."
                    rows={4}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-colors resize-none"
                  />
                </div>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
                
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current.click()}
                  className="w-full bg-blue-100 text-blue-600 font-bold py-3 px-4 rounded-xl text-sm hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25z" /></svg>
                  {selectedFileName ? `Selected: ${selectedFileName}` : 'Add File'}
                </button>

                <div className="flex gap-2">
                  {['LINK', 'PDF', 'VIDEO'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setContribType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${contribType === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <input 
                  type="text"
                  value={contribLink}
                  onChange={(e) => setContribLink(e.target.value)}
                  placeholder="Paste link..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl text-sm transition-colors shadow-md">
                  Submit Answer
                </button>
              </form>
            </div>
          )}

          {bottomSheet.type === 'history' && (
            <div className="relative w-full max-w-xl bg-white border border-slate-100 rounded-t-3xl p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200 z-50 pb-10">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Your Threads</h3>
                <button onClick={() => setBottomSheet({ visible: false, type: null, contextQuestion: '' })} className="text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="space-y-2">
                <div onClick={() => { setBottomSheet({ visible: false, type: null, contextQuestion: '' }); handleRecentSearchClick('Hello'); }} className="p-4 rounded-xl bg-purple-50 border border-purple-100 cursor-pointer hover:bg-purple-100 transition-colors">
                  <p className="font-bold text-sm text-slate-800">Hello</p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1">2/6/2026</p>
                </div>
                <div className="text-center py-6 text-xs text-slate-400 font-bold uppercase tracking-wider">No older recent searches found</div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}