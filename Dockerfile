#build
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build


#production
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install --only=production

RUN npx prisma generate

RUN rm package*.json

EXPOSE 3001

CMD ["node","dist/main.js"]