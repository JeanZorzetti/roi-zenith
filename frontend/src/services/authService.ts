import { apiClient } from './api';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User, 
  ApiResponse 
} from '@/types/api';

class AuthService {
  // Register new user
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    
    if (response.success && response.data?.token) {
      this.setAuthToken(response.data.token);
      this.setUser(response.data.user);
    }
    
    return response;
  }

  // Login user
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.data?.token) {
      this.setAuthToken(response.data.token);
      this.setUser(response.data.user);
    }
    
    return response;
  }

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return apiClient.get<{ user: User }>('/auth/me');
  }

  // Update user profile
  async updateProfile(profileData: {
    name?: string;
    company?: string;
    position?: string;
  }): Promise<ApiResponse<{ user: User }>> {
    return apiClient.put<{ user: User }>('/auth/profile', profileData);
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('roi_labs_token');
    localStorage.removeItem('roi_labs_user');
    // Force page refresh to clear any cached state
    window.location.reload();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('roi_labs_token');
    const user = localStorage.getItem('roi_labs_user');
    return !!(token && user);
  }

  // Get stored auth token
  getAuthToken(): string | null {
    return localStorage.getItem('roi_labs_token');
  }

  // Get stored user data
  getUser(): User | null {
    const userData = localStorage.getItem('roi_labs_user');
    return userData ? JSON.parse(userData) : null;
  }

  // Store auth token
  private setAuthToken(token: string): void {
    localStorage.setItem('roi_labs_token', token);
  }

  // Store user data
  private setUser(user: User): void {
    localStorage.setItem('roi_labs_user', JSON.stringify(user));
  }

  // Validate token format
  private isValidTokenFormat(token: string): boolean {
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    return parts.length === 3;
  }

  // Auto-login check on app startup
  async initializeAuth(): Promise<User | null> {
    const token = this.getAuthToken();
    
    if (!token || !this.isValidTokenFormat(token)) {
      this.logout();
      return null;
    }

    try {
      const response = await this.getCurrentUser();
      
      if (response.success && response.data?.user) {
        this.setUser(response.data.user);
        return response.data.user;
      } else {
        this.logout();
        return null;
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();