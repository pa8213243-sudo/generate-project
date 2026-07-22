"use client";
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

const d1 = [{ v: 40 }, { v: 42 }, { v: 41 }, { v: 45 }, { v: 43 }, { v: 47 }, { v: 46 }];
const d2 = [{ v: 20 }, { v: 25 }, { v: 22 }, { v: 28 }, { v: 27 }, { v: 30 }, { v: 29 }];

const Ticker = ({ title, val, change, data }: { title: string; val: string; change: string; data: { v: number }[] }) => (
  <div className="flex flex-col justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
    <div className="text-[10px] font-bold text-white/70">{title}</div>
    <div className="text-[13px] font-mono text-white font-bold mt-1.5">{val}</div>
    <div className="flex items-center justify-between mt-2 gap-2">
      <span className="text-[10px] font-mono text-success">{change}</span>
      <div className="w-16 h-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.65} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis domain={['dataMin', 'dataMax']} hide />
            <Tooltip cursor={false} content={() => null} />
            <Area type="monotone" dataKey="v" stroke="#22d3ee" strokeWidth={2} fill={`url(#gradient-${title.replace(/\s+/g, '-')})`} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export const MarketOverview = () => {
  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase">MARKET OVERVIEW</h3>
        <span className="flex items-center gap-1 text-[9px] text-success font-mono uppercase bg-success/10 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"/> Live</span>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1">
        <Ticker title="NIFTY 50" val="24,543.15" change="+0.65%" data={d1} />
        <Ticker title="S&P 500" val="5,505.00" change="+0.71%" data={d2} />
        <Ticker title="DOW JONES" val="40,287.53" change="+0.49%" data={d1} />
        <Ticker title="NASDAQ" val="17,726.94" change="+0.93%" data={d2} />
      </div>
    </div>
  );
};
