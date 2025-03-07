FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/ 

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY --from=build /usr/src/app/prisma ./prisma

COPY package*.json ./

RUN npm install --production

RUN apk add --no-cache bash

EXPOSE 25000

RUN adduser -D nodejs

USER nodejs

CMD ["node", "dist/src/main"]