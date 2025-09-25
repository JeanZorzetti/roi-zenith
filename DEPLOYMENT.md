# 🚀 Deployment para Produção - Socket.IO

## Pré-requisitos

1. **Servidor VPS** com Ubuntu/Debian
2. **Docker e Docker Compose** instalados
3. **Domínios configurados** (roilabs.com.br e back.roilabs.com.br)
4. **Ports 80, 443** abertos no firewall

## Passo a Passo

### 1. Configuração do Servidor

```bash
# Conectar ao servidor
ssh root@seu-servidor

# Instalar Docker (se não tiver)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Instalar Certbot (para SSL)
apt update && apt install -y certbot python3-certbot-nginx
```

### 2. Deploy da Aplicação

```bash
# Clonar repositório
git clone https://github.com/JeanZorzetti/roi-zenith.git
cd roi-zenith

# Tornar script executável
chmod +x deploy.sh

# Executar deploy
./deploy.sh
```

### 3. Configurar SSL Real (Let's Encrypt)

```bash
# Parar nginx temporariamente
docker-compose -f docker-compose.prod.yml stop nginx

# Gerar certificados Let's Encrypt
certbot certonly --standalone -d roilabs.com.br -d back.roilabs.com.br

# Copiar certificados para pasta ssl
cp /etc/letsencrypt/live/roilabs.com.br/fullchain.pem ./ssl/roilabs.crt
cp /etc/letsencrypt/live/roilabs.com.br/privkey.pem ./ssl/roilabs.key

# Reiniciar containers
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Configurar Renovação Automática SSL

```bash
# Adicionar ao crontab
crontab -e

# Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet --post-hook "docker-compose -f /path/to/roi-zenith/docker-compose.prod.yml restart nginx"
```

### 5. Configuração DNS

No seu provedor de DNS, configure:

```
A Record: roilabs.com.br -> IP_DO_SERVIDOR
A Record: back.roilabs.com.br -> IP_DO_SERVIDOR
CNAME: www.roilabs.com.br -> roilabs.com.br
```

## Estrutura Final

```
Usuário → https://roilabs.com.br
                ↓
              Nginx (SSL)
                ↓
            Frontend Container

Cliente Socket.IO → wss://back.roilabs.com.br/socket.io/
                            ↓
                        Nginx (SSL)
                            ↓
                      Backend Container (Socket.IO)
```

## Troubleshooting

### WebSocket não conecta:

1. **Verificar logs:**
   ```bash
   docker-compose -f docker-compose.prod.yml logs backend
   docker-compose -f docker-compose.prod.yml logs nginx
   ```

2. **Testar WebSocket diretamente:**
   ```bash
   # Deve retornar status 101 Switching Protocols
   curl -i -N -H "Connection: Upgrade" \
        -H "Upgrade: websocket" \
        -H "Sec-WebSocket-Key: test" \
        -H "Sec-WebSocket-Version: 13" \
        https://back.roilabs.com.br/socket.io/
   ```

3. **Verificar portas:**
   ```bash
   netstat -tlnp | grep :443
   netstat -tlnp | grep :80
   ```

### Erro de CORS:

- Verificar FRONTEND_URL no backend
- Confirmar origins permitidos no servidor Socket.IO

### Certificado SSL inválido:

```bash
# Verificar certificado
openssl x509 -in ssl/roilabs.crt -text -noout

# Verificar conexão SSL
openssl s_client -connect back.roilabs.com.br:443
```

## Comandos Úteis

```bash
# Ver logs em tempo real
docker-compose -f docker-compose.prod.yml logs -f

# Reiniciar apenas backend
docker-compose -f docker-compose.prod.yml restart backend

# Update da aplicação
git pull
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

## ✅ Checklist de Produção

- [ ] Domínios apontando para servidor
- [ ] SSL configurado (Let's Encrypt)
- [ ] Containers rodando
- [ ] https://roilabs.com.br carregando
- [ ] https://back.roilabs.com.br/api/health retornando 200
- [ ] wss://back.roilabs.com.br/socket.io/ conectando
- [ ] Logs sem erros
- [ ] Backup configurado