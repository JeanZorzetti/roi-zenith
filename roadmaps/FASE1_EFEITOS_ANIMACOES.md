# 🎬 FASE 1.3 - Análise de Efeitos e Micro-interações

**Status:** 🟢 Em Progresso
**Data Início:** 2026-01-11

---

## 🎯 Objetivo

Definir todos os efeitos visuais, animações e micro-interações que tornarão o site ROI Labs premium e memorável, mantendo performance e usabilidade.

---

## 📜 Princípios de Animação

### 1. Performance First
- Todas as animações usando `transform` e `opacity` (GPU-accelerated)
- Evitar animações de `width`, `height`, `top`, `left`
- 60fps mínimo
- Reduzir motion para usuários com `prefers-reduced-motion`

### 2. Purposeful
- Cada animação deve ter um propósito
- Guiar atenção do usuário
- Fornecer feedback
- Comunicar relacionamento entre elementos

### 3. Natural
- Usar easing functions realistas (não linear)
- Respeitar física (inércia, gravidade)
- Duração apropriada (200-600ms típico)

### 4. Consistente
- Mesmas durações para ações similares
- Mesmos easings para transições do mesmo tipo
- Velocidades consistentes

---

## 🔽 SCROLL EFFECTS

### 1. Parallax Scrolling ⭐
**Descrição:** Elementos se movem em velocidades diferentes durante scroll

**Uso no ROI Labs:**
- Hero background (move mais devagar que content)
- Background patterns
- Decorative elements

**Implementação:**
```typescript
// Usando GSAP ScrollTrigger
gsap.to('.hero-bg', {
  yPercent: 50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true // smooth parallax
  }
});
```

**Performance:**
- ✅ GPU-accelerated (transform)
- ✅ Smooth com `scrub: true`
- ⚠️ Usar com moderação (max 3-4 elementos)

**Referências:**
- Stripe homepage (background)
- Apple product pages

---

### 2. Reveal on Scroll (Fade + Slide) ⭐⭐⭐
**Descrição:** Elementos aparecem quando entram no viewport

**Uso no ROI Labs:**
- Product cards
- Feature sections
- Testimonials
- Stats
- Qualquer section importante

**Implementação:**
```typescript
// Usando Framer Motion
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1] // ease-out-cubic
  }}
>
  <ProductCard />
</motion.div>
```

**Variações:**
- Fade from bottom (padrão)
- Fade from left/right
- Scale + fade
- Blur + fade

**Stagger (sequencial):**
```typescript
// Grid de products
<motion.div
  variants={container}
  initial="hidden"
  whileInView="visible"
>
  {products.map((product, i) => (
    <motion.div
      key={product.id}
      variants={item}
      custom={i}
    >
      <ProductCard {...product} />
    </motion.div>
  ))}
</motion.div>

const container = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

**Onde aplicar:**
- ✅ Hero elements (title, subtitle, CTA)
- ✅ Product cards grid
- ✅ Feature cards
- ✅ Stats section
- ✅ Testimonials
- ✅ Footer

---

### 3. Sticky Sections
**Descrição:** Seções que "grudam" durante scroll

**Uso no ROI Labs:**
- Navigation (sticky header)
- Product features (demonstração passo-a-passo)
- Comparison tables (sticky header row)

**Implementação:**
```typescript
// CSS
.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 50;
}

// Com blur backdrop ao scrollar
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 100);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<nav className={`sticky ${scrolled ? 'backdrop-blur-xl bg-black/80' : ''}`}>
```

---

### 4. Scroll-triggered Animations
**Descrição:** Animações complexas ativadas por scroll

**Uso no ROI Labs:**
- Integration diagram (conecta os 5 produtos durante scroll)
- Timeline animado (roadmap)
- Number counters (stats)

**Exemplo: Stats Counter**
```typescript
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function AnimatedStat({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <span>{count}</span>
      {suffix}
    </div>
  );
}
```

---

### 5. Progress Indicators
**Descrição:** Barra de progresso do scroll

**Uso no ROI Labs:**
- Blog posts (reading progress)
- Long-form content
- Multi-step forms

**Implementação:**
```typescript
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

---

## 🖱️ HOVER EFFECTS

### 1. Magnetic Buttons ⭐
**Descrição:** Botões que "puxam" o cursor

**Uso no ROI Labs:**
- CTA buttons principais
- Product cards
- Navigation links (sutil)

**Implementação:**
```typescript
function MagneticButton({ children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;

    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-200 ease-out"
    >
      {children}
    </button>
  );
}
```

**Onde aplicar:**
- Hero CTA
- "Agendar demonstração" buttons
- Product showcase CTAs

---

### 2. Lift + Shadow (Elevação)
**Descrição:** Card levanta e sombra aumenta

**Uso no ROI Labs:**
- Product cards
- Feature cards
- Pricing plans
- Blog post cards

**Implementação:**
```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
```

---

### 3. Gradient Shift
**Descrição:** Gradiente muda/anima no hover

