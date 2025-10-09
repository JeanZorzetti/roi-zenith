// ============= GAME SOCKET HANDLERS =============
// WebSocket handlers para eventos real-time do jogo

import { Server, Socket } from 'socket.io';
import gameService from '../services/gameService';

export function setupGameSocket(io: Server) {
  // Namespace específico para o jogo
  const gameNamespace = io.of('/game');

  gameNamespace.on('connection', (socket: Socket) => {
    console.log(`🎮 Game client connected: ${socket.id}`);

    // Join user's personal game room
    socket.on('join-game', async (userId: string) => {
      socket.join(`game:${userId}`);
      console.log(`👤 User ${userId} joined game room`);

      // Send current game state
      try {
        const gameState = await gameService.getGameState(userId);
        socket.emit('game-state', gameState);
      } catch (error) {
        console.error('Error sending game state:', error);
        socket.emit('game-error', { message: 'Failed to load game state' });
      }
    });

    // Leave game room
    socket.on('leave-game', (userId: string) => {
      socket.leave(`game:${userId}`);
      console.log(`👋 User ${userId} left game room`);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`❌ Game client disconnected: ${socket.id}`);
    });
  });

  return gameNamespace;
}

// Helper function to emit game events to specific users
export function emitGameEvent(io: Server, userId: string, event: string, data: any) {
  console.log(`🎮 [emitGameEvent] Emitting '${event}' to user ${userId} in room game:${userId}`);
  const gameNamespace = io.of('/game');
  gameNamespace.to(`game:${userId}`).emit(event, data);
  console.log(`🎮 [emitGameEvent] Event '${event}' emitted successfully`);
}

// Specific game event emitters
export const GameEvents = {
  // Experience & Level Up
  experienceGained: (io: Server, userId: string, data: {
    experience: number;
    currentXP: number;
    totalXP: number;
    level: number;
  }) => {
    emitGameEvent(io, userId, 'experience-gained', data);
  },

  levelUp: (io: Server, userId: string, data: {
    newLevel: number;
    skillPoints: number;
    maxEnergy: number;
    rewards: any;
  }) => {
    emitGameEvent(io, userId, 'level-up', {
      ...data,
      animation: 'level-up', // Trigger level up animation
    });
  },

  // Resources
  resourcesGained: (io: Server, userId: string, data: {
    coins?: number;
    gems?: number;
    energy?: number;
    reputation?: number;
    experience?: number;
  }) => {
    emitGameEvent(io, userId, 'resources-gained', data);
  },

  // Items
  itemDropped: (io: Server, userId: string, data: {
    itemId: string;
    itemName: string;
    rarity: string;
    source: string;
  }) => {
    emitGameEvent(io, userId, 'item-dropped', {
      ...data,
      animation: 'item-drop',
    });
  },

  itemEquipped: (io: Server, userId: string, data: {
    itemId: string;
    slot: string;
  }) => {
    emitGameEvent(io, userId, 'item-equipped', data);
  },

  // Quests
  questProgress: (io: Server, userId: string, data: {
    questId: string;
    progress: any;
    completed: boolean;
  }) => {
    emitGameEvent(io, userId, 'quest-progress', data);
  },

  questCompleted: (io: Server, userId: string, data: {
    questId: string;
    rewards: any;
  }) => {
    emitGameEvent(io, userId, 'quest-completed', {
      ...data,
      animation: 'quest-complete',
    });
  },

  // Achievements
  achievementUnlocked: (io: Server, userId: string, data: {
    achievementId: string;
    name: string;
    description: string;
    rewards: any;
    badge?: string;
    title?: string;
  }) => {
    emitGameEvent(io, userId, 'achievement-unlocked', {
      ...data,
      animation: 'achievement-unlock',
    });
  },

  // Party
  npcRecruited: (io: Server, userId: string, data: {
    npcId: string;
    name: string;
    title: string;
  }) => {
    emitGameEvent(io, userId, 'npc-recruited', data);
  },

  // Territory
  territoryUnlocked: (io: Server, userId: string, data: {
    territoryId: string;
    name: string;
    emoji: string;
  }) => {
    emitGameEvent(io, userId, 'territory-unlocked', {
      ...data,
      animation: 'territory-unlock',
    });
  },

  // CRM Integration Events
  contactCreated: (io: Server, userId: string, data: {
    contactId: string;
    contactName: string;
    rewards: any;
  }) => {
    emitGameEvent(io, userId, 'contact-created', data);
  },

  painDiscovered: (io: Server, userId: string, data: {
    dealId: string;
    painIntensity: number;
    rewards: any;
    itemDropped?: string;
    leveledUp: boolean;
  }) => {
    emitGameEvent(io, userId, 'pain-discovered', {
      ...data,
      animation: data.painIntensity >= 7 ? 'high-intensity-pain' : 'pain-discovered',
    });
  },

  // Notifications
  notification: (io: Server, userId: string, data: {
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    message: string;
    duration?: number;
  }) => {
    emitGameEvent(io, userId, 'notification', data);
  },

  // Energy regeneration
  energyRegenerated: (io: Server, userId: string, data: {
    energy: number;
    maxEnergy: number;
  }) => {
    emitGameEvent(io, userId, 'energy-regenerated', data);
  },

  // Battle events
  battleStarted: (io: Server, userId: string, data: {
    contactId: string;
    contactName: string;
    relationshipLevel: number;
  }) => {
    emitGameEvent(io, userId, 'battle-started', data);
  },

  battleEnded: (io: Server, userId: string, data: {
    victory: boolean;
    rewards: any;
    relationshipChange: number;
  }) => {
    emitGameEvent(io, userId, 'battle-ended', {
      ...data,
      animation: data.victory ? 'victory' : 'defeat',
    });
  },
};

export default setupGameSocket;
