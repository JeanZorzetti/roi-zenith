// ============= GAME EVENT SYSTEM =============
// Sistema de eventos para integração CRM → Game

import { Server } from 'socket.io';
import gameService from '../services/gameService';
import { GameEvents } from '../sockets/gameSocket';
import { ITEMS } from '../config/gameConfig';

// Singleton para manter referência ao Socket.IO server
let ioInstance: Server | null = null;

export function setSocketIOInstance(io: Server) {
  ioInstance = io;
}

export function getSocketIOInstance(): Server {
  if (!ioInstance) {
    throw new Error('Socket.IO instance not initialized. Call setSocketIOInstance first.');
  }
  return ioInstance;
}

// ============= CRM EVENT HANDLERS =============

/**
 * Evento: Contato criado no CRM
 */
export async function onContactCreated(userId: string, contactId: string, contactName: string) {
  try {
    const io = getSocketIOInstance();

    // Processar evento no game service
    const result = await gameService.processCRMEvent(
      userId,
      'CONTACT_CREATED',
      contactId,
      { contactName }
    );

    // Emitir eventos via WebSocket
    GameEvents.contactCreated(io, userId, {
      contactId,
      contactName,
      rewards: result.rewards,
    });

    GameEvents.experienceGained(io, userId, {
      experience: result.rewards.experience,
      currentXP: 0, // Será atualizado pelo frontend
      totalXP: 0,
      level: result.newLevel || 1,
    });

    GameEvents.resourcesGained(io, userId, {
      coins: result.rewards.coins,
      gems: result.rewards.gems,
      energy: result.rewards.energy,
      reputation: result.rewards.reputation,
    });

    // Notificação
    GameEvents.notification(io, userId, {
      type: 'success',
      title: '🎉 Novo Contato',
      message: `${contactName} foi adicionado! +${result.rewards.experience} XP, +${result.rewards.coins} coins`,
      duration: 5000,
    });

    // Check level up
    if (result.leveledUp && result.newLevel) {
      GameEvents.levelUp(io, userId, {
        newLevel: result.newLevel,
        skillPoints: 1,
        maxEnergy: 5,
        rewards: result.rewards,
      });

      GameEvents.notification(io, userId, {
        type: 'success',
        title: '⭐ Level Up!',
        message: `Você alcançou o nível ${result.newLevel}!`,
        duration: 8000,
      });
    }

    console.log(`✅ Contact created event processed for user ${userId}`);
  } catch (error) {
    console.error('Error processing contact created event:', error);
  }
}

/**
 * Evento: Dor descoberta em um deal
 */
export async function onPainDiscovered(
  userId: string,
  dealId: string,
  painText: string,
  painIntensity: number,
  painCategory: string,
  orionSolution?: string
) {
  try {
    const io = getSocketIOInstance();

    // Processar descoberta de dor
    const result = await gameService.processPainDiscovery(
      userId,
      dealId,
      painText,
      painIntensity,
      painCategory,
      orionSolution
    );

    // Emitir eventos
    GameEvents.painDiscovered(io, userId, {
      dealId,
      painIntensity,
      rewards: result.rewards,
      itemDropped: result.item,
      leveledUp: result.leveledUp,
    });

    GameEvents.experienceGained(io, userId, {
      experience: result.rewards.experience,
      currentXP: 0,
      totalXP: 0,
      level: 1,
    });

    GameEvents.resourcesGained(io, userId, {
      coins: result.rewards.coins,
      gems: result.rewards.gems,
      energy: result.rewards.energy,
      reputation: result.rewards.reputation,
    });

    // Item drop notification
    if (result.item) {
      const item = ITEMS.find(i => i.id === result.item);
      if (item) {
        GameEvents.itemDropped(io, userId, {
          itemId: item.id,
          itemName: item.name,
          rarity: item.rarity,
          source: 'pain_discovery',
        });

        GameEvents.notification(io, userId, {
          type: 'success',
          title: '🎁 Item Dropado!',
          message: `Você ganhou: ${item.name} (${item.rarity})`,
          duration: 8000,
        });
      }
    }

    // Pain discovery notification
    const intensityEmoji = painIntensity >= 7 ? '🔥' : '💡';
    GameEvents.notification(io, userId, {
      type: 'success',
      title: `${intensityEmoji} Dor Descoberta!`,
      message: `Intensidade ${painIntensity}/10 - +${result.rewards.experience} XP, +${result.rewards.coins} coins`,
      duration: 6000,
    });

    // Level up notification
    if (result.leveledUp) {
      GameEvents.levelUp(io, userId, {
        newLevel: 0, // Será preenchido pelo service
        skillPoints: 1,
        maxEnergy: 5,
        rewards: result.rewards,
      });
    }

    console.log(`✅ Pain discovered event processed for user ${userId}`);
  } catch (error) {
    console.error('Error processing pain discovered event:', error);
  }
}

