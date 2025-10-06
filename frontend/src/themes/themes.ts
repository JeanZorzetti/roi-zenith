// Theme System for ROI Labs Dashboard

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    // Background colors
    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;

    // Card colors
    cardBg: string;
    cardBgHover: string;
    cardBorder: string;

    // Text colors
    text: string;
    textSecondary: string;
    textMuted: string;

    // Primary brand colors
    primary: string;
    primaryHover: string;
    primaryLight: string;

    // Accent colors
    accent: string;
    accentHover: string;

    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Priority colors
    priorityLow: string;
    priorityMedium: string;
    priorityHigh: string;
    priorityUrgent: string;

    // UI elements
    border: string;
    borderHover: string;
    input: string;
    inputBorder: string;
    shadow: string;

    // Glassmorphism
    glass: string;
    glassBorder: string;
  };
}

export const themes: Record<string, Theme> = {
  // 1. Dark Purple (Default - Current)
  darkPurple: {
    id: 'darkPurple',
    name: '🌙 Dark Purple',
    description: 'Tema escuro elegante com roxo vibrante',
    colors: {
      background: '#0a0a0a',
      backgroundSecondary: '#111111',
      backgroundTertiary: '#1a1a1a',

      cardBg: 'rgba(31, 31, 31, 0.6)',
      cardBgHover: 'rgba(41, 41, 41, 0.7)',
      cardBorder: 'rgba(75, 75, 75, 0.5)',

      text: '#ffffff',
      textSecondary: '#d1d5db',
      textMuted: '#9ca3af',

      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      primaryLight: '#a78bfa',

      accent: '#ec4899',
      accentHover: '#db2777',

      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',

      priorityLow: '#10b981',
      priorityMedium: '#f59e0b',
      priorityHigh: '#f97316',
      priorityUrgent: '#ef4444',

      border: 'rgba(75, 75, 75, 0.5)',
      borderHover: 'rgba(100, 100, 100, 0.7)',
      input: 'rgba(31, 31, 31, 0.6)',
      inputBorder: 'rgba(75, 75, 75, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.5)',

      glass: 'rgba(17, 24, 39, 0.7)',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
    }
  },

  // 2. Cyberpunk Neon
  cyberpunk: {
    id: 'cyberpunk',
    name: '⚡ Cyberpunk',
    description: 'Vibes futuristas com neon vibrante',
    colors: {
      background: '#0d0221',
      backgroundSecondary: '#1a0b2e',
      backgroundTertiary: '#2b1055',

      cardBg: 'rgba(26, 11, 46, 0.7)',
      cardBgHover: 'rgba(43, 16, 85, 0.8)',
      cardBorder: 'rgba(236, 72, 153, 0.3)',

      text: '#e0f2fe',
      textSecondary: '#bae6fd',
      textMuted: '#7dd3fc',

      primary: '#ec4899',
      primaryHover: '#db2777',
      primaryLight: '#f472b6',

      accent: '#06b6d4',
      accentHover: '#0891b2',

      success: '#06d6a0',
      warning: '#ffd166',
      error: '#ef476f',
      info: '#118ab2',

      priorityLow: '#06d6a0',
      priorityMedium: '#ffd166',
      priorityHigh: '#f77f00',
      priorityUrgent: '#ef476f',

      border: 'rgba(236, 72, 153, 0.3)',
      borderHover: 'rgba(236, 72, 153, 0.5)',
      input: 'rgba(26, 11, 46, 0.8)',
      inputBorder: 'rgba(6, 182, 212, 0.4)',
      shadow: 'rgba(236, 72, 153, 0.3)',

      glass: 'rgba(26, 11, 46, 0.6)',
      glassBorder: 'rgba(6, 182, 212, 0.3)',
    }
  },

  // 3. Ocean Blue
  ocean: {
    id: 'ocean',
    name: '🌊 Ocean',
    description: 'Tons de azul profundo e relaxante',
    colors: {
      background: '#001e3c',
      backgroundSecondary: '#003566',
      backgroundTertiary: '#0a4c76',

      cardBg: 'rgba(0, 53, 102, 0.6)',
      cardBgHover: 'rgba(10, 76, 118, 0.7)',
      cardBorder: 'rgba(59, 130, 246, 0.3)',

      text: '#f0f9ff',
      textSecondary: '#bfdbfe',
      textMuted: '#93c5fd',

      primary: '#0ea5e9',
      primaryHover: '#0284c7',
      primaryLight: '#38bdf8',

      accent: '#06b6d4',
      accentHover: '#0891b2',

      success: '#14b8a6',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#60a5fa',

      priorityLow: '#14b8a6',
      priorityMedium: '#fbbf24',
      priorityHigh: '#fb923c',
      priorityUrgent: '#f87171',

      border: 'rgba(59, 130, 246, 0.3)',
      borderHover: 'rgba(59, 130, 246, 0.5)',
      input: 'rgba(0, 53, 102, 0.7)',
      inputBorder: 'rgba(14, 165, 233, 0.4)',
      shadow: 'rgba(14, 165, 233, 0.2)',

      glass: 'rgba(0, 53, 102, 0.5)',
      glassBorder: 'rgba(14, 165, 233, 0.3)',
    }
  },

  // 4. Forest Green
  forest: {
    id: 'forest',
    name: '🌲 Forest',
    description: 'Verde natural e relaxante',
    colors: {
      background: '#0f2027',
      backgroundSecondary: '#1a3a2e',
      backgroundTertiary: '#2c5f4a',

      cardBg: 'rgba(26, 58, 46, 0.7)',
      cardBgHover: 'rgba(44, 95, 74, 0.8)',
      cardBorder: 'rgba(52, 211, 153, 0.3)',

      text: '#ecfdf5',
      textSecondary: '#a7f3d0',
      textMuted: '#6ee7b7',

      primary: '#10b981',
      primaryHover: '#059669',
      primaryLight: '#34d399',

      accent: '#14b8a6',
      accentHover: '#0d9488',

      success: '#22c55e',
      warning: '#eab308',
      error: '#ef4444',
      info: '#06b6d4',

      priorityLow: '#86efac',
      priorityMedium: '#fde047',
      priorityHigh: '#fb923c',
      priorityUrgent: '#fca5a5',

      border: 'rgba(52, 211, 153, 0.3)',
      borderHover: 'rgba(52, 211, 153, 0.5)',
      input: 'rgba(26, 58, 46, 0.8)',
      inputBorder: 'rgba(16, 185, 129, 0.4)',
      shadow: 'rgba(16, 185, 129, 0.2)',

      glass: 'rgba(26, 58, 46, 0.6)',
      glassBorder: 'rgba(16, 185, 129, 0.3)',
    }
  },

  // 5. Sunset Orange
  sunset: {
    id: 'sunset',
    name: '🌅 Sunset',
    description: 'Laranja quente e aconchegante',
    colors: {
      background: '#1a0e0a',
      backgroundSecondary: '#2d1810',
      backgroundTertiary: '#4a2a1a',

      cardBg: 'rgba(45, 24, 16, 0.7)',
      cardBgHover: 'rgba(74, 42, 26, 0.8)',
      cardBorder: 'rgba(251, 146, 60, 0.3)',

      text: '#fff7ed',
      textSecondary: '#fed7aa',
      textMuted: '#fdba74',

      primary: '#f97316',
      primaryHover: '#ea580c',
      primaryLight: '#fb923c',

      accent: '#fbbf24',
      accentHover: '#f59e0b',

      success: '#84cc16',
      warning: '#eab308',
      error: '#dc2626',
      info: '#3b82f6',

      priorityLow: '#a3e635',
      priorityMedium: '#fbbf24',
      priorityHigh: '#f97316',
      priorityUrgent: '#dc2626',

      border: 'rgba(251, 146, 60, 0.3)',
      borderHover: 'rgba(251, 146, 60, 0.5)',
      input: 'rgba(45, 24, 16, 0.8)',
      inputBorder: 'rgba(249, 115, 22, 0.4)',
      shadow: 'rgba(249, 115, 22, 0.2)',

      glass: 'rgba(45, 24, 16, 0.6)',
      glassBorder: 'rgba(249, 115, 22, 0.3)',
    }
  },

  // 6. Midnight Blue
  midnight: {
    id: 'midnight',
    name: '🌃 Midnight',
    description: 'Azul escuro profissional',
    colors: {
      background: '#020617',
      backgroundSecondary: '#0f172a',
      backgroundTertiary: '#1e293b',

      cardBg: 'rgba(15, 23, 42, 0.7)',
      cardBgHover: 'rgba(30, 41, 59, 0.8)',
      cardBorder: 'rgba(71, 85, 105, 0.5)',

      text: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',

      primary: '#6366f1',
      primaryHover: '#4f46e5',
      primaryLight: '#818cf8',

      accent: '#8b5cf6',
      accentHover: '#7c3aed',

      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',

      priorityLow: '#10b981',
      priorityMedium: '#f59e0b',
      priorityHigh: '#f97316',
      priorityUrgent: '#ef4444',

      border: 'rgba(71, 85, 105, 0.5)',
      borderHover: 'rgba(100, 116, 139, 0.7)',
      input: 'rgba(15, 23, 42, 0.8)',
      inputBorder: 'rgba(99, 102, 241, 0.4)',
      shadow: 'rgba(99, 102, 241, 0.2)',

      glass: 'rgba(15, 23, 42, 0.6)',
      glassBorder: 'rgba(148, 163, 184, 0.2)',
    }
  },

  // 7. Rose Pink
  rose: {
    id: 'rose',
    name: '🌸 Rose',
    description: 'Rosa elegante e sofisticado',
    colors: {
      background: '#1a0a14',
      backgroundSecondary: '#2d1623',
      backgroundTertiary: '#4a2438',

      cardBg: 'rgba(45, 22, 35, 0.7)',
      cardBgHover: 'rgba(74, 36, 56, 0.8)',
      cardBorder: 'rgba(244, 114, 182, 0.3)',

      text: '#fdf2f8',
      textSecondary: '#fbcfe8',
      textMuted: '#f9a8d4',

      primary: '#ec4899',
      primaryHover: '#db2777',
      primaryLight: '#f472b6',

      accent: '#a855f7',
      accentHover: '#9333ea',

      success: '#10b981',
      warning: '#f59e0b',
      error: '#f43f5e',
      info: '#8b5cf6',

      priorityLow: '#86efac',
      priorityMedium: '#fbbf24',
      priorityHigh: '#fb7185',
      priorityUrgent: '#f43f5e',

      border: 'rgba(244, 114, 182, 0.3)',
      borderHover: 'rgba(244, 114, 182, 0.5)',
      input: 'rgba(45, 22, 35, 0.8)',
      inputBorder: 'rgba(236, 72, 153, 0.4)',
      shadow: 'rgba(236, 72, 153, 0.2)',

      glass: 'rgba(45, 22, 35, 0.6)',
      glassBorder: 'rgba(236, 72, 153, 0.3)',
    }
  },

  // 8. Monochrome
  monochrome: {
    id: 'monochrome',
    name: '⚫ Monochrome',
    description: 'Preto e branco minimalista',
    colors: {
      background: '#000000',
      backgroundSecondary: '#0a0a0a',
      backgroundTertiary: '#171717',

      cardBg: 'rgba(23, 23, 23, 0.7)',
      cardBgHover: 'rgba(38, 38, 38, 0.8)',
      cardBorder: 'rgba(115, 115, 115, 0.5)',

      text: '#ffffff',
      textSecondary: '#e5e5e5',
      textMuted: '#a3a3a3',

      primary: '#ffffff',
      primaryHover: '#f5f5f5',
      primaryLight: '#fafafa',

      accent: '#737373',
      accentHover: '#525252',

      success: '#a3a3a3',
      warning: '#737373',
      error: '#525252',
      info: '#d4d4d4',

      priorityLow: '#d4d4d4',
      priorityMedium: '#a3a3a3',
      priorityHigh: '#737373',
      priorityUrgent: '#525252',

      border: 'rgba(115, 115, 115, 0.5)',
      borderHover: 'rgba(163, 163, 163, 0.7)',
      input: 'rgba(23, 23, 23, 0.8)',
      inputBorder: 'rgba(115, 115, 115, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.5)',

      glass: 'rgba(23, 23, 23, 0.6)',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
    }
  },
};

export const getTheme = (themeId: string): Theme => {
  return themes[themeId] || themes.darkPurple;
};

export const themeList = Object.values(themes);
