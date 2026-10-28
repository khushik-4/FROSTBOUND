import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import type { CameraMode, SceneSettings } from './types';
import { CameraRig } from './components/Camera/CameraRig';
import { CastleModel } from './components/Castle/CastleModel';
import { TerrainBase } from './components/Environment/TerrainBase';
import { PineTrees } from './components/Environment/PineTrees';
import { MountainBackdrop } from './components/Environment/MountainBackdrop';
import { AuroraBorealis } from './components/Environment/AuroraBorealis';
import { SnowParticles } from './components/Environment/SnowParticles';
import { MinimalHUD } from './components/UI/MinimalHUD';

export const App: React.FC = () => {
  const initialMode: CameraMode =
    typeof window !== 'undefined' && window.location.hash.includes('miniature')
      ? 'miniature'
      : 'visitor';
  const [mode, setMode] = useState<CameraMode>(initialMode);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [settings, setSettings] = useState<SceneSettings>({
    showSnow: true,
    showAurora: true,
    iceLuminescence: 1.0,
  });

  const handleResetCamera = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 3D Scene Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
          powerPreference: 'high-performance',
        }}
        camera={{
          position: initialMode === 'miniature' ? [56.0, 40.0, 60.0] : [0, 3.2, 27.5],
          fov: initialMode === 'miniature' ? 43 : 53,
        }}
      >
        {/* Deep Polar Sky & Atmospheric Distance Fog (Calibrated for crisp alpine depth) */}
        <color attach="background" args={['#051024']} />
        <fog attach="fog" args={['#07162e', 42, 130]} />

        {/* Studio / Cinematic Lighting System */}
        {/* Cool Moonlit Key Light */}
        <directionalLight
          position={[-22, 38, 26]}
          intensity={2.6}
          color="#e6f4fe"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={110}
          shadow-camera-left={-42}
          shadow-camera-right={42}
          shadow-camera-top={50}
          shadow-camera-bottom={-16}
          shadow-bias={-0.00015}
        />

        {/* Alpine Sky Diffuse Fill (Illuminates shaded mountain faces with cool blue-grey) */}
        <directionalLight
          position={[24, 32, 18]}
          intensity={1.1}
          color="#4e7296"
        />

        {/* Deep Polar Indigo Counter-Light */}
        <directionalLight
          position={[15, 12, -25]}
          intensity={1.0}
          color="#1e3a66"
        />

        {/* Ambient Polar Sky Bounce */}
        <ambientLight intensity={0.75} color="#101f36" />

        {/* Soft Distant Mountain Rim Backlight */}
        <directionalLight
          position={[0, 16, -75]}
          intensity={0.8}
          color="#5c85aa"
        />

        {/* Violet Horizon Accent Rim Light */}
        <directionalLight
          position={[0, -2, -22]}
          intensity={0.8}
          color="#c084fc"
        />

        {/* Castle Entrance Cyan Accent Spotlight */}
        <spotLight
          position={[0, 14, 12]}
          target-position={[0, 4.0, 0]}
          intensity={4.5}
          color="#38bdf8"
          angle={0.65}
          penumbra={0.8}
          distance={32}
        />

        {/* Prismatic Fairy-Tale Accent Lights (Reference 1) */}
        {/* Staircase Foot Cyan Glow */}
        <pointLight
          position={[0, 2.4, 8.5]}
          color="#38bdf8"
          intensity={4.5}
          distance={16.0}
          decay={2}
        />

        {/* Left Flank Turquoise Refraction Accent */}
        <pointLight
          position={[-7.0, 4.5, 4.0]}
          color="#2dd4bf"
          intensity={4.0}
          distance={14.0}
          decay={2}
        />

        {/* Right Flank Violet / Magenta Refraction Accent */}
        <pointLight
          position={[7.0, 4.5, 4.0]}
          color="#c084fc"
          intensity={4.5}
          distance={14.0}
          decay={2}
        />

        {/* Suspense wrapper for 3D elements */}
        <Suspense fallback={null}>
          {/* Dual-Mode Camera Rig with Smooth Transitions */}
          <CameraRig mode={mode} resetTrigger={resetTrigger} />

          {/* Castle Real 3D Model */}
          <CastleModel />

          {/* Terrain & Diorama Pedestal Base */}
          <TerrainBase mode={mode} />

          {/* Snow-covered Pine Trees */}
          <PineTrees mode={mode} />

          {/* Alpine Mountain Silhouette Backdrop */}
          <MountainBackdrop />

          {/* Dynamic Flowing Aurora Borealis with strict boolean visibility */}
          <AuroraBorealis visible={settings.showAurora} />

          {/* Falling Snow Particles */}
          <SnowParticles count={900} enabled={settings.showSnow} />
        </Suspense>
      </Canvas>

      {/* Minimal UI HUD Overlay */}
      <MinimalHUD
        mode={mode}
        onModeChange={(newMode) => {
          setMode(newMode);
          if (typeof window !== 'undefined') {
            window.location.hash = newMode;
          }
        }}
        onResetCamera={handleResetCamera}
        settings={settings}
        onUpdateSettings={setSettings}
      />
    </div>
  );
};

export default App;
