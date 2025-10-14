// ============= ACHIEVEMENT TYPES =============
// Types for the achievements system

export type AchievementCategory =
  | 'progression'
  | 'combat'
  | 'collection'
  | 'exploration'
  | 'mastery'
  | 'social';

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string;

  // Progress tracking
  current: number;
  target: number;

  // Status
  isUnlocked: boolean;
  unlockedAt?: Date;
  isHidden: boolean; // Hidden until unlocked

  // Rewards
  rewards: {
    exp?: number;
    coins?: number;
    items?: string[];
    title?: string;
  };
}

export interface AchievementStats {
  totalAchievements: number;
  unlockedAchievements: number;
  achievementPoints: number;
  completionPercentage: number;
  categoriesCompleted: Record<AchievementCategory, {
    total: number;
    unlocked: number;
  }>;
}
