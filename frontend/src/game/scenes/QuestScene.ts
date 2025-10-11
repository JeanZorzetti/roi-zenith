// ============= QUEST SCENE =============
// UI for viewing and managing active quests

import Phaser from 'phaser';
import { GAME_CONFIG, COLORS, SCENE_KEYS } from '../config/gameConfig';
import questSystem, { Quest, QuestType } from '../systems/QuestSystem';

export class QuestScene extends Phaser.Scene {
  private selectedTab: QuestType = 'main';
  private questCards: Phaser.GameObjects.Container[] = [];

  constructor() {
    super({ key: SCENE_KEYS.QUESTS });
  }

  create(): void {
    const { width, height } = GAME_CONFIG;

    // Background
    this.add.rectangle(0, 0, width, height, COLORS.background).setOrigin(0);

    // Title
    this.add
      .text(width / 2, 40, '📜 QUESTS', {
        fontSize: '32px',
        color: COLORS.textLight,
        fontFamily: 'Arial Black',
      })
      .setOrigin(0.5);

    // Tabs
    this.createTabs();

    // Quest list
    this.createQuestList();

    // Back button
    this.createBackButton();

    // Render initial quests
    this.refreshQuestList();
  }

  /**
   * Create quest type tabs
   */
  private createTabs(): void {
    const tabs: Array<{ type: QuestType; label: string; x: number }> = [
      { type: 'main', label: '📖 Main', x: 300 },
      { type: 'daily', label: '📅 Daily', x: 600 },
      { type: 'weekly', label: '🎯 Weekly', x: 900 },
    ];

    tabs.forEach(tab => {
      const isSelected = this.selectedTab === tab.type;
      const button = this.add.rectangle(tab.x, 120, 180, 50, isSelected ? COLORS.accent : COLORS.panelDark, 0.9);
      button.setStrokeStyle(2, isSelected ? COLORS.accent : COLORS.border);
      button.setInteractive({ useHandCursor: true });

      const buttonText = this.add.text(tab.x, 120, tab.label, {
        fontSize: '16px',
        color: isSelected ? COLORS.textLight : COLORS.textDim,
        fontFamily: 'Arial',
      }).setOrigin(0.5);

      button.on('pointerdown', () => {
        this.selectedTab = tab.type;
        this.scene.restart(); // Refresh scene
      });

      button.on('pointerover', () => {
        if (!isSelected) {
          button.setFillStyle(COLORS.panelLight);
        }
      });

      button.on('pointerout', () => {
        if (!isSelected) {
          button.setFillStyle(COLORS.panelDark, 0.9);
        }
      });
    });
  }

  /**
   * Create quest list area
   */
  private createQuestList(): void {
    const listX = 100;
    const listY = 200;
    const listWidth = 1000;
    const listHeight = 520;

    // Panel background
    const panel = this.add.rectangle(listX, listY, listWidth, listHeight, COLORS.panelDark, 0.9);
    panel.setOrigin(0);
    panel.setStrokeStyle(2, COLORS.accent);

    // Title
    const tabTitles: Record<QuestType, string> = {
      main: 'Main Story Quests',
      daily: 'Daily Quests (Reset at 00:00)',
      weekly: 'Weekly Challenges (Reset Monday)',
    };

    this.add
      .text(listX + listWidth / 2, listY + 20, tabTitles[this.selectedTab], {
        fontSize: '18px',
        color: COLORS.accent,
        fontFamily: 'Arial',
      })
      .setOrigin(0.5);
  }

  /**
   * Refresh quest list display
   */
  private refreshQuestList(): void {
    // Clear existing quest cards
    this.questCards.forEach(card => card.destroy());
    this.questCards = [];

    // Get quests by selected tab
    const quests = questSystem.getQuestsByType(this.selectedTab);

    const startX = 120;
    const startY = 260;
    const cardWidth = 960;
    const cardHeight = 140;
    const gap = 20;

    quests.forEach((quest, index) => {
      const y = startY + index * (cardHeight + gap);

      // Only show first 3 quests (scrolling not implemented)
      if (index < 3) {
        this.createQuestCard(startX, y, cardWidth, cardHeight, quest);
      }
    });

    // No quests message
    if (quests.length === 0) {
      this.add
        .text(GAME_CONFIG.width / 2, 400, 'No quests available', {
          fontSize: '18px',
          color: COLORS.textDim,
          fontFamily: 'Arial',
        })
        .setOrigin(0.5);
    }
  }

