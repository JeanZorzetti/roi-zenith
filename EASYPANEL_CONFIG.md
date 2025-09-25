# 🚨 CORREÇÃO URGENTE: Configuração EasyPanel - Variáveis de Ambiente

## ❌ **PROBLEMA IDENTIFICADO**

O servidor `back.roilabs.com.br` está rodando, mas **as variáveis de ambiente não foram definidas no EasyPanel**:

```
Environment variable not found: DATABASE_URL
Environment: undefined
Frontend URL: undefined
```

## ✅ **SOLUÇÃO: Configurar Variáveis no EasyPanel**

### **1. Acessar Painel EasyPanel**
- Fazer login no EasyPanel
- Navegar até o projeto/serviço `roi-labs-api`
- Ir para a aba **Environment Variables**

### **2. Definir Variáveis de Banco MySQL**

Configure estas variáveis exatamente como mostrado:

```bash
# Database Configuration
DATABASE_URL=mysql://roi_user:PAzo18**@dados_roi-zenith-db:3306/roi_zenith
DB_HOST=dados_roi-zenith-db
DB_USER=roi_user
DB_PASSWORD=PAzo18**
DB_NAME=roi_zenith
DB_PORT=3306

# JWT Configuration
JWT_SECRET=roi-labs-super-secret-jwt-key-2025-production
JWT_EXPIRE=7d

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=contato@roilabs.com.br
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM="ROI Labs <contato@roilabs.com.br>"

# Application Configuration
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://roilabs.com.br

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### **3. Verificação das Variáveis**

**✅ OBRIGATÓRIAS (Críticas):**
- `DATABASE_URL` - Conexão completa MySQL
- `DB_HOST` - dados_roi-zenith-db
- `DB_USER` - roi_user
- `DB_PASSWORD` - PAzo18**
- `DB_NAME` - roi_zenith
- `DB_PORT` - 3306
- `NODE_ENV` - production

**⚠️ IMPORTANTES:**
- `JWT_SECRET` - Autenticação
- `FRONTEND_URL` - CORS
- `EMAIL_*` - Notificações

### **4. Aplicar Configuração**

Após definir todas as variáveis:
1. **Salvar** as configurações
2. **Restart** o serviço/container
3. **Aguardar** reinicialização (~30s)

## 🧪 **TESTE DE VERIFICAÇÃO**

Após configuração, este comando deve retornar **401** (credenciais inválidas) ao invés de **500**:

```bash
curl -X POST https://back.roilabs.com.br/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Resultado Esperado:**
```json
{"success":false,"error":"Invalid credentials"}
```

## 📊 **LOGS DE SUCESSO**

Quando configurado corretamente, os logs mostrarão:

```
📋 Database: MySQL (production)
🔗 Database URL: mysql://roi_user:***@dados_roi-zenith-db:3306/roi_zenith
✅ Database connected successfully
🚀 ROI Labs API server running on port 5000
📊 Environment: production
🔗 Frontend URL: https://roilabs.com.br
```

## 🎯 **RESULTADO FINAL**

- ✅ **Erro 500 eliminado**
- ✅ **Database conectado**
- ✅ **Sistema de autenticação funcionando**
- ✅ **Sistema de convites operacional**

---

**CRÍTICO**: Sem essas variáveis, o servidor não pode conectar ao banco de dados e todos os endpoints retornam erro 500!