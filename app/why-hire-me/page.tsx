import React from 'react';
import { getPersonalInfo, getSkills } from '@/services/dataService';
import { Target, Brain, LineChart, Cpu } from 'lucide-react';

export default function WhyHireMe() {
  const personalInfo = getPersonalInfo();
  const skills = getSkills();

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold font-space mb-6">Why Hire <span className="text-gradient">Parvej?</span></h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">{personalInfo.bio}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors">
          <Brain className="w-10 h-10 text-accent mb-6" />
          <h3 className="text-2xl font-bold font-space mb-4">Business & Strategic Thinking</h3>
          <p className="text-white/70 leading-relaxed">{personalInfo.bio}</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
          <LineChart className="w-10 h-10 text-primary mb-6" />
          <h3 className="text-2xl font-bold font-space mb-4">Advanced FP&A & Analytics</h3>
          <p className="text-white/70 leading-relaxed">Core capabilities include {skills.slice(0, 4).flatMap(category => category.items).slice(0, 4).join(', ')} and other finance intelligence workflows.</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-success/30 transition-colors">
          <Cpu className="w-10 h-10 text-success mb-6" />
          <h3 className="text-2xl font-bold font-space mb-4">AI Integration in Finance</h3>
          <p className="text-white/70 leading-relaxed">I combine finance fundamentals, reporting automation, and AI-assisted analysis to accelerate decision support and reduce manual effort.</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-warning/30 transition-colors">
          <Target className="w-10 h-10 text-warning mb-6" />
          <h3 className="text-2xl font-bold font-space mb-4">Targeted Ambition</h3>
          <p className="text-white/70 leading-relaxed">The portfolio is structured around business impact, executive communication, and scalable finance operations for high-growth environments.</p>
        </div>
      </div>
    </div>
  );
}