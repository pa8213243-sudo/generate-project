import fs from 'fs/promises';
import path from 'path';

const projectFiles = [
  // ==========================================
  // PHASE 1: CORE CONFIGURATION FILES
  // ==========================================
  {
    path: 'package.json',
    content: `{
  "name": "parvej-os",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@react-three/drei": "^9.105.6",
    "@react-three/fiber": "^8.16.2",
    "@studio-freight/lenis": "^1.0.42",
    "clsx": "^2.1.1",
    "framer-motion": "^11.2.10",
    "gsap": "^3.12.5",
    "lucide-react": "^0.383.0",
    "next": "14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.3.0",
    "three": "^0.164.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/three": "^0.164.0",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}`
  },
  {
    path: 'tsconfig.json',
    content: `{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "next.config.ts", "tailwind.config.ts"],
  "exclude": ["node_modules"]
}`
  },
  {
    path: 'next.config.ts',
    content: `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com; frame-src 'self';",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          }
        ],
      },
    ];
  },
};

export default nextConfig;`
  },
  {
    path: 'tailwind.config.ts',
    content: `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        secondary: "#0B1120",
        card: "#111827",
        primary: "#2563EB",
        accent: "#22D3EE",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        pureWhite: "#FFFFFF",
      },
      fontFamily: {
        space: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      screens: {
        'xs': '320px',
        'sm': '375px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
        '4k': '2560px',
      },
    },
  },
  plugins: [],
};

export default config;`
  },
  {
    path: 'postcss.config.js',
    content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`
  },
  {
    path: 'eslint.config.js',
    content: `const nextConfig = require("eslint-config-next/core-web-vitals");

module.exports = [
  {
    ignores: [".next/**", "node_modules/**", "public/**"],
  },
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
    },
  },
];`
  },
  {
    path: '.env.local',
    content: `# PARVEJ OS - Environment Variables
# Do NOT commit this file to version control.

# Google Gemini AI - Required for AI CFO
GEMINI_API_KEY=""

# Netlify Configuration (If required for Edge Functions)
NETLIFY_AUTH_TOKEN=""

