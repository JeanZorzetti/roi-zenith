// ============= ACHIEVEMENTS SCREEN =============
// Main achievements screen with filtering and stats

import React from 'react';
import { motion } from 'framer-motion';
import { useAchievementsStore, AchievementCategory } from '../../store/achievementsStore';
import { AchievementCard } from './AchievementCard';
import { Button } from '../ui/Button';
import { Trophy, Lock, Unlock, Filter, TrendingUp } from 'lucide-react';
import { GameLayout } from '../layout/GameLayout';
import clsx from 'clsx';

export const AchievementsScreen: React.FC = () => {
  const {
    achievements,
    filter,
    categoryFilter,
    setFilter,
    setCategoryFilter,
    getStats,
  } = useAchievementsStore();

  const stats = getStats();

  // Filter achievements
  const filteredAchievements = achievements.filter((ach) => {
    // Filter by unlock status
    if (filter === 'unlocked' && !ach.unlocked) return false;
    if (filter === 'locked' && ach.unlocked) return false;

    // Filter by category
    if (categoryFilter !== 'all' && ach.category !== categoryFilter) return false;

    return true;
  });

  const categories: { value: AchievementCategory | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'Todas', icon: '🎯' },
    { value: 'combat', label: 'Combate', icon: '⚔️' },
    { value: 'exploration', label: 'Exploração', icon: '🗺️' },
    { value: 'collection', label: 'Coleção', icon: '📦' },
    { value: 'progression', label: 'Progresso', icon: '⭐' },
    { value: 'social', label: 'Social', icon: '🤝' },
    { value: 'mastery', label: 'Maestria', icon: '🏆' },
  ];

  return (
    <GameLayout title="Conquistas" backTo="menu">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-10 h-10" />
              <div>
                <h2 className="text-2xl font-bold">Conquistas</h2>
                <p className="text-yellow-100 text-sm">Mostre suas realizações!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{stats.completionPercentage}%</div>
              <div className="text-sm text-yellow-100">Completo</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black bg-opacity-20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{stats.unlockedAchievements}</div>
              <div className="text-xs text-yellow-100">Desbloqueadas</div>
            </div>
            <div className="bg-black bg-opacity-20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{stats.totalAchievements}</div>
              <div className="text-xs text-yellow-100">Total</div>
            </div>
            <div className="bg-black bg-opacity-20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{stats.achievementPoints}</div>
              <div className="text-xs text-yellow-100">Pontos</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400 font-semibold">Filtrar por status:</span>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Todas ({achievements.length})
              </Button>
              <Button
                variant={filter === 'unlocked' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('unlocked')}
              >
                <Unlock className="w-4 h-4 mr-1" />
                Desbloqueadas ({stats.unlockedAchievements})
              </Button>
              <Button
                variant={filter === 'locked' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('locked')}
              >
                <Lock className="w-4 h-4 mr-1" />
                Bloqueadas ({stats.totalAchievements - stats.unlockedAchievements})
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400 font-semibold">Categoria:</span>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => {
                const catStats = cat.value === 'all'
                  ? null
                  : stats.categoriesCompleted[cat.value as AchievementCategory];

                return (
                  <Button
                    key={cat.value}
                    variant={categoryFilter === cat.value ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setCategoryFilter(cat.value)}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.label}
                    {catStats && (
                      <span className="ml-1 text-xs opacity-75">
                        ({catStats.unlocked}/{catStats.total})
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Nenhuma conquista encontrada</p>
              <p className="text-gray-500 text-sm mt-2">Tente ajustar os filtros</p>
            </div>
          )}
        </motion.div>
      </div>
    </GameLayout>
  );
};
