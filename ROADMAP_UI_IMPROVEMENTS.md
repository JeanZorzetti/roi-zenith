# 🎨 ROADMAP: UI/UX Improvements - Visual Clean & Uniformidade

**Objetivo:** Transformar a interface em um design minimalista, uniforme e profissional, com foco em redução de poluição visual e consistência de espaçamento.

**Palavras-chave:** Padrão, Visual Clean, Uniformidade, Espaçamento, Minimalismo

---

## 📋 Sprint 1: Sidebar & TopBar Collapsible (4-6h) ✅ COMPLETO

### ✅ Objetivos:
- ✅ Interface imersiva com mais espaço para conteúdo
- ✅ Sidebar e TopBar ocultáveis com botão hamburger
- ✅ Animações suaves de transição (500ms)
- ✅ Estado persistido no localStorage

### 🎯 Tasks:

#### 1.1 - Criar Sistema de Toggle para Sidebar ✅ COMPLETO
- [x] ✅ Adicionar estado `sidebarCollapsed` no contexto global ou localStorage
- [x] ✅ Criar botão hamburger (☰) fixo com posição dinâmica
- [x] ✅ Implementar animação de slide-in/slide-out (500ms ease-in-out)
- [x] ✅ Ajustar largura da sidebar: `280px` (aberta) → `0px` (fechada)
- [x] ✅ Adicionar overlay escuro quando sidebar aberta em mobile
- [x] ✅ Sidebar aberta por padrão em desktop (>1024px), fechada em mobile

**Arquivos:**
- `frontend/src/layouts/DashboardLayout.tsx` ✅ CONECTADO
- `frontend/src/contexts/UIContext.tsx` ✅ CRIADO

#### 1.2 - Criar Sistema de Toggle para TopBar ✅ COMPLETO
- [x] ✅ Adicionar estado `topbarCollapsed` (implementado como `topbarHidden`)
- [x] ✅ Implementar auto-hide ao fazer scroll down
- [x] ✅ Mostrar ao fazer scroll up ou ao chegar no topo (scrollY === 0)
- [x] ✅ Altura da topbar: `64px` (visível) → `0px` (oculta)
- [x] ✅ Transição suave com overflow hidden

**Arquivos:**
- `frontend/src/layouts/DashboardLayout.tsx` ✅ APLICADO
- `frontend/src/contexts/UIContext.tsx` ✅ COM AUTO-HIDE SCROLL

#### 1.3 - Botão Hamburger Global ✅ COMPLETO
- [x] ✅ Posição dinâmica: `left: 1rem` (collapsed) | `left: calc(280px + 1rem)` (expanded)
- [x] ✅ Z-index 70 (DesignTokens.zIndex.hamburger) - mais alto que tudo
- [x] ✅ Ícone animado: ☰ → ✕ com rotação e fade
- [x] ✅ Tamanho: 44x44px (área de toque confortável)
- [x] ✅ Background semi-transparente com blur + hover effects
- [x] ✅ Transição de posição sincronizada com sidebar (500ms)

**Componente:** `frontend/src/components/HamburgerButton.tsx` ✅ CRIADO

**Implementação Final:**
```tsx
// Posição dinâmica baseada no estado da sidebar
const leftPosition = sidebarCollapsed || isMobile ? '1rem' : 'calc(280px + 1rem)';

<button
  style={{
    left: leftPosition,
    transition: `all ${DesignTokens.transition.slow}`, // 500ms
  }}
>
  {/* Ícones animados com fade e rotate */}
</button>
```

---

## 📐 Sprint 2: Uniformização de Colunas e Subcolunas (3-4h) ✅ COMPLETO

### ✅ Objetivos:
- ✅ Títulos de colunas e subcolunas com altura fixa
- ✅ Espaçamento consistente
- ✅ Visual limpo sem elementos desnecessários

### 🎯 Tasks:

#### 2.1 - Padronizar Headers de Colunas ✅ COMPLETO
- [x] ✅ Altura fixa: `56px` para todos os headers (DesignTokens.sizes.column.headerHeight)
- [x] ✅ Padding interno: `16px` horizontal + `8px` vertical
- [x] ✅ Font-size título: `16px` (lg, semibold)
- [x] ✅ Remover gradientes complexos → backgroundColor sólido
- [x] ✅ Badge de contagem: tamanho fixo `24x24px`, centralizado

**Antes:**
```tsx
className="p-3 rounded-xl" // altura variável
```

**Depois:**
```tsx
className="h-14 px-4 py-3 rounded-lg" // altura fixa 56px
```

