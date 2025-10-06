# 🎨 Progresso da Refatoração de Temas - TasksPage

## 📊 Status Geral: 12% Completo

**Arquivo:** `frontend/src/pages/Dashboard/TasksPage.tsx` (5000+ linhas)

---

## ✅ Áreas Completas

### 1. Loading Skeleton (Linhas 3337-3402)
**Commit:** feaf6ac - Parcial 1/10

Refatorado para usar:
- `currentTheme.colors.background` - Background principal
- `currentTheme.colors.cardBg` - Skeleton cards
- `currentTheme.colors.cardBgHover` - Shimmer animation
- Gradiente dinâmico baseado no tema

**Teste:** ✅ Funcionando - skeleton muda cor com o tema

---

### 2. Offline Mode Banner (Linhas 3458-3489)
**Commit:** feaf6ac - Parcial 1/10

Refatorado para usar:
- `currentTheme.colors.warningBg` - Background
- `currentTheme.colors.warningBorder` - Border
- `currentTheme.colors.warning` - Icon e título
- `currentTheme.colors.textSecondary` - Texto descritivo

**Teste:** ✅ Funcionando - banner responde ao tema

---

### 3. Error Banner (Linhas 3491-3555)
**Commit:** feaf6ac - Parcial 1/10

Refatorado para usar:
- `currentTheme.colors.errorBg` - Background
- `currentTheme.colors.errorBorder` - Border
- `currentTheme.colors.error` - Icon, título e botão
- `currentTheme.colors.textSecondary` - Mensagem
- Hover states dinâmicos via `onMouseEnter`/`onMouseLeave`

**Teste:** ✅ Funcionando - erro responde ao tema

---

### 4. Header e Título (Linhas 3695-3731)
**Commit:** 98d899f - Parcial 2/10

Refatorado para usar:
- Gradiente dinâmico: `text` → `textSecondary` → `primary`
- `currentTheme.colors.primary` - Badge "Acesso Compartilhado"
- `currentTheme.colors.textSecondary` - Subtítulo
- Gradient aplicado com `WebkitBackgroundClip: 'text'`

**Teste:** ✅ Funcionando - título com gradient temático

---

### 5. Board Selector Button (Linhas 3733-3764)
**Commit:** 98d899f - Parcial 2/10

Refatorado para usar:
- `currentTheme.colors.cardBg` - Background
- `currentTheme.colors.cardBgHover` - Hover state
- `currentTheme.colors.border` - Border
- `currentTheme.colors.text` - Título do board
- `currentTheme.colors.textMuted` - Metadata (colunas count)

**Teste:** ✅ Funcionando - botão responde ao tema

---

### 6. Board Selector Dropdown Header (Linhas 3766-3788)
**Commit:** 98d899f - Parcial 2/10

Refatorado para usar:
- `currentTheme.colors.backgroundSecondary` - Background
- `currentTheme.colors.border` - Border
- `currentTheme.colors.divider` - Separador
- `currentTheme.colors.text` - Título "Seus Quadros"

**Teste:** ⚠️ Parcial - header ok, items ainda hardcoded

---

## 🔄 Áreas Pendentes (88% restante)

### Prioridade Alta (Muito Visíveis)

#### 7. Board Selector Dropdown Items (Linhas ~3789-3850)
**Padrão atual:** `bg-gray-800/30`, `text-white`, `border-gray-700/20`
**Refatorar para:**
```tsx
style={{
  backgroundColor: board.id === currentBoardId
    ? currentTheme.colors.cardBgHover
    : 'transparent',
  borderBottomColor: currentTheme.colors.divider
}}
onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = currentTheme.colors.cardBgHover;
}}
```

#### 8. Toolbar - Botões Nova Coluna/Tarefa (Linhas ~3900-4000)
**Elementos:** Botões "Nova Coluna", "Nova Tarefa", ThemeSelector
**Padrão atual:** `bg-purple-600`, `hover:bg-purple-700`, `text-white`
**Refatorar para:**
```tsx
style={{
  backgroundColor: currentTheme.colors.primary,
  color: currentTheme.colors.buttonPrimaryText
}}
```

#### 9. Search Bar e Filtros (Linhas ~4000-4100)
**Elementos:** Input de busca, filtros de prioridade, filtros de tags
**Padrão atual:** `bg-gray-800/50`, `border-gray-700/50`, `text-gray-300`
**Refatorar para:**
```tsx
style={{
  backgroundColor: currentTheme.colors.inputBg,
  borderColor: currentTheme.colors.inputBorder,
  color: currentTheme.colors.text
}}
```

#### 10. View Selector (Kanban/Lista/Compacto) (Linhas ~4100-4200)
**Elementos:** Botões de view, indicador de view ativa
**Padrão atual:** `bg-gray-700`, `text-purple-400`, `border-purple-500`
**Refatorar para:**
```tsx
style={{
  backgroundColor: isActive
    ? currentTheme.colors.primary
    : currentTheme.colors.cardBg,
  color: isActive
    ? currentTheme.colors.buttonPrimaryText
    : currentTheme.colors.textSecondary
}}
```

#### 11. Metrics Cards (Total/Hoje/Semana/Velocity) (Linhas ~4200-4400)
**Elementos:** 4 cards de métricas com ícones
**Padrão atual:** `bg-gray-800/50`, `text-gray-400`, `text-white`
**Refatorar para:**
```tsx
style={{
  backgroundColor: currentTheme.colors.cardBg,
  borderColor: currentTheme.colors.border
}}
```

