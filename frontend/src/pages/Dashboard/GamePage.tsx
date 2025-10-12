import React, { useEffect, useRef, useState } from 'react';
import { MarketResearchGame } from '../../game';
import { useTheme } from '../../contexts/ThemeContext';
import { gameSocketService } from '../../game/services/gameSocketService';

const GamePage: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<MarketResearchGame | null>(null);
  const { currentTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize game when component mounts
    if (gameContainerRef.current && !gameInstanceRef.current) {
      console.log('🎮 [GamePage] Initializing Market Research Quest...');

      const initializeGame = async () => {
        try {
          // Create game instance
          gameInstanceRef.current = new MarketResearchGame(gameContainerRef.current!);
          console.log('🎮 [GamePage] Game initialized successfully');

          // Set game instance in socket service
          gameSocketService.setGameInstance(gameInstanceRef.current);

          // Fetch initial game state from backend
          const token = localStorage.getItem('token');
          if (token) {
            console.log('📡 [GamePage] Fetching game state from backend...');
            const response = await fetch('/api/game/state', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (response.ok) {
              const data = await response.json();
              console.log('✅ [GamePage] Game state loaded:', data.state);

              // Initialize WorldMapScene with player data
              const worldMapScene = gameInstanceRef.current.getGame()?.scene.getScene('WorldMapScene');
              if (worldMapScene && data.state) {
                worldMapScene.registry.set('playerLevel', data.state.level || 1);
                worldMapScene.registry.set('playerReputation', data.state.reputation || 0);
                worldMapScene.registry.set('playerCoins', data.state.coins || 0);
                worldMapScene.registry.set('playerGems', data.state.gems || 0);
                worldMapScene.registry.set('playerEnergy', data.state.energy || 50);
                console.log('✅ [GamePage] Game registry updated with backend state');
              }
            } else {
              console.warn('⚠️ [GamePage] Failed to fetch game state, using defaults');
            }
          }

          setIsLoading(false);
        } catch (error) {
          console.error('❌ [GamePage] Error initializing game:', error);
          setIsLoading(false);
        }
      };

      initializeGame();
    }

    // Cleanup game on unmount
    return () => {
      if (gameInstanceRef.current) {
        console.log('🎮 [GamePage] Cleaning up game instance...');
        gameInstanceRef.current.destroy();
        gameInstanceRef.current = null;
      }
    };
  }, []);

  // Connect Socket.IO to receive game events
  useEffect(() => {
    // Get user ID from localStorage (set during login)
    console.log('🔍 [GamePage] Checking localStorage for user data...');
    console.log('🔍 [GamePage] localStorage keys:', Object.keys(localStorage));

    const userDataStr = localStorage.getItem('user');
    if (!userDataStr) {
      console.warn('⚠️ [GamePage] No user data found in localStorage["user"], skipping Socket.IO connection');
      console.log('💡 [GamePage] Try checking localStorage["currentUser"] or other keys');
      return;
    }

    try {
      const userData = JSON.parse(userDataStr);
      const userId = userData.id || userData.userId;

      if (!userId) {
        console.warn('⚠️ [GamePage] No user ID in userData, skipping Socket.IO connection');
        return;
      }

      console.log('🔌 [GamePage] Connecting to game socket...');
      gameSocketService.connect(userId);

      return () => {
        console.log('🔌 [GamePage] Disconnecting from game socket...');
        gameSocketService.disconnect();
      };
    } catch (error) {
      console.error('❌ [GamePage] Error parsing user data:', error);
    }
  }, []);

  return (
    <div
      className="w-full h-screen flex flex-col"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Game Container - Fullscreen */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{
          backgroundColor: '#1a1a2e'
        }}
      >
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
              <p className="text-white text-xl">Carregando jogo...</p>
            </div>
          </div>
        )}

        <div ref={gameContainerRef} id="game-container" className="w-full h-full" />
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
