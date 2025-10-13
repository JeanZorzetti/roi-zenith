// Item Database for Market Research Quest
// Contains equipment items across 5 rarity tiers and 5 equipment slots

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type EquipmentSlot = 'PRIMARY_TOOL' | 'SECONDARY_TOOL' | 'KNOWLEDGE_BASE' | 'COMMUNICATION' | 'PROFESSIONAL';

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: ItemRarity;
  slot: EquipmentSlot;
  stats: {
    intelligence?: number;
    charisma?: number;
    perception?: number;
    knowledge?: number;
    luck?: number;
  };
  levelRequirement: number;
  cost: number;
  icon: string;
}

export const RARITY_COLORS: Record<ItemRarity, number> = {
  common: 0x9ca3af,      // Gray
  uncommon: 0x10b981,    // Green
  rare: 0x3b82f6,        // Blue
  epic: 0x8b5cf6,        // Purple
  legendary: 0xf59e0b    // Orange
};

export const RARITY_NAMES: Record<ItemRarity, string> = {
  common: '⬜ Comum',
  uncommon: '🟢 Incomum',
  rare: '🔵 Raro',
  epic: '🟣 Épico',
  legendary: '🟠 Lendário'
};

// ========================================
// PRIMARY_TOOL (Main research/analysis tools)
// ========================================

