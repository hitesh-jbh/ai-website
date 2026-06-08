import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api/auth';
import { clearTokens } from '../auth/tokenStorage';

export default function OptionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Options');
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then((data) => setUser(data?.user || data))
      .catch(() => setUser(null));
  }, []);

  const displayName = (user?.name || '').trim();
  const initial = displayName ? displayName.charAt(0).toUpperCase() : '?';

  const menuOptions = [
    { label: 'Edit Profile', path: '/edit-profile' },
    { label: 'Manage Subscriptions', path: '/subscriptions' },
    { label: 'Contact', path: '/contact' },
    { label: 'Help & Support', path: '/help' },
    { label: 'Wallet', path: '/wallet' },
    { label: 'Rewards', path: '/rewards' }
  ];

  const handleLogout = () => {
    clearTokens();
    window.dispatchEvent(new Event('auth:changed'));
    navigate('/');
  };

  const handleTabNavigation = (tabName, path) => {
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-24 md:pb-6 relative overflow-hidden">
      
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 py-4 md:px-8 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/home')}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-sm transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Options</h1>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabNavigation(tab.id, tab.path)}
                className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                <span>{tab.id}</span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <span data-testid="header-username" className="text-sm font-bold text-slate-700 uppercase">{displayName || 'User'}</span>
            <div data-testid="header-avatar" className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border border-slate-300">
              {initial}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-8 md:pt-12">
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-8 flex flex-col items-center">
          
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative group">
              <div className="h-28 w-28 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-500 shadow-inner transition-transform duration-300 group-hover:scale-102 overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : displayName ? (
                  <span data-testid="profile-initial" className="text-4xl font-black text-slate-500">
                    {initial}
                  </span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </div>
            </div>
            <h2 data-testid="profile-name" className="text-xl font-black text-slate-900 uppercase tracking-wide">{displayName || 'User'}</h2>
          </div>

          <div className="w-full border-t border-slate-100 pt-2 divide-y divide-slate-100">
            {menuOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => navigate(option.path)}
                className="w-full flex items-center justify-between py-4 text-left font-bold text-slate-700 hover:text-blue-600 group transition-colors"
              >
                <span className="text-base tracking-tight font-semibold">{option.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-[#EF4444] hover:bg-rose-600 text-white font-black py-4 rounded-2xl text-base flex items-center justify-center gap-2 shadow-md shadow-rose-500/10 transition-colors mt-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Logout
          </button>

        </div>
      </main>

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white px-4 py-2 shadow-xl md:hidden">
        <div className="flex items-center justify-around">
          {navigationTabs.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleTabNavigation(item.id, item.path)}
              className={`flex flex-col items-center gap-0.5 p-2 transition-all ${
                activeTab === item.id || (item.id === 'Options' && window.location.pathname === '/options') 
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