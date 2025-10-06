# 🎨 Roadmap: Sistema de Temas Robusto

## Status Atual

✅ **Implementado:**
- ThemeContext com 8 temas diferentes
- ThemeSelector component com React Portal
- localStorage persistence
- CSS custom properties aplicadas no document.root
- Re-render do TasksPage quando tema muda

⚠️ **Problema Atual:**
- Apenas background e text color estão sendo aplicados
- Componentes usam classes Tailwind hardcoded (bg-pure-black, text-purple-500, etc)
- Cards, buttons, borders não respondem ao tema
- Cores de prioridade, status e elementos UI ignoram o tema

---

## 🎯 Objetivo

Implementar sistema de temas completamente funcional onde **TODOS** os elementos da UI respondem ao tema selecionado, incluindo:
- Backgrounds (principal, secundário, terciário)
- Cards e modais
- Botões e inputs
- Borders e dividers
- Cores de estado (success, warning, error, info)
- Cores de prioridade (low, medium, high, urgent)
- Textos (primário, secundário, muted)
- Hover states e focus indicators

---

## 📋 Plano de Implementação

### **Fase 1: Refatoração do CSS Base** ⏱️ 2-3h

**Objetivo:** Substituir cores hardcoded por CSS custom properties

**Tarefas:**
1. ✅ Criar arquivo `frontend/src/styles/theme-variables.css` com todas as custom properties
2. ✅ Importar no `index.css` ou `App.tsx`
3. ✅ Documentar todas as variáveis disponíveis

**Variáveis a criar:**
```css
:root {
  /* Backgrounds */
  --color-background: #000000;
  --color-background-secondary: #0a0a0a;
  --color-background-tertiary: #141414;

  /* Cards */
  --color-card-bg: rgba(20, 20, 20, 0.8);
  --color-card-bg-hover: rgba(30, 30, 30, 0.9);
  --color-card-border: rgba(255, 255, 255, 0.1);

  /* Text */
  --color-text: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-text-muted: #666666;

  /* Primary/Accent */
  --color-primary: #8b5cf6;
  --color-accent: #d946ef;

  /* Status */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Priority */
  --color-priority-low: #6b7280;
  --color-priority-medium: #3b82f6;
  --color-priority-high: #f59e0b;
  --color-priority-urgent: #ef4444;

  /* Borders */
  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-hover: rgba(255, 255, 255, 0.2);

  /* Interactive */
  --color-button-bg: #8b5cf6;
  --color-button-hover: #7c3aed;
  --color-input-bg: rgba(20, 20, 20, 0.6);
  --color-input-border: rgba(255, 255, 255, 0.1);
}
```

---

### **Fase 2: Refatoração do TasksPage** ⏱️ 4-6h

**Objetivo:** Substituir todas as classes Tailwind hardcoded por custom properties

**Estratégia:**
- Buscar e substituir padrões comuns:
  - `bg-pure-black` → `style={{ backgroundColor: 'var(--color-background)' }}`
  - `text-purple-500` → `style={{ color: 'var(--color-primary)' }}`
  - `border-white/10` → `style={{ borderColor: 'var(--color-border)' }}`

**Áreas a refatorar:**
1. ✅ Header e toolbar (linha ~3500-3700)
2. ✅ Board selector (linha ~3700-3900)
3. ✅ Filtros e views (linha ~3900-4100)
4. ✅ Colunas Kanban (linha ~4100-5000)
5. ✅ Cards de tarefas (linha ~4500-5500)
6. ✅ Modais (CreateTaskModal, EditTaskModal, etc)
7. ✅ Subcolunas (linha ~4600-4900)
8. ✅ Priority badges
9. ✅ Status indicators
10. ✅ Empty states

**Exemplo de refatoração:**

**Antes:**
```jsx
<div className="bg-gray-900/80 border border-white/10 rounded-xl p-4">
  <h3 className="text-purple-400 font-bold">Título</h3>
  <p className="text-gray-400">Descrição</p>
</div>
```

**Depois:**
```jsx
<div
  className="rounded-xl p-4"
  style={{
    backgroundColor: 'var(--color-card-bg)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--color-card-border)'
  }}
>
  <h3 style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Título</h3>
  <p style={{ color: 'var(--color-text-secondary)' }}>Descrição</p>
</div>
```

---

### **Fase 3: Criar Componentes Temáveis** ⏱️ 3-4h

**Objetivo:** Criar componentes wrapper que aplicam temas automaticamente

**Componentes a criar:**

1. **`<ThemedCard>`**
```tsx
interface ThemedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'selected';
  className?: string;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const bgColor = variant === 'selected'
    ? 'var(--color-card-bg-hover)'
    : 'var(--color-card-bg)';

  return (
    <div
      className={`rounded-xl p-4 ${className}`}
      style={{
        backgroundColor: bgColor,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--color-card-border)'
      }}
    >
      {children}
    </div>
  );
};
```

