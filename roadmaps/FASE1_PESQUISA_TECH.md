# ⚙️ FASE 1.2 - Pesquisa de Tecnologia e Stack

**Status:** 🟢 Em Progresso
**Data Início:** 2026-01-11

---

## 🚀 Next.js 15 - Features Avançadas

### Overview
**Versão:** 16.1.1 (mais recente)
**Release:** Janeiro 2025
**Documentação:** https://nextjs.org/docs

### Features Essenciais para ROI Labs

#### 1. App Router (Stable)
```typescript
// Estrutura recomendada
/app
  /(marketing)     // Route group - páginas públicas
    layout.tsx     // Layout compartilhado
    page.tsx       // Home
    /about
    /solutions
  /(products)      // Route group - produtos
    layout.tsx     // Layout específico de produtos
    /[slug]        // Dynamic routes
      page.tsx
  /(auth)          // Route group - autenticação
  /(dashboard)     // Route group - área logada
```

**Benefícios:**
- ✅ Layouts aninhados
- ✅ Loading states automáticos
- ✅ Error boundaries
- ✅ Parallel routes
- ✅ Intercepting routes

#### 2. Server Components (RSC)
```typescript
// Por padrão, todos os componentes são Server Components
// Renderizam no servidor, sem JS no cliente

// app/products/page.tsx
async function ProductsPage() {
  // Fetch direto no componente
  const products = await getProducts();

  return <ProductGrid products={products} />;
}
```

**Quando usar:**
- ✅ Fetch de dados
- ✅ Acesso a recursos do servidor
- ✅ Dados sensíveis
- ✅ Large dependencies (reduz bundle)

#### 3. Client Components
```typescript
'use client'; // Marca como Client Component

import { useState } from 'react';

export function InteractiveDemo() {
  const [state, setState] = useState();

  return (
    <div onClick={() => setState(...)}>
      Interactive!
    </div>
  );
}
```

**Quando usar:**
- ✅ Interatividade (onClick, onChange)
- ✅ Hooks (useState, useEffect)
- ✅ Browser APIs (localStorage, etc)
- ✅ Animações (Framer Motion)

#### 4. Server Actions
```typescript
// app/actions.ts
'use server';

export async function createLead(formData: FormData) {
  const email = formData.get('email');

  // Direct database access
  await db.leads.create({
    email,
    source: 'website'
  });

  return { success: true };
}

// app/contact/page.tsx
import { createLead } from '../actions';

export default function ContactPage() {
  return (
    <form action={createLead}>
      <input name="email" />
      <button>Submit</button>
    </form>
  );
}
```

**Benefícios:**
- ✅ Sem API routes necessárias
- ✅ Type-safe
- ✅ Progressive enhancement
- ✅ Sem JS? Formulário funciona!

#### 5. Streaming & Suspense
```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Header /> {/* Renderiza imediatamente */}

      <Suspense fallback={<Skeleton />}>
        <SlowComponent /> {/* Stream quando pronto */}
      </Suspense>

      <Footer /> {/* Não espera SlowComponent */}
    </>
  );
}
```

**Benefícios:**
- ✅ TTFB mais rápido
- ✅ Progressive rendering
- ✅ Melhor UX

#### 6. Metadata API (SEO)
```typescript
// app/products/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);

  return {
    title: `${product.name} | ROI Labs`,
    description: product.description,
    openGraph: {
      images: [product.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}
```

**Benefícios:**
- ✅ SEO automático
- ✅ Type-safe
- ✅ Por página
- ✅ OpenGraph + Twitter Cards

#### 7. Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Para hero images
  quality={90}
  placeholder="blur" // Lazy load com blur
/>
```

**Benefícios:**
- ✅ Auto WebP/AVIF
- ✅ Responsive images
- ✅ Lazy loading
- ✅ Blur placeholder

---

## 🎬 Bibliotecas de Animação

### 1. Framer Motion ⭐ PRIMARY
**Versão:** 12.x
**Site:** https://www.framer.com/motion/

#### Por que escolher:
- ✅ React-first (hooks nativos)
- ✅ Gestures (drag, tap, hover)
- ✅ Layout animations automáticas
- ✅ SVG animations
- ✅ Scroll animations
- ✅ Spring physics

#### Uso no ROI Labs:
```typescript
import { motion } from 'framer-motion';

