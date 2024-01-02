FROM node:18.17-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY ..

COPY ./dist ./dist

CMD ["yarn", "run", "start:dev"]