# development
FROM node:alpine as development
WORKDIR /usr/src/app/admin
COPY ./graphql-client/package*.json .
RUN yarn
COPY ./graphql-client .
RUN yarn build

# production
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/admin

COPY ./graphql-client/package*.json .

RUN yarn --only=production

COPY ./graphql-client .

COPY --from=development /urs/src/app/dist ./dist

# CMD ["node", "dist/apps/orders/main"]