import { Activity, ActivityType, NotificationSettings } from '../types/Activity';

export interface NotificationConfig {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  requireInteraction?: boolean;
  silent?: boolean;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  actions?: Array<{
    label: string;
    action: () => void;
    style?: 'primary' | 'secondary' | 'danger';
  }>;
  icon?: string;
  avatar?: {
    src: string;
    alt: string;
    color?: string;
  };
}

class NotificationService {
  private settings: NotificationSettings = {
    enabled: true,
    sound: true,
    desktop: true,
    types: [
      'task-created',
      'task-updated',
      'task-deleted',
      'task-moved',
      'task-assigned',
      'user-joined',
      'comment-added'
    ],
    quietHours: {
      start: '22:00',
      end: '08:00'
    },
    excludeOwnActions: true
  };

  private toastSubscribers: ((toast: ToastNotification) => void)[] = [];
  private badgeCount = 0;
  private currentSessionUserId: string | null = null;

  constructor() {
    this.loadSettings();
    this.requestPermission();
  }

  // Configurar ID do usuário atual
  setCurrentUser(userId: string) {
    this.currentSessionUserId = userId;
  }

  // Gerenciar assinantes de toast
  subscribeToToasts(callback: (toast: ToastNotification) => void): () => void {
    this.toastSubscribers.push(callback);
    return () => {
      this.toastSubscribers = this.toastSubscribers.filter(sub => sub !== callback);
    };
  }

  private notifyToastSubscribers(toast: ToastNotification) {
    this.toastSubscribers.forEach(callback => callback(toast));
  }

  // Solicitar permissão para notificações
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('Este browser não suporta notificações desktop');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  // Verificar se está em horário silencioso
  private isQuietTime(): boolean {
    if (!this.settings.quietHours) return false;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const { start, end } = this.settings.quietHours;

    // Se o horário de fim é menor que o de início, significa que cruza a meia-noite
    if (end < start) {
      return currentTime >= start || currentTime <= end;
    } else {
      return currentTime >= start && currentTime <= end;
    }
  }

  // Processar atividade para notificação
  processActivity(activity: Activity) {
    // Verificar se notificações estão habilitadas
    if (!this.settings.enabled) return;

    // Verificar se o tipo de atividade deve ser notificado
    if (!this.settings.types.includes(activity.type)) return;

    // Verificar se deve excluir ações próprias
    if (this.settings.excludeOwnActions && activity.user.id === this.currentSessionUserId) return;

    // Verificar horário silencioso
    if (this.isQuietTime()) return;

    // Gerar notificações
    const toastConfig = this.createToastConfig(activity);
    const desktopConfig = this.createDesktopConfig(activity);

    // Mostrar toast
    this.showToast(toastConfig);

    // Mostrar notificação desktop
    if (this.settings.desktop) {
      this.showDesktopNotification(desktopConfig);
    }

    // Tocar som
    if (this.settings.sound) {
      this.playNotificationSound(activity.type);
    }

    // Atualizar badge
    this.updateBadge();
  }

  // Criar configuração de toast
  private createToastConfig(activity: Activity): ToastNotification {
    const { type, user } = activity;

    let toastType: ToastNotification['type'] = 'info';
    let title = '';
    let message = '';
    let icon = '📝';

    switch (type) {
      case 'task-created':
        toastType = 'success';
        title = 'Nova tarefa criada';
        icon = '✨';
        if ('taskTitle' in activity) {
          message = `${user.name} criou "${activity.taskTitle}"`;
        }
        break;

      case 'task-updated':
        toastType = 'info';
        title = 'Tarefa atualizada';
        icon = '📝';
        if ('taskTitle' in activity) {
          message = `${user.name} atualizou "${activity.taskTitle}"`;
        }
        break;

      case 'task-deleted':
        toastType = 'warning';
        title = 'Tarefa excluída';
        icon = '🗑️';
        if ('taskTitle' in activity) {
          message = `${user.name} excluiu "${activity.taskTitle}"`;
        }
        break;

      case 'task-moved':
        toastType = 'info';
        title = 'Tarefa movida';
        icon = '🔄';
        if ('taskTitle' in activity && 'fromColumnName' in activity && 'toColumnName' in activity) {
          message = `${user.name} moveu "${activity.taskTitle}" para "${activity.toColumnName}"`;
        }
        break;

      case 'task-assigned':
        toastType = 'info';
        title = 'Tarefa atribuída';
        icon = '👤';
        if ('taskTitle' in activity && 'assignee' in activity) {
          message = `${user.name} atribuiu "${activity.taskTitle}" para ${activity.assignee}`;
        }
        break;

      case 'user-joined':
        toastType = 'success';
        title = 'Usuário entrou';
        icon = '👋';
        message = `${user.name} entrou no board`;
        break;

      case 'comment-added':
        toastType = 'info';
        title = 'Novo comentário';
        icon = '💬';
        if ('taskTitle' in activity) {
          message = `${user.name} comentou em "${activity.taskTitle}"`;
        }
        break;

      default:
        title = 'Nova atividade';
        message = `${user.name} realizou uma ação`;
    }

    return {
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: toastType,
      title,
      message,
      duration: this.getNotificationDuration(type),
      icon,
      avatar: {
        src: user.avatar,
        alt: user.name,
        color: user.color
      },
      actions: this.createToastActions(activity)
    };
  }

