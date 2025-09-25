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
  onUserActivity
}: UseSocketProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Conectar ao servidor Socket.IO
    const serverUrl = process.env.NODE_ENV === 'production'
      ? 'https://back.roilabs.com.br'
      : 'http://localhost:5001';

    socketRef.current = io(serverUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    });

    const socket = socketRef.current;

    // Event listeners
    socket.on('connect', () => {
      console.log('🔗 Connected to Socket.IO server:', socket.id);

      // Entrar no room do board se especificado
      if (boardId) {
        socket.emit('join-board', boardId);
      }
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

    // Cleanup na desmontagem
    return () => {
      if (boardId) {
        socket.emit('leave-board', boardId);
      }
      socket.disconnect();
      socketRef.current = null;
    };
  }, [boardId, userId]);

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