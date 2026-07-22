"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { usePerformanceStore } from "@/store/usePerformanceStore";
import { useBootStore } from "@/store/useBootStore";
import { audioManager } from "@/utils/audioManager";

export const BootSequence = () => {
  const { setBootComplete } = useAppStore();
  const { reducedMotion } = usePerformanceStore();
  const { getOverallProgress, setSystemReady } = useBootStore();

  const [isVisible, setIsVisible] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [bootLog, setBootLog] = useState("> INITIALIZING KERNEL...");

  useEffect(() => {
    // Skip boot if already completed
    if (sessionStorage.getItem("system_booted") || reducedMotion) {
      setIsVisible(false);
      setBootComplete(true);
      return;
    }

    // Simulate boot stages
    setSystemReady("dom");

    setTimeout(() => {
      setSystemReady("audio");
      audioManager.init(true, 0.3);
    }, 300);

    setTimeout(() => {
      setSystemReady("data");
    }, 700);

    const interval = setInterval(() => {
      const target = getOverallProgress();

      setDisplayProgress((prev) => {
        const next = Math.min(prev + Math.max((target - prev) * 0.15, 1), 100);

        if (next < 20) {
          setBootLog("> INITIALIZING CORE SYSTEM...");
        } else if (next < 40) {
          setBootLog("> MOUNTING DOM & CSSOM...");
        } else if (next < 60) {
          setBootLog("> HYDRATING DATA LAYER...");
        } else if (next < 80) {
          setBootLog("> LOADING UI MODULES...");
        } else if (next < 99) {
          setBootLog("> OPTIMIZING PERFORMANCE...");
        } else {
          setBootLog("> ALL SYSTEMS NOMINAL. ONLINE.");
        }

        // ✅ FIX: Don't wait for threeProgress
        if (next >= 99) {
          clearInterval(interval);

          audioManager.play("boot", 1500);

          setTimeout(() => {
            sessionStorage.setItem("system_booted", "true");
            setBootComplete(true);
            setIsVisible(false);
          }, 800);

          return 100;
        }

        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [reducedMotion, setBootComplete, getOverallProgress, setSystemReady]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#02040A] p-6 font-mono"
      >
        <div className="relative z-20 w-full max-w-2xl">
          <div className="mb-3 flex justify-between text-xs uppercase text-cyan-400/80">
            <span>JARVIS PROTOCOL V1.0</span>
            <span className="animate-pulse">REC: ACTIVE</span>
          </div>

          <div className="mb-8 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="mb-8 min-h-[60px] text-sm font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] md:text-base">
            {bootLog}
            <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-cyan-400 align-middle" />
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full border border-white/5 bg-white/10">
            <motion.div
              className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"
              animate={{ width: `${displayProgress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};