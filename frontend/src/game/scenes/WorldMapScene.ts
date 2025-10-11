import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../config/gameConfig';

interface Territory {
  id: string;
  name: string;
  emoji: string;
  x: number;
  y: number;
  color: number;
  reputationRequired: number;
  level: number;
  leadsCount: number;
  explorationProgress: number; // 0-100%
  bossDefeated: boolean;
  unlocked: boolean;
  completed: boolean;
}

export class WorldMapScene extends Phaser.Scene {
  private territories: Territory[] = [];
  private currentHoverTooltip: Phaser.GameObjects.Container | null = null;

  constructor() {
    super({ key: SCENE_KEYS.WORLD_MAP });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(0, 0, width, height, 0x0f0f1e).setOrigin(0);

    // Title bar
    this.createTitleBar(width);

    // Initialize territories
    this.initializeTerritories();

    // Render territories
    this.renderTerritories();

    // Instructions
    this.createInstructions(width, height);

    // Listen for territory updates from backend
    this.registry.events.on('territory-unlocked', this.handleTerritoryUnlocked, this);
  }

  private createTitleBar(width: number): void {
    const titleBar = this.add.rectangle(width / 2, 50, width - 40, 80, 0x1a1a2e, 0.98).setOrigin(0.5);
    titleBar.setStrokeStyle(3, 0x3b82f6);

    this.add.text(width / 2, 38, '🗺️ MARKET MAP', {
      fontSize: '28px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 66, 'Explore territórios e descubra leads', {
      fontSize: '14px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Inventory button (top right)
    const invBtn = this.add.rectangle(width - 120, 50, 140, 50, 0x1e293b, 0.9);
    invBtn.setStrokeStyle(2, 0x3b82f6);
    invBtn.setInteractive({ useHandCursor: true });

    const invText = this.add.text(width - 120, 50, '📦 Inventário', {
      fontSize: '14px',
      color: COLORS.textLight,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    invBtn.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.INVENTORY);
    });

    invBtn.on('pointerover', () => {
      invBtn.setFillStyle(0x2d3748);
    });

    invBtn.on('pointerout', () => {
      invBtn.setFillStyle(0x1e293b, 0.9);
    });
  }

  private initializeTerritories(): void {
    // Get player reputation from registry (set by UIScene or backend)
    const playerReputation = this.registry.get('playerReputation') || 0;

    this.territories = [
      {
        id: 'varejo',
        name: 'Varejo',
        emoji: '🏪',
        x: 250,
        y: 220,
        color: 0x10b981, // Green
        reputationRequired: 0,
        level: 1,
        leadsCount: 12,
        explorationProgress: 65,
        bossDefeated: false,
        unlocked: true, // Always unlocked
        completed: false
      },
      {
        id: 'industria',
        name: 'Indústria',
        emoji: '🏭',
        x: 550,
        y: 220,
        color: 0xef4444, // Red
        reputationRequired: 10,
        level: 2,
        leadsCount: 8,
        explorationProgress: 0,
        bossDefeated: false,
        unlocked: playerReputation >= 10,
        completed: false
      },
      {
        id: 'servicos',
        name: 'Serviços',
        emoji: '💼',
        x: 850,
        y: 220,
        color: 0x8b5cf6, // Purple
        reputationRequired: 25,
        level: 3,
        leadsCount: 15,
        explorationProgress: 0,
        bossDefeated: false,
        unlocked: playerReputation >= 25,
        completed: false
      },
      {
        id: 'saude',
        name: 'Saúde',
        emoji: '🏥',
        x: 250,
        y: 480,
        color: 0x06b6d4, // Cyan
        reputationRequired: 50,
        level: 4,
        leadsCount: 10,
        explorationProgress: 0,
        bossDefeated: false,
        unlocked: playerReputation >= 50,
        completed: false
      },
      {
        id: 'corporativo',
        name: 'Corporativo',
        emoji: '🏢',
        x: 550,
        y: 480,
        color: 0xf59e0b, // Amber
        reputationRequired: 100,
        level: 5,
        leadsCount: 6,
        explorationProgress: 0,
        bossDefeated: false,
        unlocked: playerReputation >= 100,
        completed: false
      },
      {
        id: 'startups',
        name: 'Startups',
        emoji: '🦄',
        x: 850,
        y: 480,
        color: 0xec4899, // Pink
        reputationRequired: 200,
        level: 6,
        leadsCount: 20,
        explorationProgress: 0,
        bossDefeated: false,
        unlocked: playerReputation >= 200,
        completed: false
      }
    ];
  }

  private renderTerritories(): void {
    this.territories.forEach(territory => {
      this.createTerritoryCard(territory);
    });
  }

  private createTerritoryCard(territory: Territory): void {
    const cardWidth = 200;
    const cardHeight = 180;

    // Determine card state and colors
    let bgColor = 0x1a1a2e;
    let borderColor = 0x374151;
    let alpha = 0.5;

    if (territory.completed) {
      borderColor = 0xfbbf24; // Gold
      alpha = 1;
    } else if (territory.unlocked) {
      borderColor = territory.color;
      alpha = 0.98;
    }

    // Card container
    const container = this.add.container(territory.x, territory.y);

    // Background
    const bg = this.add.rectangle(0, 0, cardWidth, cardHeight, bgColor, alpha);
    bg.setStrokeStyle(4, borderColor);
    container.add(bg);

    // Emoji icon (large)
    const emoji = this.add.text(0, -60, territory.emoji, {
      fontSize: '48px'
    }).setOrigin(0.5);
    container.add(emoji);

    // Territory name
    const nameColor = territory.unlocked ? '#ffffff' : '#6b7280';
    const name = this.add.text(0, -10, territory.name, {
      fontSize: '18px',
      color: nameColor,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    container.add(name);

    // Level
    const levelText = this.add.text(0, 12, `Nível ${territory.level}`, {
      fontSize: '13px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    container.add(levelText);

    if (territory.unlocked) {
      // Leads count
      const leadsText = this.add.text(0, 35, `${territory.leadsCount} leads disponíveis`, {
        fontSize: '12px',
        color: COLORS.success,
        fontFamily: 'Arial, sans-serif'
      }).setOrigin(0.5);
      container.add(leadsText);

      // Progress bar
      const progressBarWidth = 160;
      const progressBarBg = this.add.rectangle(0, 58, progressBarWidth, 12, 0x2d2d2d).setOrigin(0.5);
      progressBarBg.setStrokeStyle(1, 0x555555);
      container.add(progressBarBg);

      const progressFill = this.add.rectangle(
        -progressBarWidth / 2,
        58,
        (progressBarWidth * territory.explorationProgress) / 100,
        12,
        territory.color
      ).setOrigin(0, 0.5);
      container.add(progressFill);

      const progressText = this.add.text(0, 75, `${territory.explorationProgress}% explorado`, {
        fontSize: '11px',
        color: COLORS.textMuted,
        fontFamily: 'Arial, sans-serif'
      }).setOrigin(0.5);
      container.add(progressText);

      // Make interactive
      bg.setInteractive({ useHandCursor: true });

      bg.on('pointerover', () => {
        bg.setStrokeStyle(4, 0xfbbf24); // Gold hover
        bg.setFillStyle(0x2d2d44);
        this.showTooltip(territory);
      });

      bg.on('pointerout', () => {
        bg.setStrokeStyle(4, borderColor);
        bg.setFillStyle(bgColor, alpha);
        this.hideTooltip();
      });

      bg.on('pointerdown', () => {
        this.onTerritoryClick(territory);
      });
    } else {
      // Locked indicator
      const lockIcon = this.add.text(0, 40, '🔒', {
        fontSize: '32px'
      }).setOrigin(0.5);
      container.add(lockIcon);

      const reqText = this.add.text(0, 72, `Requer ${territory.reputationRequired} reputação`, {
        fontSize: '11px',
        color: '#6b7280',
        fontFamily: 'Arial, sans-serif'
      }).setOrigin(0.5);
      container.add(reqText);
    }
  }

  private showTooltip(territory: Territory): void {
    this.hideTooltip(); // Remove previous tooltip

    const tooltipWidth = 240;
    const tooltipHeight = 140;
    const tooltipX = territory.x > 600 ? territory.x - 260 : territory.x + 260;
    const tooltipY = territory.y;

    const tooltip = this.add.container(tooltipX, tooltipY);

    // Background
    const bg = this.add.rectangle(0, 0, tooltipWidth, tooltipHeight, 0x1a1a2e, 0.98);
    bg.setStrokeStyle(3, territory.color);
    tooltip.add(bg);

    // Title
    const title = this.add.text(0, -50, `${territory.emoji} ${territory.name}`, {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    tooltip.add(title);

    // Info lines
    const infoLines = [
      `📊 Nível: ${territory.level}`,
      `👥 Leads: ${territory.leadsCount}`,
      `🎯 Exploração: ${territory.explorationProgress}%`,
      `👑 Boss: ${territory.bossDefeated ? 'Derrotado ✅' : 'Ativo ⚔️'}`,
      ``,
      `💡 Clique para explorar`
    ];

    infoLines.forEach((line, index) => {
      const text = this.add.text(0, -20 + index * 20, line, {
        fontSize: '12px',
        color: index === infoLines.length - 1 ? COLORS.warning : COLORS.textMuted,
        fontFamily: 'Arial, sans-serif'
      }).setOrigin(0.5);
      tooltip.add(text);
    });

    this.currentHoverTooltip = tooltip;
  }

  private hideTooltip(): void {
    if (this.currentHoverTooltip) {
      this.currentHoverTooltip.destroy();
      this.currentHoverTooltip = null;
    }
  }

  private onTerritoryClick(territory: Territory): void {
    console.log(`🎮 [WorldMapScene] Entering territory: ${territory.name}`);
    this.hideTooltip();

    // Launch TerritoryDetailScene for all territories
    this.scene.pause(SCENE_KEYS.WORLD_MAP);
    this.scene.launch(SCENE_KEYS.TERRITORY_DETAIL, territory);
  }

  private createInstructions(width: number, height: number): void {
    const instructions = this.add.text(width / 2, height - 40,
      '🎯 Clique em um território desbloqueado para explorar | 💰 Ganhe reputação para desbloquear novos territórios', {
      fontSize: '13px',
      color: COLORS.textMuted,
      fontFamily: 'Arial, sans-serif',
      align: 'center'
    });
    instructions.setOrigin(0.5);
  }

  private handleTerritoryUnlocked(data: { territoryId: string }): void {
    console.log(`🔓 [WorldMapScene] Territory unlocked: ${data.territoryId}`);

    // Find and update territory
    const territory = this.territories.find(t => t.id === data.territoryId);
    if (territory) {
      territory.unlocked = true;

      // Re-render the map
      this.scene.restart();
    }
  }

  shutdown(): void {
    this.registry.events.off('territory-unlocked', this.handleTerritoryUnlocked, this);
  }
}
