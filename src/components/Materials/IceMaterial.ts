import * as THREE from 'three';

// 1. Deep Solid Glacial Ice for Main Castle Keep and Lower Massifs
// Translucent glacial sapphire blue with high clearcoat and grazing violet sheen
export const wallIceMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#14426b'), // Deep glacial sapphire blue
  emissive: new THREE.Color('#03182b'),
  emissiveIntensity: 0.16,
  roughness: 0.20,
  metalness: 0.04,
  specularIntensity: 1.8,
  specularColor: new THREE.Color('#e0f2fe'),
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  sheen: 0.70,
  sheenColor: new THREE.Color('#8b5cf6'), // Grazing-angle violet sheen
  sheenRoughness: 0.22,
  flatShading: true,
});

// Backwards compatibility alias
export const iceMaterial = wallIceMaterial;

// 2. Reflective Glacial Tower Ice (Distinct mid-tier facet material with rich blue-cyan depth)
export const towerFacetMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#1c578c'), // Vibrant reflective glacial blue
  emissive: new THREE.Color('#032845'),
  emissiveIntensity: 0.22,
  roughness: 0.12,
  metalness: 0.06,
  specularIntensity: 2.0,
  specularColor: new THREE.Color('#f0f9ff'),
  clearcoat: 1.0,
  clearcoatRoughness: 0.04,
  iridescence: 0.65,
  iridescenceIOR: 1.34,
  iridescenceThicknessRange: [140, 380],
  sheen: 0.75,
  sheenColor: new THREE.Color('#a855f7'), // Subtle violet highlight accent
  sheenRoughness: 0.18,
  flatShading: true,
});

// 3. Carved Chiseled Ice for Doorway Jambs, Relieved Tympanum, and Mouldings
// Polished chiseled surface with turquoise iridescence
export const carvedIceMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#0284c7'), // Chiseled glacial turquoise-cyan
  emissive: new THREE.Color('#034b75'),
  emissiveIntensity: 0.24,
  roughness: 0.10,
  metalness: 0.05,
  specularIntensity: 2.0,
  specularColor: new THREE.Color('#ffffff'),
  clearcoat: 1.0,
  clearcoatRoughness: 0.03,
  iridescence: 0.75,
  iridescenceIOR: 1.35,
  iridescenceThicknessRange: [150, 420],
  sheen: 0.72,
  sheenColor: new THREE.Color('#c084fc'),
  sheenRoughness: 0.16,
  flatShading: true,
});

// 4. Glacial Azure Ice for Spire Cones and Upper Pinnacles
export const spireIceMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#0369a1'), // Glacial azure
  emissive: new THREE.Color('#02476b'),
  emissiveIntensity: 0.28,
  roughness: 0.08,
  metalness: 0.06,
  specularIntensity: 2.1,
  specularColor: new THREE.Color('#ffffff'),
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  iridescence: 0.88,
  iridescenceIOR: 1.36,
  iridescenceThicknessRange: [160, 460],
  sheen: 0.85,
  sheenColor: new THREE.Color('#a855f7'),
  sheenRoughness: 0.14,
  flatShading: true,
});

// 5. High-Purity Sparkling Crystal Shard Material for Pinnacles, Sentinels, and Needles
export const crystalShardMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#38bdf8'), // Vibrant pure crystal cyan
  emissive: new THREE.Color('#0284c7'),
  emissiveIntensity: 0.35,
  roughness: 0.04,
  metalness: 0.08,
  specularIntensity: 2.3,
  specularColor: new THREE.Color('#ffffff'),
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  iridescence: 0.96,
  iridescenceIOR: 1.38,
  iridescenceThicknessRange: [180, 480],
  sheen: 0.90,
  sheenColor: new THREE.Color('#e879f9'), // Vibrant violet/magenta crystalline highlights
  sheenRoughness: 0.10,
  flatShading: true,
});

// 6. Frost-Accented Edge Trim for Step Nosings, Pilaster Ribs, Balustrades, and Arch Rims
export const iceTrimMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#93c5fd'), // Pale crystalline frost-blue
  emissive: new THREE.Color('#026aa2'),
  emissiveIntensity: 0.22,
  roughness: 0.06,
  metalness: 0.05,
  specularIntensity: 2.2,
  specularColor: new THREE.Color('#ffffff'),
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  sheen: 0.60,
  sheenColor: new THREE.Color('#c084fc'),
  sheenRoughness: 0.15,
  flatShading: true,
});

// 7. Deep Inset Panel Material for Shadow Cavities and Recessed Lancet Niches
export const insetPanelMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#0b243b'), // Deep glacial abyss
  emissive: new THREE.Color('#011220'),
  emissiveIntensity: 0.10,
  roughness: 0.32,
  metalness: 0.02,
  specularIntensity: 1.3,
  specularColor: new THREE.Color('#93c5fd'),
  clearcoat: 0.85,
  clearcoatRoughness: 0.10,
  flatShading: true,
});

// 8. Dark Window-Like Recess Cavity Material for Pierced Lancet Openings
export const windowRecessMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#041220'), // Dark crystalline interior shadow
  emissive: new THREE.Color('#010a14'),
  emissiveIntensity: 0.08,
  roughness: 0.40,
  metalness: 0.02,
  specularIntensity: 1.5,
  specularColor: new THREE.Color('#38bdf8'),
  clearcoat: 0.9,
  clearcoatRoughness: 0.08,
  flatShading: true,
});

// 9. Restrained Crystalline Highlight Accent (Keystones, Lozenges, Gable Needles)
export const crystallineAccentMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#22d3ee'), // Crisp turquoise highlight
  emissive: new THREE.Color('#0891b2'),
  emissiveIntensity: 0.30,
  roughness: 0.05,
  metalness: 0.06,
  specularIntensity: 2.2,
  specularColor: new THREE.Color('#ffffff'),
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  sheen: 0.82,
  sheenColor: new THREE.Color('#c084fc'),
  flatShading: true,
});

// 10. Radiant Luminescent Ice (Inner Core and Focal Needles)
export const glowingIceMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#67e8f9'),
  emissive: new THREE.Color('#00e5ff'),
  emissiveIntensity: 1.10,
  roughness: 0.04,
  metalness: 0.02,
  specularIntensity: 2.0,
  specularColor: new THREE.Color('#ffffff'),
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  iridescence: 0.70,
  iridescenceIOR: 1.32,
  flatShading: true,
});

// 11. Crisp Polar Snow Material for Treads, Walkways, and Terrain
export const snowMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#f1f5f9'),
  roughness: 0.90,
  metalness: 0.02,
  flatShading: false,
});

// 12. Architectural Diorama Pedestal Base Material
export const pedestalMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#070e1a'),
  roughness: 0.28,
  metalness: 0.78,
  flatShading: true,
});

// 13. Glacial Rock Stratification Material
export const glacialRockMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#0b1626'),
  roughness: 0.82,
  metalness: 0.20,
  flatShading: true,
});
