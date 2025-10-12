// ============= ASSET MANAGER =============
// Pre-generates and caches all visual sprites for the game

import { SpriteGenerator } from './SpriteGenerator';
import { ITEM_DATABASE } from '../data/itemDatabase';

export class AssetManager {
  private static instance: AssetManager;
  private scene?: Phaser.Scene;
  private sprites: Map<string, Phaser.GameObjects.Container> = new Map();
  private textures: Map<string, Phaser.GameObjects.RenderTexture> = new Map();

  private constructor() {}

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  /**
   * Initialize asset manager with scene
   */
  public initialize(scene: Phaser.Scene): void {
    this.scene = scene;
    console.log('🎨 [AssetManager] Initializing asset generation...');
    this.generateAllAssets();
  }

  /**
   * Generate all game assets
   */
  private generateAllAssets(): void {
    if (!this.scene) return;

    console.log('🎨 [AssetManager] Generating player sprite...');
    this.generatePlayerSprites();

    console.log('🎨 [AssetManager] Generating NPC sprites...');
    this.generateNPCSprites();

    console.log('🎨 [AssetManager] Generating item sprites...');
    this.generateItemSprites();

    console.log('🎨 [AssetManager] Generating UI elements...');
    this.generateUIElements();

    console.log('🎨 [AssetManager] Generating tilesets...');
    this.generateTilesets();

    console.log(`✅ [AssetManager] Generated ${this.sprites.size} sprites and ${this.textures.size} textures`);
  }

  /**
   * Generate player character sprites
   */
  private generatePlayerSprites(): void {
    if (!this.scene) return;

    // Main player sprite
    const playerSprite = SpriteGenerator.generatePlayerSprite(this.scene, 64);
    this.sprites.set('player_idle', playerSprite);

    // Clone for walk animation variant
    const playerWalk = SpriteGenerator.generatePlayerSprite(this.scene, 64);
    this.sprites.set('player_walk', playerWalk);

    // Clone for attack animation variant
    const playerAttack = SpriteGenerator.generatePlayerSprite(this.scene, 64);
    this.sprites.set('player_attack', playerAttack);
  }

  /**
   * Generate NPC lead sprites
   */
  private generateNPCSprites(): void {
    if (!this.scene) return;

    const npcStyles: Array<{ id: string, style: 'business' | 'tech' | 'creative' | 'corporate' | 'startup' }> = [
      { id: 'npc_business_1', style: 'business' },
      { id: 'npc_business_2', style: 'business' },
      { id: 'npc_tech_1', style: 'tech' },
      { id: 'npc_tech_2', style: 'tech' },
      { id: 'npc_tech_3', style: 'tech' },
      { id: 'npc_creative_1', style: 'creative' },
      { id: 'npc_creative_2', style: 'creative' },
      { id: 'npc_corporate_1', style: 'corporate' },
      { id: 'npc_corporate_2', style: 'corporate' },
      { id: 'npc_startup_1', style: 'startup' },
      { id: 'npc_startup_2', style: 'startup' },
      { id: 'npc_startup_3', style: 'startup' }
    ];

    npcStyles.forEach((npc, index) => {
      const sprite = SpriteGenerator.generateNPCSprite(this.scene!, npc.style, index * 100, 64);
      this.sprites.set(npc.id, sprite);
    });

    console.log(`  ✅ Generated ${npcStyles.length} NPC sprites`);
  }

  /**
   * Generate item sprites from database
   */
  private generateItemSprites(): void {
    if (!this.scene) return;

    let count = 0;
    ITEM_DATABASE.forEach(item => {
      // Determine item type based on slot
      let itemType: 'weapon' | 'armor' | 'accessory' | 'consumable' = 'accessory';
      if (item.slot === 'PRIMARY_TOOL') itemType = 'weapon';
      else if (item.slot === 'KNOWLEDGE_BASE' || item.slot === 'COMMUNICATION') itemType = 'armor';
      else itemType = 'accessory';

      const sprite = SpriteGenerator.generateItemSprite(
        this.scene!,
        itemType,
        item.rarity,
        item.icon,
        48
      );

      this.sprites.set(`item_${item.id}`, sprite);
      count++;
    });

    console.log(`  ✅ Generated ${count} item sprites`);
  }

  /**
   * Generate UI element sprites
   */
  private generateUIElements(): void {
    if (!this.scene) return;

    // Buttons
    const buttonSizes = [
      { id: 'button_small', width: 100, height: 35 },
      { id: 'button_medium', width: 150, height: 40 },
      { id: 'button_large', width: 200, height: 50 }
    ];

    buttonSizes.forEach(btn => {
      ['normal', 'primary', 'success', 'danger'].forEach(style => {
        const sprite = SpriteGenerator.generateButtonSprite(
          this.scene!,
          btn.width,
          btn.height,
          0x6c5ce7,
          style as any
        );
        this.sprites.set(`${btn.id}_${style}`, sprite);
      });
    });

    // Panels
    const panelSizes = [
      { id: 'panel_small', width: 300, height: 200 },
      { id: 'panel_medium', width: 500, height: 400 },
      { id: 'panel_large', width: 700, height: 600 }
    ];

    panelSizes.forEach(panel => {
      ['dark', 'light', 'transparent'].forEach(style => {
        const sprite = SpriteGenerator.generatePanelSprite(
          this.scene!,
          panel.width,
          panel.height,
          style as any
        );
        this.sprites.set(`${panel.id}_${style}`, sprite);
      });
    });

    console.log('  ✅ Generated UI element sprites');
  }

