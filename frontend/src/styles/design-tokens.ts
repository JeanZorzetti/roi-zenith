/**
 * 🎨 Design Tokens - Sistema de Design Unificado
 *
 * Constantes reutilizáveis para garantir consistência visual
 * em toda a aplicação.
 *
 * Princípios:
 * - Menos é mais (valores mínimos necessários)
 * - Sistema 8pt para espaçamento
 * - Hierarquia visual clara
 * - Fácil manutenção
 */

export const DesignTokens = {
  /**
   * SPACING - Sistema 8pt Grid
   * Todos os espaçamentos são múltiplos de 8px
   */
  spacing: {
    xs: '4px',   // Espaço mínimo (entre ícones internos)
    sm: '8px',   // Entre elementos pequenos relacionados
    md: '16px',  // Padrão (padding de cards, gap entre itens)
    lg: '24px',  // Entre seções diferentes
    xl: '32px',  // Entre grandes blocos de conteúdo
    xxl: '48px', // Margens externas, espaçamento hero
  },

  /**
   * TYPOGRAPHY - Apenas 3 tamanhos
   */
  fontSize: {
    sm: '12px',  // Labels, metadados, badges
    md: '14px',  // Corpo de texto padrão
    lg: '16px',  // Títulos, headers
  },

  fontWeight: {
    regular: 400,   // Corpo de texto
    medium: 500,    // Labels, enfatização leve
    semibold: 600,  // Títulos, botões
  },

  lineHeight: {
    tight: 1.3,   // Títulos (menos espaço entre linhas)
    normal: 1.5,  // Corpo de texto (legibilidade)
  },

  /**
   * SIZES - Tamanhos fixos para componentes
   */
  sizes: {
    // Ícones (apenas 2 tamanhos)
    icon: {
      sm: '16px',  // Ícones pequenos (badges, inline)
      md: '20px',  // Ícones padrão (botões, headers)
    },

    // Botões
    button: {
      height: '40px',      // Botões padrão
      heightSm: '32px',    // Botões compactos
      minWidth: '80px',    // Largura mínima para texto
      iconOnly: '40px',    // Botões apenas com ícone (quadrado)
    },

    // Cards de Tasks
    card: {
      minHeight: '120px',  // Altura mínima uniforme
      maxWidth: '400px',   // Largura máxima em grids
      padding: '16px',     // Padding interno padrão
    },

    // Colunas Kanban
    column: {
      headerHeight: '56px',  // Altura fixa do header
      minWidth: '320px',     // Largura mínima
      maxWidth: '400px',     // Largura máxima
      gap: '16px',           // Gap entre colunas
    },

    // Subcolunas
    subcolumn: {
      headerHeight: '48px',  // Menor que colunas principais
      gap: '12px',           // Gap entre subcolunas
    },

    // Avatares
    avatar: {
      sm: '24px',   // Avatares pequenos (inline)
      md: '32px',   // Avatares padrão
      lg: '40px',   // Avatares destacados
    },

    // Badges
    badge: {
      height: '24px',       // Altura fixa
      paddingX: '8px',      // Padding horizontal
      iconSize: '16px',     // Ícone dentro do badge
    },

    // Inputs
    input: {
      height: '40px',       // Altura padrão
      heightSm: '32px',     // Inputs compactos
      paddingX: '12px',     // Padding horizontal
    },

    // Sidebar
    sidebar: {
      width: '280px',       // Largura quando aberta
      widthCollapsed: '0px', // Largura quando fechada
    },

    // TopBar
    topbar: {
      height: '64px',       // Altura quando visível
      heightCollapsed: '0px', // Altura quando oculta
    },

    // Modais
    modal: {
      maxWidthSm: '400px',   // Modais pequenos
      maxWidthMd: '600px',   // Modais médios
      maxWidthLg: '800px',   // Modais grandes
      padding: '24px',       // Padding interno
    },
  },

  /**
   * BORDER RADIUS - Apenas 3 variações
   */
  borderRadius: {
    sm: '8px',    // Elementos pequenos (badges, inputs)
    md: '12px',   // Padrão (cards, botões)
    lg: '16px',   // Elementos grandes (modais, containers)
    full: '9999px', // Círculos perfeitos (avatares, pills)
  },

  /**
   * BORDERS - Espessuras padrão
   */
  borderWidth: {
    thin: '1px',   // Bordas padrão
    medium: '2px', // Bordas enfatizadas (hover, focus)
    thick: '3px',  // Bordas de destaque (seleção)
  },

  /**
   * SHADOWS - Apenas 2 níveis
   * Sombras neutras (sem cores)
   */
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',              // Cards em repouso
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',            // Hover, foco
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',          // Modais, dropdowns
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',          // Overlays importantes
  },

  /**
   * Z-INDEX - Camadas organizadas
   */
  zIndex: {
    base: 0,           // Conteúdo normal
    dropdown: 10,      // Dropdowns, tooltips
    sticky: 20,        // Headers fixos
    overlay: 30,       // Overlays de modais
    modal: 40,         // Modais
    popover: 50,       // Popovers acima de tudo
    toast: 60,         // Notificações
    hamburger: 70,     // Botão hamburger sempre visível
  },

  /**
   * TRANSITIONS - Velocidades padronizadas
   */
  transition: {
    fast: '150ms ease-in-out',      // Micro-interações (hover de botão)
    normal: '300ms ease-in-out',    // Padrão (animações gerais)
    slow: '500ms ease-in-out',      // Transições complexas (sidebar)
  },

  /**
   * OPACITY - Níveis de transparência
   */
  opacity: {
    disabled: 0.4,     // Elementos desabilitados
    muted: 0.6,        // Elementos secundários
    hover: 0.8,        // Estados de hover
    active: 1.0,       // Estados ativos/selecionados
  },

  /**
   * BREAKPOINTS - Responsividade
   */
  breakpoints: {
    mobile: '640px',   // Smartphones (1 coluna Kanban)
    tablet: '768px',   // Tablets (2 colunas Kanban)
    desktop: '1024px', // Desktop pequeno (3 colunas Kanban)
    wide: '1440px',    // Desktop grande (4+ colunas Kanban)
  },

  /**
   * TOUCH TARGETS - Acessibilidade mobile
   */
  touchTarget: {
    min: '44px',  // Tamanho mínimo para áreas de toque (iOS/Android guideline)
  },
} as const;

/**
 * Type-safe access to design tokens
 */
export type DesignTokens = typeof DesignTokens;

/**
 * Helper function to get spacing value
 */
export const getSpacing = (size: keyof typeof DesignTokens.spacing): string => {
  return DesignTokens.spacing[size];
};

/**
 * Helper function to get size value
 */
export const getSize = <T extends keyof typeof DesignTokens.sizes>(
  category: T,
  key: keyof typeof DesignTokens.sizes[T]
): string => {
  return DesignTokens.sizes[category][key] as string;
};

/**
 * Exemplo de uso:
 *
 * import { DesignTokens, getSpacing, getSize } from '@/styles/design-tokens';
 *
 * // Uso direto
 * <div style={{ padding: DesignTokens.spacing.md }}>...</div>
 *
 * // Com helpers
 * <div style={{ padding: getSpacing('md') }}>...</div>
 *
 * // Com Tailwind (criar classes customizadas)
 * className="h-[var(--button-height)]"
 */

export default DesignTokens;
