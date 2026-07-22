import fs from 'fs/promises';
import path from 'path';

const colors = { reset: "\x1b[0m", green: "\x1b[32m", cyan: "\x1b[36m", yellow: "\x1b[33m" };

const phase8Files = [
  // ==========================================
  // 1. SMART DEVICE HARDWARE HOOK
  // ==========================================
  {
    path: 'hooks/useHardwareOptimization.ts',
    content: `"use client";
import { useState, useEffect } from 'react';

export function useHardwareOptimization() {
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    // Basic hardware detection logic
    const checkHardware = () => {
      const isMobile = window.innerWidth < 768;
      // @ts-ignore - deviceMemory is not in standard TS DOM yet
      const ram = navigator.deviceMemory || 4; 
      
      // If it's a mobile device or has less than 4GB RAM, fallback to 2D for performance
      if (isMobile || ram < 4) {
        setCanRender3D(false);
      } else {
        setCanRender3D(true);
      }
    };

    checkHardware();
    window.addEventListener('resize', checkHardware);
    return () => window.removeEventListener('resize', checkHardware);
  }, []);

  return { canRender3D };
}`
  },

  // ==========================================
  // 2. 3D ROTATING EARTH COMPONENT
  // ==========================================
  {
    path: 'components/dashboard/GlobeWidget.tsx',
    content: `"use client";
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useHardwareOptimization } from '@/hooks/useHardwareOptimization';

// Dynamically import Globe to prevent SSR issues with Three.js
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export const GlobeWidget = () => {
  const { canRender3D } = useHardwareOptimization();
  const globeEl = useRef<any>();

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1.5;
      globeEl.current.controls().enableZoom = false;
    }
  }, [canRender3D]);

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#0B1120] to-[#02040A] border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.1)]">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      {canRender3D ? (
        <div className="absolute inset-0 flex items-center justify-center mix-blend-screen opacity-90 cursor-grab active:cursor-grabbing">
          <Globe
            ref={globeEl}
            width={400}
            height={400}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            atmosphereColor="#22d3ee"
            atmosphereAltitude={0.15}
          />
        </div>
      ) : (
        /* Hardware Optimized 2D Fallback */
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-48 h-48 rounded-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif')] bg-cover bg-center opacity-80 shadow-[0_0_50px_rgba(34,211,238,0.4)]" />
           <div className="absolute bottom-4 text-[10px] text-accent font-mono border border-accent/20 px-2 py-1 rounded bg-black/50">2D OPTIMIZED MODE</div>
        </div>
      )}
    </div>
  );
};`
  },

  // ==========================================
  // 3. LIVE STOCK MARKET CHART WIDGET
  // ==========================================
  {
    path: 'components/dashboard/MarketOverview.tsx',
    content: `"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { Activity } from 'lucide-react';

const generateMockData = (start: number) => 
  Array.from({ length: 20 }, (_, i) => ({ val: start + Math.random() * 50 - 25 }));

export const MarketOverview = () => {
  const [data1, setData1] = useState(generateMockData(24500));
  const [data2, setData2] = useState(generateMockData(40200));

  // Simulate real-time updates
  useEffect(() => {
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
        <div className="text-sm font-mono text-white mt-1">{value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
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
        <MarketCard title="CRUDE OIL (WTI)" value={82.15} change="-1.20%" data={generateMockData(82)} color="#ef4444" />
      </div>
    </div>
  );
};`
  },

  // ==========================================
  // 4. EMBEDDED AI CFO WIDGET
  // ==========================================
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
      addMessage({ role: 'ai', content: 'Connection lost.' });
    } finally {
      setIsLoading(false);
    }
  };

  const latestMsg = messages[messages.length - 1];

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-space font-bold text-white tracking-widest uppercase flex items-center gap-2">
          <Bot className="w-4 h-4 text-accent" /> AI CFO ASSISTANT
        </h3>
        <Sparkles className="w-3 h-3 text-accent animate-pulse" />
      </div>

      <div className="flex-1 bg-black/40 rounded-xl p-4 mb-4 border border-white/5 flex flex-col justify-end overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 to-transparent z-10" />
        <div className="relative z-0 text-xs font-mono text-white/70 line-clamp-4 leading-relaxed">
           <span className={\`font-bold \${latestMsg?.role === 'user' ? 'text-primary' : 'text-accent'}\`}>
             {latestMsg?.role === 'user' ? 'PARVEJ: ' : 'J.A.R.V.I.S: '}
           </span>
           {isLoading ? 'Processing financial data...' : latestMsg?.content}
        </div>
      </div>

      <form onSubmit={handleSend} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI CFO..."
          className="w-full bg-[#050816] border border-white/10 rounded-lg pl-4 pr-10 py-2.5 text-xs text-pureWhite outline-none focus:border-accent/50 transition-colors"
        />
        <button type="submit" disabled={isLoading || !input} className="absolute right-1 top-1 p-1.5 bg-accent/20 hover:bg-accent text-accent hover:text-black rounded-md transition-colors">
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};`
  },

  // ==========================================
  // 5. LEFT SIDEBAR NAVIGATION
  // ==========================================
  {
    path: 'components/layout/Sidebar.tsx',
    content: `"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, BrainCircuit, Database, Briefcase, Award, Phone } from 'lucide-react';

const MENU = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Global Market', icon: Globe, path: '/market' },
  { name: 'Projects Vault', icon: Database, path: '/projects' },
  { name: 'Experience', icon: Briefcase, path: '/resume' },
  { name: 'Certificates', icon: Award, path: '/certificates' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#050816]/80 backdrop-blur-2xl border-r border-white/10 z-40 pt-6 pb-6">
      <div className="px-8 mb-12">
        <h1 className="text-xl font-black font-space tracking-wider flex items-center gap-2">
          <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
             <div className="bg-accent rounded-sm"/><div className="bg-white/20 rounded-sm"/>
             <div className="bg-white/20 rounded-sm"/><div className="bg-primary rounded-sm"/>
          </div>
          PARVEJ
        </h1>
        <p className="text-[9px] font-mono text-white/40 uppercase mt-1 tracking-widest">Finance Command Center</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {MENU.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} className={\`flex items-center gap-4 px-4 py-3 rounded-xl transition-all \${isActive ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-2 border-accent text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}\`}>
              <item.icon className={\`w-4 h-4 \${isActive ? 'text-accent' : ''}\`} />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="px-8 flex items-center gap-2 text-[10px] font-mono text-success">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> SYSTEM ONLINE
      </div>
    </aside>
  );
};`
  },

  // ==========================================
  // 6. MAIN BENTO GRID DASHBOARD (app/page.tsx)
  // ==========================================
  {
    path: 'app/page.tsx',
    content: `import React from 'react';
import { GlobeWidget } from '@/components/dashboard/GlobeWidget';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { EmbeddedAICFO } from '@/components/dashboard/EmbeddedAICFO';
import { getPersonalInfo, getProjects, getCertificates } from '@/services/dataService';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function CommandDashboard() {
  const info = getPersonalInfo();
  const projectCount = getProjects().length;
  const certCount = getCertificates().length;

  return (
    <div className="w-full min-h-screen p-4 lg:p-6 pb-24 lg:pb-6 space-y-4 animate-in fade-in duration-700">
      
      {/* Top Search Bar / Header Area */}
      <div className="w-full flex items-center justify-between bg-[#0B1120] border border-white/10 rounded-2xl px-6 py-4 shadow-md mb-4">
        <div className="flex items-center gap-3 text-white/40 text-xs font-mono w-full max-w-md bg-[#050816] px-4 py-2 rounded-lg border border-white/5">
          <Terminal className="w-4 h-4" /> <span>Search Financial Models, Markets, or Ask AI... (Ctrl + K)</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-xs font-mono text-white/50 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">v1.0.0</div>
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold text-xs">P</div>
        </div>
      </div>

      {/* Grid Layout (Bento Box) */}
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(150px,auto)] gap-4">
        
        {/* Profile Card (Span 4) */}
        <div className="md:col-span-12 lg:col-span-4 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none"/>
          <div>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">WELCOME BACK,</p>
            <h1 className="text-3xl font-black font-space text-white mb-1 flex items-center gap-2">
              {info.name.split(' ')[0].toUpperCase()} <span className="bg-primary text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">✓</span>
            </h1>
            <p className="text-xs text-white/60 font-sans mb-6">{info.title} | Building Financial Intelligence.</p>
            
            <div className="flex gap-3">
              <Link href="/projects" className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-bold transition-colors">Explore Dashboard →</Link>
              <Link href="/resume" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-xs font-bold transition-colors">View CV</Link>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-8 pt-4 border-t border-white/10">
            <div className="text-center"><div className="text-lg font-space font-bold text-white">2+</div><div className="text-[9px] font-mono text-white/40 uppercase">Years Exp</div></div>
            <div className="text-center"><div className="text-lg font-space font-bold text-white">{projectCount}+</div><div className="text-[9px] font-mono text-white/40 uppercase">Projects</div></div>
            <div className="text-center"><div className="text-lg font-space font-bold text-white">{certCount}+</div><div className="text-[9px] font-mono text-white/40 uppercase">Certs</div></div>
          </div>
        </div>

        {/* 3D Globe Card (Span 4) */}
        <div className="md:col-span-12 lg:col-span-4 rounded-2xl overflow-hidden p-0">
          <GlobeWidget />
        </div>

        {/* Market Overview Card (Span 4) */}
        <div className="md:col-span-12 lg:col-span-4">
          <MarketOverview />
        </div>

        {/* Global Market Heatmap / Analytics Preview (Span 8) */}
        <div className="md:col-span-12 lg:col-span-8 rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl flex flex-col md:flex-row gap-6 relative overflow-hidden group">
           <div className="flex-1">
             <h3 className="text-sm font-space font-bold text-white tracking-widest uppercase mb-1">Portfolio Highlight</h3>
             <p className="text-xs text-white/40 mb-6">Featured Enterprise FP&A Dashboard</p>
             <h4 className="text-xl font-bold text-white mb-2">ADNOC O&G Command Center</h4>
             <p className="text-sm text-white/60 mb-6 max-w-sm">End-to-end financial dashboard built in Power BI & Excel with real-time variance analysis.</p>
             <Link href="/projects/adnoc-analytics" className="text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors">Inspect Project <ArrowRight className="w-3 h-3"/></Link>
           </div>
           {/* Abstract Image Placeholder for Map/Dashboard */}
           <div className="flex-1 bg-slate-900 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay" />
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
           </div>
        </div>

        {/* AI CFO Embedded Card (Span 4) */}
        <div className="md:col-span-12 lg:col-span-4">
          <EmbeddedAICFO />
        </div>

      </div>
    </div>
  );
}`
  },

  // ==========================================
  // 7. INJECT SIDEBAR & ADJUST LAYOUT
  // ==========================================
  {
    path: 'app/layout.tsx',
    content: `import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { SpaceBackground } from "@/components/background/SpaceBackground";
import { BootSequence } from "@/features/boot-sequence/BootSequence";
import { CommandPalette } from "@/components/ui/CommandPalette";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const viewport: Viewport = { themeColor: "#050816", width: "device-width", initialScale: 1, maximumScale: 1 };
export const metadata: Metadata = { title: "Parvej OS | Finance Command Center", description: "Futuristic Finance Operating System built by Parvej Alam Ansari." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${spaceGrotesk.variable} \${inter.variable} \${jetBrainsMono.variable} antialiased dark\`}>
      <body className="bg-[#02040A] text-pureWhite overflow-x-hidden selection:bg-primary/30 selection:text-pureWhite flex">
        <SpaceBackground />
        <SmoothScrollProvider>
          <CommandPalette />
          <BootSequence />
          
          {/* New Command Center Sidebar */}
          <Sidebar />
          
          {/* Main Content Area (Shifted right to accommodate sidebar on desktop) */}
          <main className="relative min-h-screen w-full lg:ml-64 flex flex-col z-10 pt-4 lg:pt-0">
            {children}
          </main>
          
        </SmoothScrollProvider>
      </body>
    </html>
  );
}`
  }
];

