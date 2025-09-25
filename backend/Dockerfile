# Backend Dockerfile para produção
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./
RUN npm install

# Copiar código fonte
COPY . .

# Compilar TypeScript
RUN npm run build

# Remover devDependencies após build
RUN npm prune --production

# Expor porta
EXPOSE 5000

# Comando para iniciar
CMD ["node", "dist/server.js"]