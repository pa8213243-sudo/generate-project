"use client";
import { useEffect } from "react";
import { usePerformanceStore } from "@/store/usePerformanceStore";

export function usePerformance() {
  const { quality, setQuality, setFps, reducedMotion, setReducedMotion } = usePerformanceStore();

  useEffect(() => {
    // 1. Accessibility Check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setQuality('2d-fallback');
      return;
    }

    // 2. Hardware Capability Baseline Detection
    if (typeof navigator !== 'undefined') {
      const memory = (navigator as any).deviceMemory || 8;
      const cores = navigator.hardwareConcurrency || 4;
      if (memory < 4 || cores <= 2) {
        setQuality('low');
      }
    }

    // 3. Dynamic FPS Monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    let animFrameId: number;

    const calculateFPS = () => {
      const currentTime = performance.now();
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFps);

        if (currentFps < 25) setQuality('2d-fallback');
        else if (currentFps < 35) setQuality('very-low');
        else if (currentFps < 45) setQuality('low');
        else if (currentFps >= 58 && quality !== 'low') setQuality('high');
        
        frameCount = 0;
        lastTime = currentTime;
      }
      animFrameId = requestAnimationFrame(calculateFPS);
    };

    animFrameId = requestAnimationFrame(calculateFPS);

    return () => cancelAnimationFrame(animFrameId);
  }, [setQuality, setFps, setReducedMotion, quality]);

  return { quality, reducedMotion };
}