# Cloudflare Turnstile / Bot Protection (If implemented later)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
TURNSTILE_SECRET_KEY=""`
  },
  // ==========================================
  // PHASE 2: DESIGN SYSTEM & CORE UI
  // ==========================================
  {
    path: 'app/globals.css',
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #050816;
    --foreground: #FFFFFF;
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-inter), sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-space-grotesk), sans-serif;
  }
}

@layer utilities {
  .glass-card {
    @apply bg-[#111827]/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)];
  }
  
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#22D3EE];
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #050816;
  }
  ::-webkit-scrollbar-thumb {
    background: #111827;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #2563EB;
  }
}

/* Lenis Smooth Scroll Base Styles */
html.lenis {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-scrolling iframe {
  pointer-events: none;
}`
  },
  {
    path: 'utils/cn.ts',
    content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`
  },
  {
    path: 'animations/variants.ts',
    content: `export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const cardHoverVariant = {
  rest: { scale: 1, y: 0, filter: "brightness(1)" },
  hover: { 
    scale: 1.02, 
    y: -5, 
    filter: "brightness(1.1)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};`
  },
  {
    path: 'providers/SmoothScrollProvider.tsx',
    content: `"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}`
  },
  {
    path: 'components/ui/Button.tsx',
    content: `"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon: Icon, iconPosition = "left", isLoading, children, ...props }, ref) => {
    
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
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-full opacity-30 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none mix-blend-overlay"></span>
        
        {Icon && iconPosition === "left" && (
          <Icon className={cn("w-5 h-5", isLoading && "animate-spin")} />
        )}
        
        <span>{children}</span>
        
        {Icon && iconPosition === "right" && (
          <Icon className={cn("w-5 h-5", isLoading && "animate-spin")} />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";`
  },
  {
    path: 'components/ui/GlassCard.tsx',
    content: `"use client";

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
};`
  },
  {
    path: 'components/layout/Navbar.tsx',
    content: `"use client";

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
};`
  },
  {
    path: 'components/layout/Footer.tsx',
    content: `import React from "react";
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
};`
  },
  {
    path: 'app/layout.tsx',
    content: `import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Parvej OS | Finance Command Center",
  description: "Futuristic Finance Operating System built by Parvej Alam Ansari. Showcasing expertise in FP&A, Business Intelligence, Power BI, and Financial Modeling.",
  authors: [{ name: "Parvej Alam Ansari" }],
  keywords: ["FP&A", "Business Intelligence", "Financial Modeling", "Power BI", "CMA US", "Parvej Alam Ansari", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={\`\${spaceGrotesk.variable} \${inter.variable} \${jetBrainsMono.variable} antialiased dark\`}>
      <body className="bg-background text-pureWhite overflow-x-hidden selection:bg-primary/30 selection:text-pureWhite">
        <SmoothScrollProvider>
          <Navbar />
          <main className="relative min-h-screen w-full flex flex-col pt-24">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}`
  },
  {
    path: 'app/page.tsx',
    content: `"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeUpVariant, staggerContainer } from "@/animations/variants";
import { ArrowRight, BarChart3, TrendingUp, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center py-20">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl flex flex-col items-center gap-6"
      >
        <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium font-mono">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          INITIALIZING FINANCIAL INTELLIGENCE...
        </motion.div>
        <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold font-space tracking-tight">
          Finance Command <span className="text-gradient">Center</span>
        </motion.h1>
        <motion.p variants={fadeUpVariant} className="text-lg text-white/60 font-inter">
          FP&A Professional | CMA US Candidate | Business Intelligence
        </motion.p>
        <motion.div variants={fadeUpVariant} className="flex items-center gap-4 pt-4">
          <Button variant="primary" icon={ArrowRight} iconPosition="right">
            Explore Dashboard
          </Button>
          <Button variant="glass">
            View My Work
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-24"
      >
        <motion.div variants={fadeUpVariant}>
          <GlassCard interactive>
            <BarChart3 className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-xl font-space font-bold mb-2">Data Analysed</h3>
            <p className="text-white/60 text-sm">250K+ Rows structured into actionable insights using Power BI & Advanced Excel.</p>
          </GlassCard>
        </motion.div>
        <motion.div variants={fadeUpVariant}>
          <GlassCard interactive>
            <TrendingUp className="w-8 h-8 text-success mb-4" />
            <h3 className="text-xl font-space font-bold mb-2">Revenue Modeled</h3>
            <p className="text-white/60 text-sm">$2.4 B+ financial data synthesized for strategic decision making.</p>
          </GlassCard>
        </motion.div>
        <motion.div variants={fadeUpVariant}>
          <GlassCard interactive>
            <ShieldCheck className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-space font-bold mb-2">CMA US</h3>
            <p className="text-white/60 text-sm">Part 1 Cleared in first attempt. Expanding knowledge in corporate finance & strategy.</p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}`
  }
];

// Folders to ensure they exist (safe to run multiple times, protects assets)
const ensureFolders = [
  'app', 'components/ui', 'components/layout', 'features/3d-globe', 
  'features/ai-cfo', 'sections', 'hooks', 'services', 'constants', 
  'config', 'types', 'utils', 'animations', 'providers', 'store', 
  'public/assets', 'public/images', 'public/videos', 'public/fonts', 
  'public/icons', 'public/models', 'public/data', 'public/certificates', 
  'public/projects', 'public/blogs', 'api', 'styles'
];

async function generateProject() {
  console.log('🚀 INITIALIZING PARVEJ OS ENTERPRISE SCAFFOLDING...\n');

  try {
    for (const folder of ensureFolders) {
      await fs.mkdir(folder, { recursive: true });
    }
    console.log('✅ Directories successfully created/verified.');

    for (const file of projectFiles) {
      const dir = path.dirname(file.path);
      await fs.mkdir(dir, { recursive: true }); 
      await fs.writeFile(file.path, file.content, 'utf8');
      console.log(`✅ Generated file: ${file.path}`);
    }

    console.log('\n🎉 PARVEJ OS BOOTSTRAP COMPLETE!');
    console.log('\n➡️  NEXT STEPS:');
    console.log('1. Run: npm install');
    console.log('2. Run: npm run dev');
    console.log('3. Open http://localhost:3000 in your browser.');
    console.log('\nWait for everything to look perfect, then tell me to start Phase 3!');

  } catch (error) {
    console.error('❌ ERROR DURING SCAFFOLDING:', error);
  }
}

generateProject();