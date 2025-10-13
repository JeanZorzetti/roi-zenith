// ============= DAMAGE NUMBER =============
// Floating damage/heal numbers animation

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DamageNumberProps {
  value: number;
  type: 'damage' | 'heal' | 'critical';
  position?: { x: number; y: number };
  onComplete?: () => void;
}

export const DamageNumber: React.FC<DamageNumberProps> = ({
  value,
  type,
  position = { x: 0, y: 0 },
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const getColor = () => {
    switch (type) {
      case 'critical':
        return 'text-orange-400';
      case 'heal':
        return 'text-green-400';
      case 'damage':
      default:
        return 'text-red-400';
    }
  };

  const getText = () => {
    if (type === 'heal') {
      return `+${value}`;
    }
    if (type === 'critical') {
      return `${value}!`;
    }
    return `-${value}`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.8 }}
          animate={{ opacity: 1, y: -40, scale: type === 'critical' ? 1.5 : 1.2 }}
          exit={{ opacity: 0, y: -60, scale: 0.8 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className={`absolute pointer-events-none font-bold ${getColor()} ${
            type === 'critical' ? 'text-3xl' : 'text-2xl'
          }`}
          style={{
            left: position.x,
            top: position.y,
            textShadow:
              type === 'critical'
                ? '0 0 10px rgba(251, 146, 60, 0.8), 0 0 20px rgba(251, 146, 60, 0.5)'
                : '0 2px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          {getText()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
