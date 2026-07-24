"use client";
import React, { useState } from 'react';
import { EmbeddedAICFO } from '@/components/dashboard/EmbeddedAICFO';
import { Bot, Sparkles, ShieldCheck, Cpu, Database } from 'lucide-react';

export default function AICFOPage() {
  return (
    <div className="w-full p-6 space-y-6 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Top Header */}
      <div className="w-full bg-[#0B1120] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
            <Sparkles className="w-4 h-4 animate-pulse" /> J.A.R.V.I.S. Omni-Lingual Engine
          </div>
          <h1 className="text-3xl font-black font-space text-white">AI CFO STRATEGIC CENTER</h1>
          <p className="text-xs text-white/60 font-sans mt-1">
            Advanced Quantitative Intelligence & Corporate Finance Analysis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-[9px] font-mono text-white/40 uppercase">Security</div>
              <div className="text-xs font-bold text-white">Enterprise Grade</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <div className="text-left">
              <div className="text-[9px] font-mono text-white/40 uppercase">Latency</div>
              <div className="text-xs font-bold text-white">&lt; 300ms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Info Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl">
            <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" /> Executive Capabilities
            </h3>
            <ul className="space-y-3 text-xs text-white/70 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Multi-Lingual Processing:</strong> Evaluates queries in any language seamlessly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>FP&A Modeling:</strong> Capital structure, cash flow optimization, and valuation analysis.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Clean Formatting:</strong> Quantitative outputs formatted with precision numbers and bullet points.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-900/30 via-[#0B1120] to-[#0B1120] border border-cyan-500/20 p-6 shadow-xl">
            <div className="text-cyan-400 text-xs font-mono mb-2">SYSTEM ARCHITECTURE</div>
            <p className="text-xs text-white/80 leading-relaxed font-sans">
              Built exclusively for Parvej Alam Ansari&apos;s Finance Command Center using state-of-the-art Generative AI models.
            </p>
          </div>
        </div>

        {/* Embedded Interactive AI CFO Chat Widget */}
        <div className="lg:col-span-2 min-h-[500px]">
          <EmbeddedAICFO />
        </div>

      </div>
    </div>
  );
}