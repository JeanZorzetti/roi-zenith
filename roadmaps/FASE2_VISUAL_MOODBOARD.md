# 🎨 FASE 2.2 - Visual Moodboard & Design References

**Status:** 🟢 Em Progresso
**Data Início:** 2026-01-11

---

## 📋 Objetivo

Criar um moodboard visual abrangente que captura a essência premium e moderna do ROI Labs, baseado nas referências da Fase 1 e no design system implementado.

**Visual Keywords:** Dark Premium, Modern, Clean, Professional, Sophisticated, Tech-Forward

---

## 🎨 Paleta de Cores - Visual Reference

### Dark Premium Base

**Background Layers:**
```
█████ Pure Black (#000000)
  ↓ Main canvas, deepest background
█████ Surface (#0A0A0A)
  ↓ Cards, elevated elements
█████ Surface Elevated (#141414)
  ↓ Modals, popovers, tooltips
█████ Hover (#1A1A1A)
  ↓ Interactive states
```

**Visual Style:** Similar a Linear.app - fundo preto profundo com camadas sutis de cinza

---

### Product Colors - Hero Examples

#### Sirius CRM - Indigo/Purple
```
╔═══════════════════════════════╗
║                               ║
║   🌟 SIRIUS CRM               ║
║                               ║
║   Gradient: #6366F1 → #8B5CF6 ║
║   Premium purple glow         ║
║                               ║
╚═══════════════════════════════╝
```

**Visual Reference:** Stripe's purple accent + Vercel's gradient style
**Glow Effect:** Soft purple halo (0 0 40px rgba(99, 102, 241, 0.3))

#### Orion ERP - Emerald/Teal
```
╔═══════════════════════════════╗
║                               ║
║   📦 ORION ERP                ║
║                               ║
║   Gradient: #10B981 → #14B8A6 ║
║   Fresh green energy          ║
║                               ║
╚═══════════════════════════════╝
```

**Visual Reference:** Linear's green accents + clean emerald
**Effect:** Professional, trustworthy, growth-oriented

#### Vértice Marketing - Amber/Red
```
╔═══════════════════════════════╗
║                               ║
║   📣 VÉRTICE MARKETING        ║
║                               ║
║   Gradient: #F59E0B → #EF4444 ║
║   Energetic warmth            ║
║                               ║
╚═══════════════════════════════╝
```

**Visual Reference:** Vercel's warm accents + Monday.com vibrancy
**Effect:** Dynamic, creative, attention-grabbing

#### PCP Industrial - Yellow/Gray
```
╔═══════════════════════════════╗
║                               ║
║   ⚙️ PCP INDUSTRIAL           ║
║                               ║
║   Gradient: #EAB308 → #71717A ║
║   Industrial strength         ║
║                               ║
╚═══════════════════════════════╝
```

**Visual Reference:** Professional yellow + industrial gray
**Effect:** Robust, engineered, reliable

#### BPO Financeiro - Teal/Blue
```
╔═══════════════════════════════╗
║                               ║
║   💰 BPO FINANCEIRO           ║
║                               ║
║   Gradient: #059669 → #3B82F6 ║
║   Financial confidence        ║
║                               ║
╚═══════════════════════════════╝
```

**Visual Reference:** Stripe's trust blue + financial green
**Effect:** Secure, professional, trustworthy

---

## 🖼️ Hero Sections - Visual Concepts

### Concept 1: Minimalist with Gradient Glow

```
┌────────────────────────────────────────────────────────────┐
│                    [subtle gradient glow]                   │
│                                                             │
│                                                             │
│                    ROI Labs.                                │
│                    Ecossistema.                             │
│                    Empresarial.                             │
│                                                             │
│          Cinco soluções integradas. Uma plataforma.         │
│                                                             │
│          [Agendar Demo]  [Ver Soluções →]                   │
│                                                             │
│                                                             │
│                    [scroll indicator ↓]                      │
└────────────────────────────────────────────────────────────┘
```

**Reference:** Linear's hero - minimal, centered, powerful
**Animation:** Fade in up, stagger text lines (0.2s delay each)
**Background:** Pure black with radial gradient glow (subtle purple/blue)

---

### Concept 2: 3D Background with Floating Elements

