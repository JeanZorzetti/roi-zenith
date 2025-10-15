// ============= TERRITORY CARD =============
// Card de território no mapa mundial

import React, { memo, useMemo } from 'react';
import { Territory } from '../../store/worldMapStore';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Circle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import clsx from 'clsx';

interface TerritoryCardProps {
  territory: Territory;
  onClick: () => void;
}

const colorClasses: Record<string, string> = {
  blue: 'from-blue-600 to-blue-800 border-blue-500',
  purple: 'from-purple-600 to-purple-800 border-purple-500',
  green: 'from-green-600 to-green-800 border-green-500',
  orange: 'from-orange-600 to-orange-800 border-orange-500',
  red: 'from-red-600 to-red-800 border-red-500',
};

const TerritoryCardComponent: React.FC<TerritoryCardProps> = ({ territory, onClick }) => {
  const Icon = useMemo(
    () => (LucideIcons[territory.icon as keyof typeof LucideIcons] as React.ComponentType<any>) || LucideIcons.Map,
    [territory.icon]
  );

  const gradientClass = useMemo(() => colorClasses[territory.color] || colorClasses.blue, [territory.color]);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.button
      variants={itemVariants}
      onClick={territory.isUnlocked ? onClick : undefined}
      disabled={!territory.isUnlocked}
      className={clsx(
        'relative p-6 rounded-xl border-2 transition-all duration-300',
        'flex flex-col items-center text-center',
        territory.isUnlocked
          ? 'cursor-pointer hover:scale-105 hover:shadow-2xl'
          : 'cursor-not-allowed opacity-50',
        territory.isCurrent && 'ring-4 ring-blue-400 ring-opacity-50',
        !territory.isUnlocked && 'bg-gray-800 border-gray-700'
      )}
      style={
        territory.isUnlocked
          ? {
              background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              borderColor: `var(--tw-${territory.color}-500)`,
            }
          : undefined
      }
      whileHover={territory.isUnlocked ? { y: -8 } : undefined}
      whileTap={territory.isUnlocked ? { scale: 0.95 } : undefined}
    >
      {/* Badge de status */}
      <div className="absolute top-3 right-3">
        {territory.isCurrent && (
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
            <Circle className="w-3 h-3 fill-current" />
            <span>ATUAL</span>
          </div>
        )}
        {!territory.isUnlocked && (
          <div className="p-2 bg-gray-700 rounded-full">
            <Lock className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>

      {/* Ícone do território */}
      <div
        className={clsx(
          'w-20 h-20 rounded-full flex items-center justify-center mb-4',
          territory.isUnlocked
            ? `bg-gradient-to-br ${gradientClass}`
            : 'bg-gray-700'
        )}
      >
        <Icon className="w-10 h-10 text-white" />
      </div>

      {/* Nome e descrição */}
      <h3 className="text-xl font-bold text-white mb-2">{territory.name}</h3>
      <p className="text-sm text-gray-300 mb-4 line-clamp-2">{territory.description}</p>

      {/* Progresso */}
      {territory.isUnlocked && (
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>Progresso</span>
            <span className="font-bold">{territory.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-900 bg-opacity-50 rounded-full overflow-hidden">
            <motion.div
              className={clsx('h-full bg-gradient-to-r', gradientClass)}
              initial={{ width: 0 }}
              animate={{ width: `${territory.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              {territory.completedQuests}/{territory.totalQuests} Quests
            </span>
          </div>
        </div>
      )}

      {/* Requisitos (se bloqueado) */}
      {!territory.isUnlocked && territory.requirements && (
        <div className="mt-4 p-3 bg-gray-900 bg-opacity-50 rounded-lg text-xs text-gray-400">
          <p className="font-semibold text-gray-300 mb-1">Requisitos:</p>
          {territory.requirements.level && (
            <p>• Nível {territory.requirements.level}</p>
          )}
          {territory.requirements.completedTerritories && (
            <p>• Complete: {territory.requirements.completedTerritories.join(', ')}</p>
          )}
        </div>
      )}

      {/* Indicador de hover */}
      {territory.isUnlocked && (
        <div className="absolute inset-0 rounded-xl bg-white opacity-0 hover:opacity-10 transition-opacity pointer-events-none" />
      )}
    </motion.button>
  );
};

// Memoize to prevent re-renders when territory hasn't changed
export const TerritoryCard = memo(TerritoryCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.territory.id === nextProps.territory.id &&
    prevProps.territory.progress === nextProps.territory.progress &&
    prevProps.territory.isCurrent === nextProps.territory.isCurrent &&
    prevProps.territory.isUnlocked === nextProps.territory.isUnlocked
  );
});
