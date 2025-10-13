// ============= ITEM COMPARISON MODAL =============
// Modal for comparing two items side-by-side

import React from 'react';
import { Item } from '../../types/item.types';
import { Dialog } from '../ui/Dialog';
import { ItemManager } from '../../managers/ItemManager';
import { RarityBadge } from '../shared/RarityBadge';
import clsx from 'clsx';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface ItemComparisonModalProps {
  item1: Item;
  item2: Item;
  isOpen: boolean;
  onClose: () => void;
}

export const ItemComparisonModal: React.FC<ItemComparisonModalProps> = ({
  item1,
  item2,
  isOpen,
  onClose,
}) => {
  const comparison = ItemManager.compareItems(item1, item2);

  // Get icons
  const Icon1 = item1.icon
    ? (LucideIcons[item1.icon as keyof typeof LucideIcons] as React.ComponentType<any>)
    : LucideIcons.Package;
  const Icon2 = item2.icon
    ? (LucideIcons[item2.icon as keyof typeof LucideIcons] as React.ComponentType<any>)
    : LucideIcons.Package;

  const power1 = ItemManager.calculatePowerLevel(item1);
  const power2 = ItemManager.calculatePowerLevel(item2);

  // Stats to compare
  const stats = [
    { key: 'intelligence', label: 'Intelligence' },
    { key: 'charisma', label: 'Charisma' },
    { key: 'perception', label: 'Perception' },
    { key: 'resilience', label: 'Resilience' },
    { key: 'luck', label: 'Luck' },
    { key: 'xpBonus', label: 'XP Bonus' },
    { key: 'coinBonus', label: 'Coin Bonus' },
    { key: 'energyRegen', label: 'Energy Regen' },
  ] as const;

  const getStatValue = (item: Item, key: string): number => {
    return (item.stats as any)[key] || 0;
  };

  const getDiffColor = (diff: number): string => {
    if (diff > 0) return 'text-green-400';
    if (diff < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="xl">
      <Dialog.Header>
        <Dialog.Title>Item Comparison</Dialog.Title>
        <Dialog.Description>Compare stats between two items</Dialog.Description>
      </Dialog.Header>

      <Dialog.Body>
        <div className="space-y-6">
          {/* Items Header */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
            {/* Item 1 */}
            <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg border-2"
              style={{
                borderColor: ItemManager.getRarityColor(item1.rarity).replace('text-', '')
              }}
            >
              <div className={clsx('w-16 h-16 mb-2', ItemManager.getRarityGlow(item1.rarity))}>
                <Icon1 className={clsx('w-full h-full', ItemManager.getRarityColor(item1.rarity))} />
              </div>
              <h3 className={clsx('font-bold text-center', ItemManager.getRarityColor(item1.rarity))}>
                {item1.name}
              </h3>
              <RarityBadge rarity={item1.rarity} size="sm" className="mt-2" />
              <p className="text-sm text-gray-400 mt-1">Level {item1.level}</p>
              <div className="mt-2">
                <span className="text-xs text-gray-500">Power: </span>
                <span className="text-yellow-400 font-bold">{power1}</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-gray-600" />
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg border-2"
              style={{
                borderColor: ItemManager.getRarityColor(item2.rarity).replace('text-', '')
              }}
            >
              <div className={clsx('w-16 h-16 mb-2', ItemManager.getRarityGlow(item2.rarity))}>
                <Icon2 className={clsx('w-full h-full', ItemManager.getRarityColor(item2.rarity))} />
              </div>
              <h3 className={clsx('font-bold text-center', ItemManager.getRarityColor(item2.rarity))}>
                {item2.name}
              </h3>
              <RarityBadge rarity={item2.rarity} size="sm" className="mt-2" />
              <p className="text-sm text-gray-400 mt-1">Level {item2.level}</p>
              <div className="mt-2">
                <span className="text-xs text-gray-500">Power: </span>
                <span className="text-yellow-400 font-bold">{power2}</span>
              </div>
            </div>
          </div>

          {/* Power Difference */}
          <div className="flex items-center justify-center p-3 bg-gray-900 rounded-lg">
            <span className="text-sm text-gray-400 mr-2">Power Difference:</span>
            <span className={clsx('text-lg font-bold flex items-center gap-1', getDiffColor(comparison.powerDiff))}>
              {comparison.powerDiff > 0 && <TrendingUp className="w-5 h-5" />}
              {comparison.powerDiff < 0 && <TrendingDown className="w-5 h-5" />}
              {comparison.powerDiff > 0 ? '+' : ''}{comparison.powerDiff}
            </span>
          </div>

          {/* Stats Comparison Table */}
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Stat</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-300">Current</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-300">Difference</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-300">New</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, index) => {
                  const value1 = getStatValue(item1, stat.key);
                  const value2 = getStatValue(item2, stat.key);
                  const diff = (comparison.statsDiff as any)[stat.key];

                  // Skip if both values are 0
                  if (value1 === 0 && value2 === 0) return null;

                  return (
                    <tr
                      key={stat.key}
                      className={clsx(
                        'border-t border-gray-700',
                        index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'
                      )}
                    >
                      <td className="px-4 py-2 text-sm text-gray-300">{stat.label}</td>
                      <td className="px-4 py-2 text-center text-sm font-semibold text-white">
                        {ItemManager.formatStatValue(value1, stat.key)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className={clsx('text-sm font-bold flex items-center justify-center gap-1', getDiffColor(diff))}>
                          {diff > 0 && <TrendingUp className="w-4 h-4" />}
                          {diff < 0 && <TrendingDown className="w-4 h-4" />}
                          {diff > 0 ? '+' : ''}{diff !== 0 ? ItemManager.formatStatValue(diff, stat.key) : '–'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center text-sm font-semibold text-white">
                        {ItemManager.formatStatValue(value2, stat.key)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Recommendation */}
          <div className={clsx(
            'p-4 rounded-lg border-2',
            comparison.powerDiff > 0 ? 'bg-green-900 bg-opacity-20 border-green-500' : 'bg-red-900 bg-opacity-20 border-red-500'
          )}>
            <p className={clsx('text-sm font-semibold', comparison.powerDiff > 0 ? 'text-green-400' : 'text-red-400')}>
              {comparison.powerDiff > 0
                ? `✓ ${item2.name} is stronger by ${comparison.powerDiff} power!`
                : comparison.powerDiff < 0
                ? `✗ ${item1.name} is stronger by ${Math.abs(comparison.powerDiff)} power.`
                : '= Both items have equal power.'}
            </p>
          </div>
        </div>
      </Dialog.Body>

      <Dialog.Footer>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </Dialog.Footer>
    </Dialog>
  );
};
