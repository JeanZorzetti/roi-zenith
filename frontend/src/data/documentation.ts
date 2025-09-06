export interface DocSection {
  id: string;
  title: string;
  slug: string;
  category: 'Getting Started' | 'API Reference' | 'Guides' | 'SDKs' | 'Webhooks';
  order: number;
  content: string;
  lastUpdated: string;
  tags: string[];
}

export interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  title: string;
  description: string;
  parameters?: APIParameter[];
  requestBody?: any;
  responses: APIResponse[];
  examples: CodeExample[];
}

export interface APIParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required: boolean;
  description: string;
  example?: any;
}

export interface APIResponse {
  status: number;
  description: string;
  example: any;
}

export interface CodeExample {
  language: 'curl' | 'javascript' | 'python' | 'php';
  code: string;
}

export const documentationSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Primeiros Passos',
    slug: 'getting-started',
    category: 'Getting Started',
    order: 1,
    content: `
# Primeiros Passos com ROI Labs API

Bem-vindo à documentação da ROI Labs API. Nossa API REST permite integrar facilmente soluções de SDR AI em seus sistemas existentes.

## Visão Geral

A ROI Labs API oferece endpoints para:
- **Lead Management**: Criar, qualificar e gerenciar leads
- **Campaign Management**: Configurar e monitorar campanhas automatizadas
- **Analytics**: Acessar métricas de performance em tempo real
- **Webhooks**: Receber notificações de eventos importantes

## Autenticação

Todas as requisições à API devem incluir um token de autenticação no header:

\`\`\`
Authorization: Bearer YOUR_API_TOKEN
\`\`\`

Para obter seu token de API:
1. Faça login no seu painel ROI Labs
2. Navegue para **Configurações > API Keys**
3. Clique em **Gerar Nova Chave**
4. Copie o token gerado (ele só será exibido uma vez)

## Base URL

Todos os endpoints da API estão disponíveis em:
\`\`\`
https://api.roilabs.com.br/v1
\`\`\`

## Rate Limiting

- **Limite padrão**: 1000 requisições por hora
- **Limite empresarial**: 10000 requisições por hora
- Headers de resposta incluem informações sobre limite atual

## Formato das Respostas

Todas as respostas seguem o formato JSON padrão:

\`\`\`json
{
  "success": true,
  "data": {
    // dados da resposta
  },
  "meta": {
    "timestamp": "2025-01-15T10:30:00Z",
    "request_id": "req_abc123"
  }
}
\`\`\`

Em caso de erro:
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Campo obrigatório ausente",
    "details": {
      "field": "email"
    }
  }
}
\`\`\`

## Próximos Passos

1. [Configure sua autenticação](/docs/authentication)
2. [Faça sua primeira requisição](/docs/first-request)  
3. [Explore os endpoints](/docs/api-reference)
4. [Configure webhooks](/docs/webhooks)
    `,
    lastUpdated: '2025-01-15T10:00:00Z',
    tags: ['introduction', 'authentication', 'quickstart']
  },
  {
    id: 'authentication',
    title: 'Autenticação',
    slug: 'authentication',
    category: 'Getting Started',
    order: 2,
    content: `
# Autenticação

A API da ROI Labs utiliza tokens Bearer para autenticação. Este método é seguro, simples e amplamente suportado.

## Obtendo seu Token

### Via Dashboard
1. Acesse [dashboard.roilabs.com.br](https://dashboard.roilabs.com.br)
2. Faça login em sua conta
3. Navegue para **Configurações > API Keys**
4. Clique em **"Gerar Nova Chave"**
5. Defina um nome descritivo (ex: "Integração CRM")
6. Selecione as permissões necessárias
7. Clique em **"Criar"**
8. **Importante**: Copie o token imediatamente - ele não será exibido novamente

### Tipos de Token

#### Tokens de Produção
- Acesso completo aos dados reais
- Rate limit: 10.000 req/hora
- Válidos por 1 ano

#### Tokens de Sandbox
- Acesso aos dados de teste
- Rate limit: 1.000 req/hora  
- Válidos por 6 meses
- Prefixo: \`sb_\`

## Usando o Token

### Headers Obrigatórios
\`\`\`http
Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json
\`\`\`

### Exemplo cURL
\`\`\`bash
curl -X GET https://api.roilabs.com.br/v1/leads \\
  -H "Authorization: Bearer roi_live_abc123..." \\
  -H "Content-Type: application/json"
\`\`\`

### Exemplo JavaScript
\`\`\`javascript
const response = await fetch('https://api.roilabs.com.br/v1/leads', {
  headers: {
    'Authorization': 'Bearer roi_live_abc123...',
    'Content-Type': 'application/json'
  }
});
\`\`\`

## Segurança

### Boas Práticas
- **Nunca** exponha tokens em código frontend
- Use variáveis de ambiente para armazenar tokens
- Rotacione tokens regularmente (recomendado: a cada 3 meses)
- Use tokens específicos por ambiente (dev/staging/prod)
- Monitore uso através do dashboard

### Exemplo de Configuração Segura
\`\`\`javascript
// ✅ Correto - usando variável de ambiente
const apiToken = process.env.ROI_LABS_API_TOKEN;

// ❌ Incorreto - token hardcoded
const apiToken = "roi_live_abc123...";
\`\`\`

## Códigos de Erro de Autenticação

| Código | Status | Descrição |
|--------|--------|-----------|
| \`AUTH_MISSING\` | 401 | Header Authorization ausente |
| \`AUTH_INVALID\` | 401 | Token inválido ou expirado |
| \`AUTH_INSUFFICIENT\` | 403 | Token sem permissão para o endpoint |
| \`RATE_LIMIT\` | 429 | Limite de requisições excedido |

### Exemplo de Resposta de Erro
\`\`\`json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID",
    "message": "Token de API inválido ou expirado",
    "details": {
      "expires_at": "2025-01-10T00:00:00Z"
    }
  }
}
\`\`\`

## Renovação de Tokens

Tokens têm data de expiração. Para renovar:

1. **Via Dashboard**: Gere um novo token antes do atual expirar
2. **Via API**: Use o endpoint de renovação (disponível 30 dias antes da expiração)

\`\`\`bash
curl -X POST https://api.roilabs.com.br/v1/auth/renew \\
  -H "Authorization: Bearer YOUR_CURRENT_TOKEN"
\`\`\`
    `,
    lastUpdated: '2025-01-15T09:45:00Z',
    tags: ['authentication', 'security', 'tokens']
  },
  {
    id: 'leads-api',
    title: 'API de Leads',
    slug: 'leads-api',
    category: 'API Reference',
    order: 3,
    content: `
# API de Leads

A API de Leads permite gerenciar todo o ciclo de vida dos prospects, desde a criação até a qualificação e conversão.

## Endpoints Disponíveis

- \`GET /leads\` - Listar leads
- \`POST /leads\` - Criar novo lead  
- \`GET /leads/{id}\` - Buscar lead específico
- \`PUT /leads/{id}\` - Atualizar lead
- \`DELETE /leads/{id}\` - Remover lead
- \`POST /leads/{id}/qualify\` - Qualificar lead

## Modelo de Dados

### Lead Object
\`\`\`json
{
  "id": "lead_abc123",
  "email": "contato@empresa.com",
  "name": "João Silva",
  "company": "TechCorp Ltda",
  "phone": "+5511999999999",
  "job_title": "CTO",
  "status": "qualified",
  "score": 85,
  "source": "website",
  "custom_fields": {
    "company_size": "50-100",
    "industry": "technology"
  },
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "qualified_at": "2025-01-15T10:25:00Z"
}
\`\`\`

### Status Possíveis
- \`new\` - Lead recém-criado
- \`contacted\` - Primeiro contato realizado  
- \`engaged\` - Lead demonstrou interesse
- \`qualified\` - Lead qualificado pelo SDR AI
- \`converted\` - Lead convertido em oportunidade
- \`unqualified\` - Lead desqualificado
- \`lost\` - Lead perdido

## Listar Leads

### Requisição
\`\`\`http
GET /v1/leads?status=qualified&limit=50&offset=0
\`\`\`

### Parâmetros de Query
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| \`status\` | string | Filtrar por status |
| \`source\` | string | Filtrar por origem |
| \`created_after\` | datetime | Leads criados após data |
| \`score_min\` | integer | Score mínimo |
| \`limit\` | integer | Máximo de resultados (default: 25, max: 100) |
| \`offset\` | integer | Offset para paginação |

### Exemplo de Resposta
\`\`\`json
{
  "success": true,
  "data": {
    "leads": [
      {
        "id": "lead_abc123",
        "email": "contato@empresa.com",
        "name": "João Silva",
        "company": "TechCorp Ltda",
        "status": "qualified",
        "score": 85,
        "created_at": "2025-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 1250,
      "limit": 25,
      "offset": 0,
      "has_more": true
    }
  }
}
\`\`\`

## Criar Lead

### Requisição  
\`\`\`http
POST /v1/leads
Content-Type: application/json

{
  "email": "novo@empresa.com",
  "name": "Maria Santos",
  "company": "InnovateCorp",
  "phone": "+5511888888888",
  "job_title": "VP Sales",
  "source": "linkedin",
  "custom_fields": {
    "company_size": "100-500",
    "industry": "fintech",
    "budget": "50000-100000"
  }
}
\`\`\`

### Campos Obrigatórios
- \`email\` - Email válido e único
- \`name\` - Nome completo
- \`company\` - Nome da empresa

### Exemplo de Resposta (201 Created)
\`\`\`json
{
  "success": true,
  "data": {
    "lead": {
      "id": "lead_def456",
      "email": "novo@empresa.com",
      "name": "Maria Santos", 
      "company": "InnovateCorp",
      "status": "new",
      "score": 0,
      "created_at": "2025-01-15T11:00:00Z"
    }
  }
}
\`\`\`

## Qualificar Lead

Aciona o SDR AI para qualificar um lead específico.

### Requisição
\`\`\`http  
POST /v1/leads/lead_abc123/qualify
\`\`\`

### Resposta
\`\`\`json
{
  "success": true,
  "data": {
    "qualification": {
      "status": "qualified",
      "score": 78,
      "reasons": [
        "Empresa no perfil ICP (SaaS B2B)",
        "Cargo de decisão confirmado", 
        "Budget estimado compatível"
      ],
      "recommended_actions": [
        "Agendar demo personalizada",
        "Enviar case study similar",
        "Conectar no LinkedIn"
      ],
      "qualified_at": "2025-01-15T11:15:00Z"
    }
  }
}
\`\`\`
    `,
    lastUpdated: '2025-01-14T16:20:00Z',
    tags: ['api', 'leads', 'qualification', 'crud']
  },
  {
    id: 'campaigns-api',
    title: 'API de Campanhas',
    slug: 'campaigns-api', 
    category: 'API Reference',
    order: 4,
    content: `
# API de Campanhas

Gerencie campanhas de SDR AI, desde criação até monitoramento de performance em tempo real.

## Endpoints Principais

- \`GET /campaigns\` - Listar campanhas
- \`POST /campaigns\` - Criar nova campanha
- \`GET /campaigns/{id}\` - Detalhes da campanha
- \`PUT /campaigns/{id}\` - Atualizar campanha
- \`POST /campaigns/{id}/start\` - Iniciar campanha
- \`POST /campaigns/{id}/pause\` - Pausar campanha
- \`GET /campaigns/{id}/analytics\` - Analytics da campanha

## Modelo de Campanha

\`\`\`json
{
  "id": "camp_xyz789",
  "name": "Prospecção SaaS Q1 2025",
  "status": "active",
  "type": "email_sequence",
  "target_audience": {
    "company_size": ["50-200", "200-1000"],
    "industries": ["technology", "saas"],
    "job_titles": ["cto", "vp engineering", "head of product"]
  },
  "sequence": [
    {
      "step": 1,
      "type": "email",
      "delay_days": 0,
      "subject": "{{company_name}} + ROI Labs: Escale seu SDR 3x",
      "template_id": "template_abc123"
    },
    {
      "step": 2, 
      "type": "linkedin_connect",
      "delay_days": 3,
      "message": "Oi {{first_name}}, vi que vocês estão crescendo rápido..."
    }
  ],
  "analytics": {
    "leads_targeted": 1420,
    "emails_sent": 1380,
    "opens": 276,
    "clicks": 41,
    "replies": 18,
    "qualified_leads": 12,
    "open_rate": 0.20,
    "click_rate": 0.03,
    "reply_rate": 0.013
  },
  "created_at": "2025-01-10T09:00:00Z",
  "started_at": "2025-01-10T14:00:00Z"
}
\`\`\`

## Criar Nova Campanha

### Requisição
\`\`\`http
POST /v1/campaigns
Content-Type: application/json

{
  "name": "Fintech Outreach 2025",
  "type": "multi_channel",
  "target_audience": {
    "company_size": ["100-500"],
    "industries": ["fintech", "banking"], 
    "job_titles": ["cfo", "head of sales"],
    "locations": ["brazil"]
  },
  "sequence": [
    {
      "step": 1,
      "type": "email",
      "delay_days": 0,
      "subject": "ROI de 300% em 90 dias - Case {{company_industry}}",
      "template": "Oi {{first_name}},\\n\\nVi que a {{company_name}} está expandindo operações..."
    },
    {
      "step": 2,
      "type": "follow_up_email", 
      "delay_days": 4,
      "subject": "Re: ROI de 300% - Vale 15 minutos?",
      "template": "{{first_name}}, como ficou minha mensagem anterior?..."
    }
  ],
  "settings": {
    "daily_limit": 50,
    "time_zone": "America/Sao_Paulo",
    "send_times": ["09:00", "14:00"],
    "exclude_weekends": true
  }
}
\`\`\`

### Resposta (201 Created)
\`\`\`json
{
  "success": true,
  "data": {
    "campaign": {
      "id": "camp_new123",
      "name": "Fintech Outreach 2025",
      "status": "draft",
      "estimated_reach": 847,
      "created_at": "2025-01-15T12:00:00Z"
    }
  }
}
\`\`\`

## Analytics de Campanha

### Requisição
\`\`\`http
GET /v1/campaigns/camp_xyz789/analytics?period=30d
\`\`\`

### Parâmetros
| Parâmetro | Valores | Descrição |
|-----------|---------|-----------|
| \`period\` | \`7d\`, \`30d\`, \`90d\`, \`custom\` | Período de análise |
| \`start_date\` | ISO date | Data início (se period=custom) |
| \`end_date\` | ISO date | Data fim (se period=custom) |

### Resposta
\`\`\`json
{
  "success": true,
  "data": {
    "overview": {
      "leads_targeted": 1420,
      "leads_contacted": 1380,
      "leads_engaged": 89,
      "leads_qualified": 23,
      "conversion_rate": 0.016
    },
    "email_metrics": {
      "sent": 2760,
      "delivered": 2701,
      "opens": 541,
      "clicks": 87,
      "replies": 34,
      "unsubscribes": 12,
      "bounces": 59
    },
    "performance_by_step": [
      {
        "step": 1,
        "type": "email",
        "sent": 1380,
        "opens": 276,
        "clicks": 41,
        "replies": 18,
        "open_rate": 0.20,
        "click_rate": 0.03
      }
    ],
    "timeline": [
      {
        "date": "2025-01-15",
        "emails_sent": 48,
        "opens": 9,
        "clicks": 2,
        "replies": 1
      }
    ]
  }
}
\`\`\`

## Controle de Campanha

### Iniciar Campanha
\`\`\`http
POST /v1/campaigns/camp_xyz789/start
\`\`\`

### Pausar Campanha  
\`\`\`http
POST /v1/campaigns/camp_xyz789/pause
\`\`\`

### Arquivar Campanha
\`\`\`http  
DELETE /v1/campaigns/camp_xyz789
\`\`\`

## Melhores Práticas

### Performance Optimization
- **A/B Test**: Teste diferentes subject lines e templates
- **Timing**: Envie entre 9h-11h e 14h-16h (timezone local)
- **Frequency**: Máximo 2 touchpoints por semana
- **Personalization**: Use pelo menos 3 campos personalizados

### Compliance
- Sempre inclua link de unsubscribe
- Respeite leis locais (LGPD, CAN-SPAM)
- Mantenha taxa de bounce < 5%
- Monitor reputation score
    `,
    lastUpdated: '2025-01-14T14:30:00Z',
    tags: ['campaigns', 'automation', 'analytics', 'sequences']
  },
  {
    id: 'webhooks',
    title: 'Webhooks',
    slug: 'webhooks',
    category: 'Webhooks', 
    order: 5,
    content: `
# Webhooks

Receba notificações em tempo real sobre eventos importantes em sua conta ROI Labs através de webhooks HTTP.

## O que são Webhooks?

Webhooks são requisições HTTP POST enviadas automaticamente para um endpoint de sua escolha quando eventos específicos ocorrem em sua conta.

### Casos de Uso Comuns
- Sincronizar leads qualificados com seu CRM
- Notificar equipe sobre novos prospects interessados  
- Atualizar dashboards em tempo real
- Disparar automações internas
- Logging e auditoria de eventos

## Eventos Disponíveis

### Lead Events
- \`lead.created\` - Novo lead criado
- \`lead.qualified\` - Lead qualificado pelo SDR AI
- \`lead.updated\` - Dados do lead atualizados
- \`lead.converted\` - Lead convertido em oportunidade
- \`lead.unqualified\` - Lead desqualificado

### Campaign Events  
- \`campaign.started\` - Campanha iniciada
- \`campaign.completed\` - Campanha finalizada
- \`campaign.paused\` - Campanha pausada

### Message Events
- \`message.sent\` - Mensagem enviada com sucesso
- \`message.delivered\` - Mensagem entregue
- \`message.opened\` - Mensagem aberta pelo recipient
- \`message.clicked\` - Link na mensagem clicado
- \`message.replied\` - Resposta recebida

## Configurando Webhooks

### Via Dashboard
1. Acesse **Configurações > Webhooks**
2. Clique em **"Novo Webhook"**
3. Configure a URL de destino
4. Selecione os eventos de interesse
5. Configure autenticação (opcional)
6. Teste a conexão
7. Ative o webhook

### Via API
\`\`\`http
POST /v1/webhooks
Content-Type: application/json

{
  "url": "https://meusite.com/webhook/roilabs",
  "events": [
    "lead.qualified",
    "lead.converted", 
    "message.replied"
  ],
  "secret": "meu_webhook_secret_123",
  "active": true,
  "description": "Integração CRM Principal"
}
\`\`\`

## Estrutura do Payload

Todos os webhooks seguem o mesmo formato base:

\`\`\`json
{
  "id": "evt_abc123def456",
  "type": "lead.qualified",
  "created_at": "2025-01-15T14:30:00Z",
  "data": {
    // dados específicos do evento
  },
  "meta": {
    "webhook_id": "wh_789xyz",
    "attempt": 1,
    "signature": "sha256=abc123..."
  }
}
\`\`\`

### Exemplo: Lead Qualificado
\`\`\`json
{
  "id": "evt_lead_qualified_123",
  "type": "lead.qualified", 
  "created_at": "2025-01-15T14:30:00Z",
  "data": {
    "lead": {
      "id": "lead_abc123",
      "email": "joao@techcorp.com",
      "name": "João Silva",
      "company": "TechCorp Ltda",
      "phone": "+5511999999999",
      "job_title": "CTO",
      "score": 87,
      "qualification_reason": "Perfil ICP + Budget confirmado + Timing adequado",
      "recommended_next_steps": [
        "Agendar demo personalizada",
        "Enviar proposta técnica", 
        "Conectar com account manager"
      ]
    },
    "campaign": {
      "id": "camp_xyz789",
      "name": "Prospecção Tech Q1"
    }
  }
}
\`\`\`

## Verificação de Assinatura

Para garantir que o webhook veio realmente da ROI Labs, verificamos cada payload com HMAC SHA-256.

### Header de Assinatura
\`\`\`
ROI-Labs-Signature: sha256=abc123def456...
\`\`\`

### Verificação em Node.js
\`\`\`javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const calculated = 'sha256=' + hmac.digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculated)
  );
}

// Uso no Express
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['roi-labs-signature'];
  const isValid = verifyWebhook(req.body, signature, 'seu_secret');
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Processar webhook...
  res.status(200).send('OK');
});
\`\`\`

### Verificação em Python
\`\`\`python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    calculated = 'sha256=' + hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, calculated)
\`\`\`

## Retry Policy

Se seu endpoint não responder com status 2xx, tentaremos reenviar:

- **1ª tentativa**: Imediato
- **2ª tentativa**: 30 segundos depois  
- **3ª tentativa**: 5 minutos depois
- **4ª tentativa**: 30 minutos depois
- **5ª tentativa**: 2 horas depois

Após 5 tentativas falhas, o webhook será marcado como falhado e não será reenviado.

## Melhores Práticas

### Implementação
- **Idempotência**: Use o \`id\` do evento para evitar processamento duplicado
- **Timeout**: Configure timeout de 30 segundos para webhooks
- **Retry Logic**: Implemente retry com backoff exponencial
- **Logging**: Registre todos os webhooks recebidos para debugging

### Segurança  
- **HTTPS Only**: Use sempre URLs HTTPS para webhooks
- **Verificação**: Sempre verifique a assinatura do webhook
- **Rate Limiting**: Implemente rate limiting no seu endpoint
- **Monitoring**: Monitore taxa de sucesso e latência

### Exemplo de Implementação Robusta
\`\`\`javascript
const express = require('express');
const app = express();

// Store para evitar duplicação
const processedEvents = new Set();

app.post('/webhook', express.json(), async (req, res) => {
  try {
    // Verificar assinatura
    if (!verifyWebhook(req.body, req.headers['roi-labs-signature'], process.env.WEBHOOK_SECRET)) {
      return res.status(401).json({error: 'Invalid signature'});
    }
    
    // Verificar duplicação
    if (processedEvents.has(req.body.id)) {
      return res.status(200).json({status: 'already_processed'});
    }
    
    // Processar evento
    await processEvent(req.body);
    
    // Marcar como processado
    processedEvents.add(req.body.id);
    
    res.status(200).json({status: 'success'});
    
  } catch (error) {
    console.error('Webhook processing failed:', error);
    res.status(500).json({error: 'Processing failed'});
  }
});
\`\`\`
    `,
    lastUpdated: '2025-01-13T11:15:00Z',
    tags: ['webhooks', 'events', 'real-time', 'integration']
  }
];

