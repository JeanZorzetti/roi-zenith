// ============= RESOURCE DISPLAY =============
// Display player resources (coins, gems, energy, XP)

import React from 'react';
import { Coins, Gem, Zap, Star } from 'lucide-react';
import { clsx } from 'clsx';
import { usePlayerStore } from '../../store/playerStore';

export interface ResourceDisplayProps {
  className?: string;
  compact?: boolean;
}

export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
  className,
  compact = false,
}) => {
  const resources = usePlayerStore((state) => state.resources);
  const level = usePlayerStore((state) => state.level);

  const items = [
    {
      icon: Coins,
      value: resources.coins,
      label: 'Coins',
      color: 'text-yellow-400',
    },
    {
      icon: Gem,
      value: resources.gems,
      label: 'Gems',
      color: 'text-purple-400',
    },
    {
      icon: Zap,
      value: `${resources.energy}/${resources.maxEnergy}`,
      label: 'Energy',
      color: 'text-blue-400',
    },
    {
      icon: Star,
      value: `Lvl ${level}`,
      label: 'Level',
      color: 'text-green-400',
    },
  ];

  if (compact) {
    return (
      <div className={clsx('flex items-center gap-4', className)}>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <item.icon className={clsx('h-4 w-4', item.color)} />
            <span className="text-sm font-medium text-white">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={clsx('grid grid-cols-2 md:grid-cols-4 gap-3', className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2">
          <item.icon className={clsx('h-5 w-5', item.color)} />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">{item.value}</span>
            <span className="text-xs text-gray-400">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
