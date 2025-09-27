import React from 'react';
import { Activity, ActivityIcons, ActivityTexts } from '../../types/Activity';

interface ActivityItemProps {
  activity: Activity;
  compact?: boolean;
  showAvatar?: boolean;
  showTime?: boolean;
  onClick?: (activity: Activity) => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  compact = false,
  showAvatar = true,
  showTime = true,
  onClick
}) => {
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'agora mesmo';
    if (minutes < 60) return `há ${minutes} min`;
    if (hours < 24) return `há ${hours}h`;
    if (days < 7) return `há ${days} dias`;

    return timestamp.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityDescription = () => {
    const baseText = ActivityTexts[activity.type] || activity.type;

    // Adicionar contexto específico baseado no tipo
    switch (activity.type) {
      case 'task-moved':
        if ('fromColumnName' in activity && 'toColumnName' in activity) {
          return `${baseText} de "${activity.fromColumnName}" para "${activity.toColumnName}"`;
        }
        return baseText;

      case 'task-priority-changed':
        if ('fromPriority' in activity && 'toPriority' in activity) {
          return `alterou prioridade de ${activity.fromPriority} para ${activity.toPriority}`;
        }
        return baseText;

      case 'task-assigned':
        if ('assignee' in activity) {
          return `atribuiu para ${activity.assignee}`;
        }
        return baseText;

      case 'checklist-item-completed':
        if ('itemText' in activity) {
          return `completou "${activity.itemText}"`;
        }
        return baseText;

      default:
        return baseText;
    }
  };

  const getTaskTitle = () => {
    if ('taskTitle' in activity) {
      return activity.taskTitle;
    }
    if ('boardName' in activity) {
      return activity.boardName;
    }
    if ('columnName' in activity) {
      return activity.columnName;
    }
    return '';
  };

  const getActivityColor = () => {
    switch (activity.type) {
      case 'task-created':
      case 'task-completed':
        return 'text-green-400';
      case 'task-deleted':
        return 'text-red-400';
      case 'task-moved':
        return 'text-blue-400';
      case 'task-updated':
        return 'text-yellow-400';
      case 'user-joined':
        return 'text-purple-400';
      case 'user-left':
        return 'text-gray-400';
      default:
        return 'text-gray-300';
    }
  };

  const icon = ActivityIcons[activity.type] || '📝';
  const description = getActivityDescription();
  const taskTitle = getTaskTitle();
  const colorClass = getActivityColor();

  return (
    <div
      className={`
        flex items-start space-x-3 p-3 rounded-lg transition-all duration-200
        ${compact ? 'py-2' : 'py-3'}
        ${onClick ? 'cursor-pointer hover:bg-gray-800/50' : ''}
        activity-item-glow
      `}
      onClick={() => onClick?.(activity)}
    >
      {/* Ícone da atividade */}
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm
        bg-gray-800/50 border border-gray-700/50
      `}>
        <span>{icon}</span>
      </div>

      {/* Avatar do usuário */}
      {showAvatar && (
        <div className={`
          flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs
          ${activity.user.color} bg-opacity-20 border border-opacity-30 ${activity.user.color?.replace('bg-', 'border-') || 'border-blue-500'}
        `}>
          <span>{activity.user.avatar}</span>
        </div>
      )}

      {/* Conteúdo da atividade */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm ${compact ? 'space-y-1' : 'space-y-2'}`}>
          {/* Linha principal */}
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium">{activity.user.name}</span>
            <span className={`${colorClass} transition-colors`}>{description}</span>
          </div>

          {/* Título da task/item */}
          {taskTitle && (
            <div className="text-gray-300 font-medium truncate">
              "{taskTitle}"
            </div>
          )}

          {/* Mudanças específicas (para updates) */}
          {activity.type === 'task-updated' && 'changes' in activity && activity.changes && (
            <div className="space-y-1 text-xs text-gray-400">
              {Object.entries(activity.changes).map(([field, change]) => (
                <div key={field} className="flex items-center space-x-2">
                  <span className="capitalize">{field}:</span>
                  <span className="text-red-400">"{change.from}"</span>
                  <span>→</span>
                  <span className="text-green-400">"{change.to}"</span>
                </div>
              ))}
            </div>
          )}

          {/* Comentário (para atividades de comentário) */}
          {activity.type === 'comment-added' && 'comment' in activity && (
            <div className="text-gray-300 text-sm italic border-l-2 border-gray-600 pl-3">
              "{activity.comment}"
            </div>
          )}
        </div>

        {/* Timestamp */}
        {showTime && (
          <div className="text-xs text-gray-500 mt-2">
            {formatTime(activity.timestamp)}
          </div>
        )}
      </div>

      {/* Indicador de categoria */}
      <div className={`
        flex-shrink-0 w-2 h-2 rounded-full
        ${activity.type.startsWith('task-') ? 'bg-blue-400' : ''}
        ${activity.type.startsWith('user-') ? 'bg-green-400' : ''}
        ${activity.type.startsWith('board-') ? 'bg-purple-400' : ''}
        ${activity.type.startsWith('checklist-') ? 'bg-orange-400' : ''}
        ${activity.type.startsWith('comment-') ? 'bg-pink-400' : ''}
      `} />
    </div>
  );
};

export default ActivityItem;