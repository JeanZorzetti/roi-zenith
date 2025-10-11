import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../config/gameConfig';

interface Territory {
  id: string;
  name: string;
  emoji: string;
  color: number;
  level: number;
  leadsCount: number;
  explorationProgress: number;
  bossDefeated: boolean;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  level: number;
  quality: 'cold' | 'warm' | 'hot';
  discovered: boolean;
}

interface ExplorationAction {
  id: string;
  name: string;
  icon: string;
  description: string;
  energyCost: number;
  successChance: number;
  leadQuality: 'cold' | 'warm' | 'hot';
}

export class TerritoryDetailScene extends Phaser.Scene {
  private territory!: Territory;
  private leads: Lead[] = [];
  private explorationActions: ExplorationAction[] = [];
  private playerEnergy: number = 100;

  constructor() {
    super({ key: SCENE_KEYS.TERRITORY_DETAIL });
  }

  init(data: Territory) {
    this.territory = data;
    console.log(`🏢 [TerritoryDetailScene] Entering territory: ${this.territory.name}`);

    // Initialize leads for this territory
    this.generateLeads();

    // Initialize exploration actions
    this.initializeExplorationActions();

    // Get player energy from registry
    this.playerEnergy = this.registry.get('playerEnergy') || 100;
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(0, 0, width, height, 0x0f0f1e).setOrigin(0);

    // Title bar
    this.createTitleBar(width);

    // Territory info panel (left side)
    this.createTerritoryInfoPanel();

    // Leads list (center)
    this.createLeadsList();

    // Exploration actions (right side)
    this.createExplorationPanel();

    // Boss battle button (if available)
    if (this.territory.explorationProgress >= 80 && !this.territory.bossDefeated) {
      this.createBossBattleButton();
    }

    // Back button
    this.createBackButton();
  }

