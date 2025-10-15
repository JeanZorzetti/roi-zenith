// ============= GAME APP =============
// Main React game component with code splitting

import React, { useEffect, lazy, Suspense } from 'react';
import { useGameStore } from './store/gameStore';
import { ToastContainer, useToast } from './components/ui/Toast';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { useGameLoop } from './hooks/useGameLoop';
import { useAutoSave } from './hooks/useAutoSave';
import './styles/game.css';

// Loading component for lazy-loaded screens
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-white text-xl font-semibold">Carregando...</p>
    </div>
  </div>
);

// Lazy load screens for code splitting
const MenuScreen = lazy(() => import('./components/menu/MenuScreen').then(m => ({ default: m.MenuScreen })));
const WorldMapScreen = lazy(() => import('./components/world/WorldMapScreen').then(m => ({ default: m.WorldMapScreen })));
const BattleScreen = lazy(() => import('./components/battle/BattleScreen').then(m => ({ default: m.BattleScreen })));
const InventoryScreen = lazy(() => import('./components/inventory/InventoryScreen').then(m => ({ default: m.InventoryScreen })));
const AchievementsScreen = lazy(() => import('./components/achievements/AchievementsScreen').then(m => ({ default: m.AchievementsScreen })));

// Placeholder settings screen
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
    <ErrorBoundary>
      <div className="game-app w-full h-screen overflow-hidden">
        <Suspense fallback={<LoadingScreen />}>
          {renderScreen()}
        </Suspense>
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
};

export default GameApp;
