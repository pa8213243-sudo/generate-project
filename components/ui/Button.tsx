"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react";

type MotionButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragEnd" | "onDragEnter" | "onDragLeave" | "onDragOver" | "onDragStart" | "onDrop" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"> & {
  whileHover?: React.ComponentProps<typeof motion.button>["whileHover"];
  whileTap?: React.ComponentProps<typeof motion.button>["whileTap"];
  ref?: React.Ref<HTMLButtonElement>;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

const MotionButton = motion.button as React.ForwardRefExoticComponent<MotionButtonProps>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon: Icon, iconPosition = "left", isLoading, children, ...props }, ref) => {
    const buttonProps = props as MotionButtonProps;
    
    const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out overflow-hidden rounded-full group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background";
    
    const variants = {
      primary: "bg-primary text-pureWhite hover:bg-primary/90 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]",
      secondary: "bg-secondary text-pureWhite border border-white/10 hover:bg-secondary/80 hover:border-white/20",
      glass: "bg-white/5 backdrop-blur-md border border-white/10 text-pureWhite hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
      danger: "bg-danger text-pureWhite hover:bg-danger/90 shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 gap-2",
      md: "text-base px-6 py-3 gap-2",
      lg: "text-lg px-8 py-4 gap-3",
    };

    return (
      <MotionButton
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || buttonProps.disabled}
        {...buttonProps}
      >
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-full opacity-30 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none mix-blend-overlay"></span>
        
        {Icon && iconPosition === "left" && (
          <Icon className={cn("w-5 h-5", isLoading && "animate-spin")} />
        )}
        
        <span>{children}</span>
        
        {Icon && iconPosition === "right" && (
          <Icon className={cn("w-5 h-5", isLoading && "animate-spin")} />
        )}
      </MotionButton>
    );
  }
);

Button.displayName = "Button";