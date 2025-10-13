// ============= EQUIPMENT SLOT =============
// Individual equipment slot with item display or empty state

import React from 'react';
import { Item, EquipmentSlot as SlotType } from '../../types/item.types';
import { useInventory } from '../../hooks/useInventory';
import { ItemTooltip } from './ItemTooltip';
import { EquipmentManager } from '../../managers/EquipmentManager';
import { ItemManager } from '../../managers/ItemManager';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import * as LucideIcons from 'lucide-react';

interface EquipmentSlotProps {
  slot: SlotType;
  item?: Item;
  isEmpty: boolean;
}

export const EquipmentSlot: React.FC<EquipmentSlotProps> = ({ slot, item, isEmpty }) => {
  const { unequipItem } = useInventory();

  const slotDisplayName = EquipmentManager.getSlotDisplayName(slot);
  const slotIconName = EquipmentManager.getSlotIcon(slot);
  const SlotIcon = (LucideIcons[slotIconName as keyof typeof LucideIcons] as React.ComponentType<any>) || LucideIcons.Package;

  const handleClick = () => {
    if (item) {
      unequipItem(slot);
    }
  };

  // Empty slot
  if (isEmpty || !item) {
    return (
      <button
        className={clsx(
          'w-full p-3 rounded-lg border-2 border-dashed border-gray-700',
          'bg-gray-800 bg-opacity-30',
          'hover:border-gray-600 hover:bg-opacity-50',
          'transition-all duration-200',
          'flex items-center gap-3'
        )}
        disabled
      >
        <div className="w-12 h-12 rounded-lg bg-gray-700 bg-opacity-30 flex items-center justify-center">
          <SlotIcon className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-gray-500">{slotDisplayName}</p>
          <p className="text-xs text-gray-600">Empty</p>
        </div>
      </button>
    );
  }

  // Get item icon
  const ItemIcon = item.icon
    ? (LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<any>)
    : LucideIcons.Package;

  const rarityGlow = ItemManager.getRarityGlow(item.rarity);
  const rarityColor = ItemManager.getRarityColor(item.rarity);
  const powerLevel = ItemManager.calculatePowerLevel(item);

  return (
    <ItemTooltip item={item}>
      <motion.button
        onClick={handleClick}
        className={clsx(
          'w-full p-3 rounded-lg border-2',
          'flex items-center gap-3',
          'transition-all duration-200',
          'hover:scale-[1.02] hover:shadow-xl',
          rarityGlow,
          // Border colors by rarity
          item.rarity === 'common' && 'border-gray-500',
          item.rarity === 'uncommon' && 'border-green-500',
          item.rarity === 'rare' && 'border-blue-500',
          item.rarity === 'epic' && 'border-purple-500',
          item.rarity === 'legendary' && 'border-orange-500',
          item.rarity === 'mythic' && 'border-yellow-500',
          // Background
          'bg-gray-800 bg-opacity-70 hover:bg-opacity-90'
        )}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Item icon container */}
        <div className="relative w-12 h-12 rounded-lg bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <ItemIcon className={clsx('w-7 h-7', rarityColor)} />
          {/* Level badge */}
          <div className="absolute -top-1 -right-1 bg-gray-900 rounded-full w-5 h-5 flex items-center justify-center border border-gray-700">
            <span className="text-[10px] font-bold text-gray-300">{item.level}</span>
          </div>
        </div>

        {/* Item info */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-xs text-gray-400 mb-0.5">{slotDisplayName}</p>
          <p className={clsx('text-sm font-semibold truncate', rarityColor)}>
            {item.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-yellow-400 font-bold">⚡{powerLevel}</span>
            <span className="text-xs text-gray-500 capitalize">{item.rarity}</span>
          </div>
        </div>

        {/* Unequip hint */}
        <div className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <LucideIcons.X className="w-4 h-4" />
        </div>
      </motion.button>
    </ItemTooltip>
  );
};