```
┌────────────────────────────────────────────────────────────┐
│  [Abstract 3D shapes floating]    [Particles drifting]     │
│                                                             │
│                                                             │
│              ROI Labs. Ecossistema. Empresarial.            │
│                                                             │
│      Transforme sua operação com tecnologia integrada       │
│                                                             │
│          [Agendar Demo]  [Explorar Produtos]                │
│                                                             │
│    [5 Soluções]  [+100% Eficiência]  [24/7 Suporte]        │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Reference:** Framer's 3D backgrounds + Vercel's depth
**Tech:** React Three Fiber (simple geometric shapes)
**Animation:** Slow rotation, parallax on mouse move

---

### Concept 3: Split Screen with Product Preview

```
┌──────────────────────────┬─────────────────────────────────┐
│                          │  [Dashboard Screenshot]         │
│  ROI Labs.               │  [Animated transitions between  │
│  Ecossistema.            │   product screenshots]          │
│  Empresarial.            │                                 │
│                          │  → Sirius CRM                   │
│  5 soluções que          │  → Orion ERP                    │
│  trabalham juntas        │  → Vértice Marketing            │
│                          │                                 │
│  [Agendar Demo]          │                                 │
│  [Ver Produtos]          │                                 │
└──────────────────────────┴─────────────────────────────────┘
```

**Reference:** Notion's content-first + Stripe's product showcase
**Animation:** Screenshot crossfade carousel (5s intervals)

---

## 🃏 Card Components - Visual Styles

### Glass Card (Primary Style)

```
┌─────────────────────────────────────┐
│  [subtle white border, 5% opacity]  │
│  [backdrop blur: 12px]              │
│                                     │
│  🌟  Sirius CRM                     │
│      [Available]                    │
│                                     │
│  Gestão completa de                 │
│  relacionamento com clientes        │
│                                     │
│  • Pipeline visual                  │
│  • Automação de marketing           │
│  • Analytics avançado               │
│                                     │
│  Conhecer Sirius CRM →              │
│                                     │
└─────────────────────────────────────┘
  [shadow glow on hover]
  [subtle lift effect: -4px]
```

**Reference:** Linear's cards + glassmorphism trend
**Hover Animation:**
- Transform: translateY(-4px)
- Border: white/20% opacity
- Shadow: 0 0 40px rgba(255,255,255,0.1)
- Duration: 300ms, ease-smooth

---

### Premium Product Card (Featured)

```
╔═════════════════════════════════════╗
║  [gradient border: product color]   ║
║  [larger size: 1.2x]                ║
║                                     ║
║  🌟 SIRIUS CRM                      ║
║     ⭐ Destaque                      ║
║                                     ║
║  A solução completa para gestão de  ║
║  relacionamento com clientes que    ║
║  transforma vendas                  ║
║                                     ║
║  ✓ +45% conversão (média)           ║
║  ✓ Automação inteligente            ║
║  ✓ Insights preditivos              ║
║                                     ║
║  [Começar Teste Grátis]             ║
║  [Agendar Demo]                     ║
║                                     ║
╚═════════════════════════════════════╝
```

**Reference:** Stripe's pricing cards + Vercel's featured cards
**Special Effects:**
- Animated gradient border (slow rotation)
- Stronger glow effect
- Subtle 3D tilt on hover (1-2 degrees)

---

## 🎭 Button Styles - Visual Examples

### Primary CTA (Main Actions)

```
┌─────────────────────────┐
│                         │
│  Agendar demonstração   │
│  [white bg, black text] │
│                         │
└─────────────────────────┘
   [glow shadow below]
```

**Hover Effect:**
```
┌─────────────────────────┐
│    [lift -2px]          │
│  Agendar demonstração   │
│  [white 90% opacity]    │
│    [glow increases]     │
└─────────────────────────┘
```

**Reference:** Apple's primary buttons + premium feel
**Shadow:** 0 10px 30px rgba(255,255,255,0.3)

---

### Secondary CTA (Alternative Actions)

```
┌─────────────────────────┐
│  [border: white 30%]    │
│  Ver como funciona      │
│  [transparent bg]       │
└─────────────────────────┘
```

**Hover Effect:**
```
┌─────────────────────────┐
│  [fill animation]       │
│  Ver como funciona      │
│  [white fills L→R]      │
│  [text: black]          │
└─────────────────────────┘
```

**Reference:** Linear's outline buttons + elegant fill animation
**Animation:** Scale-X from 0 to 1, origin left, 300ms

---

## 📐 Layout Patterns

### Homepage Layout Structure

```
┌────────────────────────────────────────────────────────────┐
│  HEADER (sticky, blur backdrop)                            │
│  [ROI Labs] [Produtos ▾] [Soluções ▾] [Preços] [Login]    │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO SECTION                                              │
│  [Full viewport height]                                    │
│  [Centered content, max-w-1024px]                          │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  PRODUCTS SHOWCASE                                         │
│  [Grid: 2 cols mobile, 3 cols desktop]                    │
│  [Featured card: full width top]                           │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  VALUE PROPOSITION                                         │
│  [Alternating left-right layout]                           │
│  [Image/screenshot + text]                                 │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  STATS SECTION                                             │
│  [3 columns, centered]                                     │
│  [Animated counters on scroll]                             │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  TESTIMONIALS                                              │
│  [Carousel, 3 visible on desktop]                          │
│  [Auto-play, 5s interval]                                  │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  CTA SECTION                                               │
│  [Centered, max-w-768px]                                   │
│  [Gradient glow background]                                │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  FOOTER (5 columns)                                        │
│  [Logo + Products + Solutions + Resources + Legal]         │
│  [Newsletter signup]                                       │
│  [Social links]                                            │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Reference:** Combination of Linear (minimal), Stripe (spacious), Vercel (modern)

