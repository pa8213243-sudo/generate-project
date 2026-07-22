import fs from 'fs/promises';
import path from 'path';

const useAppStoreContent = `"use client";
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
`;

async function fixStore() {
  console.log('🛠️ GENERATING MISSING useAppStore.ts...');
  try {
    const dir = path.join(process.cwd(), 'store');
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'useAppStore.ts'), useAppStoreContent, 'utf8');
    console.log('✅ Created: store/useAppStore.ts successfully!');
    console.log('\n➡️ Now restart your dev server: npm run dev');
  } catch (err) {
    console.error('❌ Error creating store:', err);
  }
}

fixStore();