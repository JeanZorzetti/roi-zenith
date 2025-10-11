// ============= GAME SERVICE =============
// Lógica de negócio do jogo Market Research Quest

import { PrismaClient } from '@prisma/client';
import {
  XP_TABLE,
  LEVEL_UP_REWARDS,
  CRM_REWARDS,
  TERRITORIES,
  ITEMS,
  NPCS,
  QUESTS,
  ACHIEVEMENTS,
  GAME_CONSTANTS,
  GameReward,
  Achievement,
  calculateXPForLevel,
  calculateLevelFromXP,
  getPainReward,
  getRelationshipTier,
  rollItemDrop,
} from '../config/gameConfig';

const prisma = new PrismaClient();

// ============= TYPES =============

interface GameStateResponse {
  id: string;
  userId: string;
  resources: {
    coins: number;
    gems: number;
    energy: number;
    maxEnergy: number;
    reputation: number;
  };
  progression: {
    level: number;
    experience: number;
    experienceToNextLevel: number;
    progressPercent: number;
  };
  stats: {
    intelligence: number;
    charisma: number;
    perception: number;
    knowledge: number;
    luck: number;
    skillPoints: number;
  };
  unlocks: {
    territories: string[];
    partySlots: number;
  };
  lastEnergyRegen: Date;
}

interface BattleResult {
  victory: boolean;
  painDiscovered?: {
    text: string;
    intensity: number;
    category: string;
  };
  rewards: GameReward;
  itemsDropped?: string[];
  relationshipChange: number;
  experienceGained: number;
  leveledUp: boolean;
  newLevel?: number;
}

// ============= GAME STATE =============

export class GameService {
  /**
   * Inicializa o jogo para um novo usuário
   */
  async initializeGame(userId: string): Promise<GameStateResponse> {
    // Verifica se já existe
    const existing = await prisma.gameState.findUnique({
      where: { userId },
    });

    if (existing) {
      return this.getGameState(userId);
    }

    // Cria novo state
    const gameState = await prisma.gameState.create({
      data: {
        userId,
        ...GAME_CONSTANTS.STARTING_STATS,
        unlockedTerritories: ['varejo'], // Começa com Varejo desbloqueado
      },
    });

    // Dá items iniciais
    await this.giveItem(userId, 'google_forms', 1, true, 'primary_tool');
    await this.giveItem(userId, 'excel', 1, true, 'secondary_tool');
    await this.giveItem(userId, 'notebook', 1, true, 'knowledge_base');
    await this.giveItem(userId, 'basic_phone', 1, true, 'communication');
    await this.giveItem(userId, 'business_card', 1, true, 'professional');

    // Ativa quest inicial
    await this.startQuest(userId, 'chapter_1');

    // Ativa daily quests
    for (const quest of QUESTS.filter(q => q.type === 'daily')) {
      await this.startQuest(userId, quest.id);
    }

    return this.formatGameState(gameState);
  }

  /**
   * Retorna o estado atual do jogo
   */
  async getGameState(userId: string): Promise<GameStateResponse> {
    let gameState = await prisma.gameState.findUnique({
      where: { userId },
    });

    if (!gameState) {
      return await this.initializeGame(userId);
    }

    // Regenera energy se necessário
    gameState = await this.regenerateEnergy(userId);

    return this.formatGameState(gameState);
  }

  private formatGameState(gameState: any): GameStateResponse {
    const xpToNext = calculateXPForLevel(gameState.level + 1);
    const currentLevelXP = calculateXPForLevel(gameState.level);
    const xpInCurrentLevel = gameState.experience - currentLevelXP;
    const xpNeededForLevel = xpToNext - currentLevelXP;
    const progressPercent = (xpInCurrentLevel / xpNeededForLevel) * 100;

    return {
      id: gameState.id,
      userId: gameState.userId,
      resources: {
        coins: gameState.coins,
        gems: gameState.gems,
        energy: gameState.energy,
        maxEnergy: gameState.maxEnergy,
        reputation: gameState.reputation,
      },
      progression: {
        level: gameState.level,
        experience: gameState.experience,
        experienceToNextLevel: xpToNext,
        progressPercent: Math.floor(progressPercent),
      },
      stats: {
        intelligence: gameState.intelligence,
        charisma: gameState.charisma,
        perception: gameState.perception,
        knowledge: gameState.knowledge,
        luck: gameState.luck,
        skillPoints: gameState.skillPoints,
      },
      unlocks: {
        territories: gameState.unlockedTerritories as string[],
        partySlots: gameState.unlockedPartySlots,
      },
      lastEnergyRegen: gameState.lastEnergyRegen,
    };
  }

