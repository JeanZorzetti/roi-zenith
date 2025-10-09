// ============= GAME ROUTES =============

import { Router } from 'express';
import gameController from '../controllers/gameController';

const router = Router();

// Game State
router.get('/state', gameController.getState);
router.post('/init', gameController.initialize);

// Inventory
router.get('/inventory', gameController.getInventory);
router.post('/inventory/equip', gameController.equipItem);

// Party
router.get('/party', gameController.getParty);
router.post('/party/recruit', gameController.recruitNPC);

// Quests
router.get('/quests', gameController.getQuests);

// Achievements
router.get('/achievements', gameController.getAchievements);

// Battle & CRM Events
router.post('/battle', gameController.battle);
router.post('/pain-discovered', gameController.painDiscovered);

// Territory & Relationships
router.get('/territory/:territoryId', gameController.getTerritoryProgress);
router.get('/relationship/:contactId', gameController.getRelationship);

// Config (públic data - items, npcs, territories, etc)
router.get('/config', gameController.getConfig);

export default router;
