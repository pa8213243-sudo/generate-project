import fs from 'fs/promises';
import path from 'path';

async function fixConfigurations() {
  console.log('🚀 Fixing Configuration Files...');

  // 1. Fixing postcss.config.mjs
  const postcssPath = path.join(process.cwd(), 'postcss.config.mjs');
  const postcssContent = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

  // 2. Fixing tailwind.config.mjs (just to be 100% safe)
  const tailwindPath = path.join(process.cwd(), 'tailwind.config.mjs');
  const tailwindContent = `/** @type {import('tailwindcss').Config} */
export default {
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
};`;

  try {
    await fs.writeFile(postcssPath, postcssContent, 'utf8');
    console.log('✅ postcss.config.mjs fixed!');
    
    // Check if tailwind.config.mjs exists, if yes, fix it too.
    try {
      await fs.access(tailwindPath);
      await fs.writeFile(tailwindPath, tailwindContent, 'utf8');
      console.log('✅ tailwind.config.mjs fixed!');
    } catch (e) {
      // If it's a .js or .ts file, skip it.
      console.log('ℹ️ tailwind.config.mjs not found, skipping (this is fine).');
    }

    console.log('\\n🎉 Configuration fixed successfully! Next.js will compile now.');
  } catch (err) {
    console.log('❌ Error fixing configs:', err.message);
  }
}

fixConfigurations();