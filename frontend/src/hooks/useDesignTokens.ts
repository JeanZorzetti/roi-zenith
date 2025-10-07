/**
 * 🎨 useDesignTokens Hook
 *
 * Hook React para acessar Design Tokens de forma type-safe
 * e combinar com o sistema de temas.
 */

import { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { DesignTokens } from '@/styles/design-tokens';

export const useDesignTokens = () => {
  const { currentTheme } = useTheme();

  /**
   * Combina design tokens com cores do tema atual
   */
  const tokens = useMemo(() => {
    return {
      // Design Tokens estáticos
      spacing: DesignTokens.spacing,
      fontSize: DesignTokens.fontSize,
      fontWeight: DesignTokens.fontWeight,
      lineHeight: DesignTokens.lineHeight,
      sizes: DesignTokens.sizes,
      borderRadius: DesignTokens.borderRadius,
      borderWidth: DesignTokens.borderWidth,
      shadow: DesignTokens.shadow,
      zIndex: DesignTokens.zIndex,
      transition: DesignTokens.transition,
      opacity: DesignTokens.opacity,
      breakpoints: DesignTokens.breakpoints,
      touchTarget: DesignTokens.touchTarget,

      // Cores do tema atual
      colors: currentTheme.colors,

      // Helpers combinados (tokens + cores)
      card: {
        style: {
          minHeight: DesignTokens.sizes.card.minHeight,
          padding: DesignTokens.sizes.card.padding,
          borderRadius: DesignTokens.borderRadius.md,
          backgroundColor: currentTheme.colors.cardBg,
          borderWidth: DesignTokens.borderWidth.thin,
          borderStyle: 'solid' as const,
          borderColor: currentTheme.colors.border,
          boxShadow: DesignTokens.shadow.sm,
          transition: DesignTokens.transition.normal,
        },
        hoverStyle: {
          borderColor: currentTheme.colors.borderHover,
          boxShadow: DesignTokens.shadow.md,
        },
      },

      button: {
        primary: {
          height: DesignTokens.sizes.button.height,
          padding: `0 ${DesignTokens.spacing.md}`,
          borderRadius: DesignTokens.borderRadius.md,
          fontSize: DesignTokens.fontSize.md,
          fontWeight: DesignTokens.fontWeight.semibold,
          background: `linear-gradient(90deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
          color: currentTheme.colors.text,
          border: 'none',
          transition: DesignTokens.transition.fast,
        },
        secondary: {
          height: DesignTokens.sizes.button.height,
          padding: `0 ${DesignTokens.spacing.md}`,
          borderRadius: DesignTokens.borderRadius.md,
          fontSize: DesignTokens.fontSize.md,
          fontWeight: DesignTokens.fontWeight.medium,
          backgroundColor: 'transparent',
          color: currentTheme.colors.textSecondary,
          borderWidth: DesignTokens.borderWidth.thin,
          borderStyle: 'solid' as const,
          borderColor: currentTheme.colors.border,
          transition: DesignTokens.transition.fast,
        },
      },

      input: {
        style: {
          height: DesignTokens.sizes.input.height,
          padding: `0 ${DesignTokens.sizes.input.paddingX}`,
          borderRadius: DesignTokens.borderRadius.sm,
          fontSize: DesignTokens.fontSize.md,
          backgroundColor: currentTheme.colors.inputBg,
          color: currentTheme.colors.text,
          borderWidth: DesignTokens.borderWidth.thin,
          borderStyle: 'solid' as const,
          borderColor: currentTheme.colors.border,
          transition: DesignTokens.transition.fast,
        },
        focusStyle: {
          borderColor: currentTheme.colors.primary,
          boxShadow: `0 0 0 2px ${currentTheme.colors.primary}33`,
          outline: 'none',
        },
      },

      modal: {
        backdrop: {
          backgroundColor: `${currentTheme.colors.background}CC`,
          backdropFilter: 'blur(8px)',
        },
        container: {
          backgroundColor: currentTheme.colors.backgroundSecondary,
          borderRadius: DesignTokens.borderRadius.lg,
          padding: DesignTokens.sizes.modal.padding,
          borderWidth: DesignTokens.borderWidth.thin,
          borderStyle: 'solid' as const,
          borderColor: currentTheme.colors.border,
          boxShadow: DesignTokens.shadow.xl,
        },
      },
    };
  }, [currentTheme]);

  return tokens;
};

/**
 * Exemplo de uso:
 *
 * const MyComponent = () => {
 *   const tokens = useDesignTokens();
 *
 *   return (
 *     <div style={tokens.card.style}>
 *       <button style={tokens.button.primary}>
 *         Salvar
 *       </button>
 *     </div>
 *   );
 * };
 */

export default useDesignTokens;
