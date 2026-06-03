import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockBackendData = {
  Weekly: {
    metrics: { creators: '4+', vaults: '13+', searches: '733+', earnings: '₹4,250' },
    chart: [
      { label: 'Krishan', value: 40, color: '#3B82F6' },
      { label: 'Aman B', value: 20, color: '#10B981' },
      { label: 'Hitesh', value: 10, color: '#F43F5E' },
      { label: 'Rahul', value: 5, color: '#6366F1' },
    ],
    earners: [
      { id: '#1', name: 'Krishan Kumar', role: 'Content Creator', coins: '40 Coins', rate: '+12.5%' },
      { id: '#2', name: 'Aman Bhati', role: 'Technical Writer', coins: '20 Coins', rate: '+8.2%' },
    ]
  },
  'Last Week': {
    metrics: { creators: '4+', vaults: '12+', searches: '610+', earnings: '₹3,180' },
    chart: [
      { label: 'Aman B', value: 35, color: '#10B981' },
      { label: 'Krishan', value: 25, color: '#3B82F6' },
      { label: 'Rahul', value: 15, color: '#F59E0B' },
      { label: 'Hitesh', value: 8, color: '#F43F5E' },
    ],
    earners: [
      { id: '#1', name: 'Aman Bhati', role: 'Technical Writer', coins: '35 Coins', rate: '+14.1%' },
      { id: '#2', name: 'Krishan Kumar', role: 'Content Creator', coins: '25 Coins', rate: '+5.3%' },
    ]
  },
  'Monthly': {
    metrics: { creators: '6+', vaults: '18+', searches: '2.4K+', earnings: '₹18,900' },
    chart: [
      { label: 'Krishan', value: 120, color: '#3B82F6' },
      { label: 'Aman B', value: 95, color: '#10B981' },
      { label: 'Hitesh', value: 60, color: '#F43F5E' },
      { label: 'Sanjay', value: 40, color: '#A855F7' },
    ],
    earners: [
      { id: '#1', name: 'Krishan Kumar', role: 'Content Creator', coins: '120 Coins', rate: '+22.4%' },
      { id: '#2', name: 'Aman Bhati', textRole: 'Technical Writer', coins: '95 Coins', rate: '+19.8%' },
    ]
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('Weekly');
  const [activeTab, setActiveTab] = useState('Home');

  const activeDataset = mockBackendData[timeframe] || mockBackendData['Weekly'];
  const metrics = activeDataset.metrics;
  const chartData = activeDataset.chart;
  const earnersList = activeDataset.earners;
  
  const maxChartValue = Math.max(...chartData.map((d) => d.value), 1);

  const handleGlobalNavigation = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path);
  };

  const navigationTabs = [
    {
      id: 'Home',
      path: '/home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      id: 'Leaderboard',
      path: '/leaderboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125V18.75m9 0V16.5L12 3L3 16.5v2.25" />
        </svg>
      )
    },
    {
      id: 'Vaults',
      path: '/vault',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    },
    {
      id: 'Options',
      path: '/options',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-24 md:pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <header className="sticky top-0 z-40 hidden md:flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-8 py-4 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Know<span className="text-blue-600">Vault</span>
          </span>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 border border-blue-100">Pro Portal</span>
        </div>
        
        <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {navigationTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleGlobalNavigation(tab.id, tab.path)}
              className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id || (tab.id === 'Home' && window.location.pathname === '/home')
                  ? 'bg-white text-blue-600 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.id}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
          
          <div 
            onClick={() => navigate('/options')}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-md shadow-blue-500/20 cursor-pointer hover:scale-102 transition-transform"
            title="Account Options"
          >
            A
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between md:hidden bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Know<span className="text-blue-600">Vault</span></h1>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Global Creator Framework</p>
          </div>
          <div 
            onClick={() => navigate('/options')}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white cursor-pointer active:scale-95 transition-transform"
          >
            A
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60">
          <div className="flex-1 max-w-xl relative">
            <input 
              type="text"
              readOnly
              onClick={() => navigate('/search')} 
              placeholder="Search workspaces, analytics, creators or vaults..."
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none hover:bg-slate-50 transition-colors"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="absolute left-4 top-3.5 h-4 w-4 stroke-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
            </svg>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">Timeframe:</span>
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="cursor-pointer appearance-none rounded-xl bg-white border border-slate-200 pl-4 pr-10 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Weekly">Weekly Scope</option>
                <option value="Last Week">Last Week</option>
                <option value="Monthly">Monthly Scope</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Creators</p>
              <p className="text-3xl font-black text-slate-900">{metrics.creators}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg></div>
          </div>
          
          <div 
            onClick={() => navigate('/vault')}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-between cursor-pointer hover:border-slate-300 hover:shadow-md transition-all"
          >
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Knowledge Vaults</p>
              <p className="text-3xl font-black text-slate-900">{metrics.vaults}</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg></div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Global Queries</p>
              <p className="text-3xl font-black text-slate-900">{metrics.searches}</p>
            </div>
            <div className="p-3 bg-violet-50 text-violet-600 rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</p>
              <p className="text-3xl font-black text-slate-900">{metrics.earnings}</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.214.107a3.783 3.783 0 005.422-3.136 3.783 3.783 0 00-5.422-3.136l-.428-.214a3.783 3.783 0 015.422-3.136l.214.107" /></svg></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="space-y-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-6 text-white shadow-lg shadow-indigo-950/20">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-6 -ml-6 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400 backdrop-blur-md border border-blue-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" /> Accelerator Hub
                  </span>
                  <h2 className="text-3xl font-black tracking-tight leading-none sm:text-4xl">Turning Knowledge Into</h2>
                </div>
                
                <div>
                  <div className="inline-block rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-lg font-black tracking-wide shadow-md shadow-blue-500/20">
                    Sustainable Income
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { label: 'Create Vault', icon: 'M12 4.5v15m7.5-7.5h-15', path: '/vault' },
                    { label: 'Start Earning', icon: 'M12 6v12m-3-2.818l.214.107a3.783 3.783 0 005.422-3.136', path: '/search' },
                    { label: 'Tutorials', icon: 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z', path: '/home' }
                  ].map((item) => (
                    <button 
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-4 text-center transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/60 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-slate-900">Platform Performance Vector</h3>
                  <p className="text-xs text-slate-400">Yield tracking diagnostics matrix</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">+24.8% Network Expansion</span>
              </div>
              <div className="h-32 w-full pt-4 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,90 Q50,40 100,60 T200,30 T300,50 T400,10 L400,100 L0,100 Z" fill="url(#chartGradient)" />
                  <path d="M0,90 Q50,40 100,60 T200,30 T300,50 T400,10" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307L20.25 7.5M22.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6A2.25 2.25 0 013.75 3.75h16.5A2.25 2.25 0 0122.5 6z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Top Analytics</h3>
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{timeframe} Share</span>
              </div>

              <div className="flex items-end justify-between px-2 h-44 border-b border-slate-100 pb-2">
                {chartData.map((dataPoint, idx) => {
                  const calculatedPercentage = (dataPoint.value / maxChartValue) * 100;
                  return (
                    <div key={idx} className="flex flex-col items-center flex-1 group">
                      <span className="text-xs font-black text-slate-800 mb-2 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded-md shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                        {dataPoint.value}
                      </span>
                      <div className="w-full max-w-[36px] px-0.5 h-32 flex items-end">
                        <div 
                          style={{ height: `${Math.max(calculatedPercentage, 8)}%` }}
                          className="w-full rounded-t-xl shadow-sm transition-all duration-500 ease-out"
                        >
                          <div 
                            style={{ backgroundColor: dataPoint.color }} 
                            className="w-full h-full rounded-t-xl opacity-85 hover:opacity-100 transition-all duration-300 hover:scale-x-105"
                          />
                        </div>
                      </div>
                      <span className="mt-2 text-xs font-bold text-slate-500 truncate w-14 text-center">
                        {dataPoint.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.214.107a3.783 3.783 0 005.422-3.136" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Leaderboard Distribution</h3>
                </div>
                
                <button 
                  onClick={() => navigate('/leaderboard')} 
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-xl transition-all inline-flex items-center gap-1 hover:shadow-sm"
                >
                  View All <span>&gt;</span>
                </button>
              </div>

              <div className="space-y-3">
                {earnersList.map((earner, index) => (
                  <div key={index} className="flex items-center justify-between rounded-2xl bg-slate-50/50 hover:bg-slate-50 p-3 border border-slate-200/40 hover:border-slate-200 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-slate-200/80 shadow-sm text-slate-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          {earner.name} <span className="text-xs font-black text-blue-600 bg-blue-50/80 border border-blue-100 px-1 rounded">{earner.id}</span>
                        </h4>
                        <p className="text-xs font-medium text-slate-400 mt-0.5">{earner.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-black text-slate-700">{earner.coins}</span>
                      <span className="text-[10px] font-bold text-emerald-600">{earner.rate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white px-4 py-2 shadow-xl md:hidden">
        <div className="flex items-center justify-around">
          {navigationTabs.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleGlobalNavigation(item.id, item.path)}
              className={`flex flex-col items-center gap-0.5 p-2 transition-all ${
                activeTab === item.id || (item.id === 'Home' && window.location.pathname === '/home') 
                  ? 'text-blue-600 scale-105' 
                  : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-bold">{item.id}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}