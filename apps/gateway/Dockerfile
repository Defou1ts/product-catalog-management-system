FROM node:18-alpine as development

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

CMD ["yarn","nest", "start", "gateway", "--watch"]


FROM node:18-alpine as production

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn nest build gateway

CMD ["node", "dist/apps/gateway/main"]