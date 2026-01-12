'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Building2, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    quote:
      'O Sirius CRM transformou completamente nossa gestão de vendas. Aumentamos a conversão em 45% no primeiro trimestre e reduzimos o ciclo de vendas pela metade.',
    author: 'Carlos Eduardo Silva',
    role: 'Diretor Comercial',
    company: 'TechSolutions Brasil',
    companyLogo: '🚀',
    industry: 'Tecnologia',
    clientSince: '2024',
    rating: 5,
    metric: '+45% conversão',
    avatar: '👨‍💼',
    color: 'blue',
  },
  {
    quote:
      'Com o Orion ERP, integramos financeiro, estoque e vendas em uma única plataforma. A eficiência operacional melhorou 60% e eliminamos retrabalho completamente.',
    author: 'Fernanda Oliveira',
    role: 'CFO',
    company: 'Indústria MegaPro',
    companyLogo: '🏭',
    industry: 'Indústria',
    clientSince: '2023',
    rating: 5,
    metric: '+60% eficiência',
    avatar: '👩‍💼',
    color: 'purple',
  },
  {
    quote:
      'O Vértice Marketing nos deu controle total das campanhas. ROI visível e mensurável em cada ação. Nosso CAC reduziu 40% enquanto dobramos o volume de leads qualificados.',
    author: 'Ricardo Mendes',
    role: 'Head de Marketing',
    company: 'E-commerce Prime',
    companyLogo: '🛒',
    industry: 'E-commerce',
    clientSince: '2024',
    rating: 5,
    metric: '-40% CAC',
    avatar: '👨‍💻',
    color: 'green',
  },
  {
    quote:
      'A implementação foi surpreendentemente rápida. Em 3 semanas estávamos operacionais com toda equipe treinada. O suporte é excepcional, sempre disponível e resolutivo.',
    author: 'Ana Paula Costa',
    role: 'Gerente de Operações',
    company: 'Logística Express',
    companyLogo: '📦',
    industry: 'Logística',
    clientSince: '2025',
    rating: 5,
    metric: '3 semanas setup',
    avatar: '👩‍💼',
    color: 'yellow',
  },
  {
    quote:
      'A ROI Labs entende as necessidades de PMEs. Preço justo, sem pegadinhas, e funcionalidades que realmente usamos no dia a dia. Melhor investimento que fizemos.',
    author: 'João Pedro Santos',
    role: 'CEO',
    company: 'Construtora Horizonte',
    companyLogo: '🏗️',
    industry: 'Construção',
    clientSince: '2024',
    rating: 5,
    metric: 'Melhor ROI',
    avatar: '👨‍💼',
    color: 'orange',
  },
  {
    quote:
      'Migrar de planilhas para o Sirius CRM foi libertador. Visibilidade total do funil, automações que economizam horas, e relatórios que impressionam a diretoria.',
    author: 'Mariana Alves',
    role: 'Coordenadora de Vendas',
    company: 'Consultoria Estratégica Pro',
    companyLogo: '💼',
    industry: 'Consultoria',
    clientSince: '2025',
    rating: 5,
    metric: 'Economia de 15h/semana',
    avatar: '👩‍💼',
    color: 'pink',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      blue: { bg: 'bg-blue-400/10', border: 'border-blue-400/20', text: 'text-blue-400' },
      purple: { bg: 'bg-purple-400/10', border: 'border-purple-400/20', text: 'text-purple-400' },
      green: { bg: 'bg-green-400/10', border: 'border-green-400/20', text: 'text-green-400' },
      yellow: { bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', text: 'text-yellow-400' },
      orange: { bg: 'bg-orange-400/10', border: 'border-orange-400/20', text: 'text-orange-400' },
      pink: { bg: 'bg-pink-400/10', border: 'border-pink-400/20', text: 'text-pink-400' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-24 md:py-32 px-8 bg-gradient-to-b from-pure-black via-gray-950 to-pure-black relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">Histórias de sucesso</h2>
          <p className="text-xl font-light text-text-secondary">
            Empresas que transformaram seus resultados com ROI Labs
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => {
                const colorClasses = getColorClasses(testimonial.color);
                return (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
                      {/* Header with badges */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{testimonial.companyLogo}</div>
                          <div>
                            <div className="text-sm font-medium text-pure-white">
                              {testimonial.company}
                            </div>
                            <div className="text-xs text-text-muted">{testimonial.industry}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`${colorClasses.bg} ${colorClasses.border} ${colorClasses.text} text-xs`}
                          >
                            {testimonial.metric}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Cliente desde {testimonial.clientSince}
                          </Badge>
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-6">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="relative mb-8">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-400/20" />
                        <blockquote className="text-lg md:text-xl font-light leading-relaxed text-text-secondary pl-6">
                          {testimonial.quote}
                        </blockquote>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="text-base font-medium text-pure-white">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-text-muted">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="pointer-events-auto -ml-6 text-text-secondary hover:text-pure-white bg-white/5 hover:bg-white/10 rounded-full w-12 h-12 border border-white/10 backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="pointer-events-auto -mr-6 text-text-secondary hover:text-pure-white bg-white/5 hover:bg-white/10 rounded-full w-12 h-12 border border-white/10 backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-400 w-8'
                    : 'bg-white/30 hover:bg-white/60 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="flex md:hidden justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="text-text-secondary hover:text-pure-white bg-white/5 hover:bg-white/10 rounded-full w-10 h-10 border border-white/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="text-text-secondary hover:text-pure-white bg-white/5 hover:bg-white/10 rounded-full w-10 h-10 border border-white/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
