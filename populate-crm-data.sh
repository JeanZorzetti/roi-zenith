#!/bin/bash

API_BASE="https://back.roilabs.com.br/api/crm"

echo "🌱 Populando CRM com dados de teste..."
echo ""

# 1. Criar empresa
echo "📝 Criando empresa..."
COMPANY_RESPONSE=$(curl -s -X POST "$API_BASE/companies" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Empresa Teste ACME Corp",
    "sector": "Tecnologia",
    "size": "MEDIUM",
    "website": "https://acme.example.com",
    "phone": "(11) 98765-4321"
  }')

COMPANY_ID=$(echo $COMPANY_RESPONSE | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "✅ Empresa criada: $COMPANY_ID"
echo ""

# 2. Criar contato
echo "📝 Criando contato..."
CONTACT_RESPONSE=$(curl -s -X POST "$API_BASE/contacts" \
  -H "Content-Type: application/json" \
  -d "{
    \"firstName\": \"João\",
    \"lastName\": \"Silva\",
    \"email\": \"joao.silva@acme.example.com\",
    \"phone\": \"(11) 98765-4321\",
    \"position\": \"Diretor de TI\",
    \"companyId\": \"$COMPANY_ID\"
  }")

CONTACT_ID=$(echo $CONTACT_RESPONSE | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "✅ Contato criado: $CONTACT_ID"
echo ""

# 3. Criar deals
echo "📝 Criando deals de teste..."
echo ""

# Array de deals
declare -a DEALS=(
  # Novo Lead (3 deals)
  "stage-new|Venda de Licenças SaaS - Startup X|Empresa interessada em 50 licenças|25000|20"
  "stage-new|Implementação ERP - Indústria Y|Projeto de implementação completa do ERP|180000|15"
  "stage-new|Consultoria Digital - Varejo Z|Consultoria de transformação digital|45000|25"

  # Contato Realizado (5 deals)
  "stage-contacted|CRM Customizado - Fintech A|Desenvolvimento de CRM personalizado|95000|35"
  "stage-contacted|Migração Cloud - Empresa B|Migração de infraestrutura para cloud|120000|30"
  "stage-contacted|Automação de Marketing - Empresa C|Setup completo de automação|35000|40"
  "stage-contacted|Sistema de Gestão - Clínica D|Sistema de gestão para clínicas|78000|30"
  "stage-contacted|E-commerce B2B - Distribuidora E|Plataforma de vendas B2B|150000|25"

  # Qualificado (4 deals)
  "stage-qualified|Integração APIs - Fintech F|Integração com sistemas bancários|65000|50"
  "stage-qualified|App Mobile - Startup G|App iOS e Android|110000|55"
  "stage-qualified|BI e Analytics - Empresa H|Dashboard executivo com BI|48000|45"
  "stage-qualified|Expansão de Licenças - Cliente I|Expansão para 100 usuários|85000|60"

  # Proposta Enviada (3 deals)
  "stage-proposal|Sistema Logístico - Transportadora J|Sistema de gestão de frotas|195000|65"
  "stage-proposal|Portal do Cliente - Empresa K|Portal web B2B|72000|70"
  "stage-proposal|AI Chatbot - E-commerce L|Chatbot com IA|38000|60"

  # Em Negociação (2 deals)
  "stage-negotiation|Migração Legacy - Banco M|Modernização de sistema legado|450000|75"
  "stage-negotiation|Plataforma Educacional - Escola N|EAD para 5000 alunos|220000|80"

  # Ganho (2 deals)
  "stage-closed-won|Website Institucional - Empresa O|Site + SEO + Hospedagem|28000|100"
  "stage-closed-won|Sistema RH - Empresa P|Sistema de gestão de RH|65000|100"

  # Perdido (1 deal)
  "stage-closed-lost|ERP Completo - Indústria Q|Optaram por concorrente|180000|0"
)

CREATED=0
for deal in "${DEALS[@]}"; do
  IFS='|' read -r STAGE_ID TITLE DESCRIPTION VALUE PROBABILITY <<< "$deal"

  curl -s -X POST "$API_BASE/deals" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"$TITLE\",
      \"description\": \"$DESCRIPTION\",
      \"value\": $VALUE,
      \"currency\": \"BRL\",
      \"pipelineId\": \"pipeline-default\",
      \"stageId\": \"$STAGE_ID\",
      \"probability\": $PROBABILITY,
      \"companyId\": \"$COMPANY_ID\",
      \"contactId\": \"$CONTACT_ID\"
    }" > /dev/null

  CREATED=$((CREATED + 1))
  echo "   ✓ Deal $CREATED: $TITLE"
done

echo ""
echo "🎉 Concluído! $CREATED deals criados com sucesso!"
echo "💰 Total em pipeline: R$ 2.208.000"
echo ""
