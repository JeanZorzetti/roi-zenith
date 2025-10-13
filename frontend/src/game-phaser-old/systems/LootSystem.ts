// Loot System for Market Research Quest
// Handles item drops, rarity rolls, and reward distribution

import { Item, ItemRarity, ITEM_DATABASE, getItemsByRarity, getItemById } from '../data/itemDatabase';

export interface LootDrop {
  item: Item;
  quantity: number;
  isRare: boolean; // For visual effect (uncommon or above)
}

export interface LootTable {
  coins: { min: number; max: number };
  xp: { min: number; max: number };
  gemChance: number; // 0-1 probability
  gems: { min: number; max: number };
  itemDropChance: number; // 0-1 probability
  rarityWeights: Record<ItemRarity, number>;
  guaranteedRarity?: ItemRarity; // Minimum rarity for guaranteed drops
}

export interface LootResult {
  coins: number;
  xp: number;
  gems: number;
  items: LootDrop[];
}

// ========================================
// Predefined Loot Tables
// ========================================

export const LOOT_TABLES = {
  // Low-level exploration/interview rewards
  COMMON_EXPLORATION: {
    coins: { min: 20, max: 50 },
    xp: { min: 10, max: 30 },
    gemChance: 0.05,
    gems: { min: 1, max: 1 },
    itemDropChance: 0.15,
    rarityWeights: {
      common: 85,
      uncommon: 15,
      rare: 0,
      epic: 0,
      legendary: 0
    }
  } as LootTable,

  // Mid-level exploration rewards
  UNCOMMON_EXPLORATION: {
    coins: { min: 50, max: 100 },
    xp: { min: 30, max: 60 },
    gemChance: 0.1,
    gems: { min: 1, max: 2 },
    itemDropChance: 0.25,
    rarityWeights: {
      common: 60,
      uncommon: 35,
      rare: 5,
      epic: 0,
      legendary: 0
    }
  } as LootTable,

  // High-level exploration rewards
  RARE_EXPLORATION: {
    coins: { min: 100, max: 200 },
    xp: { min: 60, max: 120 },
    gemChance: 0.2,
    gems: { min: 2, max: 3 },
    itemDropChance: 0.4,
    rarityWeights: {
      common: 40,
      uncommon: 40,
      rare: 18,
      epic: 2,
      legendary: 0
    }
  } as LootTable,

  // Boss battle rewards (low-level)
  BOSS_EASY: {
    coins: { min: 150, max: 300 },
    xp: { min: 100, max: 200 },
    gemChance: 0.5,
    gems: { min: 3, max: 5 },
    itemDropChance: 0.8,
    rarityWeights: {
      common: 50,
      uncommon: 40,
      rare: 10,
      epic: 0,
      legendary: 0
    },
    guaranteedRarity: 'uncommon'
  } as LootTable,

  // Boss battle rewards (mid-level)
  BOSS_MEDIUM: {
    coins: { min: 300, max: 600 },
    xp: { min: 200, max: 400 },
    gemChance: 0.7,
    gems: { min: 5, max: 8 },
    itemDropChance: 0.9,
    rarityWeights: {
      common: 30,
      uncommon: 40,
      rare: 25,
      epic: 5,
      legendary: 0
    },
    guaranteedRarity: 'rare'
  } as LootTable,

  // Boss battle rewards (high-level)
  BOSS_HARD: {
    coins: { min: 600, max: 1200 },
    xp: { min: 400, max: 800 },
    gemChance: 0.9,
    gems: { min: 8, max: 15 },
    itemDropChance: 1.0,
    rarityWeights: {
      common: 20,
      uncommon: 30,
      rare: 35,
      epic: 14,
      legendary: 1
    },
    guaranteedRarity: 'epic'
  } as LootTable,

  // Daily quest rewards
  DAILY_QUEST: {
    coins: { min: 100, max: 200 },
    xp: { min: 150, max: 250 },
    gemChance: 0.3,
    gems: { min: 1, max: 3 },
    itemDropChance: 0.5,
    rarityWeights: {
      common: 70,
      uncommon: 25,
      rare: 5,
      epic: 0,
      legendary: 0
    }
  } as LootTable,

  // Weekly quest rewards
  WEEKLY_QUEST: {
    coins: { min: 800, max: 1500 },
    xp: { min: 1000, max: 2000 },
    gemChance: 0.8,
    gems: { min: 10, max: 20 },
    itemDropChance: 0.9,
    rarityWeights: {
      common: 30,
      uncommon: 40,
      rare: 25,
      epic: 5,
      legendary: 0
    },
    guaranteedRarity: 'rare'
  } as LootTable,

  // Special event rewards
  LEGENDARY_EVENT: {
    coins: { min: 2000, max: 5000 },
    xp: { min: 2000, max: 5000 },
    gemChance: 1.0,
    gems: { min: 25, max: 50 },
    itemDropChance: 1.0,
    rarityWeights: {
      common: 0,
      uncommon: 10,
      rare: 30,
      epic: 50,
      legendary: 10
    },
    guaranteedRarity: 'legendary'
  } as LootTable
};

