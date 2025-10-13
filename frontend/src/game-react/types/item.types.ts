// ============= ITEM TYPES =============
// Item and inventory type definitions

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export type ItemType = 'weapon' | 'armor' | 'accessory' | 'consumable';

export type EquipmentSlot =
  | 'PRIMARY_TOOL'
  | 'KNOWLEDGE_BASE'
  | 'COMMUNICATION'
  | 'ACCESSORY'
  | 'ACCESSORY_2';

export interface ItemStats {
  intelligence?: number;
  charisma?: number;
  perception?: number;
  resilience?: number;
  luck?: number;
  xpBonus?: number;
  coinBonus?: number;
  energyRegen?: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  level: number;
  slot: EquipmentSlot | null;
  stats: ItemStats;
  icon: string;
  stackable: boolean;
  quantity: number;
}

export interface EquippedItems {
  weapon?: Item;
  head?: Item;
  body?: Item;
  accessory1?: Item;
  accessory2?: Item;
}
