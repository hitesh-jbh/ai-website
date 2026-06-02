import React, { useState } from 'react';

export default function VaultsPage() {
  const [activeSegment, setActiveSegment] = useState('My Vaults');
  const [activeTab, setActiveTab] = useState('Vaults');
  const [isCreating, setIsCreating] = useState(false);
  
  const [vaults, setVaults] = useState([]);
  
  const [savedFeed, setSavedFeed] = useState([
    {
      id: 101,
      title: 'Deep Learning Optimization Weights',
      author: 'Krishan Kumar',
      role: 'AI Researcher',
      summary: 'Curated resource containing pre-trained tensor layouts and gradient metrics for conversational multi-agent systems.',
      type: 'PDF Document',
      size: '14.2 MB',
      likes: 42,
      saved: true,
      timestamp: '2 hours ago'
    },
    {
      id: 102,
      title: 'Advanced Tailwind Component Architecture v4',
      author: 'Aman Bhati',
      role: 'Technical Lead',
      summary: 'Production-ready code vectors detailing responsive complex layout design architectures without custom stylesheet overrides.',
      type: 'Code Repository Link',
      url: 'https://github.com/knowvault/tailwind-pro',
      likes: 128,
      saved: true,
      timestamp: 'Yesterday'
    }
  ]);

  const [followedFeed, setFollowedFeed] = useState([
    {
      id: 201,
      vaultName: 'Hitesh Premium Development Vault',
      owner: 'Hitesh Chouhan',
      subscribers: '1.2K followers',
      latestUpdate: 'Uploaded 8 new system design structural diagrams.',
      vaultsCount: 14,
      resourcesCount: 182,
      isFollowing: true
    }
  ]);

  const [formFields, setFormFields] = useState({
    title: '',
    description: '',
    summary: '',
    phone: '9625181162',
    email: 'ashishsingh0828@gmail.com'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateVaultSubmit = (e) => {
    e.preventDefault();
    if (!formFields.title.trim()) return;

    const newVault = {
      id: Date.now(),
      title: formFields.title,
      description: formFields.description || 'No description provided.',
      summary: formFields.summary || 'No overview summary documented.',
      resourcesCount: 0,
      contact: { phone: formFields.phone, email: formFields.email }
    };

    setVaults(prev => [newVault, ...prev]);
    setFormFields({
      title: '',
      description: '',
      summary: '',
      phone: '9625181162',
      email: 'ashishsingh0828@gmail.com'
    });
    setIsCreating(false);
    setActiveSegment('My Vaults');
  };

  const toggleLikeSavedItem = (id) => {
    setSavedFeed(prev => prev.map(item => item.id === id ? { ...item, likes: item.likes + (item.liked ? -1 : 1), liked: !item.liked } : item));
  };

  const removeSavedItem = (id) => {
    setSavedFeed(prev => prev.filter(item => item.id !== id));
  };

  const toggleFollowVault = (id) => {
    setFollowedFeed(prev => prev.map(item => item.id === id ? { ...item, isFollowing: !item.isFollowing } : item));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-24 md:pb-12 relative overflow-hidden">
      
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 py-4 md:px-8 shadow-xs">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { if (isCreating) setIsCreating(false); else window.history.back(); }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isCreating ? 'Create Vault' : 'Vaults'}
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {['Home', 'Leaderboard', 'Vaults', 'Options'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        
        {isCreating ? (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm animate-in slide-in-from-bottom-4 duration-200">
            <form onSubmit={handleCreateVaultSubmit} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Title</label>
                <input 
                  type="text"
                  name="title"
                  required
                  value={formFields.title}
                  onChange={handleInputChange}
                  placeholder="e.g., My Project"
                  className="w-full bg-[#F1F5F9] border-0 rounded-2xl px-4 py-4 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Description</label>
                <textarea 
                  name="description"
                  value={formFields.description}
                  onChange={handleInputChange}
                  placeholder="Write a detailed description..."
                  rows={4}
                  className="w-full bg-[#F1F5F9] border-0 rounded-2xl p-4 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Summary</label>
                <input 
                  type="text"
                  name="summary"
                  value={formFields.summary}
                  onChange={handleInputChange}
                  placeholder="Brief overview"
                  className="w-full bg-[#F1F5F9] border-0 rounded-2xl px-4 py-4 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Phone</label>
                <input 
                  type="tel"
                  name="phone"
                  value={formFields.phone}
                  onChange={handleInputChange}
                  placeholder="9625181162"
                  className="w-full bg-[#F1F5F9] border-0 rounded-2xl px-4 py-4 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Email</label>
                <input 
                  type="email"
                  name="email"
                  value={formFields.email}
                  onChange={handleInputChange}
                  placeholder="ashishsingh0828@gmail.com"
                  className="w-full bg-[#F1F5F9] border-0 rounded-2xl px-4 py-4 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-2xl text-base transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-base shadow-md shadow-blue-500/10 transition-colors"
                >
                  Create Vault
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200/20 text-center">
              {[
                { id: 'My Vaults', icon: '📁' },
                { id: 'Saved', icon: '🔖' },
                { id: 'Followed', icon: '❤️' }
              ].map((segment) => {
                const isActive = activeSegment === segment.id;
                return (
                  <button
                    key={segment.id}
                    onClick={() => setActiveSegment(segment.id)}
                    className={`py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      isActive 
                        ? 'bg-white text-blue-600 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{segment.icon}</span>
                    <span>{segment.id}</span>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md">
                  A
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">ASHISH</h2>
                  <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1">
                    <span>📞</span> 9625181162
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#F8FAFC] border border-slate-200/40 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-slate-900">{vaults.length}</p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">My Vaults</p>
                </div>
                <div className="bg-[#F8FAFC] border border-slate-200/40 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-slate-900">
                    {vaults.reduce((acc, curr) => acc + curr.resourcesCount, 0)}
                  </p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Resources</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsCreating(true)}
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 transition-all active:scale-[0.99]"
            >
              <span className="text-xl leading-none">+</span>
              <span className="text-base tracking-wide">Create Vault</span>
            </button>

            <div className="pt-2">
              
              {activeSegment === 'My Vaults' && (
                vaults.length === 0 ? (
                  <div className="text-center py-14 px-4 bg-white rounded-3xl border border-slate-200/60 shadow-xs space-y-3 animate-in fade-in duration-200">
                    <div className="text-slate-300 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0A2.25 2.25 0 004.5 15h15a2.25 2.25 0 002.25-2.25m-19.5 0v3.75A2.25 2.25 0 004.5 18.75h15a2.25 2.25 0 002.25-2.25v-3.75M12 3v13.5M9 7.5l3-3 3 3" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-800">No vaults yet</h4>
                      <p className="text-xs font-semibold text-slate-400 max-w-[280px] mx-auto leading-relaxed">Create your first vault to organize your resources.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    {vaults.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-xs flex flex-col space-y-2 hover:border-slate-300 transition-all">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1 min-w-0 pr-4">
                            <h4 className="text-base font-bold text-slate-800 truncate">{item.title}</h4>
                            <p className="text-sm font-semibold text-[#2563EB] truncate">{item.summary}</p>
                          </div>
                          <span className="shrink-0 bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-lg border border-blue-100">
                            {item.resourcesCount} Res
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 border-t border-slate-50 pt-2">{item.description}</p>
                        <div className="flex gap-4 text-[10px] font-bold text-slate-400 pt-1">
                          <span>📞 {item.contact.phone}</span>
                          <span>✉️ {item.contact.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {activeSegment === 'Saved' && (
                savedFeed.length === 0 ? (
                  <div className="text-center py-14 px-4 bg-white rounded-3xl border border-slate-200/60 shadow-xs text-slate-400 font-bold uppercase tracking-wider text-xs">
                    Your saved items list is empty
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    {savedFeed.map((post) => (
                      <div key={post.id} className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs space-y-4 relative group">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                              {post.author[0]}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 leading-none">{post.author}</h4>
                              <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">{post.role} • {post.timestamp}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeSavedItem(post.id)}
                            className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider">
                            {post.type} {post.size && `• ${post.size}`}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">{post.title}</h3>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed">{post.summary}</p>
                        </div>

                        {post.url && (
                          <a 
                            href={post.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-1"
                          >
                            Open Link Resource External Destination <span>↗</span>
                          </a>
                        )}

                        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-slate-400 text-xs font-bold">
                          <button 
                            onClick={() => toggleLikeSavedItem(post.id)}
                            className={`flex items-center gap-1.5 ${post.liked ? 'text-rose-500' : 'hover:text-slate-600'}`}
                          >
                            <span>{post.liked ? '❤️' : '🖤'}</span>
                            <span>{post.likes} Likes</span>
                          </button>

                          <button className="hover:text-slate-600 flex items-center gap-1">
                            <span>📤</span> Share
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {activeSegment === 'Followed' && (
                followedFeed.length === 0 ? (
                  <div className="text-center py-14 px-4 bg-white rounded-3xl border border-slate-200/60 shadow-xs text-slate-400 font-bold uppercase tracking-wider text-xs">
                    You are not following any alternative channels
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    {followedFeed.map((vault) => (
                      <div key={vault.id} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-base font-bold text-slate-900 leading-tight">{vault.vaultName}</h4>
                            <p className="text-xs font-semibold text-slate-400 mt-1">Owner: {vault.owner} • {vault.subscribers}</p>
                          </div>
                          
                          <button
                            onClick={() => toggleFollowVault(vault.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                              vault.isFollowing 
                                ? 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {vault.isFollowing ? 'Following' : 'Follow'}
                          </button>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-medium text-slate-600">
                          <strong className="text-slate-800">Latest Feed Update:</strong> {vault.latestUpdate}
                        </div>

                        <div className="flex gap-4 text-xs font-bold text-slate-400 px-1">
                          <span>📁 {vault.vaultsCount} Vault Matrices</span>
                          <span>📦 {vault.resourcesCount} Shared Artifacts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

            </div>
          </>
        )}
      </main>

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white px-4 py-2 shadow-2xl md:hidden">
        <div className="flex items-center justify-around">
          {['Home', 'Leaderboard', 'Vaults', 'Options'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`flex flex-col items-center gap-1 p-2 ${activeTab === tab ? 'text-blue-600 scale-105' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="text-[10px] font-bold">{tab}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}