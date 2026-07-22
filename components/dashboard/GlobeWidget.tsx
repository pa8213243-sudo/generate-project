"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

// Dynamically import react-globe.gl to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export const GlobeWidget = () => {
  const globeRef = useRef<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Premium Bloomberg-style network arcs
  const arcsData = [
    { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278, color: '#22d3ee' }, // NY to London
    { startLat: 35.6762, startLng: 139.6503, endLat: -33.8688, endLng: 151.2093, color: '#22c55e' }, // Tokyo to Sydney
    { startLat: 25.2048, startLng: 55.2708, endLat: 1.3521, endLng: 103.8198, color: '#eab308' }, // Dubai to Singapore
    { startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.0060, color: '#3b82f6' }, // London to NY
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl bg-[#030712] border border-white/10 overflow-hidden shadow-2xl p-6 min-h-[380px]">
      
      {/* 🌌 ANIMATED HOLOGRAPHIC VIDEO BACKGROUND (Using Local MP4) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <video 
          src="/assets/earth-night-8k.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-[150%] h-[150%] object-cover filter blur-[2px] contrast-150 saturate-150 hue-rotate-[180deg]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#030712_70%)]" />
      </div>

      {/* 🌍 3D PREMIUM GLOBE (Using Local Textures Only) */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center cursor-move">
        {mounted && (
          <Globe
            ref={globeRef}
            
            // Local 8K Textures
            globeImageUrl="/assets/earth_night_8k.jpg"
            bumpImageUrl="/assets/earth_bump.jpg"
            
            // Atmosphere & Lighting
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere={true}
            atmosphereColor="#22d3ee"
            atmosphereAltitude={0.15}
            
            // Network Paths
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcAltitudeAutoScale={0.3}
            arcStroke={0.5}

            width={340}
            height={340}

            onGlobeReady={() => {
              if (globeRef.current) {
                const controls = globeRef.current.controls();
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.6;
                controls.enableZoom = true;
                
                globeRef.current.pointOfView({ lat: 25, lng: 55, altitude: 2.2 });

                // ☁️ CLOUD LAYER (Using Local Clouds Texture)
                const scene = globeRef.current.scene();
                new THREE.TextureLoader().load('/assets/earth_clouds.png', (texture) => {
                  const cloudGeometry = new THREE.SphereGeometry(globeRef.current.getGlobeRadius() * 1.012, 64, 64);
                  const cloudMaterial = new THREE.MeshPhongMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.35,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide,
                    depthWrite: false,
                  });
                  const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
                  scene.add(cloudMesh);

                  // Animate clouds slightly faster than earth
                  const animateClouds = () => {
                    cloudMesh.rotation.y += 0.0003;
                    requestAnimationFrame(animateClouds);
                  };
                  animateClouds();
                });
              }
            }}
          />
        )}
      </div>

      {/* 🎛️ PREMIUM HUD ELEMENTS */}
      <div className="absolute top-[20%] left-[8%] z-30 flex flex-col items-start gap-1 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></div>
          <div className="text-[8px] font-mono text-accent bg-[#050816]/90 px-1.5 py-0.5 rounded border border-accent/30 backdrop-blur-md">GOLD M.CAP</div>
        </div>
        <div className="text-[11px] font-bold text-white pl-3 drop-shadow-md">$15.4 Trillion</div>
      </div>

      <div className="absolute top-[16%] right-[8%] z-30 flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <div className="text-[8px] font-mono text-success bg-[#050816]/90 px-1.5 py-0.5 rounded border border-success/30 backdrop-blur-md">GLOBAL SHARE</div>
          <div className="w-1.5 h-1.5 bg-success rounded-full animate-ping"></div>
        </div>
        <div className="text-[11px] font-bold text-white pr-3 drop-shadow-md">42.8% Dominance</div>
      </div>

      {/* 🚀 BOTTOM HOLOGRAPHIC PROJECTOR RINGS */}
      <div className="absolute bottom-4 flex flex-col items-center justify-center pointer-events-none z-0">
        <div className="w-40 h-10 rounded-[100%] border-[2px] border-accent/20 shadow-[0_0_30px_rgba(34,211,238,0.3)] absolute bottom-0"></div>
        <div className="w-24 h-6 rounded-[100%] border border-accent/50 shadow-[0_0_20px_rgba(34,211,238,0.6)] absolute bottom-2"></div>
        <div className="w-12 h-3 rounded-[100%] bg-accent/80 shadow-[0_0_40px_rgba(34,211,238,1)] absolute bottom-3.5"></div>
        <div className="w-24 h-32 bg-gradient-to-t from-accent/30 to-transparent bottom-4 absolute blur-md mix-blend-screen clip-path-triangle"></div>
      </div>
    </div>
  );
};