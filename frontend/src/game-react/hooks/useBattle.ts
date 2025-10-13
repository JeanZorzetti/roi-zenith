// ============= USE BATTLE HOOK =============
// Hook customizado para batalha

import { useMemo } from 'react';
import { useBattleStore } from '../store/battleStore';

export const useBattle = () => {
  // State
  const player = useBattleStore((state) => state.player);
  const enemy = useBattleStore((state) => state.enemy);
  const status = useBattleStore((state) => state.status);
  const turn = useBattleStore((state) => state.turn);
  const turnCount = useBattleStore((state) => state.turnCount);
  const battleLog = useBattleStore((state) => state.battleLog);
  const rewards = useBattleStore((state) => state.rewards);

  // Actions
  const startBattle = useBattleStore((state) => state.startBattle);
  const attack = useBattleStore((state) => state.attack);
  const useSkill = useBattleStore((state) => state.useSkill);
  const endTurn = useBattleStore((state) => state.endTurn);
  const flee = useBattleStore((state) => state.flee);
  const reset = useBattleStore((state) => state.reset);

  // Computed values
  const isPlayerTurn = useMemo(() => turn === 'player' && status === 'player_turn', [turn, status]);
  const isEnemyTurn = useMemo(() => turn === 'enemy' && status === 'enemy_turn', [turn, status]);
  const isBattleActive = useMemo(
    () => status !== 'idle' && status !== 'victory' && status !== 'defeat',
    [status]
  );
  const isAnimating = useMemo(() => status === 'animating', [status]);

  // Player stats
  const playerHpPercentage = useMemo(() => {
    if (!player) return 0;
    return (player.stats.currentHp / player.stats.maxHp) * 100;
  }, [player]);

  const enemyHpPercentage = useMemo(() => {
    if (!enemy) return 0;
    return (enemy.stats.currentHp / enemy.stats.maxHp) * 100;
  }, [enemy]);

  // Available skills (not on cooldown)
  const availableSkills = useMemo(() => {
    if (!player) return [];
    return player.skills.filter((skill) => skill.currentCooldown === 0);
  }, [player]);

  // Get last N log events
  const getRecentLog = (count: number = 5) => {
    return battleLog.slice(-count);
  };

  return {
    // State
    player,
    enemy,
    status,
    turn,
    turnCount,
    battleLog,
    rewards,

    // Actions
    startBattle,
    attack,
    useSkill,
    endTurn,
    flee,
    reset,

    // Computed
    isPlayerTurn,
    isEnemyTurn,
    isBattleActive,
    isAnimating,
    playerHpPercentage,
    enemyHpPercentage,
    availableSkills,

    // Helpers
    getRecentLog,
  };
};
