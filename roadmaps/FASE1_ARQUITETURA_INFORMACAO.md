# 🏗️ FASE 1.4 - Arquitetura de Informação

**Status:** 🟢 Em Progresso
**Data Início:** 2026-01-11

---

## 🗺️ Sitemap Completo

### Estrutura de Navegação

```
ROI Labs/
│
├── 🏠 Home (/)
│   ├── #hero
│   ├── #produtos
│   ├── #features
│   ├── #stats
│   ├── #testimonials
│   └── #cta
│
├── 🛍️ Produtos (/produtos)
│   │
│   ├── Sirius CRM (/sirius-crm)
│   │   ├── Visão Geral
│   │   ├── Funcionalidades
│   │   │   ├── Pipeline de Vendas
│   │   │   ├── Automação de Marketing
│   │   │   ├── Gestão de Leads
│   │   │   ├── Relatórios e Analytics
│   │   │   └── Integrações
│   │   ├── Casos de Uso
│   │   │   ├── Vendas B2B
│   │   │   ├── Vendas B2C
│   │   │   ├── Inside Sales
│   │   │   └── Field Sales
│   │   ├── Preços
│   │   └── Demo Interativa
│   │
│   ├── Orion ERP (/orion-erp)
│   │   ├── Visão Geral
│   │   ├── Funcionalidades
│   │   │   ├── Financeiro
│   │   │   ├── Estoque
│   │   │   ├── Compras
│   │   │   ├── Vendas
│   │   │   ├── Fiscal
│   │   │   └── Relatórios Gerenciais
│   │   ├── Casos de Uso
│   │   │   ├── Comércio
│   │   │   ├── Serviços
│   │   │   ├── Distribuição
│   │   │   └── E-commerce
│   │   ├── Preços
│   │   └── Demo Interativa
│   │
│   ├── Vértice Marketing (/vertice-marketing)
│   │   ├── Visão Geral
│   │   ├── Funcionalidades
│   │   │   ├── Email Marketing
│   │   │   ├── Landing Pages
│   │   │   ├── Automação de Campanhas
│   │   │   ├── Lead Scoring
│   │   │   ├── Analytics de Marketing
│   │   │   └── Integrações CRM
│   │   ├── Casos de Uso
│   │   │   ├── Lead Generation
│   │   │   ├── E-commerce Marketing
│   │   │   ├── Content Marketing
│   │   │   └── Account-Based Marketing
│   │   ├── Preços
│   │   └── Demo Interativa
│   │
│   ├── PCP Industrial (/pcp-industrial) 🚧
│   │   ├── Coming Soon Page
│   │   ├── Newsletter Signup
│   │   └── Early Access Waitlist
│   │
│   └── BPO Financeiro (/bpo-financeiro) 🚧
│       ├── Coming Soon Page
│       ├── Newsletter Signup
│       └── Early Access Waitlist
│
├── 💼 Soluções (/solucoes)
│   ├── Por Indústria
│   │   ├── Tecnologia (/solucoes/tecnologia)
│   │   ├── Varejo (/solucoes/varejo)
│   │   ├── Serviços (/solucoes/servicos)
│   │   ├── Indústria (/solucoes/industria)
│   │   ├── Saúde (/solucoes/saude)
│   │   └── Educação (/solucoes/educacao)
│   │
│   └── Por Tamanho
│       ├── Startups (/solucoes/startups)
│       ├── PMEs (/solucoes/pmes)
│       └── Enterprise (/solucoes/enterprise)
│
├── 💰 Preços (/precos)
│   ├── Planos Individuais
│   ├── Planos Combinados (Bundles)
│   ├── Enterprise (Custom)
│   ├── Calculadora de ROI
│   └── FAQ de Preços
│
├── 📚 Recursos (/recursos)
│   ├── Blog (/blog)
│   │   ├── Artigos
│   │   ├── Categorias
│   │   │   ├── CRM
│   │   │   ├── ERP
│   │   │   ├── Marketing
│   │   │   ├── Vendas
│   │   │   └── Gestão
│   │   └── [Post individual] (/blog/[slug])
│   │
│   ├── Case Studies (/cases)
│   │   └── [Case individual] (/cases/[slug])
│   │
│   ├── Guias e eBooks (/guias)
│   │   ├── "Como escolher um CRM"
│   │   ├── "ERP: O guia definitivo"
│   │   ├── "Marketing Automation 101"
│   │   └── Downloads (gated content)
│   │
│   ├── Webinars (/webinars)
│   │   ├── Próximos
│   │   ├── Gravados
│   │   └── [Webinar individual] (/webinars/[slug])
│   │
│   ├── Central de Ajuda (/ajuda)
│   │   ├── Sirius CRM
│   │   ├── Orion ERP
│   │   ├── Vértice Marketing
│   │   ├── Integrações
│   │   └── Billing & Conta
│   │
│   └── API Documentation (/docs/api)
│       ├── Authentication
│       ├── Endpoints
│       ├── Webhooks
│       └── SDKs
│
├── 🏢 Empresa (/empresa)
│   ├── Sobre Nós (/sobre)
│   │   ├── Nossa História
│   │   ├── Missão, Visão, Valores
│   │   └── Por que ROI Labs
│   │
│   ├── Time (/time)
│   │   └── Carreiras (/carreiras) 🚧
│   │
│   ├── Parceiros (/parceiros)
│   │   ├── Programa de Parceiros
│   │   ├── Parceiros Certificados
│   │   └── Portal do Parceiro (login)
│   │
│   └── Imprensa (/imprensa)
│       ├── Press Kit
│       ├── Releases
│       └── Contato de Imprensa
│
├── 🔗 Integrações (/integracoes)
│   ├── Todas as Integrações
│   ├── Por Categoria
│   │   ├── CRM & Vendas
│   │   ├── Marketing
│   │   ├── Financeiro
│   │   ├── Produtividade
│   │   └── Comunicação
│   └── [Integração individual] (/integracoes/[slug])
│
├── 📞 Contato (/contato)
│   ├── Formulário Geral
│   ├── Agendar Demo
│   ├── Suporte
│   └── Vendas
│
├── 🔐 Legal
│   ├── Política de Privacidade (/privacidade)
│   ├── Termos de Uso (/termos)
│   ├── SLA (/sla)
│   └── LGPD (/lgpd)
│
└── 👤 Área do Cliente (External - separado)
    ├── Login (/login)
    ├── Cadastro (/cadastro)
    └── App → [Subdomínio separado: app.roilabs.com]
        ├── Dashboard
        ├── Sirius CRM App
        ├── Orion ERP App
        ├── Vértice Marketing App
        └── Configurações
```

