import { useState, useEffect, useCallback, useMemo } from 'react';
import { Activity, ActivityFilter, ActivityStats, ActivityType, ActivityUser } from '../types/Activity';
import { activityService, ActivityHelpers } from '../services/activityService';

interface UseActivityOptions {
  boardId?: string;
  autoLoad?: boolean;
  realtimeUpdates?: boolean;
}

interface UseActivityReturn {
  // Estado das atividades
  activities: Activity[];
  filteredActivities: Activity[];
  recentActivities: Activity[];
  loading: boolean;
  error: string | null;

  // Estatísticas
  stats: ActivityStats;

  // Filtros
  filter: ActivityFilter;
  setFilter: (filter: Partial<ActivityFilter>) => void;
  clearFilter: () => void;

  // Ações
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  clearActivities: () => void;
  removeActivity: (activityId: string) => void;

  // Helpers para tipos específicos
  addTaskActivity: (
    type: 'task-created' | 'task-updated' | 'task-deleted',
    user: ActivityUser,
    taskId: string,
    taskTitle: string,
    columnId?: string,
    changes?: any
  ) => void;

  addTaskMovedActivity: (
    user: ActivityUser,
    taskId: string,
    taskTitle: string,
    fromColumn: string,
    toColumn: string,
    fromColumnName?: string,
    toColumnName?: string
  ) => void;

  addUserActivity: (
    type: 'user-joined' | 'user-left',
    user: ActivityUser
  ) => void;

  // Utilitários
  getActivitiesByType: (type: ActivityType) => Activity[];
  getActivitiesByUser: (userId: string) => Activity[];
  getActivitiesInRange: (start: Date, end: Date) => Activity[];

  // Estado de busca
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Paginação
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  activitiesPerPage: number;
  setActivitiesPerPage: (count: number) => void;
}

