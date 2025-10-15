// ============= WORLD MAP STORE =============
// Zustand store para o mapa mundial e territórios

import { create } from 'zustand';

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'in_progress' | 'completed';
  difficulty: 'easy' | 'medium' | 'hard';
  rewards: {
    exp: number;
    coins: number;
    items?: string[];
  };
  requirements?: {
    level?: number;
    completedQuests?: string[];
  };
}

export interface Territory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  isCurrent: boolean;
  progress: number; // 0-100
  totalQuests: number;
  completedQuests: number;
  quests: Quest[];
  requirements?: {
    level?: number;
    completedTerritories?: string[];
  };
}

interface WorldMapState {
  territories: Territory[];
  currentTerritoryId: string | null;
  selectedTerritoryId: string | null;

  // Actions
  selectTerritory: (territoryId: string) => void;
  setCurrentTerritory: (territoryId: string) => void;
  updateTerritoryProgress: (territoryId: string, progress: number) => void;
  unlockTerritory: (territoryId: string) => void;
  updateQuestStatus: (territoryId: string, questId: string, status: Quest['status']) => void;
  getTerritoryById: (territoryId: string) => Territory | undefined;
  getAvailableQuests: (territoryId: string) => Quest[];
}

// Initial clean territories (production-ready)
const initialTerritories: Territory[] = [
  {
    id: 'varejo',
    name: 'Varejo',
    description: 'Comércio tradicional e atendimento ao cliente',
    icon: 'Store',
    color: 'blue',
    isUnlocked: true,
    isCurrent: true,
    progress: 0,
    totalQuests: 10,
    completedQuests: 0,
    quests: [],
  },
  {
    id: 'b2b',
    name: 'B2B',
    description: 'Vendas corporativas e parcerias estratégicas',
    icon: 'Briefcase',
    color: 'purple',
    isUnlocked: false,
    isCurrent: false,
    progress: 0,
    totalQuests: 12,
    completedQuests: 0,
    quests: [],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Vendas online e marketing digital',
    icon: 'ShoppingCart',
    color: 'green',
    isUnlocked: false,
    isCurrent: false,
    progress: 0,
    totalQuests: 15,
    completedQuests: 0,
    quests: [],
  },
  {
    id: 'internacional',
    name: 'Internacional',
    description: 'Expansão global e comércio exterior',
    icon: 'Globe',
    color: 'orange',
    isUnlocked: false,
    isCurrent: false,
    progress: 0,
    totalQuests: 20,
    completedQuests: 0,
    quests: [],
    requirements: { level: 10, completedTerritories: ['varejo', 'b2b'] },
  },
];

export const useWorldMapStore = create<WorldMapState>((set, get) => ({
  territories: initialTerritories,
  currentTerritoryId: 'varejo',
  selectedTerritoryId: null,

  selectTerritory: (territoryId: string) => {
    set({ selectedTerritoryId: territoryId });
  },

  setCurrentTerritory: (territoryId: string) => {
    set((state) => ({
      territories: state.territories.map((t) => ({
        ...t,
        isCurrent: t.id === territoryId,
      })),
      currentTerritoryId: territoryId,
    }));
  },

  updateTerritoryProgress: (territoryId: string, progress: number) => {
    set((state) => ({
      territories: state.territories.map((t) =>
        t.id === territoryId ? { ...t, progress } : t
      ),
    }));
  },

  unlockTerritory: (territoryId: string) => {
    set((state) => ({
      territories: state.territories.map((t) =>
        t.id === territoryId ? { ...t, isUnlocked: true } : t
      ),
    }));
  },

  updateQuestStatus: (territoryId: string, questId: string, status: Quest['status']) => {
    set((state) => ({
      territories: state.territories.map((t) => {
        if (t.id !== territoryId) return t;

        const updatedQuests = t.quests.map((q) =>
          q.id === questId ? { ...q, status } : q
        );

        const completedQuests = updatedQuests.filter((q) => q.status === 'completed').length;
        const progress = Math.floor((completedQuests / t.totalQuests) * 100);

        return {
          ...t,
          quests: updatedQuests,
          completedQuests,
          progress,
        };
      }),
    }));
  },

  getTerritoryById: (territoryId: string) => {
    return get().territories.find((t) => t.id === territoryId);
  },

  getAvailableQuests: (territoryId: string) => {
    const territory = get().getTerritoryById(territoryId);
    return territory?.quests.filter((q) => q.status === 'available') || [];
  },
}));
