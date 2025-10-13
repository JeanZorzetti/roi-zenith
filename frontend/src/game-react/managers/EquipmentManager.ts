// ============= EQUIPMENT MANAGER =============
// Manages equipment logic, slot validation, and equipment sets

import { Item, EquipmentSlot, EquippedItems } from '../types/item.types';

export class EquipmentManager {
  /**
   * Validate if item can be equipped to a specific slot
   */
  public static canEquipToSlot(item: Item, slot: EquipmentSlot): boolean {
    // Consumables cannot be equipped
    if (item.type === 'consumable') {
      return false;
    }

    // Item must have a slot property
    if (!item.slot) {
      return false;
    }

    // Check if item's slot matches the target slot
    return item.slot === slot;
  }

  /**
   * Get all available equipment slots
   */
  public static getAvailableSlots(): EquipmentSlot[] {
    return ['weapon', 'head', 'body', 'accessory1', 'accessory2'];
  }

  /**
   * Get slot display name
   */
  public static getSlotDisplayName(slot: EquipmentSlot): string {
    const names: Record<EquipmentSlot, string> = {
      weapon: 'Weapon',
      head: 'Head',
      body: 'Body',
      accessory1: 'Accessory 1',
      accessory2: 'Accessory 2',
    };

    return names[slot];
  }

  /**
   * Get slot icon name (for Lucide React)
   */
  public static getSlotIcon(slot: EquipmentSlot): string {
    const icons: Record<EquipmentSlot, string> = {
      weapon: 'Sword',
      head: 'Shield',
      body: 'ShieldCheck',
      accessory1: 'Sparkles',
      accessory2: 'Sparkles',
    };

    return icons[slot];
  }

  /**
   * Check if equipment set is complete (all slots filled)
   */
  public static isFullSet(equipped: EquippedItems): boolean {
    const slots = this.getAvailableSlots();
    return slots.every((slot) => equipped[slot] !== undefined);
  }

  /**
   * Calculate set bonuses (if items are from the same set)
   */
  public static calculateSetBonuses(equipped: EquippedItems): {
    hasSetBonus: boolean;
    setName: string | null;
    bonusMultiplier: number;
  } {
    // Get all equipped items
    const equippedItems = Object.values(equipped).filter(
      (item): item is Item => item !== undefined
    );

    if (equippedItems.length < 2) {
      return {
        hasSetBonus: false,
        setName: null,
        bonusMultiplier: 1,
      };
    }

    // Check if items share similar name patterns (simple set detection)
    // In a real implementation, items would have a "setId" property
    const nameParts = equippedItems.map((item) => item.name.split(' ')[0]);
    const uniqueNames = new Set(nameParts);

    // If most items share the same prefix, consider it a set
    if (uniqueNames.size === 1) {
      const setPieces = equippedItems.length;
      let bonusMultiplier = 1;

      // 2-piece set: +5% bonus
      if (setPieces >= 2) bonusMultiplier += 0.05;
      // 3-piece set: +10% bonus
      if (setPieces >= 3) bonusMultiplier += 0.05;
      // 4-piece set: +15% bonus
      if (setPieces >= 4) bonusMultiplier += 0.05;
      // 5-piece set (full): +25% bonus
      if (setPieces === 5) bonusMultiplier += 0.05;

      return {
        hasSetBonus: true,
        setName: nameParts[0],
        bonusMultiplier,
      };
    }

    return {
      hasSetBonus: false,
      setName: null,
      bonusMultiplier: 1,
    };
  }