// ========================================
// Loot System Class
// ========================================

export class LootSystem {
  private luckMultiplier: number = 1.0;
  private bonusDropChance: number = 0;

  /**
   * Set luck multiplier based on player stats (from equipment, NPCs, etc.)
   */
  public setLuckMultiplier(luck: number): void {
    // Each point of luck increases drop chance by 0.5%
    this.luckMultiplier = 1.0 + (luck * 0.005);
  }

  /**
   * Set bonus drop chance from special effects
   */
  public setBonusDropChance(bonus: number): void {
    this.bonusDropChance = Math.min(bonus, 0.5); // Cap at +50%
  }

  /**
   * Generate loot based on a loot table
   */
  public generateLoot(lootTable: LootTable, playerLevel: number = 1): LootResult {
    const result: LootResult = {
      coins: this.rollRange(lootTable.coins.min, lootTable.coins.max),
      xp: this.rollRange(lootTable.xp.min, lootTable.xp.max),
      gems: 0,
      items: []
    };

    // Roll for gems
    if (this.rollChance(lootTable.gemChance)) {
      result.gems = this.rollRange(lootTable.gems.min, lootTable.gems.max);
    }

    // Roll for item drops
    const adjustedDropChance = Math.min(
      lootTable.itemDropChance * this.luckMultiplier + this.bonusDropChance,
      1.0
    );

    if (this.rollChance(adjustedDropChance)) {
      const rarity = this.rollRarity(lootTable.rarityWeights, lootTable.guaranteedRarity);
      const item = this.selectRandomItem(rarity, playerLevel);

      if (item) {
        result.items.push({
          item,
          quantity: 1,
          isRare: rarity !== 'common'
        });
      }
    }

    return result;
  }

  /**
   * Generate loot with multiple item drops (for bosses, special events)
   */
  public generateMultiLoot(
    lootTable: LootTable,
    numDrops: number,
    playerLevel: number = 1
  ): LootResult {
    const result: LootResult = {
      coins: this.rollRange(lootTable.coins.min, lootTable.coins.max),
      xp: this.rollRange(lootTable.xp.min, lootTable.xp.max),
      gems: 0,
      items: []
    };

    // Roll for gems
    if (this.rollChance(lootTable.gemChance)) {
      result.gems = this.rollRange(lootTable.gems.min, lootTable.gems.max);
    }

    // Roll for multiple item drops
    for (let i = 0; i < numDrops; i++) {
      const adjustedDropChance = Math.min(
        lootTable.itemDropChance * this.luckMultiplier + this.bonusDropChance,
        1.0
      );

      if (this.rollChance(adjustedDropChance)) {
        const rarity = this.rollRarity(lootTable.rarityWeights, lootTable.guaranteedRarity);
        const item = this.selectRandomItem(rarity, playerLevel);

        if (item) {
          result.items.push({
            item,
            quantity: 1,
            isRare: rarity !== 'common'
          });
        }
      }
    }

    return result;
  }

  /**
   * Generate loot for a specific item ID (quest rewards, etc.)
   */
  public generateSpecificLoot(
    coins: number,
    xp: number,
    gems: number,
    itemIds: string[]
  ): LootResult {
    const items: LootDrop[] = [];

    itemIds.forEach(itemId => {
      // Handle special random markers
      if (itemId.startsWith('random_')) {
        const rarity = itemId.replace('random_', '') as ItemRarity;
        const item = this.selectRandomItem(rarity, 1);
        if (item) {
          items.push({
            item,
            quantity: 1,
            isRare: rarity !== 'common'
          });
        }
      } else {
        const item = getItemById(itemId);
        if (item) {
          items.push({
            item,
            quantity: 1,
            isRare: item.rarity !== 'common'
          });
        }
      }
    });

    return { coins, xp, gems, items };
  }

  /**
   * Roll a random number within a range
   */
  private rollRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Roll a chance (0-1 probability)
   */
  private rollChance(chance: number): boolean {
    return Math.random() < chance;
  }

  /**
   * Roll item rarity based on weighted probabilities
   */
  private rollRarity(
    weights: Record<ItemRarity, number>,
    guaranteedMinimum?: ItemRarity
  ): ItemRarity {
    const rarityOrder: ItemRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

    // Calculate total weight
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);

    // Roll random number
    let roll = Math.random() * totalWeight;

    // Find which rarity was rolled
    let rolledRarity: ItemRarity = 'common';

    for (const rarity of rarityOrder) {
      roll -= weights[rarity];
      if (roll <= 0) {
        rolledRarity = rarity;
        break;
      }
    }

    // Apply guaranteed minimum rarity
    if (guaranteedMinimum) {
      const rolledIndex = rarityOrder.indexOf(rolledRarity);
      const guaranteedIndex = rarityOrder.indexOf(guaranteedMinimum);

      if (rolledIndex < guaranteedIndex) {
        return guaranteedMinimum;
      }
    }

