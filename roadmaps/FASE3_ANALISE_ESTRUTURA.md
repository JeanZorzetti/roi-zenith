# FASE 3 - ANÁLISE DA ESTRUTURA ATUAL DO PROJETO

**Data:** 2026-01-11
**Status:** ✅ Análise Completa
**Objetivo:** Documentar estrutura existente antes de reorganizar para o redesign

---

## 📊 ESTRUTURA ATUAL

### Diretórios Principais

```
ROI_Labs/
├── .claude/                    # Configurações Claude Code
├── .git/                       # Git repository
├── .github/                    # GitHub workflows
├── app/                        # Next.js App Router
│   ├── api/                    # API routes
│   ├── favicon.ico
│   ├── globals.css             # ✅ Design System v2.0 (742 linhas)
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/                 # React components
│   ├── custom/                 # Custom components
│   │   ├── auth/              # Auth components
│   │   ├── CTASection.tsx     # ✅ Refatorado para ROI Labs
│   │   ├── CustomCursor.tsx   # ⚠️ A avaliar se mantém
│   │   ├── EasterEgg.tsx      # ⚠️ A avaliar se mantém
│   │   ├── FeaturesSection.tsx # ✅ Refatorado
│   │   ├── Footer.tsx         # ✅ Refatorado
│   │   ├── HeroSection.tsx    # ✅ Refatorado
│   │   ├── LoadingScreen.tsx  # ⚠️ Pode ser melhorado
│   │   ├── Navigation.tsx     # ⚠️ Precisa refatorar
│   │   ├── ProductShowcase.tsx # ✅ Refatorado
│   │   ├── StatsSection.tsx   # ✅ Refatorado
│   │   └── TestimonialsSection.tsx # ✅ Refatorado
│   └── ui/                    # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── sonner.tsx
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── node_modules/               # Dependencies
├── public/                     # Static files
├── roadmaps/                   # ✅ Documentação completa (6.757+ linhas)
│   ├── ROADMAP_WEBSITE_REDESIGN.md
│   ├── FASE1_PESQUISA_VISUAL.md
│   ├── FASE1_PESQUISA_TECH.md
│   ├── FASE1_COMPONENTES_UI.md
│   ├── FASE1_EFEITOS_ANIMACOES.md
│   ├── FASE1_BRAND_IDENTIDADE.md
│   ├── FASE1_ARQUITETURA_INFORMACAO.md
│   ├── FASE2_DESIGN_SYSTEM.md
│   ├── FASE2_VISUAL_MOODBOARD.md
│   ├── FASE2_LOGO_GUIDELINES.md
│   └── FASE2_WIREFRAMES.md
├── stores/                     # Zustand stores
├── nextjs-app/                 # ⚠️ Pasta duplicada? (verificar)
└── [config files]
```

---

## 📦 PACKAGE.JSON - ANÁLISE

### Dependencies (Produção)

**✅ Mantém (Essenciais):**
- `next`: 16.1.1 - Framework principal
- `react`: 19.2.3 - Library principal
- `react-dom`: 19.2.3
- `framer-motion`: 12.25.0 - Animações (PRIMARY)
- `lucide-react`: 0.562.0 - Ícones
- `tailwind-merge`: 3.4.0 - Merge classes Tailwind
- `class-variance-authority`: 0.7.1 - Variantes de componentes
- `clsx`: 2.1.1 - Conditional classes
- `zod`: 4.3.5 - Validação de schemas
- `zustand`: 5.0.9 - State management
- `react-hook-form`: 7.71.0 - Form handling
- `@hookform/resolvers`: 5.2.2
- `sonner`: 2.0.7 - Toast notifications
- `next-themes`: 0.4.6 - Theme switching

**✅ Mantém (Radix UI - Usados no shadcn/ui):**
- `@radix-ui/react-dialog`: 1.1.15
- `@radix-ui/react-label`: 2.1.8
- `@radix-ui/react-slot`: 1.2.4
- `@radix-ui/react-toast`: 1.2.15

