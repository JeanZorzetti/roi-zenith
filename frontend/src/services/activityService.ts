import {
  Activity,
  ActivityUser,
  ActivityFilter,
  ActivityStats,
  ActivityType
} from '../types/Activity';


class ActivityService {
  private activities: Activity[] = [];
  private maxActivities = 1000; // Máximo de atividades em memória
  private storageKey = 'kanban-activities';
  private subscribers: ((activities: Activity[]) => void)[] = [];

  constructor() {
    this.loadFromStorage();
    this.startPeriodicCleanup();
  }

  // Gerenciamento de assinantes para reatividade
  subscribe(callback: (activities: Activity[]) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback([...this.activities]));
  }

  // Adicionar nova atividade
  addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): void {
    const newActivity: Activity = {
      ...activity,
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    } as Activity;

    // Verificar se não é duplicada (evitar spam)
    if (!this.isDuplicate(newActivity)) {
      this.activities.unshift(newActivity);
      this.limitActivities();
      this.saveToStorage();
      this.notifySubscribers();
    }
  }

  // Verificar duplicatas (atividades muito similares em pouco tempo)
  private isDuplicate(newActivity: Activity): boolean {
    const recentActivities = this.activities.slice(0, 5);
    const fiveSecondsAgo = Date.now() - 5000;

    return recentActivities.some(activity =>
      activity.type === newActivity.type &&
      activity.user.id === newActivity.user.id &&
      activity.timestamp.getTime() > fiveSecondsAgo &&
      ('taskId' in activity && 'taskId' in newActivity ? activity.taskId === newActivity.taskId : true)
    );
  }

  // Obter atividades com filtros
  getActivities(filter?: ActivityFilter): Activity[] {
    let filtered = [...this.activities];

    if (filter) {
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

      if (filter.boardId) {
        filtered = filtered.filter(activity => activity.boardId === filter.boardId);
      }

      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
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
    }

    return filtered;
  }

  // Obter atividades recentes (últimas N)
  getRecentActivities(limit: number = 10): Activity[] {
    return this.activities.slice(0, limit);
  }

  // Gerar estatísticas
  getStats(boardId?: string): ActivityStats {
    const activities = boardId
      ? this.activities.filter(a => a.boardId === boardId)
      : this.activities;

    const stats: ActivityStats = {
      totalActivities: activities.length,
      activitiesByType: {} as Record<ActivityType, number>,
      activitiesByUser: {},
      activitiesByHour: {},
      activitiesByDay: {},
      activitiesByWeek: {},
      mostActiveUser: {
        id: '',
        name: '',
        count: 0
      },
      peakHour: 0,
      peakDay: '',
      averageActivitiesPerDay: 0,
      streak: {
        current: 0,
        longest: 0
      }
    };

    if (activities.length === 0) return stats;

    const userNames: Record<string, string> = {};

    activities.forEach(activity => {
      // Mapear nomes de usuários
      userNames[activity.user.id] = activity.user.name;

      // Por tipo
      stats.activitiesByType[activity.type] = (stats.activitiesByType[activity.type] || 0) + 1;

      // Por usuário
      stats.activitiesByUser[activity.user.id] = (stats.activitiesByUser[activity.user.id] || 0) + 1;

      // Por hora
      const hour = activity.timestamp.getHours();
      stats.activitiesByHour[hour] = (stats.activitiesByHour[hour] || 0) + 1;

      // Por dia
      const day = activity.timestamp.toISOString().split('T')[0];
      stats.activitiesByDay[day] = (stats.activitiesByDay[day] || 0) + 1;

      // Por semana
      const weekStart = this.getWeekStart(activity.timestamp);
      stats.activitiesByWeek[weekStart] = (stats.activitiesByWeek[weekStart] || 0) + 1;
    });

    // Usuário mais ativo
    let maxActivities = 0;
    Object.entries(stats.activitiesByUser).forEach(([userId, count]) => {
      if (count > maxActivities) {
        maxActivities = count;
        stats.mostActiveUser = {
          id: userId,
          name: userNames[userId] || userId,
          count
        };
      }
    });

    // Hora de pico
    let maxHourActivities = 0;
    Object.entries(stats.activitiesByHour).forEach(([hour, count]) => {
      if (count > maxHourActivities) {
        maxHourActivities = count;
        stats.peakHour = parseInt(hour);
      }
    });

    // Dia de pico
    let maxDayActivities = 0;
    Object.entries(stats.activitiesByDay).forEach(([day, count]) => {
      if (count > maxDayActivities) {
        maxDayActivities = count;
        stats.peakDay = day;
      }
    });

    // Média de atividades por dia
    const uniqueDays = Object.keys(stats.activitiesByDay).length;
    stats.averageActivitiesPerDay = uniqueDays > 0 ? activities.length / uniqueDays : 0;

    // Calcular streaks
    stats.streak = this.calculateStreaks(stats.activitiesByDay);

    return stats;
  }

  // Calcular início da semana
  private getWeekStart(date: Date): string {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajustar para segunda-feira
    d.setDate(diff);
    return d.toISOString().split('T')[0];
  }

  // Calcular streaks de atividade
  private calculateStreaks(activitiesByDay: Record<string, number>): { current: number; longest: number } {
    const days = Object.keys(activitiesByDay).sort();
    if (days.length === 0) return { current: 0, longest: 0 };

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    // Verificar se hoje tem atividade
    const today = new Date().toISOString().split('T')[0];
    const hasActivityToday = activitiesByDay[today] > 0;

    for (let i = 1; i < days.length; i++) {
      const currentDay = new Date(days[i]);
      const previousDay = new Date(days[i - 1]);
      const dayDiff = (currentDay.getTime() - previousDay.getTime()) / (1000 * 60 * 60 * 24);

      if (dayDiff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak);

    // Calcular streak atual (a partir de hoje retrocedendo)
    if (hasActivityToday) {
      currentStreak = 1;
      const sortedDays = days.slice().reverse();

      for (let i = 1; i < sortedDays.length; i++) {
        const currentDay = new Date(sortedDays[i - 1]);
        const previousDay = new Date(sortedDays[i]);
        const dayDiff = (currentDay.getTime() - previousDay.getTime()) / (1000 * 60 * 60 * 24);

        if (dayDiff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    return { current: currentStreak, longest: longestStreak };
  }

  // Limpar atividades antigas
  private limitActivities(): void {
    if (this.activities.length > this.maxActivities) {
      this.activities = this.activities.slice(0, this.maxActivities);
    }
  }

  // Persistência
  private saveToStorage(): void {
    try {
      const data = {
        activities: this.activities,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar atividades no localStorage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.activities = data.activities.map((activity: any) => ({
          ...activity,
          timestamp: new Date(activity.timestamp)
        }));

        // Limpar atividades muito antigas (mais de 30 dias)
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        this.activities = this.activities.filter(
          activity => activity.timestamp.getTime() > thirtyDaysAgo
        );
      }
    } catch (error) {
      console.error('Erro ao carregar atividades do localStorage:', error);
      this.activities = [];
    }
  }

  // Limpeza periódica (a cada hora)
  private startPeriodicCleanup(): void {
    setInterval(() => {
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      const beforeCount = this.activities.length;

      this.activities = this.activities.filter(
        activity => activity.timestamp.getTime() > oneDayAgo
      );

      if (this.activities.length !== beforeCount) {
        this.saveToStorage();
        console.log(`🧹 Limpeza automática: ${beforeCount - this.activities.length} atividades antigas removidas`);
      }
    }, 60 * 60 * 1000); // A cada hora
  }

  // Limpar todas as atividades
  clearAll(): void {
    this.activities = [];
    this.saveToStorage();
    this.notifySubscribers();
  }

  // Remover atividades por filtro
  removeActivities(filter: ActivityFilter): void {
    const toRemove = this.getActivities(filter);
    this.activities = this.activities.filter(
      activity => !toRemove.some(remove => remove.id === activity.id)
    );
    this.saveToStorage();
    this.notifySubscribers();
  }
}

// Instância singleton
export const activityService = new ActivityService();

// Helpers para criar atividades específicas
export const ActivityHelpers = {
  createTaskActivity: (
    type: 'task-created' | 'task-updated' | 'task-deleted',
    user: ActivityUser,
    boardId: string,
    taskId: string,
    taskTitle: string,
    columnId?: string,
    changes?: any
  ) => {
    return {
      type,
      user,
      boardId,
      taskId,
      taskTitle,
      columnId,
      ...(changes && { changes })
    };
  },

  createTaskMovedActivity: (
    user: ActivityUser,
    boardId: string,
    taskId: string,
    taskTitle: string,
    fromColumn: string,
    toColumn: string,
    fromColumnName?: string,
    toColumnName?: string
  ) => {
    return {
      type: 'task-moved' as const,
      user,
      boardId,
      taskId,
      taskTitle,
      fromColumn,
      toColumn,
      fromColumnName,
      toColumnName
    };
  },

  createUserActivity: (
    type: 'user-joined' | 'user-left',
    user: ActivityUser,
    boardId: string
  ) => {
    return {
      type,
      user,
      boardId
    };
  }
};