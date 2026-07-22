import fs from 'fs/promises';
import path from 'path';

const files = [
  // 1. FIXING THE NAME IN SIDEBAR
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
            PARVEJ
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
          Last Updated<br/><span className="text-white/70">20 July 2026 | 10:30 AM</span>
        </div>
      </div>
    </aside>
  );
};`
  },

  // 2. FIXING THE NAME IN DASHBOARD
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* WELCOME CARD WITH PARVEJ */}
        <div className="md:col-span-12 lg:col-span-4 rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none"/>
          <div>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">WELCOME BACK,</p>
            <h1 className="text-3xl font-black font-space text-white mb-2 flex items-center gap-2">
              PARVEJ <span className="bg-primary text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]"><CheckCircle2 className="w-3 h-3"/></span>
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

        <div className="md:col-span-12 lg:col-span-4 rounded-2xl overflow-hidden">
          <GlobeWidget />
        </div>
        <div className="md:col-span-12 lg:col-span-4">
          <MarketOverview />
        </div>

        <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="md:col-span-12 lg:col-span-4">
          <EmbeddedAICFO />
        </div>

        <div className="md:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
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

  // 3. RESTORING THE TIMELINE PAGE (NO 404)
  {
    path: 'app/timeline/page.tsx',
    content: `import React from 'react';
import { getTimeline } from '@/services/dataService';
import { GitCommit, Briefcase, GraduationCap, Target, TerminalSquare } from 'lucide-react';

const getIcon = (type: string) => {
  switch (type) {
    case 'Education': return <GraduationCap className="w-5 h-5 text-accent" />;
    case 'Experience': return <Briefcase className="w-5 h-5 text-primary" />;
    case 'Project': return <TerminalSquare className="w-5 h-5 text-success" />;
    default: return <Target className="w-5 h-5 text-warning" />;
  }
};

export default function TimelinePage() {
  const timeline = getTimeline();
  return (
    <div className="w-full lg:ml-64 lg:max-w-[calc(100vw-16rem)] px-6 py-12 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-space mb-2">Career Trajectory</h1>
        <p className="text-white/50 font-mono text-sm">Tracking milestones, certifications, and future strategic goals.</p>
      </div>

      <div className="relative border-l border-white/10 ml-4 space-y-10 pb-12">
        {timeline.map((item, index) => (
          <div key={item.id} className="relative pl-8">
            <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-[#050816] border-2 border-white/20 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
               <GitCommit className="w-4 h-4 text-white/50" />
            </div>
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 hover:border-white/30 transition-colors relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">{getIcon(item.type)}</div>
                <span className="text-xs font-mono tracking-widest text-white/40 uppercase">{item.startDate} - {item.endDate}</span>
              </div>
              <h3 className="text-xl font-space font-bold text-white mb-1">{item.title}</h3>
              <h4 className="text-primary text-sm font-medium mb-3">{item.organization}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              
              {item.status === 'In Progress' && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-warning/10 border border-warning/20 text-warning text-xs font-bold rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" /> IN PROGRESS
                </div>
              )}
              {item.status === 'Future Goal' && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-bold rounded-full">
                  <Target className="w-3 h-3" /> FUTURE TARGET
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`
  },

  // 4. PREMIUM PLACEHOLDER COMPONENT (TO REPLACE EMPTY DUMMY PAGES)
  {
    path: 'components/ui/ModulePlaceholder.tsx',
    content: `import React from 'react';
import { AlertTriangle, Lock } from 'lucide-react';

export const ModulePlaceholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[80vh] w-full lg:ml-64 lg:max-w-[calc(100vw-16rem)] p-6">
     <div className="bg-[#0B1120] border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center max-w-lg shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
          <Lock className="w-8 h-8 text-accent" />
        </div>
        
        <h2 className="text-2xl font-space font-bold text-white mb-3 uppercase tracking-wider">{title}</h2>
        <p className="text-white/50 font-mono text-sm leading-relaxed">
          This module is currently undergoing system integration and data syncing. Full access will be granted shortly.
        </p>
        
        <div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-warning bg-warning/10 px-4 py-2 rounded-full border border-warning/20 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-warning animate-ping" /> SECURE CONNECTION PENDING
        </div>
     </div>
  </div>
);`
  },

  // 5. REPLACING BLANK PAGES WITH PREMIUM PLACEHOLDER
  { path: 'app/market/page.tsx', content: `import { ModulePlaceholder } from '@/components/ui/ModulePlaceholder'; export default function Page() { return <ModulePlaceholder title="Global Market Data" />; }` },
  { path: 'app/company-explorer/page.tsx', content: `import { ModulePlaceholder } from '@/components/ui/ModulePlaceholder'; export default function Page() { return <ModulePlaceholder title="Company Explorer" />; }` },
  { path: 'app/ai-cfo/page.tsx', content: `import { ModulePlaceholder } from '@/components/ui/ModulePlaceholder'; export default function Page() { return <ModulePlaceholder title="AI CFO Interface" />; }` },
  { path: 'app/financial-models/page.tsx', content: `import { ModulePlaceholder } from '@/components/ui/ModulePlaceholder'; export default function Page() { return <ModulePlaceholder title="Financial Models Vault" />; }` },
  { path: 'app/achievements/page.tsx', content: `import { ModulePlaceholder } from '@/components/ui/ModulePlaceholder'; export default function Page() { return <ModulePlaceholder title="Achievements Log" />; }` },
  { path: 'app/contact/page.tsx', content: `import { ModulePlaceholder } from '@/components/ui/ModulePlaceholder'; export default function Page() { return <ModulePlaceholder title="Secure Comms Channel" />; }` }
];

async function runMasterFix() {
  console.log('🚀 Executing Final Master Fix...');
  for (const file of files) {
    const fullPath = path.join(process.cwd(), file.path);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, file.content, 'utf8');
    console.log(`✅ Fixed: ${file.path}`);
  }
  console.log('\n🎉 ALL ISSUES RESOLVED!');
  console.log('➡️ PARVEJ name updated.');
  console.log('➡️ Timeline fully restored.');
  console.log('➡️ Dummy pages converted to Premium Locked Modules.');
}

runMasterFix();