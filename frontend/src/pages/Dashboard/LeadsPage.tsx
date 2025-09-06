import { useState, useEffect } from 'react';
import { leadService } from '@/services/leadService';
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
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
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

  const loadLeads = async () => {
    try {
      setIsLoading(true);
      const params = {
        page: currentPage,
        limit: 25,
        ...(selectedStatus !== 'all' && { status: selectedStatus }),
        ...(selectedSector !== 'all' && { sector: selectedSector })
      };
      
      // Mock data for demonstration
      const mockLeads: Lead[] = Array.from({ length: 25 }, (_, i) => ({
        _id: `lead_${i + 1}`,
        fullName: ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Lima'][i % 5],
        email: `lead${i + 1}@company.com`,
        company: ['TechCorp', 'InovaSoft', 'DataMax', 'CloudSys', 'AI Solutions'][i % 5],
        role: ['CEO', 'CTO', 'CMO', 'Diretor', 'Gerente'][i % 5],
        companySector: ['saas', 'fintech', 'ecommerce', 'startup', 'consulting'][i % 5],
        teamSize: ['1-5', '6-15', '16-50', '51+'][i % 4],
        monthlyLeads: ['<100', '100-500', '500-1000', '1000+'][i % 4],
        budget: ['<5k', '5k-15k', '15k-30k', '30k+'][i % 4],
        currentChallenges: 'Precisa melhorar a qualidade dos leads e aumentar conversão',
        timeline: ['immediate', '30days', '90days', 'planning'][i % 4],
        gdprConsent: true,
        marketingConsent: Math.random() > 0.5,
        status: ['new', 'contacted', 'qualified', 'demo_scheduled', 'proposal_sent', 'closed_won', 'closed_lost'][i % 7] as any,
        score: Math.floor(Math.random() * 100),
        source: ['Google Ads', 'Facebook Ads', 'LinkedIn', 'Website', 'Referral'][i % 5],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      }));

      setLeads(mockLeads);
      setPagination({
        page: currentPage,
        pages: 10,
        total: 247,
        limit: 25
      });
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [currentPage, selectedStatus, selectedSector]);

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
            {pagination.total.toLocaleString()} leads • {statusOptions.find(s => s.value === 'new')?.count} novos hoje
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
          
          <button className="p-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/40 text-primary-300 hover:from-primary-500/30 hover:to-secondary-500/30 transition-all duration-300 hover:scale-105">
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
        {statusOptions.filter(status => status.value !== 'all').map((status, index) => (
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
                Leads ({filteredLeads.length})
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
                  filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-800/30 transition-all duration-200">
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
                          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200">
                            <MoreVertical className="h-4 w-4" />
                          </button>
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
    </div>
  );
};

export default LeadsPage;