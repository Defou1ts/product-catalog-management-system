FROM node:18-alpine as development

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

CMD ["yarn","nest", "start", "users", "--watch"]


FROM node:18-alpine as production

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn nest build users

CMD ["node", "dist/apps/users/main"]