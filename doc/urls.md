# URLs do ROI Labs (Site Institucional)

## Contagem Total
- **Landing Pages**: 7 URLs
- **Páginas de Produtos**: 5 URLs
- **Blog Posts**: 14 URLs (mock/estáticos)
- **API Routes**: 5+ endpoints
- **Total**: 30+ URLs públicos

---

## 1. Landing Pages Institucionais

| URL | Descrição | Prioridade |
|-----|-----------|------------|
| `/` | Homepage | 1.0 |
| `/sobre` | Sobre a ROI Labs | 0.8 |
| `/blog` | Blog institucional | 0.9 |
| `/contato` | Formulário de contato | 0.7 |
| `/precos` | Comparativo de preços dos produtos | 0.9 |
| `/privacidade` | Política de privacidade | 0.3 |
| `/termos` | Termos de uso | 0.3 |

---

## 2. Páginas de Produtos (Portfolio)

| URL | Produto | Prioridade | Status |
|-----|---------|------------|--------|
| `/sirius-crm` | Sirius CRM - CRM de Vendas B2B | 1.0 | ✅ Lançado |
| `/orion-erp` | Orion ERP - Sistema ERP Completo | 1.0 | ✅ Lançado |
| `/vertice-marketing` | Vértice Marketing - Automação de Marketing | 1.0 | 🚧 Em desenvolvimento |
| `/pcp-industrial` | PCP Industrial - Planejamento e Controle de Produção | 0.6 | 🔮 Planejado |
| `/bpo-financeiro` | BPO Financeiro - Terceirização Financeira | 0.6 | 🔮 Planejado |

---

## 3. Blog (14 Posts)

### Posts Publicados
Todos os posts estão no formato `/blog/[slug]`:

| URL | Título | Data | Prioridade |
|-----|--------|------|------------|
| `/blog/como-escolher-crm-ideal` | Como escolher o CRM ideal | 2026-01-12 | 0.7 |
| `/blog/10-metricas-essenciais-crm` | 10 métricas essenciais de CRM | 2026-01-10 | 0.7 |
| `/blog/erp-vs-planilhas` | ERP vs Planilhas | 2026-01-08 | 0.7 |
| `/blog/automacao-marketing-pmes` | Automação de Marketing para PMEs | 2026-01-05 | 0.7 |
| `/blog/roi-software-gestao` | ROI de Software de Gestão | 2026-01-03 | 0.7 |
| `/blog/integracao-crm-erp` | Integração CRM-ERP | 2026-01-01 | 0.7 |
| `/blog/lgpd-dados-clientes` | LGPD e Dados de Clientes | 2025-12-28 | 0.7 |
| `/blog/transformacao-digital-pmes` | Transformação Digital em PMEs | 2025-12-26 | 0.7 |
| `/blog/kpis-vendas-b2b` | KPIs de Vendas B2B | 2025-12-24 | 0.7 |
| `/blog/onboarding-clientes-sucesso` | Onboarding de Clientes com Sucesso | 2025-12-22 | 0.7 |
| `/blog/gestao-estoque-erp` | Gestão de Estoque com ERP | 2025-12-20 | 0.7 |
| `/blog/funil-vendas-otimizado` | Funil de Vendas Otimizado | 2025-12-18 | 0.7 |
| `/blog/email-marketing-segmentacao` | Email Marketing e Segmentação | 2025-12-16 | 0.7 |
| `/blog/dashboard-gerencial-kpis` | Dashboard Gerencial e KPIs | 2025-12-14 | 0.7 |

---

## 4. API Routes (Backend)

### 4.1 Contato
- `POST /api/contact` - Envio de formulário de contato
- `POST /api/newsletter` - Inscrição em newsletter

### 4.2 Analytics
- `POST /api/analytics/track` - Tracking de eventos (GTM/Analytics)

### 4.3 Recursos
- `GET /api/health` - Health check
- `GET /api/status` - Status dos serviços

---

## 5. Estrutura de Produtos (Ecossistema ROI Labs)

