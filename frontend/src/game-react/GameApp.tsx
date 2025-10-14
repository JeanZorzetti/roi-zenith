// ============= GAME APP =============
// Main React game component

import React, { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { ToastContainer, useToast } from './components/ui/Toast';
import { InventoryScreen } from './components/inventory/InventoryScreen';
import { MenuScreen } from './components/menu/MenuScreen';
import { WorldMapScreen } from './components/world/WorldMapScreen';
import { BattleScreen } from './components/battle/BattleScreen';
import { AchievementsScreen } from './components/achievements/AchievementsScreen';
import { useGameLoop } from './hooks/useGameLoop';
import { useAutoSave } from './hooks/useAutoSave';
import './styles/game.css';

// Placeholder screens (will be created later)
const SettingsScreen = () => <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-4xl">Settings Screen</div>;

export const GameApp: React.FC = () => {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const toast = useToast();

  // Initialize game loop with energy regeneration
  useGameLoop({
    onEnergyUpdate: (energy, maxEnergy) => {
      console.log(`⚡ Energy regenerated: ${energy}/${maxEnergy}`);
    },
    onAutoSave: () => {
      console.log('💾 Auto-save triggered from game loop');
    },
  });

  // Initialize auto-save system
  const { manualSave } = useAutoSave({
    interval: 300000, // 5 minutes
    enabled: true,
    showNotification: true,
    saveOnUnload: true,
  });

  // Welcome message on mount
  useEffect(() => {
    console.log('🎮 Game initialized with React v2.0');
    console.log('🔄 Game loop active');
    console.log('💾 Auto-save enabled (every 5 minutes)');
    console.log('⚡ Energy regeneration active (1 per 5 minutes)');
  }, []);

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