/**
 * Evento: Atividade/Entrevista criada
 */
export async function onActivityCreated(
  userId: string,
  activityId: string,
  activityType: string,
  contactId?: string
) {
  try {
    const io = getSocketIOInstance();

    // Processar evento
    const result = await gameService.processCRMEvent(
      userId,
      'ACTIVITY_COMPLETED',
      activityId,
      { activityType, contactId }
    );

    // Emitir eventos
    GameEvents.resourcesGained(io, userId, {
      coins: result.rewards.coins,
      experience: result.rewards.experience,
    });

    // Se for uma entrevista, trigger battle notification
    if (activityType === 'interview' || activityType === 'meeting') {
      GameEvents.notification(io, userId, {
        type: 'info',
        title: '⚔️ Nova Batalha!',
        message: 'Uma entrevista foi agendada. Prepare-se para descobrir dores!',
        duration: 5000,
      });
    }

    console.log(`✅ Activity created event processed for user ${userId}`);
  } catch (error) {
    console.error('Error processing activity created event:', error);
  }
}

/**
 * Evento: Deal atualizado (mapeamento de solução)
 */
export async function onSolutionMapped(
  userId: string,
  dealId: string,
  orionSolution: string
) {
  try {
    const io = getSocketIOInstance();

    // Processar evento
    const result = await gameService.processCRMEvent(
      userId,
      'SOLUTION_MAPPED',
      dealId,
      { orionSolution }
    );

    // Emitir eventos
    GameEvents.resourcesGained(io, userId, {
      coins: result.rewards.coins,
      experience: result.rewards.experience,
    });

    GameEvents.notification(io, userId, {
      type: 'success',
      title: '💡 Solução Mapeada',
      message: `Orion ERP fit identificado! +${result.rewards.coins} coins`,
      duration: 4000,
    });

    console.log(`✅ Solution mapped event processed for user ${userId}`);
  } catch (error) {
    console.error('Error processing solution mapped event:', error);
  }
}

/**
 * Evento: Referral recebido
 */
export async function onReferralReceived(
  userId: string,
  referralId: string,
  referrerContactId: string
) {
  try {
    const io = getSocketIOInstance();

    // Processar evento
    const result = await gameService.processCRMEvent(
      userId,
      'REFERRAL_RECEIVED',
      referralId,
      { referrerContactId }
    );

    // Emitir eventos
    GameEvents.resourcesGained(io, userId, {
      coins: result.rewards.coins,
      experience: result.rewards.experience,
      energy: result.rewards.energy,
    });

    GameEvents.notification(io, userId, {
      type: 'success',
      title: '🎁 Indicação Recebida!',
      message: `Novo lead por indicação! +${result.rewards.energy} energy`,
      duration: 6000,
    });

    console.log(`✅ Referral received event processed for user ${userId}`);
  } catch (error) {
    console.error('Error processing referral received event:', error);
  }
}

/**
 * Evento: Relacionamento upgrade (Cold → Warm, etc)
 */
export async function onRelationshipUpgraded(
  userId: string,
  contactId: string,
  oldTier: string,
  newTier: string
) {
  try {
    const io = getSocketIOInstance();

    // Processar evento
    const result = await gameService.processCRMEvent(
      userId,
      'RELATIONSHIP_UPGRADED',
      contactId,
      { oldTier, newTier }
    );

    // Emitir eventos
    GameEvents.resourcesGained(io, userId, {
      coins: result.rewards.coins,
      experience: result.rewards.experience,
    });

    const tierEmojis: Record<string, string> = {
      cold: '❄️',
      warm: '🌤️',
      hot: '☀️',
      champion: '🔥',
    };

    GameEvents.notification(io, userId, {
      type: 'success',
      title: '📈 Relacionamento Melhorou',
      message: `${tierEmojis[oldTier]} → ${tierEmojis[newTier]}`,
      duration: 5000,
    });

    console.log(`✅ Relationship upgraded event processed for user ${userId}`);
  } catch (error) {
    console.error('Error processing relationship upgraded event:', error);
  }
}

/**
 * Helper: Emitir múltiplos eventos de quest progress
 */
export async function checkAndEmitQuestProgress(userId: string) {
  try {
    const io = getSocketIOInstance();
    const activeQuests = await gameService.getActiveQuests(userId);

    for (const quest of activeQuests) {
      GameEvents.questProgress(io, userId, {
        questId: quest.questId,
        progress: quest.progress,
        completed: quest.status === 'completed',
      });
    }
  } catch (error) {
    console.error('Error checking quest progress:', error);
  }
}

// Export all event handlers
export const CRMEventHandlers = {
  onContactCreated,
  onPainDiscovered,
  onActivityCreated,
  onSolutionMapped,
  onReferralReceived,
  onRelationshipUpgraded,
  checkAndEmitQuestProgress,
};

export default CRMEventHandlers;
