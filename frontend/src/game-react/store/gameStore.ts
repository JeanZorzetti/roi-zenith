// ============= GAME STORE =============
// Global game state management with Zustand

import { create } from 'zustand';
import { GameScreen, GameState } from '../types/game.types';

interface GameStore extends GameState {
  // Actions
  setScreen: (screen: GameScreen) => void;
  setLoading: (isLoading: boolean) => void;
  setPaused: (isPaused: boolean) => void;
  updateGameTime: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  // Initial state
  currentScreen: 'menu',
  isLoading: false,
  isPaused: false,
  lastUpdate: Date.now(),

  // Actions
  setScreen: (screen) => set({ currentScreen: screen }),

  setLoading: (isLoading) => set({ isLoading }),

  setPaused: (isPaused) => set({ isPaused }),

  updateGameTime: () => set({ lastUpdate: Date.now() }),
}));
