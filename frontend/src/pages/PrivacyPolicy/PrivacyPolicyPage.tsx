import { useEffect } from 'react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-pure-black text-pure-white py-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-thin tracking-wider mb-4">
            Política de Privacidade
          </h1>
          <p className="text-text-secondary">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-text-secondary leading-relaxed">
          {/* Introdução */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">1. Introdução</h2>
            <p>
              A ROI Labs ("nós", "nosso" ou "nos") está comprometida em proteger sua privacidade.
              Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos
              suas informações quando você utiliza nossa plataforma de SDR com Inteligência Artificial
              para pré-vendas B2B.
            </p>
          </section>

          {/* Informações que Coletamos */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">2. Informações que Coletamos</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-thin text-pure-white mb-2">2.1 Informações Fornecidas por Você</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Dados de cadastro (nome, e-mail, telefone, empresa)</li>
                  <li>Informações de pagamento e faturamento</li>
                  <li>Dados de leads e clientes inseridos na plataforma</li>
                  <li>Comunicações e suporte ao cliente</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-thin text-pure-white mb-2">2.2 Informações Coletadas Automaticamente</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Dados de uso da plataforma (páginas visitadas, ações realizadas)</li>
                  <li>Informações do dispositivo (endereço IP, navegador, sistema operacional)</li>
                  <li>Cookies e tecnologias similares</li>
                  <li>Logs de acesso e segurança</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Como Usamos suas Informações */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">3. Como Usamos suas Informações</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecer e melhorar nossos serviços de SDR AI</li>
              <li>Processar transações e enviar notificações relacionadas</li>
              <li>Personalizar sua experiência na plataforma</li>
              <li>Enviar comunicações de marketing (com seu consentimento)</li>
              <li>Analisar o uso da plataforma para melhorias</li>
              <li>Detectar, prevenir e resolver problemas técnicos ou de segurança</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          {/* Compartilhamento de Informações */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">4. Compartilhamento de Informações</h2>
            <p className="mb-4">
              Não vendemos suas informações pessoais. Podemos compartilhar seus dados apenas nas seguintes situações:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Provedores de serviços:</strong> empresas que nos auxiliam na operação da plataforma</li>
              <li><strong>Conformidade legal:</strong> quando exigido por lei ou processo legal</li>
              <li><strong>Proteção de direitos:</strong> para proteger nossos direitos, propriedade ou segurança</li>
              <li><strong>Transações empresariais:</strong> em caso de fusão, aquisição ou venda de ativos</li>
              <li><strong>Com seu consentimento:</strong> em outras situações mediante sua autorização expressa</li>
            </ul>
          </section>

          {/* Segurança dos Dados */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">5. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Controles de acesso e autenticação</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Auditorias regulares de segurança</li>
              <li>Treinamento de equipe sobre proteção de dados</li>
            </ul>
          </section>

          {/* Seus Direitos (LGPD) */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">6. Seus Direitos (LGPD)</h2>
            <p className="mb-4">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Confirmação da existência de tratamento de dados</li>
              <li>Acesso aos seus dados pessoais</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Portabilidade de dados a outro fornecedor</li>
              <li>Eliminação de dados tratados com seu consentimento</li>
              <li>Informação sobre compartilhamento de dados</li>
              <li>Revogação do consentimento</li>
            </ul>
            <p className="mt-4">
              Para exercer seus direitos, entre em contato através do e-mail: <a href="mailto:privacidade@roilabs.com.br" className="text-primary-blue hover:underline">privacidade@roilabs.com.br</a>
            </p>
          </section>

          {/* Retenção de Dados */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">7. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades
              descritas nesta política, a menos que um período de retenção mais longo seja exigido ou
              permitido por lei. Após esse período, seus dados serão excluídos ou anonimizados de forma segura.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">8. Cookies e Tecnologias Similares</h2>
            <p className="mb-4">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência. Você pode gerenciar
              suas preferências de cookies através das configurações do seu navegador. Os tipos de cookies que usamos incluem:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Cookies essenciais:</strong> necessários para o funcionamento da plataforma</li>
              <li><strong>Cookies de desempenho:</strong> para análise e melhoria do serviço</li>
              <li><strong>Cookies de funcionalidade:</strong> para lembrar suas preferências</li>
              <li><strong>Cookies de marketing:</strong> para personalizar anúncios (com seu consentimento)</li>
            </ul>
          </section>

          {/* Transferência Internacional */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">9. Transferência Internacional de Dados</h2>
            <p>
              Seus dados podem ser transferidos e processados em servidores localizados fora do Brasil.
              Nesses casos, garantimos que medidas de segurança adequadas sejam implementadas em conformidade
              com a LGPD, incluindo cláusulas contratuais padrão e verificação de adequação do país de destino.
            </p>
          </section>

          {/* Menores de Idade */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">10. Menores de Idade</h2>
            <p>
              Nossos serviços são destinados a empresas e profissionais. Não coletamos intencionalmente
              informações de menores de 18 anos. Se tomarmos conhecimento de que coletamos dados de um
              menor sem consentimento parental adequado, tomaremos medidas para excluir essas informações.
            </p>
          </section>

          {/* Alterações na Política */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">11. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre
              mudanças significativas através do e-mail cadastrado ou de um aviso destacado em nossa
              plataforma. Recomendamos que revise esta política regularmente.
            </p>
          </section>

          {/* Contato */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">12. Contato</h2>
            <p className="mb-4">
              Para questões sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato:
            </p>
            <div className="space-y-2 ml-4">
              <p><strong>ROI Labs</strong></p>
              <p>E-mail: <a href="mailto:privacidade@roilabs.com.br" className="text-primary-blue hover:underline">privacidade@roilabs.com.br</a></p>
              <p>E-mail alternativo: <a href="mailto:contato@roilabs.com.br" className="text-primary-blue hover:underline">contato@roilabs.com.br</a></p>
            </div>
          </section>

          {/* DPO */}
          <section>
            <h2 className="text-2xl font-thin text-pure-white mb-4">13. Encarregado de Proteção de Dados (DPO)</h2>
            <p>
              Designamos um Encarregado de Proteção de Dados (DPO) conforme exigido pela LGPD.
              Para questões específicas sobre proteção de dados, entre em contato diretamente com nosso DPO:
            </p>
            <p className="mt-4 ml-4">
              E-mail: <a href="mailto:dpo@roilabs.com.br" className="text-primary-blue hover:underline">dpo@roilabs.com.br</a>
            </p>
          </section>
        </div>

        {/* Footer da página */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-text-tertiary text-sm">
          <p>© 2025 ROI Labs. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}