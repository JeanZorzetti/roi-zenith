// Quest Database for Market Research Quest
// Contains Main Story Quests, Daily Quests, and Weekly Challenges

export type QuestType = 'main' | 'daily' | 'weekly';
export type QuestStatus = 'locked' | 'available' | 'active' | 'completed';

export interface QuestObjective {
  description: string;
  current: number;
  required: number;
  type: 'interview' | 'battle' | 'exploration' | 'collect' | 'level' | 'recruit' | 'equip';
}

export interface QuestReward {
  xp?: number;
  coins?: number;
  gems?: number;
  items?: string[]; // Item IDs from itemDatabase
  unlocks?: string; // Territory, feature, or NPC unlock
}

export interface Quest {
  id: string;
  type: QuestType;
  title: string;
  description: string;
  story?: string; // Narrative text for main quests
  chapter?: number; // For main quests (1-5)
  objectives: QuestObjective[];
  rewards: QuestReward;
  levelRequirement: number;
  prerequisites?: string[]; // Quest IDs that must be completed first
  icon: string;
  territory?: string; // Optional territory restriction
}

// ========================================
// MAIN STORY QUESTS (5 Chapters)
// ========================================

export const MAIN_QUESTS: Quest[] = [
  // CHAPTER 1: The Awakening
  {
    id: 'main_chapter_1',
    type: 'main',
    title: 'Capítulo 1: O Despertar',
    description: 'Descubra sua vocação como pesquisador de mercado no território do Varejo.',
    story: 'Você acorda em um mundo onde insights de mercado são a moeda mais valiosa. Sua jornada começa no movimentado setor de Varejo, onde comerciantes desesperados precisam entender seus clientes. Será que você tem o que é preciso para se tornar um Oráculo de Mercado?',
    chapter: 1,
    objectives: [
      {
        description: 'Complete seu primeiro tutorial de entrevista',
        current: 0,
        required: 1,
        type: 'interview'
      },
      {
        description: 'Realize 5 entrevistas no território de Varejo',
        current: 0,
        required: 5,
        type: 'interview'
      },
      {
        description: 'Derrote seu primeiro Lead Boss',
        current: 0,
        required: 1,
        type: 'battle'
      }
    ],
    rewards: {
      xp: 500,
      coins: 300,
      gems: 5,
      items: ['item_notebook_basic', 'item_business_card'],
      unlocks: 'territory_industria'
    },
    levelRequirement: 1,
    icon: '🌟',
    territory: 'varejo'
  },

  // CHAPTER 2: Expanding Horizons
  {
    id: 'main_chapter_2',
    type: 'main',
    title: 'Capítulo 2: Horizontes Expandidos',
    description: 'Adentre o mundo da Indústria e aprenda técnicas avançadas de pesquisa B2B.',
    story: 'Com sua reputação crescendo no Varejo, você recebe um convite intrigante: a elite industrial precisa de alguém capaz de decifrar as complexas dinâmicas entre fornecedores e fabricantes. Este é um jogo completamente diferente - ciclos de venda longos, múltiplos stakeholders, decisões milionárias. Você está preparado?',
    chapter: 2,
    objectives: [
      {
        description: 'Explore completamente o território de Indústria',
        current: 0,
        required: 15,
        type: 'exploration'
      },
      {
        description: 'Recrute seu primeiro NPC pesquisador',
        current: 0,
        required: 1,
        type: 'recruit'
      },
      {
        description: 'Equipe um item de raridade Incomum ou superior',
        current: 0,
        required: 1,
        type: 'equip'
      },
      {
        description: 'Alcance nível 5',
        current: 0,
        required: 5,
        type: 'level'
      }
    ],
    rewards: {
      xp: 1200,
      coins: 800,
      gems: 10,
      items: ['item_tablet_pro', 'item_course_qualitative'],
      unlocks: 'territory_servicos'
    },
    levelRequirement: 3,
    prerequisites: ['main_chapter_1'],
    icon: '🏭',
    territory: 'industria'
  },

  // CHAPTER 3: The Service Enigma
  {
    id: 'main_chapter_3',
    type: 'main',
    title: 'Capítulo 3: O Enigma dos Serviços',
    description: 'Desvende os mistérios do setor de Serviços, onde experiência é tudo.',
    story: 'No setor de Serviços, você não vende produtos - você vende promessas, experiências, transformações. Como medir algo tão intangível? Como capturar a essência de uma interação perfeita? Os mestres deste território guardam segredos antigos sobre comportamento humano e psicologia da experiência.',
    chapter: 3,
    objectives: [
      {
        description: 'Complete 20 entrevistas em qualquer território',
        current: 0,
        required: 20,
        type: 'interview'
      },
      {
        description: 'Colete 3 itens de raridade Rara',
        current: 0,
        required: 3,
        type: 'collect'
      },
      {
        description: 'Derrote 5 Lead Bosses diferentes',
        current: 0,
        required: 5,
        type: 'battle'
      },
      {
        description: 'Tenha 3 NPCs em seu grupo',
        current: 0,
        required: 3,
        type: 'recruit'
      }
    ],
    rewards: {
      xp: 2500,
      coins: 1500,
      gems: 20,
      items: ['item_analytics_suite', 'item_behavior_tracker', 'item_certification_ux'],
      unlocks: 'territory_saude'
    },
    levelRequirement: 7,
    prerequisites: ['main_chapter_2'],
    icon: '💼',
    territory: 'servicos'
  },

  // CHAPTER 4: Healing Insights
  {
    id: 'main_chapter_4',
    type: 'main',
    title: 'Capítulo 4: Insights que Curam',
    description: 'Entre no sensível mundo da Saúde, onde cada insight pode salvar vidas.',
    story: 'O setor de Saúde é diferente de tudo que você já viu. Aqui, suas pesquisas não impactam apenas lucros - elas afetam vidas. Hospitais superlotados, médicos exaustos, pacientes desesperados. Como fazer pesquisa em um ambiente onde emoções são intensas e cada decisão tem peso moral? A resposta está na empatia profunda e na ética inabalável.',
    chapter: 4,
    objectives: [
      {
        description: 'Alcance nível 12',
        current: 0,
        required: 12,
        type: 'level'
      },
      {
        description: 'Equipe um item Épico',
        current: 0,
        required: 1,
        type: 'equip'
      },
      {
        description: 'Complete 10 explorações no território de Saúde',
        current: 0,
        required: 10,
        type: 'exploration'
      },
      {
        description: 'Derrote o Lead Boss de Saúde',
        current: 0,
        required: 1,
        type: 'battle'
      },
      {
        description: 'Complete 5 Daily Quests',
        current: 0,
        required: 5,
        type: 'collect'
      }
    ],
    rewards: {
      xp: 5000,
      coins: 3000,
      gems: 35,
      items: ['item_ai_assistant', 'item_empathy_amplifier', 'item_master_degree'],
      unlocks: 'territory_corporativo'
    },
    levelRequirement: 10,
    prerequisites: ['main_chapter_3'],
    icon: '🏥',
    territory: 'saude'
  },

  // CHAPTER 5: The Final Challenge
  {
    id: 'main_chapter_5',
    type: 'main',
    title: 'Capítulo 5: O Desafio Final',
    description: 'Prove seu valor no mundo Corporativo e Startups para se tornar um Oráculo de Mercado.',
    story: 'Sua jornada o trouxe até aqui - do humilde Varejo aos corredores de poder Corporativo e ao caos inovador das Startups. Agora, você enfrenta o desafio definitivo: conduzir uma pesquisa massiva multi-territorial que mudará o futuro do mercado. Apenas os verdadeiros mestres chegam até aqui. Você está pronto para reivindicar o título de Oráculo de Mercado?',
    chapter: 5,
    objectives: [
      {
        description: 'Alcance nível 18',
        current: 0,
        required: 18,
        type: 'level'
      },
      {
        description: 'Desbloqueie todos os 6 territórios',
        current: 0,
        required: 6,
        type: 'exploration'
      },
      {
        description: 'Derrote todos os Lead Bosses',
        current: 0,
        required: 6,
        type: 'battle'
      },
      {
        description: 'Colete 1 item Lendário',
        current: 0,
        required: 1,
        type: 'collect'
      },
      {
        description: 'Complete 50 entrevistas totais',
        current: 0,
        required: 50,
        type: 'interview'
      },
      {
        description: 'Tenha um grupo completo de NPCs de elite',
        current: 0,
        required: 5,
        type: 'recruit'
      }
    ],
    rewards: {
      xp: 10000,
      coins: 10000,
      gems: 100,
      items: ['item_oracle_system', 'item_neural_link', 'item_ancient_wisdom', 'item_market_oracle_badge'],
      unlocks: 'endgame_content'
    },
    levelRequirement: 15,
    prerequisites: ['main_chapter_4'],
    icon: '🏆',
    territory: 'corporativo'
  }
];

