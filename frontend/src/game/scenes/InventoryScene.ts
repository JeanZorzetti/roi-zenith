// ============= INVENTORY SCENE =============
// UI for managing player inventory and equipment

import Phaser from 'phaser';
import { GAME_CONFIG, COLORS, SCENE_KEYS } from '../config/gameConfig';
import inventorySystem, { Item, EquippedItems } from '../systems/InventorySystem';

export class InventoryScene extends Phaser.Scene {
  private selectedItem: Item | null = null;
  private itemCards: Phaser.GameObjects.Container[] = [];
  private equipmentSlots: Map<string, Phaser.GameObjects.Container> = new Map();
  private statsText: Phaser.GameObjects.Text | null = null;

  constructor() {
    super({ key: SCENE_KEYS.INVENTORY });
  }

  create(): void {
    const { width, height } = GAME_CONFIG;

    // Background
    this.add.rectangle(0, 0, width, height, COLORS.background).setOrigin(0);

    // Title
    this.add
      .text(width / 2, 40, '📦 INVENTÁRIO', {
        fontSize: '32px',
        color: COLORS.textLight,
        fontFamily: 'Arial Black',
      })
      .setOrigin(0.5);

    // Create layout
    this.createEquipmentPanel();
    this.createInventoryList();
    this.createStatsPanel();
    this.createBackButton();

    // Render initial state
    this.refreshInventory();
  }

  /**
   * Create equipment slots panel (left side)
   */
  private createEquipmentPanel(): void {
    const panelX = 80;
    const panelY = 120;
    const panelWidth = 280;
    const panelHeight = 600;

    // Panel background
    const panel = this.add.rectangle(panelX, panelY, panelWidth, panelHeight, COLORS.panelDark, 0.9);
    panel.setOrigin(0);
    panel.setStrokeStyle(2, COLORS.accent);

    // Title
    this.add
      .text(panelX + panelWidth / 2, panelY + 20, 'EQUIPAMENTO', {
        fontSize: '20px',
        color: COLORS.accent,
        fontFamily: 'Arial',
      })
      .setOrigin(0.5);

    // Equipment slots
    const slots: Array<{ key: keyof EquippedItems; label: string; y: number }> = [
      { key: 'weapon', label: '⚔️ Arma', y: panelY + 80 },
      { key: 'head', label: '🎩 Cabeça', y: panelY + 180 },
      { key: 'body', label: '👔 Corpo', y: panelY + 280 },
      { key: 'accessory1', label: '💍 Acessório 1', y: panelY + 380 },
      { key: 'accessory2', label: '💍 Acessório 2', y: panelY + 480 },
    ];

    slots.forEach(slot => {
      this.createEquipmentSlot(panelX + panelWidth / 2, slot.y, slot.key, slot.label);
    });
  }

