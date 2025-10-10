import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Deal } from '../../types/CRM';

interface PromoteToSalesButtonProps {
  deal: Deal;
  isLastStage: boolean;
  onClick: () => void;
  theme: any;
}

const PromoteToSalesButton: React.FC<PromoteToSalesButtonProps> = ({
  deal,
  isLastStage,
  onClick,
  theme
}) => {
  // Só exibe o botão se:
  // 1. Deal é do tipo MARKET_RESEARCH
  // 2. Deal está na última etapa do pipeline
  const shouldShow = deal.researchType === 'MARKET_RESEARCH' && isLastStage;

  if (!shouldShow) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        color: '#ffffff',
        border: '2px solid #fbbf24'
      }}
      title="Promover para Vendas 🚀"
    >
      <TrendingUp className="h-4 w-4" />
      <span className="text-sm">Promover para Sales</span>
      <span className="text-xs">🚀</span>
    </button>
  );
};

export default PromoteToSalesButton;
