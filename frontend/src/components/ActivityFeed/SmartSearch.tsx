import React, { useState, useEffect, useRef } from 'react';
import { Activity, ActivityType, ActivityTexts } from '../../types/Activity';
import { Search, Clock, User, Tag, Hash, Calendar } from 'lucide-react';

interface SmartSearchProps {
  activities: Activity[];
  onResults: (results: Activity[]) => void;
  placeholder?: string;
}

interface SearchSuggestion {
  type: 'user' | 'activity-type' | 'task' | 'date' | 'keyword';
  value: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  activities,
  onResults,
  placeholder = "Buscar atividades..."
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Gerar sugestões baseadas na query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const queryLower = query.toLowerCase();
    const newSuggestions: SearchSuggestion[] = [];

    // Sugestões de usuários
    const users = new Map();
    activities.forEach(activity => {
      if (!users.has(activity.user.id)) {
        users.set(activity.user.id, activity.user);
      }
    });

    users.forEach(user => {
      if (user.name.toLowerCase().includes(queryLower)) {
        const count = activities.filter(a => a.user.id === user.id).length;
        newSuggestions.push({
          type: 'user',
          value: user.id,
          label: user.name,
          icon: <User className="w-4 h-4" />,
          count
        });
      }
    });

    // Sugestões de tipos de atividade
    Object.entries(ActivityTexts).forEach(([type, text]) => {
      if (text.toLowerCase().includes(queryLower) || type.toLowerCase().includes(queryLower)) {
        const count = activities.filter(a => a.type === type).length;
        if (count > 0) {
          newSuggestions.push({
            type: 'activity-type',
            value: type,
            label: text,
            icon: <Tag className="w-4 h-4" />,
            count
          });
        }
      }
    });

    // Sugestões de tasks
    const tasks = new Map();
    activities.forEach(activity => {
      if ('taskTitle' in activity && activity.taskTitle) {
        if (!tasks.has(activity.taskId)) {
          tasks.set(activity.taskId, activity.taskTitle);
        }
      }
    });

    tasks.forEach((title, id) => {
      if (title.toLowerCase().includes(queryLower)) {
        const count = activities.filter(a => 'taskId' in a && a.taskId === id).length;
        newSuggestions.push({
          type: 'task',
          value: id,
          label: title,
          icon: <Hash className="w-4 h-4" />,
          count
        });
      }
    });

    // Sugestões de datas
    if (queryLower.includes('hoje') || queryLower.includes('today')) {
      const today = new Date().toDateString();
      const count = activities.filter(a => a.timestamp.toDateString() === today).length;
      if (count > 0) {
        newSuggestions.push({
          type: 'date',
          value: 'today',
          label: 'Hoje',
          icon: <Calendar className="w-4 h-4" />,
          count
        });
      }
    }

    if (queryLower.includes('ontem') || queryLower.includes('yesterday')) {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      const count = activities.filter(a => a.timestamp.toDateString() === yesterday).length;
      if (count > 0) {
        newSuggestions.push({
          type: 'date',
          value: 'yesterday',
          label: 'Ontem',
          icon: <Calendar className="w-4 h-4" />,
          count
        });
      }
    }

    // Limitar sugestões
    setSuggestions(newSuggestions.slice(0, 8));
  }, [query, activities]);

  // Busca inteligente
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onResults(activities);
      return;
    }

    const queryLower = searchQuery.toLowerCase();
    const results = activities.filter(activity => {
      // Busca por nome do usuário
      if (activity.user.name.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Busca por tipo de atividade
      if (activity.type.toLowerCase().includes(queryLower)) {
        return true;
      }

      if (ActivityTexts[activity.type]?.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Busca por título da task
      if ('taskTitle' in activity && activity.taskTitle?.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Busca por comentário
      if ('comment' in activity && activity.comment?.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Busca por nome do board
      if ('boardName' in activity && activity.boardName?.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Busca por nome da coluna
      if ('columnName' in activity && activity.columnName?.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Busca por mudanças (em task-updated)
      if (activity.type === 'task-updated' && 'changes' in activity && activity.changes) {
        const changesText = Object.values(activity.changes)
          .map(change => `${change.from} ${change.to}`)
          .join(' ')
          .toLowerCase();

        if (changesText.includes(queryLower)) {
          return true;
        }
      }

      // Busca por data relativa
      if (queryLower.includes('hoje') || queryLower.includes('today')) {
        return activity.timestamp.toDateString() === new Date().toDateString();
      }

      if (queryLower.includes('ontem') || queryLower.includes('yesterday')) {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return activity.timestamp.toDateString() === yesterday.toDateString();
      }

      return false;
    });

    onResults(results);
  };

  // Aplicar sugestão
  const applySuggestion = (suggestion: SearchSuggestion) => {
    let searchQuery = '';

    switch (suggestion.type) {
      case 'user':
        searchQuery = suggestion.label;
        break;
      case 'activity-type':
        searchQuery = suggestion.value;
        break;
      case 'task':
        searchQuery = suggestion.label;
        break;
      case 'date':
        searchQuery = suggestion.label;
        break;
      default:
        searchQuery = suggestion.value;
    }

    setQuery(searchQuery);
    setShowSuggestions(false);
    performSearch(searchQuery);
  };

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          applySuggestion(suggestions[selectedIndex]);
        } else {
          performSearch(query);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Scroll da sugestão selecionada
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="relative">
      {/* Input de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            performSearch(e.target.value);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
        />

        {/* Indicador de busca ativa */}
        {query && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700/50 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto custom-scrollbar"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.value}`}
              onClick={() => applySuggestion(suggestion)}
              className={`
                w-full flex items-center justify-between px-4 py-3 text-left transition-colors
                ${index === selectedIndex
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-800/50'
                }
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === suggestions.length - 1 ? 'rounded-b-lg' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="text-gray-400">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{suggestion.label}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {suggestion.type.replace('-', ' ')}
                  </div>
                </div>
              </div>
              {suggestion.count && (
                <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                  {suggestion.count}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Atalhos de busca rápida */}
      {!query && (
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { label: 'Hoje', query: 'hoje', icon: <Calendar className="w-3 h-3" /> },
            { label: 'Tarefas criadas', query: 'task-created', icon: <Tag className="w-3 h-3" /> },
            { label: 'Tarefas movidas', query: 'task-moved', icon: <Tag className="w-3 h-3" /> },
            { label: 'Últimas 24h', query: 'ontem hoje', icon: <Clock className="w-3 h-3" /> }
          ].map(shortcut => (
            <button
              key={shortcut.query}
              onClick={() => {
                setQuery(shortcut.query);
                performSearch(shortcut.query);
              }}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-800/30 text-gray-400 text-xs rounded-lg hover:bg-gray-800/50 hover:text-white transition-colors"
            >
              {shortcut.icon}
              <span>{shortcut.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartSearch;