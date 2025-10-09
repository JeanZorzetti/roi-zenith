// ============= MARKET RESEARCH QUEST - Game Configuration =============
// Este arquivo contém todas as constantes, tabelas de balanceamento e seed data do jogo

// ============= PROGRESSÃO =============

export const XP_TABLE = Array.from({ length: 100 }, (_, i) => {
  const level = i + 1;
  return {
    level,
    xpRequired: level * 100, // Progressão linear: Level 1 = 100 XP, Level 2 = 200 XP, etc
    xpToNextLevel: (level + 1) * 100,
  };
});

export const LEVEL_UP_REWARDS = {
  skillPoints: 1,
  maxEnergyBonus: 5,
  coinMultiplierBonus: 0.02, // +2% por nível
};

// ============= REWARDS (CRM → GAME) =============

export interface GameReward {
  experience: number;
  coins: number;
  gems?: number;
  energy?: number;
  reputation?: number;
}

export const CRM_REWARDS: Record<string, GameReward> = {
  // Ações básicas
  CONTACT_CREATED: {
    experience: 10,
    coins: 5,
  },
  MEETING_SCHEDULED: {
    experience: 8,
    coins: 3,
    energy: 1,
  },
  ACTIVITY_COMPLETED: {
    experience: 5,
    coins: 3,
  },
  FOLLOWUP_COMPLETED: {
    experience: 5,
    coins: 3,
  },

  // Descoberta de dores (intensidade 1-3)
  PAIN_DISCOVERED_LOW: {
    experience: 30,
    coins: 10,
  },
  // Intensidade 4-6
  PAIN_DISCOVERED_MEDIUM: {
    experience: 50,
    coins: 25,
    gems: 2,
  },
  // Intensidade 7-9
  PAIN_DISCOVERED_HIGH: {
    experience: 100,
    coins: 50,
    gems: 5,
  },
  // Intensidade 10
  PAIN_DISCOVERED_LEGENDARY: {
    experience: 200,
    coins: 100,
    gems: 15,
    reputation: 10,
  },

  // Mapeamento de soluções
  SOLUTION_MAPPED: {
    experience: 20,
    coins: 10,
  },

  // Referrals
  REFERRAL_RECEIVED: {
    experience: 15,
    coins: 10,
    energy: 3,
  },

  // Conversão de relacionamento
  RELATIONSHIP_UPGRADED: {
    experience: 10,
    coins: 5,
  },

  // ===== MARKET RESEARCH EVENTS =====
  TARGET_DISCOVERED: {
    experience: 50,
    coins: 100,
  },
  PAIN_MAPPED: {
    experience: 30,
    coins: 75,
  },
  INTERVIEW_COMPLETED: {
    experience: 80,
    coins: 150,
    energy: 20,
  },
  DECISION_MAKER_IDENTIFIED: {
    experience: 100,
    coins: 200,
  },
  LEAD_QUALIFIED: {
    experience: 200,
    coins: 500,
    gems: 50,
  },
  RESEARCH_TO_SALES_PROMOTION: {
    experience: 100,
    coins: 50,
    reputation: 10,
  },

  // Milestones especiais
  FIRST_INTERVIEW_OF_DAY: {
    experience: 0,
    coins: 50,
    energy: 5,
  },
  FIVE_INTERVIEWS_IN_DAY: {
    experience: 0,
    coins: 200,
    gems: 10,
  },
  TEN_CONTACTS_IN_DAY: {
    experience: 0,
    coins: 100,
    energy: 3,
  },
  WEEKLY_GOAL_MET: {
    experience: 0,
    coins: 500,
    gems: 20,
    reputation: 5,
  },
  SEVEN_DAY_STREAK: {
    experience: 0,
    coins: 300,
    gems: 15,
  },
  SEGMENT_COMPLETED: {
    experience: 0,
    coins: 1000,
    gems: 50,
    reputation: 100,
  },

  // Penalidades
  INTERVIEW_CANCELLED: {
    experience: 0,
    coins: 0,
    energy: -5,
  },
};

// ============= TERRITÓRIOS =============

export interface Territory {
  id: string;
  name: string;
  emoji: string;
  levelRange: [number, number];
  reputationRequired: number;
  description: string;
  painTypes: string[];
  leadsCount: number;
  boss: {
    name: string;
    level: number;
    hp: number;
    difficulty: string;
    rewards: GameReward & { item: string };
  };
}