  /**
   * Create quest card
   */
  private createQuestCard(x: number, y: number, width: number, height: number, quest: Quest): void {
    const container = this.add.container(x, y);

    // Card background
    const statusColor = this.getStatusColor(quest.status);
    const cardBg = this.add.rectangle(0, 0, width, height, COLORS.panelLight, 0.9);
    cardBg.setOrigin(0);
    cardBg.setStrokeStyle(3, parseInt(statusColor.replace('#', '0x')));
    container.add(cardBg);

    // Quest name
    const nameText = this.add.text(20, 15, quest.name, {
      fontSize: '18px',
      color: statusColor,
      fontFamily: 'Arial',
      fontStyle: 'bold',
    });
    container.add(nameText);

    // Quest status badge
    const statusBadge = this.add.text(width - 20, 15, quest.status.toUpperCase(), {
      fontSize: '12px',
      color: statusColor,
      fontFamily: 'Arial',
      backgroundColor: COLORS.panelDark,
      padding: { x: 8, y: 4 },
    }).setOrigin(1, 0);
    container.add(statusBadge);

    // Quest description
    const descText = this.add.text(20, 45, quest.description, {
      fontSize: '13px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
      wordWrap: { width: width - 40 },
    });
    container.add(descText);

    // Objectives
    quest.objectives.forEach((objective, i) => {
      const objY = 75 + i * 20;
      const checkmark = objective.completed ? '✅' : '⬜';
      const objText = this.add.text(
        40,
        objY,
        `${checkmark} ${objective.description} (${objective.current}/${objective.target})`,
        {
          fontSize: '12px',
          color: objective.completed ? COLORS.success : COLORS.textDim,
          fontFamily: 'Arial',
        }
      );
      container.add(objText);
    });

    // Rewards preview (bottom right)
    const rewardsText = this.getRewardsText(quest);
    const rewardsDisplay = this.add.text(width - 20, height - 15, rewardsText, {
      fontSize: '12px',
      color: COLORS.warning,
      fontFamily: 'Arial',
    }).setOrigin(1, 1);
    container.add(rewardsDisplay);

    // Claim button (if completed)
    if (quest.status === 'completed') {
      const claimBtn = this.add.rectangle(width - 120, height - 15, 100, 30, COLORS.success, 0.9);
      claimBtn.setOrigin(1, 1);
      claimBtn.setStrokeStyle(2, COLORS.border);
      claimBtn.setInteractive({ useHandCursor: true });

      const claimText = this.add.text(width - 120, height - 15, 'Claim', {
        fontSize: '14px',
        color: COLORS.textLight,
        fontFamily: 'Arial',
      }).setOrigin(0.5, 0.5);

      claimBtn.on('pointerdown', () => {
        this.claimQuest(quest.id);
      });

      claimBtn.on('pointerover', () => {
        claimBtn.setFillStyle(COLORS.success, 1);
      });

      claimBtn.on('pointerout', () => {
        claimBtn.setFillStyle(COLORS.success, 0.9);
      });

      container.add([claimBtn, claimText]);
    }

    this.questCards.push(container);
  }

  /**
   * Claim quest rewards
   */
  private claimQuest(questId: string): void {
    const rewards = questSystem.claimRewards(questId);
    if (rewards) {
      console.log('Quest rewards claimed:', rewards);
      // TODO: Add rewards to player resources
      // TODO: Show claim animation
      this.refreshQuestList();
    }
  }

  /**
   * Get status color
   */
  private getStatusColor(status: Quest['status']): string {
    const colors: Record<Quest['status'], string> = {
      locked: COLORS.textDim,
      active: COLORS.primary,
      completed: COLORS.success,
      claimed: COLORS.textMuted,
    };
    return colors[status];
  }

  /**
   * Get rewards text
   */
  private getRewardsText(quest: Quest): string {
    const parts: string[] = [];
    if (quest.rewards.experience) parts.push(`+${quest.rewards.experience} XP`);
    if (quest.rewards.coins) parts.push(`+${quest.rewards.coins} 💰`);
    if (quest.rewards.gems) parts.push(`+${quest.rewards.gems} 💎`);
    if (quest.rewards.items && quest.rewards.items.length > 0) {
      parts.push(`+${quest.rewards.items.length} Items`);
    }
    return `Rewards: ${parts.join(' • ')}`;
  }

  /**
   * Create back button
   */
  private createBackButton(): void {
    const button = this.add.rectangle(100, 750, 180, 40, COLORS.accent, 0.9);
    button.setStrokeStyle(2, COLORS.border);
    button.setInteractive({ useHandCursor: true });

    const buttonText = this.add.text(100, 750, '← Voltar', {
      fontSize: '18px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.WORLD_MAP);
    });

    button.on('pointerover', () => {
      button.setFillStyle(COLORS.accent, 1);
    });

    button.on('pointerout', () => {
      button.setFillStyle(COLORS.accent, 0.9);
    });
  }
}
