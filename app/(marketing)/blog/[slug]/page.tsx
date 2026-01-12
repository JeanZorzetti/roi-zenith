import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { FadeIn, RevealOnScroll } from '@/components/animations';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

// This would be generated dynamically based on your blog posts
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Post do Blog | ROI Labs',
    description: 'Artigo sobre gestão empresarial e tecnologia.',
  };
}

export default function BlogPostPage() {
  // Mock data - In production, this would come from a CMS or database based on slug
  const post = {
    title: 'Como Escolher o CRM Ideal para Sua Empresa em 2026',
    excerpt:
      'Descubra os critérios essenciais para selecionar a ferramenta de CRM perfeita para o tamanho e necessidades do seu negócio.',
    category: 'CRM',
    date: '12 de Janeiro de 2026',
    readTime: '8 min de leitura',
    author: {
      name: 'Ana Silva',
      role: 'Product Marketing Manager',
      avatar: undefined,
    },
    coverImage: undefined,
  };

  const content = `
A escolha de um CRM (Customer Relationship Management) é uma decisão estratégica que pode transformar completamente a forma como sua empresa se relaciona com clientes e prospects. Com tantas opções no mercado, é fundamental entender quais critérios considerar antes de tomar essa decisão.

## Por que sua empresa precisa de um CRM?

Antes de escolher uma ferramenta, é importante entender os benefícios que um CRM pode trazer:

- **Centralização de informações**: Todos os dados de clientes em um único lugar
- **Histórico completo**: Visualize todas as interações com cada cliente
- **Automação de processos**: Economize tempo em tarefas repetitivas
- **Previsibilidade de vendas**: Tenha visibilidade clara do pipeline
- **Melhoria no atendimento**: Ofereça experiências personalizadas

## Critérios essenciais para escolher seu CRM

### 1. Tamanho da sua empresa e equipe

O CRM ideal varia conforme o porte da sua operação. Startups e PMEs geralmente precisam de soluções ágeis e fáceis de implementar, enquanto grandes empresas necessitam de sistemas mais robustos e customizáveis.

### 2. Facilidade de uso

Um CRM complexo pode gerar resistência da equipe. Priorize ferramentas com interface intuitiva e curva de aprendizado rápida. A adoção pelo time é crucial para o sucesso.

### 3. Integrações disponíveis

Verifique se o CRM se integra com as ferramentas que você já usa: email, calendário, plataformas de marketing, sistemas de pagamento, etc. Quanto mais integrado, maior a eficiência.

### 4. Custo x Benefício

Considere não apenas o preço mensal, mas também:
- Custos de implementação
- Tempo de setup
- Necessidade de treinamento
- ROI esperado

### 5. Suporte e treinamento

Um bom fornecedor oferece suporte rápido e materiais de treinamento completos. Isso acelera a implementação e garante que sua equipe aproveite todos os recursos.

## Próximos passos

Agora que você conhece os critérios principais, o próximo passo é:

1. Listar suas necessidades específicas
2. Testar as principais opções do mercado (a maioria oferece trials gratuitos)
3. Envolver a equipe no processo de decisão
4. Verificar cases de sucesso de empresas similares à sua
5. Tomar a decisão baseada em dados, não em marketing

## Conclusão

A escolha do CRM certo pode ser um divisor de águas para sua empresa. Invista tempo nessa decisão e lembre-se: o melhor CRM é aquele que sua equipe realmente vai usar.

Quer conhecer uma solução pensada especialmente para PMEs brasileiras? **Conheça o Sirius CRM** e teste gratuitamente por 14 dias.
  `;

  const relatedPosts = [
    {
      title: '10 Métricas Essenciais para Acompanhar no seu CRM',
      slug: '10-metricas-essenciais-crm',
      category: 'CRM',
    },
    {
      title: 'Automação de Marketing para PMEs: Guia Completo',
      slug: 'automacao-marketing-pmes',
      category: 'Marketing',
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      {/* Back to Blog */}
      <section className="pt-32 pb-8 px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-pure-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <article className="pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.2}>
            <Badge className="mb-4 bg-primary-600">{post.category}</Badge>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h1 className="text-4xl md:text-5xl font-thin mb-6 leading-tight">{post.title}</h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-xl text-text-secondary mb-8">{post.excerpt}</p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/10 mb-12">
              {/* Author */}
              <div className="flex items-center gap-3">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-lg text-primary-400 font-medium">
                    {post.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-pure-white">{post.author.name}</div>
                  <div className="text-xs text-text-muted">{post.author.role}</div>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Share */}
              <button className="ml-auto flex items-center gap-2 text-sm text-text-secondary hover:text-pure-white transition-colors">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
            </div>
          </FadeIn>

          {/* Cover Image (optional) */}
          {post.coverImage && (
            <FadeIn delay={0.6}>
              <div className="relative aspect-video mb-12 rounded-xl overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          )}

          {/* Content */}
          <FadeIn delay={0.7}>
            <div className="prose prose-invert prose-lg max-w-none">
              {content.split('\n').map((paragraph, index) => {
                // Simple markdown parsing
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-3xl font-light mt-12 mb-6">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-2xl font-light mt-8 mb-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="text-text-secondary leading-relaxed ml-6">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                }
                if (paragraph.includes('**')) {
                  const parts = paragraph.split('**');
                  return (
                    <p key={index} className="text-text-secondary leading-relaxed mb-4">
                      {parts.map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </p>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-text-secondary leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </FadeIn>

          {/* CTA */}
          <RevealOnScroll delay={0.2}>
            <div className="glass-card p-8 mt-16 text-center">
              <h3 className="text-2xl font-light mb-4">Gostou deste conteúdo?</h3>
              <p className="text-text-secondary mb-6">
                Conheça o Sirius CRM e transforme seu relacionamento com clientes
              </p>
              <Link
                href="/sirius-crm"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg transition-all"
              >
                Testar grátis por 14 dias
              </Link>
            </div>
          </RevealOnScroll>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <RevealOnScroll>
                <h3 className="text-2xl font-light mb-8">Artigos Relacionados</h3>
              </RevealOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <RevealOnScroll key={index} delay={0.1 * index}>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="glass-card p-6 hover:bg-white/5 transition-all group"
                    >
                      <Badge className="mb-3 bg-primary-600/20 text-primary-400 border-primary-400/30">
                        {relatedPost.category}
                      </Badge>
                      <h4 className="text-lg font-medium group-hover:text-primary-400 transition-colors">
                        {relatedPost.title}
                      </h4>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
