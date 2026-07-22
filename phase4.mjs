import fs from 'fs/promises';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const colors = {
  reset: "\x1b[0m", green: "\x1b[32m", yellow: "\x1b[33m",
  blue: "\x1b[34m", red: "\x1b[31m", cyan: "\x1b[36m"
};

const filesToProcess = [
  // ==========================================
  // 1. ERROR BOUNDARY
  // ==========================================
  {
    path: 'components/ui/ErrorBoundary.tsx',
    content: `"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RefreshCcw } from "lucide-react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("PARVEJ OS System Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-[#050816] min-h-[400px] rounded-2xl border border-red-500/30">
          <AlertOctagon className="w-12 h-12 text-red-500 mb-4 animate-pulse" />
          <h2 className="text-xl font-bold text-white mb-2">MODULE RENDER FAILURE</h2>
          <p className="text-white/50 font-mono text-sm mb-6 max-w-md">
            A UI module failed to compile. The core system remains operational.
          </p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> REBOOT MODULE
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}`
  },

  // ==========================================
  // 2. AUDIO SINGLETON POOL (WITH UNLOCK)
  // ==========================================
  {
    path: 'utils/audioManager.ts',
    content: `class AudioManager {
  private static instance: AudioManager;
  private audioPool: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = false;
  private volume: number = 0.3;
  private isUnlocked: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      const unlock = () => {
        if (this.isUnlocked) return;
        this.playOscillator(20000, 0.001); // Silent unlock
        this.isUnlocked = true;
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    }
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public init(soundEnabled: boolean, vol: number) {
    this.enabled = soundEnabled;
    this.volume = vol;
  }

  public preload(src: string, id: string) {
    if (typeof window === 'undefined') return;
    try {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = this.volume;
      this.audioPool.set(id, audio);
    } catch (e) {
      console.warn('Audio preload failed', e);
    }
  }

  public play(id: string, fallbackFreq: number) {
    if (!this.enabled) return;
    
    const audio = this.audioPool.get(id);
    if (audio && this.isUnlocked) {
      audio.currentTime = 0;
      audio.play().catch(() => this.playOscillator(fallbackFreq));
    } else {
      this.playOscillator(fallbackFreq);
    }
  }

  private playOscillator(freq: number, forceVol?: number) {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = forceVol ?? this.volume;
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  }
}

export const audioManager = AudioManager.getInstance();`
  },

  // ==========================================
  // 3. HARDWARE-LEVEL PERFORMANCE HOOK
  // ==========================================
  {
    path: 'hooks/usePerformance.ts',
    content: `"use client";
import { useEffect } from "react";
import { usePerformanceStore } from "@/store/usePerformanceStore";

export function usePerformance() {
  const { quality, setQuality, setFps, reducedMotion, setReducedMotion } = usePerformanceStore();

  useEffect(() => {
    // 1. Accessibility Check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setQuality('2d-fallback');
      return;
    }

    // 2. Hardware Capability Baseline Detection
    if (typeof navigator !== 'undefined') {
      const memory = (navigator as any).deviceMemory || 8;
      const cores = navigator.hardwareConcurrency || 4;
      if (memory < 4 || cores <= 2) {
        setQuality('low');
      }
    }

    // 3. Dynamic FPS Monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    let animFrameId: number;

    const calculateFPS = () => {
      const currentTime = performance.now();
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFps);

        if (currentFps < 25) setQuality('2d-fallback');
        else if (currentFps < 35) setQuality('very-low');
        else if (currentFps < 45) setQuality('low');
        else if (currentFps >= 58 && quality !== 'low') setQuality('high');
        
        frameCount = 0;
        lastTime = currentTime;
      }
      animFrameId = requestAnimationFrame(calculateFPS);
    };

    animFrameId = requestAnimationFrame(calculateFPS);

    return () => cancelAnimationFrame(animFrameId);
  }, [setQuality, setFps, setReducedMotion, quality]);

  return { quality, reducedMotion };
}`
  },

  // ==========================================
  // 4. EVENT-DRIVEN BOOT STORE (SYNCED W/ 3D)
  // ==========================================
  {
    path: 'store/useBootStore.ts',
    content: `import { create } from 'zustand';

interface BootState {
  domReady: boolean;
  dataReady: boolean;
  audioReady: boolean;
  threeProgress: number; // 0 to 100 from LoadingManager
  setSystemReady: (system: 'dom' | 'data' | 'audio') => void;
  setThreeProgress: (val: number) => void;
  getOverallProgress: () => number;
}

export const useBootStore = create<BootState>((set, get) => ({
  domReady: false,
  dataReady: false,
  audioReady: false,
  threeProgress: 0,
  setSystemReady: (system) => set((state) => ({ ...state, [\`\${system}Ready\`]: true })),
  setThreeProgress: (val) => set({ threeProgress: val }),
  getOverallProgress: () => {
    const state = get();
    let progress = 0; 
    if (state.domReady) progress += 15;
    if (state.audioReady) progress += 10;
    if (state.dataReady) progress += 15;
    progress += (state.threeProgress * 0.60); // 3D assets hold 60% weight
    return progress;
  }
}));`
  },

  // ==========================================
  // 5. EVENT-DRIVEN BOOT SEQUENCE UI
  // ==========================================
  {
    path: 'features/boot-sequence/BootSequence.tsx',
    content: `"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { usePerformanceStore } from "@/store/usePerformanceStore";
import { useBootStore } from "@/store/useBootStore";
import { audioManager } from "@/utils/audioManager";

export const BootSequence = () => {
  const { setBootComplete } = useAppStore();
  const { reducedMotion } = usePerformanceStore();
  const { getOverallProgress, setSystemReady, threeProgress } = useBootStore();
  
  const [isVisible, setIsVisible] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [bootLog, setBootLog] = useState<string>("> INITIALIZING KERNEL...");

  useEffect(() => {
    if (sessionStorage.getItem("system_booted") || reducedMotion) {
      setIsVisible(false);
      setBootComplete(true);
      return;
    }

    setSystemReady('dom');
    setTimeout(() => {
      setSystemReady('audio');
      audioManager.init(true, 0.3);
    }, 200);
    setTimeout(() => setSystemReady('data'), 400);

    const interval = setInterval(() => {
      const target = getOverallProgress();
      setDisplayProgress(prev => {
        const next = prev + (target - prev) * 0.2; 
        
        if (next < 25) setBootLog("> MOUNTING DOM & CSSOM...");
        else if (next < 40) setBootLog("> HYDRATING DATA LAYER...");
        else if (next < 95) setBootLog(\`> FETCHING EARTH ASSETS (\${Math.round(threeProgress)}%)...\`);
        else setBootLog("> ALL SYSTEMS NOMINAL. ONLINE.");

        if (next >= 99 && threeProgress >= 99) {
          clearInterval(interval);
          audioManager.play('boot', 1500);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("system_booted", "true");
            setBootComplete(true);
          }, 800);
          return 100;
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [reducedMotion, setBootComplete, getOverallProgress, setSystemReady, threeProgress]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[9999] bg-[#02040A] flex flex-col items-center justify-center font-mono p-6"
      >
        <div className="w-full max-w-2xl z-20 relative">
          <div className="flex justify-between text-xs text-cyan-400/80 uppercase mb-3">
            <span>JARVIS PROTOCOL V1.0</span>
            <span className="animate-pulse">REC: ACTIVE</span>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8" />
          <div className="min-h-[60px] text-sm md:text-base text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] font-bold mb-8">
            {bootLog}<span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block ml-1 align-middle" />
          </div>
          <div className="w-full h-1.5 bg-white/10 overflow-hidden rounded-full border border-white/5">
             <motion.div 
               className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"
               style={{ width: \`\${displayProgress}%\` }}
             />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};`
  },

  // ==========================================
  // 6. LOCAL EARTH ENGINE W/ LOADING MGR & ANIMATED FALLBACK
  // ==========================================
  {
    path: 'features/3d-globe/EarthGlobe.tsx',
    content: `"use client";
import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformanceStore } from "@/store/usePerformanceStore";
import { useBootStore } from "@/store/useBootStore";
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// Links texture loading progress directly to global boot store
const TextureLoaderComponent = ({ quality }: { quality: string }) => {
  const earthRef = useRef<THREE.Group>(null);
  const { progress } = useProgress();
  const setThreeProgress = useBootStore(state => state.setThreeProgress);

  useEffect(() => { setThreeProgress(progress); }, [progress, setThreeProgress]);

  const [colorMap, bumpMap, cloudsMap] = useTexture([
    '/models/earth/earth-dark.png',
    '/models/earth/earth-topology.png',
    '/models/earth/earth-clouds.png'
  ]);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={earthRef}>
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial map={colorMap} bumpMap={bumpMap} bumpScale={0.015} roughness={0.7} metalness={0.1} />
      </Sphere>
      {quality !== 'low' && quality !== 'very-low' && (
        <Sphere args={[2.02, 64, 64]}>
          <meshStandardMaterial map={cloudsMap} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Sphere>
      )}
      <Sphere args={[2.08, 64, 64]}>
        <meshBasicMaterial color="#2563EB" transparent opacity={0.12} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
};

const HolographicLoader = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.5;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });
  return (
    <Sphere args={[2, 32, 32]} ref={mesh}>
      <meshStandardMaterial color="#0B1120" wireframe emissive="#22D3EE" emissiveIntensity={0.8} />
    </Sphere>
  );
};

export const EarthGlobe = () => {
  const { quality, reducedMotion } = usePerformanceStore();

  if (reducedMotion || quality === '2d-fallback' || quality === 'very-low') {
    return <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/10 to-[#02040A] opacity-30 pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 z-0 h-[800px] w-full mt-10 opacity-90 pointer-events-none md:pointer-events-auto flex justify-center items-center">
      <ErrorBoundary fallback={<Canvas><ambientLight/><HolographicLoader/></Canvas>}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[5, 3, 5]} color="#ffffff" intensity={2} />
          <directionalLight position={[-5, -3, -5]} color="#22D3EE" intensity={0.5} />
          
          <Suspense fallback={<HolographicLoader />}>
            <TextureLoaderComponent quality={quality} />
          </Suspense>
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};`
  }
];

