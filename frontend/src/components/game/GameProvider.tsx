import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';
import { GameNotifications } from './GameNotifications';

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const { connect, disconnect, isConnected } = useGameStore();

  useEffect(() => {
    // Connect to game when user is authenticated
    if (isAuthenticated && user?.id && !isConnected) {
      console.log('🎮 Connecting to game for user:', user.id);
      connect(user.id);
    }

    // Disconnect when user logs out
    if (!isAuthenticated && isConnected) {
      console.log('🎮 Disconnecting from game');
      disconnect();
    }

    // Cleanup on unmount
    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  }, [isAuthenticated, user?.id, connect, disconnect, isConnected]);

  return (
    <>
      {children}
      {isConnected && (
        <>
          <GameNotifications />
        </>
      )}
    </>
  );
}
