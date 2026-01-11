// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'client' | 'trial';
  createdAt: string;
  lastLogin?: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Navigation types
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

// Theme types
export type Theme = 'light' | 'dark';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}