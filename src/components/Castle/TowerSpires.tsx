import React from 'react';
import {
  towerFacetMaterial,
  carvedIceMaterial,
  spireIceMaterial,
  iceTrimMaterial,
  insetPanelMaterial,
  windowRecessMaterial,
  crystalShardMaterial,
  crystallineAccentMaterial,
  glowingIceMaterial,
} from '../Materials/IceMaterial';

interface TowerDef {
  x: number;
  z: number;
  baseHeight: number;
  spireHeight: number;
  radius: number;
  facets: number;
  key: string;
}

export const TowerSpires: React.FC = () => {
  // Symmetrical stepped tower layout harmonized with the enlarged castle keep
  const towers: TowerDef[] = [
    // 1. Primary Flanking Towers (Left & Right of Main Keep)
    { x: -5.6, z: -4.5, baseHeight: 14.5, spireHeight: 11.0, radius: 1.85, facets: 8, key: 'flank-left' },
    { x: 5.6, z: -4.5, baseHeight: 14.5, spireHeight: 11.0, radius: 1.85, facets: 8, key: 'flank-right' },

    // 2. Front Corner Spires (Left & Right of Portal Terrace)
    { x: -6.4, z: 0.8, baseHeight: 10.0, spireHeight: 8.5, radius: 1.45, facets: 6, key: 'corner-front-left' },
    { x: 6.4, z: 0.8, baseHeight: 10.0, spireHeight: 8.5, radius: 1.45, facets: 6, key: 'corner-front-right' },

    // 3. Rear Bastion Towers (Depth in 3/4 Miniature Mode)
    { x: -5.0, z: -9.8, baseHeight: 12.5, spireHeight: 9.5, radius: 1.65, facets: 6, key: 'bastion-rear-left' },
    { x: 5.0, z: -9.8, baseHeight: 12.5, spireHeight: 9.5, radius: 1.65, facets: 6, key: 'bastion-rear-right' },

    // 4. Central Rear Keep Spire
    { x: 0.0, z: -10.6, baseHeight: 14.0, spireHeight: 10.5, radius: 1.95, facets: 8, key: 'rear-center' },
  ];

  return (
    <group position={[0, 3.2, 0]}>
      {towers.map((t) => {
        // Angles for decorative facets and pointed arch windows
        const facetAngles = Array.from({ length: t.facets }, (_, i) => (i * 2 * Math.PI) / t.facets);

        return (
          <group key={t.key} position={[t.x, 0, t.z]}>
            {/* 1. Multi-Tiered Chamfered Plinth Base */}
            <mesh position={[0, 0.3, 0]} material={carvedIceMaterial} castShadow receiveShadow>
              <cylinderGeometry args={[t.radius * 1.08, t.radius * 1.32, 0.6, t.facets]} />
            </mesh>
            <mesh position={[0, 0.65, 0]} material={iceTrimMaterial}>
              <cylinderGeometry args={[t.radius * 1.02, t.radius * 1.10, 0.12, t.facets]} />
            </mesh>

            {/* 2. Tower Main Shaft Body (Reflective Glacial Blue Prism) */}
            <mesh
              position={[0, t.baseHeight / 2 + 0.35, 0]}
              material={towerFacetMaterial}
              castShadow
              receiveShadow
            >
              <cylinderGeometry args={[t.radius * 0.90, t.radius, t.baseHeight - 0.7, t.facets]} />
            </mesh>

            {/* 3. Stepped Corner Pilaster Ribs running vertically along every facet edge */}
            {facetAngles.map((angle, eIdx) => {
              const edgeAngle = angle + Math.PI / t.facets;
              const rBottom = t.radius * 1.01;
              const rTop = t.radius * 0.91;
              const midR = (rBottom + rTop) / 2;
              const ex = Math.sin(edgeAngle) * midR;
              const ez = Math.cos(edgeAngle) * midR;
              return (
                <group key={`edge-rib-${t.key}-${eIdx}`} position={[ex, t.baseHeight / 2 + 0.35, ez]} rotation={[0, edgeAngle, 0]}>
                  {/* Vertical Ice Trim Rib */}
                  <mesh material={iceTrimMaterial} castShadow>
                    <boxGeometry args={[0.12, t.baseHeight - 0.9, 0.18]} />
                  </mesh>
                  {/* Decorative mid-height ring node */}
                  <mesh position={[0, 0, 0.05]} material={crystallineAccentMaterial}>
                    <boxGeometry args={[0.18, 0.35, 0.15]} />
                  </mesh>
                </group>
              );
            })}

            {/* 4. Layered Pointed Gothic Arches & Window-Like Recesses */}
            {facetAngles.map((angle, fIdx) => {
              // Position slightly outside the facet face
              const midR = t.radius * 0.92;
              const wx = Math.sin(angle) * midR;
              const wz = Math.cos(angle) * midR;

              // Two vertical window tiers for tall towers, one for shorter corner spires
              const windowTiers = t.baseHeight > 11.5
                ? [t.baseHeight * 0.38, t.baseHeight * 0.72]
                : [t.baseHeight * 0.52];

              return (
                <group key={`facet-windows-${t.key}-${fIdx}`}>
                  {windowTiers.map((wy, wIdx) => (
                    <group
                      key={`win-${t.key}-${fIdx}-${wIdx}`}
                      position={[wx, wy, wz]}
                      rotation={[0, angle, 0]}
                    >
                      {/* Deep Inset Shadow Panel Cavity */}
                      <mesh material={windowRecessMaterial}>
                        <boxGeometry args={[0.55 * (t.radius / 1.8), 2.2 * (t.radius / 1.8), 0.14]} />
                      </mesh>

                      {/* Recessed Glacial Glass Reveal */}
                      <mesh position={[0, 0, 0.03]} material={insetPanelMaterial}>
                        <boxGeometry args={[0.38 * (t.radius / 1.8), 1.9 * (t.radius / 1.8), 0.08]} />
                      </mesh>

                      {/* Moulded Left & Right Arch Jamb Ribs */}
                      <mesh position={[-0.30 * (t.radius / 1.8), 0, 0.06]} material={iceTrimMaterial} castShadow>
                        <boxGeometry args={[0.07, 2.0 * (t.radius / 1.8), 0.12]} />
                      </mesh>
                      <mesh position={[0.30 * (t.radius / 1.8), 0, 0.06]} material={iceTrimMaterial} castShadow>
                        <boxGeometry args={[0.07, 2.0 * (t.radius / 1.8), 0.12]} />
                      </mesh>

                      {/* Angled Pointed Arch Rib Heads */}
                      <mesh
                        position={[-0.15 * (t.radius / 1.8), 1.15 * (t.radius / 1.8), 0.06]}
                        rotation={[0, 0, -0.62]}
                        material={iceTrimMaterial}
                        castShadow
                      >
                        <boxGeometry args={[0.07, 0.55 * (t.radius / 1.8), 0.12]} />
                      </mesh>
                      <mesh
                        position={[0.15 * (t.radius / 1.8), 1.15 * (t.radius / 1.8), 0.06]}
                        rotation={[0, 0, 0.62]}
                        material={iceTrimMaterial}
                        castShadow
                      >
                        <boxGeometry args={[0.07, 0.55 * (t.radius / 1.8), 0.12]} />
                      </mesh>

                      {/* Inset Crystalline Diamond Lozenge / Tracery Rosette */}
                      <mesh
                        position={[0, 0.2, 0.07]}
                        rotation={[0, 0, Math.PI / 4]}
                        material={crystallineAccentMaterial}
                      >
                        <boxGeometry args={[0.18 * (t.radius / 1.8), 0.18 * (t.radius / 1.8), 0.07]} />
                      </mesh>

                      {/* Central Glazed Mullion Slit */}
                      <mesh position={[0, -0.4, 0.06]} material={carvedIceMaterial}>
                        <boxGeometry args={[0.06, 0.9 * (t.radius / 1.8), 0.06]} />
                      </mesh>
                    </group>
                  ))}
                </group>
              );
            })}

            {/* 5. Machicolation Corbel Table beneath Cornice */}
            {facetAngles.map((cAngle, cIdx) => {
              const cx = Math.sin(cAngle) * (t.radius * 0.96);
              const cz = Math.cos(cAngle) * (t.radius * 0.96);
              return (
                <group key={`t-corbel-${t.key}-${cIdx}`} position={[cx, t.baseHeight - 0.45, cz]} rotation={[0, cAngle, 0]}>
                  <mesh material={iceTrimMaterial} castShadow>
                    <boxGeometry args={[0.22, 0.58, 0.32]} />
                  </mesh>
                  {/* Stepped drop bracket */}
                  <mesh position={[0, -0.32, -0.04]} material={carvedIceMaterial}>
                    <boxGeometry args={[0.14, 0.28, 0.20]} />
                  </mesh>
                </group>
              );
            })}

            {/* 6. Moulded Balcony Cornice Table */}
            <mesh position={[0, t.baseHeight - 0.1, 0]} material={carvedIceMaterial} castShadow>
              <cylinderGeometry args={[t.radius * 1.22, t.radius * 0.92, 0.45, t.facets]} />
            </mesh>
            <mesh position={[0, t.baseHeight + 0.18, 0]} material={iceTrimMaterial}>
              <cylinderGeometry args={[t.radius * 1.26, t.radius * 1.20, 0.12, t.facets]} />
            </mesh>

            {/* 7. Pierced Crystalline Parapet Crenellations */}
            {facetAngles.map((pAngle, pIdx) => {
              const px = Math.sin(pAngle) * (t.radius * 1.18);
              const pz = Math.cos(pAngle) * (t.radius * 1.18);
              return (
                <group key={`parapet-${t.key}-${pIdx}`} position={[px, t.baseHeight + 0.45, pz]} rotation={[0, pAngle, 0]}>
                  <mesh material={iceTrimMaterial} castShadow>
                    <boxGeometry args={[0.32 * (t.radius / 1.8), 0.45, 0.18]} />
                  </mesh>
                  <mesh position={[0, 0.32, 0]} material={crystallineAccentMaterial} castShadow>
                    <coneGeometry args={[0.14, 0.35, 4]} />
                  </mesh>
                </group>
              );
            })}

            {/* 8. Crystalline Spire Cap with Layered Pediment Gables */}
            <group position={[0, t.baseHeight + 0.35, 0]}>
              {/* Stepped Transition Collar */}
              <mesh position={[0, 0.22, 0]} material={iceTrimMaterial} castShadow>
                <cylinderGeometry args={[t.radius * 0.92, t.radius * 1.16, 0.42, t.facets]} />
              </mesh>

              {/* Cardinal Pointed Wimperg Gables framing Spire Base */}
              {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((gAngle, gIdx) => {
                const gx = Math.sin(gAngle) * (t.radius * 0.96);
                const gz = Math.cos(gAngle) * (t.radius * 0.96);
                return (
                  <group key={`gable-${t.key}-${gIdx}`} position={[gx, 0.7, gz]} rotation={[0, gAngle, 0]}>
                    {/* Triangular Gable Moulding */}
                    <mesh rotation={[0, 0, Math.PI / 4]} material={carvedIceMaterial} castShadow>
                      <boxGeometry args={[0.7 * (t.radius / 1.8), 0.7 * (t.radius / 1.8), 0.22]} />
                    </mesh>
                    <mesh position={[0, 0, 0.08]} rotation={[0, 0, Math.PI / 4]} material={insetPanelMaterial}>
                      <boxGeometry args={[0.5 * (t.radius / 1.8), 0.5 * (t.radius / 1.8), 0.08]} />
                    </mesh>
                    {/* Gable Apex Pinnacle Needle */}
                    <mesh position={[0, 0.75 * (t.radius / 1.8), 0.05]} material={crystalShardMaterial} castShadow>
                      <coneGeometry args={[0.12, 1.2, 5]} />
                    </mesh>
                  </group>
                );
              })}

              {/* Main Sharp Crystalline Spire Cone (Glacial Azure) */}
              <mesh
                position={[0, t.spireHeight / 2 + 0.45, 0]}
                material={spireIceMaterial}
                castShadow
              >
                <coneGeometry args={[t.radius * 1.02, t.spireHeight, t.facets]} />
              </mesh>

              {/* Mid-Spire Crystalline Ring Collar */}
              <mesh position={[0, t.spireHeight * 0.55 + 0.45, 0]} material={iceTrimMaterial} castShadow>
                <cylinderGeometry args={[t.radius * 0.52, t.radius * 0.58, 0.18, t.facets]} />
              </mesh>

              {/* Glowing Needle Pinnacle Apex */}
              <mesh
                position={[0, t.spireHeight + 0.75, 0]}
                material={glowingIceMaterial}
              >
                <coneGeometry args={[0.20, 1.8, 6]} />
              </mesh>
              <mesh
                position={[0, t.spireHeight + 1.7, 0]}
                material={crystalShardMaterial}
              >
                <coneGeometry args={[0.08, 0.8, 4]} />
              </mesh>

              {/* Flanking Crystal Needles along Tower Balcony corners */}
              {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, bIdx) => {
                const bx = Math.sin(angle) * (t.radius * 1.15);
                const bz = Math.cos(angle) * (t.radius * 1.15);
                return (
                  <group key={`barb-${t.key}-${bIdx}`} position={[bx, 1.25, bz]}>
                    <mesh
                      rotation={[0.18 * Math.sin(angle), 0, 0.18 * Math.cos(angle)]}
                      material={crystalShardMaterial}
                      castShadow
                    >
                      <coneGeometry args={[0.22, 2.8, 5]} />
                    </mesh>
                    <mesh position={[0, 1.3, 0]} material={iceTrimMaterial}>
                      <boxGeometry args={[0.14, 0.35, 0.14]} />
                    </mesh>
                  </group>
                );
              })}
            </group>
          </group>
        );
      })}
    </group>
  );
};
