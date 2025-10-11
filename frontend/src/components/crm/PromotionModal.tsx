import React, { useState } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { Deal, Pipeline } from '../../types/CRM';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (targetPipelineId: string) => void;
  deal: Deal | null;
  eligibility: {
    eligible: boolean;
    criteria: {
      qualificationScore: boolean;
      painPoints: boolean;
      decisionMaker: boolean;
      budget: boolean;
    };
  } | null;
  theme: any;
  isLoading?: boolean;
  salesPipelines?: Pipeline[];
}

const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  deal,
  eligibility,
  theme,
  isLoading = false,
  salesPipelines = []
}) => {
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>(
    salesPipelines[0]?.id || ''
  );

  if (!isOpen || !deal || !eligibility) return null;

  const criteriaList = [
    {
      label: 'Qualification Score >= 70',
      met: eligibility.criteria.qualificationScore,
      value: `${deal.qualificationScore || 0}%`
    },
    {
      label: 'Pain Points Descobertos',
      met: eligibility.criteria.painPoints,
      value: `${deal.painPointsList?.length || 0} pain points`
    },
    {
      label: 'Decision Maker Identificado',
      met: eligibility.criteria.decisionMaker,
      value: deal.decisionMakerIdentified ? deal.decisionMakerName || 'Sim' : 'Não'
    },
    {
      label: 'Budget Range Definido',
      met: eligibility.criteria.budget,
      value: deal.budgetRangeMin && deal.budgetRangeMax
        ? `R$ ${deal.budgetRangeMin} - R$ ${deal.budgetRangeMax}`
        : 'Não definido'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className="w-full max-w-2xl rounded-lg shadow-2xl max-h-[90vh] flex flex-col"
        style={{ backgroundColor: theme.colors.cardBg }}
      >
        {/* Header */}
        <div className="p-6 border-b flex-shrink-0" style={{ borderColor: theme.colors.border }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: eligibility.eligible ? '#10b98120' : '#ef444420' }}
              >
                {eligibility.eligible ? (
                  <TrendingUp className="h-6 w-6" style={{ color: '#10b981' }} />
                ) : (
                  <AlertCircle className="h-6 w-6" style={{ color: '#ef4444' }} />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                  {eligibility.eligible ? 'Promover para Sales' : 'Critérios Não Atendidos'}
                </h2>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                  {deal.title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-opacity-20"
              style={{ color: theme.colors.textMuted }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Criteria Checklist */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text }}>
              Critérios de Promoção
            </h3>
            <div className="space-y-3">
              {criteriaList.map((criterion, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg"
                  style={{
                    backgroundColor: criterion.met
                      ? theme.colors.success + '10'
                      : theme.colors.error + '10',
                    borderLeft: `3px solid ${criterion.met ? theme.colors.success : theme.colors.error}`
                  }}
                >
                  <div className="mt-0.5">
                    {criterion.met ? (
                      <CheckCircle className="h-5 w-5" style={{ color: theme.colors.success }} />
                    ) : (
                      <XCircle className="h-5 w-5" style={{ color: theme.colors.error }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium" style={{ color: theme.colors.text }}>
                      {criterion.label}
                    </div>
                    <div className="text-sm" style={{ color: theme.colors.textMuted }}>
                      {criterion.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seleção de Pipeline de Destino */}
          {eligibility.eligible && salesPipelines.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Pipeline de Destino *
              </label>
              <select
                value={selectedPipelineId}
                onChange={(e) => setSelectedPipelineId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.colors.input,
                  borderColor: theme.colors.border,
                  color: theme.colors.text
                }}
              >
                {salesPipelines.map(pipeline => (
                  <option key={pipeline.id} value={pipeline.id}>
                    💰 {pipeline.title}
                  </option>
                ))}
              </select>
              <p className="text-xs mt-1" style={{ color: theme.colors.textMuted }}>
                O deal será MOVIDO (não copiado) para a primeira etapa desta pipeline
              </p>
            </div>
          )}

          {/* Preview do Deal no Sales Pipeline */}
          {eligibility.eligible && (
            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: theme.colors.backgroundSecondary,
                borderColor: theme.colors.border
              }}
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: theme.colors.text }}>
                Preview: Novo Deal em Sales
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: theme.colors.textMuted }}>Título:</span>
                  <span className="font-medium" style={{ color: theme.colors.text }}>{deal.title}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme.colors.textMuted }}>Empresa:</span>
                  <span className="font-medium" style={{ color: theme.colors.text }}>
                    {deal.company?.name || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme.colors.textMuted }}>Contato:</span>
                  <span className="font-medium" style={{ color: theme.colors.text }}>
                    {deal.contact ? `${deal.contact.firstName} ${deal.contact.lastName}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme.colors.textMuted }}>Pain Point Principal:</span>
                  <span className="font-medium" style={{ color: theme.colors.text }}>
                    {deal.painPointsList?.[0] || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme.colors.textMuted }}>Budget Estimado:</span>
                  <span className="font-medium" style={{ color: theme.colors.success }}>
                    R$ {deal.budgetRangeMin} - R$ {deal.budgetRangeMax}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Mensagem de Recompensa */}
          {eligibility.eligible && (
            <div
              className="p-4 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #f59e0b20 0%, #f9731620 100%)',
                border: '2px solid #fbbf24'
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎉</span>
                <div>
                  <div className="font-semibold" style={{ color: theme.colors.text }}>
                    Recompensas Épicas!
                  </div>
                  <div className="text-sm" style={{ color: theme.colors.textMuted }}>
                    +100 XP • +50 Coins • +10 Reputation • Item Drop Garantido
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end space-x-3 flex-shrink-0" style={{ borderColor: theme.colors.border }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            style={{
              borderColor: theme.colors.border,
              color: theme.colors.textMuted
            }}
            disabled={isLoading}
          >
            Cancelar
          </button>
          {eligibility.eligible && (
            <button
              onClick={() => onConfirm(selectedPipelineId)}
              disabled={isLoading || !selectedPipelineId}
              className="px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105"
              style={{
                background: isLoading || !selectedPipelineId
                  ? theme.colors.textMuted
                  : 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                color: '#ffffff',
                border: '2px solid #fbbf24',
                opacity: isLoading || !selectedPipelineId ? 0.6 : 1
              }}
            >
              {isLoading ? 'Promovendo...' : 'Mover para Sales 🚀'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