export const TERRITORIES: Territory[] = [
  {
    id: 'varejo',
    name: 'Varejo',
    emoji: '🏪',
    levelRange: [1, 10],
    reputationRequired: 0,
    description: 'Lojistas, pequeno comércio e varejo local',
    painTypes: ['Estoque', 'Vendas', 'Fluxo de Caixa'],
    leadsCount: 15,
    boss: {
      name: 'O Lojista Cético',
      level: 10,
      hp: 500,
      difficulty: 'easy',
      rewards: {
        experience: 500,
        coins: 1000,
        gems: 20,
        reputation: 100,
        item: 'rare_notepad',
      },
    },
  },
  {
    id: 'industria',
    name: 'Indústria',
    emoji: '🏭',
    levelRange: [11, 25],
    reputationRequired: 100,
    description: 'Fábricas, manufatura e produção',
    painTypes: ['Produção', 'Qualidade', 'Logística'],
    leadsCount: 20,
    boss: {
      name: 'O Gerente Tradicional',
      level: 25,
      hp: 1500,
      difficulty: 'medium',
      rewards: {
        experience: 1500,
        coins: 3000,
        gems: 50,
        reputation: 200,
        item: 'epic_tablet',
      },
    },
  },
  {
    id: 'servicos',
    name: 'Serviços',
    emoji: '💼',
    levelRange: [26, 40],
    reputationRequired: 500,
    description: 'Consultorias, agências e serviços B2B',
    painTypes: ['Projetos', 'Faturamento', 'Pessoas'],
    leadsCount: 25,
    boss: {
      name: 'O Sócio Ocupado',
      level: 40,
      hp: 3000,
      difficulty: 'medium',
      rewards: {
        experience: 3000,
        coins: 6000,
        gems: 80,
        reputation: 300,
        item: 'epic_laptop',
      },
    },
  },
  {
    id: 'saude',
    name: 'Saúde',
    emoji: '🏥',
    levelRange: [41, 60],
    reputationRequired: 2000,
    description: 'Clínicas, hospitais e serviços de saúde',
    painTypes: ['Regulatório', 'Agendamento', 'Prontuários'],
    leadsCount: 30,
    boss: {
      name: 'O Diretor Clínico',
      level: 60,
      hp: 5000,
      difficulty: 'hard',
      rewards: {
        experience: 5000,
        coins: 10000,
        gems: 120,
        reputation: 500,
        item: 'legendary_crm_system',
      },
    },
  },
  {
    id: 'corporativo',
    name: 'Corporativo',
    emoji: '🏢',
    levelRange: [61, 80],
    reputationRequired: 5000,
    description: 'Grandes empresas e corporações',
    painTypes: ['Integração', 'Compliance', 'Reporting'],
    leadsCount: 35,
    boss: {
      name: 'O VP de TI',
      level: 80,
      hp: 8000,
      difficulty: 'hard',
      rewards: {
        experience: 8000,
        coins: 15000,
        gems: 150,
        reputation: 800,
        item: 'legendary_executive_network',
      },
    },
  },
  {
    id: 'startups',
    name: 'Startups',
    emoji: '🦄',
    levelRange: [81, 100],
    reputationRequired: 10000,
    description: 'Startups, scale-ups e unicórnios',
    painTypes: ['Escalabilidade', 'Automação', 'Growth'],
    leadsCount: 40,
    boss: {
      name: 'O Founder Perfeccionista',
      level: 100,
      hp: 12000,
      difficulty: 'extreme',
      rewards: {
        experience: 15000,
        coins: 30000,
        gems: 200,
        reputation: 1500,
        item: 'mythic_market_oracle',
      },
    },
  },
];

// ============= ITEMS & EQUIPAMENTOS =============

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
export type ItemSlot = 'primary_tool' | 'secondary_tool' | 'knowledge_base' | 'communication' | 'professional';

export interface GameItem {
  id: string;
  name: string;
  description: string;
  rarity: ItemRarity;
  slot: ItemSlot | 'consumable';
  stats?: {
    intelligence?: number;
    charisma?: number;
    perception?: number;
    knowledge?: number;
    luck?: number;
  };
  effects?: string[];
  price?: number; // em coins
  gemPrice?: number; // em gems
  levelRequirement?: number;
}

