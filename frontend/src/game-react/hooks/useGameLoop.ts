// ============= USE GAME LOOP HOOK =============
// Main game loop using requestAnimationFrame

import { useEffect, useRef, useCallback } from 'react';
import { usePlayerStore } from '../store/playerStore';

interface GameLoopCallbacks {
  onUpdate?: (deltaTime: number) => void;
  onEnergyUpdate?: (energy: number, maxEnergy: number) => void;
  onAutoSave?: () => void;
}

export const useGameLoop = (callbacks?: GameLoopCallbacks) => {
  const lastTimeRef = useRef<number>(Date.now());
  const lastEnergyUpdateRef = useRef<number>(Date.now());
  const lastAutoSaveRef = useRef<number>(Date.now());
  const rafIdRef = useRef<number>();

  const updateEnergy = usePlayerStore((state) => state.updateEnergy);
  const player = usePlayerStore((state) => state.player);

  // Energy regeneration: 1 energy per 5 minutes (300000ms)
  const ENERGY_REGEN_INTERVAL = 300000; // 5 minutes
  const AUTO_SAVE_INTERVAL = 300000; // 5 minutes

  const gameLoop = useCallback(() => {
    const now = Date.now();
    const deltaTime = now - lastTimeRef.current;
    lastTimeRef.current = now;

    // Update energy regeneration
    if (player && player.energy < player.maxEnergy) {
      const timeSinceLastEnergyUpdate = now - lastEnergyUpdateRef.current;

      if (timeSinceLastEnergyUpdate >= ENERGY_REGEN_INTERVAL) {
        const energyToAdd = Math.floor(timeSinceLastEnergyUpdate / ENERGY_REGEN_INTERVAL);
        const newEnergy = Math.min(player.energy + energyToAdd, player.maxEnergy);

        updateEnergy(newEnergy);
        lastEnergyUpdateRef.current = now;

        if (callbacks?.onEnergyUpdate) {
          callbacks.onEnergyUpdate(newEnergy, player.maxEnergy);
        }
      }
    }

    // Auto-save system
    const timeSinceLastAutoSave = now - lastAutoSaveRef.current;
    if (timeSinceLastAutoSave >= AUTO_SAVE_INTERVAL) {
      lastAutoSaveRef.current = now;

      if (callbacks?.onAutoSave) {
        callbacks.onAutoSave();
      }
    }

    // Call custom update callback
    if (callbacks?.onUpdate) {
      callbacks.onUpdate(deltaTime);
    }

    // Continue loop
    rafIdRef.current = requestAnimationFrame(gameLoop);
  }, [player, updateEnergy, callbacks]);

  useEffect(() => {
    // Start game loop
    rafIdRef.current = requestAnimationFrame(gameLoop);

    // Cleanup on unmount
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [gameLoop]);

  // Calculate time until next energy
  const getTimeUntilNextEnergy = useCallback(() => {
    if (!player || player.energy >= player.maxEnergy) return 0;

    const now = Date.now();
    const timeSinceLastUpdate = now - lastEnergyUpdateRef.current;
    const timeRemaining = ENERGY_REGEN_INTERVAL - timeSinceLastUpdate;

    return Math.max(0, timeRemaining);
  }, [player]);

  // Format time remaining as MM:SS
  const formatTimeRemaining = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    getTimeUntilNextEnergy,
    formatTimeRemaining,
    ENERGY_REGEN_INTERVAL,
    AUTO_SAVE_INTERVAL,
  };
};
