import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from '@/stores/authStore';
import AppRouter from "./routes/AppRouter";

const queryClient = new QueryClient();

const App = () => {
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  
  useEffect(() => {
    // Initialize authentication on app startup
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