export const ITEMS: GameItem[] = [
  // ===== PRIMARY TOOL =====
  {
    id: 'google_forms',
    name: 'Google Forms',
    description: 'Ferramenta básica de pesquisa',
    rarity: 'common',
    slot: 'primary_tool',
    stats: { intelligence: 10 },
    price: 0, // Inicial
  },
  {
    id: 'typeform',
    name: 'Typeform',
    description: 'Formulários interativos e modernos',
    rarity: 'uncommon',
    slot: 'primary_tool',
    stats: { intelligence: 20, charisma: 5 },
    effects: ['+10% response rate'],
    price: 500,
    levelRequirement: 5,
  },
  {
    id: 'survey_monkey',
    name: 'Survey Monkey',
    description: 'Pesquisas profissionais',
    rarity: 'rare',
    slot: 'primary_tool',
    stats: { intelligence: 35, perception: 10 },
    effects: ['+20% completion rate'],
    price: 2000,
    levelRequirement: 15,
  },
  {
    id: 'custom_research_tool',
    name: 'Custom Research Tool',
    description: 'Ferramenta personalizada para pesquisa',
    rarity: 'epic',
    slot: 'primary_tool',
    stats: { intelligence: 60, perception: 20 },
    effects: ['+35% quality'],
    price: 10000,
    gemPrice: 20,
    levelRequirement: 40,
  },
  {
    id: 'the_market_scanner',
    name: 'The Market Scanner',
    description: 'Detecta dores automaticamente',
    rarity: 'legendary',
    slot: 'primary_tool',
    stats: { intelligence: 100, perception: 40 },
    effects: ['Auto-detecta dores', '+50% discovery'],
    gemPrice: 100,
    levelRequirement: 75,
  },

  // ===== SECONDARY TOOL =====
  {
    id: 'excel',
    name: 'Excel',
    description: 'Planilha básica',
    rarity: 'common',
    slot: 'secondary_tool',
    stats: { knowledge: 8 },
    price: 0,
  },
  {
    id: 'google_sheets',
    name: 'Google Sheets',
    description: 'Planilha colaborativa',
    rarity: 'uncommon',
    slot: 'secondary_tool',
    stats: { knowledge: 15, intelligence: 5 },
    price: 300,
    levelRequirement: 3,
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Workspace all-in-one',
    rarity: 'rare',
    slot: 'secondary_tool',
    stats: { knowledge: 30, intelligence: 15 },
    effects: ['Armazena 50 insights'],
    price: 2500,
    levelRequirement: 20,
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    description: 'Knowledge base com graph view',
    rarity: 'epic',
    slot: 'secondary_tool',
    stats: { knowledge: 50, intelligence: 25 },
    effects: ['Insights infinitos', 'Conecta padrões'],
    price: 12000,
    gemPrice: 25,
    levelRequirement: 50,
  },
  {
    id: 'insight_engine',
    name: 'Insight Engine',
    description: 'IA que analisa e conecta dores',
    rarity: 'legendary',
    slot: 'secondary_tool',
    stats: { knowledge: 80, intelligence: 50 },
    effects: ['Auto-conecta padrões', '+100% insight quality'],
    gemPrice: 120,
    levelRequirement: 80,
  },

  // ===== KNOWLEDGE BASE =====
  {
    id: 'notebook',
    name: 'Caderno',
    description: 'Anotações manuais',
    rarity: 'common',
    slot: 'knowledge_base',
    stats: { perception: 5 },
    price: 0,
  },
  {
    id: 'moleskine',
    name: 'Moleskine',
    description: 'Caderno premium',
    rarity: 'uncommon',
    slot: 'knowledge_base',
    stats: { perception: 15 },
    price: 400,
  },
  {
    id: 'digital_notebook',
    name: 'Digital Notebook',
    description: 'iPad com Apple Pencil',
    rarity: 'rare',
    slot: 'knowledge_base',
    stats: { perception: 30, intelligence: 10 },
    price: 3000,
    levelRequirement: 25,
  },
  {
    id: 'research_journal',
    name: 'Research Journal',
    description: 'Sistema completo de pesquisa',
    rarity: 'epic',
    slot: 'knowledge_base',
    stats: { perception: 55, knowledge: 25 },
    effects: ['+30% pattern recognition'],
    price: 15000,
    gemPrice: 30,
    levelRequirement: 55,
  },

  // ===== COMMUNICATION =====
  {
    id: 'basic_phone',
    name: 'Celular Básico',
    description: 'Telefone simples',
    rarity: 'common',
    slot: 'communication',
    stats: { charisma: 5 },
    price: 0,
  },
  {
    id: 'smartphone',
    name: 'Smartphone',
    description: 'Celular moderno',
    rarity: 'uncommon',
    slot: 'communication',
    stats: { charisma: 15 },
    price: 600,
  },
  {
    id: 'iphone',
    name: 'iPhone',
    description: 'Premium smartphone',
    rarity: 'rare',
    slot: 'communication',
    stats: { charisma: 30, perception: 10 },
    effects: ['Video calls enabled'],
    price: 4000,
    levelRequirement: 30,
  },
  {
    id: 'pro_av_setup',
    name: 'Pro A/V Setup',
    description: 'Microfone e câmera profissionais',
    rarity: 'epic',
    slot: 'communication',
    stats: { charisma: 50, perception: 15 },
    effects: ['+20% relationship gain'],
    price: 18000,
    gemPrice: 35,
    levelRequirement: 60,
  },
  {
    id: 'silver_tongue_mic',
    name: 'Silver Tongue Mic',
    description: 'Microfone lendário que encanta',
    rarity: 'legendary',
    slot: 'communication',
    stats: { charisma: 80, perception: 30 },
    effects: ['+50% conversion', 'Charm effect'],
    gemPrice: 150,
    levelRequirement: 85,
  },

  // ===== PROFESSIONAL =====
  {
    id: 'business_card',
    name: 'Cartão de Visita',
    description: 'Cartão profissional básico',
    rarity: 'common',
    slot: 'professional',
    stats: { charisma: 5 },
    price: 0,
  },
  {
    id: 'linkedin_premium',
    name: 'LinkedIn Premium',
    description: 'Acesso a InMail e insights',
    rarity: 'uncommon',
    slot: 'professional',
    stats: { luck: 15, charisma: 10 },
    effects: ['InMail skill unlocked'],
    price: 800,
    levelRequirement: 10,
  },
  {
    id: 'personal_brand',
    name: 'Personal Brand',
    description: 'Marca pessoal estabelecida',
    rarity: 'rare',
    slot: 'professional',
    stats: { charisma: 35, luck: 20 },
    effects: ['+15% inbound leads/dia'],
    price: 5000,
    levelRequirement: 35,
  },
  {
    id: 'executive_network',
    name: 'Executive Network',
    description: 'Rede de contatos C-Level',
    rarity: 'epic',
    slot: 'professional',
    stats: { charisma: 60, luck: 35 },
    effects: ['+50 reputation/dia', 'Acesso a bosses'],
    price: 20000,
    gemPrice: 40,
    levelRequirement: 65,
  },

  // ===== CONSUMÍVEIS =====
  {
    id: 'coffee',
    name: 'Café',
    description: 'Restaura energia',
    rarity: 'common',
    slot: 'consumable',
    effects: ['+10 energy'],
    price: 5,
  },
  {
    id: 'gift_card',
    name: 'Gift Card',
    description: 'Presente para fortalecer relacionamento',
    rarity: 'uncommon',
    slot: 'consumable',
    effects: ['+30 relationship', '+20% acceptance'],
    price: 20,
  },
  {
    id: 'industry_report',
    name: 'Industry Report',
    description: 'Relatório setorial',
    rarity: 'uncommon',
    slot: 'consumable',
    effects: ['Revela dores do setor', '+15% discovery por 24h'],
    price: 50,
  },
  {
    id: 'event_ticket',
    name: 'Event Ticket',
    description: 'Ingresso para evento de networking',
    rarity: 'rare',
    slot: 'consumable',
    effects: ['5-10 warm leads', 'Acesso território premium'],
    price: 100,
  },
  {
    id: 'energy_drink',
    name: 'Energy Drink',
    description: 'Boost instantâneo de energia',
    rarity: 'rare',
    slot: 'consumable',
    effects: ['+50 energy instantâneo'],
    gemPrice: 10,
  },
  {
    id: 'lucky_charm',
    name: 'Lucky Charm',
    description: 'Amuleto da sorte',
    rarity: 'epic',
    slot: 'consumable',
    effects: ['+50% luck por 1 hora'],
    gemPrice: 20,
  },
];

