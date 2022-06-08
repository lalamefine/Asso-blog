# syntax=docker/dockerfile:1
FROM mhart/alpine-node:latest
WORKDIR /Asso-blog
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["node","build"]