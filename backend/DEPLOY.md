# ROI Labs Backend - EasyPanel Deployment

## 🚀 Deploy no EasyPanel

### 1. Configuração Inicial

1. **Conecte o repositório** no EasyPanel
2. **Configure o domínio**: `back.roilabs.com.br`
3. **Selecione o contexto**: `/backend`

### 2. Variáveis de Ambiente

Configure as seguintes variáveis no EasyPanel:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roi-labs

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-production
JWT_EXPIRE=7d

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=contato@roilabs.com.br
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM="ROI Labs <contato@roilabs.com.br>"

# CORS
FRONTEND_URL=https://roilabs.com.br

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Environment
NODE_ENV=production
PORT=5000
```

### 3. Configuração do MongoDB

**Opção 1: MongoDB Atlas (Recomendado)**
- Crie um cluster no [MongoDB Atlas](https://cloud.mongodb.com)
- Configure IP whitelist (0.0.0.0/0 para EasyPanel)
- Copie a connection string para `MONGODB_URI`

**Opção 2: MongoDB no próprio EasyPanel**
- Adicione um serviço MongoDB no projeto
- Use a connection string interna

### 4. Configuração de Email

**Gmail SMTP Setup:**
1. Ative 2FA na conta Gmail
2. Gere uma senha de app específica
3. Use a senha de app em `EMAIL_PASS`

### 5. Dockerfile

O projeto já inclui um Dockerfile otimizado:
- Multi-stage build para menor tamanho
- Non-root user para segurança
- Healthcheck incluído

### 6. Domínio e SSL

1. **Configure DNS**:
   ```
   Type: A Record
   Name: back
   Value: [IP do EasyPanel]
   ```

2. **SSL**: EasyPanel configurará automaticamente via Let's Encrypt

### 7. Verificação de Deploy

Após o deploy, verifique:

- ✅ Health check: `https://back.roilabs.com.br/api/health`
- ✅ CORS funcionando com roilabs.com.br
- ✅ Email test enviando corretamente
- ✅ MongoDB conectando sem erros

### 8. Monitoramento

**Logs importantes:**
```bash
# No EasyPanel, monitore:
✅ MongoDB Connected: cluster.mongodb.net
📧 Email service is ready to send messages
🚀 ROI Labs API server running on port 5000
```

**Endpoints principais:**
- `POST /api/contact/submit` - Formulário de contato
- `POST /api/leads/submit` - Captura de leads
- `POST /api/leads/roi-data` - Dados da calculadora
- `POST /api/auth/register` - Registro de usuários
- `POST /api/auth/login` - Login

### 9. Troubleshooting

**Erro de CORS:**
- Verifique se `FRONTEND_URL=https://roilabs.com.br` está configurado
- Confirme que o domínio está na lista de origins permitidos

**Erro de MongoDB:**
- Verifique IP whitelist no Atlas
- Teste connection string localmente primeiro

**Erro de Email:**
- Confirme senha de app Gmail
- Teste com um email simples primeiro

### 10. Backup e Segurança

- ✅ JWT secrets únicos em produção
- ✅ MongoDB backup automático (Atlas)
- ✅ Rate limiting configurado
- ✅ Helmet security headers
- ✅ Input validation em todas rotas