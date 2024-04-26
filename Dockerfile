FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:14

WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci

COPY server/ .

ENV NODE_ENV production
ENV PORT 8000
EXPOSE 8000

CMD ["npm", "start"]