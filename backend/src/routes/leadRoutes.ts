import express from 'express';
import { body } from 'express-validator';
import {
  getLeads,
  createLead,
  getLeadById,
  updateLead,
  deleteLead
} from '../controllers/leadController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Validation rules for lead creation
const createLeadValidation = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('company')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company name is required and cannot be more than 100 characters'),
  body('role')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Role is required and cannot be more than 100 characters'),
  body('companySector')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company sector cannot be more than 100 characters'),
  body('teamSize')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Team size cannot be more than 50 characters'),
  body('monthlyLeads')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Monthly leads cannot be more than 50 characters'),
  body('budget')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Budget cannot be more than 50 characters'),
  body('timeline')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Timeline cannot be more than 50 characters'),
  body('status')
    .optional()
    .isIn(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'])
    .withMessage('Invalid status')
];

// Validation rules for lead update
const updateLeadValidation = [
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot be more than 100 characters'),
  body('role')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Role cannot be more than 100 characters'),
  body('companySector')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company sector cannot be more than 100 characters'),
  body('teamSize')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Team size cannot be more than 50 characters'),
  body('monthlyLeads')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Monthly leads cannot be more than 50 characters'),
  body('budget')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Budget cannot be more than 50 characters'),
  body('timeline')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Timeline cannot be more than 50 characters'),
  body('status')
    .optional()
    .isIn(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'])
    .withMessage('Invalid status')
];

// Routes (all protected by auth middleware)
router.get('/', protect, getLeads);
router.post('/', protect, createLeadValidation, createLead);
router.get('/:id', protect, getLeadById);
router.put('/:id', protect, updateLeadValidation, updateLead);
router.delete('/:id', protect, deleteLead);

export default router;