import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { FadeIn, RevealOnScroll } from '@/components/animations';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Blog - Insights sobre Gestão Empresarial | ROI Labs',
  description:
    'Artigos, tutoriais e insights sobre CRM, ERP, Marketing Digital e gestão empresarial para PMEs brasileiras.',
};

export default function BlogPage() {
  // Mock data - In production, this would come from a CMS or database
  const featuredPost = {
    slug: 'como-escolher-crm-ideal',
    title: 'Como Escolher o CRM Ideal para Sua Empresa em 2026',
    excerpt:
      'Descubra os critérios essenciais para selecionar a ferramenta de CRM perfeita para o tamanho e necessidades do seu negócio.',
    category: 'CRM',
    date: '12 Jan 2026',
    readTime: '8 min',
    author: {
      name: 'Ana Silva',
      avatar: undefined,
    },
    coverImage: undefined,
  };

  const posts = [
    {
      slug: '10-metricas-essenciais-crm',
      title: '10 Métricas Essenciais para Acompanhar no seu CRM',
      excerpt:
        'Aprenda quais indicadores realmente importam para medir o sucesso do seu time comercial e melhorar resultados.',
      category: 'CRM',
      date: '10 Jan 2026',
      readTime: '6 min',
      author: {
        name: 'Carlos Mendes',
      },
    },
    {
      slug: 'erp-vs-planilhas',
      title: 'ERP vs Planilhas: Quando é Hora de Fazer a Migração?',
      excerpt:
        '5 sinais claros de que sua empresa cresceu demais para planilhas e precisa de um sistema de gestão integrado.',
      category: 'ERP',
      date: '08 Jan 2026',
      readTime: '7 min',
      author: {
        name: 'Fernanda Costa',
      },
    },
    {
      slug: 'automacao-marketing-pmes',
      title: 'Automação de Marketing para PMEs: Guia Completo',
      excerpt:
        'Como pequenas e médias empresas podem usar automação para competir com grandes players do mercado.',
      category: 'Marketing',
      date: '05 Jan 2026',
      readTime: '10 min',
      author: {
        name: 'Ricardo Oliveira',
      },
    },
    {
      slug: 'roi-software-gestao',
      title: 'Como Calcular o ROI de um Software de Gestão',
      excerpt:
        'Metodologia completa para justificar o investimento em CRM ou ERP e demonstrar retorno para a diretoria.',
      category: 'Gestão',
      date: '03 Jan 2026',
      readTime: '9 min',
      author: {
        name: 'João Santos',
      },
    },
    {
      slug: 'integracao-crm-erp',
      title: 'Integração CRM + ERP: O Poder do Ecossistema Unificado',
      excerpt:
        'Entenda como a integração entre CRM e ERP elimina retrabalho e aumenta a eficiência operacional em até 60%.',
      category: 'Integração',
      date: '01 Jan 2026',
      readTime: '8 min',
      author: {
        name: 'Ana Silva',
      },
    },
    {
      slug: 'lgpd-dados-clientes',
      title: 'LGPD e Gestão de Dados de Clientes: Checklist Completo',
      excerpt:
        'Garanta que seu CRM está em conformidade com a Lei Geral de Proteção de Dados com este guia prático.',
      category: 'Compliance',
      date: '28 Dez 2025',
      readTime: '11 min',
      author: {
        name: 'Mariana Lima',
      },
    },
    {
      slug: 'transformacao-digital-pmes',
      title: 'Transformação Digital para PMEs: Por Onde Começar?',
      excerpt:
        'Guia prático para iniciar a jornada de transformação digital na sua empresa sem grandes investimentos iniciais.',
      category: 'Gestão',
      date: '26 Dez 2025',
      readTime: '9 min',
      author: {
        name: 'Pedro Almeida',
      },
    },
    {
      slug: 'kpis-vendas-b2b',
      title: '15 KPIs de Vendas B2B que Todo Gestor Deve Acompanhar',
      excerpt:
        'Descubra os indicadores-chave que realmente impactam a performance do seu time comercial e como monitorá-los.',
      category: 'CRM',
      date: '24 Dez 2025',
      readTime: '12 min',
      author: {
        name: 'Carlos Mendes',
      },
    },
    {
      slug: 'onboarding-clientes-sucesso',
      title: 'Onboarding de Clientes: Como Garantir 90% de Retenção',
      excerpt:
        'Estratégias comprovadas para criar um processo de onboarding que transforma novos clientes em fãs da sua marca.',
      category: 'CRM',
      date: '22 Dez 2025',
      readTime: '8 min',
      author: {
        name: 'Ana Silva',
      },
    },
    {
      slug: 'gestao-estoque-erp',
      title: 'Gestão de Estoque: Como o ERP Reduz Perdas em 40%',
      excerpt:
        'Técnicas e funcionalidades do ERP que eliminam rupturas, reduzem custos de armazenagem e otimizam o capital de giro.',
      category: 'ERP',
      date: '20 Dez 2025',
      readTime: '10 min',
      author: {
        name: 'Fernanda Costa',
      },
    },
    {
      slug: 'funil-vendas-otimizado',
      title: 'Como Criar um Funil de Vendas de Alta Conversão',
      excerpt:
        'Metodologia passo a passo para desenhar, implementar e otimizar um funil de vendas que realmente converte.',
      category: 'Marketing',
      date: '18 Dez 2025',
      readTime: '14 min',
      author: {
        name: 'Ricardo Oliveira',
      },
    },
    {
      slug: 'email-marketing-segmentacao',
      title: 'Segmentação Avançada em Email Marketing: Guia 2026',
      excerpt:
        'Aprenda a segmentar sua base de contatos para aumentar open rate, CTR e conversões em campanhas de email.',
      category: 'Marketing',
      date: '16 Dez 2025',
      readTime: '7 min',
      author: {
        name: 'Ricardo Oliveira',
      },
    },
    {
      slug: 'dashboard-gerencial-kpis',
      title: 'Dashboard Gerencial: Visualize Seus KPIs em Tempo Real',
      excerpt:
        'Como construir dashboards eficazes que dão visibilidade total sobre a saúde do seu negócio em um único lugar.',
      category: 'Gestão',
      date: '14 Dez 2025',
      readTime: '9 min',
      author: {
        name: 'João Santos',
      },
    },
  ];

  const categories = ['Todos', 'CRM', 'ERP', 'Marketing', 'Gestão', 'Integração', 'Compliance'];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-8 bg-gradient-to-b from-pure-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-6xl font-thin mb-6">Blog ROI Labs</h1>
            <p className="text-xl text-text-secondary max-w-2xl">
              Insights, tutoriais e boas práticas sobre gestão empresarial, CRM, ERP e marketing
              digital para PMEs brasileiras.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-8 bg-gray-950 sticky top-0 z-40 border-b border-white/10 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`cursor-pointer whitespace-nowrap ${
                  index === 0
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'hover:bg-white/5'
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="mb-8">
              <h2 className="text-2xl font-light mb-2">Post em Destaque</h2>
              <div className="h-px bg-gradient-to-r from-primary-500 to-transparent" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BlogPostCard {...featuredPost} />
              <div className="flex flex-col justify-center">
                <Badge className="mb-4 bg-primary-600 w-fit">{featuredPost.category}</Badge>
                <h2 className="text-3xl md:text-4xl font-light mb-4">{featuredPost.title}</h2>
                <p className="text-text-secondary mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                  <span>•</span>
                  <span>{featuredPost.author.name}</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-8 bg-pure-black">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="mb-12">
              <h2 className="text-2xl font-light mb-2">Artigos Recentes</h2>
              <div className="h-px bg-gradient-to-r from-primary-500 to-transparent" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <RevealOnScroll key={post.slug} delay={0.1 * index}>
                <BlogPostCard {...post} />
              </RevealOnScroll>
            ))}
          </div>

          {/* Load More */}
          <RevealOnScroll delay={0.5}>
            <div className="text-center mt-12">
              <button className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-pure-white px-8 py-3 rounded-lg text-sm font-light tracking-wide transition-all border border-white/10 hover:border-white/20">
                Carregar mais artigos
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
