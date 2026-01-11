import { RevealOnScroll } from '@/components/animations';
import { Sparkles, Rocket, Users } from 'lucide-react';

export default function AboutStory() {
  const milestones = [
    {
      icon: Sparkles,
      year: '2019',
      title: 'O Início',
      description:
        'Fundada por especialistas em tecnologia e gestão empresarial com a visão de simplificar a operação de empresas brasileiras.',
    },
    {
      icon: Rocket,
      year: '2021',
      title: 'Expansão',
      description:
        'Lançamento do Sirius CRM e Orion ERP. Mais de 100 empresas transformadas em 6 estados brasileiros.',
    },
    {
      icon: Users,
      year: '2025',
      title: 'Ecossistema Completo',
      description:
        'Hoje oferecemos 5 soluções integradas servindo mais de 500 empresas e impactando milhares de usuários.',
    },
  ];

  return (
    <section className="py-24 px-8 bg-pure-black">
      <div className="max-w-content mx-auto">
        <RevealOnScroll className="text-center mb-20">
          <h2 className="text-h2 font-light mb-4">Nossa História</h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Começamos com um objetivo simples: criar ferramentas que realmente funcionam para
            empresas brasileiras.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {milestones.map((milestone, index) => (
            <RevealOnScroll key={index} delay={0.1 * index} direction="up">
              <div className="relative">
                {/* Timeline line */}
                {index < milestones.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+4rem)] w-full h-px bg-gradient-to-r from-primary-500/50 to-transparent" />
                )}

                <div className="glass-card p-8 text-center h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                    <milestone.icon className="w-8 h-8 text-primary-400" />
                  </div>

                  {/* Year */}
                  <div className="text-4xl font-light text-primary-400 mb-4">{milestone.year}</div>

                  {/* Title */}
                  <h3 className="text-h4 font-medium mb-4">{milestone.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-text-secondary">{milestone.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
