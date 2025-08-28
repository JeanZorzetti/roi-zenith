import { useEffect, useState, useRef } from 'react';

interface Message {
  type: 'user' | 'ai';
  text: string;
}

const messages: Message[] = [
  { type: 'ai', text: 'Olá! Como posso tornar seu dia extraordinário?' },
  { type: 'user', text: 'Preciso de uma experiência única para um cliente especial.' },
  { type: 'ai', text: 'Entendo perfeitamente. Vejo que o Sr. Hamilton é um apreciador de vinhos. Que tal nossa mesa privativa com vista para a adega, acompanhada de uma degustação exclusiva dos rótulos que chegaram esta semana?' },
  { type: 'user', text: 'Perfeito! Como você sabia?' },
  { type: 'ai', text: 'Lembro de cada detalhe sobre seus clientes. O Sr. Hamilton mencionou seu interesse por Bordeaux em sua última visita. Já separei três opções excepcionais para esta noite.' }
];

export default function ProductShowcase() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startChatAnimation();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const startChatAnimation = () => {
    setTimeout(() => {
      addMessage(0);
    }, 1000);
  };

  const addMessage = (index: number) => {
    if (index < messages.length) {
      setVisibleMessages(prev => [...prev, messages[index]]);
      setMessageIndex(index + 1);
      
      if (index + 1 < messages.length) {
        setTimeout(() => addMessage(index + 1), 2000);
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="produto" 
      className="relative py-24 md:py-32 px-8 bg-gradient-to-b from-pure-black via-charcoal to-pure-black"
    >
      <div className="max-w-content mx-auto text-center">
        <h2 className={`text-display mb-4 ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          Conheça o futuro do atendimento
        </h2>
        <p className={`text-xl font-light text-text-secondary mb-16 ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`} 
           style={{ animationDelay: '0.2s' }}>
          Um membro invisível e incansável da sua equipe
        </p>
        
        {/* Product Demo */}
        <div className={`w-full max-w-4xl mx-auto ${isVisible ? 'scale-in visible' : 'scale-in'}`} 
             style={{ animationDelay: '0.5s' }}>
          <div className="glass-card shadow-premium overflow-hidden">
            {/* Chat Interface */}
            <div className="h-[500px] flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-light tracking-wide text-pure-white">
                  ROI LABS Assistant
                </h3>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {visibleMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div
                      className={`max-w-[70%] px-6 py-3 rounded-2xl text-sm leading-relaxed ${
                        message.type === 'user'
                          ? 'bg-white text-pure-black'
                          : 'bg-white/10 border border-white/20 text-pure-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {messageIndex < messages.length && visibleMessages.length > 0 && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 border border-white/20 px-6 py-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}