  /**
   * Regenera energy baseado no tempo passado
   */
  private async regenerateEnergy(userId: string): Promise<any> {
    const gameState = await prisma.gameState.findUnique({
      where: { userId },
    });

    if (!gameState) return null;

    const now = new Date();
    const lastRegen = new Date(gameState.lastEnergyRegen);
    const hoursPassed = Math.floor((now.getTime() - lastRegen.getTime()) / GAME_CONSTANTS.ENERGY_REGEN_INTERVAL);

    if (hoursPassed > 0 && gameState.energy < gameState.maxEnergy) {
      const energyToAdd = Math.min(
        hoursPassed * GAME_CONSTANTS.ENERGY_REGEN_RATE,
        gameState.maxEnergy - gameState.energy
      );

      const updated = await prisma.gameState.update({
        where: { userId },
        data: {
          energy: Math.min(gameState.energy + energyToAdd, gameState.maxEnergy),
          lastEnergyRegen: now,
        },
      });

      return updated;
    }

    return gameState;
  }

  // ============= RESOURCES =============

  /**
   * Adiciona recursos ao jogador
   */
  async addResources(
    userId: string,
    rewards: GameReward,
    crmAction?: string,
    crmReferenceId?: string
  ): Promise<{ leveledUp: boolean; newLevel?: number }> {
    const gameState = await prisma.gameState.findUnique({
      where: { userId },
    });

    if (!gameState) {
      throw new Error('Game state not found');
    }

    const newCoins = gameState.coins + (rewards.coins || 0);
    const newGems = gameState.gems + (rewards.gems || 0);
    const newEnergy = Math.min(gameState.energy + (rewards.energy || 0), gameState.maxEnergy);
    const newReputation = gameState.reputation + (rewards.reputation || 0);
    const newExperience = gameState.experience + (rewards.experience || 0);

    // Check level up
    const oldLevel = gameState.level;
    const newLevel = calculateLevelFromXP(newExperience);
    const leveledUp = newLevel > oldLevel;

    const updates: any = {
      coins: newCoins,
      gems: newGems,
      energy: newEnergy,
      reputation: newReputation,
      experience: newExperience,
    };

    if (leveledUp) {
      updates.level = newLevel;
      updates.skillPoints = gameState.skillPoints + (LEVEL_UP_REWARDS.skillPoints * (newLevel - oldLevel));
      updates.maxEnergy = gameState.maxEnergy + (LEVEL_UP_REWARDS.maxEnergyBonus * (newLevel - oldLevel));
    }

    await prisma.gameState.update({
      where: { userId },
      data: updates,
    });

    // Log transaction
    await prisma.gameTransaction.create({
      data: {
        userId,
        crmAction,
        crmReferenceId,
        coinsEarned: rewards.coins || 0,
        gemsEarned: rewards.gems || 0,
        energyEarned: rewards.energy || 0,
        experienceEarned: rewards.experience || 0,
        reputationEarned: rewards.reputation || 0,
      },
    });

    return { leveledUp, newLevel: leveledUp ? newLevel : undefined };
  }

  /**
   * Gasta recursos
   */
  async spendResources(
    userId: string,
    coins: number = 0,
    gems: number = 0,
    energy: number = 0
  ): Promise<boolean> {
    const gameState = await prisma.gameState.findUnique({
      where: { userId },
    });

    if (!gameState) return false;

    // Verifica se tem recursos suficientes
    if (
      gameState.coins < coins ||
      gameState.gems < gems ||
      gameState.energy < energy
    ) {
      return false;
    }

    await prisma.gameState.update({
      where: { userId },
      data: {
        coins: gameState.coins - coins,
        gems: gameState.gems - gems,
        energy: gameState.energy - energy,
      },
    });

    return true;
  }

  // ============= CRM INTEGRATION =============