  private createTitleBar(width: number): void {
    const titleBar = this.add.rectangle(width / 2, 50, width - 40, 80, 0x1a1a2e, 0.98).setOrigin(0.5);
    titleBar.setStrokeStyle(3, this.territory.color);

    this.add.text(width / 2, 38, `${this.territory.emoji} ${this.territory.name.toUpperCase()}`, {
      fontSize: '28px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 66, `Nível ${this.territory.level} | ${this.territory.explorationProgress}% explorado`, {
      fontSize: '14px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
  }

  private createTerritoryInfoPanel(): void {
    const panelX = 150;
    const panelY = 380;
    const panelWidth = 240;
    const panelHeight = 400;

    // Background
    const bg = this.add.rectangle(panelX, panelY, panelWidth, panelHeight, 0x1a1a2e, 0.98);
    bg.setStrokeStyle(3, this.territory.color);

    // Title
    this.add.text(panelX, panelY - 180, '📊 INFO DO TERRITÓRIO', {
      fontSize: '16px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Territory stats
    const stats = [
      `🎯 Nível: ${this.territory.level}`,
      ``,
      `👥 Leads: ${this.leads.filter(l => l.discovered).length}/${this.leads.length}`,
      ``,
      `🔥 Hot: ${this.leads.filter(l => l.quality === 'hot' && l.discovered).length}`,
      `☀️ Warm: ${this.leads.filter(l => l.quality === 'warm' && l.discovered).length}`,
      `❄️ Cold: ${this.leads.filter(l => l.quality === 'cold' && l.discovered).length}`,
      ``,
      `👑 Boss: ${this.territory.bossDefeated ? 'Derrotado ✅' : 'Ativo ⚔️'}`
    ];

    stats.forEach((stat, index) => {
      this.add.text(panelX, panelY - 140 + index * 24, stat, {
        fontSize: '13px',
        color: COLORS.textMuted,
        fontFamily: 'Arial, sans-serif'
      }).setOrigin(0.5);
    });

    // Progress bar
    const progressBarWidth = 200;
    const progressY = panelY + 80;

    this.add.text(panelX, progressY - 20, 'Exploração', {
      fontSize: '13px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    const progressBarBg = this.add.rectangle(panelX, progressY, progressBarWidth, 20, 0x2d2d2d);
    progressBarBg.setStrokeStyle(2, 0x555555);

    const progressFill = this.add.rectangle(
      panelX - progressBarWidth / 2,
      progressY,
      (progressBarWidth * this.territory.explorationProgress) / 100,
      20,
      this.territory.color
    ).setOrigin(0, 0.5);

    this.add.text(panelX, progressY, `${this.territory.explorationProgress}%`, {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Energy bar
    const energyY = progressY + 50;

    this.add.text(panelX, energyY - 20, '⚡ Energia', {
      fontSize: '13px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    const energyBarBg = this.add.rectangle(panelX, energyY, progressBarWidth, 20, 0x2d2d2d);
    energyBarBg.setStrokeStyle(2, 0x555555);

    const energyFill = this.add.rectangle(
      panelX - progressBarWidth / 2,
      energyY,
      (progressBarWidth * this.playerEnergy) / 100,
      20,
      0xfbbf24
    ).setOrigin(0, 0.5);

    this.registry.set('territoryEnergyBar', energyFill);

    this.add.text(panelX, energyY, `${this.playerEnergy}/100`, {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  private createLeadsList(): void {
    const listX = 600;
    const listY = 280;
    const cardWidth = 480;
    const cardHeight = 80;

    // Title
    this.add.text(listX, listY, '👥 LEADS DISPONÍVEIS', {
      fontSize: '18px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Scrollable list of leads
    const discoveredLeads = this.leads.filter(lead => lead.discovered);

    if (discoveredLeads.length === 0) {
      this.add.text(listX, listY + 150, 'Nenhum lead descoberto ainda.\nUse as ações de exploração →', {
        fontSize: '14px',
        color: COLORS.textMuted,
        fontFamily: 'Arial, sans-serif',
        align: 'center'
      }).setOrigin(0.5);
      return;
    }

    discoveredLeads.slice(0, 5).forEach((lead, index) => {
      this.createLeadCard(lead, listX, listY + 60 + index * 100, cardWidth, cardHeight);
    });

    // Show count if more than 5 leads
    if (discoveredLeads.length > 5) {
      this.add.text(listX, listY + 560, `+ ${discoveredLeads.length - 5} leads adicionais`, {
        fontSize: '12px',
        color: COLORS.textSecondary,
        fontFamily: 'Arial, sans-serif'
      }).setOrigin(0.5);
    }
  }

  private createLeadCard(lead: Lead, x: number, y: number, width: number, height: number): void {
    // Quality colors
    const qualityColors = {
      hot: 0xef4444,
      warm: 0xf59e0b,
      cold: 0x06b6d4
    };

    const qualityEmojis = {
      hot: '🔥',
      warm: '☀️',
      cold: '❄️'
    };

    const container = this.add.container(x, y);

    // Background
    const bg = this.add.rectangle(0, 0, width, height, 0x1a1a2e, 0.98);
    bg.setStrokeStyle(3, qualityColors[lead.quality]);
    container.add(bg);

    // Quality indicator
    const qualityText = this.add.text(-width / 2 + 30, 0, qualityEmojis[lead.quality], {
      fontSize: '32px'
    }).setOrigin(0.5);
    container.add(qualityText);

    // Lead info
    const nameText = this.add.text(-width / 2 + 90, -15, lead.name, {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);
    container.add(nameText);

    const companyText = this.add.text(-width / 2 + 90, 8, lead.company, {
      fontSize: '13px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0, 0.5);
    container.add(companyText);

    const levelText = this.add.text(-width / 2 + 90, 28, `Nível ${lead.level}`, {
      fontSize: '12px',
      color: COLORS.textMuted,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0, 0.5);
    container.add(levelText);

    // Battle button
    const buttonWidth = 120;
    const buttonHeight = 40;
    const buttonX = width / 2 - 70;
    const button = this.add.rectangle(buttonX, 0, buttonWidth, buttonHeight, this.territory.color);
    button.setStrokeStyle(2, 0xfbbf24);
    button.setInteractive({ useHandCursor: true });
    container.add(button);

    const buttonText = this.add.text(buttonX, 0, '⚔️ Entrevistar', {
      fontSize: '13px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    container.add(buttonText);

    // Button interactions
    button.on('pointerover', () => {
      button.setFillStyle(0xfbbf24);
    });

    button.on('pointerout', () => {
      button.setFillStyle(this.territory.color);
    });

    button.on('pointerdown', () => {
      this.startBattle(lead);
    });
  }

  private createExplorationPanel(): void {
    const panelX = 1050;
    const panelY = 380;
    const panelWidth = 240;
    const panelHeight = 560;

    // Background
    const bg = this.add.rectangle(panelX, panelY, panelWidth, panelHeight, 0x1a1a2e, 0.98);
    bg.setStrokeStyle(3, COLORS.warning);

    // Title
    this.add.text(panelX, panelY - 250, '🎯 EXPLORAÇÃO', {
      fontSize: '16px',
      color: COLORS.warning,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Exploration actions
    this.explorationActions.forEach((action, index) => {
      this.createExplorationActionButton(action, panelX, panelY - 170 + index * 120, 220);
    });
  }

  private createExplorationActionButton(action: ExplorationAction, x: number, y: number, width: number): void {
    const container = this.add.container(x, y);

    const height = 100;

    // Background
    const bg = this.add.rectangle(0, 0, width, height, 0x2d2d44, 1);
    bg.setStrokeStyle(2, COLORS.primary);
    container.add(bg);

    // Icon
    const icon = this.add.text(0, -30, action.icon, {
      fontSize: '28px'
    }).setOrigin(0.5);
    container.add(icon);

    // Name
    const name = this.add.text(0, 0, action.name, {
      fontSize: '13px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    container.add(name);

    // Cost
    const cost = this.add.text(0, 20, `⚡ ${action.energyCost} energia`, {
      fontSize: '11px',
      color: action.energyCost <= this.playerEnergy ? COLORS.success : COLORS.error,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    container.add(cost);

    // Success chance
    const chance = this.add.text(0, 35, `${action.successChance}% chance`, {
      fontSize: '10px',
      color: COLORS.textMuted,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    container.add(chance);

    // Make interactive if player has enough energy
    if (this.playerEnergy >= action.energyCost) {
      bg.setInteractive({ useHandCursor: true });

      bg.on('pointerover', () => {
        bg.setFillStyle(0x3d3d54);
        bg.setStrokeStyle(2, COLORS.warning);
      });

      bg.on('pointerout', () => {
        bg.setFillStyle(0x2d2d44);
        bg.setStrokeStyle(2, COLORS.primary);
      });

      bg.on('pointerdown', () => {
        this.executeExplorationAction(action);
      });
    } else {
      bg.setAlpha(0.5);
      name.setAlpha(0.5);
      icon.setAlpha(0.5);
    }
  }

  private createBossBattleButton(): void {
    const buttonX = 600;
    const buttonY = 680;
    const buttonWidth = 300;
    const buttonHeight = 60;

    const bg = this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xef4444, 1);
    bg.setStrokeStyle(4, 0xfbbf24);
    bg.setInteractive({ useHandCursor: true });

    const text = this.add.text(buttonX, buttonY, '👑 DESAFIAR BOSS', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    bg.on('pointerover', () => {
      bg.setFillStyle(0xfbbf24);
      this.tweens.add({
        targets: [bg, text],
        y: buttonY - 5,
        duration: 100,
        ease: 'Back.easeOut'
      });
    });

    bg.on('pointerout', () => {
      bg.setFillStyle(0xef4444);
      this.tweens.add({
        targets: [bg, text],
        y: buttonY,
        duration: 100
      });
    });

    bg.on('pointerdown', () => {
      this.startBossBattle();
    });
  }

  private createBackButton(): void {
    const buttonX = 100;
    const buttonY = 750;
    const buttonWidth = 140;
    const buttonHeight = 40;

    const bg = this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0x374151, 1);
    bg.setStrokeStyle(2, COLORS.textSecondary);
    bg.setInteractive({ useHandCursor: true });

    const text = this.add.text(buttonX, buttonY, '← Voltar', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    bg.on('pointerover', () => {
      bg.setFillStyle(0x4b5563);
    });

    bg.on('pointerout', () => {
      bg.setFillStyle(0x374151);
    });

    bg.on('pointerdown', () => {
      this.scene.stop(SCENE_KEYS.TERRITORY_DETAIL);
      this.scene.resume(SCENE_KEYS.WORLD_MAP);
    });
  }

  private generateLeads(): void {
    const leadNames = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza', 'Juliana Lima'];
    const companies = ['Empresa A', 'Empresa B', 'Empresa C', 'Loja XYZ', 'Tech Corp', 'Inovação SA'];

    // Generate leads based on territory leadsCount
    for (let i = 0; i < this.territory.leadsCount; i++) {
      const randomQuality = Math.random();
      let quality: 'cold' | 'warm' | 'hot' = 'cold';

      if (randomQuality > 0.8) quality = 'hot';
      else if (randomQuality > 0.5) quality = 'warm';

      // Only first 3 leads are discovered by default
      const discovered = i < 3;

      this.leads.push({
        id: `lead-${this.territory.id}-${i}`,
        name: leadNames[i % leadNames.length],
        company: companies[i % companies.length],
        level: this.territory.level + Math.floor(Math.random() * 2),
        quality,
        discovered
      });
    }
  }

  private initializeExplorationActions(): void {
    this.explorationActions = [
      {
        id: 'cold-outreach',
        name: 'Cold Outreach',
        icon: '📞',
        description: 'Ligações frias para prospecção',
        energyCost: 10,
        successChance: 40,
        leadQuality: 'cold'
      },
      {
        id: 'network-event',
        name: 'Network Event',
        icon: '🤝',
        description: 'Participar de eventos de networking',
        energyCost: 20,
        successChance: 65,
        leadQuality: 'warm'
      },
      {
        id: 'indicacao',
        name: 'Indicação',
        icon: '⭐',
        description: 'Pedir indicações de clientes',
        energyCost: 5,
        successChance: 85,
        leadQuality: 'hot'
      },
      {
        id: 'inbound',
        name: 'Inbound',
        icon: '🎯',
        description: 'Lead chegou através de marketing',
        energyCost: 0,
        successChance: 100,
        leadQuality: 'warm'
      }
    ];
  }

  private executeExplorationAction(action: ExplorationAction): void {
    console.log(`🎯 [TerritoryDetailScene] Executing: ${action.name}`);

    // Deduct energy
    this.playerEnergy -= action.energyCost;
    this.registry.set('playerEnergy', this.playerEnergy);

    // Update energy bar
    const energyBar = this.registry.get('territoryEnergyBar') as Phaser.GameObjects.Rectangle;
    if (energyBar) {
      energyBar.width = (200 * this.playerEnergy) / 100;
    }

    // Roll for success
    const roll = Math.random() * 100;
    const success = roll <= action.successChance;

    if (success) {
      // Find an undiscovered lead and reveal it
      const undiscoveredLead = this.leads.find(l => !l.discovered);
      if (undiscoveredLead) {
        undiscoveredLead.discovered = true;
        undiscoveredLead.quality = action.leadQuality;

        // Show success message
        this.showMessage(`✅ Sucesso! Lead descoberto: ${undiscoveredLead.name}`, COLORS.success);

        // Update exploration progress
        this.territory.explorationProgress = Math.min(100, this.territory.explorationProgress + 10);

        // Refresh scene
        this.time.delayedCall(1500, () => {
          this.scene.restart(this.territory);
        });
      } else {
        this.showMessage('✅ Sucesso! Mas não há mais leads neste território.', COLORS.warning);
      }
    } else {
      this.showMessage(`❌ Falhou! Tente novamente.`, COLORS.error);
    }
  }

  private startBattle(lead: Lead): void {
    console.log(`⚔️ [TerritoryDetailScene] Starting battle with: ${lead.name}`);

    this.scene.pause(SCENE_KEYS.TERRITORY_DETAIL);
    this.scene.launch(SCENE_KEYS.BATTLE, {
      leadName: lead.name,
      leadCompany: lead.company,
      leadLevel: lead.level,
      contactId: lead.id,
      dealId: `deal-${lead.id}`,
      territoryId: this.territory.id
    });
  }

  private startBossBattle(): void {
    console.log(`👑 [TerritoryDetailScene] Starting boss battle in: ${this.territory.name}`);

    this.scene.pause(SCENE_KEYS.TERRITORY_DETAIL);
    this.scene.launch(SCENE_KEYS.BATTLE, {
      leadName: `Boss ${this.territory.name}`,
      leadCompany: 'Boss Corporation',
      leadLevel: this.territory.level * 2,
      contactId: `boss-${this.territory.id}`,
      dealId: `boss-deal-${this.territory.id}`,
      territoryId: this.territory.id,
      isBoss: true
    });
  }

  private showMessage(text: string, color: string): void {
    const message = this.add.text(600, 400, text, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: color,
      padding: { x: 20, y: 15 }
    }).setOrigin(0.5);

    this.time.delayedCall(1500, () => {
      message.destroy();
    });
  }
}
