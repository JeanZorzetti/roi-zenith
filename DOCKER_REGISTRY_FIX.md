# Docker Registry Authentication Error - RESOLVIDO

## ⚠️ Problema Persistente Identificado
```
ERROR: unexpected status from HEAD request to https://registry-1.docker.io/v2/library/node/manifests: 401 Unauthorized
```

## 🔍 Causa Raiz
Este erro ocorre sistematicamente por:
1. **Rate limiting severo** do Docker Hub para contas não autenticadas
2. **Políticas restritivas** do Docker Hub em ambientes de CI/CD
3. **Problemas de conectividade** persistentes com registry.docker.io
4. **Ambiente EasyPanel** sem autenticação Docker Hub configurada

## ✅ SOLUÇÃO IMPLEMENTADA (DEFINITIVA)

### 🔧 Base Ubuntu (Solução Atual)
```dockerfile
# SOLUÇÃO DEFINITIVA - Ubuntu base sem dependência Docker Hub Alpine
FROM ubuntu:22.04 AS base

# Instalação direta do Node.js via NodeSource
RUN apt-get update && apt-get install -y \
    curl ca-certificates gnupg lsb-release \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs
```

### 2. Timeout de Rede Aumentado
```dockerfile
RUN npm install --ignore-scripts --network-timeout 300000
```

### 3. Dockerfile Alternativo
Se o problema persistir, use o `Dockerfile.fallback` com base Ubuntu:

```bash
# Renomeie os arquivos temporariamente
mv Dockerfile Dockerfile.alpine
mv Dockerfile.fallback Dockerfile

# Tente o build novamente
docker build -t your-app .
```

## Soluções Alternativas para EasyPanel

### Opção 1: Docker Login (Recomendado)
Se você tem conta no Docker Hub, faça login no servidor:

```bash
docker login
```

### Opção 2: Registry Mirror
Configure um mirror alternativo no EasyPanel:

```json
{
  "registry-mirrors": [
    "https://mirror.gcr.io",
    "https://registry.cn-hangzhou.aliyuncs.com"
  ]
}
```

### Opção 3: Imagem Base Alternativa
Use uma imagem base diferente:

```dockerfile
# Em vez de node:18-alpine, use:
FROM node:18-bullseye-slim AS base
# ou
FROM node:18.20.4-bullseye-slim AS base
```

## Verificação
Para verificar se a imagem está disponível:

```bash
docker pull node:18.20.4-alpine3.20
```

## Monitoramento
- **Docker Hub Status**: https://status.docker.com/
- **Rate Limits**: Docker Hub impõe limites para contas não autenticadas
- **Alternative Registries**: Considere usar registries alternativos como GHCR ou Quay

## Notas
- O erro 401 do Docker Registry é temporário na maioria dos casos
- A autenticação resolve a maioria dos problemas de rate limiting
- Versões específicas são mais estáveis que tags "latest" ou "alpine"