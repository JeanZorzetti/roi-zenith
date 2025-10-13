// ============= PLAYER STORE =============
// Player state management with Zustand

import { create } from 'zustand';
import { PlayerState } from '../types/player.types';

interface PlayerStore extends PlayerState {
  // Actions
  setPlayer: (player: Partial<PlayerState>) => void;
  addExperience: (amount: number) => void;
  addCoins: (amount: number) => void;
  addGems: (amount: number) => void;
  useEnergy: (amount: number) => boolean;
  regenEnergy: (amount: number) => void;
  unlockTerritory: (territoryId: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // Initial state
  id: '',
  name: 'Player',
  level: 1,
  stats: {
    intelligence: 0,
    charisma: 0,
    perception: 0,
    resilience: 0,
    luck: 0,
  },
  resources: {
    coins: 0,
    gems: 0,
    energy: 100,
    maxEnergy: 100,
    experience: 0,
    experienceToNextLevel: 100,
  },
  currentTerritory: 'varejo',
  unlockedTerritories: ['varejo'],

  // Actions
  setPlayer: (player) => set((state) => ({ ...state, ...player })),

  addExperience: (amount) =>
    set((state) => {
      const newExp = state.resources.experience + amount;
      const toNext = state.resources.experienceToNextLevel;

      // Level up logic
      if (newExp >= toNext) {
        return {
          level: state.level + 1,
          resources: {
            ...state.resources,
            experience: newExp - toNext,
            experienceToNextLevel: Math.floor(toNext * 1.5),
          },
        };
      }

      return {
        resources: {
          ...state.resources,
          experience: newExp,
        },
      };
    }),

  addCoins: (amount) =>
    set((state) => ({
      resources: {
        ...state.resources,
        coins: state.resources.coins + amount,
      },
    })),

  addGems: (amount) =>
    set((state) => ({
      resources: {
        ...state.resources,
        gems: state.resources.gems + amount,
      },
    })),

  useEnergy: (amount) => {
    const state = get();
    if (state.resources.energy >= amount) {
      set({
        resources: {
          ...state.resources,
          energy: state.resources.energy - amount,
        },
      });
      return true;
    }
    return false;
  },

  regenEnergy: (amount) =>
    set((state) => ({
      resources: {
        ...state.resources,
        energy: Math.min(state.resources.maxEnergy, state.resources.energy + amount),
      },
    })),

  unlockTerritory: (territoryId) =>
    set((state) => ({
      unlockedTerritories: [...new Set([...state.unlockedTerritories, territoryId])],
    })),
}));