// ============= NPCs (PARTY) =============

export interface NPC {
  id: string;
  name: string;
  title: string;
  emoji: string;
  rarity: ItemRarity;
  cost: {
    coins?: number;
    gems?: number;
  };
  unlockLevel: number;
  skill: {
    name: string;
    description: string;
    effect: string;
  };
  passive: {
    name: string;
    bonus: string;
  };
}

export const NPCS: NPC[] = [
  {
    id: 'data_analyst',
    name: 'Marcus',
    title: 'Data Analyst Junior',
    emoji: '📊',
    rarity: 'uncommon',
    cost: { coins: 500 },
    unlockLevel: 10,
    skill: {
      name: 'Pattern Recognition',
      description: 'Identifica dores similares',
      effect: 'Auto-identifica dores recorrentes',
    },
    passive: {
      name: 'Analytical Mind',
      bonus: '+10% XP em insights',
    },
  },
  {
    id: 'ux_researcher',
    name: 'Sarah',
    title: 'UX Researcher',
    emoji: '🎨',
    rarity: 'rare',
    cost: { coins: 2000 },
    unlockLevel: 20,
    skill: {
      name: 'User Journey Mapping',
      description: 'Mapeia a jornada do usuário',
      effect: '+20% discovery de dores ocultas',
    },
    passive: {
      name: 'Empathy Expert',
      bonus: '+15% relationship gain',
    },
  },
  {
    id: 'sdr',
    name: 'Roberto',
    title: 'Sales Development Rep',
    emoji: '📞',
    rarity: 'rare',
    cost: { coins: 5000 },
    unlockLevel: 35,
    skill: {
      name: 'Cold Calling Master',
      description: 'Gera leads qualificados',
      effect: 'Gera 5 leads qualificados/dia automaticamente',
    },
    passive: {
      name: 'Prospecting Pro',
      bonus: '+20% response rate',
    },
  },
  {
    id: 'product_manager',
    name: 'Fernanda',
    title: 'Product Manager',
    emoji: '🎯',
    rarity: 'epic',
    cost: { coins: 20000, gems: 10 },
    unlockLevel: 50,
    skill: {
      name: 'Solution Mapping',
      description: 'Conecta dores a features',
      effect: 'Auto-mapeia soluções Orion para dores',
    },
    passive: {
      name: 'Product Vision',
      bonus: '+30% coins em insights',
    },
  },
  {
    id: 'research_director',
    name: 'Dr. Silva',
    title: 'Research Director',
    emoji: '🧠',
    rarity: 'legendary',
    cost: { coins: 100000, gems: 50 },
    unlockLevel: 75,
    skill: {
      name: 'Market Intelligence',
      description: 'Visão completa do mercado',
      effect: 'Revela todos leads "Golden" no mapa',
    },
    passive: {
      name: 'Genius Mind',
      bonus: '2x XP em todos insights',
    },
  },
];

