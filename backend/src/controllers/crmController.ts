import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============= DEALS =============

export const getDeals = async (req: Request, res: Response) => {
  try {
    const deals = await prisma.deal.findMany({
      orderBy: [
        { stage: 'asc' },
        { position: 'asc' }
      ],
      include: {
        company: true,
        contact: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    res.json({ deals });
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
};

export const getDeal = async (req: Request, res: Response) => {
  try {
    const { dealId } = req.params;

    const deal = await prisma.deal.findUnique({
      where: { id: dealId },
      include: {
        company: true,
        contact: true,
        activities: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    res.json({ deal });
  } catch (error) {
    console.error('Error fetching deal:', error);
    res.status(500).json({ error: 'Failed to fetch deal' });
  }
};

export const createDeal = async (req: Request, res: Response) => {
  try {
    const { title, description, value, currency, stage, probability, expectedCloseDate, companyId, contactId } = req.body;

    // Get the last position for the stage
    const lastDeal = await prisma.deal.findFirst({
      where: { stage },
      orderBy: { position: 'desc' }
    });

    const newDeal = await prisma.deal.create({
      data: {
        id: `deal-${Date.now()}`,
        title,
        description,
        value: value || 0,
        currency: currency || 'BRL',
        stage: stage || 'NEW',
        probability: probability || 0,
        expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
        companyId: companyId || null,
        contactId: contactId || null,
        position: (lastDeal?.position || 0) + 1
      },
      include: {
        company: true,
        contact: true
      }
    });

    res.json({ deal: newDeal });
  } catch (error) {
    console.error('Error creating deal:', error);
    res.status(500).json({ error: 'Failed to create deal' });
  }
};

export const updateDeal = async (req: Request, res: Response) => {
  try {
    const { dealId } = req.params;
    const updates = req.body;

    const updatedDeal = await prisma.deal.update({
      where: { id: dealId },
      data: {
        ...updates,
        expectedCloseDate: updates.expectedCloseDate ? new Date(updates.expectedCloseDate) : undefined,
        updatedAt: new Date()
      },
      include: {
        company: true,
        contact: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    res.json({ deal: updatedDeal });
  } catch (error) {
    console.error('Error updating deal:', error);
    res.status(500).json({ error: 'Failed to update deal' });
  }
};

export const deleteDeal = async (req: Request, res: Response) => {
  try {
    const { dealId } = req.params;

    await prisma.deal.delete({
      where: { id: dealId }
    });

    res.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error deleting deal:', error);
    res.status(500).json({ error: 'Failed to delete deal' });
  }
};

export const moveDeal = async (req: Request, res: Response) => {
  try {
    const { dealId } = req.params;
    const { stage, position } = req.body;

    const updatedDeal = await prisma.deal.update({
      where: { id: dealId },
      data: {
        stage,
        position,
        updatedAt: new Date()
      },
      include: {
        company: true,
        contact: true
      }
    });

    res.json({ deal: updatedDeal });
  } catch (error) {
    console.error('Error moving deal:', error);
    res.status(500).json({ error: 'Failed to move deal' });
  }
};

// ============= COMPANIES =============

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { name: 'asc' },
      include: {
        contacts: true,
        deals: true
      }
    });

    res.json({ companies });
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, sector, size, website, phone, address, notes } = req.body;

    const newCompany = await prisma.company.create({
      data: {
        id: `company-${Date.now()}`,
        name,
        sector,
        size,
        website,
        phone,
        address,
        notes
      }
    });

    res.json({ company: newCompany });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const updates = req.body;

    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: {
        ...updates,
        updatedAt: new Date()
      }
    });

    res.json({ company: updatedCompany });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;

    await prisma.company.delete({
      where: { id: companyId }
    });

    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
};

// ============= CONTACTS =============

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { lastName: 'asc' },
      include: {
        company: true
      }
    });

    res.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

export const createContact = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, position, notes, companyId } = req.body;

    const newContact = await prisma.contact.create({
      data: {
        id: `contact-${Date.now()}`,
        firstName,
        lastName,
        email,
        phone,
        position,
        notes,
        companyId: companyId || null
      },
      include: {
        company: true
      }
    });

    res.json({ contact: newContact });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;
    const updates = req.body;

    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: {
        ...updates,
        updatedAt: new Date()
      },
      include: {
        company: true
      }
    });

    res.json({ contact: updatedContact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;

    await prisma.contact.delete({
      where: { id: contactId }
    });

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

// ============= ACTIVITIES =============

export const getActivities = async (req: Request, res: Response) => {
  try {
    const { dealId, contactId } = req.query;

    const where: any = {};
    if (dealId) where.dealId = dealId;
    if (contactId) where.contactId = contactId;

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        deal: true,
        contact: true
      }
    });

    res.json({ activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { type, subject, description, dueDate, dealId, contactId } = req.body;

    const newActivity = await prisma.activity.create({
      data: {
        id: `activity-${Date.now()}`,
        type,
        subject,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        dealId: dealId || null,
        contactId: contactId || null
      },
      include: {
        deal: true,
        contact: true
      }
    });

    res.json({ activity: newActivity });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Failed to create activity' });
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const { activityId } = req.params;
    const updates = req.body;

    const updatedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: {
        ...updates,
        dueDate: updates.dueDate ? new Date(updates.dueDate) : undefined,
        updatedAt: new Date()
      },
      include: {
        deal: true,
        contact: true
      }
    });

    res.json({ activity: updatedActivity });
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Failed to update activity' });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const { activityId } = req.params;

    await prisma.activity.delete({
      where: { id: activityId }
    });

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
};