  /**
   * Calculate total equipment stats with set bonuses
   */
  public static calculateTotalStats(equipped: EquippedItems): {
    stats: {
      intelligence: number;
      charisma: number;
      perception: number;
      resilience: number;
      luck: number;
      xpBonus: number;
      coinBonus: number;
      energyRegen: number;
    };
    setBonus: {
      hasSetBonus: boolean;
      setName: string | null;
      bonusMultiplier: number;
    };
    powerLevel: number;
  } {
    const baseStats = {
      intelligence: 0,
      charisma: 0,
      perception: 0,
      resilience: 0,
      luck: 0,
      xpBonus: 0,
      coinBonus: 0,
      energyRegen: 0,
    };

    // Sum base stats from all equipped items
    Object.values(equipped).forEach((item) => {
      if (item && item.stats) {
        baseStats.intelligence += item.stats.intelligence || 0;
        baseStats.charisma += item.stats.charisma || 0;
        baseStats.perception += item.stats.perception || 0;
        baseStats.resilience += item.stats.resilience || 0;
        baseStats.luck += item.stats.luck || 0;
        baseStats.xpBonus += item.stats.xpBonus || 0;
        baseStats.coinBonus += item.stats.coinBonus || 0;
        baseStats.energyRegen += item.stats.energyRegen || 0;
      }
    });

    // Calculate set bonuses
    const setBonus = this.calculateSetBonuses(equipped);

    // Apply set bonus multiplier
    const finalStats = {
      intelligence: Math.floor(baseStats.intelligence * setBonus.bonusMultiplier),
      charisma: Math.floor(baseStats.charisma * setBonus.bonusMultiplier),
      perception: Math.floor(baseStats.perception * setBonus.bonusMultiplier),
      resilience: Math.floor(baseStats.resilience * setBonus.bonusMultiplier),
      luck: Math.floor(baseStats.luck * setBonus.bonusMultiplier),
      xpBonus: Math.floor(baseStats.xpBonus * setBonus.bonusMultiplier),
      coinBonus: Math.floor(baseStats.coinBonus * setBonus.bonusMultiplier),
      energyRegen: Math.floor(baseStats.energyRegen * setBonus.bonusMultiplier),
    };

    // Calculate overall power level
    const powerLevel =
      finalStats.intelligence * 1.2 +
      finalStats.charisma * 1.2 +
      finalStats.perception * 1.2 +
      finalStats.resilience * 1.2 +
      finalStats.luck * 1.5 +
      finalStats.xpBonus * 2 +
      finalStats.coinBonus * 1.5 +
      finalStats.energyRegen * 1.8;

    return {
      stats: finalStats,
      setBonus,
      powerLevel: Math.floor(powerLevel),
    };
  }

  /**
   * Get empty slot visual data
   */
  public static getEmptySlotData(slot: EquipmentSlot): {
    slot: EquipmentSlot;
    displayName: string;
    icon: string;
    isEmpty: true;
  } {
    return {
      slot,
      displayName: this.getSlotDisplayName(slot),
      icon: this.getSlotIcon(slot),
      isEmpty: true,
    };
  }

  /**
   * Get equipped item by slot
   */
  public static getEquippedItem(
    equipped: EquippedItems,
    slot: EquipmentSlot
  ): Item | undefined {
    return equipped[slot];
  }

  /**
   * Check if slot is empty
   */
  public static isSlotEmpty(equipped: EquippedItems, slot: EquipmentSlot): boolean {
    return equipped[slot] === undefined;
  }

  /**
   * Get equipment summary for UI
   */
  public static getEquipmentSummary(equipped: EquippedItems): {
    totalItems: number;
    emptySlots: number;
    fullSlots: number;
    isComplete: boolean;
    slots: Array<{
      slot: EquipmentSlot;
      displayName: string;
      icon: string;
      item?: Item;
      isEmpty: boolean;
    }>;
  } {
    const slots = this.getAvailableSlots();
    const slotData = slots.map((slot) => {
      const item = equipped[slot];
      return {
        slot,
        displayName: this.getSlotDisplayName(slot),
        icon: this.getSlotIcon(slot),
        item,
        isEmpty: item === undefined,
      };
    });

    const equippedCount = slotData.filter((s) => !s.isEmpty).length;

    return {
      totalItems: equippedCount,
      emptySlots: slots.length - equippedCount,
      fullSlots: equippedCount,
      isComplete: equippedCount === slots.length,
      slots: slotData,
    };
  }

  /**
   * Validate equipped items structure
   */
  public static validateEquippedItems(equipped: EquippedItems): boolean {
    const validSlots = this.getAvailableSlots();

    for (const [slot, item] of Object.entries(equipped)) {
      // Check if slot is valid
      if (!validSlots.includes(slot as EquipmentSlot)) {
        return false;
      }

      // Check if item is valid for this slot
      if (item && !this.canEquipToSlot(item, slot as EquipmentSlot)) {
        return false;
      }
    }

    return true;
  }
}
