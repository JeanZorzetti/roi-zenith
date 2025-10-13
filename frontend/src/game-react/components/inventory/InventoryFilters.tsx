// ============= INVENTORY FILTERS =============
// Filter and sort controls for inventory

import React from 'react';
import { useInventory } from '../../hooks/useInventory';
import { ItemRarity } from '../../types/item.types';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import clsx from 'clsx';

export const InventoryFilters: React.FC = () => {
  const {
    currentSlotFilter,
    currentRarityFilter,
    sortBy,
    setSlotFilter,
    setRarityFilter,
    setSortBy,
  } = useInventory();

  const slots = ['weapon', 'head', 'body', 'accessory1', 'accessory2'];
  const rarities: ItemRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
  const sortOptions: Array<{ value: 'rarity' | 'level' | 'name'; label: string }> = [
    { value: 'rarity', label: 'Rarity' },
    { value: 'level', label: 'Level' },
    { value: 'name', label: 'Name' },
  ];

  const rarityColors: Record<ItemRarity, string> = {
    common: 'border-gray-500 text-gray-400 hover:bg-gray-500',
    uncommon: 'border-green-500 text-green-400 hover:bg-green-500',
    rare: 'border-blue-500 text-blue-400 hover:bg-blue-500',
    epic: 'border-purple-500 text-purple-400 hover:bg-purple-500',
    legendary: 'border-orange-500 text-orange-400 hover:bg-orange-500',
    mythic: 'border-yellow-500 text-yellow-400 hover:bg-yellow-500',
  };

  const hasActiveFilters = currentSlotFilter !== null || currentRarityFilter !== null;

  const clearAllFilters = () => {
    setSlotFilter(null);
    setRarityFilter(null);
  };

  return (
    <div className="space-y-3">
      {/* Sort controls */}
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-400 font-semibold">Sort by:</span>
        <div className="flex gap-1">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={clsx(
                'px-3 py-1 rounded text-xs font-semibold transition-all',
                sortBy === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slot filter */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400 font-semibold">Filter by slot:</span>
          {currentSlotFilter && (
            <button
              onClick={() => setSlotFilter(null)}
              className="ml-auto text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {slots.map((slot) => (
            <motion.button
              key={slot}
              onClick={() => setSlotFilter(currentSlotFilter === slot ? null : slot)}
              className={clsx(
                'px-3 py-1.5 rounded text-xs font-semibold border-2 transition-all',
                currentSlotFilter === slot
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {slot}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Rarity filter */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400 font-semibold">Filter by rarity:</span>
          {currentRarityFilter && (
            <button
              onClick={() => setRarityFilter(null)}
              className="ml-auto text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {rarities.map((rarity) => (
            <motion.button
              key={rarity}
              onClick={() => setRarityFilter(currentRarityFilter === rarity ? null : rarity)}
              className={clsx(
                'px-3 py-1.5 rounded text-xs font-semibold border-2 transition-all capitalize',
                currentRarityFilter === rarity
                  ? clsx(rarityColors[rarity], 'bg-opacity-20 hover:bg-opacity-30')
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600',
                currentRarityFilter !== rarity && rarityColors[rarity]
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {rarity}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Clear all filters */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="w-full flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </Button>
        </motion.div>
      )}
    </div>
  );
};
