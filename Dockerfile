# ---------- Stage 1: Install dependencies ----------
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ---------- Stage 2: Build ----------
FROM node:22-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY prisma ./prisma
COPY src ./src

# Generate Prisma client
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# ---------- Stage 3: Production ----------
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy only what's needed to run
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/src/main"]
