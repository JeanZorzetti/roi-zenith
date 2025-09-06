import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { documentationSections, apiEndpoints } from '@/data/documentation';
import type { DocSection, APIEndpoint } from '@/data/documentation';
import { ArrowLeft, Copy, Check, ExternalLink, ChevronRight, Code, Play } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const DocPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<DocSection | null>(null);
  const [relatedDocs, setRelatedDocs] = useState<DocSection[]>([]);
  const [copiedCode, setCopiedCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('curl');

  useEffect(() => {
    const foundDoc = documentationSections.find(d => d.slug === slug);
    if (foundDoc) {
      setDoc(foundDoc);
      
      // Find related docs (same category or similar tags)
      const related = documentationSections
        .filter(d => d.slug !== foundDoc.slug)
        .filter(d => 
          d.category === foundDoc.category || 
          d.tags.some(tag => foundDoc.tags.includes(tag))
        )
        .slice(0, 3);
      
      setRelatedDocs(related);
    }
  }, [slug]);

  if (!doc) {
    return (
      <div className="min-h-screen pt-20 bg-pure-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-pure-white mb-4">Documentação não encontrada</h1>
          <Button 
            onClick={() => navigate('/resources/docs')}
            className="bg-primary-600 hover:bg-primary-700 text-pure-white font-light"
          >
            Voltar à Documentação
          </Button>
        </div>
      </div>
    );
  }

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

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const CodeBlock = ({ children, language }: { children: string; language?: string }) => (
    <div className="relative group">
      <div className="flex items-center justify-between bg-gray-900/80 border border-gray-700/50 rounded-t-lg px-4 py-2">
        <span className="text-sm text-gray-400 font-mono">{language || 'code'}</span>
        <button
          onClick={() => copyToClipboard(children, `${language}-${children.substring(0, 10)}`)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-pure-white"
        >
          {copiedCode === `${language}-${children.substring(0, 10)}` ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <pre className="bg-gray-900/50 border border-t-0 border-gray-700/50 rounded-b-lg p-4 overflow-x-auto">
        <code className={`text-gray-300 font-mono text-sm ${language === 'json' ? 'language-json' : ''}`}>
          {children}
        </code>
      </pre>
    </div>
  );

  const APIEndpointCard = ({ endpoint }: { endpoint: APIEndpoint }) => (
    <div className="bg-gray-900/30 border border-gray-700/50 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Badge className={`${
          endpoint.method === 'GET' ? 'bg-green-600/20 text-green-400 border-green-600/30' :
          endpoint.method === 'POST' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
          endpoint.method === 'PUT' ? 'bg-orange-600/20 text-orange-400 border-orange-600/30' :
          'bg-red-600/20 text-red-400 border-red-600/30'
        } font-mono font-medium`}>
          {endpoint.method}
        </Badge>
        <code className="text-primary-400 font-mono text-lg">{endpoint.endpoint}</code>
      </div>
      
      <h4 className="text-xl font-light text-pure-white mb-2">{endpoint.title}</h4>
      <p className="text-gray-400 font-light mb-4">{endpoint.description}</p>
      
      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <div className="mb-4">
          <h5 className="text-lg font-light text-pure-white mb-3">Parâmetros</h5>
          <div className="space-y-2">
            {endpoint.parameters.map((param) => (
              <div key={param.name} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg">
                <div className="flex-shrink-0">
                  <code className="text-primary-400 font-mono text-sm">{param.name}</code>
                  {param.required && <span className="text-red-400 ml-1">*</span>}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">
                    <Badge variant="outline" className="text-xs mr-2">{param.type}</Badge>
                    {param.description}
                  </div>
                  {param.example && (
                    <code className="text-xs text-gray-500 font-mono">Example: {JSON.stringify(param.example)}</code>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {endpoint.examples && endpoint.examples.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-3">
            <h5 className="text-lg font-light text-pure-white">Exemplos</h5>
            <div className="flex gap-2">
              {endpoint.examples.map((example) => (
                <button
                  key={example.language}
                  onClick={() => setSelectedLanguage(example.language)}
                  className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                    selectedLanguage === example.language
                      ? 'bg-primary-600 text-pure-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-pure-white'
                  }`}
                >
                  {example.language}
                </button>
              ))}
            </div>
          </div>
          
          {endpoint.examples
            .filter(example => example.language === selectedLanguage)
            .map((example, index) => (
              <CodeBlock key={index} language={example.language}>
                {example.code}
              </CodeBlock>
            ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-pure-black">
      <div className="pt-20">
        <AnimatedSection className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <button 
              onClick={() => navigate('/resources')}
              className="hover:text-primary-400 transition-colors"
            >
              Recursos
            </button>
            <ChevronRight className="w-4 h-4" />
            <button 
              onClick={() => navigate('/resources/docs')}
              className="hover:text-primary-400 transition-colors"
            >
              Documentação
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-500">{doc.title}</span>
          </nav>

          {/* Back Button */}
          <Button
            onClick={() => navigate('/resources/docs')}
            variant="ghost"
            className="text-gray-400 hover:text-pure-white mb-8 p-0 font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à Documentação
          </Button>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <Badge className={`${getCategoryColor(doc.category)} font-light mb-4`}>
                {doc.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-light text-pure-white mb-6 leading-tight">
                {doc.title}
              </h1>

              <div className="flex items-center justify-between py-4 border-y border-gray-800/50">
                <span className="text-gray-400 text-sm font-light">
                  Última atualização: {new Date(doc.lastUpdated).toLocaleDateString('pt-BR')}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 font-light"
                  onClick={() => navigate('/contact', {
                    state: {
                      subject: `Dúvida sobre: ${doc.title}`,
                      message: `Olá! Estou lendo a documentação "${doc.title}" e tenho algumas dúvidas. Podem me ajudar?`
                    }
                  })}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Suporte
                </Button>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-light text-pure-white mb-6 mt-12 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-light text-pure-white mb-4 mt-10">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-light text-pure-white mb-4 mt-8">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-300 font-light leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="text-gray-300 font-light leading-relaxed mb-6 pl-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="text-gray-300 font-light leading-relaxed mb-6 pl-6 space-y-2">
                      {children}
                    </ol>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full border-collapse border border-gray-700/50">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-gray-700/50 bg-gray-800/50 px-4 py-2 text-left text-pure-white font-medium">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-gray-700/50 px-4 py-2 text-gray-300">
                      {children}
                    </td>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      const language = className?.replace('language-', '') || 'code';
                      return <CodeBlock language={language}>{children as string}</CodeBlock>;
                    }
                    return (
                      <code className="bg-gray-800/50 text-primary-400 px-2 py-1 rounded font-mono text-sm">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => children,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary-600 pl-6 my-6 italic text-gray-400">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {doc.content}
              </ReactMarkdown>
            </div>

            {/* API Endpoints for API Reference pages */}
            {doc.category === 'API Reference' && (
              <section className="mb-12">
                <h2 className="text-3xl font-light text-pure-white mb-8">Endpoints</h2>
                {apiEndpoints
                  .filter(endpoint => endpoint.endpoint.includes('leads') && doc.slug.includes('leads'))
                  .map((endpoint) => (
                    <APIEndpointCard key={endpoint.id} endpoint={endpoint} />
                  ))}
              </section>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-gray-800/50">
              <span className="text-gray-400 font-light mr-2">Tags:</span>
              {doc.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="border-gray-600/50 text-gray-300 bg-gray-800/30 font-light"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-primary-900/20 to-secondary-900/10 border border-primary-500/30 rounded-2xl p-8 mb-12">
              <div className="text-center">
                <Code className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-2xl font-light text-pure-white mb-4">
                  Precisa de ajuda com a implementação?
                </h3>
                <p className="text-gray-300 font-light mb-6 max-w-2xl mx-auto">
                  Nossa equipe técnica pode ajudar com integração, debugging e otimização da sua implementação.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/contact', { 
                      state: { 
                        subject: `Suporte Técnico: ${doc.title}`,
                        message: `Olá! Preciso de ajuda técnica com "${doc.title}". Podem me dar suporte na implementação?`
                      } 
                    })}
                    className="bg-primary-600 hover:bg-primary-700 text-pure-white font-light px-8 py-3"
                  >
                    Falar com Especialista
                  </Button>
                  <Button
                    onClick={() => navigate('/calculator')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 font-light px-8 py-3"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Testar ROI
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Documentation */}
          {relatedDocs.length > 0 && (
            <section className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-light text-pure-white mb-8">Documentação Relacionada</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedDocs.map((relatedDoc) => (
                  <article
                    key={relatedDoc.id}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                    onClick={() => navigate(`/resources/docs/${relatedDoc.slug}`)}
                  >
                    <div className="p-6">
                      <Badge className={`${getCategoryColor(relatedDoc.category)} font-light mb-4`}>
                        {relatedDoc.category}
                      </Badge>
                      <h3 className="text-lg font-light text-pure-white mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors">
                        {relatedDoc.title}
                      </h3>
                      <p className="text-gray-400 font-light text-sm line-clamp-3 mb-4">
                        {relatedDoc.content.split('\n\n')[1]?.substring(0, 120) || 'Documentação técnica detalhada...'}...
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex gap-1">
                          {relatedDoc.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="bg-gray-800/50 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DocPage;