// ============= CHARACTER DISPLAY =============
// Display de personagem na batalha

import React, { memo } from 'react';
import { Character } from '../../types/battle.types';
import { HealthBar } from './HealthBar';
import { motion } from 'framer-motion';
import { Shield, Sword, Zap, Target } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import clsx from 'clsx';

interface CharacterDisplayProps {
  character: Character;
  isEnemy?: boolean;
  isActive?: boolean;
  isDamaged?: boolean;
}

const CharacterDisplayComponent: React.FC<CharacterDisplayProps> = ({
  character,
  isEnemy = false,
  isActive = false,
  isDamaged = false,
}) => {
  const Icon = (LucideIcons[character.icon as keyof typeof LucideIcons] as React.ComponentType<any>) || LucideIcons.User;

  return (
    <div className={clsx(
      'relative p-6 rounded-xl border-2 transition-all',
      isActive ? 'border-blue-500 bg-blue-900 bg-opacity-20' : 'border-gray-700 bg-gray-800',
      isEnemy ? 'bg-red-900 bg-opacity-10' : 'bg-blue-900 bg-opacity-10'
    )}>
      {/* Badge de turno ativo */}
      {isActive && (
        <motion.div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isEnemy ? 'TURNO DO INIMIGO' : 'SEU TURNO'}
        </motion.div>
      )}

      {/* Avatar do personagem */}
      <motion.div
        className={clsx(
          'w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center',
          isEnemy
            ? 'bg-gradient-to-br from-red-600 to-red-800'
            : 'bg-gradient-to-br from-blue-600 to-blue-800',
          isActive && 'ring-4 ring-blue-400 ring-opacity-50'
        )}
        animate={isDamaged ? {
          x: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.4 }
        } : {}}
      >
        <Icon className="w-16 h-16 text-white" />
      </motion.div>

      {/* Nome e nível */}
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
        <div className="flex items-center justify-center gap-2">
          <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-full">
            Nv. {character.level}
          </span>
        </div>
      </div>

      {/* Health Bar */}
      <HealthBar
        current={character.stats.currentHp}
        max={character.stats.maxHp}
        size="lg"
        className="mb-4"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1 text-gray-300">
          <Sword className="w-3 h-3 text-red-400" />
          <span>ATK: {character.stats.attack}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-300">
          <Shield className="w-3 h-3 text-blue-400" />
          <span>DEF: {character.stats.defense}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-300">
          <Zap className="w-3 h-3 text-yellow-400" />
          <span>SPD: {character.stats.speed}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-300">
          <Target className="w-3 h-3 text-purple-400" />
          <span>CRIT: {character.stats.critChance}%</span>
        </div>
      </div>

      {/* Status Effects */}
      {character.statusEffects.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {character.statusEffects.map((effect) => (
            <div
              key={effect.id}
              className={clsx(
                'px-2 py-1 text-xs rounded border',
                effect.type === 'buff' && 'bg-green-900 border-green-500 text-green-300',
                effect.type === 'debuff' && 'bg-red-900 border-red-500 text-red-300',
                effect.type === 'dot' && 'bg-orange-900 border-orange-500 text-orange-300',
                effect.type === 'hot' && 'bg-blue-900 border-blue-500 text-blue-300'
              )}
            >
              {effect.name} ({effect.duration})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export const CharacterDisplay = memo(CharacterDisplayComponent, (prevProps, nextProps) => {
  // Only re-render if these props change
  return (
    prevProps.character.stats.currentHp === nextProps.character.stats.currentHp &&
    prevProps.isActive === nextProps.isActive &&
    prevProps.isDamaged === nextProps.isDamaged &&
    prevProps.character.statusEffects.length === nextProps.character.statusEffects.length
  );
});