// ============= QUESTS =============

export interface Quest {
  id: string;
  type: 'main' | 'daily' | 'weekly';
  chapter?: number;
  name: string;
  description: string;
  objectives: {
    id: string;
    description: string;
    target: number;
    trackingKey: string; // Ex: 'contacts_added', 'pains_discovered'
  }[];
  rewards: GameReward & { items?: string[] };
  unlocks?: string[];
}

export const QUESTS: Quest[] = [
  // ===== MAIN QUEST =====
  {
    id: 'chapter_1',
    type: 'main',
    chapter: 1,
    name: 'Primeiros Passos',
    description: 'Aprender o básico da pesquisa de mercado',
    objectives: [
      {
        id: 'add_10_contacts',
        description: 'Adicione 10 contatos no CRM',
        target: 10,
        trackingKey: 'contacts_added',
      },
      {
        id: 'do_3_interviews',
        description: 'Realize 3 entrevistas',
        target: 3,
        trackingKey: 'interviews_completed',
      },
      {
        id: 'first_pain',
        description: 'Descubra sua primeira dor',
        target: 1,
        trackingKey: 'pains_discovered',
      },
    ],
    rewards: {
      experience: 100,
      coins: 500,
      items: ['typeform'],
    },
  },
  {
    id: 'chapter_2',
    type: 'main',
    chapter: 2,
    name: 'Padrões Emergem',
    description: 'Identificar dores recorrentes no mercado',
    objectives: [
      {
        id: 'discover_10_pains',
        description: 'Descubra 10 dores diferentes',
        target: 10,
        trackingKey: 'pains_discovered',
      },
      {
        id: 'find_patterns',
        description: 'Encontre 3 dores recorrentes (3+ empresas)',
        target: 3,
        trackingKey: 'recurring_pains_found',
      },
      {
        id: 'explore_2_territories',
        description: 'Complete exploração de 2 territórios',
        target: 2,
        trackingKey: 'territories_explored',
      },
    ],
    rewards: {
      experience: 500,
      coins: 2000,
      items: ['notion'],
      reputation: 100,
    },
    unlocks: ['party_system'],
  },
  {
    id: 'chapter_3',
    type: 'main',
    chapter: 3,
    name: 'Orion ERP Fit',
    description: 'Conectar dores a soluções do Orion',
    objectives: [
      {
        id: 'map_20_solutions',
        description: 'Conecte 20 dores a soluções Orion',
        target: 20,
        trackingKey: 'solutions_mapped',
      },
      {
        id: 'identify_must_haves',
        description: 'Identifique 5 features "must-have"',
        target: 5,
        trackingKey: 'must_have_features',
      },
      {
        id: 'interview_all_segments',
        description: 'Entreviste 1 lead de cada segmento explorado',
        target: 1,
        trackingKey: 'segments_interviewed',
      },
    ],
    rewards: {
      experience: 1000,
      coins: 5000,
      items: ['obsidian'],
      reputation: 200,
    },
  },
  {
    id: 'chapter_4',
    type: 'main',
    chapter: 4,
    name: 'Deep Dive',
    description: 'Aprofundar insights e validar hipóteses',
    objectives: [
      {
        id: 'high_intensity_pains',
        description: 'Descubra 5 dores de intensidade 9+',
        target: 5,
        trackingKey: 'high_intensity_pains',
      },
      {
        id: 'persona_journey',
        description: 'Mapeie jornada completa de 1 persona',
        target: 1,
        trackingKey: 'persona_mapped',
      },
      {
        id: 'validate_hypotheses',
        description: 'Valide 3 hipóteses de solução',
        target: 3,
        trackingKey: 'hypotheses_validated',
      },
    ],
    rewards: {
      experience: 2000,
      coins: 10000,
      items: ['insight_engine'],
      reputation: 500,
    },
  },
  {
    id: 'chapter_5',
    type: 'main',
    chapter: 5,
    name: 'Market Map Complete',
    description: 'Completar a pesquisa de mercado',
    objectives: [
      {
        id: '100_contacts',
        description: '100+ contatos no CRM',
        target: 100,
        trackingKey: 'contacts_added',
      },
      {
        id: '50_pains',
        description: '50+ dores mapeadas',
        target: 50,
        trackingKey: 'pains_discovered',
      },
      {
        id: '10_features',
        description: '10+ features validadas para Orion',
        target: 10,
        trackingKey: 'features_validated',
      },
      {
        id: 'all_territories',
        description: 'Todos 6 territórios explorados',
        target: 6,
        trackingKey: 'territories_explored',
      },
    ],
    rewards: {
      experience: 10000,
      coins: 50000,
      gems: 100,
      items: ['mythic_market_oracle'],
      reputation: 1500,
    },
    unlocks: ['market_expert_title'],
  },

  // ===== DAILY QUESTS =====
  {
    id: 'daily_contacts',
    type: 'daily',
    name: 'Network Builder',
    description: 'Adicione 3 novos contatos',
    objectives: [
      {
        id: 'add_3_contacts',
        description: 'Adicione 3 contatos no CRM',
        target: 3,
        trackingKey: 'contacts_added_today',
      },
    ],
    rewards: {
      experience: 15,
      coins: 30,
    },
  },
  {
    id: 'daily_interview',
    type: 'daily',
    name: 'The Interviewer',
    description: 'Faça 1 entrevista',
    objectives: [
      {
        id: 'do_interview',
        description: 'Realize 1 entrevista',
        target: 1,
        trackingKey: 'interviews_today',
      },
    ],
    rewards: {
      experience: 25,
      coins: 50,
      energy: 5,
    },
  },
  {
    id: 'daily_insight',
    type: 'daily',
    name: 'Insight Hunter',
    description: 'Documente 1 insight',
    objectives: [
      {
        id: 'document_insight',
        description: 'Documente 1 dor',
        target: 1,
        trackingKey: 'pains_today',
      },
    ],
    rewards: {
      experience: 10,
      coins: 20,
      gems: 1,
    },
  },
  {
    id: 'daily_followup',
    type: 'daily',
    name: 'Stay Connected',
    description: 'Complete 2 follow-ups',
    objectives: [
      {
        id: 'do_followups',
        description: 'Complete 2 follow-ups',
        target: 2,
        trackingKey: 'followups_today',
      },
    ],
    rewards: {
      experience: 12,
      coins: 25,
    },
  },

  // ===== WEEKLY QUESTS =====
  {
    id: 'weekly_deep_dive',
    type: 'weekly',
    name: 'Deep Diver',
    description: 'Descubra 10 dores esta semana',
    objectives: [
      {
        id: 'discover_10',
        description: 'Descubra 10 dores',
        target: 10,
        trackingKey: 'pains_this_week',
      },
    ],
    rewards: {
      experience: 0,
      coins: 500,
      gems: 10,
      items: ['industry_report'],
    },
  },
  {
    id: 'weekly_network',
    type: 'weekly',
    name: 'Network Master',
    description: 'Adicione 20 contatos esta semana',
    objectives: [
      {
        id: 'add_20',
        description: 'Adicione 20 contatos',
        target: 20,
        trackingKey: 'contacts_this_week',
      },
    ],
    rewards: {
      experience: 0,
      coins: 300,
      gems: 5,
    },
  },
  {
    id: 'weekly_relationship',
    type: 'weekly',
    name: 'Relationship Builder',
    description: 'Converta 5 leads cold → warm',
    objectives: [
      {
        id: 'upgrade_5',
        description: 'Converta 5 leads',
        target: 5,
        trackingKey: 'relationships_upgraded_week',
      },
    ],
    rewards: {
      experience: 0,
      coins: 400,
      gems: 8,
    },
  },
];

// ============= ACHIEVEMENTS =============

export interface Achievement {
  id: string;
  category: 'discovery' | 'networking' | 'solutions' | 'speed' | 'special';
  name: string;
  description: string;
  icon: string;
  requirement: {
    key: string;
    value: number;
  };
  rewards: GameReward & { badge?: string; title?: string; items?: string[] };
  hidden?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Discovery
  {
    id: 'first_discovery',
    category: 'discovery',
    name: 'First Discovery',
    description: 'Descubra sua primeira dor',
    icon: '🔍',
    requirement: { key: 'pains_discovered', value: 1 },
    rewards: { experience: 0, coins: 0, badge: 'first_discovery' },
  },
  {
    id: 'pain_hunter',
    category: 'discovery',
    name: 'Pain Hunter',
    description: 'Descubra 10 dores',
    icon: '🎯',
    requirement: { key: 'pains_discovered', value: 10 },
    rewards: { experience: 0, coins: 100, badge: 'pain_hunter' },
  },
  {
    id: 'pain_master',
    category: 'discovery',
    name: 'Pain Master',
    description: 'Descubra 50 dores',
    icon: '🏹',
    requirement: { key: 'pains_discovered', value: 50 },
    rewards: { experience: 0, coins: 500, items: ['industry_report'], badge: 'pain_master' },
  },
  {
    id: 'pain_legend',
    category: 'discovery',
    name: 'Pain Legend',
    description: 'Descubra 100 dores',
    icon: '⚡',
    requirement: { key: 'pains_discovered', value: 100 },
    rewards: { experience: 0, coins: 2000, items: ['pro_av_setup'], badge: 'pain_legend' },
  },

