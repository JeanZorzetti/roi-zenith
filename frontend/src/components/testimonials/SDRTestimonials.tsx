import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  sector: string;
  testimonial: string;
  metrics: {
    leadIncrease: number;
    conversionImprovement: number;
    timesSaved: number;
    roiPercentage: number;
  };
  timeline: string;
  avatar?: string;
  companySize: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    role: 'CEO',
    company: 'TechFlow SaaS',
    sector: 'SaaS B2B',
    companySize: '50-200 funcionários',
    testimonial: 'O SDR AI da ROI Labs revolucionou nosso processo de qualificação. Em 90 dias, triplicamos nossos MQLs e reduzimos o CAC pela metade. A IA identifica oportunidades que nossa equipe humana perdia.',
    metrics: {
      leadIncrease: 300,
      conversionImprovement: 85,
      timesSaved: 120,
      roiPercentage: 340
    },
    timeline: '90 dias'
  },
  {
    id: '2',
    name: 'Ana Rodrigues',
    role: 'VP de Vendas',
    company: 'FinanceAI Pro',
    sector: 'Fintech',
    companySize: '100-500 funcionários',
    testimonial: 'Implementamos o SDR AI em um ambiente altamente regulado. A precisão na qualificação de leads financeiros é impressionante. Nosso pipeline nunca foi tão previsível e qualificado.',
    metrics: {
      leadIncrease: 250,
      conversionImprovement: 95,
      timesSaved: 160,
      roiPercentage: 280
    },
    timeline: '120 dias'
  },
  {
    id: '3',
    name: 'Roberto Silva',
    role: 'Diretor de Growth',
    company: 'StartupX',
    sector: 'Tech Startup',
    companySize: '10-50 funcionários',
    testimonial: 'Como startup, precisávamos escalar vendas rapidamente sem explodir custos. O SDR AI nos deu a capacidade de uma equipe de 10 SDRs com o custo de 1. Game changer total.',
    metrics: {
      leadIncrease: 450,
      conversionImprovement: 120,
      timesSaved: 200,
      roiPercentage: 420
    },
    timeline: '60 dias'
  },
  {
    id: '4',
    name: 'Mariana Costa',
    role: 'CMO',
    company: 'E-commerce Plus',
    sector: 'E-commerce',
    companySize: '200-1000 funcionários',
    testimonial: 'A sazonalidade sempre foi nosso desafio. O SDR AI da ROI Labs se adapta aos ciclos do e-commerce e otimiza a abordagem por período. Resultados consistentes o ano todo.',
    metrics: {
      leadIncrease: 180,
      conversionImprovement: 65,
      timesSaved: 90,
      roiPercentage: 220
    },
    timeline: '180 dias'
  },
  {
    id: '5',
    name: 'João Oliveira',
    role: 'Head of Sales',
    company: 'ConsultTech',
    sector: 'Consultoria',
    companySize: '50-200 funcionários',
    testimonial: 'Consultoria B2B tem ciclos longos e complexos. O SDR AI mapeia a jornada completa do prospect e antecipa necessidades. Nossa taxa de fechamento dobrou.',
    metrics: {
      leadIncrease: 200,
      conversionImprovement: 100,
      timesSaved: 140,
      roiPercentage: 310
    },
    timeline: '150 dias'
  }
];

const SDRTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState<'leads' | 'conversion' | 'time' | 'roi'>('roi');

  const currentTestimonial = testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleCTAClick = () => {
    navigate('/contact');
    // Scroll to the contact form
    setTimeout(() => {
      const formElement = document.querySelector('#contact-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const getMetricValue = (metric: string, testimonial: Testimonial) => {
    switch (metric) {
      case 'leads': return `+${testimonial.metrics.leadIncrease}%`;
      case 'conversion': return `+${testimonial.metrics.conversionImprovement}%`;
      case 'time': return `${testimonial.metrics.timesSaved}h/mês`;
      case 'roi': return `${testimonial.metrics.roiPercentage}%`;
      default: return '';
    }
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'leads': return 'Aumento em Leads';
      case 'conversion': return 'Melhoria Conversão';
      case 'time': return 'Tempo Economizado';
      case 'roi': return 'ROI Obtido';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          Resultados Reais dos Nossos Clientes
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Veja como o SDR AI transformou negócios reais em diferentes setores
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { key: 'roi', label: 'ROI Médio', value: '310%', color: 'text-green-400' },
          { key: 'leads', label: 'Aumento Leads', value: '+275%', color: 'text-blue-400' },
          { key: 'conversion', label: 'Conversão', value: '+93%', color: 'text-purple-400' },
          { key: 'time', label: 'Tempo Poupado', value: '142h/mês', color: 'text-yellow-400' },
        ].map((metric) => (
          <Card 
            key={metric.key}
            className={`bg-gray-900/30 border cursor-pointer transition-all hover:scale-105 ${
              selectedMetric === metric.key ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-gray-700'
            }`}
            onClick={() => setSelectedMetric(metric.key as any)}
          >
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-400">
                {metric.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Testimonial */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Testimonial Content */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <Quote className="text-primary-400 w-8 h-8 mt-1 flex-shrink-0" />
              <div className="space-y-6">
                <blockquote className="text-lg text-gray-200 leading-relaxed">
                  "{currentTestimonial.testimonial}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary-600 text-white font-semibold">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">{currentTestimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {currentTestimonial.role} • {currentTestimonial.company}
                    </div>
                    <div className="flex gap-2 mt-1">
                      <Badge className="bg-primary-600/20 text-primary-400 text-xs">
                        {currentTestimonial.sector}
                      </Badge>
                      <Badge className="bg-gray-600/20 text-gray-400 text-xs">
                        {currentTestimonial.companySize}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Detail */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Resultados em {currentTestimonial.timeline}
              </h3>
              <p className="text-sm text-gray-400">{currentTestimonial.company}</p>
            </div>

            <div className="space-y-6">
              {[
                { key: 'roi', label: 'ROI Total', value: currentTestimonial.metrics.roiPercentage, suffix: '%', color: 'text-green-400' },
                { key: 'leads', label: 'Leads Qualificados', value: currentTestimonial.metrics.leadIncrease, suffix: '%', prefix: '+', color: 'text-blue-400' },
                { key: 'conversion', label: 'Taxa Conversão', value: currentTestimonial.metrics.conversionImprovement, suffix: '%', prefix: '+', color: 'text-purple-400' },
                { key: 'time', label: 'Horas Economizadas', value: currentTestimonial.metrics.timesSaved, suffix: 'h/mês', color: 'text-yellow-400' }
              ].map((metric) => (
                <div 
                  key={metric.key}
                  className={`p-3 rounded-lg transition-all ${
                    selectedMetric === metric.key ? 'bg-primary-900/20 border border-primary-500/30' : 'bg-gray-800/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{metric.label}</span>
                    <span className={`text-lg font-bold ${metric.color}`}>
                      {metric.prefix}{metric.value}{metric.suffix}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary-900/10 rounded-lg border border-primary-500/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400 mb-1">
                  R$ {(currentTestimonial.metrics.roiPercentage * 1000).toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">
                  Valor adicional gerado/mês
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={prevTestimonial}
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary-400' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextTestimonial}
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <div className="mb-4">
          <p className="text-gray-400 text-sm">
            Junte-se a mais de 200 empresas que já transformaram suas vendas
          </p>
        </div>
        <Button 
          size="lg" 
          className="bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300" 
          onClick={handleCTAClick}
        >
          Quero Resultados Como Estes
        </Button>
      </div>
    </div>
  );
};

export default SDRTestimonials;