# 🎨 FASE 2.1 - Design System Implementation

**Status:** 🟢 Em Progresso
**Data Início:** 2026-01-11

---

## 📦 O que foi implementado

### Design System v2.0 - globals.css (742 linhas)

Implementação completa de design tokens em CSS variables baseado na pesquisa da Fase 1.

---

## 🎨 Design Tokens

### 1. Cores Base (Dark Premium Theme)

```css
/* Backgrounds */
--bg-pure-black: 0 0% 0%;        /* #000000 */
--bg-surface: 0 0% 4%;           /* #0A0A0A */
--bg-surface-elevated: 0 0% 8%;  /* #141414 */
--bg-hover: 0 0% 10%;            /* #1A1A1A */

/* Text */
--text-primary: 0 0% 100%;       /* #FFFFFF */
--text-secondary: 0 0% 63%;      /* #A0A0A0 */
--text-tertiary: 0 0% 40%;       /* #666666 */

/* Borders */
--border-subtle: 0 0% 12%;       /* #1F1F1F */
--border-medium: 0 0% 16%;       /* #2A2A2A */
--border-strong: 0 0% 24%;       /* #3D3D3D */
```

**Uso:**
```tsx
<div className="bg-[hsl(var(--bg-surface))] text-[hsl(var(--text-primary))]">
  Content
</div>
```

---

### 2. Cores por Produto

Cada produto tem sua paleta com 5 shades (50, 100, 500, 700, 900):

#### Sirius CRM - Indigo/Purple
```css
--sirius-500: 243 75% 59%;  /* #6366F1 */
```
```tsx
<div className="bg-[hsl(var(--sirius-500))]">Sirius CRM</div>
```

#### Orion ERP - Emerald/Teal
```css
--orion-500: 160 84% 39%;  /* #10B981 */
```

#### Vértice Marketing - Amber/Red
```css
--vertice-500: 38 92% 50%;  /* #F59E0B */
```

#### PCP Industrial - Yellow/Gray
```css
--pcp-500: 45 93% 47%;  /* #EAB308 */
```

#### BPO Financeiro - Teal/Blue
```css
--bpo-500: 162 93% 31%;  /* #059669 */
```

**Classes pré-prontas:**
```tsx
<span className="badge-sirius">Sirius</span>
<span className="badge-orion">Orion</span>
<span className="badge-vertice">Vértice</span>
<span className="badge-pcp">PCP</span>
<span className="badge-bpo">BPO</span>
```

---

### 3. Cores Semânticas

```css
--success: 160 84% 39%;   /* Verde - #10B981 */
--warning: 38 92% 50%;    /* Amarelo - #F59E0B */
--error: 0 84% 60%;       /* Vermelho - #EF4444 */
--info: 217 91% 60%;      /* Azul - #3B82F6 */
```

**Uso:**
```tsx
<div className="bg-[hsl(var(--success))] text-white">Sucesso!</div>
<div className="bg-[hsl(var(--error))] text-white">Erro!</div>
```

---

### 4. Tipografia

#### Type Scale (Responsivo com clamp)
```css
--text-hero: clamp(3rem, 8vw, 6rem);         /* 48-96px */
--text-display: clamp(2.25rem, 6vw, 4.5rem); /* 36-72px */
--text-h1: clamp(2rem, 4vw, 3rem);           /* 32-48px */
--text-h2: clamp(1.75rem, 3vw, 2.25rem);     /* 28-36px */
--text-h3: clamp(1.5rem, 2.5vw, 2rem);       /* 24-32px */
--text-body: 1.125rem;                       /* 18px */
--text-caption: 0.875rem;                    /* 14px */
```

#### Classes Utilitárias
```tsx
<h1 className="text-hero">Hero Title</h1>
<h1 className="text-display">Display Title</h1>
<h1 className="text-h1">H1 Title</h1>
<h2 className="text-h2">H2 Title</h2>
<p className="text-body">Body text</p>
<p className="text-caption">Caption text</p>
```

#### Font Weights
```css
--font-thin: 200;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

#### Line Heights & Letter Spacing
```css
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.02em;
```

---

### 5. Spacing System (8px base)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

**Uso:**
```tsx
<div style={{padding: 'var(--space-8)'}}>
  Padded content
</div>
```

---

### 6. Border Radius

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;  /* Totalmente redondo */
```

**Uso:**
```tsx
<button style={{borderRadius: 'var(--radius-full)'}}>
  Rounded button
</button>
```

