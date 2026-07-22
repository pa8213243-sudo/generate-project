import React from 'react';
import { Trophy, CheckCircle2, Star, Code, Smartphone, BrainCircuit, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AchievementsPage() {
  return (
    <div className="w-full min-h-screen p-6 lg:p-10 pb-24 lg:pl-[17rem] animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black font-space text-white mb-2 uppercase tracking-wider">Achievements & Milestones</h1>
        <p className="text-sm font-mono text-white/50">Academic excellence and technical builds by Parvej.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-6xl">
        
        {/* Academic Triumphs */}
        <div className="bg-[#0B1120] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col hover:border-white/20 transition-all">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <Trophy className="w-6 h-6 text-warning" />
            <h2 className="text-xl font-bold text-white">Academic Triumphs</h2>
          </div>
          <div className="space-y-6 flex-1">
            <div className="flex gap-4">
              <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-success" /></div>
              <div>
                <h3 className="text-white font-bold mb-1">CMA US Part 1 (1st Attempt)</h3>
                <p className="text-xs text-white/60 leading-relaxed">Successfully cleared the rigorous CMA US Part 1 examination in the very first attempt.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><Star className="w-5 h-5 text-accent" /></div>
              <div>
                <h3 className="text-white font-bold mb-1">B.Com - 6 Semesters Clear</h3>
                <p className="text-xs text-white/60 leading-relaxed">Completed all 6 semesters of Bachelor of Commerce without a single backlog, maintaining a flawless academic record.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Arsenal & Builds */}
        <div className="bg-[#0B1120] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col hover:border-white/20 transition-all">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <BrainCircuit className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-white">Technical Builds & Skills</h2>
          </div>
          <div className="space-y-5 flex-1">
             <div className="flex gap-4">
              <div className="mt-1"><Code className="w-5 h-5 text-accent" /></div>
              <div>
                <h3 className="text-white font-bold mb-1">Developed 2 Full Websites</h3>
                <p className="text-[11px] text-white/60 mb-2">Designed and deployed fully functional web platforms.</p>
                <Link href="https://courageous-queijadas-97ef87.netlify.app/" target="_blank" className="inline-flex items-center gap-1 text-[10px] font-mono text-black bg-accent px-3 py-1.5 rounded font-bold hover:bg-cyan-300 transition-colors shadow-lg shadow-accent/20">View Old Website <ExternalLink className="w-3 h-3"/></Link>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><Smartphone className="w-5 h-5 text-success" /></div>
              <div>
                <h3 className="text-white font-bold mb-1">Developed 1 Android App</h3>
                <p className="text-[11px] text-white/60 mb-2">Built a native Android portfolio application.</p>
                <Link href="https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk" target="_blank" className="inline-flex items-center gap-1 text-[10px] font-mono text-black bg-success px-3 py-1.5 rounded font-bold hover:bg-green-400 transition-colors shadow-lg shadow-success/20">Download APK <ExternalLink className="w-3 h-3"/></Link>
              </div>
            </div>
            
            {/* Skills Tags */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 mt-2">
              <h4 className="text-[10px] font-mono text-white/40 uppercase mb-2">AI & Analytics Tools Learned</h4>
              <div className="flex flex-wrap gap-2">
                {['Claude AI', 'Gemini AI', 'Power BI', 'Excel'].map(skill => (
                  <span key={skill} className="text-[10px] font-mono text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}