import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { FadeIn, RevealOnScroll } from '@/components/animations';

export const metadata: Metadata = {
  title: 'Política de Privacidade | ROI Labs',
  description:
    'Política de Privacidade da ROI Labs. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.',
};

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Introdução',
      content: [
        'A ROI Labs Tecnologia Ltda. ("ROI Labs", "nós" ou "nosso") respeita sua privacidade e está comprometida em proteger seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossos serviços.',
        'Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e outras legislações aplicáveis.',
      ],
    },
    {
      title: '2. Dados Coletados',
      content: [
        'Coletamos diferentes tipos de dados pessoais dependendo de como você interage com nossos serviços:',
        '• Dados de Cadastro: nome completo, e-mail, telefone, CPF/CNPJ, cargo, empresa',
        '• Dados de Navegação: endereço IP, tipo de navegador, páginas visitadas, tempo de permanência',
        '• Dados de Uso: interações com a plataforma, preferências, configurações',
        '• Dados de Comunicação: e-mails, mensagens, tickets de suporte',
        '• Dados de Pagamento: informações de cobrança (processadas por parceiros certificados PCI-DSS)',
      ],
    },
    {
      title: '3. Finalidade do Tratamento',
      content: [
        'Utilizamos seus dados pessoais para as seguintes finalidades:',
        '• Prestação de Serviços: fornecer acesso e funcionalidades das soluções ROI Labs',
        '• Comunicação: enviar notificações importantes, atualizações e suporte técnico',
        '• Melhoria: analisar uso e melhorar nossos produtos e serviços',
        '• Marketing: enviar comunicações promocionais (com seu consentimento)',
        '• Segurança: proteger contra fraudes, abusos e atividades ilícitas',
        '• Compliance: cumprir obrigações legais e regulatórias',
      ],
    },
    {
      title: '4. Base Legal',
      content: [
        'O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses legais:',
        '• Execução de Contrato: necessário para fornecer os serviços contratados',
        '• Consentimento: quando solicitamos sua autorização expressa',
        '• Legítimo Interesse: para melhorar nossos serviços e prevenir fraudes',
        '• Obrigação Legal: para cumprir requisitos legais e regulatórios',
      ],
    },
    {
      title: '5. Compartilhamento de Dados',
      content: [
        'Podemos compartilhar seus dados pessoais com:',
        '• Prestadores de Serviço: empresas que nos auxiliam na operação (hospedagem, pagamento, suporte)',
        '• Parceiros Comerciais: com seu consentimento expresso',
        '• Autoridades: quando exigido por lei ou ordem judicial',
        'Todos os parceiros são cuidadosamente selecionados e obrigados contratualmente a proteger seus dados.',
      ],
    },
    {
      title: '6. Armazenamento e Segurança',
      content: [
        'Seus dados são armazenados em servidores seguros localizados no Brasil e/ou em data centers certificados internacionalmente.',
        'Implementamos medidas técnicas e organizacionais de segurança, incluindo:',
        '• Criptografia SSL/TLS para dados em trânsito',
        '• Criptografia AES-256 para dados em repouso',
        '• Autenticação de dois fatores (2FA)',
        '• Controles de acesso rigorosos',
        '• Monitoramento contínuo de segurança',
        '• Backups regulares e redundância geográfica',
      ],
    },
    {
      title: '7. Retenção de Dados',
      content: [
        'Mantemos seus dados pessoais apenas pelo tempo necessário para:',
        '• Cumprir as finalidades descritas nesta política',
        '• Atender obrigações legais, contratuais e regulatórias',
        '• Resolver disputas e fazer cumprir nossos acordos',
        'Após o término do relacionamento, os dados são excluídos de forma segura ou anonimizados, exceto quando a lei exigir retenção por período maior.',
      ],
    },
    {
      title: '8. Seus Direitos',
      content: [
        'De acordo com a LGPD, você tem os seguintes direitos sobre seus dados pessoais:',
        '• Confirmação e Acesso: saber se tratamos seus dados e acessá-los',
        '• Correção: corrigir dados incompletos, inexatos ou desatualizados',
        '• Anonimização, Bloqueio ou Eliminação: de dados desnecessários ou tratados em desconformidade',
        '• Portabilidade: receber seus dados em formato estruturado',
        '• Eliminação: dos dados tratados com base em consentimento',
        '• Informação: sobre compartilhamento com entidades públicas e privadas',
        '• Revogação do Consentimento: a qualquer momento',
        'Para exercer seus direitos, entre em contato através de: privacidade@roilabs.com.br',
      ],
    },
    {
      title: '9. Cookies',
      content: [
        'Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência:',
        '• Cookies Essenciais: necessários para o funcionamento da plataforma',
        '• Cookies de Performance: para análise de uso e melhoria de desempenho',
        '• Cookies de Funcionalidade: para lembrar suas preferências',
        '• Cookies de Marketing: para personalizar comunicações (com seu consentimento)',
        'Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.',
      ],
    },
    {
      title: '10. Transferência Internacional',
      content: [
        'Alguns de nossos prestadores de serviço podem estar localizados fora do Brasil. Nestes casos, asseguramos que:',
        '• O país de destino oferece nível adequado de proteção de dados, ou',
        '• Implementamos cláusulas contratuais padrão aprovadas pela ANPD',
        'Seus dados nunca serão transferidos sem garantias adequadas de proteção.',
      ],
    },
    {
      title: '11. Menores de Idade',
      content: [
        'Nossos serviços não são destinados a menores de 18 anos. Não coletamos intencionalmente dados de menores sem o consentimento dos pais ou responsáveis legais.',
        'Se tomarmos conhecimento de que coletamos dados de menores sem autorização, tomaremos medidas para excluí-los imediatamente.',
      ],
    },
    {
      title: '12. Alterações nesta Política',
      content: [
        'Podemos atualizar esta Política de Privacidade periodicamente. Quando houver alterações significativas, notificaremos você por e-mail ou através de aviso em nossa plataforma.',
        'A versão mais recente estará sempre disponível nesta página, com a data da última atualização.',
      ],
    },
    {
      title: '13. Contato',
      content: [
        'Para dúvidas, solicitações ou exercício de direitos relacionados à privacidade, entre em contato:',
        'E-mail: privacidade@roilabs.com.br',
        'Telefone: (11) 99999-9999',
        'Endereço: Av. Paulista, 1000 - São Paulo/SP - CEP 01310-100',
        'Encarregado de Dados (DPO): Responsável pelo tratamento de dados pessoais',
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
            <h1 className="text-display font-thin mb-6">Política de Privacidade</h1>
            <p className="text-body text-text-secondary">
              Última atualização: 11 de janeiro de 2026
            </p>
            <p className="text-body text-text-secondary mt-4">
              Sua privacidade é importante para nós. Esta política descreve como a ROI Labs coleta,
              usa e protege seus dados pessoais em conformidade com a LGPD.
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
            <h2 className="text-h2 font-light mb-4">Dúvidas sobre privacidade?</h2>
            <p className="text-body text-text-secondary mb-8">
              Nossa equipe de privacidade está pronta para ajudar
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
