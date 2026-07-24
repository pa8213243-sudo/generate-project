"use client";
import React, { useState, useEffect } from 'react';

// Dynamic Graph: Upar jayega toh Green, Niche aayega toh Red
const TrendGraph = ({ isUp }: { isUp: boolean }) => {
  const color = isUp ? "#34D399" : "#EF4444"; // 34D399 = Green, EF4444 = Red
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {isUp ? (
        <path d="M2 20C10 20 18 8 28 12C38 16 48 4 58 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      ) : (
        <path d="M2 4C10 4 18 16 28 12C38 8 48 20 58 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      )}
    </svg>
  );
};

export function MarketOverview() {
  // Base Data exactly matching your current real market screenshot (Market is DOWN)
  const [marketData, setMarketData] = useState({
    nifty: { price: 23869.60, change: -0.53, name: 'NIFTY 50' },
    sp500: { price: 5427.13, change: -0.16, name: 'S&P 500' },
    dow: { price: 39853.87, change: -0.14, name: 'DOW JONES' },
    nasdaq: { price: 17342.41, change: -0.06, name: 'NASDAQ' },
  });

  // Simulator: Makes the numbers tick up and down like a real live market terminal
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        // Small random fluctuations to simulate live ticks
        const fluctuatePrice = (val: number, max: number) => val + (Math.random() * max * 2 - max);
        const fluctuateChange = (val: number) => val + (Math.random() * 0.02 - 0.01);
        
        return {
          nifty: { ...prev.nifty, price: fluctuatePrice(prev.nifty.price, 3), change: fluctuateChange(prev.nifty.change) },
          sp500: { ...prev.sp500, price: fluctuatePrice(prev.sp500.price, 1), change: fluctuateChange(prev.sp500.change) },
          dow: { ...prev.dow, price: fluctuatePrice(prev.dow.price, 5), change: fluctuateChange(prev.dow.change) },
          nasdaq: { ...prev.nasdaq, price: fluctuatePrice(prev.nasdaq.price, 2), change: fluctuateChange(prev.nasdaq.change) }
        };
      });
    }, 2500); // Ticks every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Card Generator with Auto Red/Green Logic
  const getCard = (dataKey: string) => {
    const data = marketData[dataKey as keyof typeof marketData];
    const isUp = data.change >= 0; // True if positive, False if negative
    const colorClass = isUp ? 'text-emerald-400' : 'text-red-500';
    const sign = isUp ? '+' : '';

    return (
      <div key={dataKey} className="bg-[#111827] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between">
        <p className="text-sm text-white/60 mb-2 font-bold tracking-wider">{data.name}</p>
        <p className="text-2xl font-mono font-bold text-white mb-2">
          {data.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className="flex justify-between items-center mt-1">
          <p className={`text-sm font-mono font-bold ${colorClass}`}>
            {sign}{data.change.toFixed(2)}%
          </p>
          <TrendGraph isUp={isUp} />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0B1120] p-6 rounded-2xl border border-white/10 w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm md:text-base font-bold text-white font-space tracking-widest uppercase">MARKET OVERVIEW</h2>
        <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          LIVE
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getCard('nifty')}
        {getCard('sp500')}
        {getCard('dow')}
        {getCard('nasdaq')}
      </div>
    </div>
  );
}