**⚠️ Mantém mas não usar no redesign:**
- `@radix-ui/react-accordion`
- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-aspect-ratio`
- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-collapsible`
- `@radix-ui/react-context-menu`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-hover-card`
- `@radix-ui/react-menubar`
- `@radix-ui/react-navigation-menu`
- `@radix-ui/react-popover`
- `@radix-ui/react-progress`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-select`
- `@radix-ui/react-separator`
- `@radix-ui/react-slider`
- `@radix-ui/react-switch`
- `@radix-ui/react-tabs`
- `@radix-ui/react-toggle`
- `@radix-ui/react-toggle-group`
- `@radix-ui/react-tooltip`

**❌ Remover (Não serão usados):**
- `@prisma/client`: 7.2.0 - Backend removido
- `prisma`: 7.2.0 - Backend removido
- `bcryptjs`: 3.0.3 - Auth removido
- `jsonwebtoken`: 9.0.3 - Auth removido
- `socket.io-client`: 4.8.3 - Não planejado no redesign
- `@tanstack/react-query`: 5.90.16 - Desnecessário sem backend

**🔍 Avaliar se mantém:**
- `cmdk`: 1.1.1 - Command menu (pode ser útil para search)
- `date-fns`: 4.1.0 - Date manipulation (útil?)
- `embla-carousel-react`: 8.6.0 - Carousel (pode usar Framer Motion)
- `input-otp`: 1.4.2 - OTP inputs (provavelmente não)
- `react-day-picker`: 9.13.0 - Date picker (útil?)
- `react-resizable-panels`: 4.3.3 - Resizable panels (provavelmente não)
- `recharts`: 3.6.0 - Charts (útil para dashboards)
- `vaul`: 1.1.2 - Drawer component (avaliar)

### DevDependencies

**✅ Mantém (Todos essenciais):**
- `@tailwindcss/postcss`: v4 - PostCSS plugin Tailwind v4
- `tailwindcss`: v4 - Tailwind CSS v4
- `@types/*` - TypeScript types
- `eslint`: v9 - Linter
- `eslint-config-next`: 16.1.1 - Next.js ESLint config
- `typescript`: v5 - TypeScript compiler

**➕ Adicionar:**
- `prettier` - Code formatter
- `eslint-config-prettier` - Disable ESLint rules conflicting with Prettier
- `@typescript-eslint/eslint-plugin` - TypeScript ESLint rules
- `@typescript-eslint/parser` - TypeScript parser for ESLint

---

## ⚙️ CONFIGURAÇÕES

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Status:** ⚠️ Vazio - Precisa de otimizações

**Necessário adicionar:**
- Image optimization config
- Webpack optimizations
- Experimental features (se houver)
- Headers e redirects (se necessário)

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "paths": { "@/*": ["./*"] }
    // ... outras opções
  }
}
```

**Status:** ✅ Bom - Strict mode ativo, paths configurado

**Sugestões de melhoria:**
- Adicionar mais strict flags (noUncheckedIndexedAccess, etc.)
- Documentar paths adicionais se necessário

### postcss.config.mjs

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

**Status:** ✅ Correto para Tailwind v4

### Tailwind Config

**Status:** ✅ Não existe arquivo - Correto para Tailwind v4
- Tailwind v4 usa `@theme` inline no CSS
- Configuração já feita em `app/globals.css` (742 linhas)

### ESLint Config (eslint.config.mjs)

**Status:** ⚠️ Verificar conteúdo
**Ação:** Ler arquivo e validar configuração

### Prettier Config

**Status:** ❌ Não existe
**Ação:** Criar `.prettierrc` e `.prettierignore`

---

## 🗂️ ARQUIVOS LEGADOS IDENTIFICADOS

### Scripts Legados (Provavelmente remover):

```bash
create-deals.sh              # 7.7KB - Script CRM data
deploy.sh                    # 1.7KB - Deploy script
populate-crm-data.py         # 4.4KB - Python script
populate-crm-data.sh         # 3.9KB - Bash script
```

**Decisão:** ⚠️ Mover para pasta `legacy/` ou remover completamente

### Configs Docker (Avaliar necessidade):

```
docker-compose.prod.yml      # 1KB - Docker compose
nginx.conf                   # 2.9KB - Nginx config
```

**Decisão:** ⚠️ Se não está deployando via Docker, remover

### Pastas/Arquivos Suspeitos:

```
nextjs-app/                  # ⚠️ Pasta duplicada? Verificar conteúdo
.vercel-deploy-trigger       # 0 bytes - Arquivo vazio?
.vercel-trigger              # 134 bytes - Legacy?
```

**Ação:** Investigar e limpar

---

## 🎯 ESTRUTURA PROPOSTA (FASE 3.2)

### Estrutura Ideal Conforme Roadmap:

```
/app
  /(marketing)              # Páginas públicas
    /page.tsx               # Home
    /sobre/
      /page.tsx             # About
    /contato/
      /page.tsx             # Contact
    /precos/
      /page.tsx             # Pricing
  /(products)               # Páginas de produtos
    /sirius-crm/
      /page.tsx
    /orion-erp/
      /page.tsx
    /vertice-marketing/
      /page.tsx
    /pcp-industrial/
      /page.tsx             # Coming soon
    /bpo-financeiro/
      /page.tsx             # Coming soon
  /api/                     # API routes (se necessário)
  /layout.tsx               # Root layout
  /globals.css              # ✅ Já existe - Design System

