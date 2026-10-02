# Backend (Express) image
FROM node:22-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
