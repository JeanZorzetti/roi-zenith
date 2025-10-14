// ============= ACHIEVEMENTS STORE =============
// Zustand store for achievements management

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACHIEVEMENT_DATABASE } from '../data/achievements';

// Re-export types from the old system for compatibility
export type AchievementCategory =
  | 'combat'
  | 'exploration'
  | 'collection'
  | 'progression'
  | 'social'
  | 'mastery';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  requirement: number;
  current: number;
  unlocked: boolean;
  hidden?: boolean;
  reward: {
    xp?: number;
    coins?: number;
    gems?: number;
    title?: string;
  };
  unlockedAt?: Date;
}

export interface AchievementStats {
  totalAchievements: number;
  unlockedAchievements: number;
  achievementPoints: number;
  completionPercentage: number;
  categoriesCompleted: Record<
    AchievementCategory,
    {
      total: number;
      unlocked: number;
    }
  >;
}

interface AchievementsStore {
  achievements: Achievement[];
  filter: 'all' | 'unlocked' | 'locked';
  categoryFilter: AchievementCategory | 'all';
  recentlyUnlocked: string[]; // IDs of recently unlocked achievements

  // Computed stats
  getStats: () => AchievementStats;

  // Actions
  setFilter: (filter: 'all' | 'unlocked' | 'locked') => void;
  setCategoryFilter: (category: AchievementCategory | 'all') => void;
  updateProgress: (achievementId: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
  clearRecentlyUnlocked: () => void;
  resetAchievements: () => void;
}

export const useAchievementsStore = create<AchievementsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      achievements: ACHIEVEMENT_DATABASE.map((ach) => ({ ...ach })),
      filter: 'all',
      categoryFilter: 'all',
      recentlyUnlocked: [],

      // Computed stats
      getStats: () => {
        const { achievements } = get();
        const total = achievements.length;
        const unlocked = achievements.filter((a) => a.unlocked).length;
        const points = achievements.filter((a) => a.unlocked).length * 10; // 10 points per achievement

        // Category stats
        const categories: AchievementCategory[] = ['combat', 'exploration', 'collection', 'progression', 'social', 'mastery'];
        const categoriesCompleted = categories.reduce(
          (acc, cat) => {
            const categoryAchs = achievements.filter((a) => a.category === cat);
            acc[cat] = {
              total: categoryAchs.length,
              unlocked: categoryAchs.filter((a) => a.unlocked).length,
            };
            return acc;
          },
          {} as Record<AchievementCategory, { total: number; unlocked: number }>
        );

        return {
          totalAchievements: total,
          unlockedAchievements: unlocked,
          achievementPoints: points,
          completionPercentage: total > 0 ? Math.round((unlocked / total) * 100) : 0,
          categoriesCompleted,
        };
      },

      // Actions
      setFilter: (filter) => set({ filter }),

      setCategoryFilter: (category) => set({ categoryFilter: category }),

      updateProgress: (achievementId, progress) =>
        set((state) => ({
          achievements: state.achievements.map((ach) => {
            if (ach.id === achievementId) {
              const newCurrent = Math.min(progress, ach.requirement);
              const shouldUnlock = newCurrent >= ach.requirement && !ach.unlocked;

              if (shouldUnlock) {
                // Auto-unlock if progress reaches requirement
                return {
                  ...ach,
                  current: newCurrent,
                  unlocked: true,
                  unlockedAt: new Date(),
                };
              }

              return { ...ach, current: newCurrent };
            }
            return ach;
          }),
        })),

      unlockAchievement: (achievementId) =>
        set((state) => ({
          achievements: state.achievements.map((ach) =>
            ach.id === achievementId && !ach.unlocked
              ? {
                  ...ach,
                  unlocked: true,
                  current: ach.requirement,
                  unlockedAt: new Date(),
                }
              : ach
          ),
          recentlyUnlocked: [...state.recentlyUnlocked, achievementId],
        })),

      clearRecentlyUnlocked: () => set({ recentlyUnlocked: [] }),

      resetAchievements: () =>
        set({
          achievements: ACHIEVEMENT_DATABASE.map((ach) => ({ ...ach })),
          filter: 'all',
          categoryFilter: 'all',
          recentlyUnlocked: [],
        }),
    }),
    {
      name: 'achievements-storage',
      partialize: (state) => ({
        achievements: state.achievements,
        recentlyUnlocked: state.recentlyUnlocked,
      }),
    }
  )
);
