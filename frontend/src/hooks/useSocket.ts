import { useEffect, useRef } from 'react';
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
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO server');
    });

    // Board events
    if (onTaskUpdated) socket.on('task-updated', onTaskUpdated);
    if (onTaskCreated) socket.on('task-created', onTaskCreated);
    if (onTaskDeleted) socket.on('task-deleted', onTaskDeleted);
    if (onTaskMoved) socket.on('task-moved', onTaskMoved);
    if (onBoardUpdated) socket.on('board-updated', onBoardUpdated);

    // User events
    if (onUserJoined) socket.on('user-joined', onUserJoined);
    if (onUserLeft) socket.on('user-left', onUserLeft);
    if (onUserActivity) socket.on('user-activity', onUserActivity);
    if (onCurrentUsers) socket.on('current-users', onCurrentUsers);

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

  // Efeito separado para gerenciar mudanças de board
  useEffect(() => {
    if (socketRef.current?.connected && boardId) {
      socketRef.current.emit('join-board', boardId);

      return () => {
        if (socketRef.current?.connected && boardId) {
          socketRef.current.emit('leave-board', boardId);
        }
      };
    }
  }, [boardId]);

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
    isConnected: socketRef.current?.connected || false,
    emitTaskUpdated,
    emitTaskCreated,
    emitTaskDeleted,
    emitTaskMoved,
    emitBoardUpdated,
    emitUserActivity
  };
};