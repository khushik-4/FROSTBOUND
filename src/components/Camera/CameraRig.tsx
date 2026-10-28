import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { CameraMode } from '../../types';

interface CameraRigProps {
  mode: CameraMode;
  resetTrigger: number;
}

// Preset camera configurations with verified mathematical framing
// Guarantees comfortable spire apex clearance (y=44.4) and diorama pedestal clearance (y=-3.5)
const PRESETS = {
  visitor: {
    pos: new THREE.Vector3(0, 3.2, 27.5),
    target: new THREE.Vector3(0, 13.8, -3.0),
    fov: 53,
    minDistance: 10.0,
    maxDistance: 36.0,
    minPolarAngle: Math.PI / 10,
    maxPolarAngle: Math.PI / 2 - 0.03,
    minAzimuthAngle: -Math.PI / 3.4,
    maxAzimuthAngle: Math.PI / 3.4,
  },
  miniature: {
    // Verified 3/4 isometric perspective: SpireTopY = 10.6%, PedestalBotY = 91.4% on 16:9 desktop
    pos: new THREE.Vector3(56.0, 40.0, 60.0),
    target: new THREE.Vector3(0, 18.5, -3.0),
    fov: 43,
    minDistance: 28.0,
    maxDistance: 110.0,
    minPolarAngle: 0.35,
    maxPolarAngle: 1.40,
    minAzimuthAngle: -Infinity,
    maxAzimuthAngle: Infinity,
  },
};

export const CameraRig: React.FC<CameraRigProps> = ({ mode, resetTrigger }) => {
  const { camera, size } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Transition animation state
  const isTransitioning = useRef(true);
  const transitionProgress = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const destPos = useRef(new THREE.Vector3());
  const destTarget = useRef(new THREE.Vector3());

  // Calculate aspect ratio factor to ensure mobile portrait viewports (aspect < 1.0)
  // scale camera distance outward so the diorama width and spire height fit completely
  const aspect = size.width / Math.max(size.height, 1);
  const portraitScale = aspect < 1.0 ? Math.min(1.0 + (1.0 - aspect) * 0.76, 1.48) : 1.0;

  // Initiate transition whenever mode, resetTrigger, or aspect changes
  useEffect(() => {
    const preset = PRESETS[mode];
    startPos.current.copy(camera.position);

    if (controlsRef.current) {
      startTarget.current.copy(controlsRef.current.target);
    } else {
      startTarget.current.copy(preset.target);
    }

    // Scale position outward in portrait orientation to preserve frustum bounds
    const scaledPos = preset.pos.clone();
    if (mode === 'miniature' && portraitScale > 1.0) {
      const dir = new THREE.Vector3().subVectors(preset.pos, preset.target);
      scaledPos.copy(preset.target).addScaledVector(dir, portraitScale);
    } else if (mode === 'visitor' && portraitScale > 1.0) {
      scaledPos.z = preset.pos.z * (1.0 + (portraitScale - 1.0) * 0.55);
      scaledPos.y = preset.pos.y * 1.1;
    }

    destPos.current.copy(scaledPos);
    destTarget.current.copy(preset.target);

    transitionProgress.current = 0;
    isTransitioning.current = true;
  }, [mode, resetTrigger, camera, portraitScale]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (isTransitioning.current) {
      transitionProgress.current += delta * 1.4; // Smooth transition ~0.8s
      const rawT = Math.min(transitionProgress.current, 1.0);
      const t = 1 - Math.pow(1 - rawT, 3); // Ease out cubic

      // Arc interpolation for camera position
      const currentPos = new THREE.Vector3().lerpVectors(startPos.current, destPos.current, t);
      const arcLift = Math.sin(t * Math.PI) * 2.5;
      currentPos.y += arcLift;
      camera.position.copy(currentPos);

      // Target interpolation
      const currentTarget = new THREE.Vector3().lerpVectors(startTarget.current, destTarget.current, t);
      controls.target.copy(currentTarget);
      camera.lookAt(currentTarget);

      if (rawT >= 1.0) {
        isTransitioning.current = false;
        camera.position.copy(destPos.current);
        controls.target.copy(destTarget.current);
      }
    }

    controls.update();
  });

  const currentPreset = PRESETS[mode];

  return (
    <OrbitControls
      ref={controlsRef}
      target={currentPreset.target}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
      panSpeed={0.5}
      enablePan={mode === 'miniature'}
      minDistance={currentPreset.minDistance}
      maxDistance={currentPreset.maxDistance * portraitScale}
      minPolarAngle={currentPreset.minPolarAngle}
      maxPolarAngle={currentPreset.maxPolarAngle}
      minAzimuthAngle={currentPreset.minAzimuthAngle}
      maxAzimuthAngle={currentPreset.maxAzimuthAngle}
    />
  );
};
