// Game configuration constants
export const GAME_CONFIG = {
  width: 1200,
  height: 800,
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
  textSecondary: '#9ca3af',
  textMuted: '#9ca3af',
  textLight: '#e4e4e7',
  textDim: '#6b7280',
  border: '#374151',
  accent: '#3b82f6',
  panelDark: '#16213e',
  panelLight: '#1e293b'
};

export const SCENE_KEYS = {
  BOOT: 'BootScene',
  MENU: 'MenuScene',
  WORLD_MAP: 'WorldMapScene',
  TERRITORY_DETAIL: 'TerritoryDetailScene',
  BATTLE: 'BattleScene',
  INVENTORY: 'InventoryScene',
  PARTY: 'PartyScene',
  QUESTS: 'QuestScene',
  UI: 'UIScene',
  SETTINGS: 'SettingsScene',
  ACHIEVEMENTS: 'AchievementScene'
};
