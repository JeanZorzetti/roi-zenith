import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketProps {
  boardId?: string;
  userId?: string;
  onTaskUpdated?: (data: any) => void;
  onTaskCreated?: (data: any) => void;
  onTaskDeleted?: (data: any) => void;
  onTaskMoved?: (data: any) => void;
  onBoardUpdated?: (data: any) => void;
  onUserJoined?: (data: any) => void;
  onUserLeft?: (data: any) => void;
  onUserActivity?: (data: any) => void;
  onCurrentUsers?: (data: any) => void;
}

export const useSocket = ({
  boardId,
  userId,
  onTaskUpdated,
  onTaskCreated,
  onTaskDeleted,
  onTaskMoved,
  onBoardUpdated,
  onUserJoined,
  onUserLeft,
  onUserActivity,
  onCurrentUsers
}: UseSocketProps) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Evitar múltiplas conexões se já existe uma ativa
    if (socketRef.current?.connected) {
      return;
    }

    // Conectar ao servidor Socket.IO
    // Detectar ambiente: se a URL contém 'roilabs.com.br', é produção
    const isProduction = process.env.NODE_ENV === 'production' || window.location.hostname.includes('roilabs.com');

    const serverUrl = isProduction
      ? 'https://back.roilabs.com.br'
      : 'http://localhost:5002';

    console.log(`🌍 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
    console.log(`🔗 Socket URL: ${serverUrl}`);

    socketRef.current = io(serverUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: false,
      autoConnect: true
    });

    const socket = socketRef.current;

    // Event listeners
    socket.on('connect', () => {
      console.log('🔗 Connected to Socket.IO server:', socket.id);
      console.log('📊 Socket connection status:', socket.connected);
      console.log('🏷️ Board ID for connection:', boardId);
      console.log('👤 User ID for connection:', userId);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO server');
      setIsConnected(false);
    });

    // Board events
    if (onTaskUpdated) {
      socket.on('task-updated', (data) => {
        console.log('📝 Received task-updated event:', data);
        onTaskUpdated(data);
      });
    }
    if (onTaskCreated) {
      socket.on('task-created', (data) => {
        console.log('✨ Received task-created event:', data);
        onTaskCreated(data);
      });
    }
    if (onTaskDeleted) {
      socket.on('task-deleted', (data) => {
        console.log('🗑️ Received task-deleted event:', data);
        onTaskDeleted(data);
      });
    }
    if (onTaskMoved) {
      socket.on('task-moved', (data) => {
        console.log('🔄 Received task-moved event:', data);
        onTaskMoved(data);
      });
    }
    if (onBoardUpdated) socket.on('board-updated', onBoardUpdated);

    // User events
    if (onUserJoined) {
      socket.on('user-joined', (data) => {
        console.log('👤 Received user-joined event:', data);
        onUserJoined(data);
      });
    }
    if (onUserLeft) {
      socket.on('user-left', (data) => {
        console.log('👋 Received user-left event:', data);
        onUserLeft(data);
      });
    }
    if (onUserActivity) {
      socket.on('user-activity', (data) => {
        console.log('⚡ Received user-activity event:', data);
        onUserActivity(data);
      });
    }
    if (onCurrentUsers) {
      socket.on('current-users', (data) => {
        console.log('👥 Received current-users event:', data);
        onCurrentUsers(data);
      });
    }

    // Cleanup na desmontagem do componente
    return () => {
      if (socketRef.current) {
        if (boardId) {
          socketRef.current.emit('leave-board', boardId);
        }
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []); // Remover dependências para evitar reconexões desnecessárias

  // Efeito para gerenciar a entrada no board quando a conexão e boardId estão prontos
  useEffect(() => {
    if (isConnected && boardId && socketRef.current) {
      console.log('🚪 Socket connected and boardId available, joining board:', boardId, 'with user:', userId);

      // Pequeno delay para garantir que a conexão está completamente estabelecida
      const timeoutId = setTimeout(() => {
        if (socketRef.current?.connected) {
          console.log('🚪 Actually joining board:', boardId);
          socketRef.current.emit('join-board', boardId);
        }
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        if (socketRef.current?.connected && boardId) {
          console.log('🚪 Leaving board:', boardId);
          socketRef.current.emit('leave-board', boardId);
        }
      };
    } else {
      console.log('⚠️ Not joining board - Connected:', isConnected, 'BoardId:', boardId, 'Socket exists:', !!socketRef.current);
    }
  }, [isConnected, boardId, userId]);

  // Métodos para emitir eventos
  const emitTaskUpdated = (taskData: any) => {
    socketRef.current?.emit('task-updated', { ...taskData, boardId });
  };

  const emitTaskCreated = (taskData: any) => {
    socketRef.current?.emit('task-created', { ...taskData, boardId });
  };

  const emitTaskDeleted = (taskId: string) => {
    socketRef.current?.emit('task-deleted', { taskId, boardId });
  };

  const emitTaskMoved = (taskId: string, fromColumn: string, toColumn: string, newIndex: number) => {
    socketRef.current?.emit('task-moved', {
      taskId,
      fromColumn,
      toColumn,
      newIndex,
      boardId
    });
  };

  const emitBoardUpdated = (boardData: any) => {
    socketRef.current?.emit('board-updated', { ...boardData, boardId });
  };

  const emitUserActivity = (activity: string, data?: any) => {
    socketRef.current?.emit('user-activity', {
      activity,
      data,
      boardId,
      userId
    });
  };

  return {
    socket: socketRef.current,
    isConnected,
    emitTaskUpdated,
    emitTaskCreated,
    emitTaskDeleted,
    emitTaskMoved,
    emitBoardUpdated,
    emitUserActivity
  };
};