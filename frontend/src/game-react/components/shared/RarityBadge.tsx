// ============= RARITY BADGE =============
// Display item rarity badge with color

import React from 'react';
import { clsx } from 'clsx';
import type { ItemRarity } from '../../types/item.types';

export interface RarityBadgeProps {
  rarity: ItemRarity;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RarityBadge: React.FC<RarityBadgeProps> = ({
  rarity,
  size = 'md',
  className,
}) => {
  const rarityColors: Record<ItemRarity, string> = {
    common: 'bg-gray-500 text-white',
    uncommon: 'bg-green-500 text-white',
    rare: 'bg-blue-500 text-white',
    epic: 'bg-purple-500 text-white',
    legendary: 'bg-orange-500 text-white',
    mythic: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  };

  const rarityLabels: Record<ItemRarity, string> = {
    common: 'Comum',
    uncommon: 'Incomum',
    rare: 'Raro',
    epic: 'Épico',
    legendary: 'Lendário',
    mythic: 'Mítico',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-bold uppercase',
        rarityColors[rarity],
        sizes[size],
        className
      )}
    >
      {rarityLabels[rarity]}
    </span>
  );
};
