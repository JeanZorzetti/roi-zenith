import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../config/gameConfig';
import { initializeStarterInventory, initializeQuestSystem } from '../data/gameDataInitializer';
import { assetManager } from '../systems/AssetManager';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.BOOT });
  }

  preload() {
    // Loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading Market Research Quest...',
      style: {
        font: '20px monospace',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    // Update loading bar
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x3b82f6, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
      percentText.setText(`${Math.floor(value * 100)}%`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    // Load assets here (placeholder for now)
    // this.load.image('logo', '/assets/logo.png');
    // this.load.audio('coin', '/assets/sounds/coin.mp3');
  }

  create() {
    console.log('🎮 [BootScene] Boot complete, initializing game data...');

    // Initialize game data (only if not already initialized)
    const alreadyInitialized = this.registry.get('gameDataInitialized');
    if (!alreadyInitialized) {
      // Get player level from registry (default to 1)
      const playerLevel = this.registry.get('playerLevel') || 1;

      // Initialize systems with data from databases
      initializeStarterInventory();
      initializeQuestSystem(playerLevel);

      // Initialize asset manager and generate all sprites
      console.log('🎨 [BootScene] Generating visual assets...');
      assetManager.initialize(this);
      console.log('✅ [BootScene] Visual assets generated');

      this.registry.set('gameDataInitialized', true);
      console.log('✅ [BootScene] Game data initialized');
    } else {
      console.log('⏭️ [BootScene] Game data already initialized, skipping');
    }

    console.log('🎮 [BootScene] Starting MenuScene...');
    this.scene.start(SCENE_KEYS.MENU);
  }
}
