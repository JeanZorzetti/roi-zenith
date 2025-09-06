export interface Whitepaper {
  id: string;
  title: string;
  description: string;
  abstract: string;
  category: string;
  tags: string[];
  authors: string[];
  publishDate: string;
  pages: number;
  downloadUrl: string;
  previewUrl?: string;
  coverImage: string;
  fileSize: string;
  language: string;
  featured: boolean;
}

export const whitepapersCategories = [
  'ROI & Métricas',
  'Inteligência Artificial',
  'Vendas & Marketing',
  'Transformação Digital',
  'Cases de Sucesso',
  'Tendências & Futuro'
];

export const whitepapers: Whitepaper[] = [
  {
    id: 'roi-ia-vendas-2024',
    title: 'ROI em IA para Vendas: Guia Definitivo 2024',
    description: 'Análise completa sobre retorno de investimento em soluções de inteligência artificial para equipes de vendas.',
    abstract: 'Este whitepaper apresenta uma análise detalhada dos investimentos em IA para vendas, incluindo metodologias de cálculo de ROI, benchmarks do mercado, cases reais de implementação e projeções para 2024-2025. Baseado em dados de mais de 500 empresas que implementaram soluções de IA em seus processos de vendas.',
    category: 'ROI & Métricas',
    tags: ['ROI', 'Vendas', 'IA', 'Métricas', 'Benchmarks'],
    authors: ['Dr. Carlos Silva', 'Ana Beatriz Santos'],
    publishDate: '2024-01-15',
    pages: 42,
    downloadUrl: '/downloads/roi-ia-vendas-2024.pdf',
    previewUrl: '/previews/roi-ia-vendas-2024',
    coverImage: '/images/whitepapers/roi-ia-vendas-cover.jpg',
    fileSize: '3.2 MB',
    language: 'Português',
    featured: true
  },
  {
    id: 'futuro-sdr-automatizado',
    title: 'O Futuro do SDR: Automação vs. Toque Humano',
    description: 'Estudo sobre o equilíbrio ideal entre automação e interação humana em processos de prospecção.',
    abstract: 'Uma análise profunda sobre como a automação está transformando o papel dos SDRs, identificando quais atividades devem ser automatizadas e quais requerem toque humano. Inclui frameworks de decisão, métricas de performance e roadmap de implementação.',
    category: 'Inteligência Artificial',
    tags: ['SDR', 'Automação', 'Prospecção', 'IA', 'Produtividade'],
    authors: ['Prof. Marina Costa', 'Roberto Fernandes'],
    publishDate: '2024-02-10',
    pages: 38,
    downloadUrl: '/downloads/futuro-sdr-automatizado.pdf',
    coverImage: '/images/whitepapers/futuro-sdr-cover.jpg',
    fileSize: '2.8 MB',
    language: 'Português',
    featured: true
  },
  {
    id: 'transformacao-digital-vendas',
    title: 'Transformação Digital em Vendas: Framework Completo',
    description: 'Metodologia estruturada para implementar transformação digital em departamentos de vendas.',
    abstract: 'Framework completo para líderes de vendas implementarem transformação digital de forma estruturada e mensurável. Inclui assessment inicial, roadmap de implementação, KPIs essenciais e metodologias de change management específicas para equipes comerciais.',
    category: 'Transformação Digital',
    tags: ['Transformação Digital', 'Vendas', 'Framework', 'Change Management', 'KPIs'],
    authors: ['Dr. Eduardo Mendes', 'Juliana Oliveira'],
    publishDate: '2024-03-05',
    pages: 56,
    downloadUrl: '/downloads/transformacao-digital-vendas.pdf',
    coverImage: '/images/whitepapers/transformacao-digital-cover.jpg',
    fileSize: '4.1 MB',
    language: 'Português',
    featured: false
  },
  {
    id: 'ia-personalizacao-escala',
    title: 'IA para Personalização em Escala: Casos Práticos',
    description: 'Como usar inteligência artificial para personalizar comunicações comerciais em larga escala.',
    abstract: 'Guia prático sobre implementação de IA para personalização de comunicações comerciais. Apresenta casos reais, ferramentas disponíveis, métricas de sucesso e ROI obtido por empresas que implementaram personalização em escala usando IA.',
    category: 'Inteligência Artificial',
    tags: ['IA', 'Personalização', 'Escala', 'Comunicação', 'Automação'],
    authors: ['Dra. Fernanda Lima', 'Thiago Rodrigues'],
    publishDate: '2024-03-20',
    pages: 34,
    downloadUrl: '/downloads/ia-personalizacao-escala.pdf',
    coverImage: '/images/whitepapers/ia-personalizacao-cover.jpg',
    fileSize: '2.5 MB',
    language: 'Português',
    featured: true
  },
  {
    id: 'metricas-vendas-b2b',
    title: 'Métricas Avançadas para Vendas B2B',
    description: 'Dashboard completo de KPIs e métricas para otimizar performance em vendas B2B.',
    abstract: 'Compilação das métricas mais importantes para vendas B2B, incluindo métricas de atividade, qualidade, conversão e receita. Apresenta dashboards práticos, benchmarks do mercado e metodologias de análise para otimização contínua.',
    category: 'ROI & Métricas',
    tags: ['Métricas', 'KPIs', 'B2B', 'Dashboard', 'Performance'],
    authors: ['Carlos Mendes', 'Patricia Santos'],
    publishDate: '2024-04-02',
    pages: 29,
    downloadUrl: '/downloads/metricas-vendas-b2b.pdf',
    coverImage: '/images/whitepapers/metricas-b2b-cover.jpg',
    fileSize: '2.1 MB',
    language: 'Português',
    featured: false
  },
  {
    id: 'startup-sales-automation',
    title: 'Automação de Vendas para Startups: Guia Prático',
    description: 'Como startups podem implementar automação de vendas com recursos limitados e máximo impacto.',
    abstract: 'Guia específico para startups implementarem automação de vendas de forma cost-effective. Inclui stack tecnológico recomendado, processos essenciais para automatizar, métricas de acompanhamento e cases de startups que escalaram suas vendas usando automação.',
    category: 'Vendas & Marketing',
    tags: ['Startup', 'Automação', 'Vendas', 'Scale-up', 'Cost-effective'],
    authors: ['Rafael Silva', 'Camila Torres'],
    publishDate: '2024-04-18',
    pages: 41,
    downloadUrl: '/downloads/startup-sales-automation.pdf',
    coverImage: '/images/whitepapers/startup-automation-cover.jpg',
    fileSize: '3.0 MB',
    language: 'Português',
    featured: false
  }
];

export const getWhitepapersByCategory = (category: string): Whitepaper[] => {
  return whitepapers.filter(wp => wp.category === category);
};

export const getFeaturedWhitepapers = (): Whitepaper[] => {
  return whitepapers.filter(wp => wp.featured);
};

export const getWhitepaperById = (id: string): Whitepaper | undefined => {
  return whitepapers.find(wp => wp.id === id);
};

export const searchWhitepapers = (query: string): Whitepaper[] => {
  const lowercaseQuery = query.toLowerCase();
  return whitepapers.filter(wp =>
    wp.title.toLowerCase().includes(lowercaseQuery) ||
    wp.description.toLowerCase().includes(lowercaseQuery) ||
    wp.abstract.toLowerCase().includes(lowercaseQuery) ||
    wp.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    wp.category.toLowerCase().includes(lowercaseQuery)
  );
};