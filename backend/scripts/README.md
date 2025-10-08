# Scripts de Migração e Seed - CRM Pipelines

Scripts para configurar o sistema de pipelines no CRM.

## 📋 Pré-requisitos

- Node.js instalado
- Prisma configurado
- Banco de dados acessível

## 🚀 Como Executar

### 1️⃣ Migração do Schema (Pipeline + Stages)

Este script cria o pipeline padrão com 8 etapas e migra deals existentes.

```bash
cd backend
node scripts/migrate-pipelines.js
```

**O que faz:**
- ✅ Cria pipeline "Pipeline Padrão"
- ✅ Cria 8 etapas (stages):
  - Novo Lead
  - Contato Realizado
  - Qualificado
  - Proposta Enviada
  - Em Negociação
  - Ganho
  - Perdido
  - Em Espera
- ✅ Migra deals existentes que usavam enum `stage` para o novo sistema
- ✅ Verifica se já existem pipelines antes de criar

**Output esperado:**
```
🚀 Iniciando migração de pipelines...

📝 Criando pipeline padrão...

✅ Pipeline padrão criado com sucesso!
   ID: pipeline-default
   Etapas: 8

🎉 Migração concluída!
```

---

### 2️⃣ Criar Deals de Teste

Este script cria 23 deals de teste distribuídos pelas etapas.

```bash
cd backend
node scripts/seed-test-deals.js
```

**O que faz:**
- ✅ Cria 1 empresa teste (ACME Corp)
- ✅ Cria 1 contato teste (João Silva)
- ✅ Cria 23 deals distribuídos:
  - **3 deals** em "Novo Lead" (20-25% prob)
  - **5 deals** em "Contato Realizado" (25-40% prob)
  - **4 deals** em "Qualificado" (45-60% prob)
  - **3 deals** em "Proposta Enviada" (60-70% prob)
  - **2 deals** em "Em Negociação" (75-80% prob)
  - **2 deals** em "Ganho" (100% prob)
  - **1 deal** em "Perdido" (0% prob)

**Valores:**
- Pipeline Total: R$ 2.208.000
- Pipeline Ponderado: R$ ~1.100.000
- Ganho: R$ 93.000

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
   ... (23 deals no total)

✅ 23 deals criados com sucesso!

📊 Distribuição por etapa:
   Novo Lead: 3 deals (R$ 250.000)
   Contato Realizado: 5 deals (R$ 478.000)
   ...

💰 Valores:
   Pipeline Total: R$ 2.208.000
   Pipeline Ponderado: R$ 1.096.750
   Ganho: R$ 93.000

🎉 Seed concluído!
```

---

## 🔄 Ordem de Execução

**Execute nesta ordem:**

1. **Primeiro:** `migrate-pipelines.js` → Cria a estrutura
2. **Depois:** `seed-test-deals.js` → Popula com dados

---

## 🐳 Executar via Docker (se estiver usando)

Se o backend está em container Docker:

```bash
# Entrar no container
docker exec -it roi-backend sh

# Executar scripts
cd /app
node scripts/migrate-pipelines.js
node scripts/seed-test-deals.js

# Sair
exit
```

---

## 🌐 Executar em Produção (Easypanel)

1. Acesse o terminal do serviço backend no Easypanel
2. Execute os comandos:

```bash
node scripts/migrate-pipelines.js
node scripts/seed-test-deals.js
```

---

## 📊 Após Executar

Acesse a aplicação e veja:

### `/dashboard/crm`
- 23 deals organizados no Kanban
- Distribuídos pelas 8 etapas

### `/dashboard/crm-analytics`
- **Pipeline Total:** R$ 2.208.000
- **Pipeline Ponderado:** R$ 1.096.750
- **Taxa de Vitória:** 66.7% (2 ganhos / 3 fechados)
- **Ticket Médio:** R$ 96.000

**Taxa de Conversão por Etapa:**
- Novo Lead → Contato: ~62%
- Contato → Qualificado: ~44%
- Qualificado → Proposta: ~43%
- Proposta → Negociação: ~40%
- Negociação → Ganho: ~50%

---

## ⚠️ Notas Importantes

1. **Idempotência:** `migrate-pipelines.js` verifica se já existe pipeline antes de criar
2. **Segurança:** `seed-test-deals.js` cria IDs únicos baseados em timestamp
3. **Limpeza:** Os deals de teste têm títulos identificáveis (começam com nomes de empresas fictícias)
4. **IDs:** Todos os IDs criados seguem o padrão:
   - Pipelines: `pipeline-default`
   - Stages: `stage-new`, `stage-contacted`, etc
   - Deals: `deal-test-{timestamp}-{index}`
   - Company: `company-test-{timestamp}`
   - Contact: `contact-test-{timestamp}`

---

## 🧹 Limpar Dados de Teste (Opcional)

Se quiser remover os dados de teste depois:

```javascript
// No Prisma Studio ou via script
await prisma.deal.deleteMany({
  where: { id: { startsWith: 'deal-test-' } }
});

await prisma.company.deleteMany({
  where: { id: { startsWith: 'company-test-' } }
});

await prisma.contact.deleteMany({
  where: { id: { startsWith: 'contact-test-' } }
});
```

---

## 🆘 Troubleshooting

### Erro: "Pipeline padrão não encontrado"
**Solução:** Execute primeiro `migrate-pipelines.js`

### Erro: "Cannot find module '@prisma/client'"
**Solução:** Execute `npm install` e `npx prisma generate`

### Erro: "Database connection failed"
**Solução:** Verifique se o `.env` está configurado corretamente

### Erro: "Unique constraint failed"
**Solução:** Os dados já existem. Use IDs diferentes ou remova os existentes.

---

## 📝 Logs

Ambos os scripts possuem logs detalhados com emojis para fácil identificação:

- 🚀 Início
- ✅ Sucesso
- ❌ Erro
- ⚠️ Aviso
- 📝 Criação
- 🔄 Migração
- 📊 Estatísticas
- 🎉 Conclusão
- 💰 Valores

---

**Criado por:** Claude Code
**Data:** 2025-10-08
**Versão:** 1.0.0
