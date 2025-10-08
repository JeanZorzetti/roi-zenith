# Guia de Migração - Sistema de Pipelines Personalizáveis

## 📋 Resumo

Esta migração adiciona o sistema de pipelines personalizáveis ao CRM, permitindo criar múltiplos pipelines com etapas customizáveis.

## 🎯 O que será alterado

### Novas Tabelas:
- `pipelines` - Armazena os pipelines customizados
- `pipeline_stages` - Armazena as etapas de cada pipeline

### Tabela Modificada:
- `deals` - Adiciona colunas `pipeline_id` e `stage_id` para vincular deals às novas tabelas

### Migração de Dados:
- Um pipeline padrão será criado automaticamente
- Todos os deals existentes serão migrados para o pipeline padrão
- As etapas antigas (enum) são mapeadas para as novas etapas
- A coluna `stage` antiga é mantida por compatibilidade (pode ser removida depois)

## 🚀 Como Executar a Migração

### Opção 1: Via Easypanel (Recomendado)

1. Acesse o Easypanel: https://easypanel.io
2. Entre no serviço do banco de dados `dados_roi-zenith-db`
3. Abra o terminal/console MySQL
4. Execute o conteúdo do arquivo `backend/migration_add_pipelines.sql`

### Opção 2: Via linha de comando (se tiver acesso SSH)

```bash
# Conectar ao banco
mysql -h dados_roi-zenith-db -u roi_user -p roi_zenith

# Executar o arquivo SQL
source /path/to/migration_add_pipelines.sql
```

### Opção 3: Via ferramenta MySQL (phpMyAdmin, MySQL Workbench, etc)

1. Conecte ao banco: `dados_roi-zenith-db:3306`
2. Selecione o database: `roi_zenith`
3. Execute o SQL do arquivo `backend/migration_add_pipelines.sql`

## ✅ Verificação Pós-Migração

Execute estas queries para verificar se tudo funcionou:

```sql
-- Verificar se as tabelas foram criadas
SHOW TABLES LIKE '%pipeline%';

-- Verificar pipeline padrão
SELECT * FROM pipelines;

-- Verificar etapas padrão
SELECT * FROM pipeline_stages ORDER BY position;

-- Verificar se todos os deals foram migrados
SELECT
  COUNT(*) as total,
  COUNT(pipeline_id) as with_pipeline,
  COUNT(stage_id) as with_stage
FROM deals;

-- Verificar distribuição de deals por etapa
SELECT
  ps.title as stage,
  COUNT(d.id) as deal_count
FROM pipeline_stages ps
LEFT JOIN deals d ON d.stage_id = ps.id
GROUP BY ps.id, ps.title
ORDER BY ps.position;
```

## 🎨 Estrutura do Pipeline Padrão

O pipeline padrão criado contém 8 etapas:

1. **Novo Lead** (`stage-new`) - #6366f1
2. **Contato Realizado** (`stage-contacted`) - #8b5cf6
3. **Qualificado** (`stage-qualified`) - #ec4899
4. **Proposta Enviada** (`stage-proposal`) - #f59e0b
5. **Em Negociação** (`stage-negotiation`) - #eab308
6. **Ganho** (`stage-closed-won`) - #10b981
7. **Perdido** (`stage-closed-lost`) - #ef4444
8. **Em Espera** (`stage-on-hold`) - #6b7280

## 🔄 Rollback (em caso de problemas)

Se algo der errado, você pode reverter executando:

```sql
-- Remover constraints
ALTER TABLE deals
  DROP FOREIGN KEY deals_pipeline_id_fkey,
  DROP FOREIGN KEY deals_stage_id_fkey;

-- Remover colunas
ALTER TABLE deals
  DROP COLUMN pipeline_id,
  DROP COLUMN stage_id;

-- Remover tabelas
DROP TABLE pipeline_stages;
DROP TABLE pipelines;
```

**ATENÇÃO:** O rollback só funciona se você ainda NÃO removeu a coluna `stage` antiga!

## 📝 Próximos Passos

Após a migração bem-sucedida:

1. ✅ Reiniciar o backend para carregar o novo código
2. ✅ Testar a criação de novos pipelines no frontend
3. ✅ Verificar se os deals existentes aparecem corretamente
4. ✅ Testar drag & drop entre etapas
5. ⚠️ (Opcional) Após 1-2 semanas de testes, remover a coluna `stage` antiga:
   ```sql
   ALTER TABLE deals DROP COLUMN stage;
   ```

## 🎉 Funcionalidades Disponíveis

Após a migração, você poderá:

- ✨ Criar pipelines customizadas ilimitadas
- 🎨 Definir cores para cada pipeline e etapa
- 📊 Adicionar/remover/reordenar etapas
- 🔄 Trocar entre pipelines no CRM
- 🎯 Vincular deals a pipelines específicas
- 🖱️ Drag & drop de deals entre etapas

## 📞 Suporte

Se encontrar problemas durante a migração:
1. Verifique os logs do backend
2. Confira se todas as queries foram executadas
3. Execute as queries de verificação acima
4. Entre em contato com suporte técnico

---

**Data de Criação:** 2025-10-08
**Commits Relacionados:**
- Backend: `9a9f24b` - Backend pipeline system
- Frontend: `5b751f8` - Frontend pipeline implementation
