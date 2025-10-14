// ============= ACHIEVEMENT CARD =============
// Card component for individual achievement display

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Trophy, CheckCircle } from 'lucide-react';
import { Achievement } from '../../store/achievementsStore';
import clsx from 'clsx';

interface AchievementCardProps {
  achievement: Achievement;
  index?: number;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index = 0 }) => {
  const isUnlocked = achievement.unlocked;
  const isHidden = achievement.hidden && !achievement.unlocked;
  const progress = Math.min((achievement.current / achievement.requirement) * 100, 100);

  // Category colors
  const categoryColors: Record<string, string> = {
    combat: 'from-red-600 to-red-800',
    exploration: 'from-blue-600 to-blue-800',
    collection: 'from-purple-600 to-purple-800',
    progression: 'from-green-600 to-green-800',
    social: 'from-pink-600 to-pink-800',
    mastery: 'from-yellow-600 to-yellow-800',
  };

  const categoryBorderColors: Record<string, string> = {
    combat: 'border-red-500',
    exploration: 'border-blue-500',
    collection: 'border-purple-500',
    progression: 'border-green-500',
    social: 'border-pink-500',
    mastery: 'border-yellow-500',
  };

  const borderColor = isUnlocked
    ? categoryBorderColors[achievement.category]
    : 'border-gray-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
      className={clsx(
        'relative bg-gray-800 border-2 rounded-lg p-4 transition-all',
        borderColor,
        isUnlocked ? 'hover:scale-105 cursor-pointer' : 'opacity-75'
      )}
    >
      {/* Locked/Unlocked Badge */}
      <div className="absolute top-2 right-2">
        {isUnlocked ? (
          <div className="bg-green-500 rounded-full p-1">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="bg-gray-700 rounded-full p-1">
            <Lock className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>

      {/* Icon */}
      <div
        className={clsx(
          'w-16 h-16 rounded-full flex items-center justify-center text-4xl mb-3 mx-auto',
          'bg-gradient-to-br',
          isUnlocked ? categoryColors[achievement.category] : 'from-gray-700 to-gray-800'
        )}
      >
        {isHidden ? '❓' : achievement.icon}
      </div>

      {/* Title */}
      <h3
        className={clsx(
          'text-center font-bold text-lg mb-1',
          isUnlocked ? 'text-white' : 'text-gray-500'
        )}
      >
        {isHidden ? '???' : achievement.name}
      </h3>

      {/* Description */}
      <p
        className={clsx(
          'text-center text-sm mb-3',
          isUnlocked ? 'text-gray-300' : 'text-gray-600'
        )}
      >
        {isHidden ? 'Conquista secreta' : achievement.description}
      </p>

      {/* Progress Bar */}
      {!isUnlocked && !isHidden && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progresso</span>
            <span>
              {achievement.current}/{achievement.requirement}
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={clsx('h-full bg-gradient-to-r', categoryColors[achievement.category])}
            />
          </div>
        </div>
      )}

      {/* Rewards */}
      {!isHidden && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex flex-wrap gap-2 justify-center text-xs">
            {achievement.reward.xp && (
              <div className="flex items-center gap-1 bg-blue-900 bg-opacity-50 px-2 py-1 rounded">
                <Trophy className="w-3 h-3 text-blue-400" />
                <span className="text-blue-300">+{achievement.reward.xp} XP</span>
              </div>
            )}
            {achievement.reward.coins && (
              <div className="flex items-center gap-1 bg-yellow-900 bg-opacity-50 px-2 py-1 rounded">
                <span className="text-yellow-300">💰 +{achievement.reward.coins}</span>
              </div>
            )}
            {achievement.reward.gems && (
              <div className="flex items-center gap-1 bg-purple-900 bg-opacity-50 px-2 py-1 rounded">
                <span className="text-purple-300">💎 +{achievement.reward.gems}</span>
              </div>
            )}
            {achievement.reward.title && (
              <div className="flex items-center gap-1 bg-pink-900 bg-opacity-50 px-2 py-1 rounded">
                <span className="text-pink-300">🏆 {achievement.reward.title}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Unlocked date */}
      {isUnlocked && achievement.unlockedAt && (
        <div className="mt-2 text-center text-xs text-gray-500">
          Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
        </div>
      )}
    </motion.div>
  );
};
