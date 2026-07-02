import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HelpSupportPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Options');
  
  const [openFaq, setOpenFaq] = useState(null);
  const [showMessageForm, setShowMessageForm] = useState(false);
  
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgContent, setMsgContent] = useState('');

  const faqs = [
    { id: 1, q: 'What is KnowVaults?', a: 'KnowVaults is a knowledge platform where you can create and explore vaults of curated content. You earn coins for contributing and engaging, and can use them for rewards or premium features.' },
    { id: 2, q: 'How do coins work?', a: 'Coins are awarded based on your contributions, verified answer submissions, and overall engagement milestones across different knowledge domains.' },
    { id: 3, q: 'How can I redeem coins?', a: 'You can redeem your earned coins directly into cash payouts via your configured UPI ID within the Rewards panel, provided you cross the minimum threshold balance.' },
    { id: 4, q: 'Why was my query limit reached?', a: 'Free plan configurations are limited to 40 queries per day. To expand your resource allocation parameters, consider purchasing an add-on space package.' },
    { id: 5, q: 'How do subscriptions work?', a: 'Subscriptions activate specific premium features, advanced system models, and higher file extension storage parameters linked directly to your secure user node profile.' }
  ];

  const handleContactUsEmail = () => {
    window.location.href = 'mailto:support@knowvaults.com?subject=Support Request&body=Hi Support Team,';
  };

  const handleReportIssueEmail = () => {
    window.location.href = 'mailto:support@knowvaults.com?subject=Report a Problem / Bug&body=Please describe the issue encountered here:';
  };

  const handleInAppMessageSubmit = (e) => {
    e.preventDefault();
    console.log('Backend Form API Submission:', { name: msgName, email: msgEmail, message: msgContent });
    alert('Your support message has been sent to our system queue successfully!');
    setMsgName('');
    setMsgEmail('');
    setMsgContent('');
    setShowMessageForm(false);
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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Help & Support</h1>
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

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all shadow-xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 hover:text-slate-900 transition-colors"
                  >
                    <span className="text-sm md:text-base font-semibold">{faq.q}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs md:text-sm font-medium text-slate-500 leading-relaxed bg-slate-50/50 pt-1 border-t border-slate-50 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="space-y-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Support</h2>
            <p className="text-xs font-semibold text-slate-400">Reach out for account, billing, or general help.</p>
          </div>

          <div className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="truncate select-all">support@knowvaults.com</span>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={handleContactUsEmail}
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm md:text-base shadow-xs transition-colors"
            >
              Contact Us
            </button>

            <button
              type="button"
              onClick={() => setShowMessageForm(!showMessageForm)}
              className="w-full bg-white border border-blue-500 text-blue-500 font-bold py-3.5 rounded-xl text-sm md:text-base hover:bg-slate-50 transition-colors"
            >
              {showMessageForm ? 'Hide message form' : 'Message us in-app'}
            </button>
          </div>

          {showMessageForm && (
            <form onSubmit={handleInAppMessageSubmit} className="pt-2 space-y-4 border-t border-slate-100 animate-in slide-in-from-top duration-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Name</label>
                <input
                  type="text"
                  required
                  value={msgName}
                  onChange={(e) => setMsgName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email</label>
                <input
                  type="email"
                  required
                  value={msgEmail}
                  onChange={(e) => setMsgEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Message</label>
                <textarea
                  required
                  value={msgContent}
                  onChange={(e) => setMsgContent(e.target.value)}
                  placeholder="How can we help?"
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-black py-4 rounded-xl text-sm transition-colors shadow-sm"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="space-y-0.5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Report a Problem</h2>
            <p className="text-xs font-semibold text-slate-400 leading-normal">Found a bug or something not working? Let us know and we will look into it.</p>
          </div>

          <button
            type="button"
            onClick={handleReportIssueEmail}
            className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            Report Issue
          </button>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs space-y-1 divide-y divide-slate-100">
          <div className="pb-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Legal</h2>
          </div>

          <a
            href="/privacy-policy"
            onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }}
            className="w-full flex items-center justify-between py-3 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors group"
          >
            <span>Privacy Policy</span>
            <span className="text-slate-300 group-hover:text-blue-500 transition-colors">↗</span>
          </a>

          <a
            href="/terms-of-service"
            onClick={(e) => { e.preventDefault(); navigate('/terms-of-service'); }}
            className="w-full flex items-center justify-between py-3 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors group"
          >
            <span>Terms of Service</span>
            <span className="text-slate-300 group-hover:text-blue-500 transition-colors">↗</span>
          </a>
        </div>

      </main>

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur-md px-4 py-2 shadow-2xl md:hidden">
        <div className="flex items-center justify-around">
          {navigationTabs.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleTabNavigation(item.id, item.path)}
              className={`flex flex-col items-center gap-0.5 p-2 transition-all ${activeTab === item.id || (item.id === 'Options' && window.location.pathname === '/help') ? 'text-blue-600 scale-105' : 'text-slate-400'}`}
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