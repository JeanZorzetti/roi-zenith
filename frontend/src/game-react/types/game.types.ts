// ============= GAME TYPES =============
// Core game type definitions

export type GameScreen =
  | 'menu'
  | 'worldmap'
  | 'battle'
  | 'inventory'
  | 'settings'
  | 'achievements'
  | 'party'
  | 'quest';

export interface GameState {
  currentScreen: GameScreen;
  isLoading: boolean;
  isPaused: boolean;
  lastUpdate: number;
}

export interface SaveSlot {
  id: string;
  playerName: string;
  level: number;
  territory: string;
  playTime: number;
  lastSaved: Date;
}
