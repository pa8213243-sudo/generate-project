import fs from 'fs/promises';
import path from 'path';

async function forceCommandCenter() {
  console.log('🚀 Forcing Command Center layout and page overwrite...');

  const layoutCode = `import type { Metadata, Viewport } from "next";
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
          <Sidebar />
          <main className="relative min-h-screen w-full lg:ml-64 flex flex-col z-10 pt-4 lg:pt-0">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}`;

  const pageCode = `import React from 'react';
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
      <div className="w-full flex items-center justify-between bg-[#0B1120] border border-white/10 rounded-2xl px-6 py-4 shadow-md mb-4">
        <div className="flex items-center gap-3 text-white/40 text-xs font-mono w-full max-w-md bg-[#050816] px-4 py-2 rounded-lg border border-white/5">
          <Terminal className="w-4 h-4" /> <span>Search Financial Models, Markets, or Ask AI... (Ctrl + K)</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-xs font-mono text-white/50 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">v1.0.0</div>
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold text-xs">P</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(150px,auto)] gap-4">
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

        <div className="md:col-span-12 lg:col-span-4 rounded-2xl overflow-hidden p-0">
          <GlobeWidget />
        </div>

        <div className="md:col-span-12 lg:col-span-4">
          <MarketOverview />
        </div>

        <div className="md:col-span-12 lg:col-span-8 rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl flex flex-col md:flex-row gap-6 relative overflow-hidden group">
           <div className="flex-1">
             <h3 className="text-sm font-space font-bold text-white tracking-widest uppercase mb-1">Portfolio Highlight</h3>
             <p className="text-xs text-white/40 mb-6">Featured Enterprise FP&A Dashboard</p>
             <h4 className="text-xl font-bold text-white mb-2">ADNOC O&G Command Center</h4>
             <p className="text-sm text-white/60 mb-6 max-w-sm">End-to-end financial dashboard built in Power BI & Excel with real-time variance analysis.</p>
             <Link href="/projects/adnoc-analytics" className="text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors">Inspect Project <ArrowRight className="w-3 h-3"/></Link>
           </div>
           <div className="flex-1 bg-slate-900 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay" />
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
           </div>
        </div>

        <div className="md:col-span-12 lg:col-span-4">
          <EmbeddedAICFO />
        </div>
      </div>
    </div>
  );
}`;

  await fs.writeFile(path.join(process.cwd(), 'app/layout.tsx'), layoutCode, 'utf8');
  await fs.writeFile(path.join(process.cwd(), 'app/page.tsx'), pageCode, 'utf8');
  console.log('✅ Successfully forced Command Center layout and page overwrite!');
}

forceCommandCenter();