// Fade in ao scroll
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <ProductCard />
</motion.div>

// Stagger children
<motion.div
  variants={container}
  initial="hidden"
  animate="visible"
>
  {products.map((product) => (
    <motion.div key={product.id} variants={item}>
      {product.name}
    </motion.div>
  ))}
</motion.div>

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

**Casos de uso:**
- Hero animations
- Card hover effects
- Page transitions
- Modal animations
- Scroll reveals
- Product showcases

---

### 2. GSAP (GreenSock) ⭐ SECONDARY
**Versão:** 3.x
**Site:** https://greensock.com/gsap/

#### Por que adicionar:
- ✅ Scroll animations complexas
- ✅ Timeline animations
- ✅ Performance superior
- ✅ ScrollTrigger plugin
- ✅ Morphing SVG

#### Uso no ROI Labs:
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

useEffect(() => {
  // Parallax background
  gsap.to('.hero-bg', {
    yPercent: 50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}, []);
```

**Casos de uso:**
- Parallax effects
- Complex scroll animations
- Timeline sequences
- SVG morphing
- Number counters (stats section)

---

### 3. Lottie (Bodymovin)
**Biblioteca:** lottie-react
**Site:** https://airbnb.design/lottie/

#### Por que usar:
- ✅ Animações vetoriais (After Effects)
- ✅ Pequeno tamanho
- ✅ Escalável
- ✅ Controlável via código

#### Uso no ROI Labs:
```typescript
import Lottie from 'lottie-react';
import loadingAnimation from './loading.json';

<Lottie
  animationData={loadingAnimation}
  loop
  style={{ width: 200, height: 200 }}
/>
```

**Casos de uso:**
- Loading animations
- Icon animations
- Illustrations
- Success/Error states
- Product feature highlights

---

### 4. Auto Animate
**Site:** https://auto-animate.formkit.com/

#### Por que usar:
- ✅ Zero config
- ✅ Automatic transitions
- ✅ Tiny (2kb)
- ✅ List animations

#### Uso no ROI Labs:
```typescript
import { useAutoAnimate } from '@formkit/auto-animate/react';

function ProductList() {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent}>
      {products.map(p => <ProductCard key={p.id} {...p} />)}
    </div>
  );
}
```

**Casos de uso:**
- List reordering
- FAQ accordions
- Filter results
- Shopping cart

---

## 🎨 UI Component Libraries

### 1. shadcn/ui ⭐ PRIMARY
**Status:** Já implementado
**Site:** https://ui.shadcn.com/

#### Componentes a adicionar:
- [ ] Command (search)
- [ ] Combobox (filtros)
- [ ] Data Table (comparisons)
- [ ] Date Picker (scheduling)
- [ ] Navigation Menu (mega menu)
- [ ] Tabs (product features)
- [ ] Carousel (testimonials)
- [ ] Sheet (mobile menu)
- [ ] Drawer (filters)
- [ ] Pagination (blog)

---

### 2. Radix UI Primitives
**Site:** https://www.radix-ui.com/

#### Adicionar:
- [ ] Accordion (FAQ)
- [ ] Collapsible (sidebar)
- [ ] Context Menu (right-click)
- [ ] Hover Card (tooltips ricos)
- [ ] Menubar (top nav)
- [ ] Progress (loading)
- [ ] Radio Group (plans)
- [ ] Scroll Area (content)
- [ ] Slider (pricing)
- [ ] Toggle Group (filters)

---

### 3. Aceternity UI ⭐ PREMIUM EFFECTS
**Site:** https://ui.aceternity.com/

#### Componentes Premium:
- [ ] Hero Section com gradientes
- [ ] Bento Grid (features)
- [ ] Card Hover Effect (3D tilt)
- [ ] Spotlight Effect
- [ ] Background Beams
- [ ] Lamp Effect
- [ ] Meteors Effect
- [ ] Tracing Beam (timeline)

**Aplicação:**
- Hero sections premium
- Product pages destacadas
- Landing pages especiais

---

### 4. Magic UI
**Site:** https://magicui.design/

#### Efeitos Interessantes:
- [ ] Animated Grid Pattern
- [ ] Particles Background
- [ ] Ripple Effect
- [ ] Shine Border
- [ ] Text Reveal
- [ ] Dock (macOS style)
- [ ] Globe (3D)

---

## 🌐 3D e Visual Effects

### 1. Three.js + React Three Fiber ⭐
**Site:** https://docs.pmnd.rs/react-three-fiber/

#### Por que usar:
- ✅ 3D backgrounds
- ✅ Product visualizations
- ✅ Interactive experiences
- ✅ WebGL performance

#### Uso no ROI Labs:
```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function HeroBackground() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <Environment preset="sunset" />
    </Canvas>
  );
}
```

**Casos de uso:**
- Hero 3D background
- Product 3D models
- Interactive dashboards
- Data visualizations

---

### 2. Spline
**Site:** https://spline.design/

#### Por que considerar:
- ✅ No-code 3D design
- ✅ Export to React
- ✅ Interactive controls
- ✅ Animations included

**Casos de uso:**
- Hero objects
- Product illustrations
- Feature highlights
- Coming soon pages

---

### 3. Particles.js
**Biblioteca:** tsparticles
**Site:** https://particles.js.org/

#### Por que usar:
- ✅ Lightweight
- ✅ Configurable
- ✅ Performance

```typescript
import Particles from "react-particles";

