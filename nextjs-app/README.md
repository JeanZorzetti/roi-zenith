# ROI Labs - Next.js 15 Application

## 🎉 Migração Completa: React+Vite+Express → Next.js 15

Este projeto foi **completamente refatorado** de uma arquitetura separada (React + Vite no frontend e Node.js + Express no backend) para **Next.js 15 unificado**.

## ✨ O que mudou?

### Antes (Arquitetura Antiga)
```
ROI_Labs/
├── frontend/          # React + Vite
│   ├── src/
│   └── package.json
├── backend/           # Node.js + Express + Prisma
│   ├── src/
│   └── package.json
└── package.json       # Workspace root
```

### Agora (Arquitetura Nova)
```
ROI_Labs/
├── nextjs-app/        # Next.js 15 (tudo em um)
│   ├── app/           # Pages e API Routes
│   ├── components/    # Componentes React
│   ├── lib/           # Utilitários e Prisma
│   ├── prisma/        # Schema e migrations
│   └── package.json
├── frontend/          # [DEPRECATED] - Pode ser removido
└── backend/           # [DEPRECATED] - Pode ser removido
```

## 🚀 Vantagens da Nova Arquitetura

1. **Unificação**: Todo o código em um único projeto
2. **API Routes nativas**: Sem necessidade de Express separado
3. **SSR/SSG**: Melhor SEO e performance
4. **Deployment simplificado**: Deploy com um comando na Vercel
5. **Type-safety**: Integração perfeita entre frontend e backend
6. **Menos complexidade**: Apenas um package.json para gerenciar

## 📦 Instalação

```bash
cd nextjs-app
npm install
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` (já existe um template):

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/roi_labs"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3001"
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
```

### 2. Banco de Dados

```bash
# Gerar Prisma Client
npx prisma generate

# Rodar migrations (crie o banco primeiro)
npx prisma migrate dev

# Ou usar o banco existente
npx prisma db push
```

## 🏃‍♂️ Executando

### Modo Desenvolvimento

```bash
npm run dev
```

O app estará disponível em: **http://localhost:3001** (ou próxima porta disponível)

### Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

### `/app` - App Router do Next.js

```
app/
├── page.tsx              # Página inicial (/)
├── layout.tsx            # Layout raiz
├── globals.css           # Estilos globais + Tailwind
└── api/                  # API Routes (substitui Express)
    └── auth/
        ├── register/
        │   └── route.ts  # POST /api/auth/register
        ├── login/
        │   └── route.ts  # POST /api/auth/login
        └── me/
            └── route.ts  # GET /api/auth/me
```

### `/components` - Componentes React

```
components/
├── ui/                   # Componentes shadcn/ui
└── custom/              # Componentes customizados
    ├── Navigation.tsx
    ├── HeroSection.tsx
    ├── Footer.tsx
    └── ...
```

### `/lib` - Utilitários

```
lib/
├── prisma.ts            # Cliente Prisma (singleton)
├── jwt.ts               # Utilitários JWT
└── utils.ts             # Utilitários gerais (cn, etc)
```

### `/prisma` - Database

```
prisma/
├── schema.prisma        # Schema do banco
└── prisma.config.ts     # Configuração Prisma 7
```

## 🔐 Autenticação

A autenticação usa JWT. Exemplo de uso:

### Registro
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "name": "Nome do Usuário",
  "password": "senha123"
}
```

### Login
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "senha123"
}
```

### Rotas Protegidas
```bash
GET /api/auth/me
Headers: {
  "Authorization": "Bearer <token>"
}
```

## 🎨 Estilos e UI

- **Tailwind CSS v4**: Nova sintaxe com `@theme inline`
- **shadcn/ui**: Componentes UI modernos
- **Framer Motion**: Animações suaves
- **Design Premium**: Sistema de cores customizado ROI Labs

## 📝 API Routes vs Express

### Antes (Express)
```typescript
// backend/src/routes/authRoutes.ts
router.post('/register', authController.register);
```

### Agora (Next.js API Routes)
```typescript
// app/api/auth/register/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();
  // ...lógica aqui
  return NextResponse.json({ success: true });
}
```

## 🔌 Socket.IO

Para implementar Socket.IO no Next.js 15, há algumas opções:

### Opção 1: Custom Server
Criar `server.js` com Express + Socket.IO + Next.js

### Opção 2: Usar WebSockets nativos
Implementar com `ws` ou APIs Web nativas

### Opção 3: Serviço separado
Manter um servidor Socket.IO separado apenas para real-time

**Status**: Documentado. As funcionalidades colaborativas (boards em tempo real) precisarão desta integração.

## 🚢 Deploy

### Vercel (Recomendado)

1. Conecte o repositório no Vercel
2. Configure as variáveis de ambiente
3. Deploy automático!

```bash
# Ou via CLI
npx vercel
```

### Outros Provedores

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

## 📚 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 🔄 Migração do Código Antigo

### O que foi migrado ✅
- ✅ Todos os componentes React
- ✅ Estilos e Tailwind CSS
- ✅ Schema Prisma e models
- ✅ Autenticação JWT
- ✅ API Routes principais (auth)
- ✅ Hooks e stores (Zustand)
- ✅ Tipos TypeScript

### O que precisa ser implementado ⏳
- ⏳ Socket.IO para colaboração em tempo real
- ⏳ Rotas da API restantes (boards, CRM, game)
- ⏳ Testes automatizados
- ⏳ CI/CD pipeline

### Como adicionar novas API Routes

```typescript
// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const leads = await prisma.lead.findMany();
  return NextResponse.json({ leads });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const lead = await prisma.lead.create({ data: body });
  return NextResponse.json({ lead });
}
```

## 🆘 Troubleshooting

### Porta em uso
Se a porta 3000 estiver em uso, o Next.js usará automaticamente a próxima disponível (3001, 3002, etc).

### Erro de Database
Certifique-se de que:
1. MySQL está rodando
2. O banco `roi_labs` existe
3. As credenciais no `.env.local` estão corretas

### Erro de Prisma
```bash
# Regenerar o cliente
npx prisma generate

# Resetar o banco (CUIDADO: apaga tudo)
npx prisma migrate reset
```

## 👥 Contribuindo

Este projeto foi refatorado para Next.js 15. Para contribuir:

1. Clone o repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

ROI Labs © 2024

---

**Nota**: As pastas `frontend/` e `backend/` antigas podem ser removidas após validação completa da migração.
