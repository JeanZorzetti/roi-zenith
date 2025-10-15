// ============= INVENTORY STORE =============
// Zustand store for inventory management

import { create } from 'zustand';
import { Item, ItemRarity, EquipmentSlot, EquippedItems } from '../types/item.types';

type SortBy = 'rarity' | 'level' | 'name';

interface InventoryState {
  // State
  items: Item[];
  equipped: EquippedItems;
  maxSlots: number;
  currentSlotFilter: string | null;
  currentRarityFilter: ItemRarity | null;
  sortBy: SortBy;

  // Actions
  addItem: (item: Item) => boolean;
  removeItem: (itemId: string) => boolean;
  equipItem: (itemId: string) => boolean;
  unequipItem: (slot: EquipmentSlot) => boolean;
  setSlotFilter: (slot: string | null) => void;
  setRarityFilter: (rarity: ItemRarity | null) => void;
  setSortBy: (sort: SortBy) => void;
  sortInventory: () => void;
  getFilteredItems: () => Item[];
  hasSpace: () => boolean;
  getOccupancy: () => { current: number; max: number; percentage: number };
  calculateEquippedStats: () => {
    intelligence: number;
    charisma: number;
    perception: number;
    resilience: number;
    luck: number;
    xpBonus: number;
    coinBonus: number;
    energyRegen: number;
  };
  initialize: (items: Item[], equipped: EquippedItems) => void;
  clear: () => void;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  // Initial state
  items: [],
  equipped: {},
  maxSlots: 50,
  currentSlotFilter: null,
  currentRarityFilter: null,
  sortBy: 'rarity',

  // Add item to inventory
  addItem: (item: Item) => {
    const state = get();
    if (state.items.length >= state.maxSlots) {
      console.warn('Inventory full!');
      return false;
    }

    set((state) => ({
      items: [...state.items, item],
    }));

    // Auto-sort after adding
    get().sortInventory();

    return true;
  },

  // Remove item from inventory
  removeItem: (itemId: string) => {
    const state = get();
    const index = state.items.findIndex((item) => item.id === itemId);

    if (index === -1) {
      console.warn(`Item ${itemId} not found in inventory`);
      return false;
    }

    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));

    return true;
  },

  // Equip item to slot
  equipItem: (itemId: string) => {
    const state = get();
    const item = state.items.find((i) => i.id === itemId);

    if (!item) {
      console.warn(`Item ${itemId} not found in inventory`);
      return false;
    }

    if (!item.slot) {
      console.warn(`Item ${item.name} is not equippable`);
      return false;
    }

    // Unequip current item in slot if exists
    const currentItem = state.equipped[item.slot];
    if (currentItem) {
      get().unequipItem(item.slot);
    }

    // Equip new item
    set((state) => ({
      equipped: {
        ...state.equipped,
        [item.slot!]: item,
      },
      items: state.items.filter((i) => i.id !== itemId),
    }));

    return true;
  },

  // Unequip item from slot
  unequipItem: (slot: EquipmentSlot) => {
    const state = get();
    const item = state.equipped[slot];

    if (!item) {
      console.warn(`No item equipped in slot ${slot}`);
      return false;
    }

    // Check if inventory has space
    if (!get().hasSpace()) {
      console.warn('Cannot unequip - inventory full!');
      return false;
    }

    // Add back to inventory and remove from equipped
    set((state) => {
      const newEquipped = { ...state.equipped };
      delete newEquipped[slot];

      return {
        items: [...state.items, item],
        equipped: newEquipped,
      };
    });

    // Auto-sort after unequipping
    get().sortInventory();

    return true;
  },

  // Set slot filter
  setSlotFilter: (slot: string | null) => {
    set({ currentSlotFilter: slot });
  },

  // Set rarity filter
  setRarityFilter: (rarity: ItemRarity | null) => {
    set({ currentRarityFilter: rarity });
  },

  // Set sort by
  setSortBy: (sort: SortBy) => {
    set({ sortBy: sort });
    get().sortInventory();
  },

  // Sort inventory based on current sortBy value
  sortInventory: () => {
    const state = get();
    const sorted = [...state.items];

    switch (state.sortBy) {
      case 'rarity': {
        const rarityOrder: Record<ItemRarity, number> = {
          mythic: 6,
          legendary: 5,
          epic: 4,
          rare: 3,
          uncommon: 2,
          common: 1,
        };
        sorted.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
        break;
      }
      case 'level':
        sorted.sort((a, b) => b.level - a.level);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    set({ items: sorted });
  },

  // Get filtered items based on current filters
  getFilteredItems: () => {
    const state = get();
    let filtered = [...state.items];

    // Apply slot filter
    if (state.currentSlotFilter) {
      filtered = filtered.filter((item) => item.slot === state.currentSlotFilter);
    }

    // Apply rarity filter
    if (state.currentRarityFilter) {
      filtered = filtered.filter((item) => item.rarity === state.currentRarityFilter);
    }

    return filtered;
  },

  // Check if inventory has space
  hasSpace: () => {
    const state = get();
    return state.items.length < state.maxSlots;
  },

  // Get inventory occupancy
  getOccupancy: () => {
    const state = get();
    return {
      current: state.items.length,
      max: state.maxSlots,
      percentage: (state.items.length / state.maxSlots) * 100,
    };
  },

  // Calculate total stats from equipped items
  calculateEquippedStats: () => {
    const state = get();
    const stats = {
      intelligence: 0,
      charisma: 0,
      perception: 0,
      resilience: 0,
      luck: 0,
      xpBonus: 0,
      coinBonus: 0,
      energyRegen: 0,
    };

    Object.values(state.equipped).forEach((item) => {
      if (item && item.stats) {
        stats.intelligence += item.stats.intelligence || 0;
        stats.charisma += item.stats.charisma || 0;
        stats.perception += item.stats.perception || 0;
        stats.resilience += item.stats.resilience || 0;
        stats.luck += item.stats.luck || 0;
        stats.xpBonus += item.stats.xpBonus || 0;
        stats.coinBonus += item.stats.coinBonus || 0;
        stats.energyRegen += item.stats.energyRegen || 0;
      }
    });

    return stats;
  },

  // Initialize inventory from saved state
  initialize: (items: Item[], equipped: EquippedItems) => {
    set({ items, equipped });
    get().sortInventory();
  },

  // Clear inventory
  clear: () => {
    set({
      items: [],
      equipped: {},
      currentSlotFilter: null,
      currentRarityFilter: null,
      sortBy: 'rarity',
    });
  },
}));
