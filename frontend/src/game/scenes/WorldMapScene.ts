import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../config/gameConfig';

export class WorldMapScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.WORLD_MAP });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Title
    const title = this.add.text(width / 2, 120, 'MARKET MAP', {
      font: 'bold 32px monospace',
      color: '#3b82f6'
    });
    title.setOrigin(0.5);

    // Placeholder territories (simple boxes for now)
    const territories = [
      { name: '🏪 VAREJO', x: 200, y: 250, unlocked: true },
      { name: '🏭 INDÚSTRIA', x: 400, y: 250, unlocked: false },
      { name: '💼 SERVIÇOS', x: 600, y: 250, unlocked: false },
      { name: '🏥 SAÚDE', x: 200, y: 400, unlocked: false },
      { name: '🏢 CORPORATIVO', x: 400, y: 400, unlocked: false },
      { name: '🦄 STARTUPS', x: 600, y: 400, unlocked: false }
    ];

    territories.forEach(territory => {
      const color = territory.unlocked ? 0x10b981 : 0x374151;

      // Territory box
      const box = this.add.rectangle(territory.x, territory.y, 150, 80, color, 0.3);
      box.setStrokeStyle(2, territory.unlocked ? 0x10b981 : 0x6b7280);

      // Territory name
      const name = this.add.text(territory.x, territory.y, territory.name, {
        font: '14px monospace',
        color: territory.unlocked ? '#ffffff' : '#6b7280',
        align: 'center'
      });
      name.setOrigin(0.5);

      if (territory.unlocked) {
        box.setInteractive({ useHandCursor: true });

        box.on('pointerover', () => {
          box.setFillStyle(0x10b981, 0.5);
        });

        box.on('pointerout', () => {
          box.setFillStyle(0x10b981, 0.3);
        });

        box.on('pointerdown', () => {
          console.log(`🎮 [WorldMapScene] Entering territory: ${territory.name}`);
          // TODO: Open territory detail view or start exploration
        });
      }
    });

    // Instructions
    const instructions = this.add.text(width / 2, height - 30,
      '🎯 Clique em um território desbloqueado para explorar', {
      font: '14px monospace',
      color: '#9ca3af'
    });
    instructions.setOrigin(0.5);
  }
}
