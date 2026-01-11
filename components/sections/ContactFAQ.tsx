'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Quanto tempo leva a implementação?',
    answer:
      'A implementação completa leva de 15 a 30 dias dependendo da complexidade e do número de soluções contratadas. Oferecemos suporte completo durante todo o processo de onboarding.',
  },
  {
    question: 'Posso testar antes de contratar?',
    answer:
      'Sim! Oferecemos um período de teste gratuito de 14 dias para você conhecer todas as funcionalidades sem compromisso. Não é necessário cartão de crédito para iniciar o teste.',
  },
  {
    question: 'Os dados são seguros?',
    answer:
      'Absolutamente. Somos certificados ISO 27001 e seguimos rigorosamente a LGPD. Seus dados são criptografados em repouso e em trânsito, com backups automáticos diários e redundância geográfica.',
  },
  {
    question: 'Tem suporte em português?',
    answer:
      'Sim! Nossa equipe de suporte está 100% em português (PT-BR), disponível 24/7 através de chat, email e telefone. Toda a documentação e interface também estão em português.',
  },
  {
    question: 'Posso integrar com minhas ferramentas atuais?',
    answer:
      'Sim! O ROI Labs possui API aberta e conectores prontos para as principais ferramentas do mercado. Nossa equipe técnica pode auxiliar em integrações personalizadas se necessário.',
  },
];

export default function ContactFAQ() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-h2 font-light mb-2 text-center">Perguntas Frequentes</h2>
      <p className="text-body text-text-secondary mb-12 text-center">
        Encontre respostas rápidas para as dúvidas mais comuns
      </p>

      <Accordion type="single" collapsible className="glass-card p-8">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
            <AccordionTrigger className="text-left hover:text-primary-400">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-text-muted">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-8">
        <a href="#" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
          Ver todas as perguntas →
        </a>
      </div>
    </div>
  );
}
