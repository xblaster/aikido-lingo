# Aikido Lingo : export statique Next.js servi par nginx.
#   docker build -t aikido-lingo:<AAAAMMJJ-sha7> .
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# prebuild : conversion du contenu + validation (le build échoue si le contenu est invalide)
RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