  /**
   * Create single equipment slot
   */
  private createEquipmentSlot(x: number, y: number, slotKey: keyof EquippedItems, label: string): void {
    const container = this.add.container(x, y);

    // Slot background
    const slotBg = this.add.rectangle(0, 0, 240, 80, COLORS.panelLight, 0.8);
    slotBg.setStrokeStyle(2, COLORS.border);
    slotBg.setInteractive({ useHandCursor: true });

    // Label
    const labelText = this.add.text(-100, -25, label, {
      fontSize: '14px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
    });

    // Item name (empty initially)
    const itemText = this.add.text(0, 10, 'Vazio', {
      fontSize: '12px',
      color: COLORS.textDim,
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    container.add([slotBg, labelText, itemText]);

    // Click to unequip
    slotBg.on('pointerdown', () => {
      this.handleSlotClick(slotKey);
    });

    slotBg.on('pointerover', () => {
      slotBg.setStrokeStyle(3, COLORS.accent);
    });

    slotBg.on('pointerout', () => {
      slotBg.setStrokeStyle(2, COLORS.border);
    });

    this.equipmentSlots.set(slotKey, container);
  }

  /**
   * Handle equipment slot click (unequip)
   */
  private handleSlotClick(slotKey: keyof EquippedItems): void {
    const success = inventorySystem.unequipItem(slotKey);
    if (success) {
      this.refreshInventory();
      this.updateStatsPanel();
      // TODO: Emit to backend
    }
  }

  /**
   * Create inventory list (center)
   */
  private createInventoryList(): void {
    const listX = 400;
    const listY = 120;
    const listWidth = 500;
    const listHeight = 600;

    // Panel background
    const panel = this.add.rectangle(listX, listY, listWidth, listHeight, COLORS.panelDark, 0.9);
    panel.setOrigin(0);
    panel.setStrokeStyle(2, COLORS.accent);

    // Title
    const occupancy = inventorySystem.getOccupancy();
    this.add
      .text(listX + listWidth / 2, listY + 20, `ITENS (${occupancy.current}/${occupancy.max})`, {
        fontSize: '20px',
        color: COLORS.accent,
        fontFamily: 'Arial',
      })
      .setOrigin(0.5);

    // Sort buttons
    this.createSortButtons(listX + 20, listY + 50);
  }

  /**
   * Create sort buttons
   */
  private createSortButtons(x: number, y: number): void {
    const buttonWidth = 120;
    const buttonHeight = 30;
    const gap = 10;

    // Sort by Rarity button
    const rarityBtn = this.add.rectangle(x, y, buttonWidth, buttonHeight, COLORS.accent, 0.8);
    rarityBtn.setOrigin(0);
    rarityBtn.setInteractive({ useHandCursor: true });
    rarityBtn.setStrokeStyle(1, COLORS.border);

    const rarityText = this.add.text(x + buttonWidth / 2, y + buttonHeight / 2, 'Raridade', {
      fontSize: '12px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    rarityBtn.on('pointerdown', () => {
      inventorySystem.sortByRarity();
      this.refreshInventory();
    });

    // Sort by Level button
    const levelBtn = this.add.rectangle(x + buttonWidth + gap, y, buttonWidth, buttonHeight, COLORS.accent, 0.8);
    levelBtn.setOrigin(0);
    levelBtn.setInteractive({ useHandCursor: true });
    levelBtn.setStrokeStyle(1, COLORS.border);

    const levelText = this.add.text(x + buttonWidth + gap + buttonWidth / 2, y + buttonHeight / 2, 'Nível', {
      fontSize: '12px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    levelBtn.on('pointerdown', () => {
      inventorySystem.sortByLevel();
      this.refreshInventory();
    });
  }

  /**
   * Create stats panel (right side)
   */
  private createStatsPanel(): void {
    const panelX = 940;
    const panelY = 120;
    const panelWidth = 240;
    const panelHeight = 600;

    // Panel background
    const panel = this.add.rectangle(panelX, panelY, panelWidth, panelHeight, COLORS.panelDark, 0.9);
    panel.setOrigin(0);
    panel.setStrokeStyle(2, COLORS.accent);

    // Title
    this.add
      .text(panelX + panelWidth / 2, panelY + 20, 'STATS TOTAIS', {
        fontSize: '18px',
        color: COLORS.accent,
        fontFamily: 'Arial',
      })
      .setOrigin(0.5);

    // Stats text (will be updated dynamically)
    this.statsText = this.add.text(panelX + 20, panelY + 60, '', {
      fontSize: '14px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
      lineSpacing: 8,
    });

    this.updateStatsPanel();
  }

  /**
   * Update stats panel text
   */
  private updateStatsPanel(): void {
    if (!this.statsText) return;

    const stats = inventorySystem.calculateEquippedStats();

    const text = [
      `🧠 Intelligence: ${stats.intelligence}`,
      `💖 Charisma: ${stats.charisma}`,
      `🎯 Perception: ${stats.perception}`,
      `🛡️ Resilience: ${stats.resilience}`,
      `🍀 Luck: ${stats.luck}`,
      '',
      `✨ XP Bonus: +${stats.xpBonus}%`,
      `💰 Coin Bonus: +${stats.coinBonus}%`,
      `⚡ Energy Regen: +${stats.energyRegen}/min`,
    ].join('\n');

    this.statsText.setText(text);
  }

  /**
   * Refresh inventory display
   */
  private refreshInventory(): void {
    // Clear existing item cards
    this.itemCards.forEach(card => card.destroy());
    this.itemCards = [];

    // Update equipment slots
    const equipped = inventorySystem.getEquippedItems();
    this.equipmentSlots.forEach((container, slotKey) => {
      const itemText = container.getAt(2) as Phaser.GameObjects.Text;
      const item = equipped[slotKey as keyof EquippedItems];

      if (item) {
        const rarityColor = this.getRarityColor(item.rarity);
        itemText.setText(item.name);
        itemText.setColor(rarityColor);
      } else {
        itemText.setText('Vazio');
        itemText.setColor(COLORS.textDim);
      }
    });

    // Render inventory items
    const items = inventorySystem.getAllItems();
    const startX = 420;
    const startY = 220;
    const cardWidth = 230;
    const cardHeight = 70;
    const gap = 10;
    const columns = 2;

    items.forEach((item, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const x = startX + col * (cardWidth + gap);
      const y = startY + row * (cardHeight + gap);

      // Only show first 7 rows (14 items) - TODO: Add scrolling
      if (row < 7) {
        this.createItemCard(x, y, cardWidth, cardHeight, item);
      }
    });
  }

  /**
   * Create item card
   */
  private createItemCard(x: number, y: number, width: number, height: number, item: Item): void {
    const container = this.add.container(x, y);

    // Card background
    const rarityColor = this.getRarityColor(item.rarity);
    const cardBg = this.add.rectangle(0, 0, width, height, COLORS.panelLight, 0.9);
    cardBg.setStrokeStyle(2, parseInt(rarityColor.replace('#', '0x')));
    cardBg.setInteractive({ useHandCursor: true });

    // Item name
    const nameText = this.add.text(-width / 2 + 10, -height / 2 + 10, item.name, {
      fontSize: '14px',
      color: rarityColor,
      fontFamily: 'Arial',
      fontStyle: 'bold',
    });

    // Item level
    const levelText = this.add.text(width / 2 - 10, -height / 2 + 10, `Lvl ${item.level}`, {
      fontSize: '12px',
      color: COLORS.textDim,
      fontFamily: 'Arial',
    }).setOrigin(1, 0);

    // Item stats preview
    const statsPreview = this.getStatsPreview(item);
    const statsText = this.add.text(-width / 2 + 10, -height / 2 + 35, statsPreview, {
      fontSize: '11px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
    });

    container.add([cardBg, nameText, levelText, statsText]);

    // Click to equip
    cardBg.on('pointerdown', () => {
      this.handleItemClick(item);
    });

    cardBg.on('pointerover', () => {
      cardBg.setStrokeStyle(3, COLORS.accent);
    });

    cardBg.on('pointerout', () => {
      cardBg.setStrokeStyle(2, parseInt(rarityColor.replace('#', '0x')));
    });

    this.itemCards.push(container);
  }

  /**
   * Handle item card click (equip)
   */
  private handleItemClick(item: Item): void {
    if (!item.slot) {
      console.warn('Item is not equippable');
      return;
    }

    const success = inventorySystem.equipItem(item.id);
    if (success) {
      this.refreshInventory();
      this.updateStatsPanel();
      // TODO: Emit to backend
    }
  }

  /**
   * Get rarity color
   */
  private getRarityColor(rarity: Item['rarity']): string {
    const colors: Record<Item['rarity'], string> = {
      common: '#ffffff',
      uncommon: '#1eff00',
      rare: '#0070dd',
      epic: '#a335ee',
      legendary: '#ff8000',
      mythic: '#e6cc80',
    };
    return colors[rarity];
  }

  /**
   * Get stats preview text
   */
  private getStatsPreview(item: Item): string {
    const parts: string[] = [];
    if (item.stats.intelligence) parts.push(`+${item.stats.intelligence} INT`);
    if (item.stats.charisma) parts.push(`+${item.stats.charisma} CHA`);
    if (item.stats.perception) parts.push(`+${item.stats.perception} PER`);
    if (item.stats.xpBonus) parts.push(`+${item.stats.xpBonus}% XP`);

    return parts.slice(0, 2).join(' • ') || 'No stats';
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
