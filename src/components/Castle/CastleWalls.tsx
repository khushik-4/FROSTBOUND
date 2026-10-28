import React from 'react';
import {
  wallIceMaterial,
  carvedIceMaterial,
  iceTrimMaterial,
  insetPanelMaterial,
  windowRecessMaterial,
  crystallineAccentMaterial,
  crystalShardMaterial,
  snowMaterial,
} from '../Materials/IceMaterial';

export const CastleWalls: React.FC = () => {
  return (
    <group position={[0, 3.2, 0]}>
      {/* 1. Front Left Curtain Wall (connecting portal buttress at x=-3.3 to corner tower at x=-6.4) */}
      <group position={[-4.85, 3.2, 0.6]}>
        {/* Main Wall Mass */}
        <mesh material={wallIceMaterial} castShadow receiveShadow>
          <boxGeometry args={[3.1, 6.4, 0.95]} />
        </mesh>

        {/* Inset Blind Gothic Lancet Panels on Wall Face */}
        {[-0.75, 0.75].map((bx, idx) => (
          <group key={`front-left-lancet-${idx}`} position={[bx, 0.2, 0.44]}>
            <mesh material={windowRecessMaterial}>
              <boxGeometry args={[0.95, 4.2, 0.12]} />
            </mesh>
            <mesh position={[0, 0, 0.03]} material={insetPanelMaterial}>
              <boxGeometry args={[0.82, 3.9, 0.06]} />
            </mesh>
            {/* Moulded Lancet Frame */}
            <mesh position={[-0.45, 0, 0.04]} material={iceTrimMaterial}>
              <boxGeometry args={[0.08, 4.2, 0.1]} />
            </mesh>
            <mesh position={[0.45, 0, 0.04]} material={iceTrimMaterial}>
              <boxGeometry args={[0.08, 4.2, 0.1]} />
            </mesh>
            {/* Pointed Head Ribs */}
            <mesh position={[-0.24, 2.35, 0.04]} rotation={[0, 0, -0.62]} material={iceTrimMaterial}>
              <boxGeometry args={[0.08, 0.8, 0.1]} />
            </mesh>
            <mesh position={[0.24, 2.35, 0.04]} rotation={[0, 0, 0.62]} material={iceTrimMaterial}>
              <boxGeometry args={[0.08, 0.8, 0.1]} />
            </mesh>
            {/* Inset Crystalline Chevron Diamond */}
            <mesh position={[0, 1.2, 0.06]} rotation={[0, 0, Math.PI / 4]} material={crystallineAccentMaterial}>
              <boxGeometry args={[0.24, 0.24, 0.08]} />
            </mesh>
          </group>
        ))}

        {/* Corbel Table beneath Battlements */}
        {[-1.1, -0.55, 0, 0.55, 1.1].map((cx, idx) => (
          <mesh key={`fl-corbel-${idx}`} position={[cx, 3.0, 0.52]} material={carvedIceMaterial} castShadow>
            <boxGeometry args={[0.16, 0.5, 0.22]} />
          </mesh>
        ))}

        {/* Snow Walkway */}
        <mesh position={[0, 3.25, 0]} material={snowMaterial} receiveShadow>
          <boxGeometry args={[3.15, 0.12, 1.0]} />
        </mesh>

        {/* Crenellations / Battlements with Crystalline Caps */}
        {[-1.0, 0, 1.0].map((cx, idx) => (
          <group key={`front-left-cren-${idx}`} position={[cx, 3.65, 0.38]}>
            <mesh material={iceTrimMaterial} castShadow>
              <boxGeometry args={[0.5, 0.65, 0.28]} />
            </mesh>
            <mesh position={[0, 0.55, 0]} material={crystalShardMaterial} castShadow>
              <coneGeometry args={[0.26, 0.65, 4]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 2. Front Right Curtain Wall */}
      <group position={[4.85, 3.2, 0.6]}>
        <mesh material={wallIceMaterial} castShadow receiveShadow>
          <boxGeometry args={[3.1, 6.4, 0.95]} />
        </mesh>

        {/* Inset Blind Gothic Lancet Panels */}
        {[-0.75, 0.75].map((bx, idx) => (
          <group key={`front-right-lancet-${idx}`} position={[bx, 0.2, 0.44]}>
            <mesh material={windowRecessMaterial}>
              <boxGeometry args={[0.95, 4.2, 0.12]} />
            </mesh>
            <mesh position={[0, 0, 0.03]} material={insetPanelMaterial}>
              <boxGeometry args={[0.82, 3.9, 0.06]} />
            </mesh>
            <mesh position={[-0.45, 0, 0.04]} material={iceTrimMaterial}>
              <boxGeometry args={[0.08, 4.2, 0.1]} />
            </mesh>
            <mesh position={[0.45, 0, 0.04]} material={iceTrimMaterial}>
              <boxGeometry args={[0.08, 4.2, 0.1]} />
            </mesh>
            <mesh position={[-0.24, 2.35, 0.04]} rotation={[0, 0, -0.62]} material={iceTrimMaterial}>
              <boxGeometry args={[0.08, 0.8, 0.1]} />
            </mesh>
            <mesh position={[0.24, 2.35, 0.04]} rotation={[0, 0, 0.62]} material={iceTrimMaterial}>
              <boxGeometry args={[0.08, 0.8, 0.1]} />
            </mesh>
            <mesh position={[0, 1.2, 0.06]} rotation={[0, 0, Math.PI / 4]} material={crystalShardMaterial}>
              <boxGeometry args={[0.24, 0.24, 0.08]} />
            </mesh>
          </group>
        ))}

        {/* Corbel Table */}
        {[-1.1, -0.55, 0, 0.55, 1.1].map((cx, idx) => (
          <mesh key={`fr-corbel-${idx}`} position={[cx, 3.0, 0.52]} material={carvedIceMaterial} castShadow>
            <boxGeometry args={[0.16, 0.5, 0.22]} />
          </mesh>
        ))}

        {/* Snow Walkway */}
        <mesh position={[0, 3.25, 0]} material={snowMaterial} receiveShadow>
          <boxGeometry args={[3.15, 0.12, 1.0]} />
        </mesh>

        {/* Crenellations */}
        {[-1.0, 0, 1.0].map((cx, idx) => (
          <group key={`front-right-cren-${idx}`} position={[cx, 3.65, 0.38]}>
            <mesh material={iceTrimMaterial} castShadow>
              <boxGeometry args={[0.5, 0.65, 0.28]} />
            </mesh>
            <mesh position={[0, 0.55, 0]} material={crystalShardMaterial} castShadow>
              <coneGeometry args={[0.26, 0.65, 4]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3. Lateral Left Flank Wall */}
      <group position={[-6.2, 3.5, -4.5]}>
        <mesh material={wallIceMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.9, 7.0, 10.6]} />
        </mesh>
        <mesh position={[0, 3.55, 0]} material={snowMaterial} receiveShadow>
          <boxGeometry args={[0.95, 0.12, 10.65]} />
        </mesh>
        {/* Relieved Pilasters along lateral wall */}
        {[-4.0, -2.0, 0, 2.0, 4.0].map((cz, idx) => (
          <mesh key={`lat-left-rib-${idx}`} position={[-0.48, 0, cz]} material={iceTrimMaterial} castShadow>
            <boxGeometry args={[0.12, 7.0, 0.32]} />
          </mesh>
        ))}
        {[-4.0, -2.0, 0, 2.0, 4.0].map((cz, idx) => (
          <mesh
            key={`lat-left-cren-${idx}`}
            position={[-0.35, 4.0, cz]}
            material={crystalShardMaterial}
            castShadow
          >
            <coneGeometry args={[0.28, 0.9, 4]} />
          </mesh>
        ))}
      </group>

      {/* 4. Lateral Right Flank Wall */}
      <group position={[6.2, 3.5, -4.5]}>
        <mesh material={wallIceMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.9, 7.0, 10.6]} />
        </mesh>
        <mesh position={[0, 3.55, 0]} material={snowMaterial} receiveShadow>
          <boxGeometry args={[0.95, 0.12, 10.65]} />
        </mesh>
        {[-4.0, -2.0, 0, 2.0, 4.0].map((cz, idx) => (
          <mesh key={`lat-right-rib-${idx}`} position={[0.48, 0, cz]} material={iceTrimMaterial} castShadow>
            <boxGeometry args={[0.12, 7.0, 0.32]} />
          </mesh>
        ))}
        {[-4.0, -2.0, 0, 2.0, 4.0].map((cz, idx) => (
          <mesh
            key={`lat-right-cren-${idx}`}
            position={[0.35, 4.0, cz]}
            material={crystalShardMaterial}
            castShadow
          >
            <coneGeometry args={[0.28, 0.9, 4]} />
          </mesh>
        ))}
      </group>

      {/* 5. Rear Curtain Wall */}
      <group position={[0, 3.5, -9.8]}>
        <mesh material={wallIceMaterial} castShadow receiveShadow>
          <boxGeometry args={[10.0, 7.0, 0.9]} />
        </mesh>
        <mesh position={[0, 3.55, 0]} material={snowMaterial} receiveShadow>
          <boxGeometry args={[10.05, 0.12, 0.95]} />
        </mesh>
      </group>

      {/* 6. Multi-Tier Flying Ice Buttress Struts */}
      {[-1, 1].map((side) => (
        <group key={`flying-buttress-${side}`}>
          {/* Lower flying arch */}
          <mesh
            position={[side * 4.6, 9.8, -4.5]}
            rotation={[0, 0, side * 0.45]}
            material={iceTrimMaterial}
            castShadow
          >
            <boxGeometry args={[2.5, 0.45, 0.5]} />
          </mesh>
          {/* Upper flying arch */}
          <mesh
            position={[side * 3.8, 14.2, -4.6]}
            rotation={[0, 0, side * 0.52]}
            material={iceTrimMaterial}
            castShadow
          >
            <boxGeometry args={[2.2, 0.4, 0.45]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