**Uso no ROI Labs:**
- Buttons com gradiente
- Card backgrounds
- Borders

**Implementação:**
```css
.gradient-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 200% 200%;
  transition: background-position 0.5s ease;
}

.gradient-button:hover {
  background-position: 100% 100%;
}
```

---

### 4. Scale + Brightness
**Descrição:** Elemento escala e fica mais brilhante

**Uso no ROI Labs:**
- Images
- Icons
- Logos
- Thumbnails

**Implementação:**
```css
.image-hover {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.image-hover:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
```

---

### 5. Glow Effect
**Descrição:** Brilho ao redor do elemento

**Uso no ROI Labs:**
- CTA buttons principais
- Active navigation items
- Featured products

**Implementação:**
```css
.glow-button {
  position: relative;
  transition: all 0.3s ease;
}

.glow-button::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(135deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  filter: blur(10px);
}

.glow-button:hover::before {
  opacity: 0.7;
}
```

---

### 6. Icon Animations
**Descrição:** Icons animam no hover

**Tipos:**
- Rotate (setas)
- Bounce (CTAs)
- Scale pulse
- Shake (alerts)

**Implementação:**
```typescript
<motion.div
  whileHover={{ rotate: 45, scale: 1.1 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <ArrowIcon />
</motion.div>
```

---

## 🔄 TRANSIÇÕES DE PÁGINA

### 1. Page Transitions (View Transitions API)
**Descrição:** Animação suave entre páginas

**Implementação (Next.js 15):**
```typescript
// app/template.tsx
'use client';

import { motion } from 'framer-motion';

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

---

### 2. Loading States Elegantes

**Skeleton Screens:**
```typescript
function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded mt-4 w-3/4" />
      <div className="h-4 bg-gray-200 rounded mt-2 w-1/2" />
    </div>
  );
}
```

**Shimmer Effect:**
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #f8f8f8 40px,
    #f0f0f0 80px
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

---

### 3. Modal Animations

**Fade + Scale:**
```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  <Modal />
</motion.div>
```

---

## 🎨 MICRO-INTERAÇÕES

### 1. Button States
**Estados:**
- Default
- Hover (lift + glow)
- Active (scale down)
- Disabled (opacity + cursor)
- Loading (spinner)

### 2. Form Interactions
**Feedback:**
- Focus (border color + shadow)
- Valid (green checkmark)
- Error (shake + red border)
- Success (fade green background)

**Shake Animation:**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.error-shake {
  animation: shake 0.5s;
}
```

### 3. Toast Notifications
**Animações:**
- Slide in from top
- Auto-dismiss fade out
- Swipe to dismiss

### 4. Tooltip Animations
```typescript
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.15 }}
>
  <Tooltip />
</motion.div>
```

---

## ⚙️ CONFIGURAÇÕES PADRÃO

### Durações
```typescript
export const ANIMATION_DURATION = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 700,
} as const;
```

### Easing Functions
```typescript
export const EASING = {
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 },
} as const;
```

### Framer Motion Variants (Reusáveis)
```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  }
};
```

---

## ♿ ACESSIBILIDADE

### Reduced Motion
```typescript
// Hook para detectar preferência
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Uso
const prefersReducedMotion = usePrefersReducedMotion();

<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0 }}
  animate={prefersReducedMotion ? false : { opacity: 1 }}
>
```

### CSS Fallback
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📊 Mapa de Aplicação

### Home Page
- ✅ Hero: Fade in stagger (title, subtitle, CTA)
- ✅ Products: Reveal on scroll + stagger
- ✅ Features: Reveal on scroll
- ✅ Stats: Counter animation on scroll
- ✅ Testimonials: Carousel auto-play
- ✅ CTA: Magnetic buttons

### Product Pages
- ✅ Hero: Fade in
- ✅ Features tabs: Slide transition
- ✅ Screenshots: Lightbox fade
- ✅ Pricing: Lift on hover

### Navigation
- ✅ Sticky with blur backdrop
- ✅ Mega menu: Fade + slide
- ✅ Mobile menu: Slide from right

### Forms
- ✅ Focus states
- ✅ Validation feedback (shake on error)
- ✅ Success animation

---

## ✅ Checklist de Implementação

### Setup
- [ ] Instalar Framer Motion
- [ ] Instalar GSAP + ScrollTrigger
- [ ] Criar arquivo de animation variants
- [ ] Criar arquivo de constants (durations, easing)
- [ ] Setup reduced motion hook

### Componentes
- [ ] Implementar reveal on scroll HOC
- [ ] Implementar magnetic button
- [ ] Implementar scroll progress
- [ ] Implementar skeleton screens
- [ ] Implementar toast animations

### Testes
- [ ] Testar em 60fps
- [ ] Testar com reduced motion
- [ ] Testar em mobile
- [ ] Testar performance (Lighthouse)

---

**Última Atualização:** 2026-01-11
**Responsável:** Claude AI
**Status:** 100% completo
