// ============= GAME REWARD SERVICE =============
// Converts CRM activities into game rewards

import { usePlayerStore } from '../store/playerStore';
import { useInventoryStore } from '../store/inventoryStore';
import { useWorldMapStore } from '../store/worldMapStore';
import { useAchievementsStore } from '../store/achievementsStore';
import { ItemManager } from '../managers/ItemManager';
import type { Deal, Activity, Contact } from '../../types/CRM';

export interface CRMReward {
  experience: number;
  coins: number;
  gems?: number;
  energy?: number;
  items?: string[];
  reason: string;
}

export class GameRewardService {
  // ============= DEAL REWARDS =============

  /**
   * Reward for creating a new deal
   */
  static rewardNewDeal(deal: Deal): CRMReward {
    const baseXP = 50;
    const baseCoins = 25;

    return {
      experience: baseXP,
      coins: baseCoins,
      reason: `Novo Deal: ${deal.title}`,
    };
  }

  /**
   * Reward for moving deal to next stage
   */
  static rewardDealProgress(deal: Deal, fromStage: string, toStage: string): CRMReward {
    const baseXP = 75;
    const baseCoins = 40;

    return {
      experience: baseXP,
      coins: baseCoins,
      reason: `Deal avançou: ${fromStage} → ${toStage}`,
    };
  }

  /**
   * Reward for winning a deal
   */
  static rewardDealWon(deal: Deal): CRMReward {
    const value = deal.value || 0;

    // XP based on deal value (scale: $1000 = 100 XP)
    const xp = Math.floor(value / 10) + 200;

    // Coins based on deal value (scale: $1000 = 50 coins)
    const coins = Math.floor(value / 20) + 100;

    // Gems for high-value deals (> $10,000)
    const gems = value > 10000 ? Math.floor(value / 5000) : 0;

    // Chance for loot item (higher for bigger deals)
    const items: string[] = [];
    if (value > 5000 && Math.random() < 0.3) {
      items.push('reward_item'); // Will be replaced with actual item generation
    }

    return {
      experience: xp,
      coins,
      gems: gems > 0 ? gems : undefined,
      items: items.length > 0 ? items : undefined,
      reason: `Deal Fechado: ${deal.title} ($${value.toLocaleString()})`,
    };
  }

  // ============= ACTIVITY REWARDS =============

  /**
   * Reward for completing an activity
   */
  static rewardActivityComplete(activity: Activity): CRMReward {
    const typeRewards: Record<string, { xp: number; coins: number }> = {
      call: { xp: 30, coins: 15 },
      meeting: { xp: 50, coins: 25 },
      email: { xp: 20, coins: 10 },
      task: { xp: 25, coins: 12 },
      note: { xp: 15, coins: 8 },
    };

    const reward = typeRewards[activity.type] || { xp: 25, coins: 10 };

    return {
      experience: reward.xp,
      coins: reward.coins,
      reason: `Atividade completa: ${activity.title}`,
    };
  }

  // ============= CONTACT REWARDS =============

  /**
   * Reward for creating a new contact
   */
  static rewardNewContact(contact: Contact): CRMReward {
    return {
      experience: 40,
      coins: 20,
      reason: `Novo Contato: ${contact.name}`,
    };
  }

  /**
   * Reward for qualifying a contact
   */
  static rewardContactQualified(contact: Contact): CRMReward {
    return {
      experience: 60,
      coins: 30,
      gems: 1,
      reason: `Contato Qualificado: ${contact.name}`,
    };
  }

  // ============= QUEST GENERATION =============

  /**
   * Generate a quest from a CRM deal
   */
  static generateQuestFromDeal(deal: Deal) {
    const territoryMap: Record<string, string> = {
      retail: 'varejo',
      b2b: 'b2b',
      ecommerce: 'ecommerce',
      international: 'internacional',
    };

    const territory = territoryMap[deal.researchType?.toLowerCase() || 'retail'] || 'varejo';

    return {
      id: `crm_deal_${deal.id}`,
      title: deal.title,
      description: deal.description || `Feche o deal com ${deal.company?.name || 'cliente'}`,
      status: 'available' as const,
      difficulty: this.getDifficultyFromValue(deal.value || 0),
      rewards: {
        exp: Math.floor((deal.value || 0) / 10) + 100,
        coins: Math.floor((deal.value || 0) / 20) + 50,
      },
      territoryId: territory,
      crmDealId: deal.id, // Track CRM origin
    };
  }

  /**
   * Generate a quest from a CRM activity
   */
  static generateQuestFromActivity(activity: Activity) {
    return {
      id: `crm_activity_${activity.id}`,
      title: activity.title,
      description: activity.description || `Complete: ${activity.type}`,
      status: 'available' as const,
      difficulty: 'easy' as const,
      rewards: {
        exp: 30,
        coins: 15,
      },
      crmActivityId: activity.id, // Track CRM origin
    };
  }

  // ============= HELPERS =============

  private static getDifficultyFromValue(value: number): 'easy' | 'medium' | 'hard' {
    if (value < 1000) return 'easy';
    if (value < 10000) return 'medium';
    return 'hard';
  }

  // ============= APPLY REWARDS =============

  /**
   * Apply reward to player stores
   */
  static applyReward(reward: CRMReward): void {
    const playerStore = usePlayerStore.getState();
    const inventoryStore = useInventoryStore.getState();

    // Add XP
    if (reward.experience > 0) {
      playerStore.addExperience(reward.experience);
    }

    // Add Coins
    if (reward.coins > 0) {
      playerStore.addCoins(reward.coins);
    }

    // Add Gems
    if (reward.gems && reward.gems > 0) {
      playerStore.addGems(reward.gems);
    }

    // Regenerate Energy
    if (reward.energy && reward.energy > 0) {
      playerStore.regenEnergy(reward.energy);
    }

    // Add Items
    if (reward.items && reward.items.length > 0) {
      reward.items.forEach(itemId => {
        const item = ItemManager.generateRandomItem({
          level: playerStore.level,
          rarity: this.getRandomRarity(),
        });
        if (item) {
          inventoryStore.addItem(item);
        }
      });
    }

    // Show notification (will be handled by toast system)
    console.log(`🎁 Reward applied: ${reward.reason}`);
  }

  private static getRandomRarity(): 'comum' | 'incomum' | 'raro' | 'épico' | 'lendário' {
    const rand = Math.random();
    if (rand < 0.60) return 'comum';
    if (rand < 0.85) return 'incomum';
    if (rand < 0.95) return 'raro';
    if (rand < 0.99) return 'épico';
    return 'lendário';
  }

  // ============= SYNC CRM TO GAME =============

  /**
   * Sync CRM stats to game HUD
   * Returns aggregated stats for display
   */
  static async getCRMStats(): Promise<{
    totalDeals: number;
    wonDeals: number;
    totalRevenue: number;
    activitiesCompleted: number;
    contacts: number;
  }> {
    // This will be populated from CRM API
    // For now, return mock structure
    return {
      totalDeals: 0,
      wonDeals: 0,
      totalRevenue: 0,
      activitiesCompleted: 0,
      contacts: 0,
    };
  }
}
