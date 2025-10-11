import { io, Socket } from 'socket.io-client';
import { MarketResearchGame } from '../index';

interface GameEvent {
  type: string;
  payload: any;
}

interface ResourceUpdate {
  coins?: number;
  gems?: number;
  energy?: number;
  experience?: number;
  level?: number;
}

class GameSocketService {
  private socket: Socket | null = null;
  private gameInstance: MarketResearchGame | null = null;
  private connected: boolean = false;

  connect(userId: string) {
    if (this.socket) {
      console.log('🔌 Socket already connected');
      return;
    }

    // Connect to backend WebSocket
    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    this.socket = io(socketUrl, {
      query: { userId },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.setupListeners();
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('🎮 Socket.IO connected to game server');
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('🔌 Socket.IO disconnected from game server');
      this.connected = false;
    });

    this.socket.on('error', (error: any) => {
      console.error('❌ Socket.IO error:', error);
    });

    // Game event listeners
    this.socket.on('game:resourcesUpdated', (data: ResourceUpdate) => {
      console.log('💰 Resources updated:', data);
      this.handleResourceUpdate(data);
    });

    this.socket.on('game:levelUp', (data: { level: number; skillPoints: number }) => {
      console.log('🎉 Level up!', data);
      this.handleLevelUp(data);
    });

    this.socket.on('game:itemReceived', (data: { itemId: string; rarity: string }) => {
      console.log('🎁 Item received:', data);
      this.handleItemReceived(data);
    });

    this.socket.on('game:questUpdated', (data: { questId: string; progress: any }) => {
      console.log('📜 Quest updated:', data);
      this.handleQuestUpdate(data);
    });

    this.socket.on('game:battleTriggered', (data: { contactId: string; leadName: string; leadCompany: string }) => {
      console.log('⚔️ Battle triggered:', data);
      this.handleBattleTrigger(data);
    });

    this.socket.on('game:notification', (data: { type: string; title: string; message: string }) => {
      console.log('🔔 Notification:', data);
      this.handleNotification(data);
    });
  }

  setGameInstance(game: MarketResearchGame) {
    this.gameInstance = game;
    console.log('🎮 Game instance set for socket service');
  }

  private handleResourceUpdate(data: ResourceUpdate) {
    if (!this.gameInstance) return;

    const uiScene = this.gameInstance.getUIScene();
    if (uiScene) {
      // UIScene will handle the update via its own methods
      // This is just a placeholder - UIScene needs updateResources method
      console.log('🔄 Updating UI with new resources:', data);
    }

    // Show notification toast
    this.showToast('success', 'Recursos Atualizados', this.formatResourceMessage(data));
  }

  private formatResourceMessage(data: ResourceUpdate): string {
    const parts: string[] = [];
    if (data.coins) parts.push(`+${data.coins} Coins`);
    if (data.gems) parts.push(`+${data.gems} Gems`);
    if (data.energy) parts.push(`+${data.energy} Energy`);
    if (data.experience) parts.push(`+${data.experience} XP`);
    return parts.join(', ');
  }

  private handleLevelUp(data: { level: number; skillPoints: number }) {
    if (!this.gameInstance) return;

    this.showToast('success', '🎉 Level Up!', `Você alcançou o nível ${data.level}!`);

    // Play level up animation (if implemented)
    console.log('✨ Level up animation triggered');
  }

  private handleItemReceived(data: { itemId: string; rarity: string }) {
    const rarityEmojis: Record<string, string> = {
      common: '⬜',
      uncommon: '🟢',
      rare: '🔵',
      epic: '🟣',
      legendary: '🟠',
      mythic: '✨'
    };

    const emoji = rarityEmojis[data.rarity] || '🎁';
    this.showToast('info', `${emoji} Item Recebido`, `Você ganhou: ${data.itemId}`);
  }

  private handleQuestUpdate(data: { questId: string; progress: any }) {
    this.showToast('info', '📜 Quest Atualizada', `Progresso em ${data.questId}`);
  }

  private handleBattleTrigger(data: { contactId: string; leadName: string; leadCompany: string }) {
    if (!this.gameInstance) return;

    const game = this.gameInstance.getGame();
    if (!game) return;

    // Get current active scene
    const activeScenes = game.scene.getScenes(true);
    const worldMapScene = activeScenes.find(scene => scene.scene.key === 'WorldMapScene');

    if (worldMapScene) {
      // Pause world map and launch battle
      worldMapScene.scene.pause();
      worldMapScene.scene.launch('BattleScene', {
        leadName: data.leadName,
        leadCompany: data.leadCompany,
        leadLevel: 5, // TODO: Get from backend
        contactId: data.contactId
      });

      this.showToast('info', '⚔️ Entrevista Iniciada', `Você está entrevistando ${data.leadName}`);
    }
  }

  private handleNotification(data: { type: string; title: string; message: string }) {
    this.showToast(data.type as any, data.title, data.message);
  }

  private showToast(type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) {
    // This should integrate with the GameNotifications component
    // For now, just dispatch a custom event
    const event = new CustomEvent('game-notification', {
      detail: { type, title, message }
    });
    window.dispatchEvent(event);

    console.log(`🔔 [${type.toUpperCase()}] ${title}: ${message}`);
  }

  // Methods to emit events to backend
  emitBattleResult(data: {
    contactId: string;
    dealId?: string;
    victory: boolean;
    painDiscovered: boolean;
    painIntensity?: number;
    painText?: string;
    relationshipChange: number;
  }) {
    if (!this.socket || !this.connected) {
      console.error('❌ Socket not connected, cannot emit battle result');
      return;
    }

    this.socket.emit('game:battleCompleted', data);
    console.log('⚔️ Battle result sent to server:', data);
  }

  emitResourceClaim(resourceType: string, amount: number) {
    if (!this.socket || !this.connected) return;
    this.socket.emit('game:claimResource', { resourceType, amount });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
      console.log('🔌 Socket.IO disconnected');
    }
  }

  isConnected(): boolean {
    return this.connected;
  }
}

// Singleton instance
export const gameSocketService = new GameSocketService();
export default gameSocketService;
