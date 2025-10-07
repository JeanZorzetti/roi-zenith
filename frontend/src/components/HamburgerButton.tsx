/**
 * 🍔 Hamburger Button - Botão de Toggle para Sidebar
 *
 * Botão fixo no canto superior esquerdo que:
 * - Fica sempre visível (z-index alto)
 * - Anima entre ☰ e ✕
 * - Controla abertura/fechamento da sidebar
 */

import React from 'react';
import { Menu, X } from 'lucide-react';
import { useUI } from '@/contexts/UIContext';
import { useTheme } from '@/contexts/ThemeContext';
import { DesignTokens } from '@/styles/design-tokens';

export const HamburgerButton: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, isMobile } = useUI();
  const { currentTheme } = useTheme();

  // Calcular posição baseada no estado da sidebar
  const leftPosition = sidebarCollapsed || isMobile ? '1rem' : 'calc(280px + 1rem)';

  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 w-11 h-11 rounded-lg backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-95"
      style={{
        left: leftPosition,
        zIndex: DesignTokens.zIndex.hamburger,
        backgroundColor: `${currentTheme.colors.cardBg}CC`,
        borderWidth: DesignTokens.borderWidth.thin,
        borderStyle: 'solid',
        borderColor: `${currentTheme.colors.border}80`,
        boxShadow: DesignTokens.shadow.md,
        transition: `all ${DesignTokens.transition.slow}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${currentTheme.colors.cardBgHover}E6`;
        e.currentTarget.style.borderColor = currentTheme.colors.borderHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = `${currentTheme.colors.cardBg}CC`;
        e.currentTarget.style.borderColor = `${currentTheme.colors.border}80`;
      }}
      aria-label={sidebarCollapsed ? 'Abrir menu' : 'Fechar menu'}
      aria-expanded={!sidebarCollapsed}
    >
      {/* Ícone animado */}
      <div className="relative w-6 h-6">
        {/* Menu Icon (☰) */}
        <Menu
          className="absolute inset-0 transition-all duration-300"
          style={{
            color: currentTheme.colors.text,
            opacity: sidebarCollapsed ? 1 : 0,
            transform: sidebarCollapsed ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.8)',
          }}
        />

        {/* Close Icon (✕) */}
        <X
          className="absolute inset-0 transition-all duration-300"
          style={{
            color: currentTheme.colors.text,
            opacity: sidebarCollapsed ? 0 : 1,
            transform: sidebarCollapsed ? 'rotate(90deg) scale(0.8)' : 'rotate(0deg) scale(1)',
          }}
        />
      </div>
    </button>
  );
};

export default HamburgerButton;
