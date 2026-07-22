"use client";
import { create } from 'zustand';

interface AppState {
  isBootComplete: boolean;
  setBootComplete: (status: boolean) => void;
  recruiterMode: boolean;
  toggleRecruiterMode: () => void;
  devMode: boolean;
  toggleDevMode: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isBootComplete: false,
  setBootComplete: (status) => set({ isBootComplete: status }),
  recruiterMode: false,
  toggleRecruiterMode: () => set((state) => ({ recruiterMode: !state.recruiterMode })),
  devMode: false,
  toggleDevMode: () => set((state) => ({ devMode: !state.devMode })),
  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));
