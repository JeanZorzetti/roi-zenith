import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CRMEventHandlers } from '../events/gameEvents';

const prisma = new PrismaClient();

// ============= PIPELINES =============

export const getPipelines = async (req: Request, res: Response) => {
  try {
    const pipelines = await prisma.pipeline.findMany({
      orderBy: { position: 'asc' },
      include: {
        stages: {
          orderBy: { position: 'asc' }
        },
        _count: {
          select: { deals: true }
        }
      }
    });

    res.json({ pipelines });
  } catch (error) {
    console.error('Error fetching pipelines:', error);
    res.status(500).json({ error: 'Failed to fetch pipelines' });
  }
};

export const getPipeline = async (req: Request, res: Response) => {
  try {
    const { pipelineId } = req.params;

    const pipeline = await prisma.pipeline.findUnique({
      where: { id: pipelineId },
      include: {
        stages: {
          orderBy: { position: 'asc' }
        },
        deals: {
          include: {
            company: true,
            contact: true,
            stage: true
          }
        }
      }
    });

    if (!pipeline) {
      return res.status(404).json({ error: 'Pipeline not found' });
    }

    res.json({ pipeline });
  } catch (error) {
    console.error('Error fetching pipeline:', error);
    res.status(500).json({ error: 'Failed to fetch pipeline' });
  }
};

export const createPipeline = async (req: Request, res: Response) => {
  try {
    const { title, description, color, stages } = req.body;

    const lastPipeline = await prisma.pipeline.findFirst({
      orderBy: { position: 'desc' }
    });

    const newPipeline = await prisma.pipeline.create({
      data: {
        id: `pipeline-${Date.now()}`,
        title,
        description,
        color: color || '#3b82f6',
        position: (lastPipeline?.position || 0) + 1,
        stages: {
          create: stages?.map((stage: any, index: number) => ({
            id: `stage-${Date.now()}-${index}`,
            title: stage.title,
            color: stage.color || '#6366f1',
            position: index
          })) || []
        }
      },
      include: {
        stages: {
          orderBy: { position: 'asc' }
        }
      }
    });

    res.json({ pipeline: newPipeline });
  } catch (error) {
    console.error('Error creating pipeline:', error);
    res.status(500).json({ error: 'Failed to create pipeline' });
  }
};

export const updatePipeline = async (req: Request, res: Response) => {
  try {
    const { pipelineId } = req.params;
    const updates = req.body;

    const updatedPipeline = await prisma.pipeline.update({
      where: { id: pipelineId },
      data: {
        ...updates,
        updatedAt: new Date()
      },
      include: {
        stages: {
          orderBy: { position: 'asc' }
        }
      }
    });

    res.json({ pipeline: updatedPipeline });
  } catch (error) {
    console.error('Error updating pipeline:', error);
    res.status(500).json({ error: 'Failed to update pipeline' });
  }
};

export const deletePipeline = async (req: Request, res: Response) => {
  try {
    const { pipelineId } = req.params;

    await prisma.pipeline.delete({
      where: { id: pipelineId }
    });

    res.json({ message: 'Pipeline deleted successfully' });
  } catch (error) {
    console.error('Error deleting pipeline:', error);
    res.status(500).json({ error: 'Failed to delete pipeline' });
  }
};

// ============= PIPELINE STAGES =============

export const createStage = async (req: Request, res: Response) => {
  try {
    const { pipelineId } = req.params;
    const { title, color } = req.body;

    const lastStage = await prisma.pipelineStage.findFirst({
      where: { pipelineId },
      orderBy: { position: 'desc' }
    });

    const newStage = await prisma.pipelineStage.create({
      data: {
        id: `stage-${Date.now()}`,
        title,
        color: color || '#6366f1',
        position: (lastStage?.position || 0) + 1,
        pipelineId
      }
    });

    res.json({ stage: newStage });
  } catch (error) {
    console.error('Error creating stage:', error);
    res.status(500).json({ error: 'Failed to create stage' });
  }
};

export const updateStage = async (req: Request, res: Response) => {
  try {
    const { stageId } = req.params;
    const updates = req.body;

    const updatedStage = await prisma.pipelineStage.update({
      where: { id: stageId },
      data: {
        ...updates,
        updatedAt: new Date()
      }
    });

    res.json({ stage: updatedStage });
  } catch (error) {
    console.error('Error updating stage:', error);
    res.status(500).json({ error: 'Failed to update stage' });
  }
};

