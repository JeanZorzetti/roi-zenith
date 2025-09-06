import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';
import { whitepapers, whitepapersCategories, searchWhitepapers, getFeaturedWhitepapers } from '@/data/whitepapers';
import type { Whitepaper } from '@/data/whitepapers';
import { downloadWhitepaper } from '@/utils/pdfGenerator';
import { Download, FileText, Calendar, Users, Tag, ExternalLink } from 'lucide-react';

const WhitepapersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredWhitepapers, setFilteredWhitepapers] = useState<Whitepaper[]>(whitepapers);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredWhitepapers(selectedCategory 
        ? whitepapers.filter(wp => wp.category === selectedCategory)
        : whitepapers
      );
    } else {
      const results = searchWhitepapers(query);
      setFilteredWhitepapers(selectedCategory 
        ? results.filter(wp => wp.category === selectedCategory)
        : results
      );
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    const baseResults = searchQuery.trim() === '' ? whitepapers : searchWhitepapers(searchQuery);
    setFilteredWhitepapers(category === '' ? baseResults : baseResults.filter(wp => wp.category === category));
  };

  const handleDownload = (whitepaper: Whitepaper) => {
    // Generate and download the real PDF
    downloadWhitepaper(whitepaper);
  };

  const featuredWhitepapers = getFeaturedWhitepapers();

  return (
    <div className="min-h-screen pt-20">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Whitepapers
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estudos aprofundados, pesquisas e análises sobre ROI em IA, transformação digital e melhores práticas em vendas.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar whitepapers..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
              />
              <FileText className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => handleCategoryFilter('')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              Todos
            </button>
            {whitepapersCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Whitepapers */}
        {!selectedCategory && !searchQuery && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Em Destaque
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredWhitepapers.map((whitepaper) => (
                <div key={whitepaper.id} className="bg-gradient-to-br from-primary-900/20 to-secondary-900/20 backdrop-blur-sm border border-primary-500/30 rounded-lg p-6 hover:border-primary-400/50 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-primary-600/20 text-primary-300 text-xs px-3 py-1 rounded-full border border-primary-500/30">
                      {whitepaper.category}
                    </span>
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                      DESTAQUE
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-300 transition-colors">
                    {whitepaper.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {whitepaper.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(whitepaper.publishDate).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {whitepaper.pages} páginas
                      </div>
                    </div>
                    <span className="text-primary-400">{whitepaper.fileSize}</span>
                  </div>

                  <button
                    onClick={() => handleDownload(whitepaper)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group-hover:bg-primary-500"
                  >
                    <Download className="w-4 h-4" />
                    Download Gratuito
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Whitepapers */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            {selectedCategory || searchQuery ? 'Resultados' : 'Todos os Whitepapers'}
          </h2>
          
          {filteredWhitepapers.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Nenhum whitepaper encontrado</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredWhitepapers.map((whitepaper) => (
                <div key={whitepaper.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                            {whitepaper.category}
                          </span>
                          {whitepaper.featured && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                              DESTAQUE
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-white hover:text-primary-300 transition-colors cursor-pointer">
                        {whitepaper.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-4">
                        {whitepaper.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {whitepaper.authors.join(', ')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(whitepaper.publishDate).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {whitepaper.pages} páginas
                        </div>
                        <span className="text-primary-400">{whitepaper.fileSize}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {whitepaper.tags.map((tag) => (
                          <span key={tag} className="bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:w-48">
                      <button
                        onClick={() => handleDownload(whitepaper)}
                        className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      
                      {whitepaper.previewUrl && (
                        <button
                          onClick={() => navigate(whitepaper.previewUrl)}
                          className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Preview
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-900/30 to-secondary-900/30 backdrop-blur-sm border border-primary-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Quer mais conteúdos exclusivos?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Cadastre-se em nossa newsletter para receber os novos whitepapers em primeira mão e conteúdos exclusivos sobre ROI em IA.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              Quero me cadastrar
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default WhitepapersPage;