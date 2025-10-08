# 🚀 Como Executar a Migração em Produção

## ✅ Checklist Antes de Começar

- [ ] Backend rodando em produção (Easypanel)
- [ ] Banco de dados MySQL acessível
- [ ] Backup do banco (recomendado)
- [ ] Código atualizado no servidor (git pull)

---

## 📝 Passo a Passo

### 1️⃣ Fazer Deploy do Código Atualizado

No Easypanel:
1. Acesse seu projeto `roi-zenith`
2. Vá em **Backend Service**
3. Clique em **Rebuild** ou aguarde o auto-deploy do GitHub

Ou via Git (se tiver acesso SSH):
```bash
cd /caminho/para/roi-zenith
git pull origin main
cd backend
npm install
npx prisma generate
npm run build
pm2 restart all  # ou reinicie seu processo
```

---

### 2️⃣ Acessar Terminal do Backend

**Opção A: Via Easypanel**
1. Acesse o serviço do backend
2. Clique na aba **Terminal** ou **Shell**
3. Execute os comandos abaixo

**Opção B: Via SSH (se disponível)**
```bash
ssh seu-usuario@seu-servidor
cd /app  # ou caminho do backend
```

---

### 3️⃣ Executar Migração

```bash
# Gerar Prisma Client (se não foi feito no build)
npx prisma generate

# Executar migração
node scripts/migrate-pipelines.js
```

**Output esperado:**
```
🚀 Iniciando migração de pipelines...

📝 Criando pipeline padrão...

✅ Pipeline padrão criado com sucesso!
   ID: pipeline-default
   Etapas: 8

🔄 Migrando deals existentes para o pipeline padrão...

   ✓ Deal "Negócio X" migrado para "stage-new"
   ✓ Deal "Negócio Y" migrado para "stage-contacted"
   ... (todos os deals existentes)

✅ N deals migrados com sucesso!

🎉 Migração concluída!

📋 Resumo:
   - Pipeline padrão criado: Pipeline Padrão
   - Etapas criadas: 8
   - Deals migrados: N

✨ Script finalizado com sucesso!
```

---

### 4️⃣ Criar Deals de Teste (Opcional)

⚠️ **ATENÇÃO:** Só execute se quiser dados de teste para validar a funcionalidade!

```bash
node scripts/seed-test-deals.js
```

**Output esperado:**
```
🌱 Iniciando seed de deals de teste...

✅ Pipeline encontrado: Pipeline Padrão
   Etapas: 8

✅ Empresa criada: Empresa Teste ACME Corp
✅ Contato criado: João Silva

📝 Criando deals de teste...

   ✓ Venda de Licenças SaaS - Startup X → Novo Lead (20%)
   ✓ Implementação ERP - Indústria Y → Novo Lead (15%)
   ✓ CRM Customizado - Fintech A → Contato Realizado (35%)
   ... (23 deals no total)

✅ 23 deals criados com sucesso!

📊 Distribuição por etapa:
   Novo Lead: 3 deals (R$ 250.000)
   Contato Realizado: 5 deals (R$ 478.000)
   Qualificado: 4 deals (R$ 368.000)
   Proposta Enviada: 3 deals (R$ 305.000)
   Em Negociação: 2 deals (R$ 670.000)
   Ganho: 2 deals (R$ 93.000)
   Perdido: 1 deal (R$ 180.000)

💰 Valores:
   Pipeline Total: R$ 2.208.000
   Pipeline Ponderado: R$ 1.096.750
   Ganho: R$ 93.000

🎉 Seed concluído!
```

---

### 5️⃣ Reiniciar Backend

```bash
# Se estiver usando PM2
pm2 restart all

# Ou no Easypanel
# Clique em "Restart" no serviço backend
```

---

## 🎯 Testar as Funcionalidades

### 1. Testar CRM Kanban
Acesse: `https://roilabs.com.br/dashboard/crm`

**Deve mostrar:**
- Pipeline "Pipeline Padrão" no seletor
- 8 colunas de etapas
- Deals distribuídos (se criou os de teste)
- Drag & drop funcionando