export const deleteStage = async (req: Request, res: Response) => {
  try {
    const { stageId } = req.params;

    await prisma.pipelineStage.delete({
      where: { id: stageId }
    });

    res.json({ message: 'Stage deleted successfully' });
  } catch (error) {
    console.error('Error deleting stage:', error);
    res.status(500).json({ error: 'Failed to delete stage' });
  }
};

// ============= DEALS =============

export const getDeals = async (req: Request, res: Response) => {
  try {
    const { pipelineId } = req.query;

    const where = pipelineId ? { pipelineId: pipelineId as string } : {};

    const deals = await prisma.deal.findMany({
      where,
      orderBy: [
        { position: 'asc' }
      ],
      include: {
        pipeline: true,
        stage: true,
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
        pipeline: true,
        stage: true,
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
    const { title, description, value, currency, pipelineId, stageId, probability, expectedCloseDate, companyId, contactId } = req.body;

    // Get the last position for the stage
    const lastDeal = await prisma.deal.findFirst({
      where: { stageId },
      orderBy: { position: 'desc' }
    });

    const newDeal = await prisma.deal.create({
      data: {
        id: `deal-${Date.now()}`,
        title,
        description,
        value: value || 0,
        currency: currency || 'BRL',
        pipelineId,
        stageId,
        probability: probability || 0,
        expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
        companyId: companyId || null,
        contactId: contactId || null,
        position: (lastDeal?.position || 0) + 1
      },
      include: {
        pipeline: true,
        stage: true,
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
    const { userId, ...updates } = req.body;  // Extract userId and keep only Deal fields

    // Get the old deal to compare
    const oldDeal = await prisma.deal.findUnique({
      where: { id: dealId }
    });

    const updatedDeal = await prisma.deal.update({
      where: { id: dealId },
      data: {
        ...updates,
        expectedCloseDate: updates.expectedCloseDate ? new Date(updates.expectedCloseDate) : undefined,
        updatedAt: new Date()
      },
      include: {
        pipeline: true,
        stage: true,
        company: true,
        contact: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    // Trigger game events (non-blocking)
    if (userId) {
      // Check if pain was discovered
      const painWasDiscovered = !oldDeal?.painDiscovered && updates.painDiscovered;
      if (painWasDiscovered && updates.painIntensity && updates.painCategory) {
        CRMEventHandlers.onPainDiscovered(
          userId,
          dealId,
          updates.painDiscovered,
          updates.painIntensity,
          updates.painCategory,
          updates.orionSolution
        ).catch(err => {
          console.error('Error triggering pain discovered event:', err);
        });
      }

      // Check if solution was mapped
      const solutionWasMapped = !oldDeal?.orionSolution && updates.orionSolution;
      if (solutionWasMapped) {
        CRMEventHandlers.onSolutionMapped(
          userId,
          dealId,
          updates.orionSolution
        ).catch(err => {
          console.error('Error triggering solution mapped event:', err);
        });
      }
    }

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
    const { stageId, position } = req.body;

    const updatedDeal = await prisma.deal.update({
      where: { id: dealId },
      data: {
        stageId,
        position,
        updatedAt: new Date()
      },
      include: {
        pipeline: true,
        stage: true,
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
    const { userId, ...contactData } = req.body;  // Extract userId
    const { firstName, lastName, email, phone, position, notes, companyId } = contactData;

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

    // Trigger game event (non-blocking)
    if (userId) {
      const contactName = `${firstName} ${lastName}`;
      CRMEventHandlers.onContactCreated(userId, newContact.id, contactName).catch(err => {
        console.error('Error triggering contact created event:', err);
      });
    }

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
    const { userId, ...activityData } = req.body;  // Extract userId
    const { type, subject, description, dueDate, dealId, contactId } = activityData;

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

    // Trigger game event (non-blocking)
    if (userId) {
      CRMEventHandlers.onActivityCreated(userId, newActivity.id, type, contactId).catch(err => {
        console.error('Error triggering activity created event:', err);
      });
    }

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
