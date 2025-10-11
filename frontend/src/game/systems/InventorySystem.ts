// ============= INVENTORY SYSTEM =============
// Manages player inventory, equipment, and stats calculation

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable';
  slot?: 'weapon' | 'head' | 'body' | 'accessory1' | 'accessory2';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  stats: {
    intelligence?: number;
    charisma?: number;
    perception?: number;
    resilience?: number;
    luck?: number;
    xpBonus?: number;
    coinBonus?: number;
    energyRegen?: number;
  };
  description: string;
  level: number;
  icon?: string;
}

export interface EquippedItems {
  weapon?: Item;
  head?: Item;
  body?: Item;
  accessory1?: Item;
  accessory2?: Item;
}

export interface InventoryState {
  items: Item[];
  equipped: EquippedItems;
  maxSlots: number;
}

export class InventorySystem {
  private inventory: Item[] = [];
  private equipped: EquippedItems = {};
  private maxSlots: number = 50;

  constructor() {
    // Initialize with empty inventory
  }

  /**
   * Initialize inventory from saved state
   */
  public initialize(state: Partial<InventoryState>): void {
    if (state.items) {
      this.inventory = state.items;
    }
    if (state.equipped) {
      this.equipped = state.equipped;
    }
    if (state.maxSlots) {
      this.maxSlots = state.maxSlots;
    }
  }

  /**
   * Add item to inventory
   */
  public addItem(item: Item): boolean {
    if (this.inventory.length >= this.maxSlots) {
      console.warn('Inventory full!');
      return false;
    }

    this.inventory.push(item);
    console.log(`Added item: ${item.name} (${item.rarity})`);
    return true;
  }

  /**
   * Remove item from inventory
   */
  public removeItem(itemId: string): boolean {
    const index = this.inventory.findIndex(item => item.id === itemId);
    if (index === -1) {
      console.warn(`Item ${itemId} not found in inventory`);
      return false;
    }

    this.inventory.splice(index, 1);
    return true;
  }

  /**
   * Equip item to slot
   */
  public equipItem(itemId: string): boolean {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) {
      console.warn(`Item ${itemId} not found in inventory`);
      return false;
    }

    if (!item.slot) {
      console.warn(`Item ${item.name} is not equippable`);
      return false;
    }

    // Unequip current item in slot if exists
    const currentItem = this.equipped[item.slot];
    if (currentItem) {
      this.unequipItem(item.slot);
    }

    // Equip new item
    this.equipped[item.slot] = item;

    // Remove from inventory
    this.removeItem(itemId);

    console.log(`Equipped: ${item.name} to ${item.slot}`);
    return true;
  }

  /**
   * Unequip item from slot
   */
  public unequipItem(slot: keyof EquippedItems): boolean {
    const item = this.equipped[slot];
    if (!item) {
      console.warn(`No item equipped in slot ${slot}`);
      return false;
    }

    // Add back to inventory
    if (!this.addItem(item)) {
      console.warn('Cannot unequip - inventory full!');
      return false;
    }

    // Remove from equipped
    delete this.equipped[slot];

    console.log(`Unequipped: ${item.name} from ${slot}`);
    return true;
  }

  /**
   * Calculate total stats from equipped items
   */
  public calculateEquippedStats(): {
    intelligence: number;
    charisma: number;
    perception: number;
    resilience: number;
    luck: number;
    xpBonus: number;
    coinBonus: number;
    energyRegen: number;
  } {
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

    Object.values(this.equipped).forEach(item => {
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
  }

  /**
   * Get item by ID
   */
  public getItem(itemId: string): Item | undefined {
    return this.inventory.find(item => item.id === itemId);
  }

  /**
   * Get all items in inventory
   */
  public getAllItems(): Item[] {
    return [...this.inventory];
  }

  /**
   * Get equipped items
   */
  public getEquippedItems(): EquippedItems {
    return { ...this.equipped };
  }

  /**
   * Get items by rarity
   */
  public getItemsByRarity(rarity: Item['rarity']): Item[] {
    return this.inventory.filter(item => item.rarity === rarity);
  }

  /**
   * Get items by type
   */
  public getItemsByType(type: Item['type']): Item[] {
    return this.inventory.filter(item => item.type === type);
  }

  /**
   * Check if inventory has space
   */
  public hasSpace(): boolean {
    return this.inventory.length < this.maxSlots;
  }

  /**
   * Get inventory occupancy
   */
  public getOccupancy(): { current: number; max: number; percentage: number } {
    return {
      current: this.inventory.length,
      max: this.maxSlots,
      percentage: (this.inventory.length / this.maxSlots) * 100,
    };
  }

  /**
   * Sort inventory by rarity (descending)
   */
  public sortByRarity(): void {
    const rarityOrder: Record<Item['rarity'], number> = {
      mythic: 6,
      legendary: 5,
      epic: 4,
      rare: 3,
      uncommon: 2,
      common: 1,
    };

    this.inventory.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
  }

  /**
   * Sort inventory by level (descending)
   */
  public sortByLevel(): void {
    this.inventory.sort((a, b) => b.level - a.level);
  }

  /**
   * Get current inventory state (for saving)
   */
  public getState(): InventoryState {
    return {
      items: [...this.inventory],
      equipped: { ...this.equipped },
      maxSlots: this.maxSlots,
    };
  }

  /**
   * Clear inventory (for testing)
   */
  public clear(): void {
    this.inventory = [];
    this.equipped = {};
  }
}

export default new InventorySystem();
