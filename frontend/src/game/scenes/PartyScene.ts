import Phaser from 'phaser';
import { COLORS, SCENE_KEYS } from '../config/gameConfig';
import { PartySystem, NPC, PartyMember } from '../systems/PartySystem';
import NPC_DATABASE from '../data/npcDatabase';

export class PartyScene extends Phaser.Scene {
  private partySystem!: PartySystem;
  private selectedNPC: NPC | null = null;

  // UI Elements
  private availableNPCsList: Phaser.GameObjects.Container[] = [];
  private partyMembersList: Phaser.GameObjects.Container[] = [];
  private detailsPanel!: Phaser.GameObjects.Container;

  // Player state
  private playerLevel: number = 1;
  private playerCoins: number = 0;
  private playerGems: number = 0;

  constructor() {
    super({ key: SCENE_KEYS.PARTY });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Initialize party system with NPC database
    this.partySystem = new PartySystem();
    this.partySystem.initialize(NPC_DATABASE);

    // Get player state from registry
    this.playerLevel = this.registry.get('playerLevel') || 1;
    this.playerCoins = this.registry.get('playerCoins') || 0;
    this.playerGems = this.registry.get('playerGems') || 0;

    console.log('🎮 [PartyScene] Initialized with player state:', {
      level: this.playerLevel,
      coins: this.playerCoins,
      gems: this.playerGems
    });

    // Background
    this.add.rectangle(0, 0, width, height, 0x1a1a2e, 1).setOrigin(0);

    // Title Bar
    this.createTitleBar();

    // Main Layout: 3 columns
    // Left: Available NPCs (400px)
    // Center: Party Members (400px)
    // Right: NPC Details (380px)
    this.createAvailableNPCsPanel();
    this.createPartyMembersPanel();
    this.createDetailsPanel();

    // Party Bonuses Section (bottom)
    this.createPartyBonusesSection();

    // Back Button
    this.createBackButton();

    // Initial render
    this.refreshNPCLists();
  }

