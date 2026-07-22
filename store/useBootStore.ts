import { create } from 'zustand';

interface BootState {
  domReady: boolean;
  dataReady: boolean;
  audioReady: boolean;
  threeProgress: number; // 0 to 100 from LoadingManager
  setSystemReady: (system: 'dom' | 'data' | 'audio') => void;
  setThreeProgress: (val: number) => void;
  getOverallProgress: () => number;
}

export const useBootStore = create<BootState>((set, get) => ({
  domReady: false,
  dataReady: false,
  audioReady: false,
  threeProgress: 0,
  setSystemReady: (system) => set((state) => ({ ...state, [`${system}Ready`]: true })),
  setThreeProgress: (val) => set({ threeProgress: val }),
  getOverallProgress: () => {
    const state = get();
    let progress = 0; 
    if (state.domReady) progress += 15;
    if (state.audioReady) progress += 10;
    if (state.dataReady) progress += 15;
    progress += (state.threeProgress * 0.60); // 3D assets hold 60% weight
    return progress;
  }
}));