import React, { useState, useCallback, useMemo } from 'react';
import { Activity } from '../../types/Activity';
import { useOptimizedActivity, useOptimizedSearch, useInfiniteScroll } from '../../hooks/useOptimizedActivity';
import VirtualizedActivityList from './VirtualizedActivityList';
import ActivityFilters from './ActivityFilters';
import SmartSearch from './SmartSearch';
import { Settings, Zap, Eye, List, Grid3X3, Loader } from 'lucide-react';

interface OptimizedActivityFeedProps {
  boardId?: string;
  maxHeight?: number;
  enableVirtualization?: boolean;
  enableInfiniteScroll?: boolean;
  showPerformanceMetrics?: boolean;
}

export const OptimizedActivityFeed: React.FC<OptimizedActivityFeedProps> = ({
  boardId,
  maxHeight = 400,
  enableVirtualization = true,
  enableInfiniteScroll = false,
  showPerformanceMetrics = false
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'virtualized' | 'infinite'>('virtualized');
  const [showFilters, setShowFilters] = useState(false);

  // Hook otimizado principal
  const {
    activities,
    allActivities,
    filteredActivities,
    groupedActivities,
    loading,
    error,
    isFiltering,
    filter,
    setFilter,
    performanceMetrics
  } = useOptimizedActivity({
    boardId,
    enableVirtualization,
    debounceMs: 300,
    batchSize: 50
  });

  // Hook de busca otimizada
  const {
    searchTerm,
    searchResults,
    isSearching,
    handleSearch,
    resultCount,
    hasResults
  } = useOptimizedSearch(filteredActivities, 300);

  // Hook de scroll infinito
  const {
    displayedActivities: infiniteActivities,
    isLoading: infiniteLoading,
    hasMore,
    loadMore
  } = useInfiniteScroll(searchResults, 20);

  // Determinar quais atividades mostrar baseado no modo
  const displayActivities = useMemo(() => {
    if (enableInfiniteScroll && viewMode === 'infinite') {
      return infiniteActivities;
    }
    return searchResults;
  }, [enableInfiniteScroll, viewMode, infiniteActivities, searchResults]);

  // Usuários únicos para filtros
  const users = useMemo(() => {
    const userMap = new Map();
    allActivities.forEach(activity => {
      if (!userMap.has(activity.user.id)) {
        userMap.set(activity.user.id, activity.user);
      }
    });
    return Array.from(userMap.values());
  }, [allActivities]);

  // Handler para clique em atividade
  const handleActivityClick = useCallback((activity: Activity) => {
    console.log('Activity clicked:', activity);
    // Implementar navegação ou modal
  }, []);

  // Componente de métricas de performance
  const PerformanceMetrics = () => (
    <div className="bg-gray-900/30 border border-gray-700/30 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <Zap className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-medium text-yellow-400">Performance Metrics</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <div className="text-gray-400">Total</div>
          <div className="text-white font-mono">{performanceMetrics.totalActivities}</div>
        </div>
        <div>
          <div className="text-gray-400">Filtradas</div>
          <div className="text-white font-mono">{performanceMetrics.filteredActivities}</div>
        </div>
        <div>
          <div className="text-gray-400">Exibidas</div>
          <div className="text-white font-mono">{performanceMetrics.displayedActivities}</div>
        </div>
        <div>
          <div className="text-gray-400">Redução</div>
          <div className="text-white font-mono">{performanceMetrics.filterReduction}%</div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
        <p>Erro ao carregar atividades: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header com controles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-white">
            Feed de Atividades
          </h3>

          {/* Indicadores de estado */}
          <div className="flex items-center space-x-2">
            {(loading || isFiltering || isSearching) && (
              <div className="flex items-center space-x-2 text-blue-400">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-xs">
                  {isSearching ? 'Buscando...' : isFiltering ? 'Filtrando...' : 'Carregando...'}
                </span>
              </div>
            )}

            <span className="text-sm text-gray-400">
              {resultCount} de {allActivities.length} atividades
            </span>
          </div>
        </div>

        {/* Controles de visualização */}
        <div className="flex items-center space-x-2">
          {/* Modo de visualização */}
          <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`
                p-2 rounded transition-colors
                ${viewMode === 'list' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white'}
              `}
              title="Lista normal"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('virtualized')}
              className={`
                p-2 rounded transition-colors
                ${viewMode === 'virtualized' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white'}
              `}
              title="Lista virtualizada"
            >
              <Eye className="w-4 h-4" />
            </button>

            {enableInfiniteScroll && (
              <button
                onClick={() => setViewMode('infinite')}
                className={`
                  p-2 rounded transition-colors
                  ${viewMode === 'infinite' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white'}
                `}
                title="Scroll infinito"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Toggle filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              p-2 rounded-lg transition-colors
              ${showFilters ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-800/50 text-gray-400 hover:text-white'}
            `}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Métricas de performance */}
      {showPerformanceMetrics && <PerformanceMetrics />}

      {/* Busca inteligente */}
      <SmartSearch
        activities={filteredActivities}
        onResults={handleSearch}
        placeholder="Busca inteligente com scoring..."
      />

      {/* Filtros */}
      {showFilters && (
        <ActivityFilters
          filter={filter}
          onFilterChange={setFilter}
          onClearFilter={() => setFilter({})}
          users={users}
        />
      )}

      {/* Lista de atividades */}
      <div className="relative">
        {viewMode === 'virtualized' && enableVirtualization ? (
          <VirtualizedActivityList
            activities={displayActivities}
            height={maxHeight}
            itemHeight={80}
            onActivityClick={handleActivityClick}
            compact={false}
          />
        ) : viewMode === 'infinite' && enableInfiniteScroll ? (
          <div className="space-y-2" style={{ maxHeight, overflowY: 'auto' }}>
            {displayActivities.map(activity => (
              <div key={activity.id} className="p-2">
                {/* ActivityItem seria importado aqui */}
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <div className="text-white">{activity.user.name}</div>
                  <div className="text-gray-400 text-sm">{activity.type}</div>
                </div>
              </div>
            ))}

            {/* Load more button */}
            {hasMore && (
              <div className="text-center py-4">
                <button
                  onClick={loadMore}
                  disabled={infiniteLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-white transition-colors"
                >
                  {infiniteLoading ? 'Carregando...' : 'Carregar mais'}
                </button>
              </div>
            )}
          </div>
        ) : (
          // Lista normal
          <div className="space-y-2" style={{ maxHeight, overflowY: 'auto' }}>
            {displayActivities.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-4">📝</div>
                <p>Nenhuma atividade encontrada</p>
                {searchTerm && (
                  <p className="text-sm mt-2">
                    Tente ajustar sua busca ou filtros
                  </p>
                )}
              </div>
            ) : (
              displayActivities.map(activity => (
                <div key={activity.id} className="p-2">
                  {/* ActivityItem seria importado aqui */}
                  <div
                    className="bg-gray-900/50 rounded-lg p-3 cursor-pointer hover:bg-gray-800/50 transition-colors"
                    onClick={() => handleActivityClick(activity)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span>{activity.user.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{activity.user.name}</div>
                        <div className="text-gray-400 text-sm">{activity.type}</div>
                        {'taskTitle' in activity && activity.taskTitle && (
                          <div className="text-gray-300 text-sm">"{activity.taskTitle}"</div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.timestamp.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizedActivityFeed;