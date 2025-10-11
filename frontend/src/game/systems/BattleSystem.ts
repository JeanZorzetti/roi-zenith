export interface BattleResult {
  victory: boolean;
  painDiscovered: boolean;
  painIntensity?: number;
  xpGained: number;
  coinsGained: number;
  gemsGained: number;
  relationshipChange: number;
  itemsDropped: string[];
}

export interface BattleStats {
  leadHP: number;
  maxLeadHP: number;
  playerHP: number;
  maxPlayerHP: number;
  relationship: number;
  discoveryProgress: number;
  currentPhase: number;
}

export class BattleSystem {
  private stats: BattleStats;

  constructor(leadLevel: number) {
    this.stats = {
      leadHP: 100 + (leadLevel * 20),
      maxLeadHP: 100 + (leadLevel * 20),
      playerHP: 100,
      maxPlayerHP: 100,
      relationship: 0,
      discoveryProgress: 0,
      currentPhase: 1
    };
  }

  getStats(): BattleStats {
    return { ...this.stats };
  }

  executeAction(
    actionId: string,
    discoveryChance: number,
    relationshipChange: number
  ): {
    success: boolean;
    damage: number;
    progressGain: number;
    message: string;
  } {
    // Roll for success
    const roll = Math.random() * 100;
    const success = roll <= discoveryChance;

    // Calculate damage (represents breaking lead's guard)
    const baseDamage = success ? 20 : 5;
    const variance = Math.floor(Math.random() * 15);
    const damage = baseDamage + variance;

    // Apply damage
    this.stats.leadHP = Math.max(0, this.stats.leadHP - damage);

    // Update relationship
    this.stats.relationship = Math.max(
      -100,
      Math.min(100, this.stats.relationship + relationshipChange)
    );

    // Calculate discovery progress
    let progressGain = 0;
    if (success) {
      progressGain = 20 + (discoveryChance / 5);
      // Bonus if relationship is good
      if (this.stats.relationship > 50) {
        progressGain *= 1.2;
      }
      this.stats.discoveryProgress = Math.min(100, this.stats.discoveryProgress + progressGain);
    }

    // Generate message
    const message = this.generateActionMessage(actionId, success, progressGain);

    return {
      success,
      damage,
      progressGain,
      message
    };
  }

  private generateActionMessage(actionId: string, success: boolean, progressGain: number): string {
    const successMessages: Record<string, string[]> = {
      open_question: [
        'O lead abriu o jogo e compartilhou seus desafios!',
        'Pergunta certeira! O lead está se abrindo.',
        'Excelente! Você tocou em um ponto sensível.'
      ],
      direct_question: [
        'Direto ao ponto! O lead confirmou o problema.',
        'Pergunta direta funcionou! Você descobriu uma dor real.',
        'Bingo! O lead admitiu a dificuldade.'
      ],
      active_listening: [
        'Sua escuta ativa criou confiança. O lead está mais confortável.',
        'O silêncio estratégico funcionou. O lead revelou mais.',
        'Deixar falar foi perfeito! Mais insights surgiram.'
      ],
      present_data: [
        'O dado validou a experiência do lead. Ele se sentiu compreendido.',
        'Mostrar o benchmark abriu os olhos do lead!',
        'O contexto de mercado fez o lead refletir sobre sua situação.'
      ],
      empathy: [
        'Sua empatia quebrou barreiras. O relacionamento melhorou muito!',
        'O lead se sentiu compreendido e baixou a guarda.',
        'Conexão emocional estabelecida! A entrevista está fluindo.'
      ],
      suggest_solution: [
        'A sugestão validou a dor! O lead está interessado.',
        'Você mostrou que entende o problema. O lead está engajado.',
        'Propor solução gerou insights sobre a intensidade da dor!'
      ]
    };

    const failMessages: Record<string, string[]> = {
      open_question: [
        'O lead respondeu de forma vaga...',
        'Pergunta muito genérica. Tente algo mais específico.',
        'O lead desviou do assunto.'
      ],
      direct_question: [
        'Muito direto! O lead ficou na defensiva.',
        'A pergunta foi invasiva demais. Ele se fechou.',
        'O lead não está pronto para essa pergunta ainda.'
      ],
      active_listening: [
        'O silêncio ficou desconfortável...',
        'O lead não tinha muito a dizer nesse momento.',
        'A escuta não trouxe novos insights agora.'
      ],
      present_data: [
        'O dado não ressoou com a realidade do lead.',
        'O lead não se identificou com o benchmark apresentado.',
        'Talvez esse não seja o momento para dados...'
      ],
      empathy: [
        'O lead percebeu sua empatia, mas ainda está guardado.',
        'A conexão emocional não foi forte o suficiente ainda.',
        'Empat ia demonstrada, mas o lead precisa de mais tempo.'
      ],
      suggest_solution: [
        'Muito cedo para soluções! O lead ficou confuso.',
        'A sugestão foi prematura. Entenda mais a dor primeiro.',
        'O lead não está pronto para discutir soluções ainda.'
      ]
    };

    const messages = success ? successMessages[actionId] : failMessages[actionId];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return randomMessage;
  }

