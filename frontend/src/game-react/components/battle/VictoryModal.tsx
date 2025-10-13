// ============= VICTORY MODAL =============
// Modal de vitória na batalha

import React from 'react';
import { BattleRewards } from '../../types/battle.types';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Coins, Package, Sparkles } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  rewards: BattleRewards;
  onContinue: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  rewards,
  onContinue,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onContinue} size="md">
      <Dialog.Body>
        <div className="text-center space-y-6 py-6">
          {/* Ícone de vitória */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
              VITÓRIA!
            </h2>
            <p className="text-gray-400">Você derrotou o inimigo!</p>
          </motion.div>

          {/* Recompensas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              RECOMPENSAS
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* XP */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4"
              >
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-400">{rewards.exp}</p>
                <p className="text-xs text-gray-400">Experiência</p>
              </motion.div>

              {/* Coins */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="bg-yellow-900 bg-opacity-30 border border-yellow-500 rounded-lg p-4"
              >
                <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-400">{rewards.coins}</p>
                <p className="text-xs text-gray-400">Moedas</p>
              </motion.div>
            </div>

            {/* Items */}
            {rewards.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-purple-900 bg-opacity-30 border border-purple-500 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 justify-center mb-2">
                  <Package className="w-5 h-5 text-purple-400" />
                  <p className="text-sm font-bold text-purple-400">
                    ITENS DROPADOS
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {rewards.items.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-800 text-purple-200 text-xs rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Botão continuar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onContinue}
              className="w-full"
            >
              Continuar
            </Button>
          </motion.div>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};
