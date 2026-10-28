import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  carvedIceMaterial,
  iceTrimMaterial,
  crystalShardMaterial,
  glowingIceMaterial,
  snowMaterial,
} from '../Materials/IceMaterial';

interface StepSpec {
  pos: [number, number, number];
  width: number;
  riserH: number;
  treadD: number;
}

export const GrandStaircase: React.FC = () => {
  // Generate mathematically defined step profiles with prominent nosing overhangs
  const { lowerSteps, upperSteps } = useMemo(() => {
    const lSteps: StepSpec[] = [];
    const uSteps: StepSpec[] = [];

    // Lower Flight: 14 steps from z = 9.5 to z = 5.2, y = 0.35 to 1.95
    const numLower = 14;
    const startZLower = 9.5;
    const endZLower = 5.2;
    const startYLower = 0.35;
    const endYLower = 1.95;
    const baseWidthLower = 6.8;

    for (let i = 0; i < numLower; i++) {
      const t = i / numLower;
      const z = THREE.MathUtils.lerp(startZLower, endZLower, t);
      const y = THREE.MathUtils.lerp(startYLower, endYLower, t);
      // Flared bottom steps (flares out towards foot of stairs)
      const flare = Math.max(0, 1.0 - t * 3.0) * 1.5;
      const stepWidth = baseWidthLower + flare;

      lSteps.push({
        pos: [0, y, z],
        width: stepWidth,
        riserH: 0.18,
        treadD: 0.40,
      });
    }

    // Upper Flight: 12 steps from z = 4.4 to z = 0.9, y = 2.05 to 3.45
    const numUpper = 12;
    const startZUpper = 4.4;
    const endZUpper = 0.9;
    const startYUpper = 2.05;
    const endYUpper = 3.45;
    const baseWidthUpper = 6.2;

    for (let i = 0; i < numUpper; i++) {
      const t = i / numUpper;
      const z = THREE.MathUtils.lerp(startZUpper, endZUpper, t);
      const y = THREE.MathUtils.lerp(startYUpper, endYUpper, t);
      const stepWidth = THREE.MathUtils.lerp(baseWidthUpper, baseWidthUpper - 0.5, t);

      uSteps.push({
        pos: [0, y, z],
        width: stepWidth,
        riserH: 0.18,
        treadD: 0.38,
      });
    }

    return { lowerSteps: lSteps, upperSteps: uSteps };
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Lower Flight Steps with Overhanging Crystalline Nosings */}
      {lowerSteps.map((s, idx) => (
        <group key={`lower-step-${idx}`} position={s.pos}>
          {/* Main Chiseled Ice Riser Block */}
          <mesh material={carvedIceMaterial} castShadow receiveShadow>
            <boxGeometry args={[s.width, s.riserH, s.treadD]} />
          </mesh>

          {/* Projecting Crystalline Nosing Lip (Overhangs riser to catch razor-sharp light & shadow) */}
          <mesh
            position={[0, s.riserH / 2 - 0.02, s.treadD / 2 + 0.025]}
            material={iceTrimMaterial}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[s.width + 0.06, 0.06, 0.07]} />
          </mesh>

          {/* Recessed Crisp Snow Tread Mantle (Neatly set behind nosing lip) */}
          <mesh
            position={[0, s.riserH / 2 + 0.015, -0.01]}
            material={snowMaterial}
            receiveShadow
          >
            <boxGeometry args={[s.width - 0.1, 0.025, s.treadD - 0.04]} />
          </mesh>
        </group>
      ))}

      {/* 2. Spacious Intermediate Grand Landing at y = 1.98, z = 4.8 */}
      <group position={[0, 1.98, 4.8]}>
        {/* Main Landing Riser Slab */}
        <mesh material={carvedIceMaterial} castShadow receiveShadow>
          <boxGeometry args={[7.0, 0.26, 1.3]} />
        </mesh>
        {/* Nosing Lip along landing front edge */}
        <mesh position={[0, 0.12, 0.67]} material={iceTrimMaterial} castShadow receiveShadow>
          <boxGeometry args={[7.1, 0.06, 0.08]} />
        </mesh>
        {/* Crisp Snow Surface */}
        <mesh position={[0, 0.14, 0]} material={snowMaterial} receiveShadow>
          <boxGeometry args={[6.8, 0.025, 1.2]} />
        </mesh>
        {/* Inset Decorative Geometric Ice Medallion on landing center */}
        <mesh position={[0, 0.145, 0]} rotation={[0, 0, Math.PI / 4]} material={crystalShardMaterial}>
          <boxGeometry args={[0.9, 0.9, 0.01]} />
        </mesh>
      </group>

      {/* 3. Upper Flight Steps with Overhanging Crystalline Nosings */}
      {upperSteps.map((s, idx) => (
        <group key={`upper-step-${idx}`} position={s.pos}>
          {/* Main Chiseled Riser Block */}
          <mesh material={carvedIceMaterial} castShadow receiveShadow>
            <boxGeometry args={[s.width, s.riserH, s.treadD]} />
          </mesh>

          {/* Projecting Crystalline Nosing Lip */}
          <mesh
            position={[0, s.riserH / 2 - 0.02, s.treadD / 2 + 0.025]}
            material={iceTrimMaterial}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[s.width + 0.05, 0.06, 0.07]} />
          </mesh>

          {/* Inset Snow Tread */}
          <mesh
            position={[0, s.riserH / 2 + 0.015, -0.01]}
            material={snowMaterial}
            receiveShadow
          >
            <boxGeometry args={[s.width - 0.1, 0.025, s.treadD - 0.04]} />
          </mesh>
        </group>
      ))}

      {/* 4. Upper Entrance Terrace Threshold at y = 3.45, z = 0.3 */}
      <group position={[0, 3.45, 0.3]}>
        <mesh material={carvedIceMaterial} castShadow receiveShadow>
          <boxGeometry args={[8.0, 0.30, 1.6]} />
        </mesh>
        <mesh position={[0, 0.14, 0.82]} material={iceTrimMaterial} castShadow receiveShadow>
          <boxGeometry args={[8.1, 0.06, 0.08]} />
        </mesh>
        <mesh position={[0, 0.16, 0]} material={snowMaterial} receiveShadow>
          <boxGeometry args={[7.8, 0.025, 1.5]} />
        </mesh>
      </group>

      {/* 5. Crystalline Stair Railings, Stringers & Diamond-Turned Balustrades */}
      {[-1, 1].map((side) => {
        const xLower = side * 3.85;
        const xUpper = side * 3.35;

        return (
          <group key={`stair-balustrade-side-${side}`}>
            {/* Lower Flight Stringer Beam (carrying steps beneath railing) */}
            <mesh
              position={[xLower - side * 0.15, 1.15, 7.3]}
              rotation={[-0.43, 0, 0]}
              material={carvedIceMaterial}
              castShadow
            >
              <boxGeometry args={[0.35, 0.45, 4.9]} />
            </mesh>

            {/* Lower Handrail (Faceted Hexagonal Profile) */}
            <mesh
              position={[xLower, 1.85, 7.3]}
              rotation={[-0.43, 0, 0]}
              material={iceTrimMaterial}
              castShadow
            >
              <cylinderGeometry args={[0.14, 0.16, 4.9, 6]} />
            </mesh>
            {/* Snow Cap on Handrail */}
            <mesh
              position={[xLower, 1.98, 7.3]}
              rotation={[-0.43, 0, 0]}
              material={snowMaterial}
              receiveShadow
            >
              <boxGeometry args={[0.22, 0.05, 4.9]} />
            </mesh>

            {/* Diamond-Turned Crystalline Balusters along Lower Flight */}
            {[9.0, 8.2, 7.4, 6.6, 5.8].map((zPos, bIdx) => {
              const yPos = 0.85 + (9.5 - zPos) * 0.37;
              return (
                <group key={`bal-lower-${side}-${bIdx}`} position={[xLower, yPos, zPos]}>
                  {/* Lower Taper Shaft */}
                  <mesh position={[0, -0.22, 0]} material={carvedIceMaterial} castShadow>
                    <cylinderGeometry args={[0.07, 0.11, 0.45, 6]} />
                  </mesh>
                  {/* Central Sparkling Diamond Node */}
                  <mesh rotation={[0, (bIdx * Math.PI) / 4, 0]} material={crystalShardMaterial}>
                    <boxGeometry args={[0.18, 0.18, 0.18]} />
                  </mesh>
                  {/* Upper Taper Shaft */}
                  <mesh position={[0, 0.22, 0]} material={carvedIceMaterial} castShadow>
                    <cylinderGeometry args={[0.11, 0.07, 0.45, 6]} />
                  </mesh>
                </group>
              );
            })}

            {/* Mid Landing Rail & Newel Post */}
            <mesh
              position={[side * 3.6, 2.58, 4.8]}
              material={iceTrimMaterial}
              castShadow
            >
              <boxGeometry args={[0.28, 0.26, 1.35]} />
            </mesh>
            <mesh
              position={[side * 3.6, 2.73, 4.8]}
              material={snowMaterial}
              receiveShadow
            >
              <boxGeometry args={[0.26, 0.05, 1.35]} />
            </mesh>

            {/* Mid Landing Newel Post (Octagonal Pillar with Finial) */}
            <group position={[side * 3.8, 2.7, 4.8]}>
              <mesh material={carvedIceMaterial} castShadow>
                <cylinderGeometry args={[0.22, 0.26, 1.6, 8]} />
              </mesh>
              <mesh position={[0, 0.85, 0]} material={iceTrimMaterial}>
                <boxGeometry args={[0.34, 0.14, 0.34]} />
              </mesh>
              <mesh position={[0, 1.45, 0]} material={crystalShardMaterial} castShadow>
                <coneGeometry args={[0.25, 1.1, 6]} />
              </mesh>
              <mesh position={[0, 2.1, 0]} material={glowingIceMaterial}>
                <coneGeometry args={[0.12, 0.5, 6]} />
              </mesh>
            </group>

            {/* Upper Flight Stringer Beam */}
            <mesh
              position={[xUpper - side * 0.15, 2.78, 2.65]}
              rotation={[-0.52, 0, 0]}
              material={carvedIceMaterial}
              castShadow
            >
              <boxGeometry args={[0.35, 0.45, 3.9]} />
            </mesh>

            {/* Upper Handrail */}
            <mesh
              position={[xUpper, 3.48, 2.65]}
              rotation={[-0.52, 0, 0]}
              material={iceTrimMaterial}
              castShadow
            >
              <cylinderGeometry args={[0.14, 0.16, 3.9, 6]} />
            </mesh>
            <mesh
              position={[xUpper, 3.61, 2.65]}
              rotation={[-0.52, 0, 0]}
              material={snowMaterial}
              receiveShadow
            >
              <boxGeometry args={[0.22, 0.05, 3.9]} />
            </mesh>

            {/* Diamond-Turned Balusters along Upper Flight */}
            {[4.0, 3.2, 2.4, 1.6, 0.8].map((zPos, bIdx) => {
              const yPos = 2.45 + (4.4 - zPos) * 0.44;
              return (
                <group key={`bal-upper-${side}-${bIdx}`} position={[xUpper, yPos, zPos]}>
                  <mesh position={[0, -0.22, 0]} material={carvedIceMaterial} castShadow>
                    <cylinderGeometry args={[0.07, 0.11, 0.45, 6]} />
                  </mesh>
                  <mesh rotation={[0, (bIdx * Math.PI) / 4, 0]} material={crystalShardMaterial}>
                    <boxGeometry args={[0.18, 0.18, 0.18]} />
                  </mesh>
                  <mesh position={[0, 0.22, 0]} material={carvedIceMaterial} castShadow>
                    <cylinderGeometry args={[0.11, 0.07, 0.45, 6]} />
                  </mesh>
                </group>
              );
            })}

            {/* Top Terrace Terminal Newel Post */}
            <group position={[side * 3.5, 4.2, 0.6]}>
              <mesh material={carvedIceMaterial} castShadow>
                <cylinderGeometry args={[0.24, 0.28, 1.6, 8]} />
              </mesh>
              <mesh position={[0, 0.85, 0]} material={iceTrimMaterial}>
                <boxGeometry args={[0.36, 0.14, 0.36]} />
              </mesh>
              <mesh position={[0, 1.55, 0]} material={crystalShardMaterial} castShadow>
                <coneGeometry args={[0.28, 1.3, 6]} />
              </mesh>
              <mesh position={[0, 2.3, 0]} material={glowingIceMaterial}>
                <coneGeometry args={[0.14, 0.6, 6]} />
              </mesh>
            </group>

            {/* MONUMENTAL CRYSTAL SENTINELS AT FOOT OF STAIRS (Iconic Reference 1 Gatekeepers) */}
            <group position={[side * 4.65, 0.3, 9.8]}>
              {/* Stepped Octagonal Plinth */}
              <mesh position={[0, 0.25, 0]} material={carvedIceMaterial} castShadow receiveShadow>
                <cylinderGeometry args={[0.85, 1.05, 0.5, 8]} />
              </mesh>
              <mesh position={[0, 0.52, 0]} material={iceTrimMaterial}>
                <cylinderGeometry args={[0.9, 0.85, 0.08, 8]} />
              </mesh>

              {/* Primary Colossal Towering Crystal Shard Column */}
              <mesh position={[0, 2.8, 0]} material={crystalShardMaterial} castShadow>
                <cylinderGeometry args={[0.16, 0.78, 5.2, 6]} />
              </mesh>
              {/* Pyramid Apex Tip */}
              <mesh position={[0, 5.8, 0]} material={glowingIceMaterial}>
                <coneGeometry args={[0.42, 1.8, 6]} />
              </mesh>

              {/* Secondary Tilted Shard (Tilted outward) */}
              <mesh
                position={[side * 0.75, 1.8, 0.4]}
                rotation={[0.18, 0, side * 0.32]}
                material={crystalShardMaterial}
                castShadow
              >
                <cylinderGeometry args={[0.12, 0.55, 3.6, 6]} />
              </mesh>
              <mesh
                position={[side * 0.75, 3.8, 0.4]}
                rotation={[0.18, 0, side * 0.32]}
                material={glowingIceMaterial}
              >
                <coneGeometry args={[0.3, 1.2, 6]} />
              </mesh>

              {/* Third Shard (Tilted forward-inward) */}
              <mesh
                position={[-side * 0.48, 1.2, 0.55]}
                rotation={[0.26, 0, -side * 0.16]}
                material={crystalShardMaterial}
                castShadow
              >
                <cylinderGeometry args={[0.09, 0.45, 2.6, 6]} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
};
