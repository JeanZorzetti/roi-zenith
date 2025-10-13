// ============= USE INVENTORY HOOK =============
// Custom hook for inventory operations with computed values

import { useMemo } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { ItemManager } from '../managers/ItemManager';
import { EquipmentManager } from '../managers/EquipmentManager';
import { Item, ItemRarity, EquipmentSlot } from '../types/item.types';

export const useInventory = () => {
  // Get store state and actions
  const items = useInventoryStore((state) => state.items);
  const equipped = useInventoryStore((state) => state.equipped);
  const maxSlots = useInventoryStore((state) => state.maxSlots);
  const currentSlotFilter = useInventoryStore((state) => state.currentSlotFilter);
  const currentRarityFilter = useInventoryStore((state) => state.currentRarityFilter);
  const sortBy = useInventoryStore((state) => state.sortBy);

  const addItem = useInventoryStore((state) => state.addItem);
  const removeItem = useInventoryStore((state) => state.removeItem);
  const equipItem = useInventoryStore((state) => state.equipItem);
  const unequipItem = useInventoryStore((state) => state.unequipItem);
  const setSlotFilter = useInventoryStore((state) => state.setSlotFilter);
  const setRarityFilter = useInventoryStore((state) => state.setRarityFilter);
  const setSortBy = useInventoryStore((state) => state.setSortBy);
  const getFilteredItems = useInventoryStore((state) => state.getFilteredItems);
  const hasSpace = useInventoryStore((state) => state.hasSpace);
  const getOccupancy = useInventoryStore((state) => state.getOccupancy);
  const calculateEquippedStats = useInventoryStore((state) => state.calculateEquippedStats);

  // Computed values with memoization
  const filteredItems = useMemo(() => getFilteredItems(), [items, currentSlotFilter, currentRarityFilter]);

  const occupancy = useMemo(() => getOccupancy(), [items.length, maxSlots]);

  const equippedStats = useMemo(() => {
    return EquipmentManager.calculateTotalStats(equipped);
  }, [equipped]);

  const equipmentSummary = useMemo(() => {
    return EquipmentManager.getEquipmentSummary(equipped);
  }, [equipped]);

  // Helper functions
  const addRandomItem = (level: number = 1): Item | null => {
    const item = ItemManager.generateRandomItem(level);
    const success = addItem(item);
    return success ? item : null;
  };

  const getItemPowerLevel = (item: Item): number => {
    return ItemManager.calculatePowerLevel(item);
  };

  const compareItems = (item1: Item, item2: Item) => {
    return ItemManager.compareItems(item1, item2);
  };

  const canEquipToSlot = (item: Item, slot: EquipmentSlot): boolean => {
    return EquipmentManager.canEquipToSlot(item, slot);
  };

  const getEquippedItem = (slot: EquipmentSlot): Item | undefined => {
    return EquipmentManager.getEquippedItem(equipped, slot);
  };

  const isSlotEmpty = (slot: EquipmentSlot): boolean => {
    return EquipmentManager.isSlotEmpty(equipped, slot);
  };

  // Get items by category
  const getItemsByRarity = (rarity: ItemRarity): Item[] => {
    return items.filter((item) => item.rarity === rarity);
  };

  const getEquippableItems = (): Item[] => {
    return items.filter((item) => item.type !== 'consumable' && item.slot);
  };

  const getConsumableItems = (): Item[] => {
    return items.filter((item) => item.type === 'consumable');
  };

  // Statistics
  const inventoryStats = useMemo(() => {
    const rarityCount: Record<ItemRarity, number> = {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
      mythic: 0,
    };

    items.forEach((item) => {
      rarityCount[item.rarity]++;
    });

    const totalPowerLevel = items.reduce((sum, item) => {
      return sum + ItemManager.calculatePowerLevel(item);
    }, 0);

    return {
      totalItems: items.length,
      rarityCount,
      averagePowerLevel: items.length > 0 ? Math.floor(totalPowerLevel / items.length) : 0,
      totalPowerLevel,
      equippableCount: items.filter((item) => item.type !== 'consumable').length,
      consumableCount: items.filter((item) => item.type === 'consumable').length,
    };
  }, [items]);

  return {
    // State
    items,
    filteredItems,
    equipped,
    maxSlots,
    currentSlotFilter,
    currentRarityFilter,
    sortBy,
    occupancy,
    equippedStats,
    equipmentSummary,
    inventoryStats,

    // Actions
    addItem,
    removeItem,
    equipItem,
    unequipItem,
    setSlotFilter,
    setRarityFilter,
    setSortBy,
    hasSpace,

    // Helper functions
    addRandomItem,
    getItemPowerLevel,
    compareItems,
    canEquipToSlot,
    getEquippedItem,
    isSlotEmpty,
    getItemsByRarity,
    getEquippableItems,
    getConsumableItems,
  };
};