---

## 🧭 User Flows

### Flow 1: Visitante → Lead (Demo Request)

```
┌─────────────────┐
│  Landing Page   │
│   (Homepage)    │
└────────┬────────┘
         │
    [Clica CTA]
         │
         ↓
┌─────────────────┐
│  Hero Section   │
│ "Agendar Demo"  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────┐
│   Scroll para   │──❌→│   Abandona   │
│  Conhecer Mais  │      └──────────────┘
└────────┬────────┘
         │
    [Convencido]
         │
         ↓
┌─────────────────┐
│  Clica "Agendar │
│ Demonstração"   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────┐
│  Form Modal     │──❌→│  Abandona    │
│  Abre           │      │  (recuperar  │
└────────┬────────┘      │   com email) │
         │                └──────────────┘
    [Preenche]
         │
         ↓
┌─────────────────┐
│  Submete Form   │
│  - Nome         │
│  - Email        │
│  - Empresa      │
│  - Produto      │
│  - Telefone     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Success State  │
│  + Email Conf.  │
│  + Next Steps   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Redirect para  │
│  Thank You Page │
│  com vídeo      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Email 1:       │
│  Confirmação    │
│  (imediato)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Email 2:       │
│  Lembrete Demo  │
│  (1h antes)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Demo Call      │
│  (Vendedor)     │
└─────────────────┘
```

