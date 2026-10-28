import React, { useMemo } from 'react';
import * as THREE from 'three';
import { crystalShardMaterial, glowingIceMaterial } from '../Materials/IceMaterial';

interface CrystalDef {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: [number, number, number];
  isGlowing?: boolean;
}

export const CrystalFormations: React.FC = () => {
  // Generate realistic crystal clusters clustered at key focal points for 1.6x scale
  const crystals = useMemo<CrystalDef[]>(() => {
    const list: CrystalDef[] = [];

    const addCluster = (
      cx: number,
      cy: number,
      cz: number,
      count: number,
      radius: number,
      maxHeight: number
    ) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const r = Math.random() * radius;
        const x = cx + Math.cos(angle) * r;
        const z = cz + Math.sin(angle) * r;
        const h = THREE.MathUtils.lerp(maxHeight * 0.45, maxHeight, Math.random());
        const w = (h * 0.22) * (0.8 + Math.random() * 0.4);
        
        const tiltX = (z - cz) * 0.15 + (Math.random() - 0.5) * 0.2;
        const tiltZ = -(x - cx) * 0.15 + (Math.random() - 0.5) * 0.2;
        const rotY = Math.random() * Math.PI;

        list.push({
          pos: [x, cy + h * 0.45, z],
          rot: [tiltX, rotY, tiltZ],
          scale: [w, h, w],
          isGlowing: i === 0 || Math.random() > 0.65,
        });
      }
    };

    // 1. Massive Crystal Outcrop - Front Left (Flanking Staircase foot, Reference 1)
    addCluster(-5.8, 0.4, 8.8, 8, 1.6, 5.2);

    // 2. Massive Crystal Outcrop - Front Right (Flanking Staircase foot, Reference 1)
    addCluster(5.8, 0.4, 8.8, 8, 1.6, 5.2);

    // 3. Castle Foundation Terrace - Left Corner
    addCluster(-7.6, 2.8, 0.8, 7, 1.4, 4.4);

    // 4. Castle Foundation Terrace - Right Corner
    addCluster(7.6, 2.8, 0.8, 7, 1.4, 4.4);

    // 5. Staircase Mid-Landing Outcrops
    addCluster(-4.2, 1.8, 4.8, 5, 0.8, 3.2);
    addCluster(4.2, 1.8, 4.8, 5, 0.8, 3.2);

    // 6. Perimeter Base Diorama Crystals
    addCluster(-10.2, 0.2, 2.0, 6, 1.4, 3.8);
    addCluster(10.2, 0.2, 2.0, 6, 1.4, 3.8);
    addCluster(-8.5, 0.6, -6.5, 6, 1.5, 4.2);
    addCluster(8.5, 0.6, -6.5, 6, 1.5, 4.2);

    return list;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {crystals.map((c, idx) => (
        <group key={`crystal-${idx}`} position={c.pos} rotation={c.rot} scale={c.scale}>
          {/* Hexagonal sharp crystal column */}
          <mesh
            material={c.isGlowing ? glowingIceMaterial : crystalShardMaterial}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.3, 0.5, 1.0, 6]} />
          </mesh>
          {/* Sharp crystal bipyramid/conical apex */}
          <mesh
            position={[0, 0.75, 0]}
            material={c.isGlowing ? glowingIceMaterial : crystalShardMaterial}
            castShadow
          >
            <coneGeometry args={[0.3, 0.5, 6]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
