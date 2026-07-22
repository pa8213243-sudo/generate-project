import React from 'react';
import { getProjects } from '@/services/dataService';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Database, Filter } from 'lucide-react';

export default function ProjectsVault() {
  const allProjects = getProjects();
  
  // Note: Client-side filtering will be added in future enhancement, 
  // currently displaying all structured data directly from the service.

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-space mb-4 flex items-center gap-4">
            <Database className="w-10 h-10 text-accent" /> Project Vault
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            A comprehensive repository of financial models, BI dashboards, and strategic analyses. 
            Built to bridge the gap between raw data and executive decision-making.
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-white/40 bg-white/5 border border-white/10 px-4 py-2 rounded-lg font-mono text-sm cursor-not-allowed">
          <Filter className="w-4 h-4" /> Filter feature initializing...
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}