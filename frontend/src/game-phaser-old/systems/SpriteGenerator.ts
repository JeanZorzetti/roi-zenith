// ============= SPRITE GENERATOR SYSTEM =============
// Generates pixel art sprites procedurally for the game

export type SpriteType = 'player' | 'npc' | 'item' | 'ui';
export type NPCStyle = 'business' | 'tech' | 'creative' | 'corporate' | 'startup';
export type ItemType = 'weapon' | 'armor' | 'accessory' | 'consumable';

export interface SpriteConfig {
  width: number;
  height: number;
  colors: string[];
  pattern?: number[][];
}

export class SpriteGenerator {
  /**
   * Generate Player Character sprite
   */
  public static generatePlayerSprite(scene: Phaser.Scene, size: number = 64): Phaser.GameObjects.Container {
    const container = scene.add.container(0, 0);

    // Body (blue suit)
    const body = scene.add.rectangle(0, 8, 32, 40, 0x3b82f6);

    // Head (skin tone)
    const head = scene.add.circle(0, -12, 16, 0xffdbac);

    // Hair (dark)
    const hair = scene.add.ellipse(0, -20, 24, 16, 0x2d2d2d);

    // Eyes
    const leftEye = scene.add.circle(-6, -12, 3, 0x2d2d2d);
    const rightEye = scene.add.circle(6, -12, 3, 0x2d2d2d);

    // Smile
    const smile = scene.add.arc(0, -8, 8, 180, 360, false, 0x000000, 0);
    smile.setStrokeStyle(2, 0x2d2d2d);

    // Arms
    const leftArm = scene.add.rectangle(-16, 4, 8, 24, 0x3b82f6);
    const rightArm = scene.add.rectangle(16, 4, 8, 24, 0x3b82f6);

    // Legs
    const leftLeg = scene.add.rectangle(-8, 32, 12, 20, 0x1e293b);
    const rightLeg = scene.add.rectangle(8, 32, 12, 20, 0x1e293b);

    // Briefcase (item)
    const briefcase = scene.add.rectangle(24, 12, 16, 12, 0x78350f);
    briefcase.setStrokeStyle(2, 0x451a03);

    container.add([
      leftLeg, rightLeg,
      leftArm, rightArm,
      body,
      briefcase,
      head, hair,
      leftEye, rightEye, smile
    ]);

    container.setSize(size, size);
    return container;
  }

  /**
   * Generate NPC Lead sprite
   */
  public static generateNPCSprite(
    scene: Phaser.Scene,
    style: NPCStyle,
    seed: number = 0,
    size: number = 64
  ): Phaser.GameObjects.Container {
    const container = scene.add.container(0, 0);

    // Color schemes for different NPC styles
    const styleColors: Record<NPCStyle, { suit: number, accent: number, hair: number }> = {
      business: { suit: 0x1e293b, accent: 0xe74c3c, hair: 0x6b7280 },
      tech: { suit: 0x2d2d44, accent: 0x6c5ce7, hair: 0x3b82f6 },
      creative: { suit: 0x16a34a, accent: 0xfbbf24, hair: 0xe11d48 },
      corporate: { suit: 0x000000, accent: 0xffffff, hair: 0x4b5563 },
      startup: { suit: 0xf59e0b, accent: 0x10b981, hair: 0x8b5cf6 }
    };

    const colors = styleColors[style];

    // Randomize based on seed
    const random = (min: number, max: number) => {
      const x = Math.sin(seed++) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };

    // Body
    const body = scene.add.rectangle(0, 8, 32, 40, colors.suit);

    // Head
    const skinTones = [0xffdbac, 0xf1c27d, 0xe0ac69, 0xc68642, 0x8d5524];
    const head = scene.add.circle(0, -12, 16, skinTones[random(0, 4)]);

    // Hair style variation
    const hairType = random(0, 3);
    let hair;
    if (hairType === 0) {
      hair = scene.add.ellipse(0, -20, 24, 16, colors.hair); // Short
    } else if (hairType === 1) {
      hair = scene.add.ellipse(0, -22, 28, 20, colors.hair); // Medium
    } else if (hairType === 2) {
      hair = scene.add.rectangle(0, -20, 26, 18, colors.hair); // Flat
    } else {
      hair = scene.add.circle(0, -20, 14, colors.hair); // Bald/short
    }

    // Glasses (50% chance)
    if (random(0, 1) === 1) {
      const glassesLeft = scene.add.circle(-6, -12, 6, 0x000000, 0);
      glassesLeft.setStrokeStyle(2, 0x2d2d2d);
      const glassesRight = scene.add.circle(6, -12, 6, 0x000000, 0);
      glassesRight.setStrokeStyle(2, 0x2d2d2d);
      const glassesBridge = scene.add.line(0, -12, -2, 0, 2, 0, 0x2d2d2d);
      glassesBridge.setLineWidth(2);
      container.add([glassesLeft, glassesRight, glassesBridge]);
    }

    // Eyes
    const leftEye = scene.add.circle(-6, -12, 3, 0x2d2d2d);
    const rightEye = scene.add.circle(6, -12, 3, 0x2d2d2d);

    // Tie
    const tie = scene.add.triangle(0, 0, -4, 0, 4, 0, 0, 24, colors.accent);

    // Arms
    const leftArm = scene.add.rectangle(-16, 4, 8, 24, colors.suit);
    const rightArm = scene.add.rectangle(16, 4, 8, 24, colors.suit);

    // Legs
    const leftLeg = scene.add.rectangle(-8, 32, 12, 20, 0x1e293b);
    const rightLeg = scene.add.rectangle(8, 32, 12, 20, 0x1e293b);

    // Accessory (laptop, phone, or coffee)
    const accessory = random(0, 2);
    if (accessory === 0) {
      // Laptop
      const laptop = scene.add.rectangle(24, 8, 20, 14, 0x94a3b8);
      laptop.setStrokeStyle(2, 0x475569);
      container.add(laptop);
    } else if (accessory === 1) {
      // Phone
      const phone = scene.add.rectangle(20, 0, 10, 16, 0x2d2d2d);
      phone.setStrokeStyle(1, 0x6c5ce7);
      container.add(phone);
    } else {
      // Coffee
      const coffee = scene.add.rectangle(-20, 4, 12, 16, 0x78350f);
      coffee.setStrokeStyle(2, 0x451a03);
      container.add(coffee);
    }

    container.add([
      leftLeg, rightLeg,
      leftArm, rightArm,
      body, tie,
      head, hair,
      leftEye, rightEye
    ]);

    container.setSize(size, size);
    return container;
  }