---

### 7. Shadows & Elevation

```css
/* Sutis */
--shadow-sm: 0 2px 4px hsl(var(--bg-pure-black) / 0.1);
--shadow-md: 0 4px 8px hsl(var(--bg-pure-black) / 0.15);
--shadow-lg: 0 8px 16px hsl(var(--bg-pure-black) / 0.2);

/* Premium */
--shadow-premium: 0 4px 24px hsl(var(--bg-pure-black) / 0.8),
                  0 12px 48px hsl(var(--bg-pure-black) / 0.6);

/* Glow effects */
--shadow-glow: 0 0 40px hsl(var(--text-primary) / 0.1);
--shadow-glow-lg: 0 0 60px hsl(var(--text-primary) / 0.15);
```

**Uso:**
```tsx
<div style={{boxShadow: 'var(--shadow-premium)'}}>
  Elevated card
</div>
```

---

### 8. Animation Tokens

#### Durations
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
```

#### Easing Functions
```css
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);  /* "The ROI Flow" */
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-elegant: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

#### Common Transitions
```css
--transition-fast: all var(--duration-fast) var(--ease-out);
--transition-normal: all var(--duration-normal) var(--ease-out);
--transition-slow: all var(--duration-slow) var(--ease-smooth);
--transition-colors: color var(--duration-normal) var(--ease-out),
                     background-color var(--duration-normal) var(--ease-out),
                     border-color var(--duration-normal) var(--ease-out);
```

**Uso:**
```tsx
<button style={{transition: 'var(--transition-normal)'}}>
  Smooth transition
</button>
```

---

### 9. Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 400;
--z-modal: 500;
--z-popover: 600;
--z-tooltip: 700;
--z-toast: 800;
--z-max: 9999;
```

---

### 10. Container Widths

```css
--container-sm: 640px;    /* Forms, narrow content */
--container-md: 768px;    /* Blog posts, articles */
--container-lg: 1024px;   /* Standard content */
--container-xl: 1280px;   /* Wide content */
--container-2xl: 1536px;  /* Full width content */
```

---

## 🧩 Component Classes

### Glass Card

**Descrição:** Card com efeito glassmorphism e backdrop blur

```tsx
<div className="glass-card">
  <h3>Glass Card</h3>
  <p>With backdrop blur effect</p>
</div>
```

**Features:**
- Backdrop blur de 12px
- Border sutil com opacity
- Hover lift effect
- Glow shadow on hover

---

### Premium Buttons

#### Button Premium (Outline → Fill)
```tsx
<button className="btn-premium">
  Hover to Fill
</button>
```

**Efeito:** Border outline que preenche no hover (efeito scale from left)

#### Button Primary Premium (Filled)
```tsx
<button className="btn-primary-premium">
  Primary Action
</button>
```

**Efeito:** Background branco, lift no hover, glow shadow

---

### Elegant Link

**Descrição:** Link com animated underline

```tsx
<a href="#" className="link-elegant">
  Elegant Link
</a>
```

**Efeito:** Underline animado que cresce de right to left no hover

---

### Product Badges

**Descrição:** Badges coloridos para cada produto

```tsx
<span className="badge-sirius px-3 py-1 rounded-full text-sm">
  Sirius CRM
</span>
<span className="badge-orion px-3 py-1 rounded-full text-sm">
  Orion ERP
</span>
```

**Features:**
- Background com 10% opacity da cor do produto
- Border com 30% opacity
- Cor do texto é a cor principal do produto

---

## 🎬 Scroll Animations

### Fade In Up

```tsx
<div className="fade-in-up">
  Content fades in from bottom
