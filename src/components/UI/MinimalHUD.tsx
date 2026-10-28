import React from 'react';
import type { CameraMode, SceneSettings } from '../../types';
import { Eye, Box, RotateCcw, CloudSnow, Sparkles } from 'lucide-react';

interface MinimalHUDProps {
  mode: CameraMode;
  onModeChange: (newMode: CameraMode) => void;
  onResetCamera: () => void;
  settings: SceneSettings;
  onUpdateSettings: (updater: (prev: SceneSettings) => SceneSettings) => void;
}

export const MinimalHUD: React.FC<MinimalHUDProps> = ({
  mode,
  onModeChange,
  onResetCamera,
  settings,
  onUpdateSettings,
}) => {
  return (
    <div className="hud-container">
      {/* Top Header Row */}
      <header className="hud-header">
        {/* Editorial Wordmark Branding */}
        <div className="hud-branding">
          <h1 className="hud-title">Frostbound</h1>
          <p className="hud-subtitle">Interactive 3D Ice Castle</p>
        </div>

        {/* Minimalist Environmental & Camera Interaction Controls */}
        <nav aria-label="Scene Controls" className="ui-control-cluster">
          {/* Snow Toggle */}
          <button
            type="button"
            onClick={() =>
              onUpdateSettings((prev) => ({ ...prev, showSnow: !prev.showSnow }))
            }
            title={settings.showSnow ? 'Hide Snowfall' : 'Show Snowfall'}
            aria-pressed={settings.showSnow}
            className={`ui-btn-reset ui-cluster-btn ${settings.showSnow ? 'active-snow' : ''}`}
          >
            <CloudSnow
              size={13}
              strokeWidth={settings.showSnow ? 1.75 : 1.4}
              style={{ color: settings.showSnow ? '#38bdf8' : 'currentColor' }}
            />
            <span className="btn-label">Snow</span>
            <span
              className={`status-dot ${
                settings.showSnow ? 'status-dot-snow-active' : 'status-dot-snow-inactive'
              }`}
            />
          </button>

          <span className="ui-divider" />

          {/* Aurora Toggle */}
          <button
            type="button"
            onClick={() =>
              onUpdateSettings((prev) => ({
                ...prev,
                showAurora: !prev.showAurora,
              }))
            }
            title={settings.showAurora ? 'Disable Aurora' : 'Enable Aurora'}
            aria-pressed={settings.showAurora}
            className={`ui-btn-reset ui-cluster-btn ${settings.showAurora ? 'active-aurora' : ''}`}
          >
            <Sparkles
              size={13}
              strokeWidth={settings.showAurora ? 1.75 : 1.4}
              style={{ color: settings.showAurora ? '#c084fc' : 'currentColor' }}
            />
            <span className="btn-label">Aurora</span>
            <span
              className={`status-dot ${
                settings.showAurora ? 'status-dot-aurora-active' : 'status-dot-aurora-inactive'
              }`}
            />
          </button>

          <span className="ui-divider" />

          {/* Reset Camera Button */}
          <button
            type="button"
            onClick={onResetCamera}
            title="Reset Perspective"
            className="ui-btn-reset ui-cluster-btn"
          >
            <RotateCcw size={13} strokeWidth={1.4} />
            <span className="btn-label">Reset</span>
          </button>
        </nav>
      </header>

      {/* Bottom Center Mode Switcher & Contextual Copy */}
      <footer className="hud-footer">
        {/* Architectural View Mode Selector */}
        <div role="tablist" aria-label="Perspective View Modes" className="ui-control-cluster">
          {/* Visitor View */}
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'visitor'}
            onClick={() => onModeChange('visitor')}
            className={`ui-btn-reset ui-tab-btn ${mode === 'visitor' ? 'active' : ''}`}
          >
            <Eye
              size={13}
              strokeWidth={mode === 'visitor' ? 1.75 : 1.4}
              style={{ color: mode === 'visitor' ? '#38bdf8' : 'currentColor' }}
            />
            <span>Visitor View</span>
          </button>

          {/* Diorama View */}
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'miniature'}
            onClick={() => onModeChange('miniature')}
            className={`ui-btn-reset ui-tab-btn ${mode === 'miniature' ? 'active' : ''}`}
          >
            <Box
              size={13}
              strokeWidth={mode === 'miniature' ? 1.75 : 1.4}
              style={{ color: mode === 'miniature' ? '#38bdf8' : 'currentColor' }}
            />
            <span>Diorama View</span>
          </button>
        </div>

        {/* Refined Contextual Label */}
        <div className="contextual-label">
          {mode === 'visitor'
            ? 'Explore the frozen architecture'
            : 'A study in crystalline form'}
        </div>
      </footer>
    </div>
  );
};