export const ITEM_DATABASE: Item[] = [
  // COMMON PRIMARY TOOLS
  {
    id: 'item_notebook_basic',
    name: 'Caderno de Notas',
    description: 'Um caderno simples para anotações básicas durante entrevistas.',
    rarity: 'common',
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 2,
      perception: 1
    },
    levelRequirement: 1,
    cost: 50,
    icon: '📓'
  },
  {
    id: 'item_recorder_basic',
    name: 'Gravador Simples',
    description: 'Gravador de áudio básico para registrar entrevistas.',
    rarity: 'common',
    slot: 'PRIMARY_TOOL',
    stats: {
      perception: 2,
      intelligence: 1
    },
    levelRequirement: 1,
    cost: 80,
    icon: '🎙️'
  },

  // UNCOMMON PRIMARY TOOLS
  {
    id: 'item_tablet_pro',
    name: 'Tablet Profissional',
    description: 'Tablet com software de análise em tempo real.',
    rarity: 'uncommon',
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 4,
      perception: 3,
      knowledge: 2
    },
    levelRequirement: 3,
    cost: 250,
    icon: '📱'
  },
  {
    id: 'item_survey_toolkit',
    name: 'Kit de Pesquisa Digital',
    description: 'Conjunto completo de ferramentas para criar e aplicar questionários.',
    rarity: 'uncommon',
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 5,
      charisma: 2
    },
    levelRequirement: 4,
    cost: 320,
    icon: '📋'
  },

  // RARE PRIMARY TOOLS
  {
    id: 'item_analytics_suite',
    name: 'Suite de Analytics Avançado',
    description: 'Software profissional com IA para análise de dados qualitativos.',
    rarity: 'rare',
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 8,
      perception: 5,
      knowledge: 4
    },
    levelRequirement: 7,
    cost: 600,
    icon: '💻'
  },
  {
    id: 'item_ethnography_kit',
    name: 'Kit de Etnografia Digital',
    description: 'Ferramentas especializadas para pesquisa etnográfica e observação.',
    rarity: 'rare',
    slot: 'PRIMARY_TOOL',
    stats: {
      perception: 10,
      intelligence: 6,
      charisma: 3
    },
    levelRequirement: 8,
    cost: 750,
    icon: '🔍'
  },

  // EPIC PRIMARY TOOLS
  {
    id: 'item_ai_assistant',
    name: 'Assistente de IA Pesquisador',
    description: 'IA avançada que sugere perguntas e identifica padrões em tempo real.',
    rarity: 'epic',
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 15,
      perception: 10,
      knowledge: 8,
      luck: 3
    },
    levelRequirement: 12,
    cost: 1200,
    icon: '🤖'
  },

  // LEGENDARY PRIMARY TOOLS
  {
    id: 'item_oracle_system',
    name: 'Sistema Oracle de Insights',
    description: 'Tecnologia de ponta que prevê necessidades dos clientes antes mesmo deles expressarem.',
    rarity: 'legendary',
    slot: 'PRIMARY_TOOL',
    stats: {
      intelligence: 25,
      perception: 20,
      knowledge: 15,
      luck: 10
    },
    levelRequirement: 18,
    cost: 3000,
    icon: '🔮'
  },

  // ========================================
  // SECONDARY_TOOL (Support/utility tools)
  // ========================================

  // COMMON SECONDARY TOOLS
  {
    id: 'item_pen_basic',
    name: 'Caneta Confiável',
    description: 'Uma boa caneta nunca falha na hora certa.',
    rarity: 'common',
    slot: 'SECONDARY_TOOL',
    stats: {
      perception: 2
    },
    levelRequirement: 1,
    cost: 30,
    icon: '🖊️'
  },

  // UNCOMMON SECONDARY TOOLS
  {
    id: 'item_camera_hd',
    name: 'Câmera HD Portátil',
    description: 'Câmera para registrar linguagem corporal e contexto visual.',
    rarity: 'uncommon',
    slot: 'SECONDARY_TOOL',
    stats: {
      perception: 5,
      intelligence: 2
    },
    levelRequirement: 3,
    cost: 280,
    icon: '📷'
  },
  {
    id: 'item_voice_analyzer',
    name: 'Analisador de Voz',
    description: 'Detecta emoções através da análise de tom e frequência vocal.',
    rarity: 'uncommon',
    slot: 'SECONDARY_TOOL',
    stats: {
      perception: 6,
      charisma: 3
    },
    levelRequirement: 5,
    cost: 350,
    icon: '🎵'
  },

  // RARE SECONDARY TOOLS
  {
    id: 'item_behavior_tracker',
    name: 'Rastreador de Comportamento',
    description: 'Wearable que monitora microexpressões e linguagem não-verbal.',
    rarity: 'rare',
    slot: 'SECONDARY_TOOL',
    stats: {
      perception: 12,
      intelligence: 5,
      charisma: 4
    },
    levelRequirement: 9,
    cost: 800,
    icon: '⌚'
  },

  // EPIC SECONDARY TOOLS
  {
    id: 'item_empathy_amplifier',
    name: 'Amplificador de Empatia',
    description: 'Dispositivo que aumenta sua capacidade de perceber necessidades emocionais.',
    rarity: 'epic',
    slot: 'SECONDARY_TOOL',
    stats: {
      charisma: 12,
      perception: 10,
      intelligence: 6
    },
    levelRequirement: 13,
    cost: 1400,
    icon: '💝'
  },

  // LEGENDARY SECONDARY TOOLS
  {
    id: 'item_neural_link',
    name: 'Neural Link de Pesquisa',
    description: 'Interface neural que permite compreensão profunda instantânea.',
    rarity: 'legendary',
    slot: 'SECONDARY_TOOL',
    stats: {
      perception: 20,
      charisma: 15,
      intelligence: 18,
      luck: 8
    },
    levelRequirement: 20,
    cost: 3500,
    icon: '🧠'
  },

  // ========================================
  // KNOWLEDGE_BASE (Books, courses, certifications)
  // ========================================

  // COMMON KNOWLEDGE
  {
    id: 'item_book_intro',
    name: 'Livro: Introdução à Pesquisa',
    description: 'Fundamentos básicos de pesquisa de mercado.',
    rarity: 'common',
    slot: 'KNOWLEDGE_BASE',
    stats: {
      knowledge: 3,
      intelligence: 1
    },
    levelRequirement: 1,
    cost: 100,
    icon: '📚'
  },

  // UNCOMMON KNOWLEDGE
  {
    id: 'item_course_qualitative',
    name: 'Curso: Métodos Qualitativos',
    description: 'Certificação em técnicas de pesquisa qualitativa.',
    rarity: 'uncommon',
    slot: 'KNOWLEDGE_BASE',
    stats: {
      knowledge: 6,
      intelligence: 4,
      perception: 2
    },
    levelRequirement: 4,
    cost: 400,
    icon: '🎓'
  },
  {
    id: 'item_book_psychology',
    name: 'Livro: Psicologia do Consumidor',
    description: 'Entenda os gatilhos mentais por trás das decisões de compra.',
    rarity: 'uncommon',
    slot: 'KNOWLEDGE_BASE',
    stats: {
      knowledge: 5,
      charisma: 4,
      intelligence: 3
    },
    levelRequirement: 5,
    cost: 380,
    icon: '📖'
  },

  // RARE KNOWLEDGE
  {
    id: 'item_certification_ux',
    name: 'Certificação UX Research',
    description: 'Credencial profissional em User Experience Research.',
    rarity: 'rare',
    slot: 'KNOWLEDGE_BASE',
    stats: {
      knowledge: 10,
      intelligence: 8,
      perception: 6
    },
    levelRequirement: 8,
    cost: 900,
    icon: '🏆'
  },

  // EPIC KNOWLEDGE
  {
    id: 'item_master_degree',
    name: 'MBA em Marketing Research',
    description: 'Mestrado completo com técnicas avançadas e estratégicas.',
    rarity: 'epic',
    slot: 'KNOWLEDGE_BASE',
    stats: {
      knowledge: 18,
      intelligence: 15,
      charisma: 8,
      perception: 6
    },
    levelRequirement: 14,
    cost: 2000,
    icon: '🎖️'
  },

  // LEGENDARY KNOWLEDGE
  {
    id: 'item_ancient_wisdom',
    name: 'Manuscrito dos Grandes Mestres',
    description: 'Conhecimento ancestral sobre comportamento humano transmitido por gerações.',
    rarity: 'legendary',
    slot: 'KNOWLEDGE_BASE',
    stats: {
      knowledge: 30,
      intelligence: 20,
      charisma: 15,
      perception: 15,
      luck: 12
    },
    levelRequirement: 22,
    cost: 5000,
    icon: '📜'
  },

  // ========================================
  // COMMUNICATION (Presentation, networking tools)
  // ========================================

  // COMMON COMMUNICATION
  {
    id: 'item_business_card',
    name: 'Cartões de Visita',
    description: 'Cartões simples mas profissionais para networking.',
    rarity: 'common',
    slot: 'COMMUNICATION',
    stats: {
      charisma: 2,
      luck: 1
    },
    levelRequirement: 1,
    cost: 40,
    icon: '💳'
  },

  // UNCOMMON COMMUNICATION
  {
    id: 'item_presentation_template',
    name: 'Templates Premium de Apresentação',
    description: 'Slides profissionais que impressionam clientes.',
    rarity: 'uncommon',
    slot: 'COMMUNICATION',
    stats: {
      charisma: 5,
      intelligence: 3
    },
    levelRequirement: 3,
    cost: 300,
    icon: '📊'
  },

  // RARE COMMUNICATION
  {
    id: 'item_storytelling_workshop',
    name: 'Workshop de Storytelling',
    description: 'Aprenda a contar histórias que vendem insights.',
    rarity: 'rare',
    slot: 'COMMUNICATION',
    stats: {
      charisma: 10,
      intelligence: 6,
      perception: 4
    },
    levelRequirement: 7,
    cost: 700,
    icon: '🎭'
  },

  // EPIC COMMUNICATION
  {
    id: 'item_influence_mastery',
    name: 'Maestria em Influência',
    description: 'Domínio completo de técnicas de persuasão e negociação.',
    rarity: 'epic',
    slot: 'COMMUNICATION',
    stats: {
      charisma: 18,
      intelligence: 10,
      perception: 8,
      luck: 5
    },
    levelRequirement: 15,
    cost: 1800,
    icon: '🗣️'
  },

  // LEGENDARY COMMUNICATION
  {
    id: 'item_executive_presence',
    name: 'Aura de Executive Presence',
    description: 'Presença magnética que comanda respeito e fecha negócios bilionários.',
    rarity: 'legendary',
    slot: 'COMMUNICATION',
    stats: {
      charisma: 28,
      intelligence: 15,
      perception: 12,
      luck: 15
    },
    levelRequirement: 25,
    cost: 6000,
    icon: '👔'
  },

  // ========================================
  // PROFESSIONAL (Accessories, status items)
  // ========================================

  // COMMON PROFESSIONAL
  {
    id: 'item_coffee_mug',
    name: 'Caneca de Café Térmica',
    description: 'Para longas sessões de análise de dados.',
    rarity: 'common',
    slot: 'PROFESSIONAL',
    stats: {
      intelligence: 2,
      luck: 1
    },
    levelRequirement: 1,
    cost: 60,
    icon: '☕'
  },

  // UNCOMMON PROFESSIONAL
  {
    id: 'item_ergonomic_chair',
    name: 'Cadeira Ergonômica Premium',
    description: 'Conforto para horas de trabalho focado.',
    rarity: 'uncommon',
    slot: 'PROFESSIONAL',
    stats: {
      intelligence: 4,
      perception: 3,
      luck: 2
    },
    levelRequirement: 4,
    cost: 450,
    icon: '🪑'
  },

  // RARE PROFESSIONAL
  {
    id: 'item_luxury_watch',
    name: 'Relógio de Luxo',
    description: 'Demonstra sucesso e pontualidade impecável.',
    rarity: 'rare',
    slot: 'PROFESSIONAL',
    stats: {
      charisma: 8,
      luck: 6,
      intelligence: 3
    },
    levelRequirement: 10,
    cost: 1000,
    icon: '⌚'
  },

  // EPIC PROFESSIONAL
  {
    id: 'item_vip_membership',
    name: 'Membership VIP Elite',
    description: 'Acesso a eventos exclusivos e networking de alto nível.',
    rarity: 'epic',
    slot: 'PROFESSIONAL',
    stats: {
      charisma: 12,
      luck: 10,
      knowledge: 8,
      perception: 5
    },
    levelRequirement: 16,
    cost: 2500,
    icon: '💎'
  },

  // LEGENDARY PROFESSIONAL
  {
    id: 'item_market_oracle_badge',
    name: 'Emblema do Oráculo de Mercado',
    description: 'Título lendário concedido apenas aos maiores pesquisadores do mundo.',
    rarity: 'legendary',
    slot: 'PROFESSIONAL',
    stats: {
      intelligence: 20,
      charisma: 25,
      perception: 20,
      knowledge: 25,
      luck: 20
    },
    levelRequirement: 30,
    cost: 10000,
    icon: '🏅'
  }
];