---

### 2. Testar CRM Analytics
Acesse: `https://roilabs.com.br/dashboard/crm-analytics`

**Deve mostrar:**

**Métricas Principais:**
- 💰 Pipeline Total: R$ 2.208.000
- 🎯 Pipeline Ponderado: R$ 1.096.750
- 📈 Taxa de Vitória: 66.7%
- 💵 Ticket Médio: R$ 96.000

**Taxa de Conversão por Etapa:**
```
Novo Lead → Contato Realizado          62.5%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3 deals • R$ 250.000

Contato Realizado → Qualificado        44.4%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5 deals • R$ 478.000

... (continua para todas as etapas)
```

**Distribuição por Etapa:**
- Barras coloridas mostrando % de deals
- Valores por etapa

---

## ❌ Se Algo Der Errado

### Erro: "Pipeline padrão não encontrado"
```bash
# Execute novamente a migração
node scripts/migrate-pipelines.js
```

### Erro: "Cannot find module '@prisma/client'"
```bash
cd backend
npm install
npx prisma generate
```

### Erro: "P2002: Unique constraint failed"
**Causa:** Pipeline ou stages já existem

**Solução 1 - Verificar:**
```bash
npx prisma studio
# Abra a tabela "pipelines" e veja se já existe
```

**Solução 2 - Limpar e recriar (CUIDADO!):**
```bash
# ⚠️ Isto deletará TODOS os pipelines!
npx prisma studio
# Delete manualmente na interface
```

### Erro: "Database connection failed"
**Causa:** Backend não consegue conectar ao banco

**Verificar:**
1. Variável `DATABASE_URL` no `.env` está correta?
2. Banco está rodando?
3. Firewall liberado?

---

## 🧹 Remover Dados de Teste (Depois)

Se você criou os deals de teste e quer removê-los:

```bash
# Execute este código no Prisma Studio ou crie um script
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanup() {
  await prisma.deal.deleteMany({
    where: { id: { startsWith: 'deal-test-' } }
  });
  await prisma.company.deleteMany({
    where: { id: { startsWith: 'company-test-' } }
  });
  await prisma.contact.deleteMany({
    where: { id: { startsWith: 'contact-test-' } }
  });
  console.log('✅ Dados de teste removidos!');
  await prisma.\$disconnect();
}

cleanup();
"
```

---

## 📊 Estatísticas dos Dados de Teste

Se você executou o seed, terá:

| Etapa | Deals | Valor Total | Probabilidade Média |
|-------|-------|-------------|---------------------|
| Novo Lead | 3 | R$ 250.000 | 20% |
| Contato Realizado | 5 | R$ 478.000 | 32% |
| Qualificado | 4 | R$ 368.000 | 52.5% |
| Proposta Enviada | 3 | R$ 305.000 | 65% |
| Em Negociação | 2 | R$ 670.000 | 77.5% |
| Ganho | 2 | R$ 93.000 | 100% |
| Perdido | 1 | R$ 180.000 | 0% |
| **TOTAL** | **23** | **R$ 2.208.000** | **49.7%** |

**Taxa de Conversão Esperada:**
- Novo Lead → Contato: 62.5% (5 de 8 avançam)
- Contato → Qualificado: 44.4% (4 de 9 avançam)
- Qualificado → Proposta: 42.9% (3 de 7 avançam)
- Proposta → Negociação: 40% (2 de 5 avançam)
- Negociação → Ganho: 50% (2 de 4 avançam)

**Win Rate:** 66.7% (2 ganhos / 3 fechados)

---

## 🎉 Pronto!

Após seguir todos os passos:

✅ Pipeline criado
✅ Etapas configuradas
✅ Deals migrados (se já existiam)
✅ Dados de teste (opcional)
✅ CRM Analytics funcionando

**Acesse:**
- 🎯 CRM Kanban: `/dashboard/crm`
- 📊 CRM Analytics: `/dashboard/crm-analytics`

---

**Dúvidas?** Veja `backend/scripts/README.md` para detalhes técnicos.
