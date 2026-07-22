import React from 'react';
import { getPersonalInfo, getSkills, getTimeline } from '@/services/dataService';
import { Download, GraduationCap, Code2 } from 'lucide-react';

export default function RecruiterMode() {
  const personalInfo = getPersonalInfo();
  const skills = getSkills();
  const timeline = getTimeline();

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24 animate-in fade-in duration-700 bg-pureWhite text-black rounded-3xl mt-12 mb-12 shadow-[0_0_50px_rgba(255,255,255,0.1)] relative">
      
      {/* Recruiter Mode Header */}
      <div className="absolute top-0 inset-x-0 h-12 bg-success text-pureWhite flex items-center justify-center font-bold tracking-widest text-sm uppercase rounded-t-3xl shadow-md">
        Recruiter Mode Active - High Contrast View
      </div>

      <div className="pt-12 flex flex-col md:flex-row items-start justify-between gap-8 mb-12 border-b border-black/10 pb-8">
        <div>
          <h1 className="text-4xl font-black font-space mb-2 uppercase">{personalInfo.name}</h1>
          <h2 className="text-xl text-primary font-bold mb-4">{personalInfo.role}</h2>
          <div className="text-black/70 font-mono text-sm space-y-1">
            <p>{personalInfo.location}</p>
            <p>{personalInfo.email} • {personalInfo.phone}</p>
            <div className="pt-2 flex gap-4">
              {personalInfo.linkedin ? (
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-primary hover:underline">LinkedIn</a>
              ) : null}
              {personalInfo.github ? (
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-primary hover:underline">GitHub</a>
              ) : null}
            </div>
          </div>
        </div>
        
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="shrink-0 flex items-center gap-2 px-6 py-3 bg-black/70 text-white/70 rounded-lg font-bold shadow-lg cursor-not-allowed"
        >
          <Download className="w-5 h-5" /> Resume PDF pending
        </button>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold font-space uppercase border-b-2 border-primary inline-block mb-4">Professional Summary</h3>
        <p className="text-black/80 leading-relaxed font-inter">{personalInfo.bio}</p>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold font-space uppercase border-b-2 border-primary inline-block mb-6 flex items-center gap-2">
          <Code2 className="w-5 h-5" /> Core Competencies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from(new Set(skills.map(s => s.category))).map(category => (
            <div key={category}>
              <h4 className="font-bold mb-2 text-black/90">{category}</h4>
              <ul className="list-disc list-inside text-black/70 space-y-1 text-sm font-medium">
                {skills.filter(s => s.category === category).flatMap((skillCategory) =>
                  skillCategory.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-space uppercase border-b-2 border-primary inline-block mb-6 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" /> Education & Certifications
        </h3>
        <div className="space-y-6">
          {timeline.filter(t => t.type === 'Education' || t.type === 'Certification').reverse().map(item => (
            <div key={item.id} className="flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="shrink-0 w-32 text-sm font-bold text-black/60 font-mono">
                {item.startDate} - {item.endDate}
              </div>
              <div>
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-primary font-semibold mb-2">{item.organization}</p>
                <p className="text-black/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center text-sm font-mono text-black/40 border-t border-black/10 pt-8">
        This document was generated via PARVEJ OS Finance Command Center.
      </div>
    </div>
  );
}