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
  Trash2,
  Settings,
  GitBranch,
  Palette,
  Users
} from 'lucide-react';
import { crmService } from '../../services/crmService';
import { Deal, Pipeline, PipelineStage, Company, Contact } from '../../types/CRM';
import { useCRMTheme } from '../../contexts/CRMThemeContext';
import { themes } from '../../themes/themes';
import { ContactsList } from '../../components/crm/ContactsList';
import { ContactModal } from '../../components/crm/ContactModal';
import PromoteToSalesButton from '../../components/crm/PromoteToSalesButton';
import PromotionModal from '../../components/crm/PromotionModal';

const CRMPage = () => {
  const { currentTheme, setTheme, themeId } = useCRMTheme();

  // State
  const [activeTab, setActiveTab] = useState<'pipeline' | 'contacts'>('pipeline');
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [currentPipelineId, setCurrentPipelineId] = useState<string>('');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDealModal, setShowDealModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [showPipelineModal, setShowPipelineModal] = useState(false);
  const [editingPipeline, setEditingPipeline] = useState<Pipeline | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotingDeal, setPromotingDeal] = useState<Deal | null>(null);
  const [promotionEligibility, setPromotionEligibility] = useState<any>(null);
  const [isPromoting, setIsPromoting] = useState(false);

  // State para scroll horizontal com drag
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // State para edição inline do título da coluna
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [editingStageTitle, setEditingStageTitle] = useState('');

  // Deal form state
  const [dealForm, setDealForm] = useState({
    title: '',
    description: '',
    value: 0,
    currency: 'BRL',
    pipelineId: '',
    stageId: '',
    probability: 0,
    expectedCloseDate: '',
    companyId: '',
    contactId: '',
    // Market Research fields
    researchType: 'SALES' as 'MARKET_RESEARCH' | 'SALES',
    targetProfile: '' as 'B2B_ENTERPRISE' | 'B2B_SMB' | 'B2C' | '',
    marketSegment: '',
    companySizeTarget: '',
    budgetRangeMin: 0,
    budgetRangeMax: 0,
    decisionMakerIdentified: false,
    decisionMakerName: '',
    decisionMakerRole: '',
    qualificationScore: 0,
    researchNotes: '',
    painPointsList: [] as string[]
  });

  // Pipeline form state
  const [pipelineForm, setPipelineForm] = useState({
    title: '',
    description: '',
    color: '#3b82f6',
    isDefault: false,
    position: 0,
    stages: [
      { title: 'Novo Lead', color: '#6366f1' },
      { title: 'Qualificação', color: '#8b5cf6' },
      { title: 'Proposta', color: '#ec4899' },
      { title: 'Negociação', color: '#f59e0b' },
      { title: 'Fechado', color: '#10b981' }
    ]
  });

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [pipelinesData, companiesData, contactsData] = await Promise.all([
      crmService.getPipelines(),
      crmService.getCompanies(),
      crmService.getContacts()
    ]);

    setPipelines(pipelinesData);
    setCompanies(companiesData);
    setContacts(contactsData);

    // Set first pipeline as default
    if (pipelinesData.length > 0) {
      const firstPipeline = pipelinesData[0];
      setCurrentPipelineId(firstPipeline.id);
      const dealsData = await crmService.getDeals(firstPipeline.id);
      setDeals(dealsData);
    }

    setLoading(false);
  };

  // Load deals for a specific pipeline
  const loadDealsForPipeline = async (pipelineId: string) => {
    const dealsData = await crmService.getDeals(pipelineId);
    setDeals(dealsData);
  };

  // Get current pipeline and organize deals by stage
  const currentPipeline = pipelines.find(p => p.id === currentPipelineId);
  const pipelineColumns = currentPipeline?.stages.map(stage => ({
    ...stage,
    deals: deals.filter(d => d.stageId === stage.id)
  })) || [];

  // Handle drag and drop
  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const deal = deals.find(d => d.id === draggableId);
    if (!deal) return;

    // Update local state immediately
    const newStageId = destination.droppableId;
    const updatedDeals = deals.map(d =>
      d.id === draggableId ? { ...d, stageId: newStageId, position: destination.index } : d
    );
    setDeals(updatedDeals);

    // Update backend
    await crmService.moveDeal(draggableId, newStageId, destination.index);
  };

  // Open modal to create deal
  const openCreateDealModal = (stageId: string) => {
    setEditingDeal(null);
    setDealForm({
      title: '',
      description: '',
      value: 0,
      currency: 'BRL',
      pipelineId: currentPipelineId,
      stageId,
      probability: 0,
      expectedCloseDate: '',
      companyId: '',
      contactId: '',
      // Market Research fields
      researchType: 'SALES',
      targetProfile: '',
      marketSegment: '',
      companySizeTarget: '',
      budgetRangeMin: 0,
      budgetRangeMax: 0,
      decisionMakerIdentified: false,
      decisionMakerName: '',
      decisionMakerRole: '',
      qualificationScore: 0,
      researchNotes: '',
      painPointsList: []
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
      pipelineId: deal.pipelineId,
      stageId: deal.stageId,
      probability: deal.probability,
      expectedCloseDate: deal.expectedCloseDate || '',
      companyId: deal.companyId || '',
      contactId: deal.contactId || '',
      // Market Research fields
      researchType: deal.researchType || 'SALES',
      targetProfile: deal.targetProfile || '',
      marketSegment: deal.marketSegment || '',
      companySizeTarget: deal.companySizeTarget || '',
      budgetRangeMin: deal.budgetRangeMin || 0,
      budgetRangeMax: deal.budgetRangeMax || 0,
      decisionMakerIdentified: deal.decisionMakerIdentified || false,
      decisionMakerName: deal.decisionMakerName || '',
      decisionMakerRole: deal.decisionMakerRole || '',
      qualificationScore: deal.qualificationScore || 0,
      researchNotes: deal.researchNotes || '',
      painPointsList: deal.painPointsList || []
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
      await loadDealsForPipeline(currentPipelineId);
    }
  };

  // Open modal to create pipeline
  const openCreatePipelineModal = () => {
    setEditingPipeline(null);
    setPipelineForm({
      title: '',
      description: '',
      color: '#3b82f6',
      isDefault: false,
      position: pipelines.length,
      stages: [
        { title: 'Novo Lead', color: '#6366f1' },
        { title: 'Qualificação', color: '#8b5cf6' },
        { title: 'Proposta', color: '#ec4899' },
        { title: 'Negociação', color: '#f59e0b' },
        { title: 'Fechado', color: '#10b981' }
      ]
    });
    setShowPipelineModal(true);
  };

  // Save pipeline
  const savePipeline = async () => {
    if (!pipelineForm.title.trim()) {
      alert('O título do pipeline é obrigatório!');
      return;
    }

    if (pipelineForm.stages.length === 0) {
      alert('O pipeline deve ter pelo menos uma etapa!');
      return;
    }

    if (editingPipeline) {
      // Update existing pipeline
      const success = await crmService.updatePipeline(editingPipeline.id, pipelineForm as any);
      if (success) {
        await loadData();
        setShowPipelineModal(false);
      }
    } else {
      // Create new pipeline
      const newPipeline = await crmService.createPipeline(pipelineForm as any);
      if (newPipeline) {
        await loadData();
        setCurrentPipelineId(newPipeline.id);
        setShowPipelineModal(false);
      }
    }
  };

  // Delete pipeline
  const deletePipeline = async (pipelineId: string) => {
    if (!confirm('Tem certeza que deseja excluir este pipeline? Todos os negócios associados serão perdidos!')) return;

    const success = await crmService.deletePipeline(pipelineId);
    if (success) {
      await loadData();
    }
  };

  // Add stage to pipeline form
  const addStageToForm = () => {
    setPipelineForm({
      ...pipelineForm,
      stages: [...pipelineForm.stages, { title: '', color: '#6366f1' }]
    });
  };

  // Remove stage from pipeline form
  const removeStageFromForm = (index: number) => {
    setPipelineForm({
      ...pipelineForm,
      stages: pipelineForm.stages.filter((_, i) => i !== index)
    });
  };

  // Update stage in pipeline form
  const updateStageInForm = (index: number, field: 'title' | 'color', value: string) => {
    const updatedStages = [...pipelineForm.stages];
    updatedStages[index] = { ...updatedStages[index], [field]: value };
    setPipelineForm({ ...pipelineForm, stages: updatedStages });
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Handlers para scroll horizontal com drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handler para salvar título da etapa editado
  const saveStageTitle = async (stageId: string, newTitle: string) => {
    if (!newTitle.trim()) {
      alert('O título da etapa não pode estar vazio!');
      setEditingStageId(null);
      return;
    }

    try {
      const success = await crmService.updateStage(stageId, { title: newTitle });
      if (success) {
        await loadData();
        setEditingStageId(null);
      }
    } catch (error) {
      console.error('Erro ao atualizar título da etapa:', error);
      alert('Erro ao atualizar título da etapa');
    }
  };

  // Contact management functions
  const openCreateContactModal = () => {
    setEditingContact(null);
    setShowContactModal(true);
  };

  const openEditContactModal = (contact: Contact) => {
    setEditingContact(contact);
    setShowContactModal(true);
  };

  const saveContact = async (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingContact) {
        const success = await crmService.updateContact(editingContact.id, contactData);
        if (success) {
          await loadData();
          setShowContactModal(false);
          setEditingContact(null);
        }
      } else {
        const newContact = await crmService.createContact(contactData);
        if (newContact) {
          await loadData();
          setShowContactModal(false);
        }
      }
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      alert('Erro ao salvar contato');
    }
  };

  const deleteContact = async (contactId: string) => {
    if (!confirm('Tem certeza que deseja excluir este contato?')) return;

    try {
      const success = await crmService.deleteContact(contactId);
      if (success) {
        await loadData();
      }
    } catch (error) {
      console.error('Erro ao excluir contato:', error);
      alert('Erro ao excluir contato');
    }
  };

  // Promotion to Sales functions
  const handlePromoteClick = async (deal: Deal) => {
    setPromotingDeal(deal);

    // Check eligibility
    const eligibility = await crmService.checkPromotionEligibility(deal.id);
    setPromotionEligibility(eligibility);
    setShowPromotionModal(true);
  };

  const confirmPromotion = async () => {
    if (!promotingDeal) return;

    setIsPromoting(true);
    try {
      const result = await crmService.promoteDealToSales(promotingDeal.id);
      if (result.success) {
        // Refresh data
        await loadData();
        setShowPromotionModal(false);
        setPromotingDeal(null);
        setPromotionEligibility(null);
        // Show success message
        alert('Lead promovido para Sales com sucesso! 🎉');
      } else {
        alert('Erro ao promover lead: ' + result.error);
      }
    } catch (error) {
      console.error('Erro ao promover deal:', error);
      alert('Erro ao promover lead para Sales');
    } finally {
      setIsPromoting(false);
    }
  };

  // Calculate pipeline metrics
  const totalValue = deals.reduce((sum, deal) => sum + Number(deal.value), 0);
  const lastStage = currentPipeline?.stages[currentPipeline.stages.length - 1];
  const wonDeals = lastStage ? deals.filter(d => d.stageId === lastStage.id) : [];
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>
              CRM - {activeTab === 'pipeline' ? 'Pipeline de Vendas' : 'Contatos'}
            </h1>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-2 mb-3">
              <button
                onClick={() => setActiveTab('pipeline')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'pipeline' ? 'font-semibold' : 'hover:opacity-70'
                }`}
                style={{
                  backgroundColor: activeTab === 'pipeline' ? currentTheme.colors.primary : 'transparent',
                  color: activeTab === 'pipeline' ? '#ffffff' : currentTheme.colors.textMuted
                }}
              >
                <GitBranch className="h-4 w-4" />
                <span>Pipeline</span>
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'contacts' ? 'font-semibold' : 'hover:opacity-70'
                }`}
                style={{
                  backgroundColor: activeTab === 'contacts' ? currentTheme.colors.primary : 'transparent',
                  color: activeTab === 'contacts' ? '#ffffff' : currentTheme.colors.textMuted
                }}
              >
                <Users className="h-4 w-4" />
                <span>Contatos</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {activeTab === 'pipeline' && (
                <>
                  <div className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5" style={{ color: currentTheme.colors.textMuted }} />
                <select
                  value={currentPipelineId}
                  onChange={(e) => {
                    setCurrentPipelineId(e.target.value);
                    loadDealsForPipeline(e.target.value);
                  }}
                  className="px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: currentTheme.colors.input,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                >
                  {pipelines.map(pipeline => (
                    <option key={pipeline.id} value={pipeline.id}>
                      {pipeline.type === 'MARKET_RESEARCH' ? '🔍 ' : '💰 '}{pipeline.title}
                    </option>
                  ))}
                </select>
                {pipelines.length > 1 && (
                  <button
                    onClick={() => deletePipeline(currentPipelineId)}
                    className="p-1.5 rounded-lg border transition-all hover:opacity-80"
                    style={{
                      backgroundColor: currentTheme.colors.error + '10',
                      borderColor: currentTheme.colors.error,
                      color: currentTheme.colors.error
                    }}
                    title="Excluir pipeline atual"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                onClick={openCreatePipelineModal}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  borderColor: currentTheme.colors.primary,
                  color: '#ffffff'
                }}
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Novo Pipeline</span>
              </button>
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5" style={{ color: currentTheme.colors.textMuted }} />
                <select
                  value={themeId}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: currentTheme.colors.input,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                >
                  {Object.entries(themes).map(([id, theme]) => (
                    <option key={id} value={id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>
                </>
              )}
              {activeTab === 'contacts' && (
                <button
                  onClick={openCreateContactModal}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
                  style={{
                    backgroundColor: currentTheme.colors.primary,
                    borderColor: currentTheme.colors.primary,
                    color: '#ffffff'
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Novo Contato</span>
                </button>
              )}
            </div>
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
        {activeTab === 'pipeline' && (
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
        )}
      </div>

      {/* Pipeline View */}
      {activeTab === 'pipeline' && (
        <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex-1 overflow-x-auto"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: isDragging ? 'none' : 'auto'
        }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex h-full p-6 space-x-4">
            {pipelineColumns.map(column => (
              <div
                key={column.id}
                className="flex-shrink-0 w-80 flex flex-col rounded-lg border"
                style={{
                  backgroundColor: currentTheme.colors.backgroundSecondary,
                  borderColor: currentTheme.colors.border
                }}
              >
                {/* Column Header */}
                <div className="p-4 border-b" style={{ borderColor: currentTheme.colors.border }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: column.color }}></div>
                      {editingStageId === column.id ? (
                        <input
                          type="text"
                          value={editingStageTitle}
                          onChange={(e) => setEditingStageTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              saveStageTitle(column.id, editingStageTitle);
                            } else if (e.key === 'Escape') {
                              setEditingStageId(null);
                            }
                          }}
                          onBlur={() => saveStageTitle(column.id, editingStageTitle)}
                          autoFocus
                          className="flex-1 px-2 py-1 rounded border font-semibold focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: currentTheme.colors.input,
                            borderColor: currentTheme.colors.border,
                            color: currentTheme.colors.text
                          }}
                        />
                      ) : (
                        <h3
                          className="font-semibold cursor-pointer hover:opacity-70 transition-opacity"
                          style={{ color: currentTheme.colors.text }}
                          onClick={() => {
                            setEditingStageId(column.id);
                            setEditingStageTitle(column.title);
                          }}
                          title="Clique para editar"
                        >
                          {column.title}
                        </h3>
                      )}
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full flex-shrink-0" style={{ backgroundColor: column.color + '20', color: column.color }}>
                      {column.deals.length}
                    </span>
                  </div>
                  <button
                    onClick={() => openCreateDealModal(column.id)}
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
                <Droppable droppableId={column.id}>
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
                              {/* Header com Badge de Tipo */}
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="font-semibold" style={{ color: currentTheme.colors.text }}>
                                      {deal.title}
                                    </h4>
                                    {/* Badge: Research vs Sales */}
                                    {deal.researchType === 'MARKET_RESEARCH' ? (
                                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full flex items-center space-x-1" style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>
                                        <span>🔍</span>
                                        <span>Research</span>
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full flex items-center space-x-1" style={{ backgroundColor: '#10b98120', color: '#10b981' }}>
                                        <span>💰</span>
                                        <span>Sales</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
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
                                {/* Campos específicos de Market Research */}
                                {deal.researchType === 'MARKET_RESEARCH' ? (
                                  <>
                                    {/* Qualification Score Progress Bar */}
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs" style={{ color: currentTheme.colors.textMuted }}>Qualification Score:</span>
                                        <span className="text-xs font-semibold" style={{ color: deal.qualificationScore >= 70 ? currentTheme.colors.success : currentTheme.colors.warning }}>
                                          {deal.qualificationScore || 0}%
                                        </span>
                                      </div>
                                      <div className="w-full h-2 rounded-full" style={{ backgroundColor: currentTheme.colors.border }}>
                                        <div
                                          className="h-2 rounded-full transition-all"
                                          style={{
                                            width: `${deal.qualificationScore || 0}%`,
                                            backgroundColor: deal.qualificationScore >= 70 ? currentTheme.colors.success : currentTheme.colors.warning
                                          }}
                                        ></div>
                                      </div>
                                    </div>

                                    {/* Target Profile Badge */}
                                    {deal.targetProfile && (
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs" style={{ color: currentTheme.colors.textMuted }}>Target:</span>
                                        <span className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: currentTheme.colors.primary + '20', color: currentTheme.colors.primary }}>
                                          {deal.targetProfile.replace('_', ' ')}
                                        </span>
                                      </div>
                                    )}

                                    {/* Pain Points Count */}
                                    {deal.painPointsList && deal.painPointsList.length > 0 && (
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs" style={{ color: currentTheme.colors.textMuted }}>Pain Points:</span>
                                        <span className="text-xs font-semibold" style={{ color: currentTheme.colors.error }}>
                                          {deal.painPointsList.length} descobertos
                                        </span>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {/* Campos de Sales (já existentes) */}
                                    <div className="flex items-center justify-between">
                                      <span style={{ color: currentTheme.colors.textMuted }}>Valor:</span>
                                      <span className="font-bold" style={{ color: currentTheme.colors.success }}>
                                        {formatCurrency(Number(deal.value))}
                                      </span>
                                    </div>

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
                                  </>
                                )}

                                {/* Campos comuns a ambos */}
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
                              </div>

                              {/* Promote to Sales Button */}
                              {deal.researchType === 'MARKET_RESEARCH' && (
                                <div className="mt-3 pt-3 border-t" style={{ borderColor: currentTheme.colors.border }}>
                                  <PromoteToSalesButton
                                    deal={deal}
                                    isLastStage={deal.stageId === lastStage?.id}
                                    onClick={() => handlePromoteClick(deal)}
                                    theme={currentTheme}
                                  />
                                </div>
                              )}
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
      )}

      {/* Contacts View */}
      {activeTab === 'contacts' && (
        <div className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: currentTheme.colors.background }}>
          <ContactsList
            contacts={contacts}
            onEdit={openEditContactModal}
            onDelete={deleteContact}
          />
        </div>
      )}

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

              {/* Research Type */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                  Tipo de Negócio *
                </label>
                <select
                  value={dealForm.researchType}
                  onChange={(e) => setDealForm({ ...dealForm, researchType: e.target.value as 'MARKET_RESEARCH' | 'SALES' })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: currentTheme.colors.input,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                >
                  <option value="SALES">💰 Sales (Vendas)</option>
                  <option value="MARKET_RESEARCH">🔍 Market Research (Pesquisa de Mercado)</option>
                </select>
              </div>

              {/* Campos dinâmicos baseados em researchType */}
              {dealForm.researchType === 'MARKET_RESEARCH' ? (
                <>
                  {/* Market Research Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                        Target Profile
                      </label>
                      <select
                        value={dealForm.targetProfile}
                        onChange={(e) => setDealForm({ ...dealForm, targetProfile: e.target.value as any })}
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: currentTheme.colors.input,
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text
                        }}
                      >
                        <option value="">Selecione...</option>
                        <option value="B2B_ENTERPRISE">B2B Enterprise</option>
                        <option value="B2B_SMB">B2B SMB</option>
                        <option value="B2C">B2C</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                        Segmento de Mercado
                      </label>
                      <input
                        type="text"
                        value={dealForm.marketSegment}
                        onChange={(e) => setDealForm({ ...dealForm, marketSegment: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: currentTheme.colors.input,
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text
                        }}
                        placeholder="Ex: SaaS, E-commerce..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                        Budget Mínimo (R$)
                      </label>
                      <input
                        type="number"
                        value={dealForm.budgetRangeMin}
                        onChange={(e) => setDealForm({ ...dealForm, budgetRangeMin: Number(e.target.value) })}
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
                        Budget Máximo (R$)
                      </label>
                      <input
                        type="number"
                        value={dealForm.budgetRangeMax}
                        onChange={(e) => setDealForm({ ...dealForm, budgetRangeMax: Number(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: currentTheme.colors.input,
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text
                        }}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dealForm.decisionMakerIdentified}
                        onChange={(e) => setDealForm({ ...dealForm, decisionMakerIdentified: e.target.checked })}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                        Decision Maker Identificado
                      </span>
                    </label>
                  </div>

                  {dealForm.decisionMakerIdentified && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                          Nome do Decision Maker
                        </label>
                        <input
                          type="text"
                          value={dealForm.decisionMakerName}
                          onChange={(e) => setDealForm({ ...dealForm, decisionMakerName: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: currentTheme.colors.input,
                            borderColor: currentTheme.colors.border,
                            color: currentTheme.colors.text
                          }}
                          placeholder="Nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                          Cargo do Decision Maker
                        </label>
                        <input
                          type="text"
                          value={dealForm.decisionMakerRole}
                          onChange={(e) => setDealForm({ ...dealForm, decisionMakerRole: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: currentTheme.colors.input,
                            borderColor: currentTheme.colors.border,
                            color: currentTheme.colors.text
                          }}
                          placeholder="Ex: CEO, CTO..."
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      Notas de Pesquisa
                    </label>
                    <textarea
                      value={dealForm.researchNotes}
                      onChange={(e) => setDealForm({ ...dealForm, researchNotes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                      style={{
                        backgroundColor: currentTheme.colors.input,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text
                      }}
                      placeholder="Observações sobre a pesquisa de mercado..."
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Sales Fields */}
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
                </>
              )}

              {/* Company and Contact - Campos comuns */}
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

      {/* Pipeline Modal */}
      {showPipelineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            className="w-full max-w-3xl rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: currentTheme.colors.cardBg }}
          >
            <div className="p-6 border-b" style={{ borderColor: currentTheme.colors.border }}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>
                  {editingPipeline ? 'Editar Pipeline' : 'Novo Pipeline'}
                </h2>
                <button
                  onClick={() => setShowPipelineModal(false)}
                  className="p-2 rounded-lg hover:bg-opacity-20"
                  style={{ color: currentTheme.colors.textMuted }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Pipeline Title */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                  Título do Pipeline *
                </label>
                <input
                  type="text"
                  value={pipelineForm.title}
                  onChange={(e) => setPipelineForm({ ...pipelineForm, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: currentTheme.colors.input,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                  placeholder="Ex: Vendas B2B, Vendas Inbound, Vendas Enterprise"
                />
              </div>

              {/* Pipeline Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                  Descrição
                </label>
                <textarea
                  value={pipelineForm.description}
                  onChange={(e) => setPipelineForm({ ...pipelineForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                  style={{
                    backgroundColor: currentTheme.colors.input,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                  placeholder="Descreva o propósito deste pipeline..."
                />
              </div>

              {/* Pipeline Color */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                  Cor do Pipeline
                </label>
                <input
                  type="color"
                  value={pipelineForm.color}
                  onChange={(e) => setPipelineForm({ ...pipelineForm, color: e.target.value })}
                  className="w-20 h-10 rounded-lg border cursor-pointer"
                  style={{
                    borderColor: currentTheme.colors.border
                  }}
                />
              </div>

              {/* Stages Configuration */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                    Etapas do Pipeline *
                  </label>
                  <button
                    onClick={addStageToForm}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
                    style={{
                      backgroundColor: currentTheme.colors.primary,
                      borderColor: currentTheme.colors.primary,
                      color: '#ffffff'
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">Adicionar Etapa</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {pipelineForm.stages.map((stage, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg border"
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSecondary,
                        borderColor: currentTheme.colors.border
                      }}
                    >
                      <div className="flex items-center space-x-2 text-sm" style={{ color: currentTheme.colors.textMuted }}>
                        <span>{index + 1}.</span>
                      </div>
                      <input
                        type="text"
                        value={stage.title}
                        onChange={(e) => updateStageInForm(index, 'title', e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: currentTheme.colors.input,
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text
                        }}
                        placeholder="Nome da etapa"
                      />
                      <input
                        type="color"
                        value={stage.color}
                        onChange={(e) => updateStageInForm(index, 'color', e.target.value)}
                        className="w-12 h-10 rounded-lg border cursor-pointer"
                        style={{
                          borderColor: currentTheme.colors.border
                        }}
                      />
                      <button
                        onClick={() => removeStageFromForm(index)}
                        className="p-2 rounded-lg hover:bg-opacity-20"
                        style={{ color: currentTheme.colors.error }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {pipelineForm.stages.length === 0 && (
                  <p className="text-sm text-center py-8" style={{ color: currentTheme.colors.textMuted }}>
                    Nenhuma etapa configurada. Adicione pelo menos uma etapa.
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 border-t flex justify-end space-x-3" style={{ borderColor: currentTheme.colors.border }}>
              <button
                onClick={() => setShowPipelineModal(false)}
                className="px-4 py-2 rounded-lg border"
                style={{
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.textMuted
                }}
              >
                Cancelar
              </button>
              <button
                onClick={savePipeline}
                className="px-4 py-2 rounded-lg font-semibold"
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: '#ffffff'
                }}
              >
                {editingPipeline ? 'Salvar Alterações' : 'Criar Pipeline'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setEditingContact(null);
        }}
        onSave={saveContact}
        contact={editingContact}
        companies={companies}
      />

      {/* Promotion Modal */}
      <PromotionModal
        isOpen={showPromotionModal}
        onClose={() => {
          setShowPromotionModal(false);
          setPromotingDeal(null);
          setPromotionEligibility(null);
        }}
        onConfirm={confirmPromotion}
        deal={promotingDeal}
        eligibility={promotionEligibility}
        theme={currentTheme}
        isLoading={isPromoting}
      />
    </div>
  );
};

export default CRMPage;
