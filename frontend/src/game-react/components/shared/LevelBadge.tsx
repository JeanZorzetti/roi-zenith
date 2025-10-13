// ============= LEVEL BADGE =============
// Display level badge

import React from 'react';
import { clsx } from 'clsx';

export interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  size = 'md',
  className,
}) => {
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-bold',
        'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
        sizes[size],
        className
      )}
    >
      Lvl {level}
    </span>
  );
};
