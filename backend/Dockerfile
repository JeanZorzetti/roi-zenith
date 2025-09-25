# Backend Dockerfile para produção
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./
RUN npm install

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Remover devDependencies após build
RUN npm prune --production

# Expor porta
EXPOSE 5000

# Script de inicialização para aplicar migrações e iniciar servidor
COPY start.sh ./
RUN chmod +x start.sh

# Comando para iniciar
CMD ["./start.sh"]