"use client";
import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, useTexture, useProgress } from '@react-three/drei';
import { AdditiveBlending, BackSide, Color, DoubleSide, Group, LinearSRGBColorSpace, Mesh, SRGBColorSpace } from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { useBootStore } from '@/store/useBootStore';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const EARTH_TEXTURES = [
  '/models/earth/earth_day_4096.jpg',
  '/models/earth/earth_normal_2048.jpg',
  '/models/earth/earth_specular_2048.jpg',
  '/models/earth/earth_bump_roughness_clouds_4096.jpg',
  '/models/earth/earth_clouds_1024.png',
];

const Atmosphere = () => (
  <Sphere args={[2.1, 64, 64]}>
    <shaderMaterial
      vertexShader={/* glsl */`
        varying vec3 vNormal;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={/* glsl */`
        varying vec3 vNormal;

        void main() {
          float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 glow = vec3(0.18, 0.7, 1.0);
          gl_FragColor = vec4(glow * intensity, intensity * 0.7);
        }
      `}
      blending={AdditiveBlending}
      side={BackSide}
      transparent
      depthWrite={false}
      toneMapped={false}
    />
  </Sphere>
);

const EarthScene = ({ quality }: { quality: string }) => {
  const groupRef = useRef<Group>(null);
  const cloudsRef = useRef<Mesh>(null);
  const { progress } = useProgress();
  const setThreeProgress = useBootStore(state => state.setThreeProgress);
  const [colorMap, normalMap, specularMap, bumpMap, cloudsMap] = useTexture(EARTH_TEXTURES);

  useEffect(() => {
    setThreeProgress(progress);
  }, [progress, setThreeProgress]);

  useEffect(() => {
    if (colorMap) colorMap.colorSpace = SRGBColorSpace;
    if (cloudsMap) cloudsMap.colorSpace = SRGBColorSpace;
    if (normalMap) normalMap.colorSpace = LinearSRGBColorSpace;
    if (specularMap) specularMap.colorSpace = LinearSRGBColorSpace;
    if (bumpMap) bumpMap.colorSpace = LinearSRGBColorSpace;
  }, [colorMap, cloudsMap, normalMap, specularMap, bumpMap]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.05;
    }
  });

  const segments =
    quality === 'ultra' || quality === 'high'
      ? 64
      : quality === 'medium'
      ? 48
      : quality === 'low'
      ? 32
      : 16;

  return (
    <>
      <Stars radius={90} depth={40} count={1800} factor={4} saturation={0} fade speed={0.7} />

      <group ref={groupRef}>
        <Sphere args={[2, segments, segments]}>
          <meshPhongMaterial
            map={colorMap}
            normalMap={normalMap}
            specularMap={specularMap}
            bumpMap={bumpMap}
            bumpScale={0.04}
            shininess={32}
            specular={new Color('#6b8aa8')}
          />
        </Sphere>

        {quality !== 'very-low' && (
          <Sphere args={[2.02, segments, segments]} ref={cloudsRef}>
            <meshPhongMaterial
              map={cloudsMap}
              transparent
              opacity={0.35}
              depthWrite={false}
              side={DoubleSide}
            />
          </Sphere>
        )}

        <Atmosphere />
      </group>
    </>
  );
};

const HolographicLoader = () => {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.5;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.18;
    }
  });

  return (
    <Sphere args={[2, 32, 32]} ref={mesh}>
      <meshStandardMaterial color="#0b1220" wireframe emissive="#22d3ee" emissiveIntensity={0.8} />
    </Sphere>
  );
};

export const EarthGlobe = () => {
  const { quality, reducedMotion } = usePerformanceStore();

  if (reducedMotion || quality === '2d-fallback' || quality === 'very-low') {
    return <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-slate-950 to-[#02060D] opacity-95 pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <ErrorBoundary fallback={<Canvas className="w-full h-full"><ambientLight /><HolographicLoader /></Canvas>}>
        <Canvas
          className="w-full h-full"
          camera={{ position: [0, 0, 6], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#020713']} />
          <ambientLight intensity={0.25} color="#9fb8ff" />
          <directionalLight position={[5, 3, 5]} intensity={1.6} color="#ffffff" />
          <pointLight position={[-8, 2, -5]} intensity={0.35} color="#3f8eff" />

          <Suspense fallback={<HolographicLoader />}>
            <EarthScene quality={quality} />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            autoRotate
            autoRotateSpeed={0.25}
            rotateSpeed={0.45}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.7}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};
