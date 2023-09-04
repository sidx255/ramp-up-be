FROM alpine:latest

RUN apk add nodejs npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ENV NODE_ENV=docker

CMD ["node", "server.js"]