    return rolledRarity;
  }

  /**
   * Select a random item of given rarity, considering player level
   */
  private selectRandomItem(rarity: ItemRarity, playerLevel: number): Item | null {
    const itemsOfRarity = getItemsByRarity(rarity);

    // Filter items by player level (can drop items up to playerLevel + 3)
    const availableItems = itemsOfRarity.filter(
      item => item.levelRequirement <= playerLevel + 3
    );

    if (availableItems.length === 0) {
      // Fallback: if no items available at this rarity, try common
      if (rarity !== 'common') {
        return this.selectRandomItem('common', playerLevel);
      }
      return null;
    }

    // Select random item
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    return availableItems[randomIndex];
  }

  /**
   * Calculate loot table based on territory difficulty and player level
   */
  public getLootTableForTerritory(territoryId: string, playerLevel: number): LootTable {
    const territoryDifficulty: Record<string, number> = {
      varejo: 1,
      industria: 2,
      servicos: 3,
      saude: 4,
      corporativo: 5,
      startups: 5
    };

    const difficulty = territoryDifficulty[territoryId] || 1;
    const scaledLevel = playerLevel + difficulty;

    if (scaledLevel < 5) {
      return LOOT_TABLES.COMMON_EXPLORATION;
    } else if (scaledLevel < 10) {
      return LOOT_TABLES.UNCOMMON_EXPLORATION;
    } else {
      return LOOT_TABLES.RARE_EXPLORATION;
    }
  }

  /**
   * Calculate loot table for boss based on boss level
   */
  public getLootTableForBoss(bossLevel: number): LootTable {
    if (bossLevel < 5) {
      return LOOT_TABLES.BOSS_EASY;
    } else if (bossLevel < 12) {
      return LOOT_TABLES.BOSS_MEDIUM;
    } else {
      return LOOT_TABLES.BOSS_HARD;
    }
  }

  /**
   * Format loot result for display
   */
  public formatLootDisplay(loot: LootResult): string {
    const parts: string[] = [];

    if (loot.coins > 0) parts.push(`💰 ${loot.coins} moedas`);
    if (loot.xp > 0) parts.push(`⭐ ${loot.xp} XP`);
    if (loot.gems > 0) parts.push(`💎 ${loot.gems} gemas`);

    loot.items.forEach(drop => {
      const rarityEmoji = drop.isRare ? '✨ ' : '';
      parts.push(`${rarityEmoji}${drop.item.icon} ${drop.item.name}`);
    });

    return parts.join('\n');
  }

  /**
   * Get rarity display color for UI
   */
  public getRarityColor(rarity: ItemRarity): number {
    const colors: Record<ItemRarity, number> = {
      common: 0x9ca3af,
      uncommon: 0x10b981,
      rare: 0x3b82f6,
      epic: 0x8b5cf6,
      legendary: 0xf59e0b
    };
    return colors[rarity];
  }
}

// ========================================
// Loot Animation Helpers (for Phaser scenes)
// ========================================

export interface LootAnimationConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  loot: LootResult;
  onComplete?: () => void;
}

/**
 * Create a loot drop animation in a Phaser scene
 */
export function createLootAnimation(config: LootAnimationConfig): void {
  const { scene, x, y, loot, onComplete } = config;
  const items = loot.items;

  if (items.length === 0) {
    onComplete?.();
    return;
  }

  // Animate each item with a cascading effect
  items.forEach((drop, index) => {
    const delay = index * 200;
    const offsetX = (index - items.length / 2) * 60;

    scene.time.delayedCall(delay, () => {
      // Create item icon
      const itemText = scene.add.text(x + offsetX, y - 100, drop.item.icon, {
        fontSize: '48px'
      });

      itemText.setOrigin(0.5);
      itemText.setAlpha(0);

      // Get rarity color
      const lootSystem = new LootSystem();
      const color = lootSystem.getRarityColor(drop.item.rarity);

      // Add glow effect for rare items
      if (drop.isRare) {
        const glow = scene.add.circle(x + offsetX, y - 100, 40, color, 0.3);
        glow.setAlpha(0);

        scene.tweens.add({
          targets: glow,
          alpha: 0.6,
          scale: 1.5,
          duration: 400,
          yoyo: true,
          onComplete: () => glow.destroy()
        });
      }

      // Animate item appearance
      scene.tweens.add({
        targets: itemText,
        alpha: 1,
        y: y,
        duration: 500,
        ease: 'Back.easeOut',
        onComplete: () => {
          // Hold for a moment
          scene.time.delayedCall(800, () => {
            // Fade out
            scene.tweens.add({
              targets: itemText,
              alpha: 0,
              y: y + 50,
              duration: 300,
              onComplete: () => {
                itemText.destroy();
                if (index === items.length - 1) {
                  onComplete?.();
                }
              }
            });
          });
        }
      });
    });
  });
}

console.log('🎲 Loot System initialized with multiple loot tables and rarity weights');