  /**
   * Processa eventos do CRM e recompensa o jogador
   */
  async processCRMEvent(
    userId: string,
    eventType: keyof typeof CRM_REWARDS,
    referenceId?: string,
    metadata?: any
  ): Promise<{ rewards: GameReward; leveledUp: boolean; newLevel?: number }> {
    const rewards = CRM_REWARDS[eventType];

    if (!rewards) {
      throw new Error(`Unknown CRM event type: ${eventType}`);
    }

    const result = await this.addResources(userId, rewards, eventType, referenceId);

    // Update quest progress
    await this.updateQuestProgress(userId, eventType, metadata);

    // Check achievements
    await this.checkAchievements(userId, eventType, metadata);

    return {
      rewards,
      ...result,
    };
  }

  /**
   * Processa descoberta de dor
   */
  async processPainDiscovery(
    userId: string,
    dealId: string,
    painText: string,
    painIntensity: number,
    painCategory: string,
    orionSolution?: string
  ): Promise<{ rewards: GameReward; item?: string; leveledUp: boolean }> {
    // Calcula rewards baseado na intensidade
    const rewards = getPainReward(painIntensity);

    // Adiciona recursos
    const levelResult = await this.addResources(userId, rewards, 'PAIN_DISCOVERED', dealId);

    // Item drop chance (maior para dores de alta intensidade)
    let droppedItem: string | undefined;
    if (painIntensity >= 7) {
      const gameState = await prisma.gameState.findUnique({ where: { userId } });
      const item = rollItemDrop(gameState?.luck || 0);
      if (item) {
        await this.giveItem(userId, item.id);
        droppedItem = item.id;
      }
    }

    // Salva no insight codex
    await prisma.gameInsight.create({
      data: {
        userId,
        painText,
        painIntensity,
        painCategory,
        orionSolution,
        dealIds: [dealId],
      },
    });

    // Update quests
    await this.updateQuestProgress(userId, 'PAIN_DISCOVERED', {
      intensity: painIntensity,
      category: painCategory,
    });

    // Check achievements
    await this.checkAchievements(userId, 'PAIN_DISCOVERED', { intensity: painIntensity });

    return {
      rewards,
      item: droppedItem,
      leveledUp: levelResult.leveledUp,
    };
  }

  // ============= INVENTORY =============

  /**
   * Dá um item ao jogador
   */
  async giveItem(
    userId: string,
    itemId: string,
    quantity: number = 1,
    autoEquip: boolean = false,
    slot?: string
  ): Promise<void> {
    const existing = await prisma.gameInventory.findFirst({
      where: { userId, itemId },
    });

    if (existing) {
      await prisma.gameInventory.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await prisma.gameInventory.create({
        data: {
          userId,
          itemId,
          quantity,
          isEquipped: autoEquip,
          slot: autoEquip ? slot : null,
        },
      });
    }
  }

  /**
   * Equipa um item
   */
  async equipItem(userId: string, itemId: string): Promise<boolean> {
    const item = ITEMS.find(i => i.id === itemId);
    if (!item || item.slot === 'consumable') return false;

    // Desequipa outros items do mesmo slot
    await prisma.gameInventory.updateMany({
      where: {
        userId,
        slot: item.slot,
        isEquipped: true,
      },
      data: {
        isEquipped: false,
        slot: null,
      },
    });

    // Equipa o novo
    await prisma.gameInventory.updateMany({
      where: { userId, itemId },
      data: {
        isEquipped: true,
        slot: item.slot,
      },
    });

    return true;
  }

  /**
   * Retorna inventário do jogador
   */
  async getInventory(userId: string) {
    return await prisma.gameInventory.findMany({
      where: { userId },
      orderBy: { acquiredAt: 'desc' },
    });
  }

  /**
   * Retorna equipamentos equipados
   */
  async getEquippedItems(userId: string) {
    return await prisma.gameInventory.findMany({
      where: { userId, isEquipped: true },
    });
  }

  // ============= PARTY =============

