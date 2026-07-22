import fs from 'fs/promises';
import path from 'path';

const sidebarPath = path.join(process.cwd(), 'components/layout/Sidebar.tsx');

const updatedSidebar = `"use client";
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
};`;

async function updateSidebar() {
  await fs.writeFile(sidebarPath, updatedSidebar, 'utf8');
  console.log('✅ Sidebar successfully updated with the Career Trajectory (Timeline) link!');
}

updateSidebar();