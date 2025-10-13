// ============= INVENTORY GRID =============
// Grid display for inventory items with lazy loading

import React, { useMemo } from 'react';
import { useInventory } from '../../hooks/useInventory';
import { ItemCard } from './ItemCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Package } from 'lucide-react';

export const InventoryGrid: React.FC = () => {
  const { filteredItems } = useInventory();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Empty state
  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <Package className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg font-semibold">No items found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-2 overflow-auto h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            layout
            layoutId={item.id}
          >
            <ItemCard item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
