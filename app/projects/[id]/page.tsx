import { getProjects } from '@/services/dataService';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Briefcase, Database, LayoutTemplate, Lightbulb, Target, TrendingUp, Code2, GraduationCap, ArrowRight } from 'lucide-react';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = getProjects().find(p => p.id === params.id);
  if (!project) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-12">
      
      {/* Top Navigation */}
      <nav className="flex items-center justify-between font-mono text-xs text-white/50 border-b border-white/10 pb-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-white">{project.category}</span>
        </div>
        <Link href="/projects" className="flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Vault
        </Link>
      </nav>

      {/* Hero Header & Thumbnail */}
      <div className="space-y-6">
        <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          {/* Ensure the image scales properly */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
        </div>
        
        <div>
          <h1 className="text-4xl md:text-5xl font-black font-space text-white mb-4">{project.title}</h1>
          <p className="text-lg text-white/60 max-w-3xl leading-relaxed">{project.description}</p>
        </div>

        {/* Buttons (Live URL / Code) */}
        <div className="flex flex-wrap gap-4 pt-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_4px_0_#1e3a8a] active:translate-y-1 active:shadow-none transition-all">
              <ExternalLink className="w-4 h-4" /> View Live Case Study
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl font-bold text-sm transition-all">
              <Code2 className="w-4 h-4" /> View Source Code
            </a>
          )}
        </div>
      </div>

      <hr className="border-white/10" />

      {/* TWO COLUMN LAYOUT FOR CASE STUDY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* LEFT COLUMN - MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Executive Summary */}
          {project.executiveSummary && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Briefcase className="w-5 h-5 text-accent"/> Executive Summary</h2>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white/80 leading-relaxed text-sm space-y-4">
                {project.executiveSummary.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </section>
          )}

          {/* Business Problem */}
          {project.businessProblem && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Target className="w-5 h-5 text-danger"/> Business Problem & Objective</h2>
              <div className="p-6 rounded-2xl bg-[#050816] border-l-2 border-danger text-white/80 leading-relaxed text-sm">
                <p>{project.businessProblem}</p>
              </div>
            </section>
          )}

          {/* Dataset & Data Prep */}
          {(project.datasetInfo || project.dataPreparation) && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Database className="w-5 h-5 text-primary"/> Data Architecture & Preparation</h2>
              <div className="grid gap-4">
                {project.datasetInfo && (
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xs font-mono text-white/40 uppercase mb-2">Dataset Overview</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{project.datasetInfo}</p>
                  </div>
                )}
                {project.dataPreparation && (
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xs font-mono text-white/40 uppercase mb-2">ETL & Preparation</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{project.dataPreparation}</p>
                  </div>
                )}
                {project.dataModel && (
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xs font-mono text-white/40 uppercase mb-2">Data Modeling</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{project.dataModel}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Core Insights */}
          {project.businessInsights && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Lightbulb className="w-5 h-5 text-warning"/> Key Business Insights</h2>
              <div className="space-y-3">
                {project.businessInsights.map((insight, i) => (
                  <div key={i} className="p-5 rounded-xl bg-warning/5 border border-warning/20">
                    <p className="text-sm text-white/80 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recommendations & Impact */}
          {project.recommendations && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><TrendingUp className="w-5 h-5 text-success"/> Strategic Recommendations</h2>
              <ul className="list-none space-y-3">
                {project.recommendations.map((rec, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/80 p-4 rounded-xl bg-white/5 border border-white/5">
                    <ArrowRight className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Retrospective */}
          {(project.lessonsLearned || project.futureImprovements) && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><GraduationCap className="w-5 h-5 text-accent"/> Retrospective & Future Scope</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.lessonsLearned && (
                  <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 shadow-lg">
                    <h3 className="text-xs font-mono text-accent mb-3 uppercase">Lessons Learned</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{project.lessonsLearned}</p>
                  </div>
                )}
                {project.futureImprovements && (
                  <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 shadow-lg">
                    <h3 className="text-xs font-mono text-accent mb-3 uppercase">Future Improvements</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{project.futureImprovements}</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN - METADATA WIDGETS */}
        <div className="space-y-6 lg:sticky lg:top-8">
          
          {/* Outcome Widget */}
          {project.businessImpact && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1120] to-[#050816] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 blur-[50px] rounded-full pointer-events-none" />
              <h3 className="text-xs font-mono text-white/40 uppercase mb-4 tracking-wider">Business Impact</h3>
              <p className="text-sm text-white/90 leading-relaxed font-medium relative z-10">{project.businessImpact}</p>
            </div>
          )}

          {/* KPIs Tracked */}
          {project.kpis && (
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10">
              <h3 className="text-xs font-mono text-white/40 uppercase mb-4 tracking-wider">KPIs Modeled</h3>
              <ul className="space-y-2">
                {project.kpis.map((kpi, i) => (
                  <li key={i} className="text-xs text-white/70 py-1 border-b border-white/5 last:border-0">{kpi}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.toolsUsed && (
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10">
              <h3 className="text-xs font-mono text-white/40 uppercase mb-4 tracking-wider">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map(tool => (
                  <span key={tool} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80">{tool}</span>
                ))}
              </div>
            </div>
          )}

          {/* UI Design Note */}
          {project.dashboardDesign && (
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10">
              <h3 className="text-xs font-mono text-white/40 uppercase mb-3 tracking-wider flex items-center gap-2"><LayoutTemplate className="w-3 h-3"/> Dashboard UX</h3>
              <p className="text-[11px] text-white/50 leading-relaxed">{project.dashboardDesign}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}