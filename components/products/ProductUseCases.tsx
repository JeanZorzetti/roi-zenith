import { RevealOnScroll } from '@/components/animations';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface UseCase {
  industry: string;
  title: string;
  description: string;
  results: string[];
}

interface ProductUseCasesProps {
  title?: string;
  description?: string;
  useCases: UseCase[];
  accentColor: string;
}

export default function ProductUseCases({
  title = 'Casos de Uso',
  description = 'Veja como empresas de diferentes setores estão usando nossa solução',
  useCases,
  accentColor,
}: ProductUseCasesProps) {
  return (
    <section className="py-24 md:py-32 px-8 bg-gradient-to-b from-pure-black via-gray-950 to-pure-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-5xl font-thin mb-4">{title}</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">{description}</p>
          </RevealOnScroll>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <RevealOnScroll key={index} delay={0.1 * index}>
              <div className="glass-card p-8 h-full">
                {/* Industry Badge */}
                <Badge variant="outline" className="mb-4">
                  {useCase.industry}
                </Badge>

                {/* Title */}
                <h3 className="text-2xl font-medium mb-4 text-pure-white">{useCase.title}</h3>

                {/* Description */}
                <p className="text-text-secondary mb-6 leading-relaxed">{useCase.description}</p>

                {/* Results */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-text-muted uppercase tracking-wider">
                    Resultados:
                  </p>
                  <ul className="space-y-2">
                    {useCase.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                        <CheckCircle2
                          className={`w-4 h-4 ${accentColor} flex-shrink-0 mt-0.5`}
                          strokeWidth={2}
                        />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
