import React, { useState } from 'react';

const mockLeaderboardData = {
  'All Time': {
    userRank: { rank: '#4', totalUsers: '8', coins: '0', target: '#3' },
    topThree: [
      { rank: 1, name: 'Krishan K...', coins: 40 },
      { rank: 2, name: 'Aman Bh...', coins: 20 },
      { rank: 3, name: 'Hitesh Ch...', coins: 10 },
    ],
    list: [
      { rank: 4, name: 'Alisha', handle: '#4', role: 'Content Creator', coins: 0 },
      { rank: 5, name: 'aarti89306@gmail.com', handle: '#5', role: 'Content Creator', coins: 0 },
      { rank: 6, name: 'palak', handle: '#6', role: 'Content Creator', coins: 0 },
      { rank: 7, name: 'Hitesh Chouhan', handle: '#7', role: 'Content Creator', coins: 0 },
      { rank: 8, name: 'ashish', handle: '#8', role: 'Content Creator', coins: 0 },
    ]
  },
  'Daily': {
    userRank: { rank: '#2', totalUsers: '12', coins: '45', target: '#1' },
    topThree: [
      { rank: 1, name: 'Aman Bh...', coins: 65 },
      { rank: 2, name: 'You', coins: 45 },
      { rank: 3, name: 'Alisha', coins: 30 },
    ],
    list: [
      { rank: 4, name: 'Krishan K...', handle: '#4', role: 'Content Creator', coins: 25 },
      { rank: 5, name: 'palak', handle: '#5', role: 'Content Creator', coins: 15 },
      { rank: 6, name: 'ashish', handle: '#6', role: 'Content Creator', coins: 10 },
    ]
  },
  'Weekly': {
    userRank: { rank: '#5', totalUsers: '15', coins: '110', target: '#4' },
    topThree: [
      { rank: 1, name: 'Hitesh Ch...', coins: 320 },
      { rank: 2, name: 'palak', coins: 240 },
      { rank: 3, name: 'Krishan K...', coins: 195 },
    ],
    list: [
      { rank: 4, name: 'Aman Bh...', handle: '#4', role: 'Technical Writer', coins: 150 },
      { rank: 5, name: 'You', handle: '#5', role: 'Content Creator', coins: 110 },
      { rank: 6, name: 'aarti89306@gmail.com', handle: '#6', role: 'Content Creator', coins: 85 },
    ]
  },
  'Monthly': {
    userRank: { rank: '#3', totalUsers: '24', coins: '840', target: '#2' },
    topThree: [
      { rank: 1, name: 'Krishan K...', coins: 1450 },
      { rank: 2, name: 'aarti89306@gmail.com', coins: 990 },
      { rank: 3, name: 'You', coins: 840 },
    ],
    list: [
      { rank: 4, name: 'Hitesh Ch...', handle: '#4', role: 'Content Creator', coins: 720 },
      { rank: 5, name: 'Aman Bh...', handle: '#5', role: 'Technical Writer', coins: 610 },
      { rank: 6, name: 'palak', handle: '#6', role: 'Content Creator', coins: 450 },
    ]
  }
};

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState('All Time');
  const [activeTab, setActiveTab] = useState('Leaderboard');

  const currentData = mockLeaderboardData[timeframe];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-24 md:pb-12">
      
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-4 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Leaderboard</h1>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {['Home', 'Leaderboard', 'Vaults', 'Options'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
          {['All Time', 'Daily', 'Weekly', 'Monthly'].map((tab) => {
            const isActive = timeframe === tab;
            return (
              <button
                key={tab}
                onClick={() => setTimeframe(tab)}
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all tracking-wide whitespace-nowrap snap-clamp ${
                  isActive 
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-500/20' 
                    : 'bg-slate-200/70 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-3xl p-6 text-white shadow-md space-y-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Your Rank</h2>
            <p className="text-blue-100 text-sm font-medium mt-0.5">Here's where you stand in the competition</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center space-y-1">
              <p className="text-2xl font-black">{currentData.userRank.rank}</p>
              <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider leading-tight">Out of {currentData.userRank.totalUsers} users</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center space-y-1">
              <p className="text-2xl font-black">{currentData.userRank.coins}</p>
              <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider leading-tight">Coins earned</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center space-y-1">
              <p className="text-2xl font-black">{currentData.userRank.target}</p>
              <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider leading-tight">Climb higher!</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold bg-white/10 rounded-xl px-4 py-3 border border-white/5">
            <span>🔥</span>
            <p>Dynamic {timeframe} metrics active across network nodes.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 px-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.75-2.95M12 17c-3.123 0-5.747-1.928-6.75-4.63M12 17a5.97 5.97 0 0 0 4.75-2.37M6 11.77a11.94 11.94 0 0 1 4.227-4.227M13.5 11.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            <h3 className="text-base font-bold tracking-tight">Our top contributors</h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {currentData.topThree.map((podium) => (
              <div 
                key={podium.rank}
                className={`rounded-3xl p-4 text-center border shadow-xs flex flex-col items-center justify-between relative overflow-hidden ${
                  podium.rank === 1 ? 'bg-[#FEF3C7] border-[#FDE68A]' : podium.rank === 2 ? 'bg-[#F1F5F9] border-[#E2E8F0]' : 'bg-[#FFEDD5] border-[#FED7AA]'
                }`}
              >
                <div className="mb-2">
                  {podium.rank === 1 ? '🏆' : podium.rank === 2 ? '🥈' : '🥉'}
                </div>

                <div className="relative">
                  <div className="h-14 w-14 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-slate-600 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1 h-5 w-5 rounded-full bg-[#EA580C] text-white text-[10px] font-black flex items-center justify-center border border-white">
                    #{podium.rank}
                  </span>
                </div>

                <div className="mt-3 w-full">
                  <p className="text-xs font-bold text-slate-800 truncate px-0.5">{podium.name}</p>
                  <p className="text-sm font-black text-slate-900 mt-1 flex items-center justify-center gap-0.5">
                    <span className="text-xs text-[#D97706]">฿</span> {podium.coins}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-4">
            <span>User</span>
            <span>Coins</span>
          </div>

          <div className="space-y-2.5">
            {currentData.list.map((row) => (
              <div 
                key={row.rank} 
                className="flex items-center justify-between rounded-2xl bg-white p-4 border border-slate-200/60 shadow-xs hover:border-slate-300 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate pr-2">
                      {row.name} <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded ml-1">{row.handle}</span>
                    </h4>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">{row.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-black text-sm text-slate-700 shrink-0">
                  <span className="text-xs text-[#D97706]">฿</span>
                  <span>{row.coins} Coins</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white px-4 py-2 shadow-2xl md:hidden">
        <div className="flex items-center justify-around">
          {['Home', 'Leaderboard', 'Vaults', 'Options'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === tab ? 'text-blue-600 scale-105' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12" />
              </svg>
              <span className="text-[10px] font-bold">{tab}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
