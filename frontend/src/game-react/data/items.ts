// ============= ITEMS DATABASE =============
// React-based items database for Market Research Quest

import { Item, ItemRarity, ItemType } from '../types/item.types';

// Database with sample items (can be expanded later)
export const itemsDatabase: Item[] = [
  // COMMON WEAPONS
  {
    id: 'weapon_notebook',
    name: 'Caderno de Notas',
    description: 'Um caderno simples para anotações básicas durante entrevistas.',
    type: 'weapon',
    rarity: 'common',
    level: 1,
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 2,
      perception: 1,
    },
    icon: '📓',
    stackable: false,
    quantity: 1,
  },
  {
    id: 'weapon_recorder',
    name: 'Gravador Simples',
    description: 'Gravador de áudio básico para registrar entrevistas.',
    type: 'weapon',
    rarity: 'common',
    level: 1,
    slot: 'PRIMARY_TOOL',
    stats: {
      perception: 2,
      intelligence: 1,
    },
    icon: '🎙️',
    stackable: false,
    quantity: 1,
  },

  // UNCOMMON WEAPONS
  {
    id: 'weapon_tablet',
    name: 'Tablet Profissional',
    description: 'Tablet com software de análise em tempo real.',
    type: 'weapon',
    rarity: 'uncommon',
    level: 3,
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 4,
      perception: 3,
      charisma: 2,
    },
    icon: '📱',
    stackable: false,
    quantity: 1,
  },
  {
    id: 'weapon_survey_kit',
    name: 'Kit de Pesquisa Digital',
    description: 'Conjunto completo de ferramentas para criar e aplicar questionários.',
    type: 'weapon',
    rarity: 'uncommon',
    level: 4,
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 5,
      charisma: 2,
    },
    icon: '📋',
    stackable: false,
    quantity: 1,
  },

  // RARE WEAPONS
  {
    id: 'weapon_analytics',
    name: 'Suite de Analytics Avançado',
    description: 'Software profissional com IA para análise de dados qualitativos.',
    type: 'weapon',
    rarity: 'rare',
    level: 7,
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 8,
      perception: 5,
      luck: 2,
    },
    icon: '💻',
    stackable: false,
    quantity: 1,
  },

  // EPIC WEAPONS
  {
    id: 'weapon_ai_assistant',
    name: 'Assistente de IA Pesquisador',
    description: 'IA avançada que sugere perguntas e identifica padrões em tempo real.',
    type: 'weapon',
    rarity: 'epic',
    level: 12,
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 15,
      perception: 10,
      luck: 3,
    },
    icon: '🤖',
    stackable: false,
    quantity: 1,
  },

  // LEGENDARY WEAPONS
  {
    id: 'weapon_oracle',
    name: 'Sistema Oracle de Insights',
    description: 'Tecnologia de ponta que prevê necessidades dos clientes antes mesmo deles expressarem.',
    type: 'weapon',
    rarity: 'legendary',
    level: 18,
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 25,
      perception: 20,
      luck: 10,
    },
    icon: '🔮',
    stackable: false,
    quantity: 1,
  },

  // MYTHIC WEAPON
  {
    id: 'weapon_mind_reader',
    name: 'Leitor de Mentes Quântico',
    description: 'Artefato místico que permite compreensão instantânea das necessidades mais profundas.',
    type: 'weapon',
    rarity: 'mythic',
    level: 25,
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 40,
      perception: 35,
      charisma: 20,
      luck: 15,
    },
    icon: '🌟',
    stackable: false,
    quantity: 1,
  },

  // ACCESSORIES
  {
    id: 'acc_business_card',
    name: 'Cartões de Visita',
    description: 'Cartões profissionais para networking.',
    type: 'accessory',
    rarity: 'common',
    level: 1,
    slot: 'ACCESSORY',
    stats: {
      charisma: 2,
      luck: 1,
    },
    icon: '💳',
    stackable: false,
    quantity: 1,
  },
  {
    id: 'acc_luxury_watch',
    name: 'Relógio de Luxo',
    description: 'Demonstra sucesso e pontualidade impecável.',
    type: 'accessory',
    rarity: 'rare',
    level: 10,
    slot: 'ACCESSORY',
    stats: {
      charisma: 8,
      luck: 6,
      intelligence: 3,
    },
    icon: '⌚',
    stackable: false,
    quantity: 1,
  },

  // CONSUMABLES
  {
    id: 'cons_energy_drink',
    name: 'Energy Drink',
    description: 'Recupera energia instantaneamente.',
    type: 'consumable',
    rarity: 'common',
    level: 1,
    slot: null,
    stats: {
      energyRegen: 20,
    },
    icon: '⚡',
    stackable: true,
    quantity: 5,
  },
  {
    id: 'cons_focus_pill',
    name: 'Pílula de Foco',
    description: 'Aumenta temporariamente a inteligência.',
    type: 'consumable',
    rarity: 'uncommon',
    level: 5,
    slot: null,
    stats: {
      intelligence: 10,
      xpBonus: 5,
    },
    icon: '💊',
    stackable: true,
    quantity: 3,
  },
];

// Helper functions
export function getItemById(itemId: string): Item | undefined {
  return itemsDatabase.find((item) => item.id === itemId);
}

export function getItemsByRarity(rarity: ItemRarity): Item[] {
  return itemsDatabase.filter((item) => item.rarity === rarity);
}

export function getItemsByType(type: ItemType): Item[] {
  return itemsDatabase.filter((item) => item.type === type);
}

console.log(`📦 Items Database (React): ${itemsDatabase.length} items loaded`);
