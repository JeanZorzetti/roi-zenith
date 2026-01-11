import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { FadeIn, RevealOnScroll } from '@/components/animations';

export const metadata: Metadata = {
  title: 'Termos de Serviço | ROI Labs',
  description:
    'Termos de Serviço da ROI Labs. Conheça as condições de uso das nossas soluções de gestão empresarial.',
};

export default function TermsPage() {
  const sections = [
    {
      title: '1. Aceitação dos Termos',
      content: [
        'Ao acessar e utilizar as soluções ROI Labs (Sirius CRM, Orion ERP, Vértice Marketing, PCP Industrial e BPO Financeiro), você concorda em cumprir e estar vinculado a estes Termos de Serviço.',
        'Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.',
        'Estes termos constituem um acordo legal entre você (usuário ou empresa contratante) e a ROI Labs Tecnologia Ltda.',
      ],
    },
    {
      title: '2. Definições',
      content: [
        '• "Serviços": refere-se a todas as soluções de software oferecidas pela ROI Labs',
        '• "Usuário": pessoa física ou jurídica que utiliza os Serviços',
        '• "Conta": registro pessoal ou empresarial para acesso aos Serviços',
        '• "Conteúdo": dados, informações e materiais inseridos pelo Usuário',
        '• "Plataforma": sistema online onde os Serviços são disponibilizados',
      ],
    },
    {
      title: '3. Cadastro e Conta',
      content: [
        'Para utilizar nossos Serviços, você deve:',
        '• Ter capacidade legal para contratar (pessoa física maior de 18 anos ou pessoa jurídica)',
        '• Fornecer informações verdadeiras, completas e atualizadas no cadastro',
        '• Manter a segurança e confidencialidade de suas credenciais de acesso',
        '• Notificar imediatamente sobre qualquer uso não autorizado de sua conta',
        'Você é responsável por todas as atividades realizadas através de sua conta.',
      ],
    },
    {
      title: '4. Licença de Uso',
      content: [
        'Concedemos a você uma licença limitada, não exclusiva, intransferível e revogável para:',
        '• Acessar e usar os Serviços de acordo com o plano contratado',
        '• Permitir que usuários autorizados da sua empresa acessem os Serviços',
        'Esta licença não inclui o direito de:',
        '• Revender, sublicenciar ou distribuir os Serviços',
        '• Realizar engenharia reversa, descompilar ou desmontar o software',
        '• Remover avisos de direitos autorais ou marcas registradas',
        '• Usar os Serviços para fins ilegais ou não autorizados',
      ],
    },
    {
      title: '5. Planos e Pagamento',
      content: [
        'Os Serviços são oferecidos através de planos de assinatura com diferentes funcionalidades e preços.',
        'Condições de Pagamento:',
        '• As taxas são cobradas antecipadamente (mensalmente ou anualmente)',
        '• Pagamentos processados através de métodos seguros (cartão de crédito, boleto, transferência)',
        '• Atraso no pagamento pode resultar em suspensão ou cancelamento da conta',
        '• Preços podem ser alterados mediante aviso prévio de 30 dias',
        '• Não há reembolso proporcional em caso de cancelamento, exceto durante período de garantia',
      ],
    },
    {
      title: '6. Período de Teste',
      content: [
        'Oferecemos período de teste gratuito de 14 dias para novos usuários.',
        'Durante o período de teste:',
        '• Você tem acesso a todas as funcionalidades do plano escolhido',
        '• Não é necessário informar cartão de crédito para iniciar',
        '• Pode cancelar a qualquer momento sem custos',
        '• Após o término, a assinatura será ativada automaticamente se você optar por continuar',
      ],
    },
    {
      title: '7. Garantia de Satisfação',
      content: [
        'Oferecemos garantia de 30 dias de satisfação para novos assinantes.',
        'Se você não estiver satisfeito com os Serviços nos primeiros 30 dias após a contratação, pode solicitar reembolso integral através do suporte.',
        'Esta garantia não se aplica a:',
        '• Renovações de assinatura',
        '• Serviços customizados ou consultoria',
        '• Uso indevido ou violação destes termos',
      ],
    },
    {
      title: '8. Propriedade dos Dados',
      content: [
        'Você mantém todos os direitos sobre os dados e conteúdos que inserir na Plataforma.',
        'Você nos concede licença para:',
        '• Armazenar, processar e exibir seus dados para fornecer os Serviços',
        '• Realizar backups e garantir segurança dos dados',
        '• Criar estatísticas agregadas e anonimizadas para melhorar os Serviços',
        'Nunca venderemos seus dados a terceiros. Consulte nossa Política de Privacidade para mais detalhes.',
      ],
    },
    {
      title: '9. Disponibilidade e Suporte',
      content: [
        'Nos esforçamos para manter os Serviços disponíveis 24/7, mas não garantimos operação ininterrupta.',
        'Manutenções programadas serão notificadas com antecedência.',
        'Suporte Técnico:',
        '• Plano Starter: suporte via e-mail em horário comercial',
        '• Plano Professional: suporte prioritário 24/7 via chat e e-mail',
        '• Plano Enterprise: suporte dedicado 24/7 com gerente de conta',
        'Tempo de resposta varia conforme o plano e gravidade do problema.',
      ],
    },
    {
      title: '10. Uso Aceitável',
      content: [
        'Você concorda em NÃO utilizar os Serviços para:',
        '• Violar leis, regulamentos ou direitos de terceiros',
        '• Transmitir malware, vírus ou código malicioso',
        '• Realizar ataques, tentativas de invasão ou sobrecarga de sistemas',
        '• Enviar spam, phishing ou comunicações não solicitadas',
        '• Coletar dados de outros usuários sem autorização',
        '• Compartilhar credenciais de acesso com terceiros não autorizados',
        'Violações podem resultar em suspensão ou cancelamento imediato da conta.',
      ],
    },
    {
      title: '11. Propriedade Intelectual',
      content: [
        'Todos os direitos de propriedade intelectual relacionados aos Serviços pertencem à ROI Labs.',
        'Isso inclui:',
        '• Software, código-fonte e algoritmos',
        '• Interface, design e experiência do usuário',
        '• Marca ROI Labs, logotipos e identidade visual',
        '• Documentação, tutoriais e materiais de treinamento',
        'Qualquer uso não autorizado constitui violação de direitos autorais e propriedade intelectual.',
      ],
    },
    {
      title: '12. Limitação de Responsabilidade',
      content: [
        'Os Serviços são fornecidos "como estão", sem garantias expressas ou implícitas.',
        'A ROI Labs não se responsabiliza por:',
        '• Perda de dados causada por ações do usuário',
        '• Interrupções causadas por terceiros (provedores de internet, energia, etc.)',
        '• Danos indiretos, incidentais ou consequenciais',
        '• Uso indevido ou decisões baseadas nos Serviços',
        'Nossa responsabilidade total está limitada ao valor pago nos últimos 12 meses.',
      ],
    },
    {
      title: '13. Indenização',
      content: [
        'Você concorda em indenizar e isentar a ROI Labs de quaisquer reclamações, danos ou despesas decorrentes de:',
        '• Seu uso dos Serviços',
        '• Violação destes Termos',
        '• Violação de direitos de terceiros',
        '• Conteúdo que você inserir na Plataforma',
      ],
    },
    {
      title: '14. Cancelamento e Rescisão',
      content: [
        'Você pode cancelar sua assinatura a qualquer momento através do painel de controle.',
        'O acesso permanecerá ativo até o fim do período pago.',
        'Podemos suspender ou cancelar sua conta se:',
        '• Houver violação destes Termos',
        '• Ocorrer inadimplência no pagamento',
        '• Houver uso fraudulento ou abusivo',
        'Após o cancelamento, você terá 30 dias para exportar seus dados antes da exclusão permanente.',
      ],
    },
    {
      title: '15. Modificações nos Termos',
      content: [
        'Reservamos o direito de modificar estes Termos a qualquer momento.',
        'Alterações significativas serão notificadas por e-mail com 30 dias de antecedência.',
        'O uso continuado dos Serviços após as alterações constitui aceitação dos novos termos.',
        'Se você não concordar com as alterações, pode cancelar sua assinatura.',
      ],
    },
    {
      title: '16. Lei Aplicável e Jurisdição',
      content: [
        'Estes Termos são regidos pelas leis da República Federativa do Brasil.',
        'Qualquer disputa será resolvida no foro da comarca de São Paulo/SP, com exclusão de qualquer outro, por mais privilegiado que seja.',
      ],
    },
    {
      title: '17. Contato',
      content: [
        'Para dúvidas sobre estes Termos de Serviço:',
        'E-mail: juridico@roilabs.com.br',
        'Telefone: (11) 99999-9999',
        'Endereço: Av. Paulista, 1000 - São Paulo/SP - CEP 01310-100',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-8 bg-gradient-to-b from-pure-black to-gray-950">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-display font-thin mb-6">Termos de Serviço</h1>
            <p className="text-body text-text-secondary">
              Última atualização: 11 de janeiro de 2026
            </p>
            <p className="text-body text-text-secondary mt-4">
              Estes termos estabelecem as condições para uso das soluções ROI Labs. Por favor, leia
              atentamente antes de utilizar nossos serviços.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <RevealOnScroll key={index} delay={0.05 * index}>
              <div className="glass-card p-8">
                <h2 className="text-h3 font-medium mb-6">{section.title}</h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-sm text-text-secondary leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 bg-gradient-to-b from-gray-950 to-pure-black">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-h2 font-light mb-4">Dúvidas sobre os termos?</h2>
            <p className="text-body text-text-secondary mb-8">
              Nossa equipe jurídica está disponível para esclarecer
            </p>
            <a
              href="/contato"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-light tracking-wide transition-all hover:scale-105"
            >
              Entre em contato
            </a>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
