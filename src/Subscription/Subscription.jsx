import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentSubscriptionStatus, activateFreePlan } from '../api/subscription';

export default function ManageSubscriptions({ onPlanSelect }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Options');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentSubscriptionStatus()
      .then((data) => {
        setStatus(data);
        if (data?.hasSubscription) onPlanSelect('active');
      })
      .catch((err) => setError(err?.message || 'Failed to load subscription'))
      .finally(() => setIsLoading(false));
  }, [onPlanSelect]);

  const handleActivateFree = async () => {
    try {
      await activateFreePlan();
      const data = await getCurrentSubscriptionStatus();
      setStatus(data);
      if (data?.hasSubscription) onPlanSelect('active');
    } catch (err) {
      setError(err?.message || 'Failed to activate plan');
    }
  };

  const usage = status?.usage;
  const planName = status?.subscription?.plan || 'Free';
  const queriesUsed = usage?.queriesUsedToday ?? 0;
  const queriesLimit = usage?.dailyQueriesLimit ?? status?.subscription?.dailyQueriesLimit ?? 40;
  const tokensUsed = usage?.tokensUsedToday ?? 0;
  const tokensLimit = usage?.dailyTokensLimit ?? status?.subscription?.dailyTokensLimit ?? 400000;
  const queriesPct = queriesLimit ? Math.min(100, (queriesUsed / queriesLimit) * 100) : 0;
  const tokensPct = tokensLimit ? Math.min(100, (tokensUsed / tokensLimit) * 100) : 0;

  const handleTabNavigation = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path);
  };

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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Subscriptions</h1>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[
              { id: 'Home', path: '/home' },
              { id: 'Leaderboard', path: '/leaderboard' },
              { id: 'Vaults', path: '/vault' },
              { id: 'Options', path: '/options' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabNavigation(tab.id, tab.path)}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.id}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="w-full max-w-xl mx-auto px-4 space-y-6 mt-6">
        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
        ) : null}
        {isLoading ? (
          <p className="text-center text-sm text-slate-400 font-semibold">Loading subscription…</p>
        ) : null}
        
        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">Current Plan Status</h2>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-slate-900">{planName} Plan</p>
          </div>
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-500">Queries Used</span>
              <span className="font-bold text-slate-800">{queriesUsed} / {queriesLimit}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${queriesPct}%` }} />
            </div>
            <div className="flex justify-between items-center text-sm pt-1">
              <span className="font-semibold text-slate-500">Tokens Used</span>
              <span className="font-bold text-slate-800">{tokensUsed.toLocaleString()} / {tokensLimit.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${tokensPct}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight px-1">Available Plans</h3>
          
          <div className="bg-white rounded-3xl p-6 border-2 bordser-blue-500 shadow-sm space-y-4 relative">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase">FREE</h4>
                <p className="text-sm text-slate-400 font-semibold mt-0.5">Free</p>
              </div>
              {status?.hasSubscription ? (
                <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  Current
                </span>
              ) : null}
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
              onClick={status?.hasSubscription ? undefined : handleActivateFree}
              disabled={status?.hasSubscription}
              className={`w-full mt-4 font-bold py-4 rounded-2xl text-base transition-colors ${
                status?.hasSubscription
                  ? 'bg-slate-200 text-slate-500 cursor-default'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {status?.hasSubscription ? 'Current Plan' : 'Activate Free Plan'}
            </button>
          </div>
        </div>

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

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur-md px-4 py-2 shadow-2xl md:hidden">
        <div className="flex items-center justify-around">
          {[
            { id: 'Home', path: '/home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
            { id: 'Leaderboard', path: '/leaderboard', icon: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125V18.75m9 0V16.5L12 3L3 16.5v2.25' },
            { id: 'Vaults', path: '/vault', icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' },
            { id: 'Options', path: '/options', icon: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => handleTabNavigation(item.id, item.path)}
              className={`flex flex-col items-center gap-0.5 p-2 transition-all ${activeTab === item.id || (item.id === 'Options' && window.location.pathname === '/subscriptions') ? 'text-blue-600 scale-105' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-[10px] font-bold">{item.id}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}