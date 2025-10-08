import { Router } from 'express';
import {
  getDeals,
  getDeal,
  createDeal,
  updateDeal,
  deleteDeal,
  moveDeal,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity
} from '../controllers/crmController';

const router = Router();

// Deal routes
router.get('/deals', getDeals);
router.get('/deals/:dealId', getDeal);
router.post('/deals', createDeal);
router.put('/deals/:dealId', updateDeal);
router.delete('/deals/:dealId', deleteDeal);
router.patch('/deals/:dealId/move', moveDeal);

// Company routes
router.get('/companies', getCompanies);
router.post('/companies', createCompany);
router.put('/companies/:companyId', updateCompany);
router.delete('/companies/:companyId', deleteCompany);

// Contact routes
router.get('/contacts', getContacts);
router.post('/contacts', createContact);
router.put('/contacts/:contactId', updateContact);
router.delete('/contacts/:contactId', deleteContact);

// Activity routes
router.get('/activities', getActivities);
router.post('/activities', createActivity);
router.put('/activities/:activityId', updateActivity);
router.delete('/activities/:activityId', deleteActivity);

export default router;
