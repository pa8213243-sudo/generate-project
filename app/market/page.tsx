import React from 'react';
import { MarketOverview } from '@/components/dashboard/MarketOverview';

export default function MarketPage() {
  return (
    <div className="w-full min-h-screen bg-[#02040A] text-white lg:pl-64 flex flex-col p-6 lg:p-10 pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-black font-space text-white mb-2">Global Market Intelligence</h1>
        <p className="text-white/50 font-mono text-sm">Real-time macro indicators and tracking.</p>
      </div>
      
      <div className="w-full max-w-4xl h-[400px]">
         <MarketOverview />
      </div>

      <div className="mt-8 bg-[#0B1120] border border-white/10 rounded-2xl p-6 max-w-4xl shadow-xl">
        <h3 className="font-bold mb-4">Latest Market News</h3>
        <div className="space-y-4">
           {['Fed holds rates steady amid inflation data.', 'Oil prices surge as OPEC+ extends cuts.', 'Tech sector rallies following strong earnings.'].map((news, i) => (
             <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
               <span className="text-[10px] text-accent font-mono mb-1 block">LIVE FEED</span>
               <p className="text-sm">{news}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}