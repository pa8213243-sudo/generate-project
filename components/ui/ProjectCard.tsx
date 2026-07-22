"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ArrowRight, LayoutDashboard, FileSpreadsheet, Presentation, Smartphone } from 'lucide-react';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Power BI': return <LayoutDashboard className="w-4 h-4" />;
    case 'Excel': return <FileSpreadsheet className="w-4 h-4" />;
    case 'PowerPoint': return <Presentation className="w-4 h-4" />;
    case 'Android': return <Smartphone className="w-4 h-4" />;
    default: return <LayoutDashboard className="w-4 h-4" />;
  }
};

export const ProjectCard = ({ project }: { project: Project }) => {
  // BINGO: Yahan project.coverImage ko project.image kar diya hai
  const [imageSrc, setImageSrc] = React.useState(project.image || '/assets/uber.jpeg');
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    // BINGO: Yahan bhi project.coverImage ko project.image kar diya hai
    setImageSrc(project.image || '/assets/uber.jpeg');
    setImageError(false);
  }, [project.image]);

  const resolvedSrc = imageError ? '/assets/uber.jpeg' : imageSrc;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-white/10 hover:border-accent/50 overflow-hidden transition-all duration-500 shadow-lg hover:shadow-[0_10px_40px_rgba(34,211,238,0.15)]"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#0B1120] flex items-center justify-center">
        <Image
          src={resolvedSrc}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold flex items-center gap-2 text-pureWhite">
            {getCategoryIcon(project.category)} {project.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-space font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">{project.shortDescription}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {(project.toolsUsed || project.tags || []).slice(0, 3).map(tool => (
            <span key={tool} className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
              {tool}
            </span>
          ))}
          {project.toolsUsed.length > 3 && <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">+{project.toolsUsed.length - 3}</span>}
        </div>

        <Link href={`/projects/${project.slug || project.id}`} className="mt-auto w-full py-3 bg-white/5 hover:bg-accent hover:text-black border border-white/10 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2">
          View Case Study <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};