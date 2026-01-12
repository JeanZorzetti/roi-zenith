import { RevealOnScroll } from '@/components/animations';
import { Check, X, Minus } from 'lucide-react';

interface Feature {
  category: string;
  items: {
    name: string;
    starter: boolean | string;
    professional: boolean | string;
    enterprise: boolean | string;
  }[];
}

interface FeatureComparisonTableProps {
  title?: string;
  description?: string;
  features: Feature[];
}

export default function FeatureComparisonTable({
  title = 'Compare todos os recursos',
  description = 'Escolha o plano ideal comparando funcionalidades lado a lado',
  features,
}: FeatureComparisonTableProps) {
  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-400 mx-auto" strokeWidth={2.5} />
      ) : (
        <X className="w-5 h-5 text-text-muted/30 mx-auto" strokeWidth={2} />
      );
    }
    if (value === '-') {
      return <Minus className="w-5 h-5 text-text-muted/30 mx-auto" />;
    }
    return <span className="text-sm text-text-secondary text-center block">{value}</span>;
  };

  return (
    <section className="py-24 md:py-32 px-8 bg-gradient-to-b from-pure-black to-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-5xl font-thin mb-4">{title}</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">{description}</p>
          </RevealOnScroll>
        </div>

        {/* Table */}
        <RevealOnScroll delay={0.2}>
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-muted uppercase tracking-wider">
                    Recursos
                  </th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-pure-white">
                    Starter
                  </th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-pure-white relative">
                    Professional
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary-600 text-xs text-white whitespace-nowrap">
                      Mais Popular
                    </div>
                  </th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-pure-white">
                    Enterprise
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {features.map((category, categoryIndex) => (
                  <RevealOnScroll key={categoryIndex} delay={0.3 + categoryIndex * 0.05}>
                    <>
                      {/* Category Header */}
                      <tr className="border-b border-white/5">
                        <td
                          colSpan={4}
                          className="py-6 px-6 text-sm font-medium text-primary-400 uppercase tracking-wider"
                        >
                          {category.category}
                        </td>
                      </tr>

                      {/* Category Items */}
                      {category.items.map((item, itemIndex) => (
                        <tr
                          key={itemIndex}
                          className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-4 px-6 text-sm text-text-secondary">{item.name}</td>
                          <td className="py-4 px-6">{renderCell(item.starter)}</td>
                          <td className="py-4 px-6 bg-white/[0.02]">
                            {renderCell(item.professional)}
                          </td>
                          <td className="py-4 px-6">{renderCell(item.enterprise)}</td>
                        </tr>
                      ))}
                    </>
                  </RevealOnScroll>
                ))}
              </tbody>
            </table>
          </div>
        </RevealOnScroll>

        {/* Mobile Note */}
        <RevealOnScroll delay={0.5}>
          <p className="text-center text-text-muted text-sm mt-8 md:hidden">
            Deslize horizontalmente para ver todos os planos
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
