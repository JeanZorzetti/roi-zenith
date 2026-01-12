import { RevealOnScroll } from '@/components/animations';
import { Zap, Shield, TrendingUp, Users2 } from 'lucide-react';

export default function ValueProposition() {
  const values = [
    {
      icon: Zap,
      title: 'Rapidez na Implementação',
      description:
        'De 15 a 30 dias para estar operacional. Onboarding completo com treinamento e suporte dedicado.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      icon: Shield,
      title: 'Segurança Garantida',
      description:
        'Certificação ISO 27001 e LGPD compliant. Seus dados protegidos com criptografia de nível bancário.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      icon: TrendingUp,
      title: 'ROI Comprovado',
      description:
        'Média de 40% de redução de custos operacionais e 3x mais eficiência em processos nos primeiros 6 meses.',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      icon: Users2,
      title: 'Suporte Humanizado',
      description:
        'Equipe 100% brasileira disponível 24/7. Suporte técnico, consultoria e sucesso do cliente inclusos.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ];

  return (
    <section className="py-32 px-8 bg-pure-black relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent" />

      <div className="max-w-content mx-auto relative z-10">
        <RevealOnScroll className="text-center mb-20">
          <h2 className="text-display font-thin mb-6">
            Por que escolher
            <br />
            a ROI Labs?
          </h2>
          <p className="text-subtitle text-text-secondary max-w-2xl mx-auto">
            Não somos apenas fornecedores. Somos parceiros comprometidos com o sucesso do seu
            negócio.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <RevealOnScroll key={index} delay={0.1 * index} direction="up">
              <div className="glass-card p-8 h-full hover:bg-white/5 transition-all group">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl ${value.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>

                {/* Title */}
                <h3 className="text-h4 font-medium mb-4">{value.title}</h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Bottom CTA */}
        <RevealOnScroll delay={0.5}>
          <div className="text-center mt-16">
            <a
              href="/sobre"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors text-lg"
            >
              Conheça mais sobre nós →
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
