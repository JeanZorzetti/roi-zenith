import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

// Game State Types (matching backend structure)
export interface GameState {
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

export interface GameNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
}

interface GameStore {
  // State
  socket: Socket | null;
  isConnected: boolean;
  gameState: GameState | null;
  notifications: GameNotification[];
  isLoading: boolean;
  error: string | null;

  // Actions
  connect: (userId: string) => void;
  disconnect: () => void;
  updateGameState: (state: Partial<GameState>) => void;
  addNotification: (notification: Omit<GameNotification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Use same API detection logic as crmService
const isProduction = process.env.NODE_ENV === 'production' ||
  (typeof window !== 'undefined' && window.location.hostname.includes('roilabs.com'));

const API_URL = isProduction
  ? 'https://back.roilabs.com.br'
  : 'http://localhost:5002';

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  socket: null,
  isConnected: false,
  gameState: null,
  notifications: [],
  isLoading: false,
  error: null,

  // Connect to game socket
  connect: (userId: string) => {
    const { socket: existingSocket, isConnected } = get();

    // Don't reconnect if already connected
    if (existingSocket && isConnected) {
      console.log('🎮 Already connected to game socket');
      return;
    }

    // Disconnect existing socket if any
    if (existingSocket) {
      existingSocket.disconnect();
    }

    console.log('🎮 Connecting to game socket...', API_URL);
    set({ isLoading: true, error: null });

    // Create new socket connection
    const socket = io(`${API_URL}/game`, {
      transports: ['websocket'],
      autoConnect: true,
    });

    // Connection handlers
    socket.on('connect', () => {
      console.log('🎮 Connected to game socket:', socket.id);
      set({ isConnected: true, isLoading: false, error: null });

      // Join game room
      socket.emit('join-game', userId);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from game socket');
      set({ isConnected: false });
    });

    socket.on('connect_error', (error) => {
      console.error('🎮 Game socket connection error:', error);
      set({
        isConnected: false,
        isLoading: false,
        error: 'Failed to connect to game server'
      });
    });

    // Game state
    socket.on('game-state', (state: GameState) => {
      console.log('🎮 Received game state:', state);
      set({ gameState: state });
    });

    socket.on('game-error', (data: { message: string }) => {
      console.error('🎮 Game error:', data.message);
      set({ error: data.message });
      get().addNotification({
        type: 'error',
        title: 'Erro no Jogo',
        message: data.message,
        duration: 5000,
      });
    });

    // Experience & Level Up
    socket.on('experience-gained', (data: { experience: number; currentXP: number; totalXP: number; level: number }) => {
      console.log('📈 Experience gained:', data);
      set((state) => {
        if (!state.gameState) return state;
        return {
          gameState: {
            ...state.gameState,
            progression: {
              ...state.gameState.progression,
              experience: data.currentXP,
              level: data.level,
            }
          }
        };
      });
    });

    socket.on('level-up', (data: { newLevel: number; skillPoints: number; maxEnergy: number; rewards: any }) => {
      console.log('⭐ Level up!', data);
      set((state) => {
        if (!state.gameState) return state;
        return {
          gameState: {
            ...state.gameState,
            progression: {
              ...state.gameState.progression,
              level: data.newLevel,
            },
            stats: {
              ...state.gameState.stats,
              skillPoints: state.gameState.stats.skillPoints + data.skillPoints,
            },
            resources: {
              ...state.gameState.resources,
              maxEnergy: data.maxEnergy,
            }
          }
        };
      });

      get().addNotification({
        type: 'success',
        title: '⭐ Level Up!',
        message: `Você alcançou o nível ${data.newLevel}!`,
        duration: 8000,
      });
    });

    // Resources
    socket.on('resources-gained', (data: { coins?: number; gems?: number; energy?: number; reputation?: number; experience?: number }) => {
      console.log('💰 Resources gained:', data);
      set((state) => {
        if (!state.gameState) return state;

        return {
          gameState: {
            ...state.gameState,
            resources: {
              ...state.gameState.resources,
              coins: state.gameState.resources.coins + (data.coins || 0),
              gems: state.gameState.resources.gems + (data.gems || 0),
              energy: state.gameState.resources.energy + (data.energy || 0),
              reputation: state.gameState.resources.reputation + (data.reputation || 0),
            },
            progression: {
              ...state.gameState.progression,
              experience: state.gameState.progression.experience + (data.experience || 0),
            }
          }
        };
      });
    });

    // Items
    socket.on('item-dropped', (data: { itemId: string; itemName: string; rarity: string; source: string }) => {
      console.log('🎁 Item dropped:', data);
      get().addNotification({
        type: 'success',
        title: '🎁 Item Dropado!',
        message: `Você ganhou: ${data.itemName} (${data.rarity})`,
        duration: 8000,
      });
      // Inventory will be fetched separately via API when needed
    });

    // Quests
    socket.on('quest-progress', (data: { questId: string; progress: any; completed: boolean }) => {
      console.log('📋 Quest progress:', data);
      // Quest data will be fetched separately via API when needed
    });

    socket.on('quest-completed', (data: { questId: string; rewards: any }) => {
      console.log('✅ Quest completed!', data);
      get().addNotification({
        type: 'success',
        title: '✅ Quest Completa!',
        message: `Você completou uma quest!`,
        duration: 6000,
      });
    });

    // Achievements
    socket.on('achievement-unlocked', (data: { achievementId: string; name: string; description: string; rewards: any; badge?: string }) => {
      console.log('🏆 Achievement unlocked!', data);
      get().addNotification({
        type: 'success',
        title: `🏆 ${data.name}`,
        message: data.description,
        duration: 10000,
      });
      // Achievements will be fetched separately via API when needed
    });

    // Notifications
    socket.on('notification', (data: { type: 'success' | 'info' | 'warning' | 'error'; title: string; message: string; duration?: number }) => {
      console.log('🔔 Notification:', data);
      get().addNotification(data);
    });

    // CRM Integration Events
    socket.on('contact-created', (data: { contactId: string; contactName: string; rewards: any }) => {
      console.log('👤 Contact created:', data);
    });

    socket.on('pain-discovered', (data: { dealId: string; painIntensity: number; rewards: any; itemDropped?: string; leveledUp: boolean }) => {
      console.log('💡 Pain discovered:', data);
    });

    // Save socket
    set({ socket });
  },

  // Disconnect from game socket
  disconnect: () => {
    const { socket } = get();

    if (socket) {
      console.log('🎮 Disconnecting from game socket...');
      socket.disconnect();
      set({
        socket: null,
        isConnected: false,
        gameState: null,
        notifications: [],
      });
    }
  },

  // Update game state
  updateGameState: (updates: Partial<GameState>) => {
    set((state) => ({
      gameState: state.gameState ? { ...state.gameState, ...updates } : null,
    }));
  },

  // Add notification
  addNotification: (notification: Omit<GameNotification, 'id' | 'timestamp'>) => {
    const id = `notif-${Date.now()}-${Math.random()}`;
    const newNotification: GameNotification = {
      id,
      timestamp: Date.now(),
      ...notification,
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove after duration
    const duration = notification.duration || 5000;
    setTimeout(() => {
      get().removeNotification(id);
    }, duration);
  },

  // Remove notification
  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },

  // Clear all notifications
  clearNotifications: () => {
    set({ notifications: [] });
  },
}));
