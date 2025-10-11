import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../config/gameConfig';

interface GameState {
  coins: number;
  gems: number;
  energy: number;
  maxEnergy: number;
  experience: number;
  experienceToNextLevel: number;
  level: number;
}

export class UIScene extends Phaser.Scene {
  private coinsText!: Phaser.GameObjects.Text;
  private gemsText!: Phaser.GameObjects.Text;
  private energyText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;
  private xpBar!: Phaser.GameObjects.Graphics;
  private energyBar!: Phaser.GameObjects.Graphics;

  private gameState: GameState = {
    coins: 0,
    gems: 0,
    energy: 50,
    maxEnergy: 50,
    experience: 0,
    experienceToNextLevel: 100,
    level: 1
  };

  constructor() {
    super({ key: SCENE_KEYS.UI });
  }

  create() {
    const width = this.cameras.main.width;

    // Background panel
    const panel = this.add.rectangle(0, 0, width, 80, 0x16213e, 0.95);
    panel.setOrigin(0, 0);
    panel.setDepth(1000);

    // Resources section (top-left)
    const resourcesX = 20;
    const resourcesY = 15;

    // Coins
    const coinsIcon = this.add.text(resourcesX, resourcesY, '💰', {
      font: '20px monospace'
    });
    coinsIcon.setDepth(1001);

    this.coinsText = this.add.text(resourcesX + 30, resourcesY, '0', {
      font: 'bold 16px monospace',
      color: '#fbbf24'
    });
    this.coinsText.setDepth(1001);

    // Gems
    const gemsIcon = this.add.text(resourcesX + 120, resourcesY, '💎', {
      font: '20px monospace'
    });
    gemsIcon.setDepth(1001);

    this.gemsText = this.add.text(resourcesX + 150, resourcesY, '0', {
      font: 'bold 16px monospace',
      color: '#a78bfa'
    });
    this.gemsText.setDepth(1001);

    // Energy
    const energyIcon = this.add.text(resourcesX + 240, resourcesY, '⚡', {
      font: '20px monospace'
    });
    energyIcon.setDepth(1001);

    this.energyText = this.add.text(resourcesX + 270, resourcesY, '50/50', {
      font: 'bold 16px monospace',
      color: '#60a5fa'
    });
    this.energyText.setDepth(1001);

    // Level section (top-right)
    const levelX = width - 120;
    const levelY = 15;

    const levelLabel = this.add.text(levelX, levelY, 'LEVEL', {
      font: '12px monospace',
      color: '#9ca3af'
    });
    levelLabel.setDepth(1001);

    this.levelText = this.add.text(levelX + 60, levelY - 3, '1', {
      font: 'bold 20px monospace',
      color: '#ffffff'
    });
    this.levelText.setDepth(1001);

    // XP Bar
    const xpBarX = 20;
    const xpBarY = 50;
    const xpBarWidth = width - 40;
    const xpBarHeight = 8;

    // XP Bar background
    const xpBarBg = this.add.rectangle(xpBarX, xpBarY, xpBarWidth, xpBarHeight, 0x374151);
    xpBarBg.setOrigin(0, 0);
    xpBarBg.setDepth(1001);

    // XP Bar fill
    this.xpBar = this.add.graphics();
    this.xpBar.setDepth(1002);

    // XP Text
    const xpText = this.add.text(xpBarX + 5, xpBarY - 15, 'XP: 0 / 100', {
      font: '12px monospace',
      color: '#9ca3af'
    });
    xpText.setDepth(1001);

    // Energy Bar (small, below resources)
    const energyBarX = resourcesX + 270;
    const energyBarY = resourcesY + 25;
    const energyBarWidth = 80;
    const energyBarHeight = 6;

    const energyBarBg = this.add.rectangle(energyBarX, energyBarY, energyBarWidth, energyBarHeight, 0x374151);
    energyBarBg.setOrigin(0, 0);
    energyBarBg.setDepth(1001);

    this.energyBar = this.add.graphics();
    this.energyBar.setDepth(1002);

    // Initial update
    this.updateUI();

    // Listen for game state updates
    this.events.on('update-game-state', this.onGameStateUpdate, this);
  }

  private onGameStateUpdate(newState: Partial<GameState>) {
    this.gameState = { ...this.gameState, ...newState };
    this.updateUI();
  }

  private updateUI() {
    // Update text
    this.coinsText.setText(this.gameState.coins.toString());
    this.gemsText.setText(this.gameState.gems.toString());
    this.energyText.setText(`${this.gameState.energy}/${this.gameState.maxEnergy}`);
    this.levelText.setText(this.gameState.level.toString());

    // Update XP bar
    const xpPercent = this.gameState.experience / this.gameState.experienceToNextLevel;
    const xpBarWidth = (this.cameras.main.width - 40) * xpPercent;

    this.xpBar.clear();
    this.xpBar.fillStyle(0x8b5cf6, 1);
    this.xpBar.fillRect(20, 50, xpBarWidth, 8);

    // Update Energy bar
    const energyPercent = this.gameState.energy / this.gameState.maxEnergy;
    const energyBarWidth = 80 * energyPercent;

    this.energyBar.clear();
    this.energyBar.fillStyle(0x60a5fa, 1);
    this.energyBar.fillRect(290, 40, energyBarWidth, 6);
  }

  // Public method to update game state from outside
  public updateGameState(newState: Partial<GameState>) {
    this.events.emit('update-game-state', newState);
  }
}
