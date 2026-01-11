import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import LoadingScreen from '@/components/LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Check if user is a guest (has guest session and guest=true param)
  const urlParams = new URLSearchParams(location.search);
  const isGuest = urlParams.get('guest') === 'true';
  const hasGuestSession = localStorage.getItem('guest-session') !== null;

  if (requireAuth && !isAuthenticated && !(isGuest && hasGuestSession)) {
    // Redirect to home with the attempted location
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // If user is authenticated and trying to access login-only pages, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;