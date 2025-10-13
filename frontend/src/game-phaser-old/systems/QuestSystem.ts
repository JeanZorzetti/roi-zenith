// ============= QUEST SYSTEM =============
// Manages player quests, progress tracking, and rewards

export type QuestType = 'main' | 'daily' | 'weekly';
export type QuestStatus = 'locked' | 'active' | 'completed' | 'claimed';

export interface QuestObjective {
  id: string;
  description: string;
  current: number;
  target: number;
  completed: boolean;
}

export interface QuestReward {
  experience: number;
  coins: number;
  gems?: number;
  items?: string[]; // item IDs
  reputation?: number;
}

export interface Quest {
  id: string;
  name: string;
  type: QuestType;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward;
  status: QuestStatus;
  unlockLevel?: number;
  prerequisiteQuests?: string[]; // quest IDs
  expiresAt?: Date; // for daily/weekly
}

export class QuestSystem {
  private quests: Map<string, Quest> = new Map();

  /**
   * Initialize quest system with quest data
   */
  public initialize(questsData: Quest[]): void {
    questsData.forEach(quest => {
      this.quests.set(quest.id, quest);
    });
  }

  /**
   * Get all active quests
   */
  public getActiveQuests(): Quest[] {
    return Array.from(this.quests.values()).filter(q => q.status === 'active');
  }

  /**
   * Get quests by type
   */
  public getQuestsByType(type: QuestType): Quest[] {
    return Array.from(this.quests.values()).filter(q => q.type === type);
  }

  /**
   * Get quest by ID
   */
  public getQuest(questId: string): Quest | undefined {
    return this.quests.get(questId);
  }

  /**
   * Start a quest
   */
  public startQuest(questId: string, playerLevel: number): boolean {
    const quest = this.quests.get(questId);
    if (!quest) {
      console.warn(`Quest ${questId} not found`);
      return false;
    }

    if (quest.status !== 'locked') {
      console.warn(`Quest ${questId} is already ${quest.status}`);
      return false;
    }

    // Check level requirement
    if (quest.unlockLevel && playerLevel < quest.unlockLevel) {
      console.warn(`Quest ${questId} requires level ${quest.unlockLevel}`);
      return false;
    }

    // Check prerequisite quests
    if (quest.prerequisiteQuests) {
      const allPrereqsCompleted = quest.prerequisiteQuests.every(prereqId => {
        const prereq = this.quests.get(prereqId);
        return prereq && prereq.status === 'claimed';
      });

      if (!allPrereqsCompleted) {
        console.warn(`Quest ${questId} prerequisites not met`);
        return false;
      }
    }

    quest.status = 'active';
    console.log(`Quest started: ${quest.name}`);
    return true;
  }

  /**
   * Update quest progress
   */
  public updateQuestProgress(questId: string, objectiveId: string, amount: number = 1): boolean {
    const quest = this.quests.get(questId);
    if (!quest || quest.status !== 'active') {
      return false;
    }

    const objective = quest.objectives.find(obj => obj.id === objectiveId);
    if (!objective) {
      console.warn(`Objective ${objectiveId} not found in quest ${questId}`);
      return false;
    }

    if (objective.completed) {
      return false; // Already completed
    }

    objective.current = Math.min(objective.current + amount, objective.target);
    objective.completed = objective.current >= objective.target;

    console.log(`Quest progress: ${quest.name} - ${objective.description}: ${objective.current}/${objective.target}`);

    // Check if all objectives are completed
    const allObjectivesCompleted = quest.objectives.every(obj => obj.completed);
    if (allObjectivesCompleted) {
      quest.status = 'completed';
      console.log(`Quest completed: ${quest.name}`);
    }

    return true;
  }

  /**
   * Claim quest rewards
   */
  public claimRewards(questId: string): QuestReward | null {
    const quest = this.quests.get(questId);
    if (!quest) {
      console.warn(`Quest ${questId} not found`);
      return null;
    }

    if (quest.status !== 'completed') {
      console.warn(`Quest ${questId} is not completed yet`);
      return null;
    }

    quest.status = 'claimed';
    console.log(`Quest rewards claimed: ${quest.name}`);
    return { ...quest.rewards };
  }

  /**
   * Get quest completion percentage
   */
  public getQuestCompletion(questId: string): number {
    const quest = this.quests.get(questId);
    if (!quest) return 0;

    const totalTargets = quest.objectives.reduce((sum, obj) => sum + obj.target, 0);
    const totalCurrent = quest.objectives.reduce((sum, obj) => sum + obj.current, 0);

    return totalTargets > 0 ? (totalCurrent / totalTargets) * 100 : 0;
  }

  /**
   * Reset daily quests
   */
  public resetDailyQuests(): void {
    this.quests.forEach(quest => {
      if (quest.type === 'daily') {
        quest.status = 'active';
        quest.objectives.forEach(obj => {
          obj.current = 0;
          obj.completed = false;
        });
      }
    });
    console.log('Daily quests reset');
  }

  /**
   * Reset weekly quests
   */
  public resetWeeklyQuests(): void {
    this.quests.forEach(quest => {
      if (quest.type === 'weekly') {
        quest.status = 'active';
        quest.objectives.forEach(obj => {
          obj.current = 0;
          obj.completed = false;
        });
      }
    });
    console.log('Weekly quests reset');
  }

  /**
   * Get completed quests count
   */
  public getCompletedQuestsCount(): number {
    return Array.from(this.quests.values()).filter(q => q.status === 'claimed').length;
  }

  /**
   * Get quests summary
   */
  public getQuestsSummary(): {
    total: number;
    active: number;
    completed: number;
    claimed: number;
  } {
    const all = Array.from(this.quests.values());
    return {
      total: all.length,
      active: all.filter(q => q.status === 'active').length,
      completed: all.filter(q => q.status === 'completed').length,
      claimed: all.filter(q => q.status === 'claimed').length,
    };
  }

  /**
   * Auto-track quest progress from game events
   */
  public trackEvent(eventType: string, eventData?: any): void {
    const activeQuests = this.getActiveQuests();

    // Map event types to quest objectives
    const eventMap: Record<string, string> = {
      'contact_added': 'add_contacts',
      'interview_completed': 'complete_interviews',
      'pain_discovered': 'discover_pains',
      'territory_explored': 'explore_territories',
      'lead_qualified': 'qualify_leads',
      'solution_mapped': 'map_solutions',
    };

    const objectiveId = eventMap[eventType];
    if (!objectiveId) return;

    // Update all active quests with matching objectives
    activeQuests.forEach(quest => {
      const hasObjective = quest.objectives.some(obj => obj.id === objectiveId);
      if (hasObjective) {
        this.updateQuestProgress(quest.id, objectiveId, 1);
      }
    });
  }

  /**
   * Clear all quests (for testing)
   */
  public clear(): void {
    this.quests.clear();
  }
}

export default new QuestSystem();
