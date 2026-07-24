"use client";
import React, { useState } from 'react';
import { Code, X, Copy, Check, Terminal, FileCode, Layers } from 'lucide-react';

interface DevModeOverlayProps {
  onClose: () => void;
}

export function DevModeOverlay({ onClose }: DevModeOverlayProps) {
  const [activeTab, setActiveTab] = useState<'page' | 'css' | 'heatmap'>('page');
  const [copied, setCopied] = useState(false);

  const pageCode = `"use client";
import React, { useState } from 'react';
import { GlobeWidget } from '@/components/dashboard/GlobeWidget';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { EmbeddedAICFO } from '@/components/dashboard/EmbeddedAICFO';
import { DevModeOverlay } from '@/components/ui/DevModeOverlay';
import { Terminal, Bell, Code, CheckCircle2, BookOpen, GraduationCap, Target, Briefcase, Trophy, Layers } from 'lucide-react';
import Link from 'next/link';

export default function CommandDashboard() {
  const [devMode, setDevMode] = useState(false);
  const [activeTab, setActiveTab] = useState('7D');

  return (
    <div className={\`w-full p-6 space-y-6 max-w-[1600px] mx-auto \${devMode ? 'border border-dashed border-accent/50' : ''}\`}>
      {devMode && <DevModeOverlay onClose={() => setDevMode(false)} />}
      
      {/* ===================== Top Header ===================== */}
      <div className="w-full flex items-center justify-between bg-[#0B1120] border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
        {/* Search Bar */}
        <div className="flex items-center gap-3 text-white/40 text-xs font-mono w-full max-w-sm lg:max-w-lg bg-[#050816] px-4 py-2.5 rounded-xl border border-white/5">
          <Terminal className="w-4 h-4 text-accent" />
          <span>Search Company, Market, or Ask AI CFO...</span>
          <span className="ml-auto text-[10px] bg-white/10 px-2 py-1 rounded text-white/70">Ctrl + K</span>
        </div>
        
        {/* Actions & Profile */}
        <div className="flex items-center gap-4">
          <Link href="/projects" className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer bg-blue-600 text-white font-bold border border-blue-400 shadow-[0_4px_0_#1e3a8a] active:translate-y-1 active:shadow-none hover:bg-blue-500">
            <Layers className="w-4 h-4"/> View Projects
          </Link>
          <button onClick={() => setDevMode(!devMode)} className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer bg-slate-800 text-white border border-slate-600 shadow-[0_4px_0_#0f172a] active:translate-y-1 active:shadow-none hover:bg-slate-700">
            <Code className="w-4 h-4 text-accent"/> Developer Mode
          </button>
          <Bell className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 p-2.5 text-white/80 hover:bg-white/10 cursor-pointer" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)]">P</div>
        </div>
      </div>

      {/* ===================== Main 3-Column Grid ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
        
        {/* -------- COLUMN 1 -------- */}
        <div className="flex flex-col gap-6 h-full">
          {/* Welcome Card & 3D Buttons */}
          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">WELCOME BACK,</p>
            <h1 className="text-4xl font-black font-space text-white mb-2">PARVEJ <span className="text-primary"><CheckCircle2 className="w-6 h-6 inline"/></span></h1>
            <p className="text-xs text-white/60 mb-8">FP&A Professional | Building Financial Intelligence.</p>
            
            <div className="flex gap-4">
              <Link href="/projects" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold transition-all border border-blue-400 shadow-[0_4px_0_#1e3a8a] active:translate-y-1 active:shadow-none hover:bg-blue-500">
                Explore Dashboard →
              </Link>
              <Link href="/resume" className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold transition-all border border-slate-600 shadow-[0_4px_0_#0f172a] active:translate-y-1 active:shadow-none hover:bg-slate-700">
                View My Work
              </Link>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-2 mt-auto pt-5 border-t border-white/10 text-center">
              {[0, 15, 17, 50].map((val) => (<div key={val} className="text-lg font-space font-bold text-white">{val}+</div>))}
            </div>
          </div>

          {/* 📊 High-End 9-Layer Heatmap (Reference: Heatmap Architecture Tab) */}
          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl relative overflow-hidden">
             {/* Complex SVG structure here... */}
          </div>
        </div>

        {/* -------- COLUMN 2 -------- */}
        <div className="flex flex-col gap-6 h-full">
          {/* Rotating Globe Widget */}
          <div className="flex-1 min-h-[350px]">
             <GlobeWidget />
          </div>
          {/* Portfolio Highlight with Image Card */}
          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col shadow-xl">
              <div className="w-full h-32 bg-[url('/projects/sales_dashboard.jpeg')] bg-cover rounded-xl mb-4" />
              <h4 className="text-sm font-bold text-white mb-1.5">Interactive FP&A Dashboard</h4>
              <Link href="/projects" className="mt-4 text-xs font-mono text-accent hover:text-white">View Project →</Link>
          </div>
        </div>

        {/* -------- COLUMN 3 -------- */}
        <div className="flex flex-col gap-6 h-full">
          <MarketOverview />
          <EmbeddedAICFO />
          {/* Financial Snapshot Nested Data Card */}
          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl flex flex-col justify-center">
             <div className="grid grid-cols-2 gap-4">
              {[ {label: 'Rev. Modeled', val: '$2.4 B+'}, {label: 'Data Analyzed', val: '250K+'}, ... ].map(data => (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-white/40 uppercase">{data.label}</div>
                  <div className="text-base font-bold text-accent mt-1">{data.val}</div>
                </div>
              ))}
             </div>
          </div>
        </div>
      </div>

      {/* ===================== Bottom Row (Journey Timeline) ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <Link href="/timeline" className="lg:col-span-2 rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl group">
           {/* Timeline architecture... School -> College -> CMA US -> Internship -> FP&A */}
        </Link>
        {/* Quote Card */}
        <div className="lg:col-span-1 rounded-2xl bg-[#0B1120] border border-white/10 p-7 flex flex-col justify-end relative overflow-hidden shadow-xl">
           <p className="text-[13px] font-sans text-white/90 leading-relaxed italic relative z-10 w-[85%]">
            &quot;The goal is not to be in the best company, but to build something that outlives me.&quot;
          </p>
          <div className="mt-4 text-xs font-mono text-accent relative z-10 font-bold">— Parvej</div>
        </div>
      </div>
    </div>
  );
}`;

  const cssCode = `/* GPU-only (opacity), 13s cycle, ~3.5% shift — imperceptible "breathing" */
@keyframes heatmap-breathe {
  0%, 100% { opacity: 0.965; }
  50%      { opacity: 1; }
}
.heatmap-breathe {
  animation: heatmap-breathe 13s ease-in-out infinite;
  will-change: opacity;
}
body { background-color: #02040A; color: white; }`;

  const heatmapCode = `/* 9-Layer Thermal Density SVG System */
<svg viewBox="0 0 700 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full heatmap-breathe" style={{ mixBlendMode: 'screen' }}>
  <defs>
    <filter id="organicL">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="26" />
      <feGaussianBlur stdDeviation="20" />
    </filter>
  </defs>
  {/* Organic regional washes & hotspots */}
</svg>`;

  const activeCode = activeTab === 'page' ? pageCode : activeTab === 'css' ? cssCode : heatmapCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl h-[85vh] bg-[#090D16] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0B1120] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">PARVEJ OS // DEV_MODE [SOURCE INSPECTOR]</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#050816] px-6 py-2 border-b border-white/5 flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('page')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${activeTab === 'page' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-white/50 hover:text-white'}`}
          >
            <FileCode className="w-3.5 h-3.5" /> app/page.tsx
          </button>
          <button 
            onClick={() => setActiveTab('css')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${activeTab === 'css' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-white/50 hover:text-white'}`}
          >
            <Code className="w-3.5 h-3.5" /> app/globals.css
          </button>
          <button 
            onClick={() => setActiveTab('heatmap')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${activeTab === 'heatmap' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-white/50 hover:text-white'}`}
          >
            <Layers className="w-3.5 h-3.5" /> Heatmap Architecture
          </button>
        </div>

        {/* Code Viewer Body */}
        <div className="flex-1 p-6 overflow-auto bg-[#03060C] font-mono text-xs text-cyan-200/90 leading-relaxed selection:bg-cyan-500/30">
          <pre className="whitespace-pre-wrap">
            <code>{activeCode}</code>
          </pre>
        </div>

        {/* Footer Status */}
        <div className="bg-[#050816] px-6 py-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span>STATUS: COMPILED SUCCESSFULLY // NEXT.JS 14 APP ROUTER</span>
          <span className="text-cyan-400">SECURE COMMAND CENTER ARCHITECTURE</span>
        </div>

      </div>
    </div>
  );
}