**Métricas do Flow:**
- Conversion Rate: Homepage → Form Submit
- Form Abandonment Rate
- Demo Show Rate
- Demo → Customer Rate

---

### Flow 2: Visitante → Trial User

```
┌─────────────────┐
│  Product Page   │
│  (ex: Sirius)   │
└────────┬────────┘
         │
    [Explora features]
         │
         ↓
┌─────────────────┐
│  Interactive    │
│  Demo/Video     │
└────────┬────────┘
         │
    [Convencido]
         │
         ↓
┌─────────────────┐
│  Clica "Testar  │
│  Grátis 14 dias"│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Pricing Page   │
│  (escolhe plano)│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Signup Form    │
│  - Email        │
│  - Password     │
│  - Empresa      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Verifica Email │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Onboarding     │
│  - Setup wizard │
│  - Import dados │
│  - Invite team  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  App Dashboard  │
│  (primeiro uso) │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Email Drip:    │
│  - Day 1: Welcome│
│  - Day 3: Tips  │
│  - Day 7: Check-in│
│  - Day 12: Upgrade│
└─────────────────┘
```

**Métricas do Flow:**
- Trial Signup Rate
- Onboarding Completion Rate
- Activation Rate (first value)
- Trial → Paid Conversion Rate

---

### Flow 3: Comparação de Produtos

```
┌─────────────────┐
│  Homepage       │
│  "5 produtos"   │
└────────┬────────┘
         │
    [Confuso - qual escolher?]
         │
         ↓
┌─────────────────┐
│  Clica "Compare │
│  Soluções"      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Comparison     │
│  Tool/Quiz      │
│  "Qual produto  │
│   para você?"   │
└────────┬────────┘
         │
    [Responde perguntas]
         │
         ↓
┌─────────────────┐
│  Recomendação   │
│  "Para seu caso │
│   sugerimos:    │
│   Sirius +      │
│   Orion"        │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Bundle Page    │
│  Com desconto   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  [CTA: Demo ou  │
│   Trial]        │
└─────────────────┘
```

---

### Flow 4: Existing Customer → Cross-sell

```
┌─────────────────┐
│  User no App    │
│  (Sirius CRM)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  In-app Banner  │
│  "Integre com   │
│   Orion ERP"    │
└────────┬────────┘
         │
    [Clica]
         │
         ↓
┌─────────────────┐
│  Modal Explica  │
│  Benefícios de  │
│  Integração     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  "Adicionar ao  │
│   meu plano"    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Pricing +      │
│  Upgrade        │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Onboarding     │
│  Orion ERP      │
│  (já tem dados  │
│   do Sirius)    │
└─────────────────┘
```

---

## 🧩 Navigation Architecture

### Primary Navigation (Header)

**Desktop:**
```
[Logo ROI Labs]    [Produtos ▾] [Soluções ▾] [Preços] [Recursos ▾] [Empresa ▾]    [Login] [Agendar Demo]
```

**Mobile (Hamburger Menu):**
```
☰ Menu

Produtos
  → Sirius CRM
  → Orion ERP
  → Vértice Marketing
  → PCP Industrial (coming soon)
  → BPO Financeiro (coming soon)

Soluções
  → Por Indústria
  → Por Tamanho

Preços

Recursos
  → Blog
  → Case Studies
  → Central de Ajuda
  → Webinars

Empresa
  → Sobre
  → Parceiros
  → Contato

[Login]
[Agendar Demo]
```

---

### Mega Menu: Produtos (Hover on "Produtos")

