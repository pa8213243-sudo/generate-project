import fs from 'fs/promises';
import path from 'path';

const marketOverviewCode = `"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const INITIAL_DATA = [
  { val: 24500 }, { val: 24510 }, { val: 24505 }, { val: 24520 }, { val: 24515 },
  { val: 24530 }, { val: 24525 }, { val: 24540 }, { val: 24535 }, { val: 24545 }
];

export const MarketOverview = () => {
  const [data1, setData1] = useState(INITIAL_DATA);
  const [data2, setData2] = useState(INITIAL_DATA.map(d => ({ val: d.val + 15000 })));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setData1(prev => [...prev.slice(1), { val: prev[prev.length - 1].val + (Math.random() * 20 - 10) }]);
      setData2(prev => [...prev.slice(1), { val: prev[prev.length - 1].val + (Math.random() * 20 - 10) }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const MarketCard = ({ title, value, change, data, color }: any) => (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
      <div>
        <h4 className="text-xs font-bold text-white/70">{title}</h4>
        <div className="text-sm font-mono text-white mt-1">
          {isMounted ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '24,500.36'}
        </div>
        <div className={\`text-[10px] font-mono \${change.startsWith('+') ? 'text-success' : 'text-danger'}\`}>{change}</div>
      </div>
      <div className="w-24 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <YAxis domain={['dataMin', 'dataMax']} hide />
            <Line type="monotone" dataKey="val" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-space font-bold text-white tracking-widest uppercase">Market Overview</h3>
        <span className="flex items-center gap-1 text-[10px] text-success font-mono uppercase bg-success/10 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"/> Live</span>
      </div>
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <MarketCard title="NIFTY 50" value={data1[data1.length - 1].val} change="+0.65%" data={data1} color="#22c55e" />
        <MarketCard title="DOW JONES" value={data2[data2.length - 1].val} change="+0.49%" data={data2} color="#22c55e" />
        <MarketCard title="CRUDE OIL (WTI)" value={82.15} change="-1.20%" data={INITIAL_DATA} color="#ef4444" />
      </div>
    </div>
  );
};`;

async function fixHydration() {
  const filePath = path.join(process.cwd(), 'components/dashboard/MarketOverview.tsx');
  await fs.writeFile(filePath, marketOverviewCode, 'utf8');
  console.log('✅ MarketOverview hydration mismatch fixed successfully!');
}

fixHydration();