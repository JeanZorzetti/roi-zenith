// ============= EQUIPMENT PANEL =============
// Panel showing all 5 equipment slots

import React from 'react';
import { Panel } from '../layout/Panel';
import { EquipmentSlot } from './EquipmentSlot';
import { useInventory } from '../../hooks/useInventory';
import { EquipmentManager } from '../../managers/EquipmentManager';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export const EquipmentPanel: React.FC = () => {
  const { equipmentSummary, equippedStats } = useInventory();

  const slots = EquipmentManager.getAvailableSlots();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const slotVariants = {
    hidden: { opacity: 0, x: -20 },
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
          <ShieldCheck className="w-5 h-5" />
          <span>Equipment ({equipmentSummary.fullSlots}/{slots.length})</span>
        </div>
      }
    >
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {slots.map((slot) => {
          const slotData = equipmentSummary.slots.find((s) => s.slot === slot);
          return (
            <motion.div key={slot} variants={slotVariants}>
              <EquipmentSlot
                slot={slot}
                item={slotData?.item}
                isEmpty={slotData?.isEmpty ?? true}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Set bonus indicator */}
      {equippedStats.setBonus.hasSetBonus && (
        <motion.div
          className="mt-4 p-3 bg-purple-900 bg-opacity-30 border border-purple-500 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <p className="text-sm font-bold text-purple-300">Set Bonus Active!</p>
          </div>
          <p className="text-xs text-purple-200">
            {equippedStats.setBonus.setName} Set ({equipmentSummary.fullSlots} pieces)
          </p>
          <p className="text-xs text-purple-300 font-semibold mt-1">
            +{((equippedStats.setBonus.bonusMultiplier - 1) * 100).toFixed(0)}% to all stats
          </p>
        </motion.div>
      )}

      {/* Total power level */}
      <div className="mt-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Total Power</span>
          <span className="text-lg font-bold text-yellow-400">
            {equippedStats.powerLevel}
          </span>
        </div>
      </div>
    </Panel>
  );
};