---

## 🎬 Animation Showcase

### Page Load Sequence

```
1. [0.0s] Page background fades in
2. [0.2s] Navigation fades in from top
3. [0.5s] Hero title line 1: "ROI Labs."
4. [0.7s] Hero title line 2: "Ecossistema."
5. [0.9s] Hero title line 3: "Empresarial."
6. [1.1s] Hero subtitle fades in
7. [1.3s] CTAs fade in + scale from 95% to 100%
8. [1.5s] Scroll indicator pulse animation starts
```

**Visual Reference:** Framer's orchestrated animations
**Easing:** cubic-bezier(0.25, 0.1, 0.25, 1) - "The ROI Flow"

---

### Scroll Reveal Pattern

```
[Element enters viewport]
    ↓
[100px before visible]
    ↓
[Trigger: opacity 0 → 1, translateY(50px) → 0]
    ↓
[Duration: 700ms]
    ↓
[Element fully visible]
```

**Applied to:**
- Product cards (stagger: 150ms between each)
- Feature sections
- Stat numbers (with counter animation)
- Testimonial cards

**Reference:** Linear's scroll reveals + Apple's timing

---

### Hover Interactions

#### Magnetic Button (Subtle)
```
[Cursor approaches within 50px]
    ↓
[Button moves toward cursor: max 5px]
    ↓
[Spring physics: stiffness 200, damping 20]
```

**Reference:** Apple's magnetic interactions
**Library:** Framer Motion useMotionValue + useSpring

#### Card Hover (3D Tilt)
```
[Mouse enters card]
    ↓
[Calculate mouse position relative to card center]
    ↓
[rotateX: -5° to +5°]
[rotateY: -5° to +5°]
    ↓
[Transform: perspective(1000px)]
```

**Reference:** Apple product cards
**Library:** React useMousePosition + Framer Motion transform

---

## 🖼️ Imagery Guidelines

### Photography Style

**Do's:**
✅ High contrast, dramatic lighting
✅ Modern office environments
✅ Clean, minimal backgrounds
✅ Focus on technology/screens
✅ Authentic, not staged
✅ Dark tones preferred

**Don'ts:**
❌ Overly bright/saturated
❌ Cheesy stock photos
❌ Cluttered backgrounds
❌ Dated aesthetics
❌ Generic handshakes

---

### Screenshot Guidelines

**Product Screenshots:**
- Dark UI preferred (matches brand)
- Show actual functionality, not mockups
- Highlight key features with subtle annotations
- Use realistic data (not "lorem ipsum")
- Shadow/border to separate from background
- 2x resolution for retina displays

**Example Framing:**
```
┌────────────────────────────────────────┐
│ [Subtle shadow around entire image]    │
│                                        │
│  ┌──────────────────────────────┐     │
│  │  [Actual UI Screenshot]      │     │
│  │  [Dark theme]                │     │
│  │  [Clear, readable]           │     │
│  │                              │     │
│  └──────────────────────────────┘     │
│                                        │
└────────────────────────────────────────┘
```

---

## 🎨 Iconography

### Icon Style

**Primary:** Lucide React (already included)
- Stroke width: 2px (default)
- Size: 24px (default)
- Style: Outlined, minimal

**Custom Icons (when needed):**
- Match Lucide's style
- Consistent stroke width
- Geometric, clean lines
- 24x24px artboard

**Product Icons:**
```
Sirius CRM:    ⭐ Star (constellation theme)
Orion ERP:     📊 Grid/System
Vértice:       📈 Triangle/Peak
PCP:           ⚙️ Gear/Cog
BPO:           💼 Shield/Security
```

---

## 📊 Visual Hierarchy Examples

### Product Page Hero