  // Networking
  {
    id: 'networker',
    category: 'networking',
    name: 'Networker',
    description: 'Adicione 50 contatos',
    icon: '🤝',
    requirement: { key: 'contacts_added', value: 50 },
    rewards: { experience: 0, coins: 200, badge: 'networker' },
  },
  {
    id: 'connector',
    category: 'networking',
    name: 'Connector',
    description: 'Adicione 100 contatos',
    icon: '🌐',
    requirement: { key: 'contacts_added', value: 100 },
    rewards: { experience: 0, coins: 500, badge: 'connector' },
  },
  {
    id: 'relationship_king',
    category: 'networking',
    name: 'Relationship King',
    description: 'Receba 10 indicações',
    icon: '👑',
    requirement: { key: 'referrals_received', value: 10 },
    rewards: { experience: 0, coins: 0, items: ['personal_brand'], badge: 'relationship_king' },
  },

  // Solutions
  {
    id: 'solution_designer',
    category: 'solutions',
    name: 'Solution Designer',
    description: 'Mapeie 20 soluções Orion',
    icon: '💡',
    requirement: { key: 'solutions_mapped', value: 20 },
    rewards: { experience: 0, coins: 300, badge: 'solution_designer' },
  },
  {
    id: 'product_visionary',
    category: 'solutions',
    name: 'Product Visionary',
    description: 'Sugira 5 features novas',
    icon: '🚀',
    requirement: { key: 'features_suggested', value: 5 },
    rewards: { experience: 0, coins: 1000, badge: 'product_visionary' },
  },
  {
    id: 'market_expert',
    category: 'solutions',
    name: 'Market Expert',
    description: 'Complete todos os segmentos',
    icon: '🎓',
    requirement: { key: 'territories_completed', value: 6 },
    rewards: { experience: 0, coins: 0, title: 'Market Expert', badge: 'market_expert' },
  },

  // Speed
  {
    id: 'speed_researcher',
    category: 'speed',
    name: 'Speed Researcher',
    description: '10 entrevistas em 1 dia',
    icon: '⚡',
    requirement: { key: 'interviews_in_one_day', value: 10 },
    rewards: { experience: 0, coins: 0, badge: 'speed_researcher' },
  },
  {
    id: 'marathon_runner',
    category: 'speed',
    name: 'Marathon Runner',
    description: '7 dias de streak',
    icon: '🔥',
    requirement: { key: 'streak_days', value: 7 },
    rewards: { experience: 0, coins: 500, badge: 'marathon_runner' },
  },
  {
    id: 'no_days_off',
    category: 'speed',
    name: 'No Days Off',
    description: '30 dias de streak',
    icon: '💪',
    requirement: { key: 'streak_days', value: 30 },
    rewards: { experience: 0, coins: 2000, items: ['lucky_charm'], badge: 'no_days_off' },
  },

  // Special
  {
    id: 'the_opener',
    category: 'special',
    name: 'The Opener',
    description: 'Complete o tutorial',
    icon: '🎬',
    requirement: { key: 'tutorial_completed', value: 1 },
    rewards: { experience: 0, coins: 0, badge: 'the_opener' },
  },
  {
    id: 'first_boss',
    category: 'special',
    name: 'First Boss',
    description: 'Derrote o primeiro boss',
    icon: '🏆',
    requirement: { key: 'bosses_defeated', value: 1 },
    rewards: { experience: 0, coins: 0, items: ['gift_card'], badge: 'first_boss' },
  },
  {
    id: 'all_bosses',
    category: 'special',
    name: 'Boss Slayer',
    description: 'Derrote todos os 6 bosses',
    icon: '👹',
    requirement: { key: 'bosses_defeated', value: 6 },
    rewards: { experience: 0, coins: 0, items: ['executive_network'], title: 'Boss Slayer', badge: 'all_bosses' },
  },
];

// ============= CONSTANTES DO JOGO =============

