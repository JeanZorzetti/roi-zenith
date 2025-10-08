import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, themes, getTheme } from '../themes/themes';

interface CRMThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themeId: string;
}

const CRMThemeContext = createContext<CRMThemeContextType | undefined>(undefined);

export const useCRMTheme = () => {
  const context = useContext(CRMThemeContext);
  if (!context) {
    throw new Error('useCRMTheme must be used within a CRMThemeProvider');
  }
  return context;
};

interface CRMThemeProviderProps {
  children: ReactNode;
}

export const CRMThemeProvider: React.FC<CRMThemeProviderProps> = ({ children }) => {
  const [themeId, setThemeId] = useState<string>(() => {
    const saved = localStorage.getItem('crm-theme');
    return saved || 'darkPurple';
  });

  const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme(themeId));

  useEffect(() => {
    const theme = getTheme(themeId);
    console.log('🎨 Applying CRM theme:', themeId, theme);
    setCurrentTheme(theme);
    localStorage.setItem('crm-theme', themeId);
  }, [themeId]);

  const setTheme = (newThemeId: string) => {
    if (themes[newThemeId]) {
      setThemeId(newThemeId);
    }
  };

  return (
    <CRMThemeContext.Provider value={{ currentTheme, setTheme, themeId }}>
      {children}
    </CRMThemeContext.Provider>
  );
};
