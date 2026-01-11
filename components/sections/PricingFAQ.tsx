'use client';

import { RevealOnScroll } from '@/components/animations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Posso mudar de plano depois?',
    answer:
      'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Em caso de upgrade, a diferença será cobrada proporcionalmente. Em caso de downgrade, o crédito será aplicado na próxima fatura.',
  },
  {
    question: 'Como funciona o teste grátis de 14 dias?',
    answer:
      'Durante o período de teste, você terá acesso completo a todas as funcionalidades do plano escolhido, sem limitações. Não é necessário cartão de crédito para iniciar. Ao final do período, você pode optar por contratar ou cancelar sem custos.',
  },
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer:
      'Sim, não há período de fidelidade. Você pode cancelar sua assinatura a qualquer momento através do painel de controle ou entrando em contato com nosso suporte. O acesso permanecerá ativo até o final do período pago.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Aceitamos cartões de crédito (Visa, Mastercard, Amex), boleto bancário e transferência bancária (para planos Enterprise). Para pagamentos anuais, oferecemos condições especiais via transferência.',
  },
  {
    question: 'O que está incluído no suporte 24/7?',
    answer:
      'Nosso suporte 24/7 está disponível via chat, email e telefone em português. A equipe pode ajudar com dúvidas técnicas, problemas de uso, configurações e integrações. Planos Professional e Enterprise têm prioridade no atendimento.',
  },
  {
    question: 'Há taxa de implementação ou setup?',
    answer:
      'Não cobramos taxa de implementação ou setup em nenhum dos nossos planos. A única exceção é para customizações específicas no plano Enterprise, que são orçadas separadamente conforme a necessidade.',
  },
  {
    question: 'Como funciona a garantia de 30 dias?',
    answer:
      'Se você não estiver satisfeito com o ROI Labs nos primeiros 30 dias após a contratação, devolvemos 100% do valor pago, sem perguntas. Basta entrar em contato com nosso suporte solicitando o reembolso.',
  },
  {
    question: 'Posso adicionar mais usuários depois?',
    answer:
      'Sim! Você pode adicionar mais usuários a qualquer momento. Se ultrapassar o limite do seu plano atual, faremos automaticamente o upgrade para o próximo plano ou você pode optar por um plano customizado Enterprise.',
  },
];

export default function PricingFAQ() {
  return (
    <section className="py-24 px-8 bg-pure-black">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll className="text-center mb-12">
          <h2 className="text-h2 font-light mb-4">Perguntas Frequentes</h2>
          <p className="text-body text-text-secondary">
            Tire suas dúvidas sobre planos, pagamentos e funcionalidades
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <Accordion type="single" collapsible className="glass-card p-8">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-white/10"
              >
                <AccordionTrigger className="text-left hover:text-primary-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-muted">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="text-center mt-8">
            <p className="text-sm text-text-muted mb-4">Não encontrou sua resposta?</p>
            <a
              href="/contato"
              className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
            >
              Entre em contato conosco →
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