/components
  /ui/                      # shadcn/ui base components
    /button.tsx
    /dialog.tsx
    /input.tsx
    /label.tsx
    /card.tsx               # Adicionar
    /badge.tsx              # Adicionar
    /accordion.tsx          # Adicionar
    /carousel.tsx           # Adicionar
    /tabs.tsx               # Adicionar
  /layout/                  # Layout components
    /Navigation.tsx
    /Footer.tsx
    /MobileMenu.tsx         # Novo
    /Header.tsx             # Novo
  /sections/                # Page sections
    /HeroSection.tsx        # ✅ Já existe
    /StatsSection.tsx       # ✅ Já existe
    /ProductsShowcase.tsx   # ✅ Já existe
    /FeaturesSection.tsx    # ✅ Já existe
    /TestimonialsSection.tsx # ✅ Já existe
    /CTASection.tsx         # ✅ Já existe
    /IntegrationSection.tsx # Novo
    /ValueProposition.tsx   # Novo
    /SocialProof.tsx        # Novo
  /products/                # Product-specific components
    /ProductCard.tsx        # Novo
    /ProductHero.tsx        # Novo
    /FeatureGrid.tsx        # Novo
    /PricingCard.tsx        # Novo
  /forms/                   # Form components
    /ContactForm.tsx        # Novo
    /DemoRequestForm.tsx    # Novo
    /NewsletterForm.tsx     # Novo
  /animations/              # Framer Motion wrappers
    /FadeIn.tsx             # Novo
    /SlideIn.tsx            # Novo
    /ScaleIn.tsx            # Novo
    /RevealOnScroll.tsx     # Novo

/lib
  /utils/
    /cn.ts                  # Class name utility (já deve existir)
    /validators.ts          # Zod schemas
    /formatters.ts          # Format utilities
  /constants/
    /products.ts            # Products data
    /navigation.ts          # Navigation links
    /site-config.ts         # Site metadata
  /hooks/
    /use-mounted.ts         # Check if mounted
    /use-scroll.ts          # Scroll position
    /use-media-query.ts     # Responsive breakpoints

/public
  /images/
    /products/              # Product screenshots
    /logos/                 # Logo variations
    /og/                    # OG images
  /videos/                  # Video demos (se houver)

/styles
  /globals.css              # ✅ Já existe no app/
  /animations.css           # ⚠️ Pode ser necessário separar

/legacy                     # Arquivos legados (temporário)
  /create-deals.sh
  /deploy.sh
  /populate-crm-data.py
  /populate-crm-data.sh
