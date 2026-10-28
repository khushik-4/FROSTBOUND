import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SnowParticlesProps {
  count?: number;
  enabled?: boolean;
}

export const SnowParticles: React.FC<SnowParticlesProps> = ({ count = 900, enabled = true }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread across a volume enclosing the castle and camera
      pos[i * 3 + 0] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 1] = Math.random() * 26;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 36;

      // Downward velocity + slight drift
      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.4;
      vel[i * 3 + 1] = -(0.5 + Math.random() * 0.9); // Fall speed
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }

    return [pos, vel];
  }, [count]);

  const snowflakeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.3, 'rgba(224, 242, 254, 0.7)');
      grad.addColorStop(0.8, 'rgba(186, 230, 253, 0.2)');
      grad.addColorStop(1, 'rgba(186, 230, 253, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || !enabled) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Y fall
      posArr[i * 3 + 1] += velocities[i * 3 + 1] * delta;
      // Gentle X/Z sway
      posArr[i * 3 + 0] += Math.sin(posArr[i * 3 + 1] * 0.4) * 0.15 * delta;
      posArr[i * 3 + 2] += Math.cos(posArr[i * 3 + 1] * 0.3) * 0.15 * delta;

      // Reset when particle hits the ground
      if (posArr[i * 3 + 1] < -0.2) {
        posArr[i * 3 + 1] = 25.0;
        posArr[i * 3 + 0] = (Math.random() - 0.5) * 36;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 36;
      }
    }

    posAttr.needsUpdate = true;
  });

  if (!enabled) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.28}
        map={snowflakeTexture}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};
