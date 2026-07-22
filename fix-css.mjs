import fs from 'fs/promises';
import path from 'path';

async function restoreCSS() {
  console.log('🚀 Fixing Tailwind CSS Connection...');

  // 1. Fixing tailwind.config.ts
  const tailwindPath = path.join(process.cwd(), 'tailwind.config.ts');
  const tailwindContent = `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        accent: "#22d3ee",
        success: "#22c55e",
        danger: "#ef4444",
        warning: "#eab308",
        pureWhite: "#FFFFFF",
      },
      fontFamily: {
        space: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        sans: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;`;

  // 2. Fixing postcss.config.mjs
  const postcssPath = path.join(process.cwd(), 'postcss.config.mjs');
  const postcssContent = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

  // 3. Fixing layout.tsx (Ensuring globals.css is imported)
  const layoutPath = path.join(process.cwd(), 'app/layout.tsx');
  const layoutContent = `import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // THIS IS THE MAGIC LINE
import { Sidebar } from "@/components/layout/Sidebar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = { title: "Parvej OS | Finance Command Center", description: "Futuristic Finance Operating System" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${spaceGrotesk.variable} \${inter.variable} \${jetBrainsMono.variable} antialiased dark\`}>
      <body className="bg-[#02040A] text-white flex min-h-screen overflow-x-hidden m-0 p-0">
        <Sidebar />
        <main className="flex-1 w-full lg:pl-[256px] min-h-screen bg-[#02040A]">
          {children}
        </main>
      </body>
    </html>
  );
}`;

  // 4. Fixing globals.css (Ensuring Tailwind directives are present)
  const globalsPath = path.join(process.cwd(), 'app/globals.css');
  const globalsContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes spinEarth {
  from { background-position: 0% center; }
  to { background-position: 200% center; }
}

@keyframes spinProcedural {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-earth { animation: spinEarth 40s linear infinite; }
.animate-procedural { animation: spinProcedural 40s linear infinite; }

body { background-color: #02040A; color: white; overflow-x: hidden; margin: 0; padding: 0; }
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #02040A; }
::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #334155; }`;

  try {
    await fs.writeFile(tailwindPath, tailwindContent, 'utf8');
    await fs.writeFile(postcssPath, postcssContent, 'utf8');
    await fs.writeFile(layoutPath, layoutContent, 'utf8');
    await fs.writeFile(globalsPath, globalsContent, 'utf8');
    console.log('✅ SUCCESS! Tailwind CSS and Layout restored perfectly.');
  } catch (err) {
    console.log('❌ Error:', err);
  }
}

restoreCSS();