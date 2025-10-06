import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { themeList } from '../themes/themes';

export const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, themeId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        style={{
          backgroundColor: currentTheme.colors.cardBg,
          borderColor: currentTheme.colors.border,
          color: currentTheme.colors.text
        }}
        title="Alterar tema"
        aria-label="Seletor de tema"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Palette className="h-4 w-4" />
        <span className="text-sm font-medium hidden sm:inline">Tema</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[90]"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 mt-2 w-72 rounded-xl shadow-2xl z-[100] max-h-96 overflow-y-auto"
            style={{
              backgroundColor: currentTheme.colors.backgroundSecondary,
              borderColor: currentTheme.colors.border,
              border: '1px solid'
            }}
          >
            <div
              className="p-4 border-b"
              style={{ borderColor: currentTheme.colors.border }}
            >
              <h3
                className="font-bold text-lg flex items-center space-x-2"
                style={{ color: currentTheme.colors.text }}
              >
                <Palette className="h-5 w-5" />
                <span>Escolha seu tema</span>
              </h3>
              <p
                className="text-xs mt-1"
                style={{ color: currentTheme.colors.textMuted }}
              >
                Personalize a aparência do dashboard
              </p>
            </div>

            <div className="p-2 space-y-1">
              {themeList.map((theme) => {
                const isSelected = theme.id === themeId;

                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: isSelected
                        ? currentTheme.colors.primary + '20'
                        : 'transparent',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: isSelected
                        ? currentTheme.colors.primary
                        : 'transparent'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div
                          className="font-medium mb-1 flex items-center space-x-2"
                          style={{ color: currentTheme.colors.text }}
                        >
                          <span>{theme.name}</span>
                          {isSelected && (
                            <Check
                              className="h-4 w-4"
                              style={{ color: currentTheme.colors.primary }}
                            />
                          )}
                        </div>
                        <p
                          className="text-xs"
                          style={{ color: currentTheme.colors.textSecondary }}
                        >
                          {theme.description}
                        </p>

                        {/* Color Preview */}
                        <div className="flex items-center space-x-1 mt-2">
                          <div
                            className="w-5 h-5 rounded border"
                            style={{
                              backgroundColor: theme.colors.primary,
                              borderColor: theme.colors.border
                            }}
                            title="Primary"
                          />
                          <div
                            className="w-5 h-5 rounded border"
                            style={{
                              backgroundColor: theme.colors.accent,
                              borderColor: theme.colors.border
                            }}
                            title="Accent"
                          />
                          <div
                            className="w-5 h-5 rounded border"
                            style={{
                              backgroundColor: theme.colors.success,
                              borderColor: theme.colors.border
                            }}
                            title="Success"
                          />
                          <div
                            className="w-5 h-5 rounded border"
                            style={{
                              backgroundColor: theme.colors.warning,
                              borderColor: theme.colors.border
                            }}
                            title="Warning"
                          />
                          <div
                            className="w-5 h-5 rounded border"
                            style={{
                              backgroundColor: theme.colors.error,
                              borderColor: theme.colors.border
                            }}
                            title="Error"
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              className="p-3 border-t text-center"
              style={{
                borderColor: currentTheme.colors.border,
                backgroundColor: currentTheme.colors.backgroundTertiary
              }}
            >
              <p
                className="text-xs"
                style={{ color: currentTheme.colors.textMuted }}
              >
                {themeList.length} temas disponíveis
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
