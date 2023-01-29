FROM node:lts-alpine AS development

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && npm prune --production

FROM node:lts-alpine AS production

WORKDIR /src

ENV NODE_ENV=production
ENV CATSAPI=https://api.thecatapi.com/v1/breeds
ENV CACHETTL=5000

COPY --from=development /src/dist /src/dist

COPY --from=development /src/node_modules /src/node_modules

EXPOSE 3333

CMD ["node", "dist/apps/nestapi/main.js"]

## docker test steps
# docker build -f ./apps/nestapi/Dockerfile . -t nestapi
# docker build -t nestapi .
# docker run -d -p 3333:3333 nestapi