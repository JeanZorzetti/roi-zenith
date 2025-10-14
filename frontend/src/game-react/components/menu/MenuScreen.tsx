// ============= MENU SCREEN =============
// Tela principal do menu do jogo

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';
import { SaveSlotsModal } from './SaveSlotsModal';
import { SettingsModal } from './SettingsModal';
import {
  Play,
  FolderOpen,
  Settings,
  Trophy,
  LogOut,
  Sparkles
} from 'lucide-react';

export const MenuScreen: React.FC = () => {
  const setScreen = useGameStore((state) => state.setScreen);
  const [showSaveSlots, setShowSaveSlots] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNewGame, setShowNewGame] = useState(false);

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const handleNewGame = () => {
    setShowNewGame(true);
    setShowSaveSlots(true);
  };

  const handleContinue = () => {
    setShowNewGame(false);
    setShowSaveSlots(true);
  };

  const handleStartGame = () => {
    // Ir para o World Map após começar o jogo
    setScreen('worldmap');
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas flutuantes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Gradiente radial */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Logo do jogo */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Market Quest
            </h1>
            <Sparkles className="w-12 h-12 text-yellow-400 ml-4" />
          </div>
          <p className="text-xl text-gray-400 font-semibold tracking-wide">
            Research Your Way to Success
          </p>
        </motion.div>

        {/* Menu de botões */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <motion.div variants={itemVariants}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleNewGame}
              className="w-full text-lg py-4 flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6" />
              Novo Jogo
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleContinue}
              className="w-full text-lg py-4 flex items-center justify-center gap-3"
            >
              <FolderOpen className="w-6 h-6" />
              Continuar
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              variant="default"
              size="lg"
              onClick={() => setShowSettings(true)}
              className="w-full text-lg py-4 flex items-center justify-center gap-3"
            >
              <Settings className="w-6 h-6" />
              Configurações
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              variant="default"
              size="lg"
              onClick={() => setScreen('achievements')}
              className="w-full text-lg py-4 flex items-center justify-center gap-3"
            >
              <Trophy className="w-6 h-6" />
              Conquistas
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.close()}
              className="w-full text-lg py-4 flex items-center justify-center gap-3 text-gray-500 hover:text-gray-300"
            >
              <LogOut className="w-6 h-6" />
              Sair
            </Button>
          </motion.div>
        </motion.div>

        {/* Versão do jogo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 right-4 text-sm text-gray-600"
        >
          v2.0.0-react
        </motion.div>

        {/* Créditos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-4 text-sm text-gray-600"
        >
          Desenvolvido com React + TypeScript
        </motion.div>
      </div>

      {/* Modals */}
      <SaveSlotsModal
        isOpen={showSaveSlots}
        onClose={() => setShowSaveSlots(false)}
        isNewGame={showNewGame}
        onStartGame={handleStartGame}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};