  // Criar configuração de notificação desktop
  private createDesktopConfig(activity: Activity): NotificationConfig {
    const { type, user } = activity;

    let title = 'ROI Labs - Kanban';
    let body = `${user.name} realizou uma ação`;
    let icon = '/favicon.ico';

    switch (type) {
      case 'task-created':
        title = 'Nova tarefa criada';
        if ('taskTitle' in activity) {
          body = `${user.name} criou "${activity.taskTitle}"`;
        }
        break;

      case 'task-updated':
        title = 'Tarefa atualizada';
        if ('taskTitle' in activity) {
          body = `${user.name} atualizou "${activity.taskTitle}"`;
        }
        break;

      case 'task-moved':
        title = 'Tarefa movida';
        if ('taskTitle' in activity && 'toColumnName' in activity) {
          body = `${user.name} moveu "${activity.taskTitle}" para "${activity.toColumnName}"`;
        }
        break;

      case 'user-joined':
        title = 'Usuário conectou';
        body = `${user.name} entrou no board`;
        break;

      case 'comment-added':
        title = 'Novo comentário';
        if ('taskTitle' in activity) {
          body = `${user.name} comentou em "${activity.taskTitle}"`;
        }
        break;
    }

    return {
      title,
      body,
      icon,
      badge: icon,
      tag: `activity_${type}`,
      data: { activityId: activity.id, type: activity.type },
      requireInteraction: ['task-assigned', 'comment-added'].includes(type),
      silent: this.isQuietTime()
    };
  }

  // Criar ações para toast
  private createToastActions(activity: Activity): ToastNotification['actions'] {
    const actions: ToastNotification['actions'] = [];

    // Ação para ver detalhes
    if ('taskId' in activity) {
      actions.push({
        label: 'Ver tarefa',
        action: () => {
          // Navegar para a tarefa
          console.log('Navegando para tarefa:', activity.taskId);
        },
        style: 'primary'
      });
    }

    // Ação para responder (comentários)
    if (activity.type === 'comment-added') {
      actions.push({
        label: 'Responder',
        action: () => {
          // Abrir modal de comentário
          console.log('Abrindo modal de comentário');
        },
        style: 'secondary'
      });
    }

    return actions;
  }

  // Mostrar toast
  private showToast(config: ToastNotification) {
    this.notifyToastSubscribers(config);
  }

