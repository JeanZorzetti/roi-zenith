import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Contact from '../models/Contact';
import { emailService } from '../services/emailService';

// Submit contact form
export const submitContact = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, company, phone, subject, message } = req.body;

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      company,
      phone,
      subject,
      message
    });

    // Send notification email to admin
    const emailSent = await emailService.sendContactNotification({
      name,
      email,
      company,
      phone,
      subject,
      message
    });

    // Send auto-reply to user
    await emailService.sendContactAutoReply(email, name);

    res.status(201).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      data: {
        contact: {
          _id: contact._id,
          name: contact.name,
          email: contact.email,
          company: contact.company,
          subject: contact.subject,
          status: contact.status,
          priority: contact.priority,
          createdAt: contact.createdAt
        },
        emailSent
      }
    });

  } catch (error: any) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor. Tente novamente mais tarde.'
    });
  }
};

// Get all contacts (admin only)
export const getContacts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const priority = req.query.priority as string;

    // Build filter
    const filter: any = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Get contacts with pagination
    const contacts = await Contact.find(filter)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    });

  } catch (error: any) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Get single contact (admin only)
export const getContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        contact
      }
    });

  } catch (error: any) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Update contact status (admin only)
export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { status, priority, responseNotes, assignedTo } = req.body;
    const contactId = req.params.id;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (responseNotes) updateData.responseNotes = responseNotes;
    if (assignedTo) updateData.assignedTo = assignedTo;

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: {
        contact
      }
    });

  } catch (error: any) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Delete contact (admin only)
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};