export const useActivity = (options: UseActivityOptions = {}): UseActivityReturn => {
  const {
    boardId,
    autoLoad = true,
    realtimeUpdates = true
  } = options;

  // Estado local
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilterState] = useState<ActivityFilter>({
    boardId,
    limit: 50,
    offset: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage, setActivitiesPerPage] = useState(10);

  // Carregar atividades inicial
  useEffect(() => {
    if (autoLoad) {
      loadActivities();
    }
  }, [autoLoad, boardId]);

  // Assinar mudanças em tempo real
  useEffect(() => {
    if (realtimeUpdates) {
      const unsubscribe = activityService.subscribe((newActivities) => {
        setActivities(newActivities);
      });

      return unsubscribe;
    }
  }, [realtimeUpdates]);

  // Atualizar filtro quando boardId muda
  useEffect(() => {
    if (boardId && filter.boardId !== boardId) {
      setFilterState(prev => ({ ...prev, boardId }));
    }
  }, [boardId, filter.boardId]);

  const loadActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const loadedActivities = activityService.getActivities(filter);
      setActivities(loadedActivities);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar atividades');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Atividades filtradas com busca
  const filteredActivities = useMemo(() => {
    let filtered = [...activities];

    // Aplicar filtro
    if (filter.types && filter.types.length > 0) {
      filtered = filtered.filter(activity => filter.types!.includes(activity.type));
    }

    if (filter.users && filter.users.length > 0) {
      filtered = filtered.filter(activity => filter.users!.includes(activity.user.id));
    }

    if (filter.dateRange) {
      filtered = filtered.filter(activity =>
        activity.timestamp >= filter.dateRange!.start &&
        activity.timestamp <= filter.dateRange!.end
      );
    }

    if (filter.taskId) {
      filtered = filtered.filter(activity =>
        'taskId' in activity && activity.taskId === filter.taskId
      );
    }

    // Aplicar busca por termo
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(activity => {
        const searchableText = [
          activity.user.name,
          activity.type,
          'taskTitle' in activity ? activity.taskTitle : '',
          'boardName' in activity ? activity.boardName : '',
          'columnName' in activity ? activity.columnName : '',
          'comment' in activity ? activity.comment : ''
        ].join(' ').toLowerCase();

        return searchableText.includes(searchLower);
      });
    }

    return filtered;
  }, [activities, filter, searchTerm]);

  // Atividades paginadas
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * activitiesPerPage;
    const endIndex = startIndex + activitiesPerPage;
    return filteredActivities.slice(startIndex, endIndex);
  }, [filteredActivities, currentPage, activitiesPerPage]);

  // Atividades recentes (últimas 10)
  const recentActivities = useMemo(() => {
    return activities.slice(0, 10);
  }, [activities]);

  // Estatísticas
  const stats = useMemo(() => {
    return activityService.getStats(boardId);
  }, [activities, boardId]);

  // Total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(filteredActivities.length / activitiesPerPage);
  }, [filteredActivities.length, activitiesPerPage]);

  // Atualizar filtro
  const setFilter = useCallback((newFilter: Partial<ActivityFilter>) => {
    setFilterState(prev => ({ ...prev, ...newFilter }));
    setCurrentPage(1); // Reset para primeira página ao filtrar
  }, []);

  // Limpar filtro
  const clearFilter = useCallback(() => {
    setFilterState({
      boardId,
      limit: 50,
      offset: 0
    });
    setSearchTerm('');
    setCurrentPage(1);
  }, [boardId]);

  // Adicionar atividade
  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'timestamp'>) => {
    try {
      activityService.addActivity({
        ...activity,
        boardId: activity.boardId || boardId || ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar atividade');
    }
  }, [boardId]);

  // Helpers para tipos específicos
  const addTaskActivity = useCallback((
    type: 'task-created' | 'task-updated' | 'task-deleted',
    user: ActivityUser,
    taskId: string,
    taskTitle: string,
    columnId?: string,
    changes?: any
  ) => {
    const activity = ActivityHelpers.createTaskActivity(
      type,
      user,
      boardId || '',
      taskId,
      taskTitle,
      columnId,
      changes
    );
    addActivity(activity);
  }, [boardId, addActivity]);

  const addTaskMovedActivity = useCallback((
    user: ActivityUser,
    taskId: string,
    taskTitle: string,
    fromColumn: string,
    toColumn: string,
    fromColumnName?: string,
    toColumnName?: string
  ) => {
    const activity = ActivityHelpers.createTaskMovedActivity(
      user,
      boardId || '',
      taskId,
      taskTitle,
      fromColumn,
      toColumn,
      fromColumnName,
      toColumnName
    );
    addActivity(activity);
  }, [boardId, addActivity]);

  const addUserActivity = useCallback((
    type: 'user-joined' | 'user-left',
    user: ActivityUser
  ) => {
    const activity = ActivityHelpers.createUserActivity(
      type,
      user,
      boardId || ''
    );
    addActivity(activity);
  }, [boardId, addActivity]);

  // Limpar todas as atividades
  const clearActivities = useCallback(() => {
    try {
      activityService.clearAll();
      setActivities([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao limpar atividades');
    }
  }, []);

  // Remover atividade específica
  const removeActivity = useCallback((activityId: string) => {
    try {
      activityService.removeActivities({
        // Usar filtro para remover apenas a atividade específica
        search: activityId
      });
      setActivities(prev => prev.filter(activity => activity.id !== activityId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao remover atividade');
    }
  }, []);

  // Utilitários
  const getActivitiesByType = useCallback((type: ActivityType): Activity[] => {
    return activities.filter(activity => activity.type === type);
  }, [activities]);

  const getActivitiesByUser = useCallback((userId: string): Activity[] => {
    return activities.filter(activity => activity.user.id === userId);
  }, [activities]);

  const getActivitiesInRange = useCallback((start: Date, end: Date): Activity[] => {
    return activities.filter(activity =>
      activity.timestamp >= start && activity.timestamp <= end
    );
  }, [activities]);

  return {
    // Estado
    activities: paginatedActivities,
    filteredActivities,
    recentActivities,
    loading,
    error,

    // Estatísticas
    stats,

    // Filtros
    filter,
    setFilter,
    clearFilter,

    // Ações
    addActivity,
    clearActivities,
    removeActivity,

    // Helpers
    addTaskActivity,
    addTaskMovedActivity,
    addUserActivity,

    // Utilitários
    getActivitiesByType,
    getActivitiesByUser,
    getActivitiesInRange,

    // Busca
    searchTerm,
    setSearchTerm,

    // Paginação
    currentPage,
    totalPages,
    setCurrentPage,
    activitiesPerPage,
    setActivitiesPerPage
  };
};

// Hook simplificado para apenas atividades recentes
export const useRecentActivity = (boardId?: string, limit: number = 10) => {
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const unsubscribe = activityService.subscribe((activities) => {
      const filtered = boardId
        ? activities.filter(activity => activity.boardId === boardId)
        : activities;

      setRecentActivities(filtered.slice(0, limit));
    });

    // Carregar atividades iniciais
    const initial = activityService.getRecentActivities(limit);
    setRecentActivities(
      boardId
        ? initial.filter(activity => activity.boardId === boardId)
        : initial
    );

    return unsubscribe;
  }, [boardId, limit]);

  return recentActivities;
};

// Hook para estatísticas de atividade
export const useActivityStats = (boardId?: string) => {
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateStats = () => {
      const newStats = activityService.getStats(boardId);
      setStats(newStats);
      setLoading(false);
    };

    // Atualizar stats quando atividades mudam
    const unsubscribe = activityService.subscribe(() => {
      updateStats();
    });

    // Carregar stats iniciais
    updateStats();

    return unsubscribe;
  }, [boardId]);

  return { stats, loading };
};