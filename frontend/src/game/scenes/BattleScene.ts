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

  private currentPhase: number = 1;
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

    // STOP UIScene completely (not pause)
    this.scene.stop(SCENE_KEYS.UI);

    // Background - darker
    this.add.rectangle(0, 0, width, height, 0x0f0f1e).setOrigin(0);

    // Title bar - larger
    const titleBar = this.add.rectangle(width / 2, 40, width - 40, 70, 0x1a1a2e, 0.98).setOrigin(0.5);
    titleBar.setStrokeStyle(3, 0x6c5ce7);

    this.add.text(width / 2, 28, '⚔️ ENTREVISTA DE PESQUISA', {
      fontSize: '22px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 54, `Fase ${this.currentPhase}: ${this.phaseNames[this.currentPhase - 1]}`, {
      fontSize: '14px',
      color: COLORS.warning,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Lead panel (left) - moved down more
    this.createLeadPanel(width * 0.25, 200);

    // Player panel (right) - moved down more
    this.createPlayerPanel(width * 0.75, 200);

    // Battle log (center) - centered horizontally, moved down
    this.createBattleLog(width / 2, 360);

    // Action cards (bottom)
    this.createActionCards(width, height);

    // Buttons
    this.createButtons(width, height);
  }

  private createLeadPanel(x: number, y: number): void {
    const panelWidth = 280;
    const panelHeight = 200;

    const panel = this.add.rectangle(x, y, panelWidth, panelHeight, 0x1a1a2e, 0.98).setOrigin(0.5);
    panel.setStrokeStyle(3, 0xe74c3c);

    // Icon
    this.add.text(x, y - 85, '🏢', {
      fontSize: '32px'
    }).setOrigin(0.5);

    // Name
    this.add.text(x, y - 55, this.leadName, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Company
    this.add.text(x, y - 36, this.leadCompany, {
      fontSize: '12px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // HP Label
    this.add.text(x, y - 10, 'HP:', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // HP Bar background - CENTERED
    const hpBarWidth = 200;
    const hpBarBg = this.add.rectangle(x, y + 10, hpBarWidth, 20, 0x2d2d2d).setOrigin(0.5);
    hpBarBg.setStrokeStyle(2, 0x555555);

    // HP Bar fill - CENTERED
    const hpBar = this.add.rectangle(x - hpBarWidth/2, y + 10, hpBarWidth, 20, 0xe74c3c).setOrigin(0, 0.5);
    hpBar.setData('maxWidth', hpBarWidth);
    this.registry.set('leadHPBar', hpBar);

    // HP Text - centered on bar
    const hpText = this.add.text(x, y + 10, `${this.leadHP}/${this.maxLeadHP}`, {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.registry.set('leadHPText', hpText);

    // Level
    this.add.text(x, y + 45, `Nível ${this.leadLevel}`, {
      fontSize: '15px',
      color: COLORS.secondary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Relationship
    const relColor = this.relationship > 50 ? '#2ecc71' : this.relationship < 0 ? '#e74c3c' : '#f59e0b';
    const relText = this.add.text(x, y + 75, `Relacionamento: ${this.relationship}%`, {
      fontSize: '13px',
      color: relColor,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.registry.set('relationshipText', relText);
  }

  private createPlayerPanel(x: number, y: number): void {
    const panelWidth = 280;
    const panelHeight = 200;

    const panel = this.add.rectangle(x, y, panelWidth, panelHeight, 0x1a1a2e, 0.98).setOrigin(0.5);
    panel.setStrokeStyle(3, 0x00b894);

    // Icon
    this.add.text(x, y - 85, '🔍', {
      fontSize: '32px'
    }).setOrigin(0.5);

    // Title
    this.add.text(x, y - 55, 'PESQUISADOR(A)', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(x, y - 36, 'Você', {
      fontSize: '12px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Foco Label
    this.add.text(x, y - 10, 'Foco:', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Foco Bar background - CENTERED
    const focoBarWidth = 200;
    const focoBarBg = this.add.rectangle(x, y + 10, focoBarWidth, 20, 0x2d2d2d).setOrigin(0.5);
    focoBarBg.setStrokeStyle(2, 0x555555);

    // Foco Bar fill - CENTERED
    const focoBar = this.add.rectangle(x - focoBarWidth/2, y + 10, focoBarWidth, 20, 0x00b894).setOrigin(0, 0.5);
    focoBar.setData('maxWidth', focoBarWidth);
    this.registry.set('playerHPBar', focoBar);

    // Foco Text - centered on bar
    const focoText = this.add.text(x, y + 10, `${this.playerHP}/${this.maxPlayerHP}`, {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.registry.set('playerHPText', focoText);

    // Discovery Label
    this.add.text(x, y + 40, 'Descoberta:', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Discovery Bar background - CENTERED
    const discBarWidth = 200;
    const discBarBg = this.add.rectangle(x, y + 60, discBarWidth, 20, 0x2d2d2d).setOrigin(0.5);
    discBarBg.setStrokeStyle(2, 0x555555);

    // Discovery Bar fill - CENTERED
    const discBar = this.add.rectangle(x - discBarWidth/2, y + 60, 0, 20, 0xfdcb6e).setOrigin(0, 0.5);
    discBar.setData('maxWidth', discBarWidth);
    this.registry.set('discoveryBar', discBar);

    // Discovery percentage - centered on bar
    const discText = this.add.text(x, y + 60, `${this.discoveryProgress}%`, {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.registry.set('discoveryText', discText);
  }

  private createBattleLog(x: number, y: number): void {
    const logWidth = 600;
    const logHeight = 120;

    const logPanel = this.add.rectangle(x, y, logWidth, logHeight, 0x1a1a2e, 0.95).setOrigin(0.5);
    logPanel.setStrokeStyle(2, 0x6c5ce7);

    this.add.text(x, y - 55, '📋 Log de Entrevista', {
      fontSize: '15px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const messageText = this.add.text(x, y, 'Selecione uma ação para começar a entrevista...', {
      fontSize: '14px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif',
      align: 'center',
      wordWrap: { width: logWidth - 60 }
    }).setOrigin(0.5);
    this.registry.set('battleLog', messageText);
  }

  private createActionCards(width: number, height: number): void {
    const startY = height - 130;
    const cardWidth = 160;
    const cardHeight = 110;
    const spacing = 20;
    const totalWidth = (cardWidth * 3) + (spacing * 2);
    const startX = (width - totalWidth) / 2;

    // Show first 3 cards
    for (let i = 0; i < 3; i++) {
      const card = this.actionCards[i];
      const x = startX + (i * (cardWidth + spacing)) + (cardWidth / 2);
      this.createActionCard(card, x, startY, cardWidth, cardHeight);
    }
  }

  private createActionCard(card: ActionCard, x: number, y: number, width: number, height: number): void {
    const cardContainer = this.add.container(x, y);

    const bg = this.add.rectangle(0, 0, width, height, 0x1a1a2e, 1);
    bg.setStrokeStyle(4, 0x6c5ce7);
    bg.setInteractive({ useHandCursor: true });

    const icon = this.add.text(0, -35, card.icon, {
      fontSize: '36px'
    }).setOrigin(0.5);

    const name = this.add.text(0, -5, card.name, {
      fontSize: '14px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: width - 20 }
    }).setOrigin(0.5);

    const desc = this.add.text(0, 18, card.description, {
      fontSize: '11px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif',
      align: 'center',
      wordWrap: { width: width - 20 }
    }).setOrigin(0.5);

    const costText = card.energyCost > 0 ? `⚡ ${card.energyCost}` : '⚡ Grátis';
    const cost = this.add.text(0, 42, costText, {
      fontSize: '12px',
      color: card.energyCost > 0 ? COLORS.warning : COLORS.success,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    cardContainer.add([bg, icon, name, desc, cost]);

    // Hover effects
    bg.on('pointerover', () => {
      bg.setStrokeStyle(4, 0xfdcb6e);
      bg.setFillStyle(0x2d2d44);
      this.tweens.add({
        targets: cardContainer,
        y: y - 10,
        scale: 1.05,
        duration: 200,
        ease: 'Back.easeOut'
      });
    });

    bg.on('pointerout', () => {
      bg.setStrokeStyle(4, 0x6c5ce7);
      bg.setFillStyle(0x1a1a2e);
      this.tweens.add({
        targets: cardContainer,
        y: y,
        scale: 1,
        duration: 200,
        ease: 'Back.easeIn'
      });
    });

    bg.on('pointerdown', () => {
      this.selectedAction = card;
      this.executeAction(card);
    });
  }

  private createButtons(width: number, height: number): void {
    const btnY = height - 30;

    // Flee button
    const fleeBtn = this.add.text(40, btnY, '❌ Desistir', {
      fontSize: '13px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      backgroundColor: '#e74c3c',
      padding: { x: 15, y: 8 }
    }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });

    fleeBtn.on('pointerover', () => {
      fleeBtn.setStyle({ backgroundColor: '#c0392b' });
      fleeBtn.setScale(1.05);
    });

    fleeBtn.on('pointerout', () => {
      fleeBtn.setStyle({ backgroundColor: '#e74c3c' });
      fleeBtn.setScale(1);
    });

    fleeBtn.on('pointerdown', () => {
      this.endBattle(false);
    });
  }

  private executeAction(card: ActionCard): void {
    const roll = Math.random() * 100;
    const success = roll <= card.discoveryChance;

    this.relationship = Math.max(-100, Math.min(100, this.relationship + card.relationshipChange));

    if (success) {
      const progressGain = 20 + (card.discoveryChance / 5);
      this.discoveryProgress = Math.min(100, this.discoveryProgress + progressGain);
    }

    const damage = success ? 20 + Math.floor(Math.random() * 15) : 5 + Math.floor(Math.random() * 5);
    this.leadHP = Math.max(0, this.leadHP - damage);

    const logText = this.registry.get('battleLog') as Phaser.GameObjects.Text;
    let message = `${card.icon} ${card.name}\n\n`;

    if (success) {
      message += `✅ Sucesso! Descoberta +${Math.floor(20 + (card.discoveryChance / 5))}%\n`;
      message += `${this.leadName} compartilhou insights valiosos!`;
    } else {
      message += `⚠️ O lead ficou evasivo...\n`;
      message += `Tente uma abordagem diferente.`;
    }

    logText.setText(message);

    this.updateBattleUI();

    this.time.delayedCall(1500, () => {
      if (this.discoveryProgress >= 100 || this.leadHP <= 0) {
        this.endBattle(true);
      } else if (this.relationship <= -50) {
        this.endBattle(false);
      } else {
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
    leadHPText.setText(`${Math.floor(this.leadHP)}/${this.maxLeadHP}`);

    // Update discovery progress
    const discoveryBar = this.registry.get('discoveryBar') as Phaser.GameObjects.Rectangle;
    const discoveryText = this.registry.get('discoveryText') as Phaser.GameObjects.Text;
    discoveryBar.width = (discoveryBar.getData('maxWidth') * this.discoveryProgress) / 100;
    discoveryText.setText(`${Math.floor(this.discoveryProgress)}%`);

    // Update relationship text
    const relText = this.registry.get('relationshipText') as Phaser.GameObjects.Text;
    const relColor = this.relationship > 50 ? '#2ecc71' : this.relationship < 0 ? '#e74c3c' : '#f59e0b';
    relText.setText(`Relacionamento: ${Math.floor(this.relationship)}%`);
    relText.setColor(relColor);
  }

  private advancePhase(): void {
    this.currentPhase++;
    const logText = this.registry.get('battleLog') as Phaser.GameObjects.Text;
    logText.setText(`🎯 Fase ${this.currentPhase}: ${this.phaseNames[this.currentPhase - 1]}\n\nVocê avançou na entrevista!\nO lead está mais aberto agora.`);
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

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.85).setOrigin(0);

    const panel = this.add.rectangle(width / 2, height / 2, 450, 350, 0x2d2d44, 1).setOrigin(0.5);
    panel.setStrokeStyle(4, 0x00b894);

    this.add.text(width / 2, height / 2 - 130, '🎉 ENTREVISTA CONCLUÍDA!', {
      fontSize: '26px',
      color: '#00b894',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 85, 'Você descobriu insights valiosos!', {
      fontSize: '15px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    const xpGain = 50 + (this.leadLevel * 10);
    const coinsGain = 25 + (this.leadLevel * 5);
    const gemsGain = Math.floor(this.discoveryProgress / 20);

    this.add.text(width / 2, height / 2 - 45, 'Recompensas:', {
      fontSize: '16px',
      color: COLORS.warning,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 10, `+${xpGain} XP`, {
      fontSize: '14px',
      color: COLORS.primary,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 15, `💰 +${coinsGain} Coins`, {
      fontSize: '14px',
      color: COLORS.warning,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 40, `💎 +${gemsGain} Gems`, {
      fontSize: '14px',
      color: COLORS.success,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const continueBtn = this.add.text(width / 2, height / 2 + 110, '✅ Continuar', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      backgroundColor: '#00b894',
      padding: { x: 30, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    continueBtn.on('pointerover', () => {
      continueBtn.setScale(1.1);
      continueBtn.setStyle({ backgroundColor: '#019874' });
    });

    continueBtn.on('pointerout', () => {
      continueBtn.setScale(1);
      continueBtn.setStyle({ backgroundColor: '#00b894' });
    });

    continueBtn.on('pointerdown', () => {
      this.scene.stop(SCENE_KEYS.BATTLE);
      this.scene.resume(SCENE_KEYS.UI);
      this.scene.resume(SCENE_KEYS.WORLD_MAP);
    });
  }

  private showDefeatScreen(): void {
    const { width, height } = this.cameras.main;

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.85).setOrigin(0);

    const panel = this.add.rectangle(width / 2, height / 2, 450, 300, 0x2d2d44, 1).setOrigin(0.5);
    panel.setStrokeStyle(4, 0xe74c3c);

    this.add.text(width / 2, height / 2 - 100, '❌ ENTREVISTA INCONCLUSIVA', {
      fontSize: '22px',
      color: '#e74c3c',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 50, 'O lead não se abriu...', {
      fontSize: '15px',
      color: COLORS.text,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 10, 'Tente novamente com uma\nabordagem diferente!', {
      fontSize: '13px',
      color: COLORS.textSecondary,
      fontFamily: 'Arial, sans-serif',
      align: 'center'
    }).setOrigin(0.5);

    const retryBtn = this.add.text(width / 2, height / 2 + 70, '🔄 Voltar ao Mapa', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      backgroundColor: '#e74c3c',
      padding: { x: 30, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    retryBtn.on('pointerover', () => {
      retryBtn.setScale(1.1);
      retryBtn.setStyle({ backgroundColor: '#c0392b' });
    });

    retryBtn.on('pointerout', () => {
      retryBtn.setScale(1);
      retryBtn.setStyle({ backgroundColor: '#e74c3c' });
    });

    retryBtn.on('pointerdown', () => {
      this.scene.stop(SCENE_KEYS.BATTLE);
      this.scene.resume(SCENE_KEYS.UI);
      this.scene.resume(SCENE_KEYS.WORLD_MAP);
    });
  }
}
