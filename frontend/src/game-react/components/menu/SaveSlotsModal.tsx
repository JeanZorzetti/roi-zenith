// ============= SAVE SLOTS MODAL =============
// Modal para gerenciar slots de save

import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Plus, Trash2, Play, Clock, User } from 'lucide-react';
import clsx from 'clsx';

interface SaveSlot {
  id: number;
  playerName: string;
  level: number;
  playtime: number; // em minutos
  lastPlayed: Date;
  territory: string;
  isEmpty: boolean;
}

interface SaveSlotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isNewGame: boolean;
  onStartGame: () => void;
}

export const SaveSlotsModal: React.FC<SaveSlotsModalProps> = ({
  isOpen,
  onClose,
  isNewGame,
  onStartGame,
}) => {
  // Mock data - em produção, isso virá do localStorage ou backend
  const [saveSlots] = useState<SaveSlot[]>([
    {
      id: 1,
      playerName: 'Player 1',
      level: 15,
      playtime: 240, // 4 horas
      lastPlayed: new Date('2025-01-10'),
      territory: 'Varejo Avançado',
      isEmpty: false,
    },
    {
      id: 2,
      playerName: 'Aventureiro',
      level: 8,
      playtime: 120,
      lastPlayed: new Date('2025-01-08'),
      territory: 'B2B Iniciante',
      isEmpty: false,
    },
    {
      id: 3,
      playerName: '',
      level: 0,
      playtime: 0,
      lastPlayed: new Date(),
      territory: '',
      isEmpty: true,
    },
  ]);

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatPlaytime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatLastPlayed = (date: Date): string => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  const handleSlotClick = (slotId: number) => {
    setSelectedSlot(slotId);
  };

  const handleStartGame = () => {
    if (selectedSlot !== null) {
      onStartGame();
      onClose();
    }
  };

  const handleDeleteSlot = () => {
    // Implementar lógica de delete
    setShowDeleteConfirm(false);
    setSelectedSlot(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <>
      <Dialog isOpen={isOpen} onClose={onClose} size="lg">
        <Dialog.Header>
          <Dialog.Title>
            {isNewGame ? 'Novo Jogo - Selecione um Slot' : 'Carregar Jogo'}
          </Dialog.Title>
          <Dialog.Description>
            {isNewGame
              ? 'Escolha um slot vazio ou sobrescreva um existente'
              : 'Selecione um save para continuar'}
          </Dialog.Description>
        </Dialog.Header>

        <Dialog.Body>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {saveSlots.map((slot) => (
              <motion.div key={slot.id} variants={itemVariants}>
                <button
                  onClick={() => handleSlotClick(slot.id)}
                  className={clsx(
                    'w-full p-4 rounded-lg border-2 transition-all',
                    'hover:scale-[1.02] hover:shadow-xl',
                    selectedSlot === slot.id
                      ? 'border-blue-500 bg-blue-900 bg-opacity-30'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600',
                    slot.isEmpty && 'border-dashed'
                  )}
                >
                  {slot.isEmpty ? (
                    // Slot vazio
                    <div className="flex items-center justify-center gap-3 py-8">
                      <Plus className="w-8 h-8 text-gray-600" />
                      <span className="text-xl text-gray-500 font-semibold">
                        Slot Vazio
                      </span>
                    </div>
                  ) : (
                    // Slot com save
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white">
                            {slot.playerName}
                          </h3>
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-bold">
                            Nv. {slot.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">{slot.territory}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatPlaytime(slot.playtime)}
                          </span>
                          <span>•</span>
                          <span>{formatLastPlayed(slot.lastPlayed)}</span>
                        </div>
                      </div>

                      {/* Delete button */}
                      {!isNewGame && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSlot(slot.id);
                            setShowDeleteConfirm(true);
                          }}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900 hover:bg-opacity-30 rounded transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </Dialog.Body>

        <Dialog.Footer>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleStartGame}
            disabled={selectedSlot === null}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {isNewGame ? 'Começar' : 'Carregar'}
          </Button>
        </Dialog.Footer>
      </Dialog>

      {/* Confirmação de delete */}
      <Dialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        size="sm"
      >
        <Dialog.Header>
          <Dialog.Title>Confirmar Exclusão</Dialog.Title>
          <Dialog.Description>
            Tem certeza que deseja excluir este save? Esta ação não pode ser desfeita.
          </Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer>
          <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteSlot}>
            Excluir
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};
