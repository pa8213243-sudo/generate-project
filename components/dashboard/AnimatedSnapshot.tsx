"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const metrics = [
  {
    label: 'Revenue Modeled',
    target: 2.4,
    unit: 'B+',
    formatter: (value: number) => `${value.toFixed(1)} B+`,
  },
  {
    label: 'Data Analyzed',
    target: 250,
    unit: 'K+',
    formatter: (value: number) => `${Math.round(value)}K+`,
  },
  {
    label: 'Models Built',
    target: 35,
    unit: '+',
    formatter: (value: number) => `${Math.round(value)}+`,
  },
  {
    label: 'Hours Invested',
    target: 2000,
    unit: '+',
    formatter: (value: number) => `${Math.round(value).toLocaleString()}+`,
  },
];

export const AnimatedSnapshot = () => {
  const [values, setValues] = useState(metrics.map(() => 0));
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    let frame: number;
    const duration = 1600;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValues(metrics.map((metric) => metric.target * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setAnimationComplete(true);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex-1 rounded-2xl bg-[#0B1120] border border-white/10 p-6 shadow-xl min-h-[180px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[11px] font-space font-bold text-white tracking-widest uppercase mb-1">FINANCIAL SNAPSHOT</h3>
          <p className="text-[9px] text-white/40">Key performance metrics updated in real time.</p>
        </div>
        <span className="text-[9px] font-mono text-success bg-success/10 px-2 py-1 rounded-full uppercase tracking-[0.18em]">Live</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between"
          >
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.18em]">{metric.label}</span>
            <span className="mt-3 text-2xl font-space font-bold text-white">{metric.formatter(values[index])}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