  /**
   * Generate Item sprite
   */
  public static generateItemSprite(
    scene: Phaser.Scene,
    itemType: ItemType,
    rarity: string,
    icon: string,
    size: number = 48
  ): Phaser.GameObjects.Container {
    const container = scene.add.container(0, 0);

    // Rarity colors
    const rarityColors: Record<string, number> = {
      common: 0x94a3b8,
      uncommon: 0x22c55e,
      rare: 0x3b82f6,
      epic: 0x8b5cf6,
      legendary: 0xf59e0b
    };

    const rarityColor = rarityColors[rarity] || 0x94a3b8;

    // Background glow for rarity
    if (rarity !== 'common') {
      const glow = scene.add.circle(0, 0, size / 2 + 4, rarityColor, 0.3);
      container.add(glow);
    }

    // Item base shape
    let itemShape;
    if (itemType === 'weapon') {
      // Sword/tool shape
      itemShape = scene.add.rectangle(0, 0, 12, 36, rarityColor);
      const handle = scene.add.rectangle(0, 12, 16, 8, 0x78350f);
      container.add([itemShape, handle]);
    } else if (itemType === 'armor') {
      // Shield/armor shape
      itemShape = scene.add.ellipse(0, 0, 32, 36, rarityColor);
      const emblem = scene.add.star(0, 0, 5, 8, 12, 0xfbbf24);
      container.add([itemShape, emblem]);
    } else if (itemType === 'accessory') {
      // Ring/accessory shape
      itemShape = scene.add.circle(0, 0, 16, rarityColor);
      const gem = scene.add.circle(0, -4, 6, 0xfbbf24);
      container.add([itemShape, gem]);
    } else {
      // Generic item
      itemShape = scene.add.rectangle(0, 0, 32, 32, rarityColor);
      container.add(itemShape);
    }

    // Icon text overlay
    const iconText = scene.add.text(0, 0, icon, {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    container.add(iconText);

    // Border
    const border = scene.add.rectangle(0, 0, size - 4, size - 4, 0x000000, 0);
    border.setStrokeStyle(3, rarityColor);
    container.add(border);

    container.setSize(size, size);
    return container;
  }

  /**
   * Generate UI Button sprite
   */
  public static generateButtonSprite(
    scene: Phaser.Scene,
    width: number,
    height: number,
    color: number = 0x6c5ce7,
    style: 'normal' | 'primary' | 'success' | 'danger' = 'normal'
  ): Phaser.GameObjects.Container {
    const container = scene.add.container(0, 0);

    const styleColors: Record<string, { bg: number, border: number, shadow: number }> = {
      normal: { bg: 0x475569, border: 0x6c5ce7, shadow: 0x1e293b },
      primary: { bg: 0x3b82f6, border: 0x60a5fa, shadow: 0x1e40af },
      success: { bg: 0x10b981, border: 0x34d399, shadow: 0x047857 },
      danger: { bg: 0xe74c3c, border: 0xff6b6b, shadow: 0x991b1b }
    };

    const colors = styleColors[style];

    // Shadow
    const shadow = scene.add.rectangle(2, 2, width, height, colors.shadow, 0.5);
    shadow.setOrigin(0.5);

    // Background
    const bg = scene.add.rectangle(0, 0, width, height, colors.bg);
    bg.setOrigin(0.5);

    // Border
    const border = scene.add.rectangle(0, 0, width, height, 0x000000, 0);
    border.setStrokeStyle(3, colors.border);
    border.setOrigin(0.5);

    // Inner highlight
    const highlight = scene.add.rectangle(0, -height / 4, width - 8, 4, 0xffffff, 0.3);
    highlight.setOrigin(0.5);

    container.add([shadow, bg, border, highlight]);
    container.setSize(width, height);

    return container;
  }

  /**
   * Generate UI Panel sprite
   */
  public static generatePanelSprite(
    scene: Phaser.Scene,
    width: number,
    height: number,
    style: 'dark' | 'light' | 'transparent' = 'dark'
  ): Phaser.GameObjects.Container {
    const container = scene.add.container(0, 0);

    const styleColors = {
      dark: { bg: 0x1a1a2e, border: 0x6c5ce7, alpha: 0.98 },
      light: { bg: 0x2d2d44, border: 0x8b7ce7, alpha: 0.95 },
      transparent: { bg: 0x000000, border: 0x475569, alpha: 0.7 }
    };

    const colors = styleColors[style];

    // Background
    const bg = scene.add.rectangle(0, 0, width, height, colors.bg, colors.alpha);
    bg.setOrigin(0.5);

    // Border
    const border = scene.add.rectangle(0, 0, width, height, 0x000000, 0);
    border.setStrokeStyle(3, colors.border);
    border.setOrigin(0.5);

    // Corner decorations
    const cornerSize = 8;
    const corners = [
      scene.add.rectangle(-width / 2 + cornerSize / 2, -height / 2 + cornerSize / 2, cornerSize, cornerSize, colors.border),
      scene.add.rectangle(width / 2 - cornerSize / 2, -height / 2 + cornerSize / 2, cornerSize, cornerSize, colors.border),
      scene.add.rectangle(-width / 2 + cornerSize / 2, height / 2 - cornerSize / 2, cornerSize, cornerSize, colors.border),
      scene.add.rectangle(width / 2 - cornerSize / 2, height / 2 - cornerSize / 2, cornerSize, cornerSize, colors.border)
    ];

    container.add([bg, border, ...corners]);
    container.setSize(width, height);

    return container;
  }

  /**
   * Generate simple tileset pattern
   */
  public static generateTileset(
    scene: Phaser.Scene,
    tileSize: number = 32,
    type: 'grass' | 'water' | 'stone' | 'office' = 'grass'
  ): Phaser.GameObjects.RenderTexture {
    const rt = scene.add.renderTexture(0, 0, tileSize, tileSize);

    const tileColors: Record<string, { base: number, accent: number }> = {
      grass: { base: 0x22c55e, accent: 0x16a34a },
      water: { base: 0x3b82f6, accent: 0x2563eb },
      stone: { base: 0x64748b, accent: 0x475569 },
      office: { base: 0xe5e7eb, accent: 0xd1d5db }
    };

    const colors = tileColors[type];

    // Base tile
    const base = scene.add.rectangle(tileSize / 2, tileSize / 2, tileSize, tileSize, colors.base);
    rt.draw(base);
    base.destroy();

    // Add variation/pattern
    for (let i = 0; i < 4; i++) {
      const x = Math.random() * tileSize;
      const y = Math.random() * tileSize;
      const size = Math.random() * 4 + 2;
      const dot = scene.add.circle(x, y, size, colors.accent, 0.5);
      rt.draw(dot);
      dot.destroy();
    }

    // Grid lines (subtle)
    const graphics = scene.add.graphics();
    graphics.lineStyle(1, 0x000000, 0.1);
    graphics.strokeRect(0, 0, tileSize, tileSize);
    rt.draw(graphics);
    graphics.destroy();

    return rt;
  }

  /**
   * Create animated sprite (simple 2-frame animation)
   */
  public static createAnimatedSprite(
    scene: Phaser.Scene,
    baseSprite: Phaser.GameObjects.Container,
    animationType: 'idle' | 'walk' | 'attack'
  ): void {
    if (animationType === 'idle') {
      // Gentle bobbing animation
      scene.tweens.add({
        targets: baseSprite,
        y: baseSprite.y - 4,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else if (animationType === 'walk') {
      // Left-right sway
      scene.tweens.add({
        targets: baseSprite,
        x: baseSprite.x + 3,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else if (animationType === 'attack') {
      // Quick forward thrust
      scene.tweens.add({
        targets: baseSprite,
        x: baseSprite.x + 10,
        duration: 100,
        yoyo: true,
        ease: 'Cubic.easeOut'
      });
    }
  }
}

console.log('🎨 Sprite Generator System loaded');
