/**
 * 🎨 UI Context - Gerenciamento de estado da interface
 *
 * Controla estados globais da UI:
 * - Sidebar collapsed/expanded
 * - TopBar hidden/visible
 * - Modo compacto
 * - Preferências de layout
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UIContextType {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // TopBar
  topbarHidden: boolean;
  setTopbarHidden: (hidden: boolean) => void;

  // Compact Mode
  compactMode: boolean;
  toggleCompactMode: () => void;

  // Mobile detection
  isMobile: boolean;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  // Sidebar state (persistido no localStorage)
  // Desktop: aberto por padrão, Mobile: fechado por padrão
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('ui-sidebar-collapsed');
    if (saved !== null) return saved === 'true';
    // Se não há valor salvo, usar padrão baseado no tamanho da tela
    return window.innerWidth < 1024; // Mobile/tablet fechado, desktop aberto
  });

  // TopBar state (não persistido - reset ao recarregar)
  const [topbarHidden, setTopbarHidden] = useState<boolean>(false);

  // Compact mode (persistido)
  const [compactMode, setCompactMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ui-compact-mode');
    return saved === 'true';
  });

  // Mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return window.innerWidth < 768;
  });

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem('ui-sidebar-collapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Persist compact mode
  useEffect(() => {
    localStorage.setItem('ui-compact-mode', String(compactMode));
  }, [compactMode]);

  // Hide topbar when sidebar collapses
  useEffect(() => {
    if (sidebarCollapsed) {
      setTopbarHidden(true);
    } else {
      setTopbarHidden(false);
    }
  }, [sidebarCollapsed]);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Auto-collapse sidebar em mobile
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed]);

  // Auto-hide topbar on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Esconder ao scrollar pra baixo (mais de 64px)
          if (currentScrollY > lastScrollY && currentScrollY > 64) {
            setTopbarHidden(true);
          }
          // Mostrar ao scrollar pra cima
          else if (currentScrollY < lastScrollY) {
            setTopbarHidden(false);
          }
          // Sempre mostrar no topo
          else if (currentScrollY === 0) {
            setTopbarHidden(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const toggleCompactMode = () => {
    setCompactMode(prev => !prev);
  };

  const value: UIContextType = {
    sidebarCollapsed,
    toggleSidebar,
    setSidebarCollapsed,
    topbarHidden,
    setTopbarHidden,
    compactMode,
    toggleCompactMode,
    isMobile,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export default UIContext;
