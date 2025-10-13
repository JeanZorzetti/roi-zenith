// ============= BATTLE LOG =============
// Log de eventos da batalha

import React, { useEffect, useRef } from 'react';
import { BattleEvent } from '../../types/battle.types';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText } from 'lucide-react';
import clsx from 'clsx';

interface BattleLogProps {
  events: BattleEvent[];
  maxEvents?: number;
}

export const BattleLog: React.FC<BattleLogProps> = ({ events, maxEvents = 10 }) => {
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para o final quando novos eventos são adicionados
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [events]);

  const recentEvents = events.slice(-maxEvents);

  const getEventColor = (event: BattleEvent): string => {
    switch (event.type) {
      case 'attack':
        return event.actor === 'player' ? 'text-blue-300' : 'text-red-300';
      case 'skill':
        return 'text-purple-300';
      case 'damage':
        return 'text-red-400';
      case 'heal':
        return 'text-green-400';
      case 'buff':
        return 'text-green-300';
      case 'debuff':
        return 'text-orange-300';
      case 'status_effect':
        return 'text-yellow-300';
      case 'turn_end':
        return 'text-gray-500';
      default:
        return 'text-gray-300';
    }
  };

  const getEventIcon = (event: BattleEvent): string => {
    if (event.isCritical) return '💥';
    switch (event.type) {
      case 'attack':
        return '⚔️';
      case 'skill':
        return '✨';
      case 'damage':
        return '💔';
      case 'heal':
        return '💚';
      case 'buff':
        return '↗️';
      case 'debuff':
        return '↘️';
      case 'status_effect':
        return '🔥';
      case 'turn_end':
        return '⏭️';
      default:
        return '•';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
        <ScrollText className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-bold text-gray-400 uppercase">Battle Log</h3>
      </div>

      {/* Log */}
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {recentEvents.length === 0 ? (
          <p className="text-sm text-gray-600 text-center py-4">
            Nenhum evento ainda...
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {recentEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  'text-xs py-1 px-2 rounded',
                  'bg-gray-800 bg-opacity-50',
                  getEventColor(event)
                )}
              >
                <span className="mr-1">{getEventIcon(event)}</span>
                <span>{event.message}</span>
                {event.value !== undefined && event.type !== 'turn_end' && (
                  <span className="font-bold ml-1">
                    {event.type === 'heal' ? '+' : ''}{event.value}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
