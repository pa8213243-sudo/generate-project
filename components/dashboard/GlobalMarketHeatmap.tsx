"use client";
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';

const regions = [
  {
    id: 'north-america',
    label: 'North America',
    value: 88,
    change: '+1.2%',
    details: 'Tech, finance and mobility markets leading the session.',
    points: '22,38 80,28 92,52 70,62 42,55',
  },
  {
    id: 'south-america',
    label: 'South America',
    value: 72,
    change: '+0.8%',
    details: 'Commodities remain strong across export hubs.',
    points: '65,68 78,92 62,110 50,102 52,82',
  },
  {
    id: 'europe',
    label: 'Europe',
    value: 81,
    change: '+1.0%',
    details: 'Financial services and green energy indexes outperform.',
    points: '102,28 132,18 143,32 127,48 108,39',
  },
  {
    id: 'africa',
    label: 'Africa',
    value: 64,
    change: '+0.4%',
    details: 'Mining and energy exports staying resilient.',
    points: '114,52 148,62 152,94 121,108 106,80',
  },
  {
    id: 'asia',
    label: 'Asia',
    value: 92,
    change: '+1.8%',
    details: 'Tech, semiconductor and export-led equities are up.',
    points: '154,18 238,26 252,72 220,88 170,64',
  },
  {
    id: 'australia',
    label: 'Australia',
    value: 68,
    change: '+0.6%',
    details: 'Materials and resources remain steady on demand recovery.',
    points: '232,92 258,98 270,112 248,124 226,116',
  },
];

const getFill = (value: number) => {
  if (value >= 85) return '#22d3ee';
  if (value >= 70) return '#34d399';
  if (value >= 55) return '#fbbf24';
  return '#f97316';
};

export const GlobalMarketHeatmap = () => {
  const [activeRegion, setActiveRegion] = useState(regions[0]);
  const animatedRegions = useMemo(
    () => regions.map((region, index) => ({
      ...region,
      delay: index * 0.07,
    })),
    []
  );

  return (
    <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl min-h-[300px] overflow-hidden">
      <div className="mb-4">
        <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">GLOBAL MARKET HEATMAP</h3>
        <p className="text-[10px] text-white/40">Interactive regional strength overlay with live hover insights.</p>
      </div>

      <div className="relative w-full h-[300px] rounded-3xl border border-cyan-900/50 bg-[#020613] overflow-hidden shadow-[inset_0_0_40px_rgba(34,211,238,0.08)]">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/1000px-World_map_blank_without_borders.svg.png')] bg-center bg-contain bg-no-repeat opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.12)_0%,_transparent_45%)] pointer-events-none" />
        <svg viewBox="0 0 320 160" className="w-full h-full relative">
          <defs>
            <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#020713" />
              <stop offset="100%" stopColor="#07131f" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="320" height="160" fill="url(#backgroundGradient)" />
          {animatedRegions.map((region) => (
            <motion.polygon
              key={region.id}
              points={region.points}
              fill={getFill(region.value)}
              opacity={activeRegion.id === region.id ? 0.98 : 0.72}
              stroke="#ffffff22"
              strokeWidth="0.8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: activeRegion.id === region.id ? 0.98 : 0.72, scale: 1 }}
              transition={{ duration: 0.45, delay: region.delay }}
              whileHover={{ scale: 1.02, opacity: 1 }}
              onMouseEnter={() => setActiveRegion(region)}
              onMouseLeave={() => setActiveRegion(regions[0])}
              className="cursor-pointer"
            />
          ))}

          {regions.map((region) => {
            const [cx, cy] = region.points.split(' ').slice(0, 1)[0].split(',').map(Number);
            return (
              <circle key={`${region.id}-dot`} cx={cx + 8} cy={cy - 4} r="3" fill="#ffffff" opacity="0.8" />
            );
          })}

          <g opacity="0.4">
            <path d="M10 18 C55 10 70 25 100 18 C128 12 142 32 168 28 C194 24 210 14 230 22 C252 30 290 20 310 16" stroke="#22d3ee" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
            <path d="M20 110 C55 90 80 95 120 78 C145 67 170 80 205 64 C235 50 260 80 290 68" stroke="#34d399" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
          </g>
        </svg>

        <div className="absolute inset-x-0 bottom-0 pb-4 px-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {regions.map((region) => (
              <button
                key={`label-${region.id}`}
                type="button"
                onMouseEnter={() => setActiveRegion(region)}
                className="text-left rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-[11px] text-white/70 hover:bg-white/10 transition"
              >
                <div className="font-semibold text-white">{region.label}</div>
                <div className="text-[10px] text-white/40">{region.value}% strength</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-[#020713]/80 border border-white/10 p-4 text-sm text-white/75">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Selected Region</p>
            <p className="mt-1 text-sm text-white font-semibold">{activeRegion.label}</p>
          </div>
          <div className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-success font-semibold border border-success/20">
            {activeRegion.change}
          </div>
        </div>
        <p className="mt-3 text-[11px] text-white/60 leading-relaxed">{activeRegion.details}</p>
      </div>
    </div>
  );
};
