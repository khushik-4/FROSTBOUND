import React from 'react';
import { CentralSpire } from './CentralSpire';
import { TowerSpires } from './TowerSpires';
import { EntrancePortal } from './EntrancePortal';
import { GrandStaircase } from './GrandStaircase';
import { CastleWalls } from './CastleWalls';
import { CrystalFormations } from './CrystalFormations';

export const CastleModel: React.FC = () => {
  return (
    <group name="FrostboundCastle" position={[0, 0, 0]}>
      {/* 1. Grand Sweeping Multi-Tier Staircase & Rails */}
      <GrandStaircase />

      {/* 2. Monumental Gothic Entrance Portal & Traceries */}
      <EntrancePortal />

      {/* 3. Central Keep & Monumental Needle Spire */}
      <CentralSpire />

      {/* 4. Flanking Symmetrical Towers & Corner Spires */}
      <TowerSpires />

      {/* 5. Castle Walls, Battlements & Flying Buttresses */}
      <CastleWalls />

      {/* 6. Giant Crystalline Shard Outcrops & Clusters */}
      <CrystalFormations />
    </group>
  );
};
