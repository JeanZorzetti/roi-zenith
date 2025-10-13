// ============= DEFEAT MODAL =============
// Modal de derrota na batalha

import React from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Skull, RotateCcw, Home } from 'lucide-react';

interface DefeatModalProps {
  isOpen: boolean;
  onRetry: () => void;
  onReturn: () => void;
}

export const DefeatModal: React.FC<DefeatModalProps> = ({
  isOpen,
  onRetry,
  onReturn,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onReturn} size="md">
      <Dialog.Body>
        <div className="text-center space-y-6 py-6">
          {/* Ícone de derrota */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center">
              <Skull className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
              DERROTA
            </h2>
            <p className="text-gray-400">Você foi derrotado na batalha...</p>
          </motion.div>

          {/* Mensagem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <p className="text-sm text-gray-300">
              Não desista! Melhore seu equipamento, aumente seu nível e tente novamente.
            </p>
          </motion.div>

          {/* Botões */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3"
          >
            <Button
              variant="danger"
              size="lg"
              onClick={onRetry}
              className="w-full flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Tentar Novamente
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={onReturn}
              className="w-full flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Voltar ao Mapa
            </Button>
          </motion.div>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};
