import React, { useMemo } from 'react';
import * as THREE from 'three';

// Materials for Near/Midground Alpine Ridges and Distant Atmospheric Massifs
// Matte natural stone with low specular to avoid artificial shine
const alpineRidgeMaterial = new THREE.MeshStandardMaterial({
  vertexColors: true,
  roughness: 0.94,
  metalness: 0.02,
  flatShading: true,
});

const distantAtmosphericRidgeMaterial = new THREE.MeshStandardMaterial({
  vertexColors: true,
  roughness: 0.96,
  metalness: 0.01,
  flatShading: true,
});

interface RidgeSpur {
  points: [number, number, number, number][]; // [x, z, height, halfWidth]
  slope?: number;
}

interface MassifSpec {
  key: string;
  bounds: { xMin: number; xMax: number; zMin: number; zMax: number };
  gridX: number;
  gridZ: number;
  ridges: RidgeSpur[];
  snowThreshold: number; // Ratio above which snow starts (0.55 - 0.70)
  isDistant: boolean;
  palette?: {
    snow: string;
    snowShade: string;
    rockHigh: string;
    rockMid: string;
    rockBase: string;
  };
}

// Distance from point (px, pz) to line segment (ax, az) -> (bx, bz)
function distanceToSegment(
  px: number,
  pz: number,
  ax: number,
  az: number,
  bx: number,
  bz: number
): { dist: number; t: number; projX: number; projZ: number } {
  const dx = bx - ax;
  const dz = bz - az;
  const lenSq = dx * dx + dz * dz;

  if (lenSq < 0.0001) {
    return {
      dist: Math.hypot(px - ax, pz - az),
      t: 0,
      projX: ax,
      projZ: az,
    };
  }

  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / lenSq));
  const projX = ax + t * dx;
  const projZ = az + t * dz;
  const dist = Math.hypot(px - projX, pz - projZ);

  return { dist, t, projX, projZ };
}

// Procedural generator for authentic faceted alpine massifs on a regular Cartesian grid
// Eliminates folded sheets, stretched quads, and triangular teeth at the base
function createAlpineMassifGeometry(spec: MassifSpec): THREE.BufferGeometry {
  const { bounds, gridX, gridZ, ridges, snowThreshold, isDistant, palette } = spec;
  const { xMin, xMax, zMin, zMax } = bounds;

  const dx = (xMax - xMin) / gridX;
  const dz = (zMax - zMin) / gridZ;

  // Pre-allocate 2D height grid
  const cols = gridX + 1;
  const rows = gridZ + 1;
  const heights = new Float32Array(cols * rows);

  let maxObservedPeakY = 1.0;

  // 1. Compute Heights on Uniform 2D Grid
  for (let r = 0; r < rows; r++) {
    const z = zMin + r * dz;
    for (let c = 0; c < cols; c++) {
      const x = xMin + c * dx;

      let maxRidgeHeight = 0;

      // Evaluate contribution of all arêtes and spurs
      for (const ridge of ridges) {
        const pts = ridge.points;
        const slopeMult = ridge.slope || 1.0;

        for (let k = 0; k < pts.length - 1; k++) {
          const pA = pts[k];
          const pB = pts[k + 1];

          const { dist, t } = distanceToSegment(x, z, pA[0], pA[1], pB[0], pB[1]);

          const segH = THREE.MathUtils.lerp(pA[2], pB[2], t);
          const segW = THREE.MathUtils.lerp(pA[3], pB[3], t);

          if (dist < segW) {
            // Alpine arête cross section: sharp crest, concave glacial flank
            const u = dist / segW;
            const profile = Math.pow(Math.max(0, 1.0 - u), 1.15) * (1.0 - u * 0.35);
            const h = segH * profile * slopeMult;
            if (h > maxRidgeHeight) maxRidgeHeight = h;
          }
        }
      }

      let totalY = 0;

      if (maxRidgeHeight > 0.1) {
        // Multi-octave faceted alpine noise (crests, crags, and couloirs)
        const n1 = Math.sin(x * 0.22 + z * 0.16) * 1.5 + Math.cos(x * 0.14 - z * 0.24) * 1.2;
        const n2 = Math.sin(x * 0.48 - z * 0.44) * 0.7 + Math.cos(x * 0.62 + z * 0.52) * 0.4;
        const n3 = Math.sin(x * 1.1 + z * 0.95) * 0.22;

        const noiseWeight = Math.min(1.0, maxRidgeHeight / 3.2);
        totalY = maxRidgeHeight + (n1 + n2 + n3) * noiseWeight;

        // Terraced rock ledges (Reference 1 & 2)
        totalY += Math.sin(totalY * 0.8) * 0.25 * noiseWeight;

        // Smooth grounding near bounds edge to seamlessly meet snow terrain
        const edgeDist = Math.min(x - xMin, xMax - x, z - zMin, zMax - z);
        if (edgeDist < 4.5) {
          const edgeTaper = Math.max(0, edgeDist / 4.5);
          totalY *= edgeTaper * edgeTaper * (3.0 - 2.0 * edgeTaper); // smoothstep
        }

        // Clamp baseline
        if (totalY < 0.08) totalY = 0;
      }

      heights[r * cols + c] = totalY;
      if (totalY > maxObservedPeakY) maxObservedPeakY = totalY;
    }
  }

  // 2. Generate Triangles (Omit flat ground quads for optimal performance)
  const positions: number[] = [];
  const indices: number[] = [];
  const vertexLookup = new Int32Array(cols * rows);
  vertexLookup.fill(-1);

  let vertexCount = 0;

  function getOrAddVertex(c: number, r: number): number {
    const key = r * cols + c;
    if (vertexLookup[key] !== -1) return vertexLookup[key];

    const x = xMin + c * dx;
    const z = zMin + r * dz;
    const y = heights[key];

    positions.push(x, y, z);
    const newIdx = vertexCount++;
    vertexLookup[key] = newIdx;
    return newIdx;
  }

  for (let r = 0; r < gridZ; r++) {
    for (let c = 0; c < gridX; c++) {
      const h00 = heights[r * cols + c];
      const h10 = heights[r * cols + (c + 1)];
      const h01 = heights[(r + 1) * cols + c];
      const h11 = heights[(r + 1) * cols + (c + 1)];

      // Skip quad entirely if completely flat at ground level
      if (h00 <= 0.05 && h10 <= 0.05 && h01 <= 0.05 && h11 <= 0.05) {
        continue;
      }

      const v00 = getOrAddVertex(c, r);
      const v10 = getOrAddVertex(c + 1, r);
      const v01 = getOrAddVertex(c, r + 1);
      const v11 = getOrAddVertex(c + 1, r + 1);

      // Alternate triangulation diagonal to avoid directional bias
      if ((r + c) % 2 === 0) {
        indices.push(v00, v11, v10);
        indices.push(v00, v01, v11);
      } else {
        indices.push(v00, v01, v10);
        indices.push(v10, v01, v11);
      }
    }
  }

  // If no triangles generated, return empty geometry
  if (indices.length === 0) return new THREE.BufferGeometry();

  const indexedGeo = new THREE.BufferGeometry();
  indexedGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  indexedGeo.setIndex(indices);
  indexedGeo.computeVertexNormals();

  // 3. Convert to Non-Indexed Geometry for Sharp Faceted Low-Poly Appearance (Reference 1)
  const geo = indexedGeo.toNonIndexed();
  geo.computeVertexNormals();

  // 4. Facet Color Assignment (Restrained Snow & Layered Blue-Grey Rock)
  const posAttr = geo.attributes.position;
  const normAttr = geo.attributes.normal;
  const totalVertices = posAttr.count;
  const colors: number[] = new Array(totalVertices * 3);

  // Key moonlit light direction
  const lightDir = new THREE.Vector3(-0.48, 0.72, 0.50).normalize();

  // Palette definitions: restrained snow, layered cool blue-grey rock
  const cSnowPeak = new THREE.Color(palette?.snow || (isDistant ? '#cce0f0' : '#e6f0fa'));
  const cSnowShade = new THREE.Color(palette?.snowShade || (isDistant ? '#9cbcd6' : '#b2cbdf'));
  const cRockHigh = new THREE.Color(palette?.rockHigh || (isDistant ? '#466482' : '#527392'));
  const cRockMid = new THREE.Color(palette?.rockMid || (isDistant ? '#2e455e' : '#36506c'));
  const cRockBase = new THREE.Color(palette?.rockBase || (isDistant ? '#1b2a3a' : '#1e3044'));

  const v0 = new THREE.Vector3();
  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();
  const faceNormal = new THREE.Vector3();
  const faceCol = new THREE.Color();

  for (let i = 0; i < totalVertices; i += 3) {
    v0.fromBufferAttribute(posAttr, i);
    v1.fromBufferAttribute(posAttr, i + 1);
    v2.fromBufferAttribute(posAttr, i + 2);

    faceNormal.fromBufferAttribute(normAttr, i);
    const avgY = (v0.y + v1.y + v2.y) / 3.0;

    const slope = faceNormal.y; // 1.0 = flat horizontal shelf, 0.0 = sheer cliff
    const lightDot = THREE.MathUtils.clamp(faceNormal.dot(lightDir), 0, 1);
    const altRatio = Math.max(0, Math.min(1.0, avgY / maxObservedPeakY));

    // RESTRAINED SNOW ACCUMULATION (Priority 1):
    // Snow only collects on high crests (altRatio > snowThreshold) and gentler shelves (slope > 0.36)
    // Steep vertical faces remain cool blue-grey rock!
    const isSnowFacet = altRatio >= snowThreshold && slope > 0.36;

    if (isSnowFacet) {
      if (altRatio > snowThreshold + 0.18 && slope > 0.48) {
        // High summit crest
        faceCol.copy(cSnowPeak);
        if (lightDot > 0.4) faceCol.lerp(new THREE.Color('#f0f8ff'), 0.2);
      } else {
        // Shaded/transitional snow
        const tSnow = THREE.MathUtils.clamp((altRatio - snowThreshold) / 0.18, 0, 1);
        faceCol.lerpColors(cSnowShade, cSnowPeak, tSnow);
      }
    } else {
      // Cool blue-grey rock faces
      if (altRatio > 0.45 && lightDot > 0.32) {
        // Upper moonlit rock face
        const tUp = Math.min(1, (altRatio - 0.45) / 0.55);
        faceCol.lerpColors(cRockMid, cRockHigh, tUp);
      } else if (altRatio > 0.20) {
        // Mid-slope shaded rock
        const tMid = Math.min(1, (altRatio - 0.20) / 0.35);
        faceCol.lerpColors(cRockBase, cRockMid, tMid);
        if (lightDot > 0.4) faceCol.lerp(cRockHigh, 0.25);
      } else {
        // Foothill moraine merging into valley snow
        faceCol.copy(cRockBase);
      }
    }

    // Assign uniform facet color
    for (let k = 0; k < 3; k++) {
      const idx = (i + k) * 3;
      colors[idx] = faceCol.r;
      colors[idx + 1] = faceCol.g;
      colors[idx + 2] = faceCol.b;
    }
  }

  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  return geo;
}

export const MountainBackdrop: React.FC = () => {
  const mountainGeometries = useMemo(() => {
    const list: {
      key: string;
      geometry: THREE.BufferGeometry;
      isDistant: boolean;
    }[] = [];

    // TIER 1: Midground Left Alpine Massif
    // Frames the left valley without encroaching on diorama base (|x| >= 24, z <= -24)
    const midLeftMassif: MassifSpec = {
      key: 'mid-left-massif',
      bounds: { xMin: -68, xMax: -24, zMin: -58, zMax: -24 },
      gridX: 28,
      gridZ: 22,
      ridges: [
        {
          // Primary jagged arête running from far rear left toward midground
          points: [
            [-62, -54, 22.0, 16.0],
            [-46, -42, 24.5, 18.0],
            [-34, -30, 14.5, 14.0],
            [-28, -26, 8.5, 10.0],
          ],
          slope: 1.05,
        },
        {
          // Secondary spur branching outward
          points: [
            [-46, -42, 24.5, 18.0],
            [-56, -34, 16.5, 13.0],
            [-64, -28, 8.0, 9.0],
          ],
          slope: 1.0,
        },
        {
          // Lateral couloir rib
          points: [
            [-46, -42, 24.5, 18.0],
            [-36, -50, 17.0, 12.0],
          ],
          slope: 0.95,
        },
      ],
      snowThreshold: 0.62,
      isDistant: false,
    };
    list.push({
      key: midLeftMassif.key,
      geometry: createAlpineMassifGeometry(midLeftMassif),
      isDistant: false,
    });

    // TIER 1: Midground Right Alpine Massif
    // Symmetrical flanking range framing the right valley
    const midRightMassif: MassifSpec = {
      key: 'mid-right-massif',
      bounds: { xMin: 24, xMax: 68, zMin: -58, zMax: -24 },
      gridX: 28,
      gridZ: 22,
      ridges: [
        {
          // Primary arête
          points: [
            [28, -26, 8.5, 10.0],
            [34, -30, 14.5, 14.0],
            [46, -42, 24.0, 18.0],
            [62, -54, 21.5, 16.0],
          ],
          slope: 1.05,
        },
        {
          // Secondary spur branching outward
          points: [
            [46, -42, 24.0, 18.0],
            [56, -34, 16.0, 13.0],
            [64, -28, 8.0, 9.0],
          ],
          slope: 1.0,
        },
        {
          // Lateral couloir rib
          points: [
            [46, -42, 24.0, 18.0],
            [36, -50, 16.5, 12.0],
          ],
          slope: 0.95,
        },
      ],
      snowThreshold: 0.62,
      isDistant: false,
    };
    list.push({
      key: midRightMassif.key,
      geometry: createAlpineMassifGeometry(midRightMassif),
      isDistant: false,
    });

    // TIER 2: Background Alpine Amphitheater Massif
    // Sweeps behind the castle. Central col kept low (y=9.5 - 12.0) so central spire (y=38.5) is 100% unobstructed!
    const bgAmphitheaterMassif: MassifSpec = {
      key: 'bg-amphitheater-massif',
      bounds: { xMin: -76, xMax: 76, zMin: -74, zMax: -42 },
      gridX: 54,
      gridZ: 22,
      ridges: [
        {
          // Grand sweeping amphitheater ridge
          points: [
            [-65, -62, 25.5, 20.0],
            [-45, -54, 23.5, 18.0],
            [-26, -48, 17.5, 15.0],
            [-12, -45, 11.5, 13.0],
            [0, -45, 9.5, 12.0], // Low central saddle col behind castle keep
            [12, -45, 11.5, 13.0],
            [26, -48, 17.5, 15.0],
            [45, -54, 23.5, 18.0],
            [65, -62, 25.5, 20.0],
          ],
          slope: 0.95,
        },
        {
          // Left rear horn spur
          points: [
            [-45, -54, 23.5, 18.0],
            [-52, -66, 21.0, 15.0],
          ],
          slope: 1.0,
        },
        {
          // Right rear horn spur
          points: [
            [45, -54, 23.5, 18.0],
            [52, -66, 21.0, 15.0],
          ],
          slope: 1.0,
        },
      ],
      snowThreshold: 0.60,
      isDistant: true,
      palette: {
        snow: '#d4e4f2',
        snowShade: '#a4c2db',
        rockHigh: '#486685',
        rockMid: '#304760',
        rockBase: '#1a2939',
      },
    };
    list.push({
      key: bgAmphitheaterMassif.key,
      geometry: createAlpineMassifGeometry(bgAmphitheaterMassif),
      isDistant: true,
    });

    // TIER 3: Far Horizon Horns & Peaks
    // Deep atmospheric distance (z = -80 to -108) with Matterhorn-style aiguilles
    const farHorizonHorns: MassifSpec = {
      key: 'far-horizon-horns',
      bounds: { xMin: -92, xMax: 92, zMin: -108, zMax: -76 },
      gridX: 48,
      gridZ: 18,
      ridges: [
        {
          points: [
            [-75, -92, 29.0, 24.0],
            [-50, -88, 25.0, 22.0],
            [-28, -86, 33.0, 22.0], // Majestic distant alpine horn
            [-8, -84, 15.5, 18.0],
            [0, -84, 13.5, 16.0],
            [8, -84, 15.5, 18.0],
            [28, -86, 32.0, 22.0], // Majestic distant alpine horn
            [50, -88, 24.5, 22.0],
            [75, -92, 28.5, 24.0],
          ],
          slope: 0.90,
        },
      ],
      snowThreshold: 0.64,
      isDistant: true,
      palette: {
        snow: '#c0d6ea',
        snowShade: '#8eaec9',
        rockHigh: '#3c5875',
        rockMid: '#263b51',
        rockBase: '#162433',
      },
    };
    list.push({
      key: farHorizonHorns.key,
      geometry: createAlpineMassifGeometry(farHorizonHorns),
      isDistant: true,
    });

    return list;
  }, []);

  return (
    <group name="AlpineMountainBackdrop" position={[0, -0.1, 0]}>
      {mountainGeometries.map((m) => (
        <mesh
          key={m.key}
          geometry={m.geometry}
          material={m.isDistant ? distantAtmosphericRidgeMaterial : alpineRidgeMaterial}
          receiveShadow
        />
      ))}
    </group>
  );
};
