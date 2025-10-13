// ============= NPC DATABASE =============
// NPCs for party recruitment with unique passives and skills

import { NPC } from '../systems/PartySystem';

export const NPC_DATABASE: NPC[] = [
  // 1. RESEARCHER - Early game XP booster
  {
    id: 'npc_researcher_ana',
    name: 'Ana Silva',
    role: 'Researcher',
    description: 'Pesquisadora experiente com 10 anos no mercado B2B. Especializada em identificar padrões de comportamento de leads.',
    cost: 100,
    unlockLevel: 1,
    passive: {
      name: 'Análise Rápida',
      description: 'Aumenta XP ganho em entrevistas',
      effect: {
        xpBonus: 15 // +15% XP
      }
    },
    skill: {
      name: 'Deep Dive',
      description: 'Revela 3 dores ocultas de um lead instantaneamente',
      cooldown: 300 // 5 minutos
    },
    avatar: '👩‍🔬'
  },

  // 2. ANALYST - Mid game coin booster
  {
    id: 'npc_analyst_carlos',
    name: 'Carlos Mendes',
    role: 'Analyst',
    description: 'Analista de dados com foco em ROI. Ex-consultor da McKinsey, especializado em traduzir dores em oportunidades.',
    cost: 250,
    unlockLevel: 5,
    passive: {
      name: 'Visão de Mercado',
      description: 'Aumenta coins ganhos em descoberta de dores',
      effect: {
        coinBonus: 20 // +20% coins
      }
    },
    skill: {
      name: 'Market Insights',
      description: 'Analisa território e revela leads de alta qualidade (Hot Leads)',
      cooldown: 600 // 10 minutos
    },
    avatar: '👨‍💼'
  },

  // 3. NEGOTIATOR - Relationship booster
  {
    id: 'npc_negotiator_beatriz',
    name: 'Beatriz Costa',
    role: 'Negotiator',
    description: 'Negociadora carismática que transforma conversas em relacionamentos duradouros. Especialista em networking.',
    cost: 400,
    unlockLevel: 8,
    passive: {
      name: 'Carisma Natural',
      description: 'Acelera ganho de relacionamento com leads',
      effect: {
        relationshipGain: 25 // +25% relationship gain
      }
    },
    skill: {
      name: 'Charm Offensive',
      description: 'Promove instantaneamente um lead de Cold → Warm → Hot',
      cooldown: 900 // 15 minutos
    },
    avatar: '👩‍💻'
  },

  // 4. STRATEGIST - Energy & efficiency booster
  {
    id: 'npc_strategist_rafael',
    name: 'Rafael Oliveira',
    role: 'Strategist',
    description: 'Estrategista que otimiza processos de pesquisa. Ex-Head de Growth de startup unicórnio.',
    cost: 600,
    unlockLevel: 12,
    passive: {
      name: 'Eficiência Máxima',
      description: 'Reduz custo de energia de ações de exploração',
      effect: {
        energyRegen: 30 // +30% energy regeneration
      }
    },
    skill: {
      name: 'Sprint Mode',
      description: 'Reduz energia de todas ações para 0 por 5 minutos',
      cooldown: 1200 // 20 minutos
    },
    avatar: '👨‍🚀'
  },

  // 5. SCOUT - Discovery & exploration booster
  {
    id: 'npc_scout_mariana',
    name: 'Mariana Santos',
    role: 'Scout',
    description: 'Desbravadora de novos mercados. Especializada em cold outreach e descoberta de nichos inexplorados.',
    cost: 800,
    unlockLevel: 15,
    passive: {
      name: 'Radar de Oportunidades',
      description: 'Aumenta chance de descobrir dores críticas',
      effect: {
        discoveryChance: 35 // +35% discovery chance for critical pains
      }
    },
    skill: {
      name: 'Territory Sweep',
      description: 'Explora 10 vezes um território instantaneamente (sem custo de energia)',
      cooldown: 1800 // 30 minutos
    },
    avatar: '👩‍🎤'
  }
];

// Helper functions
export function getNPCById(npcId: string): NPC | undefined {
  return NPC_DATABASE.find(npc => npc.id === npcId);
}

export function getNPCsByRole(role: string): NPC[] {
  return NPC_DATABASE.filter(npc => npc.role === role);
}

export function getNPCsByMinLevel(minLevel: number): NPC[] {
  return NPC_DATABASE.filter(npc => npc.unlockLevel <= minLevel);
}

export function getNPCsInCostRange(minCost: number, maxCost: number): NPC[] {
  return NPC_DATABASE.filter(npc => npc.cost >= minCost && npc.cost <= maxCost);
}

export default NPC_DATABASE;
