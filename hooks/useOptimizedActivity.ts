import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { debounce } from 'lodash-es';
import { Activity, ActivityFilter } from '../types/Activity';
import { useActivity } from './useActivity';

interface UseOptimizedActivityOptions {
  boardId?: string;
  debounceMs?: number;
  batchSize?: number;
  enableVirtualization?: boolean;
}

export const useOptimizedActivity = (options: UseOptimizedActivityOptions = {}) => {
  const {
    boardId,
    debounceMs = 300,
    batchSize = 50,
    enableVirtualization = true
  } = options;

  const {
    activities: rawActivities,
    loading,
    error,
    filter,
    setFilter: setRawFilter,
    ...rest
  } = useActivity({ boardId, autoLoad: true, realtimeUpdates: true });

  // Estados para otimização
  const [debouncedFilter, setDebouncedFilter] = useState(filter);
  const [displayedActivities, setDisplayedActivities] = useState<Activity[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced filter function
  const debouncedSetFilter = useCallback(
    debounce((newFilter: Partial<ActivityFilter>) => {
      setDebouncedFilter(prev => ({ ...prev, ...newFilter }));
      setRawFilter(newFilter);
      setIsFiltering(false);
    }, debounceMs),
    [setRawFilter, debounceMs]
  );

  // Optimized filter setter
  const setOptimizedFilter = useCallback((newFilter: Partial<ActivityFilter>) => {
    setIsFiltering(true);

    // Cancelar timeout anterior
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }

    // Aplicar filtro imediatamente na UI (otimista)
    setDebouncedFilter(prev => ({ ...prev, ...newFilter }));

    // Aplicar filtro real após debounce
    debouncedSetFilter(newFilter);
  }, [debouncedSetFilter]);

  // Memoized filtered activities
  const filteredActivities = useMemo(() => {
    let filtered = [...rawActivities];

    // Aplicar filtros
    if (debouncedFilter.types && debouncedFilter.types.length > 0) {
      filtered = filtered.filter(activity =>
        debouncedFilter.types!.includes(activity.type)
      );
    }

    if (debouncedFilter.users && debouncedFilter.users.length > 0) {
      filtered = filtered.filter(activity =>
        debouncedFilter.users!.includes(activity.user.id)
      );
    }

    if (debouncedFilter.dateRange) {
      filtered = filtered.filter(activity =>
        activity.timestamp >= debouncedFilter.dateRange!.start &&
        activity.timestamp <= debouncedFilter.dateRange!.end
      );
    }

    if (debouncedFilter.search && debouncedFilter.search.trim()) {
      const searchLower = debouncedFilter.search.toLowerCase();
      filtered = filtered.filter(activity => {
        const searchableText = [
          activity.user.name,
          activity.type,
          'taskTitle' in activity ? activity.taskTitle : '',
          'comment' in activity ? activity.comment : ''
        ].join(' ').toLowerCase();

        return searchableText.includes(searchLower);
      });
    }

    return filtered;
  }, [rawActivities, debouncedFilter]);

  // Batched loading for large datasets
  useEffect(() => {
    if (!enableVirtualization) {
      setDisplayedActivities(filteredActivities);
      return;
    }

    // Carregar atividades em lotes para melhor performance
    const loadBatch = (startIndex: number) => {
      const endIndex = Math.min(startIndex + batchSize, filteredActivities.length);
      const batch = filteredActivities.slice(0, endIndex);

      setDisplayedActivities(batch);

      // Carregar próximo lote se necessário
      if (endIndex < filteredActivities.length) {
        setTimeout(() => loadBatch(endIndex), 10);
      }
    };

    loadBatch(0);
  }, [filteredActivities, batchSize, enableVirtualization]);

  // Memoized grouping by date
  const groupedActivities = useMemo(() => {
    const groups: Record<string, Activity[]> = {};

    displayedActivities.forEach(activity => {
      const dateKey = activity.timestamp.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
    });

    return groups;
  }, [displayedActivities]);

  // Performance metrics
  const performanceMetrics = useMemo(() => {
    return {
      totalActivities: rawActivities.length,
      filteredActivities: filteredActivities.length,
      displayedActivities: displayedActivities.length,
      filterReduction: rawActivities.length > 0
        ? Math.round((1 - filteredActivities.length / rawActivities.length) * 100)
        : 0,
      isVirtualized: enableVirtualization,
      batchSize
    };
  }, [rawActivities, filteredActivities, displayedActivities, enableVirtualization, batchSize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
      debouncedSetFilter.cancel();
    };
  }, [debouncedSetFilter]);

  return {
    // Dados
    activities: displayedActivities,
    allActivities: rawActivities,
    filteredActivities,
    groupedActivities,

    // Estados
    loading: loading || isFiltering,
    error,
    isFiltering,

    // Filtros
    filter: debouncedFilter,
    setFilter: setOptimizedFilter,

    // Métricas
    performanceMetrics,

    // Resto dos métodos do hook original
    ...rest
  };
};

