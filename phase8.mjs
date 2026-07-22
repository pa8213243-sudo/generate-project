import fs from 'fs/promises';
import path from 'path';

const phase8Files = [
  // ==========================================
  // 1. GLOBAL READING PROGRESS BAR
  // ==========================================
  {
    path: 'components/ui/ReadingProgress.tsx',
    content: `"use client";
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left z-[9999] shadow-[0_0_10px_rgba(34,211,238,0.5)]"
      style={{ scaleX }}
    />
  );
};`
  },

  // ==========================================
  // 2. REUSABLE EMPTY STATE COMPONENT
  // ==========================================
  {
    path: 'components/ui/EmptyState.tsx',
    content: `import React from 'react';
import { Database } from 'lucide-react';
import { Button } from './Button';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionLink?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "DATA_NOT_FOUND", 
  message = "No records match the current query parameters.",
  actionText = "Return Home",
  actionLink = "/"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-white/5 bg-white/5 rounded-2xl border-dashed">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
        <Database className="w-8 h-8 text-white/20" />
      </div>
      <h3 className="text-xl font-space font-bold text-white/80 mb-2">{title}</h3>
      <p className="text-white/40 font-mono text-sm mb-6 max-w-sm">{message}</p>
      {actionLink && (
        <Link href={actionLink}>
          <Button variant="glass" size="sm">{actionText}</Button>
        </Link>
      )}
    </div>
  );
};`
  },

  // ==========================================
  // 3. PREMIUM 404 PAGE (NOT FOUND)
  // ==========================================
  {
    path: 'app/not-found.tsx',
    content: `import React from 'react';
import Link from 'next/link';
import { Terminal, Home } from 'lucide-react';
import { SpaceBackground } from '@/components/background/SpaceBackground';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10">
      <SpaceBackground />
      <div className="bg-[#050816]/80 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-2xl flex flex-col items-center max-w-lg w-full">
        <Terminal className="w-16 h-16 text-warning mb-6 opacity-80" />
        <h1 className="text-7xl font-space font-black text-pureWhite mb-2 tracking-tighter">404</h1>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-warning/50 to-transparent my-6" />
        <p className="text-sm text-warning font-mono mb-8 tracking-widest uppercase">
          [ ERROR: RESOURCE_NOT_LOCATED ]
        </p>
        <p className="text-white/60 mb-8 leading-relaxed">
          The requested asset is either encrypted, moved, or does not exist within the PARVEJ OS architecture.
        </p>
        <Link href="/" className="w-full">
          <button className="w-full py-3 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold text-white/90">
            <Home className="w-5 h-5" /> REBOOT TO DASHBOARD
          </button>
        </Link>
      </div>
    </div>
  );
}`
  },

  // ==========================================
  // 4. PREMIUM 500 PAGE (SERVER ERROR)
  // ==========================================
  {
    path: 'app/error.tsx',
    content: `"use client";
import React, { useEffect } from 'react';
import { AlertOctagon, RefreshCcw } from 'lucide-react';
import { SpaceBackground } from '@/components/background/SpaceBackground';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to an error reporting service here
    console.error("PARVEJ OS System Error:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10">
      <SpaceBackground />
      <div className="bg-[#050816]/80 backdrop-blur-xl border border-danger/30 p-12 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.1)] flex flex-col items-center max-w-lg w-full">
        <AlertOctagon className="w-16 h-16 text-danger mb-6 animate-pulse" />
        <h1 className="text-4xl font-space font-black text-pureWhite mb-2">SYSTEM HALTED</h1>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-danger/50 to-transparent my-6" />
        <p className="text-sm text-danger font-mono mb-8 tracking-widest uppercase">
          [ EXCEPTION: INTEGRITY_COMPROMISED ]
        </p>
        <p className="text-white/60 mb-8 leading-relaxed">
          An unexpected anomaly occurred within the neural network. The issue has been logged for architectural review.
        </p>
        <button 
          onClick={() => reset()} 
          className="w-full py-3 bg-danger/10 border border-danger/30 hover:border-danger hover:bg-danger/20 text-danger rounded-lg flex items-center justify-center gap-2 transition-all font-semibold"
        >
          <RefreshCcw className="w-5 h-5" /> RETRY CONNECTION
        </button>
      </div>
    </div>
  );
}`
  },

  // ==========================================
  // 5. TIMELINE JOURNEY PAGE
  // ==========================================
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
    <div className="w-full max-w-5xl mx-auto px-6 py-24 animate-in fade-in duration-700 relative">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold font-space mb-6">Career <span className="text-gradient">Trajectory</span></h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">Tracking milestones, certifications, and future strategic goals.</p>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-1/2 space-y-12 pb-12">
        {timeline.map((item, index) => (
          <div key={item.id} className="relative pl-10 md:pl-0">
            {/* Timeline Line Node */}
            <div className="absolute left-[-16px] md:left-1/2 md:-ml-[16px] top-0 w-8 h-8 rounded-full bg-[#050816] border-2 border-white/20 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
               <GitCommit className="w-4 h-4 text-white/50" />
            </div>

            <div className={\`md:w-1/2 \${index % 2 === 0 ? 'md:pr-16 md:ml-0 md:text-right flex flex-col md:items-end' : 'md:pl-16 md:ml-auto'}\`}>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors backdrop-blur-md relative group w-full text-left">
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    {getIcon(item.type)}
                  </div>
                  <span className="text-xs font-mono tracking-widest text-white/40 uppercase bg-black/50 px-2 py-1 rounded">
                    {item.startDate} - {item.endDate}
                  </span>
                </div>
                
                <h3 className="text-2xl font-space font-bold text-pureWhite mb-2">{item.title}</h3>
                <h4 className="text-primary font-medium mb-4">{item.organization}</h4>
                <p className="text-white/60 leading-relaxed text-sm">{item.description}</p>
                
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
          </div>
        ))}
      </div>
    </div>
  );
}`
  },

  // ==========================================
  // 6. INJECT READING PROGRESS BAR INTO LAYOUT
  // ==========================================
  {
    path: 'app/layout.tsx',
    content: `import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpaceBackground } from "@/components/background/SpaceBackground";
import { BootSequence } from "@/features/boot-sequence/BootSequence";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { AICFOWindow } from "@/features/ai-cfo/AICFOWindow";
import { ReadingProgress } from "@/components/ui/ReadingProgress";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const viewport: Viewport = { themeColor: "#050816", width: "device-width", initialScale: 1, maximumScale: 1 };

export const metadata: Metadata = {
  title: "Parvej OS | Finance Command Center",
  description: "Futuristic Finance Operating System built by Parvej Alam Ansari.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${spaceGrotesk.variable} \${inter.variable} \${jetBrainsMono.variable} antialiased dark\`}>
      <body className="bg-[#02040A] text-pureWhite overflow-x-hidden selection:bg-primary/30 selection:text-pureWhite">
        <SpaceBackground />
        <SmoothScrollProvider>
          <ReadingProgress />
          <CommandPalette />
          <BootSequence />
          <Navbar />
          <main className="relative min-h-screen w-full flex flex-col pt-24 z-10">
            {children}
          </main>
          <Footer />
          <AICFOWindow />
          <SoundToggle />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}`
  }
];

async function generatePhase8() {
  console.log('🚀 INITIALIZING PHASE 8: FINAL POLISH & ERROR VIEWS...');

  try {
    for (const file of phase8Files) {
      const dir = path.dirname(file.path);
      await fs.mkdir(dir, { recursive: true }); 
      await fs.writeFile(file.path, file.content, 'utf8');
      console.log(`✅ Polished: ${file.path}`);
    }

    console.log('\\n🎉 PHASE 8 DEPLOYED SUCCESSFULLY!');
    console.log('✅ Global Reading Progress Bar injected.');
    console.log('✅ Empty State Reusable Component created.');
    console.log('✅ Premium 404 (Not Found) "System Error" View deployed.');
    console.log('✅ Premium 500 "Integrity Compromised" View deployed.');
    console.log('✅ Career Trajectory (Timeline) Page deployed.');
    console.log('\\n➡️ NEXT STEP: Run "node generate-phase8-polish.mjs".');
    console.log('➡️ Open http://localhost:3000/timeline to check the journey UI!');
    console.log('➡️ To test the 404 page, go to a random URL like http://localhost:3000/adnoc-jobs');
    console.log('\\n🔥 We are now ready for Phase 9: Deployment & Optimization!');

  } catch (error) {
    console.error('❌ ERROR DURING POLISHING:', error);
  }
}

generatePhase8();