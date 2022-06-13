# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /Asso-blog
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build
EXPOSE 3000
CMD ["node","build"]