#### 2.2 - Padronizar Headers de Subcolunas ✅ COMPLETO
- [x] ✅ Altura fixa: `48px` (DesignTokens.sizes.subcolumn.headerHeight)
- [x] ✅ Padding interno: `8px` horizontal
- [x] ✅ Font-size: `14px` (md, medium)
- [x] ✅ Ícone de expand/collapse: tamanho fixo `20px`
- [x] ✅ Alinhamento vertical perfeito de todos elementos
- [x] ✅ Removido gradientes → backgroundColor sólido

#### 2.3 - Sistema de Grid Consistente ✅ COMPLETO
- [x] ✅ Gap entre colunas: `16px` (DesignTokens.sizes.column.gap)
- [x] ✅ Gap entre subcolunas: `12px` (DesignTokens.sizes.subcolumn.gap)
- [x] ✅ Largura mínima de coluna: `320px` (DesignTokens.sizes.column.minWidth)
- [x] ✅ Largura máxima de coluna: `400px` (DesignTokens.sizes.column.maxWidth)
- [x] ✅ Transições uniformes: 300ms (DesignTokens.transition.normal)

**Arquivos:**
- `frontend/src/pages/Dashboard/TasksPage.tsx` ✅ APLICADO (linhas 4400-4800)

---

## 🃏 Sprint 3: Uniformização de Task Cards (4-5h) ✅ COMPLETO

### ✅ Objetivos:
- ✅ Todos os cards com mesma estrutura visual
- ✅ Altura mínima definida
- ✅ Espaçamento interno consistente
- ✅ Hierarquia visual clara

### 🎯 Tasks:

#### 3.1 - Estrutura Base dos Cards ✅ COMPLETO
- [x] ✅ Altura mínima: `120px` (DesignTokens.sizes.card.minHeight)
- [x] ✅ Padding fixo: `16px` (DesignTokens.sizes.card.padding)
- [x] ✅ Border radius: `12px` (DesignTokens.borderRadius.md)
- [x] ✅ Borda: `1px` sólida (thin), `2px` quando selecionado (medium)
- [x] ✅ Sombra sutil única: `shadow-sm` (hover: `shadow-md`)

**Padrão de Card:**
```tsx
<div className="min-h-[120px] p-4 rounded-xl border transition-all">
  {/* Header: 32px */}
  <div className="h-8 flex items-center justify-between mb-3">
    {/* Icons e actions */}
  </div>

  {/* Content: flex-grow */}
  <div className="flex-grow mb-3">
    {/* Title e description */}
  </div>

  {/* Footer: 24px */}
  <div className="h-6 flex items-center justify-between">
    {/* Metadata */}
  </div>
</div>
```

#### 3.2 - Hierarquia de Informações ✅ COMPLETO
- [x] ✅ **Linha 1 (32px):** Checkbox + Priority Icon + Actions (altura fixa)
- [x] ✅ **Linha 2 (auto):** Título (line-clamp-2, 14px semibold)
- [x] ✅ **Linha 3 (auto):** Descrição (line-clamp-1, 12px regular)
- [x] ✅ Espaçamento consistente: 8px entre elementos

#### 3.3 - Remover Variações Visuais Desnecessárias ✅ COMPLETO
- [x] ✅ **Removido:** Animações de pulse em cards antigos
- [x] ✅ **Removido:** Múltiplas variações de sombra no hover
- [x] ✅ **Removido:** Gradientes complexos de fundo (→ backgroundColor sólido)
- [x] ✅ **Removido:** hover:scale-[1.02]
- [x] ✅ **Simplificado:** Hover = borderColor change + shadow-md
- [x] ✅ **Simplificado:** Seleção = border accent (2px)

**Antes (poluído):**
```tsx
className="hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/20 animate-pulse"
```

**Depois (clean):**
```tsx
className="hover:border-primary-500 transition-colors"
```

#### 3.4 - Badges e Ícones Uniformes ✅ COMPLETO
- [x] ✅ Todos os ícones: `16px` (sm) ou `20px` (md) - apenas 2 tamanhos
- [x] ✅ Ícones pequenos (16px): checklist, copy, edit, delete
- [x] ✅ Ícones médios (20px): checkbox, completion, drag handle
- [x] ✅ Transições consistentes: fast (150ms) ou normal (300ms)

**Arquivos:**
- `frontend/src/pages/Dashboard/TasksPage.tsx` ✅ APLICADO (linhas 4800-5100)

---

## 🧹 Sprint 4: Redução de Poluição Visual (3-4h) ✅ COMPLETO

### ✅ Objetivos:
- ✅ Remover elementos redundantes
- ✅ Simplificar cores e sombras
- ✅ Criar hierarquia visual clara
- ✅ Aumentar whitespace

