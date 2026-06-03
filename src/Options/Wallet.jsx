import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WalletPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Options');
  const [balance, setBalance] = useState(0.00);
  const [totalEarnings, setTotalEarnings] = useState(0.00);
  const [todaysEarnings, setTodaysEarnings] = useState(0.00);
  
  const [alertModal, setAlertModal] = useState({ visible: false, message: '', requiredAmount: 0 });

  const [transactions, setTransactions] = useState([
    { id: 'TXN-9842', type: 'Ad Revenue Share', amount: 'Hex Node Contribution', coins: '฿45 Coins', cashValue: '₹45.00', status: 'Credited', date: '02 Jun 2026' },
    { id: 'TXN-9841', type: 'Vault Verified Answer Reward', amount: 'System Validation Sync', coins: '฿120 Coins', cashValue: '₹120.00', status: 'Credited', date: '30 May 2026' },
    { id: 'TXN-9840', type: 'Community Engagement Milestone', amount: 'Platform Alpha Bonus', coins: '฿35 Coins', cashValue: '₹35.00', status: 'Credited', date: '25 May 2026' }
  ]);

  const handleWithdrawalVerification = () => {
    const MINIMUM_WITHDRAWAL = 200.00;
    
    if (balance < MINIMUM_WITHDRAWAL) {
      const deficiency = MINIMUM_WITHDRAWAL - balance;
      setAlertModal({
        visible: true,
        message: `Insufficient Funds: Your available balance is below the minimum threshold requirement.`,
        requiredAmount: deficiency
      });
    } else {
      console.log('API Endpoint Request initiated for payout processing matrix.');
      alert('Withdrawal request initialized successfully!');
    }
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-24 md:pb-12 relative overflow-hidden">
      
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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Wallet</h1>
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

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-4">
        
        <div className="w-full bg-[#2563EB] rounded-2xl p-5 text-white shadow-md space-y-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/5 blur-xl pointer-events-none" />
          <span className="text-xs font-bold text-blue-100 uppercase tracking-wider block">Available Balance</span>
          <p className="text-4xl font-black tracking-tight">₹{balance.toFixed(2)}</p>
          <p className="text-xs font-semibold text-blue-100/90 pt-1">Total earnings: ₹{totalEarnings.toFixed(2)}</p>
        </div>

        <div className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-xs">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-500 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307L20.25 7.5M22.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6A2.25 2.25 0 013.75 3.75h16.5A2.25 2.25 0 0122.5 6z" />
            </svg>
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-400">Today's earnings</span>
            <p className="text-lg font-black text-slate-800 tracking-tight mt-0.5">₹{todaysEarnings.toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={handleWithdrawalVerification}
          className="w-full bg-[#22C55E] hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/10 transition-colors"
        >
          <span>💵</span>
          <span>Withdraw (min ₹200)</span>
        </button>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-1">
            Recent transactions
          </h3>

          {transactions.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200/60 shadow-xs space-y-3">
              <div className="text-slate-300 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 5.25h16.5m-16.5-10.5h16.5" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-800">No transactions yet</h4>
                <p className="text-xs font-semibold text-slate-400 max-w-[260px] mx-auto leading-relaxed">
                  Earnings from coins and ads will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 animate-in fade-in duration-150">
              {transactions.map((txn, index) => (
                <div key={index} className="flex items-center justify-between rounded-2xl bg-white p-4 border border-slate-200/60 shadow-xs hover:border-slate-300 transition-all group">
                  <div className="space-y-1 min-w-0 pr-2">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{txn.type}</h4>
                    <p className="text-[11px] font-semibold text-slate-400 truncate">{txn.amount}</p>
                    <p className="text-[10px] font-bold text-slate-400/80 mt-0.5">{txn.date} • {txn.id}</p>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end space-y-1">
                    <span className="block text-sm font-black text-emerald-600">{txn.cashValue}</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100">{txn.coins}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded-md inline-block">{txn.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

        {/* MOBILE SCREEN BOTTOM BAR NAVIGATION HOOK */}
      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur-md px-4 py-2 shadow-2xl md:hidden">
        <div className="flex items-center justify-around">
          {navigationTabs.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleTabNavigation(item.id, item.path)}
              className={`flex flex-col items-center gap-0.5 p-2 transition-all ${activeTab === item.id || (item.id === 'Options' && window.location.pathname === '/wallet') ? 'text-blue-600 scale-105' : 'text-slate-400'}`}
            >
              {item.icon}
              <span className="text-[10px] font-bold">{item.id}</span>
            </button>
          ))}
        </div>
      </div>

      {alertModal.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4 text-center animate-in scale-in duration-200">
            <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto border border-rose-100 text-lg font-black">
              ✕
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Below Minimum Payout Limit</h3>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                {alertModal.message}
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-700 font-bold mt-2">
                Additional balance required: <span className="text-rose-500">₹{alertModal.requiredAmount.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => setAlertModal({ visible: false, message: '', requiredAmount: 0 })}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-sm"
            >
              Dismiss Notification
            </button>
          </div>
        </div>
      )}

    </div>
  );
}