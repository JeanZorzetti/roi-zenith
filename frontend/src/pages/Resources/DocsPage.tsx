import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { documentationSections } from '@/data/documentation';
import { Search, Book, Code, Zap, Webhook, FileText, ExternalLink } from 'lucide-react';

const DocsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Getting Started', 'API Reference', 'Guides', 'SDKs', 'Webhooks'];

  const filteredSections = documentationSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || section.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Getting Started':
        return <Zap className="w-5 h-5" />;
      case 'API Reference':
        return <Code className="w-5 h-5" />;
      case 'Guides':
        return <Book className="w-5 h-5" />;
      case 'SDKs':
        return <FileText className="w-5 h-5" />;
      case 'Webhooks':
        return <Webhook className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Getting Started': 'bg-green-600/20 text-green-400 border-green-600/30',
      'API Reference': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'Guides': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
      'SDKs': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
      'Webhooks': 'bg-pink-600/20 text-pink-400 border-pink-600/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600/20 text-gray-400 border-gray-600/30';
  };

  const quickStartLinks = [
    {
      title: 'Primeira Requisição',
      description: 'Faça sua primeira chamada à API em menos de 5 minutos',
      href: '/resources/docs/getting-started',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-green-400'
    },
    {
      title: 'Autenticação',
      description: 'Configure tokens e permissões de acesso',
      href: '/resources/docs/authentication',
      icon: <Code className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    {
      title: 'API de Leads',
      description: 'Gerencie e qualifique leads programaticamente',
      href: '/resources/docs/leads-api',
      icon: <FileText className="w-6 h-6" />,
      color: 'text-purple-400'
    }
  ];

  const popularEndpoints = [
    { method: 'POST', endpoint: '/v1/leads', description: 'Criar novo lead' },
    { method: 'GET', endpoint: '/v1/leads/{id}', description: 'Buscar lead específico' },
    { method: 'POST', endpoint: '/v1/campaigns', description: 'Criar campanha' },
    { method: 'GET', endpoint: '/v1/analytics', description: 'Obter métricas' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-pure-black">
      <AnimatedSection className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light mb-6 bg-gradient-to-r from-pure-white via-primary-400 to-secondary-400 bg-clip-text text-transparent tracking-wide">
            Documentação
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            Guias completos, referência da API e exemplos práticos para integrar a ROI Labs em seus sistemas.
          </p>
        </div>

        {/* Quick Start Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-pure-white mb-8">Início Rápido</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickStartLinks.map((link) => (
              <div
                key={link.title}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                onClick={() => navigate(link.href)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${link.color} transition-colors group-hover:scale-110`}>
                    {link.icon}
                  </div>
                  <h3 className="text-xl font-light text-pure-white group-hover:text-primary-300 transition-colors">
                    {link.title}
                  </h3>
                </div>
                <p className="text-gray-400 font-light leading-relaxed">
                  {link.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-pure-white mb-8">Endpoints Populares</h2>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
            {popularEndpoints.map((endpoint, index) => (
              <div
                key={endpoint.endpoint}
                className={`p-6 ${index !== popularEndpoints.length - 1 ? 'border-b border-gray-700/50' : ''} hover:bg-gray-800/30 transition-colors cursor-pointer group`}
                onClick={() => navigate('/resources/docs/leads-api')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge 
                      className={`${
                        endpoint.method === 'GET' ? 'bg-green-600/20 text-green-400 border-green-600/30' :
                        endpoint.method === 'POST' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
                        endpoint.method === 'PUT' ? 'bg-orange-600/20 text-orange-400 border-orange-600/30' :
                        'bg-red-600/20 text-red-400 border-red-600/30'
                      } font-mono font-medium px-3`}
                    >
                      {endpoint.method}
                    </Badge>
                    <code className="text-primary-400 font-mono group-hover:text-primary-300 transition-colors">
                      {endpoint.endpoint}
                    </code>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="font-light">{endpoint.description}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar na documentação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-900/50 border-gray-700/50 text-pure-white placeholder:text-gray-500 rounded-xl py-4 font-light focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-pure-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {category !== 'All' && getCategoryIcon(category)}
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-light text-pure-white">
              {searchTerm || selectedCategory !== 'All' ? 'Resultados' : 'Toda a Documentação'}
            </h2>
            <span className="text-gray-400 font-light">
              {filteredSections.length} {filteredSections.length === 1 ? 'seção' : 'seções'}
            </span>
          </div>
          
          {filteredSections.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-light mb-2">
                Nenhuma documentação encontrada para "{searchTerm}"
              </p>
              <p className="text-gray-500 font-light">
                Tente termos diferentes ou browse pelas categorias
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="text-primary-400 hover:text-primary-300 mt-4 font-light"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredSections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                <article
                  key={section.id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                  onClick={() => navigate(`/resources/docs/${section.slug}`)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
                        {getCategoryIcon(section.category)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-light text-pure-white mb-2 group-hover:text-primary-300 transition-colors">
                          {section.title}
                        </h3>
                        <Badge className={`${getCategoryColor(section.category)} font-light`}>
                          {section.category}
                        </Badge>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <p className="text-gray-400 font-light leading-relaxed mb-6">
                    {section.content.split('\n\n')[1]?.substring(0, 200) || 'Documentação técnica detalhada...'}...
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {section.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline"
                          className="border-gray-600/50 text-gray-400 bg-gray-800/30 font-light text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-light">
                      Atualizado em {new Date(section.lastUpdated).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </AnimatedSection>
    </div>
  );
};

export default DocsPage;