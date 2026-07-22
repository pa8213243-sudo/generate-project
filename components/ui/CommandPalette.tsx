"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, Home, Folder, Award, User, Volume2, Bot } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useChatStore } from "@/store/useChatStore";

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { toggleSound } = useAppStore();
  const { setIsOpen: setChatOpen } = useChatStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const executeCommand = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#02040A]/80 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#0B1120] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center px-4 py-3 border-b border-white/10">
            <Search className="w-5 h-5 text-white/50 mr-3" />
            <input 
              autoFocus
              className="w-full bg-transparent text-pureWhite outline-none placeholder:text-white/30 font-inter"
              placeholder="Type a command or search... (e.g., 'Projects', 'Sound')"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="text-xs font-mono text-white/30 bg-white/5 px-2 py-1 rounded">ESC</span>
          </div>

          <div className="p-2 max-h-[60vh] overflow-y-auto">
            <div className="px-2 py-1 text-xs font-semibold text-white/30 tracking-wider mb-2">QUICK COMMANDS</div>
            <button onClick={() => executeCommand(() => router.push("/"))} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-left text-white/80 hover:text-pureWhite transition-colors">
              <Home className="w-4 h-4 text-primary" /> Go Home
            </button>
            <button onClick={() => executeCommand(() => router.push("/projects"))} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-left text-white/80 hover:text-pureWhite transition-colors">
              <Folder className="w-4 h-4 text-accent" /> View Projects Vault
            </button>
            <button onClick={() => executeCommand(() => router.push("/certificates"))} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-left text-white/80 hover:text-pureWhite transition-colors">
              <Award className="w-4 h-4 text-warning" /> Achievement Vault
            </button>
            <button onClick={() => executeCommand(() => setChatOpen(true))} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-left text-white/80 hover:text-pureWhite transition-colors">
              <Bot className="w-4 h-4 text-accent" /> Open AI CFO Assistant
            </button>
            <button onClick={() => executeCommand(() => router.push("/why-hire-me"))} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-left text-white/80 hover:text-pureWhite transition-colors">
              <User className="w-4 h-4 text-success" /> Why Hire Me
            </button>
            <button onClick={() => executeCommand(toggleSound)} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-left text-white/80 hover:text-pureWhite transition-colors">
              <Volume2 className="w-4 h-4 text-danger" /> Toggle Ambient Sound
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};