// ============= GAME APP =============
// Main React game component

import React from 'react';
import { useGameStore } from './store/gameStore';
import { ToastContainer } from './components/ui/Toast';
import { InventoryScreen } from './components/inventory/InventoryScreen';
import { MenuScreen } from './components/menu/MenuScreen';
import { WorldMapScreen } from './components/world/WorldMapScreen';
import { BattleScreen } from './components/battle/BattleScreen';
import { AchievementsScreen } from './components/achievements/AchievementsScreen';
import './styles/game.css';

// Placeholder screens (will be created later)
const SettingsScreen = () => <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-4xl">Settings Screen</div>;

export const GameApp: React.FC = () => {
  const currentScreen = useGameStore((state) => state.currentScreen);

  // Screen router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <MenuScreen />;
      case 'worldmap':
        return <WorldMapScreen />;
      case 'battle':
        return <BattleScreen />;
      case 'inventory':
        return <InventoryScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      default:
        return <MenuScreen />;
    }
  };

  return (
    <div className="game-app w-full h-screen overflow-hidden">
      {renderScreen()}
      <ToastContainer />
    </div>
  );
};

export default GameApp;