  private createTitleBar(): void {
    const { width } = this.cameras.main;

    // Title bar background
    this.add.rectangle(width / 2, 40, width - 40, 60, parseInt(COLORS.panelDark.replace('#', '0x')), 0.95)
      .setStrokeStyle(2, parseInt(COLORS.border.replace('#', '0x')));

    // Title
    this.add.text(width / 2, 40, '👥 PARTY - RECRUTAR NPCs', {
      fontSize: '28px',
      fontFamily: 'Arial Black',
      color: COLORS.text,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Player resources display
    const resourceText = `💰 ${this.playerCoins}  💎 ${this.playerGems}  📊 Level ${this.playerLevel}`;
    this.add.text(width - 240, 40, resourceText, {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: COLORS.textMuted
    }).setOrigin(0.5);
  }

  private createAvailableNPCsPanel(): void {
    const panelX = 40;
    const panelY = 100;
    const panelWidth = 380;
    const panelHeight = 520;

    // Panel background
    this.add.rectangle(panelX, panelY, panelWidth, panelHeight, parseInt(COLORS.cardBg.replace('#', '0x')), 0.9)
      .setOrigin(0)
      .setStrokeStyle(2, parseInt(COLORS.border.replace('#', '0x')));

    // Panel title
    this.add.text(panelX + panelWidth / 2, panelY + 20, '🎯 NPCs Disponíveis', {
      fontSize: '20px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    }).setOrigin(0.5);

    // Instructions
    this.add.text(panelX + 10, panelY + 50, 'Clique para ver detalhes e recrutar', {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: COLORS.textMuted
    });
  }

  private createPartyMembersPanel(): void {
    const panelX = 440;
    const panelY = 100;
    const panelWidth = 380;
    const panelHeight = 520;

    // Panel background
    this.add.rectangle(panelX, panelY, panelWidth, panelHeight, parseInt(COLORS.cardBg.replace('#', '0x')), 0.9)
      .setOrigin(0)
      .setStrokeStyle(2, parseInt(COLORS.border.replace('#', '0x')));

    // Panel title
    const maxParty = this.partySystem.getMaxPartySize();
    const currentSize = this.partySystem.getRecruitedNPCs().length;
    this.add.text(panelX + panelWidth / 2, panelY + 20, `👥 Seu Party (${currentSize}/${maxParty})`, {
      fontSize: '20px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    }).setOrigin(0.5);

    // Instructions
    this.add.text(panelX + 10, panelY + 50, 'Clique para remover do party', {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: COLORS.textMuted
    });
  }

  private createDetailsPanel(): void {
    const panelX = 840;
    const panelY = 100;
    const panelWidth = 340;
    const panelHeight = 520;

    // Panel background
    const panel = this.add.rectangle(panelX, panelY, panelWidth, panelHeight, parseInt(COLORS.cardBg.replace('#', '0x')), 0.9)
      .setOrigin(0)
      .setStrokeStyle(2, parseInt(COLORS.border.replace('#', '0x')));

    // Panel title
    this.add.text(panelX + panelWidth / 2, panelY + 20, '📋 Detalhes', {
      fontSize: '20px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    }).setOrigin(0.5);

    // Create container for dynamic details
    this.detailsPanel = this.add.container(panelX + 10, panelY + 60);

    // Initial message
    this.showDetailsPlaceholder();
  }

  private showDetailsPlaceholder(): void {
    this.detailsPanel.removeAll(true);

    const placeholder = this.add.text(155, 200, 'Selecione um NPC\npara ver detalhes', {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: COLORS.textMuted,
      align: 'center'
    }).setOrigin(0.5);

    this.detailsPanel.add(placeholder);
  }

  private showNPCDetails(npc: NPC): void {
    this.detailsPanel.removeAll(true);

    const panelWidth = 320;
    let yOffset = 0;

    // NPC Avatar (large)
    const avatar = this.add.text(panelWidth / 2, yOffset + 30, npc.avatar, {
      fontSize: '48px'
    }).setOrigin(0.5);
    this.detailsPanel.add(avatar);
    yOffset += 80;

    // NPC Name
    const name = this.add.text(panelWidth / 2, yOffset, npc.name, {
      fontSize: '22px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    }).setOrigin(0.5);
    this.detailsPanel.add(name);
    yOffset += 30;

    // Role with color
    const roleColor = this.getRoleColor(npc.role);
    const role = this.add.text(panelWidth / 2, yOffset, npc.role.toUpperCase(), {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: roleColor,
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.detailsPanel.add(role);
    yOffset += 30;

    // Description
    const desc = this.add.text(10, yOffset, npc.description, {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: COLORS.textMuted,
      wordWrap: { width: panelWidth - 20 }
    });
    this.detailsPanel.add(desc);
    yOffset += 60;

    // Skill section
    const skillTitle = this.add.text(10, yOffset, '⚡ Habilidade Ativa:', {
      fontSize: '16px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    });
    this.detailsPanel.add(skillTitle);
    yOffset += 25;

    const skillName = this.add.text(20, yOffset, npc.skill.name, {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: COLORS.accent,
      fontStyle: 'bold'
    });
    this.detailsPanel.add(skillName);
    yOffset += 20;

    const skillDesc = this.add.text(20, yOffset, npc.skill.description, {
      fontSize: '13px',
      fontFamily: 'Arial',
      color: COLORS.textMuted,
      wordWrap: { width: panelWidth - 30 }
    });
    this.detailsPanel.add(skillDesc);
    yOffset += 40;

    const cooldown = this.add.text(20, yOffset, `⏱️ Cooldown: ${npc.skill.cooldown / 60}min`, {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: COLORS.textDim
    });
    this.detailsPanel.add(cooldown);
    yOffset += 25;

    // Passive Bonus
    const passiveTitle = this.add.text(10, yOffset, '✨ Passiva:', {
      fontSize: '16px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    });
    this.detailsPanel.add(passiveTitle);
    yOffset += 25;

    const passiveName = this.add.text(20, yOffset, npc.passive.name, {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: COLORS.success,
      fontStyle: 'bold'
    });
    this.detailsPanel.add(passiveName);
    yOffset += 20;

    const passiveDesc = this.add.text(20, yOffset, npc.passive.description, {
      fontSize: '13px',
      fontFamily: 'Arial',
      color: COLORS.textMuted,
      wordWrap: { width: panelWidth - 30 }
    });
    this.detailsPanel.add(passiveDesc);
    yOffset += 35;

    // Requirements & Cost
    const reqTitle = this.add.text(10, yOffset, '💰 Custo:', {
      fontSize: '16px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    });
    this.detailsPanel.add(reqTitle);
    yOffset += 25;

    const canAfford = this.playerCoins >= npc.cost;
    const costColor = canAfford ? COLORS.textLight : COLORS.error;
    const costText = this.add.text(20, yOffset, `${npc.cost} Coins`, {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: costColor,
      fontStyle: 'bold'
    });
    this.detailsPanel.add(costText);
    yOffset += 25;

    const levelReq = this.add.text(20, yOffset, `Level mínimo: ${npc.unlockLevel}`, {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: this.playerLevel >= npc.unlockLevel ? COLORS.textMuted : COLORS.error
    });
    this.detailsPanel.add(levelReq);
    yOffset += 35;

    // Recruit button
    const canRecruit = this.canRecruitNPC(npc);
    const btnColor = canRecruit ? parseInt(COLORS.primary.replace('#', '0x')) : 0x555555;

    const recruitBtn = this.add.rectangle(panelWidth / 2, yOffset, 280, 50, btnColor, 0.9)
      .setStrokeStyle(2, parseInt(COLORS.border.replace('#', '0x')));

    const btnText = this.add.text(panelWidth / 2, yOffset, '👥 RECRUTAR', {
      fontSize: '18px',
      fontFamily: 'Arial Black',
      color: canRecruit ? '#ffffff' : '#888888'
    }).setOrigin(0.5);

    this.detailsPanel.add([recruitBtn, btnText]);

    if (canRecruit) {
      recruitBtn.setInteractive({ useHandCursor: true });

      recruitBtn.on('pointerover', () => {
        recruitBtn.setFillStyle(parseInt(COLORS.accent.replace('#', '0x')), 1);
      });

      recruitBtn.on('pointerout', () => {
        recruitBtn.setFillStyle(btnColor, 0.9);
      });

      recruitBtn.on('pointerdown', () => {
        this.recruitNPC(npc);
      });
    } else {
      // Show reason why can't recruit
      const reason = this.getRecruitBlockReason(npc);
      const errorText = this.add.text(panelWidth / 2, yOffset + 35, reason, {
        fontSize: '12px',
        fontFamily: 'Arial',
        color: COLORS.error,
        align: 'center',
        wordWrap: { width: 280 }
      }).setOrigin(0.5);
      this.detailsPanel.add(errorText);
    }
  }

  private canRecruitNPC(npc: NPC): boolean {
    const partySize = this.partySystem.getRecruitedNPCs().length;
    const maxParty = this.partySystem.getMaxPartySize();

    if (partySize >= maxParty) return false;
    if (this.playerLevel < npc.unlockLevel) return false;
    if (this.playerCoins < npc.cost) return false;

    // Check if already recruited
    const recruited = this.partySystem.getRecruitedNPCs();
    if (recruited.some(member => member.id === npc.id)) return false;

    return true;
  }

  private getRecruitBlockReason(npc: NPC): string {
    const partySize = this.partySystem.getRecruitedNPCs().length;
    const maxParty = this.partySystem.getMaxPartySize();

    if (partySize >= maxParty) return `Party cheio (${maxParty}/${maxParty})`;
    if (this.playerLevel < npc.unlockLevel) return `Requer Level ${npc.unlockLevel}`;
    if (this.playerCoins < npc.cost) return `Coins insuficientes (${this.playerCoins}/${npc.cost})`;

    const recruited = this.partySystem.getRecruitedNPCs();
    if (recruited.some(member => member.id === npc.id)) return 'Já recrutado';

    return 'Não pode recrutar';
  }

  private recruitNPC(npc: NPC): void {
    const success = this.partySystem.recruitNPC(npc.id, this.playerLevel, this.playerCoins);

    if (success) {
      console.log('✅ [PartyScene] NPC recruited:', npc.name);

      // Update player coins
      this.playerCoins -= npc.cost;
      this.registry.set('playerCoins', this.playerCoins);

      // TODO: Call backend API to persist recruitment
      // fetch('/api/game/party/recruit', { method: 'POST', body: JSON.stringify({ npcId: npc.id }) })

      // Refresh UI
      this.refreshNPCLists();
      this.showNPCDetails(npc); // Update details panel

      // Show success feedback
      this.showSuccessMessage(`${npc.name} recrutado com sucesso!`);
    } else {
      console.error('❌ [PartyScene] Failed to recruit NPC:', npc.name);
      this.showErrorMessage('Falha ao recrutar NPC');
    }
  }

  private removeNPC(npcId: string): void {
    const npc = this.partySystem.getRecruitedNPCs().find(member => member.id === npcId);
    if (!npc) return;

    const success = this.partySystem.removeNPC(npcId);

    if (success) {
      console.log('✅ [PartyScene] NPC removed:', npc.id);

      // TODO: Call backend API to persist removal
      // fetch('/api/game/party/remove', { method: 'POST', body: JSON.stringify({ npcId }) })

      // Refresh UI
      this.refreshNPCLists();
      this.selectedNPC = null;
      this.showDetailsPlaceholder();

      this.showSuccessMessage('NPC removido do party');
    } else {
      console.error('❌ [PartyScene] Failed to remove NPC:', npcId);
    }
  }

  private refreshNPCLists(): void {
    // Clear existing lists
    this.availableNPCsList.forEach(container => container.destroy());
    this.partyMembersList.forEach(container => container.destroy());
    this.availableNPCsList = [];
    this.partyMembersList = [];

    // Get NPCs
    const availableNPCs = this.partySystem.getAvailableNPCs(this.playerLevel);
    const recruitedNPCs = this.partySystem.getRecruitedNPCs();

    // Render available NPCs
    let yOffset = 180;
    availableNPCs.forEach((npc, index) => {
      const card = this.createNPCCard(npc, 50, yOffset, 360, false);
      this.availableNPCsList.push(card);
      yOffset += 100;
    });

    // Render recruited NPCs
    yOffset = 180;
    recruitedNPCs.forEach((member, index) => {
      const card = this.createPartyMemberCard(member, 450, yOffset, 360);
      this.partyMembersList.push(card);
      yOffset += 100;
    });

    // Update party bonuses
    this.updatePartyBonuses();
  }

  private createNPCCard(npc: NPC, x: number, y: number, width: number, recruited: boolean): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    // Card background
    const canRecruit = this.canRecruitNPC(npc);
    const bgColor = recruited ? 0x2d3748 : (canRecruit ? parseInt(COLORS.cardBg.replace('#', '0x')) : 0x1a1a1a);
    const card = this.add.rectangle(0, 0, width, 80, bgColor, 0.95)
      .setOrigin(0)
      .setStrokeStyle(2, parseInt(COLORS.border.replace('#', '0x')));
    container.add(card);

    // Avatar
    const avatar = this.add.text(15, 40, npc.avatar, {
      fontSize: '32px'
    }).setOrigin(0, 0.5);
    container.add(avatar);

    // Name
    const name = this.add.text(60, 20, npc.name, {
      fontSize: '16px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    });
    container.add(name);

    // Role
    const roleColor = this.getRoleColor(npc.role);
    const role = this.add.text(60, 40, npc.role, {
      fontSize: '13px',
      fontFamily: 'Arial',
      color: roleColor
    });
    container.add(role);

    // Cost and level
    const costColor = this.playerCoins >= npc.cost ? COLORS.textMuted : COLORS.error;
    const cost = this.add.text(60, 58, `💰 ${npc.cost}  |  📊 Lvl ${npc.unlockLevel}`, {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: costColor
    });
    container.add(cost);

    // Make interactive if can recruit
    if (!recruited && canRecruit) {
      card.setInteractive({ useHandCursor: true });

      card.on('pointerover', () => {
        card.setFillStyle(parseInt(COLORS.panelLight.replace('#', '0x')), 1);
      });

      card.on('pointerout', () => {
        card.setFillStyle(bgColor, 0.95);
      });

      card.on('pointerdown', () => {
        this.selectedNPC = npc;
        this.showNPCDetails(npc);
      });
    }

    return container;
  }

  private createPartyMemberCard(member: PartyMember, x: number, y: number, width: number): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    // Card background
    const card = this.add.rectangle(0, 0, width, 80, parseInt(COLORS.primary.replace('#', '0x')), 0.2)
      .setOrigin(0)
      .setStrokeStyle(2, parseInt(COLORS.primary.replace('#', '0x')));
    container.add(card);

    // Avatar
    const avatar = this.add.text(15, 40, member.avatar, {
      fontSize: '32px'
    }).setOrigin(0, 0.5);
    container.add(avatar);

    // Name
    const name = this.add.text(60, 20, member.name, {
      fontSize: '16px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    });
    container.add(name);

    // Role and level
    const roleColor = this.getRoleColor(member.role);
    const roleText = this.add.text(60, 40, `${member.role} | Lvl ${member.level}`, {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: roleColor
    });
    container.add(roleText);

    // Passive bonus indicator
    const passiveKeys = Object.keys(member.passive.effect);
    const firstBonus = passiveKeys[0];
    const bonusValue = member.passive.effect[firstBonus];
    const bonusText = this.add.text(60, 56, `✨ ${member.passive.name}: +${bonusValue}%`, {
      fontSize: '11px',
      fontFamily: 'Arial',
      color: COLORS.success
    });
    container.add(bonusText);

    // Remove button
    const removeBtn = this.add.rectangle(width - 30, 40, 50, 30, parseInt(COLORS.error.replace('#', '0x')), 0.8)
      .setOrigin(0.5)
      .setStrokeStyle(1, parseInt(COLORS.border.replace('#', '0x')));

    const removeText = this.add.text(width - 30, 40, '✖', {
      fontSize: '18px',
      fontFamily: 'Arial Black',
      color: '#ffffff'
    }).setOrigin(0.5);

    container.add([removeBtn, removeText]);

    removeBtn.setInteractive({ useHandCursor: true });

    removeBtn.on('pointerover', () => {
      removeBtn.setFillStyle(parseInt(COLORS.error.replace('#', '0x')), 1);
    });

    removeBtn.on('pointerout', () => {
      removeBtn.setFillStyle(parseInt(COLORS.error.replace('#', '0x')), 0.8);
    });

    removeBtn.on('pointerdown', () => {
      this.removeNPC(member.id);
    });

    return container;
  }

  private createPartyBonusesSection(): void {
    const { width } = this.cameras.main;
    const y = 640;

    // Background
    this.add.rectangle(width / 2, y, width - 80, 100, parseInt(COLORS.cardBg.replace('#', '0x')), 0.9)
      .setStrokeStyle(2, parseInt(COLORS.border.replace('#', '0x')));

    // Title
    this.add.text(width / 2, y - 30, '✨ Bônus do Party', {
      fontSize: '20px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    }).setOrigin(0.5);
  }

  private updatePartyBonuses(): void {
    const { width } = this.cameras.main;
    const y = 640;

    // Clear previous bonuses text (if any)
    // In real implementation, would store references and update them

    const bonuses = this.partySystem.calculatePartyBonuses();

    const bonusTexts = [
      `XP Bonus: +${bonuses.xpBonus || 0}%`,
      `Coin Bonus: +${bonuses.coinBonus || 0}%`,
      `Interview Success: +${bonuses.interviewSuccessBonus || 0}%`,
      `Research Speed: +${bonuses.researchSpeedBonus || 0}%`
    ];

    const bonusStr = bonusTexts.join('  |  ');

    this.add.text(width / 2, y + 10, bonusStr, {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: COLORS.success
    }).setOrigin(0.5);
  }

  private getRoleColor(role: string): string {
    const roleColors: Record<string, string> = {
      'Researcher': COLORS.primary,
      'Analyst': COLORS.accent,
      'Negotiator': COLORS.success,
      'Strategist': COLORS.secondary,
      'Scout': COLORS.warning
    };
    return roleColors[role] || COLORS.textMuted;
  }

  private createBackButton(): void {
    const { width } = this.cameras.main;
    const btn = this.add.rectangle(width / 2, 760, 200, 50, parseInt(COLORS.panelDark.replace('#', '0x')), 0.9)
      .setStrokeStyle(2, parseInt(COLORS.border.replace('#', '0x')));

    const text = this.add.text(width / 2, 760, '← VOLTAR', {
      fontSize: '18px',
      fontFamily: 'Arial Black',
      color: COLORS.text
    }).setOrigin(0.5);

    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      btn.setFillStyle(parseInt(COLORS.panelLight.replace('#', '0x')), 1);
    });

    btn.on('pointerout', () => {
      btn.setFillStyle(parseInt(COLORS.panelDark.replace('#', '0x')), 0.9);
    });

    btn.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.WORLD_MAP);
    });
  }

  private showSuccessMessage(message: string): void {
    const { width, height } = this.cameras.main;

    const bg = this.add.rectangle(width / 2, height / 2, 400, 100, 0x000000, 0.8);
    const text = this.add.text(width / 2, height / 2, message, {
      fontSize: '20px',
      fontFamily: 'Arial Black',
      color: COLORS.success,
      align: 'center',
      wordWrap: { width: 380 }
    }).setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      bg.destroy();
      text.destroy();
    });
  }

  private showErrorMessage(message: string): void {
    const { width, height } = this.cameras.main;

    const bg = this.add.rectangle(width / 2, height / 2, 400, 100, 0x000000, 0.8);
    const text = this.add.text(width / 2, height / 2, message, {
      fontSize: '20px',
      fontFamily: 'Arial Black',
      color: COLORS.error,
      align: 'center',
      wordWrap: { width: 380 }
    }).setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      bg.destroy();
      text.destroy();
    });
  }
}
