FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npx", "serverless", "offline", "--host", "0.0.0.0"]
