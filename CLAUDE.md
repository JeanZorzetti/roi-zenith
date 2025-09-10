# Claude Code - Task Organizer Integration

Este arquivo contém comandos e configurações para integrar o Claude Code com o organizador de tarefas Kanban.

## Configuração

- **Organizador URL**: `http://localhost:3000/dashboard/tasks`
- **Storage Path**: `C:\Users\jeanz\Downloads\roi-zenith-main\frontend\public\tasks-data.json`
- **API Port**: `5555`

## Comandos Disponíveis

### Gerenciamento de Quadros

```bash
# Listar quadros
claude tasks list-boards

# Criar novo quadro
claude tasks create-board "Nome do Quadro" "Descrição opcional" --color "bg-blue-500"

# Editar quadro
claude tasks edit-board [board-id] --title "Novo Título" --description "Nova descrição"

# Excluir quadro
claude tasks delete-board [board-id]

# Duplicar quadro
claude tasks duplicate-board [board-id] "Novo Nome"
```

### Gerenciamento de Colunas

```bash
# Listar colunas do quadro
claude tasks list-columns [board-id]

# Criar coluna
claude tasks create-column [board-id] "Nome da Coluna" --color "bg-gray-500"

# Editar coluna
claude tasks edit-column [board-id] [column-id] --title "Novo Título"

# Excluir coluna
claude tasks delete-column [board-id] [column-id]
```

### Gerenciamento de Tarefas

```bash
# Listar tarefas de uma coluna
claude tasks list-tasks [board-id] [column-id]

# Criar tarefa
claude tasks create-task [board-id] [column-id] "Título da Tarefa" --description "Descrição" --priority "high" --assignee "Nome" --due-date "2024-12-31" --tags "tag1,tag2"

# Editar tarefa
claude tasks edit-task [board-id] [task-id] --title "Novo Título" --priority "medium"

# Mover tarefa
claude tasks move-task [board-id] [task-id] [target-column-id]

# Excluir tarefa
claude tasks delete-task [board-id] [task-id]

# Marcar tarefa como concluída
claude tasks complete-task [board-id] [task-id]
```

### Gerenciamento de Checklists

```bash
# Adicionar item ao checklist
claude tasks add-checklist-item [board-id] [task-id] "Item do checklist"

# Marcar item como concluído
claude tasks toggle-checklist-item [board-id] [task-id] [item-id]

# Remover item do checklist
claude tasks remove-checklist-item [board-id] [task-id] [item-id]
```

## Status da Integração

- ✅ Organizador de Tarefas criado
- 🔄 API de integração em desenvolvimento
- ⏳ Comandos Claude em desenvolvimento
- ⏳ Sincronização cross-project em desenvolvimento

## Exemplo de Uso

Quando o Claude Code estiver trabalhando em qualquer projeto, poderá usar comandos como:

```bash
# Criar um novo quadro para o projeto atual
claude tasks create-board "Projeto ROI Zenith" "Tasks do desenvolvimento do ROI Labs"

# Adicionar tarefas baseadas no trabalho atual
claude tasks create-task [board-id] "todo" "Implementar autenticação OAuth" --priority "high" --assignee "Claude"

# Criar checklist para uma tarefa complexa
claude tasks add-checklist-item [board-id] [task-id] "Configurar Google OAuth"
claude tasks add-checklist-item [board-id] [task-id] "Implementar middleware de auth"
claude tasks add-checklist-item [board-id] [task-id] "Testar fluxo de login"
```

## Arquitetura da Integração

```
Claude Code (qualquer projeto)
    ↓ (comandos via CLAUDE.md)
API Local (porta 5555)
    ↓ (manipula localStorage)
Organizador de Tarefas (localhost:3000)
    ↓ (persiste em)
tasks-data.json
```

## Próximos Passos

1. Implementar API local para manipular o localStorage
2. Criar comandos Claude Code para gerenciar tarefas
3. Testar sincronização cross-project
4. Adicionar comandos automáticos baseados no contexto do projeto