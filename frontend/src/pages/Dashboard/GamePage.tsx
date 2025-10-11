import React, { useEffect, useRef, useState } from 'react';
import { MarketResearchGame } from '../../game';
import { useTheme } from '../../contexts/ThemeContext';

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

  // TODO: Connect Socket.IO to receive game events
  // useEffect(() => {
  //   const socket = io(BACKEND_URL);
  //   socket.on('game:notification', (data) => {
  //     // Show notification
  //   });
  //   return () => socket.disconnect();
  // }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: currentTheme.colors.text }}
        >
          🎮 Market Research Quest
        </h1>
        <p
          className="text-lg"
          style={{ color: currentTheme.colors.textMuted }}
        >
          Transforme ações do CRM em progresso no jogo
        </p>
      </div>

      {/* Game Container */}
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
