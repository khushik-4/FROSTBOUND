import React, { useMemo } from 'react';
import * as THREE from 'three';
import { pedestalMaterial, snowMaterial, glacialRockMaterial } from '../Materials/IceMaterial';
import type { CameraMode } from '../../types';

interface TerrainBaseProps {
  mode: CameraMode;
}

export const TerrainBase: React.FC<TerrainBaseProps> = ({ mode }) => {
  // Sculpted organic snow terrain using high-poly circular disk geometry for diorama
  const snowTerrainGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(19.2, 19.6, 1.4, 64, 24);
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      if (y > 0.4) {
        let newY = y;

        // Castle plateau at center/rear (x between -8.2 and 8.2, z between -12.5 and 0.6)
        if (Math.abs(x) < 8.0 && z > -12.0 && z < 0.6) {
          newY = 3.1 + Math.sin(x * 0.3) * 0.08;
        } else if (Math.abs(x) < 4.4 && z >= 0.6 && z <= 9.8) {
          // Staircase slope runway - stays slightly below steps so all steps are clearly visible
          const t = (z - 0.6) / 9.2;
          newY = THREE.MathUtils.lerp(2.8, 0.05, t);
        } else {
          // Natural undulating snow hills and alpine drifts
          if (z < -6) {
            const rearDist = Math.abs(z + 6);
            newY += Math.min(rearDist * 0.6, 4.0);
          }
          if (Math.abs(x) > 6.0) {
            const latDist = Math.abs(x) - 6.0;
            newY += Math.min(latDist * 0.55, 3.2);
          }

          // Gentle rolling snow waves
          newY += Math.sin(x * 0.35) * Math.cos(z * 0.35) * 0.35;
          newY += Math.sin(x * 0.9 + z * 0.6) * 0.15;
        }

        // Taper smoothly to edge of diorama plinth
        const r = Math.sqrt(x * x + z * z);
        if (r > 16.5) {
          const falloff = Math.min((r - 16.5) / 2.8, 1.0);
          newY = THREE.MathUtils.lerp(newY, 0.4, falloff);
        }

        pos.setY(i, newY);
      }
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Expansive outer snow landscape used exclusively in Visitor Mode for immersion
  const expansiveSnowGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(140, 140, 64, 64);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      
      let y = -0.15;
      // Gentle alpine terrain undulations
      y += Math.sin(x * 0.07) * Math.cos(z * 0.07) * 1.6;
      y += Math.sin(x * 0.18 + z * 0.14) * 0.5;

      // Outer mountain foothills
      if (dist > 22) {
        y += Math.min((dist - 22) * 0.32, 7.5);
      }
      pos.setY(i, y);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Miniature Mode Architectural Diorama Pedestal Base (Reference 2) */}
      <group position={[0, -1.0, 0]}>
        {/* Dark Obsidian Pedestal Plinth with Chamfered Edge */}
        <mesh material={pedestalMaterial} receiveShadow castShadow>
          <cylinderGeometry args={[19.8, 20.4, 1.6, 64]} />
        </mesh>

        {/* Stratified Glacial Blue Rock/Ice Layer */}
        <mesh position={[0, 0.95, 0]} material={glacialRockMaterial} receiveShadow>
          <cylinderGeometry args={[19.4, 19.9, 0.7, 64]} />
        </mesh>
      </group>

      {/* 2. Core Diorama Sculpted Snow Mantle (Shared by both modes) */}
      <mesh geometry={snowTerrainGeo} material={snowMaterial} receiveShadow castShadow />

      {/* 3. Expansive Outer Snow Landscape (Visible in Visitor Mode for boundless immersion) */}
      {mode === 'visitor' && (
        <mesh
          position={[0, -0.25, 0]}
          geometry={expansiveSnowGeo}
          material={snowMaterial}
          receiveShadow
        />
      )}

      {/* 4. Castle Foundation Terrace Slab */}
      <group position={[0, 1.55, -5.2]}>
        <mesh material={glacialRockMaterial} receiveShadow castShadow>
          <boxGeometry args={[15.5, 3.1, 13.5]} />
        </mesh>
        
        <mesh position={[0, 1.58, 0]} material={snowMaterial} receiveShadow>
          <boxGeometry args={[15.7, 0.08, 13.7]} />
        </mesh>
      </group>
    </group>
  );
};
