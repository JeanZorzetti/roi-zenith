// ============= GAME APP =============
// Main React game component

import React from 'react';
import { useGameStore } from './store/gameStore';

// Placeholder screens (will be created later)
const MenuScreen = () => <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-4xl">Menu Screen</div>;
const WorldMapScreen = () => <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-4xl">World Map Screen</div>;
const BattleScreen = () => <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-4xl">Battle Screen</div>;
const InventoryScreen = () => <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-4xl">Inventory Screen</div>;
const SettingsScreen = () => <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-4xl">Settings Screen</div>;
const AchievementsScreen = () => <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-4xl">Achievements Screen</div>;

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
    </div>
  );
};

export default GameApp;
