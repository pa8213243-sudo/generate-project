"use client";
import { useState, useEffect } from 'react';

export function useHardwareOptimization() {
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    // Basic hardware detection logic
    const checkHardware = () => {
      const isMobile = window.innerWidth < 768;
      // @ts-ignore - deviceMemory is not in standard TS DOM yet
      const ram = navigator.deviceMemory || 4; 
      
      // If it's a mobile device or has less than 4GB RAM, fallback to 2D for performance
      if (isMobile || ram < 4) {
        setCanRender3D(false);
      } else {
        setCanRender3D(true);
      }
    };

    checkHardware();
    window.addEventListener('resize', checkHardware);
    return () => window.removeEventListener('resize', checkHardware);
  }, []);

  return { canRender3D };
}