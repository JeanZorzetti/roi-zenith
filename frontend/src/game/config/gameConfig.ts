// Game configuration constants
export const GAME_CONFIG = {
  width: 800,
  height: 600,
  backgroundColor: '#1a1a2e',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#1a1a2e',
  cardBg: '#16213e',
  text: '#e4e4e7',
  textMuted: '#9ca3af',
  border: '#374151'
};

export const SCENE_KEYS = {
  BOOT: 'BootScene',
  MENU: 'MenuScene',
  WORLD_MAP: 'WorldMapScene',
  BATTLE: 'BattleScene',
  UI: 'UIScene'
};
