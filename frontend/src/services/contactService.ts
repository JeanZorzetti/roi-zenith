import { apiClient } from './api';
import { ContactRequest, Contact, ApiResponse } from '@/types/api';

class ContactService {
  // Submit contact form
  async submitContact(contactData: ContactRequest): Promise<ApiResponse<{ contact: Contact }>> {
    try {
      const response = await apiClient.post<{ contact: Contact }>('/contact/submit', contactData);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to submit contact form');
    }
  }

  // Get all contacts (admin only)
  async getContacts(params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
  }): Promise<ApiResponse<{ 
    contacts: Contact[];
    pagination: {
      page: number;
      pages: number;
      total: number;
      limit: number;
    };
  }>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.priority) searchParams.append('priority', params.priority);
    
    const endpoint = `/contact${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    return apiClient.get(endpoint);
  }

  // Get single contact (admin only)
  async getContact(id: string): Promise<ApiResponse<{ contact: Contact }>> {
    return apiClient.get<{ contact: Contact }>(`/contact/${id}`);
  }

  // Update contact status (admin only)
  async updateContactStatus(id: string, updates: {
    status?: 'new' | 'read' | 'responded' | 'closed';
    priority?: 'low' | 'medium' | 'high';
    responseNotes?: string;
    assignedTo?: string;
  }): Promise<ApiResponse<{ contact: Contact }>> {
    return apiClient.put<{ contact: Contact }>(`/contact/${id}`, updates);
  }

  // Delete contact (admin only)
  async deleteContact(id: string): Promise<ApiResponse> {
    return apiClient.delete(`/contact/${id}`);
  }
}

export const contactService = new ContactService();