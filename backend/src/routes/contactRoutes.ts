import express from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot be more than 100 characters'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot be more than 20 characters'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

const updateContactValidation = [
  body('status')
    .optional()
    .isIn(['new', 'read', 'responded', 'closed'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority'),
  body('responseNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Response notes cannot be more than 1000 characters'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Invalid user ID')
];

// Public route
router.post('/submit', contactValidation, submitContact);

// Protected admin routes
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id', protect, authorize('admin'), updateContactValidation, updateContactStatus);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;