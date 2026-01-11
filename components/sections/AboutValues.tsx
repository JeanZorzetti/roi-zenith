import { RevealOnScroll } from '@/components/animations';
import { Target, Zap, Shield, Heart } from 'lucide-react';

export default function AboutValues() {
  const values = [
    {
      icon: Target,
      title: 'Foco em Resultados',
      description:
        'Medimos nosso sucesso pelo ROI que geramos para nossos clientes. Cada funcionalidade é pensada para impactar diretamente seus resultados.',
    },
    {
      icon: Zap,
      title: 'Simplicidade e Poder',
      description:
        'Tecnologia avançada não precisa ser complicada. Criamos ferramentas poderosas que qualquer pessoa pode usar.',
    },
    {
      icon: Shield,
      title: 'Segurança e Confiança',
      description:
        'Seus dados são sagrados. Investimos pesadamente em segurança, compliance e transparência total com nossos clientes.',
    },
    {
      icon: Heart,
      title: 'Parceria de Longo Prazo',
      description:
        'Não somos apenas fornecedores, somos parceiros. Crescemos junto com nossos clientes e celebramos cada conquista.',
    },
  ];

  return (
    <section className="py-24 px-8 bg-gradient-to-b from-pure-black to-gray-950">
      <div className="max-w-content mx-auto">
        <RevealOnScroll className="text-center mb-20">
          <h2 className="text-h2 font-light mb-4">Nossos Valores</h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Os princípios que guiam tudo que fazemos
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <RevealOnScroll
              key={index}
              delay={0.1 * index}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="glass-card p-8 h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-primary-500/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary-400" />
                </div>

                {/* Title */}
                <h3 className="text-h4 font-medium mb-4">{value.title}</h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
