import React, { useState, useEffect } from "react";

export default function AdSlot({ adType = "banner", adUnitId = "demo-id-456" }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full my-8 flex flex-col items-center justify-center px-4">
      {/* Policy Compliant Small Label Tag */}
      <div className="text-[9px] text-slate-400 uppercase tracking-[0.2em] mb-2.5 font-bold">
        Sponsored Advertisement
      </div>

      {loading ? (
        /* High Quality Pulse Skeleton Loader Frame */
        <div 
          className={`w-full bg-slate-100 border border-slate-200/60 rounded-2xl flex flex-col items-center justify-center shadow-inner animate-pulse ${
            adType === "banner" ? "max-w-4xl h-[90px]" : "max-w-md h-[340px]"
          }`}
        >
          <div className="h-2 w-24 bg-slate-200 rounded mb-1" />
          <div className="h-1.5 w-40 bg-slate-200 rounded-sm opacity-60" />
        </div>
      ) : (
        /* Dynamic High-End Visual Display Modules */
        <div className="w-full flex justify-center transition-all duration-300 animate-fadeIn">
          {adType === "banner" ? (
            
            /* Premium Banner Ad Component (Leaderboard Style) */
            <div className="w-full max-w-4xl h-[90px] bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-transparent border border-amber-500/20 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-amber-500/40 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
              
              <div className="flex items-center space-x-4 pl-2">
                <div className="h-10 w-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-lg">
                  🚀
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 tracking-tight">Scale Infrastructure Globally</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 max-w-lg">
                    Deploy edge server nodes within 12ms target execution latency circles globally. Get \$200 credits now.
                  </p>
                </div>
              </div>
              
              <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition whitespace-nowrap active:scale-95 shadow-sm">
                Apply Credits
              </button>
            </div>
          ) : (
            
            /* Premium Native Card Ad Component (Feed/Sidebar Style) */
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
              {/* Ad Graphic Area */}
              <div className="w-full h-44 bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-900 relative p-6 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent)]" />
                
                <span className="self-start bg-white/10 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md border border-white/10 uppercase tracking-wider">
                  Partner Content
                </span>
                
                <div>
                  <span className="text-2xl drop-shadow">💎</span>
                  <h3 className="text-white text-base font-bold tracking-tight mt-1 group-hover:text-amber-400 transition-colors">
                    Next-Gen Vector Database
                  </h3>
                </div>
              </div>

              {/* Ad Description Content Area */}
              <div className="p-5">
                <p className="text-slate-500 text-xs leading-relaxed">
                  Run millisecond queries over billion-scale vector datasets natively. Zero operations overhead with compute separation strategies.
                </p>
                
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 tracking-tight bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                    SYS-ID: {adUnitId}
                  </span>
                  <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition active:scale-95 flex items-center gap-1">
                    Try Sandbox <span>→</span>
                  </button>
                </div>
              </div>
            </div>
            
          )}
        </div>
      )}
    </div>
  );
}