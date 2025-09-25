# Docker Registry Authentication Error - Fix

## Problema
```
ERROR: unexpected status from HEAD request to https://registry-1.docker.io/v2/library/node/manifests/18-alpine: 401 Unauthorized
```

## Causa
Este erro pode ocorrer por:
1. **Rate limiting** do Docker Hub
2. **Problemas de conectividade** com o Docker Registry
3. **Autenticação necessária** devido a políticas do Docker Hub
4. **Versão de imagem** não disponível ou movida

## Soluções Implementadas

### 1. Versão Específica do Node.js
```dockerfile
# Alterado de:
FROM node:18-alpine AS base

# Para:
FROM node:18.20.4-alpine3.20 AS base
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