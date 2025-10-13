// ============= STATS PANEL =============
// Panel displaying equipped stats and inventory statistics

import React from 'react';
import { Panel } from '../layout/Panel';
import { Section } from '../layout/Section';
import { AnimatedNumber } from '../shared/AnimatedNumber';
import { useInventory } from '../../hooks/useInventory';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageCircle,
  Eye,
  Shield,
  Sparkles,
  TrendingUp,
  Coins,
  Zap,
  BarChart3,
} from 'lucide-react';
import clsx from 'clsx';

export const StatsPanel: React.FC = () => {
  const { equippedStats, inventoryStats } = useInventory();

  const stats = equippedStats.stats;

  // Main stats configuration
  const mainStats = [
    { label: 'Intelligence', value: stats.intelligence, icon: Brain, color: 'text-blue-400' },
    { label: 'Charisma', value: stats.charisma, icon: MessageCircle, color: 'text-purple-400' },
    { label: 'Perception', value: stats.perception, icon: Eye, color: 'text-green-400' },
    { label: 'Resilience', value: stats.resilience, icon: Shield, color: 'text-orange-400' },
    { label: 'Luck', value: stats.luck, icon: Sparkles, color: 'text-yellow-400' },
  ];

  // Bonus stats configuration
  const bonusStats = [
    { label: 'XP Bonus', value: stats.xpBonus, icon: TrendingUp, color: 'text-cyan-400', suffix: '%' },
    { label: 'Coin Bonus', value: stats.coinBonus, icon: Coins, color: 'text-yellow-400', suffix: '%' },
    { label: 'Energy Regen', value: stats.energyRegen, icon: Zap, color: 'text-blue-400', suffix: '%' },
  ];

  // Rarity distribution
  const rarityColors: Record<string, string> = {
    common: 'bg-gray-500',
    uncommon: 'bg-green-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-orange-500',
    mythic: 'bg-yellow-500',
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <Panel
      title={
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          <span>Stats</span>
        </div>
      }
    >
      {/* Equipped Stats */}
      <Section title="Equipped Stats" />
      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mainStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="flex items-center justify-between p-2 bg-gray-800 bg-opacity-40 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <stat.icon className={clsx('w-4 h-4', stat.color)} />
              <span className="text-sm text-gray-300">{stat.label}</span>
            </div>
            <span className={clsx('text-lg font-bold', stat.color)}>
              <AnimatedNumber value={stat.value} />
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Bonus Stats */}
      {bonusStats.some((stat) => stat.value > 0) && (
        <>
          <Section title="Bonus Stats" className="mt-6" />
          <motion.div
            className="space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {bonusStats
              .filter((stat) => stat.value > 0)
              .map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="flex items-center justify-between p-2 bg-gray-800 bg-opacity-40 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className={clsx('w-4 h-4', stat.color)} />
                    <span className="text-sm text-gray-300">{stat.label}</span>
                  </div>
                  <span className={clsx('text-lg font-bold', stat.color)}>
                    +<AnimatedNumber value={stat.value} />
                    {stat.suffix}
                  </span>
                </motion.div>
              ))}
          </motion.div>
        </>
      )}

      {/* Inventory Statistics */}
      <Section title="Inventory Stats" className="mt-6" />
      <div className="space-y-3">
        {/* Total items */}
        <div className="flex items-center justify-between p-2 bg-gray-800 bg-opacity-40 rounded-lg">
          <span className="text-sm text-gray-300">Total Items</span>
          <span className="text-lg font-bold text-white">{inventoryStats.totalItems}</span>
        </div>

        {/* Average power */}
        <div className="flex items-center justify-between p-2 bg-gray-800 bg-opacity-40 rounded-lg">
          <span className="text-sm text-gray-300">Avg Power</span>
          <span className="text-lg font-bold text-yellow-400">
            {inventoryStats.averagePowerLevel}
          </span>
        </div>

        {/* Rarity distribution */}
        <div className="p-3 bg-gray-800 bg-opacity-40 rounded-lg">
          <p className="text-xs font-semibold text-gray-400 mb-2">Rarity Distribution</p>
          <div className="space-y-1.5">
            {Object.entries(inventoryStats.rarityCount)
              .filter(([_, count]) => count > 0)
              .map(([rarity, count]) => (
                <div key={rarity} className="flex items-center gap-2">
                  <div className={clsx('w-3 h-3 rounded-full', rarityColors[rarity])} />
                  <span className="text-xs text-gray-400 capitalize flex-1">{rarity}</span>
                  <span className="text-xs font-bold text-white">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Item types */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-gray-800 bg-opacity-40 rounded-lg text-center">
            <p className="text-xs text-gray-400">Equippable</p>
            <p className="text-lg font-bold text-green-400">{inventoryStats.equippableCount}</p>
          </div>
          <div className="p-2 bg-gray-800 bg-opacity-40 rounded-lg text-center">
            <p className="text-xs text-gray-400">Consumable</p>
            <p className="text-lg font-bold text-blue-400">{inventoryStats.consumableCount}</p>
          </div>
        </div>
      </div>
    </Panel>
  );
};
