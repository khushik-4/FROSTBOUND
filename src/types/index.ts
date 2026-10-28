export type CameraMode = 'visitor' | 'miniature';

export interface SceneSettings {
  showSnow: boolean;
  showAurora: boolean;
  iceLuminescence: number;
}

export interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}