  /**
   * Generate tileset textures
   */
  private generateTilesets(): void {
    if (!this.scene) return;

    const tileTypes: Array<'grass' | 'water' | 'stone' | 'office'> = ['grass', 'water', 'stone', 'office'];

    tileTypes.forEach(type => {
      const tileset = SpriteGenerator.generateTileset(this.scene!, 32, type);
      this.textures.set(`tileset_${type}`, tileset);
    });

    console.log('  ✅ Generated tileset textures');
  }

  /**
   * Get sprite by ID
   */
  public getSprite(id: string): Phaser.GameObjects.Container | undefined {
    return this.sprites.get(id);
  }

  /**
   * Get texture by ID
   */
  public getTexture(id: string): Phaser.GameObjects.RenderTexture | undefined {
    return this.textures.get(id);
  }

  /**
   * Clone a sprite (for creating instances)
   */
  public cloneSprite(id: string, x: number = 0, y: number = 0): Phaser.GameObjects.Container | null {
    console.log(`🎨 [AssetManager] Attempting to clone sprite: ${id}`);
    console.log(`🎨 [AssetManager] Available sprites:`, Array.from(this.sprites.keys()));

    const original = this.sprites.get(id);
    if (!original) {
      console.error(`❌ [AssetManager] Sprite "${id}" not found in cache!`);
      return null;
    }
    if (!this.scene) {
      console.error(`❌ [AssetManager] No scene available for cloning!`);
      return null;
    }

    console.log(`✅ [AssetManager] Found original sprite, creating clone at (${x}, ${y})`);
    // Create a new container at position
    const clone = this.scene.add.container(x, y);

    // Clone all children from original
    original.each((child: Phaser.GameObjects.GameObject) => {
      if (child instanceof Phaser.GameObjects.Rectangle) {
        const rect = this.scene!.add.rectangle(
          (child as any).x,
          (child as any).y,
          child.width,
          child.height,
          (child as any).fillColor,
          (child as any).fillAlpha
        );
        if ((child as any).isStroked) {
          rect.setStrokeStyle((child as any).lineWidth, (child as any).strokeColor);
        }
        clone.add(rect);
      } else if (child instanceof Phaser.GameObjects.Circle) {
        const circle = this.scene!.add.circle(
          (child as any).x,
          (child as any).y,
          (child as any).radius,
          (child as any).fillColor,
          (child as any).fillAlpha
        );
        if ((child as any).isStroked) {
          circle.setStrokeStyle((child as any).lineWidth, (child as any).strokeColor);
        }
        clone.add(circle);
      } else if (child instanceof Phaser.GameObjects.Ellipse) {
        const ellipse = this.scene!.add.ellipse(
          (child as any).x,
          (child as any).y,
          child.width,
          child.height,
          (child as any).fillColor,
          (child as any).fillAlpha
        );
        clone.add(ellipse);
      } else if (child instanceof Phaser.GameObjects.Triangle) {
        const triangle = this.scene!.add.triangle(
          (child as any).x,
          (child as any).y,
          (child as any).x1,
          (child as any).y1,
          (child as any).x2,
          (child as any).y2,
          (child as any).x3,
          (child as any).y3,
          (child as any).fillColor
        );
        clone.add(triangle);
      } else if (child instanceof Phaser.GameObjects.Text) {
        const text = this.scene!.add.text(
          (child as any).x,
          (child as any).y,
          (child as any).text,
          (child as any).style
        ).setOrigin((child as any).originX, (child as any).originY);
        clone.add(text);
      } else if (child instanceof Phaser.GameObjects.Arc) {
        const arc = this.scene!.add.arc(
          (child as any).x,
          (child as any).y,
          (child as any).radius,
          (child as any).startAngle,
          (child as any).endAngle,
          (child as any).anticlockwise,
          (child as any).fillColor
        );
        if ((child as any).isStroked) {
          arc.setStrokeStyle((child as any).lineWidth, (child as any).strokeColor);
        }
        clone.add(arc);
      } else if (child instanceof Phaser.GameObjects.Star) {
        const star = this.scene!.add.star(
          (child as any).x,
          (child as any).y,
          (child as any).points,
          (child as any).innerRadius,
          (child as any).outerRadius,
          (child as any).fillColor
        );
        clone.add(star);
      }
    });

    clone.setSize(original.width, original.height);

    console.log(`✅ [AssetManager] Clone created with ${clone.length} children`);
    console.log(`✅ [AssetManager] Clone visible: ${clone.visible}, alpha: ${clone.alpha}, depth: ${clone.depth}`);

    return clone;
  }

  /**
   * Get random NPC sprite ID
   */
  public getRandomNPCId(): string {
    const npcIds = Array.from(this.sprites.keys()).filter(id => id.startsWith('npc_'));
    return npcIds[Math.floor(Math.random() * npcIds.length)];
  }

  /**
   * Get NPC sprite by territory type
   */
  public getNPCByTerritory(territory: string): string {
    const territoryMap: Record<string, string> = {
      varejo: 'npc_business_1',
      industria: 'npc_corporate_1',
      tecnologia: 'npc_tech_1',
      servicos: 'npc_creative_1',
      saude: 'npc_business_2',
      financeiro: 'npc_corporate_2'
    };

    return territoryMap[territory] || this.getRandomNPCId();
  }

  /**
   * Clear all generated assets
   */
  public clear(): void {
    this.sprites.forEach(sprite => sprite.destroy());
    this.textures.forEach(texture => texture.destroy());
    this.sprites.clear();
    this.textures.clear();
    console.log('🎨 [AssetManager] Assets cleared');
  }
}

// Singleton export
export const assetManager = AssetManager.getInstance();

console.log('🎨 Asset Manager loaded');
