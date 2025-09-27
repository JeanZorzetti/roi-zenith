import React, { useState } from 'react';
import { ActivityType, ActivityCategories, ActivityFilter } from '../../types/Activity';
import { Search, Filter, X, Calendar, User, Tag } from 'lucide-react';

interface ActivityFiltersProps {
  filter: ActivityFilter;
  onFilterChange: (filter: Partial<ActivityFilter>) => void;
  onClearFilter: () => void;
  users: Array<{ id: string; name: string; avatar: string; color: string }>;
}

export const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  filter,
  onFilterChange,
  onClearFilter,
  users
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localSearch, setLocalSearch] = useState(filter.search || '');

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    // Debounce search
    const timeoutId = setTimeout(() => {
      onFilterChange({ search: value || undefined });
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const toggleActivityType = (type: ActivityType) => {
    const currentTypes = filter.types || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];

    onFilterChange({
      types: newTypes.length > 0 ? newTypes : undefined
    });
  };

  const toggleUser = (userId: string) => {
    const currentUsers = filter.users || [];
    const newUsers = currentUsers.includes(userId)
      ? currentUsers.filter(u => u !== userId)
      : [...currentUsers, userId];

    onFilterChange({
      users: newUsers.length > 0 ? newUsers : undefined
    });
  };

  const setDateRange = (range: 'today' | 'week' | 'month' | 'all') => {
    const now = new Date();
    let start: Date | undefined;
    let end: Date = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Amanhã

    switch (range) {
      case 'today':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'all':
        start = undefined;
        end = new Date();
        break;
    }

    onFilterChange({
      dateRange: start ? { start, end } : undefined
    });
  };

  const hasActiveFilters = () => {
    return !!(
      filter.types?.length ||
      filter.users?.length ||
      filter.dateRange ||
      filter.search?.trim()
    );
  };

  return (
    <div className="space-y-4">
      {/* Barra de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar atividades..."
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
        />
        {localSearch && (
          <button
            onClick={() => {
              setLocalSearch('');
              onFilterChange({ search: undefined });
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Controles principais */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
            ${showAdvanced ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-800/50 text-gray-300 hover:text-white'}
          `}
        >
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
        </button>

        {hasActiveFilters() && (
          <button
            onClick={onClearFilter}
            className="flex items-center space-x-2 px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* Filtros avançados */}
      {showAdvanced && (
        <div className="space-y-4 p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg">
          {/* Filtro por período */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <h4 className="text-sm font-medium text-gray-300">Período</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'Todas' },
                { key: 'today', label: 'Hoje' },
                { key: 'week', label: '7 dias' },
                { key: 'month', label: '30 dias' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setDateRange(key as any)}
                  className={`
                    px-3 py-1 text-xs rounded-lg transition-colors
                    ${(!filter.dateRange && key === 'all') ||
                      (filter.dateRange && key !== 'all')
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por tipo de atividade */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Tag className="w-4 h-4 text-gray-400" />
              <h4 className="text-sm font-medium text-gray-300">Tipos de Atividade</h4>
            </div>
            <div className="space-y-3">
              {Object.entries(ActivityCategories).map(([category, types]) => (
                <div key={category}>
                  <h5 className="text-xs text-gray-400 mb-2 uppercase">{category}</h5>
                  <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                      <button
                        key={type}
                        onClick={() => toggleActivityType(type)}
                        className={`
                          px-2 py-1 text-xs rounded transition-colors
                          ${filter.types?.includes(type)
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'bg-gray-800/50 text-gray-400 hover:text-white'
                          }
                        `}
                      >
                        {type.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filtro por usuário */}
          {users.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <User className="w-4 h-4 text-gray-400" />
                <h4 className="text-sm font-medium text-gray-300">Usuários</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {users.map(user => (
                  <button
                    key={user.id}
                    onClick={() => toggleUser(user.id)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                      ${filter.users?.includes(user.id)
                        ? 'bg-blue-600/20 text-blue-400'
                        : 'bg-gray-800/50 text-gray-300 hover:text-white'
                      }
                    `}
                  >
                    <div className={`
                      w-4 h-4 rounded-full flex items-center justify-center text-xs
                      ${user.color} bg-opacity-20 border border-opacity-30 ${user.color?.replace('bg-', 'border-') || 'border-blue-500'}
                    `}>
                      <span>{user.avatar}</span>
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Indicador de filtros ativos */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {filter.types?.map(type => (
            <span
              key={type}
              className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded"
            >
              <span>{type}</span>
              <button
                onClick={() => toggleActivityType(type)}
                className="hover:text-blue-300"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filter.users?.map(userId => {
            const user = users.find(u => u.id === userId);
            return user ? (
              <span
                key={userId}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded"
              >
                <span>{user.name}</span>
                <button
                  onClick={() => toggleUser(userId)}
                  className="hover:text-green-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ) : null;
          })}
          {filter.dateRange && (
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded">
              <span>Período personalizado</span>
              <button
                onClick={() => onFilterChange({ dateRange: undefined })}
                className="hover:text-purple-300"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityFilters;