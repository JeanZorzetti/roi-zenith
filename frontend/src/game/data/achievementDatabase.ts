// ============= ACHIEVEMENT DATABASE =============
// All achievements available in the game (30-40 achievements)

import { Achievement, AchievementCategory } from '../systems/AchievementSystem';

export const ACHIEVEMENT_DATABASE: Achievement[] = [
  // ========== COMBAT ACHIEVEMENTS ==========
  {
    id: 'ach_first_interview',
    name: 'Primeira Entrevista',
    description: 'Complete sua primeira entrevista de pesquisa',
    icon: '🎤',
    category: 'combat',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 50, coins: 25 }
  },
  {
    id: 'ach_interview_10',
    name: 'Pesquisador Iniciante',
    description: 'Complete 10 entrevistas',
    icon: '📋',
    category: 'combat',
    requirement: 10,
    current: 0,
    unlocked: false,
    reward: { xp: 200, coins: 100 }
  },
  {
    id: 'ach_interview_50',
    name: 'Pesquisador Experiente',
    description: 'Complete 50 entrevistas',
    icon: '🎯',
    category: 'combat',
    requirement: 50,
    current: 0,
    unlocked: false,
    reward: { xp: 500, coins: 300, gems: 3 }
  },
  {
    id: 'ach_interview_100',
    name: 'Mestre das Entrevistas',
    description: 'Complete 100 entrevistas',
    icon: '👑',
    category: 'combat',
    requirement: 100,
    current: 0,
    unlocked: false,
    reward: { xp: 1000, coins: 500, gems: 10, title: 'Mestre Entrevistador' }
  },
  {
    id: 'ach_first_boss',
    name: 'Derrubador de Gigantes',
    description: 'Derrote seu primeiro Lead Boss',
    icon: '⚔️',
    category: 'combat',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 300, coins: 200, gems: 2 }
  },
  {
    id: 'ach_all_bosses',
    name: 'Conquistador de Territórios',
    description: 'Derrote todos os 6 Lead Bosses',
    icon: '🏆',
    category: 'combat',
    requirement: 6,
    current: 0,
    unlocked: false,
    reward: { xp: 2000, coins: 1000, gems: 20, title: 'Conquistador' }
  },
  {
    id: 'ach_perfect_discovery',
    name: 'Descoberta Perfeita',
    description: 'Alcance 100% de descoberta em uma entrevista',
    icon: '💡',
    category: 'combat',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 150, coins: 75 }
  },
  {
    id: 'ach_no_damage',
    name: 'Foco Inabalável',
    description: 'Vença uma entrevista sem perder foco',
    icon: '🛡️',
    category: 'combat',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 250, coins: 150, gems: 1 }
  },

  // ========== EXPLORATION ACHIEVEMENTS ==========
  {
    id: 'ach_discover_territory',
    name: 'Explorador Nato',
    description: 'Desbloqueie um novo território',
    icon: '🗺️',
    category: 'exploration',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 100, coins: 50 }
  },
  {
    id: 'ach_unlock_all_territories',
    name: 'Mapeador de Mercados',
    description: 'Desbloqueie todos os 6 territórios',
    icon: '🌍',
    category: 'exploration',
    requirement: 6,
    current: 0,
    unlocked: false,
    reward: { xp: 1000, coins: 500, gems: 15, title: 'Explorador Mestre' }
  },
  {
    id: 'ach_cold_outreach_10',
    name: 'Prospector Ativo',
    description: 'Realize 10 Cold Outreaches',
    icon: '📧',
    category: 'exploration',
    requirement: 10,
    current: 0,
    unlocked: false,
    reward: { xp: 200, coins: 100 }
  },
  {
    id: 'ach_network_event_10',
    name: 'Networking Pro',
    description: 'Participe de 10 Network Events',
    icon: '🤝',
    category: 'exploration',
    requirement: 10,
    current: 0,
    unlocked: false,
    reward: { xp: 200, coins: 100 }
  },
  {
    id: 'ach_discover_all_leads',
    name: 'Caçador de Leads',
    description: 'Descubra todos os leads em um território',
    icon: '🔍',
    category: 'exploration',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 300, coins: 200, gems: 2 }
  },

  // ========== COLLECTION ACHIEVEMENTS ==========
  {
    id: 'ach_first_item',
    name: 'Colecionador Iniciante',
    description: 'Obtenha seu primeiro item',
    icon: '📦',
    category: 'collection',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 50, coins: 25 }
  },
  {
    id: 'ach_item_10',
    name: 'Colecionador Dedicado',
    description: 'Colete 10 itens diferentes',
    icon: '🎒',
    category: 'collection',
    requirement: 10,
    current: 0,
    unlocked: false,
    reward: { xp: 300, coins: 150, gems: 2 }
  },
  {
    id: 'ach_item_all',
    name: 'Colecionador Completo',
    description: 'Colete todos os 30 itens do jogo',
    icon: '💎',
    category: 'collection',
    requirement: 30,
    current: 0,
    unlocked: false,
    reward: { xp: 2000, coins: 1000, gems: 25, title: 'Colecionador Mestre' }
  },
  {
    id: 'ach_rare_item',
    name: 'Sortudo',
    description: 'Obtenha um item Rare ou superior',
    icon: '✨',
    category: 'collection',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 200, coins: 100, gems: 1 }
  },
  {
    id: 'ach_legendary_item',
    name: 'Lendário',
    description: 'Obtenha um item Legendary',
    icon: '🌟',
    category: 'collection',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 500, coins: 300, gems: 5 }
  },
  {
    id: 'ach_full_equipment',
    name: 'Totalmente Equipado',
    description: 'Equipe itens em todos os 5 slots',
    icon: '⚙️',
    category: 'collection',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 250, coins: 150, gems: 2 }
  },

  // ========== PROGRESSION ACHIEVEMENTS ==========
  {
    id: 'ach_level_5',
    name: 'Pesquisador Júnior',
    description: 'Alcance o nível 5',
    icon: '⭐',
    category: 'progression',
    requirement: 5,
    current: 0,
    unlocked: false,
    reward: { xp: 100, coins: 50 }
  },
  {
    id: 'ach_level_10',
    name: 'Pesquisador Pleno',
    description: 'Alcance o nível 10',
    icon: '⭐⭐',
    category: 'progression',
    requirement: 10,
    current: 0,
    unlocked: false,
    reward: { xp: 300, coins: 150, gems: 3 }
  },
  {
    id: 'ach_level_20',
    name: 'Pesquisador Sênior',
    description: 'Alcance o nível 20',
    icon: '⭐⭐⭐',
    category: 'progression',
    requirement: 20,
    current: 0,
    unlocked: false,
    reward: { xp: 1000, coins: 500, gems: 10, title: 'Pesquisador Sênior' }
  },
  {
    id: 'ach_coins_1000',
    name: 'Empreendedor',
    description: 'Acumule 1000 coins',
    icon: '💰',
    category: 'progression',
    requirement: 1000,
    current: 0,
    unlocked: false,
    reward: { xp: 200, gems: 2 }
  },
  {
    id: 'ach_gems_50',
    name: 'Coletor de Gemas',
    description: 'Acumule 50 gems',
    icon: '💎',
    category: 'progression',
    requirement: 50,
    current: 0,
    unlocked: false,
    reward: { xp: 500, coins: 250 }
  },
  {
    id: 'ach_chapter_1',
    name: 'O Despertar',
    description: 'Complete o Capítulo 1 da main quest',
    icon: '📖',
    category: 'progression',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 300, coins: 200, gems: 3 }
  },
  {
    id: 'ach_chapter_5',
    name: 'O Mestre dos Insights',
    description: 'Complete o Capítulo 5 da main quest',
    icon: '📕',
    category: 'progression',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 2000, coins: 1000, gems: 20, title: 'Mestre dos Insights' }
  },

  // ========== SOCIAL ACHIEVEMENTS ==========
  {
    id: 'ach_recruit_first',
    name: 'Líder de Equipe',
    description: 'Recrute seu primeiro NPC',
    icon: '👥',
    category: 'social',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 150, coins: 75 }
  },
  {
    id: 'ach_recruit_all',
    name: 'Dream Team',
    description: 'Recrute todos os 5 NPCs',
    icon: '🌟',
    category: 'social',
    requirement: 5,
    current: 0,
    unlocked: false,
    reward: { xp: 1000, coins: 500, gems: 15, title: 'Líder Inspirador' }
  },
  {
    id: 'ach_relationship_100',
    name: 'Carismático',
    description: 'Alcance 100% de relacionamento em uma entrevista',
    icon: '💖',
    category: 'social',
    requirement: 1,
    current: 0,
    unlocked: false,
    reward: { xp: 200, coins: 100, gems: 1 }
  },
  {
    id: 'ach_empathy_master',
    name: 'Mestre da Empatia',
    description: 'Use a ação "Empatia" 50 vezes',
    icon: '🤝',
    category: 'social',
    requirement: 50,
    current: 0,
    unlocked: false,
    reward: { xp: 400, coins: 200, gems: 3 }
  },

  // ========== MASTERY ACHIEVEMENTS ==========
  {
    id: 'ach_daily_quest_10',
    name: 'Diligente',
    description: 'Complete 10 daily quests',
    icon: '📅',
    category: 'mastery',
    requirement: 10,
    current: 0,
    unlocked: false,
    reward: { xp: 500, coins: 250, gems: 5 }
  },
  {
    id: 'ach_weekly_quest_5',
    name: 'Comprometido',
    description: 'Complete 5 weekly challenges',
    icon: '📊',
    category: 'mastery',
    requirement: 5,
    current: 0,
    unlocked: false,
    reward: { xp: 800, coins: 400, gems: 8 }
  },
  {
    id: 'ach_speedrun',
    name: 'Speed Researcher',
    description: 'Complete uma entrevista em menos de 2 minutos',
    icon: '⚡',
    category: 'mastery',
    requirement: 1,
    current: 0,
    unlocked: false,
    hidden: true,
    reward: { xp: 300, coins: 200, gems: 3 }
  },
  {
    id: 'ach_no_flee',
    name: 'Persistente',
    description: 'Complete 20 entrevistas sem desistir',
    icon: '🔥',
    category: 'mastery',
    requirement: 20,
    current: 0,
    unlocked: false,
    reward: { xp: 600, coins: 300, gems: 6 }
  },
  {
    id: 'ach_intelligence_50',
    name: 'Gênio Analítico',
    description: 'Alcance 50 pontos de Intelligence',
    icon: '🧠',
    category: 'mastery',
    requirement: 50,
    current: 0,
    unlocked: false,
    reward: { xp: 500, coins: 250, gems: 5 }
  },
  {
    id: 'ach_charisma_50',
    name: 'Influenciador Natural',
    description: 'Alcance 50 pontos de Charisma',
    icon: '💬',
    category: 'mastery',
    requirement: 50,
    current: 0,
    unlocked: false,
    reward: { xp: 500, coins: 250, gems: 5 }
  },
  {
    id: 'ach_luck_master',
    name: 'Sortudo da Sorte',
    description: 'Alcance 30 pontos de Luck',
    icon: '🍀',
    category: 'mastery',
    requirement: 30,
    current: 0,
    unlocked: false,
    hidden: true,
    reward: { xp: 777, coins: 777, gems: 7, title: 'Lucky Seven' }
  }
];

// Helper functions
export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENT_DATABASE.find(ach => ach.id === id);
}

export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return ACHIEVEMENT_DATABASE.filter(ach => ach.category === category);
}

export function getTotalAchievements(): number {
  return ACHIEVEMENT_DATABASE.length;
}

console.log(`🏆 Achievement Database loaded: ${ACHIEVEMENT_DATABASE.length} achievements`);