// ========================================
// DAILY QUESTS (Reset every 24h)
// ========================================

export const DAILY_QUESTS: Quest[] = [
  {
    id: 'daily_interviews',
    type: 'daily',
    title: 'Entrevistas Diárias',
    description: 'Pratique suas habilidades de entrevista realizando pesquisas hoje.',
    objectives: [
      {
        description: 'Complete 3 entrevistas em qualquer território',
        current: 0,
        required: 3,
        type: 'interview'
      }
    ],
    rewards: {
      xp: 200,
      coins: 150,
      gems: 2
    },
    levelRequirement: 1,
    icon: '🎤'
  },

  {
    id: 'daily_exploration',
    type: 'daily',
    title: 'Explorador Dedicado',
    description: 'Explore territórios em busca de novos leads e oportunidades.',
    objectives: [
      {
        description: 'Realize 5 explorações em qualquer território',
        current: 0,
        required: 5,
        type: 'exploration'
      }
    ],
    rewards: {
      xp: 180,
      coins: 200,
      items: ['random_common'] // Special marker for random loot
    },
    levelRequirement: 2,
    icon: '🗺️'
  },

  {
    id: 'daily_boss_challenge',
    type: 'daily',
    title: 'Desafio Boss',
    description: 'Teste suas habilidades contra um Lead Boss difícil.',
    objectives: [
      {
        description: 'Derrote 1 Lead Boss',
        current: 0,
        required: 1,
        type: 'battle'
      }
    ],
    rewards: {
      xp: 300,
      coins: 250,
      gems: 3,
      items: ['random_uncommon']
    },
    levelRequirement: 3,
    icon: '⚔️'
  },

  {
    id: 'daily_collector',
    type: 'daily',
    title: 'Colecionador de Dados',
    description: 'Acumule moedas através de suas atividades de pesquisa.',
    objectives: [
      {
        description: 'Ganhe 500 moedas através de qualquer atividade',
        current: 0,
        required: 500,
        type: 'collect'
      }
    ],
    rewards: {
      xp: 150,
      coins: 300,
      gems: 1
    },
    levelRequirement: 1,
    icon: '💰'
  },

  {
    id: 'daily_party_synergy',
    type: 'daily',
    title: 'Sinergia de Equipe',
    description: 'Trabalhe com seu grupo de NPCs para completar tarefas.',
    objectives: [
      {
        description: 'Complete 2 entrevistas com pelo menos 1 NPC recrutado',
        current: 0,
        required: 2,
        type: 'interview'
      }
    ],
    rewards: {
      xp: 250,
      coins: 200,
      gems: 2
    },
    levelRequirement: 5,
    icon: '👥'
  }
];