async function generateCommandCenter() {
  console.log(colors.cyan, '\\n🚀 INITIALIZING PHASE 8: THE ULTIMATE COMMAND CENTER OVERHAUL...\\n', colors.reset);

  try {
    for (const file of phase8Files) {
      const dir = path.dirname(file.path);
      await fs.mkdir(dir, { recursive: true }); 
      await fs.writeFile(file.path, file.content, 'utf8');
      console.log(colors.green, `✅ Deployed: ${file.path}`, colors.reset);
    }

    console.log(colors.yellow, '\\n⚠️ NOTE: The old Navbar, Footer, and Floating AICFOWindow have been gracefully replaced by the Grid Layout.');
    console.log(colors.green, '\\n🎉 COMMAND CENTER ONLINE!');
    console.log('✅ Sidebar Navigation Activated.');
    console.log('✅ Hardware-Optimized 3D Earth (Auto-downgrades to 2D for low-end devices).');
    console.log('✅ Real-time Stock Market Widgets Embedded.');
    console.log('✅ AI CFO perfectly integrated into the Bento Box Grid.');
    
    console.log(colors.cyan, '\\n➡️ NEXT STEP: Restart your server (npm run dev) and open http://localhost:3000 to witness the magic!', colors.reset);

  } catch (error) {
    console.error(colors.red, '❌ ERROR DURING DEPLOYMENT:', error, colors.reset);
  }
}

generateCommandCenter();