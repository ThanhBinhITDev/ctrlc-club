FROM node:20-alpine

WORKDIR /app

# Copy package.json và cài đặt dependencies trước để tận dụng cache của Docker
COPY package*.json ./
RUN npm install

# Copy toàn bộ code
COPY . .

# Expose port 3000
EXPOSE 3000

# Chạy Next.js ở chế độ dev
CMD ["npm", "run", "dev"]
