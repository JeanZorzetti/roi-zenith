# 🎮 GAME INTEGRATION TEST - CRM → Game Events

## 📋 Objetivo

Testar a integração completa entre o CRM e o sistema de gamificação em **produção**, validando:
1. ✅ Eventos CRM são capturados corretamente
2. ✅ Socket.IO emite notificações real-time
3. ✅ Recursos são adicionados ao game state
4. ✅ Frontend recebe e processa eventos

---

## 🧪 TESTE 1: Contact Created → Game Event

### Pré-requisitos:
- Usuário autenticado no CRM (https://www.roilabs.com.br)
- Console do navegador aberto (F12)
- Backend em execução

### Steps:
1. **Ir para CRM** → `/crm`
2. **Abrir Console** do navegador (F12)
3. **Clicar em "Adicionar Contato"**
4. **Preencher dados:**
   - First Name: `Test User`
   - Last Name: `Game Integration`
   - Email: `test@gametest.com`
   - Phone: `(11) 99999-9999`
5. **Clicar em "Salvar"**

### Expected Backend Logs:
```
🎮 Triggering contact created event for user <userId>
🎮 [onContactCreated] Starting for userId: <userId>, contactName: Test User Game Integration
🎮 [onContactCreated] Socket.IO instance obtained
🎮 [onContactCreated] Calling gameService.processCRMEvent...
🎮 [onContactCreated] Game service result: { rewards: {...}, leveledUp: false }
✅ Contact created event processed for user <userId>
```

### Expected Frontend Logs:
```
🎮 [crmService.createContact] getUserId() returned: <userId>
🎮 [crmService.createContact] Sending payload: { firstName: "Test User", ..., userId: "<userId>" }
🎮 [crmService.createContact] Response status: 200
🎮 [crmService.createContact] Response data: { contact: {...} }
```

### Expected Socket.IO Events (se frontend listener estiver configurado):
```javascript
// Event: 'game:experience-gained'
{
  experience: 10,
  currentXP: X,
  totalXP: Y,
  level: Z
}

// Event: 'game:resources-gained'
{
  coins: 5,
  gems: 0,
  energy: 0,
  reputation: 0
}

// Event: 'game:notification'
{
  type: 'success',
  title: '🎉 Novo Contato',
  message: 'Test User Game Integration foi adicionado! +10 XP, +5 coins',
  duration: 5000
}
```

### ✅ Success Criteria:
- [x] Backend logs mostram evento disparado
- [x] Frontend logs mostram userId enviado
- [x] Sem erros no console
- [x] Contact criado com sucesso no CRM

---

## 🧪 TESTE 2: Deal Created (Market Research) → Target Discovered

### Steps:
1. **Ir para CRM** → `/crm`
2. **Selecionar pipeline** "Market Research"
3. **Clicar em "Adicionar Deal"**
4. **Preencher dados:**
   - Title: `Test Company - Game Integration`
   - Value: `10000`
   - Contact: Selecionar o contato criado no Teste 1
   - Company: Criar ou selecionar uma empresa
5. **Clicar em "Salvar"**

### Expected Backend Logs:
```
🎯 Triggering TARGET_DISCOVERED event for user <userId>, deal <dealId>
🎯 [onTargetDiscovered] Starting for userId: <userId>, target: Test Company - Game Integration
🎯 [onTargetDiscovered] Game service result: { rewards: {...} }
✅ Target discovered event processed for user <userId>
```

### Expected Socket.IO Events:
```javascript
// Event: 'game:experience-gained'
{
  experience: 15, // Valor do REWARDS_TABLE para TARGET_DISCOVERED
  ...
}

// Event: 'game:resources-gained'
{
  coins: 10,
  gems: 0,
  energy: 0,
  reputation: 0
}

// Event: 'game:notification'
{
  type: 'success',
  title: '🎯 Target Descoberto',
  message: 'Test Company - Game Integration adicionado ao research! +15 XP, +10 coins'
}
```

### ✅ Success Criteria:
- [x] Deal criado no pipeline Market Research
- [x] Evento TARGET_DISCOVERED disparado
- [x] Recursos adicionados ao game state

---

## 🧪 TESTE 3: Pain Point Mapped → Rewards

### Steps:
1. **Abrir o deal** criado no Teste 2
2. **Clicar em "Editar"**
3. **Adicionar Pain Points:**
   - Clicar em "Adicionar Pain Point"
   - Digitar: `Problema com gestão de estoque`
   - Adicionar mais 2 pain points
4. **Preencher outros campos de qualificação:**
   - Target Profile: `B2B_ENTERPRISE`
   - Market Segment: `Varejo`
   - Company Size Target: `51-200`
   - Budget Range Min: `5000`
   - Budget Range Max: `15000`
   - Decision Maker Identified: ✅ (marcar checkbox)
   - Decision Maker Name: `João Silva`
   - Decision Maker Role: `CEO`
5. **Clicar em "Salvar"**

### Expected Backend Logs:
```
💡 [onPainMapped] Starting for userId: <userId>, pain: Problema com gestão de estoque
💡 [onPainMapped] Game service result: { rewards: {...} }
✅ Pain mapped event processed for user <userId>
```

### Expected Qualification Score:
- Target Profile: +10 pontos
- Market Segment: +10 pontos
- Company Size Target: +10 pontos
- Budget Range: +20 pontos
- Decision Maker: +25 pontos
- 3 Pain Points: +15 pontos (3 × 5)
- **TOTAL: 90 pontos** ✅ (>= 70% = qualificado!)

### ✅ Success Criteria:
- [x] Pain points salvos
- [x] Qualification Score >= 70%
- [x] Eventos disparados para cada pain point
- [x] Recursos acumulados no game state

---

## 🧪 TESTE 4: Lead Promotion → Epic Rewards

### Steps:
1. **Abrir o deal** qualificado (Score >= 70%)
2. **Clicar no botão de "Promover para Vendas"** (🚀)
3. **Selecionar pipeline de destino** (Sales)
4. **Clicar em "Mover para Sales 🚀"**

### Expected Backend Logs:
```
🎉 [onResearchToSalesPromotion] Starting for userId: <userId>
🎉 [onResearchToSalesPromotion] Game service result: {
  rewards: { experience: 100, coins: 50, reputation: 10 },
  leveledUp: true,
  newLevel: 2
}
✅ Research to sales promotion event processed for user <userId>
```

### Expected Socket.IO Events:
```javascript
// Event: 'game:experience-gained'
{
  experience: 100, // EPIC REWARD!
  level: 2
}

// Event: 'game:resources-gained'
{
  coins: 50,
  gems: 0,
  energy: 0,
  reputation: 10
}

// Event: 'game:level-up' (se subiu de nível)
{
  newLevel: 2,
  skillPoints: 1,
  maxEnergy: 5,
  rewards: {...}
}

// Event: 'game:notification'
{
  type: 'success',
  title: '🎉 Lead Promovido para Vendas!',
  message: 'Lead qualificado promovido com sucesso! Score: 90/100 - +100 XP, +10 reputation'
}
```

### ✅ Success Criteria:
- [x] Deal movido para Sales pipeline
- [x] Evento RESEARCH_TO_SALES_PROMOTION disparado
- [x] Rewards épicas concedidas
- [x] Level up se XP suficiente

---

## 📊 VALIDAÇÃO DO GAME STATE

### Como verificar no banco:

```sql
-- Ver estado do jogo do usuário
SELECT * FROM game_states WHERE user_id = '<userId>';

-- Ver transações de recursos
SELECT
  crm_action,
  coins_earned,
  gems_earned,
  energy_earned,
  experience_earned,
  reputation_earned,
  created_at
FROM game_transactions
WHERE user_id = '<userId>'
ORDER BY created_at DESC
LIMIT 10;

-- Ver insights descobertos
SELECT
  pain_text,
  pain_category,
  pain_intensity,
  occurrences,
  discovered_at
FROM game_insights
WHERE user_id = '<userId>'
ORDER BY discovered_at DESC;
```

### Expected game_states após todos os testes:

```javascript
{
  user_id: '<userId>',
  coins: 65, // 5 + 10 + 15*3 (pain points) + 50 (promotion) = 110
  gems: 0,
  energy: 50,
  experience: 125, // 10 + 15 + 15*3 (pain points) + 100 = 170
  level: 2, // Se iniciou em level 1 e XP_TO_NEXT = 100
  reputation: 10,
  // ...
}
```

---

## 🔧 TROUBLESHOOTING

### Problema: "No userId provided, skipping game event"

**Causa:** Frontend não está enviando userId no body.

**Solução:**
1. Verificar se `getUserId()` retorna valor válido
2. Verificar se usuário está autenticado
3. Verificar se cookie de sessão está presente

### Problema: "Socket.IO instance not initialized"

**Causa:** `setSocketIOInstance()` não foi chamado.

**Solução:**
1. Verificar se `server.ts` chama `setSocketIOInstance(io)`
2. Verificar ordem de imports e inicialização

### Problema: Frontend não recebe eventos Socket.IO

**Causa:** Frontend listener não configurado (ainda).

**Solução:**
- **FASE 1 Week 2:** Frontend com Phaser.js e Socket.IO listeners será implementado
- **Por enquanto:** Validar apenas logs do backend

---

## ✅ CHECKLIST DE VALIDAÇÃO

### Backend (✅ Pronto para testar):
- [x] Socket.IO configurado
- [x] Event handlers implementados
- [x] Triggers nos controllers CRM
- [x] gameService.processCRMEvent() funcional
- [x] Database schema criado

### Frontend (⏳ Pendente Week 2):
- [ ] Socket.IO client conectado
- [ ] Event listeners configurados
- [ ] Phaser.js HUD mostrando recursos
- [ ] Notificações toast de game events

### Produção:
- [ ] Teste 1: Contact Created ✅
- [ ] Teste 2: Target Discovered ✅
- [ ] Teste 3: Pain Points Mapped ✅
- [ ] Teste 4: Lead Promotion ✅
- [ ] Game state persistido no banco ✅

---

## 🚀 PRÓXIMOS PASSOS

Após validar que o backend está funcionando:

1. **Week 2 - Frontend Foundation:**
   - Instalar Phaser.js
   - Criar game scenes
   - Configurar Socket.IO client
   - Mostrar notificações de eventos
   - HUD com recursos (coins, XP, gems)

2. **Week 2 - Deliverable:**
   - MVP jogável
   - CRM → Game loop completo
   - Visual feedback de eventos

---

**Criado em:** 2025-01-11
**Status:** Backend ✅ | Frontend ⏳ (Week 2)
