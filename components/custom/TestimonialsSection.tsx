import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "Nossos clientes agora sentem que conhecemos cada um deles pessoalmente. É mágico.",
    author: "Marina Costa",
    company: "CEO, Restaurante Origem",
  },
  {
    quote: "Reduzimos o tempo de espera em 87% e aumentamos a satisfação para níveis que nunca imaginamos possíveis.",
    author: "Dr. Ricardo Almeida", 
    company: "Diretor, Hospital Premium Care",
  },
  {
    quote: "É como ter 100 atendentes de elite trabalhando 24/7, mas com a consistência de um relógio suíço.",
    author: "Ana Beatriz Silva",
    company: "Fundadora, Luxury Concierge BR",
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

  return (
    <section className="py-24 md:py-32 px-8 bg-pure-black relative overflow-hidden">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">
            Histórias de transformação
          </h2>
          <p className="text-xl font-light text-text-secondary">
            Empresas que já vivem o futuro
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 text-center px-8">
                  <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-pure-white italic max-w-3xl mx-auto">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="space-y-1">
                    <div className="text-lg font-light text-text-secondary">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-text-tertiary">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="pointer-events-auto -ml-4 text-text-secondary hover:text-pure-white bg-transparent hover:bg-white/10 rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="pointer-events-auto -mr-4 text-text-secondary hover:text-pure-white bg-transparent hover:bg-white/10 rounded-full w-12 h-12"
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
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-pure-white scale-125'
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}