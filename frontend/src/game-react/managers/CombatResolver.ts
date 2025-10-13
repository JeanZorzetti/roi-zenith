// ============= COMBAT RESOLVER =============
// Sistema de resolução de combate (cálculos de dano, crítico, etc)

import { Character, BattleEvent, Skill } from '../types/battle.types';

export class CombatResolver {
  /**
   * Calcula dano de ataque básico
   */
  public static calculateDamage(
    attacker: Character,
    defender: Character,
    skillPower: number = 1
  ): { damage: number; isCritical: boolean } {
    // Dano base = (Attack do atacante * skillPower) - Defense do defensor
    const baseDamage = Math.max(1, attacker.stats.attack * skillPower - defender.stats.defense);

    // Variação aleatória (±10%)
    const variance = 0.9 + Math.random() * 0.2;
    let damage = Math.floor(baseDamage * variance);

    // Chance de crítico
    const isCritical = Math.random() * 100 < attacker.stats.critChance;
    if (isCritical) {
      damage = Math.floor(damage * attacker.stats.critDamage);
    }

    return { damage, isCritical };
  }

  /**
   * Aplica dano a um personagem
   */
  public static applyDamage(character: Character, damage: number): Character {
    const newHp = Math.max(0, character.stats.currentHp - damage);
    return {
      ...character,
      stats: {
        ...character.stats,
        currentHp: newHp,
      },
    };
  }

  /**
   * Aplica cura a um personagem
   */
  public static applyHeal(character: Character, healAmount: number): Character {
    const newHp = Math.min(character.stats.maxHp, character.stats.currentHp + healAmount);
    return {
      ...character,
      stats: {
        ...character.stats,
        currentHp: newHp,
      },
    };
  }

  /**
   * Verifica se personagem está derrotado
   */
  public static isDefeated(character: Character): boolean {
    return character.stats.currentHp <= 0;
  }

  /**
   * Calcula iniciativa (quem ataca primeiro)
   */
  public static calculateInitiative(player: Character, enemy: Character): 'player' | 'enemy' {
    // Baseado em speed com chance aleatória
    const playerSpeed = player.stats.speed + Math.random() * 10;
    const enemySpeed = enemy.stats.speed + Math.random() * 10;

    return playerSpeed >= enemySpeed ? 'player' : 'enemy';
  }

  /**
   * Gera evento de batalha para o log
   */
  public static createBattleEvent(
    type: BattleEvent['type'],
    actor: 'player' | 'enemy',
    target: 'player' | 'enemy',
    options: {
      value?: number;
      isCritical?: boolean;
      skillName?: string;
      customMessage?: string;
    } = {}
  ): BattleEvent {
    let message = options.customMessage || '';

    if (!message) {
      const actorName = actor === 'player' ? 'Você' : 'Inimigo';
      const targetName = target === 'player' ? 'você' : 'o inimigo';

      switch (type) {
        case 'attack':
          message = `${actorName} atacou ${targetName}`;
          if (options.isCritical) {
            message += ' com um CRÍTICO';
          }
          if (options.value) {
            message += ` causando ${options.value} de dano!`;
          }
          break;
        case 'skill':
          message = `${actorName} usou ${options.skillName || 'habilidade'}`;
          break;
        case 'damage':
          message = `${targetName === 'você' ? 'Você' : 'Inimigo'} recebeu ${options.value || 0} de dano`;
          break;
        case 'heal':
          message = `${targetName === 'você' ? 'Você' : 'Inimigo'} recuperou ${options.value || 0} HP`;
          break;
        case 'buff':
          message = `${actorName} recebeu um buff!`;
          break;
        case 'debuff':
          message = `${targetName === 'você' ? 'Você' : 'Inimigo'} recebeu um debuff!`;
          break;
        case 'turn_end':
          message = `Turno ${options.value || 0} finalizado`;
          break;
        default:
          message = `Ação de batalha`;
      }
    }

    return {
      id: `event_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
      type,
      actor,
      target,
      value: options.value,
      isCritical: options.isCritical,
      skillName: options.skillName,
      message,
    };
  }

  /**
   * Processa efeitos de status (buffs, debuffs, DoT, HoT)
   */
  public static processStatusEffects(character: Character): {
    character: Character;
    events: BattleEvent[];
  } {
    const events: BattleEvent[] = [];
    let updatedCharacter = { ...character };

    character.statusEffects.forEach((effect) => {
      if (effect.duration > 0) {
        // Aplicar efeito
        if (effect.type === 'dot') {
          // Damage over time
          updatedCharacter = this.applyDamage(updatedCharacter, effect.value);
          events.push(
            this.createBattleEvent('damage', 'enemy', character.id === 'player' ? 'player' : 'enemy', {
              value: effect.value,
              customMessage: `${effect.name} causou ${effect.value} de dano`,
            })
          );
        } else if (effect.type === 'hot') {
          // Heal over time
          updatedCharacter = this.applyHeal(updatedCharacter, effect.value);
          events.push(
            this.createBattleEvent('heal', 'player', character.id === 'player' ? 'player' : 'enemy', {
              value: effect.value,
              customMessage: `${effect.name} curou ${effect.value} HP`,
            })
          );
        }
      }
    });

    // Reduzir duração dos efeitos
    updatedCharacter.statusEffects = character.statusEffects
      .map((effect) => ({
        ...effect,
        duration: effect.duration - 1,
      }))
      .filter((effect) => effect.duration > 0);

    return { character: updatedCharacter, events };
  }

  /**
   * Reduz cooldown de skills
   */
  public static updateSkillCooldowns(character: Character): Character {
    return {
      ...character,
      skills: character.skills.map((skill) => ({
        ...skill,
        currentCooldown: Math.max(0, skill.currentCooldown - 1),
      })),
    };
  }

  /**
   * Calcula recompensas de batalha
   */
  public static calculateRewards(enemy: Character, victory: boolean): {
    exp: number;
    coins: number;
    items: string[];
  } {
    if (!victory) {
      return { exp: 0, coins: 0, items: [] };
    }

    // Recompensas baseadas no nível do inimigo
    const baseExp = enemy.level * 50;
    const baseCoins = enemy.level * 25;

    // Variação aleatória (±20%)
    const expVariance = 0.8 + Math.random() * 0.4;
    const coinVariance = 0.8 + Math.random() * 0.4;

    const exp = Math.floor(baseExp * expVariance);
    const coins = Math.floor(baseCoins * coinVariance);

    // Chance de dropar item (30%)
    const items: string[] = [];
    if (Math.random() < 0.3) {
      items.push('random_item_' + Math.floor(Math.random() * 100));
    }

    return { exp, coins, items };
  }

  /**
   * Executa IA do inimigo (decisão de ação)
   */
  public static enemyAI(enemy: Character, player: Character): {
    action: 'attack' | 'skill';
    skillId?: string;
  } {
    // IA simples: 70% ataque básico, 30% skill aleatória disponível
    const availableSkills = enemy.skills.filter((skill) => skill.currentCooldown === 0);

    if (availableSkills.length > 0 && Math.random() < 0.3) {
      const randomSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
      return { action: 'skill', skillId: randomSkill.id };
    }

    return { action: 'attack' };
  }
}
