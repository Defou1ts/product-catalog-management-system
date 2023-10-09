FROM node:18-alpine as development

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

CMD ["yarn","nest", "start", "products", "--watch"]


FROM node:18-alpine as production

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn nest build products

CMD ["node", "dist/apps/products/main"]