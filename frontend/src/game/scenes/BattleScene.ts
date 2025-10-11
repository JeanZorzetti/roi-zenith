import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../config/gameConfig';

interface BattleData {
  leadName: string;
  leadCompany: string;
  leadLevel: number;
  contactId?: string;
  dealId?: string;
}

interface ActionCard {
  id: string;
  name: string;
  description: string;
  energyCost: number;
  discoveryChance: number;
  relationshipChange: number;
  icon: string;
}

export class BattleScene extends Phaser.Scene {
  private leadName: string = '';
  private leadCompany: string = '';
  private leadLevel: number = 1;
  private leadHP: number = 100;
  private maxLeadHP: number = 100;
  private playerHP: number = 100;
  private maxPlayerHP: number = 100;

  private currentPhase: number = 1; // 1: Small Talk, 2: Context, 3: Pain Discovery, 4: Solution
  private phaseNames: string[] = ['Small Talk', 'Context Building', 'Pain Discovery', 'Solution Ideation'];
  private relationship: number = 0;
  private discoveryProgress: number = 0;

  private actionCards: ActionCard[] = [];
  private selectedAction: ActionCard | null = null;

  constructor() {
    super({ key: SCENE_KEYS.BATTLE });
  }

  init(data: BattleData) {
    this.leadName = data.leadName || 'Lead Prospect';
    this.leadCompany = data.leadCompany || 'Unknown Company';
    this.leadLevel = data.leadLevel || 1;
    this.maxLeadHP = 100 + (this.leadLevel * 20);
    this.leadHP = this.maxLeadHP;
    this.currentPhase = 1;
    this.relationship = 0;
    this.discoveryProgress = 0;

    this.initializeActionCards();
  }

