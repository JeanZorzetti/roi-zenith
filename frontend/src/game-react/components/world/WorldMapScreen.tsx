// ============= WORLD MAP SCREEN =============
// Tela do mapa mundial com territórios

import React, { useState } from 'react';
import { GameLayout } from '../layout/GameLayout';
import { ResourceDisplay } from '../shared/ResourceDisplay';
import { TerritoryCard } from './TerritoryCard';
import { TerritoryDetailsModal } from './TerritoryDetailsModal';
import { useWorldMapStore } from '../../store/worldMapStore';
import { useGameStore } from '../../store/gameStore';
import { motion } from 'framer-motion';
import { ArrowLeft, Map } from 'lucide-react';

export const WorldMapScreen: React.FC = () => {
  const setScreen = useGameStore((state) => state.setScreen);
  const territories = useWorldMapStore((state) => state.territories);
  const selectedTerritoryId = useWorldMapStore((state) => state.selectedTerritoryId);
  const selectTerritory = useWorldMapStore((state) => state.selectTerritory);
  const getTerritoryById = useWorldMapStore((state) => state.getTerritoryById);

  const [showDetails, setShowDetails] = useState(false);

  const handleTerritoryClick = (territoryId: string) => {
    selectTerritory(territoryId);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    selectTerritory('');
  };

  const selectedTerritory = selectedTerritoryId ? getTerritoryById(selectedTerritoryId) : null;

  // Header com botão voltar
  const header = (
    <div className="flex items-center justify-between p-4">
      <button
        onClick={() => setScreen('menu')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Menu</span>
      </button>

      <div className="flex items-center gap-3">
        <Map className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Mapa Mundial</h1>
      </div>

      <ResourceDisplay compact />
    </div>
  );

  // Animação container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <GameLayout header={header}>
        <div className="p-6 h-full overflow-auto">
          {/* Título e descrição */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Escolha seu Território
            </h2>
            <p className="text-gray-400">
              Complete quests para desbloquear novos territórios e progredir no jogo
            </p>
          </motion.div>

          {/* Grid de territórios */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {territories.map((territory) => (
              <TerritoryCard
                key={territory.id}
                territory={territory}
                onClick={() => handleTerritoryClick(territory.id)}
              />
            ))}
          </motion.div>

          {/* Legenda */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Atual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Desbloqueado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <span>Bloqueado</span>
            </div>
          </motion.div>
        </div>
      </GameLayout>

      {/* Modal de detalhes do território */}
      {selectedTerritory && (
        <TerritoryDetailsModal
          territory={selectedTerritory}
          isOpen={showDetails}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
};
