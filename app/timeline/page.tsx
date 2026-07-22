import React from 'react';
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
}