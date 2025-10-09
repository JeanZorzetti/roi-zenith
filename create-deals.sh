#!/bin/bash

API="https://back.roilabs.com.br/api/crm/deals"
COMPANY="company-1760015823118"
CONTACT="contact-1760015830308"
PIPELINE="pipeline-default"

echo "Creating deals..."

# Novo Lead (3)
curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Venda de Licenças SaaS - Startup X\",\"description\":\"Empresa interessada em 50 licenças\",\"value\":25000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-new\",\"probability\":20,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 1"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Implementação ERP - Indústria Y\",\"description\":\"Projeto de implementação completa do ERP\",\"value\":180000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-new\",\"probability\":15,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 2"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Consultoria Digital - Varejo Z\",\"description\":\"Consultoria de transformação digital\",\"value\":45000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-new\",\"probability\":25,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 3"

# Contato Realizado (5)
curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"CRM Customizado - Fintech A\",\"description\":\"Desenvolvimento de CRM personalizado\",\"value\":95000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-contacted\",\"probability\":35,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 4"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Migração Cloud - Empresa B\",\"description\":\"Migração de infraestrutura para cloud\",\"value\":120000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-contacted\",\"probability\":30,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 5"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Automação de Marketing - Empresa C\",\"description\":\"Setup completo de automação\",\"value\":35000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-contacted\",\"probability\":40,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 6"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Sistema de Gestão - Clínica D\",\"description\":\"Sistema de gestão para clínicas\",\"value\":78000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-contacted\",\"probability\":30,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 7"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"E-commerce B2B - Distribuidora E\",\"description\":\"Plataforma de vendas B2B\",\"value\":150000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-contacted\",\"probability\":25,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 8"

# Qualificado (4)
curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Integração APIs - Fintech F\",\"description\":\"Integração com sistemas bancários\",\"value\":65000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-qualified\",\"probability\":50,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 9"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"App Mobile - Startup G\",\"description\":\"App iOS e Android\",\"value\":110000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-qualified\",\"probability\":55,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 10"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"BI e Analytics - Empresa H\",\"description\":\"Dashboard executivo com BI\",\"value\":48000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-qualified\",\"probability\":45,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 11"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Expansão de Licenças - Cliente I\",\"description\":\"Expansão para 100 usuários\",\"value\":85000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-qualified\",\"probability\":60,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 12"

# Proposta Enviada (3)
curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Sistema Logístico - Transportadora J\",\"description\":\"Sistema de gestão de frotas\",\"value\":195000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-proposal\",\"probability\":65,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 13"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Portal do Cliente - Empresa K\",\"description\":\"Portal web B2B\",\"value\":72000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-proposal\",\"probability\":70,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 14"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"AI Chatbot - E-commerce L\",\"description\":\"Chatbot com IA\",\"value\":38000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-proposal\",\"probability\":60,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 15"

# Em Negociação (2)
curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Migração Legacy - Banco M\",\"description\":\"Modernização de sistema legado\",\"value\":450000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-negotiation\",\"probability\":75,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 16"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Plataforma Educacional - Escola N\",\"description\":\"EAD para 5000 alunos\",\"value\":220000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-negotiation\",\"probability\":80,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 17"

# Ganho (2)
curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Website Institucional - Empresa O\",\"description\":\"Site + SEO + Hospedagem\",\"value\":28000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-closed-won\",\"probability\":100,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 18"

curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"Sistema RH - Empresa P\",\"description\":\"Sistema de gestão de RH\",\"value\":65000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-closed-won\",\"probability\":100,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 19"

# Perdido (1)
curl -X POST "$API" -H "Content-Type: application/json" -d "{\"title\":\"ERP Completo - Indústria Q\",\"description\":\"Optaram por concorrente\",\"value\":180000,\"currency\":\"BRL\",\"pipelineId\":\"$PIPELINE\",\"stageId\":\"stage-closed-lost\",\"probability\":0,\"companyId\":\"$COMPANY\",\"contactId\":\"$CONTACT\"}" -s > /dev/null && echo "✓ Deal 20"

echo ""
echo "🎉 20 deals criados com sucesso!"
echo "💰 Total: R$ 2.208.000"
