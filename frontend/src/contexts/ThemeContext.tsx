import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, themes, getTheme } from '../themes/themes';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themeId: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeId, setThemeId] = useState<string>(() => {
    const saved = localStorage.getItem('dashboard-theme');
    return saved || 'darkPurple';
  });

  const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme(themeId));

  useEffect(() => {
    const theme = getTheme(themeId);
    setCurrentTheme(theme);
    localStorage.setItem('dashboard-theme', themeId);

    // Apply theme to document root
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [themeId]);

  const setTheme = (newThemeId: string) => {
    if (themes[newThemeId]) {
      setThemeId(newThemeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeId }}>
      {children}
    </ThemeContext.Provider>
  );
};