// Hook para pesquisa otimizada
export const useOptimizedSearch = (
  activities: Activity[],
  debounceMs: number = 500
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Activity[]>(activities);
  const [isSearching, setIsSearching] = useState(false);

  // Função de busca otimizada
  const performSearch = useCallback((term: string) => {
    if (!term.trim()) {
      setSearchResults(activities);
      return;
    }

    const searchLower = term.toLowerCase();

    // Busca com scoring para relevância
    const scoredResults = activities
      .map(activity => {
        let score = 0;
        const searchableFields = [
          { text: activity.user.name, weight: 3 },
          { text: activity.type, weight: 2 },
          { text: 'taskTitle' in activity ? activity.taskTitle || '' : '', weight: 5 },
          { text: 'comment' in activity ? activity.comment || '' : '', weight: 4 }
        ];

        searchableFields.forEach(field => {
          const text = field.text.toLowerCase();
          if (text.includes(searchLower)) {
            // Bonus por match exato
            if (text === searchLower) {
              score += field.weight * 3;
            }
            // Bonus por início da palavra
            else if (text.startsWith(searchLower)) {
              score += field.weight * 2;
            }
            // Score normal por incluir termo
            else {
              score += field.weight;
            }
          }
        });

        return { activity, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.activity);

    setSearchResults(scoredResults);
  }, [activities]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      performSearch(term);
      setIsSearching(false);
    }, debounceMs),
    [performSearch, debounceMs]
  );

  // Search handler
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setIsSearching(true);

    if (!term.trim()) {
      setSearchResults(activities);
      setIsSearching(false);
      return;
    }

    debouncedSearch(term);
  }, [activities, debouncedSearch]);

  // Update results when activities change
  useEffect(() => {
    if (searchTerm.trim()) {
      performSearch(searchTerm);
    } else {
      setSearchResults(activities);
    }
  }, [activities, searchTerm, performSearch]);

  // Cleanup
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    searchTerm,
    searchResults,
    isSearching,
    handleSearch,
    resultCount: searchResults.length,
    hasResults: searchResults.length > 0
  };
};

// Hook para scroll infinito
export const useInfiniteScroll = (
  activities: Activity[],
  batchSize: number = 20
) => {
  const [displayedCount, setDisplayedCount] = useState(batchSize);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const displayedActivities = useMemo(() => {
    return activities.slice(0, displayedCount);
  }, [activities, displayedCount]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simular loading assíncrono
    setTimeout(() => {
      const newCount = displayedCount + batchSize;
      setDisplayedCount(newCount);
      setHasMore(newCount < activities.length);
      setIsLoading(false);
    }, 100);
  }, [displayedCount, batchSize, activities.length, isLoading, hasMore]);

  // Reset quando activities mudam
  useEffect(() => {
    setDisplayedCount(batchSize);
    setHasMore(activities.length > batchSize);
  }, [activities, batchSize]);

  return {
    displayedActivities,
    isLoading,
    hasMore,
    loadMore,
    displayedCount,
    totalCount: activities.length
  };
};