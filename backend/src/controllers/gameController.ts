// ============= GAME CONTROLLER =============

import { Request, Response } from 'express';
import gameService from '../services/gameService';

export class GameController {
  /**
   * GET /api/game/state
   * Retorna o estado atual do jogo do usuário
   */
  async getState(req: Request, res: Response) {
    try {
      const userId = req.user?.id; // Assume que tem auth middleware

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const state = await gameService.getGameState(userId);
      return res.json({ state });
    } catch (error) {
      console.error('Error getting game state:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * POST /api/game/init
   * Inicializa o jogo para o usuário
   */
  async initialize(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const state = await gameService.initializeGame(userId);
      return res.json({ state, message: 'Game initialized successfully' });
    } catch (error) {
      console.error('Error initializing game:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * GET /api/game/inventory
   * Retorna inventário do jogador
   */
  async getInventory(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const inventory = await gameService.getInventory(userId);
      const equipped = await gameService.getEquippedItems(userId);

      return res.json({ inventory, equipped });
    } catch (error) {
      console.error('Error getting inventory:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * POST /api/game/inventory/equip
   * Equipa um item
   */
  async equipItem(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { itemId } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      if (!itemId) {
        return res.status(400).json({ error: 'Item ID is required' });
      }

      const success = await gameService.equipItem(userId, itemId);

      if (!success) {
        return res.status(400).json({ error: 'Could not equip item' });
      }

      return res.json({ success: true, message: 'Item equipped successfully' });
    } catch (error) {
      console.error('Error equipping item:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * GET /api/game/party
   * Retorna party do jogador
   */
  async getParty(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const party = await gameService.getParty(userId);
      return res.json({ party });
    } catch (error) {
      console.error('Error getting party:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * POST /api/game/party/recruit
   * Recruta um NPC
   */
  async recruitNPC(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { npcId } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      if (!npcId) {
        return res.status(400).json({ error: 'NPC ID is required' });
      }

      const success = await gameService.recruitNPC(userId, npcId);

      if (!success) {
        return res.status(400).json({ error: 'Could not recruit NPC (insufficient resources or level)' });
      }

      return res.json({ success: true, message: 'NPC recruited successfully' });
    } catch (error) {
      console.error('Error recruiting NPC:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * GET /api/game/quests
   * Retorna quests ativas
   */
  async getQuests(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const quests = await gameService.getActiveQuests(userId);
      return res.json({ quests });
    } catch (error) {
      console.error('Error getting quests:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * GET /api/game/achievements
   * Retorna achievements do jogador
   */
  async getAchievements(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const achievements = await gameService.getAchievements(userId);
      return res.json({ achievements });
    } catch (error) {
      console.error('Error getting achievements:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * POST /api/game/battle
   * Processa uma batalha (entrevista)
   */
  async battle(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { contactId, actions } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      if (!contactId || !actions) {
        return res.status(400).json({ error: 'Contact ID and actions are required' });
      }

      // Aqui seria implementada a lógica completa de batalha
      // Por enquanto, retorna um resultado mock
      // Isso será expandido quando implementarmos o frontend

      return res.json({
        victory: true,
        rewards: {
          experience: 50,
          coins: 25,
          gems: 2,
        },
        leveledUp: false,
      });
    } catch (error) {
      console.error('Error processing battle:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * POST /api/game/pain-discovered
   * Processa descoberta de dor
   */
  async painDiscovered(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { dealId, painText, painIntensity, painCategory, orionSolution } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      if (!dealId || !painText || !painIntensity || !painCategory) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await gameService.processPainDiscovery(
        userId,
        dealId,
        painText,
        painIntensity,
        painCategory,
        orionSolution
      );

      return res.json({
        success: true,
        rewards: result.rewards,
        item: result.item,
        leveledUp: result.leveledUp,
      });
    } catch (error) {
      console.error('Error processing pain discovery:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * GET /api/game/territory/:territoryId
   * Retorna progresso de um território
   */
  async getTerritoryProgress(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { territoryId } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const progress = await gameService.getTerritoryProgress(userId, territoryId);
      return res.json({ progress });
    } catch (error) {
      console.error('Error getting territory progress:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * GET /api/game/relationship/:contactId
   * Retorna relacionamento com um lead
   */
  async getRelationship(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { contactId } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const relationship = await gameService.getRelationship(userId, contactId);
      return res.json({ relationship });
    } catch (error) {
      console.error('Error getting relationship:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * GET /api/game/config
   * Retorna configurações do jogo (items, npcs, territories, etc)
   */
  async getConfig(req: Request, res: Response) {
    try {
      const { TERRITORIES, ITEMS, NPCS, QUESTS, ACHIEVEMENTS, GAME_CONSTANTS } = require('../config/gameConfig');

      return res.json({
        territories: TERRITORIES,
        items: ITEMS,
        npcs: NPCS,
        quests: QUESTS,
        achievements: ACHIEVEMENTS,
        constants: GAME_CONSTANTS,
      });
    } catch (error) {
      console.error('Error getting game config:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new GameController();