```

---

## 📋 CHECKLIST DE LIMPEZA

### Fase 3.1 - Limpar Código Legado

- [ ] Mover scripts legados para `/legacy/`
- [ ] Remover Docker configs (se não usado)
- [ ] Investigar pasta `nextjs-app/`
- [ ] Remover arquivos `.vercel-*` vazios/desnecessários
- [ ] Limpar `components/custom/auth/` se auth foi removido
- [ ] Avaliar se mantém: `CustomCursor.tsx`, `EasterEgg.tsx`, `LoadingScreen.tsx`

### Fase 3.2 - Reestruturar Pastas

- [ ] Criar estrutura de route groups: `(marketing)`, `(products)`
- [ ] Criar pastas de componentes: `layout/`, `sections/`, `products/`, `forms/`, `animations/`
- [ ] Mover componentes existentes para novas pastas
- [ ] Criar pastas em `/lib/`: `constants/`, `validators/`
- [ ] Organizar `/public/` com subpastas

### Fase 3.3 - Configurações

- [ ] Atualizar `next.config.ts` com otimizações
- [ ] Criar `.prettierrc` e `.prettierignore`
- [ ] Atualizar `.gitignore` se necessário
- [ ] Revisar `eslint.config.mjs`

### Fase 3.4 - Dependências

- [ ] Remover Prisma e dependências de backend
- [ ] Avaliar e remover pacotes desnecessários
- [ ] Instalar Prettier e plugins ESLint
- [ ] Adicionar GSAP ScrollTrigger (animações SECONDARY)
- [ ] Documentar dependências finais

---

## 🚨 PONTOS DE ATENÇÃO

### 1. Prisma / Backend

O `package.json` ainda tem `@prisma/client` e `prisma`, mas segundo o summary, o backend foi removido. Ação necessária:

- ✅ Confirmar que não há código usando Prisma
- ✅ Remover `@prisma/client` e `prisma`
- ✅ Remover `bcryptjs`, `jsonwebtoken` (auth)

### 2. Componentes Auth

Existe pasta `components/custom/auth/`. Verificar:

- ⚠️ Se auth foi totalmente removido, deletar pasta
- ⚠️ Se há componentes reutilizáveis, mover para `components/ui/`

### 3. Custom Cursor e Easter Egg

Componentes não essenciais:

- `CustomCursor.tsx` - Pode ser premium demais? Avaliar UX
- `EasterEgg.tsx` - Manter ou remover?

**Decisão:** Avaliar após ter site base funcionando

### 4. Navigation Component

`Navigation.tsx` existe mas pode precisar refatoração completa para:

- Implementar mega menu conforme wireframes
- Adicionar dropdown de produtos
- Mobile menu slide-in
- Sticky behavior
- Search integration (futuro)

### 5. Pasta `nextjs-app/`

Pasta duplicada ou legacy? **Ação:** Investigar conteúdo e remover se desnecessário

---

## 📊 ESTATÍSTICAS ATUAIS

### Código Existente

**Componentes Custom:**
- 11 componentes em `components/custom/`
- 5 componentes em `components/ui/` (shadcn/ui)

**Documentação Roadmap:**
- Fase 1: 4.065 linhas
- Fase 2: 2.692 linhas
- **Total: 6.757+ linhas de especificações**

**Globals.css:**
- 742 linhas de Design System v2.0 completo

### Tamanho do Projeto

```
Total de linhas: ~8.000+ linhas
- Documentação: 6.757 linhas
- Design System: 742 linhas
- Componentes: ~500 linhas (estimado)
```

---

## ✅ PRÓXIMOS PASSOS

1. **Ler eslint.config.mjs** para entender configuração atual
2. **Investigar pasta `nextjs-app/`** - duplicada?
3. **Verificar `components/custom/auth/`** - ainda necessário?
4. **Criar branch de limpeza**: `git checkout -b feat/fase3-cleanup`
5. **Executar limpeza de arquivos legados**
6. **Criar nova estrutura de pastas**
7. **Atualizar configurações**
8. **Remover dependências não usadas**
9. **Commit e documentar mudanças**

---

**Conclusão:** A estrutura atual está razoavelmente organizada, mas precisa de limpeza de legado e reorganização para seguir a arquitetura proposta no redesign. As configurações essenciais (Tailwind v4, TypeScript strict) já estão corretas.