### 🎯 Tasks:

#### 4.1 - Simplificação de Cores ✅ COMPLETO
- [x] ✅ Palette reduzida: usando cores do currentTheme
- [x] ✅ Opacidades consistentes: active (1.0), muted (0.6), disabled (0.4)
- [x] ✅ Gradientes removidos: backgroundColor sólido em cards, headers
- [x] ✅ Background cards: cor única (currentTheme.colors.cardBg)
- [x] ✅ Bordas: border e borderHover apenas

**Sistema de Cores Simplificado:**
```typescript
const visualCleanColors = {
  // Backgrounds (3 níveis)
  bg1: theme.colors.background,           // Fundo principal
  bg2: theme.colors.backgroundSecondary,  // Cards
  bg3: theme.colors.backgroundTertiary,   // Inputs

  // Text (3 níveis)
  text1: theme.colors.text,           // Títulos
  text2: theme.colors.textSecondary,  // Corpo
  text3: theme.colors.textMuted,      // Labels

  // Accent (2 cores)
  accent: theme.colors.primary,
  accentHover: theme.colors.accent,
};
```

#### 4.2 - Simplificação de Sombras ✅ COMPLETO
- [x] ✅ Apenas 2 níveis de sombra:
  - `shadow-sm`: cards em repouso
  - `shadow-md`: cards em hover/foco
- [x] ✅ Sombras coloridas removidas: sem shadow-primary-500/20
- [x] ✅ Sombras neutras: usando DesignTokens.shadow

**Antes:**
```tsx
shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-accent/40
```

**Depois:**
```tsx
shadow-sm hover:shadow-md
```

#### 4.3 - Espaçamento Consistente (Sistema 8pt) ✅ COMPLETO
- [x] ✅ Todos os espaçamentos múltiplos de 8px (via DesignTokens.spacing)
- [x] ✅ Gap padrão: `8px` (sm) ou `16px` (md)
- [x] ✅ Padding de containers: `16px` (cards, headers)
- [x] ✅ Margin entre seções: aplicado com tokens

**Sistema de Espaçamento:**
```typescript
const spacing = {
  xs: '4px',   // Espaço mínimo (ícones internos)
  sm: '8px',   // Entre elementos pequenos
  md: '16px',  // Padrão (padding de cards)
  lg: '24px',  // Entre seções
  xl: '32px',  // Entre grandes blocos
  xxl: '48px', // Margens externas
};
```

#### 4.4 - Remover Elementos Redundantes ✅ COMPLETO
- [x] ✅ **Cards:** Removido hover:scale, animate-pulse, gradientes
- [x] ✅ **Headers:** Gradientes removidos, altura fixa aplicada
- [x] ✅ **Visual clean:** Foco em conteúdo, menos decoração

#### 4.5 - Tipografia Limpa ✅ COMPLETO
- [x] ✅ Apenas 3 tamanhos de fonte:
  - Títulos headers: `16px` (lg, semibold)
  - Corpo/títulos cards: `14px` (md, semibold/medium)
  - Labels/descrições: `12px` (sm, regular)
- [x] ✅ Line-height consistente: `1.5` (normal), `1.3` (tight)
- [x] ✅ Font-weights: regular (400), medium (500), semibold (600)

**Arquivos:**
- `frontend/src/pages/Dashboard/TasksPage.tsx` ✅ APLICADO
- `frontend/src/styles/design-tokens.ts` ✅ DEFINIDO

---

## 🎯 Sprint 5: Sistema de Design Tokens (2-3h)

### ✅ Objetivos:
- Criar constantes reutilizáveis
- Facilitar manutenção futura
- Garantir consistência total

### 🎯 Tasks:

#### 5.1 - Design Tokens File
Criar `frontend/src/styles/design-tokens.ts`:

```typescript
export const DesignTokens = {
  // Spacing (8pt grid system)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // Typography
  fontSize: {
    sm: '12px',
    md: '14px',
    lg: '16px',
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },

  lineHeight: {
    tight: 1.3,
    normal: 1.5,
  },

  // Sizes
  sizes: {
    icon: {
      sm: '16px',
      md: '20px',
      lg: '24px',
    },
    button: {
      height: '40px',
      heightSm: '32px',
    },
    card: {
      minHeight: '120px',
      maxWidth: '400px',
    },
    column: {
      headerHeight: '56px',
      minWidth: '320px',
      maxWidth: '400px',
    },
    subcolumn: {
      headerHeight: '48px',
    },
  },

  // Border Radius
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },

  // Transitions
  transition: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
  },
};
```