  /**
   * Recruta um NPC
   */
  async recruitNPC(userId: string, npcId: string): Promise<boolean> {
    const npc = NPCS.find(n => n.id === npcId);
    if (!npc) return false;

    // Verifica level requirement
    const gameState = await prisma.gameState.findUnique({ where: { userId } });
    if (!gameState || gameState.level < npc.unlockLevel) return false;

    // Verifica se já tem
    const existing = await prisma.gameParty.findFirst({
      where: { userId, npcId },
    });
    if (existing) return false;

    // Gasta recursos
    const hasResources = await this.spendResources(
      userId,
      npc.cost.coins || 0,
      npc.cost.gems || 0
    );
    if (!hasResources) return false;

    // Recruta
    await prisma.gameParty.create({
      data: { userId, npcId },
    });

    return true;
  }

  /**
   * Retorna party do jogador
   */
  async getParty(userId: string) {
    return await prisma.gameParty.findMany({
      where: { userId },
      orderBy: { recruitedAt: 'desc' },
    });
  }

  // ============= QUESTS =============

  /**
   * Inicia uma quest
   */
  async startQuest(userId: string, questId: string): Promise<void> {
    const quest = QUESTS.find(q => q.id === questId);
    if (!quest) return;

    const existing = await prisma.gameQuest.findFirst({
      where: { userId, questId },
    });

    if (!existing) {
      await prisma.gameQuest.create({
        data: {
          userId,
          questId,
          status: 'active',
          progress: {},
        },
      });
    }
  }

  /**
   * Atualiza progresso de quests
   */
  async updateQuestProgress(userId: string, eventType: string, metadata?: any): Promise<void> {
    const activeQuests = await prisma.gameQuest.findMany({
      where: { userId, status: 'active' },
    });

    for (const questRecord of activeQuests) {
      const quest = QUESTS.find(q => q.id === questRecord.questId);
      if (!quest) continue;

      let progressUpdated = false;
      const progress = questRecord.progress as any || {};

      for (const objective of quest.objectives) {
        // Mapeia event types para tracking keys
        const eventToKey: Record<string, string> = {
          CONTACT_CREATED: 'contacts_added',
          ACTIVITY_COMPLETED: 'interviews_completed',
          PAIN_DISCOVERED: 'pains_discovered',
          SOLUTION_MAPPED: 'solutions_mapped',
          REFERRAL_RECEIVED: 'referrals_received',
        };

        const trackingKey = eventToKey[eventType];
        if (trackingKey && objective.trackingKey.includes(trackingKey)) {
          progress[objective.id] = (progress[objective.id] || 0) + 1;
          progressUpdated = true;
        }
      }

      if (progressUpdated) {
        // Check se completou
        const allCompleted = quest.objectives.every(
          obj => (progress[obj.id] || 0) >= obj.target
        );

        if (allCompleted && questRecord.status === 'active') {
          // Completa quest
          await prisma.gameQuest.update({
            where: { id: questRecord.id },
            data: {
              status: 'completed',
              completedAt: new Date(),
              progress,
            },
          });

          // Dá rewards
          await this.addResources(userId, quest.rewards, `QUEST_${quest.id}_COMPLETED`);

          // Dá items se tiver
          if (quest.rewards.items) {
            for (const itemId of quest.rewards.items) {
              await this.giveItem(userId, itemId);
            }
          }
        } else {
          // Só atualiza progresso
          await prisma.gameQuest.update({
            where: { id: questRecord.id },
            data: { progress },
          });
        }
      }
    }
  }

  /**
   * Retorna quests ativas
   */
  async getActiveQuests(userId: string) {
    return await prisma.gameQuest.findMany({
      where: { userId, status: 'active' },
    });
  }

  // ============= ACHIEVEMENTS =============

  /**
   * Verifica e desbloqueia achievements
   */
  async checkAchievements(userId: string, eventType: string, metadata?: any): Promise<string[]> {
    const unlockedIds: string[] = [];

    for (const achievement of ACHIEVEMENTS) {
      // Verifica se já tem
      const existing = await prisma.gameAchievement.findUnique({
        where: {
          userId_achievementId: { userId, achievementId: achievement.id },
        },
      });

      if (existing) continue;

      // Verifica se desbloqueou
      const unlocked = await this.checkAchievementCondition(userId, achievement, metadata);

      if (unlocked) {
        await prisma.gameAchievement.create({
          data: { userId, achievementId: achievement.id },
        });

        // Dá rewards
        await this.addResources(userId, achievement.rewards, `ACHIEVEMENT_${achievement.id}`);

        // Dá items se tiver
        if (achievement.rewards.items) {
          for (const itemId of achievement.rewards.items) {
            await this.giveItem(userId, itemId);
          }
        }

        unlockedIds.push(achievement.id);
      }
    }

    return unlockedIds;
  }

