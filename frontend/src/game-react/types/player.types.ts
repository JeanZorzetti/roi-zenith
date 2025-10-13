// ============= PLAYER TYPES =============
// Player-related type definitions

export interface PlayerStats {
  intelligence: number;
  charisma: number;
  perception: number;
  resilience: number;
  luck: number;
}

export interface PlayerResources {
  coins: number;
  gems: number;
  energy: number;
  maxEnergy: number;
  experience: number;
  experienceToNextLevel: number;
}

export interface PlayerState {
  id: string;
  name: string;
  level: number;
  stats: PlayerStats;
  resources: PlayerResources;
  currentTerritory: string;
  unlockedTerritories: string[];
}
