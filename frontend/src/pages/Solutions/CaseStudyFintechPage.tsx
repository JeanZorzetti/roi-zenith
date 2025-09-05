import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, CheckCircle, Shield, Users, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CaseStudyFintechPage = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact', { 
      state: { 
        subject: 'Interesse em Compliance-First Sales AI para Fintech',
        message: 'Vi o case study da SecureFinance e tenho interesse em implementar Compliance-First Sales AI para nossa fintech. Gostaria de entender como vocês podem nos ajudar a acelerar vendas mantendo 100% de compliance regulatório.'
      } 
    });
  };

  const metrics = [
    { label: "Compliance Guarantee", value: "100%", icon: <Shield className="w-6 h-6" />, color: "text-green-400" },
    { label: "Qualified Leads", value: "3.2x", icon: <Users className="w-6 h-6" />, color: "text-blue-400" },
    { label: "Risk Mitigation", value: "-89%", icon: <AlertTriangle className="w-6 h-6" />, color: "text-purple-400" },
    { label: "Regulatory Approval Time", value: "-67%", icon: <Clock className="w-6 h-6" />, color: "text-yellow-400" }
  ];

  const complianceChallenges = [
    "LGPD, BACEN e CVM exigem documentação completa de toda comunicação",
    "Auditores precisam rastrear origem e tratamento de cada lead",
    "Penalidades regulatórias podem chegar a R$ 50M por violação",
    "Processo manual de compliance atrasava vendas em 45-60 dias",
    "Equipe jurídica sobrecarregada com revisão de scripts e campanhas"
  ];

  const regulatoryFeatures = [
    {
      regulation: "LGPD (Lei Geral de Proteção de Dados)",
      challenge: "Consentimento explícito e rastreabilidade de dados pessoais",
      solution: "Consent Management AI que documenta e valida ogni interação",
      compliance: "100% audit-ready com logs imutáveis"
    },
    {
      regulation: "Resolução BACEN 4.658",
      challenge: "Governança de dados e gestão de risco operacional",
      solution: "Risk Assessment Engine integrada ao SDR AI",
      compliance: "Classificação automática de risco por cliente"
    },
    {
      regulation: "Instrução CVM 588",
      challenge: "Due diligence e suitability de investidores",
      solution: "Automated KYC/AML verification no pipeline",
      compliance: "Verificação em tempo real durante qualificação"
    },
    {
      regulation: "Lei do Marco Legal das Startups",
      challenge: "Crowd funding e investimento anjo regulations",
      solution: "Investor Classification AI para compliance automático",
      compliance: "Categorização legal automática de investidores"
    }
  ];

  const riskMitigation = [
    {
      riskType: "Regulatory Penalties",
      beforeAI: "R$ 2.3M em multas potenciais por ano",
      afterAI: "R$ 0 em exposição regulatória",
      mitigation: "100% compliance guarantee"
    },
    {
      riskType: "Audit Failures",
      beforeAI: "78% das auditorias geravam non-compliance findings",
      afterAI: "100% audit pass rate com documentação completa",
      mitigation: "Automated compliance reporting"
    },
    {
      riskType: "Reputational Risk",
      beforeAI: "Alto risco de exposição na mídia por violations",
      afterAI: "Zero incidents reportados em 18 meses",
      mitigation: "Proactive compliance monitoring"
    }
  ];

  const solutions = [
    {
      title: "Compliance-First Lead Qualification",
      description: "Sistema que integra verificações regulatórias no processo de qualificação, garantindo que apenas leads em compliance avancem no funil de vendas.",
      results: "Zero incidents de compliance em 18 meses de operação"
    },
    {
      title: "Automated KYC/AML Integration",
      description: "IA que executa verificações KYC/AML automaticamente durante a conversa, validando documentos e classificando risco sem fricção para o prospect.",
      results: "Redução de 67% no tempo de onboarding de clientes"
    },
    {
      title: "Regulatory Documentation Engine",
      description: "Geração automática de toda documentação necessária para auditorias, incluindo logs de consentimento, trilhas de aprovação e relatórios regulatórios.",
      results: "100% audit pass rate com zero manual work"
    }
  ];

  const complianceWorkflow = [
    {
      step: "Lead Capture",
      process: "Consent Management AI validates LGPD compliance",
      verification: "✅ Explicit consent documented with immutable timestamp",
      status: "automated"
    },
    {
      step: "Initial Qualification", 
      process: "Risk Assessment Engine classifies prospect profile",
      verification: "✅ BACEN risk categories automatically assigned",
      status: "automated"
    },
    {
      step: "KYC Verification",
      process: "Document AI validates identity and source of funds",
      verification: "✅ AML checks completed against PEP/sanctions lists",
      status: "automated"
    },
    {
      step: "Suitability Assessment",
      process: "CVM compliance AI ensures product-client fit",
      verification: "✅ Investment profile matches product risk rating",
      status: "automated"
    },
    {
      step: "Contract Generation",
      process: "Legal AI generates compliant contracts automatically",
      verification: "✅ All regulatory clauses included and updated",
      status: "automated"
    },
    {
      step: "Audit Trail",
      process: "Compliance reporting AI generates audit documentation",
      verification: "✅ Complete paper trail for regulatory inspection",
      status: "automated"
    }
  ];

  const beforeAfterMetrics = [
    {
      metric: "Compliance Review Time",
      before: "45-60 dias por cliente",
      after: "2-3 horas automatizadas",
      improvement: "-96%"
    },
    {
      metric: "Legal Team Overhead",
      before: "80% do tempo em compliance manual",
      after: "15% do tempo em exceptions apenas",
      improvement: "-81%"
    },
    {
      metric: "Regulatory Risk Score",
      before: "Alto risco (8.5/10) com gaps de documentação",
      after: "Baixo risco (1.2/10) com full compliance",
      improvement: "-86%"
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-pure-black via-charcoal to-pure-black">
      {/* Header */}
      <AnimatedSection className="container mx-auto px-4 py-12">
        <Link to="/solutions" className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Solutions
        </Link>
        
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full font-medium">
              Fintech
            </span>
            <span className="bg-shield-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              CASE STUDY
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white">
            SecureFinance: 100% Compliance + 3x Mais Leads com Sales AI
          </h1>
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
            Fintech de investimentos navega LGPD, BACEN e CVM com perfeição, acelerando 
            vendas sem comprometer compliance regulatório em nenhum momento.
          </p>
        </div>
      </AnimatedSection>

      {/* Company Overview */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Sobre a SecureFinance</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                <strong className="text-green-400">Empresa:</strong> SecureFinance Investimentos<br/>
                <strong className="text-green-400">Setor:</strong> Investment Platform & Wealth Management<br/>
                <strong className="text-green-400">Regulação:</strong> CVM, BACEN, ANBIMA<br/>
                <strong className="text-green-400">AUM:</strong> R$ 2.4B sob gestão
              </p>
              <p className="leading-relaxed">
                Fintech regulamentada oferecendo produtos de investimento para PF e PJ, 
                com foco em compliance rigoroso e transparência total para reguladores.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className={`mb-3 ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-300">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Compliance Challenge */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            O Desafio Regulatório
          </h2>
          <div className="glass-card p-8">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              "Estávamos crescendo 40%/mês mas cada nova regulação criava mais fricção. 
              LGPD, circular BACEN 4.658, instrução CVM 588... Nosso time jurídico não 
              conseguia acompanhar. Um erro de compliance poderia custar nossa licença."
            </p>
            <div className="text-right">
              <p className="font-semibold text-green-400">— Roberto Silva, CEO, SecureFinance</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6 text-white">Complexidade Regulatória:</h3>
              <div className="space-y-4">
                {complianceChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Regulatory Framework */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Framework de Compliance Automatizado
        </h2>
        
        <div className="space-y-8 max-w-6xl mx-auto">
          {regulatoryFeatures.map((reg, index) => (
            <div key={index} className="glass-card p-8">
              <div className="grid lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-2">{reg.regulation}</h3>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">⚠️ Desafio</h4>
                  <p className="text-gray-300 text-sm">{reg.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">🤖 Solução IA</h4>
                  <p className="text-gray-300 text-sm">{reg.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">✅ Compliance</h4>
                  <p className="text-green-300 text-sm font-medium">{reg.compliance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Compliance Workflow */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Workflow de Compliance Automatizado
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {complianceWorkflow.map((item, index) => (
            <div key={index} className="flex items-start mb-8">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mr-6 font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{item.step}</h3>
                <p className="text-gray-300 mb-3">{item.process}</p>
                <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-3">
                  <p className="text-green-400 text-sm">{item.verification}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Risk Mitigation */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Mitigação de Riscos Regulatórios
        </h2>
        
        <div className="grid gap-8 max-w-6xl mx-auto">
          {riskMitigation.map((risk, index) => (
            <div key={index} className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-400">{risk.riskType}</h3>
              <div className="grid lg:grid-cols-3 gap-6 items-center">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">❌ Antes da IA</h4>
                  <p className="text-gray-300">{risk.beforeAI}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">✅ Com Compliance AI</h4>
                  <p className="text-gray-300">{risk.afterAI}</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-400/30 rounded-lg p-4">
                    <div className="text-green-400 font-semibold text-sm">Mitigação</div>
                    <div className="text-white font-bold mt-1">{risk.mitigation}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Before/After Metrics */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Transformação Operacional
        </h2>
        
        <div className="grid gap-6 max-w-6xl mx-auto">
          {beforeAfterMetrics.map((item, index) => (
            <div key={index} className="glass-card p-8">
              <div className="grid lg:grid-cols-4 gap-6 items-center">
                <div>
                  <h3 className="text-lg font-bold text-white">{item.metric}</h3>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-1">❌ Antes</h4>
                  <p className="text-gray-300 text-sm">{item.before}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">✅ Depois</h4>
                  <p className="text-gray-300 text-sm">{item.after}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{item.improvement}</div>
                  <div className="text-sm text-gray-400">Melhoria</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Solution Components */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Componentes da Solução
        </h2>
        
        <div className="grid gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div key={index} className="glass-card p-8">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-4 text-green-400">{solution.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{solution.description}</p>
                </div>
                <div>
                  <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4 text-center">
                    <div className="text-green-400 font-semibold">Resultado</div>
                    <div className="text-white font-bold mt-1">{solution.results}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Final Results */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">Resultados Após 12 Meses</h2>
          
          <div className="glass-card p-8 mb-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-gray-300">Compliance Rate</div>
                <div className="text-sm text-gray-400 mt-1">Zero violations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">3.2x</div>
                <div className="text-gray-300">Qualified Leads</div>
                <div className="text-sm text-gray-400 mt-1">Mantendo compliance</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">89%</div>
                <div className="text-gray-300">Risk Mitigation</div>
                <div className="text-sm text-gray-400 mt-1">Redução de exposição</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">67%</div>
                <div className="text-gray-300">Faster Approval</div>
                <div className="text-sm text-gray-400 mt-1">Onboarding acelerado</div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-6">
              <p className="text-lg text-white mb-4">
                <strong>"Compliance-First Sales AI nos permitiu crescer com segurança total. 
                Agora vendemos 3x mais com zero preocupação regulatória."</strong>
              </p>
              <p className="text-green-400">— Roberto Silva, CEO, SecureFinance</p>
            </div>
          </div>

          <button 
            onClick={handleContactUs}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Quero Sales AI com 100% Compliance
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default CaseStudyFintechPage;