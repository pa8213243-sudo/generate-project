"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Code2, User } from "lucide-react";
import { cn } from "@/utils/cn";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Timeline", href: "#timeline" },
];

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);

    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 flex items-center justify-center pt-6 px-6 transition-all duration-300 w-full"
      )}
    >
      <nav
        className={cn(
          "w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-2xl border transition-all duration-300",
          isScrolled 
            ? "bg-[#050816]/70 backdrop-blur-lg border-white/10 shadow-lg" 
            : "bg-transparent border-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-pureWhite font-bold font-space shadow-[0_0_10px_rgba(37,99,235,0.5)] group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="font-space font-bold text-lg tracking-wide text-pureWhite">
            PARVEJ <span className="text-white/50 font-normal">OS</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-pureWhite transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="glass" size="sm" icon={User}>
            Recruiter Mode
          </Button>
          <Button variant="primary" size="sm" icon={Code2} className="hidden sm:flex">
            Dev Mode
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};