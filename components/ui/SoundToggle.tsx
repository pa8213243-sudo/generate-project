"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export function SoundToggle() {
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const toggleSound = useAppStore((state) => state.toggleSound);

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur transition hover:scale-110"
      aria-label="Toggle Sound"
    >
      {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}