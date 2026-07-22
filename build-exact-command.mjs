import fs from 'fs/promises';
import path from 'path';

const files = [
  // 1. Sidebar Component with ALL links working (No 404s)
  {
    path: 'components/layout/Sidebar.tsx',
    content: `"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, Bot, Building2, FileSpreadsheet, Database, Briefcase, Award, Trophy, Phone, GitCommit } from 'lucide-react';

const MENU = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Global Market', icon: Globe, path: '/market' },
  { name: 'AI CFO', icon: Bot, path: '/ai-cfo' },
  { name: 'Company Explorer', icon: Building2, path: '/company-explorer' },
  { name: 'Financial Models', icon: FileSpreadsheet, path: '/financial-models' },
  { name: 'Projects', icon: Database, path: '/projects' },
  { name: 'Career Trajectory', icon: GitCommit, path: '/timeline' },
  { name: 'Experience', icon: Briefcase, path: '/resume' },
  { name: 'Certificates', icon: Award, path: '/certificates' },
  { name: 'Achievements', icon: Trophy, path: '/achievements' },
  { name: 'Contact', icon: Phone, path: '/contact' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#050816]/95 backdrop-blur-2xl border-r border-white/10 z-40 py-6 justify-between">
      <div>
        <div className="px-6 mb-8">
          <h1 className="text-xl font-black font-space tracking-wider flex items-center gap-2">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
               <div className="bg-accent rounded-sm"/><div className="bg-white/20 rounded-sm"/>
               <div className="bg-white/20 rounded-sm"/><div className="bg-primary rounded-sm"/>
            </div>
            PARVEZ
          </h1>
          <p className="text-[9px] font-mono text-white/40 uppercase mt-1 tracking-widest">FINANCE COMMAND CENTER</p>
        </div>

        <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar">
          {MENU.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} className={\`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all \${isActive ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-2 border-accent text-white font-bold' : 'text-white/50 hover:text-white hover:bg-white/5'}\`}>
                <item.icon className={\`w-4 h-4 \${isActive ? 'text-accent' : ''}\`} />
                <span className="font-mono text-xs uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-6 pt-4 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between text-[10px] font-mono text-success">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success animate-pulse" /> System Status</span>
          <span className="text-white/60">Operational</span>
        </div>
        <div className="text-[10px] font-mono text-white/40">
          Last Updated<br/><span className="text-white/70">20 July 2025 | 10:30 AM</span>
        </div>
      </div>
    </aside>
  );
};`
  },

  // 2. Exact Holographic Earth Widget matching the screenshot aesthetic
  {
    path: 'components/dashboard/GlobeWidget.tsx',
    content: `"use client";
import React from 'react';

export const GlobeWidget = () => {
  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#0B1120] to-[#02040A] border border-white/10 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative w-56 h-56 rounded-full shadow-[0_0_80px_rgba(34,211,238,0.4)] border border-accent/40 overflow-hidden flex items-center justify-center bg-black/80">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-80 scale-125 animate-pulse duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-transparent to-primary/30 pointer-events-none" />
          <div className="absolute w-2 h-2 rounded-full bg-accent shadow-[0_0_15px_#22d3ee] animate-ping" />
        </div>
        <div className="mt-4 text-[10px] font-mono text-accent/80 tracking-widest uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> ADNOC GLOBAL SATELLITE FEED
        </div>
      </div>
    </div>
  );
};`
  },

  // 3. Market Overview Widget with exact tickers from image
  {
    path: 'components/dashboard/MarketOverview.tsx',
    content: `"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const INITIAL_DATA = [
  { val: 24500 }, { val: 24510 }, { val: 24505 }, { val: 24520 }, { val: 24515 },
  { val: 24530 }, { val: 24543 }
];

export const MarketOverview = () => {
  const [data, setData] = useState(INITIAL_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(1), { val: prev[prev.length - 1].val + (Math.random() * 10 - 5) }]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const Ticker = ({ title, val, change, color }: any) => (
    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
      <div>
        <div className="text-xs font-bold text-white/80">{title}</div>
        <div className="text-sm font-mono text-white font-semibold mt-0.5">{val}</div>
        <div className="text-[10px] font-mono text-success">{change}</div>
      </div>
      <div className="w-20 h-10">
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
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase">MARKET OVERVIEW</h3>
        <span className="flex items-center gap-1 text-[10px] text-success font-mono uppercase bg-success/10 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"/> Live</span>
      </div>
      <div className="space-y-2.5">
        <Ticker title="NIFTY 50" val="24,543.15" change="+0.65%" color="#22c55e" />
        <Ticker title="S&P 500" val="5,505.00" change="+0.71%" color="#22c55e" />
        <Ticker title="DOW JONES" val="40,287.53" change="+0.49%" color="#22c55e" />
        <Ticker title="NASDAQ" val="17,726.94" change="+0.93%" color="#22c55e" />
      </div>
    </div>
  );
};`
  },

  // 4. Embedded AI CFO Assistant Widget
  {
    path: 'components/dashboard/EmbeddedAICFO.tsx',
    content: `"use client";
import React, { useState } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';

export const EmbeddedAICFO = () => {
  const { messages, addMessage, isLoading, setIsLoading } = useChatStore();
  const [input, setInput] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userMsg });
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await response.json();
      addMessage({ role: 'ai', content: data.reply || data.error });
    } catch {
      addMessage({ role: 'ai', content: 'Connection error.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase flex items-center gap-2">
          <Bot className="w-4 h-4 text-accent" /> AI CFO ASSISTANT
        </h3>
        <span className="text-[10px] font-mono text-accent flex items-center gap-1 bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
          <Sparkles className="w-3 h-3"/> Gemini 1.5 Flash
        </span>
      </div>

      <div className="flex-1 bg-black/40 rounded-xl p-3.5 mb-3 border border-white/5 flex flex-col justify-end">
        <div className="text-xs font-mono text-white/80 bg-white/5 p-3 rounded-lg border border-white/5">
          <span className="text-accent font-bold">Hi Parvej! I'm your AI CFO.</span><br/>
          Ask me anything about financial analysis, modeling, markets, or strategy.
        </div>
      </div>

      <form onSubmit={handleSend} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          className="w-full bg-[#050816] border border-white/10 rounded-lg pl-3 pr-10 py-2.5 text-xs text-pureWhite outline-none focus:border-accent/50 transition-colors"
        />
        <button type="submit" disabled={isLoading || !input} className="absolute right-1 top-1 p-1.5 bg-accent text-black rounded-md transition-colors hover:bg-cyan-300">
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};`
  },

  // 5. Exact Bento Grid Page matching target screenshot
  {
    path: 'app/page.tsx',
    content: `import React from 'react';
import { GlobeWidget } from '@/components/dashboard/GlobeWidget';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { EmbeddedAICFO } from '@/components/dashboard/EmbeddedAICFO';
import { getPersonalInfo, getProjects, getCertificates } from '@/services/dataService';
import { ArrowRight, Terminal, Bell, Code, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CommandDashboard() {
  const info = getPersonalInfo();
  const projectCount = getProjects().length;
  const certCount = getCertificates().length;

  return (
    <div className="w-full min-h-screen p-4 lg:p-6 pb-24 space-y-4 animate-in fade-in duration-700 lg:ml-64 lg:max-w-[calc(100vw-16rem)]">
      
      {/* Top Header Bar matching screenshot */}
      <div className="w-full flex items-center justify-between bg-[#0B1120] border border-white/10 rounded-2xl px-6 py-3.5 shadow-lg">
        <div className="flex items-center gap-3 text-white/40 text-xs font-mono w-full max-w-lg bg-[#050816] px-4 py-2 rounded-xl border border-white/5">
          <Terminal className="w-4 h-4 text-accent" /> <span>Search Company, Market, or Ask AI CFO...</span>
          <span className="ml-auto text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">Ctrl + K</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-white/80 transition-colors">
            <Code className="w-3.5 h-3.5 text-accent"/> Developer Mode
          </button>
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white cursor-pointer">
            <Bell className="w-4 h-4" />
          </div>
          <div className="w-9 h-9 rounded-full bg-accent text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            P
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* 1. Welcome Card (Span 4) - FIXED TO 0+ YEARS EXPERIENCE */}
        <div className="md:col-span-12 lg:col-span-4 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none"/>
          <div>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">WELCOME BACK,</p>
            <h1 className="text-3xl font-black font-space text-white mb-2 flex items-center gap-2">
              PARVEZ <span className="bg-primary text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]"><CheckCircle2 className="w-3 h-3"/></span>
            </h1>
            <p className="text-xs text-white/60 font-sans mb-6 leading-relaxed">FP&A Professional | CMA US Candidate.<br/>Building Financial Intelligence for a Smarter World.</p>
            
            <div className="flex gap-3">
              <Link href="/projects" className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_15px_rgba(59,130,246,0.3)]">Explore Dashboard →</Link>
              <Link href="/resume" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold transition-all">View My Work</Link>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-8 pt-4 border-t border-white/10">
            <div className="text-center"><div className="text-base font-space font-bold text-white">0+</div><div className="text-[8px] font-mono text-white/40 uppercase">Experience</div></div>
            <div className="text-center"><div className="text-base font-space font-bold text-white">{projectCount}+</div><div className="text-[8px] font-mono text-white/40 uppercase">Projects</div></div>
            <div className="text-center"><div className="text-base font-space font-bold text-white">{certCount}+</div><div className="text-[8px] font-mono text-white/40 uppercase">Certifications</div></div>
            <div className="text-center"><div className="text-base font-space font-bold text-white">50+</div><div className="text-[8px] font-mono text-white/40 uppercase">Countries</div></div>
          </div>
        </div>

        {/* 2. Globe Widget (Span 4) */}
        <div className="md:col-span-12 lg:col-span-4 rounded-2xl overflow-hidden">
          <GlobeWidget />
        </div>

        {/* 3. Market Overview (Span 4) */}
        <div className="md:col-span-12 lg:col-span-4">
          <MarketOverview />
        </div>

        {/* 4. Global Market Heatmap & Portfolio Highlight (Span 8) */}
        <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Heatmap Card */}
          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div>
              <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">GLOBAL MARKET HEATMAP</h3>
              <p className="text-[11px] text-white/40 mb-4">Real-time Market Strength</p>
              <div className="w-full h-32 rounded-xl bg-slate-900 border border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
              </div>
            </div>
            <Link href="/market" className="mt-4 text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors">Explore Global Market →</Link>
          </div>

          {/* Portfolio Highlight */}
          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div>
              <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">PORTFOLIO HIGHLIGHT</h3>
              <p className="text-[11px] text-white/40 mb-2">Featured Project</p>
              <h4 className="text-base font-bold text-white mb-2">Interactive FP&A Dashboard</h4>
              <p className="text-xs text-white/60 leading-relaxed">End-to-end financial dashboard built in Power BI & Excel with real-time insights.</p>
            </div>
            <Link href="/projects" className="mt-4 text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors">View Project →</Link>
          </div>
        </div>

        {/* 5. Embedded AI CFO (Span 4) */}
        <div className="md:col-span-12 lg:col-span-4">
          <EmbeddedAICFO />
        </div>

        {/* 6. Financial Snapshot & Quote Section (Span 12) */}
        <div className="md:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Financial Snapshot (Span 8) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl">
            <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">FINANCIAL SNAPSHOT</h3>
            <p className="text-[11px] text-white/40 mb-6">All values in USD</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Revenue Modeled</div>
                <div className="text-lg font-space font-bold text-accent">$2.4 B+</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Data Analyzed</div>
                <div className="text-lg font-space font-bold text-primary">250K+</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Models Built</div>
                <div className="text-lg font-space font-bold text-success">35+</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Hours Invested</div>
                <div className="text-lg font-space font-bold text-warning">2,000+</div>
              </div>
            </div>
          </div>

          {/* Quote Card (Span 4) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-4 top-4 text-white/5 font-serif text-7xl pointer-events-none">“</div>
            <p className="text-xs font-sans text-white/80 leading-relaxed italic relative z-10">
              "The goal is not to be in the best company, but to build something that outlives me."
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs font-mono text-accent">— Parvej</div>
          </div>

        </div>

      </div>
    </div>
  );
}`
  },

  // 7. Dummy pages for sidebar links to prevent 404s
  {
    path: 'app/market/page.tsx',
    content: `import React from 'react';
export default function GlobalMarketPage() {
  return (
    <div className="p-8 lg:ml-64"><h1 className="text-3xl font-bold font-space mb-4">Global Market Intelligence</h1><p className="text-white/60">Real-time oil & gas and financial market telemetry.</p></div>
  );
}`
  },
  {
    path: 'app/ai-cfo/page.tsx',
    content: `import React from 'react';
export default function AICFOPage() {
  return (
    <div className="p-8 lg:ml-64"><h1 className="text-3xl font-bold font-space mb-4">AI CFO Command Hub</h1><p className="text-white/60">Interact with Gemini-powered financial reasoning engine.</p></div>
  );
}`
  },
  {
    path: 'app/company-explorer/page.tsx',
    content: `import React from 'react';
export default function CompanyExplorerPage() {
  return (
    <div className="p-8 lg:ml-64"><h1 className="text-3xl font-bold font-space mb-4">Company Explorer</h1><p className="text-white/60">Targeting ADNOC Oil & Gas and UAE financial ecosystems.</p></div>
  );
}`
  },
  {
    path: 'app/financial-models/page.tsx',
    content: `import React from 'react';
export default function FinancialModelsPage() {
  return (
    <div className="p-8 lg:ml-64"><h1 className="text-3xl font-bold font-space mb-4">Financial Models Vault</h1><p className="text-white/60">Advanced DCF, LBO, and FP&A models built in Excel & Power BI.</p></div>
  );
}`
  },
  {
    path: 'app/achievements/page.tsx',
    content: `import React from 'react';
export default function AchievementsPage() {
  return (
    <div className="p-8 lg:ml-64"><h1 className="text-3xl font-bold font-space mb-4">Professional Achievements</h1><p className="text-white/60">CMA US Part 1 cleared, FP&A milestones, and academic accolades.</p></div>
  );
}`
  },
  {
    path: 'app/contact/page.tsx',
    content: `import React from 'react';
export default function ContactPage() {
  return (
    <div className="p-8 lg:ml-64"><h1 className="text-3xl font-bold font-space mb-4">Secure Communications</h1><p className="text-white/60">Connect with Parvej Alam Ansari for FP&A and UAE opportunities.</p></div>
  );
}`
  }
];

async function deployExactMatch() {
  console.log('🚀 Building exact Bloomberg Command Center match...');
  for (const file of files) {
    const fullPath = path.join(process.cwd(), file.path);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, file.content, 'utf8');
    console.log(`✅ Deployed: ${file.path}`);
  }
  console.log('\n🎉 EXACT MATCH DEPLOYED SUCCESSFULLY!');
}

deployExactMatch();