```
┌──────────────────────────────────────────────────────────────┐
│                       PRODUTOS                                │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐│
│  │ 🌟 Sirius CRM   │  │ 📦 Orion ERP    │  │ 📣 Vértice   ││
│  │                 │  │                 │  │    Marketing  ││
│  │ Gestão de       │  │ Sistema         │  │              ││
│  │ vendas e CRM    │  │ integrado ERP   │  │ Automação de ││
│  │                 │  │                 │  │ marketing     ││
│  │ [Ver detalhes]  │  │ [Ver detalhes]  │  │ [Ver detalhes││
│  └─────────────────┘  └─────────────────┘  └──────────────┘│
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │ ⚙️ PCP Industrial│  │ 💰 BPO Financeiro│                  │
│  │                 │  │                 │                   │
│  │ Coming Soon     │  │ Coming Soon     │                   │
│  │ [Saiba mais]    │  │ [Saiba mais]    │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                               │
│  ─────────────────────────────────────────                   │
│                                                               │
│  🎯 Não sabe qual escolher?                                  │
│  [Compare produtos] ou [Fale com especialista]               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

### Mega Menu: Soluções

```
┌──────────────────────────────────────────────────────────────┐
│                       SOLUÇÕES                                │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  POR INDÚSTRIA                   POR TAMANHO                 │
│                                                               │
│  → Tecnologia                    → Startups                  │
│  → Varejo                        → PMEs                      │
│  → Serviços                      → Enterprise                │
│  → Indústria                                                 │
│  → Saúde                         ─────────────               │
│  → Educação                                                  │
│                                  📊 RECURSOS                 │
│                                                               │
│                                  → Case Studies              │
│                                  → ROI Calculator            │
│                                  → Guias por Setor           │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

### Mega Menu: Recursos

```
┌──────────────────────────────────────────────────────────────┐
│                       RECURSOS                                │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  APRENDER                  SUPORTE              DESENVOLVEDORES│
│                                                               │
│  📝 Blog                   🔧 Central de Ajuda  🔌 API Docs  │
│  📄 Case Studies           💬 Chat (ao vivo)    📚 SDKs      │
│  📚 Guias & eBooks         📞 Contato           🔗 Webhooks  │
│  🎥 Webinars               ❓ FAQ                             │
│                                                               │
│  ─────────────────────────────────────────────               │
│                                                               │
│  ⭐ Destaque: [Último webinar ou eBook]                      │
│  [CTA: Baixar grátis]                                        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

### Footer Navigation

```
┌──────────────────────────────────────────────────────────────┐
│                                                               │
│  [LOGO ROI LABS]                                             │
│  Ecossistema completo de soluções empresariais integradas    │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ PRODUTOS     │  │ SOLUÇÕES     │  │ RECURSOS     │       │
│  │              │  │              │  │              │       │
│  │ Sirius CRM   │  │ Tecnologia   │  │ Blog         │       │
│  │ Orion ERP    │  │ Varejo       │  │ Cases        │       │
│  │ Vértice Mkt  │  │ Serviços     │  │ Guias        │       │
│  │ PCP Indust.  │  │ Indústria    │  │ Webinars     │       │
│  │ BPO Financ.  │  │              │  │ Ajuda        │       │
│  │              │  │ Startups     │  │ API Docs     │       │
│  │              │  │ PMEs         │  │              │       │
│  │              │  │ Enterprise   │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │ EMPRESA      │  │ LEGAL        │                         │
│  │              │  │              │                         │
│  │ Sobre        │  │ Privacidade  │                         │
│  │ Time         │  │ Termos       │                         │
│  │ Carreiras    │  │ SLA          │                         │
│  │ Parceiros    │  │ LGPD         │                         │
│  │ Imprensa     │  │              │                         │
│  │ Contato      │  │              │                         │
│  └──────────────┘  └──────────────┘                         │
│                                                               │
│  ────────────────────────────────────────────────            │
│                                                               │
│  📧 NEWSLETTER                                               │
│  Receba dicas, novidades e conteúdo exclusivo                │
│  [__________Email__________] [Inscrever]                     │
│                                                               │
│  ────────────────────────────────────────────────            │
│                                                               │
│  🔗 LinkedIn  │  Twitter  │  YouTube  │  Instagram           │
│                                                               │
│  © 2026 ROI Labs. Todos os direitos reservados.             │
│  Transformando negócios através de tecnologia integrada.     │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 📍 CTAs Mapping

