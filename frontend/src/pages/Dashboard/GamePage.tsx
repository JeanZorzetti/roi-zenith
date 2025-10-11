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

      try {
        gameInstanceRef.current = new MarketResearchGame(gameContainerRef.current);
        setIsLoading(false);
        console.log('🎮 [GamePage] Game initialized successfully');

        // Set game instance in socket service
        gameSocketService.setGameInstance(gameInstanceRef.current);
      } catch (error) {
        console.error('❌ [GamePage] Error initializing game:', error);
        setIsLoading(false);
      }
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
    const userDataStr = localStorage.getItem('user');
    if (!userDataStr) {
      console.warn('⚠️ [GamePage] No user data found, skipping Socket.IO connection');
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
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Game Container - Larger and centered */}
      <div
        className="rounded-lg shadow-2xl overflow-hidden border-4"
        style={{
          borderColor: currentTheme.colors.primary,
          backgroundColor: '#1a1a2e'
        }}
      >
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
              <p className="text-white text-xl">Carregando jogo...</p>
            </div>
          </div>
        )}

        <div ref={gameContainerRef} id="game-container" />
      </div>

      {/* Instructions */}
      <div
        className="mt-8 max-w-3xl p-6 rounded-lg"
        style={{
          backgroundColor: currentTheme.colors.cardBg,
          borderColor: currentTheme.colors.border
        }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: currentTheme.colors.text }}
        >
          📖 Como Jogar
        </h2>

        <div
          className="space-y-3"
          style={{ color: currentTheme.colors.textMuted }}
        >
          <div className="flex items-start space-x-3">
            <span className="text-2xl">1️⃣</span>
            <p>
              <strong style={{ color: currentTheme.colors.text }}>Adicione Contatos no CRM</strong> →
              Leads aparecem no mapa do jogo (+10 XP, +5 coins)
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-2xl">2️⃣</span>
            <p>
              <strong style={{ color: currentTheme.colors.text }}>Realize Entrevistas</strong> →
              Triggers batalhas no jogo para descobrir dores (+50 XP, +25 coins)
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-2xl">3️⃣</span>
            <p>
              <strong style={{ color: currentTheme.colors.text }}>Descubra Dores</strong> →
              Ganhe XP, coins, gems e items baseado na intensidade
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-2xl">4️⃣</span>
            <p>
              <strong style={{ color: currentTheme.colors.text }}>Qualifique Leads (Score ≥ 70%)</strong> →
              Promova para Sales e ganhe rewards épicas (+100 XP, +10 reputation)
            </p>
          </div>
        </div>

        <div
          className="mt-6 p-4 rounded-lg"
          style={{
            backgroundColor: currentTheme.colors.warning + '20',
            borderLeft: `4px solid ${currentTheme.colors.warning}`
          }}
        >
          <p
            className="font-semibold"
            style={{ color: currentTheme.colors.text }}
          >
            💡 Dica: Cada ação no CRM alimenta seu progresso no jogo!
          </p>
          <p style={{ color: currentTheme.colors.textMuted }}>
            Quanto mais você trabalha na pesquisa de mercado, mais você evolui no jogo.
          </p>
        </div>
      </div>

      {/* Back to CRM Link */}
      <div className="mt-8">
        <a
          href="/crm"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: '#ffffff'
          }}
        >
          <span>← Voltar para o CRM</span>
        </a>
      </div>
    </div>
  );
};

export default GamePage;
