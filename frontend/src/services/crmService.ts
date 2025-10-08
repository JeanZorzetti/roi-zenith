import { Deal, Company, Contact, Activity } from '../types/CRM';

const isProduction = process.env.NODE_ENV === 'production' ||
  (typeof window !== 'undefined' && window.location.hostname.includes('roilabs.com'));

const API_BASE_URL = isProduction
  ? 'https://back.roilabs.com.br/api/crm'
  : 'http://localhost:5002/api/crm';

console.log(`🌍 CRM API Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
console.log(`🔗 CRM API Base URL: ${API_BASE_URL}`);

class CRMService {
  // ============= DEALS =============

  async getDeals(): Promise<Deal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/deals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.deals || [];
    } catch (error) {
      console.error('Error fetching deals:', error);
      return [];
    }
  }

  async getDeal(dealId: string): Promise<Deal | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/deals/${dealId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.deal || null;
    } catch (error) {
      console.error('Error fetching deal:', error);
      return null;
    }
  }

  async createDeal(deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/deals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(deal),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.deal || null;
    } catch (error) {
      console.error('Error creating deal:', error);
      return null;
    }
  }

  async updateDeal(dealId: string, updates: Partial<Deal>): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/deals/${dealId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating deal:', error);
      return false;
    }
  }

  async deleteDeal(dealId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/deals/${dealId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting deal:', error);
      return false;
    }
  }

  async moveDeal(dealId: string, stage: string, position: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/deals/${dealId}/move`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ stage, position }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error moving deal:', error);
      return false;
    }
  }

  // ============= COMPANIES =============

  async getCompanies(): Promise<Company[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.companies || [];
    } catch (error) {
      console.error('Error fetching companies:', error);
      return [];
    }
  }

  async createCompany(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(company),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.company || null;
    } catch (error) {
      console.error('Error creating company:', error);
      return null;
    }
  }

  async updateCompany(companyId: string, updates: Partial<Company>): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating company:', error);
      return false;
    }
  }

  async deleteCompany(companyId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting company:', error);
      return false;
    }
  }

  // ============= CONTACTS =============

  async getContacts(): Promise<Contact[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.contacts || [];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }

  async createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.contact || null;
    } catch (error) {
      console.error('Error creating contact:', error);
      return null;
    }
  }

  async updateContact(contactId: string, updates: Partial<Contact>): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating contact:', error);
      return false;
    }
  }

  async deleteContact(contactId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  }

  // ============= ACTIVITIES =============

  async getActivities(filters?: { dealId?: string; contactId?: string }): Promise<Activity[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.dealId) params.append('dealId', filters.dealId);
      if (filters?.contactId) params.append('contactId', filters.contactId);

      const response = await fetch(`${API_BASE_URL}/activities?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.activities || [];
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }

  async createActivity(activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Activity | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(activity),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.activity || null;
    } catch (error) {
      console.error('Error creating activity:', error);
      return null;
    }
  }

  async updateActivity(activityId: string, updates: Partial<Activity>): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/${activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating activity:', error);
      return false;
    }
  }

  async deleteActivity(activityId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/${activityId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting activity:', error);
      return false;
    }
  }
}

export const crmService = new CRMService();
