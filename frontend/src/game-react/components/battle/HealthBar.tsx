// ============= HEALTH BAR =============
// Barra de HP animada para batalha

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface HealthBarProps {
  current: number;
  max: number;
  showNumbers?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  current,
  max,
  showNumbers = true,
  size = 'md',
  className,
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  // Cor baseada na porcentagem
  const getColor = () => {
    if (percentage > 60) return 'bg-green-500';
    if (percentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={clsx('w-full', className)}>
      {showNumbers && (
        <div className="flex items-center justify-between mb-1 text-xs font-semibold">
          <span className="text-gray-400">HP</span>
          <span className={clsx(
            'text-white',
            percentage <= 30 && 'text-red-400 animate-pulse'
          )}>
            {Math.floor(current)} / {max}
          </span>
        </div>
      )}
      <div className={clsx(
        'w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700',
        sizeClasses[size]
      )}>
        <motion.div
          className={clsx('h-full rounded-full', getColor())}
          initial={{ width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