// ========================================
// Helper Functions
// ========================================

export function getItemById(itemId: string): Item | undefined {
  return ITEM_DATABASE.find(item => item.id === itemId);
}

export function getItemsByRarity(rarity: ItemRarity): Item[] {
  return ITEM_DATABASE.filter(item => item.rarity === rarity);
}

export function getItemsBySlot(slot: EquipmentSlot): Item[] {
  return ITEM_DATABASE.filter(item => item.slot === slot);
}

export function getItemsByLevelRange(minLevel: number, maxLevel: number): Item[] {
  return ITEM_DATABASE.filter(item =>
    item.levelRequirement >= minLevel && item.levelRequirement <= maxLevel
  );
}

export function getAvailableItemsForPlayer(playerLevel: number, playerCoins: number): Item[] {
  return ITEM_DATABASE.filter(item =>
    item.levelRequirement <= playerLevel && item.cost <= playerCoins
  );
}

export function calculateItemPower(item: Item): number {
  const stats = item.stats;
  const totalStats = (stats.intelligence || 0) +
                     (stats.charisma || 0) +
                     (stats.perception || 0) +
                     (stats.knowledge || 0) +
                     (stats.luck || 0);
  return totalStats;
}

export function sortItemsByPower(items: Item[]): Item[] {
  return [...items].sort((a, b) => calculateItemPower(b) - calculateItemPower(a));
}

console.log(`📦 Item Database loaded: ${ITEM_DATABASE.length} items across 5 slots and 5 rarities`);
