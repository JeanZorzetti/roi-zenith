// ============= ITEM MANAGER =============
// Manages item operations, generation, and utilities

import { Item, ItemRarity, ItemType } from '../types/item.types';
import { itemsDatabase } from '../data/items';

export class ItemManager {
  /**
   * Generate a random item based on rarity weights
   */
  public static generateRandomItem(level: number = 1): Item {
    // Rarity weights (higher = more common)
    const rarityWeights: Record<ItemRarity, number> = {
      common: 50,
      uncommon: 30,
      rare: 12,
      epic: 5,
      legendary: 2,
      mythic: 1,
    };

    // Calculate total weight
    const totalWeight = Object.values(rarityWeights).reduce((sum, weight) => sum + weight, 0);

    // Roll random number
    let roll = Math.random() * totalWeight;

    // Determine rarity
    let selectedRarity: ItemRarity = 'common';
    for (const [rarity, weight] of Object.entries(rarityWeights)) {
      roll -= weight;
      if (roll <= 0) {
        selectedRarity = rarity as ItemRarity;
        break;
      }
    }

    // Get items of selected rarity from database
    const itemsOfRarity = itemsDatabase.filter((item) => item.rarity === selectedRarity);

    if (itemsOfRarity.length === 0) {
      // Fallback to common if no items found
      const commonItems = itemsDatabase.filter((item) => item.rarity === 'common');
      const randomItem = commonItems[Math.floor(Math.random() * commonItems.length)];
      return this.createItemInstance(randomItem, level);
    }

    // Select random item of that rarity
    const randomItem = itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];

    return this.createItemInstance(randomItem, level);
  }

  /**
   * Create an item instance with unique ID and scaled stats
   */
  public static createItemInstance(template: Item, level: number = 1): Item {
    const scaleFactor = 1 + (level - 1) * 0.1; // 10% increase per level

    return {
      ...template,
      id: this.generateItemId(),
      level,
      stats: {
        intelligence: Math.floor((template.stats.intelligence || 0) * scaleFactor),
        charisma: Math.floor((template.stats.charisma || 0) * scaleFactor),
        perception: Math.floor((template.stats.perception || 0) * scaleFactor),
        resilience: Math.floor((template.stats.resilience || 0) * scaleFactor),
        luck: Math.floor((template.stats.luck || 0) * scaleFactor),
        xpBonus: Math.floor((template.stats.xpBonus || 0) * scaleFactor),
        coinBonus: Math.floor((template.stats.coinBonus || 0) * scaleFactor),
        energyRegen: Math.floor((template.stats.energyRegen || 0) * scaleFactor),
      },
    };
  }

  /**
   * Generate unique item ID
   */
  public static generateItemId(): string {
    return `item_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get item by ID from database
   */
  public static getItemTemplate(itemId: string): Item | undefined {
    return itemsDatabase.find((item) => item.id === itemId);
  }

  /**
   * Get items by type
   */
  public static getItemsByType(type: ItemType): Item[] {
    return itemsDatabase.filter((item) => item.type === type);
  }

  /**
   * Get items by rarity
   */
  public static getItemsByRarity(rarity: ItemRarity): Item[] {
    return itemsDatabase.filter((item) => item.rarity === rarity);
  }

  /**
   * Calculate item power level
   */
  public static calculatePowerLevel(item: Item): number {
    const stats = item.stats;
    let power = 0;

    // Base stats
    power += (stats.intelligence || 0) * 1.2;
    power += (stats.charisma || 0) * 1.2;
    power += (stats.perception || 0) * 1.2;
    power += (stats.resilience || 0) * 1.2;
    power += (stats.luck || 0) * 1.5;

    // Bonus stats
    power += (stats.xpBonus || 0) * 2;
    power += (stats.coinBonus || 0) * 1.5;
    power += (stats.energyRegen || 0) * 1.8;

    // Rarity multiplier
    const rarityMultiplier: Record<ItemRarity, number> = {
      common: 1,
      uncommon: 1.3,
      rare: 1.7,
      epic: 2.2,
      legendary: 3,
      mythic: 4,
    };

    power *= rarityMultiplier[item.rarity];

    // Level multiplier
    power *= 1 + (item.level - 1) * 0.15;

    return Math.floor(power);
  }

  /**
   * Compare two items (for sorting/comparison UI)
   */
  public static compareItems(
    item1: Item,
    item2: Item
  ): {
    powerDiff: number;
    statsDiff: {
      intelligence: number;
      charisma: number;
      perception: number;
      resilience: number;
      luck: number;
      xpBonus: number;
      coinBonus: number;
      energyRegen: number;
    };
  } {
    const power1 = this.calculatePowerLevel(item1);
    const power2 = this.calculatePowerLevel(item2);

    return {
      powerDiff: power1 - power2,
      statsDiff: {
        intelligence: (item1.stats.intelligence || 0) - (item2.stats.intelligence || 0),
        charisma: (item1.stats.charisma || 0) - (item2.stats.charisma || 0),
        perception: (item1.stats.perception || 0) - (item2.stats.perception || 0),
        resilience: (item1.stats.resilience || 0) - (item2.stats.resilience || 0),
        luck: (item1.stats.luck || 0) - (item2.stats.luck || 0),
        xpBonus: (item1.stats.xpBonus || 0) - (item2.stats.xpBonus || 0),
        coinBonus: (item1.stats.coinBonus || 0) - (item2.stats.coinBonus || 0),
        energyRegen: (item1.stats.energyRegen || 0) - (item2.stats.energyRegen || 0),
      },
    };
  }

  /**
   * Get rarity color class for UI
   */
  public static getRarityColor(rarity: ItemRarity): string {
    const colors: Record<ItemRarity, string> = {
      common: 'text-gray-400',
      uncommon: 'text-green-400',
      rare: 'text-blue-400',
      epic: 'text-purple-400',
      legendary: 'text-orange-400',
      mythic: 'text-yellow-400',
    };

    return colors[rarity];
  }

  /**
   * Get rarity glow class for UI
   */
  public static getRarityGlow(rarity: ItemRarity): string {
    return `glow-${rarity}`;
  }

  /**
   * Format stat value for display
   */
  public static formatStatValue(value: number, statType: string): string {
    if (value === 0) return '0';

    const prefix = value > 0 ? '+' : '';

    // Percentage stats
    if (statType.includes('Bonus') || statType.includes('Regen')) {
      return `${prefix}${value}%`;
    }

    return `${prefix}${value}`;
  }

  /**
   * Get all available item types
   */
  public static getAvailableTypes(): ItemType[] {
    return ['weapon', 'armor', 'accessory', 'consumable'];
  }

  /**
   * Get all available rarities
   */
  public static getAvailableRarities(): ItemRarity[] {
    return ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
  }

  /**
   * Validate item data
   */
  public static validateItem(item: Partial<Item>): boolean {
    if (!item.name || !item.type || !item.rarity) {
      return false;
    }

    if (item.type !== 'consumable' && !item.slot) {
      return false;
    }

    return true;
  }
}