export const GAME_CONSTANTS = {
  // Energy
  MAX_ENERGY_DEFAULT: 50,
  ENERGY_REGEN_RATE: 1, // 1 energy por hora
  ENERGY_REGEN_INTERVAL: 3600000, // 1 hora em ms

  // Stats
  STARTING_STATS: {
    intelligence: 5,
    charisma: 5,
    perception: 5,
    knowledge: 5,
    luck: 5,
  },

  // Relationship
  RELATIONSHIP_TIERS: {
    COLD: { min: 0, max: 20, name: 'Cold', emoji: '❄️' },
    WARM: { min: 21, max: 50, name: 'Warm', emoji: '🌤️' },
    HOT: { min: 51, max: 80, name: 'Hot', emoji: '☀️' },
    CHAMPION: { min: 81, max: 100, name: 'Champion', emoji: '🔥' },
  },

  // Battle
  BATTLE_ACTIONS: [
    {
      id: 'open_question',
      name: 'Pergunta Aberta',
      emoji: '💬',
      description: 'Qual seu maior desafio?',
      discoveryChance: 0.6,
      relationshipChange: 10,
      energyCost: 0,
    },
    {
      id: 'direct_question',
      name: 'Pergunta Direta',
      emoji: '🎯',
      description: 'Seu financeiro tem problema?',
      discoveryChance: 0.8,
      relationshipChange: -10,
      energyCost: 5,
    },
    {
      id: 'active_listening',
      name: 'Escuta Ativa',
      emoji: '👂',
      description: 'Deixa o entrevistado falar',
      discoveryChance: 0.4,
      relationshipChange: 20,
      energyCost: 0,
      bonusDiscovery: true,
    },
    {
      id: 'present_data',
      name: 'Apresentar Dado',
      emoji: '📊',
      description: '80% do setor tem problema X',
      discoveryChanceBonus: 0.15,
      energyCost: 3,
    },
    {
      id: 'empathy',
      name: 'Empatia',
      emoji: '🤝',
      description: 'Entendo, deve ser frustrante',
      relationshipChange: 30,
      nextTurnBonus: 0.2,
      energyCost: 0,
    },
    {
      id: 'suggest_solution',
      name: 'Sugerir Solução',
      emoji: '💡',
      description: 'E se automatizar isso?',
      validatesIntensity: true,
      energyCost: 5,
    },
  ],

  // Loot
  RARITY_DROP_RATES: {
    common: 0.70,
    uncommon: 0.20,
    rare: 0.07,
    epic: 0.025,
    legendary: 0.004,
    mythic: 0.001,
  },

  // Quest reset times
  DAILY_RESET_HOUR: 0, // Meia-noite
  WEEKLY_RESET_DAY: 1, // Segunda-feira
};

// ============= HELPER FUNCTIONS =============

export function calculateXPForLevel(level: number): number {
  return level * 100;
}

export function calculateLevelFromXP(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getPainReward(intensity: number): GameReward {
  if (intensity >= 10) return CRM_REWARDS.PAIN_DISCOVERED_LEGENDARY;
  if (intensity >= 7) return CRM_REWARDS.PAIN_DISCOVERED_HIGH;
  if (intensity >= 4) return CRM_REWARDS.PAIN_DISCOVERED_MEDIUM;
  return CRM_REWARDS.PAIN_DISCOVERED_LOW;
}

export function getRelationshipTier(level: number) {
  const { RELATIONSHIP_TIERS } = GAME_CONSTANTS;
  if (level >= RELATIONSHIP_TIERS.CHAMPION.min) return RELATIONSHIP_TIERS.CHAMPION;
  if (level >= RELATIONSHIP_TIERS.HOT.min) return RELATIONSHIP_TIERS.HOT;
  if (level >= RELATIONSHIP_TIERS.WARM.min) return RELATIONSHIP_TIERS.WARM;
  return RELATIONSHIP_TIERS.COLD;
}

export function rollItemDrop(playerLuck: number = 0): GameItem | null {
  const { RARITY_DROP_RATES } = GAME_CONSTANTS;
  const luckBonus = playerLuck * 0.001; // 0.1% por ponto de luck

  const roll = Math.random();
  let cumulative = 0;

  for (const [rarity, rate] of Object.entries(RARITY_DROP_RATES)) {
    cumulative += rate + (rarity === 'mythic' || rarity === 'legendary' ? luckBonus : 0);
    if (roll <= cumulative) {
      // Filtra items dessa raridade
      const availableItems = ITEMS.filter(i => i.rarity === rarity && i.slot !== 'consumable');
      if (availableItems.length > 0) {
        return availableItems[Math.floor(Math.random() * availableItems.length)];
      }
    }
  }

  return null;
}

export default {
  XP_TABLE,
  LEVEL_UP_REWARDS,
  CRM_REWARDS,
  TERRITORIES,
  ITEMS,
  NPCS,
  QUESTS,
  ACHIEVEMENTS,
  GAME_CONSTANTS,
  calculateXPForLevel,
  calculateLevelFromXP,
  getPainReward,
  getRelationshipTier,
  rollItemDrop,
};
