import React from 'react';
import {
  wallIceMaterial,
  carvedIceMaterial,
  spireIceMaterial,
  iceTrimMaterial,
  insetPanelMaterial,
  glowingIceMaterial,
  crystalShardMaterial,
} from '../Materials/IceMaterial';

export const EntrancePortal: React.FC = () => {
  return (
    <group position={[0, 3.2, 0]}>
      {/* 1. Deep Recessed Portal Sanctuary Alcove (Inner glowing doorway core) */}
      <mesh position={[0, 3.2, -1.6]} material={glowingIceMaterial}>
        <boxGeometry args={[2.8, 6.2, 0.5]} />
      </mesh>

      {/* Radiant Cyan & Turquoise Sanctuary Lighting */}
      <pointLight
        position={[0, 3.2, -0.4]}
        color="#38bdf8"
        intensity={6.5}
        distance={15.0}
        decay={2}
      />
      <pointLight
        position={[0, 5.6, 0.4]}
        color="#a5f3fc"
        intensity={3.8}
        distance={11.0}
        decay={2}
      />

      {/* 2. Carved Ice Portal Plinth & Heavy Threshold Slab */}
      <mesh position={[0, 0.18, 0.15]} material={carvedIceMaterial} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.36, 1.4]} />
      </mesh>
      <mesh position={[0, 0.37, 0.2]} material={iceTrimMaterial} receiveShadow>
        <boxGeometry args={[4.84, 0.04, 1.35]} />
      </mesh>

      {/* 3. Deep Splayed Portal Jambs (3 Nested Orders of Carved Colonnettes) */}
      {[-1, 1].map((side) => {
        return (
          <group key={`portal-splay-${side}`}>
            {/* Outer Order Jamb (x = 2.4, z = 0.55) - Deep Glacial Sapphire */}
            <group position={[side * 2.35, 2.6, 0.5]}>
              {/* Heavy Outer Pillar */}
              <mesh material={wallIceMaterial} castShadow>
                <boxGeometry args={[0.55, 4.8, 0.7]} />
              </mesh>
              {/* Carved Engaged Colonnette */}
              <mesh position={[-side * 0.18, 0, 0.22]} material={carvedIceMaterial} castShadow>
                <cylinderGeometry args={[0.16, 0.18, 4.8, 6]} />
              </mesh>
              {/* Carved Capital */}
              <mesh position={[-side * 0.18, 2.45, 0.22]} material={iceTrimMaterial} castShadow>
                <cylinderGeometry args={[0.26, 0.16, 0.3, 6]} />
              </mesh>
              {/* Plinth Base */}
              <mesh position={[-side * 0.18, -2.4, 0.22]} material={iceTrimMaterial}>
                <cylinderGeometry args={[0.22, 0.26, 0.3, 6]} />
              </mesh>
            </group>

            {/* Middle Order Splay (x = 1.85, z = 0.15) - Chiseled Turquoise */}
            <group position={[side * 1.85, 2.6, 0.15]} rotation={[0, side * 0.28, 0]}>
              <mesh material={carvedIceMaterial} castShadow>
                <boxGeometry args={[0.42, 4.8, 0.6]} />
              </mesh>
              <mesh position={[-side * 0.14, 0, 0.18]} material={iceTrimMaterial} castShadow>
                <cylinderGeometry args={[0.13, 0.15, 4.8, 6]} />
              </mesh>
              <mesh position={[-side * 0.14, 2.45, 0.18]} material={crystalShardMaterial} castShadow>
                <cylinderGeometry args={[0.22, 0.13, 0.28, 6]} />
              </mesh>
            </group>

            {/* Inner Order Splay (x = 1.42, z = -0.25) - Frost Trim with Inset Reveal */}
            <group position={[side * 1.42, 2.6, -0.22]} rotation={[0, side * 0.42, 0]}>
              <mesh material={iceTrimMaterial} castShadow>
                <boxGeometry args={[0.32, 4.8, 0.5]} />
              </mesh>
              <mesh position={[-side * 0.1, 0, 0.14]} material={crystalShardMaterial} castShadow>
                <cylinderGeometry args={[0.1, 0.12, 4.8, 6]} />
              </mesh>
              <mesh position={[-side * 0.1, 2.45, 0.14]} material={glowingIceMaterial}>
                <cylinderGeometry args={[0.18, 0.1, 0.25, 6]} />
              </mesh>
            </group>

            {/* Concentric Pointed Gothic Archivolt Ribs */}
            {/* Outer Arch Rib */}
            <mesh
              position={[side * 1.25, 6.2, 0.5]}
              rotation={[0, 0, -side * 0.62]}
              material={wallIceMaterial}
              castShadow
            >
              <boxGeometry args={[0.55, 3.4, 0.7]} />
            </mesh>
            <mesh
              position={[side * 1.25, 6.2, 0.72]}
              rotation={[0, 0, -side * 0.62]}
              material={iceTrimMaterial}
              castShadow
            >
              <boxGeometry args={[0.18, 3.45, 0.2]} />
            </mesh>

            {/* Middle Arch Rib */}
            <mesh
              position={[side * 0.98, 5.95, 0.15]}
              rotation={[0, 0, -side * 0.62]}
              material={carvedIceMaterial}
              castShadow
            >
              <boxGeometry args={[0.38, 3.2, 0.55]} />
            </mesh>
            <mesh
              position={[side * 0.98, 5.95, 0.32]}
              rotation={[0, 0, -side * 0.62]}
              material={crystalShardMaterial}
              castShadow
            >
              <boxGeometry args={[0.14, 3.25, 0.16]} />
            </mesh>

            {/* Inner Arch Rib */}
            <mesh
              position={[side * 0.76, 5.7, -0.2]}
              rotation={[0, 0, -side * 0.62]}
              material={iceTrimMaterial}
              castShadow
            >
              <boxGeometry args={[0.28, 2.9, 0.45]} />
            </mesh>
            <mesh
              position={[side * 0.76, 5.7, -0.05]}
              rotation={[0, 0, -side * 0.62]}
              material={glowingIceMaterial}
            >
              <boxGeometry args={[0.1, 2.9, 0.12]} />
            </mesh>

            {/* Monumental Flanking Buttress Column & Pinnacle (Reference 1) */}
            <group position={[side * 3.3, 0, 0.4]}>
              {/* Octagonal Heavy Buttress Column */}
              <mesh position={[0, 3.8, 0]} material={wallIceMaterial} castShadow>
                <cylinderGeometry args={[0.72, 0.85, 7.6, 8]} />
              </mesh>
              {/* Vertical Crystalline Rib on Buttress Face */}
              <mesh position={[0, 3.8, 0.78]} material={iceTrimMaterial} castShadow>
                <boxGeometry args={[0.22, 7.6, 0.18]} />
              </mesh>
              {/* Mid-Collar Moulding */}
              <mesh position={[0, 7.6, 0]} material={iceTrimMaterial} castShadow>
                <cylinderGeometry args={[0.92, 0.75, 0.55, 8]} />
              </mesh>
              {/* Stepped Transition Tier */}
              <mesh position={[0, 8.4, 0]} material={carvedIceMaterial} castShadow>
                <cylinderGeometry args={[0.62, 0.78, 1.2, 8]} />
              </mesh>
              {/* Soaring Sharp Crystalline Pinnacle */}
              <mesh position={[0, 10.4, 0]} material={spireIceMaterial} castShadow>
                <coneGeometry args={[0.60, 4.4, 8]} />
              </mesh>
              {/* Glowing Needle Apex */}
              <mesh position={[0, 12.8, 0]} material={crystalShardMaterial}>
                <coneGeometry args={[0.22, 1.6, 6]} />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* 4. Carved Double Doorway Leaves & Central Trumeau Pillar */}
      {/* Central Carved Trumeau Pillar (Separates the double portal doors) */}
      <group position={[0, 2.2, -0.6]}>
        <mesh material={carvedIceMaterial} castShadow>
          <cylinderGeometry args={[0.16, 0.2, 4.4, 6]} />
        </mesh>
        <mesh position={[0, 0, 0.12]} material={iceTrimMaterial} castShadow>
          <boxGeometry args={[0.1, 4.4, 0.12]} />
        </mesh>
        {/* Trumeau Capital */}
        <mesh position={[0, 2.25, 0]} material={crystalShardMaterial} castShadow>
          <boxGeometry args={[0.42, 0.28, 0.35]} />
        </mesh>
      </group>

      {/* Left and Right Carved Ice Door Leaves */}
      {[-1, 1].map((dSide) => {
        const dx = dSide * 0.62;
        return (
          <group key={`door-leaf-${dSide}`} position={[dx, 2.2, -0.8]}>
            {/* Deep Glacial Door Stile Frame */}
            <mesh material={carvedIceMaterial} castShadow>
              <boxGeometry args={[0.95, 4.2, 0.2]} />
            </mesh>
            {/* Inset Panels (Upper & Lower) */}
            <mesh position={[0, 1.0, 0.05]} material={insetPanelMaterial}>
              <boxGeometry args={[0.68, 1.6, 0.08]} />
            </mesh>
            <mesh position={[0, -1.0, 0.05]} material={insetPanelMaterial}>
              <boxGeometry args={[0.68, 1.6, 0.08]} />
            </mesh>
            {/* Raised Carved Diamond Boss Studs */}
            <mesh position={[0, 1.0, 0.12]} rotation={[0, 0, Math.PI / 4]} material={crystalShardMaterial}>
              <boxGeometry args={[0.32, 0.32, 0.12]} />
            </mesh>
            <mesh position={[0, -1.0, 0.12]} rotation={[0, 0, Math.PI / 4]} material={crystalShardMaterial}>
              <boxGeometry args={[0.32, 0.32, 0.12]} />
            </mesh>
          </group>
        );
      })}

      {/* 5. Carved Ice Tympanum with Intricate Radial Snowflake Rosette Tracery */}
      <group position={[0, 5.4, -0.4]}>
        {/* Tympanum Backing Plate */}
        <mesh material={carvedIceMaterial} castShadow>
          <boxGeometry args={[2.2, 1.8, 0.25]} />
        </mesh>
        <mesh position={[0, 0, 0.08]} material={insetPanelMaterial}>
          <boxGeometry args={[1.9, 1.5, 0.12]} />
        </mesh>

        {/* Crystalline Rosette Star (Carved Snowflake Relief) */}
        <mesh position={[0, 0, 0.16]} material={crystalShardMaterial} rotation={[0, 0, Math.PI / 8]}>
          <boxGeometry args={[0.85, 0.85, 0.08]} />
        </mesh>
        <mesh position={[0, 0, 0.17]} material={glowingIceMaterial} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.75, 0.75, 0.08]} />
        </mesh>
        {/* Radial Tracery Spokes */}
        {[0, 1, 2, 3].map((sIdx) => (
          <mesh
            key={`rosette-spoke-${sIdx}`}
            position={[0, 0, 0.18]}
            rotation={[0, 0, (sIdx * Math.PI) / 4]}
            material={iceTrimMaterial}
          >
            <boxGeometry args={[1.6, 0.07, 0.08]} />
          </mesh>
        ))}
      </group>

      {/* Gothic Arch Apex Keystone Finial */}
      <mesh position={[0, 7.6, 0.45]} material={crystalShardMaterial} castShadow>
        <coneGeometry args={[0.48, 2.2, 6]} />
      </mesh>
      <mesh position={[0, 7.6, 0.7]} material={glowingIceMaterial}>
        <boxGeometry args={[0.18, 1.2, 0.18]} />
      </mesh>

      {/* 6. Monumental Triangular Pediment Gable & Layered Tracery Lattice */}
      <group position={[0, 8.2, 0.2]}>
        {/* Deep Moulded Gable Slopes */}
        <mesh
          position={[-1.65, 1.85, 0.1]}
          rotation={[0, 0, -Math.PI / 4]}
          material={carvedIceMaterial}
          castShadow
        >
          <boxGeometry args={[0.55, 5.2, 0.85]} />
        </mesh>
        <mesh
          position={[-1.65, 1.85, 0.45]}
          rotation={[0, 0, -Math.PI / 4]}
          material={iceTrimMaterial}
          castShadow
        >
          <boxGeometry args={[0.18, 5.25, 0.22]} />
        </mesh>

        <mesh
          position={[1.65, 1.85, 0.1]}
          rotation={[0, 0, Math.PI / 4]}
          material={carvedIceMaterial}
          castShadow
        >
          <boxGeometry args={[0.55, 5.2, 0.85]} />
        </mesh>
        <mesh
          position={[1.65, 1.85, 0.45]}
          rotation={[0, 0, Math.PI / 4]}
          material={iceTrimMaterial}
          castShadow
        >
          <boxGeometry args={[0.18, 5.25, 0.22]} />
        </mesh>

        {/* Solid Gable Backing Wall */}
        <mesh position={[0, 1.6, -0.15]} material={wallIceMaterial} castShadow>
          <boxGeometry args={[3.8, 3.4, 0.48]} />
        </mesh>
        {/* Recessed Triangular Inset Panel */}
        <mesh position={[0, 1.5, 0.1]} material={insetPanelMaterial}>
          <boxGeometry args={[3.0, 2.6, 0.1]} />
        </mesh>

        {/* Intricate Geometric Diamond & Chevron Frost Traceries (Reference 1) */}
        <group position={[0, 1.6, 0.32]}>
          {/* Nested Diamond Crystal Lattice */}
          {[1.9, 1.3, 0.7].map((size, idx) => (
            <group key={`diamond-tracery-${idx}`}>
              {[-1, 1].map((sX) =>
                [-1, 1].map((sY) => (
                  <mesh
                    key={`dia-bar-${idx}-${sX}-${sY}`}
                    position={[(sX * size) / 4, (sY * size) / 4, 0]}
                    rotation={[0, 0, (sX * sY * Math.PI) / 4]}
                    material={idx === 1 ? glowingIceMaterial : iceTrimMaterial}
                    castShadow
                  >
                    <boxGeometry args={[0.12, (size * Math.SQRT2) / 2, 0.14]} />
                  </mesh>
                ))
              )}
            </group>
          ))}

          {/* Central Vertical Crystal Spine */}
          <mesh material={crystalShardMaterial} position={[0, 0, 0.04]} castShadow>
            <boxGeometry args={[0.14, 3.3, 0.16]} />
          </mesh>
          {/* Horizontal Crosspiece */}
          <mesh material={glowingIceMaterial} position={[0, 0, 0.04]}>
            <boxGeometry args={[2.6, 0.12, 0.16]} />
          </mesh>
          {/* Central Radiant Gem Node */}
          <mesh position={[0, 0, 0.14]} rotation={[0, 0, Math.PI / 4]} material={crystalShardMaterial}>
            <boxGeometry args={[0.38, 0.38, 0.18]} />
          </mesh>
        </group>

        {/* Gable Apex Monumental Needle Spire */}
        <mesh position={[0, 4.5, 0.1]} material={crystalShardMaterial} castShadow>
          <coneGeometry args={[0.42, 3.6, 6]} />
        </mesh>
        <mesh position={[0, 6.4, 0.1]} material={glowingIceMaterial}>
          <coneGeometry args={[0.18, 1.4, 6]} />
        </mesh>
      </group>
    </group>
  );
};
