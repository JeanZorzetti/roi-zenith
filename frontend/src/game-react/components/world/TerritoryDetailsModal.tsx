// ============= TERRITORY DETAILS MODAL =============
// Modal com detalhes do território e lista de quests

import React from 'react';
import { Territory, Quest } from '../../store/worldMapStore';
import { useWorldMapStore } from '../../store/worldMapStore';
import { useGameStore } from '../../store/gameStore';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import {
  Play,
  CheckCircle,
  Clock,
  Lock,
  TrendingUp,
  Coins,
  Zap,
  Star
} from 'lucide-react';
import clsx from 'clsx';

interface TerritoryDetailsModalProps {
  territory: Territory;
  isOpen: boolean;
  onClose: () => void;
}

export const TerritoryDetailsModal: React.FC<TerritoryDetailsModalProps> = ({
  territory,
  isOpen,
  onClose,
}) => {
  const setCurrentTerritory = useWorldMapStore((state) => state.setCurrentTerritory);
  const updateQuestStatus = useWorldMapStore((state) => state.updateQuestStatus);
  const setScreen = useGameStore((state) => state.setScreen);

  const handleStartQuest = (quest: Quest) => {
    if (quest.status === 'available') {
      updateQuestStatus(territory.id, quest.id, 'in_progress');
      setCurrentTerritory(territory.id);
      setScreen('battle'); // Vai para a batalha
      onClose();
    }
  };

  const difficultyColors: Record<Quest['difficulty'], string> = {
    easy: 'text-green-400 bg-green-900 border-green-500',
    medium: 'text-yellow-400 bg-yellow-900 border-yellow-500',
    hard: 'text-red-400 bg-red-900 border-red-500',
  };

  const statusIcons: Record<Quest['status'], React.ReactNode> = {
    available: <Play className="w-4 h-4" />,
    in_progress: <Clock className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />,
  };

  const statusColors: Record<Quest['status'], string> = {
    available: 'text-blue-400 bg-blue-900 border-blue-500',
    in_progress: 'text-yellow-400 bg-yellow-900 border-yellow-500',
    completed: 'text-green-400 bg-green-900 border-green-500',
  };

  const statusLabels: Record<Quest['status'], string> = {
    available: 'Disponível',
    in_progress: 'Em Progresso',
    completed: 'Concluída',
  };

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
    <Dialog isOpen={isOpen} onClose={onClose} size="xl">
      <Dialog.Header>
        <Dialog.Title>{territory.name}</Dialog.Title>
        <Dialog.Description>{territory.description}</Dialog.Description>
      </Dialog.Header>

      <Dialog.Body>
        {/* Progresso geral */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-300">Progresso do Território</span>
            <span className="text-2xl font-bold text-white">{territory.progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${territory.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {territory.completedQuests} de {territory.totalQuests} quests concluídas
          </p>
        </div>

        {/* Lista de quests */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Missões (Quests)
          </h3>

          {territory.quests.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Nenhuma quest disponível neste território ainda.</p>
              <p className="text-sm mt-2">Volte mais tarde!</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3 max-h-96 overflow-auto pr-2"
            >
              {territory.quests.map((quest) => (
                <motion.div
                  key={quest.id}
                  variants={itemVariants}
                  className={clsx(
                    'p-4 rounded-lg border-2 transition-all',
                    'bg-gray-800 border-gray-700',
                    quest.status === 'available' && 'hover:border-blue-500 hover:bg-gray-750'
                  )}
                >
                  {/* Header da quest */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">{quest.title}</h4>
                      <p className="text-sm text-gray-400">{quest.description}</p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-col gap-2 ml-4">
                      <span
                        className={clsx(
                          'px-2 py-1 text-xs font-bold rounded border flex items-center gap-1 whitespace-nowrap',
                          statusColors[quest.status]
                        )}
                      >
                        {statusIcons[quest.status]}
                        {statusLabels[quest.status]}
                      </span>
                      <span
                        className={clsx(
                          'px-2 py-1 text-xs font-bold rounded border uppercase',
                          difficultyColors[quest.difficulty]
                        )}
                      >
                        {quest.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Recompensas */}
                  <div className="flex items-center gap-4 mt-3 mb-3 text-sm">
                    <div className="flex items-center gap-1 text-blue-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold">{quest.rewards.exp} XP</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Coins className="w-4 h-4" />
                      <span className="font-semibold">{quest.rewards.coins}</span>
                    </div>
                    {quest.rewards.items && quest.rewards.items.length > 0 && (
                      <div className="flex items-center gap-1 text-purple-400">
                        <Zap className="w-4 h-4" />
                        <span className="font-semibold">{quest.rewards.items.length} item(s)</span>
                      </div>
                    )}
                  </div>

                  {/* Requisitos */}
                  {quest.requirements && (
                    <div className="mb-3 p-2 bg-gray-900 bg-opacity-50 rounded text-xs text-gray-400">
                      <span className="font-semibold text-gray-300">Requisitos: </span>
                      {quest.requirements.level && `Nível ${quest.requirements.level}`}
                    </div>
                  )}

                  {/* Botão de ação */}
                  {quest.status === 'available' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartQuest(quest)}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Iniciar Quest
                    </Button>
                  )}

                  {quest.status === 'in_progress' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStartQuest(quest)}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      Continuar
                    </Button>
                  )}

                  {quest.status === 'completed' && (
                    <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Concluída
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Dialog.Body>

      <Dialog.Footer>
        <Button variant="ghost" onClick={onClose}>
          Fechar
        </Button>
        {!territory.isCurrent && territory.isUnlocked && (
          <Button
            variant="primary"
            onClick={() => {
              setCurrentTerritory(territory.id);
              onClose();
            }}
          >
            Definir como Atual
          </Button>
        )}
      </Dialog.Footer>
    </Dialog>
  );
};
