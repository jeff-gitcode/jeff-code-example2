##########################################################################################
FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/nestapi .

ENV PORT=3333

EXPOSE ${PORT}

RUN yarn install

# dependencies that nestjs needs
RUN yarn add reflect-metadata tslib rxjs helmet cache-manager @nestjs/platform-express @nestjs/common @nestjs/core @nestjs/swagger @nestjs/terminus @nestjs/throttler @nestjs/config @nestjs/axios @nestjs/cqrs

CMD node ./main.js

# docker build -f ./apps/nestapi/Dockerfile . -t nestapi
