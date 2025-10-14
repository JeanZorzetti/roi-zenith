// ============= BATTLE SCREEN =============
// Tela principal de batalha

import React, { useEffect, useState } from 'react';
import { GameLayout } from '../layout/GameLayout';
import { CharacterDisplay } from './CharacterDisplay';
import { BattleActions } from './BattleActions';
import { BattleLog } from './BattleLog';
import { VictoryModal } from './VictoryModal';
import { DefeatModal } from './DefeatModal';
import { useBattle } from '../../hooks/useBattle';
import { useGameStore } from '../../store/gameStore';
import { usePlayerStore } from '../../store/playerStore';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';

export const BattleScreen: React.FC = () => {
  const setScreen = useGameStore((state) => state.setScreen);
  const playerLevel = usePlayerStore((state) => state.level);

  const {
    player,
    enemy,
    status,
    turn,
    turnCount,
    battleLog,
    rewards,
    startBattle,
    attack,
    useSkill,
    flee,
    reset,
    isPlayerTurn,
    isEnemyTurn,
    isAnimating,
  } = useBattle();

  const [isDamaged, setIsDamaged] = useState<'player' | 'enemy' | null>(null);

  // Iniciar batalha quando entrar na tela (mock)
  useEffect(() => {
    if (status === 'idle') {
      // Mock de personagens para teste
      const mockPlayer = {
        id: 'player',
        name: 'Você',
        level: playerLevel,
        icon: 'User',
        stats: {
          maxHp: 100 + playerLevel * 10,
          currentHp: 100 + playerLevel * 10,
          attack: 15 + playerLevel * 2,
          defense: 10 + playerLevel,
          speed: 12,
          critChance: 15,
          critDamage: 1.5,
        },
        skills: [
          {
            id: 'skill_1',
            name: 'Ataque Poderoso',
            description: 'Um ataque com 150% de poder',
            type: 'attack' as const,
            power: 1.5,
            energyCost: 0,
            cooldown: 2,
            currentCooldown: 0,
            target: 'enemy' as const,
          },
          {
            id: 'skill_2',
            name: 'Cura',
            description: 'Recupera 30% do HP',
            type: 'heal' as const,
            power: 0.3,
            energyCost: 0,
            cooldown: 3,
            currentCooldown: 0,
            target: 'self' as const,
          },
        ],
        statusEffects: [],
      };

      const mockEnemy = {
        id: 'enemy',
        name: 'Concorrente',
        level: playerLevel,
        icon: 'Target',
        stats: {
          maxHp: 80 + playerLevel * 8,
          currentHp: 80 + playerLevel * 8,
          attack: 12 + playerLevel * 2,
          defense: 8 + playerLevel,
          speed: 10,
          critChance: 10,
          critDamage: 1.4,
        },
        skills: [
          {
            id: 'enemy_skill_1',
            name: 'Golpe Crítico',
            description: 'Ataque com chance aumentada de crítico',
            type: 'attack' as const,
            power: 1.3,
            energyCost: 0,
            cooldown: 2,
            currentCooldown: 0,
            target: 'enemy' as const,
          },
        ],
        statusEffects: [],
      };

      startBattle(mockPlayer, mockEnemy);
    }
  }, [status, playerLevel, startBattle]);

  // Detectar dano para animação
  useEffect(() => {
    const lastEvent = battleLog[battleLog.length - 1];
    if (lastEvent && (lastEvent.type === 'attack' || lastEvent.type === 'damage')) {
      setIsDamaged(lastEvent.target);
      setTimeout(() => setIsDamaged(null), 400);
    }
  }, [battleLog]);

  const handleVictory = () => {
    // Adicionar recompensas ao player
    if (rewards) {
      // TODO: Integrar com playerStore para adicionar XP e coins
      console.log('Rewards:', rewards);
    }
    reset();
    setScreen('worldmap');
  };

  const handleDefeat = () => {
    reset();
    setScreen('worldmap');
  };

  const handleRetry = () => {
    reset();
    // Reiniciar batalha será feito automaticamente pelo useEffect
  };

  if (!player || !enemy) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-white">Carregando batalha...</p>
      </div>
    );
  }

  return (
    <>
      <GameLayout>
        <div className="h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 border-b border-gray-800">
            <Swords className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            <h1 className="text-responsive-2xl font-bold text-white">BATALHA</h1>
            <span className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-400 text-xs sm:text-sm font-semibold rounded-full">
              Turno {turnCount}
            </span>
          </div>

          {/* Battlefield - Responsive Layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_350px] gap-3 sm:gap-4 lg:gap-6 p-responsive h-[calc(100%-4rem)]">
            {/* Arena Section */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 flex-1">
              {/* Characters - Stack vertically on mobile, side by side on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 flex-1">
                {/* Player */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="full-width-mobile"
                >
                  <CharacterDisplay
                    character={player}
                    isEnemy={false}
                    isActive={isPlayerTurn}
                    isDamaged={isDamaged === 'player'}
                  />
                </motion.div>

                {/* Enemy */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="full-width-mobile"
                >
                  <CharacterDisplay
                    character={enemy}
                    isEnemy={true}
                    isActive={isEnemyTurn}
                    isDamaged={isDamaged === 'enemy'}
                  />
                </motion.div>
              </div>

              {/* Battle Log - Smaller on mobile */}
              <div className="h-32 sm:h-40 lg:h-48 hidden-mobile">
                <BattleLog events={battleLog} />
              </div>
            </div>

            {/* Actions Panel - Full width on mobile, sidebar on desktop */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-3 sm:p-4 lg:p-6 full-width-mobile">
              <BattleActions
                onAttack={attack}
                onUseSkill={useSkill}
                onFlee={flee}
                skills={player.skills}
                disabled={!isPlayerTurn || isAnimating}
              />
            </div>

            {/* Battle Log - Show below actions on mobile */}
            <div className="h-32 lg:hidden">
              <BattleLog events={battleLog} />
            </div>
          </div>
        </div>
      </GameLayout>

      {/* Victory Modal */}
      {status === 'victory' && rewards && (
        <VictoryModal
          isOpen={true}
          rewards={rewards}
          onContinue={handleVictory}
        />
      )}

      {/* Defeat Modal */}
      {status === 'defeat' && (
        <DefeatModal
          isOpen={true}
          onRetry={handleRetry}
          onReturn={handleDefeat}
        />
      )}
    </>
  );
};
