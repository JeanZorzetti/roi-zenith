// ============= BATTLE TYPES =============
// Tipos para o sistema de batalha

export type BattleStatus = 'idle' | 'player_turn' | 'enemy_turn' | 'animating' | 'victory' | 'defeat';

export interface CharacterStats {
  maxHp: number;
  currentHp: number;
  attack: number;
  defense: number;
  speed: number;
  critChance: number; // 0-100
  critDamage: number; // multiplier (ex: 1.5 = 150%)
}

export interface Character {
  id: string;
  name: string;
  level: number;
  icon: string;
  stats: CharacterStats;
  skills: Skill[];
  statusEffects: StatusEffect[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'attack' | 'buff' | 'debuff' | 'heal';
  power: number; // multiplicador de dano ou cura
  energyCost: number;
  cooldown: number;
  currentCooldown: number;
  target: 'self' | 'enemy';
  effects?: StatusEffect[];
}

export interface StatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff' | 'dot' | 'hot'; // damage/heal over time
  duration: number; // turnos restantes
  value: number;
  stat?: keyof CharacterStats; // qual stat é afetado
}

export interface BattleEvent {
  id: string;
  timestamp: number;
  type: 'attack' | 'skill' | 'damage' | 'heal' | 'buff' | 'debuff' | 'status_effect' | 'turn_end';
  actor: 'player' | 'enemy';
  target: 'player' | 'enemy';
  value?: number;
  isCritical?: boolean;
  skillName?: string;
  message: string;
}

export interface BattleRewards {
  exp: number;
  coins: number;
  items: string[];
}

export interface BattleState {
  // Characters
  player: Character;
  enemy: Character;

  // Battle state
  status: BattleStatus;
  turn: 'player' | 'enemy';
  turnCount: number;
  battleLog: BattleEvent[];

  // Rewards (se vitória)
  rewards?: BattleRewards;
}
