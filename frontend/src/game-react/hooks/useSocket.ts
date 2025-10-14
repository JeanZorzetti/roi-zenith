// ============= USE SOCKET HOOK =============
// Socket.IO integration hook for real-time features

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  url: string;
  userId?: string;
  enabled?: boolean;
  autoConnect?: boolean;
}

interface SocketState {
  isConnected: boolean;
  socket: Socket | null;
}

export const useSocket = (options: UseSocketOptions) => {
  const { url, userId, enabled = true, autoConnect = true } = options;
  const socketRef = useRef<Socket | null>(null);
  const [state, setState] = useState<SocketState>({
    isConnected: false,
    socket: null,
  });

  // Connect to socket
  const connect = useCallback(() => {
    if (!enabled || socketRef.current) return;

    console.log('🔌 Connecting to socket:', url);

    const socket = io(url, {
      autoConnect,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      query: userId ? { userId } : undefined,
    });

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
      setState({ isConnected: true, socket });
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setState((prev) => ({ ...prev, isConnected: false }));
    });

    socket.on('error', (error) => {
      console.error('⚠️ Socket error:', error);
    });

    socketRef.current = socket;
    setState({ isConnected: socket.connected, socket });
  }, [url, userId, enabled, autoConnect]);

  // Disconnect from socket
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log('🔌 Disconnecting from socket');
      socketRef.current.disconnect();
      socketRef.current = null;
      setState({ isConnected: false, socket: null });
    }
  }, []);

  // Emit event
  const emit = useCallback(
    (event: string, data?: any) => {
      if (socketRef.current && state.isConnected) {
        socketRef.current.emit(event, data);
      } else {
        console.warn('⚠️ Cannot emit event: socket not connected');
      }
    },
    [state.isConnected]
  );

  // Subscribe to event
  const on = useCallback((event: string, callback: (...args: any[]) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);

      // Return cleanup function
      return () => {
        socketRef.current?.off(event, callback);
      };
    }
    return () => {};
  }, []);

  // Unsubscribe from event
  const off = useCallback((event: string, callback?: (...args: any[]) => void) => {
    if (socketRef.current) {
      if (callback) {
        socketRef.current.off(event, callback);
      } else {
        socketRef.current.off(event);
      }
    }
  }, []);

  // Initialize socket on mount
  useEffect(() => {
    if (enabled && autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, autoConnect, connect, disconnect]);

  return {
    isConnected: state.isConnected,
    socket: state.socket,
    connect,
    disconnect,
    emit,
    on,
    off,
  };
};

/**
 * Example usage:
 *
 * const MyComponent = () => {
 *   const { isConnected, emit, on } = useSocket({
 *     url: 'https://api.example.com',
 *     userId: 'user123',
 *   });
 *
 *   useEffect(() => {
 *     const cleanup = on('game:state', (data) => {
 *       console.log('Game state updated:', data);
 *     });
 *
 *     return cleanup;
 *   }, [on]);
 *
 *   const handleAction = () => {
 *     emit('game:action', { type: 'attack' });
 *   };
 *
 *   return <div>Connected: {isConnected ? 'Yes' : 'No'}</div>;
 * };
 */
