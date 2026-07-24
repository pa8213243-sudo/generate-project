"use client";
import React from 'react';

export default function GlobalMarketHeatmap() {
  return (
    <div className="bg-[#0B1120] p-6 rounded-2xl border border-white/10 w-full h-full flex flex-col relative overflow-hidden">
      
      {/* Header Section */}
      <div className="flex justify-between items-start z-20 mb-6">
        <div>
          <h2 className="text-sm md:text-base font-bold text-white font-space tracking-widest uppercase">GLOBAL MARKET HEATMAP</h2>
          <p className="text-xs text-white/50">Real-time | Interactive | Financial Grade</p>
        </div>
        <div className="bg-[#111827] border border-white/10 px-3 py-1 rounded-md text-xs text-white/60 font-bold">
          7D ▼
        </div>
      </div>

      {/* Map & Heatmap Container */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-[250px]">
        
        {/* 1. Tumhara Upload Kiya Hua Asli Map (Background) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-30 mix-blend-lighten">
          <img 
            src="/assets/earth_bump.jpg" 
            alt="World Map" 
            className="w-[95%] h-[95%] object-contain filter grayscale contrast-125"
          />
        </div>

        {/* 2. Heatmap Glowing Shapes (Overlay) */}
        <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full z-10 drop-shadow-2xl">
          {/* North America */}
          <path d="M 180 120 Q 250 80 280 180 Q 220 220 150 160 Z" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.5" />
          <circle cx="210" cy="150" r="3" fill="#22c55e" className="animate-ping" />
          
          {/* Europe */}
          <path d="M 380 120 Q 420 80 460 140 Q 420 180 370 140 Z" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="1.5" />
          <circle cx="415" cy="130" r="3" fill="#eab308" className="animate-ping" />

          {/* Asia (High Heat for Emerging Markets) */}
          <path d="M 470 100 Q 600 60 650 180 Q 550 250 460 180 Z" fill="rgba(34, 197, 94, 0.25)" stroke="#22c55e" strokeWidth="1.5" />
          <circle cx="580" cy="150" r="4" fill="#22c55e" className="animate-pulse" />

          {/* South America (Low Heat) */}
          <ellipse cx="260" cy="260" rx="25" ry="50" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1.5" transform="rotate(-15 260 260)" />
          
          {/* Africa */}
          <ellipse cx="400" cy="240" rx="35" ry="60" fill="rgba(234, 179, 8, 0.15)" stroke="#eab308" strokeWidth="1.5" />
          
          {/* Australia */}
          <path d="M 580 260 Q 620 240 640 280 Q 600 320 570 280 Z" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1.5" />
        </svg>

        {/* Legend (High/Low Indicator) */}
        <div className="absolute left-2 bottom-4 z-20 flex flex-col items-center">
          <span className="text-[10px] text-emerald-400 font-bold mb-1">High</span>
          <div className="w-1.5 h-16 bg-gradient-to-b from-emerald-400 via-yellow-500 to-blue-600 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
          <span className="text-[10px] text-blue-500 font-bold mt-1">Low</span>
        </div>

      </div>

      {/* Footer Link */}
      <div className="mt-4 text-right z-20">
        <button className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors">
          Explore Global Market →
        </button>
      </div>

    </div>
  );
}