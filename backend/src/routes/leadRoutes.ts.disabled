import express from 'express';
import { body } from 'express-validator';
import {
  submitLead,
  getLeads,
  getLead,
  updateLead,
  submitROIData
} from '../controllers/leadController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Validation rules for lead submission
const leadValidation = [
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
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  body('role')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Role must be between 2 and 50 characters'),
  body('companySector')
    .isIn(['saas', 'fintech', 'ecommerce', 'startup', 'consulting', 'other'])
    .withMessage('Invalid company sector'),
  body('teamSize')
    .isIn(['1-5', '6-15', '16-50', '51+'])
    .withMessage('Invalid team size'),
  body('monthlyLeads')
    .isIn(['<100', '100-500', '500-1000', '1000+'])
    .withMessage('Invalid monthly leads range'),
  body('budget')
    .isIn(['<5k', '5k-15k', '15k-30k', '30k+'])
    .withMessage('Invalid budget range'),
  body('currentChallenges')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Challenges description must be between 10 and 1000 characters'),
  body('timeline')
    .isIn(['immediate', '30days', '90days', 'planning'])
    .withMessage('Invalid timeline'),
  body('gdprConsent')
    .isBoolean()
    .custom((value) => {
      if (value !== true) {
        throw new Error('GDPR consent is required');
      }
      return true;
    }),
  body('marketingConsent')
    .optional()
    .isBoolean()
];

// Validation for lead updates (admin)
const leadUpdateValidation = [
  body('status')
    .optional()
    .isIn(['new', 'contacted', 'qualified', 'demo_scheduled', 'proposal_sent', 'closed_won', 'closed_lost'])
    .withMessage('Invalid status'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Invalid user ID'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Note cannot be more than 500 characters'),
  body('nextFollowUpDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format')
];

// ROI data validation
const roiDataValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('roiData.currentLeads')
    .isInt({ min: 1, max: 10000 })
    .withMessage('Current leads must be between 1 and 10000'),
  body('roiData.conversionRate')
    .isFloat({ min: 0.1, max: 100 })
    .withMessage('Conversion rate must be between 0.1 and 100'),
  body('roiData.averageDealValue')
    .isFloat({ min: 100, max: 10000000 })
    .withMessage('Average deal value must be between 100 and 10000000'),
  body('roiData.salesCycleMonths')
    .isInt({ min: 1, max: 24 })
    .withMessage('Sales cycle must be between 1 and 24 months'),
  body('roiData.sdrSalary')
    .isFloat({ min: 1000, max: 100000 })
    .withMessage('SDR salary must be between 1000 and 100000'),
  body('roiData.projectedROI')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('ROI must be a positive number')
];

// Public routes
router.post('/submit', leadValidation, submitLead);
router.post('/roi-data', roiDataValidation, submitROIData);

// Protected admin routes
router.get('/', protect, authorize('admin'), getLeads);
router.get('/:id', protect, authorize('admin'), getLead);
router.put('/:id', protect, authorize('admin'), leadUpdateValidation, updateLead);

export default router;