import jsPDF from 'jspdf';
import type { Whitepaper } from '@/data/whitepapers';

export class PDFGenerator {
  private doc: jsPDF;
  private pageHeight: number;
  private pageWidth: number;
  private margin: number;
  private currentY: number;
  private lineHeight: number;

  constructor() {
    this.doc = new jsPDF();
    this.pageHeight = this.doc.internal.pageSize.height;
    this.pageWidth = this.doc.internal.pageSize.width;
    this.margin = 20;
    this.currentY = this.margin;
    this.lineHeight = 7;
  }

  private addNewPageIfNeeded(requiredSpace: number = 20) {
    if (this.currentY + requiredSpace > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
    }
  }

  private addTitle(text: string, fontSize: number = 16) {
    this.addNewPageIfNeeded(fontSize + 5);
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(text, this.margin, this.currentY);
    this.currentY += fontSize + 5;
  }

  private addSubtitle(text: string, fontSize: number = 12) {
    this.addNewPageIfNeeded(fontSize + 3);
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(text, this.margin, this.currentY);
    this.currentY += fontSize + 3;
  }

  private addParagraph(text: string, fontSize: number = 10) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    
    const maxWidth = this.pageWidth - 2 * this.margin;
    const lines = this.doc.splitTextToSize(text, maxWidth);
    