### 5.1 Sirius CRM
**URL Principal**: https://sirius.roilabs.com.br
**Descrição**: CRM focado em vendas B2B com pipeline Kanban
**Status**: ✅ Lançado e em produção
**Público-alvo**: PMEs, vendedores B2B, equipes comerciais

### 5.2 Orion ERP
**URL Principal**: https://orion.roilabs.com.br
**Descrição**: ERP completo com gestão fiscal, estoque e financeiro
**Status**: ✅ Lançado e em produção
**Público-alvo**: Empresas de varejo, serviços e indústria

### 5.3 Vértice Marketing
**URL Principal**: TBD
**Descrição**: Plataforma de automação de marketing
**Status**: 🚧 Em desenvolvimento
**Público-alvo**: PMEs, agências, profissionais de marketing

### 5.4 PCP Industrial
**URL Principal**: TBD
**Descrição**: Planejamento e Controle de Produção
**Status**: 🔮 Planejado
**Público-alvo**: Indústrias de manufatura

### 5.5 BPO Financeiro
**URL Principal**: TBD
**Descrição**: Terceirização de processos financeiros
**Status**: 🔮 Planejado
**Público-alvo**: Empresas que querem terceirizar financeiro

---

## 6. Assets e Recursos Estáticos

- `/sitemap.xml` - Sitemap gerado dinamicamente
- `/robots.txt` - Robots.txt
- `/favicon.ico` - Favicon
- `/logo.svg` - Logo da ROI Labs
- `/og-image.png` - Open Graph image

---

## 7. Estrutura de Route Groups

O projeto usa Next.js 14+ com Route Groups:

### (marketing)
Agrupa todas as páginas de marketing:
- `/` (homepage)
- `/sobre`
- `/blog`
- `/blog/[slug]`
- `/contato`
- `/precos`
- `/privacidade`
- `/termos`

### (products)
Agrupa todas as páginas de produtos:
- `/sirius-crm`
- `/orion-erp`
- `/vertice-marketing`
- `/pcp-industrial`
- `/bpo-financeiro`

---

## 8. Páginas de Produto - Estrutura Padrão

Cada página de produto segue uma estrutura consistente:

1. **Hero Section** - Apresentação principal com CTA
2. **Features** - Principais funcionalidades
3. **Benefits** - Benefícios para o negócio
4. **Screenshots/Demo** - Capturas de tela ou vídeo demo
5. **Pricing** - Tabela de preços/planos
6. **Testimonials** - Depoimentos de clientes (se disponível)
7. **FAQ** - Perguntas frequentes
8. **CTA Final** - Chamada para ação (teste grátis, demo)

---

## 9. Blog - Categorias e Tags

### Categorias (a implementar)
- CRM e Vendas
- ERP e Gestão
- Marketing Digital
- Transformação Digital
- Produtividade
- Casos de Sucesso

### Tags Comuns
- #PME
- #B2B
- #Automação
- #Gestão
- #Vendas
- #Tecnologia
- #ROI

---

## 10. Integrações e Links Externos

