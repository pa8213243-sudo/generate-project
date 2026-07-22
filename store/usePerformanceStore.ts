import { create } from 'zustand';

export type QualityLevel = 'ultra' | 'high' | 'medium' | 'low' | 'very-low' | '2d-fallback';

interface PerformanceState {
  quality: QualityLevel;
  setQuality: (quality: QualityLevel) => void;
  fps: number;
  setFps: (fps: number) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

export const usePerformanceStore = create<PerformanceState>((set) => ({
  quality: 'high',
  setQuality: (quality) => set({ quality }),
  fps: 60,
  setFps: (fps) => set({ fps }),
  reducedMotion: false,
  setReducedMotion: (val) => set({ reducedMotion: val }),
}));