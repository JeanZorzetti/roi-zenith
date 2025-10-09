# 🎯 ROADMAP - CRM HÍBRIDO: MARKET RESEARCH + SALES

> Sistema CRM dual-funnel com gamificação integrada

---

## 📊 VISÃO GERAL

Transformar o CRM atual (focado em Sales) em um sistema híbrido que suporte:
1. **Market Research Pipeline** - Pesquisa de mercado, discovery, pain mapping
2. **Sales Pipeline** - Vendas tradicionais (qualificação → fechamento)
3. **Lead Promotion** - Fluxo de promoção Research → Sales
4. **Gamificação Integrada** - Eventos e recompensas para ambos os funis

---

## 🏗️ ARQUITETURA

```
┌─────────────────────────────────────────────────────────────┐
│                    CRM ZENITH - DUAL FUNNEL                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────┐         ┌──────────────────────┐ │
│  │  MARKET RESEARCH      │  ──→    │    SALES PIPELINE    │ │
│  │  PIPELINE             │         │                      │ │
│  │                       │         │                      │ │
│  │ 1. Target Discovery   │         │ 1. Qualificação      │ │
│  │ 2. Pain Mapping       │ PROMOTE │ 2. Proposta          │ │
│  │ 3. Solution Fit       │  ═══>   │ 3. Negociação        │ │
│  │ 4. Qualification      │         │ 4. Fechamento        │ │
│  │                       │         │                      │ │
│  └───────────────────────┘         └──────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📅 FASES DE IMPLEMENTAÇÃO

### ✅ FASE 0: PREPARAÇÃO
**Status**: ⏳ Em Andamento
**Objetivo**: Documentar e planejar a implementação

- [ ] Criar roadmap_crm.md
- [ ] Definir arquitetura de dados
- [ ] Definir eventos de gamificação
- [ ] Validar critérios de promoção Research → Sales

---

### 🔧 FASE 1: BACKEND - DATABASE SCHEMA
**Status**: ⏸️ Não Iniciado
**Objetivo**: Atualizar schema Prisma com campos de Market Research

#### Task 1.1: Atualizar modelo Pipeline
- [ ] Adicionar campo `type: PipelineType` (MARKET_RESEARCH | SALES)
- [ ] Adicionar campo `allowPromotion: Boolean` (default: false)
- [ ] Criar migration

#### Task 1.2: Atualizar modelo Deal/Lead
- [ ] Adicionar campo `researchType: ResearchType` (MARKET_RESEARCH | SALES)
- [ ] Adicionar campo `targetProfile: String?` (B2B_ENTERPRISE, B2B_SMB, B2C)
- [ ] Adicionar campo `marketSegment: String?`
- [ ] Adicionar campo `companySizeTarget: String?`
- [ ] Adicionar campo `budgetRangeMin: Decimal?`
- [ ] Adicionar campo `budgetRangeMax: Decimal?`
- [ ] Adicionar campo `decisionMakerIdentified: Boolean` (default: false)
- [ ] Adicionar campo `decisionMakerName: String?`
- [ ] Adicionar campo `decisionMakerRole: String?`
- [ ] Adicionar campo `qualificationScore: Int` (default: 0)
- [ ] Adicionar campo `researchNotes: String?`
- [ ] Adicionar campo `painPointsList: String[]` (array)
- [ ] Adicionar campo `promotedToSales: Boolean` (default: false)
- [ ] Adicionar campo `promotedFromDealId: String?` (referência ao deal de research original)
- [ ] Criar migration

#### Task 1.3: Atualizar modelo Activity
- [ ] Atualizar enum `type` para incluir "interview" e "survey"
- [ ] Adicionar campo `researchFindings: String?`
- [ ] Adicionar campo `painPointsDiscovered: String[]` (array)
- [ ] Adicionar campo `qualificationImpact: Int` (default: 0)
- [ ] Criar migration

#### Task 1.4: Criar Pipelines padrão via seed
- [ ] Pipeline "Market Research" com 4 etapas
  - Stage 1: Target Discovery
  - Stage 2: Pain Mapping
  - Stage 3: Solution Fit
  - Stage 4: Qualification
- [ ] Pipeline "Sales" com 4 etapas (já existente, apenas marcar como SALES)
  - Stage 1: Qualificação
  - Stage 2: Proposta
  - Stage 3: Negociação
  - Stage 4: Fechamento
- [ ] Executar seed

**Arquivos afetados:**
- `backend/prisma/schema.prisma`
- `backend/prisma/migrations/`
- `backend/prisma/seed.ts`

---

### 🔧 FASE 2: BACKEND - CRM CONTROLLER
**Status**: ⏸️ Não Iniciado
**Objetivo**: Atualizar controllers para suportar Market Research

#### Task 2.1: Atualizar createDeal
- [ ] Adicionar validação de campos de Market Research
- [ ] Adicionar lógica para calcular `qualificationScore` inicial
- [ ] Triggerar evento de gamificação `TARGET_DISCOVERED` (se researchType === MARKET_RESEARCH)

#### Task 2.2: Atualizar updateDeal
- [ ] Adicionar lógica para recalcular `qualificationScore` quando pain points são adicionados
- [ ] Triggerar evento `PAIN_MAPPED` quando painPointsList é atualizado
- [ ] Triggerar evento `DECISION_MAKER_IDENTIFIED` quando decisionMakerIdentified = true
- [ ] Triggerar evento `LEAD_QUALIFIED` quando qualificationScore >= 70

#### Task 2.3: Criar endpoint promoteDealToSales
- [ ] Rota: `POST /api/crm/deals/:dealId/promote`
- [ ] Validar critérios de promoção:
  - Lead está em pipeline tipo MARKET_RESEARCH
  - qualificationScore >= 70
  - painPointsList.length >= 1
  - decisionMakerIdentified === true
  - budgetRangeMin e budgetRangeMax definidos
- [ ] Criar novo Deal no Sales pipeline (primeira etapa)
- [ ] Copiar dados relevantes (company, contact, painPointsList[0] → painDiscovered)
- [ ] Marcar deal original como promotedToSales = true
- [ ] Setar promotedFromDealId no novo deal
- [ ] Triggerar evento `RESEARCH_TO_SALES_PROMOTION`

#### Task 2.4: Atualizar createActivity
- [ ] Triggerar evento `INTERVIEW_COMPLETED` quando type === "interview"
- [ ] Atualizar qualificationScore do deal baseado em qualificationImpact
- [ ] Adicionar painPointsDiscovered ao deal.painPointsList

#### Task 2.5: Atualizar createContact
- [ ] Validar que evento de gamificação `CONTACT_CREATED` está funcionando (já implementado, só testar)

**Arquivos afetados:**
- `backend/src/controllers/crmController.ts`
- `backend/src/routes/crmRoutes.ts`

---

### 🔧 FASE 3: BACKEND - GAME EVENTS
**Status**: ⏸️ Não Iniciado
**Objetivo**: Adicionar eventos de gamificação para Market Research

#### Task 3.1: Criar evento TARGET_DISCOVERED
- [ ] Implementar `onTargetDiscovered()` em `gameEvents.ts`
- [ ] Recompensas: +10 XP, +5 coins
- [ ] Notificação: "🎯 Novo Target Descoberto!"

#### Task 3.2: Criar evento PAIN_MAPPED
- [ ] Implementar `onPainMapped()` em `gameEvents.ts`
- [ ] Recompensas variáveis por intensidade: +10-30 XP, +5-20 coins
- [ ] Notificação: "💡 Pain Point Mapeado!"

#### Task 3.3: Criar evento INTERVIEW_COMPLETED
- [ ] Implementar `onInterviewCompleted()` em `gameEvents.ts`
- [ ] Recompensas: +20 XP, +15 coins, +2 energy
- [ ] Notificação: "📞 Entrevista Concluída!"

#### Task 3.4: Criar evento DECISION_MAKER_IDENTIFIED
- [ ] Implementar `onDecisionMakerIdentified()` em `gameEvents.ts`
- [ ] Recompensas: +25 XP, +20 coins
- [ ] Notificação: "👔 Decision Maker Identificado!"

#### Task 3.5: Criar evento LEAD_QUALIFIED
- [ ] Implementar `onLeadQualified()` em `gameEvents.ts`
- [ ] Recompensas: +50 XP, +30 coins
- [ ] Item drop (20% chance): "Market Research Report"
- [ ] Notificação: "✅ Lead Qualificado!"

#### Task 3.6: Criar evento RESEARCH_TO_SALES_PROMOTION
- [ ] Implementar `onResearchToSalesPromotion()` em `gameEvents.ts`
- [ ] Recompensas: +100 XP, +50 coins, +10 reputation
- [ ] Item drop (100% garantido): "Golden Ticket" ou "Sales Key"
- [ ] Notificação épica: "🎉 Lead Promovido para Vendas!"
- [ ] Trigger level up animation se aplicável

**Arquivos afetados:**
- `backend/src/events/gameEvents.ts`
- `backend/src/config/gameConfig.ts` (adicionar novos items se necessário)

---

### 🎨 FASE 4: FRONTEND - TYPES & SERVICES
**Status**: ⏸️ Não Iniciado
**Objetivo**: Atualizar tipos TypeScript e serviços

#### Task 4.1: Atualizar tipos CRM
- [ ] Atualizar interface `Pipeline` com campo `type`
- [ ] Atualizar interface `Deal` com todos os campos de Market Research
- [ ] Atualizar interface `Activity` com campos de research
- [ ] Criar enum `PipelineType` (MARKET_RESEARCH, SALES)
- [ ] Criar enum `ResearchType` (MARKET_RESEARCH, SALES)
- [ ] Criar enum `TargetProfile` (B2B_ENTERPRISE, B2B_SMB, B2C)

#### Task 4.2: Atualizar crmService
- [ ] Adicionar método `promoteDealToSales(dealId: string)`
- [ ] Adicionar método `checkPromotionEligibility(dealId: string)`
- [ ] Adicionar método `createContactWithUI(contact: Contact)` (já existe createContact, garantir que userId está sendo enviado)
- [ ] Adicionar logs de debug (já implementado, validar)

**Arquivos afetados:**
- `frontend/src/types/CRM.ts`
- `frontend/src/services/crmService.ts`

---

### 🎨 FASE 5: FRONTEND - CONTACTS MANAGER
**Status**: ⏸️ Não Iniciado
**Objetivo**: Adicionar gestão de contatos na CRMPage

#### Task 5.1: Criar componente ContactsList
- [ ] Criar `frontend/src/components/crm/ContactsList.tsx`
- [ ] Lista de contatos em cards ou tabela
- [ ] Exibir: nome, email, phone, company, position
- [ ] Botão "Edit" e "Delete" por contato
- [ ] Filtro de busca por nome/email

#### Task 5.2: Criar componente ContactModal
- [ ] Criar `frontend/src/components/crm/ContactModal.tsx`
- [ ] Formulário com campos: firstName, lastName, email, phone, position, company, notes
- [ ] Validação de campos obrigatórios
- [ ] Botão "Save" que chama `crmService.createContact()` com userId
- [ ] Fechar modal após sucesso

#### Task 5.3: Integrar Contacts Manager na CRMPage
- [ ] Adicionar tab "Contacts" ou seção lateral
- [ ] Botão "Add Contact" que abre ContactModal
- [ ] Renderizar ContactsList
- [ ] Ao criar contato, verificar logs no console (userId sendo enviado)
- [ ] Verificar logs do backend (evento de gamificação disparado)
- [ ] Verificar notificação de gamificação no frontend

**Arquivos afetados:**
- `frontend/src/components/crm/ContactsList.tsx` (novo)
- `frontend/src/components/crm/ContactModal.tsx` (novo)
- `frontend/src/pages/Dashboard/CRMPage.tsx`

---

### 🎨 FASE 6: FRONTEND - DUAL PIPELINE UI
**Status**: ⏸️ Não Iniciado
**Objetivo**: Atualizar UI para suportar pipelines Research e Sales

#### Task 6.1: Atualizar Deal/Lead Card
- [ ] Exibir badge visual diferenciando Research (🔍 azul) vs Sales (💰 verde)
- [ ] Se `researchType === "MARKET_RESEARCH"`:
  - [ ] Mostrar: Qualification Score (progress bar)
  - [ ] Mostrar: Target Profile badge
  - [ ] Mostrar: Pain Points Count
  - [ ] Esconder: Value, Probability (ou mostrar como "TBD")
- [ ] Se `researchType === "SALES"`:
  - [ ] Mostrar: Value, Probability, Expected Close Date (já existe)
  - [ ] Mostrar: painDiscovered (principal pain)

#### Task 6.2: Atualizar Deal Modal (Create/Edit)
- [ ] Adicionar dropdown para selecionar `researchType`
- [ ] Campos dinâmicos baseados em researchType:
  - [ ] Se MARKET_RESEARCH: mostrar targetProfile, marketSegment, budgetRange, painPointsList, decisionMaker fields
  - [ ] Se SALES: mostrar value, probability, expectedCloseDate (já existe)
- [ ] Validação de campos obrigatórios por tipo

#### Task 6.3: Pipeline Switcher com Badge
- [ ] No dropdown de pipeline, adicionar badge/emoji indicando tipo
- [ ] 🔍 "Market Research" (azul)
- [ ] 💰 "Sales Pipeline" (verde)
- [ ] Filtrar pipelines por tipo se necessário

**Arquivos afetados:**
- `frontend/src/pages/Dashboard/CRMPage.tsx`
- `frontend/src/components/crm/DealCard.tsx` (se componentizado)
- `frontend/src/components/crm/DealModal.tsx` (se componentizado)

---

### 🎨 FASE 7: FRONTEND - PROMOTE TO SALES
**Status**: ⏸️ Não Iniciado
**Objetivo**: Implementar funcionalidade de promoção Research → Sales

#### Task 7.1: Criar componente PromoteToSalesButton
- [ ] Criar `frontend/src/components/crm/PromoteToSalesButton.tsx`
- [ ] Exibir apenas se:
  - Deal.researchType === MARKET_RESEARCH
  - Deal está na última etapa do pipeline de Research
- [ ] Ao clicar, chamar `crmService.checkPromotionEligibility(dealId)`
- [ ] Se não elegível: mostrar modal com critérios não atendidos
- [ ] Se elegível: mostrar modal de confirmação

#### Task 7.2: Criar componente PromotionModal
- [ ] Criar `frontend/src/components/crm/PromotionModal.tsx`
- [ ] Exibir checklist de critérios:
  - ✅ Qualification Score >= 70
  - ✅ Pain Points: X descobertos
  - ✅ Decision Maker identificado
  - ✅ Budget range definido
- [ ] Preview do deal que será criado no Sales pipeline
- [ ] Botão "Confirm Promotion"
- [ ] Ao confirmar: chamar `crmService.promoteDealToSales(dealId)`
- [ ] Mostrar notificação de gamificação (já implementado via socket)
- [ ] Refresh da página/pipelines após promoção

#### Task 7.3: Integrar na Deal Card
- [ ] Adicionar PromoteToSalesButton no card (canto superior direito ou footer)
- [ ] Estilo destacado (botão dourado/épico)
- [ ] Tooltip: "Promover para Vendas 🚀"

**Arquivos afetados:**
- `frontend/src/components/crm/PromoteToSalesButton.tsx` (novo)
- `frontend/src/components/crm/PromotionModal.tsx` (novo)
- `frontend/src/pages/Dashboard/CRMPage.tsx`

---

### 🧪 FASE 8: TESTES E REFINAMENTO
**Status**: ⏸️ Não Iniciado
**Objetivo**: Testar fluxo completo e ajustar gamificação

#### Task 8.1: Teste - Criar Contato
- [ ] Criar contato via UI
- [ ] Verificar log frontend: userId sendo enviado
- [ ] Verificar log backend: evento disparado
- [ ] Verificar notificação de gamificação
- [ ] Verificar XP e coins aumentarem no HUD

#### Task 8.2: Teste - Criar Lead de Research
- [ ] Criar deal em pipeline Market Research
- [ ] Verificar evento TARGET_DISCOVERED
- [ ] Verificar notificação e recompensas

#### Task 8.3: Teste - Mapear Pain Points
- [ ] Editar deal e adicionar pain point
- [ ] Verificar evento PAIN_MAPPED
- [ ] Verificar qualification score atualizar

#### Task 8.4: Teste - Completar Entrevista
- [ ] Criar activity tipo "interview"
- [ ] Verificar evento INTERVIEW_COMPLETED
- [ ] Verificar recompensas (+energy)

#### Task 8.5: Teste - Identificar Decision Maker
- [ ] Marcar decisionMakerIdentified = true
- [ ] Verificar evento DECISION_MAKER_IDENTIFIED
- [ ] Verificar notificação

#### Task 8.6: Teste - Qualificar Lead
- [ ] Aumentar qualification score para >= 70
- [ ] Verificar evento LEAD_QUALIFIED
- [ ] Verificar item drop

#### Task 8.7: Teste - Promover para Sales
- [ ] Lead com todos os critérios atendidos
- [ ] Clicar em "Promote to Sales"
- [ ] Verificar modal de confirmação
- [ ] Confirmar promoção
- [ ] Verificar novo deal criado no Sales pipeline
- [ ] Verificar evento RESEARCH_TO_SALES_PROMOTION
- [ ] Verificar recompensas épicas (+100 XP, +10 reputation, item drop)
- [ ] Verificar notificação animada

#### Task 8.8: Ajustes de UX
- [ ] Ajustar cores e badges
- [ ] Ajustar textos e tooltips
- [ ] Ajustar animações de notificação
- [ ] Ajustar balanceamento de recompensas (se necessário)

**Arquivos afetados:**
- Todos os anteriores (ajustes conforme necessário)

---

### 📚 FASE 9: DOCUMENTAÇÃO
**Status**: ⏸️ Não Iniciado
**Objetivo**: Documentar o sistema para futuros devs

#### Task 9.1: Atualizar README
- [ ] Documentar arquitetura dual-funnel
- [ ] Documentar critérios de promoção
- [ ] Adicionar screenshots

#### Task 9.2: Criar guia de integração
- [ ] Criar `docs/crm-hybrid-guide.md`
- [ ] Explicar fluxo Market Research → Sales
- [ ] Explicar eventos de gamificação
- [ ] Exemplos de código

#### Task 9.3: Atualizar roadmap_game.md
- [ ] Marcar integração CRM como concluída
- [ ] Adicionar referência ao roadmap_crm.md

**Arquivos afetados:**
- `README.md`
- `docs/crm-hybrid-guide.md` (novo)
- `roadmap_game.md`

---

## 🎯 CRITÉRIOS DE PROMOÇÃO (Research → Sales)

Para um lead ser promovido de Market Research para Sales, deve atender **TODOS** os critérios:

1. ✅ **Qualification Score >= 70**
2. ✅ **Pelo menos 1 pain point descoberto**
3. ✅ **Decision maker identificado** (decisionMakerIdentified === true)
4. ✅ **Budget range definido** (budgetRangeMin e budgetRangeMax preenchidos)
5. ✅ **Lead está na última etapa** do pipeline de Market Research

---

## 🎮 EVENTOS DE GAMIFICAÇÃO

### Market Research Events

| Evento | Trigger | XP | Coins | Energy | Reputation | Item Drop |
|--------|---------|----|----|--------|------------|-----------|
| `TARGET_DISCOVERED` | Criar lead em Market Research | +10 | +5 | - | - | - |
| `PAIN_MAPPED` | Adicionar pain point | +15-30 | +10-20 | - | - | - |
| `INTERVIEW_COMPLETED` | Completar activity "interview" | +20 | +15 | +2 | - | - |
| `DECISION_MAKER_IDENTIFIED` | Marcar decisionMaker | +25 | +20 | - | - | - |
| `LEAD_QUALIFIED` | Score >= 70 | +50 | +30 | - | - | 20% |
| `RESEARCH_TO_SALES_PROMOTION` | Promover para Sales | +100 | +50 | - | +10 | 100% |

### Existing Sales Events (já implementados)

| Evento | Trigger | XP | Coins | Energy | Reputation | Item Drop |
|--------|---------|----|----|--------|------------|-----------|
| `CONTACT_CREATED` | Criar contato | +15 | +10 | - | - | - |
| `PAIN_DISCOVERED` | Descobrir dor em deal | +20-40 | +15-30 | - | - | variável |
| `ACTIVITY_COMPLETED` | Criar activity | +10 | +5 | - | - | - |
| `SOLUTION_MAPPED` | Mapear solução Orion | +30 | +20 | - | - | - |
| `REFERRAL_RECEIVED` | Receber indicação | +25 | +15 | +5 | - | - |
| `RELATIONSHIP_UPGRADED` | Upgrade de tier | +20 | +15 | - | - | - |

---

## 📦 ITENS DROPPABLE (Market Research)

| Item | Rarity | Source | Effect |
|------|--------|--------|--------|
| Market Research Report | Common | LEAD_QUALIFIED | +5 Intelligence |
| Golden Ticket | Rare | RESEARCH_TO_SALES_PROMOTION | +10 Charisma, +5 Luck |
| Sales Key | Epic | RESEARCH_TO_SALES_PROMOTION | +15 Perception, +10 Knowledge |

---

## ✅ PROGRESSO GERAL

### Fase 0: Preparação
- [ ] 0/4 tarefas completas (0%)

### Fase 1: Backend - Database Schema
- [ ] 0/4 tarefas completas (0%)

### Fase 2: Backend - CRM Controller
- [ ] 0/5 tarefas completas (0%)

### Fase 3: Backend - Game Events
- [ ] 0/6 tarefas completas (0%)

### Fase 4: Frontend - Types & Services
- [ ] 0/2 tarefas completas (0%)

### Fase 5: Frontend - Contacts Manager
- [ ] 0/3 tarefas completas (0%)

### Fase 6: Frontend - Dual Pipeline UI
- [ ] 0/3 tarefas completas (0%)

### Fase 7: Frontend - Promote to Sales
- [ ] 0/3 tarefas completas (0%)

### Fase 8: Testes e Refinamento
- [ ] 0/8 tarefas completas (0%)

### Fase 9: Documentação
- [ ] 0/3 tarefas completas (0%)

---

**PROGRESSO TOTAL: 0/41 tarefas completas (0%)**

---

## 📝 NOTAS

### Decisões de Design
- Manter compatibilidade com deals/pipelines existentes (researchType default: SALES)
- Qualification score calculado automaticamente baseado em pain points, decision maker, budget
- Promoção cria novo deal (não modifica o original) para manter histórico
- Eventos de gamificação são non-blocking (não falham a operação de CRM se derem erro)

### Melhorias Futuras (pós-MVP)
- Analytics de conversão Research → Sales
- Dashboard de metrics por funil
- Auto-qualification usando AI/scoring
- Templates de entrevista
- Integração com LinkedIn para enrichment de dados

---

**Última atualização:** 2025-10-09
**Versão:** 1.0