  private initializeActionCards(): void {
    this.actionCards = [
      {
        id: 'open_question',
        name: 'Pergunta Aberta',
        description: 'Qual seu maior desafio?',
        energyCost: 0,
        discoveryChance: 60,
        relationshipChange: 10,
        icon: '💬'
      },
      {
        id: 'direct_question',
        name: 'Pergunta Direta',
        description: 'Seu financeiro tem problema?',
        energyCost: 5,
        discoveryChance: 80,
        relationshipChange: -10,
        icon: '🎯'
      },
      {
        id: 'active_listening',
        name: 'Escuta Ativa',
        description: 'Deixa o entrevistado falar',
        energyCost: 0,
        discoveryChance: 40,
        relationshipChange: 20,
        icon: '👂'
      },
      {
        id: 'present_data',
        name: 'Apresentar Dado',
        description: '80% do setor tem problema X',
        energyCost: 3,
        discoveryChance: 50,
        relationshipChange: 5,
        icon: '📊'
      },
      {
        id: 'empathy',
        name: 'Empatia',
        description: 'Entendo, deve ser frustrante',
        energyCost: 0,
        discoveryChance: 30,
        relationshipChange: 30,
        icon: '🤝'
      },
      {
        id: 'suggest_solution',
        name: 'Sugerir Solução',
        description: 'E se automatizar isso?',
        energyCost: 5,
        discoveryChance: 70,
        relationshipChange: 0,
        icon: '💡'
      }
    ];
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(0, 0, width, height, 0x1a1a2e).setOrigin(0);

    // Title
    this.add.text(width / 2, 30, 'ENTREVISTA DE PESQUISA', {
      fontSize: '20px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Phase indicator
    this.add.text(width / 2, 60, `Fase ${this.currentPhase}: ${this.phaseNames[this.currentPhase - 1]}`, {
      fontSize: '14px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Lead info panel (left side)
    this.createLeadPanel(100, 120);

    // Player info panel (right side)
    this.createPlayerPanel(width - 100, 120);

    // Action cards (bottom)
    this.createActionCards(width, height);

    // Stats panel (center)
    this.createStatsPanel(width / 2, 300);

    // Buttons
    this.createButtons(width, height);
  }

  private createLeadPanel(x: number, y: number): void {
    const panel = this.add.rectangle(x, y, 180, 150, 0x2d2d44, 0.9).setOrigin(0.5);
    panel.setStrokeStyle(2, 0x6c5ce7);

    this.add.text(x, y - 60, '🏢 LEAD', {
      fontSize: '12px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(x, y - 40, this.leadName, {
      fontSize: '14px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(x, y - 25, this.leadCompany, {
      fontSize: '10px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // HP Bar
    this.add.text(x - 70, y, `HP:`, {
      fontSize: '10px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    });

    const hpBarBg = this.add.rectangle(x + 10, y, 120, 12, 0x555555).setOrigin(0, 0.5);
    const hpBar = this.add.rectangle(x + 10, y, 120, 12, 0xe74c3c).setOrigin(0, 0.5);
    hpBar.setData('maxWidth', 120);
    this.registry.set('leadHPBar', hpBar);

    const hpText = this.add.text(x + 70, y, `${this.leadHP}/${this.maxLeadHP}`, {
      fontSize: '10px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    this.registry.set('leadHPText', hpText);

    // Level
    this.add.text(x, y + 20, `Nível ${this.leadLevel}`, {
      fontSize: '12px',
      color: COLORS.secondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Relationship
    this.add.text(x, y + 40, `Relacionamento: ${this.relationship}%`, {
      fontSize: '10px',
      color: this.relationship > 50 ? '#2ecc71' : this.relationship < 0 ? '#e74c3c' : COLORS.text,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    this.registry.set('relationshipText', this.add.text(x, y + 40, '', { fontSize: '10px' }));
  }

  private createPlayerPanel(x: number, y: number): void {
    const panel = this.add.rectangle(x, y, 180, 150, 0x2d2d44, 0.9).setOrigin(0.5);
    panel.setStrokeStyle(2, 0x00b894);

    this.add.text(x, y - 60, '🔍 VOCÊ', {
      fontSize: '12px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(x, y - 40, 'Pesquisador(a)', {
      fontSize: '14px',
      color: COLORS.success,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // HP Bar (represents energy/focus)
    this.add.text(x - 70, y, `Foco:`, {
      fontSize: '10px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    });

    const hpBarBg = this.add.rectangle(x + 10, y, 120, 12, 0x555555).setOrigin(0, 0.5);
    const hpBar = this.add.rectangle(x + 10, y, 120, 12, 0x00b894).setOrigin(0, 0.5);
    hpBar.setData('maxWidth', 120);
    this.registry.set('playerHPBar', hpBar);

    const hpText = this.add.text(x + 70, y, `${this.playerHP}/${this.maxPlayerHP}`, {
      fontSize: '10px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    this.registry.set('playerHPText', hpText);

    // Discovery Progress
    this.add.text(x, y + 20, 'Descoberta:', {
      fontSize: '10px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    const progressBg = this.add.rectangle(x, y + 35, 140, 10, 0x555555).setOrigin(0.5);
    const progressBar = this.add.rectangle(x - 70, y + 35, 0, 10, 0xfdcb6e).setOrigin(0, 0.5);
    progressBar.setData('maxWidth', 140);
    this.registry.set('discoveryBar', progressBar);

    const progressText = this.add.text(x, y + 50, `${this.discoveryProgress}%`, {
      fontSize: '10px',
      color: COLORS.warning,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    this.registry.set('discoveryText', progressText);
  }

  private createStatsPanel(x: number, y: number): void {
    const logPanel = this.add.rectangle(x, y, 400, 100, 0x2d2d44, 0.8).setOrigin(0.5);
    logPanel.setStrokeStyle(1, 0x555555);

    const logText = this.add.text(x, y - 30, '📝 Log de Entrevista', {
      fontSize: '12px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const messageText = this.add.text(x, y, 'Selecione uma ação para começar a entrevista...', {
      fontSize: '11px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif',
      align: 'center',
      wordWrap: { width: 380 }
    }).setOrigin(0.5);
    this.registry.set('battleLog', messageText);
  }

  private createActionCards(width: number, height: number): void {
    const startY = height - 120;
    const cardWidth = 110;
    const cardHeight = 80;
    const spacing = 10;
    const totalWidth = (cardWidth * 3) + (spacing * 2);
    const startX = (width - totalWidth) / 2;

    // Show first 3 cards
    for (let i = 0; i < 3; i++) {
      const card = this.actionCards[i];
      const x = startX + (i * (cardWidth + spacing));
      this.createActionCard(card, x, startY, cardWidth, cardHeight);
    }
  }

  private createActionCard(card: ActionCard, x: number, y: number, width: number, height: number): void {
    const cardContainer = this.add.container(x, y);

    const bg = this.add.rectangle(0, 0, width, height, 0x2d2d44, 0.95);
    bg.setStrokeStyle(2, 0x6c5ce7);
    bg.setInteractive({ useHandCursor: true });

    const icon = this.add.text(0, -25, card.icon, {
      fontSize: '20px'
    }).setOrigin(0.5);

    const name = this.add.text(0, -5, card.name, {
      fontSize: '10px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: width - 10 }
    }).setOrigin(0.5);

    const desc = this.add.text(0, 10, card.description, {
      fontSize: '8px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif',
      align: 'center',
      wordWrap: { width: width - 10 }
    }).setOrigin(0.5);

    const cost = this.add.text(0, 28, card.energyCost > 0 ? `⚡ ${card.energyCost}` : '⚡ 0', {
      fontSize: '9px',
      color: card.energyCost > 0 ? COLORS.warning : COLORS.success,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    cardContainer.add([bg, icon, name, desc, cost]);

    // Hover effects
    bg.on('pointerover', () => {
      bg.setStrokeStyle(2, 0xfdcb6e);
      this.tweens.add({
        targets: cardContainer,
        y: y - 5,
        duration: 100,
        ease: 'Power1'
      });
    });

    bg.on('pointerout', () => {
      bg.setStrokeStyle(2, 0x6c5ce7);
      this.tweens.add({
        targets: cardContainer,
        y: y,
        duration: 100,
        ease: 'Power1'
      });
    });

    bg.on('pointerdown', () => {
      this.selectedAction = card;
      this.executeAction(card);
    });
  }

  private createButtons(width: number, height: number): void {
    const btnY = height - 25;

    // Flee button
    const fleeBtn = this.add.text(30, btnY, '❌ Desistir', {
      fontSize: '12px',
      color: COLORS.error,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#2d2d44',
      padding: { x: 10, y: 5 }
    }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });

    fleeBtn.on('pointerover', () => {
      fleeBtn.setStyle({ backgroundColor: '#e74c3c' });
    });

    fleeBtn.on('pointerout', () => {
      fleeBtn.setStyle({ backgroundColor: '#2d2d44' });
    });

    fleeBtn.on('pointerdown', () => {
      this.endBattle(false);
    });
  }

  private executeAction(card: ActionCard): void {
    // Calculate success based on discovery chance
    const roll = Math.random() * 100;
    const success = roll <= card.discoveryChance;

    // Update relationship
    this.relationship = Math.max(-100, Math.min(100, this.relationship + card.relationshipChange));

    // Update discovery progress
    if (success) {
      const progressGain = 20 + (card.discoveryChance / 5);
      this.discoveryProgress = Math.min(100, this.discoveryProgress + progressGain);
    }

    // Damage to lead (represents breaking their guard)
    const damage = success ? 20 + Math.floor(Math.random() * 15) : 5 + Math.floor(Math.random() * 5);
    this.leadHP = Math.max(0, this.leadHP - damage);

    // Update battle log
    const logText = this.registry.get('battleLog') as Phaser.GameObjects.Text;
    let message = `${card.icon} ${card.name}: `;

    if (success) {
      message += `Sucesso! Descoberta +${Math.floor(20 + (card.discoveryChance / 5))}%\n`;
      message += `${this.leadName} compartilhou insights valiosos!`;
    } else {
      message += `O lead ficou evasivo...\n`;
      message += `Tente uma abordagem diferente.`;
    }

    logText.setText(message);

    // Update UI
    this.updateBattleUI();

    // Check victory/defeat
    this.time.delayedCall(1000, () => {
      if (this.discoveryProgress >= 100 || this.leadHP <= 0) {
        this.endBattle(true);
      } else if (this.relationship <= -50) {
        this.endBattle(false);
      } else {
        // Advance phase
        if (this.discoveryProgress >= 25 * this.currentPhase && this.currentPhase < 4) {
          this.advancePhase();
        }
      }
    });
  }

  private updateBattleUI(): void {
    // Update lead HP
    const leadHPBar = this.registry.get('leadHPBar') as Phaser.GameObjects.Rectangle;
    const leadHPText = this.registry.get('leadHPText') as Phaser.GameObjects.Text;
    const hpPercent = this.leadHP / this.maxLeadHP;
    leadHPBar.width = leadHPBar.getData('maxWidth') * hpPercent;
    leadHPText.setText(`${this.leadHP}/${this.maxLeadHP}`);

    // Update discovery progress
    const discoveryBar = this.registry.get('discoveryBar') as Phaser.GameObjects.Rectangle;
    const discoveryText = this.registry.get('discoveryText') as Phaser.GameObjects.Text;
    discoveryBar.width = (discoveryBar.getData('maxWidth') * this.discoveryProgress) / 100;
    discoveryText.setText(`${Math.floor(this.discoveryProgress)}%`);
  }

  private advancePhase(): void {
    this.currentPhase++;
    const logText = this.registry.get('battleLog') as Phaser.GameObjects.Text;
    logText.setText(`🎯 Fase ${this.currentPhase}: ${this.phaseNames[this.currentPhase - 1]}\nVocê avançou na entrevista!`);
  }

  private endBattle(victory: boolean): void {
    if (victory) {
      this.showVictoryScreen();
    } else {
      this.showDefeatScreen();
    }
  }

  private showVictoryScreen(): void {
    const { width, height } = this.cameras.main;

    // Overlay
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);

    // Victory panel
    const panel = this.add.rectangle(width / 2, height / 2, 400, 300, 0x2d2d44, 1).setOrigin(0.5);
    panel.setStrokeStyle(3, 0x00b894);

    this.add.text(width / 2, height / 2 - 100, '🎉 ENTREVISTA CONCLUÍDA!', {
      fontSize: '24px',
      color: COLORS.success,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 60, 'Você descobriu insights valiosos!', {
      fontSize: '14px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Mock rewards (real rewards come from backend)
    const xpGain = 50 + (this.leadLevel * 10);
    const coinsGain = 25 + (this.leadLevel * 5);
    const gemsGain = Math.floor(this.discoveryProgress / 20);

    this.add.text(width / 2, height / 2 - 20, 'Recompensas:', {
      fontSize: '14px',
      color: COLORS.warning,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 10, `+${xpGain} XP`, {
      fontSize: '12px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 30, `+${coinsGain} Coins 💰`, {
      fontSize: '12px',
      color: COLORS.warning,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 50, `+${gemsGain} Gems 💎`, {
      fontSize: '12px',
      color: COLORS.success,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Continue button
    const continueBtn = this.add.text(width / 2, height / 2 + 100, '✅ Continuar', {
      fontSize: '14px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#00b894',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    continueBtn.on('pointerover', () => {
      continueBtn.setScale(1.1);
    });

    continueBtn.on('pointerout', () => {
      continueBtn.setScale(1);
    });

    continueBtn.on('pointerdown', () => {
      this.scene.stop(SCENE_KEYS.BATTLE);
      this.scene.resume(SCENE_KEYS.WORLD_MAP);
    });
  }

  private showDefeatScreen(): void {
    const { width, height } = this.cameras.main;

    // Overlay
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);

    // Defeat panel
    const panel = this.add.rectangle(width / 2, height / 2, 400, 250, 0x2d2d44, 1).setOrigin(0.5);
    panel.setStrokeStyle(3, 0xe74c3c);

    this.add.text(width / 2, height / 2 - 80, '❌ ENTREVISTA INCONCLUSIVA', {
      fontSize: '20px',
      color: COLORS.error,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 40, 'O lead não se abriu...', {
      fontSize: '14px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 10, 'Tente novamente com uma abordagem diferente!', {
      fontSize: '12px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif',
      align: 'center',
      wordWrap: { width: 350 }
    }).setOrigin(0.5);

    // Retry button
    const retryBtn = this.add.text(width / 2, height / 2 + 50, '🔄 Voltar ao Mapa', {
      fontSize: '14px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#e74c3c',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    retryBtn.on('pointerover', () => {
      retryBtn.setScale(1.1);
    });

    retryBtn.on('pointerout', () => {
      retryBtn.setScale(1);
    });

    retryBtn.on('pointerdown', () => {
      this.scene.stop(SCENE_KEYS.BATTLE);
      this.scene.resume(SCENE_KEYS.WORLD_MAP);
    });
  }
}
