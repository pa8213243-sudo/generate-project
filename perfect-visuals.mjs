import fs from 'fs/promises';
import path from 'path';

const files = [
  // ==========================================
  // 1. GLOBE WIDGET (SOLID, PHOTOREALISTIC EARTH FROM SPACE)
  // ==========================================
  {
    path: 'components/dashboard/GlobeWidget.tsx',
    content: `"use client";
import React from 'react';

export const GlobeWidget = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between rounded-2xl bg-[#0B1120] border border-white/10 overflow-hidden shadow-2xl p-6 min-h-[350px]">
      {/* Deep Space Starry Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1534796636912-3652d5b28fb3?auto=format&fit=crop&q=80')] bg-cover mix-blend-screen pointer-events-none" />
      
      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        {/* PHOTOREALISTIC SOLID EARTH */}
        <div className="relative w-full max-w-[280px] aspect-square rounded-full shadow-[0_0_80px_rgba(34,211,238,0.4),inset_-20px_-20px_60px_rgba(0,0,0,0.9),inset_10px_10px_40px_rgba(255,255,255,0.2)] bg-black overflow-hidden border border-cyan-500/30 flex items-center justify-center">
          <div 
             className="absolute w-[200%] h-full opacity-100 animate-earth"
             style={{
               backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/1024px-The_earth_at_night.jpg')",
               backgroundSize: "50% 100%", /* Covers the 200% width perfectly for infinite scroll */
               filter: "brightness(1.4) contrast(1.2) hue-rotate(10deg) saturate(1.5)"
             }}
          />
        </div>
        
        {/* Front Atmosphere Glow over the Earth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[280px] aspect-square rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent pointer-events-none mix-blend-overlay shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.8)]" />
      </div>

      {/* Label */}
      <div className="mt-4 text-[10px] font-mono text-accent tracking-widest uppercase flex items-center gap-2 bg-[#050816]/90 px-4 py-1.5 rounded-full border border-cyan-500/40 backdrop-blur-md z-10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" /> GLOBAL SATELLITE FEED
      </div>
    </div>
  );
};`
  },

  // ==========================================
  // 2. PAGE.TSX (REAL WORLD MAP HEATMAP RESTORED & JOURNEY RETAINED)
  // ==========================================
  {
    path: 'app/page.tsx',
    content: `"use client";
import React, { useState } from 'react';
import { GlobeWidget } from '@/components/dashboard/GlobeWidget';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { EmbeddedAICFO } from '@/components/dashboard/EmbeddedAICFO';
import { DevModeOverlay } from '@/components/ui/DevModeOverlay';
import { Terminal, Bell, Code, CheckCircle2, BookOpen, GraduationCap, Target, Briefcase, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function CommandDashboard() {
  const [devMode, setDevMode] = useState(false);

  return (
    <div className={\`w-full p-6 space-y-6 max-w-[1600px] mx-auto \${devMode ? 'border border-dashed border-accent/50' : ''}\`}>
      {devMode && <DevModeOverlay onClose={() => setDevMode(false)} />}
      
      {/* Top Header */}
      <div className="w-full flex items-center justify-between bg-[#0B1120] border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3 text-white/40 text-xs font-mono w-full max-w-lg bg-[#050816] px-4 py-2.5 rounded-xl border border-white/5">
          <Terminal className="w-4 h-4 text-accent" /> <span>Search Company, Market, or Ask AI CFO...</span>
          <span className="ml-auto text-[10px] bg-white/10 px-2 py-1 rounded text-white/70">Ctrl + K</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setDevMode(!devMode)} className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-white/80 hover:bg-white/10 transition-colors"><Code className="w-4 h-4 text-accent"/> Developer Mode</button>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"><Bell className="w-4 h-4" /></div>
          <div className="w-10 h-10 rounded-full bg-accent text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)]">P</div>
        </div>
      </div>

      {/* STRICT 3-COLUMN GRID EXACTLY LIKE REFERENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
        
        {/* COLUMN 1: Welcome & Heatmap */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[350px]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none"/>
            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">WELCOME BACK,</p>
              <h1 className="text-4xl font-black font-space text-white mb-2 flex items-center gap-2">PARVEJ <span className="text-primary"><CheckCircle2 className="w-6 h-6"/></span></h1>
              <p className="text-xs text-white/60 font-sans mb-8 leading-relaxed">FP&A Professional | CMA US Candidate.<br/>Building Financial Intelligence for a Smarter World.</p>
              <div className="flex gap-4">
                <Link href="/projects" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:bg-blue-500 transition-colors">Explore Dashboard →</Link>
                <Link href="/resume" className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">View My Work</Link>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-auto pt-5 border-t border-white/10 text-center">
              <div><div className="text-lg font-space font-bold text-white">0+</div><div className="text-[9px] font-mono text-white/40 uppercase mt-1">Work Exp.</div></div>
              <div><div className="text-lg font-space font-bold text-white">15+</div><div className="text-[9px] font-mono text-white/40 uppercase mt-1">Projects</div></div>
              <div><div className="text-lg font-space font-bold text-white">17+</div><div className="text-[9px] font-mono text-white/40 uppercase mt-1">Certs</div></div>
              <div><div className="text-lg font-space font-bold text-white">50+</div><div className="text-[9px] font-mono text-white/40 uppercase mt-1">Countries</div></div>
            </div>
          </div>

          {/* REAL WORLD MAP HEATMAP (Solid Cyan Map) */}
          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl min-h-[300px]">
            <div>
              <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">GLOBAL MARKET HEATMAP</h3>
              <p className="text-[10px] text-white/40 mb-4">Real-time Market Strength</p>
              <div className="w-full h-40 rounded-xl relative overflow-hidden flex items-center justify-center bg-[#010816] border border-cyan-900/50 shadow-[inset_0_0_20px_rgba(34,211,238,0.15)]">
                {/* The Map Background */}
                <div 
                  className="absolute inset-0 opacity-80" 
                  style={{ 
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/1000px-World_map_blank_without_borders.svg.png')",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "invert(1) sepia(1) saturate(5) hue-rotate(130deg) brightness(1.2)"
                  }} 
                />
                {/* Glowing Nodes */}
                <div className="absolute top-[35%] left-[25%] w-2 h-2 bg-success rounded-full shadow-[0_0_15px_#22c55e] animate-pulse"></div>
                <div className="absolute top-[45%] right-[25%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse delay-150"></div>
                <div className="absolute bottom-[20%] left-[40%] w-2 h-2 bg-warning rounded-full shadow-[0_0_15px_#eab308] animate-pulse delay-300"></div>
                
                {/* Legend */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-10 bg-black/40 p-1.5 rounded backdrop-blur-sm border border-white/5">
                  <span className="text-[8px] font-mono text-success">High</span>
                  <div className="w-1.5 h-8 bg-gradient-to-t from-cyan-900 to-success rounded-full mx-auto"></div>
                  <span className="text-[8px] font-mono text-white/40">Low</span>
                </div>
              </div>
            </div>
            <Link href="/market" className="mt-5 text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors">Explore Global Market →</Link>
          </div>
        </div>

        {/* COLUMN 2: Globe & Portfolio Highlight */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 min-h-[350px]">
             <GlobeWidget />
          </div>

          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl min-h-[300px]">
            <div>
              <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">PORTFOLIO HIGHLIGHT</h3>
              <p className="text-[10px] text-white/40 mb-4">Featured Project</p>
              {/* Image Restored Here! */}
              <div className="w-full h-32 bg-[url('/projects/sales%20dashboard.jpeg')] bg-cover bg-center rounded-xl border border-white/10 mb-4 shadow-lg shadow-black/50 hover:scale-[1.02] transition-transform" />
              <h4 className="text-sm font-bold text-white mb-1.5">Interactive FP&A Dashboard</h4>
              <p className="text-[11px] text-white/60 leading-relaxed">End-to-end financial dashboard built in Power BI & Excel with real-time insights.</p>
            </div>
            <Link href="/projects" className="mt-4 text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors">View Project →</Link>
          </div>
        </div>

        {/* COLUMN 3: Market, AI CFO, Snapshot */}
        <div className="flex flex-col gap-6 h-full">
          <div className="min-h-[210px]"><MarketOverview /></div>
          <div className="min-h-[240px]"><EmbeddedAICFO /></div>

          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl flex flex-col justify-center min-h-[180px]">
            <h3 className="text-[11px] font-space font-bold text-white tracking-widest uppercase mb-1">FINANCIAL SNAPSHOT</h3>
            <p className="text-[9px] text-white/40 mb-4">All values in USD</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-center">
                <div className="text-[10px] font-mono text-white/40 uppercase">Rev. Modeled</div>
                <div className="text-base font-bold text-accent mt-1">$2.4 B+</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-center">
                <div className="text-[10px] font-mono text-white/40 uppercase">Data Analyzed</div>
                <div className="text-base font-bold text-primary mt-1">250K+</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-center">
                <div className="text-[10px] font-mono text-white/40 uppercase">Models Built</div>
                <div className="text-base font-bold text-success mt-1">35+</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-center">
                <div className="text-[10px] font-mono text-white/40 uppercase">Hours Invested</div>
                <div className="text-base font-bold text-warning mt-1">2,000+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Journey & Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* CLICKABLE JOURNEY CARD */}
        <Link href="/timeline" className="block lg:col-span-2 rounded-2xl bg-[#0B1120] border border-white/10 p-6 overflow-x-auto custom-scrollbar shadow-xl hover:border-white/30 hover:shadow-cyan-900/20 transition-all group cursor-pointer relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1 group-hover:text-accent transition-colors">MY JOURNEY</h3>
              <p className="text-[10px] text-white/40">From Learning to Leading</p>
            </div>
            <span className="text-[10px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">View Career Trajectory &rarr;</span>
          </div>
          <div className="flex items-center justify-between min-w-[600px] relative px-6 pb-2">
            <div className="absolute top-5 left-10 right-10 h-0.5 bg-gradient-to-r from-white/10 via-accent/50 to-white/10 z-0"></div>
            {[
              { icon: BookOpen, title: 'School', year: '2018', color: 'text-success', bg: 'bg-success/10 border-success/30' },
              { icon: GraduationCap, title: 'College', year: '2021', color: 'text-success', bg: 'bg-success/10 border-success/30' },
              { icon: Trophy, title: 'CMA US', year: '2024', color: 'text-primary', bg: 'bg-primary/10 border-primary/30' },
              { icon: Briefcase, title: 'Internship', year: '2025', color: 'text-warning', bg: 'bg-warning/10 border-warning/30' },
              { icon: Target, title: 'FP&A Prof.', year: '2026', color: 'text-white/80', bg: 'bg-white/5 border-white/10' },
              { icon: Target, title: 'Future CFO', year: '2030+', color: 'text-white/40', bg: 'bg-transparent border-white/10' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center relative z-10 group-hover:translate-y-0 transition-transform">
                <div className={\`w-10 h-10 rounded-xl \${step.bg} border flex items-center justify-center mb-3 shadow-lg\`}>
                  <step.icon className={\`w-5 h-5 \${step.color}\`} />
                </div>
                <div className="text-xs font-bold text-white">{step.title}</div>
                <div className="text-[10px] font-mono text-white/40 mt-0.5">{step.year}</div>
              </div>
            ))}
          </div>
        </Link>

        {/* QUOTE SECTION */}
        <div className="lg:col-span-1 rounded-2xl bg-[#0B1120] border border-white/10 p-7 flex flex-col justify-end relative overflow-hidden shadow-xl min-h-[160px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80')] bg-cover bg-[center_bottom] opacity-40 mix-blend-screen grayscale filter contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
          <div className="absolute right-4 top-2 text-white/10 font-serif text-7xl pointer-events-none">“</div>
          <p className="text-[13px] font-sans text-white/90 leading-relaxed italic relative z-10 w-[85%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            "The goal is not to be in the best company, but to build something that outlives me."
          </p>
          <div className="mt-4 text-xs font-mono text-accent relative z-10 font-bold">— Parvej</div>
        </div>
      </div>
    </div>
  );
}`
  }
];

async function applyVisualFixes() {
  console.log('🚀 RESTORING PHOTOREALISTIC EARTH & HEATMAP...');
  for (const file of files) {
    const fullPath = path.join(process.cwd(), file.path);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, file.content, 'utf8');
    console.log(`✅ Applied Fix to: ${file.path}`);
  }
  console.log('\\n🎉 SUCCESS! Earth is solid. Heatmap is real. Portfolio image is back.');
}

applyVisualFixes();