  private async checkAchievementCondition(
    userId: string,
    achievement: Achievement,
    metadata?: any
  ): Promise<boolean> {
    const { key, value } = achievement.requirement;

    // Mapeamento de keys para contadores
    switch (key) {
      case 'pains_discovered':
        const painCount = await prisma.gameInsight.count({ where: { userId } });
        return painCount >= value;

      case 'contacts_added':
        const contactCount = await prisma.$queryRaw`
          SELECT COUNT(*) as count FROM contacts WHERE created_at >
          (SELECT created_at FROM game_states WHERE user_id = ${userId})
        `;
        return (contactCount as any)[0]?.count >= value;

      case 'bosses_defeated':
        const territoryProgress = await prisma.gameTerritoryProgress.count({
          where: { userId, bossDefeated: true },
        });
        return territoryProgress >= value;

      case 'solutions_mapped':
        const solutionCount = await prisma.gameInsight.count({
          where: { userId, orionSolution: { not: null } },
        });
        return solutionCount >= value;

      default:
        return false;
    }
  }

  /**
   * Retorna achievements do jogador
   */
  async getAchievements(userId: string) {
    return await prisma.gameAchievement.findMany({
      where: { userId },
      orderBy: { unlockedAt: 'desc' },
    });
  }

  // ============= TERRITORIES =============

  /**
   * Retorna progresso de territórios
   */
  async getTerritoryProgress(userId: string, territoryId: string) {
    return await prisma.gameTerritoryProgress.findUnique({
      where: {
        userId_territoryId: { userId, territoryId },
      },
    });
  }

  /**
   * Atualiza progresso de território
   */
  async updateTerritoryProgress(
    userId: string,
    territoryId: string,
    updates: Partial<{
      explorationPercent: number;
      leadsFound: number;
      leadsInterviewed: number;
      painsDiscovered: number;
      bossDefeated: boolean;
    }>
  ): Promise<void> {
    await prisma.gameTerritoryProgress.upsert({
      where: {
        userId_territoryId: { userId, territoryId },
      },
      update: updates,
      create: {
        userId,
        territoryId,
        ...updates,
      },
    });
  }

  // ============= RELATIONSHIPS =============

  /**
   * Atualiza relacionamento com lead
   */
  async updateRelationship(
    userId: string,
    contactId: string,
    change: number
  ): Promise<void> {
    const existing = await prisma.gameLeadRelationship.findUnique({
      where: {
        userId_contactId: { userId, contactId },
      },
    });

    if (existing) {
      const newLevel = Math.max(0, Math.min(100, existing.relationshipLevel + change));
      await prisma.gameLeadRelationship.update({
        where: { id: existing.id },
        data: {
          relationshipLevel: newLevel,
          lastInteraction: new Date(),
        },
      });
    } else {
      await prisma.gameLeadRelationship.create({
        data: {
          userId,
          contactId,
          relationshipLevel: Math.max(0, Math.min(100, change)),
        },
      });
    }
  }

  /**
   * Retorna relacionamento com lead
   */
  async getRelationship(userId: string, contactId: string) {
    return await prisma.gameLeadRelationship.findUnique({
      where: {
        userId_contactId: { userId, contactId },
      },
    });
  }

  // ============= EXPLORATION =============

