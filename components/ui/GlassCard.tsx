"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { cardHoverVariant } from "@/animations/variants";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, interactive = false }) => {
  const CardWrapper = interactive ? motion.div : "div";
  const props = interactive ? {
    variants: cardHoverVariant,
    initial: "rest",
    whileHover: "hover",
  } : {};

  return (
    <CardWrapper
      {...props}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[#111827]/60 backdrop-blur-xl border border-white/10 shadow-2xl transition-colors duration-300",
        interactive && "cursor-pointer hover:border-white/20",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="relative z-10 p-6">
        {children}
      </div>
    </CardWrapper>
  );
};