```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│  [Badge] Disponível Agora                                  │
│                                                             │
│  🌟 Sirius CRM                                             │
│  ═══════════                                               │
│  O CRM que vende por você                                  │
│  ───────────────────────                                   │
│                                                             │
│  Pare de perder vendas por desorganização.                 │
│  O Sirius CRM organiza leads, automatiza follow-ups        │
│  e prevê faturamento com precisão.                         │
│                                                             │
│  [Começar Teste Grátis]  [Agendar Demo]                    │
│                                                             │
│  ✓ 45% mais conversões  ✓ Setup em 5min  ✓ Sem cartão     │
│                                                             │
└────────────────────────────────────────────────────────────┘

VISUAL HIERARCHY:
1. Badge (small, subtle) - 12px, uppercase
2. Product name + icon - 64px, thin weight
3. Headline - 48px, light weight
4. Subheadline - 24px, light weight, secondary color
5. Body copy - 20px, light weight, secondary color
6. CTAs - 18px, medium spacing
7. Trust indicators - 16px, tertiary color
```

---

## 🎯 Comparison: Before vs. After

### Current Site (SDR AI) → New Site (ROI Labs)

**Before (SDR AI):**
- Single product focus
- Chat demo central
- Simple gradient background
- Limited visual hierarchy
- Basic card styling

**After (ROI Labs):**
- Multi-product ecosystem
- Premium dark theme
- Sophisticated animations
- Clear visual hierarchy
- Glass morphism, glow effects
- Product-specific colors
- Professional polish

---

## 🌈 Gradient Usage Guide

### When to Use Gradients

**✅ Good Uses:**
- Product color accents (badges, hover states)
- Subtle background glows
- Button hover effects
- Featured card borders
- Hero background (very subtle)

**❌ Avoid:**
- Overpowering backgrounds
- Text on complex gradients
- Too many gradients at once
- High contrast gradients

### Example Applications

**Subtle Background Glow:**
```css
background: radial-gradient(
  circle at 50% 0%,
  rgba(99, 102, 241, 0.05) 0%,
  transparent 50%
);
```

**Product Badge:**
```css
background: linear-gradient(
  135deg,
  rgba(99, 102, 241, 0.1) 0%,
  rgba(139, 92, 246, 0.1) 100%
);
border: 1px solid rgba(99, 102, 241, 0.3);
```

---

## 📱 Responsive Adaptations

### Mobile Optimizations

**Hero Section:**
```
Desktop (1280px+):    3 lines, large text, side-by-side CTAs
Tablet (768-1279px):  3 lines, medium text, side-by-side CTAs
Mobile (< 768px):     3 lines, smaller text, stacked CTAs
```

**Product Grid:**
```
Desktop: 3 columns
Tablet:  2 columns
Mobile:  1 column (cards full width)
```

**Animations:**
```
Desktop: All animations enabled
Mobile:  Simplified animations, respect prefers-reduced-motion
```

---

## ✅ Deliverables Checklist

### Visual Assets Needed (Future)

**Logos:**
- [ ] Horizontal logo (white on dark)
- [ ] Vertical logo (stacked)
- [ ] Icon only (favicon)
- [ ] Product logos (5x)

**Graphics:**
- [ ] Hero background variations (3D/gradient/video)
- [ ] Product screenshots (high-res, dark theme)
- [ ] Illustration set (optional)
- [ ] Icon set (custom, if needed)

**Templates:**
- [ ] Email templates (matching brand)
- [ ] Social media graphics (OG images)
- [ ] Presentation deck (sales)

---

## 🎨 Figma File Structure (Recommendation)

```
ROI_Labs_Design_System.fig
│
├── 📄 Cover (Brand overview)
├── 🎨 Design Tokens (All variables)
├── 🧩 Components
│   ├── Buttons
│   ├── Cards
│   ├── Forms
│   ├── Navigation
│   └── Misc
├── 📱 Pages
│   ├── Homepage
│   ├── Sirius CRM
│   ├── Orion ERP
│   ├── Vértice Marketing
│   ├── PCP Industrial
│   ├── BPO Financeiro
│   ├── About
│   └── Contact
└── 📐 Specs (Developer handoff)
```

---

## 🔗 Reference Links

**Direct Inspirations:**
- Linear.app - Overall aesthetic, dark theme
- Stripe.com - Typography, spacing, professionalism
- Vercel.com - Gradients, modern feel
- Framer.com - Animations, interactions
- Notion.so - Simplicity, content-first

**Additional References:**
- Apple.com - Polish, attention to detail
- Figma.com - Clean UI, clear hierarchy
- Dropbox.com - Premium feel, trust
- Webflow.com - Modern SaaS aesthetic

---

**Última Atualização:** 2026-01-11
**Responsável:** Claude AI
**Status:** Documentação completa - Pronto para implementação ou Figma
**Próximo:** Logo guidelines + Wireframes detalhados
