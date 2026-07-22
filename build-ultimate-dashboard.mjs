import fs from 'fs/promises';
import path from 'path';

const files = [
  // 1. EXACT GLOBE (No Three.js, purely CSS Holographic - NO CRASHES)
  {
    path: 'components/dashboard/GlobeWidget.tsx',
    content: `"use client";
import React from 'react';

export const GlobeWidget = () => {
  return (
    <div className="relative w-full h-full min-h-[340px] flex items-center justify-center rounded-2xl bg-[#0B1120] border border-white/10 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-screen" />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {/* Holographic Glowing Earth */}
        <div className="relative w-64 h-64 rounded-full shadow-[0_0_80px_rgba(34,211,238,0.3),inset_0_0_60px_rgba(0,0,0,0.8)] border border-accent/30 overflow-hidden flex items-center justify-center bg-black animate-[spin_60s_linear_infinite]">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/c/c4/Earthmap1000x500compac.jpg')] bg-cover bg-center opacity-70 mix-blend-screen filter sepia-[.3] hue-rotate-[180deg] saturate-[2] brightness-[1.2]" />
        </div>
        {/* Static Overlay Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-primary/40 via-transparent to-cyan-400/20 pointer-events-none shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.9)]" />
        
        <div className="absolute bottom-6 text-[10px] font-mono text-accent tracking-widest uppercase flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-accent/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> ADNOC GLOBAL SATELLITE FEED
        </div>
      </div>
    </div>
  );
};`
  },

  // 2. MARKET OVERVIEW (Exactly 2x2 Grid as requested)
  {
    path: 'components/dashboard/MarketOverview.tsx',
    content: `"use client";
import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const dummyData = [{v:10},{v:12},{v:11},{v:14},{v:13},{v:16},{v:15}];

export const MarketOverview = () => {
  const Ticker = ({ title, val, change }: any) => (
    <div className="flex flex-col justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
      <div className="text-[10px] font-bold text-white/70">{title}</div>
      <div className="text-sm font-mono text-white font-semibold mt-1">{val}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] font-mono text-success">{change}</span>
        <div className="w-12 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData}><YAxis domain={['dataMin', 'dataMax']} hide /><Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={1.5} dot={false} /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-space font-bold text-white tracking-widest uppercase">MARKET OVERVIEW</h3>
        <span className="flex items-center gap-1 text-[9px] text-success font-mono uppercase bg-success/10 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"/> Live</span>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1">
        <Ticker title="NIFTY 50" val="24,543.15" change="+0.65%" />
        <Ticker title="S&P 500" val="5,505.00" change="+0.71%" />
        <Ticker title="DOW JONES" val="40,287.53" change="+0.49%" />
        <Ticker title="NASDAQ" val="17,726.94" change="+0.93%" />
      </div>
    </div>
  );
};`
  },

  // 3. PERFECT DASHBOARD LAYOUT (Layout Shift Fixed + Journey Added + 2x2 Snapshots)
  {
    path: 'app/page.tsx',
    content: `import React from 'react';
import { GlobeWidget } from '@/components/dashboard/GlobeWidget';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { EmbeddedAICFO } from '@/components/dashboard/EmbeddedAICFO';
import { ArrowRight, Terminal, Bell, Code, CheckCircle2, BookOpen, GraduationCap, Target, Briefcase, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function CommandDashboard() {
  return (
    <div className="w-full lg:w-[calc(100%-16rem)] lg:ml-64 min-h-screen p-4 lg:p-6 pb-24 space-y-4 animate-in fade-in duration-700">
      
      {/* Top Header */}
      <div className="w-full flex items-center justify-between bg-[#0B1120] border border-white/10 rounded-2xl px-6 py-3.5 shadow-lg">
        <div className="flex items-center gap-3 text-white/40 text-xs font-mono w-full max-w-lg bg-[#050816] px-4 py-2 rounded-xl border border-white/5">
          <Terminal className="w-4 h-4 text-accent" /> <span>Search Company, Market, or Ask AI CFO...</span>
          <span className="ml-auto text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">Ctrl + K</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white/80"><Code className="w-3.5 h-3.5 text-accent"/> Developer Mode</button>
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80"><Bell className="w-4 h-4" /></div>
          <div className="w-9 h-9 rounded-full bg-accent text-black font-black flex items-center justify-center text-sm">P</div>
        </div>
      </div>

      {/* Main Grid exactly matching reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LEFT & CENTER COLUMN (Spans 8) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          
          {/* Top Row: Welcome & Globe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Welcome Card */}
            <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none"/>
              <div>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">WELCOME BACK,</p>
                <h1 className="text-3xl font-black font-space text-white mb-2 flex items-center gap-2">PARVEJ <span className="text-primary"><CheckCircle2 className="w-5 h-5"/></span></h1>
                <p className="text-xs text-white/60 font-sans mb-6">FP&A Professional | CMA US Candidate.<br/>Building Financial Intelligence for a Smarter World.</p>
                <div className="flex gap-3">
                  <Link href="/projects" className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-[0_4px_15px_rgba(59,130,246,0.3)]">Explore Dashboard →</Link>
                  <Link href="/resume" className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold">View My Work</Link>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-8 pt-4 border-t border-white/10 text-center">
                <div><div className="text-base font-space font-bold text-white">0+</div><div className="text-[8px] font-mono text-white/40 uppercase">Years Exp</div></div>
                <div><div className="text-base font-space font-bold text-white">15+</div><div className="text-[8px] font-mono text-white/40 uppercase">Projects</div></div>
                <div><div className="text-base font-space font-bold text-white">17+</div><div className="text-[8px] font-mono text-white/40 uppercase">Certs</div></div>
                <div><div className="text-base font-space font-bold text-white">50+</div><div className="text-[8px] font-mono text-white/40 uppercase">Countries</div></div>
              </div>
            </div>
            
            {/* Globe Widget */}
            <GlobeWidget />
          </div>

          {/* Middle Row: Heatmap & Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Heatmap exactly like image */}
            <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5 flex flex-col justify-between group">
              <div>
                <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">GLOBAL MARKET HEATMAP</h3>
                <p className="text-[10px] text-white/40 mb-4">Real-time Market Strength</p>
                <div className="w-full h-32 rounded-xl bg-[#050816] relative overflow-hidden flex items-center justify-center border border-white/5">
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png')] bg-contain bg-center bg-no-repeat opacity-50 filter hue-rotate-[160deg] brightness-150" />
                  <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                    <span className="text-[8px] font-mono text-success">High</span>
                    <div className="w-1.5 h-10 bg-gradient-to-t from-transparent to-success rounded-full"></div>
                    <span className="text-[8px] font-mono text-white/40">Low</span>
                  </div>
                </div>
              </div>
              <Link href="/market" className="mt-4 text-[10px] font-mono text-accent hover:text-white flex items-center gap-1">Explore Global Market →</Link>
            </div>

            <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">PORTFOLIO HIGHLIGHT</h3>
                <p className="text-[10px] text-white/40 mb-3">Featured Project</p>
                <div className="w-full h-24 bg-[url('/projects/sales%20dashboard.jpeg')] bg-cover bg-center rounded-lg opacity-80 border border-white/5 mb-3" />
                <h4 className="text-sm font-bold text-white mb-1">Interactive FP&A Dashboard</h4>
                <p className="text-[10px] text-white/60">End-to-end financial dashboard built in Power BI & Excel with real-time insights.</p>
              </div>
              <Link href="/projects" className="mt-3 text-[10px] font-mono text-accent hover:text-white flex items-center gap-1">View Project →</Link>
            </div>
          </div>

          {/* Bottom Row: MY JOURNEY (Timeline) */}
          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5 overflow-x-auto custom-scrollbar">
            <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-1">MY JOURNEY</h3>
            <p className="text-[10px] text-white/40 mb-6">From Learning to Leading</p>
            <div className="flex items-center justify-between min-w-[600px] relative px-4">
              <div className="absolute top-4 left-8 right-8 h-0.5 bg-gradient-to-r from-white/10 via-accent/50 to-white/10 z-0"></div>
              
              {[
                { icon: BookOpen, title: 'School', year: '2018', color: 'text-success' },
                { icon: GraduationCap, title: 'College', year: '2021', color: 'text-success' },
                { icon: Trophy, title: 'CMA US', year: '2024', color: 'text-primary' },
                { icon: Briefcase, title: 'Internship', year: '2025', color: 'text-warning' },
                { icon: Target, title: 'FP&A Prof.', year: '2026', color: 'text-white/50' },
                { icon: Target, title: 'Future CFO', year: '2030+', color: 'text-white/30' },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-[#050816] border border-white/20 flex items-center justify-center mb-2 shadow-lg">
                    <step.icon className={\`w-4 h-4 \${step.color}\`} />
                  </div>
                  <div className="text-[10px] font-bold text-white">{step.title}</div>
                  <div className="text-[9px] font-mono text-white/40">{step.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Spans 4) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* 2x2 Market Overview */}
          <MarketOverview />
          
          {/* AI CFO */}
          <div className="h-[250px]"><EmbeddedAICFO /></div>

          {/* 2x2 Financial Snapshot */}
          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5">
            <h3 className="text-[11px] font-space font-bold text-white tracking-widest uppercase mb-1">FINANCIAL SNAPSHOT</h3>
            <p className="text-[9px] text-white/40 mb-4">All values in USD</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[9px] font-mono text-white/40 uppercase">Revenue Modeled</div>
                <div className="text-sm font-bold text-accent mt-1">$2.4 B+</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[9px] font-mono text-white/40 uppercase">Data Analyzed</div>
                <div className="text-sm font-bold text-primary mt-1">250K+</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[9px] font-mono text-white/40 uppercase">Models Built</div>
                <div className="text-sm font-bold text-success mt-1">35+</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[9px] font-mono text-white/40 uppercase">Hours Invested</div>
                <div className="text-sm font-bold text-warning mt-1">2,000+</div>
              </div>
            </div>
          </div>

          {/* Quote Section exactly like photo */}
          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-6 flex flex-col justify-center relative overflow-hidden flex-1 min-h-[150px]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-screen" />
            <div className="absolute right-2 top-0 text-white/10 font-serif text-6xl pointer-events-none">“</div>
            <p className="text-xs font-sans text-white/90 leading-relaxed italic relative z-10 shadow-black drop-shadow-md">
              "The goal is not to be in the best company, but to build something that outlives me."
            </p>
            <div className="mt-4 pt-3 border-t border-white/20 text-[10px] font-mono text-accent relative z-10">— Parvej</div>
          </div>
        </div>

      </div>
    </div>
  );
}`
  },

  // 4. REAL ACHIEVEMENTS PAGE (No Placeholder!)
  {
    path: 'app/achievements/page.tsx',
    content: `import React from 'react';
import { Trophy, CheckCircle2, Star, Code, Smartphone, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function AchievementsPage() {
  return (
    <div className="w-full lg:w-[calc(100%-16rem)] lg:ml-64 p-6 lg:p-10 animate-in fade-in duration-700 pb-24">
      <div className="mb-10">
        <h1 className="text-4xl font-black font-space text-white mb-2 uppercase tracking-wider">Achievements & Milestones</h1>
        <p className="text-sm font-mono text-white/50">Tracking academic excellence and technical builds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Academic Triumphs */}
        <div className="bg-[#0B1120] border border-white/10 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <Trophy className="w-6 h-6 text-warning" />
            <h2 className="text-xl font-bold text-white">Academic Triumphs</h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-success" /></div>
              <div>
                <h3 className="text-white font-bold mb-1">CMA US Part 1 - Cleared</h3>
                <p className="text-xs text-white/60 leading-relaxed">Successfully cleared the rigorous CMA US Part 1 examination in the very 1st attempt, demonstrating strong grasp over financial planning, performance, and analytics.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><Star className="w-5 h-5 text-accent" /></div>
              <div>
                <h3 className="text-white font-bold mb-1">B.Com - Flawless Execution</h3>
                <p className="text-xs text-white/60 leading-relaxed">Completed all 6 semesters of Bachelor of Commerce without a single backlog, maintaining a pristine academic record.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Arsenal & Builds */}
        <div className="bg-[#0B1120] border border-white/10 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <BrainCircuit className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-white">Technical Builds & Skills</h2>
          </div>
          <div className="space-y-6">
             <div className="flex gap-4">
              <div className="mt-1"><Code className="w-5 h-5 text-accent" /></div>
              <div>
                <h3 className="text-white font-bold mb-1">Developed 2 Full Websites</h3>
                <p className="text-xs text-white/60 mb-2">Designed and deployed functional web platforms.</p>
                <Link href="https://courageous-queijadas-97ef87.netlify.app/" target="_blank" className="text-[10px] font-mono text-black bg-accent px-3 py-1 rounded-full font-bold hover:bg-cyan-300 transition-colors">View Old Portfolio</Link>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><Smartphone className="w-5 h-5 text-success" /></div>
              <div>
                <h3 className="text-white font-bold mb-1">Developed 1 Android App</h3>
                <p className="text-xs text-white/60 mb-2">Built a native Android portfolio application.</p>
                <Link href="https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk" target="_blank" className="text-[10px] font-mono text-black bg-success px-3 py-1 rounded-full font-bold hover:opacity-80 transition-opacity">Download APK</Link>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 mt-4">
              <h4 className="text-xs font-mono text-white/40 uppercase mb-2">AI & Analytics Stack Mastery</h4>
              <div className="flex flex-wrap gap-2">
                {['Claude AI', 'Gemini AI', 'Power BI', 'Advanced Excel'].map(skill => (
                  <span key={skill} className="text-[10px] font-mono text-white bg-white/10 border border-white/20 px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}`
  },

  // 5. REAL CONTACT PAGE (With actual links)
  {
    path: 'app/contact/page.tsx',
    content: `import React from 'react';
import { Mail, Github, Linkedin, Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const ContactCard = ({ icon: Icon, title, value, link, color }: any) => (
    <Link href={link} target="_blank" className="flex items-center justify-between p-5 bg-[#0B1120] border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/5 transition-all group shadow-lg">
      <div className="flex items-center gap-4">
        <div className={\`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center \${color}\`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest">{title}</h3>
          <p className="text-sm font-bold text-white mt-1 group-hover:text-accent transition-colors">{value}</p>
        </div>
      </div>
      <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-accent transition-colors" />
    </Link>
  );

  return (
    <div className="w-full lg:w-[calc(100%-16rem)] lg:ml-64 p-6 lg:p-10 animate-in fade-in duration-700 h-screen flex flex-col justify-center pb-32">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-black font-space text-white mb-4 uppercase tracking-wider">Secure Comms.</h1>
        <p className="text-sm font-mono text-white/50 mb-10 leading-relaxed">
          Open for strategic FP&A roles, data analytics projects, and UAE/ADNOC targeted opportunities. Establish connection below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ContactCard 
            icon={Linkedin} title="Professional Network" value="Parvej Alam Ansari" 
            link="https://www.linkedin.com/in/parvej-alam-sulemanali-ansari-14808928b/" color="text-[#0A66C2]" 
          />
          <ContactCard 
            icon={Github} title="Code Repository" value="pa8213243-sudo" 
            link="https://github.com/pa8213243-sudo/ParvejPortfolio" color="text-white" 
          />
          <ContactCard 
            icon={Mail} title="Direct Email" value="pa8213243@gmail.com" 
            link="mailto:pa8213243@gmail.com" color="text-danger" 
          />
          <ContactCard 
            icon={Globe} title="Previous Architecture" value="Legacy Portfolio v1" 
            link="https://courageous-queijadas-97ef87.netlify.app/" color="text-accent" 
          />
        </div>
      </div>
    </div>
  );
}`
  }
];

async function deployUltimateFix() {
  console.log('🚀 Deploying Ultimate Dashboard & Real Pages...');
  for (const file of files) {
    const fullPath = path.join(process.cwd(), file.path);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, file.content, 'utf8');
    console.log(`✅ Deployed: ${file.path}`);
  }
  console.log('\n🎉 ULTIMATE MASTERPIECE READY!');
}

deployUltimateFix();