"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, Bot, Building2, FileSpreadsheet, Database, Briefcase, Award, Trophy, Phone, GitCommit, Github, Linkedin, Mail } from 'lucide-react';

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
        <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)] custom-scrollbar">
          {MENU.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-2 border-accent text-white font-bold' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                <item.icon className={`w-4 h-4 ${isActive ? 'text-accent' : ''}`} />
                <span className="font-mono text-xs uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="px-6 space-y-4">
        {/* Exact Social Icons Requested */}
        <div className="flex gap-4 border-t border-white/10 pt-4">
          <Link href="https://github.com/pa8213243-sudo/ParvejPortfolio" target="_blank" className="text-white/40 hover:text-white"><Github className="w-4 h-4" /></Link>
          <Link href="https://www.linkedin.com/in/parvej-alam-sulemanali-ansari-14808928b/" target="_blank" className="text-white/40 hover:text-[#0A66C2]"><Linkedin className="w-4 h-4" /></Link>
          <Link href="mailto:pa8213243@gmail.com" target="_blank" className="text-white/40 hover:text-danger"><Mail className="w-4 h-4" /></Link>
        </div>
        
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
};