import React from 'react';
import {
  wallIceMaterial,
  towerFacetMaterial,
  carvedIceMaterial,
  spireIceMaterial,
  iceTrimMaterial,
  insetPanelMaterial,
  windowRecessMaterial,
  crystallineAccentMaterial,
  glowingIceMaterial,
  crystalShardMaterial,
} from '../Materials/IceMaterial';

export const CentralSpire: React.FC = () => {
  return (
    <group position={[0, 3.2, -4.8]}>
      {/* 1. Monumental Base Keep / Great Hall (y = 0 to 11.0) */}
      <group position={[0, 5.5, 0]}>
        {/* Main Octagonal Great Keep Body - Deep Glacial Sapphire */}
        <mesh material={wallIceMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[3.6, 4.4, 11.0, 8]} />
        </mesh>

        {/* 8 Clustered Pilaster Buttresses along the octagonal corners */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI) / 4;
          const r = 4.05;
          const x = Math.sin(angle) * r;
          const z = Math.cos(angle) * r;
          return (
            <group key={`keep-clustered-buttress-${i}`} position={[x, 0, z]} rotation={[0, angle, 0]}>
              {/* Central Spine Rib */}
              <mesh material={iceTrimMaterial} castShadow>
                <boxGeometry args={[0.32, 11.0, 0.42]} />
              </mesh>
              {/* Flanking Colonnette Shafts */}
              <mesh position={[-0.22, 0, -0.06]} material={carvedIceMaterial} castShadow>
                <cylinderGeometry args={[0.1, 0.12, 11.0, 6]} />
              </mesh>
              <mesh position={[0.22, 0, -0.06]} material={carvedIceMaterial} castShadow>
                <cylinderGeometry args={[0.1, 0.12, 11.0, 6]} />
              </mesh>
              {/* Chamfered Foot Plinth */}
              <mesh position={[0, -5.2, 0.08]} material={iceTrimMaterial}>
                <boxGeometry args={[0.54, 0.6, 0.54]} />
              </mesh>
              {/* Top Bracket Capital */}
              <mesh position={[0, 5.2, 0.08]} material={crystalShardMaterial} castShadow>
                <boxGeometry args={[0.48, 0.6, 0.48]} />
              </mesh>
            </group>
          );
        })}

        {/* 8 Recessed Pointed Gothic Lancet Panels with Inset Frost Tracery (On each octagonal face) */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI) / 4 + Math.PI / 8;
          const r = 3.82;
          const x = Math.sin(angle) * r;
          const z = Math.cos(angle) * r;
          // Skip front faces that intersect the monumental entrance portal
          if (z > 2.0) return null;

          return (
            <group key={`keep-lancet-panel-${i}`} position={[x, 0.4, z]} rotation={[0, angle, 0]}>
              {/* Inset Deep Shadow Panel */}
              <mesh material={windowRecessMaterial}>
                <boxGeometry args={[1.5, 6.4, 0.14]} />
              </mesh>
              <mesh position={[0, 0, 0.04]} material={insetPanelMaterial}>
                <boxGeometry args={[1.3, 6.0, 0.08]} />
              </mesh>
              {/* Moulded Lancet Frame */}
              <mesh position={[-0.72, 0, 0.06]} material={iceTrimMaterial} castShadow>
                <boxGeometry args={[0.12, 6.4, 0.16]} />
              </mesh>
              <mesh position={[0.72, 0, 0.06]} material={iceTrimMaterial} castShadow>
                <boxGeometry args={[0.12, 6.4, 0.16]} />
              </mesh>
              {/* Pointed Arch Rib Heads */}
              <mesh
                position={[-0.38, 3.6, 0.06]}
                rotation={[0, 0, -0.65]}
                material={iceTrimMaterial}
                castShadow
              >
                <boxGeometry args={[0.12, 1.2, 0.16]} />
              </mesh>
              <mesh
                position={[0.38, 3.6, 0.06]}
                rotation={[0, 0, 0.65]}
                material={iceTrimMaterial}
                castShadow
              >
                <boxGeometry args={[0.12, 1.2, 0.16]} />
              </mesh>
              {/* Central Glazed Slit & Trefoil Tracery */}
              <mesh position={[0, 0, 0.04]} material={carvedIceMaterial}>
                <boxGeometry args={[0.32, 5.2, 0.08]} />
              </mesh>
              <mesh position={[0, 2.4, 0.08]} rotation={[0, 0, Math.PI / 4]} material={crystalShardMaterial}>
                <boxGeometry args={[0.36, 0.36, 0.1]} />
              </mesh>
            </group>
          );
        })}

        {/* Carved Machicolation Corbel Table (Beneath Parapet) */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI) / 4 + Math.PI / 8;
          const r = 3.9;
          const x = Math.sin(angle) * r;
          const z = Math.cos(angle) * r;
          return (
            <group key={`keep-corbel-${i}`} position={[x, 5.1, z]} rotation={[0, angle, 0]}>
              {[-0.6, 0, 0.6].map((cx, cIdx) => (
                <mesh key={`c-bracket-${cIdx}`} position={[cx, 0, 0.12]} material={iceTrimMaterial} castShadow>
                  <boxGeometry args={[0.16, 0.65, 0.35]} />
                </mesh>
              ))}
            </group>
          );
        })}

        {/* Heavy Crystalline Balcony Corbel Cornice */}
        <mesh position={[0, 5.65, 0]} material={carvedIceMaterial} castShadow>
          <cylinderGeometry args={[4.25, 3.7, 0.65, 8]} />
        </mesh>
        <mesh position={[0, 5.95, 0]} material={iceTrimMaterial} receiveShadow>
          <cylinderGeometry args={[4.32, 4.22, 0.12, 8]} />
        </mesh>
      </group>

      {/* 2. Middle Crystalline Tier with Layered Pointed Gables (y = 11.0 to 18.0) */}
      <group position={[0, 11.0, 0]}>
        {/* Stepped Tower Body (Reflective Glacial Blue) */}
        <mesh position={[0, 3.5, 0]} material={towerFacetMaterial} castShadow>
          <cylinderGeometry args={[2.7, 3.4, 7.0, 8]} />
        </mesh>

        {/* Upper Cornice Shelf */}
        <mesh position={[0, 7.0, 0]} material={carvedIceMaterial} castShadow>
          <cylinderGeometry args={[3.05, 2.55, 0.55, 8]} />
        </mesh>
        <mesh position={[0, 7.28, 0]} material={iceTrimMaterial}>
          <cylinderGeometry args={[3.12, 3.02, 0.1, 8]} />
        </mesh>

        {/* 4 Cardinal Gables with Nested Relief & Inset Quatrefoil Tracery */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => {
          const r = 2.85;
          const x = Math.sin(angle) * r;
          const z = Math.cos(angle) * r;
          return (
            <group key={`mid-layered-gable-${idx}`} position={[x, 4.2, z]} rotation={[0, angle, 0]}>
              {/* Outer Gable Moulding */}
              <mesh rotation={[0, 0, Math.PI / 4]} material={carvedIceMaterial} castShadow>
                <boxGeometry args={[2.0, 2.0, 0.65]} />
              </mesh>
              {/* Inset Gable Shadow Panel */}
              <mesh position={[0, 0, 0.18]} rotation={[0, 0, Math.PI / 4]} material={insetPanelMaterial}>
                <boxGeometry args={[1.5, 1.5, 0.1]} />
              </mesh>
              {/* Frost Trim Gable Edge */}
              <mesh position={[0, 0, 0.28]} rotation={[0, 0, Math.PI / 4]} material={iceTrimMaterial} castShadow>
                <boxGeometry args={[1.2, 1.2, 0.12]} />
              </mesh>
              {/* Inset Quatrefoil Crystal Rose */}
              <mesh position={[0, 0, 0.35]} rotation={[0, 0, 0]} material={crystalShardMaterial}>
                <boxGeometry args={[0.42, 0.42, 0.14]} />
              </mesh>
              {/* Soaring Pinnacle Needle crowned on gable apex */}
              <mesh position={[0, 2.4, 0.18]} material={spireIceMaterial} castShadow>
                <coneGeometry args={[0.32, 3.4, 6]} />
              </mesh>
              <mesh position={[0, 4.2, 0.18]} material={crystalShardMaterial}>
                <coneGeometry args={[0.14, 1.2, 6]} />
              </mesh>
            </group>
          );
        })}

        {/* 4 Diagonal Bartizans / Corner Turrets springing from carved corbels */}
        {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map((angle, idx) => {
          const r = 3.15;
          const x = Math.sin(angle) * r;
          const z = Math.cos(angle) * r;
          return (
            <group key={`mid-bartizan-${idx}`} position={[x, 3.8, z]}>
              {/* Conical Corbel Support */}
              <mesh position={[0, -1.2, 0]} material={carvedIceMaterial} castShadow>
                <coneGeometry args={[0.45, 1.4, 6]} />
              </mesh>
              {/* Turret Shaft */}
              <mesh position={[0, 0.4, 0]} material={spireIceMaterial} castShadow>
                <cylinderGeometry args={[0.38, 0.42, 2.2, 6]} />
              </mesh>
              {/* Turret Needle Spire */}
              <mesh position={[0, 2.4, 0]} material={crystalShardMaterial} castShadow>
                <coneGeometry args={[0.34, 3.0, 6]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 3. Upper Transition Belfry Tier (y = 18.0 to 23.5) - Glacial Azure & Lancet Drum */}
      <group position={[0, 18.0, 0]}>
        <mesh position={[0, 2.7, 0]} material={spireIceMaterial} castShadow>
          <cylinderGeometry args={[1.8, 2.6, 5.4, 8]} />
        </mesh>

        {/* 8 Open Lancet Niches around the drum */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI) / 4;
          const r = 2.15;
          const x = Math.sin(angle) * r;
          const z = Math.cos(angle) * r;
          return (
            <group key={`drum-niche-${i}`} position={[x, 2.6, z]} rotation={[0, angle, 0]}>
              <mesh material={windowRecessMaterial}>
                <boxGeometry args={[0.55, 3.2, 0.18]} />
              </mesh>
              <mesh position={[0, 0, 0.05]} material={crystallineAccentMaterial}>
                <boxGeometry args={[0.22, 2.6, 0.1]} />
              </mesh>
            </group>
          );
        })}

        {/* 4 Diagonal Flying Needle Shards hugging the upper spire base */}
        {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map((angle, idx) => {
          const r = 2.25;
          const x = Math.sin(angle) * r;
          const z = Math.cos(angle) * r;
          return (
            <group key={`upper-needle-${idx}`} position={[x, 2.4, z]}>
              <mesh material={crystalShardMaterial} castShadow>
                <coneGeometry args={[0.35, 5.8, 6]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 4. Colossal Monumental Needle Crown (y = 23.5 to 38.5) - Dominates the entire sky! */}
      <group position={[0, 23.5, 0]}>
        {/* Soaring Primary Octagonal Crystal Spire */}
        <mesh position={[0, 7.5, 0]} material={spireIceMaterial} castShadow>
          <coneGeometry args={[1.85, 15.0, 8]} />
        </mesh>

        {/* Spire Mid-Belt Crystalline Ring Collar */}
        <mesh position={[0, 6.0, 0]} material={iceTrimMaterial} castShadow>
          <cylinderGeometry args={[1.25, 1.4, 0.35, 8]} />
        </mesh>
        <mesh position={[0, 10.5, 0]} material={crystalShardMaterial} castShadow>
          <cylinderGeometry args={[0.75, 0.9, 0.28, 8]} />
        </mesh>

        {/* Internal Glowing Ice Luminescence Core */}
        <mesh position={[0, 5.0, 0]} material={glowingIceMaterial}>
          <cylinderGeometry args={[0.65, 1.2, 9.5, 6]} />
        </mesh>

        {/* Internal Spire Cyan Light Core */}
        <pointLight
          position={[0, 7.5, 0]}
          color="#38bdf8"
          intensity={8.0}
          distance={24.0}
          decay={2}
        />
        
        {/* Upper Violet Spire Tip Light */}
        <pointLight
          position={[0, 14.5, 0]}
          color="#c084fc"
          intensity={5.0}
          distance={18.0}
          decay={2}
        />

        {/* Ultra-Sharp Apex Pinnacle Needle */}
        <mesh position={[0, 15.8, 0]} material={glowingIceMaterial}>
          <coneGeometry args={[0.26, 3.8, 6]} />
        </mesh>

        {/* 4 Cardinal Crystalline Flutes / Ridge Shards along the spire with stepped nodes */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => {
          const x = Math.sin(angle) * 1.05;
          const z = Math.cos(angle) * 1.05;
          return (
            <group key={`spire-flute-group-${idx}`} position={[x, 5.2, z]}>
              <mesh
                rotation={[0.07 * Math.cos(angle), angle, -0.07 * Math.sin(angle)]}
                material={crystalShardMaterial}
                castShadow
              >
                <coneGeometry args={[0.24, 8.5, 6]} />
              </mesh>
              {/* Stepped Crystal Node */}
              <mesh position={[0, 1.8, 0]} rotation={[0, angle, 0]} material={iceTrimMaterial}>
                <boxGeometry args={[0.22, 0.6, 0.22]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};