// ========================================
// WEEKLY CHALLENGES (Reset every 7 days)
// ========================================

export const WEEKLY_QUESTS: Quest[] = [
  {
    id: 'weekly_master_researcher',
    type: 'weekly',
    title: 'Pesquisador Mestre',
    description: 'Demonstre maestria em pesquisa completando múltiplas entrevistas esta semana.',
    objectives: [
      {
        description: 'Complete 20 entrevistas na semana',
        current: 0,
        required: 20,
        type: 'interview'
      },
      {
        description: 'Derrote 3 Lead Bosses',
        current: 0,
        required: 3,
        type: 'battle'
      }
    ],
    rewards: {
      xp: 1500,
      coins: 1000,
      gems: 15,
      items: ['random_rare']
    },
    levelRequirement: 5,
    icon: '🎯'
  },

  {
    id: 'weekly_territory_domination',
    type: 'weekly',
    title: 'Dominação Territorial',
    description: 'Explore profundamente todos os territórios desbloqueados.',
    objectives: [
      {
        description: 'Complete 30 explorações totais',
        current: 0,
        required: 30,
        type: 'exploration'
      },
      {
        description: 'Visite todos os territórios desbloqueados pelo menos 3 vezes',
        current: 0,
        required: 3,
        type: 'exploration'
      }
    ],
    rewards: {
      xp: 2000,
      coins: 1500,
      gems: 20,
      items: ['random_rare', 'random_uncommon']
    },
    levelRequirement: 7,
    icon: '🗺️'
  },

  {
    id: 'weekly_elite_collector',
    type: 'weekly',
    title: 'Colecionador Elite',
    description: 'Acumule riquezas e equipamentos de qualidade superior.',
    objectives: [
      {
        description: 'Ganhe 5000 moedas na semana',
        current: 0,
        required: 5000,
        type: 'collect'
      },
      {
        description: 'Obtenha 2 itens de raridade Rara ou superior',
        current: 0,
        required: 2,
        type: 'collect'
      },
      {
        description: 'Complete 5 Daily Quests',
        current: 0,
        required: 5,
        type: 'collect'
      }
    ],
    rewards: {
      xp: 2500,
      coins: 2000,
      gems: 25,
      items: ['random_epic']
    },
    levelRequirement: 10,
    icon: '💎'
  }
];

