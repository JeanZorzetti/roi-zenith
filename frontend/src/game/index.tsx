import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { WorldMapScene } from './scenes/WorldMapScene';
import { TerritoryDetailScene } from './scenes/TerritoryDetailScene';
import { BattleScene } from './scenes/BattleScene';
import { InventoryScene } from './scenes/InventoryScene';
import { QuestScene } from './scenes/QuestScene';
import { PartyScene } from './scenes/PartyScene';
import { SettingsScene } from './scenes/SettingsScene';
import { AchievementScene } from './scenes/AchievementScene';
import { GAME_CONFIG } from './config/gameConfig';

export class MarketResearchGame {
  private game: Phaser.Game | null = null;

  constructor(parentElement: string | HTMLElement) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: '100%',
      height: '100%',
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
        QuestScene,
        PartyScene,
        SettingsScene,
        AchievementScene
        // UIScene removed - using global React HUD instead
      ],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NO_CENTER,
        width: '100%',
        height: '100%'
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
}

export default MarketResearchGame;
