import React, { useState, useMemo } from 'react';
import { Activity } from '../../types/Activity';
import { useActivity } from '../../hooks/useActivity';
import ActivityItem from './ActivityItem';
import ActivityFilters from './ActivityFilters';
import { ChevronLeft, ChevronRight, RefreshCw, BarChart3, List, Grid3X3 } from 'lucide-react';

interface ActivityFeedProps {
  boardId?: string;
  compact?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  maxHeight?: string;
  onActivityClick?: (activity: Activity) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  boardId,
  compact = false,
  showFilters = true,
  showPagination = true,
  maxHeight = 'max-h-96',
  onActivityClick
}) => {
  const {
    activities,
    filteredActivities,
    loading,
    error,
    filter,
    setFilter,
    clearFilter,
    currentPage,
    totalPages,
    setCurrentPage,
    activitiesPerPage,
    setActivitiesPerPage,
    searchTerm,
    setSearchTerm
  } = useActivity({ boardId, autoLoad: true, realtimeUpdates: true });

  const [viewMode, setViewMode] = useState<'list' | 'compact' | 'grid'>('list');

  // Obter lista de usuários únicos para filtros
  const users = useMemo(() => {
    const userMap = new Map();
    filteredActivities.forEach(activity => {
      if (!userMap.has(activity.user.id)) {
        userMap.set(activity.user.id, activity.user);
      }
    });
    return Array.from(userMap.values());
  }, [filteredActivities]);

  // Agrupar atividades por data
  const groupedActivities = useMemo(() => {
    const groups: Record<string, Activity[]> = {};

    activities.forEach(activity => {
      const date = activity.timestamp.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
    });

    return groups;
  }, [activities]);

  const formatDateGroup = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-400">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        <span>Carregando atividades...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
        <p>Erro ao carregar atividades: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-white">
            Atividade Recente
          </h3>
          <span className="text-sm text-gray-400">
            {filteredActivities.length} {filteredActivities.length === 1 ? 'atividade' : 'atividades'}
          </span>
        </div>

        {/* Controles de visualização */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`
                p-2 rounded transition-colors
                ${viewMode === 'list' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white'}
              `}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`
                p-2 rounded transition-colors
                ${viewMode === 'compact' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white'}
              `}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`
                p-2 rounded transition-colors
                ${viewMode === 'grid' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white'}
              `}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <ActivityFilters
          filter={filter}
          onFilterChange={setFilter}
          onClearFilter={clearFilter}
          users={users}
        />
      )}

      {/* Lista de atividades */}
      <div className={`${maxHeight} overflow-y-auto custom-scrollbar`}>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma atividade encontrada</p>
            <p className="text-sm mt-2">
              As atividades aparecerão aqui conforme você utiliza o sistema
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Visualização agrupada por data */}
            {viewMode === 'list' && Object.entries(groupedActivities).map(([date, dayActivities]) => (
              <div key={date} className="space-y-3">
                <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm py-2 px-3 rounded-lg border border-gray-700/50">
                  <h4 className="text-sm font-medium text-gray-300">
                    {formatDateGroup(date)}
                  </h4>
                </div>
                <div className="space-y-2">
                  {dayActivities.map(activity => (
                    <ActivityItem
                      key={activity.id}
                      activity={activity}
                      compact={false}
                      onClick={onActivityClick}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Visualização compacta */}
            {viewMode === 'compact' && (
              <div className="space-y-1">
                {activities.map(activity => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    compact={true}
                    showAvatar={false}
                    onClick={onActivityClick}
                  />
                ))}
              </div>
            )}

            {/* Visualização em grid */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activities.map(activity => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    compact={false}
                    onClick={onActivityClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Paginação */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Itens por página:</span>
            <select
              value={activitiesPerPage}
              onChange={(e) => setActivitiesPerPage(Number(e.target.value))}
              className="bg-gray-800/50 border border-gray-700/50 rounded px-2 py-1 text-white text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Página {currentPage} de {totalPages}
            </span>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;