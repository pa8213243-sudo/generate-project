"use client";
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
    <div className={`w-full p-6 space-y-6 max-w-[1600px] mx-auto ${devMode ? 'border border-dashed border-accent/50' : ''}`}>
      {devMode && <DevModeOverlay onClose={() => setDevMode(false)} />}
      
      {/* Top Header */}
      <div className="w-full flex items-center justify-between bg-[#0B1120] border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3 text-white/40 text-xs font-mono w-full max-w-sm lg:max-w-lg bg-[#050816] px-4 py-2.5 rounded-xl border border-white/5">
          <Terminal className="w-4 h-4 text-accent" /> <span className="hidden sm:inline">Search Company, Market, or Ask AI CFO...</span>
          <span className="ml-auto text-[10px] bg-white/10 px-2 py-1 rounded text-white/70 hidden sm:inline">Ctrl + K</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/projects" className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer bg-blue-600 text-white font-bold border border-blue-400 shadow-[0_4px_0_#1e3a8a,0_4px_10px_rgba(37,99,235,0.4)] active:translate-y-1 active:shadow-none hover:bg-blue-500">
            <Layers className="w-4 h-4"/> View Projects
          </Link>
          <button onClick={() => setDevMode(!devMode)} className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${devMode ? 'bg-accent text-black font-bold border border-cyan-300 shadow-[0_4px_0_#0891b2,0_4px_10px_rgba(34,211,238,0.4)] active:translate-y-1 active:shadow-none' : 'bg-slate-800 text-white/80 border border-slate-600 shadow-[0_4px_0_#0f172a,0_4px_10px_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none hover:bg-slate-700'}`}>
            <Code className={`w-4 h-4 ${devMode ? 'text-black' : 'text-accent'}`}/> Developer Mode
          </button>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-all cursor-pointer"><Bell className="w-4 h-4" /></div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)]">P</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
        
        {/* COLUMN 1 */}
        <div className="flex flex-col gap-6 h-full">
          {/* Welcome Card */}
          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[350px]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none"/>
            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">WELCOME BACK,</p>
              <h1 className="text-4xl font-black font-space text-white mb-2 flex items-center gap-2">PARVEJ <span className="text-primary"><CheckCircle2 className="w-6 h-6"/></span></h1>
              <p className="text-xs text-white/60 font-sans mb-8 leading-relaxed">FP&A Professional | CMA US Candidate.<br/>Building Financial Intelligence for a Smarter World.</p>
              
              {/* 3D Tagde Buttons Added Here */}
              <div className="flex gap-4">
                <Link href="/projects" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-blue-400 shadow-[0_4px_0_#1e3a8a,0_4px_10px_rgba(37,99,235,0.4)] active:translate-y-1 active:shadow-none hover:bg-blue-500">
                  Explore Dashboard →
                </Link>
                <Link href="/resume" className="px-5 py-2.5 bg-slate-800 text-white/90 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-600 shadow-[0_4px_0_#0f172a,0_4px_10px_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none hover:bg-slate-700">
                  View My Work
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-auto pt-5 border-t border-white/10 text-center">
              <div><div className="text-lg font-space font-bold text-white">0+</div><div className="text-[9px] font-mono text-white/40 uppercase mt-1">Work Exp.</div></div>
              <div><div className="text-lg font-space font-bold text-white">15+</div><div className="text-[9px] font-mono text-white/40 uppercase mt-1">Projects</div></div>
              <div><div className="text-lg font-space font-bold text-white">17+</div><div className="text-[9px] font-mono text-white/40 uppercase mt-1">Certs</div></div>
              <div><div className="text-lg font-space font-bold text-white">50+</div><div className="text-[9px] font-mono text-white/40 uppercase mt-1">Countries</div></div>
            </div>
          </div>

          {/* 📊 PROFESSIONAL FINANCIAL-GRADE THERMAL HEATMAP */}
          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl min-h-[300px] relative overflow-hidden">
            <div className="absolute top-4 right-4 z-30 flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-lg">
               {['1D', '7D', '1M'].map((t) => (
                 <button 
                   key={t} 
                   onClick={() => setActiveTab(t)}
                   className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-colors ${activeTab === t ? 'bg-primary text-white' : 'text-white/60 hover:text-white'}`}
                 >
                   {t}
                 </button>
               ))}
            </div>
            <div>
              <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">GLOBAL MARKET HEATMAP</h3>
              <p className="text-[10px] text-white/40 mb-4">Real-time | Thermal Density | Financial Grade</p>
              
              <div className="w-full h-48 relative flex items-center justify-center rounded-xl overflow-hidden bg-[#030712] border border-white/10">
                
                {/* 1. World Map Base Image */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-40 mix-blend-luminosity filter contrast-200">
                  <img 
                    src="/assets/earth_bump.jpg" 
                    alt="World Map" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 2. Professional Seamless Thermal Heat Glows */}
                <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen">
                  <div className="absolute top-[20%] left-[15%] w-36 h-28 bg-emerald-500/40 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute top-[18%] left-[46%] w-24 h-24 bg-amber-500/35 rounded-full blur-2xl"></div>
                  <div className="absolute top-[35%] left-[58%] w-32 h-28 bg-emerald-400/50 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute top-[25%] left-[72%] w-40 h-32 bg-emerald-500/45 rounded-full blur-2xl"></div>
                  <div className="absolute top-[55%] left-[28%] w-28 h-28 bg-blue-600/40 rounded-full blur-2xl"></div>
                </div>

                {/* Heatmap Legend */}
                <div className="absolute bottom-2 left-2 z-20 flex flex-col items-center bg-[#0B1120]/90 backdrop-blur-md p-1.5 rounded-lg border border-white/15 shadow-xl">
                  <span className="text-[8px] font-mono text-emerald-400 font-bold">High</span>
                  <div className="w-1.5 h-10 bg-gradient-to-b from-emerald-400 via-amber-400 to-blue-500 rounded-full my-1 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[8px] font-mono text-blue-400 font-bold">Low</span>
                </div>
              </div>
            </div>
            <Link href="/market" className="mt-4 text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors w-fit ml-auto z-20">Explore Global Market →</Link>
          </div>
        </div>

        {/* COLUMN 2 */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 min-h-[350px]">
             <GlobeWidget />
          </div>
          <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl min-h-[300px]">
            <div>
              <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">PORTFOLIO HIGHLIGHT</h3>
              <p className="text-[10px] text-white/40 mb-4">Featured Project</p>
              <div className="w-full h-32 bg-[url('/projects/sales%20dashboard.jpeg')] bg-cover bg-center rounded-xl border border-white/10 mb-4 shadow-lg shadow-black/50 hover:scale-[1.02] transition-transform cursor-pointer" />
              <h4 className="text-sm font-bold text-white mb-1.5">Interactive FP&A Dashboard</h4>
              <p className="text-[11px] text-white/60 leading-relaxed">End-to-end financial dashboard built in Power BI & Excel with real-time insights.</p>
            </div>
            <Link href="/projects" className="mt-4 text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors">View Project →</Link>
          </div>
        </div>

        {/* COLUMN 3 */}
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

      {/* BOTTOM ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
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
              <div key={i} className="flex flex-col items-center relative z-10 group-hover:-translate-y-1 transition-transform">
                <div className={`w-10 h-10 rounded-xl ${step.bg} border flex items-center justify-center mb-3 shadow-lg`}>
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <div className="text-xs font-bold text-white">{step.title}</div>
                <div className="text-[10px] font-mono text-white/40 mt-0.5">{step.year}</div>
              </div>
            ))}
          </div>
        </Link>
        <div className="lg:col-span-1 rounded-2xl bg-[#0B1120] border border-white/10 p-7 flex flex-col justify-end relative overflow-hidden shadow-xl min-h-[160px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80')] bg-cover bg-[center_bottom] opacity-40 mix-blend-screen grayscale filter contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
          <div className="absolute right-4 top-2 text-white/10 font-serif text-7xl pointer-events-none">“</div>
          <p className="text-[13px] font-sans text-white/90 leading-relaxed italic relative z-10 w-[85%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            &quot;The goal is not to be in the best company, but to build something that outlives me.&quot;
         </p>
          <div className="mt-4 text-xs font-mono text-accent relative z-10 font-bold">— Parvej</div>
        </div>
      </div>
    </div>
  );
}