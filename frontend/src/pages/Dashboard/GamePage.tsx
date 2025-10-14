import React from 'react';
import { GameApp } from '../../game-react/GameApp';
import { useTheme } from '../../contexts/ThemeContext';

const GamePage: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      {/* Game Container - Fullscreen React Game (v2.0) */}
      <div className="relative flex-1 overflow-hidden">
        <GameApp />
      </div>

      {/* Back to CRM Button - Fixed at bottom right */}
      <a
        href="/crm"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: '#ffffff'
        }}
      >
        <span>← CRM</span>
      </a>
    </div>
  );
};

export default GamePage;
