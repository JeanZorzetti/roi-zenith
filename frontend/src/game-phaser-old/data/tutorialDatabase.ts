// ============= TUTORIAL DATABASE =============
// All tutorial sequences and steps for the game

import { TutorialSequence } from '../systems/TutorialSystem';

export const TUTORIAL_SEQUENCES: TutorialSequence[] = [
  // ========== FIRST TIME TUTORIAL ==========
  {
    id: 'first_time',
    name: 'Welcome to Market Research Quest',
    priority: 1,
    steps: [
      {
        id: 'welcome',
        title: 'Bem-vindo ao Market Research Quest!',
        message: 'Você é um pesquisador de mercado em busca de insights valiosos. Explore territórios, entreviste leads e descubra suas dores!',
        icon: '🎮',
        position: 'center',
        canSkip: true
      },
      {
        id: 'world_map_intro',
        title: 'Mapa do Mundo',
        message: 'Este é o Mapa do Mundo. Aqui você pode ver todos os territórios disponíveis. Cada território representa um mercado diferente.',
        icon: '🗺️',
        position: 'center',
        canSkip: true
      },
      {
        id: 'territories',
        title: 'Territórios',
        message: 'Clique em um território para explorá-lo! Comece pelo território de Varejo para suas primeiras entrevistas.',
        icon: '🏢',
        position: 'bottom',
        action: 'navigate',
        actionTarget: 'territory',
        canSkip: true
      },
      {
        id: 'exploration',
        title: 'Ações de Exploração',
        message: 'Use ações como "Cold Outreach" e "Network Event" para descobrir leads. Cada ação custa energia mas pode revelar novos prospects!',
        icon: '🔍',
        position: 'top',
        canSkip: true
      },
      {
        id: 'battles',
        title: 'Entrevistas (Batalhas)',
        message: 'Quando você descobre um lead, pode iniciar uma entrevista! Use suas habilidades para descobrir as dores dele e ganhar recompensas.',
        icon: '⚔️',
        position: 'center',
        canSkip: true
      },
      {
        id: 'rewards',
        title: 'Recompensas',
        message: 'Ao completar entrevistas, você ganha XP, coins, gems e itens! Use coins para comprar equipamentos e melhorar seus stats.',
        icon: '💰',
        position: 'center',
        canSkip: true
      },
      {
        id: 'menu_nav',
        title: 'Menu de Navegação',
        message: 'Use os botões no topo da tela para acessar seu Inventário, Quests, Party e outras funcionalidades.',
        icon: '📋',
        position: 'top',
        canSkip: true
      },
      {
        id: 'ready',
        title: 'Pronto para Começar!',
        message: 'Você está pronto! Explore territórios, complete quests e torne-se o Mestre dos Insights. Boa sorte, pesquisador!',
        icon: '🚀',
        position: 'center',
        canSkip: false
      }
    ]
  },

  // ========== BATTLE TUTORIAL ==========
  {
    id: 'first_battle',
    name: 'Your First Interview',
    priority: 2,
    triggerCondition: 'first_battle_start',
    steps: [
      {
        id: 'battle_intro',
        title: 'Sua Primeira Entrevista!',
        message: 'Bem-vindo à sua primeira entrevista! Aqui você vai descobrir as dores e necessidades do lead.',
        icon: '🎤',
        position: 'center',
        canSkip: true
      },
      {
        id: 'battle_phases',
        title: 'Fases da Entrevista',
        message: 'Entrevistas têm 4 fases: Small Talk, Context Building, Pain Discovery e Solution Ideation. Progrida através delas!',
        icon: '📊',
        position: 'top',
        canSkip: true
      },
      {
        id: 'battle_stats',
        title: 'Barras de Status',
        message: 'Acompanhe o HP do lead, seu progresso de descoberta e o relacionamento. Alta descoberta = vitória!',
        icon: '❤️',
        position: 'top',
        canSkip: true
      },
      {
        id: 'action_cards',
        title: 'Cartas de Ação',
        message: 'Escolha uma carta de ação para usar na entrevista. Cada carta tem diferentes chances de sucesso e efeitos no relacionamento.',
        icon: '🎴',
        position: 'bottom',
        canSkip: true
      },
      {
        id: 'relationship',
        title: 'Relacionamento',
        message: 'Mantenha um bom relacionamento! Se ficar muito negativo, o lead pode encerrar a entrevista.',
        icon: '💖',
        position: 'center',
        canSkip: true
      },
      {
        id: 'battle_ready',
        title: 'Comece a Entrevista!',
        message: 'Agora é com você! Escolha suas ações sabiamente e descubra os insights valiosos.',
        icon: '✨',
        position: 'center',
        canSkip: false
      }
    ]
  },

  // ========== INVENTORY TUTORIAL ==========
  {
    id: 'inventory_intro',
    name: 'Equipment and Inventory',
    priority: 3,
    triggerCondition: 'first_item_obtained',
    steps: [
      {
        id: 'inventory_intro',
        title: 'Inventário',
        message: 'Você obteve seu primeiro item! Abra o Inventário para ver todos os seus itens e equipamentos.',
        icon: '🎒',
        position: 'center',
        canSkip: true
      },
      {
        id: 'equipment_slots',
        title: 'Slots de Equipamento',
        message: 'Você tem 5 slots de equipamento: Weapon, Head, Body e 2 Accessories. Cada item melhora diferentes stats.',
        icon: '⚙️',
        position: 'center',
        canSkip: true
      },
      {
        id: 'item_rarity',
        title: 'Raridade de Itens',
        message: 'Itens vêm em 5 raridades: Common, Uncommon, Rare, Epic e Legendary. Itens mais raros têm stats melhores!',
        icon: '✨',
        position: 'center',
        canSkip: true
      },
      {
        id: 'equip_items',
        title: 'Equipar Itens',
        message: 'Clique em um item e depois em "Equipar" para usá-lo. Seus stats serão aplicados imediatamente!',
        icon: '🛡️',
        position: 'center',
        canSkip: false
      }
    ]
  },

  // ========== QUEST TUTORIAL ==========
  {
    id: 'quest_intro',
    name: 'Quests and Progression',
    priority: 4,
    triggerCondition: 'open_quest_menu',
    steps: [
      {
        id: 'quest_intro',
        title: 'Sistema de Quests',
        message: 'Quests guiam sua jornada! Complete-as para ganhar grandes recompensas e desbloquear novos conteúdos.',
        icon: '📜',
        position: 'center',
        canSkip: true
      },
      {
        id: 'quest_types',
        title: 'Tipos de Quest',
        message: 'Existem 3 tipos: Main Quests (história), Daily Quests (resets diários) e Weekly Challenges (resets semanais).',
        icon: '🎯',
        position: 'center',
        canSkip: true
      },
      {
        id: 'main_quest',
        title: 'Main Quest',
        message: 'A Main Quest tem 5 capítulos que contam a história do jogo. Complete-os para desbloquear novos territórios!',
        icon: '📖',
        position: 'center',
        canSkip: true
      },
      {
        id: 'daily_weekly',
        title: 'Daily & Weekly',
        message: 'Complete Daily Quests todos os dias e Weekly Challenges toda semana para maximizar suas recompensas!',
        icon: '📅',
        position: 'center',
        canSkip: false
      }
    ]
  },

  // ========== PARTY TUTORIAL ==========
  {
    id: 'party_intro',
    name: 'Recruiting NPCs',
    priority: 5,
    triggerCondition: 'first_recruit',
    steps: [
      {
        id: 'party_intro',
        title: 'Sistema de Party',
        message: 'Você pode recrutar NPCs para se juntarem ao seu time! Cada NPC oferece bônus únicos.',
        icon: '👥',
        position: 'center',
        canSkip: true
      },
      {
        id: 'npc_bonuses',
        title: 'Bônus de NPCs',
        message: 'NPCs dão bônus passivos como +XP, +Coins, +Luck ou redução de custos. Escolha sabiamente!',
        icon: '⭐',
        position: 'center',
        canSkip: true
      },
      {
        id: 'recruit_cost',
        title: 'Custo de Recrutamento',
        message: 'Recrutar NPCs custa coins. NPCs mais raros e poderosos custam mais, mas valem o investimento!',
        icon: '💰',
        position: 'center',
        canSkip: false
      }
    ]
  },

  // ========== ADVANCED TIPS ==========
  {
    id: 'advanced_tips',
    name: 'Advanced Tips',
    priority: 10,
    triggerCondition: 'level_5',
    steps: [
      {
        id: 'stats_guide',
        title: 'Guia de Stats',
        message: 'Intelligence aumenta descoberta, Charisma melhora relacionamento, Perception aumenta drops, Luck aumenta raridade!',
        icon: '📊',
        position: 'center',
        canSkip: true
      },
      {
        id: 'boss_battles',
        title: 'Boss Battles',
        message: 'Cada território tem um Lead Boss! Eles são mais difíceis mas dropam itens Epic e Legendary garantidos.',
        icon: '👑',
        position: 'center',
        canSkip: true
      },
      {
        id: 'achievements',
        title: 'Conquistas',
        message: 'Complete achievements para ganhar recompensas extras! Algumas são secretas - descubra-as explorando.',
        icon: '🏆',
        position: 'center',
        canSkip: true
      },
      {
        id: 'good_luck',
        title: 'Continue Explorando!',
        message: 'Você dominou o básico! Continue explorando, completando quests e se tornando o Mestre dos Insights!',
        icon: '🌟',
        position: 'center',
        canSkip: false
      }
    ]
  }
];

// Helper functions
export function getTutorialSequence(id: string): TutorialSequence | undefined {
  return TUTORIAL_SEQUENCES.find(seq => seq.id === id);
}

export function getTutorialsByPriority(): TutorialSequence[] {
  return [...TUTORIAL_SEQUENCES].sort((a, b) => (a.priority || 0) - (b.priority || 0));
}

console.log(`📚 Tutorial Database loaded: ${TUTORIAL_SEQUENCES.length} sequences`);