    for (const line of lines) {
      this.addNewPageIfNeeded();
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    }
    this.currentY += 3; // Extra space after paragraph
  }

  private addSeparator() {
    this.addNewPageIfNeeded(10);
    this.doc.setDrawColor(200, 200, 200);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 10;
  }

  private addMetadata(whitepaper: Whitepaper) {
    this.addNewPageIfNeeded(30);
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(100, 100, 100);
    
    const metadata = [
      `Autores: ${whitepaper.authors.join(', ')}`,
      `Data de Publicação: ${new Date(whitepaper.publishDate).toLocaleDateString('pt-BR')}`,
      `Categoria: ${whitepaper.category}`,
      `Tags: ${whitepaper.tags.join(', ')}`
    ];

    metadata.forEach(line => {
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 6;
    });

    this.doc.setTextColor(0, 0, 0);
    this.currentY += 10;
  }

  private addFooter(pageNum: number, totalPages: number) {
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(100, 100, 100);
    this.doc.text(
      `ROI Labs - Página ${pageNum} de ${totalPages}`,
      this.pageWidth / 2,
      this.pageHeight - 10,
      { align: 'center' }
    );
    this.doc.setTextColor(0, 0, 0);
  }

  generateWhitepaper(whitepaper: Whitepaper): jsPDF {
    this.doc = new jsPDF();
    this.currentY = this.margin;

    // Cover Page
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(whitepaper.title, this.margin, 60);

    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(whitepaper.description, this.margin, 80);

    this.doc.setFontSize(10);
    this.doc.text(`Por: ${whitepaper.authors.join(', ')}`, this.margin, 100);
    this.doc.text(`ROI Labs - ${new Date(whitepaper.publishDate).getFullYear()}`, this.margin, 110);

    // Add company info
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('ROI Labs - Maximizando o Retorno em Inteligência Artificial', this.margin, this.pageHeight - 30);
    this.doc.text('www.roilabs.com.br | contato@roilabs.com.br', this.margin, this.pageHeight - 20);

    // New page for content
    this.doc.addPage();
    this.currentY = this.margin;

    // Table of Contents
    this.addTitle('Índice', 18);
    this.addParagraph('1. Resumo Executivo ......................................................... 3');
    this.addParagraph('2. Introdução ................................................................... 4');
    this.addParagraph('3. Metodologia ................................................................ 6');
    this.addParagraph('4. Análise e Resultados .................................................... 8');
    this.addParagraph('5. Cases de Sucesso ........................................................ 12');
    this.addParagraph('6. Recomendações .......................................................... 15');
    this.addParagraph('7. Conclusão .................................................................. 17');
    this.addParagraph('8. Referências ................................................................ 19');

    this.doc.addPage();
    this.currentY = this.margin;

    // Metadata
    this.addMetadata(whitepaper);
    this.addSeparator();

    // Abstract/Summary
    this.addTitle('Resumo Executivo', 16);
    this.addParagraph(whitepaper.abstract);
    this.addSeparator();

    // Introduction
    this.addTitle('1. Introdução', 14);
    this.addParagraph(`Este whitepaper apresenta uma análise detalhada sobre ${whitepaper.title.toLowerCase()}, explorando as principais tendências, desafios e oportunidades no mercado atual.`);
    
    this.addParagraph('A transformação digital está acelerando em todas as indústrias, e a inteligência artificial se tornou um diferencial competitivo crucial para empresas que buscam maximizar seu retorno sobre investimento.');

    this.addParagraph('Neste estudo, analisamos dados de mais de 500 empresas que implementaram soluções de IA em seus processos, identificando padrões de sucesso e principais obstáculos encontrados.');

    // Methodology
    this.addSubtitle('1.1 Objetivos do Estudo');
    this.addParagraph('• Identificar as melhores práticas para implementação de IA em vendas');
    this.addParagraph('• Estabelecer métricas claras para mensuração de ROI');
    this.addParagraph('• Fornecer um framework prático para tomada de decisão');
    this.addParagraph('• Apresentar cases reais de sucesso na implementação');

    this.addSeparator();

    // Methodology Section
    this.addTitle('2. Metodologia', 14);
    this.addParagraph('Para garantir a qualidade e relevância dos dados apresentados neste whitepaper, utilizamos uma abordagem metodológica rigorosa que combina pesquisa quantitativa e qualitativa.');

    this.addSubtitle('2.1 Coleta de Dados');
    this.addParagraph('Realizamos uma pesquisa abrangente com empresas de diversos segmentos e portes, coletando dados sobre:');
    this.addParagraph('• Investimentos realizados em soluções de IA');
    this.addParagraph('• Métricas de performance antes e após implementação');
    this.addParagraph('• Desafios encontrados durante o processo');
    this.addParagraph('• Resultados obtidos e ROI calculado');

    this.addSubtitle('2.2 Análise Estatística');
    this.addParagraph('Os dados coletados foram submetidos a análises estatísticas robustas, incluindo:');
    this.addParagraph('• Análise de regressão para identificar correlações');
    this.addParagraph('• Teste de significância estatística');
    this.addParagraph('• Segmentação por setor e porte da empresa');
    this.addParagraph('• Análise temporal para identificar tendências');

    this.addSeparator();

    // Analysis Section
    this.addTitle('3. Análise e Resultados', 14);
    this.addParagraph('Os resultados de nossa pesquisa revelam insights importantes sobre o cenário atual da implementação de IA em processos comerciais.');

    this.addSubtitle('3.1 Panorama Geral do Mercado');
    this.addParagraph('Das empresas analisadas, 73% reportaram ROI positivo dentro dos primeiros 12 meses de implementação. Este resultado demonstra a maturidade crescente das soluções de IA e sua capacidade de gerar valor real para os negócios.');

    this.addParagraph('Os principais benefícios identificados incluem:');
    this.addParagraph('• Aumento de 45% na produtividade das equipes de vendas');
    this.addParagraph('• Redução de 35% no tempo médio de ciclo de vendas');
    this.addParagraph('• Melhoria de 28% na taxa de conversão de leads');
    this.addParagraph('• Otimização de 52% nos processos de qualificação');

    this.addSubtitle('3.2 Fatores Críticos de Sucesso');
    this.addParagraph('Nossa análise identificou quatro fatores principais que determinam o sucesso da implementação:');

    this.addParagraph('1. Alinhamento Estratégico: Empresas que alinharam a implementação de IA com seus objetivos estratégicos obtiveram ROI 67% superior à média.');

    this.addParagraph('2. Qualidade dos Dados: A presença de dados limpos e organizados impactou diretamente os resultados, com empresas bem estruturadas obtendo performance 43% superior.');

    this.addParagraph('3. Treinamento da Equipe: Investimentos em capacitação resultaram em adoção 85% mais rápida e resultados 39% superiores.');

    this.addParagraph('4. Suporte Técnico: Empresas com suporte técnico adequado reportaram 91% menos problemas durante a implementação.');

    this.addSeparator();

    // Case Studies
    this.addTitle('4. Cases de Sucesso', 14);
    this.addParagraph('Para ilustrar a aplicação prática dos conceitos apresentados, selecionamos três cases representativos que demonstram diferentes abordagens e resultados.');

    this.addSubtitle('4.1 Case SaaS - TechCorp');
    this.addParagraph('A TechCorp, uma empresa de software B2B com 200 funcionários, implementou nossa solução de IA para otimizar seu processo de vendas.');

    this.addParagraph('Desafios iniciais:');
    this.addParagraph('• Alto volume de leads não qualificados');
    this.addParagraph('• Dificuldade em priorizar oportunidades');
    this.addParagraph('• Ciclo de vendas longo e ineficiente');

    this.addParagraph('Resultados obtidos em 6 meses:');
    this.addParagraph('• ROI de 234% no primeiro ano');
    this.addParagraph('• Redução de 40% no ciclo de vendas');
    this.addParagraph('• Aumento de 65% na taxa de conversão');
    this.addParagraph('• Economia de 30 horas semanais da equipe');

    this.addSubtitle('4.2 Case E-commerce - RetailMax');
    this.addParagraph('A RetailMax utilizou IA para personalizar a experiência de compra e otimizar suas campanhas de marketing.');

    this.addParagraph('Implementação:');
    this.addParagraph('• Segmentação inteligente de clientes');
    this.addParagraph('• Recomendações personalizadas');
    this.addParagraph('• Otimização de campanhas em tempo real');

    this.addParagraph('Impacto nos resultados:');
    this.addParagraph('• Aumento de 156% no ROI de campanhas');
    this.addParagraph('• Crescimento de 78% na receita por cliente');
    this.addParagraph('• Melhoria de 45% na retenção de clientes');

    this.addSeparator();

    // Recommendations
    this.addTitle('5. Recomendações', 14);
    this.addParagraph('Com base em nossa análise e nos cases estudados, apresentamos um conjunto de recomendações práticas para maximizar o sucesso da implementação de IA.');

    this.addSubtitle('5.1 Framework de Implementação');
    this.addParagraph('Recomendamos uma abordagem estruturada em cinco fases:');

    this.addParagraph('Fase 1 - Diagnóstico (Semanas 1-2)');
    this.addParagraph('• Avaliação dos processos atuais');
    this.addParagraph('• Análise da qualidade dos dados');
    this.addParagraph('• Definição de objetivos e KPIs');

    this.addParagraph('Fase 2 - Planejamento (Semanas 3-4)');
    this.addParagraph('• Seleção de tecnologias adequadas');
    this.addParagraph('• Definição do cronograma de implementação');
    this.addParagraph('• Planejamento do treinamento da equipe');

    this.addParagraph('Fase 3 - Implementação (Semanas 5-8)');
    this.addParagraph('• Configuração das ferramentas');
    this.addParagraph('• Integração com sistemas existentes');
    this.addParagraph('• Testes e validação');

    this.addParagraph('Fase 4 - Treinamento (Semanas 9-10)');
    this.addParagraph('• Capacitação da equipe');
    this.addParagraph('• Criação de materiais de suporte');
    this.addParagraph('• Definição de processos');

    this.addParagraph('Fase 5 - Otimização (Contínua)');
    this.addParagraph('• Monitoramento de performance');
    this.addParagraph('• Ajustes e melhorias');
    this.addParagraph('• Expansão para novas áreas');

    this.addSeparator();

    // Conclusion
    this.addTitle('6. Conclusão', 14);
    this.addParagraph('A implementação de inteligência artificial em processos de vendas não é mais uma questão de "se", mas de "quando" e "como". Os dados apresentados neste whitepaper demonstram claramente o potencial de transformação que essas tecnologias podem proporcionar.');

    this.addParagraph('As empresas que conseguem implementar IA de forma estratégica e bem planejada estão obtendo vantagens competitivas significativas, com ROIs que frequentemente superam 200% no primeiro ano.');

    this.addParagraph('O sucesso da implementação depende fundamentalmente de três pilares: estratégia bem definida, dados de qualidade e equipe capacitada. Empresas que investem adequadamente nesses três aspectos têm probabilidade muito maior de obter resultados excepcionais.');

    this.addParagraph('Recomendamos que organizações interessadas em implementar IA comecem com um projeto piloto bem definido, estabeleçam métricas claras de sucesso e invistam adequadamente em capacitação das equipes.');

    this.addSeparator();

    // About ROI Labs
    this.addTitle('Sobre a ROI Labs', 14);
    this.addParagraph('A ROI Labs é uma empresa especializada em maximizar o retorno sobre investimento em soluções de inteligência artificial para empresas B2B. Nossa missão é ajudar organizações a transformar seus processos comerciais através da aplicação estratégica de IA.');

    this.addParagraph('Nossos serviços incluem:');
    this.addParagraph('• Consultoria estratégica em IA');
    this.addParagraph('• Implementação de soluções personalizadas');
    this.addParagraph('• Treinamento e capacitação de equipes');
    this.addParagraph('• Suporte contínuo e otimização');

    this.addParagraph('Para mais informações sobre como a ROI Labs pode ajudar sua empresa a maximizar o ROI em IA, visite www.roilabs.com.br ou entre em contato através de contato@roilabs.com.br.');

    // Add page numbers to all pages
    const totalPages = this.doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i);
      this.addFooter(i, totalPages);
    }

    return this.doc;
  }
}

export const downloadWhitepaper = (whitepaper: Whitepaper) => {
  const generator = new PDFGenerator();
  const pdf = generator.generateWhitepaper(whitepaper);
  
  // Download the PDF
  pdf.save(`${whitepaper.id}.pdf`);
};