<Particles
  options={{
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      move: { enable: true, speed: 1 }
    }
  }}
/>
```

**Casos de uso:**
- Background effects
- Hero sections
- Loading states

---

## 📦 Outras Bibliotecas Essenciais

### State Management
- **Zustand** (já implementado)
  - Leve (3kb)
  - Simples
  - TypeScript first

### Forms
- **React Hook Form** + **Zod**
  - Performance
  - Validation
  - Type-safe

### Data Fetching
- **TanStack Query** (React Query)
  - Cache automático
  - Refetching
  - Optimistic updates

### Utils
- **clsx** + **tailwind-merge** (já implementado)
- **date-fns** (datas)
- **numeral** (formatação de números)

---

## 🎯 Stack Final Recomendado

### Core
```json
{
  "next": "16.1.1",
  "react": "19.2.3",
  "typescript": "5.x",
  "tailwindcss": "^4"
}
```

### Animations
```json
{
  "framer-motion": "^12",
  "gsap": "^3",
  "lottie-react": "^2",
  "@formkit/auto-animate": "^0.8"
}
```

### UI
```json
{
  "@radix-ui/react-*": "latest",
  "lucide-react": "latest",
  "class-variance-authority": "^0.7",
  "clsx": "^2",
  "tailwind-merge": "^3"
}
```

### 3D & Effects
```json
{
  "@react-three/fiber": "^8",
  "@react-three/drei": "^9",
  "three": "^0.160",
  "tsparticles": "^3"
}
```

### Forms & Validation
```json
{
  "react-hook-form": "^7",
  "zod": "^4",
  "@hookform/resolvers": "^5"
}
```

### State & Data
```json
{
  "zustand": "^5",
  "@tanstack/react-query": "^5"
}
```

### Utils
```json
{
  "date-fns": "^4",
  "numeral": "^2"
}
```

---

## ✅ Decisões Técnicas

### ✅ Confirmado
- Next.js 15 App Router
- TypeScript strict mode
- Tailwind CSS v4
- Framer Motion
- shadcn/ui
- Zustand

### 🤔 A Avaliar
- GSAP vs apenas Framer Motion
- Three.js (complexidade vs impacto visual)
- Spline (custo vs benefício)
- TanStack Query (necessário?)

### ❌ Descartado
- Redux (overkill)
- Styled Components (Tailwind melhor)
- Material UI (não combina com design)
- jQuery (não preciso comentar)

---

## 📊 Próximos Passos

- [ ] Instalar dependências básicas
- [ ] Configurar Framer Motion
- [ ] Testar GSAP ScrollTrigger
- [ ] Explorar Aceternity UI components
- [ ] Criar demo com Three.js
- [ ] Documentar padrões de código

---

**Última Atualização:** 2026-01-11
**Responsável:** Claude AI
**Status:** 60% completo