### Links para Produtos
- [Sirius CRM](https://sirius.roilabs.com.br) - Site dedicado
- [Orion ERP](https://orion.roilabs.com.br) - Site dedicado
- Vértice Marketing - TBD
- PCP Industrial - TBD
- BPO Financeiro - TBD

### Redes Sociais
- LinkedIn: /company/roilabs
- Instagram: @roilabs.oficial
- YouTube: ROI Labs
- WhatsApp: Contato comercial

### Comunidade
- Discord/Slack da comunidade ROI Labs (planejado)
- Fórum de usuários (planejado)

---

## 11. Comparação com Sites de Produtos

| Aspecto | ROI Labs (Institucional) | Sirius CRM | Orion ERP |
|---------|-------------------------|------------|-----------|
| **Tipo** | Site institucional/portfolio | Aplicação SaaS | Aplicação SaaS |
| **URLs** | ~30 URLs | ~50+ URLs | ~100+ URLs |
| **Foco** | Apresentar produtos | CRM de vendas | ERP completo |
| **Blog** | Blog institucional | Blog específico CRM | Blog específico ERP |
| **Dashboard** | Não tem | Sim (protegido) | Sim (protegido) |
| **Auth** | Não tem | Login/Register | Login/Register |
| **Sitemap** | Estático (14 posts) | Dinâmico | Dinâmico |

---

## 12. SEO e Marketing

### Meta Tags Importantes
Cada página tem meta tags otimizadas:
- `title` - Título único
- `description` - Descrição relevante
- `keywords` - Palavras-chave (opcional)
- Open Graph tags para compartilhamento social
- Twitter Cards

### Palavras-chave Alvo
- ROI Labs
- Software de gestão brasileiro
- CRM para PMEs
- ERP para pequenas empresas
- Automação de marketing
- Transformação digital
- Sistema de gestão integrado

---

## 13. Roadmap de Conteúdo

### Blog - Próximos Posts
- [ ] Como integrar CRM e ERP na sua empresa
- [ ] Guia completo de automação de marketing
- [ ] Casos de sucesso: ROI real de nossos clientes
- [ ] Comparativo: ROI Labs vs Concorrentes
- [ ] Webinar: Transformação Digital em 90 dias

### Páginas Futuras
- [ ] `/casos-sucesso` - Cases de clientes
- [ ] `/webinars` - Webinars e eventos
- [ ] `/parceiros` - Programa de parceiros
- [ ] `/carreiras` - Trabalhe conosco
- [ ] `/imprensa` - Material para imprensa
- [ ] `/api-docs` - Documentação de APIs
- [ ] `/changelog` - Histórico de atualizações

---

## Manutenção do Documento

### Quando Atualizar:
1. ✅ Ao lançar novo produto
2. ✅ Ao publicar novo post no blog
3. ✅ Ao criar novas landing pages
4. ✅ Ao adicionar novos endpoints de API
5. ⚠️ Mudanças em produtos existentes devem ser refletidas

### Sincronização com Sitemap:
O arquivo `app/sitemap.ts` deve ser atualizado em paralelo:
- Adicionar novos produtos
- Adicionar novos posts de blog
- Atualizar lastModified dates
- Ajustar prioridades conforme necessário

### Checklist de Atualização:
- [ ] Adicionar URL em `doc/urls.md`
- [ ] Adicionar URL em `app/sitemap.ts`
- [ ] Atualizar contagem total no topo
- [ ] Verificar prioridades no sitemap
- [ ] Atualizar README.md se necessário
- [ ] Testar URL em produção após deploy
- [ ] Submeter ao Google Search Console
- [ ] Atualizar páginas de produtos individuais (Sirius/Orion) se aplicável

---

## Observações Importantes

### Site Institucional vs Produtos
- **ROI Labs (este site)**: Vitrine dos produtos, blog corporativo, contato
- **Sirius CRM**: Aplicação completa com dashboard, autenticação, CRM funcional
- **Orion ERP**: Aplicação completa com dashboard, autenticação, ERP funcional

### Fluxo do Usuário
1. Usuário chega em `roilabs.com.br` (site institucional)
2. Navega pelos produtos e lê sobre cada um
3. Clica em "Começar Teste Grátis" ou "Saiba Mais"
4. É redirecionado para `sirius.roilabs.com.br` ou `orion.roilabs.com.br`
5. Faz cadastro/login no produto específico
6. Usa a aplicação completa

### Estratégia de Conteúdo
- Blog do ROI Labs: Conteúdo geral sobre gestão, negócios, transformação digital
- Blog do Sirius: Conteúdo específico sobre vendas, CRM, pipeline
- Blog do Orion: Conteúdo específico sobre ERP, fiscal, estoque, financeiro

---

**Última atualização**: 2024-01-23
**Versão**: 1.0.0
**Base URL**: https://roilabs.com.br
**Produtos Ativos**: 2 (Sirius CRM, Orion ERP)
**Produtos em Desenvolvimento**: 1 (Vértice Marketing)
**Produtos Planejados**: 2 (PCP Industrial, BPO Financeiro)
