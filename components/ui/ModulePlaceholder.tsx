import React from 'react';
import { AlertTriangle, Lock } from 'lucide-react';

export const ModulePlaceholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[80vh] w-full lg:ml-64 lg:max-w-[calc(100vw-16rem)] p-6">
     <div className="bg-[#0B1120] border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center max-w-lg shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
          <Lock className="w-8 h-8 text-accent" />
        </div>
        
        <h2 className="text-2xl font-space font-bold text-white mb-3 uppercase tracking-wider">{title}</h2>
        <p className="text-white/50 font-mono text-sm leading-relaxed">
          This module is currently undergoing system integration and data syncing. Full access will be granted shortly.
        </p>
        
        <div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-warning bg-warning/10 px-4 py-2 rounded-full border border-warning/20 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-warning animate-ping" /> SECURE CONNECTION PENDING
        </div>
     </div>
  </div>
);