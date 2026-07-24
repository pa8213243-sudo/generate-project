"use client";
import React from 'react';

export default function GlobalMarketHeatmap() {
  return (
    <div className="bg-[#0B1120] p-6 rounded-2xl border border-white/10 w-full h-full flex flex-col">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm md:text-base font-bold text-white font-space tracking-widest uppercase">GLOBAL SECTOR HEATMAP</h2>
          <p className="text-xs text-white/50">Market Cap Weighted | Daily Performance</p>
        </div>
        <div className="bg-[#111827] border border-white/10 px-3 py-1 rounded-md text-xs text-white/60 font-bold hover:bg-white/5 cursor-pointer transition-colors">
          1D ▼
        </div>
      </div>

      {/* Real Financial Treemap (Finviz Style) */}
      <div className="flex-1 w-full min-h-[250px] rounded-lg overflow-hidden flex flex-col gap-1">
         
         {/* Top Row: Tech (Huge) & Energy (UAE/MENA Focus) */}
         <div className="flex w-full h-1/2 gap-1">
            
            {/* Tech Sector */}
            <div className="w-3/5 h-full flex flex-col gap-1">
               <div className="w-full h-2/3 flex gap-1">
                  <div className="w-1/2 h-full bg-emerald-500 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                     <span className="font-bold text-sm md:text-lg tracking-wider">NVDA</span>
                     <span className="text-xs md:text-sm font-mono">+4.25%</span>
                  </div>
                  <div className="w-1/2 h-full bg-emerald-600 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                     <span className="font-bold text-sm md:text-base tracking-wider">MSFT</span>
                     <span className="text-xs font-mono">+1.12%</span>
                  </div>
               </div>
               <div className="w-full h-1/3 bg-red-500 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                  <span className="font-bold text-sm tracking-wider">AAPL</span>
                  <span className="text-xs font-mono">-0.85%</span>
               </div>
            </div>

            {/* Energy Sector (MENA Target) */}
            <div className="w-2/5 h-full flex flex-col gap-1">
                <div className="w-full h-1/2 bg-red-600 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                     <span className="font-bold text-sm tracking-wider">ARAMCO</span>
                     <span className="text-xs font-mono">-1.50%</span>
                </div>
                <div className="w-full h-1/2 flex gap-1">
                    <div className="w-1/2 h-full bg-emerald-500 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                         <span className="font-bold text-sm tracking-wider">ADNOC</span>
                         <span className="text-xs font-mono">+2.10%</span>
                    </div>
                    <div className="w-1/2 h-full bg-emerald-700 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                         <span className="font-bold text-xs tracking-wider">XOM</span>
                         <span className="text-[10px] font-mono">+0.5%</span>
                    </div>
                </div>
            </div>
         </div>

         {/* Bottom Row: Financials & Consumer */}
         <div className="flex w-full h-1/2 gap-1">
            
            {/* Financials */}
            <div className="w-1/2 h-full flex flex-col gap-1">
                 <div className="w-full h-full flex gap-1">
                      <div className="w-1/2 h-full bg-red-500 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                         <span className="font-bold text-sm tracking-wider">JPM</span>
                         <span className="text-xs font-mono">-0.90%</span>
                      </div>
                      <div className="w-1/2 h-full flex flex-col gap-1">
                          <div className="w-full h-1/2 bg-emerald-600 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                             <span className="font-bold text-xs tracking-wider">ENBD</span>
                             <span className="text-[10px] font-mono">+1.05%</span>
                          </div>
                          <div className="w-full h-1/2 bg-[#334155] flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                             <span className="font-bold text-xs tracking-wider">VISA</span>
                             <span className="text-[10px] font-mono">0.00%</span>
                          </div>
                      </div>
                 </div>
            </div>

            {/* Consumer / Retail */}
            <div className="w-1/2 h-full flex gap-1">
                 <div className="w-2/3 h-full bg-emerald-500 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                     <span className="font-bold text-sm md:text-base tracking-wider">AMZN</span>
                     <span className="text-xs font-mono">+3.10%</span>
                 </div>
                 <div className="w-1/3 h-full flex flex-col gap-1">
                      <div className="w-full h-1/2 bg-red-600 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                         <span className="font-bold text-xs tracking-wider">TSLA</span>
                         <span className="text-[10px] font-mono">-2.4%</span>
                      </div>
                      <div className="w-full h-1/2 bg-red-500 flex flex-col items-center justify-center text-white p-1 hover:brightness-110 transition cursor-pointer shadow-inner">
                         <span className="font-bold text-xs tracking-wider">WMT</span>
                         <span className="text-[10px] font-mono">-0.7%</span>
                      </div>
                 </div>
            </div>
         </div>
      </div>

      <div className="mt-4 text-right z-20">
        <button className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors">
          Explore Sectors →
        </button>
      </div>

    </div>
  );
}