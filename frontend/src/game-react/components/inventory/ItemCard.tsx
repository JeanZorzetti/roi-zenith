// ============= ITEM CARD =============
// Individual item card with rarity styling and interactions

import React, { memo, useCallback, useMemo } from 'react';
import { Item } from '../../types/item.types';
import { useInventory } from '../../hooks/useInventory';
import { ItemTooltip } from './ItemTooltip';
import { RarityBadge } from '../shared/RarityBadge';
import { ItemManager } from '../../managers/ItemManager';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import * as LucideIcons from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onClick?: (item: Item) => void;
  isEquipped?: boolean;
}

const ItemCardComponent: React.FC<ItemCardProps> = ({ item, onClick, isEquipped = false }) => {
  const { equipItem, getItemPowerLevel } = useInventory();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(item);
    } else if (item.slot) {
      // Default behavior: equip item
      equipItem(item.id);
    }
  }, [onClick, item, equipItem]);

  // Memoize icon component lookup
  const IconComponent = useMemo(() => {
    return item.icon
      ? (LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<any>)
      : LucideIcons.Package;
  }, [item.icon]);

  // Memoize expensive calculations
  const powerLevel = useMemo(() => getItemPowerLevel(item), [item, getItemPowerLevel]);
  const rarityGlow = useMemo(() => ItemManager.getRarityGlow(item.rarity), [item.rarity]);

  return (
    <ItemTooltip item={item}>
      <motion.button
        onClick={handleClick}
        className={clsx(
          'relative w-full aspect-square rounded-lg border-2 p-3',
          'flex flex-col items-center justify-center gap-2',
          'transition-all duration-200',
          'hover:scale-105 hover:shadow-xl',
          rarityGlow,
          isEquipped && 'ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-900',
          // Border colors by rarity
          item.rarity === 'common' && 'border-gray-500',
          item.rarity === 'uncommon' && 'border-green-500',
          item.rarity === 'rare' && 'border-blue-500',
          item.rarity === 'epic' && 'border-purple-500',
          item.rarity === 'legendary' && 'border-orange-500',
          item.rarity === 'mythic' && 'border-yellow-500',
          // Background
          'bg-gray-800 bg-opacity-90 hover:bg-opacity-100'
        )}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Level badge (top-left) */}
        <div className="absolute top-1 left-1 bg-gray-900 bg-opacity-90 rounded px-1.5 py-0.5 text-xs font-bold text-gray-300">
          {item.level}
        </div>

        {/* Rarity badge (top-right) */}
        <div className="absolute top-1 right-1">
          <RarityBadge rarity={item.rarity} size="sm" />
        </div>

        {/* Icon */}
        <IconComponent
          className={clsx(
            'w-12 h-12',
            ItemManager.getRarityColor(item.rarity)
          )}
        />

        {/* Item name */}
        <p className="text-xs font-semibold text-white text-center line-clamp-2 w-full">
          {item.name}
        </p>

        {/* Power level (bottom) */}
        <div className="absolute bottom-1 left-0 right-0 text-center">
          <span className="text-xs font-bold text-yellow-400">{powerLevel}</span>
        </div>

        {/* Equipped indicator */}
        {isEquipped && (
          <motion.div
            className="absolute inset-0 border-2 border-blue-400 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
    </ItemTooltip>
  );
};

// Memoize to prevent unnecessary re-renders
export const ItemCard = memo(ItemCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.isEquipped === nextProps.isEquipped &&
    prevProps.item.level === nextProps.item.level
  );
});
