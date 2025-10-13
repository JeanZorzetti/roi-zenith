// ============= BATTLE STORE =============
// Zustand store para o sistema de batalha

import { create } from 'zustand';
import { Character, BattleStatus, BattleEvent, BattleRewards, Skill } from '../types/battle.types';
import { CombatResolver } from '../managers/CombatResolver';

interface BattleStore {
  // State
  player: Character | null;
  enemy: Character | null;
  status: BattleStatus;
  turn: 'player' | 'enemy';
  turnCount: number;
  battleLog: BattleEvent[];
  rewards: BattleRewards | null;

  // Actions
  startBattle: (player: Character, enemy: Character) => void;
  attack: () => void;
  useSkill: (skillId: string) => void;
  endTurn: () => void;
  flee: () => void;
  reset: () => void;

  // Helpers
  addLogEvent: (event: BattleEvent) => void;
  processEnemyTurn: () => void;
  checkBattleEnd: () => void;
}

export const useBattleStore = create<BattleStore>((set, get) => ({
  // Initial state
  player: null,
  enemy: null,
  status: 'idle',
  turn: 'player',
  turnCount: 0,
  battleLog: [],
  rewards: null,

  // Iniciar batalha
  startBattle: (player: Character, enemy: Character) => {
    const firstTurn = CombatResolver.calculateInitiative(player, enemy);

    set({
      player,
      enemy,
      status: firstTurn === 'player' ? 'player_turn' : 'enemy_turn',
      turn: firstTurn,
      turnCount: 1,
      battleLog: [
        CombatResolver.createBattleEvent('turn_end', 'player', 'enemy', {
          customMessage: `Batalha iniciada! ${firstTurn === 'player' ? 'Você' : 'Inimigo'} ataca primeiro!`,
        }),
      ],
      rewards: null,
    });

    // Se inimigo começa, processar turno dele
    if (firstTurn === 'enemy') {
      setTimeout(() => get().processEnemyTurn(), 1000);
    }
  },

  // Ataque básico
  attack: () => {
    const { player, enemy, status } = get();
    if (!player || !enemy || status !== 'player_turn') return;

    set({ status: 'animating' });

    // Calcular dano
    const { damage, isCritical } = CombatResolver.calculateDamage(player, enemy);
    const updatedEnemy = CombatResolver.applyDamage(enemy, damage);

    // Adicionar evento ao log
    const event = CombatResolver.createBattleEvent('attack', 'player', 'enemy', {
      value: damage,
      isCritical,
    });

    set({
      enemy: updatedEnemy,
      battleLog: [...get().battleLog, event],
    });

    // Verificar fim de batalha
    setTimeout(() => {
      get().checkBattleEnd();
      if (get().status !== 'victory' && get().status !== 'defeat') {
        get().endTurn();
      }
    }, 1000);
  },

  // Usar skill
  useSkill: (skillId: string) => {
    const { player, enemy, status } = get();
    if (!player || !enemy || status !== 'player_turn') return;

    const skill = player.skills.find((s) => s.id === skillId);
    if (!skill || skill.currentCooldown > 0) return;

    set({ status: 'animating' });

    let updatedPlayer = { ...player };
    let updatedEnemy = { ...enemy };

    // Processar skill
    if (skill.type === 'attack') {
      const { damage, isCritical } = CombatResolver.calculateDamage(player, enemy, skill.power);
      updatedEnemy = CombatResolver.applyDamage(enemy, damage);

      get().addLogEvent(
        CombatResolver.createBattleEvent('skill', 'player', 'enemy', {
          skillName: skill.name,
          value: damage,
          isCritical,
        })
      );
    } else if (skill.type === 'heal') {
      const healAmount = Math.floor(player.stats.maxHp * skill.power);
      updatedPlayer = CombatResolver.applyHeal(player, healAmount);

      get().addLogEvent(
        CombatResolver.createBattleEvent('heal', 'player', 'player', {
          skillName: skill.name,
          value: healAmount,
        })
      );
    }

    // Colocar skill em cooldown
    updatedPlayer.skills = updatedPlayer.skills.map((s) =>
      s.id === skillId ? { ...s, currentCooldown: s.cooldown } : s
    );

    set({
      player: updatedPlayer,
      enemy: updatedEnemy,
    });

    // Verificar fim de batalha
    setTimeout(() => {
      get().checkBattleEnd();
      if (get().status !== 'victory' && get().status !== 'defeat') {
        get().endTurn();
      }
    }, 1000);
  },

  // Finalizar turno
  endTurn: () => {
    const { player, enemy, turn, turnCount } = get();
    if (!player || !enemy) return;

    // Processar efeitos de status
    const playerEffects = CombatResolver.processStatusEffects(player);
    const enemyEffects = CombatResolver.processStatusEffects(enemy);

    // Atualizar cooldowns
    const updatedPlayer = CombatResolver.updateSkillCooldowns(playerEffects.character);
    const updatedEnemy = CombatResolver.updateSkillCooldowns(enemyEffects.character);

    // Adicionar eventos de efeitos ao log
    const newEvents = [...playerEffects.events, ...enemyEffects.events];

    // Trocar turno
    const nextTurn = turn === 'player' ? 'enemy' : 'player';
    const nextStatus = nextTurn === 'player' ? 'player_turn' : 'enemy_turn';

    set({
      player: updatedPlayer,
      enemy: updatedEnemy,
      turn: nextTurn,
      status: nextStatus,
      turnCount: nextTurn === 'player' ? turnCount + 1 : turnCount,
      battleLog: [
        ...get().battleLog,
        ...newEvents,
        CombatResolver.createBattleEvent('turn_end', turn, nextTurn, {
          value: nextTurn === 'player' ? turnCount + 1 : turnCount,
        }),
      ],
    });

    // Verificar fim após efeitos
    get().checkBattleEnd();

    // Se é turno do inimigo, processar IA
    if (nextTurn === 'enemy' && get().status === 'enemy_turn') {
      setTimeout(() => get().processEnemyTurn(), 1500);
    }
  },

  // Processar turno do inimigo (IA)
  processEnemyTurn: () => {
    const { player, enemy, status } = get();
    if (!player || !enemy || status !== 'enemy_turn') return;

    set({ status: 'animating' });

    // IA decide ação
    const aiDecision = CombatResolver.enemyAI(enemy, player);

    if (aiDecision.action === 'attack') {
      // Ataque básico
      const { damage, isCritical } = CombatResolver.calculateDamage(enemy, player);
      const updatedPlayer = CombatResolver.applyDamage(player, damage);

      const event = CombatResolver.createBattleEvent('attack', 'enemy', 'player', {
        value: damage,
        isCritical,
      });

      set({
        player: updatedPlayer,
        battleLog: [...get().battleLog, event],
      });
    } else if (aiDecision.action === 'skill' && aiDecision.skillId) {
      // Usar skill
      const skill = enemy.skills.find((s) => s.id === aiDecision.skillId);
      if (skill) {
        const { damage, isCritical } = CombatResolver.calculateDamage(enemy, player, skill.power);
        const updatedPlayer = CombatResolver.applyDamage(player, damage);

        const event = CombatResolver.createBattleEvent('skill', 'enemy', 'player', {
          skillName: skill.name,
          value: damage,
          isCritical,
        });

        // Atualizar cooldown
        const updatedEnemy = {
          ...enemy,
          skills: enemy.skills.map((s) =>
            s.id === skill.id ? { ...s, currentCooldown: s.cooldown } : s
          ),
        };

        set({
          player: updatedPlayer,
          enemy: updatedEnemy,
          battleLog: [...get().battleLog, event],
        });
      }
    }

    // Verificar fim de batalha e trocar turno
    setTimeout(() => {
      get().checkBattleEnd();
      if (get().status !== 'victory' && get().status !== 'defeat') {
        get().endTurn();
      }
    }, 1000);
  },

  // Fugir da batalha
  flee: () => {
    const { status } = get();
    if (status === 'player_turn') {
      // 50% de chance de fugir
      if (Math.random() < 0.5) {
        set({
          status: 'idle',
          battleLog: [
            ...get().battleLog,
            CombatResolver.createBattleEvent('turn_end', 'player', 'enemy', {
              customMessage: 'Você fugiu da batalha com sucesso!',
            }),
          ],
        });
      } else {
        get().addLogEvent(
          CombatResolver.createBattleEvent('turn_end', 'player', 'enemy', {
            customMessage: 'Tentativa de fuga falhou!',
          })
        );
        get().endTurn();
      }
    }
  },

  // Verificar fim de batalha
  checkBattleEnd: () => {
    const { player, enemy } = get();
    if (!player || !enemy) return;

    if (CombatResolver.isDefeated(enemy)) {
      // Vitória
      const rewards = CombatResolver.calculateRewards(enemy, true);
      set({
        status: 'victory',
        rewards,
        battleLog: [
          ...get().battleLog,
          CombatResolver.createBattleEvent('turn_end', 'player', 'enemy', {
            customMessage: `Vitória! Você ganhou ${rewards.exp} XP e ${rewards.coins} moedas!`,
          }),
        ],
      });
    } else if (CombatResolver.isDefeated(player)) {
      // Derrota
      set({
        status: 'defeat',
        battleLog: [
          ...get().battleLog,
          CombatResolver.createBattleEvent('turn_end', 'enemy', 'player', {
            customMessage: 'Você foi derrotado!',
          }),
        ],
      });
    }
  },

  // Adicionar evento ao log
  addLogEvent: (event: BattleEvent) => {
    set({ battleLog: [...get().battleLog, event] });
  },

  // Reset
  reset: () => {
    set({
      player: null,
      enemy: null,
      status: 'idle',
      turn: 'player',
      turnCount: 0,
      battleLog: [],
      rewards: null,
    });
  },
}));
