import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Options');

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('ashish');
  const [bio, setBio] = useState('');
  const [upiId, setUpiId] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('API Save Request Payload:', { name, bio, upiId });
    alert('Profile updates saved successfully!');
    navigate('/options');
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
              onClick={() => navigate('/options')}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-sm transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Profile</h1>
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
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-8">
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8">
          
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="relative">
                <div className="h-28 w-28 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-400 overflow-hidden shadow-inner">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  )}
                </div>

                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-1 right-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 border-2 border-white shadow-md transition-transform active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.154-1.262a4 4 0 002.2-.553L17.447 7.75a2 2 0 10-2.83-2.83L5.613 13.97a4 4 0 00-.553 2.2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 tracking-tight">
                Name <span className="text-rose-500">*</span>
              </label>
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-[#F1F5F9] border-0 rounded-xl px-4 py-3.5 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 tracking-tight">Bio</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Hi, write about yourself.. 😊"
                rows={4}
                className="w-full bg-[#F1F5F9] border-0 rounded-xl p-4 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 tracking-tight">UPI ID</label>
              <input 
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="w-full bg-[#F1F5F9] border-0 rounded-xl px-4 py-3.5 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
              <p className="text-[11px] text-slate-400 font-medium pl-1">
                Required for coin redemption. Format: yourname@upi
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button 
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-base shadow-sm shadow-blue-500/10 transition-colors"
              >
                Save Changes
              </button>
              
              <button 
                type="button"
                onClick={() => navigate('/options')}
                className="w-full bg-white border border-blue-500 text-blue-500 font-bold py-4 rounded-xl text-base hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </main>

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur-md px-4 py-2 shadow-2xl md:hidden">
        <div className="flex items-center justify-around">
          {navigationTabs.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleTabNavigation(item.id, item.path)}
              className={`flex flex-col items-center gap-0.5 p-2 transition-all ${activeTab === item.id || (item.id === 'Options' && window.location.pathname === '/edit-profile') ? 'text-blue-600 scale-105' : 'text-slate-400'}`}
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