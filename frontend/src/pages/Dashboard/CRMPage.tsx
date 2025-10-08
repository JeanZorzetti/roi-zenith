import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {
  Building2,
  User,
  DollarSign,
  Calendar,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  X,
  Edit2,
  Trash2
} from 'lucide-react';
import { crmService } from '../../services/crmService';
import { Deal, DealStage, STAGE_CONFIG, Company, Contact } from '../../types/CRM';
import { useTheme } from '../../contexts/ThemeContext';

const CRMPage = () => {
  const { currentTheme } = useTheme();

  // State
  const [deals, setDeals] = useState<Deal[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDealModal, setShowDealModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  // Deal form state
  const [dealForm, setDealForm] = useState({
    title: '',
    description: '',
    value: 0,
    currency: 'BRL',
    stage: 'NEW' as DealStage,
    probability: 0,
    expectedCloseDate: '',
    companyId: '',
    contactId: ''
  });

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [dealsData, companiesData, contactsData] = await Promise.all([
      crmService.getDeals(),
      crmService.getCompanies(),
      crmService.getContacts()
    ]);
    setDeals(dealsData);
    setCompanies(companiesData);
    setContacts(contactsData);
    setLoading(false);
  };

  // Organize deals by stage
  const pipeline = Object.keys(STAGE_CONFIG).map(stage => ({
    stage: stage as DealStage,
    ...STAGE_CONFIG[stage as DealStage],
    deals: deals.filter(d => d.stage === stage)
  }));

  // Handle drag and drop
  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const deal = deals.find(d => d.id === draggableId);
    if (!deal) return;

    // Update local state immediately
    const newStage = destination.droppableId as DealStage;
    const updatedDeals = deals.map(d =>
      d.id === draggableId ? { ...d, stage: newStage, position: destination.index } : d
    );
    setDeals(updatedDeals);

    // Update backend
    await crmService.moveDeal(draggableId, newStage, destination.index);
  };

  // Open modal to create deal
  const openCreateDealModal = (stage: DealStage) => {
    setEditingDeal(null);
    setDealForm({
      title: '',
      description: '',
      value: 0,
      currency: 'BRL',
      stage,
      probability: 0,
      expectedCloseDate: '',
      companyId: '',
      contactId: ''
    });
    setShowDealModal(true);
  };

  // Open modal to edit deal
  const openEditDealModal = (deal: Deal) => {
    setEditingDeal(deal);
    setDealForm({
      title: deal.title,
      description: deal.description || '',
      value: deal.value,
      currency: deal.currency,
      stage: deal.stage,
      probability: deal.probability,
      expectedCloseDate: deal.expectedCloseDate || '',
      companyId: deal.companyId || '',
      contactId: deal.contactId || ''
    });
    setShowDealModal(true);
  };

  // Save deal
  const saveDeal = async () => {
    if (!dealForm.title.trim()) {
      alert('O título é obrigatório!');
      return;
    }

    if (editingDeal) {
      // Update existing deal
      const success = await crmService.updateDeal(editingDeal.id, dealForm);
      if (success) {
        await loadData();
        setShowDealModal(false);
      }
    } else {
      // Create new deal
      const newDeal = await crmService.createDeal(dealForm as any);
      if (newDeal) {
        await loadData();
        setShowDealModal(false);
      }
    }
  };

  // Delete deal
  const deleteDeal = async (dealId: string) => {
    if (!confirm('Tem certeza que deseja excluir este negócio?')) return;

    const success = await crmService.deleteDeal(dealId);
    if (success) {
      await loadData();
    }
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calculate pipeline metrics
  const totalValue = deals.reduce((sum, deal) => sum + Number(deal.value), 0);
  const wonDeals = deals.filter(d => d.stage === 'CLOSED_WON');
  const totalWon = wonDeals.reduce((sum, deal) => sum + Number(deal.value), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: currentTheme.colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: currentTheme.colors.primary }}></div>
          <p style={{ color: currentTheme.colors.text }}>Carregando CRM...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: currentTheme.colors.border, backgroundColor: currentTheme.colors.backgroundSecondary }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>
              CRM - Pipeline de Vendas
            </h1>
            <p style={{ color: currentTheme.colors.textMuted }}>
              Gerencie seus negócios e relacionamentos com clientes
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Metrics */}
            <div className="px-4 py-2 rounded-lg border" style={{ backgroundColor: currentTheme.colors.cardBg, borderColor: currentTheme.colors.border }}>
              <div className="text-xs" style={{ color: currentTheme.colors.textMuted }}>Total em Pipeline</div>
              <div className="text-xl font-bold" style={{ color: currentTheme.colors.primary }}>{formatCurrency(totalValue)}</div>
            </div>
            <div className="px-4 py-2 rounded-lg border" style={{ backgroundColor: currentTheme.colors.cardBg, borderColor: currentTheme.colors.border }}>
              <div className="text-xs" style={{ color: currentTheme.colors.textMuted }}>Ganho</div>
              <div className="text-xl font-bold" style={{ color: currentTheme.colors.success }}>{formatCurrency(totalWon)}</div>
            </div>
            <div className="px-4 py-2 rounded-lg border" style={{ backgroundColor: currentTheme.colors.cardBg, borderColor: currentTheme.colors.border }}>
              <div className="text-xs" style={{ color: currentTheme.colors.textMuted }}>Negócios</div>
              <div className="text-xl font-bold" style={{ color: currentTheme.colors.text }}>{deals.length}</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: currentTheme.colors.textMuted }} />
          <input
            type="text"
            placeholder="Buscar negócios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: currentTheme.colors.input,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          />
        </div>
      </div>

      {/* Pipeline */}
      <div className="flex-1 overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex h-full p-6 space-x-4">
            {pipeline.map(column => (
              <div
                key={column.stage}
                className="flex-shrink-0 w-80 flex flex-col rounded-lg border"
                style={{
                  backgroundColor: currentTheme.colors.backgroundSecondary,
                  borderColor: currentTheme.colors.border
                }}
              >
                {/* Column Header */}
                <div className="p-4 border-b" style={{ borderColor: currentTheme.colors.border }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }}></div>
                      <h3 className="font-semibold" style={{ color: currentTheme.colors.text }}>{column.title}</h3>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: column.color + '20', color: column.color }}>
                      {column.deals.length}
                    </span>
                  </div>
                  <button
                    onClick={() => openCreateDealModal(column.stage)}
                    className="w-full py-2 px-3 rounded-lg border transition-all flex items-center justify-center space-x-2 hover:opacity-80"
                    style={{
                      borderColor: currentTheme.colors.border,
                      color: currentTheme.colors.textMuted
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">Adicionar Negócio</span>
                  </button>
                </div>

                {/* Deals List */}
                <Droppable droppableId={column.stage}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex-1 overflow-y-auto p-4 space-y-3"
                      style={{
                        backgroundColor: snapshot.isDraggingOver ? currentTheme.colors.backgroundTertiary : 'transparent'
                      }}
                    >
                      {column.deals.map((deal, index) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg"
                              style={{
                                ...provided.draggableProps.style,
                                backgroundColor: currentTheme.colors.cardBg,
                                borderColor: currentTheme.colors.border,
                                opacity: snapshot.isDragging ? 0.8 : 1
                              }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold flex-1" style={{ color: currentTheme.colors.text }}>
                                  {deal.title}
                                </h4>
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditDealModal(deal);
                                    }}
                                    className="p-1 rounded hover:bg-opacity-20"
                                    style={{ color: currentTheme.colors.textMuted }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteDeal(deal.id);
                                    }}
                                    className="p-1 rounded hover:bg-opacity-20"
                                    style={{ color: currentTheme.colors.error }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span style={{ color: currentTheme.colors.textMuted }}>Valor:</span>
                                  <span className="font-bold" style={{ color: currentTheme.colors.success }}>
                                    {formatCurrency(Number(deal.value))}
                                  </span>
                                </div>

                                {deal.company && (
                                  <div className="flex items-center space-x-2">
                                    <Building2 className="h-4 w-4" style={{ color: currentTheme.colors.textMuted }} />
                                    <span style={{ color: currentTheme.colors.text }}>{deal.company.name}</span>
                                  </div>
                                )}

                                {deal.contact && (
                                  <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4" style={{ color: currentTheme.colors.textMuted }} />
                                    <span style={{ color: currentTheme.colors.text }}>
                                      {deal.contact.firstName} {deal.contact.lastName}
                                    </span>
                                  </div>
                                )}

                                {deal.expectedCloseDate && (
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4" style={{ color: currentTheme.colors.textMuted }} />
                                    <span style={{ color: currentTheme.colors.text }}>
                                      {new Date(deal.expectedCloseDate).toLocaleDateString('pt-BR')}
                                    </span>
                                  </div>
                                )}

                                <div className="pt-2 border-t" style={{ borderColor: currentTheme.colors.border }}>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs" style={{ color: currentTheme.colors.textMuted }}>Probabilidade:</span>
                                    <span className="text-xs font-semibold" style={{ color: currentTheme.colors.primary }}>
                                      {deal.probability}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Deal Modal */}
      {showDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            className="w-full max-w-2xl rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: currentTheme.colors.cardBg }}
          >
            <div className="p-6 border-b" style={{ borderColor: currentTheme.colors.border }}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>
                  {editingDeal ? 'Editar Negócio' : 'Novo Negócio'}
                </h2>
                <button
                  onClick={() => setShowDealModal(false)}
                  className="p-2 rounded-lg hover:bg-opacity-20"
                  style={{ color: currentTheme.colors.textMuted }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                  Título *
                </label>
                <input
                  type="text"
                  value={dealForm.title}
                  onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: currentTheme.colors.input,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                  placeholder="Ex: Venda de software para Empresa X"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                  Descrição
                </label>
                <textarea
                  value={dealForm.description}
                  onChange={(e) => setDealForm({ ...dealForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                  style={{
                    backgroundColor: currentTheme.colors.input,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                  placeholder="Detalhes sobre o negócio..."
                />
              </div>

              {/* Value and Probability */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    value={dealForm.value}
                    onChange={(e) => setDealForm({ ...dealForm, value: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: currentTheme.colors.input,
                      borderColor: currentTheme.colors.border,
                      color: currentTheme.colors.text
                    }}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                    Probabilidade (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={dealForm.probability}
                    onChange={(e) => setDealForm({ ...dealForm, probability: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: currentTheme.colors.input,
                      borderColor: currentTheme.colors.border,
                      color: currentTheme.colors.text
                    }}
                    placeholder="0-100"
                  />
                </div>
              </div>

              {/* Expected Close Date */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                  Data Prevista de Fechamento
                </label>
                <input
                  type="date"
                  value={dealForm.expectedCloseDate}
                  onChange={(e) => setDealForm({ ...dealForm, expectedCloseDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: currentTheme.colors.input,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />
              </div>

              {/* Company and Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                    Empresa
                  </label>
                  <select
                    value={dealForm.companyId}
                    onChange={(e) => setDealForm({ ...dealForm, companyId: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: currentTheme.colors.input,
                      borderColor: currentTheme.colors.border,
                      color: currentTheme.colors.text
                    }}
                  >
                    <option value="">Selecione...</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                    Contato
                  </label>
                  <select
                    value={dealForm.contactId}
                    onChange={(e) => setDealForm({ ...dealForm, contactId: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: currentTheme.colors.input,
                      borderColor: currentTheme.colors.border,
                      color: currentTheme.colors.text
                    }}
                  >
                    <option value="">Selecione...</option>
                    {contacts.map(contact => (
                      <option key={contact.id} value={contact.id}>
                        {contact.firstName} {contact.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end space-x-3" style={{ borderColor: currentTheme.colors.border }}>
              <button
                onClick={() => setShowDealModal(false)}
                className="px-4 py-2 rounded-lg border"
                style={{
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.textMuted
                }}
              >
                Cancelar
              </button>
              <button
                onClick={saveDeal}
                className="px-4 py-2 rounded-lg font-semibold"
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: '#ffffff'
                }}
              >
                {editingDeal ? 'Salvar Alterações' : 'Criar Negócio'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMPage;
