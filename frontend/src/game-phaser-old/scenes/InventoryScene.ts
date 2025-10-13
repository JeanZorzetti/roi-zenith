// ============= INVENTORY SCENE =============
// UI for managing player inventory and equipment

import Phaser from 'phaser';
import { GAME_CONFIG, COLORS, SCENE_KEYS } from '../config/gameConfig';
import inventorySystem, { Item, EquippedItems } from '../systems/InventorySystem';
import { AssetManager } from '../systems/AssetManager';

export class InventoryScene extends Phaser.Scene {
  private selectedItem: Item | null = null;
  private itemCards: Phaser.GameObjects.Container[] = [];
  private equipmentSlots: Map<string, Phaser.GameObjects.Container> = new Map();
  private statsText: Phaser.GameObjects.Text | null = null;
  private assetManager: AssetManager | null = null;

  // Filter state
  private currentSlotFilter: string | null = null;
  private currentRarityFilter: Item['rarity'] | null = null;
  private filterButtons: Map<string, Phaser.GameObjects.Container> = new Map();

  constructor() {
    super({ key: SCENE_KEYS.INVENTORY });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Initialize AssetManager
    this.assetManager = AssetManager.getInstance(this);

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
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;

    const panelWidth = 280;
    const panelHeight = 600;
    const panelX = centerX - 520; // Left panel
    const panelY = centerY - panelHeight / 2 + 40;

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
   * Create single equipment slot with sprite support
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
    const itemText = this.add.text(20, 0, 'Vazio', {
      fontSize: '12px',
      color: COLORS.textDim,
      fontFamily: 'Arial',
    }).setOrigin(0, 0.5);

    // Sprite placeholder (will be added in refreshInventory)
    // We store these at indices: 0=slotBg, 1=labelText, 2=itemText, 3=sprite (optional)

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
   * Handle equipment slot click (unequip) with visual feedback
   */
  private handleSlotClick(slotKey: keyof EquippedItems): void {
    const success = inventorySystem.unequipItem(slotKey);
    if (success) {
      // Show success feedback
      this.showEquipFeedback('↩️ Desequipado!', COLORS.accent);

      // Refresh with smooth transition
      this.time.delayedCall(150, () => {
        this.refreshInventory();
        this.updateStatsPanel();
      });

      // TODO: Emit to backend
    }
  }

  /**
   * Show visual feedback when equipping/unequipping
   */
  private showEquipFeedback(message: string, color: number): void {
    const { width, height } = this.cameras.main;
    const feedbackText = this.add.text(width / 2, height / 2 - 100, message, {
      fontSize: '24px',
      color: `#${color.toString(16).padStart(6, '0')}`,
      fontFamily: 'Arial Black',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    feedbackText.setAlpha(0);
    feedbackText.setDepth(2000);

    // Fade in and scale animation
    this.tweens.add({
      targets: feedbackText,
      alpha: 1,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 200,
      ease: 'Back.easeOut',
      yoyo: true,
      onComplete: () => {
        // Fade out and move up
        this.tweens.add({
          targets: feedbackText,
          alpha: 0,
          y: height / 2 - 150,
          duration: 300,
          ease: 'Power2',
          onComplete: () => {
            feedbackText.destroy();
          }
        });
      }
    });
  }

  /**
   * Create inventory list (center)
   */
  private createInventoryList(): void {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;

    const listWidth = 500;
    const listHeight = 600;
    const listX = centerX - listWidth / 2; // Center panel
    const listY = centerY - listHeight / 2 + 40;

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

    // Filter and Sort controls
    this.createFilterAndSortControls(listX + 20, listY + 50);
  }

  /**
   * Create filter and sort controls
   */
  private createFilterAndSortControls(x: number, y: number): void {
    const buttonWidth = 80;
    const buttonHeight = 26;
    const gap = 6;

    // Row 1: Sort buttons
    const sortLabel = this.add.text(x, y, 'Ordenar:', {
      fontSize: '11px',
      color: COLORS.textDim,
      fontFamily: 'Arial',
    });

    this.createControlButton(x + 65, y, buttonWidth, buttonHeight, 'Raridade', () => {
      inventorySystem.sortByRarity();
      this.refreshInventory();
    });

    this.createControlButton(x + 65 + buttonWidth + gap, y, buttonWidth, buttonHeight, 'Nível', () => {
      inventorySystem.sortByLevel();
      this.refreshInventory();
    });

    this.createControlButton(x + 65 + (buttonWidth + gap) * 2, y, buttonWidth, buttonHeight, 'Nome', () => {
      inventorySystem.sortByName();
      this.refreshInventory();
    });

    // Row 2: Slot filters
    const filterY = y + buttonHeight + 8;
    const slotLabel = this.add.text(x, filterY, 'Slot:', {
      fontSize: '11px',
      color: COLORS.textDim,
      fontFamily: 'Arial',
    });

    const slotFilters = [
      { label: 'Todos', value: null },
      { label: 'Arma', value: 'PRIMARY_TOOL' },
      { label: 'Cabeça', value: 'KNOWLEDGE_BASE' },
      { label: 'Corpo', value: 'COMMUNICATION' },
      { label: 'Acess.', value: 'ACCESSORY' },
    ];

    slotFilters.forEach((filter, index) => {
      const btn = this.createToggleButton(
        x + 40 + index * (buttonWidth + gap),
        filterY,
        buttonWidth,
        buttonHeight,
        filter.label,
        () => {
          this.currentSlotFilter = filter.value;
          this.updateFilterButtons();
          this.refreshInventory();
        },
        `slot_${filter.value || 'all'}`
      );
    });

    // Row 3: Rarity filters
    const rarityY = filterY + buttonHeight + 8;
    const rarityLabel = this.add.text(x, rarityY, 'Raridade:', {
      fontSize: '11px',
      color: COLORS.textDim,
      fontFamily: 'Arial',
    });

    const rarityFilters: Array<{ label: string; value: Item['rarity'] | null }> = [
      { label: 'Todas', value: null },
      { label: 'Comum', value: 'common' },
      { label: 'Incomum', value: 'uncommon' },
      { label: 'Raro', value: 'rare' },
      { label: 'Épico', value: 'epic' },
    ];

    rarityFilters.forEach((filter, index) => {
      const btn = this.createToggleButton(
        x + 65 + index * (buttonWidth + gap),
        rarityY,
        buttonWidth,
        buttonHeight,
        filter.label,
        () => {
          this.currentRarityFilter = filter.value;
          this.updateFilterButtons();
          this.refreshInventory();
        },
        `rarity_${filter.value || 'all'}`
      );
    });
  }

  /**
   * Create a standard control button (sort buttons)
   */
  private createControlButton(
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    onClick: () => void
  ): void {
    const btn = this.add.rectangle(x, y, width, height, COLORS.accent, 0.7);
    btn.setOrigin(0);
    btn.setInteractive({ useHandCursor: true });
    btn.setStrokeStyle(1, COLORS.border);

    const text = this.add.text(x + width / 2, y + height / 2, label, {
      fontSize: '10px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    btn.on('pointerdown', onClick);

    btn.on('pointerover', () => {
      btn.setFillStyle(COLORS.accent, 1);
    });

    btn.on('pointerout', () => {
      btn.setFillStyle(COLORS.accent, 0.7);
    });
  }

  /**
   * Create a toggle button (filter buttons)
   */
  private createToggleButton(
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    onClick: () => void,
    id: string
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    const btn = this.add.rectangle(0, 0, width, height, COLORS.panelLight, 0.6);
    btn.setOrigin(0);
    btn.setInteractive({ useHandCursor: true });
    btn.setStrokeStyle(1, COLORS.border);

    const text = this.add.text(width / 2, height / 2, label, {
      fontSize: '10px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    container.add([btn, text]);

    // Store references for toggling
    container.setData('btn', btn);
    container.setData('text', text);
    container.setData('active', false);

    btn.on('pointerdown', onClick);

    btn.on('pointerover', () => {
      if (!container.getData('active')) {
        btn.setFillStyle(COLORS.panelLight, 0.8);
      }
    });

    btn.on('pointerout', () => {
      if (!container.getData('active')) {
        btn.setFillStyle(COLORS.panelLight, 0.6);
      }
    });

    this.filterButtons.set(id, container);

    return container;
  }

  /**
   * Update filter button states
   */
  private updateFilterButtons(): void {
    // Update slot filter buttons
    this.filterButtons.forEach((container, id) => {
      const btn = container.getData('btn') as Phaser.GameObjects.Rectangle;
      const text = container.getData('text') as Phaser.GameObjects.Text;

      let isActive = false;

      if (id.startsWith('slot_')) {
        const filterValue = id === 'slot_all' ? null : id.replace('slot_', '');
        isActive = this.currentSlotFilter === filterValue;
      } else if (id.startsWith('rarity_')) {
        const filterValue = id === 'rarity_all' ? null : id.replace('rarity_', '');
        isActive = this.currentRarityFilter === filterValue;
      }

      container.setData('active', isActive);

      if (isActive) {
        btn.setFillStyle(COLORS.accent, 0.9);
        btn.setStrokeStyle(2, COLORS.accent);
        text.setColor(`#${COLORS.textLight.toString()}`);
      } else {
        btn.setFillStyle(COLORS.panelLight, 0.6);
        btn.setStrokeStyle(1, COLORS.border);
        text.setColor(COLORS.textLight);
      }
    });
  }

  /**
   * Create stats panel (right side)
   */
  private createStatsPanel(): void {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;

    const panelWidth = 240;
    const panelHeight = 600;
    const panelX = centerX + 280; // Right panel
    const panelY = centerY - panelHeight / 2 + 40;

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
   * Refresh inventory display with sprites
   */
  private refreshInventory(): void {
    // Clear existing item cards
    this.itemCards.forEach(card => card.destroy());
    this.itemCards = [];

    // Update equipment slots with sprites
    const equipped = inventorySystem.getEquippedItems();
    this.equipmentSlots.forEach((container, slotKey) => {
      const itemText = container.getAt(2) as Phaser.GameObjects.Text;
      const item = equipped[slotKey as keyof EquippedItems];

      // Remove old sprite if exists (at index 3)
      if (container.length > 3) {
        const oldSprite = container.getAt(3);
        oldSprite?.destroy();
        container.remove(oldSprite);
      }

      if (item) {
        const rarityColor = this.getRarityColor(item.rarity);
        itemText.setText(item.name);
        itemText.setColor(rarityColor);

        // Add item sprite
        if (this.assetManager) {
          const spriteId = `item_${item.id}`;
          const itemSprite = this.assetManager.cloneSprite(spriteId, -90, 0, this);
          if (itemSprite) {
            itemSprite.setScale(0.5);
            container.add(itemSprite);
          }
        }
      } else {
        itemText.setText('Vazio');
        itemText.setColor(COLORS.textDim);
      }
    });

    // Render inventory items with improved layout and filters
    let items = inventorySystem.getAllItems();

    // Apply slot filter
    if (this.currentSlotFilter) {
      items = items.filter(item => item.slot === this.currentSlotFilter);
    }

    // Apply rarity filter
    if (this.currentRarityFilter) {
      items = items.filter(item => item.rarity === this.currentRarityFilter);
    }

    const { width, height} = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;

    const listWidth = 500;
    const listX = centerX - listWidth / 2;
    const startX = listX + 20;
    const startY = centerY - 110; // Adjusted for filter controls
    const cardWidth = 230;
    const cardHeight = 85; // Increased height for better spacing
    const gap = 12; // Increased gap
    const columns = 2;

    items.forEach((item, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const x = startX + col * (cardWidth + gap);
      const y = startY + row * (cardHeight + gap);

      // Only show first 5 rows (10 items) with improved spacing (reduced due to filter controls)
      if (row < 5) {
        this.createItemCard(x, y, cardWidth, cardHeight, item);
      }
    });
  }

  /**
   * Create item card with visual sprite
   */
  private createItemCard(x: number, y: number, width: number, height: number, item: Item): void {
    const container = this.add.container(x, y);

    // Card background
    const rarityColor = this.getRarityColor(item.rarity);
    const cardBg = this.add.rectangle(0, 0, width, height, COLORS.panelLight, 0.9);
    cardBg.setStrokeStyle(2, parseInt(rarityColor.replace('#', '0x')));
    cardBg.setInteractive({ useHandCursor: true });

    // Add rarity glow effect
    const glowGraphics = this.add.graphics();
    glowGraphics.lineStyle(4, parseInt(rarityColor.replace('#', '0x')), 0.3);
    glowGraphics.strokeRoundedRect(-width / 2, -height / 2, width, height, 8);

    // Item sprite (48x48, positioned on left side)
    let itemSprite: Phaser.GameObjects.Container | null = null;
    if (this.assetManager) {
      const spriteId = `item_${item.id}`;
      console.log(`🎨 [InventoryScene] Loading sprite: ${spriteId}`);
      itemSprite = this.assetManager.cloneSprite(spriteId, -width / 2 + 40, 0, this);

      if (itemSprite) {
        itemSprite.setScale(0.6); // Scale down to fit card
        console.log(`✅ [InventoryScene] Sprite loaded with ${itemSprite.length} children`);
      } else {
        console.warn(`⚠️ [InventoryScene] Could not load sprite for item: ${item.id}`);
        // Fallback to icon emoji
        const iconText = this.add.text(-width / 2 + 40, 0, item.icon || '📦', {
          fontSize: '32px',
        }).setOrigin(0.5);
        container.add(iconText);
      }
    }

    // Item name
    const nameText = this.add.text(-width / 2 + 75, -height / 2 + 10, item.name, {
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
    const statsText = this.add.text(-width / 2 + 75, -height / 2 + 35, statsPreview, {
      fontSize: '11px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
    });

    // Add all elements to container
    container.add([glowGraphics, cardBg, nameText, levelText, statsText]);
    if (itemSprite) {
      container.add(itemSprite);
    }

    // Hover tooltip setup
    let tooltip: Phaser.GameObjects.Container | null = null;

    // Click to equip
    cardBg.on('pointerdown', () => {
      this.handleItemClick(item);
    });

    cardBg.on('pointerover', () => {
      cardBg.setStrokeStyle(3, COLORS.accent);
      // Show tooltip with detailed stats
      tooltip = this.createTooltip(x + width / 2 + 10, y, item);
    });

    cardBg.on('pointerout', () => {
      cardBg.setStrokeStyle(2, parseInt(rarityColor.replace('#', '0x')));
      // Hide tooltip
      if (tooltip) {
        tooltip.destroy();
        tooltip = null;
      }
    });

    this.itemCards.push(container);
  }

  /**
   * Create tooltip with detailed item stats
   */
  private createTooltip(x: number, y: number, item: Item): Phaser.GameObjects.Container {
    const tooltip = this.add.container(x, y);
    const tooltipWidth = 200;
    const padding = 10;

    // Build tooltip content
    const lines: string[] = [
      item.name,
      `Level ${item.level} | ${item.rarity.toUpperCase()}`,
      '',
      'Stats:',
    ];

    if (item.stats.intelligence) lines.push(`🧠 Intelligence: +${item.stats.intelligence}`);
    if (item.stats.charisma) lines.push(`💖 Charisma: +${item.stats.charisma}`);
    if (item.stats.perception) lines.push(`🎯 Perception: +${item.stats.perception}`);
    if (item.stats.resilience) lines.push(`🛡️ Resilience: +${item.stats.resilience}`);
    if (item.stats.luck) lines.push(`🍀 Luck: +${item.stats.luck}`);

    if (item.stats.xpBonus || item.stats.coinBonus || item.stats.energyRegen) {
      lines.push('');
      lines.push('Bonuses:');
      if (item.stats.xpBonus) lines.push(`✨ XP Bonus: +${item.stats.xpBonus}%`);
      if (item.stats.coinBonus) lines.push(`💰 Coin Bonus: +${item.stats.coinBonus}%`);
      if (item.stats.energyRegen) lines.push(`⚡ Energy Regen: +${item.stats.energyRegen}/min`);
    }

    if (item.description) {
      lines.push('');
      lines.push(item.description);
    }

    const tooltipHeight = lines.length * 18 + padding * 2;

    // Background
    const bg = this.add.rectangle(0, 0, tooltipWidth, tooltipHeight, COLORS.panelDark, 0.95);
    bg.setOrigin(0);
    const rarityColor = this.getRarityColor(item.rarity);
    bg.setStrokeStyle(2, parseInt(rarityColor.replace('#', '0x')));

    // Text
    const text = this.add.text(padding, padding, lines.join('\n'), {
      fontSize: '12px',
      color: COLORS.textLight,
      fontFamily: 'Arial',
      lineSpacing: 4,
    });

    tooltip.add([bg, text]);
    tooltip.setDepth(1000); // Ensure tooltip is on top

    return tooltip;
  }

  /**
   * Handle item card click (equip) with visual feedback
   */
  private handleItemClick(item: Item): void {
    if (!item.slot) {
      console.warn('Item is not equippable');
      return;
    }

    const success = inventorySystem.equipItem(item.id);
    if (success) {
      // Show success feedback
      this.showEquipFeedback('✅ Equipado!', COLORS.success);

      // Refresh with smooth transition
      this.time.delayedCall(150, () => {
        this.refreshInventory();
        this.updateStatsPanel();
      });

      // TODO: Emit to backend
    } else {
      // Show error feedback
      this.showEquipFeedback('❌ Não pode equipar', COLORS.error);
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
