FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm install --workspace @athletica/api --workspace @athletica/shared

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./
COPY tsconfig.base.json ./
COPY apps/api ./apps/api
COPY packages/shared ./packages/shared

RUN npm run build --workspace @athletica/shared --if-present
RUN npm run build --workspace @athletica/api

FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY package.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm install --omit=dev --workspace @athletica/api --workspace @athletica/shared

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

EXPOSE 4000

CMD ["node", "apps/api/dist/server.js"]