### Hierarchy de CTAs (Prioridade)

**Primário (High Intent):**
1. "Agendar demonstração"
2. "Começar teste grátis"
3. "Falar com especialista"

**Secundário (Learn More):**
4. "Ver como funciona"
5. "Conhecer [Produto]"
6. "Explorar funcionalidades"

**Terciário (Low Commitment):**
7. "Baixar guia"
8. "Assistir webinar"
9. "Ler case study"

---

### CTAs por Página

#### Homepage

| Seção | CTA Primário | CTA Secundário | Objetivo |
|-------|--------------|----------------|----------|
| Hero | "Agendar demonstração" | "Ver como funciona" (scroll to #produtos) | Lead generation |
| Product Showcase | [Em cada card]: "Conhecer [Produto]" | - | Navigate to product page |
| Features | - | - | Passive education |
| Stats | - | - | Build credibility |
| Testimonials | - | - | Social proof |
| CTA Section | "Agendar demonstração" | "Falar com consultor" | Final conversion push |
| Footer | "Inscrever" (newsletter) | Links de navegação | Engagement |

**Total CTAs na Home:** 3 principais (Hero, Product cards, CTA section)

---

#### Product Pages (ex: Sirius CRM)

| Seção | CTA Primário | CTA Secundário | Objetivo |
|-------|--------------|----------------|----------|
| Hero | "Começar teste grátis" | "Agendar demo" | Trial signup |
| Features Overview | - | - | Education |
| Interactive Demo | "Testar agora" | - | Engagement |
| Use Cases | [Em cada card]: "Ver como usar" | - | Deep dive |
| Pricing Preview | "Ver todos os planos" | - | Navigate to pricing |
| Integrations | "Ver todas integrações" | - | Navigate to integrations |
| Testimonials | - | - | Social proof |
| FAQ | - | - | Objection handling |
| Final CTA | "Começar teste grátis 14 dias" | "Falar com vendas" | Conversion |

**Total CTAs na Product Page:** 4-5 principais

---

#### Pricing Page

| Seção | CTA Primário | CTA Secundário | Objetivo |
|-------|--------------|----------------|----------|
| Hero | - | "Compare planos" (scroll) | Orientation |
| Planos Grid | [Em cada plano]: "Começar teste" ou "Falar com vendas" | - | Conversion |
| FAQ Pricing | - | - | Objection handling |
| Calculator | "Calcular meu ROI" | - | Engagement |
| Final CTA | "Não sabe qual escolher? Fale conosco" | "Ver demo" | Help |

---

#### Blog Post

| Seção | CTA Primário | CTA Secundário | Objetivo |
|-------|--------------|----------------|----------|
| End of Post | "Baixar guia completo" (gated) | "Ler próximo artigo" | Lead capture |
| Sidebar | "Testar grátis" | "Inscrever newsletter" | Conversion |
| Exit Intent | "Antes de sair: baixe nosso guia" | - | Lead recovery |

---

#### Case Study

| Seção | CTA Primário | CTA Secundário | Objetivo |
|-------|--------------|----------------|----------|
| Hero | - | - | Let them read |
| Results Section | "Obter resultados similares" → Demo form | "Ver mais cases" | Conversion |
| End of Case | "Começar minha história de sucesso" | "Falar com vendas" | Conversion |

---

### CTA Copy Guidelines

**DO:**
- ✅ Use verbos de ação (Agendar, Começar, Falar, Ver, Baixar)
- ✅ Seja específico ("Agendar demonstração" > "Saiba mais")
- ✅ Adicione value prop ("Testar grátis 14 dias" > "Testar")
- ✅ Crie urgência sutil ("Vagas limitadas para demo", "Oferta por tempo limitado")
- ✅ Use primeira pessoa em forms ("Quero agendar demo" > "Agendar demo")

**DON'T:**
- ❌ "Clique aqui" (muito genérico)
- ❌ "Submit" (muito técnico)
- ❌ "Learn more" em português (anglicismo)
- ❌ CTAs muito longos (max 4 palavras)
- ❌ Múltiplos CTAs primários na mesma seção (confunde)

---

## 🔍 Search & Discovery

### Site Search

**Onde aparece:**
- Header (icon que expande)
- Mobile menu
- 404 page
- Help center

**O que busca:**
- Páginas de produto
- Blog posts
- Case studies
- Help articles
- Integration pages

**Funcionalidades:**
- Autocomplete
- Recent searches
- Popular searches
- Filtros (Produtos, Blog, Ajuda)
- Keyboard shortcut (Cmd+K / Ctrl+K)

**Search Bar Design:**
```
┌────────────────────────────────────────────┐
│  🔍  Buscar produtos, artigos, ajuda...    │
└────────────────────────────────────────────┘
```

**Search Results Page:**
```
Resultados para "CRM" (23 encontrados)

[Filtros: Tudo | Produtos | Blog | Ajuda]

PRODUTOS (3)
───────────
→ Sirius CRM - Gestão completa de...
→ Vértice Marketing - Integração com CRM...

BLOG (15)
───────────
→ Como escolher um CRM em 2026
→ 10 features essenciais em um CRM
→ CRM vs Planilhas: qual a diferença?
[Ver todos os 15 artigos]

AJUDA (5)
───────────
→ Como importar contatos no Sirius CRM
→ Integrando CRM com email
[Ver todos os 5 artigos]
```

---

### Breadcrumbs

**Quando usar:**
- Product pages
- Blog posts
- Help articles
- Deep pages (3+ níveis)

**Quando NÃO usar:**
- Homepage
- Top-level pages (Sobre, Contato)

**Formato:**
```
Home > Produtos > Sirius CRM > Funcionalidades > Pipeline de Vendas
```

---

## 📱 Mobile Navigation

### Mobile Menu (Hamburger)

**Prioridade de itens:**
1. **CTAs principais** (destaque visual)
   - Agendar demonstração
   - Login
2. **Produtos** (expandible)
3. **Soluções** (expandible)
4. **Preços**
5. **Recursos** (expandible)
6. **Empresa** (expandible)

**Design:**
```
┌────────────────────┐
│ ☰  ROI Labs   [X] │
├────────────────────┤
│                    │
│ 🟣 Agendar Demo   │ ← CTA destacado
│ 🔓 Login          │
│                    │
│ ─────────────────  │
│                    │
│ Produtos        ▾  │ ← Expandible
│ Soluções        ▾  │
│ Preços             │
│ Recursos        ▾  │
│ Empresa         ▾  │
│                    │
│ ─────────────────  │
│                    │
│ 🔍 Buscar          │
│                    │
└────────────────────┘
```

**Quando expandido (Produtos):**
```
┌────────────────────┐
│ Produtos        ▴  │
│                    │
│   → Sirius CRM     │
│   → Orion ERP      │
│   → Vértice Mkt    │
│   → PCP Industrial │
│   → BPO Financeiro │
│                    │
│   [Ver todos]      │
│                    │
└────────────────────┘
```

---

### Mobile Sticky Elements

**Bottom Navigation (App only - não website):**
- Não usar bottom nav no website marketing
- Reservar para produto (app.roilabs.com)

**Floating CTA (Mobile):**
- Aparece após scroll 50%
- Sticky bottom
- Minimiza para icon after click
```
┌────────────────────┐
│                    │
│   [Conteúdo]       │
│                    │
│                    │
└────────────────────┘
┌────────────────────┐
│ 🟣 Agendar Demo   │ ← Sticky CTA
└────────────────────┘
```

---

## 🎯 Conversion Funnels

### Funnel 1: Homepage → Demo

**Stages:**
1. **Awareness** (Homepage hero)
   - Headline impactante
   - Value prop clara
   - CTA: "Agendar demonstração"

2. **Interest** (Scroll through features)
   - Product showcase
   - Features section
   - Stats & social proof

3. **Consideration** (Deep dive)
   - Click em produto específico
   - Explora funcionalidades
   - Lê testimonials

4. **Intent** (Ready to convert)
   - Clica CTA "Agendar demo"
   - Form modal abre

5. **Action** (Conversion)
   - Preenche form
   - Submete
   - Thank you page

**Drop-off Points (onde perder gente):**
- ❌ Hero não convenceu (bounce)
- ❌ Form muito longo (abandono)
- ❌ Não entendeu value prop
- ❌ Preço não visível (incerteza)

**Optimization Tactics:**
- Exit intent popup (oferece recurso grátis)
- Form progressivo (menos campos)
- Social proof próximo a CTAs
- Calendly embed (choose time now)

---

### Funnel 2: Blog → Lead

**Stages:**
1. **Discovery** (SEO / Social)
   - Busca Google: "como escolher CRM"
   - Lê blog post

2. **Engagement** (Reading)
   - Consome conteúdo
   - Scroll depth 75%+

3. **Interest** (Want more)
   - End of post: "Baixar guia completo"
   - CTA: Gated content

4. **Action** (Lead capture)
   - Preenche form (nome + email)
   - Download PDF
   - Entra no email drip

**Email Drip Sequence:**
- Day 0: Entrega do guia
- Day 2: "Gostou do guia? Aqui está um case study"
- Day 5: "3 erros comuns ao escolher CRM"
- Day 7: "Pronto para ver o Sirius CRM em ação?" (CTA: Demo)

---

## 📊 Analytics & Tracking

### Key Pages to Track

**Engagement Metrics:**
- Homepage: Scroll depth, time on page, CTA clicks
- Product pages: Video play rate, feature clicks, demo requests
- Pricing: Plan comparisons, calculator usage
- Blog: Read time, related post clicks, download rate

**Conversion Metrics:**
- Demo requests (form submissions)
- Trial signups
- Newsletter signups
- Gated content downloads

**Event Tracking:**
```javascript
// Examples
trackEvent('cta_clicked', {
  page: 'homepage',
  cta_text: 'Agendar demonstração',
  cta_position: 'hero'
});

trackEvent('product_viewed', {
  product: 'sirius-crm',
  source: 'homepage_card'
});

trackEvent('form_submitted', {
  form_type: 'demo_request',
  product_interest: 'sirius-crm'
});
```

---

## ✅ Information Architecture Checklist

### Estrutura
- [x] Sitemap completo definido
- [x] User flows mapeados
- [x] Navigation architecture clara
- [x] Breadcrumbs planejados
- [x] Search implementado
- [x] Mobile navigation otimizada

### CTAs
- [x] Hierarchy estabelecida
- [x] Copy guidelines definidas
- [x] Placement por página mapeado
- [x] Conversion funnels desenhados

### Tracking
- [x] Analytics plan criado
- [x] Conversion goals definidas
- [x] Event tracking especificado

---

## 📋 Próximos Passos

- [ ] Validar sitemap com stakeholders
- [ ] Prototipar navigation no Figma
- [ ] Criar wireframes de cada template de página
- [ ] Definir URL structure & redirects
- [ ] Setup analytics (GA4 + Mixpanel)
- [ ] Criar tracking plan detalhado

---

**Última Atualização:** 2026-01-11
**Responsável:** Claude AI
**Status:** 100% completo
**Próximo:** Consolidar Phase 1 e apresentar para aprovação
