// ============= ACHIEVEMENT SYSTEM =============
// Manages player achievements and tracking

export type AchievementCategory = 'combat' | 'exploration' | 'collection' | 'progression' | 'social' | 'mastery';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  requirement: number; // target value
  current: number; // current progress
  unlocked: boolean;
  unlockedAt?: Date;
  hidden?: boolean; // Hidden until unlocked
  reward?: {
    xp?: number;
    coins?: number;
    gems?: number;
    title?: string;
  };
}

export class AchievementSystem {
  private achievements: Map<string, Achievement> = new Map();
  private listeners: Array<(achievement: Achievement) => void> = [];

  /**
   * Initialize achievement system with achievements
   */
  public initialize(achievements: Achievement[]): void {
    achievements.forEach(achievement => {
      this.achievements.set(achievement.id, achievement);
    });
    console.log(`🏆 Achievement System initialized with ${achievements.length} achievements`);
  }

  /**
   * Update achievement progress
   */
  public updateProgress(achievementId: string, value: number): boolean {
    const achievement = this.achievements.get(achievementId);
    if (!achievement || achievement.unlocked) return false;

    achievement.current = Math.min(value, achievement.requirement);

    // Check if unlocked
    if (achievement.current >= achievement.requirement) {
      this.unlockAchievement(achievementId);
      return true;
    }

    return false;
  }

  /**
   * Increment achievement progress
   */
  public incrementProgress(achievementId: string, amount: number = 1): boolean {
    const achievement = this.achievements.get(achievementId);
    if (!achievement || achievement.unlocked) return false;

    return this.updateProgress(achievementId, achievement.current + amount);
  }

  /**
   * Unlock an achievement
   */
  public unlockAchievement(achievementId: string): boolean {
    const achievement = this.achievements.get(achievementId);
    if (!achievement || achievement.unlocked) return false;

    achievement.unlocked = true;
    achievement.unlockedAt = new Date();
    achievement.current = achievement.requirement;

    console.log(`🏆 Achievement Unlocked: ${achievement.name}`);

    // Notify listeners
    this.listeners.forEach(listener => listener(achievement));

    // Save to localStorage
    this.save();

    return true;
  }

  /**
   * Get achievement by ID
   */
  public getAchievement(achievementId: string): Achievement | undefined {
    return this.achievements.get(achievementId);
  }

  /**
   * Get all achievements
   */
  public getAllAchievements(): Achievement[] {
    return Array.from(this.achievements.values());
  }

  /**
   * Get unlocked achievements
   */
  public getUnlockedAchievements(): Achievement[] {
    return this.getAllAchievements().filter(a => a.unlocked);
  }

  /**
   * Get achievements by category
   */
  public getAchievementsByCategory(category: AchievementCategory): Achievement[] {
    return this.getAllAchievements().filter(a => a.category === category);
  }

  /**
   * Get completion percentage
   */
  public getCompletionPercentage(): number {
    const total = this.achievements.size;
    const unlocked = this.getUnlockedAchievements().length;
    return total > 0 ? (unlocked / total) * 100 : 0;
  }

  /**
   * Add unlock listener
   */
  public onUnlock(callback: (achievement: Achievement) => void): void {
    this.listeners.push(callback);
  }

  /**
   * Check if achievement is unlocked
   */
  public isUnlocked(achievementId: string): boolean {
    const achievement = this.achievements.get(achievementId);
    return achievement?.unlocked || false;
  }

  /**
   * Save achievements to localStorage
   */
  public save(): void {
    const data = Array.from(this.achievements.values()).map(a => ({
      id: a.id,
      current: a.current,
      unlocked: a.unlocked,
      unlockedAt: a.unlockedAt
    }));
    localStorage.setItem('achievements', JSON.stringify(data));
  }

  /**
   * Load achievements from localStorage
   */
  public load(): void {
    const saved = localStorage.getItem('achievements');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      data.forEach((saved: any) => {
        const achievement = this.achievements.get(saved.id);
        if (achievement) {
          achievement.current = saved.current;
          achievement.unlocked = saved.unlocked;
          achievement.unlockedAt = saved.unlockedAt ? new Date(saved.unlockedAt) : undefined;
        }
      });
      console.log('🏆 Loaded achievement progress from save');
    } catch (error) {
      console.error('Failed to load achievements:', error);
    }
  }

  /**
   * Reset all achievements (for testing)
   */
  public reset(): void {
    this.achievements.forEach(achievement => {
      achievement.current = 0;
      achievement.unlocked = false;
      achievement.unlockedAt = undefined;
    });
    localStorage.removeItem('achievements');
    console.log('🏆 All achievements reset');
  }
}

// Singleton instance
const achievementSystem = new AchievementSystem();
export default achievementSystem;

console.log('🏆 Achievement System loaded');
