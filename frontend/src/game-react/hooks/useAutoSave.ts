// ============= USE AUTO SAVE HOOK =============
// Auto-save system with configurable interval

import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { usePlayerStore } from '../store/playerStore';
import { useInventoryStore } from '../store/inventoryStore';
import { useAchievementsStore } from '../store/achievementsStore';
import { useToast } from '../components/ui/Toast';

interface AutoSaveOptions {
  interval?: number; // in milliseconds
  enabled?: boolean;
  showNotification?: boolean;
  saveOnUnload?: boolean;
}

const DEFAULT_OPTIONS: Required<AutoSaveOptions> = {
  interval: 300000, // 5 minutes
  enabled: true,
  showNotification: true,
  saveOnUnload: true,
};

export const useAutoSave = (options: AutoSaveOptions = {}) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const intervalRef = useRef<NodeJS.Timeout>();
  const lastSaveTimeRef = useRef<number>(Date.now());
  const toast = useToast();

  // Get all stores (they already persist to localStorage via zustand/persist)
  const gameState = useGameStore((state) => state);
  const playerState = usePlayerStore((state) => state);
  const inventoryState = useInventoryStore((state) => state);
  const achievementsState = useAchievementsStore((state) => state);

  /**
   * Perform save operation
   * Note: Zustand stores with persist middleware automatically save to localStorage
   * This function mainly provides visual feedback and manual save trigger
   */
  const performSave = useCallback(() => {
    try {
      // Stores are already persisting automatically via zustand/persist
      // We just need to update the last save time and show notification

      lastSaveTimeRef.current = Date.now();

      if (opts.showNotification) {
        toast.success('Jogo salvo', 'Progresso salvo automaticamente', 2000);
      }

      console.log('🎮 Auto-save completed at:', new Date().toLocaleTimeString());

      return true;
    } catch (error) {
      console.error('❌ Auto-save failed:', error);

      if (opts.showNotification) {
        toast.error('Erro ao salvar', 'Não foi possível salvar o progresso');
      }

      return false;
    }
  }, [opts.showNotification, toast]);

  /**
   * Manual save trigger
   */
  const manualSave = useCallback(() => {
    return performSave();
  }, [performSave]);

  /**
   * Get last save time
   */
  const getLastSaveTime = useCallback(() => {
    return lastSaveTimeRef.current;
  }, []);

  /**
   * Get time since last save
   */
  const getTimeSinceLastSave = useCallback(() => {
    return Date.now() - lastSaveTimeRef.current;
  }, []);

  // Setup auto-save interval
  useEffect(() => {
    if (!opts.enabled) return;

    intervalRef.current = setInterval(() => {
      performSave();
    }, opts.interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [opts.enabled, opts.interval, performSave]);

  // Save on page unload/close
  useEffect(() => {
    if (!opts.saveOnUnload) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      performSave();
      // Optionally show confirmation dialog (uncomment if needed)
      // e.preventDefault();
      // e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [opts.saveOnUnload, performSave]);

  // Save when component unmounts
  useEffect(() => {
    return () => {
      if (opts.enabled) {
        performSave();
      }
    };
  }, [opts.enabled, performSave]);

  return {
    manualSave,
    getLastSaveTime,
    getTimeSinceLastSave,
    performSave,
  };
};
