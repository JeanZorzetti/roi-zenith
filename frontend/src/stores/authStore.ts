import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/authService';
import type { User as ApiUser } from '@/types/api';

// Convert API User to local User type
const convertApiUser = (apiUser: ApiUser): User => ({
  id: apiUser._id,
  email: apiUser.email,
  name: apiUser.name,
  role: apiUser.role === 'admin' ? 'admin' : 'client',
  createdAt: apiUser.createdAt,
  company: apiUser.company,
  position: apiUser.position
});

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'trial';
  createdAt: string;
  company?: string;
  position?: string;
  lastLogin?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthStore extends AuthState {
  // New methods
  initializeAuth: () => Promise<void>;
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, company?: string, position?: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.login({ email, password });
          
          if (response.success && response.data) {
            const user = convertApiUser(response.data.user);
            
            set({
              user: { ...user, lastLogin: new Date().toISOString() },
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            throw new Error(response.error || 'Login failed');
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Falha no login. Verifique suas credenciais.'
          });
        }
      },

      logout: () => {
        authService.logout();
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      register: async (email: string, password: string, name: string, company?: string, position?: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.register({ 
            email, 
            password, 
            name,
            company,
            position
          });
          
          if (response.success && response.data) {
            const user = convertApiUser(response.data.user);
            
            set({
              user: user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            throw new Error(response.error || 'Registration failed');
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Falha no registro. Tente novamente.'
          });
        }
      },

      updateUser: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return;
        
        set({ isLoading: true, error: null });
        
        try {
          const profileData = {
            name: updates.name,
            company: updates.company,
            position: updates.position
          };
          
          const response = await authService.updateProfile(profileData);
          
          if (response.success && response.data) {
            const updatedUser = convertApiUser(response.data.user);
            
            set({
              user: updatedUser,
              isLoading: false,
              error: null
            });
          } else {
            throw new Error(response.error || 'Update failed');
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Falha ao atualizar perfil.'
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
      
      initializeAuth: async () => {
        const isAuth = authService.isAuthenticated();
        
        if (isAuth) {
          set({ isLoading: true });
          
          try {
            const user = await authService.initializeAuth();
            
            if (user) {
              set({
                user: convertApiUser(user),
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
            } else {
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
              });
            }
          } catch (error) {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
          }
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);