#### 5.2 - Aplicar Tokens em Todos os Componentes ✅ COMPLETO
- [x] ✅ Substituir valores hardcoded por tokens
- [x] ✅ Criar helper hooks para acessar tokens (`useDesignTokens.ts`)
- [x] ✅ Documentar uso dos tokens
- [x] ✅ Adicionar CSS Variables no `index.css`

**Arquivos Criados:**
- `frontend/src/styles/design-tokens.ts` ✅
- `frontend/src/hooks/useDesignTokens.ts` ✅
- `frontend/src/contexts/UIContext.tsx` ✅
- `frontend/src/components/HamburgerButton.tsx` ✅
- `frontend/src/index.css` (atualizado com variáveis CSS) ✅

---

## 📱 Sprint 6: Responsividade Aprimorada (2-3h)

### ✅ Objetivos:
- Mobile-first consistente
- Breakpoints uniformes
- Touch targets adequados

### 🎯 Tasks:

#### 6.1 - Breakpoints Padronizados
```typescript
const breakpoints = {
  mobile: '640px',   // 1 coluna
  tablet: '768px',   // 2 colunas
  desktop: '1024px', // 3+ colunas
  wide: '1440px',    // 4+ colunas
};
```

#### 6.2 - Touch Targets Mobile
- [ ] Botões mínimo: `44x44px`
- [ ] Cards com padding maior em mobile: `20px`
- [ ] Espaçamento entre elementos interativos: `8px` mínimo

#### 6.3 - Sidebar Mobile
- [ ] Full-screen overlay em mobile
- [ ] Slide da esquerda com animação
- [ ] Fechar ao clicar fora ou em qualquer link

---

## 📊 Métricas de Sucesso

### Antes vs Depois:

| Métrica | Antes | Meta Depois |
|---------|-------|-------------|
| **Tamanhos de fonte diferentes** | 8-10 | 3 |
| **Variações de espaçamento** | 15+ | 6 (sistema 8pt) |
| **Níveis de sombra** | 6+ | 2 |
| **Variações de border-radius** | 5+ | 3 |
| **Alturas de card** | Variável | Fixa (min 120px) |
| **Alturas de column header** | Variável | Fixa (56px) |
| **Cores na palette ativa** | 15+ | 8 |
| **Tempo para encontrar ação** | ~5s | ~2s |

---

## 🎨 Referências de Design

### Inspirações (Visual Clean):
- **Linear.app:** Minimalismo extremo, foco no conteúdo
- **Notion:** Espaçamento generoso, hierarquia clara
- **Todoist:** Cards uniformes, cores suaves
- **Height:** Interface imersiva, sidebar collapsible

### Princípios de Design:
1. **Menos é mais:** Remover tudo que não agrega valor
2. **Consistência:** Mesmo padrão em toda aplicação
3. **Hierarquia:** Visual clara do que é importante
4. **Whitespace:** Respiração entre elementos
5. **Ações claras:** Botões óbvios, sem ambiguidade

---

## 📝 Ordem de Implementação Recomendada

### Fase 1: Fundação (Sprint 5)
Começar pelos **Design Tokens** para ter a base sólida.

### Fase 2: Estrutura (Sprints 1 e 2)
Implementar **Sidebar/TopBar collapsible** e **uniformizar colunas**.

### Fase 3: Conteúdo (Sprint 3)
Refatorar **task cards** para serem uniformes.

### Fase 4: Polimento (Sprint 4)
**Reduzir poluição visual** e aplicar princípios clean.

### Fase 5: Finalização (Sprint 6)
Garantir **responsividade** perfeita.

---

## 🚀 Estimativa Total

- **Tempo total:** 18-25 horas
- **Sprints:** 6 sprints
- **Impacto visual:** ⭐⭐⭐⭐⭐ (Transformação completa)
- **Complexidade técnica:** ⭐⭐⭐ (Moderada)

---

## ✅ Checklist Final de Qualidade

Antes de considerar completo, verificar:

- [ ] Todos os cards têm mesma altura mínima
- [ ] Todos os headers têm altura fixa
- [ ] Apenas 3 tamanhos de fonte em uso
- [ ] Apenas 2 níveis de sombra
- [ ] Sistema de espaçamento 8pt aplicado
- [ ] Sidebar e TopBar colapsam suavemente
- [ ] Botão hamburger sempre visível e acessível
- [ ] Mobile touch targets >= 44x44px
- [ ] Sem gradientes desnecessários
- [ ] Cores reduzidas para palette essencial
- [ ] Design tokens aplicados em 90%+ dos componentes

---

**🎨 Generated with Claude Code**

**Última atualização:** 2025-10-06
