import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from '@/stores/authStore';
import AppRouter from "./routes/AppRouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UIProvider } from "@/contexts/UIContext";
import HamburgerButton from "@/components/HamburgerButton";
import { GameProvider } from "@/components/game/GameProvider";

const queryClient = new QueryClient();

const App = () => {
  const initializeAuth = useAuthStore(state => state.initializeAuth);

  useEffect(() => {
    // Initialize authentication on app startup
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UIProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <GameProvider>
                <Toaster />
                <Sonner />
                <HamburgerButton />
                <AppRouter />
              </GameProvider>
            </TooltipProvider>
          </QueryClientProvider>
        </UIProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