### Prioridade Crítica (Core UI)

#### 12. Colunas Kanban (Linhas ~4400-4800)
**Elementos:** Headers de coluna, backgrounds, WIP limit, drag zones
**Padrão atual:** Muitas cores hardcoded por coluna
**Refatorar para:**
```tsx
style={{
  backgroundColor: currentTheme.colors.cardBg,
  borderColor: currentTheme.colors.border
}}
```
**Atenção:** Manter as cores das colunas (purple, blue, yellow, green) como accent sobreposto

#### 13. Task Cards (Linhas ~4800-5200)
**Elementos:** Card background, título, descrição, badges, assignee
**Padrão atual:** `bg-gray-800/30`, `hover:bg-gray-700/40`, `text-white`
**Refatorar para:**
```tsx
<ThemedCard variant={isDragging ? 'hover' : 'default'}>
  {/* Usar currentTheme.colors.* para todos os elementos */}
</ThemedCard>
```

#### 14. Priority Badges (Usado em cards)
**Padrão atual:** `bg-red-500/20`, `text-red-400`, `bg-yellow-500/20`
**Refatorar para:**
```tsx
<ThemedBadge variant={`priority-${task.priority}`}>
  {priorityLabel}
</ThemedBadge>
```

#### 15. Subcolunas (Linhas ~4600-4900)
**Elementos:** Subcoluna headers, backgrounds, dividers
**Padrão atual:** `bg-gray-900/50`, `border-gray-700/30`
**Refatorar para:**
```tsx
style={{
  backgroundColor: currentTheme.colors.backgroundTertiary,
  borderColor: currentTheme.colors.divider
}}
```

### Prioridade Média (Modais)

#### 16. CreateTaskModal (Component separado)
**Arquivo:** Provavelmente inline no TasksPage
**Refatorar:** Inputs, labels, botões

#### 17. EditTaskModal (Component separado)
**Refatorar:** Mesmos elementos do CreateTaskModal

#### 18. CreateColumnModal
**Refatorar:** Color picker, inputs

#### 19. ShareBoardModal
**Refatorar:** Links, botões de copiar

#### 20. InviteMemberModal
**Refatorar:** Input de email, badges de permissões

### Prioridade Baixa (Edge Cases)

#### 21. Empty States (4 tipos)
**Localização:** Diferentes seções vazias
**Padrão atual:** `text-gray-400`, `bg-gray-800/20`
**Refatorar para:**
```tsx
style={{
  color: currentTheme.colors.textMuted,
  backgroundColor: `${currentTheme.colors.cardBg}40`
}}
```

#### 22. Context Menus (Click direito em tasks)
**Refatorar:** Background, items, hover states

#### 23. Tooltips
**Refatorar:** Background e texto

#### 24. Drag Overlays
**Padrão atual:** `bg-purple-500/20`, `border-purple-500`
**Refatorar para:**
```tsx
style={{
  backgroundColor: `${currentTheme.colors.primary}33`,
  borderColor: currentTheme.colors.primary
}}
```

---

## 🛠️ Estratégia de Refatoração

### Opção A: Continuar Manual (Atual)
- ✅ Controle total
- ✅ Qualidade garantida
- ❌ Muito lento (4-6h restantes)
- ❌ Alto risco de erro humano

### Opção B: Buscar e Substituir com Regex
```bash
# Exemplo:
sed -i 's/bg-gray-800\/50/style={{backgroundColor: currentTheme.colors.cardBg}}/g'
```
- ✅ Rápido
- ❌ Pode quebrar código
- ❌ Não funciona para casos complexos

### Opção C: Usar Componentes Temáveis (Recomendado)
- ✅ Já criados: `ThemedCard`, `ThemedButton`, `ThemedBadge`
- ✅ Código mais limpo
- ✅ Manutenção mais fácil
- ⚠️ Requer refatorar estrutura dos componentes

---

## 📝 Checklist de Teste

Quando tudo estiver refatorado, testar:

- [ ] Trocar entre os 8 temas rapidamente
- [ ] Verificar contraste de texto em todos os temas
- [ ] Verificar hover states em cards/buttons
- [ ] Verificar modais abertos
- [ ] Verificar drag and drop de tasks
- [ ] Verificar empty states
- [ ] Verificar error/warning banners
- [ ] Verificar metrics cards
- [ ] Verificar prioridade badges (low/medium/high/urgent)
- [ ] Verificar board selector dropdown
- [ ] Verificar search e filtros

---

## 🎯 Próximos Passos Recomendados

### Opção 1: Continuar Refatoração Manual
Continue commitando a cada 2-3 áreas refatoradas (commits de 300-500 linhas)

### Opção 2: Refatorar Apenas Elementos Mais Visíveis
Focar em: Colunas Kanban + Task Cards + Priority Badges (60% do impacto visual)

### Opção 3: Criar Script de Migração
Escrever script Node.js que automatiza substituições comuns

### Opção 4: Usar AI Assistant para Acelerar
Usar Claude/GPT para gerar blocos de refatoração e revisar manualmente

---

**Última atualização:** Commit 98d899f (Parcial 2/10)
**Progresso:** 12% (6 de ~50 áreas)
**Tempo estimado restante:** 3-5 horas (continuar manual) ou 1-2 horas (usar componentes temáveis)
