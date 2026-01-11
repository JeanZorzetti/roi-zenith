#!/usr/bin/env python3
"""
Script para popular o CRM com dados de teste
Execute: python populate-crm-data.py
"""

import json
import subprocess
import time

API_BASE = "https://back.roilabs.com.br/api/crm"

def curl_post(endpoint, data):
    """Faz uma requisição POST usando curl"""
    cmd = [
        'curl', '-s', '-X', 'POST',
        f'{API_BASE}/{endpoint}',
        '-H', 'Content-Type: application/json',
        '-d', json.dumps(data)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return json.loads(result.stdout) if result.stdout else {}

print("🌱 Populando CRM com dados de teste...\n")

# 1. Criar empresa
print("📝 Criando empresa...")
company_data = {
    "name": "Empresa Teste ACME Corp",
    "sector": "Tecnologia",
    "size": "MEDIUM",
    "website": "https://acme.example.com",
    "phone": "(11) 98765-4321"
}
company_response = curl_post("companies", company_data)
company_id = company_response.get('company', {}).get('id')
print(f"✅ Empresa criada: {company_id}\n")

# 2. Criar contato
print("📝 Criando contato...")
contact_data = {
    "firstName": "João",
    "lastName": "Silva",
    "email": "joao.silva@acme.example.com",
    "phone": "(11) 98765-4321",
    "position": "Diretor de TI",
    "companyId": company_id
}
contact_response = curl_post("contacts", contact_data)
contact_id = contact_response.get('contact', {}).get('id')
print(f"✅ Contato criado: {contact_id}\n")

# 3. Criar deals
print("📝 Criando deals de teste...\n")

deals_data = [
    # Novo Lead (3 deals)
    ("stage-new", "Venda de Licenças SaaS - Startup X", "Empresa interessada em 50 licenças", 25000, 20),
    ("stage-new", "Implementação ERP - Indústria Y", "Projeto de implementação completa do ERP", 180000, 15),
    ("stage-new", "Consultoria Digital - Varejo Z", "Consultoria de transformação digital", 45000, 25),

    # Contato Realizado (5 deals)
    ("stage-contacted", "CRM Customizado - Fintech A", "Desenvolvimento de CRM personalizado", 95000, 35),
    ("stage-contacted", "Migração Cloud - Empresa B", "Migração de infraestrutura para cloud", 120000, 30),
    ("stage-contacted", "Automação de Marketing - Empresa C", "Setup completo de automação", 35000, 40),
    ("stage-contacted", "Sistema de Gestão - Clínica D", "Sistema de gestão para clínicas", 78000, 30),
    ("stage-contacted", "E-commerce B2B - Distribuidora E", "Plataforma de vendas B2B", 150000, 25),

    # Qualificado (4 deals)
    ("stage-qualified", "Integração APIs - Fintech F", "Integração com sistemas bancários", 65000, 50),
    ("stage-qualified", "App Mobile - Startup G", "App iOS e Android", 110000, 55),
    ("stage-qualified", "BI e Analytics - Empresa H", "Dashboard executivo com BI", 48000, 45),
    ("stage-qualified", "Expansão de Licenças - Cliente I", "Expansão para 100 usuários", 85000, 60),

    # Proposta Enviada (3 deals)
    ("stage-proposal", "Sistema Logístico - Transportadora J", "Sistema de gestão de frotas", 195000, 65),
    ("stage-proposal", "Portal do Cliente - Empresa K", "Portal web B2B", 72000, 70),
    ("stage-proposal", "AI Chatbot - E-commerce L", "Chatbot com IA", 38000, 60),

    # Em Negociação (2 deals)
    ("stage-negotiation", "Migração Legacy - Banco M", "Modernização de sistema legado", 450000, 75),
    ("stage-negotiation", "Plataforma Educacional - Escola N", "EAD para 5000 alunos", 220000, 80),

    # Ganho (2 deals)
    ("stage-closed-won", "Website Institucional - Empresa O", "Site + SEO + Hospedagem", 28000, 100),
    ("stage-closed-won", "Sistema RH - Empresa P", "Sistema de gestão de RH", 65000, 100),

    # Perdido (1 deal)
    ("stage-closed-lost", "ERP Completo - Indústria Q", "Optaram por concorrente", 180000, 0)
]

created = 0
for stage_id, title, description, value, probability in deals_data:
    deal_data = {
        "title": title,
        "description": description,
        "value": value,
        "currency": "BRL",
        "pipelineId": "pipeline-default",
        "stageId": stage_id,
        "probability": probability,
        "companyId": company_id,
        "contactId": contact_id
    }

    curl_post("deals", deal_data)
    created += 1
    print(f"   ✓ Deal {created}: {title}")
    time.sleep(0.1)  # Pequeno delay para não sobrecarregar a API

print(f"\n🎉 Concluído! {created} deals criados com sucesso!")
print("💰 Total em pipeline: R$ 2.208.000\n")
