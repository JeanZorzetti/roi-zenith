import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../config/gameConfig';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.MENU });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Title
    const title = this.add.text(width / 2, height / 3, 'MARKET RESEARCH\nQUEST', {
      font: 'bold 40px monospace',
      color: '#3b82f6',
      align: 'center'
    });
    title.setOrigin(0.5);

    // Subtitle
    const subtitle = this.add.text(width / 2, height / 3 + 80, 'Descubra as dores do mercado', {
      font: '18px monospace',
      color: '#9ca3af',
      align: 'center'
    });
    subtitle.setOrigin(0.5);

    // Start button
    const startButton = this.add.text(width / 2, height / 2 + 50, '▶ START GAME', {
      font: 'bold 24px monospace',
      color: '#10b981',
      backgroundColor: '#16213e',
      padding: { x: 20, y: 10 }
    });
    startButton.setOrigin(0.5);
    startButton.setInteractive({ useHandCursor: true });

    startButton.on('pointerover', () => {
      startButton.setStyle({ color: '#ffffff', backgroundColor: '#10b981' });
    });

    startButton.on('pointerout', () => {
      startButton.setStyle({ color: '#10b981', backgroundColor: '#16213e' });
    });

    startButton.on('pointerdown', () => {
      console.log('🎮 [MenuScene] Starting World Map...');
      this.scene.start(SCENE_KEYS.WORLD_MAP);
      this.scene.launch(SCENE_KEYS.UI); // Launch UI overlay
    });

    // Instructions
    const instructions = this.add.text(width / 2, height - 100,
      'Conecte ações do CRM com progresso no jogo\n' +
      'Adicione contatos, realize entrevistas, descubra dores!', {
      font: '14px monospace',
      color: '#6b7280',
      align: 'center'
    });
    instructions.setOrigin(0.5);

    // Version
    const version = this.add.text(width - 10, height - 10, 'v0.1.0 - MVP', {
      font: '12px monospace',
      color: '#4b5563'
    });
    version.setOrigin(1, 1);
  }
}