  checkPhaseAdvancement(): boolean {
    const phaseThresholds = [25, 50, 75];
    if (
      this.stats.currentPhase < 4 &&
      this.stats.discoveryProgress >= phaseThresholds[this.stats.currentPhase - 1]
    ) {
      this.stats.currentPhase++;
      return true;
    }
    return false;
  }

  checkBattleEnd(): { ended: boolean; victory: boolean } {
    // Victory conditions
    if (this.stats.discoveryProgress >= 100) {
      return { ended: true, victory: true };
    }

    if (this.stats.leadHP <= 0) {
      return { ended: true, victory: true };
    }

    // Defeat conditions
    if (this.stats.relationship <= -50) {
      return { ended: true, victory: false };
    }

    if (this.stats.playerHP <= 0) {
      return { ended: true, victory: false };
    }

    return { ended: false, victory: false };
  }

  calculateRewards(leadLevel: number): BattleResult {
    const victory = this.stats.discoveryProgress >= 100 || this.stats.leadHP <= 0;
    const painDiscovered = this.stats.discoveryProgress >= 75;

    // XP calculation
    let xpGained = 50 + (leadLevel * 10);
    if (this.stats.discoveryProgress >= 100) {
      xpGained *= 1.5; // Bonus for perfect discovery
    }
    if (this.stats.relationship > 70) {
      xpGained *= 1.2; // Bonus for great relationship
    }

    // Coins calculation
    let coinsGained = 25 + (leadLevel * 5);
    if (victory) {
      coinsGained *= 2;
    }

    // Gems calculation
    let gemsGained = 0;
    if (painDiscovered) {
      const painIntensity = Math.floor(this.stats.discoveryProgress / 10);
      gemsGained = Math.max(1, Math.floor(painIntensity / 2));
    }

    // Relationship final value
    const relationshipChange = this.stats.relationship;

    // Item drops (simplified)
    const itemsDropped: string[] = [];
    if (victory && Math.random() < 0.3) {
      itemsDropped.push('common_item');
    }
    if (this.stats.discoveryProgress === 100 && Math.random() < 0.1) {
      itemsDropped.push('rare_item');
    }

    return {
      victory,
      painDiscovered,
      painIntensity: painDiscovered ? Math.floor(this.stats.discoveryProgress / 10) : undefined,
      xpGained: Math.floor(xpGained),
      coinsGained: Math.floor(coinsGained),
      gemsGained,
      relationshipChange,
      itemsDropped
    };
  }

  // Calculate pain intensity based on discovery progress and lead level
  calculatePainIntensity(leadLevel: number): number {
    const baseIntensity = Math.floor(this.stats.discoveryProgress / 10);
    const levelBonus = Math.floor(leadLevel / 10);
    return Math.min(10, baseIntensity + levelBonus);
  }

  // Determine pain category based on phase where discovery happened
  getPainCategory(): string {
    const categories = [
      'operacional', // Phase 1: Small Talk
      'financeiro', // Phase 2: Context Building
      'estratégico', // Phase 3: Pain Discovery
      'crítico' // Phase 4: Solution Ideation
    ];
    return categories[this.stats.currentPhase - 1] || 'operacional';
  }

  // Generate random pain text based on discovery quality
  generatePainText(): string {
    const painTexts: Record<string, string[]> = {
      low: [
        'Processo manual lento',
        'Falta de visibilidade',
        'Retrabalho frequente',
        'Comunicação ineficiente'
      ],
      medium: [
        'Controle financeiro insuficiente',
        'Dificuldade em escalar operações',
        'Falta de integração entre sistemas',
        'Perda de oportunidades por desorganização'
      ],
      high: [
        'Prejuízo financeiro mensal significativo',
        'Risco de compliance e multas',
        'Perda de competitividade no mercado',
        'Impossibilidade de crescer sem resolver'
      ]
    };

    const quality =
      this.stats.discoveryProgress >= 90
        ? 'high'
        : this.stats.discoveryProgress >= 60
        ? 'medium'
        : 'low';

    const texts = painTexts[quality];
    return texts[Math.floor(Math.random() * texts.length)];
  }
}