  /**
   * Processa ação de exploração
   */
  async explore(
    userId: string,
    territoryId: string,
    actionType: 'cold_outreach' | 'network_event' | 'indicacao' | 'inbound'
  ): Promise<{
    success: boolean;
    leadGenerated: boolean;
    lead?: {
      id: string;
      name: string;
      company: string;
      quality: 'hot' | 'warm' | 'cold';
    };
    rewards: GameReward;
    territoryProgress: number;
    message: string;
  }> {
    // Energy costs and success rates
    const actionConfig = {
      cold_outreach: { energy: 10, successRate: 0.30, progressGain: 3 },
      network_event: { energy: 20, successRate: 0.60, progressGain: 8 },
      indicacao: { energy: 5, successRate: 0.80, progressGain: 5 },
      inbound: { energy: 0, successRate: 1.0, progressGain: 10 }
    };

    const config = actionConfig[actionType];
    if (!config) {
      throw new Error('Invalid action type');
    }

    // Validate and spend energy
    if (config.energy > 0) {
      const hasEnergy = await this.spendResources(userId, 0, 0, config.energy);
      if (!hasEnergy) {
        return {
          success: false,
          leadGenerated: false,
          rewards: { experience: 0, coins: 0 },
          territoryProgress: 0,
          message: 'Energia insuficiente!'
        };
      }
    }

    // Get current territory progress
    const currentProgress = await this.getTerritoryProgress(userId, territoryId);
    const currentExploration = currentProgress?.explorationPercent || 0;
    const currentLeads = currentProgress?.leadsFound || 0;

    // Roll for success
    const roll = Math.random();
    const success = roll <= config.successRate;

    if (!success) {
      // Failed exploration - still gain small progress
      const newExploration = Math.min(100, currentExploration + 1);
      await this.updateTerritoryProgress(userId, territoryId, {
        explorationPercent: newExploration
      });

      return {
        success: false,
        leadGenerated: false,
        rewards: { experience: 5, coins: 0 },
        territoryProgress: newExploration,
        message: 'Exploração sem sucesso. Continue tentando!'
      };
    }

    // Success! Generate lead
    const leadQuality = this.rollLeadQuality();
    const lead = this.generateLead(territoryId, leadQuality);

    // Calculate rewards
    const rewards: GameReward = {
      experience: leadQuality === 'hot' ? 30 : leadQuality === 'warm' ? 20 : 10,
      coins: leadQuality === 'hot' ? 15 : leadQuality === 'warm' ? 10 : 5,
      gems: leadQuality === 'hot' ? 2 : 0
    };

    // Add rewards
    await this.addResources(userId, rewards, 'EXPLORATION', territoryId);

    // Update territory progress
    const newExploration = Math.min(100, currentExploration + config.progressGain);
    await this.updateTerritoryProgress(userId, territoryId, {
      explorationPercent: newExploration,
      leadsFound: currentLeads + 1
    });

    return {
      success: true,
      leadGenerated: true,
      lead,
      rewards,
      territoryProgress: newExploration,
      message: `Lead ${leadQuality.toUpperCase()} descoberto!`
    };
  }

  /**
   * Roll lead quality (hot/warm/cold)
   */
  private rollLeadQuality(): 'hot' | 'warm' | 'cold' {
    const roll = Math.random();
    if (roll < 0.15) return 'hot';   // 15% chance
    if (roll < 0.45) return 'warm';  // 30% chance
    return 'cold';                    // 55% chance
  }

  /**
   * Generate mock lead data
   */
  private generateLead(territoryId: string, quality: 'hot' | 'warm' | 'cold'): {
    id: string;
    name: string;
    company: string;
    quality: 'hot' | 'warm' | 'cold';
  } {
    // Territory-specific company names
    const companyPrefixes: Record<string, string[]> = {
      varejo: ['Loja', 'Mercado', 'Supermercado', 'Boutique', 'Shopping'],
      industria: ['Fábrica', 'Indústria', 'Manufatura', 'Metalúrgica', 'Química'],
      servicos: ['Consultoria', 'Agência', 'Escritório', 'Grupo', 'Rede'],
      saude: ['Clínica', 'Hospital', 'Laboratório', 'Centro Médico', 'Policlínica'],
      corporativo: ['Corporação', 'Holding', 'Empresa', 'Companhia', 'Conglomerado'],
      startups: ['Tech', 'Hub', 'Labs', 'Ventures', 'Digital']
    };

    const names = [
      'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza',
      'Juliana Lima', 'Ricardo Alves', 'Fernanda Rocha', 'Lucas Martins', 'Camila Ferreira'
    ];

    const suffixes = ['SA', 'Ltda', 'EIRELI', 'ME', 'Tech', 'Group', 'Corp', 'Brasil'];

    const prefixes = companyPrefixes[territoryId] || ['Empresa'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const name = names[Math.floor(Math.random() * names.length)];

    return {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      company: `${prefix} ${suffix}`,
      quality
    };
  }
}

export default new GameService();
