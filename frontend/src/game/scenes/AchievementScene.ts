import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../config/gameConfig';
import achievementSystem from '../systems/AchievementSystem';
import type { Achievement, AchievementCategory } from '../systems/AchievementSystem';

export class AchievementScene extends Phaser.Scene {
  private selectedCategory: AchievementCategory | 'all' = 'all';
  private scrollY: number = 0;
  private achievementCards: Phaser.GameObjects.Container[] = [];

  constructor() {
    super({ key: SCENE_KEYS.ACHIEVEMENTS });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(0, 0, width, height, 0x0f0f1e).setOrigin(0);

    // Title bar
    const titleBar = this.add.rectangle(width / 2, 50, width - 40, 70, 0x1a1a2e, 0.98).setOrigin(0.5);
    titleBar.setStrokeStyle(3, 0xfdcb6e);

    this.add.text(width / 2, 50, '🏆 Conquistas', {
      fontSize: '28px',
      color: '#fdcb6e',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Close button
    const closeBtn = this.add.text(width - 60, 50, '✕', {
      fontSize: '32px',
      color: COLORS.text
    }).setOrigin(0.5);

    closeBtn.setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => {
      this.scene.stop(SCENE_KEYS.ACHIEVEMENTS);
      this.scene.resume(SCENE_KEYS.MENU);
    });

    closeBtn.on('pointerover', () => closeBtn.setColor(COLORS.danger));
    closeBtn.on('pointerout', () => closeBtn.setColor(COLORS.text));

    // Completion stats
    const completion = achievementSystem.getCompletionPercentage();
    const unlocked = achievementSystem.getUnlockedAchievements().length;
    const total = achievementSystem.getAllAchievements().length;

    this.add.text(width / 2, 110, `${unlocked}/${total} Desbloqueadas (${completion.toFixed(0)}%)`, {
      fontSize: '16px',
      color: COLORS.text
    }).setOrigin(0.5);

    // Progress bar
    const progressBarWidth = width - 100;
    const progressBg = this.add.rectangle(width / 2, 140, progressBarWidth, 20, 0x475569, 1);
    progressBg.setStrokeStyle(2, 0x6c5ce7);

    const progressFill = this.add.rectangle(
      width / 2 - progressBarWidth / 2,
      140,
      progressBarWidth * (completion / 100),
      20,
      0xfdcb6e,
      1
    ).setOrigin(0, 0.5);

    // Category filters
    this.createCategoryFilters(width, 180);

    // Achievement list
    this.createAchievementList(width, 240);
  }

  private createCategoryFilters(width: number, y: number): void {
    const categories: Array<{ id: AchievementCategory | 'all', name: string, icon: string }> = [
      { id: 'all', name: 'Todas', icon: '🏆' },
      { id: 'combat', name: 'Combate', icon: '⚔️' },
      { id: 'exploration', name: 'Exploração', icon: '🗺️' },
      { id: 'collection', name: 'Coleção', icon: '📦' },
      { id: 'progression', name: 'Progresso', icon: '⭐' },
      { id: 'social', name: 'Social', icon: '👥' },
      { id: 'mastery', name: 'Maestria', icon: '🎯' }
    ];

    const buttonWidth = 90;
    const spacing = 10;
    const totalWidth = (buttonWidth + spacing) * categories.length - spacing;
    const startX = (width - totalWidth) / 2;

    categories.forEach((cat, index) => {
      const x = startX + (buttonWidth + spacing) * index + buttonWidth / 2;
      const isSelected = this.selectedCategory === cat.id;

      const btn = this.add.rectangle(x, y, buttonWidth, 40,
        isSelected ? 0x6c5ce7 : 0x475569, 1);
      btn.setStrokeStyle(2, isSelected ? 0x8b7ce7 : 0x5a6472);

      const text = this.add.text(x, y, `${cat.icon}`, {
        fontSize: '20px'
      }).setOrigin(0.5);

      btn.setInteractive({ useHandCursor: true });
      btn.on('pointerdown', () => {
        this.selectedCategory = cat.id;
        this.scene.restart();
      });

      btn.on('pointerover', () => {
        if (!isSelected) btn.setFillStyle(0x5a6472);
      });

      btn.on('pointerout', () => {
        if (!isSelected) btn.setFillStyle(0x475569);
      });
    });
  }

  private createAchievementList(width: number, startY: number): void {
    let achievements = achievementSystem.getAllAchievements();

    // Filter by category
    if (this.selectedCategory !== 'all') {
      achievements = achievementSystem.getAchievementsByCategory(this.selectedCategory);
    }

    // Sort: unlocked first, then by requirement
    achievements.sort((a, b) => {
      if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
      return a.requirement - b.requirement;
    });

    const cardWidth = width - 60;
    const cardHeight = 100;
    const spacing = 15;

    achievements.forEach((achievement, index) => {
      const y = startY + (cardHeight + spacing) * index;
      const card = this.createAchievementCard(achievement, width / 2, y, cardWidth, cardHeight);
      this.achievementCards.push(card);
    });
  }

  private createAchievementCard(
    achievement: Achievement,
    x: number,
    y: number,
    width: number,
    height: number
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    const isUnlocked = achievement.unlocked;
    const isHidden = achievement.hidden && !isUnlocked;

    // Background
    const bg = this.add.rectangle(0, 0, width, height,
      isUnlocked ? 0x2d2d44 : 0x1a1a2e, 1);
    bg.setStrokeStyle(2, isUnlocked ? 0xfdcb6e : 0x475569);

    // Icon
    const icon = this.add.text(-width / 2 + 40, 0,
      isHidden ? '❓' : achievement.icon, {
      fontSize: '48px',
      alpha: isUnlocked ? 1 : 0.4
    }).setOrigin(0.5);

    // Name
    const name = this.add.text(-width / 2 + 90, -20,
      isHidden ? '???' : achievement.name, {
      fontSize: '18px',
      color: isUnlocked ? '#fdcb6e' : '#94a3b8',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    // Description
    const description = this.add.text(-width / 2 + 90, 10,
      isHidden ? 'Conquista Secreta' : achievement.description, {
      fontSize: '14px',
      color: isUnlocked ? '#ffffff' : '#64748b',
      wordWrap: { width: width - 280 }
    }).setOrigin(0, 0.5);

    // Progress bar (if not unlocked)
    if (!isUnlocked && !isHidden) {
      const progressPercent = (achievement.current / achievement.requirement) * 100;
      const progressText = this.add.text(width / 2 - 20, -30,
        `${achievement.current}/${achievement.requirement}`, {
        fontSize: '12px',
        color: '#94a3b8'
      }).setOrigin(1, 0.5);

      const progressBarWidth = 150;
      const progressBg = this.add.rectangle(width / 2 - 95, -10, progressBarWidth, 8, 0x475569, 1);

      const progressFill = this.add.rectangle(
        width / 2 - 95 - progressBarWidth / 2,
        -10,
        progressBarWidth * (progressPercent / 100),
        8,
        0x6c5ce7,
        1
      ).setOrigin(0, 0.5);

      container.add([progressText, progressBg, progressFill]);
    }

    // Unlocked date (if unlocked)
    if (isUnlocked && achievement.unlockedAt) {
      const date = new Date(achievement.unlockedAt);
      const dateText = this.add.text(width / 2 - 20, -30,
        `✅ ${date.toLocaleDateString('pt-BR')}`, {
        fontSize: '12px',
        color: '#2ecc71'
      }).setOrigin(1, 0.5);

      container.add(dateText);
    }

    // Rewards
    if (achievement.reward && !isHidden) {
      const rewards: string[] = [];
      if (achievement.reward.xp) rewards.push(`${achievement.reward.xp} XP`);
      if (achievement.reward.coins) rewards.push(`${achievement.reward.coins} 💰`);
      if (achievement.reward.gems) rewards.push(`${achievement.reward.gems} 💎`);

      const rewardText = this.add.text(-width / 2 + 90, 35,
        `Recompensa: ${rewards.join(' | ')}`, {
        fontSize: '12px',
        color: isUnlocked ? '#2ecc71' : '#64748b'
      }).setOrigin(0, 0.5);

      container.add(rewardText);
    }

    // Add shine effect for unlocked achievements
    if (isUnlocked) {
      this.tweens.add({
        targets: icon,
        alpha: 0.7,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    container.add([bg, icon, name, description]);

    return container;
  }
}