  // Mostrar notificação desktop
  private async showDesktopNotification(config: NotificationConfig) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    try {
      const notification = new Notification(config.title, {
        body: config.body,
        icon: config.icon,
        badge: config.badge,
        tag: config.tag,
        data: config.data,
        requireInteraction: config.requireInteraction,
        silent: config.silent
      });

      // Auto-fechar após 5 segundos se não for interativa
      if (!config.requireInteraction) {
        setTimeout(() => {
          notification.close();
        }, 5000);
      }

      // Handler para clique
      notification.onclick = () => {
        window.focus();
        notification.close();

        // Processar dados da notificação
        if (config.data) {
          console.log('Notificação clicada:', config.data);
        }
      };

    } catch (error) {
      console.error('Erro ao mostrar notificação:', error);
    }
  }

  // Tocar som de notificação
  private playNotificationSound(type: ActivityType) {
    try {
      // Sons diferentes para tipos diferentes
      const soundMap: Record<string, string> = {
        'task-created': '/sounds/success.mp3',
        'task-updated': '/sounds/update.mp3',
        'task-deleted': '/sounds/delete.mp3',
        'user-joined': '/sounds/join.mp3',
        'comment-added': '/sounds/message.mp3',
        'default': '/sounds/notification.mp3'
      };

      const soundFile = soundMap[type] || soundMap.default;

      // Criar e tocar áudio
      const audio = new Audio(soundFile);
      audio.volume = 0.3; // Volume baixo
      audio.play().catch(error => {
        // Ignorar erros de autoplay (browser pode bloquear)
        console.log('Não foi possível tocar som de notificação:', error);
      });

    } catch (error) {
      console.error('Erro ao tocar som:', error);
    }
  }

  // Atualizar badge no favicon
  private updateBadge() {
    this.badgeCount++;

    try {
      // Atualizar título da página
      const originalTitle = document.title.replace(/^\(\d+\)\s*/, '');
      document.title = `(${this.badgeCount}) ${originalTitle}`;

      // Tentar atualizar favicon com badge (se biblioteca estiver disponível)
      if (typeof window !== 'undefined' && (window as any).Favico) {
        const favico = new (window as any).Favico({
          bgColor: '#ff0000',
          textColor: '#ffffff'
        });
        favico.badge(this.badgeCount);
      }

    } catch (error) {
      console.error('Erro ao atualizar badge:', error);
    }
  }

  // Limpar badge
  clearBadge() {
    this.badgeCount = 0;

    try {
      // Restaurar título original
      const originalTitle = document.title.replace(/^\(\d+\)\s*/, '');
      document.title = originalTitle;

      // Limpar favicon badge
      if (typeof window !== 'undefined' && (window as any).Favico) {
        const favico = new (window as any).Favico();
        favico.reset();
      }

    } catch (error) {
      console.error('Erro ao limpar badge:', error);
    }
  }

  // Duração da notificação baseada no tipo
  private getNotificationDuration(type: ActivityType): number {
    const durationMap: Record<string, number> = {
      'task-created': 4000,
      'task-updated': 3000,
      'task-deleted': 5000,
      'task-moved': 3000,
      'user-joined': 2000,
      'user-left': 2000,
      'comment-added': 5000,
      'default': 3000
    };

    return durationMap[type] || durationMap.default;
  }

  // Configurações
  updateSettings(newSettings: Partial<NotificationSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
  }

  getSettings(): NotificationSettings {
    return { ...this.settings };
  }

  private saveSettings() {
    try {
      localStorage.setItem('notification-settings', JSON.stringify(this.settings));
    } catch (error) {
      console.error('Erro ao salvar configurações de notificação:', error);
    }
  }

  private loadSettings() {
    try {
      const saved = localStorage.getItem('notification-settings');
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Erro ao carregar configurações de notificação:', error);
    }
  }

  // Métodos utilitários para teste
  testNotification() {
    const testActivity: Activity = {
      id: 'test',
      type: 'task-created',
      timestamp: new Date(),
      user: {
        id: 'test-user',
        name: 'Usuário Teste',
        avatar: '👤',
        color: 'bg-blue-500'
      },
      boardId: 'test-board',
      taskId: 'test-task',
      taskTitle: 'Tarefa de Teste'
    } as Activity;

    this.processActivity(testActivity);
  }

  // Desabilitar temporariamente (modo foco)
  enableFocusMode(durationMinutes: number = 25) {
    const originalEnabled = this.settings.enabled;
    this.settings.enabled = false;

    setTimeout(() => {
      this.settings.enabled = originalEnabled;

      // Notificar que o modo foco acabou
      this.showToast({
        id: 'focus-mode-end',
        type: 'success',
        title: 'Modo Foco Finalizado',
        message: 'As notificações foram reativadas',
        duration: 3000,
        icon: '🎯'
      });
    }, durationMinutes * 60 * 1000);

    // Notificar início do modo foco
    this.showToast({
      id: 'focus-mode-start',
      type: 'info',
      title: 'Modo Foco Ativado',
      message: `Notificações pausadas por ${durationMinutes} minutos`,
      duration: 4000,
      icon: '🎯'
    });
  }
}

// Instância singleton
export const notificationService = new NotificationService();