// ========================================
// Combined Quest Database
// ========================================

export const QUEST_DATABASE: Quest[] = [
  ...MAIN_QUESTS,
  ...DAILY_QUESTS,
  ...WEEKLY_QUESTS
];

// ========================================
// Helper Functions
// ========================================

export function getQuestById(questId: string): Quest | undefined {
  return QUEST_DATABASE.find(quest => quest.id === questId);
}

export function getQuestsByType(type: QuestType): Quest[] {
  return QUEST_DATABASE.filter(quest => quest.type === type);
}

export function getAvailableQuests(
  playerLevel: number,
  completedQuestIds: string[]
): Quest[] {
  return QUEST_DATABASE.filter(quest => {
    // Check level requirement
    if (quest.levelRequirement > playerLevel) return false;

    // Check if already completed (except daily/weekly which can repeat)
    if (quest.type === 'main' && completedQuestIds.includes(quest.id)) {
      return false;
    }

    // Check prerequisites
    if (quest.prerequisites) {
      const allPrereqsMet = quest.prerequisites.every(prereqId =>
        completedQuestIds.includes(prereqId)
      );
      if (!allPrereqsMet) return false;
    }

    return true;
  });
}

export function getQuestProgress(quest: Quest): number {
  const totalRequired = quest.objectives.reduce((sum, obj) => sum + obj.required, 0);
  const totalCurrent = quest.objectives.reduce((sum, obj) => sum + obj.current, 0);
  return totalRequired > 0 ? (totalCurrent / totalRequired) * 100 : 0;
}

export function isQuestCompleted(quest: Quest): boolean {
  return quest.objectives.every(obj => obj.current >= obj.required);
}

export function getNextMainQuest(completedQuestIds: string[]): Quest | undefined {
  return MAIN_QUESTS.find(quest => {
    if (completedQuestIds.includes(quest.id)) return false;

    if (!quest.prerequisites) return true;

    return quest.prerequisites.every(prereqId =>
      completedQuestIds.includes(prereqId)
    );
  });
}

export function calculateTotalRewards(quests: Quest[]): QuestReward {
  return quests.reduce((total, quest) => {
    return {
      xp: (total.xp || 0) + (quest.rewards.xp || 0),
      coins: (total.coins || 0) + (quest.rewards.coins || 0),
      gems: (total.gems || 0) + (quest.rewards.gems || 0),
      items: [...(total.items || []), ...(quest.rewards.items || [])]
    };
  }, {} as QuestReward);
}

export function getQuestsByTerritory(territory: string): Quest[] {
  return QUEST_DATABASE.filter(quest => quest.territory === territory);
}

console.log(`📋 Quest Database loaded: ${MAIN_QUESTS.length} main quests, ${DAILY_QUESTS.length} daily quests, ${WEEKLY_QUESTS.length} weekly challenges`);
