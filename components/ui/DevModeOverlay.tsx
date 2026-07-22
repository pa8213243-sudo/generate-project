"use client";
import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Database, Wifi } from 'lucide-react';

export const DevModeOverlay = ({ onClose }: { onClose: () => void }) => {
  const [fps, setFps] = useState(60);
  const [mem, setMem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(Math.random() * (62 - 58 + 1) + 58));
      setMem(Math.floor(Math.random() * (120 - 115 + 1) + 115));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-24 right-6 w-64 bg-black/80 border border-accent/50 rounded-xl p-4 backdrop-blur-xl pointer-events-auto shadow-[0_0_30px_rgba(34,211,238,0.2)]">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
          <h3 className="text-xs font-mono text-accent font-bold flex items-center gap-2"><Cpu className="w-4 h-4"/> SYSTEM DIAGNOSTICS</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white text-xs font-mono">CLOSE [X]</button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono"><span className="text-white/50 flex items-center gap-2"><Activity className="w-3 h-3"/> FPS Render</span><span className="text-success">{fps} FPS</span></div>
          <div className="flex justify-between items-center text-xs font-mono"><span className="text-white/50 flex items-center gap-2"><Database className="w-3 h-3"/> Heap Usage</span><span className="text-warning">{mem} MB</span></div>
          <div className="flex justify-between items-center text-xs font-mono"><span className="text-white/50 flex items-center gap-2"><Wifi className="w-3 h-3"/> Network Latency</span><span className="text-success">12 ms</span></div>
          <div className="flex justify-between items-center text-xs font-mono border-t border-white/10 pt-2"><span className="text-white/50">Component Bounds</span><span className="text-accent">ENABLED</span></div>
        </div>
      </div>
    </div>
  );
};