</div>
```

**JavaScript necessário:**
```tsx
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });
}, []);
```

### Outras Animações

- `.scale-in` - Escala de 95% para 100%
- `.slide-in-left` - Slide de -2rem para 0
- `.slide-in-right` - Slide de +2rem para 0

---

## 🌈 Gradients

### Core Gradients
```css
--gradient-dark: linear-gradient(135deg, #000 0%, #0A0A0A 100%);
--gradient-sirius: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
--gradient-orion: linear-gradient(135deg, #10B981 0%, #059669 100%);
```

**Uso:**
```tsx
<div style={{background: 'var(--gradient-sirius)'}}>
  Sirius gradient
</div>
```

---

## ⚡ Keyframe Animations

### Particles Float
```tsx
<div className="particle" />
```

### Rotate Slow (30s)
```tsx
<div className="rotate-slow">
  Rotating gradient
</div>
```

### Pulse Slow (3s)
```tsx
<div className="animate-pulse-slow">
  Pulsing element
</div>
```

### Shimmer (Loading)
```tsx
<div className="shimmer h-20 w-full rounded-lg" />
```

---

## ♿ Accessibility

### Prefers Reduced Motion

Todos os animations e transitions respeitam a preferência do usuário:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 📱 Responsive Breakpoints

```
sm:  640px  (Tailwind default)
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

**Mobile-first approach** - sempre design do mobile para desktop.

---

## 🎯 Exemplos Práticos

### Hero Section
```tsx
<section className="relative min-h-screen flex items-center justify-center">
  <div className="max-w-screen-xl mx-auto px-8">
    <h1 className="text-hero mb-6 fade-in-up">
      ROI Labs.
    </h1>
    <p className="text-body-large text-[hsl(var(--text-secondary))] mb-12 fade-in-up">
      Ecossistema completo de soluções empresariais
    </p>
    <button className="btn-primary-premium fade-in-up">
      Agendar demonstração
    </button>
  </div>
</section>
```

### Product Card
```tsx
<div className="glass-card group">
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--sirius-500)/0.2)]
                    flex items-center justify-center">
      <Users className="w-6 h-6 text-[hsl(var(--sirius-500))]" />
    </div>
    <div>
      <h3 className="text-h3">Sirius CRM</h3>
      <span className="badge-sirius text-xs px-2 py-1 rounded-full">
        Disponível
      </span>
    </div>
  </div>
  <p className="text-body text-[hsl(var(--text-secondary))] mb-6">
    Gestão completa de relacionamento com clientes
  </p>
  <a href="/sirius-crm" className="link-elegant">
    Conhecer Sirius CRM →
  </a>
</div>
```

### CTA Section
```tsx
<section className="py-24 px-8 relative overflow-hidden">
  {/* Background gradient glow */}
  <div className="absolute inset-0 bg-[var(--gradient-glow)]" />

  <div className="relative max-w-screen-lg mx-auto text-center">
    <h2 className="text-display mb-6">
      Pronto para transformar seu negócio?
    </h2>
    <p className="text-body-large text-[hsl(var(--text-secondary))] mb-12">
      Conheça o ecossistema completo de soluções ROI Labs
    </p>
    <div className="flex gap-4 justify-center">
      <button className="btn-primary-premium">
        Agendar demonstração
      </button>
      <button className="btn-premium">
        Falar com consultor
      </button>
    </div>
  </div>
</section>
```

---

## 🔧 Usando com Tailwind

Como estamos no Tailwind v4, os tokens CSS podem ser usados diretamente:

```tsx
// Cores
className="bg-[hsl(var(--bg-surface))]"
className="text-[hsl(var(--text-primary))]"

// Spacing
className="p-[var(--space-8)]"
className="mb-[var(--space-12)]"

// Radius
style={{borderRadius: 'var(--radius-2xl)'}}

// Shadows
style={{boxShadow: 'var(--shadow-premium)'}}

// Transitions
style={{transition: 'var(--transition-smooth)'}}
```

Ou use as utility classes do Tailwind normalmente:
```tsx
className="bg-black text-white p-8 rounded-2xl"
```

---

## 📊 Métricas do Design System

- **Total de Design Tokens:** 150+
- **Cores:** 5 produtos + semantic colors
- **Typography Scale:** 7 sizes (hero → caption)
- **Spacing System:** 13 steps (4px → 128px)
- **Shadow Variants:** 9 options
- **Animation Durations:** 4 options
- **Easing Functions:** 6 options
- **Component Classes:** 15+
- **Keyframe Animations:** 8+
- **Total CSS:** 742 linhas

---

## ✅ Próximos Passos

**Fase 2 restante:**
- [ ] Criar Figma design system (visual moodboard)
- [ ] Protótipos hi-fi das páginas principais
- [ ] Documentar patterns de uso
- [ ] Storybook com todos os componentes
- [ ] Testes de acessibilidade

**Fase 3 - Development:**
- [ ] Implementar componentes base do shadcn/ui
- [ ] Criar componentes custom (ProductCard, Hero, etc)
- [ ] Setup Framer Motion
- [ ] Setup GSAP ScrollTrigger

---

**Última Atualização:** 2026-01-11
**Responsável:** Claude AI
**Status:** Design tokens 100% implementados
