#!/bin/bash

# Script de Deploy para Produção com Socket.IO
echo "🚀 Iniciando deploy para produção..."

# 1. Parar containers existentes
echo "🔄 Parando containers existentes..."
docker-compose -f docker-compose.prod.yml down

# 2. Rebuild das imagens
echo "🔨 Construindo imagens..."
docker-compose -f docker-compose.prod.yml build --no-cache

# 3. Gerar certificados SSL (se não existirem)
if [ ! -f "./ssl/roilabs.crt" ]; then
    echo "🔒 Gerando certificados SSL..."
    mkdir -p ssl

    # Para desenvolvimento (self-signed)
    openssl req -x509 -newkey rsa:4096 -keyout ssl/roilabs.key -out ssl/roilabs.crt -days 365 -nodes \
        -subj "/C=BR/ST=BR/L=City/O=ROI Labs/CN=roilabs.com.br"

    echo "⚠️  IMPORTANTE: Use certificados Let's Encrypt em produção!"
    echo "   Comando: certbot --nginx -d roilabs.com.br -d back.roilabs.com.br"
fi

# 4. Iniciar containers
echo "▶️  Iniciando containers..."
docker-compose -f docker-compose.prod.yml up -d

# 5. Verificar status
echo "✅ Verificando status dos containers..."
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🎉 Deploy concluído!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Configure DNS para apontar para seu servidor:"
echo "      roilabs.com.br -> IP do servidor"
echo "      back.roilabs.com.br -> IP do servidor"
echo ""
echo "   2. Configure certificados SSL reais:"
echo "      sudo certbot --nginx -d roilabs.com.br -d back.roilabs.com.br"
echo ""
echo "   3. Teste as URLs:"
echo "      https://roilabs.com.br (frontend)"
echo "      https://back.roilabs.com.br/api/health (backend)"
echo "      wss://back.roilabs.com.br/socket.io/ (websocket)"