import { useState, useEffect } from 'react';
import { hybridLeadService } from '@/services/hybridLeadService';
import { Lead } from '@/types/api';
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Building,
  Calendar,
  Star,
  TrendingUp,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Crown,
  Sparkles,
  Download,
  RefreshCw
} from 'lucide-react';

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 25
  });

  const statusOptions = [
    { value: 'all', label: 'Todos', count: 247, color: 'gray' },
    { value: 'new', label: 'Novos', count: 89, color: 'blue' },
    { value: 'contacted', label: 'Contatados', count: 67, color: 'yellow' },
    { value: 'qualified', label: 'Qualificados', count: 45, color: 'purple' },
    { value: 'demo_scheduled', label: 'Demo Agendada', count: 23, color: 'indigo' },
    { value: 'proposal_sent', label: 'Proposta Enviada', count: 18, color: 'orange' },
    { value: 'closed_won', label: 'Fechados', count: 5, color: 'emerald' },
    { value: 'closed_lost', label: 'Perdidos', count: 12, color: 'red' }
  ];

  const sectorOptions = [
    { value: 'all', label: 'Todos os Setores', count: 247 },
    { value: 'saas', label: 'SaaS', count: 98 },
    { value: 'fintech', label: 'Fintech', count: 67 },
    { value: 'ecommerce', label: 'E-commerce', count: 45 },
    { value: 'startup', label: 'Startup', count: 28 },
    { value: 'consulting', label: 'Consultoria', count: 9 }
  ];

  // Mock data generation removed - using hybrid service

  const applyFilters = (leadsData: Lead[]) => {
    let filtered = [...leadsData];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === selectedStatus);
    }

    // Apply sector filter
    if (selectedSector !== 'all') {
      filtered = filtered.filter(lead => lead.companySector === selectedSector);
    }

    return filtered;
  };

  const updateStatusCounts = (leadsData: Lead[]) => {
    const counts = leadsData.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return statusOptions.map(option => ({
      ...option,
      count: option.value === 'all' ? leadsData.length : (counts[option.value] || 0)
    }));
  };

  const loadLeads = async () => {
    try {
      setIsLoading(true);
      
      // Use hybrid service to load leads (handles fallbacks internally)
      const result = await hybridLeadService.getLeads({
        page: currentPage,
        limit: pagination.limit,
        status: selectedStatus,
        sector: selectedSector,
        search: searchTerm
      });

      setLeads(result.leads);
      setPagination(result.pagination);

      // For status counts, we need all leads - try to get stats
      if (allLeads.length === 0) {
        try {
          const stats = await hybridLeadService.getLeadStats();
          // Update status counts based on stats  
          const totalLeads = Object.values(stats).reduce((sum, count) => sum + count, 0);
          if (totalLeads > 0) {
            setAllLeads(result.leads); // Use current leads as reference
          } else {
            setAllLeads([]); // No leads available
          }
        } catch (error) {
          console.warn('Failed to load stats');
          setAllLeads([]);
        }
      }
    } catch (error) {
      console.error('Error loading leads:', error);
      // Set empty state
      setLeads([]);
      setAllLeads([]);
      setPagination({
        page: 1,
        pages: 1,
        total: 0,
        limit: pagination.limit
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    try {
      // Try to update via hybrid service
      const updatedLead = await hybridLeadService.updateLeadStatus(leadId, newStatus);
      
      if (updatedLead) {
        // Update local state
        const updatedAllLeads = allLeads.map(lead =>
          lead._id === leadId ? { ...lead, status: newStatus as any } : lead
        );
        setAllLeads(updatedAllLeads);
        
        // Update current leads display
        const updatedCurrentLeads = leads.map(lead =>
          lead._id === leadId ? { ...lead, status: newStatus as any } : lead
        );
        setLeads(updatedCurrentLeads);
      } else {
        // Fallback to local state update only
        const updatedAllLeads = allLeads.map(lead =>
          lead._id === leadId ? { ...lead, status: newStatus as any } : lead
        );
        setAllLeads(updatedAllLeads);
        loadLeads(); // Refresh current view
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
      // Fallback to local state update
      const updatedAllLeads = allLeads.map(lead =>
        lead._id === leadId ? { ...lead, status: newStatus as any } : lead
      );
      setAllLeads(updatedAllLeads);
      loadLeads(); // Refresh current view
    }
  };

  const handleExport = async (format: string) => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const filteredData = applyFilters(allLeads);
    const csvData = filteredData.map(lead => ({
      Name: lead.fullName,
      Email: lead.email,
      Company: lead.company,
      Role: lead.role,
      Status: lead.status,
      Score: lead.score,
      Source: lead.source,
      'Created At': new Date(lead.createdAt).toLocaleDateString('pt-BR')
    }));

    const blob = new Blob([JSON.stringify(csvData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${Date.now()}.${format.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);

    setIsExporting(false);
    setShowExportModal(false);
  };

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead._id));
    }
  };

  useEffect(() => {
    loadLeads();
  }, [currentPage, selectedStatus, selectedSector, searchTerm, allLeads]);

  // Initialize data on mount
  useEffect(() => {
    if (allLeads.length === 0) {
      loadLeads();
    }
  }, []);

  // Update status counts when data changes
  const statusOptionsWithCounts = updateStatusCounts(allLeads);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'new': { color: 'bg-blue-500/20 text-blue-400 border-blue-500/40', icon: AlertCircle },
      'contacted': { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40', icon: Mail },
      'qualified': { color: 'bg-purple-500/20 text-purple-400 border-purple-500/40', icon: Star },
      'demo_scheduled': { color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40', icon: Calendar },
      'proposal_sent': { color: 'bg-orange-500/20 text-orange-400 border-orange-500/40', icon: Target },
      'closed_won': { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', icon: CheckCircle },
      'closed_lost': { color: 'bg-red-500/20 text-red-400 border-red-500/40', icon: XCircle }
    }[status] || { color: 'bg-gray-500/20 text-gray-400 border-gray-500/40', icon: Clock };

    const Icon = statusConfig.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border ${statusConfig.color}`}>
        <Icon className="h-3 w-3" />
        {statusOptions.find(s => s.value === status)?.label || status}
      </span>
    );
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
    return 'bg-red-500/20 text-red-400 border-red-500/40';
  };

  const filteredLeads = leads.filter(lead =>
    lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen bg-pure-black text-pure-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-primary-300 to-secondary-300 bg-clip-text text-transparent">
            Gestão de Leads
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Users className="h-4 w-4" />
            {allLeads.length.toLocaleString()} leads • {statusOptionsWithCounts.find(s => s.value === 'new')?.count || 0} novos hoje
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={loadLeads}
            disabled={isLoading}
            className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <button 
            onClick={() => setShowExportModal(true)}
            className="p-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/40 text-primary-300 hover:from-primary-500/30 hover:to-secondary-500/30 transition-all duration-300 hover:scale-105"
          >
            <Download className="h-4 w-4" />
          </button>

          <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
          />
        </div>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value} className="bg-gray-800 text-white">
              {option.label} ({option.count})
            </option>
          ))}
        </select>

        {/* Sector Filter */}
        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
        >
          {sectorOptions.map(option => (
            <option key={option.value} value={option.value} className="bg-gray-800 text-white">
              {option.label} ({option.count})
            </option>
          ))}
        </select>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {statusOptionsWithCounts.filter(status => status.value !== 'all').map((status, index) => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
              selectedStatus === status.value
                ? 'bg-primary-500/20 border-primary-500/50'
                : 'bg-gray-800/30 border-gray-700/30 hover:border-gray-600/50'
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-black text-white">{status.count}</div>
              <div className="text-xs text-gray-400 mt-1">{status.label}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500 overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-700/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary-400" />
                Leads ({pagination.total})
                {selectedLeads.length > 0 && (
                  <span className="text-sm font-medium text-primary-400">
                    • {selectedLeads.length} selecionados
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/40">
                <Crown className="h-3 w-3 text-purple-400" />
                <span className="text-xs font-bold text-purple-300">IA Score</span>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.length === leads.length && leads.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 rounded focus:ring-primary-500 focus:ring-2"
                    />
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-300">Lead</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-300">Empresa</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-300">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-300">Score IA</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-300">Fonte</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-300">Criado</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-300">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="w-4 h-4 bg-gray-700 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                          <div>
                            <div className="w-32 h-4 bg-gray-700 rounded mb-2"></div>
                            <div className="w-24 h-3 bg-gray-700 rounded"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-20 h-4 bg-gray-700 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-16 h-6 bg-gray-700 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-12 h-6 bg-gray-700 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-16 h-4 bg-gray-700 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-20 h-4 bg-gray-700 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 bg-gray-700 rounded"></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-800/30 transition-all duration-200">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead._id)}
                          onChange={() => handleLeadSelect(lead._id)}
                          className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 rounded focus:ring-primary-500 focus:ring-2"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {lead.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-bold text-white">{lead.fullName}</div>
                            <div className="text-sm text-gray-400">{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-white">{lead.company}</div>
                          <div className="text-sm text-gray-400">{lead.role}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border ${getScoreBadge(lead.score)}`}>
                          <Sparkles className="h-3 w-3" />
                          {lead.score}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">{lead.source}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-400">
                          {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowLeadModal(true);
                            }}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowLeadModal(true);
                            }}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                            title="Editar"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <div className="relative group">
                            <button 
                              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                              title="Mais opções"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                            <div className="absolute right-0 mt-1 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                              <div className="p-2 space-y-1">
                                <button
                                  onClick={() => handleStatusUpdate(lead._id, 'contacted')}
                                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                                >
                                  Marcar como Contatado
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(lead._id, 'qualified')}
                                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                                >
                                  Qualificar Lead
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(lead._id, 'demo_scheduled')}
                                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                                >
                                  Agendar Demo
                                </button>
                                <hr className="my-2 border-gray-700/50" />
                                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors">
                                  Excluir Lead
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-700/30">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Mostrando {((currentPage - 1) * pagination.limit) + 1}-{Math.min(currentPage * pagination.limit, pagination.total)} de {pagination.total.toLocaleString()} leads
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                  disabled={currentPage === pagination.pages}
                  className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl p-6 border-b border-gray-700/30 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {selectedLead.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedLead.fullName}</h3>
                    <p className="text-gray-400">{selectedLead.role} • {selectedLead.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="p-2 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Informações de Contato</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl">
                      <Mail className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-300">{selectedLead.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl">
                      <Building className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">{selectedLead.company}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Dados do Lead</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-800/30 rounded-xl">
                      <div className="text-xs text-gray-400">Setor</div>
                      <div className="text-white font-medium">{selectedLead.companySector}</div>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-xl">
                      <div className="text-xs text-gray-400">Tamanho da Equipe</div>
                      <div className="text-white font-medium">{selectedLead.teamSize}</div>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-xl">
                      <div className="text-xs text-gray-400">Leads/Mês</div>
                      <div className="text-white font-medium">{selectedLead.monthlyLeads}</div>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-xl">
                      <div className="text-xs text-gray-400">Budget</div>
                      <div className="text-white font-medium">{selectedLead.budget}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-4">Status e Score</h4>
                <div className="flex items-center gap-4 mb-4">
                  {getStatusBadge(selectedLead.status)}
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-bold border ${getScoreBadge(selectedLead.score)}`}>
                    <Sparkles className="h-4 w-4" />
                    {selectedLead.score} Score IA
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-4">Desafios Atuais</h4>
                <p className="text-gray-300 bg-gray-800/30 rounded-xl p-4">{selectedLead.currentChallenges}</p>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-700/30">
                <button
                  onClick={() => handleStatusUpdate(selectedLead._id, 'contacted')}
                  className="px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 transition-all font-bold"
                >
                  Marcar como Contatado
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedLead._id, 'qualified')}
                  className="px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-all font-bold"
                >
                  Qualificar Lead
                </button>
                <button className="px-6 py-3 rounded-xl bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-all font-bold">
                  Enviar Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Exportar Leads</h3>
              <p className="text-gray-400">
                Exportando {pagination.total} leads {selectedStatus !== 'all' ? `(${statusOptionsWithCounts.find(s => s.value === selectedStatus)?.label})` : ''}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {['CSV', 'Excel', 'PDF'].map((format) => (
                <button
                  key={format}
                  onClick={() => handleExport(format)}
                  disabled={isExporting}
                  className="w-full p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl text-left transition-all duration-300 hover:border-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{format}</div>
                      <div className="text-sm text-gray-400">
                        {format === 'CSV' ? 'Dados para planilhas' : 
                         format === 'Excel' ? 'Planilha formatada' : 
                         'Relatório visual'}
                      </div>
                    </div>
                    {isExporting ? (
                      <RefreshCw className="h-5 w-5 text-primary-400 animate-spin" />
                    ) : (
                      <Download className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                disabled={isExporting}
                className="flex-1 px-4 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-bold hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;