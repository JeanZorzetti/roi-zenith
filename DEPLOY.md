# 🚀 Deploy ROI Labs no Vercel

## Configuração Automática

### 1. Conectar Repositório
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Importe: `https://github.com/JeanZorzetti/roi-zenith`

### 2. Configurações de Build (Auto-detectadas)
```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd frontend && npm install",
  "framework": "vite"
}
```

### 3. Variáveis de Ambiente (se necessário)
```bash
NODE_ENV=production
VITE_API_URL=https://api.roilabs.com.br
```

## Configuração do Domínio roilabs.com.br

### 4. Adicionar Domínio Personalizado
1. No painel do Vercel → **Settings** → **Domains**
2. Adicione: `roilabs.com.br` e `www.roilabs.com.br`

### 5. Configurar DNS
Configure os seguintes registros no seu provedor de DNS:

```dns
# Registro A (para roilabs.com.br)
Type: A
Name: @
Value: 76.76.19.88

# Registro CNAME (para www.roilabs.com.br)  
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6. SSL/TLS
O Vercel configura automaticamente Let's Encrypt SSL.

## ✅ Checklist de Deploy

- [x] Repositório configurado
- [x] Build testado localmente
- [x] Arquivo `vercel.json` criado
- [x] Redirects SPA configurados
- [ ] Deploy realizado no Vercel
- [ ] Domínio roilabs.com.br configurado
- [ ] SSL ativo e funcionando
- [ ] Teste completo do site

## 🔍 URLs de Teste

- **Vercel URL**: `https://roi-zenith.vercel.app`
- **Domínio Final**: `https://roilabs.com.br`

## 📝 Comandos Úteis

```bash
# Build local
cd frontend && npm run build

# Preview local
cd frontend && npm run preview

# Deploy via CLI (opcional)
npx vercel --prod
```