// ============= CRM STATS HUD =============
// Global HUD showing CRM stats that contribute to game rewards

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, CheckCircle, TrendingUp } from 'lucide-react';
import { crmService } from '../../../services/crmService';
import { usePlayerStore } from '../../store/playerStore';

interface CRMStats {
  totalDeals: number;
  wonDeals: number;
  totalRevenue: number;
  activitiesCompleted: number;
  contacts: number;
}

export const CRMStatsHUD: React.FC = () => {
  const [stats, setStats] = useState<CRMStats>({
    totalDeals: 0,
    wonDeals: 0,
    totalRevenue: 0,
    activitiesCompleted: 0,
    contacts: 0,
  });

  const level = usePlayerStore(state => state.level);

  useEffect(() => {
    // Load CRM stats
    const loadStats = async () => {
      try {
        const [deals, activities, contacts] = await Promise.all([
          crmService.getDeals(),
          crmService.getActivities(),
          crmService.getContacts(),
        ]);

        const wonDeals = deals.filter(d => d.status === 'won');
        const totalRevenue = wonDeals.reduce((sum, d) => sum + (d.value || 0), 0);
        const completedActivities = activities.filter(a => a.status === 'completed');

        setStats({
          totalDeals: deals.length,
          wonDeals: wonDeals.length,
          totalRevenue,
          activitiesCompleted: completedActivities.length,
          contacts: contacts.length,
        });
      } catch (error) {
        console.error('Error loading CRM stats:', error);
      }
    };

    loadStats();

    // Refresh every 30 seconds
    const interval = setInterval(loadStats, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-40 bg-gray-900/90 backdrop-blur-sm border-2 border-blue-500/50 rounded-xl p-4 shadow-2xl"
      style={{ minWidth: '280px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-400" />
          CRM Stats → Game
        </h3>
        <span className="text-blue-400 text-xs font-semibold bg-blue-500/20 px-2 py-1 rounded">
          Lv {level}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Total Deals */}
        <div className="bg-gray-800/50 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-3 w-3 text-green-400" />
            <span className="text-gray-400 text-xs">Deals</span>
          </div>
          <p className="text-white font-bold text-lg">{stats.totalDeals}</p>
        </div>

        {/* Won Deals */}
        <div className="bg-gray-800/50 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-3 w-3 text-blue-400" />
            <span className="text-gray-400 text-xs">Fechados</span>
          </div>
          <p className="text-white font-bold text-lg">{stats.wonDeals}</p>
        </div>

        {/* Revenue */}
        <div className="bg-gray-800/50 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-3 w-3 text-yellow-400" />
            <span className="text-gray-400 text-xs">Revenue</span>
          </div>
          <p className="text-white font-bold text-sm">
            ${(stats.totalRevenue / 1000).toFixed(1)}k
          </p>
        </div>

        {/* Contacts */}
        <div className="bg-gray-800/50 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-3 w-3 text-purple-400" />
            <span className="text-gray-400 text-xs">Contatos</span>
          </div>
          <p className="text-white font-bold text-lg">{stats.contacts}</p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 text-center">
        <p className="text-gray-400 text-xs">
          Suas ações no CRM geram recompensas! 🎮
        </p>
      </div>
    </motion.div>
  );
};
