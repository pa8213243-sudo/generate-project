import fs from 'fs/promises';
import path from 'path';

const filesToCreate = [
  {
    path: 'hooks/useHardwareOptimization.ts',
    content: `"use client";
import { useState, useEffect } from 'react';
export function useHardwareOptimization() {
  const [canRender3D, setCanRender3D] = useState(false);
  useEffect(() => {
    const checkHardware = () => {
      const isMobile = window.innerWidth < 768;
      // @ts-ignore
      const ram = navigator.deviceMemory || 4;
      setCanRender3D(!(isMobile || ram < 4));
    };
    checkHardware();
    window.addEventListener('resize', checkHardware);
    return () => window.removeEventListener('resize', checkHardware);
  }, []);
  return { canRender3D };
}`
  },
  {
    path: 'components/dashboard/GlobeWidget.tsx',
    content: `"use client";
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useHardwareOptimization } from '@/hooks/useHardwareOptimization';
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15)_0%,transparent_70%)] pointer-events-none" />
      {canRender3D ? (
        <div className="absolute inset-0 flex items-center justify-center mix-blend-screen opacity-90 cursor-grab active:cursor-grabbing">
          <Globe ref={globeEl} width={400} height={400} globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" backgroundColor="rgba(0,0,0,0)" atmosphereColor="#22d3ee" atmosphereAltitude={0.15} />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-48 h-48 rounded-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif')] bg-cover bg-center opacity-80 shadow-[0_0_50px_rgba(34,211,238,0.4)]" />
           <div className="absolute bottom-4 text-[10px] text-accent font-mono border border-accent/20 px-2 py-1 rounded bg-black/50">2D OPTIMIZED MODE</div>
        </div>
      )}
    </div>
  );
}`
  },
  {
    path: 'components/dashboard/MarketOverview.tsx',
    content: `"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
const generateMockData = (start: number) => Array.from({ length: 20 }, (_, i) => ({ val: start + Math.random() * 50 - 25 }));
export const MarketOverview = () => {
  const [data1, setData1] = useState(generateMockData(24500));
  const [data2, setData2] = useState(generateMockData(40200));
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
}`
  },
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
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask AI CFO..." className="w-full bg-[#050816] border border-white/10 rounded-lg pl-4 pr-10 py-2.5 text-xs text-pureWhite outline-none focus:border-accent/50 transition-colors" />
        <button type="submit" disabled={isLoading || !input} className="absolute right-1 top-1 p-1.5 bg-accent/20 hover:bg-accent text-accent hover:text-black rounded-md transition-colors">
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}`
  },
  {
    path: 'components/layout/Sidebar.tsx',
    content: `"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, Database, Briefcase, Award, GitCommit } from 'lucide-react';
const MENU = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Global Market', icon: Globe, path: '/market' },
  { name: 'Projects Vault', icon: Database, path: '/projects' },
  { name: 'Career Trajectory', icon: GitCommit, path: '/timeline' },
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
  }
];

async function createMissingFiles() {
  console.log('🚀 Generating missing dashboard and layout components...');
  for (const file of filesToCreate) {
    const fullPath = path.join(process.cwd(), file.path);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, file.content, 'utf8');
    console.log(`✅ Created: ${file.path}`);
  }
  console.log('\n🎉 ALL MISSING COMPONENTS CREATED SUCCESSFULLY!');
}

createMissingFiles();