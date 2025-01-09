FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["/bin/sh", "-c", "npm run seed && npm run start"]
