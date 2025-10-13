// ============= ITEM TOOLTIP =============
// Detailed tooltip for items showing all stats and information

import React from 'react';
import { Item } from '../../types/item.types';
import { Tooltip } from '../ui/Tooltip';
import { ItemManager } from '../../managers/ItemManager';
import { RarityBadge } from '../shared/RarityBadge';
import clsx from 'clsx';

interface ItemTooltipProps {
  item: Item;
  children: React.ReactElement;
  compareWith?: Item;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = ({ item, children, compareWith }) => {
  const powerLevel = ItemManager.calculatePowerLevel(item);

  // Format stat value
  const formatStat = (value: number | undefined, statName: string): string => {
    if (!value || value === 0) return '';
    return ItemManager.formatStatValue(value, statName);
  };

  // Get stat color class
  const getStatColorClass = (value: number | undefined, compareValue?: number): string => {
    if (!value || value === 0) return 'text-gray-500';

    if (compareValue !== undefined) {
      if (value > compareValue) return 'stat-positive';
      if (value < compareValue) return 'stat-negative';
    }

    return 'text-gray-300';
  };

  // Build stats display
  const stats = [
    { label: 'Intelligence', value: item.stats.intelligence, key: 'intelligence' },
    { label: 'Charisma', value: item.stats.charisma, key: 'charisma' },
    { label: 'Perception', value: item.stats.perception, key: 'perception' },
    { label: 'Resilience', value: item.stats.resilience, key: 'resilience' },
    { label: 'Luck', value: item.stats.luck, key: 'luck' },
    { label: 'XP Bonus', value: item.stats.xpBonus, key: 'xpBonus' },
    { label: 'Coin Bonus', value: item.stats.coinBonus, key: 'coinBonus' },
    { label: 'Energy Regen', value: item.stats.energyRegen, key: 'energyRegen' },
  ].filter((stat) => stat.value && stat.value > 0);

  // Comparison stats if provided
  const comparison = compareWith ? ItemManager.compareItems(item, compareWith) : null;

  const tooltipContent = (
    <div className="min-w-[280px] max-w-[320px] space-y-3">
      {/* Header */}
      <div className="border-b border-gray-700 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className={clsx('font-bold text-lg', ItemManager.getRarityColor(item.rarity))}>
            {item.name}
          </h3>
          <RarityBadge rarity={item.rarity} size="sm" />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Level {item.level}</span>
          <span>•</span>
          <span className="capitalize">{item.type}</span>
          {item.slot && (
            <>
              <span>•</span>
              <span className="capitalize">{item.slot}</span>
            </>
          )}
        </div>

        <div className="mt-1">
          <span className="text-xs text-yellow-400 font-bold">Power: {powerLevel}</span>
        </div>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase">Stats</p>
          {stats.map((stat) => {
            const compareValue = comparison ? (comparison.statsDiff as any)[stat.key] : undefined;
            const formattedValue = formatStat(stat.value, stat.key);

            return (
              <div key={stat.key} className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{stat.label}</span>
                <span className={getStatColorClass(stat.value, compareValue)}>
                  {formattedValue}
                  {compareValue !== undefined && compareValue !== 0 && (
                    <span className="ml-1 text-xs">
                      ({compareValue > 0 ? '+' : ''}{compareValue})
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Description */}
      {item.description && (
        <div className="border-t border-gray-700 pt-2">
          <p className="text-sm text-gray-300 italic">{item.description}</p>
        </div>
      )}

      {/* Comparison summary */}
      {comparison && (
        <div className="border-t border-gray-700 pt-2">
          <p className="text-xs text-gray-400">
            Power difference:{' '}
            <span
              className={clsx(
                'font-bold',
                comparison.powerDiff > 0 ? 'stat-positive' : 'stat-negative'
              )}
            >
              {comparison.powerDiff > 0 ? '+' : ''}{comparison.powerDiff}
            </span>
          </p>
        </div>
      )}

      {/* Action hint */}
      {item.slot && (
        <div className="border-t border-gray-700 pt-2">
          <p className="text-xs text-blue-400">Click to equip</p>
        </div>
      )}
    </div>
  );

  return (
    <Tooltip content={tooltipContent} side="right" delayDuration={300}>
      {children}
    </Tooltip>
  );
};
