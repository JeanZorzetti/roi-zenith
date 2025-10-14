// ============= INVENTORY SCREEN =============
// Main inventory screen with 3-column layout (Equipment | Items | Stats)

import React, { useState } from 'react';
import { GameLayout } from '../layout/GameLayout';
import { Panel } from '../layout/Panel';
import { Tabs } from '../ui/Tabs';
import { ResourceDisplay } from '../shared/ResourceDisplay';
import { EquipmentPanel } from './EquipmentPanel';
import { InventoryGrid } from './InventoryGrid';
import { StatsPanel } from './StatsPanel';
import { InventoryFilters } from './InventoryFilters';
import { useInventory } from '../../hooks/useInventory';
import { ArrowLeft } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const InventoryScreen: React.FC = () => {
  const setScreen = useGameStore((state) => state.setScreen);
  const { occupancy } = useInventory();
  const [activeTab, setActiveTab] = useState<'all' | 'equipment' | 'stats'>('all');

  // Header with back button and resources
  const header = (
    <div className="flex items-center justify-between p-4">
      <button
        onClick={() => setScreen('worldmap')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="text-2xl font-bold text-white">Inventory</h1>

      <ResourceDisplay compact />
    </div>
  );

  // Desktop layout (3 columns)
  const desktopLayout = (
    <div className="hidden lg:grid lg:grid-cols-[300px_1fr_300px] gap-4 p-4 h-full">
      {/* Left: Equipment Panel */}
      <div className="flex flex-col gap-4">
        <EquipmentPanel />
      </div>

      {/* Center: Items Grid */}
      <div className="flex flex-col gap-4">
        <Panel
          title={`Items (${occupancy.current}/${occupancy.max})`}
          className="flex-1 flex flex-col"
        >
          <InventoryFilters />
          <div className="flex-1 overflow-hidden mt-4">
            <InventoryGrid />
          </div>
        </Panel>
      </div>

      {/* Right: Stats Panel */}
      <div className="flex flex-col gap-4">
        <StatsPanel />
      </div>
    </div>
  );

  // Mobile layout (tabs)
  const mobileLayout = (
    <div className="lg:hidden flex flex-col h-full">
      <Tabs
        tabs={[
          { id: 'all', label: 'Items', icon: 'Package' },
          { id: 'equipment', label: 'Equipment', icon: 'ShieldCheck' },
          { id: 'stats', label: 'Stats', icon: 'BarChart3' },
        ]}
        activeTab={activeTab}
        onChange={(tabId) => setActiveTab(tabId as 'all' | 'equipment' | 'stats')}
      />

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'all' && (
          <Panel
            title={`Items (${occupancy.current}/${occupancy.max})`}
            className="flex flex-col h-full"
          >
            <InventoryFilters />
            <div className="flex-1 overflow-hidden mt-4">
              <InventoryGrid />
            </div>
          </Panel>
        )}

        {activeTab === 'equipment' && <EquipmentPanel />}

        {activeTab === 'stats' && <StatsPanel />}
      </div>
    </div>
  );

  return (
    <GameLayout header={header}>
      {desktopLayout}
      {mobileLayout}
    </GameLayout>
  );
};
