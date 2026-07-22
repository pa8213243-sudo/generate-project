import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-background pt-12 pb-8 px-6 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-space font-bold text-xl tracking-wide text-pureWhite">
            PARVEJ <span className="text-white/50">OS</span>
          </span>
          <p className="text-white/50 text-sm">
            © {currentYear} Parvej Alam Ansari. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/pa8213243-sudo/ParvejPortfolio" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-pureWhite hover:bg-white/10 transition-all">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/parvej-alam-sulemanali-ansari-14808928b/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-pureWhite hover:bg-white/10 transition-all">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="mailto:pa8213243@gmail.com" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-pureWhite hover:bg-white/10 transition-all">
            <Mail className="w-5 h-5" />
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/40 font-mono">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          System Online • v1.0.0
        </div>
      </div>
    </footer>
  );
};