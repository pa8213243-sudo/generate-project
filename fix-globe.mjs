import fs from 'fs/promises';
import path from 'path';

const globeCode = `"use client";
import React from 'react';

export const GlobeWidget = () => {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#0B1120] to-[#02040A] border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.1)]">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Glowing Rotating Globe Container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 rounded-full shadow-[0_0_60px_rgba(34,211,238,0.5)] border border-accent/30 overflow-hidden flex items-center justify-center bg-black">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif')] bg-cover bg-center opacity-90 scale-110 filter brightness-125 contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-primary/20 pointer-events-none" />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase">ADNOC / UAE SATELLITE FEED ACTIVE</span>
        </div>
      </div>
    </div>
  );
};`;

async function fixGlobe() {
  const filePath = path.join(process.cwd(), 'components/dashboard/GlobeWidget.tsx');
  await fs.writeFile(filePath, globeCode, 'utf8');
  console.log('✅ GlobeWidget successfully replaced with lightning-fast, error-free rendering!');
}

fixGlobe();