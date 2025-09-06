import { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Target,
  DollarSign,
  Clock,
  Mail,
  Phone,
  MousePointer,
  Eye,
  Share,
  Filter,
  RefreshCw,
  Crown,
  Sparkles,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  type: 'performance' | 'conversion' | 'roi' | 'pipeline' | 'activity';
  description: string;
  dateRange: string;
  status: 'ready' | 'generating' | 'scheduled';
  lastGenerated: string;
  size: string;
  format: 'PDF' | 'Excel' | 'CSV';
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  data: {
    value: string;
    change: string;
    trend: 'up' | 'down';
  };
}

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const periodOptions = [
    { value: '7d', label: '7 dias' },
    { value: '30d', label: '30 dias' },
    { value: '90d', label: '90 dias' },
    { value: '1y', label: '1 ano' },
    { value: 'custom', label: 'Personalizado' }
  ];

  const reportTypes = [
    { value: 'all', label: 'Todos os Relatórios' },
    { value: 'performance', label: 'Performance' },
    { value: 'conversion', label: 'Conversão' },
    { value: 'roi', label: 'ROI' },
    { value: 'pipeline', label: 'Pipeline' },
    { value: 'activity', label: 'Atividade' }
  ];

  const reports: ReportData[] = [
    {
      id: 'performance-monthly',
      title: 'Relatório de Performance Mensal',
      type: 'performance',
      description: 'Análise completa das métricas de performance dos últimos 30 dias',
      dateRange: '01/11/2024 - 30/11/2024',
      status: 'ready',
      lastGenerated: '2024-11-30T15:30:00Z',
      size: '2.4 MB',
      format: 'PDF',
      icon: BarChart3,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/40',
      data: { value: '12,847', change: '+23.5%', trend: 'up' }
    },
    {
      id: 'conversion-analysis',
      title: 'Análise de Conversão',
      type: 'conversion',
      description: 'Taxa de conversão por canal e campanha com insights IA',
      dateRange: '01/11/2024 - 30/11/2024',
      status: 'ready',
      lastGenerated: '2024-11-30T14:15:00Z',
      size: '1.8 MB',
      format: 'Excel',
      icon: Target,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/40',
      data: { value: '18.4%', change: '+5.2%', trend: 'up' }
    },
    {
      id: 'roi-comprehensive',
      title: 'ROI Abrangente',
      type: 'roi',
      description: 'Retorno sobre investimento detalhado por campanha e período',
      dateRange: '01/10/2024 - 30/11/2024',
      status: 'generating',
      lastGenerated: '2024-11-29T18:45:00Z',
      size: '3.1 MB',
      format: 'PDF',
      icon: DollarSign,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/40',
      data: { value: '342%', change: '+15.8%', trend: 'up' }
    },
    {
      id: 'pipeline-weekly',
      title: 'Pipeline Semanal',
      type: 'pipeline',
      description: 'Status do pipeline de vendas com previsões IA',
      dateRange: '25/11/2024 - 30/11/2024',
      status: 'ready',
      lastGenerated: '2024-11-30T12:00:00Z',
      size: '892 KB',
      format: 'CSV',
      icon: LineChart,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/40',
      data: { value: '89', change: '-2.1%', trend: 'down' }
    },
    {
      id: 'activity-dashboard',
      title: 'Dashboard de Atividades',
      type: 'activity',
      description: 'Relatório de atividades de leads e engajamento',
      dateRange: '01/11/2024 - 30/11/2024',
      status: 'scheduled',
      lastGenerated: '2024-11-29T09:30:00Z',
      size: '1.2 MB',
      format: 'Excel',
      icon: Activity,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/40',
      data: { value: '1,247', change: '+8.3%', trend: 'up' }
    }
  ];

  const kpiMetrics = [
    {
      title: 'Leads Gerados',
      value: '12,847',
      change: '+23.5%',
      trend: 'up',
      icon: Users,
      period: 'últimos 30 dias'
    },
    {
      title: 'Taxa de Conversão',
      value: '18.4%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      period: 'média mensal'
    },
    {
      title: 'ROI Médio',
      value: '342%',
      change: '+15.8%',
      trend: 'up',
      icon: DollarSign,
      period: 'todas as campanhas'
    },
    {
      title: 'Tempo Médio de Ciclo',
      value: '14 dias',
      change: '-2.3 dias',
      trend: 'up',
      icon: Clock,
      period: 'lead → cliente'
    }
  ];

  const insights = [
    {
      type: 'success',
      title: 'Performance Excepcional',
      message: 'Google Ads superou a meta mensal em 28%. Considere aumentar o budget.',
      icon: CheckCircle,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      type: 'warning',
      title: 'Atenção Necessária',
      message: 'Taxa de conversão do LinkedIn Ads caiu 12%. Revisar targeting.',
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      type: 'info',
      title: 'Oportunidade Identificada',
      message: 'Leads de e-commerce têm 34% mais chance de conversão às quartas-feiras.',
      icon: Sparkles,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    }
  ];

  const generateReport = async (reportId: string) => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'ready': { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', icon: CheckCircle, label: 'Pronto' },
      'generating': { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40', icon: RefreshCw, label: 'Gerando' },
      'scheduled': { color: 'bg-blue-500/20 text-blue-400 border-blue-500/40', icon: Calendar, label: 'Agendado' }
    }[status];

    const Icon = statusConfig?.icon || CheckCircle;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border ${statusConfig?.color}`}>
        <Icon className={`h-3 w-3 ${status === 'generating' ? 'animate-spin' : ''}`} />
        {statusConfig?.label}
      </span>
    );
  };

  const filteredReports = selectedReportType === 'all' 
    ? reports 
    : reports.filter(report => report.type === selectedReportType);

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen bg-pure-black text-pure-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-primary-300 to-secondary-300 bg-clip-text text-transparent">
            Relatórios & Insights
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documentos e análises avançadas • Atualizado {currentTime.toLocaleTimeString('pt-BR')}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
          >
            {periodOptions.map(period => (
              <option key={period.value} value={period.value} className="bg-gray-800 text-white">
                {period.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => generateReport('new')}
            disabled={isGenerating}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-50"
          >
            <Plus className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            Novo Relatório
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          
          return (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/30 to-secondary-600/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold ${
                    metric.trend === 'up' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}>
                    <TrendIcon className="h-3 w-3" />
                    {metric.change}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">{metric.value}</h3>
                  <p className="text-sm text-gray-400">{metric.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={selectedReportType}
          onChange={(e) => setSelectedReportType(e.target.value)}
          className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
        >
          {reportTypes.map(type => (
            <option key={type.value} value={type.value} className="bg-gray-800 text-white">
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* AI Insights */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Insights IA</h3>
                <p className="text-sm text-gray-400">Análises automáticas dos seus dados</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/40">
              <Crown className="h-3 w-3 text-purple-400" />
              <span className="text-xs font-bold text-purple-300">Premium</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              
              return (
                <div key={index} className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${insight.bgColor} ${insight.borderColor}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`h-4 w-4 ${insight.color}`} />
                    <span className={`text-sm font-bold ${insight.color}`}>{insight.title}</span>
                  </div>
                  <p className="text-sm text-gray-300">{insight.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReports.map((report) => {
          const Icon = report.icon;
          
          return (
            <div key={report.id} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500 hover:scale-[1.02]">
                {/* Report Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl ${report.bgColor} border ${report.borderColor}`}>
                    <Icon className={`h-6 w-6 ${report.color}`} />
                  </div>
                  {getStatusBadge(report.status)}
                </div>

                {/* Report Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-black text-white mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{report.description}</p>
                  
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Período:</span>
                      <span className="text-gray-300">{report.dateRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Última atualização:</span>
                      <span className="text-gray-300">
                        {new Date(report.lastGenerated).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tamanho:</span>
                      <span className="text-gray-300">{report.size}</span>
                    </div>
                  </div>
                </div>

                {/* Report Data */}
                <div className="mb-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-black text-white">{report.data.value}</div>
                      <div className="text-sm text-gray-400">Métrica principal</div>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                      report.data.trend === 'up' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {report.data.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {report.data.change}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button 
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/40 text-primary-300 hover:from-primary-500/30 hover:to-secondary-500/30 transition-all duration-300 font-bold flex items-center justify-center gap-2"
                    disabled={report.status === 'generating'}
                  >
                    <Download className="h-4 w-4" />
                    {report.format}
                  </button>
                  <button className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300">
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 to-red-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-400" />
            Ações Rápidas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left hover:border-blue-500/40 transition-all duration-300 group/item">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                <span className="font-bold text-white">Relatório Personalizado</span>
              </div>
              <p className="text-sm text-gray-400">Crie relatórios sob medida para suas necessidades</p>
            </button>

            <button className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-left hover:border-emerald-500/40 transition-all duration-300 group/item">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-emerald-400" />
                <span className="font-bold text-white">Agendamento</span>
              </div>
              <p className="text-sm text-gray-400">Configure relatórios automáticos periódicos</p>
            </button>

            <button className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-left hover:border-purple-500/40 transition-all duration-300 group/item">
              <div className="flex items-center gap-3 mb-2">
                <Share className="h-5 w-5 text-purple-400" />
                <span className="font-bold text-white">Compartilhar</span>
              </div>
              <p className="text-sm text-gray-400">Compartilhe insights com sua equipe</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;