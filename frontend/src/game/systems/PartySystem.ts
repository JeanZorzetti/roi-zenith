// ============= PARTY SYSTEM =============
// Manages NPC recruitment, party composition, and bonuses

export interface NPC {
  id: string;
  name: string;
  role: string;
  description: string;
  cost: number;
  unlockLevel: number;
  passive: {
    name: string;
    description: string;
    effect: Record<string, number>;
  };
  skill: {
    name: string;
    description: string;
    cooldown: number;
  };
  avatar: string;
}

export interface PartyMember extends NPC {
  level: number;
  recruitedAt: Date;
}

export class PartySystem {
  private availableNPCs: Map<string, NPC> = new Map();
  private recruitedNPCs: Map<string, PartyMember> = new Map();
  private maxPartySize: number = 3;

  /**
   * Initialize with NPC database
   */
  public initialize(npcs: NPC[]): void {
    npcs.forEach(npc => {
      this.availableNPCs.set(npc.id, npc);
    });
  }

  /**
   * Get all available NPCs
   */
  public getAvailableNPCs(playerLevel: number): NPC[] {
    return Array.from(this.availableNPCs.values())
      .filter(npc => npc.unlockLevel <= playerLevel);
  }

  /**
   * Get recruited NPCs
   */
  public getRecruitedNPCs(): PartyMember[] {
    return Array.from(this.recruitedNPCs.values());
  }

  /**
   * Check if NPC is recruited
   */
  public isRecruited(npcId: string): boolean {
    return this.recruitedNPCs.has(npcId);
  }

  /**
   * Recruit NPC
   */
  public recruitNPC(npcId: string, playerLevel: number, playerCoins: number): boolean {
    const npc = this.availableNPCs.get(npcId);

    if (!npc) {
      console.warn(`NPC ${npcId} not found`);
      return false;
    }

    if (this.isRecruited(npcId)) {
      console.warn(`NPC ${npcId} already recruited`);
      return false;
    }

    if (playerLevel < npc.unlockLevel) {
      console.warn(`Player level ${playerLevel} insufficient for NPC ${npc.name} (requires ${npc.unlockLevel})`);
      return false;
    }

    if (playerCoins < npc.cost) {
      console.warn(`Insufficient coins: ${playerCoins} < ${npc.cost}`);
      return false;
    }

    if (this.recruitedNPCs.size >= this.maxPartySize) {
      console.warn(`Party is full (${this.maxPartySize}/${this.maxPartySize})`);
      return false;
    }

    // Recruit NPC
    const partyMember: PartyMember = {
      ...npc,
      level: 1,
      recruitedAt: new Date()
    };

    this.recruitedNPCs.set(npcId, partyMember);
    console.log(`NPC recruited: ${npc.name}`);
    return true;
  }

  /**
   * Remove NPC from party
   */
  public removeNPC(npcId: string): boolean {
    if (!this.isRecruited(npcId)) {
      console.warn(`NPC ${npcId} is not recruited`);
      return false;
    }

    this.recruitedNPCs.delete(npcId);
    console.log(`NPC ${npcId} removed from party`);
    return true;
  }

  /**
   * Calculate total party bonuses
   */
  public calculatePartyBonuses(): Record<string, number> {
    const bonuses: Record<string, number> = {
      xpBonus: 0,
      coinBonus: 0,
      energyRegen: 0,
      responseRate: 0,
      discoveryChance: 0,
      relationshipGain: 0,
    };

    this.recruitedNPCs.forEach(member => {
      Object.entries(member.passive.effect).forEach(([key, value]) => {
        bonuses[key] = (bonuses[key] || 0) + value;
      });
    });

    return bonuses;
  }

  /**
   * Get party size
   */
  public getPartySize(): { current: number; max: number } {
    return {
      current: this.recruitedNPCs.size,
      max: this.maxPartySize,
    };
  }

  /**
   * Upgrade max party size
   */
  public upgradePartySize(): void {
    this.maxPartySize++;
    console.log(`Party size increased to ${this.maxPartySize}`);
  }

  /**
   * Get NPC by ID
   */
  public getNPC(npcId: string): NPC | undefined {
    return this.availableNPCs.get(npcId);
  }

  /**
   * Get party member
   */
  public getPartyMember(npcId: string): PartyMember | undefined {
    return this.recruitedNPCs.get(npcId);
  }

  /**
   * Clear party (for testing)
   */
  public clear(): void {
    this.recruitedNPCs.clear();
  }
}

export default new PartySystem();
