import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AuroraBorealisProps {
  visible?: boolean;
}

export const AuroraBorealis: React.FC<AuroraBorealisProps> = ({ visible = true }) => {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#059669') }, // Restrained emerald green
      uColorB: { value: new THREE.Color('#06b6d4') }, // Polar cyan
      uColorC: { value: new THREE.Color('#a855f7') }, // Aurora violet
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Flowing ribbon wave displacement (slow and majestic)
      float wave1 = sin(pos.x * 0.12 + uTime * 0.45) * 2.4;
      float wave2 = cos(pos.x * 0.28 + uTime * 0.3) * 1.6;
      pos.z += wave1 + wave2;
      pos.y += sin(pos.x * 0.18 + uTime * 0.25) * 1.2;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;

    void main() {
      // Shimmering vertical curtain bands
      float curtain1 = sin(vUv.x * 30.0 + uTime * 1.2) * 0.5 + 0.5;
      float curtain2 = cos(vUv.x * 55.0 - uTime * 1.6) * 0.5 + 0.5;
      float verticalBands = mix(curtain1, curtain2, 0.45);

      // Color gradient from bottom emerald to mid cyan to top violet
      vec3 col = mix(uColorA, uColorB, smoothstep(0.08, 0.52, vUv.y));
      col = mix(col, uColorC, smoothstep(0.52, 0.95, vUv.y));

      // Vertical alpha fade: soft fade at bottom and top edges
      float alpha = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.38, vUv.y);
      alpha *= (0.4 + 0.6 * verticalBands);
      alpha *= 0.72;

      gl_FragColor = vec4(col, alpha);
    }
  `;

  useFrame((state) => {
    if (!visible) return;
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  if (!visible) return null;

  return (
    <group name="AuroraRibbons" position={[0, 22, -22]}>
      {/* Primary Aurora Curtain */}
      <mesh ref={meshRef1} rotation={[-0.14, 0.2, 0.08]}>
        <planeGeometry args={[75, 22, 64, 16]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary Distant Aurora Ribbon */}
      <mesh
        ref={meshRef2}
        position={[4, 6, -10]}
        rotation={[-0.1, -0.28, -0.06]}
      >
        <planeGeometry args={[85, 26, 64, 16]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
