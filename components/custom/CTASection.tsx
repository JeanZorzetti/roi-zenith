import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const navigate = useNavigate();

  const handleTryNow = () => {
    // Navigate to ROI Calculator for immediate value demonstration
    navigate('/calculator');
  };

  const handleScheduleDemo = () => {
    // Navigate to contact page with pre-filled subject for demo
    navigate('/contact', { 
      state: { 
        subject: 'Agendamento de Demonstração - ROI Labs SDR AI',
        message: 'Olá! Tenho interesse em agendar uma demonstração do ROI Labs SDR AI para entender como pode transformar nossos resultados de vendas.'
      } 
    });
  };

  return (
    <section id="contato" className="py-24 md:py-32 px-8 mx-8 my-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-card rounded-2xl"></div>
      
      {/* Rotating Glow Effect */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-glow rotate-slow opacity-50"></div>
      
      <div className="relative z-10 max-w-content mx-auto text-center">
        <h2 className="text-display mb-4 text-pure-white">
          Pronto para o futuro?
        </h2>
        <p className="text-xl font-light text-text-secondary mb-12 max-w-2xl mx-auto">
          Comece gratuitamente. Escale infinitamente.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleTryNow}
            variant="premium-primary"
            size="lg"
            className="text-lg px-12 py-4 min-w-[200px]"
          >
            Experimentar agora
          </Button>
          
          <Button
            onClick={handleScheduleDemo}
            variant="premium"
            size="lg"
            className="text-lg px-12 py-4 min-w-[200px]"
          >
            Agendar demonstração
          </Button>
        </div>
      </div>
    </section>
  );
}