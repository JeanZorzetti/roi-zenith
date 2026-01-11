# 🎯 FASE 2.3 - Logo Guidelines & Visual Identity

**Status:** 🟢 Em Progresso
**Data Início:** 2026-01-11

---

## 📋 Logo Principal - ROI LABS

### Especificações Técnicas

**Versão Atual (Simplificada):**
```
R O I   L A B S
```

**Características:**
- Font: Inter Variable, Weight 200 (Thin)
- Letter-spacing: 0.3rem (30% larger)
- All caps (UPPERCASE)
- Monospace feel sem ser monospace font
- Minimalista, modern, tech-forward

**Código CSS:**
```css
.logo {
  font-family: 'Inter Variable', 'Inter', sans-serif;
  font-weight: 200;
  letter-spacing: 0.3rem;
  font-size: 24px; /* Base size */
  text-transform: uppercase;
}
```

---

## 🎨 Logo Variations

### 1. Primary Logo (Horizontal)

**Uso:** Header, Footer, Marketing materials

```
┌─────────────────────────────┐
│                             │
│   R O I   L A B S           │
│                             │
└─────────────────────────────┘
```

**Specifications:**
- Minimum width: 120px
- Clear space: 1.5x altura da letra em todos os lados
- Background: Dark (preferred) or Light
- Color: White (#FFFFFF) ou Black (#000000)

---

### 2. Logo with Tagline

**Uso:** First impressions, Brand awareness campaigns

```
┌─────────────────────────────┐
│                             │
│   R O I   L A B S           │
│                             │
│   Ecossistema Empresarial   │
│                             │
└─────────────────────────────┘
```

**Tagline Specs:**
- Font: Inter Variable, Weight 300 (Light)
- Letter-spacing: 0.1rem
- Font-size: 40% do logo principal
- Color: 70% opacity do logo color
- Positioning: Centered below, 0.5rem gap

**Código CSS:**
```css
.logo-tagline {
  font-family: 'Inter Variable', 'Inter', sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  font-size: 0.4em; /* Relative to logo size */
  opacity: 0.7;
  margin-top: 0.5rem;
}
```

---

### 3. Compact Logo (Navigation)

**Uso:** Sticky header (scrolled), Mobile

```
┌──────────────────┐
│                  │
│  R O I  L A B S  │
│                  │
└──────────────────┘
```

**Specifications:**
- Reduced letter-spacing: 0.2rem
- Slightly smaller size (80% of primary)
- Transitions smoothly on scroll
- Animation: ease-smooth, 300ms

---

### 4. Vertical Logo

**Uso:** Sidebar, Narrow spaces, Square formats

```
┌──────────┐
│          │
│   R O I  │
│          │
│   L A B S│
│          │
└──────────┘
```

**Specifications:**
- Line-height: 1.2
- Letter-spacing: 0.2rem (reduced)
- Center aligned
- Square aspect ratio preferred

---

### 5. Icon Only (Future)

**Uso:** Favicon, App icon, Social media profile

```
┌──────┐
│      │
│  RL  │
│      │
└──────┘
```

**Specifications:**
- Initials "RL" em monograma
- Font: Inter Variable, Weight 600 (Semibold)
- Opcional: Geometric shape container
- Sizes: 16x16, 32x32, 64x64, 128x128, 512x512px

**Alternative Concept:**
```
┌──────┐
│ ╔══╗ │
│ ║RL║ │
│ ╚══╝ │
└──────┘
```

---

## 🌈 Logo Color Variations

### On Dark Backgrounds (Primary)

```css
color: #FFFFFF;
text-shadow: 0 0 20px rgba(255, 255, 255, 0.1); /* Subtle glow */
```

**Visual:**
```
████████████████████████████
████████████████████████████
████ R O I  L A B S ████████
████████████████████████████
████████████████████████████
```

---

### On Light Backgrounds (Alternative)

```css
color: #000000;
text-shadow: none;
```

**Visual:**
```


    R O I  L A B S


```

**Use Case:** Documentos impressos, Apresentações, Áreas claras do site

---

### Gradient Version (Premium)

**Uso:** Marketing especial, Hero sections, Featured content

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

**Visual Effect:** Texto com gradiente purple/blue
**Quando usar:** Destaque especial, não para uso geral

---

## 📏 Spacing & Clear Space

### Minimum Clear Space

```
        [1.5x altura]
             ↓
    ← → R O I  L A B S ← →
        [1.5x altura]
             ↑
```

**Rule:** Nenhum elemento (texto, imagem, borda) pode entrar na zona de clear space

**Measurement:** 1.5x a altura da letra "R"

---

### Alignment Guidelines

**Horizontal Alignment:**
- Center: Preferred para hero sections, marketing
- Left: Preferred para header navigation
- Right: Avoid (feels unbalanced)

**Vertical Alignment:**
- Middle: Preferred para botões, badges
- Baseline: Typography alignment
- Top/Bottom: Contextual

---

## ⚙️ Logo Usage Rules

### ✅ DO's

**Correct Usage:**
1. Use em fundos dark (preferencial)
2. Manter proporções originais
3. Usar versão compacta em espaços pequenos
4. Aplicar glow sutil em dark backgrounds
5. Manter clear space adequado
6. Usar Inter Variable font sempre

**Examples:**
```
✓ White logo on pure black (#000000)
✓ White logo on dark gray (#0A0A0A)
✓ Black logo on white (#FFFFFF)
✓ Gradient logo em hero sections especiais
✓ Compact version no header sticky
```

---

### ❌ DON'Ts

**Incorrect Usage:**
1. ❌ NÃO distorcer proporções (stretch/squash)
2. ❌ NÃO mudar a font
3. ❌ NÃO adicionar efeitos pesados (3D, bevel)
4. ❌ NÃO usar cores fora do guide (exceto gradient aprovado)
5. ❌ NÃO colocar em backgrounds complexos sem contraste
6. ❌ NÃO usar tamanho menor que minimum (120px)
7. ❌ NÃO adicionar borders ou containers não aprovados
8. ❌ NÃO animar de forma exagerada

**Examples:**
```
✗ Logo stretched horizontalmente
✗ Logo em Arial ou outra font
✗ Logo com drop shadow pesado
✗ Logo roxo ou verde (apenas gradiente approved)
✗ Logo sobre imagem sem overlay escuro
✗ Logo com 80px width (muito pequeno)
✗ Logo com box border não aprovado
✗ Logo com bounce animation (não profissional)
```

---

## 🎭 Product Logos

### Individual Product Branding

Cada produto tem sua identidade visual dentro do ecossistema ROI Labs:

#### Sirius CRM

```
┌─────────────────────────────────┐
│  🌟                             │
│     S I R I U S   C R M         │
│                                 │
└─────────────────────────────────┘
```

**Specifications:**
- Icon: Star (⭐) ou constellation graphic
- Color: #6366F1 (Indigo)
- Font: Inter Variable, Weight 300
- Letter-spacing: 0.2rem

---

#### Orion ERP

```
┌─────────────────────────────────┐
│  📊                             │
│     O R I O N   E R P           │
│                                 │
└─────────────────────────────────┘
```

**Specifications:**
- Icon: Grid/System (📊)
- Color: #10B981 (Emerald)
- Font: Inter Variable, Weight 300
- Letter-spacing: 0.2rem

---

#### Vértice Marketing

```
┌─────────────────────────────────┐
│  📈                             │
│   V É R T I C E                 │
│   Marketing Automation          │
│                                 │
└─────────────────────────────────┘
```

**Specifications:**
- Icon: Triangle/Peak (📈)
- Color: #F59E0B (Amber)
- Font: Inter Variable, Weight 300
- Subtitle: Weight 200, 70% opacity
- Letter-spacing: 0.2rem

---

#### PCP Industrial

```
┌─────────────────────────────────┐
│  ⚙️                             │
│   [ N O M E ]   P C P           │
│   Industrial                    │
│                                 │
└─────────────────────────────────┘
```

**Specifications:**
- Icon: Gear/Cog (⚙️)
- Color: #EAB308 (Yellow)
- Font: Inter Variable, Weight 300
- Subtitle: Weight 200, 70% opacity
- Letter-spacing: 0.2rem
- Nome ainda a definir

---

#### BPO Financeiro

```
┌─────────────────────────────────┐
│  💼                             │
│   [ N O M E ]   B P O           │
│   Financeiro                    │
│                                 │
└─────────────────────────────────┘
```

**Specifications:**
- Icon: Shield/Security (💼 ou 🛡️)
- Color: #059669 (Teal)
- Font: Inter Variable, Weight 300
- Subtitle: Weight 200, 70% opacity
- Letter-spacing: 0.2rem
- Nome ainda a definir

---

## 📱 Responsive Logo Behavior

### Breakpoint Adaptations

**Desktop (1280px+):**
```
Header: Primary logo (full size, 24px base)
Footer: Primary logo with tagline
```

**Tablet (768-1279px):**
```
Header: Primary logo (reduced, 20px base)
Footer: Primary logo (no tagline)
```

**Mobile (< 768px):**
```
Header: Compact logo (16px base)
Footer: Vertical logo
```

---

### Scroll Behavior (Sticky Header)

**State 1: Top of page**
```css
.logo {
  font-size: 24px;
  letter-spacing: 0.3rem;
  transition: all 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

**State 2: Scrolled**
```css
.logo.scrolled {
  font-size: 20px;
  letter-spacing: 0.2rem;
}
```

**Animation:** Smooth transition, 300ms, ease-smooth

---

## 🎨 Logo Backgrounds

### Approved Background Styles

**1. Pure Black (Preferred)**
```
background: #000000;
```
**Use:** Main site, headers, footers, dark sections

**2. Dark Gradient**
```
background: linear-gradient(135deg, #000000 0%, #0A0A0A 100%);
```
**Use:** Hero sections, feature backgrounds

**3. White (Alternative)**
```
background: #FFFFFF;
```
**Use:** Documents, light mode (if implemented), print

**4. Glass Background**
```
background: rgba(255, 255, 255, 0.02);
backdrop-filter: blur(12px);
```
**Use:** Overlay navigation, modals

---

### Background Color Contrast

**Minimum Contrast Ratios (WCAG AA):**
- Logo on dark: 4.5:1 minimum
- Logo on light: 4.5:1 minimum

**Testing:**
```
White (#FFFFFF) on Pure Black (#000000) = 21:1 ✓
Black (#000000) on White (#FFFFFF) = 21:1 ✓
White on Dark Gray (#0A0A0A) = 20:1 ✓
```

---

## 🛠️ Implementation Code

### React Component (Logo)

```tsx
interface LogoProps {
  variant?: 'primary' | 'compact' | 'vertical';
  withTagline?: boolean;
  className?: string;
}

export function Logo({
  variant = 'primary',
  withTagline = false,
  className = ''
}: LogoProps) {
  const baseClass = "font-thin tracking-[0.3rem] uppercase";

  if (variant === 'vertical') {
    return (
      <div className={`${baseClass} ${className} text-center leading-tight`}>
        <div>ROI</div>
        <div>LABS</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={`${baseClass} ${variant === 'compact' ? 'tracking-[0.2rem]' : ''}`}>
        ROI LABS
      </div>
      {withTagline && (
        <div className="text-sm font-light tracking-wider opacity-70 mt-2">
          Ecossistema Empresarial
        </div>
      )}
    </div>
  );
}
```

---

### CSS Animation (Scroll)

```css
.logo {
  font-family: 'Inter Variable', 'Inter', sans-serif;
  font-weight: 200;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  font-size: 24px;
  transition: all 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
}

.logo.scrolled {
  font-size: 20px;
  letter-spacing: 0.2rem;
}

/* Dark background glow */
.logo-on-dark {
  color: #FFFFFF;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

/* Light background */
.logo-on-light {
  color: #000000;
  text-shadow: none;
}
```

---

## 📐 Export Specifications

### Vector Formats (Future - when designed)

**SVG (Primary):**
- Scalable, web-friendly
- Include viewBox for responsive
- Optimize paths
- Embed fonts or convert to paths

**EPS/AI:**
- Print materials
- High-resolution
- Preserved typography

---

### Raster Formats (Future - when designed)

**PNG (Transparent background):**
- 16x16px (favicon)
- 32x32px (small icon)
- 64x64px (medium icon)
- 128x128px (large icon)
- 256x256px (retina)
- 512x512px (high-res)
- 1024x1024px (print/marketing)

**JPG (Solid background):**
- Avoid using JPG for logos (no transparency)
- Only if explicitly needed for print

---

## 🎯 Brand Consistency Checklist

### Before Using Logo:

- [ ] Correct variation for context?
- [ ] Minimum size respected (120px)?
- [ ] Clear space maintained?
- [ ] Correct color (white or black)?
- [ ] Background has adequate contrast?
- [ ] Inter Variable font loaded?
- [ ] Proportions not distorted?
- [ ] No unapproved effects added?

---

## 📚 Logo Asset Library (Future)

### File Structure
```
/assets/logos/
├── ROI_Labs_Primary_White.svg
├── ROI_Labs_Primary_Black.svg
├── ROI_Labs_Tagline_White.svg
├── ROI_Labs_Tagline_Black.svg
├── ROI_Labs_Compact_White.svg
├── ROI_Labs_Compact_Black.svg
├── ROI_Labs_Vertical_White.svg
├── ROI_Labs_Vertical_Black.svg
├── ROI_Labs_Icon.svg
├── /products/
│   ├── Sirius_CRM_Logo.svg
│   ├── Orion_ERP_Logo.svg
│   ├── Vertice_Marketing_Logo.svg
│   ├── PCP_Industrial_Logo.svg
│   └── BPO_Financeiro_Logo.svg
└── /raster/
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    └── og-image.png (1200x630)
```

---

## ✅ Next Steps

- [ ] Finalizar naming de PCP Industrial e BPO Financeiro
- [ ] Criar SVG assets profissionais (designer)
- [ ] Gerar todos os tamanhos de favicon
- [ ] Criar OG images para social media
- [ ] Testar logo em todos os breakpoints
- [ ] Implementar Logo component com variants
- [ ] Documentar no Storybook

---

**Última Atualização:** 2026-01-11
**Responsável:** Claude AI
**Status:** Guidelines completos - Aguardando assets visuais finais
**Próximo:** Wireframes das páginas principais
