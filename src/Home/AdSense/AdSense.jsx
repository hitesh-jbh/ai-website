import React, { useState } from "react";

export default function AdSenseManagerWeb() {
  const [adType, setAdType] = useState("banner");
  const [adUnitName, setAdUnitName] = useState("");
  const [adUnitId, setAdUnitId] = useState("");
  const [ecpmFloor, setEcpmFloor] = useState("");
  const [refreshRate, setRefreshRate] = useState("60");
  const [notes, setNotes] = useState("");

  const adTypes = [
    { value: "banner", label: "Standard Banner", icon: "📱", desc: "Horizontal display ads matching leaderboard or anchor placements." },
    { value: "interstitial", label: "Interstitial Pop", icon: "💥", desc: "High-yield, full-screen takeover overlays during page switches." },
    { value: "rewarded", label: "Rewarded Action", icon: "🎁", desc: "User-initiated videos giving platform perks upon completion." },
    { value: "native", label: "Native Inline", icon: "🎨", desc: "Dynamic component structure that mimics feed layouts organically." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
      {/* Global Dashboard Header */}
      <header className="bg-white/80 backdrop-blur border-b border-slate-200/80 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors flex items-center gap-1.5 group">
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Monetization
          </button>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-slate-900">Google AdSense</h1>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">v2.0 API</span>
          </div>
        </div>
        
        {/* Connection Status Indicator Badge */}
        <div className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full flex items-center space-x-2">
          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-emerald-800">API Connection Node Live</span>
        </div>
      </header>

      {/* Main Content Layout Block */}
      <main className="max-w-4xl w-full mx-auto p-6 md:py-12">
        <div className="flex flex-col mb-8">
          <div className="bg-amber-500 text-white h-12 w-12 rounded-xl flex items-center justify-center mb-4 shadow-md shadow-amber-500/20 text-xl font-bold">
            $
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">Create New Ad Unit Placement</h2>
          <p className="text-sm text-slate-500 mt-1.5 max-w-xl">
            Configure dynamic ad execution script blocks. Saved data maps seamlessly to automated client rendering engines.
          </p>
        </div>

        {/* Core Setup Workspace Card */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Ad Format Selector Grid */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                1. Select Layout Ad Format <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {adTypes.map((type) => {
                  const isActive = adType === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setAdType(type.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        isActive
                          ? "border-amber-500 bg-amber-50/20 ring-4 ring-amber-500/10"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 mb-1.5">
                        <span className="text-lg bg-white shadow-sm border border-slate-100 rounded-lg h-8 w-8 flex items-center justify-center">{type.icon}</span>
                        <span className={`text-sm font-bold ${isActive ? "text-amber-900" : "text-slate-800"}`}>
                          {type.label}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed pl-0.5">
                        {type.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Attributes */}
            <div className="space-y-5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest -mb-2">
                2. Identification Parameters
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    Placement Display Name <span className="text-rose-500">*</span>
                  </span>
                  <input
                    type="text"
                    value={adUnitName}
                    onChange={(e) => setAdUnitName(e.target.value)}
                    placeholder="e.g., Blog_Sidebar_Top_Banner"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder-slate-400"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    Google Ad Unit ID <span className="text-rose-500">*</span>
                  </span>
                  <input
                    type="text"
                    value={adUnitId}
                    onChange={(e) => setAdUnitId(e.target.value)}
                    placeholder="ca-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Configurations Inner Block */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 space-y-5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                ⚙️ Optional Bidding & Inventory Rules
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-600 mb-1.5">Target eCPM Floor ($ USD)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={ecpmFloor}
                    onChange={(e) => setEcpmFloor(e.target.value)}
                    placeholder="0.00 (No Floor limit)"
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder-slate-400"
                  />
                </div>

                {adType === "banner" && (
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-600 mb-1.5">Auto-Refresh Interval (Seconds)</span>
                    <input
                      type="number"
                      value={refreshRate}
                      onChange={(e) => setRefreshRate(e.target.value)}
                      placeholder="60"
                      className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder-slate-400"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-600 mb-1.5">Internal Tracking & Layout Notes</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify structural layout file locations or viewport queries regarding this ad space configuration rules..."
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder-slate-400 resize-none"
                />
              </div>
            </div>

          </div>

          {/* Action Trigger Footer Bar */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row-reverse gap-3">
            <button
              type="button"
              className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-amber-500/10 transition-all duration-150 transform active:scale-[0.99] w-full sm:w-auto"
            >
              Deploy Live Ad Unit
            </button>
            <button
              type="button"
              className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-semibold text-sm px-5 py-3 rounded-xl transition w-full sm:w-auto"
            >
              Cancel Setup
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}