// Base64 transparent 1x1 image for automated placeholder generation
const DUMMY_PNG_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

function ensureLocalTextures() {
  const targetDir = path.join(process.cwd(), 'public', 'models', 'earth');
  if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

  const files = ['earth-dark.png', 'earth-topology.png', 'earth-clouds.png'];
  files.forEach(file => {
    const filePath = path.join(targetDir, file);
    if (!existsSync(filePath)) {
      writeFileSync(filePath, Buffer.from(DUMMY_PNG_BASE64, 'base64'));
      console.log(colors.cyan, `  + Auto-generated placeholder: ${filePath}`, colors.reset);
    }
  });
}

async function checkDependencies() {
  try {
    const pkgRaw = await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf8');
    const pkg = JSON.parse(pkgRaw);
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const required = ['zustand', '@react-three/fiber', '@react-three/drei', 'three', 'framer-motion', 'lucide-react', 'autoprefixer'];
    return required.filter(dep => !deps[dep]);
  } catch (e) {
    return [];
  }
}

async function runDeploy() {
  console.log(colors.cyan, '\n🚀 EXECUTING FINAL PHASE 4 ARCHITECTURE DEPLOYMENT...\n', colors.reset);
  
  let hasError = false;
  
  try {
    // 1. Generate Files
    for (const file of filesToProcess) {
      const dir = path.dirname(file.path);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(file.path, file.content, 'utf8');
      console.log(colors.green, `  + Created/Updated: ${file.path}`, colors.reset);
    }

    // 2. Ensure Local Textures (No Manual Dev Work)
    console.log(colors.yellow, '\n🌍 Validating local Earth textures...', colors.reset);
    ensureLocalTextures();

    // 3. Verify Dependencies
    const missingDeps = await checkDependencies();
    if (missingDeps.length > 0) {
      console.log(colors.red, `\n📦 Installing missing dependencies: ${missingDeps.join(' ')}`, colors.reset);
      execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
    }

    // 4. Run Automated Validation (Lint, Typecheck, Build test)
    console.log(colors.cyan, '\n⚙️ Running Automated Validation Checks (Lint & Typecheck)...\n', colors.reset);
    try {
      execSync('npm run lint', { stdio: 'inherit' });
      execSync('npx tsc --noEmit', { stdio: 'inherit' });
      console.log(colors.green, '\n✅ Validation Passed: No critical ESLint or TypeScript errors found.', colors.reset);
    } catch (validationErr) {
      console.warn(colors.yellow, '\n⚠️ Validation yielded warnings/errors. Check the terminal output above to fix them before Phase 5.', colors.reset);
      hasError = true;
    }

    console.log(colors.green, '\n🎉 PHASE 4 DEPLOYMENT FULLY COMPLETE!\n', colors.reset);
    if (!hasError) {
      console.log(colors.cyan, '➡️ NEXT STEP: Run \x1b[1mnpm run dev\x1b[0m\x1b[36m and begin planning Phase 5.', colors.reset);
    }

  } catch (err) {
    console.error(colors.red, '\n❌ DEPLOYMENT FAILED:', err, colors.reset);
  }
}

runDeploy();