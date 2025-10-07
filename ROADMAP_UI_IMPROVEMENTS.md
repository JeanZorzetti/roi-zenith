# 🎨 ROADMAP: UI/UX Improvements - Visual Clean & Uniformidade

**Objetivo:** Transformar a interface em um design minimalista, uniforme e profissional, com foco em redução de poluição visual e consistência de espaçamento.

**Palavras-chave:** Padrão, Visual Clean, Uniformidade, Espaçamento, Minimalismo

---

## 📋 Sprint 1: Sidebar & TopBar Collapsible (4-6h)

### ✅ Objetivos:
- Interface imersiva com mais espaço para conteúdo
- Sidebar e TopBar ocultáveis com botão hamburger
- Animações suaves de transição
- Estado persistido no localStorage

### 🎯 Tasks:

#### 1.1 - Criar Sistema de Toggle para Sidebar
- [ ] Adicionar estado `sidebarCollapsed` no contexto global ou localStorage
- [ ] Criar botão hamburger (☰) fixo no canto superior esquerdo
- [ ] Implementar animação de slide-in/slide-out (300ms ease-in-out)
- [ ] Ajustar largura da sidebar: `280px` (aberta) → `0px` (fechada)
- [ ] Adicionar overlay escuro quando sidebar aberta em mobile

**Arquivos:**
- `frontend/src/components/Layout/Sidebar.tsx`
- `frontend/src/contexts/UIContext.tsx` (criar)

#### 1.2 - Criar Sistema de Toggle para TopBar
- [ ] Adicionar estado `topbarCollapsed`
- [ ] Implementar auto-hide ao fazer scroll down
- [ ] Mostrar ao fazer scroll up ou hover no topo
- [ ] Altura da topbar: `64px` (visível) → `0px` (oculta)
- [ ] Adicionar indicador visual sutil quando oculta

**Arquivos:**
- `frontend/src/components/Layout/TopBar.tsx`

#### 1.3 - Botão Hamburger Global
- [ ] Posição fixa: `top-4 left-4`
- [ ] Z-index alto (z-50) para ficar acima de tudo
- [ ] Ícone animado: ☰ → ✕ quando aberto
- [ ] Tamanho: 44x44px (área de toque confortável)
- [ ] Background semi-transparente com blur

**Design:**
```tsx
<button className="fixed top-4 left-4 z-50 w-11 h-11 rounded-lg backdrop-blur-md transition-all">
  <Menu className="h-6 w-6" />
</button>
```

---

## 📐 Sprint 2: Uniformização de Colunas e Subcolunas (3-4h)

### ✅ Objetivos:
- Títulos de colunas e subcolunas com altura fixa
- Espaçamento consistente
- Visual limpo sem elementos desnecessários

### 🎯 Tasks:

#### 2.1 - Padronizar Headers de Colunas
- [ ] Altura fixa: `56px` para todos os headers
- [ ] Padding interno: `12px 16px`
- [ ] Font-size título: `16px` (semibold)
- [ ] Remover gradientes complexos → cor sólida com opacidade
- [ ] Badge de contagem: tamanho fixo `24x24px`, centralizado

**Antes:**
```tsx
className="p-3 rounded-xl" // altura variável
```

**Depois:**
```tsx
className="h-14 px-4 py-3 rounded-lg" // altura fixa 56px
```

#### 2.2 - Padronizar Headers de Subcolunas
- [ ] Altura fixa: `48px` (menor que colunas principais)
- [ ] Padding interno: `10px 14px`
- [ ] Font-size: `14px` (medium)
- [ ] Ícone de expand/collapse: tamanho fixo `20x20px`
- [ ] Alinhamento vertical perfeito de todos elementos

#### 2.3 - Sistema de Grid Consistente
- [ ] Gap entre colunas: `16px` (fixo)
- [ ] Gap entre subcolunas: `12px` (fixo)
- [ ] Largura mínima de coluna: `320px`
- [ ] Largura máxima de coluna: `400px`

**Arquivos:**
- `frontend/src/pages/Dashboard/TasksPage.tsx` (linhas 4400-4800)

---

## 🃏 Sprint 3: Uniformização de Task Cards (4-5h)

### ✅ Objetivos:
- Todos os cards com mesma estrutura visual
- Altura mínima definida
- Espaçamento interno consistente
- Hierarquia visual clara

### 🎯 Tasks:

#### 3.1 - Estrutura Base dos Cards
- [ ] Altura mínima: `120px`
- [ ] Padding fixo: `16px`
- [ ] Border radius: `12px` (padrão em todo sistema)
- [ ] Borda: `1px` sólida, sem variações
- [ ] Sombra sutil única: `shadow-sm` (remover variações)

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

#### 3.2 - Hierarquia de Informações
- [ ] **Linha 1 (32px):** Checkbox + Priority Icon + Actions (sempre mesma altura)
- [ ] **Linha 2 (auto):** Título (line-clamp-2, max 2 linhas)
- [ ] **Linha 3 (auto):** Descrição (line-clamp-1, opcional)
- [ ] **Linha 4 (24px):** Tags (max 3 visíveis, +N indicator)
- [ ] **Linha 5 (32px):** Avatar + Due Date (sempre mesma altura)

#### 3.3 - Remover Variações Visuais Desnecessárias
- [ ] **Remover:** Animações de pulse em cards antigos
- [ ] **Remover:** Múltiplas variações de sombra no hover
- [ ] **Remover:** Gradientes complexos de fundo
- [ ] **Simplificar:** Hover = apenas border color change
- [ ] **Simplificar:** Seleção = border accent + subtle background

**Antes (poluído):**
```tsx
className="hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/20 animate-pulse"
```

**Depois (clean):**
```tsx
className="hover:border-primary-500 transition-colors"
```

#### 3.4 - Badges e Ícones Uniformes
- [ ] Todos os ícones: `16x16px` ou `20x20px` (apenas 2 tamanhos)
- [ ] Badges de prioridade: `20x20px` quadrados com border-radius `4px`
- [ ] Tags: altura fixa `24px`, padding `4px 8px`
- [ ] Avatares: `32x32px` (único tamanho)

**Arquivos:**
- `frontend/src/pages/Dashboard/TasksPage.tsx` (linhas 4764-5240)

---

## 🧹 Sprint 4: Redução de Poluição Visual (3-4h)

### ✅ Objetivos:
- Remover elementos redundantes
- Simplificar cores e sombras
- Criar hierarquia visual clara
- Aumentar whitespace

### 🎯 Tasks:

#### 4.1 - Simplificação de Cores
- [ ] Reduzir palette de cores de 15+ para 8 cores máximo
- [ ] Usar apenas 3 níveis de opacidade: 100%, 60%, 30%
- [ ] Remover gradientes desnecessários (manter apenas em botões principais)
- [ ] Background cards: cor única, sem gradientes
- [ ] Bordas: 2 opacidades apenas (default e hover)

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

#### 4.2 - Simplificação de Sombras
- [ ] Apenas 2 níveis de sombra:
  - `shadow-sm`: cards em repouso
  - `shadow-md`: cards em hover/foco
- [ ] Remover todas as sombras coloridas (shadow-primary-500/20, etc)
- [ ] Sombras neutras apenas (preto com opacidade)

**Antes:**
```tsx
shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-accent/40
```

**Depois:**
```tsx
shadow-sm hover:shadow-md
```

#### 4.3 - Espaçamento Consistente (Sistema 8pt)
- [ ] Todos os espaçamentos múltiplos de 8px
- [ ] Gap padrão entre elementos: `8px` ou `16px`
- [ ] Padding de containers: `16px` ou `24px`
- [ ] Margin entre seções: `24px` ou `32px`

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

#### 4.4 - Remover Elementos Redundantes
- [ ] **Toolbar:** Remover botões pouco usados, manter apenas essenciais
- [ ] **Filters:** Collapsible por padrão, expandir apenas quando necessário
- [ ] **Cards:** Remover indicadores visuais duplicados
- [ ] **Headers:** Simplificar informações (remover contadores redundantes)

#### 4.5 - Tipografia Limpa
- [ ] Apenas 3 tamanhos de fonte:
  - Títulos: `16px` (semibold)
  - Corpo: `14px` (regular)
  - Labels: `12px` (medium)
- [ ] Line-height consistente: `1.5` para corpo, `1.3` para títulos
- [ ] Remover variações de font-weight (apenas regular, medium, semibold)

**Arquivos:**
- `frontend/src/pages/Dashboard/TasksPage.tsx` (revisão geral)
- `frontend/src/styles/globals.css`

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

#### 5.2 - Aplicar Tokens em Todos os Componentes
- [ ] Substituir valores hardcoded por tokens
- [ ] Criar helper hooks para acessar tokens
- [ ] Documentar uso dos tokens

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
