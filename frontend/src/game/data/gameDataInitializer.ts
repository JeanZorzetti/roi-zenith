// Game Data Initializer
// Populates game systems with data from databases on first load

import inventorySystem, { Item as InventoryItem } from '../systems/InventorySystem';
import { ITEM_DATABASE, Item as DatabaseItem, EquipmentSlot } from './itemDatabase';
import questSystem, { Quest as QuestSystemQuest } from '../systems/QuestSystem';
import { QUEST_DATABASE, Quest as DatabaseQuest } from './questDatabase';

// Map itemDatabase slot types to InventorySystem slot types
const SLOT_MAP: Record<EquipmentSlot, InventoryItem['slot']> = {
  PRIMARY_TOOL: 'weapon',
  SECONDARY_TOOL: 'accessory1',
  KNOWLEDGE_BASE: 'head',
  COMMUNICATION: 'body',
  PROFESSIONAL: 'accessory2'
};

// Map itemDatabase to InventorySystem type
function getItemType(slot: EquipmentSlot): InventoryItem['type'] {
  if (slot === 'PRIMARY_TOOL') return 'weapon';
  if (slot === 'KNOWLEDGE_BASE') return 'armor';
  return 'accessory';
}

/**
 * Convert itemDatabase Item to InventorySystem Item
 */
export function convertToInventoryItem(dbItem: DatabaseItem): InventoryItem {
  return {
    id: dbItem.id,
    name: dbItem.name,
    type: getItemType(dbItem.slot),
    slot: SLOT_MAP[dbItem.slot],
    rarity: dbItem.rarity as InventoryItem['rarity'],
    stats: {
      intelligence: dbItem.stats.intelligence,
      charisma: dbItem.stats.charisma,
      perception: dbItem.stats.perception,
      luck: dbItem.stats.luck,
      // Map knowledge to resilience for now
      resilience: dbItem.stats.knowledge,
    },
    description: dbItem.description,
    level: dbItem.levelRequirement,
    icon: dbItem.icon
  };
}

/**
 * Initialize player with starter items from itemDatabase
 */
export function initializeStarterInventory(): void {
  console.log('📦 Initializing starter inventory from itemDatabase...');

  // Give player a few starter common items
  const starterItemIds = [
    'item_notebook_basic',    // Common PRIMARY_TOOL
    'item_pen_basic',          // Common SECONDARY_TOOL
    'item_business_card',      // Common COMMUNICATION
    'item_coffee_mug'          // Common PROFESSIONAL
  ];

  starterItemIds.forEach(itemId => {
    const dbItem = ITEM_DATABASE.find(item => item.id === itemId);
    if (dbItem) {
      const inventoryItem = convertToInventoryItem(dbItem);
      inventorySystem.addItem(inventoryItem);
      console.log(`  ✅ Added starter item: ${dbItem.name}`);
    }
  });

  console.log('📦 Starter inventory initialized!');
}

/**
 * Get all items from itemDatabase (for shop/loot)
 */
export function getAllAvailableItems(): InventoryItem[] {
  return ITEM_DATABASE.map(convertToInventoryItem);
}

/**
 * Get items by level requirement (for shop)
 */
export function getItemsForPlayerLevel(playerLevel: number): InventoryItem[] {
  return ITEM_DATABASE
    .filter(item => item.levelRequirement <= playerLevel + 2)
    .map(convertToInventoryItem);
}

/**
 * Get specific item by ID
 */
export function getItemById(itemId: string): InventoryItem | undefined {
  const dbItem = ITEM_DATABASE.find(item => item.id === itemId);
  return dbItem ? convertToInventoryItem(dbItem) : undefined;
}

/**
 * Get random item drop based on rarity weights
 */
export function getRandomItemDrop(
  playerLevel: number,
  rarityWeights: { common: number; uncommon: number; rare: number; epic: number; legendary: number }
): InventoryItem | null {
  // Calculate total weight
  const totalWeight = Object.values(rarityWeights).reduce((sum, w) => sum + w, 0);

  // Roll for rarity
  let roll = Math.random() * totalWeight;
  let selectedRarity: DatabaseItem['rarity'] = 'common';

  for (const [rarity, weight] of Object.entries(rarityWeights)) {
    roll -= weight;
    if (roll <= 0) {
      selectedRarity = rarity as DatabaseItem['rarity'];
      break;
    }
  }

  // Get items of that rarity within player level range
  const availableItems = ITEM_DATABASE.filter(
    item => item.rarity === selectedRarity && item.levelRequirement <= playerLevel + 3
  );

  if (availableItems.length === 0) {
    // Fallback to common
    const commonItems = ITEM_DATABASE.filter(
      item => item.rarity === 'common' && item.levelRequirement <= playerLevel + 3
    );
    if (commonItems.length === 0) return null;

    const randomItem = commonItems[Math.floor(Math.random() * commonItems.length)];
    return convertToInventoryItem(randomItem);
  }

  const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
  return convertToInventoryItem(randomItem);
}

/**
 * Convert questDatabase Quest to QuestSystem Quest
 */
export function convertToSystemQuest(dbQuest: DatabaseQuest): QuestSystemQuest {
  return {
    id: dbQuest.id,
    name: dbQuest.title,
    type: dbQuest.type,
    description: dbQuest.description,
    objectives: dbQuest.objectives.map((obj, index) => ({
      id: `${dbQuest.id}_obj_${index}`,
      description: obj.description,
      current: obj.current,
      target: obj.required,
      completed: obj.current >= obj.required
    })),
    rewards: {
      experience: dbQuest.rewards.xp || 0,
      coins: dbQuest.rewards.coins || 0,
      gems: dbQuest.rewards.gems,
      items: dbQuest.rewards.items,
      reputation: 0
    },
    status: 'locked', // Will be updated based on level/prerequisites
    unlockLevel: dbQuest.levelRequirement,
    prerequisiteQuests: dbQuest.prerequisites
  };
}

/**
 * Initialize quest system with quests from database
 */
export function initializeQuestSystem(playerLevel: number = 1): void {
  console.log('📋 Initializing quest system from questDatabase...');

  // Convert all quests to system format
  const systemQuests: QuestSystemQuest[] = QUEST_DATABASE.map(dbQuest => {
    const systemQuest = convertToSystemQuest(dbQuest);

    // Determine initial status based on level and prerequisites
    if (systemQuest.unlockLevel && systemQuest.unlockLevel > playerLevel) {
      systemQuest.status = 'locked';
    } else if (systemQuest.prerequisiteQuests && systemQuest.prerequisiteQuests.length > 0) {
      systemQuest.status = 'locked'; // Will unlock when prerequisites are met
    } else {
      systemQuest.status = 'active'; // Available immediately
    }

    console.log(`  ✅ Converted quest: ${systemQuest.name} (${systemQuest.status})`);
    return systemQuest;
  });

  // Initialize quest system with ALL quests at once
  questSystem.initialize(systemQuests);

  console.log(`📋 Quest system initialized with ${QUEST_DATABASE.length} quests!`);
}

console.log('🎮 Game Data Initializer loaded');
