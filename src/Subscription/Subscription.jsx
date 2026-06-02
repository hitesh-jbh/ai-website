import React from 'react';

export default function ManageSubscriptions({ onPlanSelect }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-12 animate-in fade-in duration-200">
      <header className="w-full max-w-3xl mx-auto px-4 pt-8 text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manage Subscriptions</h1>
        <p className="text-slate-500 font-medium text-sm">Review your token limits or select an available configuration below.</p>
      </header>

      <main className="w-full max-w-3xl mx-auto px-4 space-y-6 mt-6">
        
        {/* CURRENT PLAN STATUS HEADER BLOCK */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">Current Plan Status</h2>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-slate-900">Free Plan</p>
          </div>
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-500">Queries Used</span>
              <span className="font-bold text-slate-800">3 / 40</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '7.5%' }} />
            </div>
            <div className="flex justify-between items-center text-sm pt-1">
              <span className="font-semibold text-slate-500">Tokens Used</span>
              <span className="font-bold text-slate-800">2,063 / 4,00,000</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '0.5%' }} />
            </div>
          </div>
        </div>

        {/* AVAILABLE PLANS SECTION CONTAINER */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight px-1">Available Plans</h3>
          
          {/* FREE TIERS CARD STRUCTURE - MATCHING image_582243.jpg */}
          <div className="bg-white rounded-3xl p-6 border-2 border-blue-500 shadow-sm space-y-4 relative">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase">FREE</h4>
                <p className="text-sm text-slate-400 font-semibold mt-0.5">Free</p>
              </div>
              <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                Current
              </span>
            </div>

            <div className="text-3xl font-black text-slate-900 pt-1">
              Free
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="bg-slate-800 text-white rounded-full p-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span>40 queries/day</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="bg-slate-800 text-white rounded-full p-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span>4,00,000 tokens/day</span>
              </div>
            </div>

            <button 
              onClick={() => onPlanSelect('Free_Plan_Active')}
              className="w-full mt-4 bg-slate-200 text-slate-500 font-bold py-4 rounded-2xl text-base transition-colors"
            >
              Current Plan
            </button>
          </div>
        </div>

        {/* PREMIUM ADD-ON TIERS EXTENSION CORES */}
        <div className="bg-[#EEF2FF] rounded-3xl p-6 border border-indigo-200/50 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="inline-block bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md">Add-on</span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">SPACE EXTENSION</h3>
              <p className="text-sm text-slate-500 font-medium max-w-[80%]">Expand vault storage — up to 15 GB per year</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button 
              onClick={() => onPlanSelect('Space_1GB')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-colors text-sm text-center"
            >
              1 GB — ₹99
            </button>
            <button 
              onClick={() => onPlanSelect('Space_15GB')}
              className="w-full bg-indigo-900 hover:bg-indigo-950 text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-colors text-sm text-center"
            >
              15 GB/yr — ₹499
            </button>
          </div>
        </div>

        <div className="bg-[#E6F4EA] rounded-3xl p-6 border border-emerald-200/50 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="inline-block bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md">Add-on</span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">RECHARGE PACK</h3>
              <p className="text-sm text-slate-500 font-medium max-w-[80%]">Extra usage when you run out — 24 hours validity</p>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-1 text-emerald-800">
            <span className="text-3xl font-black">₹49</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600/80">one-time</span>
          </div>
          <button 
            onClick={() => onPlanSelect('Recharge_Pack')}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-colors text-sm text-center"
          >
            Purchase Pack
          </button>
        </div>

      </main>
    </div>
  );
}