export const apiEndpoints: APIEndpoint[] = [
  {
    id: 'list-leads',
    method: 'GET',
    endpoint: '/v1/leads',
    title: 'Listar Leads',
    description: 'Retorna uma lista paginada de leads com filtros opcionais.',
    parameters: [
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Filtrar por status do lead',
        example: 'qualified'
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Número máximo de resultados (1-100)',
        example: 25
      },
      {
        name: 'offset',
        type: 'number', 
        required: false,
        description: 'Offset para paginação',
        example: 0
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Lista de leads retornada com sucesso',
        example: {
          success: true,
          data: {
            leads: [
              {
                id: 'lead_abc123',
                email: 'contato@empresa.com',
                name: 'João Silva',
                company: 'TechCorp Ltda',
                status: 'qualified',
                score: 85
              }
            ],
            pagination: {
              total: 1250,
              limit: 25,
              offset: 0,
              has_more: true
            }
          }
        }
      }
    ],
    examples: [
      {
        language: 'curl',
        code: `curl -X GET "https://api.roilabs.com.br/v1/leads?status=qualified&limit=10" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json"`
      },
      {
        language: 'javascript',
        code: `const response = await fetch('https://api.roilabs.com.br/v1/leads?status=qualified&limit=10', {
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.data.leads);`
      },
      {
        language: 'python',
        code: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.roilabs.com.br/v1/leads',
    params={'status': 'qualified', 'limit': 10},
    headers=headers
)

leads = response.json()['data']['leads']`
      }
    ]
  }
];