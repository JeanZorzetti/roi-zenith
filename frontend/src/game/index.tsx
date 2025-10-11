import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { WorldMapScene } from './scenes/WorldMapScene';
import { TerritoryDetailScene } from './scenes/TerritoryDetailScene';
import { UIScene } from './scenes/UIScene';
import { BattleScene } from './scenes/BattleScene';
import { InventoryScene } from './scenes/InventoryScene';
import { GAME_CONFIG } from './config/gameConfig';

export class MarketResearchGame {
  private game: Phaser.Game | null = null;

  constructor(parentElement: string | HTMLElement) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: GAME_CONFIG.width,
      height: GAME_CONFIG.height,
      backgroundColor: GAME_CONFIG.backgroundColor,
      parent: parentElement,
      pixelArt: GAME_CONFIG.pixelArt,
      physics: GAME_CONFIG.physics,
      scene: [
        BootScene,
        MenuScene,
        WorldMapScene,
        TerritoryDetailScene,
        BattleScene,
        InventoryScene,
        UIScene
      ],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    this.game = new Phaser.Game(config);
    console.log('🎮 Market Research Quest initialized');
  }

  destroy() {
    if (this.game) {
      this.game.destroy(true);
      this.game = null;
      console.log('🎮 Game destroyed');
    }
  }

  getGame(): Phaser.Game | null {
    return this.game;
  }

  // Helper to get UI scene for external updates
  getUIScene(): UIScene | null {
    if (this.game) {
      return this.game.scene.getScene('UIScene') as UIScene;
    }
    return null;
  }
}

export default MarketResearchGame;