2. **`<ThemedButton>`**
3. **`<ThemedInput>`**
4. **`<ThemedBadge>`** (para priority, status, etc)
5. **`<ThemedText>`** (variantes: primary, secondary, muted)

---

### **Fase 4: Refatoração de Modais** ⏱️ 2-3h

**Modais a refatorar:**
1. ✅ CreateTaskModal
2. ✅ EditTaskModal
3. ✅ CreateColumnModal
4. ✅ ShareBoardModal
5. ✅ InviteMemberModal
6. ✅ ImportModal

**Pattern:**
- Substituir backgrounds hardcoded
- Aplicar borders temáveis
- Usar `ThemedCard` para seções
- Aplicar cores de texto do tema

---

### **Fase 5: Tailwind Config Customization** ⏱️ 1-2h

**Objetivo:** Estender Tailwind para usar CSS custom properties

**Editar `tailwind.config.js`:**
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-secondary': 'var(--color-background-secondary)',
        'background-tertiary': 'var(--color-background-tertiary)',

        'card-bg': 'var(--color-card-bg)',
        'card-border': 'var(--color-card-border)',

        'text-primary': 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',

        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',

        // ... todas as outras cores
      }
    }
  }
}
```

**Benefício:** Permite usar `bg-background` em vez de inline styles

---

### **Fase 6: Testes e Ajustes Finos** ⏱️ 2-3h

**Checklist de testes:**
- [ ] Todos os 8 temas aplicam corretamente
- [ ] Nenhuma cor hardcoded permanece visível
- [ ] Transitions suaves entre temas
- [ ] Contraste adequado em todos os temas (acessibilidade)
- [ ] Hover states funcionam em todos os temas
- [ ] Focus indicators visíveis
- [ ] Modais e dropdowns corretos
- [ ] Cards, badges e buttons temáticos
- [ ] Dark/light mode detectável (se implementado)

**Ferramentas de teste:**
- Chrome DevTools para inspecionar CSS custom properties
- Lighthouse para acessibilidade de contraste
- Teste manual em cada um dos 8 temas

---

### **Fase 7: Documentação** ⏱️ 1h

**Criar documentação:**
1. ✅ `docs/THEMES.md` - Como usar o sistema de temas
2. ✅ `docs/THEME_DEVELOPMENT.md` - Como criar novos temas
3. ✅ Atualizar README.md com seção de temas

**Conteúdo:**
- Lista de todas as CSS custom properties disponíveis
- Guia de como criar um novo tema
- Exemplos de uso dos componentes temáveis
- Screenshot de cada tema

---

## 🎨 Temas Disponíveis

1. **Dark Purple** (padrão) - Roxo vibrante e profundo
2. **Cyberpunk** - Pink + cyan neon futurista
3. **Ocean** - Tons de azul profundo e relaxante
4. **Forest** - Verde natural e relaxante
5. **Sunset** - Laranja quente e aconchegante
6. **Midnight** - Azul escuro sofisticado
7. **Rose** - Pink suave e elegante
8. **Monochrome** - Preto e branco minimalista

---

## 📊 Estimativa Total

| Fase | Tempo Estimado | Complexidade |
|------|----------------|--------------|
| Fase 1: CSS Base | 2-3h | Baixa |
| Fase 2: TasksPage | 4-6h | Alta |
| Fase 3: Componentes | 3-4h | Média |
| Fase 4: Modais | 2-3h | Média |
| Fase 5: Tailwind | 1-2h | Baixa |
| Fase 6: Testes | 2-3h | Média |
| Fase 7: Docs | 1h | Baixa |
| **TOTAL** | **15-22h** | - |

---

## 🚀 Próximos Passos

1. **Começar com Fase 1** - Criar CSS custom properties
2. **Fazer commits atômicos** - Um commit por fase/subárea
3. **Testar incrementalmente** - Não esperar tudo pronto para testar
4. **Priorizar TasksPage** - É a página principal
5. **Documentar mudanças** - Facilita manutenção futura

---

## 💡 Melhorias Futuras (Pós-MVP)

- [ ] Theme editor visual (criar temas custom na UI)
- [ ] Import/export de temas (.json)
- [ ] Tema por board (cada board com tema diferente)
- [ ] Auto dark/light mode baseado em horário
- [ ] Animações de transição entre temas
- [ ] Preview de tema antes de aplicar
- [ ] Temas community-contributed
- [ ] Gradient backgrounds opcionais
- [ ] Theme marketplace

---

**Última atualização:** 2025-10-06
**Status:** 🔄 Em progresso - Fase 0 (MVP básico concluído, aguardando Fase 1)
