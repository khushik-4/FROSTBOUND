import React, { useMemo } from 'react';
import * as THREE from 'three';
import { snowMaterial } from '../Materials/IceMaterial';
import type { CameraMode } from '../../types';

const trunkMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#0f1722'),
  roughness: 0.95,
  flatShading: true,
});

// Deep glacial alpine needle tone
const needleDarkMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#10222e'),
  roughness: 0.88,
  flatShading: true,
});

// Slightly frosted alpine spruce tone for variety
const needleFrostMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#162b3a'),
  roughness: 0.85,
  flatShading: true,
});

type TreeArchetype = 'tall-spruce' | 'mountain-fir' | 'alpine-cedar' | 'foothill-sapling';
type SnowCoverage = 'light' | 'medium' | 'heavy';

interface TreeDef {
  pos: [number, number, number];
  scale: [number, number, number];
  rot: [number, number, number];
  archetype: TreeArchetype;
  snow: SnowCoverage;
}

interface PineTreesProps {
  mode?: CameraMode;
}

export const PineTrees: React.FC<PineTreesProps> = ({ mode = 'visitor' }) => {
  // Organically sculpted alpine pine groves with varied heights, silhouettes, and snow loads
  const trees = useMemo<TreeDef[]>(() => {
    const list: TreeDef[] = [
      // 1. Left Foreground Cluster (Rich variety: tall spruce, broad fir, small sapling)
      { pos: [-10.5, 0.45, 9.2], scale: [1.5, 2.2, 1.5], rot: [0.03, 0.4, -0.02], archetype: 'tall-spruce', snow: 'medium' },
      { pos: [-12.4, 0.65, 10.0], scale: [2.1, 1.65, 2.1], rot: [-0.03, 1.2, 0.04], archetype: 'mountain-fir', snow: 'heavy' },
      { pos: [-8.8, 0.38, 10.4], scale: [0.95, 1.05, 0.95], rot: [0.04, 2.1, -0.03], archetype: 'foothill-sapling', snow: 'light' },

      // 2. Left Lower-Mid Valley Grove
      { pos: [-8.6, 0.5, 7.2], scale: [1.35, 1.85, 1.35], rot: [-0.03, 0.8, 0.02], archetype: 'alpine-cedar', snow: 'medium' },
      { pos: [-12.2, 0.8, 7.8], scale: [2.0, 1.9, 2.0], rot: [0.02, 1.9, -0.04], archetype: 'mountain-fir', snow: 'heavy' },
      { pos: [-10.6, 0.7, 6.0], scale: [1.15, 1.25, 1.15], rot: [0.01, 2.8, 0.02], archetype: 'foothill-sapling', snow: 'light' },

      // 3. Left Mid Valley Flank Grove
      { pos: [-13.8, 1.2, 4.6], scale: [2.1, 1.95, 2.1], rot: [-0.04, 0.3, 0.03], archetype: 'mountain-fir', snow: 'heavy' },
      { pos: [-11.4, 1.0, 3.0], scale: [1.45, 2.3, 1.45], rot: [0.02, 1.5, -0.02], archetype: 'tall-spruce', snow: 'medium' },
      { pos: [-14.4, 1.5, 1.6], scale: [1.25, 1.4, 1.25], rot: [0.03, 2.4, 0.01], archetype: 'alpine-cedar', snow: 'light' },

      // 4. Left Upper Foothills Ridge
      { pos: [-14.8, 1.8, -0.6], scale: [1.7, 2.4, 1.7], rot: [0.02, 0.9, -0.03], archetype: 'tall-spruce', snow: 'heavy' },
      { pos: [-12.6, 2.0, -3.0], scale: [1.8, 1.7, 1.8], rot: [-0.03, 2.2, 0.02], archetype: 'mountain-fir', snow: 'medium' },
      { pos: [-15.6, 2.5, -6.0], scale: [2.2, 2.5, 2.2], rot: [0.04, 1.1, -0.02], archetype: 'tall-spruce', snow: 'heavy' },
      { pos: [-13.0, 2.8, -9.0], scale: [1.75, 1.6, 1.75], rot: [-0.02, 3.0, 0.03], archetype: 'alpine-cedar', snow: 'light' },

      // 5. Right Foreground Cluster
      { pos: [10.5, 0.45, 9.2], scale: [1.5, 2.2, 1.5], rot: [0.02, 1.4, 0.03], archetype: 'tall-spruce', snow: 'medium' },
      { pos: [12.4, 0.65, 10.0], scale: [2.1, 1.65, 2.1], rot: [-0.03, 2.6, -0.02], archetype: 'mountain-fir', snow: 'heavy' },
      { pos: [8.8, 0.38, 10.4], scale: [0.95, 1.05, 0.95], rot: [0.03, 0.2, 0.04], archetype: 'foothill-sapling', snow: 'light' },

      // 6. Right Lower-Mid Valley Grove
      { pos: [8.6, 0.5, 7.2], scale: [1.35, 1.85, 1.35], rot: [0.02, 2.2, -0.03], archetype: 'alpine-cedar', snow: 'medium' },
      { pos: [12.2, 0.8, 7.8], scale: [2.0, 1.9, 2.0], rot: [-0.04, 0.7, 0.02], archetype: 'mountain-fir', snow: 'heavy' },
      { pos: [10.6, 0.7, 6.0], scale: [1.15, 1.25, 1.15], rot: [0.01, 1.8, -0.02], archetype: 'foothill-sapling', snow: 'light' },

      // 7. Right Mid Valley Flank Grove
      { pos: [13.8, 1.2, 4.6], scale: [2.1, 1.95, 2.1], rot: [0.03, 2.8, -0.02], archetype: 'mountain-fir', snow: 'heavy' },
      { pos: [11.4, 1.0, 3.0], scale: [1.45, 2.3, 1.45], rot: [-0.02, 0.5, 0.04], archetype: 'tall-spruce', snow: 'medium' },
      { pos: [14.4, 1.5, 1.6], scale: [1.25, 1.4, 1.25], rot: [0.04, 1.7, -0.01], archetype: 'alpine-cedar', snow: 'light' },

      // 8. Right Upper Foothills Ridge
      { pos: [14.8, 1.8, -0.6], scale: [1.7, 2.4, 1.7], rot: [-0.03, 1.9, 0.02], archetype: 'tall-spruce', snow: 'heavy' },
      { pos: [12.6, 2.0, -3.0], scale: [1.8, 1.7, 1.8], rot: [0.02, 0.4, -0.03], archetype: 'mountain-fir', snow: 'medium' },
      { pos: [15.6, 2.5, -6.0], scale: [2.2, 2.5, 2.2], rot: [-0.02, 2.5, 0.03], archetype: 'tall-spruce', snow: 'heavy' },
      { pos: [13.0, 2.8, -9.0], scale: [1.75, 1.6, 1.75], rot: [0.04, 1.3, -0.02], archetype: 'alpine-cedar', snow: 'light' },

      // 9. Castle Terrace Perimeter Groves (Diorama Rim Framing)
      { pos: [-9.6, 3.2, -13.6], scale: [1.8, 2.3, 1.8], rot: [0.02, 0.6, -0.03], archetype: 'tall-spruce', snow: 'heavy' },
      { pos: [-6.4, 3.5, -14.4], scale: [1.6, 1.7, 1.6], rot: [-0.03, 1.8, 0.02], archetype: 'mountain-fir', snow: 'medium' },
      { pos: [6.4, 3.5, -14.4], scale: [1.6, 1.7, 1.6], rot: [0.03, 2.1, -0.02], archetype: 'mountain-fir', snow: 'medium' },
      { pos: [9.6, 3.2, -13.6], scale: [1.8, 2.3, 1.8], rot: [-0.02, 0.9, 0.03], archetype: 'tall-spruce', snow: 'heavy' },
    ];

    // Additional expansive outer mountain foothill groves for Visitor Mode boundless depth
    if (mode === 'visitor') {
      list.push(
        { pos: [-18.0, 2.2, -13.8], scale: [2.1, 2.6, 2.1], rot: [0.03, 1.2, -0.03], archetype: 'tall-spruce', snow: 'heavy' },
        { pos: [-20.0, 2.6, -17.5], scale: [2.5, 2.3, 2.5], rot: [-0.04, 0.5, 0.02], archetype: 'mountain-fir', snow: 'heavy' },
        { pos: [-16.8, 2.0, -19.8], scale: [1.9, 2.4, 1.9], rot: [0.02, 2.3, -0.02], archetype: 'alpine-cedar', snow: 'medium' },
        { pos: [-22.5, 3.2, -22.8], scale: [2.6, 2.5, 2.6], rot: [-0.02, 1.7, 0.04], archetype: 'mountain-fir', snow: 'heavy' },

        { pos: [18.0, 2.2, -13.8], scale: [2.1, 2.6, 2.1], rot: [-0.03, 2.0, 0.02], archetype: 'tall-spruce', snow: 'heavy' },
        { pos: [20.0, 2.6, -17.5], scale: [2.5, 2.3, 2.5], rot: [0.02, 1.1, -0.03], archetype: 'mountain-fir', snow: 'heavy' },
        { pos: [16.8, 2.0, -19.8], scale: [1.9, 2.4, 1.9], rot: [-0.04, 0.3, 0.03], archetype: 'alpine-cedar', snow: 'medium' },
        { pos: [22.5, 3.2, -22.8], scale: [2.6, 2.5, 2.6], rot: [0.03, 2.7, -0.02], archetype: 'mountain-fir', snow: 'heavy' }
      );
    }

    return list;
  }, [mode]);

  return (
    <group name="PineTrees">
      {trees.map((t, idx) => {
        // Vary snow thickness per snow profile
        const snowDepth = t.snow === 'heavy' ? 0.44 : t.snow === 'medium' ? 0.32 : 0.22;
        const needleMat = idx % 2 === 0 ? needleDarkMaterial : needleFrostMaterial;

        return (
          <group
            key={`tree-${idx}`}
            position={t.pos}
            rotation={t.rot}
            scale={t.scale}
          >
            {/* Trunk */}
            <mesh position={[0, 0.45, 0]} material={trunkMaterial} castShadow>
              <cylinderGeometry args={[0.07, 0.12, 0.9, 5]} />
            </mesh>

            {/* Archetype 1: Tall Slender Alpine Spruce (5 soaring tiers) */}
            {t.archetype === 'tall-spruce' && (
              <group>
                {/* Tier 1 */}
                <mesh position={[0, 0.95, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.76, 1.05, 6]} />
                </mesh>
                <mesh position={[0, 0.98 + snowDepth * 0.2, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.78, snowDepth, 6]} />
                </mesh>

                {/* Tier 2 */}
                <mesh position={[0, 1.55, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.62, 0.95, 6]} />
                </mesh>
                <mesh position={[0, 1.58 + snowDepth * 0.2, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.64, snowDepth * 0.92, 6]} />
                </mesh>

                {/* Tier 3 */}
                <mesh position={[0, 2.1, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.48, 0.85, 6]} />
                </mesh>
                <mesh position={[0, 2.13 + snowDepth * 0.2, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.50, snowDepth * 0.85, 6]} />
                </mesh>

                {/* Tier 4 */}
                <mesh position={[0, 2.6, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.34, 0.75, 6]} />
                </mesh>
                <mesh position={[0, 2.63 + snowDepth * 0.2, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.36, snowDepth * 0.78, 6]} />
                </mesh>

                {/* Tier 5 (Sharp Crown Spire) */}
                <mesh position={[0, 3.05, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.20, 0.65, 6]} />
                </mesh>
                <mesh position={[0, 3.08 + snowDepth * 0.2, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.22, snowDepth * 0.7, 6]} />
                </mesh>
              </group>
            )}

            {/* Archetype 2: Broad Mountain Fir (3 wide, heavy tiers) */}
            {t.archetype === 'mountain-fir' && (
              <group>
                {/* Tier 1 (Wide bottom skirt) */}
                <mesh position={[0, 1.05, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[1.12, 1.1, 7]} />
                </mesh>
                <mesh position={[0, 1.08 + snowDepth * 0.22, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[1.15, snowDepth * 1.15, 7]} />
                </mesh>

                {/* Tier 2 */}
                <mesh position={[0, 1.7, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.86, 1.0, 7]} />
                </mesh>
                <mesh position={[0, 1.73 + snowDepth * 0.22, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.89, snowDepth * 1.05, 7]} />
                </mesh>

                {/* Tier 3 */}
                <mesh position={[0, 2.3, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.58, 0.9, 7]} />
                </mesh>
                <mesh position={[0, 2.33 + snowDepth * 0.22, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.61, snowDepth * 0.95, 7]} />
                </mesh>
              </group>
            )}

            {/* Archetype 3: Alpine Cedar (4 balanced tiers with stepped taper) */}
            {t.archetype === 'alpine-cedar' && (
              <group>
                {/* Tier 1 */}
                <mesh position={[0, 0.95, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.92, 1.0, 6]} />
                </mesh>
                <mesh position={[0, 0.98 + snowDepth * 0.18, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.95, snowDepth * 0.9, 6]} />
                </mesh>

                {/* Tier 2 */}
                <mesh position={[0, 1.55, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.72, 0.9, 6]} />
                </mesh>
                <mesh position={[0, 1.58 + snowDepth * 0.18, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.74, snowDepth * 0.85, 6]} />
                </mesh>

                {/* Tier 3 */}
                <mesh position={[0, 2.1, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.50, 0.8, 6]} />
                </mesh>
                <mesh position={[0, 2.13 + snowDepth * 0.18, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.52, snowDepth * 0.8, 6]} />
                </mesh>

                {/* Tier 4 */}
                <mesh position={[0, 2.58, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.28, 0.7, 6]} />
                </mesh>
                <mesh position={[0, 2.61 + snowDepth * 0.18, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.30, snowDepth * 0.75, 6]} />
                </mesh>
              </group>
            )}

            {/* Archetype 4: Foothill Sapling (Compact 2-tier young pine) */}
            {t.archetype === 'foothill-sapling' && (
              <group>
                {/* Tier 1 */}
                <mesh position={[0, 0.8, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.62, 0.85, 5]} />
                </mesh>
                <mesh position={[0, 0.83 + snowDepth * 0.15, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.64, snowDepth * 0.8, 5]} />
                </mesh>

                {/* Tier 2 */}
                <mesh position={[0, 1.35, 0]} material={needleMat} castShadow receiveShadow>
                  <coneGeometry args={[0.40, 0.75, 5]} />
                </mesh>
                <mesh position={[0, 1.38 + snowDepth * 0.15, 0]} material={snowMaterial} receiveShadow>
                  <coneGeometry args={[0.42, snowDepth * 0.75, 5]} />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};
