import { RevealOnScroll } from '@/components/animations';

export default function AboutStats() {
  const stats = [
    {
      value: '500+',
      label: 'Empresas Ativas',
      description: 'Confiando na ROI Labs para sua gestão',
    },
    {
      value: '98%',
      label: 'Satisfação',
      description: 'Taxa de satisfação dos clientes',
    },
    {
      value: '5',
      label: 'Soluções Integradas',
      description: 'CRM, ERP, Marketing, PCP e BPO',
    },
    {
      value: '24/7',
      label: 'Suporte',
      description: 'Equipe disponível em português',
    },
  ];

  return (
    <section className="py-24 px-8 bg-pure-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent" />

      <div className="max-w-content mx-auto relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-h2 font-light mb-4">Em Números</h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Resultados que comprovam nosso compromisso com a excelência
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <RevealOnScroll key={index} delay={0.1 * index} direction="up">
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-light text-primary-400 mb-3">
                  {stat.value}
                </div>
                <div className="text-h4 font-medium mb-2">{stat.label}</div>
                <div className="text-sm text-text-muted">{stat.description}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Additional Info */}
        <RevealOnScroll delay={0.5}>
          <div className="mt-20 glass-card p-8 text-center">
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              <span className="text-primary-400 font-medium">Certificações:</span> ISO 27001
              (Segurança da Informação), LGPD Compliant, AWS Partner, Google Cloud Partner
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
